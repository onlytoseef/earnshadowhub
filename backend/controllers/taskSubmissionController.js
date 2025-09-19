const Task = require('../models/Task');
const UserTask = require('../models/UserTask');
const User = require('../models/User');

// ==================== USER TASK SUBMISSION ====================

// User: Submit task review
exports.submitTaskReview = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const {
      rating,
      comment,
      screenshots = [],
      timeSpent
    } = req.body;

    // Validate required fields
    // rating is optional for this workflow; require comment length
    if (!comment || comment.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required'
      });
    }

    // Find user's task
    const userTask = await UserTask.findOne({
      user: userId,
      task: taskId,
      status: 'in-progress'
    });

    if (!userTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not in progress'
      });
    }

    // Process uploaded files (if any)
    const uploadedFiles = [];
    if (req.files && Array.isArray(req.files)) {
      for (const f of req.files) {
        // store relative path for frontend access
        const relPath = `/uploads/screenshots/${f.filename}`;
        uploadedFiles.push(relPath);
      }
    }

    // Update user task with review
    userTask.status = 'pending';
    userTask.submittedAt = new Date();
    userTask.review = {
      rating: rating ? parseInt(rating) : null,
      comment: comment.trim(),
      screenshots: [...(Array.isArray(screenshots) ? screenshots : []), ...uploadedFiles],
      timeSpent: timeSpent ? parseInt(timeSpent) : null
    };

    // Set expiration time (24 hours from now)
    userTask.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await userTask.save();
    await userTask.populate('task', 'title websiteName paymentPerTask');

    // Emit realtime event for new pending submission
    try {
      const io = req.app && req.app.get && req.app.get('io');
      if (io) {
        io.emit('submission:pending', { submissionId: userTask._id, userId: userId, taskId });
      }
    } catch (e) {
      console.warn('Socket emit failed for submission:pending', e.message);
    }

    res.json({
      success: true,
      message: 'Task review submitted successfully. Awaiting admin approval.',
      userTask
    });
  } catch (error) {
    console.error('Submit task review error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to submit task review'
    });
  }
};

// User: Get user's tasks
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      status, 
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = { user: userId };
    if (status && status !== 'all') filter.status = status;

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const userTasks = await UserTask.find(filter)
      .populate('task', 'title websiteName paymentPerTask category estimatedTime')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await UserTask.countDocuments(filter);

    // Calculate totals
    const totals = await UserTask.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalEarnings: { $sum: '$earnings' }
        }
      }
    ]);

    const stats = totals.reduce((acc, item) => {
      acc[item._id] = {
        count: item.count,
        earnings: item.totalEarnings
      };
      return acc;
    }, {});

    res.json({
      success: true,
      userTasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalTasks: total
      },
      stats
    });
  } catch (error) {
    console.error('Get user tasks error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user tasks'
    });
  }
};

// ==================== ADMIN TASK APPROVAL ====================

// Admin: Get pending task submissions
exports.getPendingSubmissions = async (req, res) => {
  try {
    // Validate admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    const { 
      page = 1, 
      limit = 10,
      planType,
      category,
      sortBy = 'submittedAt',
      sortOrder = 'asc' // oldest first for fairness
    } = req.query;

    // Build filter for pending submissions
    const filter = { status: 'pending' };

    // Build aggregation pipeline
    const pipeline = [
      { $match: filter },
      {
        $lookup: {
          from: 'tasks',
          localField: 'task',
          foreignField: '_id',
          as: 'taskDetails'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$taskDetails' },
      { $unwind: '$userDetails' }
    ];

    // Add additional filters
    if (planType && planType !== 'all') {
      pipeline.push({ $match: { 'taskDetails.planType': planType } });
    }
    if (category && category !== 'all') {
      pipeline.push({ $match: { 'taskDetails.category': category } });
    }

    // Add sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    pipeline.push({ $sort: sort });

    // Add pagination
    pipeline.push(
      { $skip: (parseInt(page) - 1) * parseInt(limit) },
      { $limit: parseInt(limit) }
    );

    const submissions = await UserTask.aggregate(pipeline);

    // Get total count
    const totalPipeline = [...pipeline.slice(0, -2)]; // Remove skip and limit
    totalPipeline.push({ $count: 'total' });
    const totalResult = await UserTask.aggregate(totalPipeline);
    const total = totalResult[0]?.total || 0;

    // Check for expired submissions and auto-reject them
    await UserTask.updateMany(
      {
        status: 'pending',
        expiresAt: { $lt: new Date() }
      },
      {
        status: 'expired',
        rejectionReason: 'Auto-rejected: 24-hour review period expired'
      }
    );

    res.json({
      success: true,
      submissions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalSubmissions: total
      }
    });
  } catch (error) {
    console.error('Get pending submissions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch pending submissions'
    });
  }
};

// Admin: Approve task submission
exports.approveTaskSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { adminNotes } = req.body;

    // Validate admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    const userTask = await UserTask.findById(submissionId)
      .populate('task', 'paymentPerTask title')
      .populate('user', 'name email');

    if (!userTask) {
      return res.status(404).json({
        success: false,
        message: 'Task submission not found'
      });
    }

    if (userTask.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Task submission is not in pending status'
      });
    }

    // Update task submission
    userTask.status = 'approved';
    userTask.reviewedAt = new Date();
    userTask.completedAt = new Date();
    userTask.earnings = userTask.task.paymentPerTask;
    if (adminNotes) userTask.adminNotes = adminNotes;

    await userTask.save();

    // Update task completion count
    await Task.findByIdAndUpdate(
      userTask.task._id,
      { $inc: { currentCompletions: 1 } }
    );

    // Add earnings to user's wallet
    const { addEarnings } = require('./walletController');
    const walletUpdate = await addEarnings(
      userTask.user._id,
      userTask.earnings,
      `Task completion: ${userTask.task.title}`
    );

    // Emit realtime event for approved submission
    try {
      const io = req.app && req.app.get && req.app.get('io');
      if (io) {
        io.emit('submission:approved', { submissionId: userTask._id, userId: userTask.user._id, taskId: userTask.task._id });
      }
    } catch (e) {
      console.warn('Socket emit failed for submission:approved', e.message);
    }

    res.json({
      success: true,
      message: 'Task submission approved and payment processed',
      userTask,
      earnings: userTask.earnings,
      walletUpdate
    });
  } catch (error) {
    console.error('Approve task submission error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to approve task submission'
    });
  }
};

// Admin: Reject task submission
exports.rejectTaskSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { rejectionReason, adminNotes } = req.body;

    // Validate admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    const userTask = await UserTask.findById(submissionId)
      .populate('task', 'title')
      .populate('user', 'name email');

    if (!userTask) {
      return res.status(404).json({
        success: false,
        message: 'Task submission not found'
      });
    }

    if (userTask.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Task submission is not in pending status'
      });
    }

    // Update task submission
    userTask.status = 'rejected';
    userTask.reviewedAt = new Date();
    userTask.rejectionReason = rejectionReason;
    userTask.earnings = 0;
    if (adminNotes) userTask.adminNotes = adminNotes;

    await userTask.save();
    // Emit realtime event for rejected submission
    try {
      const io = req.app && req.app.get && req.app.get('io');
      if (io) {
        io.emit('submission:rejected', { submissionId: userTask._id, userId: userTask.user._id, taskId: userTask.task._id });
      }
    } catch (e) {
      console.warn('Socket emit failed for submission:rejected', e.message);
    }

    res.json({
      success: true,
      message: 'Task submission rejected',
      userTask
    });
  } catch (error) {
    console.error('Reject task submission error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reject task submission'
    });
  }
};

// Admin: Get task submission details
exports.getSubmissionDetails = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const userTask = await UserTask.findById(submissionId)
      .populate('task')
      .populate('user', 'name email planType');

    if (!userTask) {
      return res.status(404).json({
        success: false,
        message: 'Task submission not found'
      });
    }

    res.json({
      success: true,
      submission: userTask
    });
  } catch (error) {
    console.error('Get submission details error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch submission details'
    });
  }
};

module.exports = {
  // User functions
  submitTaskReview: exports.submitTaskReview,
  getUserTasks: exports.getUserTasks,
  
  // Admin functions
  getPendingSubmissions: exports.getPendingSubmissions,
  approveTaskSubmission: exports.approveTaskSubmission,
  rejectTaskSubmission: exports.rejectTaskSubmission,
  getSubmissionDetails: exports.getSubmissionDetails
};
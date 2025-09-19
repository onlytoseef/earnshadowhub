const Task = require('../models/Task');
const UserTask = require('../models/UserTask');
const User = require('../models/User');

// ==================== ADMIN TASK MANAGEMENT ====================

// Admin: Create new task
exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      websiteUrl,
      websiteName,
      paymentPerTask,
      planType,
      category,
      estimatedTime,
      requirements,
      instructions,
      maxCompletions,
      expiresAt,
      priority
    } = req.body;

    // Validate admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    // Validate required fields
    if (!title || !description || !websiteUrl || !websiteName || !paymentPerTask || !planType || !instructions) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    const task = await Task.create({
      title,
      description,
      websiteUrl,
      websiteName,
      paymentPerTask,
      planType,
      category: category || 'website-visit',
      estimatedTime,
      requirements,
      instructions,
      maxCompletions,
      expiresAt,
      priority: priority || 'medium',
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create task'
    });
  }
};

// Admin: Get all tasks with filters
exports.getAllTasks = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      planType, 
      category, 
      isActive, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (planType && planType !== 'all') filter.planType = planType;
    if (category && category !== 'all') filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    // Add search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { websiteName: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const tasks = await Task.find(filter)
      .populate('createdBy', 'name email')
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Task.countDocuments(filter);

    // Add completion statistics
    const tasksWithStats = await Promise.all(tasks.map(async (task) => {
      const taskObj = task.toObject();
      const completionStats = await UserTask.aggregate([
        { $match: { task: task._id } },
        { 
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      
      taskObj.completionStats = completionStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {});
      
      return taskObj;
    }));

    res.json({
      success: true,
      tasks: tasksWithStats,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalTasks: total,
        hasNext: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get all tasks error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch tasks'
    });
  }
};

// Admin: Get single task details
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate('createdBy', 'name email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Get task statistics
    const stats = await UserTask.aggregate([
      { $match: { task: task._id } },
      { 
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const taskWithStats = task.toObject();
    taskWithStats.stats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.json({
      success: true,
      task: taskWithStats
    });
  } catch (error) {
    console.error('Get task by ID error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch task'
    });
  }
};

// Admin: Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    // Don't allow updating certain fields
    delete updates.createdBy;
    delete updates.currentCompletions;

    const task = await Task.findByIdAndUpdate(
      id, 
      { ...updates, updatedAt: new Date() }, 
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update task'
    });
  }
};

// Admin: Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if task has any submissions
    const hasSubmissions = await UserTask.exists({ task: id });
    
    if (hasSubmissions) {
      // Don't delete, just deactivate
      task.isActive = false;
      await task.save();
      
      res.json({
        success: true,
        message: 'Task deactivated successfully (has existing submissions)'
      });
    } else {
      // Safe to delete
      await Task.findByIdAndDelete(id);
      
      res.json({
        success: true,
        message: 'Task deleted successfully'
      });
    }
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete task'
    });
  }
};

// Admin: Get tasks by plan type
exports.getTasksByPlan = async (req, res) => {
  try {
    const { planType } = req.params;
    const { isActive = true } = req.query;

    const filter = { planType };
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const tasks = await Task.find(filter)
      .populate('createdBy', 'name email')
      .sort({ priority: -1, createdAt: -1 });

    res.json({
      success: true,
      tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Get tasks by plan error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch tasks by plan'
    });
  }
};

// ==================== USER TASK INTERACTION ====================

// User: Get available tasks for user's plan
exports.getAvailableTasksForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's current plan (assuming it's stored in user model)
    const userPlan = user.planType || 'basic';

    // Get tasks for user's plan that are active and available
    const availableTasks = await Task.find({
      planType: userPlan,
      isActive: true,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ],
      $or: [
        { maxCompletions: null },
        { $expr: { $lt: ['$currentCompletions', '$maxCompletions'] } }
      ]
    }).sort({ priority: -1, createdAt: -1 });

    // Get user's completed/assigned tasks to filter out
    const userTasks = await UserTask.find({
      user: userId
    }).select('task status');

    const userTaskIds = userTasks.map(ut => ut.task.toString());

    // Filter out already assigned/completed tasks
    const newTasks = availableTasks.filter(task => 
      !userTaskIds.includes(task._id.toString())
    );

    res.json({
      success: true,
      tasks: newTasks,
      userPlan,
      totalAvailable: newTasks.length
    });
  } catch (error) {
    console.error('Get available tasks error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch available tasks'
    });
  }
};

// User: Start a task
exports.startTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    // Check if task exists and is available
    const task = await Task.findById(taskId);
    if (!task || !task.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Task not found or not available'
      });
    }

    // Check if user already has this task
    const existingUserTask = await UserTask.findOne({
      user: userId,
      task: taskId
    });

    if (existingUserTask) {
      return res.status(400).json({
        success: false,
        message: 'Task already assigned to user'
      });
    }

    // Create new user task
    const userTask = await UserTask.create({
      user: userId,
      task: taskId,
      status: 'in-progress',
      startedAt: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await userTask.populate('task', 'title websiteUrl websiteName paymentPerTask instructions estimatedTime');

    res.status(201).json({
      success: true,
      message: 'Task started successfully',
      userTask
    });
  } catch (error) {
    console.error('Start task error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to start task'
    });
  }
};

module.exports = {
  createTask: exports.createTask,
  getAllTasks: exports.getAllTasks,
  getTaskById: exports.getTaskById,
  updateTask: exports.updateTask,
  deleteTask: exports.deleteTask,
  getTasksByPlan: exports.getTasksByPlan,
  getAvailableTasksForUser: exports.getAvailableTasksForUser,
  startTask: exports.startTask
};

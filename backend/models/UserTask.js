const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  status: {
    type: String,
    enum: {
      values: ['assigned', 'in-progress', 'pending', 'approved', 'rejected', 'expired'],
      message: 'Invalid status'
    },
    default: 'assigned'
  },
  startedAt: {
    type: Date,
    default: null
  },
  submittedAt: {
    type: Date,
    default: null
  },
  reviewedAt: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  review: {
    rating: {
      type: Number,
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'],
      required: function() {
        return this.status === 'pending' || this.status === 'approved';
      }
    },
    comment: {
      type: String,
      required: function() {
        return this.status === 'pending' || this.status === 'approved';
      },
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    screenshots: [{
      type: String, // URLs to uploaded screenshots
      validate: {
        validator: function(v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Screenshots must be valid URLs'
      }
    }],
    timeSpent: {
      type: Number, // in minutes
      min: [1, 'Time spent must be at least 1 minute']
    }
  },
  earnings: {
    type: Number,
    default: 0,
    min: 0
  },
  adminNotes: {
    type: String,
    maxlength: [300, 'Admin notes cannot exceed 300 characters']
  },
  rejectionReason: {
    type: String,
    maxlength: [200, 'Rejection reason cannot exceed 200 characters'],
    required: function() {
      return this.status === 'rejected';
    }
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  // Automatic expiration after 24 hours if pending
  expiresAt: {
    type: Date,
    default: function() {
      // Auto-expire pending tasks after 24 hours
      if (this.status === 'pending') {
        return new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
      return null;
    }
  }
}, {
  timestamps: true
});

// Ensure one task submission per user per task
userTaskSchema.index({ user: 1, task: 1 }, { unique: true });

// Index for efficient queries
userTaskSchema.index({ user: 1, status: 1 });
userTaskSchema.index({ task: 1, status: 1 });
userTaskSchema.index({ status: 1, submittedAt: 1 });
userTaskSchema.index({ status: 1, expiresAt: 1 });

// Virtual for checking if task submission is expired
userTaskSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date() && this.status === 'pending';
});

// Pre-save middleware to handle status changes
userTaskSchema.pre('save', function(next) {
  const now = new Date();
  
  // Set timestamps based on status changes
  if (this.isModified('status')) {
    switch (this.status) {
      case 'in-progress':
        if (!this.startedAt) this.startedAt = now;
        break;
      case 'pending':
        if (!this.submittedAt) this.submittedAt = now;
        // Set expiration for pending tasks (24 hours)
        if (!this.expiresAt) {
          this.expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        }
        break;
      case 'approved':
        if (!this.reviewedAt) this.reviewedAt = now;
        if (!this.completedAt) this.completedAt = now;
        // Set earnings when approved
        if (this.earnings === 0 && this.task) {
          // This will be populated from the task's paymentPerTask
          // We'll handle this in the controller
        }
        break;
      case 'rejected':
        if (!this.reviewedAt) this.reviewedAt = now;
        this.earnings = 0;
        break;
      case 'expired':
        this.earnings = 0;
        break;
    }
  }
  
  next();
});

// Static method to find expired pending tasks
userTaskSchema.statics.findExpiredPendingTasks = function() {
  return this.find({
    status: 'pending',
    expiresAt: { $lt: new Date() }
  });
};

// Instance method to calculate earnings
userTaskSchema.methods.calculateEarnings = async function() {
  if (this.status === 'approved') {
    const task = await mongoose.model('Task').findById(this.task);
    return task ? task.paymentPerTask : 0;
  }
  return 0;
};

module.exports = mongoose.model('UserTask', userTaskSchema);

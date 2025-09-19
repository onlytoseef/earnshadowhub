const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  websiteUrl: {
    type: String,
    required: [true, 'Website URL is required'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Please enter a valid URL starting with http:// or https://'
    }
  },
  websiteName: {
    type: String,
    required: [true, 'Website name is required'],
    trim: true
  },
  paymentPerTask: {
    type: Number,
    required: [true, 'Payment per task is required'],
    min: [0.01, 'Payment must be at least $0.01'],
    max: [1000, 'Payment cannot exceed $1000']
  },
  planType: {
    type: String,
    required: [true, 'Plan type is required'],
    enum: {
      values: ['basic', 'standard', 'premium', 'vip'],
      message: 'Plan type must be basic, standard, premium, or vip'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['website-visit', 'social-media', 'survey', 'review', 'video-watch', 'other'],
      message: 'Invalid category'
    }
  },
  estimatedTime: {
    type: Number, // in minutes
    required: [true, 'Estimated time is required'],
    min: [1, 'Estimated time must be at least 1 minute'],
    max: [60, 'Estimated time cannot exceed 60 minutes']
  },
  requirements: {
    type: String,
    maxlength: [300, 'Requirements cannot exceed 300 characters']
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required'],
    maxlength: [1000, 'Instructions cannot exceed 1000 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxCompletions: {
    type: Number,
    default: null, // null means unlimited
    min: [1, 'Max completions must be at least 1']
  },
  currentCompletions: {
    type: Number,
    default: 0,
    min: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiresAt: {
    type: Date,
    default: null, // null means no expiration
    validate: {
      validator: function(v) {
        return !v || v > new Date();
      },
      message: 'Expiration date must be in the future'
    }
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true
});

// Virtual for checking if task is expired
taskSchema.virtual('isExpired').get(function() {
  return this.expiresAt && this.expiresAt < new Date();
});

// Virtual for checking if task is available
taskSchema.virtual('isAvailable').get(function() {
  if (!this.isActive || this.isExpired) return false;
  if (this.maxCompletions && this.currentCompletions >= this.maxCompletions) return false;
  return true;
});

// Index for efficient queries
taskSchema.index({ planType: 1, isActive: 1 });
taskSchema.index({ createdBy: 1 });
taskSchema.index({ category: 1, planType: 1 });
taskSchema.index({ expiresAt: 1 });

// Pre-save middleware to update completion count
taskSchema.pre('save', function(next) {
  if (this.maxCompletions && this.currentCompletions > this.maxCompletions) {
    this.isActive = false;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);

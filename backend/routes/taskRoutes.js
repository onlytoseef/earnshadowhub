const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Controllers
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByPlan,
  getAvailableTasksForUser,
  startTask
} = require('../controllers/taskController');
const {
  submitTaskReview,
  getUserTasks,
  getPendingSubmissions,
  approveTaskSubmission,
  rejectTaskSubmission,
  getSubmissionDetails
} = require('../controllers/taskSubmissionController');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads', 'screenshots');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

// Admin routes
router.post('/admin/create', authMiddleware, isAdmin, createTask);
router.get('/admin/all', authMiddleware, isAdmin, getAllTasks);
router.get('/admin/task/:id', authMiddleware, isAdmin, getTaskById);
router.patch('/admin/task/:id', authMiddleware, isAdmin, updateTask);
router.delete('/admin/task/:id', authMiddleware, isAdmin, deleteTask);
router.get('/admin/plan/:planType', authMiddleware, isAdmin, getTasksByPlan);

router.get('/admin/submissions/pending', authMiddleware, isAdmin, getPendingSubmissions);
router.get('/admin/submission/:submissionId', authMiddleware, isAdmin, getSubmissionDetails);
router.patch('/admin/submission/:submissionId/approve', authMiddleware, isAdmin, approveTaskSubmission);
router.patch('/admin/submission/:submissionId/reject', authMiddleware, isAdmin, rejectTaskSubmission);

// User routes
router.get('/available', authMiddleware, getAvailableTasksForUser);
router.post('/start/:taskId', authMiddleware, startTask);
router.get('/my-tasks', authMiddleware, getUserTasks);
router.post('/submit/:taskId', authMiddleware, upload.array('screenshots', 5), submitTaskReview);

// Utilities
router.get('/plan-types', (req, res) => {
  res.json({
    success: true,
    planTypes: [
      { value: 'basic', label: 'Basic Plan' },
      { value: 'standard', label: 'Standard Plan' },
      { value: 'premium', label: 'Premium Plan' },
      { value: 'vip', label: 'VIP Plan' }
    ]
  });
});

router.get('/categories', (req, res) => res.json({ success: true, categories: ['website-visit','social-media','survey','review','video-watch','other'] }));

router.get('/health', (req, res) => res.json({ success: true, message: 'Task management system is running' }));

module.exports = router;
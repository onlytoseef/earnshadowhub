import axios, { AxiosRequestConfig } from 'axios';
import { 
  Task, 
  TaskSubmission, 
  CreateTaskDto, 
  TaskReviewDto,
  ApiResponse,
  PaginatedResponse,
  TaskFilterParams
} from '../types/task.types';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Task Management APIs
export const taskApi = {
  // Admin APIs
  createTask: async (taskData) => {
    const response = await api.post('/tasks/admin/create', taskData);
    return response.data;
  },

  getAllTasks: async (params = {}) => {
    const response = await api.get('/tasks/admin/all', { params });
    return response.data;
  },

  updateTask: async (taskId, taskData) => {
    const response = await api.patch(`/tasks/admin/task/${taskId}`, taskData);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/admin/task/${taskId}`);
    return response.data;
  },

  getTasksByPlan: async (planType) => {
    const response = await api.get(`/tasks/admin/plan/${planType}`);
    return response.data;
  },

  getPendingSubmissions: async (params = {}) => {
    const response = await api.get('/tasks/admin/submissions/pending', { params });
    return response.data;
  },

  approveSubmission: async (submissionId, data) => {
    const response = await api.patch(`/tasks/admin/submission/${submissionId}/approve`, data);
    return response.data;
  },

  rejectSubmission: async (submissionId, data) => {
    const response = await api.patch(`/tasks/admin/submission/${submissionId}/reject`, data);
    return response.data;
  },

  // Customer APIs
  getAvailableTasks: async (params = {}) => {
    const response = await api.get('/tasks/available', { params });
    return response.data;
  },

  startTask: async (taskId) => {
    const response = await api.post(`/tasks/start/${taskId}`);
    return response.data;
  },

  submitTaskReview: async (taskId, reviewData) => {
    const response = await api.post(`/tasks/submit/${taskId}`, reviewData);
    return response.data;
  },

  getUserTasks: async (params = {}) => {
    const response = await api.get('/tasks/my-tasks', { params });
    return response.data;
  }
};

// Plan Types
export const PLAN_TYPES = ['basic', 'standard', 'premium', 'vip'];

// Task Categories
export const TASK_CATEGORIES = [
  { value: 'website-visit', label: 'Website Visit' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'survey', label: 'Survey' },
  { value: 'review', label: 'Review' },
  { value: 'video-watch', label: 'Video Watch' }
];

// Task Statuses
export const TASK_STATUS = {
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in-progress',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired'
};
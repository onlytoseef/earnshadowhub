export interface Task {
  _id: string;
  title: string;
  description: string;
  websiteUrl: string;
  websiteName: string;
  paymentPerTask: number;
  planType: 'basic' | 'standard' | 'premium' | 'vip';
  category: string;
  estimatedTime?: number;
  requirements?: string[];
  instructions: string;
  maxCompletions?: number;
  currentCompletions: number;
  isActive: boolean;
  expirationHours?: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskSubmission {
  _id: string;
  user: string;
  task: string | Task;
  status: 'assigned' | 'in-progress' | 'pending' | 'approved' | 'rejected' | 'expired';
  assignedAt: string;
  startedAt?: string;
  submittedAt?: string;
  reviewedAt?: string;
  completedAt?: string;
  expiresAt?: string;
  review?: {
    rating: number;
    comment: string;
    visitDuration: number;
  };
  completionProof?: string;
  earnings?: number;
  adminNotes?: string;
  rejectionReason?: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  websiteUrl: string;
  websiteName: string;
  paymentPerTask: number;
  planType: 'basic' | 'standard' | 'premium' | 'vip';
  category: string;
  estimatedTime?: number;
  requirements?: string[];
  instructions: string;
  maxCompletions?: number;
  expirationHours?: number;
  priority?: 'low' | 'medium' | 'high';
}

export interface TaskReviewDto {
  review: {
    rating: number;
    comment: string;
    visitDuration: number;
  };
  completionProof?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface TaskFilterParams {
  page?: number;
  limit?: number;
  planType?: string;
  category?: string;
  isActive?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
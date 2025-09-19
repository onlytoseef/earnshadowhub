import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskRtkApi = createApi({
  reducerPath: 'taskRtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/tasks' }),
  tagTypes: ['Tasks', 'UserTasks', 'Submissions', 'PlanTypes'],
  endpoints: (builder) => ({
    getPlanTypes: builder.query<any, void>({
      query: () => '/plan-types',
      providesTags: ['PlanTypes']
    }),
    createTask: builder.mutation<any, any>({
      query: (body) => ({ url: '/admin/create', method: 'POST', body }),
      invalidatesTags: ['Tasks']
    }),
    getTasksByPlan: builder.query<any, string>({
      query: (plan) => `/admin/plan/${plan}`,
      providesTags: ['Tasks']
    }),
    getAvailableTasks: builder.query<any, void>({
      query: () => '/available',
      providesTags: ['Tasks']
    }),
    startTask: builder.mutation<any, string>({
      query: (taskId) => ({ url: `/start/${taskId}`, method: 'POST' })
    }),
    submitReview: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/submit/${formData.get('taskId')}`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['UserTasks', 'Submissions']
    }),
    getUserTasks: builder.query<any, void>({
      query: () => '/my-tasks',
      providesTags: ['UserTasks']
    }),
    getPendingSubmissions: builder.query<any, void>({
      query: () => '/admin/submissions/pending',
      providesTags: ['Submissions']
    }),
    approveSubmission: builder.mutation<any, { submissionId: string; adminNotes?: string }>({
      query: ({ submissionId, adminNotes }) => ({
        url: `/admin/submission/${submissionId}/approve`,
        method: 'PATCH',
        body: { adminNotes }
      }),
      invalidatesTags: ['Submissions', 'UserTasks']
    }),
    rejectSubmission: builder.mutation<any, { submissionId: string; rejectionReason: string; adminNotes?: string }>({
      query: ({ submissionId, rejectionReason, adminNotes }) => ({
        url: `/admin/submission/${submissionId}/reject`,
        method: 'PATCH',
        body: { rejectionReason, adminNotes }
      }),
      invalidatesTags: ['Submissions']
    })
  })
});

export const {
  useGetPlanTypesQuery,
  useCreateTaskMutation,
  useGetTasksByPlanQuery,
  useGetAvailableTasksQuery,
  useStartTaskMutation,
  useSubmitReviewMutation,
  useGetUserTasksQuery,
  useGetPendingSubmissionsQuery,
  useApproveSubmissionMutation,
  useRejectSubmissionMutation
} = taskRtkApi;

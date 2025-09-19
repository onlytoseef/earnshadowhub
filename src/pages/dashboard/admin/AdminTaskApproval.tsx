import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Search, Filter, CheckCircle, XCircle, Clock, Eye, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetPendingSubmissionsQuery, useApproveSubmissionMutation, useRejectSubmissionMutation } from '../../../services/taskRtkApi';

interface TaskSubmission {
  _id: string;
  task: any;
  user: any;
  submittedAt: string;
  status: string;
  review: any;
}

const AdminTaskApproval: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const { data, isLoading, refetch } = useGetPendingSubmissionsQuery();
  const [approveSubmission] = useApproveSubmissionMutation();
  const [rejectSubmission] = useRejectSubmissionMutation();

  const submissions: TaskSubmission[] = data?.submissions || [];

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || submission.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApprove = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? { ...sub, status: 'approved' as const } : sub
    ));
    toast.success('Task submission approved!');
  };

  const handleReject = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? { ...sub, status: 'rejected' as const } : sub
    ));
    toast.success('Task submission rejected');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const categories = ['Data Entry', 'Social Media', 'Content Writing', 'Survey', 'App Testing', 'Research'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Approval</h1>
          <p className="text-gray-600">Review and approve task submissions</p>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
          <ClipboardCheck className="h-5 w-5" />
          <span className="font-medium">{submissions.filter(s => s.status === 'pending').length} Pending</span>
        </div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission, index) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{submission.taskTitle}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                    {getStatusIcon(submission.status)}
                    <span className="ml-1">{submission.status}</span>
                  </span>
                  <span className="text-sm text-gray-500">Task ID: {submission.taskId}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Submitted by</p>
                    <p className="text-sm text-gray-900">{submission.userName}</p>
                    <p className="text-sm text-gray-500">{submission.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="text-sm text-gray-900">{submission.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reward</p>
                    <p className="text-sm font-semibold text-green-600">${submission.reward.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Submission Description</p>
                  <p className="text-sm text-gray-700">{submission.description}</p>
                </div>

                {submission.attachments.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Attachments</p>
                    <div className="flex flex-wrap gap-2">
                      {submission.attachments.map((attachment, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                          {attachment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  Submitted on {new Date(submission.submittedAt).toLocaleString()}
                </p>
              </div>

              {submission.status === 'pending' && (
                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => toast('View submission details', { icon: '👁️' })}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => toast('Contact user', { icon: '💬' })}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await rejectSubmission({ submissionId: submission._id, rejectionReason: 'Invalid submission' }).unwrap();
                        toast.success('Task submission rejected');
                        refetch();
                      } catch (e: any) {
                        toast.error(e.data?.message || 'Failed to reject');
                      }
                    }}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await approveSubmission({ submissionId: submission._id }).unwrap();
                        toast.success('Task submission approved!');
                        refetch();
                      } catch (e: any) {
                        toast.error(e.data?.message || 'Failed to approve');
                      }
                    }}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
        >
          <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {submissions.filter(s => s.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {submissions.filter(s => s.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {submissions.filter(s => s.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTaskApproval;
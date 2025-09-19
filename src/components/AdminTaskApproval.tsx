import { useState, useEffect } from 'react';
import { taskApi } from '../services/taskApi';
import type { TaskSubmission } from '../types/task.types';

const AdminTaskApproval = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState<TaskSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPendingSubmissions = async () => {
    setLoading(true);
    try {
      const response = await taskApi.getPendingSubmissions({ page, limit: 10 });
      setPendingSubmissions(response.submissions);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingSubmissions();
  }, [page]);

  const handleApprove = async (submissionId: string) => {
    try {
      await taskApi.approveSubmission(submissionId, { adminNotes });
      await fetchPendingSubmissions();
      setAdminNotes('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to approve submission');
    }
  };

  const handleReject = async (submissionId: string, reason: string) => {
    try {
      await taskApi.rejectSubmission(submissionId, { 
        rejectionReason: reason,
        adminNotes
      });
      await fetchPendingSubmissions();
      setAdminNotes('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reject submission');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Task Reviews</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading submissions...</p>
      ) : (
        <div className="space-y-6">
          {pendingSubmissions.map(submission => (
            <div key={submission._id} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {typeof submission.task === 'object' ? submission.task.title : 'Loading...'}
                  </h3>
                  <p className="text-gray-600">
                    Submitted: {new Date(submission.submittedAt || '').toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">User: {submission.user}</p>
                  <p className="text-sm text-gray-500">
                    Time Spent: {submission.review?.visitDuration} mins
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <div className="mb-2">
                  <span className="font-medium">Rating:</span>{' '}
                  {submission.review?.rating} / 5
                </div>
                <div>
                  <span className="font-medium">Review:</span>
                  <p className="mt-1 whitespace-pre-line">{submission.review?.comment}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleReject(submission._id, 'Review does not meet requirements')}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(submission._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTaskApproval;
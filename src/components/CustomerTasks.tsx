import { useState, useEffect } from 'react';
import { useGetAvailableTasksQuery, useStartTaskMutation, useSubmitReviewMutation, useGetUserTasksQuery } from '../services/taskRtkApi';
import type { Task, TaskSubmission } from '../types/task.types';

const CustomerTasks = () => {
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [myTasks, setMyTasks] = useState<TaskSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
    visitDuration: 0
  });

  const { data: availableData, isLoading: availableLoading, refetch: refetchAvailable } = useGetAvailableTasksQuery();
  const { data: myTasksData, isLoading: myTasksLoading, refetch: refetchMy } = useGetUserTasksQuery();
  const [startTask] = useStartTaskMutation();
  const [submitReview] = useSubmitReviewMutation();

  useEffect(() => {
    if (availableData?.tasks) setAvailableTasks(availableData.tasks);
    if (myTasksData?.tasks) setMyTasks(myTasksData.tasks);
  }, [availableData, myTasksData]);

  // Start a task
  const handleStartTask = async (taskId: string) => {
    try {
      await startTask(taskId).unwrap();
      setActiveTaskId(taskId);
      refetchAvailable();
      refetchMy();
    } catch (err: any) {
      setError(err.data?.message || 'Failed to start task');
    }
  };

  // Submit task review
  const [fileInput, setFileInput] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFileInput(e.target.files[0]);
  };

  const handleSubmitReview = async (taskId: string) => {
    if (reviewData.comment.trim().length < 20) {
      setError('Review must be at least 20 characters');
      return;
    }

    try {
      const form = new FormData();
      form.append('taskId', taskId);
      form.append('comment', reviewData.comment);
      form.append('rating', String(reviewData.rating));
      form.append('timeSpent', String(reviewData.visitDuration));
      if (fileInput) form.append('screenshots', fileInput);

      await submitReview(form).unwrap();
      setActiveTaskId(null);
      setReviewData({ rating: 5, comment: '', visitDuration: 0 });
      setFileInput(null);
      refetchAvailable();
      refetchMy();
    } catch (err: any) {
      setError(err.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Available Tasks */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableTasks.map(task => (
              <div key={task._id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>Payment: ${task.paymentPerTask}</span>
                  <span>{task.estimatedTime || 5} mins</span>
                </div>
                <button
                  onClick={() => handleStartTask(task._id)}
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Start Task
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Active Task */}
      {activeTaskId && (
        <section className="mb-8 border-2 border-indigo-500 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Current Task</h2>
          {availableTasks.filter(t => t._id === activeTaskId).map(task => (
            <div key={task._id}>
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Instructions:</h4>
                <p className="whitespace-pre-line">{task.instructions}</p>
              </div>
              <div className="mb-4">
                <a
                  href={task.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Visit Website →
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={reviewData.rating}
                    onChange={e => setReviewData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Review Comment</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={e => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Time Spent (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    value={reviewData.visitDuration}
                    onChange={e => setReviewData(prev => ({ ...prev, visitDuration: Number(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={() => handleSubmitReview(task._id)}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Submit Review
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* My Tasks History */}
      <section>
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myTasks.map(task => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {typeof task.task === 'object' ? task.task.title : 'Loading...'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${task.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        task.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.submittedAt ? new Date(task.submittedAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.earnings ? `$${task.earnings}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CustomerTasks;
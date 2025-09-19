import { useState } from 'react';
import { useGetPlanTypesQuery, useCreateTaskMutation } from '../services/taskRtkApi';

const AdminAddTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    websiteUrl: '',
    websiteName: '',
    paymentPerTask: 0,
    planType: 'basic',
    category: 'website-visit',
    instructions: '',
    estimatedTime: 0,
    maxCompletions: 100,
    expirationHours: 24
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: planTypesData } = useGetPlanTypesQuery();
  const [createTask] = useCreateTaskMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createTask(formData).unwrap();
      setSuccess('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        websiteUrl: '',
        websiteName: '',
        paymentPerTask: 0,
        planType: 'basic',
        category: 'website-visit',
        instructions: '',
        estimatedTime: 0,
        maxCompletions: 100,
        expirationHours: 24
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Task</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Task Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Website URL</label>
              <input
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Website Name</label>
              <input
                type="text"
                name="websiteName"
                value={formData.websiteName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Task Configuration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Plan Type</label>
              <select
                name="planType"
                value={formData.planType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                {(planTypesData?.planTypes || [
                  { value: 'basic', label: 'Basic Plan' },
                  { value: 'standard', label: 'Standard Plan' },
                  { value: 'premium', label: 'Premium Plan' },
                  { value: 'vip', label: 'VIP Plan' }
                ]).map((p: any) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Payment per Task ($)</label>
              <input
                type="number"
                name="paymentPerTask"
                value={formData.paymentPerTask}
                onChange={handleChange}
                min="0.1"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="website-visit">Website Visit</option>
                <option value="social-media">Social Media</option>
                <option value="survey">Survey</option>
                <option value="review">Review</option>
                <option value="video-watch">Video Watch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Estimated Time (minutes)</label>
              <input
                type="number"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Max Completions</label>
              <input
                type="number"
                name="maxCompletions"
                value={formData.maxCompletions}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Expiration (hours)</label>
              <input
                type="number"
                name="expirationHours"
                value={formData.expirationHours}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setFormData({
              title: '',
              description: '',
              websiteUrl: '',
              websiteName: '',
              paymentPerTask: 0,
              planType: 'basic',
              category: 'website-visit',
              instructions: '',
              estimatedTime: 0,
              maxCompletions: 100,
              expirationHours: 24
            })}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddTask;
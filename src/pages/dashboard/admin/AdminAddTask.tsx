import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useGetPlanTypesQuery, useCreateTaskMutation } from '../../../services/taskRtkApi';

const AdminAddTask: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    websiteUrl: '',
    description: '',
    planType: 'basic'
  });

  const { data: planTypesData } = useGetPlanTypesQuery();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask({
        title: formData.title,
        description: formData.description,
        websiteUrl: formData.websiteUrl,
        websiteName: formData.title,
        paymentPerTask: 0.01,
        planType: formData.planType,
        instructions: formData.description
      }).unwrap();
      toast.success('Task created');
      setFormData({ title: '', websiteUrl: '', description: '', planType: 'basic' });
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to create task');
    }
  };

  const plans = planTypesData?.planTypes || [
    { value: 'basic', label: 'Basic' },
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'vip', label: 'VIP' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Task</h1>
          <p className="text-gray-600">Create a task (title, website, description, plan)</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Website URL</label>
            <input name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} type="url" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Plan</label>
            <select name="planType" value={formData.planType} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3">
              {plans.map((p: any) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-4 py-2 rounded-md">{isLoading ? 'Creating...' : 'Create Task'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminAddTask;
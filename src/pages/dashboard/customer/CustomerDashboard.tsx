import React from 'react';
import AuthService from '../../../services/authService';

const CustomerDashboard: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

  // Dummy data for customer dashboard
  const dashboardData = {
    currentPlan: {
      name: 'Premium Plan',
      price: '$99',
      validity: '30 days',
      daysLeft: 15,
      tasksPerDay: 10,
      earningsPerTask: '$2'
    },
    stats: {
      totalEarnings: 245.50,
      pendingEarnings: 28.00,
      completedTasks: 142,
      referrals: 8
    },
    recentTasks: [
      { id: 1, title: 'Visit Business Website A', reward: '$2.00', status: 'Completed' },
      { id: 2, title: 'Social Media Engagement B', reward: '$1.50', status: 'Pending' },
      { id: 3, title: 'Review Product C', reward: '$3.00', status: 'Completed' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
        <p className="text-blue-100">Here's your earning overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${dashboardData.stats.totalEarnings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${dashboardData.stats.pendingEarnings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.completedTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">🤝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.referrals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Plan & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan Name:</span>
              <span className="font-medium text-gray-900">{dashboardData.currentPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium text-gray-900">{dashboardData.currentPlan.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Validity:</span>
              <span className="font-medium text-gray-900">{dashboardData.currentPlan.validity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Days Left:</span>
              <span className="font-medium text-green-600">{dashboardData.currentPlan.daysLeft} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tasks Per Day:</span>
              <span className="font-medium text-gray-900">{dashboardData.currentPlan.tasksPerDay}</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Upgrade Plan
          </button>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {dashboardData.recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">Reward: {task.reward}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  task.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
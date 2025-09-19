import React from 'react';

const AdminDashboard: React.FC = () => {
  const dashboardStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalTasks: 543,
    pendingApprovals: 28,
    totalRevenue: 15420.50,
    monthlyRevenue: 4280.00,
    pendingWithdrawals: 12,
    completedTasks: 2156
  };

  const recentActivities = [
    { id: 1, type: 'New User', description: 'John Smith registered', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'Task Submitted', description: 'Website visit task completed by Emily', time: '5 minutes ago', status: 'pending' },
    { id: 3, type: 'Withdrawal Request', description: '$50 withdrawal by Michael Brown', time: '15 minutes ago', status: 'warning' },
    { id: 4, type: 'Plan Purchase', description: 'Premium plan purchased by Sarah Davis', time: '30 minutes ago', status: 'success' },
    { id: 5, type: 'Task Approved', description: 'Social media task approved', time: '1 hour ago', status: 'success' }
  ];

  const topPerformers = [
    { id: 1, name: 'Alice Johnson', tasks: 45, earnings: 135.00, level: 'VIP' },
    { id: 2, name: 'Bob Wilson', tasks: 38, earnings: 114.00, level: 'Premium' },
    { id: 3, name: 'Carol Brown', tasks: 32, earnings: 96.00, level: 'Premium' },
    { id: 4, name: 'David Lee', tasks: 28, earnings: 84.00, level: 'Basic' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'New User': return '👤';
      case 'Task Submitted': return '📝';
      case 'Withdrawal Request': return '💸';
      case 'Plan Purchase': return '💳';
      case 'Task Approved': return '✅';
      default: return '📊';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'pending': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100">Manage your EarnShadow platform with ease.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.pendingApprovals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${dashboardStats.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h2>
          <div className="space-y-3">
            {topPerformers.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.tasks} tasks • ${user.earnings}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  user.level === 'VIP' ? 'bg-purple-100 text-purple-800' :
                  user.level === 'Premium' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <div className="text-blue-600 text-2xl mb-2">➕</div>
            <h3 className="font-medium text-blue-900">Add New Task</h3>
            <p className="text-sm text-blue-700">Create a new task for users</p>
          </button>
          
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-left">
            <div className="text-green-600 text-2xl mb-2">✅</div>
            <h3 className="font-medium text-green-900">Approve Tasks</h3>
            <p className="text-sm text-green-700">{dashboardStats.pendingApprovals} pending approvals</p>
          </button>
          
          <button className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors text-left">
            <div className="text-yellow-600 text-2xl mb-2">💸</div>
            <h3 className="font-medium text-yellow-900">Process Withdrawals</h3>
            <p className="text-sm text-yellow-700">{dashboardStats.pendingWithdrawals} pending requests</p>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <div className="text-purple-600 text-2xl mb-2">📊</div>
            <h3 className="font-medium text-purple-900">View Reports</h3>
            <p className="text-sm text-purple-700">Analytics and insights</p>
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">${dashboardStats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">${dashboardStats.monthlyRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">{dashboardStats.completedTasks.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Tasks Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
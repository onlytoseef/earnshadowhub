import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Search, Filter, Eye, Calendar, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  type: 'login' | 'logout' | 'task' | 'withdrawal' | 'profile' | 'payment';
}

const AdminUserHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('7d');

  // Dummy data
  const activities: UserActivity[] = [
    {
      id: '1',
      userId: 'U001',
      userName: 'John Doe',
      action: 'User Login',
      description: 'Successfully logged in to dashboard',
      timestamp: '2024-01-20T10:30:00Z',
      ip: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      type: 'login'
    },
    {
      id: '2',
      userId: 'U002',
      userName: 'Jane Smith',
      action: 'Task Completed',
      description: 'Completed task: Data Entry - Customer Information',
      timestamp: '2024-01-20T09:15:00Z',
      ip: '192.168.1.101',
      userAgent: 'Firefox/121.0.0',
      type: 'task'
    },
    {
      id: '3',
      userId: 'U003',
      userName: 'Mike Johnson',
      action: 'Withdrawal Request',
      description: 'Requested withdrawal of $75.00 via Bitcoin',
      timestamp: '2024-01-19T16:45:00Z',
      ip: '192.168.1.102',
      userAgent: 'Safari/17.0',
      type: 'withdrawal'
    },
    {
      id: '4',
      userId: 'U001',
      userName: 'John Doe',
      action: 'Profile Updated',
      description: 'Updated profile information and payment details',
      timestamp: '2024-01-19T14:20:00Z',
      ip: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      type: 'profile'
    },
    {
      id: '5',
      userId: 'U004',
      userName: 'Sarah Wilson',
      action: 'Plan Purchase',
      description: 'Purchased Premium plan for $49.99',
      timestamp: '2024-01-18T11:30:00Z',
      ip: '192.168.1.103',
      userAgent: 'Edge/120.0.0.0',
      type: 'payment'
    },
    {
      id: '6',
      userId: 'U002',
      userName: 'Jane Smith',
      action: 'User Logout',
      description: 'Successfully logged out from dashboard',
      timestamp: '2024-01-18T10:00:00Z',
      ip: '192.168.1.101',
      userAgent: 'Firefox/121.0.0',
      type: 'logout'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    
    // Date filtering
    const activityDate = new Date(activity.timestamp);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let matchesDate = true;
    switch (dateFilter) {
      case '1d': matchesDate = daysDiff <= 1; break;
      case '7d': matchesDate = daysDiff <= 7; break;
      case '30d': matchesDate = daysDiff <= 30; break;
      case '90d': matchesDate = daysDiff <= 90; break;
    }
    
    return matchesSearch && matchesType && matchesDate;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'login': return 'bg-green-100 text-green-800';
      case 'logout': return 'bg-gray-100 text-gray-800';
      case 'task': return 'bg-blue-100 text-blue-800';
      case 'withdrawal': return 'bg-orange-100 text-orange-800';
      case 'profile': return 'bg-purple-100 text-purple-800';
      case 'payment': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return '🔐';
      case 'logout': return '🚪';
      case 'task': return '✅';
      case 'withdrawal': return '💰';
      case 'profile': return '👤';
      case 'payment': return '💳';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User History</h1>
          <p className="text-gray-600">Track all user activities and actions</p>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
          <History className="h-5 w-5" />
          <span className="font-medium">{filteredActivities.length} Activities</span>
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
              placeholder="Search activities..."
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
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Types</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="task">Task</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="profile">Profile</option>
                <option value="payment">Payment</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="1d">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activities List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{activity.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{activity.userName}</div>
                      <div className="text-sm text-gray-500">ID: {activity.userId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(activity.type)}`}>
                      <span className="mr-1">{getTypeIcon(activity.type)}</span>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{new Date(activity.timestamp).toLocaleDateString()}</div>
                      <div className="text-gray-500">{new Date(activity.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div>IP: {activity.ip}</div>
                      <div className="truncate max-w-32">{activity.userAgent}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toast('View activity details', { icon: '👁️' })}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
      >
        {['login', 'logout', 'task', 'withdrawal', 'profile', 'payment'].map((type) => {
          const count = activities.filter(a => a.type === type).length;
          return (
            <div key={type} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl mb-1">{getTypeIcon(type)}</div>
              <div className="text-xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-500 capitalize">{type}</div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AdminUserHistory;
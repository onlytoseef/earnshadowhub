import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Calendar, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminSalesTracking: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Dummy data
  const salesData = {
    totalRevenue: 45250.75,
    totalUsers: 1247,
    activeUsers: 892,
    conversionRate: 12.5,
    revenueGrowth: 8.3,
    userGrowth: 15.2
  };

  const recentSales = [
    { id: 1, user: 'John Doe', plan: 'Premium', amount: 49.99, date: '2024-01-20' },
    { id: 2, user: 'Jane Smith', plan: 'Pro', amount: 29.99, date: '2024-01-20' },
    { id: 3, user: 'Mike Johnson', plan: 'Basic', amount: 9.99, date: '2024-01-19' },
    { id: 4, user: 'Sarah Wilson', plan: 'Premium', amount: 49.99, date: '2024-01-19' },
    { id: 5, user: 'David Brown', plan: 'Pro', amount: 29.99, date: '2024-01-18' }
  ];

  const topPlans = [
    { name: 'Premium', sales: 156, revenue: 7794.44, percentage: 45 },
    { name: 'Pro', sales: 89, revenue: 2669.11, percentage: 28 },
    { name: 'Basic', sales: 234, revenue: 2338.66, percentage: 27 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Tracking</h1>
          <p className="text-gray-600">Monitor revenue and sales performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${salesData.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">+{salesData.revenueGrowth}%</span>
              </div>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{salesData.totalUsers.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">+{salesData.userGrowth}%</span>
              </div>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{salesData.activeUsers}</p>
              <p className="text-sm text-gray-500">{((salesData.activeUsers / salesData.totalUsers) * 100).toFixed(1)}% of total</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{salesData.conversionRate}%</p>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sale.user}</p>
                  <p className="text-sm text-gray-500">{sale.plan} Plan</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${sale.amount}</p>
                  <p className="text-sm text-gray-500">{new Date(sale.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Plans</h3>
          <div className="space-y-4">
            {topPlans.map((plan, index) => (
              <div key={plan.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{plan.name}</span>
                  <span className="text-sm text-gray-500">{plan.sales} sales</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-green-600' : 'bg-purple-600'
                      }`}
                      style={{ width: `${plan.percentage}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-gray-900">${plan.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sales Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Revenue chart visualization would go here</p>
            <p className="text-sm text-gray-400">Integration with chart library needed</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSalesTracking;
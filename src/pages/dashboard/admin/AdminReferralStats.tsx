import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, DollarSign, TrendingUp, Award, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReferralData {
  userId: string;
  userName: string;
  userEmail: string;
  totalReferrals: number;
  activeReferrals: number;
  totalCommission: number;
  monthlyCommission: number;
  joinDate: string;
  referralCode: string;
}

interface ReferralActivity {
  id: string;
  referrerId: string;
  referrerName: string;
  referredId: string;
  referredName: string;
  commission: number;
  date: string;
  status: 'pending' | 'paid';
}

const AdminReferralStats: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Dummy data
  const [referralStats] = useState<ReferralData[]>([
    {
      userId: 'U001',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      totalReferrals: 25,
      activeReferrals: 18,
      totalCommission: 375.50,
      monthlyCommission: 89.25,
      joinDate: '2024-01-15',
      referralCode: 'JOHN123'
    },
    {
      userId: 'U002',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      totalReferrals: 18,
      activeReferrals: 15,
      totalCommission: 267.75,
      monthlyCommission: 67.50,
      joinDate: '2024-01-10',
      referralCode: 'JANE456'
    },
    {
      userId: 'U003',
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      totalReferrals: 12,
      activeReferrals: 9,
      totalCommission: 178.25,
      monthlyCommission: 45.75,
      joinDate: '2024-01-05',
      referralCode: 'MIKE789'
    }
  ]);

  const [recentActivity] = useState<ReferralActivity[]>([
    {
      id: '1',
      referrerId: 'U001',
      referrerName: 'John Doe',
      referredId: 'U005',
      referredName: 'Alex Wilson',
      commission: 15.00,
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: '2',
      referrerId: 'U002',
      referrerName: 'Jane Smith',
      referredId: 'U006',
      referredName: 'Emma Davis',
      commission: 12.50,
      date: '2024-01-19',
      status: 'paid'
    },
    {
      id: '3',
      referrerId: 'U001',
      referrerName: 'John Doe',
      referredId: 'U007',
      referredName: 'David Brown',
      commission: 20.00,
      date: '2024-01-18',
      status: 'paid'
    }
  ]);

  const totalStats = {
    totalReferrers: referralStats.length,
    totalReferrals: referralStats.reduce((sum, stat) => sum + stat.totalReferrals, 0),
    totalCommissions: referralStats.reduce((sum, stat) => sum + stat.totalCommission, 0),
    monthlyCommissions: referralStats.reduce((sum, stat) => sum + stat.monthlyCommission, 0)
  };

  const copyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Referral code copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referral Statistics</h1>
          <p className="text-gray-600">Monitor referral program performance</p>
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

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Referrers</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalReferrers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Share2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalReferrals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Commissions</p>
              <p className="text-2xl font-bold text-gray-900">${totalStats.totalCommissions.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Commissions</p>
              <p className="text-2xl font-bold text-gray-900">${totalStats.monthlyCommissions.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Referrers</h3>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          
          <div className="space-y-4">
            {referralStats
              .sort((a, b) => b.totalReferrals - a.totalReferrals)
              .map((referrer, index) => (
                <div key={referrer.userId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{referrer.userName}</p>
                      <p className="text-sm text-gray-500">{referrer.userEmail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{referrer.totalReferrals} referrals</p>
                    <p className="text-sm text-green-600">${referrer.totalCommission.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Recent Referral Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.referrerName}</span> referred{' '}
                    <span className="font-medium">{activity.referredName}</span>
                  </p>
                  <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${activity.commission.toFixed(2)}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    activity.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Referrer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Referrers</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referral Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Referrals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Referrals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referralStats.map((referrer) => (
                <tr key={referrer.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{referrer.userName}</div>
                      <div className="text-sm text-gray-500">{referrer.userEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {referrer.referralCode}
                      </span>
                      <button
                        onClick={() => copyReferralCode(referrer.referralCode)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy code"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {referrer.totalReferrals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {referrer.activeReferrals}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${referrer.totalCommission.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    ${referrer.monthlyCommission.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toast('View referrer details', { icon: '👁️' })}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminReferralStats;
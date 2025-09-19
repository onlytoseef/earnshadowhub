import React, { useState } from 'react';

const CustomerReferral: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const referralData = {
    referralCode: 'EARN2024XYZ',
    referralLink: 'https://earnshadow.com/signup?ref=EARN2024XYZ',
    totalReferrals: 8,
    activeReferrals: 6,
    totalEarnings: 125.00,
    pendingEarnings: 25.00,
    commissionRate: 15 // percentage
  };

  const referralHistory = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      joinDate: '2024-09-10',
      status: 'Active',
      planPurchased: 'Premium Plan',
      earnings: 15.00,
      level: 'Level 2'
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.j@example.com',
      joinDate: '2024-09-08',
      status: 'Active',
      planPurchased: 'Basic Plan',
      earnings: 4.35,
      level: 'Level 1'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'mike.brown@example.com',
      joinDate: '2024-09-05',
      status: 'Active',
      planPurchased: 'VIP Plan',
      earnings: 29.85,
      level: 'Level 3'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      email: 'sarah.d@example.com',
      joinDate: '2024-09-03',
      status: 'Inactive',
      planPurchased: 'Premium Plan',
      earnings: 15.00,
      level: 'Level 1'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@example.com',
      joinDate: '2024-08-28',
      status: 'Active',
      planPurchased: 'Premium Plan',
      earnings: 15.00,
      level: 'Level 2'
    }
  ];

  const monthlyStats = [
    { month: 'September', referrals: 4, earnings: 64.20 },
    { month: 'August', referrals: 3, earnings: 45.00 },
    { month: 'July', referrals: 1, earnings: 15.80 }
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Level 1':
        return 'bg-gray-100 text-gray-800';
      case 'Level 2':
        return 'bg-blue-100 text-blue-800';
      case 'Level 3':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Referral Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Referrals</p>
              <p className="text-2xl font-bold">{referralData.totalReferrals}</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Active Referrals</p>
              <p className="text-2xl font-bold">{referralData.activeReferrals}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Earnings</p>
              <p className="text-2xl font-bold">${referralData.totalEarnings.toFixed(2)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending Earnings</p>
              <p className="text-2xl font-bold">${referralData.pendingEarnings.toFixed(2)}</p>
            </div>
            <div className="text-3xl">⏳</div>
          </div>
        </div>
      </div>

      {/* Referral Tools */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Referral Tools</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Referral Code */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Referral Code</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={referralData.referralCode}
                  readOnly
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                />
                <button
                  onClick={() => copyToClipboard(referralData.referralCode, 'code')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Referral Link</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={referralData.referralLink}
                  readOnly
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(referralData.referralLink, 'link')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {copySuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                ✅ Copied to clipboard!
              </div>
            )}
          </div>

          {/* Commission Info */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-2">Commission Structure</h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li>• Earn {referralData.commissionRate}% on every plan purchase</li>
                <li>• Get bonus rewards for active referrals</li>
                <li>• No limit on referral earnings</li>
                <li>• Instant commission on successful signups</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Share your link:</h4>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  📱 WhatsApp
                </button>
                <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  📘 Facebook
                </button>
                <button className="flex-1 bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors text-sm">
                  🐦 Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Referrals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyStats.map((stat, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.referrals}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${stat.earnings.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Referral History</h2>
        <div className="space-y-4">
          {referralHistory.map((referral) => (
            <div key={referral.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {referral.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{referral.name}</h3>
                      <p className="text-sm text-gray-600">{referral.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Joined: </span>
                      <span className="font-medium text-gray-900">{referral.joinDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Plan: </span>
                      <span className="font-medium text-gray-900">{referral.planPurchased}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Earnings: </span>
                      <span className="font-medium text-green-600">${referral.earnings.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        referral.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {referral.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(referral.level)}`}>
                        {referral.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {referralHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🤝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
            <p className="text-gray-600">Start sharing your referral link to earn commissions!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReferral;
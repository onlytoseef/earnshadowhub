import React, { useState } from 'react';

const CustomerWallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'withdrawal'>('overview');

  const walletData = {
    balance: 245.50,
    pendingEarnings: 28.00,
    approvedEarnings: 217.50,
    totalWithdrawn: 500.00,
    availableForWithdrawal: 217.50
  };

  const transactions = [
    { id: 1, type: 'Task Completion', amount: 2.00, status: 'Completed', date: '2024-09-12' },
    { id: 2, type: 'Task Completion', amount: 1.50, status: 'Pending', date: '2024-09-12' },
    { id: 3, type: 'Referral Bonus', amount: 5.00, status: 'Completed', date: '2024-09-11' },
    { id: 4, type: 'Task Completion', amount: 3.00, status: 'Completed', date: '2024-09-11' },
    { id: 5, type: 'Withdrawal', amount: -50.00, status: 'Completed', date: '2024-09-10' }
  ];

  const withdrawalHistory = [
    { id: 1, amount: 50.00, method: 'PayPal', status: 'Completed', date: '2024-09-10', transactionId: 'TXN123456' },
    { id: 2, amount: 100.00, method: 'Bank Transfer', status: 'Processing', date: '2024-09-08', transactionId: 'TXN123457' },
    { id: 3, amount: 75.00, method: 'PayPal', status: 'Completed', date: '2024-09-05', transactionId: 'TXN123458' }
  ];

  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    method: 'paypal',
    account: ''
  });

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdrawal submission
    console.log('Withdrawal request:', withdrawalForm);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Wallet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Balance</p>
              <p className="text-2xl font-bold">${walletData.balance.toFixed(2)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending Earnings</p>
              <p className="text-2xl font-bold">${walletData.pendingEarnings.toFixed(2)}</p>
            </div>
            <div className="text-3xl">⏳</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Approved Earnings</p>
              <p className="text-2xl font-bold">${walletData.approvedEarnings.toFixed(2)}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Withdrawn</p>
              <p className="text-2xl font-bold">${walletData.totalWithdrawn.toFixed(2)}</p>
            </div>
            <div className="text-3xl">💸</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'transactions', label: 'Transactions' },
              { key: 'withdrawal', label: 'Withdrawal' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Earning Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available for Withdrawal:</span>
                      <span className="font-medium text-green-600">${walletData.availableForWithdrawal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Approval:</span>
                      <span className="font-medium text-yellow-600">${walletData.pendingEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Withdrawn:</span>
                      <span className="font-medium text-gray-600">${walletData.totalWithdrawn.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveTab('withdrawal')}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Request Withdrawal
                    </button>
                    <button
                      onClick={() => setActiveTab('transactions')}
                      className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      View Transaction History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Withdrawal Tab */}
          {activeTab === 'withdrawal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Withdrawal Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Request Withdrawal</h3>
                  <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input
                        type="number"
                        value={withdrawalForm.amount}
                        onChange={(e) => setWithdrawalForm({...withdrawalForm, amount: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter amount"
                        max={walletData.availableForWithdrawal}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum: ${walletData.availableForWithdrawal.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
                      <select
                        value={withdrawalForm.method}
                        onChange={(e) => setWithdrawalForm({...withdrawalForm, method: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="paypal">PayPal</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="crypto">Cryptocurrency</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Details</label>
                      <input
                        type="text"
                        value={withdrawalForm.account}
                        onChange={(e) => setWithdrawalForm({...withdrawalForm, account: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter account details"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Submit Withdrawal Request
                    </button>
                  </form>
                </div>

                {/* Withdrawal History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Withdrawal History</h3>
                  <div className="space-y-3">
                    {withdrawalHistory.map((withdrawal) => (
                      <div key={withdrawal.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">${withdrawal.amount.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">{withdrawal.method}</p>
                            <p className="text-xs text-gray-500">{withdrawal.date}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            withdrawal.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {withdrawal.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">ID: {withdrawal.transactionId}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerWallet;
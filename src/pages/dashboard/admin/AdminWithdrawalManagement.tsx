import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Search, Filter, CheckCircle, XCircle, Clock, Eye, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  method: 'bank' | 'paypal' | 'crypto';
  accountDetails: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  requestedAt: string;
  processedAt?: string;
  note?: string;
}

const AdminWithdrawalManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  // Dummy data
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    {
      id: 'W001',
      userId: 'U001',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      amount: 250.00,
      method: 'bank',
      accountDetails: 'Bank: Chase - Account: ****1234',
      status: 'pending',
      requestedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: 'W002',
      userId: 'U002',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      amount: 125.50,
      method: 'paypal',
      accountDetails: 'PayPal: jane.smith@email.com',
      status: 'approved',
      requestedAt: '2024-01-19T14:15:00Z',
      processedAt: '2024-01-20T09:00:00Z'
    },
    {
      id: 'W003',
      userId: 'U003',
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      amount: 75.00,
      method: 'crypto',
      accountDetails: 'BTC: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      status: 'completed',
      requestedAt: '2024-01-18T16:45:00Z',
      processedAt: '2024-01-19T11:30:00Z'
    },
    {
      id: 'W004',
      userId: 'U004',
      userName: 'Sarah Wilson',
      userEmail: 'sarah@example.com',
      amount: 300.00,
      method: 'bank',
      accountDetails: 'Bank: Wells Fargo - Account: ****5678',
      status: 'rejected',
      requestedAt: '2024-01-17T12:20:00Z',
      processedAt: '2024-01-18T10:15:00Z',
      note: 'Insufficient account verification'
    }
  ]);

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || withdrawal.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || withdrawal.method === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleApprove = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(w => 
      w.id === withdrawalId ? { 
        ...w, 
        status: 'approved' as const, 
        processedAt: new Date().toISOString() 
      } : w
    ));
    toast.success('Withdrawal request approved!');
  };

  const handleReject = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(w => 
      w.id === withdrawalId ? { 
        ...w, 
        status: 'rejected' as const, 
        processedAt: new Date().toISOString(),
        note: 'Rejected by admin'
      } : w
    ));
    toast.success('Withdrawal request rejected');
  };

  const handleProcess = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(w => 
      w.id === withdrawalId ? { ...w, status: 'processing' as const } : w
    ));
    toast.success('Withdrawal marked as processing');
  };

  const handleComplete = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(w => 
      w.id === withdrawalId ? { 
        ...w, 
        status: 'completed' as const,
        processedAt: new Date().toISOString()
      } : w
    ));
    toast.success('Withdrawal marked as completed');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'bank': return 'bg-blue-100 text-blue-800';
      case 'paypal': return 'bg-indigo-100 text-indigo-800';
      case 'crypto': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPending = withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0);
  const totalProcessed = withdrawals.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Withdrawal Management</h1>
          <p className="text-gray-600">Manage user withdrawal requests</p>
        </div>
        <div className="flex items-center space-x-2 text-blue-600">
          <Banknote className="h-5 w-5" />
          <span className="font-medium">${totalPending.toFixed(2)} Pending</span>
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
              placeholder="Search withdrawals..."
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="all">All Methods</option>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="crypto">Cryptocurrency</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Withdrawals List */}
      <div className="space-y-4">
        {filteredWithdrawals.map((withdrawal, index) => (
          <motion.div
            key={withdrawal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Withdrawal #{withdrawal.id}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(withdrawal.status)}`}>
                    {getStatusIcon(withdrawal.status)}
                    <span className="ml-1">{withdrawal.status}</span>
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(withdrawal.method)}`}>
                    {withdrawal.method.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">User</p>
                    <p className="text-sm text-gray-900">{withdrawal.userName}</p>
                    <p className="text-sm text-gray-500">{withdrawal.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p className="text-lg font-bold text-green-600">${withdrawal.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Account Details</p>
                    <p className="text-sm text-gray-900">{withdrawal.accountDetails}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Requested</p>
                    <p className="text-sm text-gray-900">{new Date(withdrawal.requestedAt).toLocaleDateString()}</p>
                    {withdrawal.processedAt && (
                      <p className="text-sm text-gray-500">
                        Processed: {new Date(withdrawal.processedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {withdrawal.note && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Note</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{withdrawal.note}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 ml-6">
                <button
                  onClick={() => toast('View withdrawal details', { icon: '👁️' })}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>

                {withdrawal.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleReject(withdrawal.id)}
                      className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(withdrawal.id)}
                      className="flex items-center space-x-1 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve</span>
                    </button>
                  </>
                )}

                {withdrawal.status === 'approved' && (
                  <button
                    onClick={() => handleProcess(withdrawal.id)}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Process</span>
                  </button>
                )}

                {withdrawal.status === 'processing' && (
                  <button
                    onClick={() => handleComplete(withdrawal.id)}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Complete</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredWithdrawals.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
        >
          <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No withdrawals found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">${totalPending.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-xl font-bold text-gray-900">
                {withdrawals.filter(w => w.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">${totalProcessed.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-xl font-bold text-gray-900">
                {withdrawals.filter(w => w.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminWithdrawalManagement;
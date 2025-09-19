import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import AuthService from '../../services/authService';
import toast from 'react-hot-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const customerMenuItems = [
    { name: 'Dashboard', href: '/dashboard/customer', icon: '🏠' },
    { name: 'My Profile', href: '/dashboard/customer/profile', icon: '👤' },
    { name: 'Wallet', href: '/dashboard/customer/wallet', icon: '💰' },
    { name: 'Level', href: '/dashboard/customer/level', icon: '⭐' },
    { name: 'Tasks', href: '/dashboard/customer/tasks', icon: '📋' },
    { name: 'Referral', href: '/dashboard/customer/referral', icon: '🤝' },
    { name: 'Change Password', href: '/dashboard/customer/change-password', icon: '🔒' },
  ];

  const adminMenuItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: '🏠' },
    { name: 'Add Task', href: '/dashboard/admin/add-task', icon: '➕' },
    { name: 'User Management', href: '/dashboard/admin/user-management', icon: '👥' },
    { name: 'Task Approval', href: '/dashboard/admin/task-approval', icon: '✅' },
    { name: 'Withdrawals', href: '/dashboard/admin/withdrawal-management', icon: '💸' },
    { name: 'Sales Tracking', href: '/dashboard/admin/sales-tracking', icon: '📊' },
    { name: 'User History', href: '/dashboard/admin/user-history', icon: '📜' },
    { name: 'Referral Stats', href: '/dashboard/admin/referral-stats', icon: '📈' },
  ];

  const menuItems = currentUser?.role === 'admin' ? adminMenuItems : customerMenuItems;

  const isActive = (href: string) => {
    if (href === '/dashboard/customer' || href === '/dashboard/admin') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Always visible on large screens */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ES</span>
                </div>
                <span className="ml-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  EarnShadow
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-6 flex-1 px-3 pb-4 overflow-y-auto">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl border-r border-gray-200 lg:hidden"
          >
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ES</span>
                </div>
                <span className="ml-2 text-lg font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                  EarnShadow
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 px-3 pb-4 overflow-y-auto">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1 className="ml-2 text-xl font-semibold text-gray-900 capitalize">
                {currentUser?.role} Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {currentUser?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {currentUser?.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                        <p className="text-xs text-gray-500">{currentUser?.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
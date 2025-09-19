import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.tsx';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardRouter from './pages/dashboard/DashboardRouter';
import CustomerDashboard from './pages/dashboard/customer/CustomerDashboard';
import CustomerProfile from './pages/dashboard/customer/CustomerProfile';
import CustomerWallet from './pages/dashboard/customer/CustomerWallet';
import CustomerLevel from './pages/dashboard/customer/CustomerLevel';
import CustomerTasks from './pages/dashboard/customer/CustomerTasks';
import CustomerReferral from './pages/dashboard/customer/CustomerReferral';
import CustomerChangePassword from './pages/dashboard/customer/CustomerChangePassword';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import AdminAddTask from './pages/dashboard/admin/AdminAddTask';
import AdminUserManagement from './pages/dashboard/admin/AdminUserManagement';
import AdminTaskApproval from './pages/dashboard/admin/AdminTaskApproval';
import AdminWithdrawalManagement from './pages/dashboard/admin/AdminWithdrawalManagement';
import AdminSalesTracking from './pages/dashboard/admin/AdminSalesTracking';
import AdminUserHistory from './pages/dashboard/admin/AdminUserHistory';
import AdminReferralStats from './pages/dashboard/admin/AdminReferralStats';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
  <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Dashboard Router - redirects based on role */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        } />
        
        {/* Customer Dashboard Routes */}
        <Route path="/dashboard/customer/*" element={
          <ProtectedRoute requiredRole="customer">
            <DashboardLayout>
              <Routes>
                <Route index element={<CustomerDashboard />} />
                <Route path="profile" element={<CustomerProfile />} />
                <Route path="wallet" element={<CustomerWallet />} />
                <Route path="level" element={<CustomerLevel />} />
                <Route path="tasks" element={<CustomerTasks />} />
                <Route path="referral" element={<CustomerReferral />} />
                <Route path="change-password" element={<CustomerChangePassword />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="add-task" element={<AdminAddTask />} />
                <Route path="user-management" element={<AdminUserManagement />} />
                <Route path="task-approval" element={<AdminTaskApproval />} />
                <Route path="withdrawal-management" element={<AdminWithdrawalManagement />} />
                <Route path="sales-tracking" element={<AdminSalesTracking />} />
                <Route path="user-history" element={<AdminUserHistory />} />
                <Route path="referral-stats" element={<AdminReferralStats />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
    </Provider>
  </StrictMode>
);

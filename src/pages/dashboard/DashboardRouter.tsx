import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/authService';

const DashboardRouter: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Route based on user role
  if (currentUser.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  } else {
    return <Navigate to="/dashboard/customer" replace />;
  }
};

export default DashboardRouter;
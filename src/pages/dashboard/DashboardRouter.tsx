import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/authService';

const DashboardRouter: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Route based on user role and plan status
  if (currentUser.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  } else if (currentUser.role === 'customer') {
    // Check if customer has a paid plan or pending payment
    const planType = currentUser.planType || 'basic';
    if (planType !== 'basic') {
      // Has a paid plan or pending payment → Customer Dashboard
      return <Navigate to="/dashboard/customer" replace />;
    } else {
      // No paid plan → Plans Page
      return <Navigate to="/plans" replace />;
    }
  }

  // Default fallback
  return <Navigate to="/" replace />;
};

export default DashboardRouter;
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const currentUser = AuthService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no specific role required, allow access
  if (!requiredRole) {
    return <>{children}</>;
  }

  // If user doesn't have required role, redirect based on their actual role
  if (currentUser?.role !== requiredRole) {
    if (currentUser?.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // Additional check for customers: must have a paid plan or pending payment
  if (requiredRole === 'customer') {
    const planType = currentUser?.planType || 'basic';
    if (planType === 'basic') {
      // Customer doesn't have a paid plan, redirect to plans page
      return <Navigate to="/plans" replace />;
    }
    // Allow access for paid plans and pending payments
  }

  return <>{children}</>;
};

export default ProtectedRoute;
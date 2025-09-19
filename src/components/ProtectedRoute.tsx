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

  return <>{children}</>;
};

export default ProtectedRoute;
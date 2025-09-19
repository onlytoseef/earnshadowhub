import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CustomerChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const currentStrength = passwordStrength(formData.newPassword);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h1>
        <p className="text-gray-600">Update your password to keep your account secure.</p>
      </div>

      {/* Change Password Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.currentPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your current password"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.newPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your new password"
            />
            
            {/* Password Strength Indicator */}
            {formData.newPassword && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(currentStrength)}`}
                      style={{ width: `${(currentStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStrength <= 1 ? 'text-red-500' :
                    currentStrength === 2 ? 'text-yellow-500' :
                    currentStrength === 3 ? 'text-blue-500' : 'text-green-500'
                  }`}>
                    {getStrengthText(currentStrength)}
                  </span>
                </div>
              </div>
            )}
            
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Confirm your new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🔐 Password Security Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Use at least 8 characters with a mix of letters, numbers, and symbols
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Avoid using personal information like your name or birthdate
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Don't reuse passwords from other accounts
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Consider using a password manager for better security
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Change your password regularly, especially if you suspect it's been compromised
          </li>
        </ul>
      </div>

      {/* Recent Security Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Password Changed</p>
              <p className="text-sm text-gray-600">Your password was last changed</p>
            </div>
            <span className="text-sm text-gray-500">30 days ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Login from New Device</p>
              <p className="text-sm text-gray-600">Windows 11 • Chrome Browser</p>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Account Login</p>
              <p className="text-sm text-gray-600">Successful login from usual location</p>
            </div>
            <span className="text-sm text-gray-500">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChangePassword;
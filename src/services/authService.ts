const API_BASE_URL = 'http://localhost:5000/api';

// API service for authentication
class AuthService {
  // Register new user
  static async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token in localStorage
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        localStorage.setItem('userRole', data.data.role);
        localStorage.setItem('planType', data.data.planType || 'basic');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during registration');
    }
  }

  // Login user
  static async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      if (data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        localStorage.setItem('userRole', data.data.role);
        localStorage.setItem('planType', data.data.planType || 'basic');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Network error during login');
    }
  }

  // Logout user
  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user from localStorage
  static getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }

  // Get token from localStorage
  static getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }
}

export default AuthService;
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menu API calls
export const getMenuItems = () => api.get('/menu');
export const getMenuItemsByCategory = (category) => api.get(`/menu/category/${category}`);

// Order API calls
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getUserOrders = () => api.get('/orders/my-orders');
export const cancelOrder = (orderId) => api.patch(`/orders/${orderId}/cancel`);

// Contact API calls
export const submitContactForm = (formData) => api.post('/contact', formData);

// Auth API calls
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getUserProfile = () => api.get('/auth/profile');
export const updateUserProfile = (userData) => api.patch('/auth/profile', userData);
export const logout = () => api.post('/auth/logout');

export default api; 
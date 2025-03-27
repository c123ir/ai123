import axios from 'axios';
import { message } from 'antd';

// ایجاد نمونه axios با تنظیمات پایه
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// افزودن اینترسپتور برای ارسال توکن با هر درخواست
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// اینترسپتور پاسخ برای مدیریت خطاها
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // مدیریت خطاهای احراز هویت
    if (response && response.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
      message.error('نشست شما منقضی شده است. لطفاً دوباره وارد شوید.');
    }
    
    // مدیریت سایر خطاها
    const errorMessage = response?.data?.message || 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.';
    message.error(errorMessage);
    
    return Promise.reject(error);
  }
);

// سرویس‌های مربوط به کاربران
export const userService = {
  getUsers: (params: any) => api.get('/admin/users', { params }),
  getUserById: (id: string) => api.get(`/admin/users/${id}`),
  createUser: (data: any) => api.post('/admin/users', data),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
};

// سرویس‌های مربوط به محصولات
export const productService = {
  getProducts: (params: any) => api.get('/admin/products', { params }),
  getProductById: (id: string) => api.get(`/admin/products/${id}`),
  createProduct: (data: any) => api.post('/admin/products', data),
  updateProduct: (id: string, data: any) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/admin/products/${id}`),
};

// سرویس‌های مربوط به سفارشات
export const orderService = {
  getOrders: (params: any) => api.get('/admin/orders', { params }),
  getOrderById: (id: string) => api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id: string, status: string) => 
    api.patch(`/admin/orders/${id}/status`, { status }),
};

// سرویس‌های مربوط به داشبورد
export const dashboardService = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getRecentOrders: () => api.get('/admin/dashboard/recent-orders'),
  getNewUsers: () => api.get('/admin/dashboard/new-users'),
};

// سرویس‌های مربوط به احراز هویت
export const authService = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/admin/auth/login', credentials),
  logout: () => api.post('/admin/auth/logout'),
  getProfile: () => api.get('/admin/auth/profile'),
  updateProfile: (data: any) => api.put('/admin/auth/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) => 
    api.post('/admin/auth/change-password', data),
};

export default api; 
import axios from 'axios';
import { message } from 'antd';

// تنظیمات پایه Axios
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3434/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000, // افزایش مهلت درخواست
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// اضافه کردن توکن به هدر درخواست‌ها
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('user_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// مدیریت خطا در پاسخ‌ها
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.log('خطای شبکه: امکان اتصال به سرور وجود ندارد');
      // نمایش پیام خطا به کاربر - غیرفعال شده برای توسعه
      // message.error('خطای اتصال به سرور. لطفاً بعداً دوباره تلاش کنید.');
    }
    else if (error.response && error.response.status === 404) {
      console.log('منبع مورد نظر یافت نشد:', error.config.url);
      // عدم نمایش پیام خطا به کاربر برای 404
    }
    else if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_token');
      localStorage.removeItem('user');
      // ریدایرکت به صفحه ورود
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// سرویس‌های مرتبط با احراز هویت کاربر
export const authService = {
  login: (data: { email: string; password: string; remember?: boolean }) => 
    axiosInstance.post('/auth/login', data),
  
  register: (data: { name: string; email: string; password: string; phone: string }) => 
    axiosInstance.post('/auth/register', data),
  
  forgotPassword: (email: string) => 
    axiosInstance.post('/auth/forgot-password', { email }),
  
  resetPassword: (data: { token: string; password: string; password_confirmation: string }) => 
    axiosInstance.post('/auth/reset-password', data),
  
  logout: () => 
    axiosInstance.post('/auth/logout'),
};

// این سرویس باید export شود
export const userService = {
  login: (data: { email: string; password: string; remember?: boolean }) => 
    axiosInstance.post('/auth/login', data),
  
  register: (data: any) => 
    axiosInstance.post('/auth/register', data),
  
  getProfile: () => 
    axiosInstance.get('/user/profile'),
  
  updateProfile: (data: any) => 
    axiosInstance.put('/user/profile', data),
  
  changePassword: (data: { current_password: string; password: string; password_confirmation: string }) => 
    axiosInstance.put('/user/change-password', data),
};

// سرویس‌های مرتبط با محصولات
export const productService = {
  getProducts: (params?: any) => 
    axiosInstance.get('/products', { params }),
  
  getProductById: (id: string) => 
    axiosInstance.get(`/products/${id}`),
  
  getRelatedProducts: (id: string) => 
    axiosInstance.get(`/products/${id}/related`),
  
  searchProducts: (query: string) => 
    axiosInstance.get('/products/search', { params: { q: query } }),
  
  getProductReviews: (id: string) => 
    axiosInstance.get(`/products/${id}/reviews`),
  
  getCategories: () =>
    axiosInstance.get('/categories')
};

// سرویس‌های مرتبط با سبد خرید
export const cartService = {
  getCart: () => 
    axiosInstance.get('/cart'),
  
  addToCart: (data: { productId: string; quantity: number }) => 
    axiosInstance.post('/cart/add', data),
  
  updateCartItem: (id: string, data: { quantity: number }) => 
    axiosInstance.put(`/cart/items/${id}`, data),
  
  removeCartItem: (id: string) => 
    axiosInstance.delete(`/cart/items/${id}`),
  
  emptyCart: () => 
    axiosInstance.delete('/cart'),
  
  checkout: (data: any) => 
    axiosInstance.post('/cart/checkout', data),
};

// سرویس‌های مرتبط با پروفایل کاربر
export const profileService = {
  getAddresses: () => 
    axiosInstance.get('/user/addresses'),
  
  addAddress: (data: any) => 
    axiosInstance.post('/user/addresses', data),
  
  updateAddress: (id: string, data: any) => 
    axiosInstance.put(`/user/addresses/${id}`, data),
  
  deleteAddress: (id: string) => 
    axiosInstance.delete(`/user/addresses/${id}`),
  
  getOrders: () => 
    axiosInstance.get('/user/orders'),
  
  getOrderDetails: (id: string) => 
    axiosInstance.get(`/user/orders/${id}`),
};

// سرویس‌های مرتبط با نظرات
export const reviewService = {
  addReview: (productId: string, data: { rating: number; comment: string }) => 
    axiosInstance.post(`/products/${productId}/reviews`, data),
  
  getProductReviews: (productId: string) => 
    axiosInstance.get(`/products/${productId}/reviews`),
};

// سرویس‌های مرتبط با سفارش‌ها
export const orderService = {
  getOrders: () => 
    axiosInstance.get('/user/orders'),
  
  getOrderById: (id: string) => 
    axiosInstance.get(`/user/orders/${id}`),
  
  createOrder: (data: any) => 
    axiosInstance.post('/orders', data),
  
  cancelOrder: (id: string) => 
    axiosInstance.put(`/user/orders/${id}/cancel`),
};

// صادر کردن همه سرویس‌ها به عنوان یک آبجکت پیش‌فرض
export default {
  authService,
  userService,
  productService,
  cartService,
  profileService,
  reviewService,
  orderService
}; 
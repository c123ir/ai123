import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// تنظیم کردن توکن برای هر درخواست
axios.interceptors.request.use(
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

// مدیریت خطاهای پاسخ
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // در صورت خطای احراز هویت، کاربر را به صفحه ورود هدایت کنید
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// سرویس‌های مربوط به کاربر
export const userService = {
  login: (data: { email: string; password: string; remember?: boolean }) => {
    return axios.post(`${API_URL}/users/login`, data);
  },
  
  register: (data: any) => {
    return axios.post(`${API_URL}/users/register`, data);
  },
  
  forgotPassword: (email: string) => {
    return axios.post(`${API_URL}/users/forgot-password`, { email });
  },
  
  resetPassword: (token: string, password: string) => {
    return axios.post(`${API_URL}/users/reset-password`, { token, password });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  }
};

// سرویس‌های مربوط به محصولات
export const productService = {
  getProducts: (params?: any) => {
    return axios.get(`${API_URL}/products`, { params });
  },
  
  getProductById: (id: string) => {
    return axios.get(`${API_URL}/products/${id}`);
  },
  
  getProductReviews: (id: string) => {
    return axios.get(`${API_URL}/products/${id}/reviews`);
  },
  
  addProductReview: (id: string, data: any) => {
    return axios.post(`${API_URL}/products/${id}/reviews`, data);
  },
  
  getCategories: () => {
    return axios.get(`${API_URL}/categories`);
  },
  
  getRelatedProducts: (id: string) => {
    return axios.get(`${API_URL}/products/${id}/related`);
  }
};

// سرویس‌های مربوط به سبد خرید
export const cartService = {
  getCart: () => {
    return axios.get(`${API_URL}/cart`);
  },
  
  addToCart: (data: { productId: string; quantity: number }) => {
    return axios.post(`${API_URL}/cart/items`, data);
  },
  
  updateCartItem: (id: string, data: { quantity: number }) => {
    return axios.put(`${API_URL}/cart/items/${id}`, data);
  },
  
  removeCartItem: (id: string) => {
    return axios.delete(`${API_URL}/cart/items/${id}`);
  },
  
  emptyCart: () => {
    return axios.delete(`${API_URL}/cart`);
  },
  
  applyCoupon: (code: string) => {
    return axios.post(`${API_URL}/cart/coupon`, { code });
  }
};

// سرویس‌های مربوط به پروفایل کاربر
export const profileService = {
  getProfile: () => {
    return axios.get(`${API_URL}/users/profile`);
  },
  
  updateProfile: (data: any) => {
    return axios.put(`${API_URL}/users/profile`, data);
  },
  
  changePassword: (data: { currentPassword: string; newPassword: string }) => {
    return axios.put(`${API_URL}/users/change-password`, data);
  },
  
  getAddresses: () => {
    return axios.get(`${API_URL}/users/addresses`);
  },
  
  addAddress: (data: any) => {
    return axios.post(`${API_URL}/users/addresses`, data);
  },
  
  updateAddress: (id: string, data: any) => {
    return axios.put(`${API_URL}/users/addresses/${id}`, data);
  },
  
  deleteAddress: (id: string) => {
    return axios.delete(`${API_URL}/users/addresses/${id}`);
  },
  
  setDefaultAddress: (id: string) => {
    return axios.put(`${API_URL}/users/addresses/${id}/default`, {});
  }
};

// سرویس‌های مربوط به سفارش‌ها
export const orderService = {
  getOrders: () => {
    return axios.get(`${API_URL}/orders`);
  },
  
  getOrderById: (id: string) => {
    return axios.get(`${API_URL}/orders/${id}`);
  },
  
  createOrder: (data: any) => {
    return axios.post(`${API_URL}/orders`, data);
  },
  
  cancelOrder: (id: string) => {
    return axios.put(`${API_URL}/orders/${id}/cancel`, {});
  },
  
  validatePayment: (orderId: string, paymentId: string) => {
    return axios.put(`${API_URL}/orders/${orderId}/payment`, { paymentId });
  }
};

// سرویس‌های مربوط به علاقه‌مندی‌ها
export const wishlistService = {
  getWishlist: () => {
    return axios.get(`${API_URL}/wishlist`);
  },
  
  addToWishlist: (productId: string) => {
    return axios.post(`${API_URL}/wishlist`, { productId });
  },
  
  removeFromWishlist: (productId: string) => {
    return axios.delete(`${API_URL}/wishlist/${productId}`);
  }
};

export default {
  userService,
  productService,
  cartService,
  profileService,
  orderService,
  wishlistService
}; 
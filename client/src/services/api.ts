// src/services/api.ts - تنظیمات و توابع اصلی ارتباط با API

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { store } from '../store';
import { clearAuth } from '../features/auth/authSlice';
import { showNotification } from '../features/notification/notificationSlice';
import { setError } from '../features/error/errorSlice';

// تعریف ساختار پاسخ‌های API
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// ساخت نمونه axios با تنظیمات پایه
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5454/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // 15 ثانیه تایم‌اوت
});

// اضافه کردن توکن به هدرهای درخواست
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// رسیدگی به پاسخ‌های دریافتی و مدیریت خطاها
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // بررسی کد خطا
    if (error.response) {
      const status = error.response.status;
      
      // خطای عدم دسترسی - لاگ‌اوت خودکار
      if (status === 401) {
        store.dispatch(clearAuth());
        store.dispatch(showNotification({
          message: 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید.',
          type: 'error'
        }));
      }
      
      // خطاهای عدم دسترسی
      else if (status === 403) {
        store.dispatch(showNotification({
          message: 'شما به این بخش دسترسی ندارید.',
          type: 'error'
        }));
      }
      
      // خطاهای سرور
      else if (status >= 500) {
        store.dispatch(showNotification({
          message: 'خطا در ارتباط با سرور. لطفاً بعداً تلاش کنید.',
          type: 'error'
        }));
      }
    }
    // خطای شبکه
    else if (error.request) {
      store.dispatch(showNotification({
        message: 'اتصال به سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.',
        type: 'error'
      }));
    }
    
    // انتشار اکشن خطا به Redux
    store.dispatch(setError({
      status: error.response?.status || 500,
      message: getErrorMessage(error),
    }));
    
    return Promise.reject(error);
  }
);

/**
 * استخراج پیام خطا از پاسخ خطای سرور
 */
const getErrorMessage = (error: AxiosError): string => {
  // اگر پاسخ وجود داشته باشد
  if (error.response && error.response.data) {
    const data = error.response.data as any;
    // پیام خطا در فرمت‌های مختلف
    if (data.message) return data.message;
    if (data.error) return data.error;
    if (typeof data === 'string') return data;
  }
  
  // اگر خطای درخواست باشد (مثلاً خطای شبکه)
  if (error.request) {
    return 'خطا در برقراری ارتباط با سرور';
  }
  
  // سایر خطاها
  return error.message || 'خطای ناشناخته';
};

// برای استفاده در سرویس‌های دیگر
export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    return getErrorMessage(error);
  }
  return error.message || 'خطای ناشناخته';
};

export default api; 
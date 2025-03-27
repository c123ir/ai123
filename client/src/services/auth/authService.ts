// src/services/auth/authService.ts - سرویس‌های احراز هویت

import apiClient, { ApiResponse, handleApiError } from '../api';

/**
 * داده‌های لازم برای ورود
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * پاسخ ورود موفق
 */
export interface LoginResponse {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  refreshToken: string;
}

/**
 * داده‌های لازم برای ثبت‌نام
 */
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

/**
 * پاسخ ثبت‌نام موفق
 */
export interface RegisterResponse {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
  };
  message: string;
}

/**
 * داده‌های لازم برای نوسازی توکن
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * پاسخ نوسازی توکن موفق
 */
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

/**
 * داده‌های لازم برای تغییر رمز عبور
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * کلاس سرویس احراز هویت
 */
class AuthService {
  /**
   * ورود کاربر
   * @param loginData داده‌های لازم برای ورود
   * @returns اطلاعات کاربر و توکن‌ها
   */
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', loginData);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  
  /**
   * ثبت‌نام کاربر جدید
   * @param registerData داده‌های لازم برای ثبت‌نام
   * @returns اطلاعات کاربر ثبت‌نام شده
   */
  async register(registerData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<ApiResponse<RegisterResponse>>('/auth/register', registerData);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  
  /**
   * نوسازی توکن
   * @param refreshData داده‌های لازم برای نوسازی توکن
   * @returns توکن‌های جدید
   */
  async refreshToken(refreshData: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh-token', refreshData);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  
  /**
   * دریافت اطلاعات کاربر لاگین شده
   * @returns اطلاعات کاربر
   */
  async getProfile() {
    try {
      const response = await apiClient.get<ApiResponse<LoginResponse['user']>>('/auth/me');
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  
  /**
   * تغییر رمز عبور
   * @param passwordData داده‌های لازم برای تغییر رمز عبور
   * @returns پیام موفقیت
   */
  async changePassword(passwordData: ChangePasswordRequest) {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/change-password', passwordData);
      return response.data.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
  
  /**
   * خروج کاربر
   * @returns پیام موفقیت
   */
  async logout() {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/logout');
      // حذف توکن‌ها از localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return response.data.data;
    } catch (error) {
      // حتی در صورت خطا، توکن‌ها را حذف کنید
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw new Error(handleApiError(error));
    }
  }
}

// تعریف کلاس AuthService به صورت متغیر و سپس export آن
const authService = new AuthService();

export default authService; 
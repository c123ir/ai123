import api from './api';

// رابط‌های مربوط به احراز هویت
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    profileImage?: string;
    createdAt: string;
  };
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * سرویس مدیریت احراز هویت کاربران
 */
const authService = {
  /**
   * ورود کاربر به سیستم
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * ثبت‌نام کاربر جدید
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  /**
   * خروج کاربر از سیستم
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  /**
   * نوسازی توکن دسترسی
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  /**
   * درخواست بازیابی رمز عبور
   */
  forgotPassword: async (data: PasswordResetRequest): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password', data);
    return response.data;
  },

  /**
   * تایید و تغییر رمز عبور فراموش شده
   */
  resetPassword: async (data: PasswordResetConfirm): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  },

  /**
   * تغییر رمز عبور توسط کاربر
   */
  changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/change-password', data);
    return response.data;
  },

  /**
   * دریافت اطلاعات کاربر فعلی
   */
  getCurrentUser: async (): Promise<AuthResponse['user']> => {
    const response = await api.get<AuthResponse['user']>('/users/me');
    return response.data;
  },
};

export default authService; 
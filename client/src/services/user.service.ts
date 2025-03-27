import api, { ApiResponse } from './api';

// تعریف interface برای کاربر
export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lastLogin?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

/**
 * سرویس مدیریت کاربران
 */
class UserService {
  /**
   * دریافت پروفایل کاربر فعلی
   */
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<ApiResponse<UserProfile>>('/users/profile');
    return response.data.data;
  }

  /**
   * بروزرسانی پروفایل کاربر فعلی
   */
  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.patch<ApiResponse<UserProfile>>('/users/profile', profileData);
    return response.data.data;
  }

  /**
   * آپلود تصویر پروفایل
   */
  async uploadProfileImage(file: File): Promise<{ profileImage: string }> {
    const formData = new FormData();
    formData.append('profileImage', file);

    const response = await api.post<ApiResponse<{ profileImage: string }>>('/users/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }

  /**
   * دریافت لیست کاربران با صفحه‌بندی
   */
  async getUsers(page: number = 1, limit: number = 10): Promise<UsersResponse> {
    const response = await api.get<ApiResponse<UsersResponse>>(`/users?page=${page}&limit=${limit}`);
    return response.data.data;
  }

  /**
   * دریافت اطلاعات یک کاربر با شناسه
   */
  async getUserById(userId: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data.data;
  }

  /**
   * بروزرسانی اطلاعات کاربر
   */
  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<User>>(`/users/${userId}`, userData);
    return response.data.data;
  }

  /**
   * حذف کاربر
   */
  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  }

  /**
   * تغییر وضعیت فعال بودن کاربر
   */
  async toggleUserActive(userId: string, isActive: boolean): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(`/users/${userId}/status`, { isActive });
    return response.data.data;
  }

  /**
   * تغییر نقش کاربر
   */
  async changeUserRole(userId: string, role: string): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(`/users/${userId}/role`, { role });
    return response.data.data;
  }

  /**
   * برای مدیر: دریافت آمار کلی کاربران
   */
  async getUsersStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    usersByRole: { role: string; count: number }[];
  }> {
    const response = await api.get<ApiResponse<{
      totalUsers: number;
      activeUsers: number;
      newUsersThisMonth: number;
      usersByRole: { role: string; count: number }[];
    }>>('/admin/users/stats');
    return response.data.data;
  }
}

export default new UserService(); 
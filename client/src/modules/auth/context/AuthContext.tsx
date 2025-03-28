import React, { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';

// تعریف نوع داده‌های کاربر
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: 'admin' | 'user';
  isVerified: boolean;
}

// تعریف توکن
interface Token {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// تعریف کانتکست احراز هویت
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

// ایجاد کانتکست با مقدار پیش‌فرض
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  forgotPassword: async () => false,
  resetPassword: async () => false,
  verifyEmail: async () => false,
  refreshToken: async () => false,
  updateProfile: async () => false,
});

// کاربر داده‌ی نمونه برای آزمایش
const mockUser: User = {
  id: '1',
  username: 'ali_mohammadi',
  email: 'ali.mohammadi@example.com',
  fullName: 'علی محمدی',
  avatar: '/avatars/default.jpg',
  role: 'user',
  isVerified: true,
};

// ارائه‌دهنده کانتکست احراز هویت
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<Token | null>(null);

  // بررسی وضعیت ورود کاربر هنگام بارگذاری برنامه
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        
        if (storedToken) {
          // در محیط واقعی، اعتبارسنجی توکن با سرور انجام می‌شود
          // برای نمونه، فرض می‌کنیم توکن معتبر است و کاربر نمونه را بازمی‌گردانیم
          setUser(mockUser);
          setToken(JSON.parse(storedToken));
        }
      } catch (error) {
        console.error('خطا در بررسی وضعیت احراز هویت:', error);
        localStorage.removeItem('auth_token');
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ورود کاربر
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // در محیط واقعی، درخواست به API ارسال می‌شود
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // بررسی اعتبار نام کاربری و رمز عبور (نمونه)
      if (email === 'ali.mohammadi@example.com' && password === 'password123') {
        const newToken: Token = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: Date.now() + 3600000, // یک ساعت اعتبار
        };
        
        localStorage.setItem('auth_token', JSON.stringify(newToken));
        setToken(newToken);
        setUser(mockUser);
        message.success('ورود با موفقیت انجام شد');
        return true;
      } else {
        message.error('نام کاربری یا رمز عبور اشتباه است');
        return false;
      }
    } catch (error) {
      console.error('خطا در ورود:', error);
      message.error('خطایی در فرآیند ورود رخ داد');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ثبت‌نام کاربر
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // در محیط واقعی، درخواست به API ارسال می‌شود
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // شبیه‌سازی ثبت نام موفق
      message.success('ثبت‌نام با موفقیت انجام شد. لطفاً ایمیل خود را تأیید کنید.');
      return true;
    } catch (error) {
      console.error('خطا در ثبت‌نام:', error);
      message.error('خطایی در فرآیند ثبت‌نام رخ داد');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // خروج کاربر
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setToken(null);
    message.success('خروج با موفقیت انجام شد');
  };

  // بازیابی رمز عبور
  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // در محیط واقعی، درخواست به API ارسال می‌شود
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('لینک بازیابی رمز عبور به ایمیل شما ارسال شد');
      return true;
    } catch (error) {
      console.error('خطا در بازیابی رمز عبور:', error);
      message.error('خطایی در فرآیند بازیابی رمز عبور رخ داد');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // تنظیم مجدد رمز عبور
  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // در محیط واقعی، درخواست به API ارسال می‌شود
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('رمز عبور با موفقیت تغییر یافت');
      return true;
    } catch (error) {
      console.error('خطا در تنظیم مجدد رمز عبور:', error);
      message.error('خطایی در فرآیند تنظیم مجدد رمز عبور رخ داد');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // تأیید ایمیل
  const verifyEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // در محیط واقعی، درخواست به API ارسال می‌شود
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, isVerified: true };
        setUser(updatedUser);
      }
      
      message.success('ایمیل شما با موفقیت تأیید شد');
      return true;
    } catch (error) {
      console.error('خطا در تأیید ایمیل:', error);
      message.error('خطایی در فرآیند تأیید ایمیل رخ داد');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // تازه‌سازی توکن
  const refreshToken = async (): Promise<boolean> => {
    if (!token?.refreshToken) return false;
    
    try {
      // در محیط واقعی، درخواست به API ارسال می‌شود
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newToken: Token = {
        accessToken: 'new-mock-access-token',
        refreshToken: 'new-mock-refresh-token',
        expiresAt: Date.now() + 3600000, // یک ساعت اعتبار
      };
      
      localStorage.setItem('auth_token', JSON.stringify(newToken));
      setToken(newToken);
      return true;
    } catch (error) {
      console.error('خطا در تازه‌سازی توکن:', error);
      localStorage.removeItem('auth_token');
      setUser(null);
      setToken(null);
      return false;
    }
  };

  // به‌روزرسانی پروفایل
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    try {
      // در محیط واقعی، درخواست به API ارسال می‌شود
      // شبیه‌سازی تأخیر شبکه
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      message.success('پروفایل با موفقیت به‌روزرسانی شد');
      return true;
    } catch (error) {
      console.error('خطا در به‌روزرسانی پروفایل:', error);
      message.error('خطایی در فرآیند به‌روزرسانی پروفایل رخ داد');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        refreshToken,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// هوک سفارشی برای دسترسی به کانتکست احراز هویت
export const useAuth = () => useContext(AuthContext);

export default AuthContext; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// تعریف نوع داده کاربر
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
}

// تعریف نوع داده وضعیت احراز هویت
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// وضعیت اولیه
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// ایجاد اسلایس Redux
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // شروع عملیات احراز هویت
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // ورود موفق
    authSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    
    // خطا در احراز هویت
    authFail: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    
    // خروج از سیستم
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem('token');
    },
    
    // به‌روزرسانی اطلاعات کاربر
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    // پاک کردن خطا
    clearError: (state) => {
      state.error = null;
    },
  },
});

// صادر کردن اکشن‌ها
export const { 
  authStart, 
  authSuccess, 
  authFail, 
  logout, 
  updateUser, 
  clearError 
} = authSlice.actions;

// صادر کردن ریدیوسر
export default authSlice.reducer; 
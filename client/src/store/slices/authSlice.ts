import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// تایپ‌های مورد نیاز
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  userRole: string | null;
  loading: boolean;
  error: string | null;
}

// مقادیر اولیه
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  userRole: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // شروع درخواست احراز هویت
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // ورود موفق
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userRole = action.payload.user.role;
      state.loading = false;
      state.error = null;
    },
    
    // خطا در احراز هویت
    authFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.userRole = null;
      state.loading = false;
      state.error = action.payload;
    },
    
    // خروج از سیستم
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.userRole = null;
      state.loading = false;
      state.error = null;
    },
    
    // به‌روزرسانی اطلاعات کاربر
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// اکشن‌های عمومی
export const { authStart, loginSuccess, authFailure, logout, updateUser } = authSlice.actions;

export default authSlice.reducer; 
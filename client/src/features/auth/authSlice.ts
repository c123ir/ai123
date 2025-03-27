// src/features/auth/authSlice.ts - اسلایس ریداکس برای مدیریت احراز هویت

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import authService, { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  ChangePasswordData
} from '../../services/auth.service';

// نوع داده کاربر
export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
  createdAt: string;
  updatedAt?: string;
}

// وضعیت اسلایس احراز هویت
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// وضعیت اولیه
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

// اکشن‌های ناهمگام (Async thunks)
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در ورود به سیستم');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در ثبت‌نام');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در خروج از سیستم');
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const refreshToken = state.auth.refreshToken;
      
      if (!refreshToken) {
        return rejectWithValue('توکن نوسازی موجود نیست');
      }
      
      const response = await authService.refreshToken(refreshToken);
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(error.response?.data?.message || 'خطا در نوسازی توکن');
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      
      if (!state.auth.token) {
        return rejectWithValue('توکن معتبر موجود نیست');
      }
      
      const user = await authService.getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در بارگذاری اطلاعات کاربر');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: ChangePasswordData, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در تغییر رمز عبور');
    }
  }
);

// اسلایس احراز هویت
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ریست کردن وضعیت خطا
    clearError: (state) => {
      state.error = null;
    },
    // پاک کردن اطلاعات احراز هویت (برای استفاده در interceptors)
    clearAuth: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    // بروزرسانی اطلاعات کاربر
    updateUser: (state, action: PayloadAction<Partial<AuthResponse['user']>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // ورود
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ثبت‌نام
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // خروج
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    });

    // نوسازی توکن
    builder.addCase(refreshAuthToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    });
    builder.addCase(refreshAuthToken.rejected, (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    });

    // بارگذاری اطلاعات کاربر
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loadUser.rejected, (state) => {
      state.loading = false;
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    });

    // تغییر رمز عبور
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// صادر کردن اکشن‌ها و ریدیوسر
export const { clearError, clearAuth, updateUser } = authSlice.actions;

// سلکتورها
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;

// src/features/user/userSlice.ts - اسلایس مدیریت کاربران

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import userService from '../../services/user.service';

// تعریف تایپ کاربر
export interface UserProfile {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage?: string;
  createdAt: string;
  updatedAt?: string;
}

// تعریف وضعیت اسلایس کاربران
interface UserState {
  users: UserProfile[];
  selectedUser: UserProfile | null;
  loading: boolean;
  error: string | null;
  totalUsers: number;
  page: number;
  limit: number;
}

// وضعیت اولیه
const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  totalUsers: 0,
  page: 1,
  limit: 10,
};

// اکشن‌های آسنکرون
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await userService.getUsers(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string | number, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(String(userId));
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// اسلایس کاربران
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.totalUsers = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    // دریافت لیست کاربران
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalUsers = action.payload.total;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // دریافت کاربر با شناسه
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// صادر کردن اکشن‌ها و ریدیوسر
export const { clearUsers, setPage, setLimit } = userSlice.actions;

// سلکتورها
export const selectUsers = (state: RootState) => state.user?.users;
export const selectSelectedUser = (state: RootState) => state.user?.selectedUser;
export const selectUsersLoading = (state: RootState) => state.user?.loading;
export const selectUsersError = (state: RootState) => state.user?.error;
export const selectTotalUsers = (state: RootState) => state.user?.totalUsers;
export const selectUserPage = (state: RootState) => state.user?.page;
export const selectUserLimit = (state: RootState) => state.user?.limit;

export default userSlice.reducer;

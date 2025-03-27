// src/features/error/errorSlice.ts - اسلایس ریداکس برای مدیریت خطاها

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// رابط وضعیت خطا
interface ErrorState {
  status: number | null;
  message: string | null;
  hasError: boolean;
}

// وضعیت اولیه
const initialState: ErrorState = {
  status: null,
  message: null,
  hasError: false,
};

// نوع داده ورودی اکشن setError
interface SetErrorPayload {
  status: number;
  message: string;
}

// ایجاد اسلایس خطا
const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<SetErrorPayload>) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.hasError = true;
    },
    clearError: (state) => {
      state.status = null;
      state.message = null;
      state.hasError = false;
    }
  }
});

// صادر کردن اکشن‌ها
export const { setError, clearError } = errorSlice.actions;

// سلکتورها
export const selectError = (state: RootState) => state.error;
export const selectHasError = (state: RootState) => state.error.hasError;
export const selectErrorMessage = (state: RootState) => state.error.message;
export const selectErrorStatus = (state: RootState) => state.error.status;

export default errorSlice.reducer; 
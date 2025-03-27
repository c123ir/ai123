// src/features/ui/uiSlice.ts - اسلایس مدیریت رابط کاربری

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// تعریف وضعیت UI
interface UiState {
  sidebarOpen: boolean;
  darkMode: boolean;
  loading: boolean;
}

// وضعیت اولیه
const initialState: UiState = {
  sidebarOpen: true,
  darkMode: localStorage.getItem('darkMode') === 'true',
  loading: false,
};

// ایجاد اسلایس UI
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString());
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// صادر کردن اکشن‌ها و ریدیوسر
export const { toggleSidebar, toggleDarkMode, setLoading } = uiSlice.actions;

// سلکتورها
export const selectSidebarOpen = (state: RootState) => state.ui?.sidebarOpen;
export const selectDarkMode = (state: RootState) => state.ui?.darkMode;
export const selectLoading = (state: RootState) => state.ui?.loading;

export default uiSlice.reducer;

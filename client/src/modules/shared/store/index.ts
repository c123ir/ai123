import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * استور Redux مشترک برای ماژول shared
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // اضافه کردن سایر ریدیوسرها در اینجا
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

// نوع‌های استور
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// هوک‌های استفاده از استور
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; 
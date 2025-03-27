// src/store.ts - تنظیمات Redux Store برای مدیریت حالت برنامه

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './features/auth/authSlice';
import notificationReducer from './features/notification/notificationSlice';
import tokenReducer from './features/token/tokenSlice';
import errorReducer from './features/error/errorSlice';
import uiReducer from './features/ui/uiSlice';
import userReducer from './features/user/userSlice';

// پیکربندی استور ریداکس
export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    token: tokenReducer,
    error: errorReducer,
    ui: uiReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production' && process.env.REACT_APP_REDUX_DEVTOOLS === 'true',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // اجازه استفاده از مقادیر غیرقابل سریالی‌سازی در اکشن‌ها یا استیت
        ignoredActions: [],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: [],
      },
    }),
});

// نوع‌های استور
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// هوک دیسپچ تایپ شده
export const useAppDispatch = () => useDispatch<AppDispatch>();
// هوک سلکتور تایپ شده
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

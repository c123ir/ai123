import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';

// تنظیمات فروشگاه Redux
const store = configureStore({
  reducer: {
    auth: authReducer,
    // در اینجا می‌توانید reducerهای دیگر را اضافه کنید
  },
  // middleware و devTools را می‌توان در اینجا تنظیم کرد
});

// تایپ‌های مورد نیاز برای استفاده از store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// هوک‌های مفید برای استفاده در کامپوننت‌ها
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; 
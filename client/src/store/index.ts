import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// ریدیوسرها
import authReducer from './slices/authSlice';
import tokenReducer from '../modules/token/store/tokenSlice';
import uiReducer from './slices/uiSlice';
import advisorReducer from '../modules/advisor/store/advisorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  token: tokenReducer,
  ui: uiReducer,
  advisor: advisorReducer
});

// تنظیمات استور
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

// نوع‌های مورد نیاز RootState و AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// هوک‌های مفید برای استفاده در کامپوننت‌ها
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store; 
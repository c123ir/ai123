import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// ریدیوسرها
import authReducer from '../modules/auth/store/authSlice';
import tokenReducer from '../modules/token/store/tokenSlice';
import projectReducer from '../modules/project/store/projectSlice';
import messageReducer from '../modules/message/store/messageSlice';
import exploreReducer from '../modules/explore/store/exploreSlice';
import profileReducer from '../modules/profile/store/profileSlice';
import uiReducer from '../modules/ui/store/uiSlice';
import adminReducer from '../modules/admin/store/adminSlice';
import advisorReducer from '../modules/advisor/store/advisorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  token: tokenReducer,
  project: projectReducer,
  message: messageReducer,
  explore: exploreReducer,
  profile: profileReducer,
  ui: uiReducer,
  admin: adminReducer,
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
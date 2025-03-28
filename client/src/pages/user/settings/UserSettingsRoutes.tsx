import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import UserSettings from './UserSettings';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

/**
 * مسیرهای مربوط به تنظیمات کاربر
 */
const UserSettingsRoutes: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  console.log('UserSettingsRoutes - Current Path:', location.pathname);
  console.log('UserSettingsRoutes - isAuthenticated:', isAuthenticated);

  // اگر کاربر احراز هویت نشده باشد، به صفحه ورود هدایت می‌شود
  if (!isAuthenticated) {
    console.log('UserSettingsRoutes - Redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route index element={<UserSettings />} />
      <Route path="profile" element={<UserSettings />} />
      <Route path="security" element={<UserSettings />} />
      <Route path="notifications" element={<UserSettings />} />
      <Route path="appearance" element={<UserSettings />} />
      <Route path="*" element={<Navigate to="./" replace />} />
    </Routes>
  );
};

export default UserSettingsRoutes; 
// src/routes/UserRoutes.tsx - مسیرهای پنل کاربران

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserLayout } from '../modules/shared/components/layout';

// صفحات کاربر
import UserDashboard from '../pages/user/dashboard/UserDashboard';
import UserProfile from '../pages/user/profile/UserProfile';
import UserSettings from '../pages/user/settings/UserSettings';
import UserSettingsRoutes from '../pages/user/settings/UserSettingsRoutes';
import TokenPage from '../pages/user/token/TokenPage';

/**
 * مسیرهای مربوط به بخش کاربران
 */
const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile" element={<UserProfile />} />
        
        {/* مسیرهای تنظیمات با زیرمسیرها */}
        <Route path="settings/*" element={<UserSettingsRoutes />} />
        
        <Route path="tokens" element={<TokenPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes; 
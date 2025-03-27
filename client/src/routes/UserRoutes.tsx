// src/routes/UserRoutes.tsx - مسیرهای پنل کاربران

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// کامپوننت‌های لایه و صفحات
import UserLayout from '../components/layout/UserLayout';
import Dashboard from '../pages/user/dashboard/Dashboard';
import Profile from '../pages/user/profile/Profile';
import TokensPage from '../pages/user/tokens/TokensPage';
import TransactionsPage from '../pages/user/transactions/TransactionsPage';
import SettingsPage from '../pages/user/settings/SettingsPage';

// در آینده، کامپوننت‌های واقعی از اینجا واردسازی خواهند شد
// import UserDashboard from '../pages/user/Dashboard';
// import UserProfile from '../pages/user/Profile';
// import UserTokens from '../pages/user/Tokens';
// import UserTransactions from '../pages/user/Transactions';
// import UserSettings from '../pages/user/Settings';

/**
 * تعریف مسیرهای دسترسی کاربر
 */
const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        {/* مسیر اصلی - ریدایرکت به داشبورد */}
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        
        {/* داشبورد کاربر */}
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* پروفایل کاربر */}
        <Route path="profile" element={<Profile />} />
        
        {/* صفحه مدیریت توکن‌ها */}
        <Route path="tokens" element={<TokensPage />} />
        
        {/* صفحه تراکنش‌ها */}
        <Route path="transactions" element={<TransactionsPage />} />
        
        {/* صفحه تنظیمات */}
        <Route path="settings" element={<SettingsPage />} />
        
        {/* مسیرهای نامعتبر - ریدایرکت به داشبورد */}
        <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes; 
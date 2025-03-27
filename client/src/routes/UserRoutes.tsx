// src/routes/UserRoutes.tsx - مسیرهای پنل کاربران

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// کامپوننت لایه
import UserLayout from '../components/layout/UserLayout';
// استفاده از مسیرهای تعریف شده در ماژول کاربر
import UserDashboardRoutes from '../modules/user/routes/UserRoutes';

/**
 * تعریف مسیرهای دسترسی کاربر
 * استفاده از مسیرهای تعریف شده در ماژول کاربر
 */
const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        {/* مسیر اصلی - ریدایرکت به داشبورد */}
        <Route index element={<Navigate to="/user/dashboard" replace />} />
        
        {/* استفاده از مسیرهای تعریف شده در ماژول کاربر */}
        <Route path="*" element={<UserDashboardRoutes />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes; 
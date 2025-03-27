// src/routes/AdminRoutes.tsx - مسیرهای پنل ادمین

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';

/**
 * مسیرهای پنل مدیریت
 */
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* مسیر اصلی - ریدایرکت به داشبورد */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* داشبورد مدیریت */}
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* سایر مسیرها - فعلا به داشبورد هدایت می‌شوند */}
        <Route path="users" element={<Dashboard />} />
        <Route path="tokens" element={<Dashboard />} />
        <Route path="reports" element={<Dashboard />} />
        <Route path="settings" element={<Dashboard />} />
        
        {/* مسیرهای نامعتبر - ریدایرکت به داشبورد */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 
// src/routes/AdminRoutes.tsx - مسیرهای پنل ادمین

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../modules/admin/components/AdminLayout';
import AdminModuleRoutes from '../modules/admin/routes/AdminRoutes';

/**
 * مسیرهای پنل مدیریت
 */
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        {/* استفاده از مسیرهای تعریف شده در ماژول ادمین */}
        <Route path="*" element={<AdminModuleRoutes />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 
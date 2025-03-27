import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../../layout/AdminLayout';
import AdminDashboard from './dashboard/AdminDashboard';
import UsersManagement from './users/UsersManagement';
import TokensManagement from './tokens/TokensManagement';
import Reports from './reports/Reports';
import Settings from './settings/Settings';

/**
 * مسیرهای مربوط به بخش مدیریت
 */
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="tokens" element={<TokensManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 
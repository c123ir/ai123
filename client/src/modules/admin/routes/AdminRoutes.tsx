import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../../shared/components/layout';
// TODO: Import these from admin module pages
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import UsersManagement from '../pages/users/UsersManagement';
import TokensManagement from '../pages/tokens/TokensManagement';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';

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
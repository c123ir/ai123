import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminRoutes from '../modules/admin/routes/AdminRoutes';
import UserRoutes from './UserRoutes';
import GuestRoutes from './GuestRoutes';
import Login from '../pages/common/auth/Login';
import Register from '../pages/common/auth/Register';
import ForgotPassword from '../pages/common/auth/ForgotPassword';
import { ProtectedRoute } from '../modules/shared/components/common';
import { RootState } from '../store';

/**
 * کامپوننت مسیریابی اصلی برنامه
 * مسیرهای عمومی و مسیرهای محافظت شده را تعریف می‌کند
 */
const AppRoutes: React.FC = () => {
  // در پروژه واقعی، باید از Redux یا Context برای مدیریت وضعیت کاربر استفاده شود
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role || '';
  
  return (
    <Routes>
      {/* مسیرهای عمومی */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* مسیرهای مهمان */}
      <Route path="/guest/*" element={<GuestRoutes />} />
      
      {/* مسیرهای مدیر */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
      
      {/* مسیرهای کاربر */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute requiredRole="user">
            <UserRoutes />
          </ProtectedRoute>
        }
      />
      
      {/* ریدایرکت صفحه اصلی */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            userRole === 'admin' ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/user/dashboard" replace />
            )
          ) : (
            <Navigate to="/guest/dashboard" replace />
          )
        }
      />
      
      {/* ریدایرکت به صفحه لاگین ادمین */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      
      {/* مسیر 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 
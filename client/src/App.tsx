import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/common/ThemeContext';
import { notification } from 'antd';
import FontLoader from './components/common/FontLoader';
import GuestRoutes from './pages/guest/GuestRoutes';
import AuthLayout from './components/layout/AuthLayout';
import Login from './pages/common/auth/Login';
import Register from './pages/common/auth/Register';
import ForgotPassword from './pages/common/auth/ForgotPassword';
import ProtectedRoute from './components/common/ProtectedRoute';
import UserDashboard from './pages/user/dashboard/UserDashboard';
import NotFoundPage from './pages/common/NotFoundPage';
import AdminRoutes from './routes/AdminRoutes';

// تنظیمات نوتیفیکیشن
notification.config({
  placement: 'topRight',
  duration: 4.5,
});

/**
 * کامپوننت اصلی برنامه
 */
const App: React.FC = () => {
  return (
    <ThemeProvider>
      {/* لودر فونت‌ها */}
      <FontLoader />
      
      {/* سیستم نوتیفیکیشن */}
      <div className="notification-container" />
      
      {/* مسیرهای اصلی */}
      <Routes>
        {/* ریدایرکت از صفحه اصلی به داشبورد مهمان */}
        <Route path="/" element={<Navigate to="/guest/dashboard" replace />} />
        
        {/* مسیرهای مهمان */}
        <Route path="/guest/*" element={<GuestRoutes />} />
        
        {/* مسیرهای احراز هویت */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        
        {/* مسیرهای کاربر */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* مسیرهای ادمین */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        
        {/* صفحه ۴۰۴ */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;

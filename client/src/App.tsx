import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { notification } from 'antd';
import './assets/styles/global.css';

// کامپوننت لودینگ
const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img src="/images/loading.gif" alt="در حال بارگذاری..." />
  </div>
);

// لیزی لودینگ مسیرها
const AdminRoutes = lazy(() => import('./routes/AdminRoutes'));
const UserRoutes = lazy(() => import('./routes/UserRoutes'));
const SimpleRoutes = lazy(() => import('./routes/SimpleRoutes'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// تنظیم سیستم نوتیفیکیشن
notification.config({
  placement: 'topRight',
  rtl: true,
});

/**
 * کامپوننت اصلی برنامه
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* مسیر پنل ادمین */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* مسیر پنل کاربران */}
        <Route path="/user/*" element={<UserRoutes />} />

        {/* مسیرهای سایت ساده */}
        <Route path="/*" element={<SimpleRoutes />} />

        {/* صفحه 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

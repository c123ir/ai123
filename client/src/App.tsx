import React, { Suspense } from 'react';
import { notification } from 'antd';
import './assets/styles/global.css';
import AppRoutes from './routes/AppRoutes';

// کامپوننت لودینگ
const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img src="/images/loading.gif" alt="در حال بارگذاری..." />
  </div>
);

// تنظیم سیستم نوتیفیکیشن
notification.config({
  placement: 'topRight',
  rtl: true,
});

/**
 * کامپوننت اصلی برنامه
 * استفاده از AppRoutes برای مدیریت متمرکز مسیرها
 */
const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;

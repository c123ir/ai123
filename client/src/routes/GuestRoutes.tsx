// src/routes/GuestRoutes.tsx - مسیرهای مهمانان (بدون نیاز به احراز هویت)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// کامپوننت‌های لایه و صفحات
import GuestLayout from '../components/layout/GuestLayout';
import GuestDashboard from '../pages/guest/dashboard/GuestDashboard';
import CalculatorPage from '../pages/guest/calculator/CalculatorPage';
import AboutPage from '../pages/guest/about/AboutPage';
import HelpPage from '../pages/guest/help/HelpPage';

/**
 * تعریف مسیرهای دسترسی مهمان (بدون نیاز به احراز هویت)
 */
const GuestRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        {/* مسیر اصلی - ریدایرکت به داشبورد مهمان */}
        <Route index element={<Navigate to="/guest/dashboard" replace />} />
        
        {/* داشبورد مهمان */}
        <Route path="dashboard" element={<GuestDashboard />} />
        
        {/* محاسبه اقساط */}
        <Route path="calculator" element={<CalculatorPage />} />
        
        {/* درباره ما */}
        <Route path="about" element={<AboutPage />} />
        
        {/* راهنما و پشتیبانی */}
        <Route path="help" element={<HelpPage />} />
        
        {/* مسیرهای نامعتبر - ریدایرکت به داشبورد مهمان */}
        <Route path="*" element={<Navigate to="/guest/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default GuestRoutes; 
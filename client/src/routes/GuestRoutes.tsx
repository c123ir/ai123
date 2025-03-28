// src/routes/GuestRoutes.tsx - مسیرهای مهمانان (بدون نیاز به احراز هویت)

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { GuestLayout } from '../modules/shared/components/layout';

// صفحات مهمان
import HomePage from '../pages/guest/home/HomePage';
import AboutPage from '../pages/guest/about/AboutPage';
import ContactPage from '../pages/guest/contact/ContactPage';
import CalculatorPage from '../pages/guest/calculator/CalculatorPage';
import GuestDashboard from '../pages/guest/dashboard/GuestDashboard';

/**
 * مسیرهای مربوط به بخش مهمان (کاربران وارد نشده)
 */
const GuestRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="calculator" element={<CalculatorPage />} />
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default GuestRoutes; 
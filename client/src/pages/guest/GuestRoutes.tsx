import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GuestLayout from '../../components/layout/GuestLayout';
import GuestDashboard from './dashboard/GuestDashboard';
import CalculatorPage from './calculator/CalculatorPage';
import AboutPage from './about/AboutPage';
import HelpPage from './help/HelpPage';

/**
 * مسیرهای دسترسی مهمان
 */
const GuestRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route path="/" element={<Navigate to="/guest/dashboard" replace />} />
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="calculator" element={<CalculatorPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  );
};

export default GuestRoutes; 
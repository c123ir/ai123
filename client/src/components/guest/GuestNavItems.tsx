import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalculateIcon from '@mui/icons-material/Calculate';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

/**
 * آیتم‌های منوی ناوبری برای کاربران مهمان
 */
export const guestNavItems = [
  {
    title: 'داشبورد',
    path: '/guest/dashboard',
    icon: <DashboardIcon />,
  },
  {
    title: 'محاسبه اقساط',
    path: '/guest/calculator',
    icon: <CalculateIcon />,
  },
  {
    title: 'درباره ما',
    path: '/guest/about',
    icon: <InfoIcon />,
  },
  {
    title: 'راهنما و پشتیبانی',
    path: '/guest/help',
    icon: <HelpIcon />,
  },
]; 
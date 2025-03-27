// src/components/common/NotificationSystem.tsx - سیستم نمایش اعلان‌ها

import React, { useEffect } from 'react';
import { message, notification } from 'antd';
import { useTheme } from './ThemeContext';

/**
 * کامپوننت NotificationSystem
 * این کامپوننت برای پیکربندی سیستم اعلان‌ها در برنامه استفاده می‌شود
 * می‌توان از این کامپوننت در App.tsx استفاده کرد
 */
export const NotificationSystem: React.FC = () => {
  const { direction } = useTheme();

  useEffect(() => {
    // تنظیم RTL برای message
    message.config({
      rtl: direction === 'rtl',
      maxCount: 3,
      duration: 3, // ثانیه
    });

    // تنظیم RTL برای notification
    notification.config({
      rtl: direction === 'rtl',
      placement: direction === 'rtl' ? 'topLeft' : 'topRight',
      duration: 4.5, // ثانیه
      maxCount: 3,
    });
  }, [direction]);

  // این کامپوننت چیزی رندر نمی‌کند
  return null;
};

/**
 * متدهای استاتیک برای نمایش پیام‌های متنی
 */
export const showMessage = {
  success: (content: string, duration?: number) => {
    message.success(content, duration);
  },
  error: (content: string, duration?: number) => {
    message.error(content, duration);
  },
  warning: (content: string, duration?: number) => {
    message.warning(content, duration);
  },
  info: (content: string, duration?: number) => {
    message.info(content, duration);
  },
  loading: (content: string, duration?: number) => {
    return message.loading(content, duration);
  },
};

/**
 * متدهای استاتیک برای نمایش اعلان‌ها
 */
export const showNotification = {
  success: (message: string, description?: string) => {
    notification.success({
      message,
      description,
    });
  },
  error: (message: string, description?: string) => {
    notification.error({
      message,
      description,
    });
  },
  warning: (message: string, description?: string) => {
    notification.warning({
      message,
      description,
    });
  },
  info: (message: string, description?: string) => {
    notification.info({
      message,
      description,
    });
  },
};

export default {
  NotificationSystem,
  showMessage,
  showNotification,
}; 
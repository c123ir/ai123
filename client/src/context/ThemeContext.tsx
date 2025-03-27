// src/context/ThemeContext.tsx - کانتکست مدیریت تم

import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import faIR from 'antd/es/locale/fa_IR';
import { lightTheme, darkTheme } from '../theme';

// تعریف تایپ برای کانتکست تم
interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

// ایجاد کانتکست با مقدار پیش‌فرض
export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

// تعریف پراپس کامپوننت
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * کامپوننت تامین‌کننده کانتکست تم
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // بررسی ترجیح کاربر در localStorage یا تنظیمات سیستم
  const getInitialMode = (): 'light' | 'dark' => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode as 'light' | 'dark';
    }
    
    // استفاده از تنظیمات سیستم به عنوان پیش‌فرض
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  // استیت برای حالت تاریک/روشن
  const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode);

  // تغییر حالت تاریک/روشن
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // به‌روزرسانی حالت تم بر اساس تغییرات سیستم
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // مقدار کانتکست
  const value = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  // انتخاب تم مناسب بر اساس حالت
  const themeConfig = useMemo(() => mode === 'light' ? lightTheme : darkTheme, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={themeConfig} direction="rtl" locale={faIR}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

/**
 * هوک سفارشی برای استفاده از کانتکست تم
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;

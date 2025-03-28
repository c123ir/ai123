import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import faIR from 'antd/es/locale/fa_IR';
import { lightTheme, darkTheme } from '../../../theme';

// تنظیمات RTL
const directionConfig = {
  rtl: {
    direction: 'rtl' as const,
    locale: faIR,
  },
  ltr: {
    direction: 'ltr' as const,
    locale: undefined,
  },
};

// تعریف نوع داده برای کانتکست تم
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  direction: 'rtl' | 'ltr';
  toggleDirection: () => void;
}

// ایجاد کانتکست با مقادیر پیش‌فرض
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  direction: 'rtl',
  toggleDirection: () => {},
});

// تعریف پراپ‌های کامپوننت ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * کامپوننت تأمین‌کننده تم
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // استفاده از حالت برای نگهداری وضعیت حالت تاریک
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // خواندن وضعیت تم از localStorage (در صورت وجود)
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  // استفاده از حالت برای نگهداری جهت (راست به چپ یا چپ به راست)
  const [direction, setDirection] = useState<'rtl' | 'ltr'>(() => {
    // خواندن جهت از localStorage (در صورت وجود)
    const savedDirection = localStorage.getItem('direction');
    return savedDirection ? (savedDirection as 'rtl' | 'ltr') : 'rtl';
  });

  // تابع تغییر وضعیت حالت تاریک
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  // تابع تغییر جهت
  const toggleDirection = () => {
    setDirection((prevDirection) => (prevDirection === 'rtl' ? 'ltr' : 'rtl'));
  };

  // ذخیره وضعیت تم در localStorage هنگام تغییر
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // اعمال کلاس CSS مناسب به body برای تغییر تم
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // ذخیره جهت در localStorage هنگام تغییر
  useEffect(() => {
    localStorage.setItem('direction', direction);
    // اعمال ویژگی dir به body برای تغییر جهت
    document.body.setAttribute('dir', direction);
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  // ارائه مقادیر به کامپوننت‌های فرزند
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, direction, toggleDirection }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * هوک دسترسی به کانتکست تم
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// اضافه کردن useThemeContext برای سازگاری با کدهای قبلی
export const useThemeContext = useTheme;

// صادر کردن کانتکست تم (برای دسترسی مستقیم در صورت نیاز)
export { ThemeContext };

export default ThemeProvider; 
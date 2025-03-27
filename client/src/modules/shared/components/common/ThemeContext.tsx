import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import faIR from 'antd/es/locale/fa_IR';
import { lightTheme, darkTheme } from '../../../../theme';

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

// تعریف نوع mode تم
export type ThemeMode = 'light' | 'dark';
export type Direction = 'rtl' | 'ltr';

// تعریف کانتکست تم
interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
  direction: Direction;
  toggleDirection: () => void;
  setDirection: (dir: Direction) => void;
  theme: ThemeMode;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
  toggleTheme: () => {},
  direction: 'rtl',
  toggleDirection: () => {},
  setDirection: () => {},
  theme: 'light',
});

// استفاده از هوک useTheme برای دسترسی به کانتکست تم
export const useTheme = () => useContext(ThemeContext);

// تعریف پراپرتی‌های ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  defaultDirection?: Direction;
}

// ایجاد ThemeProvider برای مدیریت تم
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'light',
  defaultDirection = 'rtl',
}) => {
  // استفاده از مقادیر ذخیره شده در localStorage
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return (savedMode as ThemeMode) || defaultMode;
  });

  const [direction, setDirection] = useState<Direction>(() => {
    const savedDirection = localStorage.getItem('theme-direction');
    return (savedDirection as Direction) || defaultDirection;
  });

  // ذخیره‌سازی تغییرات در localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('theme-direction', direction);
    document.documentElement.setAttribute('dir', direction);
  }, [direction]);

  // تغییر حالت تم بین روشن و تاریک
  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // تغییر جهت بین راست به چپ و چپ به راست
  const toggleDirection = () => {
    setDirection(prevDir => (prevDir === 'rtl' ? 'ltr' : 'rtl'));
  };

  // انتخاب تم مناسب بر اساس حالت
  const currentTheme = mode === 'light' ? lightTheme : darkTheme;
  const currentDirection = directionConfig[direction];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        direction,
        toggleDirection,
        setDirection: (dir: Direction) => setDirection(dir),
        theme: mode,
      }}
    >
      <ConfigProvider
        theme={{
          ...currentTheme,
          token: {
            ...currentTheme.token,
            fontFamily: 'Vazirmatn, -apple-system, BlinkMacSystemFont, sans-serif',
          },
        }}
        direction={currentDirection.direction}
        locale={currentDirection.locale}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 
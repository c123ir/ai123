# سیستم تم دستیار هوشمند ۱۲۳

<div dir="rtl">

## معرفی

سیستم تم دستیار هوشمند ۱۲۳ یک سیستم پیشرفته و انعطاف‌پذیر است که امکان تغییر ظاهر برنامه را به صورت پویا فراهم می‌کند. این سیستم با استفاده از Ant Design ConfigProvider و کانتکست React پیاده‌سازی شده و قابلیت پشتیبانی از:

- حالت‌های روشن و تاریک (Light و Dark)
- پشتیبانی کامل از RTL و LTR
- قابلیت تغییر رنگ‌های اصلی برنامه
- سازگاری با سیستم تم دستگاه کاربر

## ساختار سیستم تم

سیستم تم در پوشه `src/modules/shared/context/ThemeContext` قرار دارد و شامل فایل‌های زیر است:

```
src/modules/shared/context/ThemeContext/
├── ThemeContext.tsx     # کانتکست اصلی تم و پراویدر
├── theme.constants.ts   # ثابت‌های مربوط به تم (رنگ‌ها، فونت‌ها و...)
├── theme.utils.ts       # توابع کمکی برای مدیریت تم
└── index.ts             # صادر کردن کامپوننت‌ها و توابع
```

## نحوه استفاده از سیستم تم

### پیکربندی اولیه

سیستم تم در بالاترین سطح برنامه (`index.tsx`) پیکربندی می‌شود:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/modules/shared/context/ThemeContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

### استفاده از هوک useTheme

برای دسترسی به تم جاری و توابع تغییر آن، از هوک `useTheme` استفاده می‌شود:

```tsx
import { useTheme } from '@/modules/shared/context/ThemeContext';

const MyComponent = () => {
  const { 
    theme, 
    mode, 
    direction, 
    toggleThemeMode, 
    toggleDirection,
    setThemeColor 
  } = useTheme();

  return (
    <div>
      <button onClick={toggleThemeMode}>
        {mode === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
      </button>
      <button onClick={toggleDirection}>
        {direction === 'rtl' ? 'چپ به راست' : 'راست به چپ'}
      </button>
      <button onClick={() => setThemeColor('blue')}>
        تم آبی
      </button>
    </div>
  );
};
```

### دسترسی به مقادیر تم در استایل‌ها

می‌توانید از ابزار `createStyles` برای دسترسی به مقادیر تم در استایل‌ها استفاده کنید:

```tsx
import { createStyles } from '@/modules/shared/utils/createStyles';

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colorBgBase,
    color: theme.colorTextBase,
    padding: theme.paddingMD,
    borderRadius: theme.borderRadiusLG,
    boxShadow: theme.mode === 'dark' ? '0 0 10px rgba(0, 0, 0, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: theme.colorPrimary,
    color: theme.colorWhite,
    border: 'none',
    borderRadius: theme.borderRadius,
    padding: `${theme.paddingSM}px ${theme.paddingMD}px`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colorPrimaryHover,
    },
  },
}));

const ThemedComponent = () => {
  const { classes } = useStyles();
  
  return (
    <div className={classes.container}>
      <button className={classes.button}>دکمه</button>
    </div>
  );
};
```

## پیاده‌سازی سیستم تم

### ThemeContext.tsx

```tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { themeColors, lightTheme, darkTheme } from './theme.constants';
import { getInitialThemeSettings } from './theme.utils';

// تعریف تایپ‌های مربوط به کانتکست تم
export type ThemeMode = 'light' | 'dark';
export type ThemeDirection = 'rtl' | 'ltr';
export type ThemeColorKey = keyof typeof themeColors;

interface ThemeContextType {
  theme: typeof lightTheme | typeof darkTheme;
  mode: ThemeMode;
  direction: ThemeDirection;
  colorKey: ThemeColorKey;
  toggleThemeMode: () => void;
  toggleDirection: () => void;
  setThemeColor: (colorKey: ThemeColorKey) => void;
}

// ایجاد کانتکست با مقدار اولیه
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// هوک برای استفاده از کانتکست تم
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // دریافت تنظیمات اولیه از localStorage یا تنظیمات سیستم
  const { initialMode, initialDirection, initialColorKey } = getInitialThemeSettings();
  
  // تعریف state‌های مربوط به تم
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [direction, setDirection] = useState<ThemeDirection>(initialDirection);
  const [colorKey, setColorKey] = useState<ThemeColorKey>(initialColorKey);
  
  // ایجاد آبجکت تم بر اساس mode جاری
  const theme = useMemo(() => {
    const baseTheme = mode === 'dark' ? darkTheme : lightTheme;
    
    return {
      ...baseTheme,
      colorPrimary: themeColors[colorKey].primary,
      colorPrimaryHover: themeColors[colorKey].primaryHover,
      colorPrimaryActive: themeColors[colorKey].primaryActive,
      colorPrimaryBg: themeColors[colorKey].primaryBg,
    };
  }, [mode, colorKey]);
  
  // تنظیم جهت سند HTML
  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.body.setAttribute('dir', direction);
    
    // ذخیره تنظیمات در localStorage
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('themeDirection', direction);
    localStorage.setItem('themeColorKey', colorKey);
  }, [mode, direction, colorKey]);
  
  // توابع تغییر تنظیمات تم
  const toggleThemeMode = () => {
    setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  };
  
  const toggleDirection = () => {
    setDirection(prevDir => prevDir === 'rtl' ? 'ltr' : 'rtl');
  };
  
  const setThemeColor = (newColorKey: ThemeColorKey) => {
    setColorKey(newColorKey);
  };
  
  // تنظیمات Ant Design ConfigProvider
  const algorithm = mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
  const token = themeColors[colorKey];
  
  // مقدار کانتکست
  const contextValue: ThemeContextType = {
    theme,
    mode,
    direction,
    colorKey,
    toggleThemeMode,
    toggleDirection,
    setThemeColor,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        direction={direction}
        theme={{
          algorithm: algorithm,
          token: token,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
```

### theme.constants.ts

```ts
// تعریف رنگ‌های قابل استفاده در برنامه
export const themeColors = {
  blue: {
    primary: '#1890ff',
    primaryHover: '#40a9ff',
    primaryActive: '#096dd9',
    primaryBg: '#e6f7ff',
  },
  green: {
    primary: '#52c41a',
    primaryHover: '#73d13d',
    primaryActive: '#389e0d',
    primaryBg: '#f6ffed',
  },
  red: {
    primary: '#f5222d',
    primaryHover: '#ff4d4f',
    primaryActive: '#cf1322',
    primaryBg: '#fff1f0',
  },
  purple: {
    primary: '#722ed1',
    primaryHover: '#9254de',
    primaryActive: '#531dab',
    primaryBg: '#f9f0ff',
  },
};

// تعریف تم روشن
export const lightTheme = {
  // رنگ‌های پایه
  colorBgBase: '#ffffff',
  colorTextBase: '#000000',
  colorBorder: '#d9d9d9',
  
  // رنگ‌های متن
  colorText: 'rgba(0, 0, 0, 0.85)',
  colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
  colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
  colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
  
  // رنگ‌های پس‌زمینه
  colorBgLayout: '#f0f2f5',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
  
  // سایه‌ها
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
  boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  
  // تایپوگرافی
  fontFamily: '"Vazirmatn", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: 14,
  lineHeight: 1.5715,
  
  // شعاع مرزها
  borderRadius: 4,
  borderRadiusSM: 2,
  borderRadiusLG: 8,
  
  // فاصله‌ها
  paddingXS: 8,
  paddingSM: 12,
  paddingMD: 16,
  paddingLG: 24,
  
  // حالت
  mode: 'light' as const,
};

// تعریف تم تاریک
export const darkTheme = {
  // رنگ‌های پایه
  colorBgBase: '#000000',
  colorTextBase: '#ffffff',
  colorBorder: '#424242',
  
  // رنگ‌های متن
  colorText: 'rgba(255, 255, 255, 0.85)',
  colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
  colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
  colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
  
  // رنگ‌های پس‌زمینه
  colorBgLayout: '#141414',
  colorBgContainer: '#1f1f1f',
  colorBgElevated: '#1f1f1f',
  colorBgSpotlight: 'rgba(255, 255, 255, 0.85)',
  
  // سایه‌ها
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.8), 0 3px 6px -4px rgba(0, 0, 0, 0.6), 0 9px 28px 8px rgba(0, 0, 0, 0.5)',
  
  // تایپوگرافی
  fontFamily: '"Vazirmatn", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: 14,
  lineHeight: 1.5715,
  
  // شعاع مرزها
  borderRadius: 4,
  borderRadiusSM: 2,
  borderRadiusLG: 8,
  
  // فاصله‌ها
  paddingXS: 8,
  paddingSM: 12,
  paddingMD: 16,
  paddingLG: 24,
  
  // حالت
  mode: 'dark' as const,
};
```

### theme.utils.ts

```ts
import { ThemeMode, ThemeDirection, ThemeColorKey } from './ThemeContext';

// تشخیص حالت تم سیستم کاربر
export const getPreferredColorScheme = (): ThemeMode => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// دریافت تنظیمات اولیه برای تم
export const getInitialThemeSettings = () => {
  // تلاش برای خواندن از localStorage
  const storedMode = localStorage.getItem('themeMode') as ThemeMode | null;
  const storedDirection = localStorage.getItem('themeDirection') as ThemeDirection | null;
  const storedColorKey = localStorage.getItem('themeColorKey') as ThemeColorKey | null;
  
  // اگر در localStorage موجود نبود، از تنظیمات سیستم یا مقادیر پیش‌فرض استفاده کن
  return {
    initialMode: storedMode || getPreferredColorScheme(),
    initialDirection: storedDirection || 'rtl',
    initialColorKey: storedColorKey || 'blue',
  };
};

// ابزار کمکی برای ایجاد استایل‌های متناسب با تم
export const createThemeStyles = (mode: ThemeMode, styles: any) => {
  return styles[mode];
};
```

## کامپوننت تغییر تم

نمونه کامپوننت برای تغییر تنظیمات تم:

```tsx
import React from 'react';
import { useTheme } from '@/modules/shared/context/ThemeContext';
import { Radio, Switch, Space, Card, Typography } from 'antd';
import { 
  BulbOutlined, 
  BulbFilled, 
  GlobalOutlined, 
  BgColorsOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

const ThemeSettings: React.FC = () => {
  const { 
    mode, 
    direction, 
    colorKey, 
    toggleThemeMode, 
    toggleDirection, 
    setThemeColor 
  } = useTheme();

  return (
    <Card title="تنظیمات ظاهری">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Title level={5}>حالت نمایش</Title>
          <Switch
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbFilled />}
            checked={mode === 'dark'}
            onChange={toggleThemeMode}
          />
          <span style={{ marginRight: 8 }}>
            {mode === 'dark' ? 'حالت تاریک' : 'حالت روشن'}
          </span>
        </div>
        
        <div>
          <Title level={5}>جهت قالب</Title>
          <Switch
            checkedChildren="RTL"
            unCheckedChildren="LTR"
            checked={direction === 'rtl'}
            onChange={toggleDirection}
          />
          <span style={{ marginRight: 8 }}>
            {direction === 'rtl' ? 'راست به چپ' : 'چپ به راست'}
          </span>
        </div>
        
        <div>
          <Title level={5}>رنگ اصلی</Title>
          <Radio.Group 
            value={colorKey} 
            onChange={(e) => setThemeColor(e.target.value)}
            optionType="button"
          >
            <Radio.Button value="blue">آبی</Radio.Button>
            <Radio.Button value="green">سبز</Radio.Button>
            <Radio.Button value="red">قرمز</Radio.Button>
            <Radio.Button value="purple">بنفش</Radio.Button>
          </Radio.Group>
        </div>
      </Space>
    </Card>
  );
};

export default ThemeSettings;
```

## نکات مهم

1. **عملکرد RTL**:
   - تمامی کامپوننت‌های Ant Design به صورت خودکار از RTL پشتیبانی می‌کنند.
   - تنظیم جهت در `ConfigProvider` باعث تغییر جهت تمامی کامپوننت‌های زیرمجموعه می‌شود.
   - برای CSS سفارشی، از قوانین `[dir="rtl"]` استفاده کنید.

2. **بهینه‌سازی عملکرد**:
   - از `useMemo` برای جلوگیری از محاسبات مجدد مقادیر تم استفاده شده است.
   - تغییرات تم باعث رندر مجدد تمامی کامپوننت‌های زیرمجموعه `ThemeProvider` می‌شود.

3. **ذخیره‌سازی تنظیمات**:
   - تنظیمات تم در `localStorage` ذخیره می‌شود تا در بارگذاری‌های بعدی حفظ شود.
   - اگر `localStorage` در دسترس نباشد، از تنظیمات پیش‌فرض استفاده می‌شود.

4. **سازگاری با تم سیستم**:
   - سیستم تم می‌تواند با تم سیستم عامل کاربر هماهنگ شود.
   - برای این کار از `window.matchMedia('(prefers-color-scheme: dark)')` استفاده می‌شود.

5. **توسعه و سفارشی‌سازی**:
   - برای افزودن رنگ‌های جدید، آن‌ها را در `themeColors` در `theme.constants.ts` اضافه کنید.
   - برای افزودن متغیرهای جدید به تم، آن‌ها را در هر دو آبجکت `lightTheme` و `darkTheme` اضافه کنید.

</div> 
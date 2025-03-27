# طرح مهاجرت از Material UI به Ant Design

<div dir="rtl">

## مقدمه

این سند طرح مهاجرت پروژه دستیار هوشمند ۱۲۳ از Material UI به Ant Design را شرح می‌دهد. هدف اصلی انجام این مهاجرت، بهره‌مندی از مزایای Ant Design در زمینه‌های زیر است:

- کامپوننت‌های پیشرفته‌تر برای نمایش داده‌های مالی و داشبوردها
- کتابخانه نموداری اختصاصی Ant Design Charts برای نمایش نمودارهای سود و سرمایه‌گذاری
- پشتیبانی بهتر از RTL و زبان فارسی
- کامپوننت‌های سازمانی و تجاری با ظاهر حرفه‌ای

## مراحل مهاجرت

مهاجرت از Material UI به Ant Design در ۵ مرحله اصلی انجام خواهد شد:

### ۱. نصب و پیکربندی Ant Design

- نصب پکیج‌های Ant Design
- پیکربندی تم و استایل‌های پایه
- راه‌اندازی پشتیبانی RTL و فارسی

### ۲. تغییر سیستم تم و حالت تاریک/روشن

- بازنویسی کانتکست تم با استفاده از ConfigProvider
- مهاجرت تنظیمات تم روشن و تاریک
- حفظ ترجیحات کاربر

### ۳. مهاجرت کامپوننت‌های پایه

- مهاجرت کامپوننت‌های لایوت (Layout)
- مهاجرت کامپوننت‌های فرم و ورودی داده
- مهاجرت کامپوننت‌های نمایش داده

### ۴. مهاجرت داشبوردها و نمودارها

- تغییر نمودارها به Ant Design Charts
- بهبود داشبورد کاربر و ادمین
- پیاده‌سازی نمودارهای ریل‌تایم

### ۵. تست و اصلاحات نهایی

- تست رسپانسیو بودن
- تست RTL و رفع مشکلات احتمالی
- تست حالت تاریک/روشن

## جزئیات فنی مهاجرت

### ۱. نصب و پیکربندی اولیه

#### نصب پکیج‌های مورد نیاز:

```bash
npm uninstall @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install antd @ant-design/icons @ant-design/charts
```

#### پیکربندی فایل index.tsx:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/lib/locale/fa_IR';
import App from './App';
import './styles/index.css';

// استایل‌های Ant Design
import 'antd/dist/antd.variable.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={fa_IR} direction="rtl">
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
```

### ۲. سیستم تم و حالت تاریک/روشن

#### بازنویسی کانتکست تم:

```tsx
// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { theme, ConfigProvider } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getInitialMode = (): 'light' | 'dark' => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode as 'light' | 'dark';
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

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

  const themeConfig = useMemo(() => {
    return {
      algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
      token: {
        colorPrimary: '#4caf50',
        colorSuccess: '#4caf50',
        colorInfo: '#2196f3',
        colorWarning: '#ff9800',
        colorError: '#f44336',
        borderRadius: 8,
        fontFamily: '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif',
      },
    };
  }, [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig} direction="rtl">
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
```

### ۳. تغییر استایل‌های پایه

#### فایل styles/index.css:

```css
@font-face {
  font-family: 'Vazirmatn';
  src: url('../assets/fonts/Vazirmatn-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Vazirmatn';
  src: url('../assets/fonts/Vazirmatn-Bold.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Vazirmatn';
  src: url('../assets/fonts/Vazirmatn-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  direction: rtl;
  font-family: 'Vazirmatn', 'Roboto', 'Helvetica', 'Arial', sans-serif;
}

/* تنظیمات RTL برای Ant Design */
.ant-input,
.ant-select,
.ant-picker,
.ant-form-item-label,
.ant-modal-title,
.ant-typography {
  text-align: right;
}

/* استایل‌های مربوط به تبدیل اعداد */
.ltr-nums {
  direction: ltr;
  display: inline-block;
}

/* استایل‌های رسپانسیو */
@media (max-width: 768px) {
  .ant-table {
    overflow-x: auto;
  }
  
  .responsive-hide-sm {
    display: none !important;
  }
}
```

### ۴. فهرست کامپوننت‌های نیازمند تغییر

#### کامپوننت‌های لایوت:
- MainLayout (لایوت اصلی)
- Sidebar (سایدبار)
- Header (هدر)
- Navbar (منوی اصلی)
- Footer (فوتر)

#### کامپوننت‌های فرم:
- TextField → Input
- Select → Select
- Button → Button
- Checkbox → Checkbox
- Switch → Switch
- DatePicker → DatePicker
- RadioGroup → Radio.Group

#### کامپوننت‌های ناوبری:
- Tabs → Tabs
- Drawer → Drawer
- Dialog → Modal
- Menu → Menu

#### کامپوننت‌های نمایش داده:
- Card → Card
- Table → Table
- List → List
- Typography → Typography
- Divider → Divider
- Paper → Card

#### کامپوننت‌های بازخورد:
- Snackbar → notification
- Alert → Alert
- Skeleton → Skeleton
- ProgressBar → Progress

#### نمودارها:
- Recharts → Ant Design Charts

## جدول زمانی

| مرحله | توضیحات | زمان تخمینی |
|------|---------|-----------|
| ۱ | نصب و پیکربندی اولیه | ۱ روز |
| ۲ | تغییر سیستم تم | ۱ روز |
| ۳ | مهاجرت کامپوننت‌های لایوت | ۲ روز |
| ۴ | مهاجرت کامپوننت‌های فرم | ۲ روز |
| ۵ | مهاجرت کامپوننت‌های نمایش داده | ۲ روز |
| ۶ | مهاجرت نمودارها و داشبوردها | ۳ روز |
| ۷ | تست و اصلاحات | ۲ روز |
| **مجموع** | | **۱۳ روز** |

## ملاحظات مهم

- تمام پشتیبانی از RTL در Ant Design از طریق `direction="rtl"` در `ConfigProvider` انجام می‌شود
- سیستم تبدیل اعداد فارسی به انگلیسی باید با کامپوننت‌های Ant Design سازگار شود
- برای نمودارها، باید از `@ant-design/charts` به جای `recharts` استفاده شود
- در صورت نیاز می‌توان از ترکیب Tailwind CSS با Ant Design برای استایل‌دهی بیشتر استفاده کرد

## منابع

- [مستندات رسمی Ant Design](https://ant.design/docs/react/introduce)
- [پشتیبانی RTL در Ant Design](https://ant.design/docs/react/rtl)
- [مستندات Ant Design Charts](https://charts.ant.design/en)

</div>

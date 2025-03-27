# ساختار پروژه - نسخه ۲

<div dir="rtl">

## معرفی
این سند ساختار جامع پروژه **دستیار هوشمند یک دو سه** (SmartAi123) در نسخه ۲ را شرح می‌دهد. این مستند ترکیبی از ساختار پروژه قبلی و تغییرات اعمال شده در معماری جدید ماژولار است.

## ساختار پوشه‌بندی کلی

```
client/
├── public/                  # فایل‌های استاتیک
│   ├── fonts/               # فونت‌های مورد استفاده
│   ├── images/              # تصاویر عمومی
│   ├── index.html           # فایل HTML اصلی
│   └── manifest.json        # منیفست PWA
├── src/                     # کدهای منبع
│   ├── assets/              # فایل‌های استاتیک (تصاویر، فونت‌ها، استایل‌ها)
│   │   ├── fonts/           # فونت‌های استفاده شده در برنامه
│   │   ├── images/          # تصاویر مورد استفاده در برنامه
│   │   └── styles/          # استایل‌های سراسری
│   ├── modules/             # ماژول‌های اصلی برنامه (ساختار جدید)
│   │   ├── admin/           # ماژول مدیریت
│   │   │   ├── components/  # کامپوننت‌های مختص مدیریت
│   │   │   ├── pages/       # صفحات بخش مدیریت
│   │   │   └── services/    # سرویس‌های بخش مدیریت
│   │   ├── shared/          # ماژول اشتراکی (استفاده شده در کل برنامه)
│   │   │   ├── components/  # کامپوننت‌های مشترک
│   │   │   │   └── common/  # کامپوننت‌های پایه مشترک
│   │   │   ├── context/     # کانتکست‌های ری‌اکت (مثل ThemeContext)
│   │   │   ├── hooks/       # هوک‌های سفارشی
│   │   │   ├── types/       # تعاریف تایپ‌های مشترک
│   │   │   └── utils/       # توابع کمکی مشترک
│   │   └── user/            # ماژول کاربران
│   │       ├── components/  # کامپوننت‌های مختص کاربران
│   │       ├── pages/       # صفحات بخش کاربران
│   │       └── services/    # سرویس‌های بخش کاربران
│   ├── components/          # کامپوننت‌های قابل استفاده مجدد (ساختار قدیمی)
│   │   ├── common/          # کامپوننت‌های عمومی
│   │   ├── admin/           # کامپوننت‌های مختص ادمین
│   │   ├── user/            # کامپوننت‌های مختص کاربر
│   │   └── layout/          # کامپوننت‌های لایه‌ای
│   ├── pages/               # صفحات اصلی برنامه
│   │   ├── admin/           # صفحات مدیریتی
│   │   ├── simple/          # صفحات ساده سایت
│   │   └── user/            # صفحات کاربری
│   ├── routes/              # تعریف مسیرهای برنامه
│   │   ├── AdminRoutes.tsx  # مسیرهای بخش مدیریت
│   │   ├── SimpleRoutes.tsx # مسیرهای سایت ساده
│   │   └── UserRoutes.tsx   # مسیرهای بخش کاربری
│   ├── layout/              # لایه‌های اصلی برنامه
│   ├── services/            # سرویس‌های اصلی برنامه (API، احراز هویت و...)
│   ├── store/               # مدیریت state با Redux
│   ├── theme/               # تنظیمات تم برنامه (روشن/تاریک)
│   ├── utils/               # توابع کمکی
│   │   └── validation/      # توابع اعتبارسنجی
│   ├── hooks/               # هوک‌های سفارشی (ساختار قدیمی)
│   ├── context/             # کانتکست‌های React (ساختار قدیمی)
│   ├── features/            # قابلیت‌های Redux
│   ├── docs/                # مستندات داخلی
│   ├── i18n.ts              # تنظیمات ترجمه
│   ├── App.tsx              # کامپوننت اصلی
│   └── index.tsx            # نقطه ورود برنامه
└── package.json             # وابستگی‌ها و اسکریپت‌ها
```

## معماری ماژولار

### منطق ساختاربندی ماژولار

در معماری جدید، کد برنامه به ماژول‌های مستقل با مسئولیت‌های مشخص تقسیم شده است. هر ماژول شامل تمام اجزای مورد نیاز برای یک دامنه کاری خاص است:

1. **ماژول shared**: کامپوننت‌ها، ابزارها و کانتکست‌های مشترک که در کل برنامه استفاده می‌شوند
2. **ماژول admin**: کامپوننت‌ها و سرویس‌های مختص بخش مدیریت
3. **ماژول user**: کامپوننت‌ها و سرویس‌های مختص بخش کاربری

این ساختار باعث می‌شود:
- تفکیک واضح بین دامنه‌های مختلف کاری
- کاهش وابستگی‌های متقابل بین بخش‌های مختلف
- توسعه مستقل ماژول‌ها
- خوانایی و قابلیت نگهداری بهتر کد

### مسیرهای نسبی و مطلق

برای بهبود خوانایی و جلوگیری از مسیرهای طولانی، از الگوی زیر استفاده کنید:

```tsx
// استفاده از مسیرهای نسبی
import { Button } from '../../modules/shared/components/common/Button';

// استفاده از الیاس‌های تعریف شده در tsconfig.json (توصیه شده)
import { Button } from '@shared/components/common/Button';
import { Dashboard } from '@admin/pages/Dashboard';
import { Profile } from '@user/pages/Profile';
```

## تکنولوژی‌های اصلی

### پایه‌ای
- **React**: کتابخانه اصلی توسعه رابط کاربری
- **TypeScript**: افزودن تایپ‌های استاتیک به JavaScript
- **React Router**: مسیریابی در برنامه

### رابط کاربری
- **Ant Design**: کتابخانه اصلی کامپوننت‌های UI (در نسخه جدید)
- **Ant Design Charts**: کتابخانه نمودارها
- **LESS/SCSS**: پیش‌پردازنده CSS

### مدیریت حالت
- **Redux Toolkit**: مدیریت حالت برنامه
- **React Context API**: مدیریت حالت محلی‌تر

### سرویس‌ها و ارتباطات
- **Axios**: ارتباط با API‌های سرور
- **i18next**: بین‌المللی‌سازی و پشتیبانی از چند زبان

### تست و کیفیت کد
- **Jest**: فریم‌ورک تست
- **React Testing Library**: تست کامپوننت‌ها
- **ESLint**: بررسی استاتیک کد
- **Prettier**: فرمت‌دهی خودکار کد

## کامپوننت‌های پایه

### کامپوننت‌های اصلی

کامپوننت‌های پایه اصلی پروژه در مسیر `modules/shared/components/common` قرار دارند:

| کامپوننت | کاربرد | نمونه استفاده |
|----------|--------|---------------|
| Button | دکمه‌های پایه با انواع مختلف | `<Button type="primary">ذخیره</Button>` |
| Card | نمایش محتوا در قالب کارت | `<Card title="عنوان">محتوا</Card>` |
| Input | فیلدهای ورودی | `<Input placeholder="نام کاربری" />` |
| Modal | پنجره‌های بازشو | `<Modal visible={true} title="عنوان">محتوا</Modal>` |
| Table | جدول‌های داده | `<Table columns={columns} dataSource={data} />` |
| Form | فرم‌های ورودی | `<Form onFinish={handleSubmit}>{/* فیلدها */}</Form>` |
| Typography | متون با استایل‌های مختلف | `<Typography.Title level={2}>عنوان</Typography.Title>` |

### کامپوننت‌های سفارشی

علاوه بر کامپوننت‌های پایه Ant Design، پروژه دارای کامپوننت‌های سفارشی است:

| کامپوننت | کاربرد | مسیر |
|----------|--------|------|
| DigitConverterInput | تبدیل اعداد فارسی به انگلیسی | `modules/shared/components/common/DigitConverterInput` |
| ErrorBoundary | مدیریت خطاهای اجرایی | `modules/shared/components/common/ErrorBoundary` |
| LazyImage | بارگذاری تنبل تصاویر | `modules/shared/components/common/LazyImage` |
| SimpleLayout | لایه سایت ساده | `components/common/SimpleLayout` |

## سیستم تم

### استفاده از ConfigProvider

سیستم تم بر پایه Ant Design و با استفاده از ConfigProvider پیاده‌سازی شده است:

```tsx
// src/modules/shared/context/ThemeContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { faIR } from 'antd/lib/locale';

const { defaultAlgorithm, darkAlgorithm } = theme;

// تعریف انواع تم
type ThemeMode = 'light' | 'dark';
type ThemeDirection = 'rtl' | 'ltr';

// تعریف کانتکست تم
export const ThemeContext = createContext({
  mode: 'light' as ThemeMode,
  direction: 'rtl' as ThemeDirection,
  toggleColorMode: () => {},
  toggleDirection: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // حالت اولیه تم
  const [mode, setMode] = useState<ThemeMode>('light');
  const [direction, setDirection] = useState<ThemeDirection>('rtl');
  
  // تنظیمات تم
  const themeConfig: ThemeConfig = {
    algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: '#4caf50',
      borderRadius: 8,
      fontFamily: '"Vazirmatn", "Roboto", "Arial", sans-serif',
    },
    // تنظیمات کامپوننت‌های خاص
    components: {
      Button: {
        borderRadius: 8,
      },
      Card: {
        borderRadius: 12,
      },
    },
  };
  
  // توابع تغییر حالت تم
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  const toggleDirection = () => {
    setDirection((prevDir) => (prevDir === 'rtl' ? 'ltr' : 'rtl'));
  };
  
  return (
    <ThemeContext.Provider value={{ mode, direction, toggleColorMode, toggleDirection }}>
      <ConfigProvider theme={themeConfig} direction={direction} locale={faIR}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// هوک برای استفاده آسان از کانتکست تم
export const useThemeContext = () => React.useContext(ThemeContext);
```

### استفاده از تم در کامپوننت‌ها

```tsx
import React from 'react';
import { useThemeContext } from '@shared/context/ThemeContext';
import { Button } from 'antd';

const ThemeToggleButton: React.FC = () => {
  const { mode, toggleColorMode } = useThemeContext();
  
  return (
    <Button onClick={toggleColorMode}>
      {mode === 'light' ? 'حالت تاریک' : 'حالت روشن'}
    </Button>
  );
};
```

## سیستم مسیریابی

### ساختار مسیریابی

مسیریابی در پروژه با استفاده از React Router و به صورت ماژولار انجام می‌شود:

```tsx
// src/routes/index.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '@shared/components/common/Loading';

// مسیرهای اصلی به صورت تنبل بارگذاری می‌شوند
const AdminRoutes = lazy(() => import('./AdminRoutes'));
const UserRoutes = lazy(() => import('./UserRoutes'));
const SimpleRoutes = lazy(() => import('./SimpleRoutes'));
const AuthRoutes = lazy(() => import('./AuthRoutes'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/*" element={<SimpleRoutes />} />
      </Routes>
    </Suspense>
  );
};
```

### مسیرهای ماژول‌های مختلف

هر ماژول دارای فایل مسیریابی مخصوص به خود است:

```tsx
// src/routes/AdminRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@modules/admin/components/AdminLayout';
import Dashboard from '@modules/admin/pages/Dashboard';
import UserManagement from '@modules/admin/pages/UserManagement';
import Settings from '@modules/admin/pages/Settings';

const AdminRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
```

## سیستم احراز هویت

احراز هویت با استفاده از JWT پیاده‌سازی شده است:

```tsx
// src/modules/shared/context/AuthContext.tsx
import React, { createContext, useReducer, useContext } from 'react';
import { authReducer, initialState } from '@shared/reducers/authReducer';
import { login, logout, refreshToken } from '@shared/services/authService';

export const AuthContext = createContext(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // توابع احراز هویت
  const handleLogin = async (credentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const data = await login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      throw error;
    }
  };

  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT_REQUEST' });
    try {
      await logout();
      dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGOUT_FAILURE', payload: error.message });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

## روش‌های معمول

### اضافه کردن کامپوننت جدید

1. کامپوننت را در پوشه مناسب در `modules/[module]/components/` ایجاد کنید.
2. از TypeScript برای تعریف پراپس‌ها استفاده کنید.
3. از JSDoc برای مستندسازی کامپوننت استفاده کنید.
4. مطمئن شوید که کامپوننت با سیستم تم و ترجمه سازگار است.

```tsx
// src/modules/shared/components/common/CustomCard.tsx
import React from 'react';
import { Card, CardProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface CustomCardProps extends CardProps {
  /** نشان دادن حاشیه اضافی */
  extraPadding?: boolean;
}

/**
 * کامپوننت کارت سفارشی با امکانات اضافی
 */
const CustomCard: React.FC<CustomCardProps> = ({ 
  children, 
  extraPadding = false,
  ...props 
}) => {
  const { t } = useTranslation();
  
  return (
    <Card 
      {...props}
      style={{ 
        padding: extraPadding ? '24px' : '16px',
        ...props.style 
      }}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
```

### اضافه کردن صفحه جدید

1. صفحه را در پوشه مناسب در `modules/[module]/pages/` ایجاد کنید.
2. مسیر مربوط به صفحه را در فایل مسیریابی مربوطه اضافه کنید.

```tsx
// src/modules/admin/pages/Reports.tsx
import React, { useEffect, useState } from 'react';
import { Card, Table, Button } from 'antd';
import { getReports } from '@modules/admin/services/reportService';

const Reports: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getReports();
      setData(result);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card title="گزارش‌ها">
      <Button onClick={fetchData} type="primary" style={{ marginBottom: 16 }}>
        بارگذاری مجدد
      </Button>
      <Table 
        dataSource={data}
        columns={[/* تعریف ستون‌ها */]}
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default Reports;
```

### اضافه کردن سرویس API جدید

1. سرویس را در پوشه مناسب در `modules/[module]/services/` ایجاد کنید.

```tsx
// src/modules/user/services/profileService.ts
import axios from '@shared/utils/axios';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  // سایر فیلدها
}

export interface UpdateProfileParams {
  fullName?: string;
  email?: string;
  // سایر فیلدهای قابل به‌روزرسانی
}

export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axios.get('/api/user/profile');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (params: UpdateProfileParams): Promise<UserProfile> => {
  try {
    const response = await axios.put('/api/user/profile', params);
    return response.data.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
```

## نکات مهم برای مهاجرت

1. **مهاجرت تدریجی**: کد موجود به تدریج به ساختار جدید منتقل شود
2. **حفظ سازگاری رو به عقب**: کدهای قبلی همچنان کار کنند
3. **آزمون جامع**: تغییرات به طور کامل تست شوند
4. **مستندسازی مناسب**: تغییرات مستند شوند تا همه اعضای تیم بتوانند آن را درک کنند

</div> 
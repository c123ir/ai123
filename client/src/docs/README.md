# پروژه کلاینت دستیار هوشمند ۱۲۳

<div dir="rtl">

## معرفی

این مستندات، راهنمای فنی و معماری بخش فرانت‌اند پروژه **دستیار هوشمند یک دو سه** (SmartAi123) را ارائه می‌دهد. این مستندات برای توسعه‌دهندگان تهیه شده و هدف آن کمک به درک ساختار، کارکرد و نحوه توسعه کلاینت است.

## ساختار پروژه

```
client/
├── public/                  # فایل‌های استاتیک
│   ├── fonts/               # فونت‌های مورد استفاده
│   ├── images/              # تصاویر عمومی
│   ├── index.html           # فایل HTML اصلی
│   └── manifest.json        # منیفست PWA
├── src/                     # کدهای منبع
│   ├── components/          # کامپوننت‌های قابل استفاده مجدد
│   │   ├── common/          # کامپوننت‌های عمومی
│   │   ├── admin/           # کامپوننت‌های مختص ادمین
│   │   ├── user/            # کامپوننت‌های مختص کاربر
│   │   └── layout/          # کامپوننت‌های لایه‌ای
│   ├── pages/               # صفحات اصلی برنامه
│   │   ├── admin/           # صفحات مختص ادمین
│   │   ├── user/            # صفحات مختص کاربر
│   │   └── common/          # صفحات مشترک
│   ├── context/             # کانتکست‌های React
│   ├── hooks/               # هوک‌های سفارشی
│   ├── utils/               # توابع کمکی
│   │   └── validation/      # توابع اعتبارسنجی
│   ├── services/            # سرویس‌های ارتباط با API
│   ├── assets/              # تصاویر، فونت‌ها و سایر منابع
│   ├── styles/              # استایل‌های سراسری
│   ├── features/            # قابلیت‌های Redux
│   ├── routes/              # تعاریف مسیرها
│   ├── docs/                # مستندات (این پوشه)
│   ├── i18n.ts              # تنظیمات ترجمه
│   ├── store.ts             # مدیریت state مرکزی
│   ├── App.tsx              # کامپوننت اصلی
│   └── index.tsx            # نقطه ورود برنامه
└── package.json             # وابستگی‌ها و اسکریپت‌ها
```

## محیط توسعه

### پیش‌نیازها

- Node.js نسخه 18 یا بالاتر
- npm نسخه 9 یا بالاتر
- فایل `.env` با تنظیمات محیطی مناسب

### راه‌اندازی محیط توسعه

1. نصب وابستگی‌ها:

   ```bash
   npm install
   ```

2. اجرای برنامه در محیط توسعه:

   ```bash
   npm start
   ```

   برنامه روی پورت 3434 اجرا خواهد شد.

## معماری

### معماری کلی

پروژه بر اساس مدل معماری Flux (Redux) پیاده‌سازی شده است. ما از React Router برای مسیریابی، Material UI برای رابط کاربری، و Redux Toolkit برای مدیریت حالت استفاده می‌کنیم.

### تکنولوژی‌های اصلی

- **React**: کتابخانه اصلی توسعه رابط کاربری
- **TypeScript**: افزودن تایپ‌های استاتیک به JavaScript
- **Redux Toolkit**: مدیریت حالت برنامه
- **React Router**: مسیریابی در برنامه
- **Material UI**: کتابخانه کامپوننت‌های UI
- **Styled Components**: استایل‌دهی کامپوننت‌محور
- **i18next**: بین‌المللی‌سازی و پشتیبانی از چند زبان
- **Formik & Yup**: مدیریت و اعتبارسنجی فرم‌ها
- **Axios**: ارتباط با API‌های سرور

### مدیریت حالت

ما از Redux Toolkit برای مدیریت حالت استفاده می‌کنیم. هر قابلیت (feature) در پوشه `features/` تعریف شده و شامل یک اسلایس (slice) است که reducer، actions و selectors را در خود دارد.

```tsx
// نمونه یک اسلایس Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
```

### سیستم احراز هویت

احراز هویت با استفاده از JWT پیاده‌سازی شده است. توکن‌ها در localStorage ذخیره می‌شوند و برای هر درخواست API در هدر Authorization اضافه می‌شوند.

### سیستم ترجمه

برای ترجمه و پشتیبانی از زبان فارسی، از i18next استفاده می‌کنیم. فایل‌های ترجمه در `src/i18n.ts` تنظیم شده‌اند.

### سیستم تم

تم‌بندی با استفاده از ThemeProvider از Material UI پیاده‌سازی شده است. برنامه از حالت‌های روشن و تاریک پشتیبانی می‌کند.

## روش‌های معمول

### اضافه کردن کامپوننت جدید

1. کامپوننت را در پوشه مناسب در `components/` ایجاد کنید.
2. از TypeScript برای تعریف پراپس‌ها استفاده کنید.
3. از JSDoc برای مستندسازی کامپوننت استفاده کنید.
4. مطمئن شوید که کامپوننت با سیستم تم و ترجمه سازگار است.

```tsx
// نمونه کامپوننت
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Box } from '@mui/material';

interface UserProfileProps {
  /** آیدی کاربر */
  userId: string;
  /** نام کاربر */
  name: string;
  /** تابع برای زمانی که روی دکمه ویرایش کلیک می‌شود */
  onEdit: () => void;
}

/**
 * کامپوننت نمایش پروفایل کاربر
 */
const UserProfile: React.FC<UserProfileProps> = ({ userId, name, onEdit }) => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body1">
        {t('user.id')}: {userId}
      </Typography>
      <Button onClick={onEdit}>{t('common.edit')}</Button>
    </Box>
  );
};

export default UserProfile;
```

### اضافه کردن صفحه جدید

1. صفحه را در پوشه مناسب در `pages/` ایجاد کنید.
2. مسیر مربوط به صفحه را در `routes/UserRoutes.tsx` یا `routes/AdminRoutes.tsx` اضافه کنید.

### اضافه کردن قابلیت Redux جدید

1. یک پوشه جدید در `features/` ایجاد کنید.
2. اسلایس Redux را با استفاده از `createSlice` ایجاد کنید.
3. اسلایس را در `store.ts` اضافه کنید.

### اضافه کردن سرویس API جدید

1. سرویس را در پوشه مناسب در `services/` ایجاد کنید.
2. از Axios برای ارتباط با API استفاده کنید.
3. اطمینان حاصل کنید که خطاها به درستی مدیریت می‌شوند.

```tsx
// نمونه سرویس API
import axios from '../utils/axios';

export interface TokenBalance {
  available: number;
  pending: number;
}

export const getTokenBalance = async (): Promise<TokenBalance> => {
  try {
    const response = await axios.get('/api/user/tokens/balance');
    return response.data;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    throw error;
  }
};
```

## دستورالعمل‌های کدنویسی

### اصول کلی

- از TypeScript برای همه کدها استفاده کنید.
- هر فایل باید یک کامپوننت، سرویس، یا ابزار مشخص را پیاده‌سازی کند.
- از JSDoc برای مستندسازی توابع و کامپوننت‌ها استفاده کنید.
- نام‌گذاری متغیرها و توابع به انگلیسی و با معنی باشد.
- عناوین و متن‌های نمایشی به فارسی (قابل ترجمه) باشد.

### قراردادهای نام‌گذاری

- نام کامپوننت‌ها: PascalCase (مثال: `UserProfile`)
- نام توابع: camelCase (مثال: `getUserProfile`)
- نام فایل‌های کامپوننت: PascalCase (مثال: `UserProfile.tsx`)
- نام فایل‌های غیر کامپوننت: camelCase (مثال: `authService.ts`)

### تبدیل اعداد فارسی

برای تبدیل اعداد فارسی به انگلیسی در فرم‌ها، از کامپوننت `DigitConverterInput` استفاده کنید:

```tsx
import DigitConverterInput from '../components/common/DigitConverter';

<DigitConverterInput
  label="شماره موبایل"
  value={phoneNumber}
  onChange={(value) => setPhoneNumber(value)}
/>
```

## مستندسازی

### استراتژی مستندسازی

1. **مستندسازی در کد**: از JSDoc برای توضیح کامپوننت‌ها و توابع استفاده کنید.
2. **مستندسازی فایل‌ها**: هر فایل با یک کامنت در بالای فایل که مسیر و هدف فایل را مشخص می‌کند شروع شود.
3. **مستندسازی کامپوننت‌ها**: پراپس‌های کامپوننت‌ها را با TypeScript و JSDoc مستند کنید.
4. **مستندسازی API**: انواع داده‌ها و ساختار پاسخ API را با TypeScript تعریف کنید.

### نمونه JSDoc

```tsx
/**
 * کامپوننت نمایش اطلاعات توکن کاربر
 * @param {number} balance - موجودی فعلی کاربر
 * @param {Transaction[]} transactions - لیست تراکنش‌های اخیر
 * @param {boolean} loading - وضعیت بارگذاری اطلاعات
 * @returns {JSX.Element} کامپوننت React
 */
const TokenInfo: React.FC<TokenInfoProps> = ({ balance, transactions, loading }) => {
  // ...
}
```

## روال‌های توسعه

### گیت و مخزن کد

1. هر تغییر باید در شاخه جداگانه توسعه یابد
2. نام شاخه‌ها باید با الگوی `feature/name` یا `bugfix/name` باشد
3. هر کامیت باید پیام واضح و مرتبط با تغییرات داشته باشد

### بازبینی کد

1. تمام Pull Request ها باید توسط حداقل یک توسعه‌دهنده دیگر بازبینی شود
2. تست‌ها باید قبل از ادغام به شاخه اصلی اجرا شوند
3. از Continuous Integration استفاده کنید تا خودکار تست‌ها را اجرا کند

### استقرار

1. استقرار به محیط توسعه پس از ادغام به شاخه `develop`
2. استقرار به محیط تولید پس از ادغام به شاخه `main`

## تماس و پشتیبانی

برای دریافت کمک یا اطلاعات بیشتر، با تیم توسعه از طریق کانال‌های ارتباطی زیر تماس بگیرید:

- ایمیل: <dev@smartai123.com>
- کانال گفتگو: Slack #frontend-team

</div>

# راهنمای رفع خطاهای برنامه

## خطاهای رایج و روش رفع آن‌ها

### ۱. خطای Router
**مشکل:** تداخل دو `BrowserRouter` در برنامه باعث خطای زیر می‌شود:

```
The above error occurred in the <Router> component
```

**راه حل:** اطمینان حاصل کنید که فقط یک `BrowserRouter` در کل برنامه استفاده شده است. معمولاً این کامپوننت باید فقط در `index.tsx` تعریف شود.

**نمونه کد اصلاح شده:**

```jsx
// src/index.tsx
import { BrowserRouter } from 'react-router-dom';

// ... کدهای دیگر

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// src/App.tsx - بدون BrowserRouter
const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* مسیرها */}
      </Routes>
    </Suspense>
  );
};
```

### ۲. خطای مسیردهی نادرست کامپوننت‌ها
**مشکل:** بعد از تغییر ساختار پوشه‌بندی، مسیرهای ایمپورت قدیمی باعث خطا می‌شوند:

```
Cannot find module '../../../components/common/ThemeContext' or its corresponding type declarations.
```

**راه حل:** به‌روزرسانی همه مسیرهای ایمپورت به ساختار جدید.

**نمونه کد اصلاح شده:**

```jsx
// قبل
import { useTheme } from '../../../components/common/ThemeContext';

// بعد
import { useTheme } from '../../../modules/shared/context/ThemeContext';
```

### ۳. خطای تایپ‌های ناسازگار
**مشکل:** ناسازگاری بین تایپ‌های تعریف شده و استفاده شده:

```
TS2430: Interface 'ButtonProps' incorrectly extends interface 'Omit<ButtonProps, "type" | "ghost">'.
```

**راه حل:** بررسی و اصلاح تعاریف تایپ در کامپوننت‌ها.

**نمونه کد اصلاح شده:**

```typescript
// قبل
export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'ghost'> {
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'default' | CustomButtonColor;
}

// بعد
export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'ghost'> {
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'default' | 'danger' | 'blue' | 'cyan' | 'gold' | 'green' | 'lime' | 'magenta' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow' | 'volcano' | 'geekblue';
}
```

### ۴. خطای ماژول‌های پیدا نشده
**مشکل:** مسیرهای اشتباه یا ماژول‌های نصب نشده:

```
Cannot find module 'antd/es/_util/responsiveObserve' or its corresponding type declarations.
```

**راه حل:** نصب ماژول‌های لازم یا اصلاح مسیرهای ایمپورت.

**دستور نصب:**

```bash
npm install --save antd@latest
```

### ۵. خطای عناصر نامشخص
**مشکل:** استفاده از کامپوننت‌هایی که ایمپورت نشده‌اند:

```
TS2304: Cannot find name 'MailOutlined'.
```

**راه حل:** ایمپورت آیکون‌ها یا کامپوننت‌های مورد نیاز.

**نمونه کد اصلاح شده:**

```jsx
// اضافه کردن ایمپورت مورد نیاز
import { MailOutlined } from '@ant-design/icons';
```

### ۶. خطای سرویس‌های ناقص
**مشکل:** فراخوانی متدهایی که در سرویس وجود ندارند:

```
TS2339: Property 'getProfile' does not exist on type...
```

**راه حل:** اضافه کردن متدهای لازم به سرویس‌ها.

**نمونه کد اصلاح شده:**

```typescript
// قبل
const profileService = {
  getAddresses: () => axios.get('/api/user/addresses'),
  // ... سایر متدها
};

// بعد
const profileService = {
  getProfile: () => axios.get('/api/user/profile'),
  updateProfile: (data) => axios.put('/api/user/profile', data),
  changePassword: (data) => axios.post('/api/user/change-password', data),
  setDefaultAddress: (id) => axios.put(`/api/user/addresses/${id}/default`),
  getAddresses: () => axios.get('/api/user/addresses'),
  // ... سایر متدها
};
```

## توصیه‌های رفع خطا

### ۱. بررسی سیستماتیک خطاها
- خطاها را به ترتیب اولویت (از بحرانی به کم‌اهمیت) بررسی و رفع کنید.
- ابتدا خطاهای مربوط به ساختار اصلی برنامه را برطرف کنید، سپس به سراغ خطاهای جزئی‌تر بروید.

### ۲. پاکسازی کش و بازسازی مجدد

```bash
# حذف node_modules و package-lock.json
rm -rf node_modules package-lock.json

# نصب مجدد وابستگی‌ها
npm install

# بازسازی پروژه
npm run build
```

### ۳. استفاده از TSConfig Paths برای مسیردهی ساده‌تر
در فایل `tsconfig.json` تنظیمات زیر را اضافه کنید:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"],
      "@shared/*": ["modules/shared/*"],
      "@admin/*": ["modules/admin/*"],
      "@user/*": ["modules/user/*"]
    }
  }
}
```

سپس می‌توانید به این شکل ایمپورت کنید:

```jsx
import { useTheme } from '@shared/context/ThemeContext';
```

### ۴. تنظیم خودکار مسیرها با ESLint
از قوانین ESLint برای جلوگیری از مسیرهای اشتباه استفاده کنید:

```js
// .eslintrc.js
module.exports = {
  // ... سایر تنظیمات
  rules: {
    "import/no-unresolved": "error",
    "import/named": "error"
  }
}
```

## چک‌لیست رفع خطا

- [ ] نصب/به‌روزرسانی تمام وابستگی‌های مورد نیاز
- [ ] اطمینان از وجود فقط یک `BrowserRouter` در برنامه
- [ ] به‌روزرسانی تمام مسیرهای ایمپورت به ساختار جدید
- [ ] اصلاح تایپ‌های ناسازگار
- [ ] تکمیل سرویس‌های ناقص
- [ ] ایمپورت تمام آیکون‌ها و کامپوننت‌های مورد نیاز
- [ ] بازسازی پروژه و بررسی خطاهای باقی‌مانده 
# کتابخانه کامپوننت‌های دستیار هوشمند ۱۲۳

<div dir="rtl">

## معرفی

کتابخانه کامپوننت‌های دستیار هوشمند ۱۲۳ مجموعه‌ای از کامپوننت‌های از پیش طراحی شده است که برای ایجاد رابط کاربری یکپارچه و سازگار در تمامی بخش‌های برنامه استفاده می‌شود. این کتابخانه بر اساس Ant Design پیاده‌سازی شده و برای پشتیبانی کامل از زبان فارسی و قالب راست به چپ بهینه‌سازی شده است.

## ساختار کامپوننت‌ها

کامپوننت‌های این کتابخانه در مسیر `src/modules/shared/components` قرار دارند و به دسته‌های زیر تقسیم می‌شوند:

### کامپوننت‌های پایه

```
src/modules/shared/components/base
├── Button/
├── Input/
├── Select/
├── Form/
├── Modal/
├── Table/
└── Notification/
```

### کامپوننت‌های ترکیبی

```
src/modules/shared/components/composite
├── Card/
├── DataDisplay/
├── SearchFilters/
├── Pagination/
└── Calendar/
```

### کامپوننت‌های لایه‌بندی

```
src/modules/shared/components/layout
├── AdminLayout/
├── SimpleLayout/
├── Sidebar/
├── Header/
└── Footer/
```

## راهنمای استفاده از کامپوننت‌ها

### دکمه (Button)

دکمه یکی از پرکاربردترین کامپوننت‌های رابط کاربری است که در فرم‌ها، دیالوگ‌ها و بخش‌های مختلف برنامه استفاده می‌شود.

```tsx
import { Button } from '@/modules/shared/components/base/Button';

// نمونه استفاده ساده
<Button type="primary">ذخیره</Button>

// دکمه با آیکون
<Button type="primary" icon={<SaveOutlined />}>ذخیره</Button>

// دکمه لودینگ
<Button type="primary" loading={isLoading}>ارسال</Button>

// دکمه غیرفعال
<Button type="primary" disabled={!isValid}>تایید</Button>
```

#### پراپرتی‌های Button

| نام | نوع | پیش‌فرض | توضیحات |
| --- | --- | --- | --- |
| type | 'primary' \| 'default' \| 'dashed' \| 'link' \| 'text' | 'default' | نوع دکمه |
| size | 'large' \| 'middle' \| 'small' | 'middle' | اندازه دکمه |
| loading | boolean | false | نمایش وضعیت بارگذاری |
| disabled | boolean | false | غیرفعال کردن دکمه |
| icon | ReactNode | - | آیکون دکمه |
| onClick | function(event) | - | رویداد کلیک |

### ورودی متن (Input)

کامپوننت ورودی متن برای دریافت اطلاعات متنی از کاربر استفاده می‌شود.

```tsx
import { Input } from '@/modules/shared/components/base/Input';

// نمونه استفاده ساده
<Input placeholder="نام کاربری خود را وارد کنید" />

// ورودی با برچسب
<Input label="نام کاربری" required />

// ورودی با پیام خطا
<Input 
  label="ایمیل" 
  placeholder="example@mail.com" 
  error={errors.email} 
  helperText="ایمیل معتبر وارد نمایید" 
/>

// ورودی رمز عبور
<Input.Password placeholder="رمز عبور" />
```

#### پراپرتی‌های Input

| نام | نوع | پیش‌فرض | توضیحات |
| --- | --- | --- | --- |
| label | string | - | برچسب فیلد ورودی |
| placeholder | string | - | متن راهنما درون فیلد |
| required | boolean | false | آیا فیلد اجباری است |
| error | boolean | false | نمایش وضعیت خطا |
| helperText | string | - | متن راهنما یا خطا |
| disabled | boolean | false | غیرفعال کردن ورودی |
| value | string | - | مقدار ورودی |
| onChange | function(event) | - | رویداد تغییر مقدار |

### جدول (Table)

کامپوننت جدول برای نمایش داده‌های ساختاریافته استفاده می‌شود.

```tsx
import { Table } from '@/modules/shared/components/base/Table';

// تعریف ستون‌ها
const columns = [
  {
    title: 'نام',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'سن',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'آدرس',
    dataIndex: 'address',
    key: 'address',
  },
];

// داده‌های جدول
const data = [
  {
    key: '1',
    name: 'علی محمدی',
    age: 32,
    address: 'تهران، خیابان آزادی',
  },
  // ...
];

// استفاده از کامپوننت جدول
<Table 
  columns={columns} 
  dataSource={data} 
  loading={isLoading}
  pagination={{ pageSize: 10 }}
/>
```

## بهترین شیوه‌های استفاده

1. **استفاده از کامپوننت‌های مشترک**: به جای ایجاد کامپوننت‌های مشابه، از کامپوننت‌های موجود در کتابخانه استفاده کنید.

2. **پیروی از طراحی متناسق**: از رنگ‌ها، اندازه‌ها و استایل‌های تعریف شده در سیستم تم استفاده کنید.

3. **توجه به پشتیبانی RTL**: تمامی کامپوننت‌ها باید در حالت RTL نیز به درستی نمایش داده شوند.

4. **آزمایش روی دستگاه‌های مختلف**: از سازگاری کامپوننت‌ها با اندازه‌های صفحه مختلف اطمینان حاصل کنید.

## افزودن کامپوننت جدید

برای افزودن یک کامپوننت جدید به کتابخانه، مراحل زیر را دنبال کنید:

1. در دایرکتوری مناسب (پایه، ترکیبی یا لایه‌بندی) یک پوشه جدید با نام کامپوننت ایجاد کنید.

2. فایل‌های زیر را در پوشه جدید ایجاد کنید:
   - `[ComponentName].tsx`: پیاده‌سازی اصلی کامپوننت
   - `[ComponentName].styles.ts`: استایل‌های کامپوننت
   - `index.ts`: برای صادر کردن کامپوننت
   - `types.ts`: تعریف تایپ‌های مربوط به کامپوننت

3. کامپوننت خود را با رعایت الگوهای طراحی و دستورالعمل‌های پروژه پیاده‌سازی کنید.

4. تست‌های مناسب برای کامپوننت خود بنویسید.

5. مستندات استفاده از کامپوننت را بروزرسانی کنید.

## نمونه کامل یک کامپوننت

### Button.tsx

```tsx
import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import { useStyles } from './Button.styles';

export interface ButtonProps extends AntButtonProps {
  // پراپرتی‌های سفارشی اضافه
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  rounded = false,
  className,
  ...rest 
}) => {
  const { classes, cx } = useStyles();
  
  return (
    <AntButton 
      className={cx(classes.button, rounded && classes.rounded, className)}
      {...rest}
    >
      {children}
    </AntButton>
  );
};
```

### Button.styles.ts

```ts
import { createStyles } from '@/modules/shared/utils/createStyles';

export const useStyles = createStyles((theme) => ({
  button: {
    fontFamily: theme.typography.fontFamily,
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[1],
    },
  },
  rounded: {
    borderRadius: '20px',
  },
}));
```

### index.ts

```ts
export * from './Button';
```

</div> 
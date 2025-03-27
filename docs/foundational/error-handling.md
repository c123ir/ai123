# راهنمای مدیریت خطا

<div dir="rtl">

## مقدمه

مدیریت خطای مناسب در پروژه **دستیار هوشمند یک دو سه** نقش مهمی در تجربه کاربری، قابلیت نگهداری و امنیت سیستم دارد. این سند اصول و بهترین شیوه‌های مدیریت خطا در نسخه ۲ پروژه را شرح می‌دهد.

## اصول مدیریت خطا

- **شفافیت**: خطاها باید واضح و قابل فهم برای کاربر نهایی باشند
- **یکپارچگی**: سیستم مدیریت خطا باید در تمام بخش‌های برنامه یکسان عمل کند
- **قابلیت ردیابی**: خطاها باید به راحتی قابل ردیابی و عیب‌یابی باشند
- **کاربرپسندی**: پیام‌های خطا باید کاربرپسند و راهنما باشند
- **امنیت**: جزئیات فنی خطاها نباید به کاربر نمایش داده شوند

## ساختار خطاها

### طبقه‌بندی خطاها

- **خطاهای کاربری**: اشتباهات ورودی، خطاهای اعتبارسنجی، دسترسی‌های غیرمجاز
- **خطاهای سیستمی**: مشکلات پایگاه داده، خطاهای شبکه، مشکلات سرور
- **خطاهای تجاری**: نقض قوانین کسب‌وکار، محدودیت‌های سیستم توکن
- **خطاهای امنیتی**: تلاش‌های نفوذ، درخواست‌های مشکوک

### کد خطاها

هر خطا دارای یک کد منحصر به فرد است:
- فرمت: `EXXX-YYY` (X: نوع خطا، Y: کد خاص)
- مثال: `E001-403` برای خطای دسترسی غیرمجاز

## پیاده‌سازی در نسخه ۲

در نسخه ۲ پروژه، مدیریت خطا به صورت ماژولار پیاده‌سازی شده و از معماری چندلایه‌ای بهره می‌برد:

### ساختار ماژولی مدیریت خطا

```
modules/
├── shared/
│   ├── error/                   # ماژول اختصاصی مدیریت خطا
│   │   ├── components/          # کامپوننت‌های نمایشی خطا
│   │   │   ├── ErrorBoundary/   # مرزهای خطا برای React
│   │   │   ├── ErrorAlert/      # نمایش هشدار خطا
│   │   │   └── ErrorPage/       # صفحه نمایش خطا
│   │   ├── services/            # سرویس‌های مدیریت خطا
│   │   │   ├── errorService.ts  # سرویس اصلی مدیریت خطا
│   │   │   └── errorLogger.ts   # سرویس ثبت خطاها
│   │   ├── hooks/               # هوک‌های مدیریت خطا
│   │   │   ├── useErrorHandler.ts  # هوک برای مدیریت خطا در کامپوننت‌ها
│   │   │   └── useErrorLogger.ts   # هوک برای ثبت خطا
│   │   ├── types/               # تایپ‌های مربوط به خطا
│   │   │   ├── ErrorTypes.ts    # انواع خطاها
│   │   │   └── ErrorCodes.ts    # کدهای خطا
│   │   └── utils/               # توابع کمکی
│   │       ├── errorFormatter.ts  # قالب‌بندی پیام‌های خطا
│   │       └── errorParser.ts     # تجزیه و تحلیل خطاها
│   └── ...
└── ...
```

## مدیریت خطا در فرانت‌اند

### اصول پایه
- استفاده از ساختار try/catch برای مدیریت خطاهای غیرمنتظره
- اعتبارسنجی ورودی‌ها قبل از ارسال به سرور
- استفاده از کتابخانه‌های فرم مانند Formik یا React Hook Form برای اعتبارسنجی

### نمایش خطا به کاربر
- پیام‌های خطای واضح و کاربرپسند با استفاده از کامپوننت‌های Ant Design
- استفاده از کامپوننت‌های اختصاصی برای نمایش خطا (message, notification, Alert)
- عدم نمایش جزئیات فنی خطا به کاربر نهایی

### نمونه کد مدیریت خطا در کامپوننت

```tsx
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useErrorHandler } from '@shared/error/hooks/useErrorHandler';

const UserForm: React.FC = () => {
  const { handleError } = useErrorHandler();

  const onFinish = async (values) => {
    try {
      // ارسال داده‌ها به سرور
      await userService.createUser(values);
      message.success('کاربر با موفقیت ایجاد شد');
    } catch (error) {
      // استفاده از سیستم مدیریت خطا
      handleError(error, {
        notifyUser: true,
        fallbackMessage: 'خطا در ایجاد کاربر'
      });
    }
  };

  return (
    <Form onFinish={onFinish}>
      {/* فیلدهای فرم */}
    </Form>
  );
};
```

### بازیابی از خطا
- تلاش مجدد خودکار برای خطاهای شبکه
- حفظ داده‌های فرم در صورت خطا
- بازگرداندن کاربر به حالت پایدار

## مدیریت خطا در API

### ساختار استاندارد پاسخ خطا

```json
{
  "status": "error",
  "code": "E001-403",
  "message": "دسترسی به این بخش مجاز نیست",
  "details": { "resource": "users", "action": "update" },
  "timestamp": "2023-05-15T14:30:00Z"
}
```

### میان‌افزار مدیریت خطا
- استفاده از میان‌افزار مرکزی برای مدیریت تمام خطاها
- جلوگیری از سرریز خطاهای پردازش نشده
- ثبت مناسب خطاها برای تحلیل بعدی

### نمونه کد میان‌افزار خطا در سرویس API

```typescript
import { apiService } from '@services/api';
import { errorService } from '@shared/error/services/errorService';

// افزودن Interceptor برای پاسخ
apiService.addResponseInterceptor(
  (response) => {
    return response;
  },
  (error) => {
    // پردازش خطا
    const processedError = errorService.processApiError(error);
    
    // لاگ خطا
    errorService.logError(processedError);
    
    // برگرداندن خطای پردازش شده
    return Promise.reject(processedError);
  }
);
```

## خطاهای خاص

### مدیریت خطاهای تبدیل اعداد فارسی/انگلیسی
- تشخیص و تبدیل خودکار اعداد فارسی به انگلیسی
- ارائه پیام خطای مناسب در صورت شکست تبدیل
- اعتبارسنجی داده‌های عددی پس از تبدیل

### نمونه کامپوننت مدیریت خطای تبدیل اعداد

```tsx
import React from 'react';
import { Input } from 'antd';
import { convertPersianToEnglish } from '@shared/utils/digitConverters';

interface DigitConverterInputProps {
  onChange: (value: string) => void;
  // سایر پراپرتی‌ها
}

export const DigitConverterInput: React.FC<DigitConverterInputProps> = ({ 
  onChange,
  ...props 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const persianValue = e.target.value;
      const englishValue = convertPersianToEnglish(persianValue);
      onChange(englishValue);
    } catch (error) {
      // در صورت خطای تبدیل، مقدار اصلی را برمی‌گردانیم
      onChange(e.target.value);
      console.warn('خطا در تبدیل اعداد فارسی:', error);
    }
  };

  return <Input onChange={handleChange} {...props} />;
};
```

### خطاهای مرتبط با توکن MoneyBell
- کدهای خطای مخصوص برای مشکلات تراکنش
- مکانیسم بازیابی برای تراکنش‌های ناتمام
- اطلاع‌رسانی به کاربر درباره وضعیت تراکنش

## لاگ‌گذاری خطاها

- ثبت کامل جزئیات خطا در سیستم لاگ
- استفاده از سطوح مختلف اهمیت (Error, Warning, Info)
- درج اطلاعات بافتی بدون داده‌های حساس

### نمونه کد لاگ‌گذاری خطا

```typescript
import { errorLogger } from '@shared/error/services/errorLogger';

try {
  // عملیات پرخطر
} catch (error) {
  // ثبت خطا
  errorLogger.log({
    level: 'error',
    message: error.message,
    context: {
      module: 'userManagement',
      action: 'updateProfile',
      userId: user.id // بدون اطلاعات حساس
    },
    error: error
  });
  
  // نمایش پیام مناسب به کاربر
  // ...
}
```

## تست مدیریت خطا
- تست واحد برای توابع مدیریت خطا
- تست یکپارچگی برای بررسی جریان‌های خطا
- شبیه‌سازی سناریوهای خطا برای ارزیابی سیستم

## راهکارهای عیب‌یابی

### راهکارهای عمومی
1. **فعال‌سازی لاگ‌های مفصل**:
   ```typescript
   // در فایل پیکربندی
   errorLogger.setVerbosity('detailed');
   ```

2. **بررسی خطاها در DevTools مرورگر**:
   - بخش Console در DevTools را بررسی کنید
   - از breakpoint‌ها برای توقف در محل خطا استفاده کنید

3. **استفاده از محیط توسعه برای عیب‌یابی**:
   ```
   # در فایل .env
   NODE_ENV=development
   REACT_APP_ERROR_VERBOSE=true
   ```

### راهکارهای خاص برای خطاهای رایج

| کد خطا | شرح | راه حل |
|--------|------|--------|
| E001-401 | خطای احراز هویت | بررسی وضعیت لاگین و توکن‌های دسترسی |
| E002-404 | منبع یافت نشد | بررسی آدرس‌ها و پارامترهای درخواست |
| E003-500 | خطای سرور | بررسی لاگ‌های سرور و وضعیت سرویس‌ها |
| E101-422 | خطای اعتبارسنجی داده | بررسی فرمت داده‌ها و مقادیر ارسالی |
| E201-429 | تعداد درخواست‌ها بیش از حد مجاز | کاهش تعداد درخواست‌ها یا استفاده از صف |

## بهترین شیوه‌ها

1. **همیشه از ساختار try/catch استفاده کنید**:
   ```typescript
   try {
     // کد پرخطر
   } catch (error) {
     // مدیریت خطا
   }
   ```

2. **برای توابع async/await از مدیریت خطا استفاده کنید**:
   ```typescript
   async function fetchData() {
     try {
       const response = await apiService.get('/data');
       return response.data;
     } catch (error) {
       handleError(error);
       return null; // یا مقدار پیش‌فرض مناسب
     }
   }
   ```

3. **هرگز خطاها را بدون مدیریت رها نکنید**:
   ```typescript
   // بد
   promise.then(data => {
     // پردازش داده
   }); // خطاها مدیریت نشده‌اند!

   // خوب
   promise
     .then(data => {
       // پردازش داده
     })
     .catch(error => {
       handleError(error);
     });
   ```

4. **از ErrorBoundary در React استفاده کنید**:
   ```tsx
   import { ErrorBoundary } from '@shared/error/components/ErrorBoundary';

   <ErrorBoundary fallback={<ErrorPage />}>
     <MyComponent />
   </ErrorBoundary>
   ```

5. **پیام‌های خطای کاربرپسند ارائه دهید**:
   ```typescript
   // بد
   throw new Error('INVALID_INPUT: Field "name" is required');

   // خوب
   throw new ValidationError({
     code: 'E101-422',
     message: 'لطفاً نام را وارد کنید',
     field: 'name'
   });
   ```

</div> 
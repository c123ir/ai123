# 05-DIGIT-CONVERSION.md - تبدیل اعداد فارسی به انگلیسی

## مقدمه

در این سند، نحوه پیاده‌سازی و استفاده از مکانیزم تبدیل اعداد فارسی به انگلیسی در پروژه دستیار هوشمند یک دو سه (SmartAi123) توضیح داده می‌شود. تبدیل خودکار اعداد فارسی به انگلیسی یکی از الزامات کلیدی پروژه است و باید در تمام بخش‌های مربوط به ورودی کاربر پیاده‌سازی شود.

## اهمیت تبدیل اعداد

### چرا تبدیل اعداد فارسی به انگلیسی مهم است؟

1. **سازگاری با پایگاه داده**: اکثر سیستم‌های پایگاه داده فقط با اعداد انگلیسی کار می‌کنند.
2. **پردازش داده**: الگوریتم‌های پردازش عددی معمولاً فقط اعداد انگلیسی را به درستی تفسیر می‌کنند.
3. **مقایسه و جستجو**: برای مقایسه صحیح و جستجوی داده‌ها، استفاده از فرمت یکسان اعداد ضروری است.
4. **امنیت**: تبدیل اعداد باعث جلوگیری از خطاهای احتمالی و سوءاستفاده‌های امنیتی می‌شود.
5. **تجربه کاربری**: کاربران می‌توانند با هر صفحه کلیدی (فارسی یا انگلیسی) اعداد را وارد کنند بدون اینکه نگران تغییر زبان کیبورد باشند.

## نگاشت اعداد

### جدول تبدیل اعداد فارسی به انگلیسی

| عدد فارسی | عدد انگلیسی |
|-----------|-------------|
| ۰         | 0           |
| ۱         | 1           |
| ۲         | 2           |
| ۳         | 3           |
| ۴         | 4           |
| ۵         | 5           |
| ۶         | 6           |
| ۷         | 7           |
| ۸         | 8           |
| ۹         | 9           |

### جدول تبدیل اعداد عربی به انگلیسی

| عدد عربی | عدد انگلیسی |
|----------|-------------|
| ٠        | 0           |
| ١        | 1           |
| ٢        | 2           |
| ٣        | 3           |
| ٤        | 4           |
| ٥        | 5           |
| ٦        | 6           |
| ٧        | 7           |
| ٨        | 8           |
| ٩        | 9           |

## پیاده‌سازی

### 1. تابع تبدیل در TypeScript

فایل `src/utils/stringUtils.ts`:

```typescript
/**
 * تبدیل اعداد فارسی/عربی به انگلیسی
 * @param str رشته حاوی اعداد فارسی/عربی
 * @returns رشته با اعداد انگلیسی
 */
export const convertPersianToEnglishNumbers = (str: string): string => {
  if (!str) return str;
  
  // نگاشت اعداد فارسی و عربی به انگلیسی
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  // تبدیل اعداد فارسی/عربی به انگلیسی
  let result = str;
  for (let i = 0; i < 10; i++) {
    const persianRegex = new RegExp(persianDigits[i], 'g');
    const arabicRegex = new RegExp(arabicDigits[i], 'g');
    
    result = result
      .replace(persianRegex, englishDigits[i])
      .replace(arabicRegex, englishDigits[i]);
  }
  
  return result;
};
```

### 2. میدلور Express برای تبدیل خودکار

فایل `src/middleware/digitConversion.middleware.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import { convertPersianToEnglishNumbers } from '../utils/stringUtils';

/**
 * میدلور تبدیل اعداد فارسی به انگلیسی در بدنه درخواست
 */
export const digitConversionMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.body) {
    convertObjectNumbers(req.body);
  }
  
  if (req.query) {
    convertObjectNumbers(req.query);
  }
  
  if (req.params) {
    convertObjectNumbers(req.params);
  }
  
  next();
};

/**
 * تبدیل اعداد فارسی به انگلیسی در یک شیء
 * @param obj شیء حاوی مقادیر
 */
function convertObjectNumbers(obj: Record<string, any>): void {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = convertPersianToEnglishNumbers(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      convertObjectNumbers(obj[key]);
    }
  }
}
```

### 3. کامپوننت ورودی React با تبدیل خودکار

فایل `src/components/common/PersianTextField.tsx`:

```tsx
import React, { useState, ChangeEvent } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { convertPersianToEnglishNumbers } from '../../utils/stringUtils';

interface PersianTextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  onChange?: (value: string) => void;
  convertNumbers?: boolean;
}

/**
 * کامپوننت TextField با پشتیبانی از تبدیل اعداد فارسی به انگلیسی
 */
const PersianTextField: React.FC<PersianTextFieldProps> = ({
  onChange,
  convertNumbers = true,
  ...props
}) => {
  const [value, setValue] = useState(props.value || props.defaultValue || '');
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const convertedValue = convertNumbers 
      ? convertPersianToEnglishNumbers(newValue) 
      : newValue;
    
    setValue(convertedValue);
    
    if (onChange) {
      onChange(convertedValue);
    }
    
    // تغییر مستقیم مقدار در DOM برای تجربه کاربری بهتر
    if (convertNumbers && e.target.value !== convertedValue) {
      e.target.value = convertedValue;
    }
  };
  
  return (
    <TextField
      {...props}


      return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      dir="rtl"
    />
  );
};

export default PersianTextField;
```

### 4. هوک سفارشی React برای تبدیل اعداد

فایل `src/hooks/useDigitConversion.ts`:

```typescript
import { useState, useCallback } from 'react';
import { convertPersianToEnglishNumbers } from '../utils/stringUtils';

/**
 * هوک سفارشی برای مدیریت ورودی با تبدیل اعداد فارسی به انگلیسی
 * @param initialValue مقدار اولیه
 * @returns مقدار، تابع تغییر مقدار و تابع تنظیم مقدار
 */
export function useDigitConversion(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const convertedValue = convertPersianToEnglishNumbers(newValue);
    setValue(convertedValue);
    
    // تغییر مستقیم مقدار در DOM برای تجربه کاربری بهتر
    if (e.target.value !== convertedValue) {
      e.target.value = convertedValue;
    }
  }, []);
  
  const setValueDirectly = useCallback((newValue: string) => {
    setValue(convertPersianToEnglishNumbers(newValue));
  }, []);
  
  return [value, handleChange, setValueDirectly] as const;
}
```

## کاربرد در موارد مختلف

### 1. فرم‌های ورود اطلاعات

در فرم‌هایی که اطلاعات عددی (مانند شماره موبایل، کد ملی، شماره کارت بانکی) دریافت می‌کنند، باید از تبدیل اعداد استفاده شود:

```tsx
import React, { useState } from 'react';
import { useDigitConversion } from '../../hooks/useDigitConversion';

const SignupForm: React.FC = () => {
  const [phoneNumber, handlePhoneChange] = useDigitConversion('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // اینجا phoneNumber حاوی اعداد انگلیسی است
    console.log({ phoneNumber });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        شماره موبایل:
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
          dir="ltr"
        />
      </label>
      <button type="submit">ثبت‌نام</button>
    </form>
  );
};
```

### 2. جستجو و فیلترینگ

هنگام جستجوی عددی (مانند جستجو با شماره موبایل)، اعداد فارسی به انگلیسی تبدیل می‌شوند:

```tsx
import React from 'react';
import { convertPersianToEnglishNumbers } from '../../utils/stringUtils';

const SearchComponent: React.FC = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = convertPersianToEnglishNumbers(e.target.value);
    
    // استفاده از searchTerm برای جستجو که حاوی اعداد انگلیسی است
    console.log({ searchTerm });
  };
  
  return (
    <div>
      <input
        type="search"
        onChange={handleSearch}
        placeholder="جستجو با شماره موبایل..."
        dir="rtl"
      />
    </div>
  );
};
```

### 3. داده‌های پایگاه داده

قبل از ذخیره‌سازی داده‌های عددی در پایگاه داده، اعداد فارسی به انگلیسی تبدیل می‌شوند:

```typescript
// src/services/user.service.ts
import { convertPersianToEnglishNumbers } from '../utils/stringUtils';

export async function createUser(userData: any) {
  // تبدیل اعداد در فیلدهای حساس
  const processedData = {
    ...userData,
    phoneNumber: convertPersianToEnglishNumbers(userData.phoneNumber),
    nationalId: convertPersianToEnglishNumbers(userData.nationalId),
  };
  
  // ذخیره در پایگاه داده
  return db.query(
    'INSERT INTO users (name, phone_number, national_id) VALUES ($1, $2, $3)',
    [processedData.name, processedData.phoneNumber, processedData.nationalId]
  );
}
```

### 4. ورودی‌های عددی خاص

برای ورودی‌های عددی خاص مانند تاریخ، شماره کارت، کد ملی و غیره، می‌توان کامپوننت‌های سفارشی ایجاد کرد:

```tsx
// src/components/common/PersianDateInput.tsx
import React from 'react';
import { convertPersianToEnglishNumbers } from '../../utils/stringUtils';

interface PersianDateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PersianDateInput: React.FC<PersianDateInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = convertPersianToEnglishNumbers(e.target.value);
    
    // اعمال فرمت تاریخ (مثلاً 1402/01/01)
    newValue = newValue.replace(/[^0-9/]/g, '');
    
    // محدود کردن طول
    if (newValue.length > 10) {
      newValue = newValue.slice(0, 10);
    }
    
    // قالب‌بندی خودکار
    if (newValue.length === 4 && !newValue.includes('/')) {
      newValue = newValue + '/';
    } else if (newValue.length === 7 && newValue.lastIndexOf('/') === 4) {
      newValue = newValue + '/';
    }
    
    onChange(newValue);
  };
  
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="۱۴۰۲/۰۱/۰۱"
      dir="ltr"
    />
  );
};
```

## راهنمای کاربرد در لایه‌های مختلف برنامه

### 1. لایه فرانت‌اند (React)

#### فرم‌ها و ورودی‌ها
- برای هر ورودی عددی، از کامپوننت‌های سفارشی یا هوک `useDigitConversion` استفاده کنید
- تبدیل را در رویداد `onChange` انجام دهید
- مقدار تبدیل شده را در state ذخیره کنید

#### اعتبارسنجی
- قبل از اعتبارسنجی، اعداد فارسی را به انگلیسی تبدیل کنید
- الگوهای Regex را با اعداد انگلیسی تعریف کنید

#### ارسال داده به سرور
- اطمینان حاصل کنید که تمام داده‌های عددی قبل از ارسال به سرور تبدیل شده‌اند

### 2. لایه بک‌اند (Express)

#### میدلور
- از میدلور `digitConversionMiddleware` در همه مسیرهای API استفاده کنید
- این میدلور را در ابتدای زنجیره میدلورها قرار دهید تا قبل از اعتبارسنجی اجرا شود

```typescript
// src/app.ts
import { digitConversionMiddleware } from './middleware/digitConversion.middleware';

// اعمال میدلور به تمام مسیرها
app.use(digitConversionMiddleware);

// یا اعمال به مسیرهای خاص
app.use('/api/users', digitConversionMiddleware, userRoutes);
```

#### سرویس‌ها
- در سرویس‌هایی که مستقیماً با داده‌های کاربر کار می‌کنند، اعداد را تبدیل کنید
- تابع تبدیل را در utils/helpers قرار دهید تا در همه جا قابل استفاده باشد

### 3. پایگاه داده

- اطمینان حاصل کنید که تمام داده‌های عددی قبل از ذخیره در پایگاه داده به انگلیسی تبدیل شده‌اند
- در کوئری‌های جستجو، پارامترهای عددی را تبدیل کنید

## موارد خاص و استثناها

### 1. فیلدهایی که نیاز به تبدیل دارند

فیلدهای زیر باید همیشه تحت تبدیل اعداد قرار گیرند:

- شماره موبایل
- کد ملی
- شماره کارت بانکی
- شماره حساب
- تاریخ (در فرمت عددی)
- کد پستی
- مبالغ و اعداد مالی
- شماره‌های صفحه کلید (مثلاً رمز عبور عددی)

### 2. استثناها

در برخی موارد، تبدیل اعداد نباید انجام شود:

- متن‌های عادی که شامل اعداد فارسی هستند (مثل توضیحات)
- زمینه‌های علمی یا تخصصی که نیاز به نمایش اعداد فارسی دارند
- جایی که فرمت اعداد فارسی به عنوان بخشی از UI مهم است

در این موارد، می‌توانید با پاس دادن پارامتر `convertNumbers={false}` به کامپوننت‌ها، تبدیل را غیرفعال کنید.

## ویژگی‌های پیشرفته

### 1. تشخیص هوشمند اعداد

در برخی موارد، تشخیص خودکار اینکه آیا یک رشته باید تبدیل شود یا خیر، مفید است:

```typescript
export function shouldConvertToEnglishNumbers(str: string): boolean {
  // اگر رشته فقط شامل اعداد باشد
  const persianDigitsPattern = /^[\u06F0-\u06F9\u0660-\u0669\s-/]+$/;
  return persianDigitsPattern.test(str);
}
```

### 2. فرمت‌دهی اعداد

عملیات متداول روی اعداد پس از تبدیل:

```typescript
// اضافه کردن جداکننده هزارگان
export function formatNumber(num: number | string): string {
  const numStr = typeof num === 'number' ? num.toString() : num;
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// فرمت شماره موبایل
export function formatPhoneNumber(num: string): string {
  const normalizedNum = convertPersianToEnglishNumbers(num).replace(/\D/g, '');
  if (normalizedNum.length !== 11) return normalizedNum;
  return normalizedNum.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
}

// فرمت شماره کارت
export function formatCardNumber(num: string): string {
  const normalizedNum = convertPersianToEnglishNumbers(num).replace(/\D/g, '');
  return normalizedNum.replace(/(\d{4})(?=\d)/g, '$1-');
}
```

## چالش‌ها و راه‌حل‌ها

### 1. مدیریت نشانگر متن (Caret Position)

هنگام تبدیل اعداد در ورودی‌ها، ممکن است موقعیت نشانگر متن تغییر کند. برای حفظ موقعیت نشانگر:

```typescript
function preserveCaretPosition(input: HTMLInputElement, fn: (value: string) => string): void {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const oldValue = input.value;
  const newValue = fn(oldValue);
  
  input.value = newValue;
  
  // محاسبه موقعیت جدید نشانگر
  const newPos = start + (newValue.length - oldValue.length);
  
  // تنظیم موقعیت نشانگر
  input.setSelectionRange(newPos, newPos);
}
```

### 2. تبدیل در ورودی‌های با ماسک

در ورودی‌هایی که از ماسک استفاده می‌کنند (مثل تاریخ یا شماره کارت)، باید دقت کنید که فقط اعداد تبدیل شوند نه کاراکترهای ماسک:

```typescript
export function convertNumbersInMaskedInput(value: string, mask: string): string {
  let result = '';
  let valueIndex = 0;
  
  for (let i = 0; i < mask.length; i++) {
    if (valueIndex >= value.length) break;
    
    if (mask[i] === '#') {
      // جایگزینی با عدد
      result += convertPersianToEnglishNumbers(value[valueIndex]);
      valueIndex++;
    } else {
      // اضافه کردن کاراکتر ماسک
      result += mask[i];
      
      // اگر کاراکتر فعلی ورودی برابر با کاراکتر ماسک است، آن را رد کن
      if (value[valueIndex] === mask[i]) {
        valueIndex++;
      }
    }
  }
  
  return result;
}
```

## تست و اطمینان از کیفیت

### 1. تست‌های واحد

برای اطمینان از صحت عملکرد تابع تبدیل اعداد، تست‌های واحد بنویسید:

```typescript
// src/utils/__tests__/stringUtils.test.ts
import { convertPersianToEnglishNumbers } from '../stringUtils';

describe('convertPersianToEnglishNumbers', () => {
  it('should convert Persian digits to English', () => {
    expect(convertPersianToEnglishNumbers('۱۲۳۴۵')).toBe('12345');
  });
  
  it('should convert Arabic digits to English', () => {
    expect(convertPersianToEnglishNumbers('١٢٣٤٥')).toBe('12345');
  });
  
  it('should handle mixed digits', () => {
    expect(convertPersianToEnglishNumbers('۱2٣4۵')).toBe('12345');
  });
  
  it('should preserve non-digit characters', () => {
    expect(convertPersianToEnglishNumbers('تلفن: ۰۹۱۲۳۴۵۶۷۸۹')).toBe('تلفن: 09123456789');
  });
  
  it('should return empty string for empty input', () => {
    expect(convertPersianToEnglishNumbers('')).toBe('');
  });
  
  it('should handle null or undefined', () => {
    expect(convertPersianToEnglishNumbers(null as any)).toBe(null);
    expect(convertPersianToEnglishNumbers(undefined as any)).toBe(undefined);
  });
});
```

### 2. تست یکپارچگی

تست کنید که تبدیل اعداد در کل برنامه به درستی انجام می‌شود:

```typescript
// src/tests/integration/digitConversion.test.ts
import request from 'supertest';
import app from '../../app';

describe('Digit Conversion Middleware', () => {
  it('should convert Persian digits in request body', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        phoneNumber: '۰۹۱۲۳۴۵۶۷۸۹',
        nationalId: '۱۲۳۴۵۶۷۸۹۰'
      });
    
    // بررسی اینکه اعداد در سرور به درستی تبدیل شده‌اند
    expect(response.body.data.phoneNumber).toBe('09123456789');
    expect(response.body.data.nationalId).toBe('1234567890');
  });
  
  it('should convert Persian digits in query parameters', async () => {
    const response = await request(app)
      .get('/api/users/search?phoneNumber=۰۹۱۲۳۴۵۶۷۸۹');
    
    // بررسی اینکه کوئری با اعداد انگلیسی جستجو شده است
    expect(response.body.query.phoneNumber).toBe('09123456789');
  });
});
```

## نتیجه‌گیری

تبدیل اعداد فارسی به انگلیسی یک جنبه مهم از توسعه نرم‌افزارهای فارسی‌زبان است. با استفاده از راهکارهای ارائه شده در این سند، می‌توانید این تبدیل را به صورت یکپارچه و خودکار در سراسر پروژه دستیار هوشمند یک دو سه پیاده‌سازی کنید.

به خاطر داشته باشید که این تبدیل باید در تمام نقاط ورودی داده انجام شود تا یکپارچگی داده‌ها حفظ شود و تجربه کاربری بهتری ارائه شود.
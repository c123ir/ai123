# مستندات سرویس API

<div dir="rtl">

## معرفی

سرویس API مرکزی در پروژه دستیار هوشمند ۱۲۳ رابط یکپارچه‌ای برای ارتباط با سرورهای بک‌اند است. این سرویس مسئولیت مدیریت درخواست‌ها، مدیریت خطاها، و کش‌گذاری پاسخ‌ها را برعهده دارد.

## ویژگی‌های اصلی

- **مدیریت یکپارچه درخواست‌ها**: ارسال تمام درخواست‌ها از طریق یک واسط برنامه‌نویسی ساده
- **مدیریت خودکار توکن‌ها**: نگهداری و تمدید خودکار توکن‌های دسترسی
- **سیستم کش هوشمند**: ذخیره پاسخ‌های پرتکرار برای افزایش سرعت و کاهش بار سرور
- **مدیریت خطای پیشرفته**: پردازش متمرکز خطاهای شبکه و پاسخ‌های خطا
- **پشتیبانی از Interceptor**: امکان اجرای منطق قبل و بعد از هر درخواست
- **قابلیت Mock**: شبیه‌سازی پاسخ‌ها در محیط توسعه و تست

## استفاده از سرویس API

### نمونه فراخوانی ساده

```typescript
import { apiService } from '@services/api';

// درخواست ساده GET
const fetchUsers = async () => {
  try {
    const response = await apiService.get('/users');
    return response.data;
  } catch (error) {
    console.error('خطا در دریافت کاربران:', error);
    throw error;
  }
};

// درخواست POST با داده
const createUser = async (userData) => {
  try {
    const response = await apiService.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('خطا در ایجاد کاربر:', error);
    throw error;
  }
};
```

### استفاده از سرویس‌های آماده

```typescript
import { userService } from '@services/user';
import { transactionService } from '@services/transaction';

// استفاده از سرویس کاربر
const getUserProfile = async (userId) => {
  return await userService.getProfile(userId);
};

// استفاده از سرویس تراکنش‌ها
const getRecentTransactions = async (limit = 10) => {
  return await transactionService.getRecent(limit);
};
```

## ساختار سرویس API

سرویس API از یک معماری چندلایه تشکیل شده است:

1. **لایه هسته (Core)**: پایه‌ای‌ترین بخش که مسئول ارسال درخواست‌ها است
2. **لایه Interceptor**: مدیریت قبل و بعد از درخواست‌ها
3. **لایه Adapter**: تبدیل فرمت داده‌ها بین فرانت‌اند و بک‌اند
4. **لایه سرویس‌های تخصصی**: سرویس‌های مختص هر بخش مانند کاربران، تراکنش‌ها و غیره

### دیاگرام معماری

```
┌─────────────────┐     ┌───────────────┐     ┌────────────────┐
│  لایه کامپوننت  │ --> │  سرویس‌های   │ --> │   سرویس API   │
│    (React)      │     │    تخصصی     │     │     (Core)      │
└─────────────────┘     └───────────────┘     └────────────────┘
                                                      │
                                                      v
                                              ┌────────────────┐
                                              │     بک‌اند     │
                                              │     (API)      │
                                              └────────────────┘
```

## پیکربندی و تنظیمات

سرویس API از طریق فایل `.env` قابل پیکربندی است:

```
# آدرس پایه API
REACT_APP_API_BASE_URL=https://api.smartai123.com

# مهلت انتظار (به میلی‌ثانیه)
REACT_APP_API_TIMEOUT=30000

# فعال‌سازی کش
REACT_APP_API_CACHE_ENABLED=true

# مدت زمان نگهداری کش (به دقیقه)
REACT_APP_API_CACHE_DURATION=5
```

## مدیریت خطاها

سرویس API خطاهای مختلف را مدیریت می‌کند:

1. **خطاهای شبکه**: مانند قطعی ارتباط یا timeout
2. **خطاهای سرور**: کدهای خطای HTTP مانند 500 یا 503
3. **خطاهای احراز هویت**: مانند 401 (Unauthorized) یا 403 (Forbidden)
4. **خطاهای منطقی**: خطاهای خاص برنامه که در بدنه پاسخ برگردانده می‌شوند

### مثال مدیریت خطا

```typescript
import { apiService, ApiError } from '@services/api';

const fetchData = async () => {
  try {
    const response = await apiService.get('/data');
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.statusCode === 401) {
        // خطای احراز هویت - هدایت به صفحه ورود
        window.location.href = '/login';
      } else if (error.statusCode === 404) {
        // منبع پیدا نشد
        console.warn('منبع درخواستی یافت نشد');
        return null;
      } else {
        // سایر خطاها
        console.error(`خطای سرور: ${error.message}`);
      }
    } else {
      // خطای غیرمنتظره
      console.error('خطای ناشناخته:', error);
    }
    throw error;
  }
};
```

## توسعه و گسترش سرویس API

### افزودن Interceptor جدید

```typescript
import { apiService } from '@services/api';

// افزودن Interceptor برای درخواست
apiService.addRequestInterceptor(
  (config) => {
    // افزودن هدر سفارشی
    config.headers['Custom-Header'] = 'CustomValue';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// افزودن Interceptor برای پاسخ
apiService.addResponseInterceptor(
  (response) => {
    // پردازش پاسخ
    console.log('پاسخ دریافت شد:', response.config.url);
    return response;
  },
  (error) => {
    // پردازش خطا
    console.error('خطا در درخواست:', error.config.url);
    return Promise.reject(error);
  }
);
```

### ایجاد سرویس تخصصی جدید

```typescript
// src/services/report/reportService.ts
import { apiService } from '@services/api';

class ReportService {
  async getDailyReport(date) {
    const response = await apiService.get('/reports/daily', { params: { date } });
    return response.data;
  }
  
  async getMonthlyReport(month, year) {
    const response = await apiService.get('/reports/monthly', { 
      params: { month, year }
    });
    return response.data;
  }
  
  async generateCustomReport(reportConfig) {
    const response = await apiService.post('/reports/custom', reportConfig);
    return response.data;
  }
}

export const reportService = new ReportService();
```

## نکات امنیتی

- درخواست‌های حساس باید همیشه از توکن احراز هویت استفاده کنند
- اطلاعات حساس نباید در پارامترهای URL قرار بگیرند
- همیشه از HTTPS برای ارتباط با سرور استفاده کنید
- از Validation در سمت کلاینت برای داده‌های ورودی استفاده کنید
- توکن‌ها در حافظه امن (HTTP-only cookies) ذخیره شوند

## عیب‌یابی و رفع مشکلات

برای عیب‌یابی مشکلات سرویس API، می‌توانید از این روش‌ها استفاده کنید:

1. **فعال‌سازی لاگ‌های مفصل**:
   ```typescript
   // در فایل پیکربندی سرویس API
   apiService.enableVerboseLogging(true);
   ```

2. **بررسی درخواست‌ها در DevTools مرورگر**:
   - بخش Network در DevTools را باز کنید
   - فیلتر را روی XHR یا Fetch تنظیم کنید
   - درخواست‌ها و پاسخ‌ها را بررسی کنید

3. **استفاده از مقادیر mock برای تست**:
   ```typescript
   // فعال‌سازی mock برای یک مسیر خاص
   apiService.mock('/users', { 
     data: [{ id: 1, name: 'کاربر تست' }], 
     status: 200 
   });
   ```

## سوالات متداول

### چگونه می‌توانم به درخواست‌های API هدر خاصی اضافه کنم؟

با استفاده از Interceptor می‌توانید هدرهای سفارشی را به تمام درخواست‌ها اضافه کنید:

```typescript
apiService.addRequestInterceptor((config) => {
  config.headers['X-Custom-Header'] = 'مقدار سفارشی';
  return config;
});
```

### آیا می‌توانم درخواست‌های موازی ارسال کنم؟

بله، با استفاده از `Promise.all` می‌توانید چندین درخواست را به صورت همزمان ارسال کنید:

```typescript
const fetchAllData = async () => {
  const [users, products, orders] = await Promise.all([
    apiService.get('/users'),
    apiService.get('/products'),
    apiService.get('/orders')
  ]);
  
  return {
    users: users.data,
    products: products.data,
    orders: orders.data
  };
};
```

### چگونه می‌توانم درخواست‌های در حال انجام را لغو کنم؟

می‌توانید از CancelToken برای لغو درخواست‌ها استفاده کنید:

```typescript
import { apiService, createCancelToken } from '@services/api';

const fetchData = async () => {
  const cancelToken = createCancelToken();
  
  try {
    const response = await apiService.get('/data', { cancelToken });
    return response.data;
  } catch (error) {
    if (apiService.isCancel(error)) {
      console.log('درخواست توسط کاربر لغو شد');
      return null;
    }
    throw error;
  }
};

// در جایی دیگر از کد، مثلا هنگام unmount شدن کامپوننت
cancelToken.cancel('درخواست توسط کاربر لغو شد');
```

</div> 
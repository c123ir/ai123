# مستندات API دستیار هوشمند ۱۲۳

<div dir="rtl">

این سند، مستندات فنی برای ارتباط با سرور API پروژه **دستیار هوشمند یک دو سه** را ارائه می‌دهد. این راهنما برای توسعه‌دهندگان فرانت‌اند تهیه شده است.

## محتویات

- [اطلاعات کلی](#اطلاعات-کلی)
- [احراز هویت](#احراز-هویت)
- [نقاط پایانی API](#نقاط-پایانی-api)
  - [کاربران](#کاربران)
  - [توکن‌ها](#توکن‌ها)
  - [تراکنش‌ها](#تراکنش‌ها)
  - [مدیریت](#مدیریت)
  - [گزارش‌ها](#گزارش‌ها)
- [مدل‌های داده](#مدل‌های-داده)
- [کدهای خطا](#کدهای-خطا)
- [محدودیت‌ها](#محدودیت‌ها)

## اطلاعات کلی

### آدرس پایه

- محیط توسعه: `https://dev-api.smartai123.com/v1`
- محیط تولید: `https://api.smartai123.com/v1`

### سرآیندها (Headers)

هر درخواست باید شامل سرآیندهای زیر باشد:

```
Content-Type: application/json
Accept: application/json
```

و برای درخواست‌های نیازمند احراز هویت:

```
Authorization: Bearer {توکن-دسترسی}
```

### فرمت پاسخ‌ها

تمام پاسخ‌ها به فرمت JSON با ساختار زیر ارسال می‌شوند:

```json
{
  "success": true/false,
  "data": { ... },  // در صورت موفقیت
  "error": {        // در صورت خطا
    "code": "ERROR_CODE",
    "message": "پیام خطا"
  },
  "meta": {         // اطلاعات اضافی
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100
    }
  }
}
```

## احراز هویت

### ثبت‌نام

```
POST /auth/register
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| fullName | string | نام کامل کاربر |
| email | string | ایمیل (استفاده برای ورود) |
| password | string | رمز عبور (حداقل 8 کاراکتر) |
| mobile | string | شماره موبایل (با فرمت 09xx) |

#### نمونه درخواست

```json
{
  "fullName": "علی محمدی",
  "email": "ali@example.com",
  "password": "P@ssw0rd123",
  "mobile": "09123456789"
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "614c5f8e9bde2d001f8a92a5",
      "fullName": "علی محمدی",
      "email": "ali@example.com",
      "mobile": "09123456789",
      "role": "user",
      "createdAt": "2023-01-15T12:30:45Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  }
}
```

### ورود

```
POST /auth/login
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| email | string | ایمیل کاربر |
| password | string | رمز عبور |

#### نمونه درخواست

```json
{
  "email": "ali@example.com",
  "password": "P@ssw0rd123"
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "614c5f8e9bde2d001f8a92a5",
      "fullName": "علی محمدی",
      "email": "ali@example.com",
      "mobile": "09123456789",
      "role": "user",
      "createdAt": "2023-01-15T12:30:45Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  }
}
```

### تازه‌سازی توکن

```
POST /auth/refresh-token
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| refreshToken | string | توکن بازیابی |

#### نمونه درخواست

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### خروج

```
POST /auth/logout
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| refreshToken | string | توکن بازیابی |

#### نمونه درخواست

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "message": "خروج با موفقیت انجام شد"
  }
}
```

## نقاط پایانی API

### کاربران

#### دریافت اطلاعات کاربر فعلی

```
GET /user/profile
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "id": "614c5f8e9bde2d001f8a92a5",
    "fullName": "علی محمدی",
    "email": "ali@example.com",
    "mobile": "09123456789",
    "role": "user",
    "createdAt": "2023-01-15T12:30:45Z",
    "avatar": "https://api.smartai123.com/images/avatars/default.png",
    "settings": {
      "theme": "light",
      "language": "fa",
      "notifications": true
    }
  }
}
```

#### به‌روزرسانی پروفایل کاربر

```
PUT /user/profile
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| fullName | string | (اختیاری) نام کامل جدید |
| mobile | string | (اختیاری) شماره موبایل جدید |
| avatar | file | (اختیاری) تصویر پروفایل جدید |
| settings | object | (اختیاری) تنظیمات کاربر |

#### نمونه درخواست

```json
{
  "fullName": "علی رضا محمدی",
  "settings": {
    "theme": "dark",
    "notifications": false
  }
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "id": "614c5f8e9bde2d001f8a92a5",
    "fullName": "علی رضا محمدی",
    "email": "ali@example.com",
    "mobile": "09123456789",
    "settings": {
      "theme": "dark",
      "language": "fa",
      "notifications": false
    }
  }
}
```

#### تغییر رمز عبور

```
PUT /user/change-password
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| currentPassword | string | رمز عبور فعلی |
| newPassword | string | رمز عبور جدید |

#### نمونه درخواست

```json
{
  "currentPassword": "P@ssw0rd123",
  "newPassword": "N3wP@ssw0rd456"
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "message": "رمز عبور با موفقیت تغییر یافت"
  }
}
```

### توکن‌ها

#### دریافت موجودی توکن

```
GET /tokens/balance
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "balance": 150,
    "pendingBalance": 20,
    "lastUpdated": "2023-05-15T12:30:45Z"
  }
}
```

#### دریافت لیست تراکنش‌های توکن

```
GET /tokens/transactions?page=1&limit=10
```

#### پارامترهای Query String

| نام | نوع | توضیحات |
|-----|------|-------------|
| page | number | (اختیاری) شماره صفحه (پیش‌فرض: 1) |
| limit | number | (اختیاری) تعداد در هر صفحه (پیش‌فرض: 10) |
| type | string | (اختیاری) نوع تراکنش (charge, usage, transfer) |
| startDate | string | (اختیاری) تاریخ شروع (فرمت ISO) |
| endDate | string | (اختیاری) تاریخ پایان (فرمت ISO) |

#### نمونه پاسخ

```json
{
  "success": true,
  "data": [
    {
      "id": "615c5f8e9bde2d001f8a92b1",
      "type": "charge",
      "amount": 100,
      "description": "شارژ اعتبار",
      "status": "completed",
      "createdAt": "2023-05-10T14:25:30Z",
      "reference": "INV-12345"
    },
    {
      "id": "615c5f8e9bde2d001f8a92b2",
      "type": "usage",
      "amount": -5,
      "description": "استفاده از سرویس ترجمه",
      "status": "completed",
      "createdAt": "2023-05-11T09:12:18Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42
    }
  }
}
```

#### انتقال توکن به کاربر دیگر

```
POST /tokens/transfer
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| recipientEmail | string | ایمیل گیرنده |
| amount | number | مقدار توکن برای انتقال |
| description | string | (اختیاری) توضیحات تراکنش |

#### نمونه درخواست

```json
{
  "recipientEmail": "reza@example.com",
  "amount": 25,
  "description": "هدیه تولد"
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "id": "615c5f8e9bde2d001f8a92b3",
    "amount": 25,
    "recipient": "reza@example.com",
    "status": "completed",
    "description": "هدیه تولد",
    "createdAt": "2023-05-15T16:45:22Z",
    "newBalance": 125
  }
}
```

#### خرید توکن

```
POST /tokens/purchase
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| packageId | string | شناسه بسته توکن |
| paymentMethod | string | روش پرداخت (credit_card, online_payment) |

#### نمونه درخواست

```json
{
  "packageId": "basic_package_100",
  "paymentMethod": "online_payment"
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "invoiceId": "INV-67890",
    "amount": 250000,
    "tokensAmount": 100,
    "paymentUrl": "https://payment.smartai123.com/pay/123456789",
    "expiresAt": "2023-05-15T17:30:22Z"
  }
}
```

### مدیریت (Admin API)

#### دریافت لیست کاربران (مخصوص ادمین)

```
GET /admin/users?page=1&limit=15&search=محمد
```

#### پارامترهای Query String

| نام | نوع | توضیحات |
|-----|------|-------------|
| page | number | (اختیاری) شماره صفحه |
| limit | number | (اختیاری) تعداد در هر صفحه |
| search | string | (اختیاری) جستجو در نام یا ایمیل |
| role | string | (اختیاری) فیلتر بر اساس نقش |
| sortBy | string | (اختیاری) مرتب‌سازی (createdAt, fullName, etc.) |
| order | string | (اختیاری) ترتیب مرتب‌سازی (asc, desc) |

#### نمونه پاسخ

```json
{
  "success": true,
  "data": [
    {
      "id": "614c5f8e9bde2d001f8a92a5",
      "fullName": "علی محمدی",
      "email": "ali@example.com",
      "mobile": "09123456789",
      "role": "user",
      "tokensBalance": 150,
      "createdAt": "2023-01-15T12:30:45Z",
      "lastLogin": "2023-05-14T08:22:10Z",
      "status": "active"
    },
    {
      "id": "614c5f8e9bde2d001f8a92a6",
      "fullName": "محمد احمدی",
      "email": "mohammad@example.com",
      "mobile": "09123456788",
      "role": "user",
      "tokensBalance": 80,
      "createdAt": "2023-02-22T10:15:30Z",
      "lastLogin": "2023-05-10T14:05:22Z",
      "status": "active"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 15,
      "total": 230
    }
  }
}
```

#### ویرایش کاربر (مخصوص ادمین)

```
PUT /admin/users/:userId
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| fullName | string | (اختیاری) نام کامل |
| role | string | (اختیاری) نقش کاربر (user, admin) |
| status | string | (اختیاری) وضعیت کاربر (active, suspended) |

#### نمونه درخواست

```json
{
  "role": "admin",
  "status": "active"
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "id": "614c5f8e9bde2d001f8a92a6",
    "fullName": "محمد احمدی",
    "email": "mohammad@example.com",
    "role": "admin",
    "status": "active",
    "updatedAt": "2023-05-15T17:30:22Z"
  }
}
```

#### تنظیم موجودی توکن کاربر (مخصوص ادمین)

```
PUT /admin/users/:userId/tokens
```

#### پارامترها

| نام | نوع | توضیحات |
|-----|------|-------------|
| amount | number | مقدار توکن‌ها |
| operation | string | نوع عملیات (set, add, subtract) |
| reason | string | دلیل تغییر موجودی |

#### نمونه درخواست

```json
{
  "amount": 50,
  "operation": "add",
  "reason": "هدیه عضویت"
}
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "userId": "614c5f8e9bde2d001f8a92a6",
    "previousBalance": 80,
    "newBalance": 130,
    "transactionId": "615c5f8e9bde2d001f8a92b4"
  }
}
```

### گزارش‌ها (مخصوص ادمین)

#### گزارش کلی پلتفرم

```
GET /admin/reports/overview
```

#### نمونه پاسخ

```json
{
  "success": true,
  "data": {
    "usersCount": 2500,
    "activeUsers": 1800,
    "newUsersToday": 42,
    "totalTokensIssued": 125000,
    "totalTokensUsed": 78500,
    "averageTokensPerUser": 50,
    "topServices": [
      {
        "name": "ترجمه",
        "usage": 45000
      },
      {
        "name": "خلاصه‌سازی",
        "usage": 25000
      }
    ]
  }
}
```

## مدل‌های داده

### کاربر

```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
  settings: {
    theme: 'light' | 'dark';
    language: 'fa' | 'en';
    notifications: boolean;
  };
  status: 'active' | 'suspended' | 'deactivated';
}
```

### تراکنش توکن

```typescript
interface TokenTransaction {
  id: string;
  type: 'charge' | 'usage' | 'transfer' | 'refund' | 'admin_adjustment';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  reference?: string;
  recipient?: string;
  serviceName?: string;
}
```

### بسته توکن

```typescript
interface TokenPackage {
  id: string;
  name: string;
  tokensAmount: number;
  price: number;
  currency: 'IRR';
  isActive: boolean;
  discountPercentage?: number;
  expiryDays?: number;
}
```

### پاسخ خطا

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

## کدهای خطا

| کد خطا | توضیحات |
|---------|-------------|
| `AUTH_INVALID_CREDENTIALS` | اطلاعات ورود نامعتبر است |
| `AUTH_TOKEN_EXPIRED` | توکن منقضی شده است |
| `AUTH_TOKEN_INVALID` | توکن نامعتبر است |
| `AUTH_INSUFFICIENT_PERMISSIONS` | دسترسی ناکافی |
| `RESOURCE_NOT_FOUND` | منبع درخواستی یافت نشد |
| `VALIDATION_ERROR` | داده‌های ارسالی نامعتبر هستند |
| `TOKEN_INSUFFICIENT_BALANCE` | موجودی توکن ناکافی |
| `RATE_LIMIT_EXCEEDED` | محدودیت تعداد درخواست |
| `SERVER_ERROR` | خطای داخلی سرور |

## محدودیت‌ها

- حداکثر تعداد درخواست: 100 درخواست در دقیقه
- حداکثر اندازه فایل برای آپلود: 5MB
- حداکثر مقدار توکن برای انتقال در هر تراکنش: 1000
- حداقل مقدار توکن برای انتقال: 5

## امنیت

- تمامی درخواست‌ها باید از طریق HTTPS ارسال شوند
- توکن‌های دسترسی پس از 1 ساعت منقضی می‌شوند
- توکن‌های بازیابی پس از 7 روز منقضی می‌شوند
- پس از 5 تلاش ناموفق برای ورود، حساب کاربری به مدت 15 دقیقه قفل می‌شود

</div> 
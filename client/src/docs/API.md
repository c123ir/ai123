# مستندات API پروژه دستیار هوشمند ۱۲۳

<div dir="rtl">

## ساختار کلی API

تمام درخواست‌های API از الگوی RESTful پیروی می‌کنند و پاسخ‌ها به صورت JSON برگردانده می‌شوند. پایه URL برای تمام درخواست‌ها به صورت زیر است:

```text
https://api.intelligent-assistant-123.ir/v2/
```

هر پاسخ API دارای ساختار یکسانی است:

```json
{
  "success": true,
  "data": {
    // داده‌های اصلی
  },
  "error": null
}
```

یا در صورت بروز خطا:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "پیام خطا"
  }
}
```

## سرویس‌های احراز هویت

### ورود کاربران

```text
POST /auth/login
```

پارامترها:

- `username`: نام کاربری یا ایمیل
- `password`: کلمه عبور

نمونه پاسخ:

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123",
      "username": "user123",
      "email": "user@example.com",
      "role": "user"
    }
  },
  "error": null
}
```

### ثبت‌نام کاربران

```text
POST /auth/register
```

پارامترها:

- `username`: نام کاربری
- `email`: ایمیل
- `password`: کلمه عبور
- `fullName`: نام کامل

### درخواست بازیابی رمز عبور

```text
POST /auth/forgot-password
```

پارامترها:

- `email`: ایمیل

### تنظیم مجدد رمز عبور

```text
POST /auth/reset-password
```

پارامترها:

- `token`: توکن ارسال شده به ایمیل
- `newPassword`: رمز عبور جدید

## سرویس‌های توکن

### دریافت موجودی توکن

```text
GET /tokens/balance/:userId
```

پارامترها:

- `userId`: شناسه کاربر

نمونه پاسخ:

```json
{
  "success": true,
  "data": {
    "balance": {
      "total": 150,
      "reward": 50,
      "purchased": 100,
      "loyalty": 0
    },
    "expiringTokens": [
      {
        "id": "token123",
        "amount": 20,
        "expiryDate": "2023-12-31T23:59:59Z",
        "type": "reward"
      }
    ]
  },
  "error": null
}
```

### دریافت تاریخچه تراکنش‌ها

```text
GET /tokens/history/:userId
```

پارامترها:

- `userId`: شناسه کاربر
- `page`: شماره صفحه (پارامتر query)
- `pageSize`: تعداد آیتم در هر صفحه (پارامتر query)
- `type`: نوع تراکنش (اختیاری - پارامتر query)

نمونه پاسخ:

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "trx123",
        "userId": "user123",
        "type": "purchase",
        "amount": 100,
        "description": "خرید توکن",
        "createdAt": "2023-10-15T12:30:45Z"
      },
      {
        "id": "trx124",
        "userId": "user123",
        "type": "redemption",
        "amount": -20,
        "description": "استفاده برای تخفیف",
        "createdAt": "2023-10-20T09:15:30Z"
      }
    ],
    "total": 45
  },
  "error": null
}
```

### استفاده از توکن

```text
POST /tokens/use
```

پارامترها:

- `userId`: شناسه کاربر
- `amount`: مقدار توکن
- `purpose`: هدف استفاده
- `description`: توضیحات (اختیاری)

### خرید توکن

```text
POST /tokens/buy
```

پارامترها:

- `userId`: شناسه کاربر
- `amount`: مقدار توکن
- `paymentMethod`: روش پرداخت
- `description`: توضیحات (اختیاری)

## سرویس‌های مشاوره هوشمند

### دریافت لیست مشاوران

```text
GET /advisors
```

پارامترها (همه به صورت query):

- `category`: دسته‌بندی (اختیاری)
- `expertise`: تخصص (اختیاری)
- `availability`: زمان در دسترس بودن (اختیاری)
- `rating`: حداقل امتیاز (اختیاری)
- `page`: شماره صفحه
- `pageSize`: تعداد در هر صفحه

نمونه پاسخ:

```json
{
  "success": true,
  "data": {
    "advisors": [
      {
        "id": "adv123",
        "name": "دکتر محمدی",
        "expertise": ["روانشناسی بالینی", "مشاوره خانواده"],
        "rating": 4.8,
        "totalSessions": 243,
        "availability": [
          {
            "date": "2023-11-20",
            "slots": ["10:00", "14:00", "16:30"]
          }
        ],
        "hourlyRate": 250000,
        "tokenDiscount": 10
      }
    ],
    "total": 152
  }
}
```

// ... existing code ...

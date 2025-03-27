# مستندات دستیار هوشمند یک‌دو‌سه

<div dir="rtl">

## مستندات اصلی

برای دسترسی به بخش‌های اصلی مستندات روی لینک‌های زیر کلیک کنید:

### راهنماهای فنی

- [اصول پایه و قوانین پروژه](./foundational/core-principles.md)
- [سیستم توکن](./foundational/token-system.md)
- [سیستم قوانین امتیازدهی و توکن‌سوزی](./foundational/token-scoring-rules.md)
- [سیستم کاربر مهمان](./foundational/guest-user-system.md)
- [مدیریت خطاها](./foundational/error-handling.md)
- [ادغام سیستم پیامک](./foundational/sms-integration.md)
- [اصول طراحی رابط کاربری](./ui/ui-design-principles.md)
- [ساختار رابط کاربری وب‌اپلیکیشن](./ui/web-app-ui-structure.md)

### مستندات فنی پیشرفته

- [سرویس API](./tech/api-service.md)
- [معماری ماژولار](./tech/modular-architecture.md)

### مستندات توسعه‌دهندگان

- [راهنمای نصب و راه‌اندازی](./develop/installation.md)
- [راهنمای توسعه‌دهندگان](./develop/developer-guide.md)
- [سیستم وابستگی‌ها](./develop/dependencies.md)

## تغییرات نسخه

### نسخه ۲.۰.۰ (فعلی)
- اضافه شدن مستندات جامع اصول و قوانین پایه
- بروزرسانی مستندات سیستم توکن و امتیازدهی
- افزودن مستندات سیستم کاربر مهمان
- بهبود مستندات طراحی رابط کاربری
- ساختاربندی مجدد مستندات در بخش‌های مختلف

### نسخه ۱.۰.۰
- مستندات اولیه پروژه
- تعریف اصول اولیه طراحی
- مستندات فنی ابتدایی

## نصب و راه‌اندازی

برای نصب و راه‌اندازی پروژه به [راهنمای نصب و راه‌اندازی](./develop/installation.md) مراجعه کنید.

### مستندات بنیادی
- [اصول و قواعد اساسی](./foundational/core-principles.md)
- [سیستم توکن مانیبل](./foundational/token-system.md)
- [مدیریت خطا](./foundational/error-handling.md)
- [یکپارچه‌سازی سامانه پیامک](./foundational/sms-integration.md)

### مستندات ساختاری
- [ساختار پروژه - نسخه ۲](./v2-project-structure.md)
- [ساختار جدید برنامه](./v2-structure.md)
- [برنامه مهاجرت به ساختار جدید](./migration-plan.md)

### راهنماهای فنی
- [راهنمای رفع خطاها](./error-fixing-guide.md)
- [راهنمای مهاجرت به Ant Design](./antd-migration-guide.md)
- [الگوهای طراحی توصیه شده](./design-patterns.md)

### مستندات فنی پیشرفته
- [معماری ماژولار](./tech/modular-architecture.md)
- [سیستم تم پیشرفته](./tech/theming-system.md)
- [کتابخانه کامپوننت‌ها](./tech/component-library.md)
- [سرویس API](./tech/api-service.md)

### مستندات اصلی
- [معرفی پروژه](./README.md)
- [سیستم تم](./THEME.md)
- [مستندات API](./API.md)
- [راهنمای مشارکت](./CONTRIBUTION.md)
- [راهنمای نصب مجدد](./Reinstall%20To%20Macbook.md)

## تغییرات اصلی نسخه ۲

نسخه ۲ پروژه دستیار هوشمند ۱۲۳ شامل تغییرات زیر است:

1. **معماری ماژولار جدید**: 
   - تقسیم‌بندی کد به ماژول‌های مجزا با مسئولیت‌های مشخص
   - تفکیک دقیق‌تر بخش‌های مختلف برنامه
   - سازماندهی بهتر کامپوننت‌ها و سرویس‌ها

2. **ارتقا به Ant Design**:
   - تغییر از Material UI به Ant Design
   - بهبود پشتیبانی از RTL و زبان فارسی
   - کامپوننت‌های تخصصی بیشتر برای نمایش داده‌های مالی
   - نمودارهای پیشرفته با Ant Design Charts

3. **بهبودهای فنی**:
   - رفع مشکل مسیرهای تکراری
   - اصلاح مشکل Router
   - استفاده بهتر از Context API
   - پیاده‌سازی بهتر Lazy Loading

4. **ساختار سایت ساده**:
   - ایجاد بخش سایت ساده به جای فروشگاه آنلاین
   - صفحات Home، About و Contact
   - رابط کاربری ساده و کاربرپسند

## شروع به کار با پروژه

### پیش‌نیازها
- Node.js نسخه 18 یا بالاتر
- npm نسخه 9 یا بالاتر
- یک دستگاه با حداقل 4GB رم

### نصب و راه‌اندازی

1. **کلون کردن پروژه**:
   ```bash
   git clone https://github.com/your-username/smartai123.git
   cd smartai123
   ```

2. **نصب وابستگی‌ها**:
   ```bash
   npm install
   ```

3. **تنظیم فایل محیطی**:
   ```bash
   cp .env.example .env
   # ویرایش فایل .env با تنظیمات مناسب
   ```

4. **اجرای برنامه در محیط توسعه**:
   ```bash
   npm start
   ```

برنامه روی آدرس `http://localhost:3434` اجرا خواهد شد.

## اطلاعات تماس و پشتیبانی

- **ایمیل**: dev@smartai123.com
- **گیت‌هاب**: https://github.com/your-username/smartai123
- **کانال گفتگو**: Slack #frontend-team

</div> 
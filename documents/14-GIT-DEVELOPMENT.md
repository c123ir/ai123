# 14-GIT-DEVELOPMENT.md (ai123/documents/14-GIT-DEVELOPMENT.md)

# فرآیند توسعه و گیت

## مقدمه
این سند فرآیند توسعه و قوانین مدیریت کد در پروژه SmartAi123 را توضیح می‌دهد. هدف از این قوانین، ایجاد یک روند منظم و استاندارد برای توسعه، بازبینی و ادغام کد در مخزن اصلی پروژه است.

## مخزن گیت

### اطلاعات مخزن
- مخزن اصلی: https://github.com/c123ir/ai123
- ساختار شاخه‌ها: توسعه روی شاخه‌های جداگانه و ادغام در شاخه اصلی
- دسترسی: مبتنی بر نقش با کلیدهای SSH

## استراتژی شاخه‌بندی (Branching Strategy)

### شاخه‌های اصلی
- **main**: نسخه پایدار برای محیط تولید
- **develop**: شاخه اصلی توسعه
- **release/v[X.Y.Z]**: شاخه‌های آماده‌سازی انتشار
- **hotfix/[issue]**: رفع سریع مشکلات محیط تولید

### شاخه‌های ویژگی
- نام‌گذاری: `feature/[issue-number]-[short-description]`
- مثال: `feature/123-user-authentication`
- هر ویژگی باید در شاخه مجزا توسعه یابد

## جریان کار گیت (Git Workflow)

### توسعه ویژگی جدید
1. ایجاد شاخه جدید از develop: `git checkout -b feature/[name] develop`
2. توسعه و کامیت تغییرات: `git commit -m "توضیح تغییرات"`
3. به‌روزرسانی با شاخه develop: `git pull --rebase origin develop`
4. ارسال شاخه به مخزن: `git push origin feature/[name]`
5. ایجاد درخواست ادغام (Pull Request) به شاخه develop

### رفع باگ
1. ایجاد شاخه bugfix: `git checkout -b bugfix/[issue] develop`
2. اصلاح و کامیت تغییرات
3. درخواست ادغام به develop یا hotfix به main

## استانداردهای کامیت

### فرمت پیام کامیت
```
[نوع]: توضیح مختصر

توضیحات بیشتر در صورت نیاز
```

### انواع کامیت
- **feat**: ویژگی جدید
- **fix**: رفع باگ
- **docs**: تغییر مستندات
- **style**: تغییرات ظاهری (بدون تغییر منطق)
- **refactor**: بازنویسی کد بدون تغییر عملکرد
- **perf**: بهبود کارایی
- **test**: افزودن یا اصلاح تست‌ها
- **chore**: تغییرات متفرقه (وابستگی‌ها، ابزارها و غیره)

## درخواست‌های ادغام (Pull Requests)

### قوانین درخواست ادغام
- عنوان واضح و مرتبط با تغییرات
- توضیح کامل تغییرات و دلیل آن‌ها
- ارتباط با issues مربوطه
- حداقل یک بازبینی کد لازم است

### معیارهای پذیرش
- گذر از تمام تست‌های خودکار
- رعایت استانداردهای کدنویسی
- بازبینی و تأیید توسط حداقل یک توسعه‌دهنده دیگر
- مستندسازی کافی برای تغییرات

## مستندسازی و گیت

### نکات مهم
- پس از هر مرحله موفقیت‌آمیز، مستندسازی به‌روز شود
- مستندسازی باید قبل از ادغام با شاخه اصلی کامل باشد
- تغییرات API و ساختار باید در مستندات ذکر شود

### روند مستندسازی
1. به‌روزرسانی فایل‌های مستندات مرتبط
2. کامیت تغییرات با نوع `docs`
3. ارسال درخواست مستندات همراه با درخواست ویژگی یا به صورت مجزا

## گیت هوک‌ها (Git Hooks)

### قبل از کامیت (pre-commit)
- اجرای linter برای بررسی سبک کد
- اجرای تست‌های سریع
- تبدیل اعداد فارسی به انگلیسی در کدها

### قبل از ارسال (pre-push)
- اجرای تست‌های کامل
- بررسی کیفیت کد

## آموزش و منابع
- ویدیوهای آموزشی گیت در ویکی پروژه
- راهنمای مرجع دستورات گیت
- جلسات هفتگی برای بررسی روند توسعه و حل مشکلات
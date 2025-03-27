# 01-PROJECT-SETUP.md - راهنمای راه‌اندازی پروژه دستیار هوشمند یک دو سه

## مقدمه

این راهنما، مراحل نصب و راه‌اندازی پروژه دستیار هوشمند یک دو سه (SmartAi123) را به صورت گام به گام تشریح می‌کند. با پیروی از این مراحل، می‌توانید محیط توسعه را به درستی آماده کنید.

## پیش‌نیازها

قبل از راه‌اندازی پروژه، از نصب و آماده بودن موارد زیر اطمینان حاصل کنید:

### نرم‌افزارهای پایه
- Node.js نسخه 18 یا بالاتر
- npm نسخه 9 یا بالاتر (معمولاً همراه با Node.js نصب می‌شود)
- Git نسخه 2.30 یا بالاتر

### پایگاه داده
- PostgreSQL نسخه 14 یا بالاتر
- Redis نسخه 6 یا بالاتر (برای مدیریت کش و جلسات)

### IDE پیشنهادی
- Visual Studio Code با افزونه‌های زیر:
  - ESLint
  - Prettier
  - TypeScript
  - vscode-styled-components
  - RTL Support

## مراحل راه‌اندازی

### 1. کلون کردن مخزن
ابتدا پروژه را از مخزن GitHub کلون کنید:

```bash
git clone https://github.com/c123ir/ai123.git
cd ai123
```

### 2. نصب وابستگی‌های سرور (بک‌اند)

```bash
cd server
npm install
```

### 3. نصب وابستگی‌های کلاینت (فرانت‌اند)

```bash
cd ../client
npm install
```

### 4. تنظیم فایل‌های محیطی (.env)

#### برای بخش سرور
فایل `.env.example` را به `.env` کپی کنید و مقادیر مناسب را تنظیم نمایید:

```bash
cd ../server
cp .env.example .env
```

سپس فایل `.env` را باز کرده و مقادیر زیر را متناسب با محیط خود تنظیم کنید:

```
# تنظیمات سرور
PORT=5454
NODE_ENV=development

# تنظیمات پایگاه داده
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smartai123
DB_USER=postgres
DB_PASSWORD=your_password

# تنظیمات Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# تنظیمات JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your_refresh_token_secret_key
JWT_REFRESH_EXPIRES_IN=7d

# تنظیمات ایمیل
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@smartai123.com

# تنظیمات پیامک
SMS_API_KEY=your_sms_api_key
SMS_SENDER_NUMBER=your_sender_number
```

#### برای بخش کلاینت
فایل `.env.example` را به `.env` کپی کنید:

```bash
cd ../client
cp .env.example .env
```

سپس فایل `.env` را باز کرده و مقادیر مناسب را تنظیم کنید:

```
REACT_APP_API_URL=http://localhost:5454/api
REACT_APP_VERSION=1.0.0
```

### 5. ایجاد پایگاه داده

ابتدا وارد PostgreSQL شوید:

```bash
psql -U postgres
```

سپس پایگاه داده را ایجاد کنید:

```sql
CREATE DATABASE smartai123;
```

### 6. اجرای مهاجرت‌های پایگاه داده

```bash
cd ../server
npm run migrate
```

### 7. راه‌اندازی برنامه در محیط توسعه

#### راه‌اندازی سرور (بک‌اند)

```bash
cd ../server
npm run dev
```

سرور روی پورت 5454 اجرا خواهد شد و می‌توانید به آدرس `http://localhost:5454/health` دسترسی داشته باشید.

#### راه‌اندازی کلاینت (فرانت‌اند)

در ترمینال جدید:

```bash
cd ../client
npm start
```

کلاینت روی پورت 3000 اجرا خواهد شد و می‌توانید به آدرس `http://localhost:3000` دسترسی داشته باشید.

## راه‌اندازی با Docker

برای سهولت در راه‌اندازی، می‌توانید از Docker استفاده کنید:

```bash
cd ai123
docker-compose up
```

این دستور، تمام سرویس‌های مورد نیاز شامل سرور، کلاینت، PostgreSQL و Redis را راه‌اندازی می‌کند.

## تست سیستم

برای اطمینان از نصب صحیح، تست‌های سیستم را اجرا کنید:

```bash
cd server
npm test
```

## چک‌لیست راه‌اندازی

پس از نصب، موارد زیر را بررسی کنید:

- [ ] سرور به درستی روی پورت 5454 در حال اجراست
- [ ] کلاینت به درستی روی پورت 3000 در حال اجراست
- [ ] دسترسی به صفحه سلامت سرور امکان‌پذیر است
- [ ] اتصال به پایگاه داده برقرار است
- [ ] اتصال به Redis برقرار است
- [ ] تست‌ها با موفقیت اجرا می‌شوند

## عیب‌یابی رایج

### مشکل در اتصال به پایگاه داده
- تنظیمات پایگاه داده در فایل `.env` را بررسی کنید
- اطمینان حاصل کنید که PostgreSQL در حال اجراست
- دسترسی‌های کاربر پایگاه داده را بررسی کنید

### خطای پورت در استفاده
- اطمینان حاصل کنید که پورت‌های 5454 و 3000 آزاد هستند
- در صورت نیاز، پورت را در فایل‌های محیطی تغییر دهید

### مشکل در نصب وابستگی‌ها
- نسخه Node.js و npm را بررسی کنید
- کش npm را پاک کنید: `npm cache clean --force`
- با دسترسی مدیر نصب کنید: `sudo npm install`

## منابع بیشتر

- [مستندات Docker](https://docs.docker.com/)
- [مستندات PostgreSQL](https://www.postgresql.org/docs/)
- [مستندات Redis](https://redis.io/documentation)
- [مستندات Node.js](https://nodejs.org/en/docs/)
- [مستندات React](https://reactjs.org/docs/getting-started.html)

## پشتیبانی

در صورت بروز مشکل در راه‌اندازی، با تیم پشتیبانی از طریق ایمیل `support@smartai123.com` یا کانال `#support` در Slack تماس بگیرید.
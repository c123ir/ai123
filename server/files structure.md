computer123/
├── server/     
             ├──
├── client/                        # کد منبع
│   ├── config/                 # تنظیمات برنامه
│   │   ├── environment.ts      # تنظیمات محیطی
│   │   ├── database.ts         # تنظیمات پایگاه داده
│   │   ├── security.ts         # تنظیمات امنیتی
│   │   ├── notification.ts     # تنظیمات اعلان‌ها
│   │   └── monitoring.ts       # تنظیمات مانیتورینگ
│   ├── controllers/            # کنترلرها
│   ├── middleware/             # میان‌افزارها
│   ├── models/                 # مدل‌های داده
│   ├── routes/                 # مسیرهای API
│   ├── services/               # سرویس‌ها
│   │   ├── core/               # سرویس‌های اصلی
│   │   ├── user/               # سرویس کاربران
│   │   ├── notification/       # سرویس اعلان‌ها
│   │   ├── monitoring/         # سرویس مانیتورینگ
│   │   └── token/              # سرویس توکن
│   ├── utils/                  # توابع کمکی
│   │   ├── stringUtils.ts      # توابع کمکی برای رشته‌ها
│   │   └── validationUtils.ts  # توابع کمکی برای اعتبارسنجی
│   └── app.ts                  # فایل اصلی برنامه
├── client/                     # کد فرانت‌اند
│   ├── src/                    # کد منبع فرانت‌اند
│   ├── public/                 # فایل‌های عمومی
│   └── package.json            # وابستگی‌های فرانت‌اند
├── tests/                      # تست‌ها
│   ├── unit/                   # تست‌های واحد
│   └── integration/            # تست‌های یکپارچگی
├── docs/                       # مستندات
│   ├── 00-PUBLIC.md            # مستندات عمومی
│   ├── 01-PROJECT_STARTUP.md   # راهنمای شروع پروژه
│   ├── 02-PROJECT_STRUCTURE.md # ساختار فایل‌های پروژه
│   ├── 05-DIGIT_CONVERSION.md  # تبدیل اعداد
│   └── 06-DEVELOPMENT.md       # قوانین توسعه
├── scripts/                    # اسکریپت‌های مفید
├── .env.example                # نمونه فایل محیطی
├── Dockerfile                  # فایل Docker
├── docker-compose.yml          # فایل Docker Compose
├── package.json                # وابستگی‌های بک‌اند
└── README.md                   # توضیحات پروژه

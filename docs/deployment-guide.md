# راهنمای انتقال پروژه به سرور (Deployment Guide)

## مقدمه

این راهنما روش انتقال و راه‌اندازی پروژه دستیار هوشمند ۱۲۳ روی سرور را شرح می‌دهد. در این راهنما، برای ساده‌سازی فرآیند، از داکر استفاده می‌کنیم.

## پیش‌نیازها

قبل از شروع فرآیند انتقال، موارد زیر را روی سرور نصب کنید:

- **سیستم‌عامل**: لینوکس (ترجیحاً Ubuntu 20.04 یا بالاتر)
- **داکر**: نسخه 20.10 یا بالاتر
- **داکر کامپوز**: نسخه 2.0 یا بالاتر
- **git**: نسخه 2.30 یا بالاتر
- **دسترسی SSH** به سرور با کاربر sudo

## مراحل انتقال به سرور

### ۱. آماده‌سازی سرور

SSH به سرور خود متصل شوید و بسته‌های مورد نیاز را نصب کنید:

```bash
# به‌روزرسانی پکیج‌ها
sudo apt update
sudo apt upgrade -y

# نصب داکر
sudo apt install -y docker.io docker-compose git

# اضافه کردن کاربر خود به گروه داکر (برای اجرای داکر بدون sudo)
sudo usermod -aG docker $USER

# اعمال تغییرات گروه
newgrp docker
```

### ۲. کلون پروژه

پروژه را از مخزن Git کلون کنید:

```bash
# ایجاد دایرکتوری برای پروژه
mkdir -p /var/www
cd /var/www

# کلون پروژه
git clone https://github.com/c123ir/ai123.git
cd ai123
```

### ۳. ایجاد فایل‌های محیطی

فایل‌های محیطی (env.) مورد نیاز را در هر بخش ایجاد کنید:

#### بخش سرور

```bash
cd server
cp .env.example .env
```

فایل `.env` را با مقادیر مناسب برای محیط تولید ویرایش کنید:

```
# تنظیمات سرور
PORT=5454
NODE_ENV=production

# تنظیمات پایگاه داده
DB_HOST=postgres
DB_PORT=5432
DB_NAME=computer123
DB_USER=postgres
DB_PASSWORD=yourStrongPassword

# تنظیمات Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=yourRedisPassword

# تنظیمات JWT
JWT_SECRET=yourJwtSecretKey
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=yourRefreshTokenSecretKey
JWT_REFRESH_EXPIRES_IN=7d

# تنظیمات ایمیل
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@smartai123.com
```

#### بخش کلاینت

```bash
cd ../client
cp .env.example .env
```

فایل `.env` را با تنظیمات محیط تولید ویرایش کنید:

```
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_VERSION=1.0.0
```

### ۴. ایجاد فایل داکر کامپوز اصلی

در دایرکتوری اصلی پروژه، فایل `docker-compose.yml` را با محتوای زیر ایجاد یا ویرایش کنید:

```bash
cd /var/www/ai123
```

```yaml
version: '3.8'

services:
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: computer123_server
    restart: unless-stopped
    depends_on:
      - postgres
      - redis
    environment:
      NODE_ENV: production
    ports:
      - "5454:5454"
    networks:
      - computer123_network
    volumes:
      - ./server/uploads:/app/uploads

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: computer123_client
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    networks:
      - computer123_network
    volumes:
      - ./client/nginx/ssl:/etc/nginx/ssl
      - ./client/nginx/conf.d:/etc/nginx/conf.d

  postgres:
    image: postgres:13
    container_name: computer123_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: yourStrongPassword
      POSTGRES_DB: computer123
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - computer123_network
    restart: unless-stopped

  redis:
    image: redis:6
    container_name: computer123_redis
    command: redis-server --requirepass yourRedisPassword
    ports:
      - "6380:6379"
    volumes:
      - redis_data:/data
    networks:
      - computer123_network
    restart: unless-stopped

networks:
  computer123_network:
    driver: bridge

volumes:
  postgres_data:
  redis_data:
```

### ۵. ایجاد Dockerfile برای کلاینت

در دایرکتوری کلاینت، فایل `Dockerfile` زیر را ایجاد کنید:

```bash
cd /var/www/ai123/client
```

```Dockerfile
# مرحله ساخت
FROM node:16-alpine AS builder

WORKDIR /app

# کپی فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کد منبع
COPY . .

# ساخت برنامه
RUN npm run build

# مرحله اجرا با Nginx
FROM nginx:stable-alpine

# کپی فایل‌های ساخته شده از مرحله builder
COPY --from=builder /app/build /usr/share/nginx/html

# کپی تنظیمات Nginx
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# پورت‌های برنامه
EXPOSE 80 443

# دستور اجرا
CMD ["nginx", "-g", "daemon off;"]
```

### ۶. ایجاد پیکربندی Nginx

دایرکتوری‌های مورد نیاز برای تنظیمات Nginx را ایجاد کنید:

```bash
mkdir -p /var/www/html/myapp/ai123/client/nginx/conf.d
mkdir -p /var/www/html/mtapp/ai123/client/nginx/ssl
```

سپس فایل پیکربندی Nginx را ایجاد کنید:

```bash
cd /var/www/ai123/client/nginx/conf.d
```

```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # برای تغییر مسیر به HTTPS، این بخش را فعال کنید
    # location / {
    #     return 301 https://$host$request_uri;
    # }

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # تنظیمات کش برای فایل‌های استاتیک
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        root /usr/share/nginx/html;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }
}

# برای فعال‌سازی HTTPS، این بخش را از حالت کامنت خارج کنید
# server {
#     listen 443 ssl;
#     server_name yourdomain.com www.yourdomain.com;
#
#     ssl_certificate /etc/nginx/ssl/yourdomain.com.crt;
#     ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;
#
#     location / {
#         root /usr/share/nginx/html;
#         index index.html index.htm;
#         try_files $uri $uri/ /index.html;
#     }
#
#     # تنظیمات کش برای فایل‌های استاتیک
#     location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
#         root /usr/share/nginx/html;
#         expires 1y;
#         add_header Cache-Control "public, max-age=31536000";
#     }
# }
```

### ۷. ساخت و راه‌اندازی کانتینرها

حالا می‌توانید کانتینرها را بسازید و راه‌اندازی کنید:

```bash
cd /var/www/ai123
docker-compose up -d
```

### ۸. اجرای مهاجرت‌های پایگاه داده

پس از راه‌اندازی کانتینرها، نیاز است مهاجرت‌های پایگاه داده را اجرا کنید:

```bash
docker exec -it computer123_server npm run migrate
```

## تنظیمات SSL (اختیاری)

برای تنظیم SSL و HTTPS، از دستورات زیر استفاده کنید:

### ۱. دریافت گواهی SSL

از Let's Encrypt با ابزار Certbot استفاده کنید:

```bash
sudo apt install -y certbot
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

### ۲. کپی گواهی‌ها به دایرکتوری مناسب

```bash
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /var/www/ai123/client/nginx/ssl/yourdomain.com.crt
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /var/www/ai123/client/nginx/ssl/yourdomain.com.key

# تنظیم دسترسی‌ها
sudo chown -R $USER:$USER /var/www/ai123/client/nginx/ssl
chmod 600 /var/www/ai123/client/nginx/ssl/yourdomain.com.key
```

### ۳. فعال‌سازی HTTPS در تنظیمات Nginx

فایل `/var/www/ai123/client/nginx/conf.d/default.conf` را ویرایش کنید و بخش‌های مربوط به HTTPS را از حالت کامنت خارج کنید.

### ۴. بازسازی کانتینر کلاینت

```bash
cd /var/www/ai123
docker-compose up -d --build client
```

## بررسی وضعیت استقرار

برای بررسی وضعیت کانتینرها، از دستور زیر استفاده کنید:

```bash
docker-compose ps
```

برای مشاهده لاگ‌ها:

```bash
# لاگ تمام کانتینرها
docker-compose logs

# لاگ یک کانتینر خاص
docker-compose logs server
docker-compose logs client
```

## پشتیبان‌گیری از داده‌ها

برای پشتیبان‌گیری منظم از پایگاه داده، اسکریپت زیر را ایجاد کنید:

```bash
mkdir -p /var/www/ai123/backups
```

```bash
#!/bin/bash
# /var/www/ai123/backup.sh

BACKUP_DIR="/var/www/ai123/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/computer123_$TIMESTAMP.sql"

# ایجاد دایرکتوری پشتیبان اگر وجود ندارد
mkdir -p $BACKUP_DIR

# پشتیبان‌گیری از PostgreSQL
docker exec computer123_postgres pg_dump -U postgres computer123 > $BACKUP_FILE

# فشرده‌سازی فایل پشتیبان
gzip $BACKUP_FILE

# حذف پشتیبان‌های قدیمی‌تر از 30 روز
find $BACKUP_DIR -name "computer123_*.sql.gz" -type f -mtime +30 -delete

echo "پشتیبان‌گیری در $BACKUP_FILE.gz کامل شد."
```

اجازه اجرا به اسکریپت دهید و آن را به کرون اضافه کنید:

```bash
chmod +x /var/www/ai123/backup.sh

# تنظیم کرون برای اجرای روزانه در ساعت 2 صبح
crontab -e
```

```
0 2 * * * /var/www/ai123/backup.sh >> /var/www/ai123/backups/backup.log 2>&1
```

## به‌روزرسانی پروژه

برای به‌روزرسانی پروژه به نسخه جدید، دستورات زیر را اجرا کنید:

```bash
cd /var/www/ai123

# دریافت تغییرات جدید
git pull

# بازسازی و راه‌اندازی مجدد کانتینرها
docker-compose down
docker-compose up -d --build
```

## عیب‌یابی رایج

### مشکل ۱: خطای UnicodeDecodeError در docker-compose
اگر هنگام اجرای docker-compose با خطای زیر مواجه شدید:
```
ERROR: .UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc6 in position 15: invalid continuation byte
```

این خطا معمولاً به دلیل مشکل کدگذاری کاراکترهای غیر ASCII (مانند حروف فارسی) در مسیر فایل یا محتوای فایل docker-compose.yml رخ می‌دهد. برای رفع این مشکل:

#### راه‌حل ۱: تغییر کدپیج سیستم
```bash
# برای سیستم‌های لینوکس
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# برای سیستم‌های ویندوز
chcp 437
```

#### راه‌حل ۲: حذف کاراکترهای غیر ASCII از مسیر فایل‌ها
مطمئن شوید مسیر پروژه و فایل‌های آن فقط شامل حروف انگلیسی باشد:
```bash
# ایجاد یک دایرکتوری با نام انگلیسی
mkdir -p /var/www/ai123-deploy
cd /var/www/ai123-deploy

# کلون پروژه
git clone https://github.com/c123ir/ai123.git .
```

#### راه‌حل ۳: بررسی و اصلاح فایل docker-compose.yml
فایل docker-compose.yml را در یک ویرایشگر متنی با پشتیبانی UTF-8 باز کنید و مطمئن شوید:
1. فایل با فرمت UTF-8 ذخیره شده است
2. هیچ کاراکتر خاص یا غیر قابل چاپ در فایل وجود ندارد

```bash
# بررسی فرمت فایل
file -i docker-compose.yml

# ویرایش فایل با vim (با پشتیبانی UTF-8)
vim -c "set fileencoding=utf-8" docker-compose.yml
```

### مشکل ۲: سرور در دسترس نیست

بررسی کنید که کانتینرها در حال اجرا هستند:

```bash
docker-compose ps
```

لاگ‌ها را برای یافتن خطاها بررسی کنید:

```bash
docker-compose logs server
```

### مشکل ۳: خطای اتصال به پایگاه داده

بررسی کنید که کانتینر PostgreSQL در حال اجراست:

```bash
docker-compose ps postgres
```

تنظیمات اتصال به پایگاه داده در فایل `.env` سرور را بررسی کنید.

### مشکل ۴: فرانت‌اند به API متصل نمی‌شود

مطمئن شوید که `REACT_APP_API_URL` در فایل `.env` کلاینت به درستی تنظیم شده است.

بررسی کنید که سرور در دسترس است:

```bash
curl http://localhost:5454/health
```

### مشکل ۵: تاخیر زیاد در بارگذاری صفحات

بررسی مصرف منابع:

```bash
docker stats
```

### مشکل ۶: خطای npm ci در ساخت داکر کلاینت

اگر هنگام ساخت کانتینر کلاینت با خطای زیر مواجه شدید:

```
npm ERR! code EUSAGE
npm ERR! The `npm ci` command can only install with an existing package-lock.json
```

این خطا به دلیل عدم وجود فایل package-lock.json رخ می‌دهد. برای رفع این مشکل، Dockerfile را ویرایش کرده و از دستور `npm install` به جای `npm ci` استفاده کنید:

```bash
# ویرایش Dockerfile کلاینت
cd /var/www/html/myapp/ai123/client
```

محتوای فایل Dockerfile را به این شکل تغییر دهید:

```Dockerfile
# مرحله ساخت
FROM node:16-alpine AS builder

WORKDIR /app

# کپی فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها با استفاده از npm install به جای npm ci
RUN npm install

# کپی کد منبع
COPY . .

# ساخت برنامه
RUN npm run build

# مرحله اجرا با Nginx
FROM nginx:stable-alpine

# کپی فایل‌های ساخته شده از مرحله builder
COPY --from=builder /app/build /usr/share/nginx/html

# کپی تنظیمات Nginx
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# پورت‌های برنامه
EXPOSE 80 443

# دستور اجرا
CMD ["nginx", "-g", "daemon off;"]
```

همچنین اطمینان حاصل کنید که دایرکتوری‌های nginx و فایل پیکربندی آن ایجاد شده‌اند:

```bash
# ایجاد دایرکتوری‌های مورد نیاز
mkdir -p /var/www/html/myapp/ai123/client/nginx/conf.d

# ایجاد فایل پیکربندی nginx
cat > /var/www/html/myapp/ai123/client/nginx/conf.d/default.conf << 'EOL'
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # تنظیمات کش برای فایل‌های استاتیک
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        root /usr/share/nginx/html;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }
}
EOL
```

سپس مجدداً ساخت کانتینرها را انجام دهید:

```bash
cd /var/www/html/myapp/ai123
docker-compose up -d --build
```

## نتیجه‌گیری

با پیروی از این راهنما، پروژه دستیار هوشمند ۱۲۳ با موفقیت روی سرور شما مستقر خواهد شد. برای اطمینان از عملکرد صحیح، نظارت منظم و به‌روزرسانی پروژه را فراموش نکنید.

برای کسب اطلاعات بیشتر یا رفع مشکلات پیچیده‌تر، با تیم پشتیبانی تماس بگیرید.

#!/bin/bash

# ایجاد دایرکتوری‌های مورد نیاز در سرور
echo "ایجاد دایرکتوری‌های مورد نیاز..."
mkdir -p /var/www/html/myapp/ai123/client/nginx/conf.d

# کپی فایل‌های مورد نیاز از محیط توسعه به سرور
echo "کپی فایل‌های nginx..."
cat > /var/www/html/myapp/ai123/client/nginx/conf.d/default.conf << 'NGINX_CONF'
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
NGINX_CONF

# اصلاح Dockerfile کلاینت
echo "اصلاح Dockerfile کلاینت..."
cat > /var/www/html/myapp/ai123/client/Dockerfile << 'DOCKERFILE'
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

# ایجاد دایرکتوری برای فایل‌های تنظیمات nginx
RUN mkdir -p /etc/nginx/conf.d

# کپی فایل‌های ساخته شده از مرحله builder
COPY --from=builder /app/build /usr/share/nginx/html

# کپی تنظیمات Nginx
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# پورت‌های برنامه
EXPOSE 80 443

# دستور اجرا
CMD ["nginx", "-g", "daemon off;"]
DOCKERFILE

# اضافه کردن کتابخانه‌های Redux
echo "اضافه کردن کتابخانه‌های Redux به package.json..."
sed -i '/"@emotion\/styled": ".*",/a\    "@reduxjs\/toolkit": "^2.2.2",' /var/www/html/myapp/ai123/client/package.json
sed -i '/"react-router-dom": ".*",/a\    "redux": "^5.0.1",' /var/www/html/myapp/ai123/client/package.json

echo "همه تغییرات با موفقیت اعمال شد."
echo "اکنون می‌توانید با دستور زیر کانتینرها را بسازید:"
echo "cd /var/www/html/myapp/ai123 && docker-compose up -d --build" 
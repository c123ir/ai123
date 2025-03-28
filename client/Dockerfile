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
# مرحله ساخت
FROM node:16-alpine AS builder

WORKDIR /app

# کپی فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm ci

# کپی کد منبع
COPY . .

# ساخت برنامه
RUN npm run build

# مرحله اجرا
FROM node:16-alpine

WORKDIR /app

# کپی فایل‌های package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌های تولید
RUN npm ci --only=production

# کپی فایل‌های ساخته شده از مرحله builder
COPY --from=builder /app/dist ./dist

# تنظیم متغیرهای محیطی
ENV NODE_ENV=production

# پورت برنامه
EXPOSE 3000

# دستور اجرا
CMD ["npm", "start"] 
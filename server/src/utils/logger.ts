// src/utils/logger.ts - سیستم ثبت لاگ

import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

// ایجاد دایرکتوری لاگ اگر وجود نداشته باشد
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// فرمت تاریخ برای لاگ‌ها
const { format } = winston;
const logFormat = format.printf((info) => {
  const { timestamp, level, message, ...meta } = info;
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${
    Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
  }`;
});

// ایجاد logger با وینستون
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    logFormat
  ),
  defaultMeta: { service: 'computer123-api' },
  transports: [
    // لاگ خطاها در فایل جداگانه
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
    }),
    // لاگ همه پیام‌ها (info و بالاتر) در فایل جداگانه
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
    }),
  ],
});

// اگر در محیط توسعه هستیم، در کنسول هم لاگ می‌کنیم
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    })
  );
}

/**
 * لاگ کردن درخواست HTTP
 * @param req درخواست HTTP
 * @param res پاسخ HTTP
 * @param next تابع بعدی
 */
export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date().getTime();
  
  res.on('finish', () => {
    const duration = new Date().getTime() - startTime;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';
    
    logger.log(logLevel, `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration,
      ip: req.ip,
      userAgent: req.get('user-agent') || '',
    });
  });
  
  next();
};

export default logger; 
// src/config/database.ts - پیکربندی اتصال به پایگاه داده

import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

// بارگذاری متغیرهای محیطی
dotenv.config();

// تنظیمات اتصال به پایگاه داده
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'computer123',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20, // حداکثر تعداد کلاینت‌های اتصال در استخر
  idleTimeoutMillis: 30000, // زمان انتظار قبل از بستن ارتباط بلااستفاده
  connectionTimeoutMillis: 2000, // زمان انتظار برای اتصال به سرور
});

/**
 * اتصال به پایگاه داده و بررسی سلامت آن
 */
export async function connectToDatabase(): Promise<void> {
  try {
    // بررسی اتصال به پایگاه داده
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();

    logger.info('✅ اتصال به پایگاه داده با موفقیت برقرار شد', {
      time: result.rows[0].now,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });
  } catch (error) {
    logger.error('❌ خطا در اتصال به پایگاه داده:', error);
    throw new Error('خطا در اتصال به پایگاه داده');
  }
}

/**
 * اجرای کوئری در پایگاه داده
 * @param text متن کوئری SQL
 * @param params پارامترهای کوئری (اختیاری)
 * @returns نتیجه کوئری
 */
export async function query(text: string, params?: any[]): Promise<QueryResult> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    // ثبت اطلاعات کوئری در صورتی که بیشتر از 300ms طول کشیده باشد
    if (duration > 300) {
      logger.warn('کوئری آهسته اجرا شد', {
        text,
        duration,
        rows: result.rowCount,
      });
    }
    
    return result;
  } catch (error: any) {
    logger.error('خطا در اجرای کوئری', {
      text,
      error: {
        message: error.message,
        code: error.code,
        detail: error.detail,
      },
    });
    throw error;
  }
}

/**
 * بستن اتصال به پایگاه داده
 */
export async function close(): Promise<void> {
  try {
    await pool.end();
    logger.info('اتصال به پایگاه داده بسته شد');
  } catch (error) {
    logger.error('خطا در بستن اتصال به پایگاه داده:', error);
  }
}

export default pool; 
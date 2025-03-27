import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// بارگذاری متغیرهای محیطی
dotenv.config();

// تنظیمات اتصال پایگاه داده
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'computer123',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

// تابع اجرای مهاجرت‌ها
async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 شروع مهاجرت‌های پایگاه داده');
    
    // ایجاد جدول migrations اگر وجود نداشته باشد
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
    
    // خواندن لیست فایل‌های مهاجرت اجرا شده
    const { rows: executedMigrations } = await client.query(
      'SELECT name FROM migrations'
    );
    const executedMigrationNames = executedMigrations.map((row: { name: string }) => row.name);
    
    // دریافت لیست فایل‌های مهاجرت
    const migrationsDir = __dirname;
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // مرتب‌سازی به ترتیب نام
    
    // اجرای مهاجرت‌ها
    for (const migrationFile of migrationFiles) {
      // بررسی اینکه آیا مهاجرت قبلاً اجرا شده است
      if (executedMigrationNames.includes(migrationFile)) {
        console.log(`✅ مهاجرت ${migrationFile} قبلاً اجرا شده است`);
        continue;
      }
      
      console.log(`🔄 در حال اجرای مهاجرت: ${migrationFile}`);
      
      // خواندن محتوای فایل مهاجرت
      const migrationPath = path.join(migrationsDir, migrationFile);
      const migrationSql = fs.readFileSync(migrationPath, 'utf8');
      
      // شروع تراکنش
      await client.query('BEGIN');
      
      try {
        // اجرای اسکریپت مهاجرت
        await client.query(migrationSql);
        
        // ثبت مهاجرت اجرا شده
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [migrationFile]
        );
        
        // تایید تراکنش
        await client.query('COMMIT');
        
        console.log(`✅ مهاجرت ${migrationFile} با موفقیت اجرا شد`);
      } catch (error) {
        // بازگشت تراکنش در صورت خطا
        await client.query('ROLLBACK');
        console.error(`❌ خطا در اجرای مهاجرت ${migrationFile}:`, error);
        throw error;
      }
    }
    
    console.log('✅ مهاجرت‌های پایگاه داده با موفقیت کامل شد');
  } catch (error) {
    console.error('❌ خطا در اجرای مهاجرت‌ها:', error);
    process.exit(1);
  } finally {
    // آزادسازی اتصال
    client.release();
    
    // بستن استخر اتصال
    await pool.end();
  }
}

// اجرای مهاجرت‌ها
runMigrations(); 
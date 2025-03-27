import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import morgan from 'morgan';

// بارگذاری متغیرهای محیطی
dotenv.config();

// واردسازی روت‌ها
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import emailRoutes from './routes/email.routes';
// روت‌های زیر بعداً پیاده‌سازی خواهند شد
// import tokenRoutes from './routes/token.routes';
// import reportRoutes from './routes/report.routes';
import notificationRoutes from './routes/notification.routes';

// واردسازی میدلویرها
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import { httpLogger } from './utils/logger';

// واردسازی سرویس اتصال به پایگاه داده
import { connectToDatabase } from './config/database';

// واردسازی سرویس ایمیل
import { initEmailService } from './config/email';

// تنظیم پورت و متغیرهای محیطی
const PORT = process.env.PORT || 5454;

// ایجاد برنامه اکسپرس
const app = express();

// میدلویرهای امنیتی و عمومی
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

// میدلویر محدودیت نرخ درخواست
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW || '15')) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// روت سلامت سرویس
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// اضافه کردن روت‌ها
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/emails', emailRoutes);
app.use('/api/v1/notifications', notificationRoutes);
// روت‌های زیر بعداً فعال خواهند شد
// app.use('/api/v1/tokens', tokenRoutes);
// app.use('/api/v1/reports', reportRoutes);

// میدلویر مدیریت خطای 404
app.use(notFoundHandler);

// میدلویر مدیریت خطاها
app.use(errorHandler);

// اتصال به پایگاه داده و راه‌اندازی سرور
const startServer = async () => {
  try {
    // اتصال به پایگاه داده
    await connectToDatabase();
    
    // راه‌اندازی سرویس ایمیل
    try {
      await initEmailService();
      console.log('🔗 سرویس ایمیل با موفقیت راه‌اندازی شد');
    } catch (error) {
      console.warn('⚠️ سرویس ایمیل با خطا مواجه شد:', error);
    }
    
    // راه‌اندازی سرور
    app.listen(PORT, () => {
      console.log(`🚀 سرور روی پورت ${PORT} در حال اجراست`);
      console.log(`🔗 آدرس سلامت سرویس: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ خطا در راه‌اندازی سرور:', error);
    process.exit(1);
  }
};

// فراخوانی تابع راه‌اندازی سرور
startServer();

// مدیریت سیگنال‌های خروج
process.on('SIGTERM', () => {
  console.log('🛑 سیگنال SIGTERM دریافت شد. در حال بستن سرور...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 سیگنال SIGINT دریافت شد. در حال بستن سرور...');
  process.exit(0);
});

export default app; 
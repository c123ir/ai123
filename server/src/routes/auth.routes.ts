// src/routes/auth.routes.ts - تعریف مسیرهای احراز هویت

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

// ایجاد نمونه کنترلر
const authController = new AuthController();

// ایجاد روتر
const router = Router();

/**
 * @route POST /api/v1/auth/register
 * @desc ثبت‌نام کاربر جدید
 * @access عمومی
 */
router.post('/register', authController.register);

/**
 * @route POST /api/v1/auth/login
 * @desc ورود کاربر با ایمیل و رمز عبور
 * @access عمومی
 */
router.post('/login', authController.login);

/**
 * @route POST /api/v1/auth/refresh-token
 * @desc نوسازی توکن با استفاده از رفرش توکن
 * @access عمومی
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * @route GET /api/v1/auth/me
 * @desc دریافت اطلاعات کاربر لاگین شده
 * @access خصوصی
 */
router.get('/me', authenticate, authController.getProfile);

/**
 * @route POST /api/v1/auth/change-password
 * @desc تغییر رمز عبور کاربر
 * @access خصوصی
 */
router.post('/change-password', authenticate, authController.changePassword);

/**
 * @route POST /api/v1/auth/logout
 * @desc خروج کاربر
 * @access خصوصی
 */
router.post('/logout', authenticate, authController.logout);

export default router; 
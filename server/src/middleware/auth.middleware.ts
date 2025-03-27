// src/middleware/auth.middleware.ts - میدلویر احراز هویت

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

// گسترش نوع Response برای اضافه کردن کاربر به درخواست
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * میدلویر احراز هویت JWT
 * توکن JWT را بررسی و کاربر را به درخواست اضافه می‌کند
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    // بررسی وجود هدر Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.unauthorized('توکن احراز هویت الزامی است'));
    }

    // توکن را از هدر جدا می‌کنیم
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    // بررسی توکن خالی
    if (!token) {
      return next(ApiError.unauthorized('توکن احراز هویت الزامی است'));
    }

    // بررسی اعتبار توکن
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_change_in_production');
    
    // اضافه کردن اطلاعات کاربر به درخواست
    req.user = decoded as { id: string; email: string; role: string };
    
    next();
  } catch (error) {
    // خطای منقضی شدن توکن
    if (error instanceof jwt.TokenExpiredError) {
      return next(ApiError.unauthorized('توکن منقضی شده است. لطفاً دوباره وارد شوید'));
    }
    
    // سایر خطاهای توکن
    if (error instanceof jwt.JsonWebTokenError) {
      return next(ApiError.unauthorized('توکن نامعتبر است'));
    }
    
    // خطاهای ناشناخته
    logger.error('خطا در احراز هویت:', error);
    return next(ApiError.unauthorized('احراز هویت با خطا مواجه شد'));
  }
};

/**
 * میدلویر احراز هویت (نام قدیمی)
 * برای حفظ سازگاری با کدهای قبلی
 */
export const authenticate = authenticateJWT;

/**
 * میدلویر بررسی نقش کاربر
 * بررسی می‌کند که آیا کاربر دارای نقش‌های مجاز است یا خیر
 * @param allowedRoles آرایه‌ای از نقش‌های مجاز
 */
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی اینکه آیا کاربر احراز هویت شده است
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      // بررسی اینکه آیا نقش کاربر در لیست نقش‌های مجاز است
      if (!allowedRoles.includes(req.user.role)) {
        return next(ApiError.forbidden('شما اجازه دسترسی به این منبع را ندارید'));
      }

      next();
    } catch (error) {
      logger.error('خطا در بررسی مجوز:', error);
      return next(ApiError.internal('خطا در بررسی مجوز دسترسی'));
    }
  };
};

/**
 * میدلویر بررسی نقش ادمین
 * بررسی می‌کند که آیا کاربر دارای نقش ادمین است یا خیر
 */
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    // بررسی اینکه آیا کاربر احراز هویت شده است
    if (!req.user) {
      return next(ApiError.unauthorized('لطفاً وارد شوید'));
    }

    // بررسی اینکه آیا کاربر نقش ادمین دارد
    if (req.user.role !== 'admin') {
      return next(ApiError.forbidden('فقط ادمین اجازه دسترسی به این بخش را دارد'));
    }

    next();
  } catch (error) {
    logger.error('خطا در بررسی مجوز ادمین:', error);
    return next(ApiError.internal('خطا در بررسی مجوز دسترسی'));
  }
}; 
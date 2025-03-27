import { Request, Response, NextFunction } from 'express';
import { UserService, UpdateUserDTO } from '../services/user/user.service';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../middleware/error.middleware';
import { validate } from '../utils/validator';
import { logger } from '../utils/logger';

// ایجاد نمونه از سرویس کاربر
const userService = new UserService();

/**
 * کنترلر مدیریت کاربران
 * شامل توابع دریافت، بروزرسانی و حذف کاربران
 */
export class UserController {
  /**
   * دریافت لیست کاربران
   * @route GET /api/v1/users
   */
  public getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // استخراج پارامترهای صفحه‌بندی از کوئری‌استرینگ
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      // بررسی مقادیر صفحه‌بندی
      if (page < 1 || limit < 1 || limit > 100) {
        return next(ApiError.badRequest('پارامترهای صفحه‌بندی نامعتبر هستند'));
      }

      // دریافت لیست کاربران
      const result = await userService.getUsers(page, limit);

      // ارسال پاسخ موفق
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * دریافت اطلاعات یک کاربر
   * @route GET /api/v1/users/:id
   */
  public getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      
      // بررسی دسترسی (فقط ادمین یا خود کاربر)
      if (req.user?.role !== 'admin' && req.user?.id !== userId) {
        return next(ApiError.forbidden('شما اجازه دسترسی به این منبع را ندارید'));
      }

      // دریافت اطلاعات کاربر
      const user = await userService.getUserById(userId);
      if (!user) {
        return next(ApiError.notFound('کاربر یافت نشد'));
      }

      // حذف فیلدهای حساس از پاسخ
      const userResponse = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        phone_number: user.phone_number,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at
      };

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        data: { user: userResponse }
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * بروزرسانی اطلاعات کاربر
   * @route PUT /api/v1/users/:id
   */
  public updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      
      // بررسی دسترسی (فقط ادمین یا خود کاربر)
      if (req.user?.role !== 'admin' && req.user?.id !== userId) {
        return next(ApiError.forbidden('شما اجازه دسترسی به این منبع را ندارید'));
      }

      // اعتبارسنجی داده‌ها
      const schema = {
        first_name: { type: 'string' as const, min: 2, max: 50, optional: true },
        last_name: { type: 'string' as const, min: 2, max: 50, optional: true },
        email: { type: 'email' as const, optional: true },
        phone_number: { type: 'string' as const, pattern: /^09[0-9]{9}$/, optional: true }
      };

      // اگر کاربر مدیر است، می‌تواند وضعیت کاربر را نیز تغییر دهد
      if (req.user && req.user.role === 'admin') {
        Object.assign(schema, {
          status: { type: 'string' as const, enum: ['active', 'inactive', 'suspended'], optional: true }
        });
      }

      const { error, value } = validate<UpdateUserDTO>(req.body, schema);

      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }

      // محدود کردن دسترسی برای تغییر وضعیت کاربر (فقط ادمین)
      if (value.status && req.user?.role !== 'admin') {
        return next(ApiError.forbidden('فقط ادمین می‌تواند وضعیت کاربر را تغییر دهد'));
      }

      // بروزرسانی اطلاعات کاربر
      const updatedUser = await userService.updateUser(userId, value);

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: 'اطلاعات کاربر با موفقیت بروزرسانی شد',
        data: { user: updatedUser }
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * حذف کاربر
   * @route DELETE /api/v1/users/:id
   */
  public deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;

      // حذف کاربر
      await userService.deleteUser(userId);

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: 'کاربر با موفقیت حذف شد'
      });
    } catch (error) {
      next(error);
    }
  });
} 
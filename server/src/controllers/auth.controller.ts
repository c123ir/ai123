import { Request, Response, NextFunction } from 'express';
import { UserService, UserRegisterDTO, UserLoginDTO } from '../services/user/user.service';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../middleware/error.middleware';
import { validate } from '../utils/validator';
import { logger } from '../utils/logger';

// ایجاد نمونه از سرویس کاربر
const userService = new UserService();

/**
 * کنترلر مدیریت عملیات احراز هویت
 */
export class AuthController {
  /**
   * ثبت‌نام کاربر جدید
   * @route POST /api/v1/auth/register
   */
  public register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // اعتبارسنجی داده‌های ورودی
      const schema = {
        first_name: { type: 'string' as const, required: true, min: 2, max: 50 },
        last_name: { type: 'string' as const, required: true, min: 2, max: 50 },
        email: { type: 'email' as const, required: true },
        password: { type: 'string' as const, required: true, min: 6 },
        phone_number: { type: 'string' as const, optional: true, pattern: /^09[0-9]{9}$/ }
      };

      const { error, value } = validate<UserRegisterDTO>(req.body, schema);

      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }

      // بررسی وجود کاربر با همین ایمیل
      const existingUser = await userService.getUserByEmail(value.email);
      if (existingUser) {
        return next(ApiError.conflict('کاربری با این ایمیل قبلاً ثبت‌نام کرده است'));
      }

      // ثبت‌نام کاربر
      const user = await userService.register(value);

      // ارسال پاسخ موفق
      res.status(201).json({
        status: 'success',
        message: 'ثبت‌نام با موفقیت انجام شد',
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
          created_at: user.created_at
        }
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * ورود کاربر
   * @route POST /api/v1/auth/login
   */
  public login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // اعتبارسنجی داده‌های ورودی
      const schema = {
        email: { type: 'email' as const, required: true },
        password: { type: 'string' as const, required: true, min: 6 }
      };

      const { error, value } = validate<UserLoginDTO>(req.body, schema);

      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }

      // ورود کاربر و دریافت توکن
      const tokenResponse = await userService.login(value);

      // ارسال پاسخ موفق
      res.status(200).json({
        status: 'success',
        message: 'ورود با موفقیت انجام شد',
        data: tokenResponse
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * نوسازی توکن
   * @route POST /api/v1/auth/refresh-token
   */
  public refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // اعتبارسنجی داده‌های ورودی
      const schema = {
        refresh_token: { type: 'string' as const, required: true }
      };

      const { error, value } = validate<{ refresh_token: string }>(req.body, schema);

      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }

      // نوسازی توکن
      const tokenResponse = await userService.refreshToken(value.refresh_token);

      // ارسال پاسخ موفق
      res.status(200).json({
        status: 'success',
        message: 'توکن با موفقیت نوسازی شد',
        data: tokenResponse
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * دریافت پروفایل کاربر
   * @route GET /api/v1/auth/me
   */
  public getProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی اینکه آیا کاربر احراز هویت شده است
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      // دریافت اطلاعات کاربر
      const user = await userService.getUserById(req.user.id);

      if (!user) {
        return next(ApiError.notFound('کاربر یافت نشد'));
      }

      // ارسال پاسخ موفق
      res.status(200).json({
        status: 'success',
        data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
          status: user.status,
          created_at: user.created_at
        }
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * تغییر رمز عبور
   * @route POST /api/v1/auth/change-password
   */
  public changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی اینکه آیا کاربر احراز هویت شده است
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      // اعتبارسنجی داده‌های ورودی
      const schema = {
        current_password: { type: 'string' as const, required: true },
        new_password: { type: 'string' as const, required: true, min: 6 },
        confirm_password: { type: 'string' as const, required: true, min: 6 }
      };

      const { error, value } = validate<{ current_password: string; new_password: string; confirm_password: string }>(req.body, schema);

      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }

      // بررسی تطابق رمز جدید و تکرار آن
      if (value.new_password !== value.confirm_password) {
        return next(ApiError.validationError('رمز عبور جدید و تکرار آن مطابقت ندارند'));
      }

      // تغییر رمز عبور
      await userService.changePassword(req.user.id, value.current_password, value.new_password);

      // ارسال پاسخ موفق
      res.status(200).json({
        status: 'success',
        message: 'رمز عبور با موفقیت تغییر یافت'
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * خروج کاربر
   * @route POST /api/v1/auth/logout
   */
  public logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی اینکه آیا کاربر احراز هویت شده است
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      // ارسال پاسخ موفق
      // نکته: در پیاده‌سازی واقعی، می‌توان توکن را در یک لیست سیاه قرار داد
      res.status(200).json({
        status: 'success',
        message: 'خروج با موفقیت انجام شد'
      });
    } catch (error) {
      next(error);
    }
  });
} 
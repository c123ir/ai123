import { Request, Response, NextFunction } from 'express';
import { NotificationService, CreateNotificationDTO, NotificationQueryParams } from '../services/notification/notification.service';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../middleware/error.middleware';
import { validate } from '../utils/validator';
import { logger } from '../utils/logger';

// ایجاد نمونه از سرویس اعلان
const notificationService = new NotificationService();

/**
 * کنترلر مدیریت اعلان‌ها
 * شامل توابع ایجاد، دریافت، علامت‌گذاری و حذف اعلان‌ها
 */
export class NotificationController {
  /**
   * دریافت اعلان‌های کاربر
   * @route GET /api/v1/notifications
   */
  public getUserNotifications = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی وجود کاربر در درخواست (از میدلویر احراز هویت)
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      // دریافت پارامترهای درخواست
      const queryParams: NotificationQueryParams = {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 10,
      };

      // اضافه کردن فیلترها به پارامترها
      if (req.query.is_read !== undefined) {
        queryParams.is_read = req.query.is_read === 'true';
      }

      if (req.query.type) {
        queryParams.type = req.query.type as string;
      }

      // بررسی مقادیر صفحه‌بندی
      const page = queryParams.page || 1;
      const limit = queryParams.limit || 10;
      
      if (page < 1 || limit < 1 || limit > 100) {
        return next(ApiError.badRequest('پارامترهای صفحه‌بندی نامعتبر هستند'));
      }

      // دریافت اعلان‌های کاربر
      const result = await notificationService.getUserNotifications(req.user.id, queryParams);

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * دریافت جزئیات یک اعلان
   * @route GET /api/v1/notifications/:id
   */
  public getNotificationById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی وجود کاربر در درخواست (از میدلویر احراز هویت)
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      const notificationId = req.params.id;

      // دریافت اعلان
      const notification = await notificationService.getNotificationById(notificationId, req.user.id);
      if (!notification) {
        return next(ApiError.notFound('اعلان یافت نشد'));
      }

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        data: { notification }
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * ایجاد اعلان جدید
   * @route POST /api/v1/notifications
   */
  public createNotification = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // اعتبارسنجی داده‌ها
      const { error, value } = validate<CreateNotificationDTO & { user_ids?: string[] }>(req.body, {
        user_id: { type: 'string', optional: true },
        user_ids: { type: 'array', optional: true },
        title: { type: 'string', min: 1, max: 255, required: true },
        message: { type: 'string', min: 1, required: true },
        type: { type: 'string', min: 1, max: 50, required: true },
        meta_data: { type: 'object', optional: true }
      });

      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }

      // بررسی وجود user_id یا user_ids
      if (!value.user_id && (!value.user_ids || value.user_ids.length === 0)) {
        return next(ApiError.badRequest('باید یک شناسه کاربر یا لیستی از شناسه‌های کاربران ارائه شود'));
      }

      let result;

      // ایجاد اعلان برای یک کاربر یا چندین کاربر
      if (value.user_ids && value.user_ids.length > 0) {
        // ایجاد اعلان برای چندین کاربر
        const { title, message, type, meta_data } = value;
        const count = await notificationService.createNotificationForUsers(
          value.user_ids,
          { title, message, type, meta_data }
        );

        result = { count };
      } else {
        // ایجاد اعلان برای یک کاربر
        const notification = await notificationService.createNotification({
          user_id: value.user_id as string,
          title: value.title,
          message: value.message,
          type: value.type,
          meta_data: value.meta_data
        });

        result = { notification };
      }

      // ارسال پاسخ
      res.status(201).json({
        status: 'success',
        message: 'اعلان با موفقیت ایجاد شد',
        data: result
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * علامت‌گذاری یک اعلان به عنوان خوانده شده
   * @route PATCH /api/v1/notifications/:id/mark-read
   */
  public markAsRead = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی وجود کاربر در درخواست (از میدلویر احراز هویت)
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      const notificationId = req.params.id;

      // علامت‌گذاری اعلان به عنوان خوانده شده
      const notification = await notificationService.markAsRead(notificationId, req.user.id);
      if (!notification) {
        return next(ApiError.notFound('اعلان یافت نشد'));
      }

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: 'اعلان به عنوان خوانده شده علامت‌گذاری شد',
        data: { notification }
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * علامت‌گذاری همه اعلان‌های کاربر به عنوان خوانده شده
   * @route PATCH /api/v1/notifications/mark-all-read
   */
  public markAllAsRead = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی وجود کاربر در درخواست (از میدلویر احراز هویت)
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      // علامت‌گذاری همه اعلان‌ها به عنوان خوانده شده
      const count = await notificationService.markAllAsRead(req.user.id);

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: `${count} اعلان به عنوان خوانده شده علامت‌گذاری شد`,
        data: { count }
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * حذف یک اعلان
   * @route DELETE /api/v1/notifications/:id
   */
  public deleteNotification = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی وجود کاربر در درخواست (از میدلویر احراز هویت)
      if (!req.user) {
        return next(ApiError.unauthorized('لطفاً وارد شوید'));
      }

      const notificationId = req.params.id;

      // حذف اعلان
      const success = await notificationService.deleteNotification(notificationId, req.user.id);
      if (!success) {
        return next(ApiError.notFound('اعلان یافت نشد'));
      }

      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: 'اعلان با موفقیت حذف شد'
      });
    } catch (error) {
      next(error);
    }
  });
} 
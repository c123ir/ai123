import { Request, Response, NextFunction } from 'express';
import { EmailService, EmailTemplate } from '../services/email/email.service';
import { ApiError } from '../utils/api-error';
import { asyncHandler } from '../middleware/error.middleware';
import { validate } from '../utils/validator';
import { logger } from '../utils/logger';

// ایجاد نمونه از سرویس ایمیل
const emailService = new EmailService();

// تایپ‌های مورد استفاده برای validator
interface CreateTemplateData {
  name: string;
  subject: string;
  html_content: string;
  text_content: string;
}

interface UpdateTemplateData {
  name?: string;
  subject?: string;
  html_content?: string;
  text_content?: string;
}

interface SendEmailData {
  template_name: string;
  to: string;
  variables: Record<string, string>;
  user_id?: string;
}

/**
 * کنترلر مدیریت ایمیل
 * شامل توابع دریافت، ایجاد، به‌روزرسانی و حذف قالب‌های ایمیل و ارسال ایمیل
 */
export class EmailController {
  /**
   * دریافت همه قالب‌های ایمیل
   * @route GET /api/v1/emails/templates
   */
  public getAllTemplates = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // دریافت همه قالب‌های ایمیل
      const templates = await emailService.getAllTemplates();
      
      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        data: { templates }
      });
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * دریافت قالب ایمیل با شناسه
   * @route GET /api/v1/emails/templates/:id
   */
  public getTemplateById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const templateId = parseInt(req.params.id);
      
      // بررسی معتبر بودن شناسه
      if (isNaN(templateId)) {
        return next(ApiError.badRequest('شناسه قالب نامعتبر است'));
      }
      
      // دریافت قالب ایمیل
      const template = await emailService.getTemplateById(templateId);
      if (!template) {
        return next(ApiError.notFound('قالب ایمیل یافت نشد'));
      }
      
      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        data: { template }
      });
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * ایجاد قالب ایمیل جدید
   * @route POST /api/v1/emails/templates
   */
  public createTemplate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // اعتبارسنجی داده‌ها
      const { error, value } = validate<CreateTemplateData>(req.body, {
        name: { type: 'string', min: 1, max: 255, required: true },
        subject: { type: 'string', min: 1, max: 255, required: true },
        html_content: { type: 'string', min: 1, required: true },
        text_content: { type: 'string', min: 1, required: true }
      });
      
      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }
      
      // ایجاد قالب جدید
      const template = await emailService.createTemplate(value);
      
      // ارسال پاسخ
      res.status(201).json({
        status: 'success',
        message: 'قالب ایمیل با موفقیت ایجاد شد',
        data: { template }
      });
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * به‌روزرسانی قالب ایمیل
   * @route PUT /api/v1/emails/templates/:id
   */
  public updateTemplate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const templateId = parseInt(req.params.id);
      
      // بررسی معتبر بودن شناسه
      if (isNaN(templateId)) {
        return next(ApiError.badRequest('شناسه قالب نامعتبر است'));
      }
      
      // اعتبارسنجی داده‌ها
      const { error, value } = validate<UpdateTemplateData>(req.body, {
        name: { type: 'string', min: 1, max: 255, optional: true },
        subject: { type: 'string', min: 1, max: 255, optional: true },
        html_content: { type: 'string', min: 1, optional: true },
        text_content: { type: 'string', min: 1, optional: true }
      });
      
      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }
      
      // به‌روزرسانی قالب
      const template = await emailService.updateTemplate(templateId, value);
      
      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: 'قالب ایمیل با موفقیت به‌روزرسانی شد',
        data: { template }
      });
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * حذف قالب ایمیل
   * @route DELETE /api/v1/emails/templates/:id
   */
  public deleteTemplate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const templateId = parseInt(req.params.id);
      
      // بررسی معتبر بودن شناسه
      if (isNaN(templateId)) {
        return next(ApiError.badRequest('شناسه قالب نامعتبر است'));
      }
      
      // حذف قالب
      const success = await emailService.deleteTemplate(templateId);
      
      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: 'قالب ایمیل با موفقیت حذف شد'
      });
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * ارسال ایمیل با استفاده از قالب
   * @route POST /api/v1/emails/send
   */
  public sendEmail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // اعتبارسنجی داده‌ها
      const { error, value } = validate<SendEmailData>(req.body, {
        template_name: { type: 'string', min: 1, max: 255, required: true },
        to: { type: 'string', min: 5, max: 255, required: true },
        variables: { type: 'object', required: true },
        user_id: { type: 'string', optional: true }
      });
      
      if (error) {
        return next(ApiError.validationError('خطا در اعتبارسنجی داده‌ها', error));
      }
      
      // ارسال ایمیل
      const result = await emailService.sendEmailWithTemplate(
        value.template_name,
        value.to,
        value.variables,
        value.user_id
      );
      
      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        message: 'ایمیل با موفقیت ارسال شد',
        data: { messageId: result.messageId }
      });
    } catch (error) {
      next(error);
    }
  });
  
  /**
   * دریافت تاریخچه ایمیل‌ها
   * @route GET /api/v1/emails/history
   */
  public getEmailHistory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // بررسی وجود کاربر ادمین در درخواست (از میدلویر احراز هویت)
      if (!req.user || req.user.role !== 'admin') {
        return next(ApiError.forbidden('شما دسترسی به این بخش را ندارید'));
      }
      
      // دریافت پارامترهای فیلتر
      const filters = {
        userId: req.query.user_id as string,
        email: req.query.email as string,
        status: req.query.status as string
      };
      
      // دریافت پارامترهای صفحه‌بندی
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      // بررسی مقادیر صفحه‌بندی
      if (page < 1 || limit < 1 || limit > 100) {
        return next(ApiError.badRequest('پارامترهای صفحه‌بندی نامعتبر هستند'));
      }
      
      // دریافت تاریخچه ایمیل
      const result = await emailService.getEmailHistory(filters, page, limit);
      
      // ارسال پاسخ
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  });
}
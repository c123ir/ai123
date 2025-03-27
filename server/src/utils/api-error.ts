// src/utils/api-error.ts - کلاس مدیریت خطاهای API

/**
 * کلاس برای مدیریت خطاهای API
 * این کلاس برای ایجاد خطاهای سفارشی با کد وضعیت HTTP استفاده می‌شود
 */
export class ApiError extends Error {
  statusCode: number;
  errors?: any[];
  
  /**
   * سازنده کلاس ApiError
   * @param statusCode کد وضعیت HTTP
   * @param message پیام خطا
   * @param errors آرایه‌ای از خطاهای اضافی (اختیاری)
   */
  constructor(statusCode: number, message: string, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    
    // تنظیم نام کلاس برای بررسی نوع خطا
    this.name = this.constructor.name;
    
    // در خطاهای جاوااسکریپت مدرن، Error.captureStackTrace را اضافه می‌کنیم
    // تا استک تریس صحیح را داشته باشیم
    if ('captureStackTrace' in Error) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  /**
   * ایجاد خطای 400 - Bad Request
   * برای درخواست‌های نامعتبر
   */
  static badRequest(message: string, errors?: any[]): ApiError {
    return new ApiError(400, message || 'درخواست نامعتبر', errors);
  }
  
  /**
   * ایجاد خطای 401 - Unauthorized
   * برای درخواست‌های بدون احراز هویت
   */
  static unauthorized(message?: string, errors?: any[]): ApiError {
    return new ApiError(401, message || 'احراز هویت الزامی است', errors);
  }
  
  /**
   * ایجاد خطای 403 - Forbidden
   * برای درخواست‌های با دسترسی غیرمجاز
   */
  static forbidden(message?: string, errors?: any[]): ApiError {
    return new ApiError(403, message || 'دسترسی به این منبع مجاز نیست', errors);
  }
  
  /**
   * ایجاد خطای 404 - Not Found
   * برای منابعی که یافت نشدند
   */
  static notFound(message?: string, errors?: any[]): ApiError {
    return new ApiError(404, message || 'منبع درخواستی یافت نشد', errors);
  }
  
  /**
   * ایجاد خطای 409 - Conflict
   * برای درخواست‌هایی که با وضعیت فعلی منبع در تناقض هستند
   */
  static conflict(message?: string, errors?: any[]): ApiError {
    return new ApiError(409, message || 'تناقض در درخواست', errors);
  }
  
  /**
   * ایجاد خطای 422 - Unprocessable Entity
   * برای خطاهای اعتبارسنجی و پردازش داده
   */
  static validationError(message?: string, errors?: any[]): ApiError {
    return new ApiError(422, message || 'داده ارسالی نامعتبر است', errors);
  }
  
  /**
   * ایجاد خطای 500 - Internal Server Error
   * برای خطاهای داخلی سرور
   */
  static internal(message?: string, errors?: any[]): ApiError {
    return new ApiError(500, message || 'خطای داخلی سرور', errors);
  }
  
  /**
   * ایجاد خطای 503 - Service Unavailable
   * برای زمانی که سرویس در دسترس نیست
   */
  static serviceUnavailable(message?: string, errors?: any[]): ApiError {
    return new ApiError(503, message || 'سرویس در دسترس نیست', errors);
  }
} 
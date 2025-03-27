// src/middleware/error.middleware.ts - میدلویر مدیریت خطاها

import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';
import { logger } from '../utils/logger';

/**
 * میدلویر مدیریت خطاهای برنامه
 * خطاها را گرفته و پاسخ مناسب را برمی‌گرداند
 */
export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // اگر خطا از نوع ApiError باشد
  if (err instanceof ApiError) {
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${err.statusCode}, Message:: ${err.message}`);
    
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || [],
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
    return;
  }

  // خطاهای ناشناخته
  logger.error(`[${req.method}] ${req.path} >> Unknown Error: ${err.message}`);
  logger.error(err.stack);
  
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'خطای داخلی سرور',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

/**
 * میدلویر مدیریت خطاهای ناهمگام
 * خطاهای درون توابع ناهمگام را به میدلویر خطای اصلی هدایت می‌کند
 */
export const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}; 
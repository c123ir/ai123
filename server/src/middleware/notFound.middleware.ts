// src/middleware/notFound.middleware.ts - میدلویر مدیریت مسیرهای یافت نشده

import { Request, Response, NextFunction } from 'express';

/**
 * میدلویر مدیریت مسیرهای یافت نشده
 * برای مسیرهایی که وجود ندارند پاسخ 404 برمی‌گرداند
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `مسیر ${req.originalUrl} یافت نشد`,
  });
}; 
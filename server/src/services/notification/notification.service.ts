import { v4 as uuidv4 } from 'uuid';
import { query } from '../../config/database';
import { ApiError } from '../../utils/api-error';
import { logger } from '../../utils/logger';

// تعریف انواع داده
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  meta_data?: any;
  created_at: Date;
  updated_at: Date;
}

export interface CreateNotificationDTO {
  user_id: string;
  title: string;
  message: string;
  type: string;
  meta_data?: any;
}

export interface NotificationQueryParams {
  page?: number;
  limit?: number;
  is_read?: boolean;
  type?: string;
}

export interface FilterOptions {
  userId?: string;
  type?: string;
  isRead?: boolean;
  fromDate?: Date;
  toDate?: Date;
}

export interface NotificationHistory {
  notifications: Notification[];
  pagination: {
    total: number;
    page: number;
    perPage: number;
    pageCount: number;
  };
}

/**
 * سرویس مدیریت اعلان‌ها
 * شامل توابع ایجاد، دریافت و مدیریت اعلان‌ها
 */
export class NotificationService {
  /**
   * ایجاد اعلان جدید
   * @param notificationDTO اطلاعات اعلان جدید
   * @returns اطلاعات اعلان ایجاد شده
   */
  public async createNotification(notificationDTO: CreateNotificationDTO): Promise<Notification> {
    try {
      // ایجاد شناسه یکتا
      const notificationId = uuidv4();

      // تبدیل متادیتا به JSON
      const metaData = notificationDTO.meta_data ? JSON.stringify(notificationDTO.meta_data) : null;

      // درج اعلان جدید در پایگاه داده
      const result = await query(
        `INSERT INTO notifications 
        (id, user_id, title, message, type, is_read, meta_data, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
        RETURNING *`,
        [
          notificationId,
          notificationDTO.user_id,
          notificationDTO.title,
          notificationDTO.message,
          notificationDTO.type,
          false, // پیش‌فرض: خوانده نشده
          metaData
        ]
      );

      // تبدیل متادیتا به شیء
      const notification = result.rows[0];
      if (notification.meta_data) {
        notification.meta_data = JSON.parse(notification.meta_data);
      }

      return notification;
    } catch (error) {
      logger.error('خطا در ایجاد اعلان:', error);
      throw ApiError.internal('خطای داخلی در فرآیند ایجاد اعلان');
    }
  }

  /**
   * ایجاد اعلان برای چندین کاربر
   * @param userIds آرایه‌ای از شناسه‌های کاربران
   * @param notification اطلاعات اعلان (بدون شناسه کاربر)
   * @returns تعداد اعلان‌های ایجاد شده
   */
  public async createNotificationForUsers(
    userIds: string[],
    notification: Omit<CreateNotificationDTO, 'user_id'>
  ): Promise<number> {
    try {
      // بررسی لیست کاربران
      if (!userIds.length) {
        return 0;
      }

      // تبدیل متادیتا به JSON
      const metaData = notification.meta_data ? JSON.stringify(notification.meta_data) : null;

      // آماده‌سازی مقادیر برای درج انبوه
      const values = userIds.map(userId => {
        const notificationId = uuidv4();
        return `('${notificationId}', '${userId}', '${notification.title}', '${notification.message}', '${notification.type}', false, ${metaData ? `'${metaData}'` : 'NULL'}, NOW(), NOW())`;
      }).join(',');

      // درج انبوه اعلان‌ها
      const result = await query(
        `INSERT INTO notifications 
        (id, user_id, title, message, type, is_read, meta_data, created_at, updated_at) 
        VALUES ${values}`
      );

      return userIds.length;
    } catch (error) {
      logger.error('خطا در ایجاد اعلان برای چندین کاربر:', error);
      throw ApiError.internal('خطای داخلی در فرآیند ایجاد اعلان برای چندین کاربر');
    }
  }

  /**
   * دریافت اعلان با شناسه
   * @param notificationId شناسه اعلان
   * @param userId شناسه کاربر (برای بررسی دسترسی)
   * @returns اطلاعات اعلان
   */
  public async getNotificationById(notificationId: string, userId: string): Promise<Notification | null> {
    try {
      const result = await query(
        'SELECT * FROM notifications WHERE id = $1 AND user_id = $2',
        [notificationId, userId]
      );

      if (!result.rows.length) {
        return null;
      }

      // تبدیل متادیتا به شیء
      const notification = result.rows[0];
      if (notification.meta_data) {
        notification.meta_data = JSON.parse(notification.meta_data);
      }

      return notification;
    } catch (error) {
      logger.error('خطا در دریافت اعلان:', error);
      throw ApiError.internal('خطای داخلی در فرآیند دریافت اعلان');
    }
  }

  /**
   * دریافت اعلان‌های کاربر
   * @param userId شناسه کاربر
   * @param params پارامترهای جستجو و صفحه‌بندی
   * @returns لیست اعلان‌ها و اطلاعات صفحه‌بندی
   */
  public async getUserNotifications(userId: string, params: NotificationQueryParams = {}): Promise<any> {
    try {
      // تنظیم مقادیر پیش‌فرض برای صفحه‌بندی
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (page - 1) * limit;

      // ساخت کوئری پویا بر اساس پارامترها
      let whereClause = 'WHERE user_id = $1';
      const queryParams: any[] = [userId];
      let paramIndex = 2;

      // اضافه کردن فیلترها به کوئری
      if (params.is_read !== undefined) {
        whereClause += ` AND is_read = $${paramIndex}`;
        queryParams.push(params.is_read);
        paramIndex++;
      }

      if (params.type) {
        whereClause += ` AND type = $${paramIndex}`;
        queryParams.push(params.type);
        paramIndex++;
      }

      // کوئری دریافت اعلان‌ها
      const notificationsQuery = await query(
        `SELECT * FROM notifications 
         ${whereClause} 
         ORDER BY created_at DESC 
         LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
        [...queryParams, limit, offset]
      );

      // تبدیل متادیتا به شیء
      const notifications = notificationsQuery.rows.map((notification: any) => {
        if (notification.meta_data) {
          notification.meta_data = JSON.parse(notification.meta_data);
        }
        return notification;
      });

      // کوئری دریافت تعداد کل اعلان‌ها برای صفحه‌بندی
      const countQuery = await query(
        `SELECT COUNT(*) FROM notifications ${whereClause}`,
        queryParams
      );
      const totalCount = parseInt(countQuery.rows[0].count);

      // کوئری برای دریافت تعداد اعلان‌های خوانده نشده
      const unreadCountQuery = await query(
        'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND is_read = false',
        [userId]
      );
      const unreadCount = parseInt(unreadCountQuery.rows[0].count);

      return {
        notifications,
        unread_count: unreadCount,
        pagination: {
          total: totalCount,
          page,
          limit,
          total_pages: Math.ceil(totalCount / limit),
        },
      };
    } catch (error) {
      logger.error('خطا در دریافت اعلان‌های کاربر:', error);
      throw ApiError.internal('خطای داخلی در فرآیند دریافت اعلان‌های کاربر');
    }
  }

  /**
   * دریافت تعداد اعلانات خوانده نشده کاربر
   * @param userId شناسه کاربر
   * @returns تعداد اعلانات خوانده نشده
   */
  public async getUnreadCount(userId: string): Promise<number> {
    try {
      logger.info(`دریافت تعداد اعلانات خوانده نشده برای کاربر ${userId}`);
      
      const result = await query(
        `SELECT COUNT(*) FROM notifications 
         WHERE user_id = $1 AND is_read = false`,
        [userId]
      );
      
      return parseInt(result.rows[0].count) || 0;
    } catch (error) {
      logger.error('خطا در دریافت تعداد اعلانات خوانده نشده:', error);
      throw ApiError.internal('خطای داخلی در دریافت تعداد اعلانات خوانده نشده');
    }
  }

  /**
   * علامت‌گذاری اعلانات به عنوان خوانده شده
   * @param notificationId شناسه اعلان
   * @param userId شناسه کاربر (برای بررسی دسترسی)
   * @returns اطلاعات بروزرسانی شده اعلان
   */
  public async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    try {
      logger.info(`علامت‌گذاری اعلان ${notificationId} به عنوان خوانده شده برای کاربر ${userId}`);
      
      const result = await query(
        `UPDATE notifications 
         SET is_read = true, read_at = NOW() 
         WHERE id = $1 AND user_id = $2`,
        [notificationId, userId]
      );
      
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      logger.error('خطا در علامت‌گذاری اعلان به عنوان خوانده شده:', error);
      throw ApiError.internal('خطای داخلی در علامت‌گذاری اعلان');
    }
  }

  /**
   * علامت‌گذاری همه اعلانات کاربر به عنوان خوانده شده
   * @param userId شناسه کاربر
   * @returns تعداد اعلان‌های بروزرسانی شده
   */
  public async markAllAsRead(userId: string): Promise<number> {
    try {
      logger.info(`علامت‌گذاری همه اعلانات کاربر ${userId} به عنوان خوانده شده`);
      
      const result = await query(
        'UPDATE notifications SET is_read = true, updated_at = NOW() WHERE user_id = $1 AND is_read = false',
        [userId]
      );

      return result.rowCount || 0;
    } catch (error) {
      logger.error('خطا در علامت‌گذاری همه اعلان‌ها به عنوان خوانده شده:', error);
      throw ApiError.internal('خطای داخلی در فرآیند علامت‌گذاری همه اعلان‌ها');
    }
  }

  /**
   * حذف اعلانات کاربر
   * @param userId شناسه کاربر
   * @param days تعداد روزهای مشخص شده برای حذف اعلانات قدیمی‌تر از آن تعداد روز
   * @returns تعداد اعلانات حذف شده
   */
  public async deleteForUser(userId: string, days?: number): Promise<number> {
    try {
      logger.info(`حذف اعلانات برای کاربر ${userId}`);
      
      let query_text = 'DELETE FROM notifications WHERE user_id = $1';
      const params = [userId];
      
      // اگر تعداد روزهای مشخص شده باشد، فقط اعلانات قدیمی‌تر از آن تعداد روز را حذف می‌کنیم
      if (days) {
        query_text += ' AND created_at < NOW() - INTERVAL \'$2 days\'';
        params.push(days.toString());
      }
      
      const result = await query(query_text, params);
      
      return result.rowCount || 0;
    } catch (error) {
      logger.error('خطا در حذف اعلانات:', error);
      throw ApiError.internal('خطای داخلی در حذف اعلانات');
    }
  }

  /**
   * حذف یک اعلان
   * @param notificationId شناسه اعلان
   * @param userId شناسه کاربر (برای بررسی دسترسی)
   * @returns حالت موفقیت
   */
  public async deleteNotification(notificationId: string, userId: string): Promise<boolean> {
    try {
      logger.info(`حذف اعلان ${notificationId} برای کاربر ${userId}`);
      
      const result = await query(
        'DELETE FROM notifications WHERE id = $1 AND user_id = $2',
        [notificationId, userId]
      );
      
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      logger.error('خطا در حذف اعلان:', error);
      throw ApiError.internal('خطای داخلی در حذف اعلان');
    }
  }

  /**
   * حذف همه اعلانات کاربر
   * @param userId شناسه کاربر
   * @returns تعداد اعلانات حذف شده
   */
  public async deleteAllForUser(userId: string): Promise<boolean> {
    try {
      logger.info(`حذف همه اعلانات برای کاربر ${userId}`);
      
      const result = await query(
        'DELETE FROM notifications WHERE user_id = $1',
        [userId]
      );
      
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      logger.error('خطا در حذف همه اعلانات کاربر:', error);
      throw ApiError.internal('خطای داخلی در حذف اعلانات');
    }
  }

  // بازیابی تاریخچه اعلان‌ها
  public async getHistory(filters: FilterOptions, page: number = 1, perPage: number = 10): Promise<NotificationHistory> {
    try {
      logger.info('بازیابی تاریخچه اعلان‌ها با فیلترها:', filters);

      // محاسبه offset برای صفحه‌بندی
      const offset = (page - 1) * perPage;

      // ساخت query با فیلترها
      let whereClause = '';
      const queryParams: any[] = [];
      let paramIndex = 1;

      if (filters.userId) {
        whereClause += whereClause ? ' AND ' : ' WHERE ';
        whereClause += `user_id = $${paramIndex++}`;
        queryParams.push(filters.userId);
      }

      if (filters.type) {
        whereClause += whereClause ? ' AND ' : ' WHERE ';
        whereClause += `type = $${paramIndex++}`;
        queryParams.push(filters.type);
      }

      if (filters.isRead !== undefined) {
        whereClause += whereClause ? ' AND ' : ' WHERE ';
        whereClause += `is_read = $${paramIndex++}`;
        queryParams.push(filters.isRead);
      }

      if (filters.fromDate) {
        whereClause += whereClause ? ' AND ' : ' WHERE ';
        whereClause += `created_at >= $${paramIndex++}`;
        queryParams.push(filters.fromDate);
      }

      if (filters.toDate) {
        whereClause += whereClause ? ' AND ' : ' WHERE ';
        whereClause += `created_at <= $${paramIndex++}`;
        queryParams.push(filters.toDate);
      }

      // دریافت تعداد کل رکوردها
      const countQuery = `SELECT COUNT(*) FROM notifications${whereClause}`;
      const countResult = await query(countQuery, queryParams);
      const totalCount = parseInt(countResult.rows[0].count) || 0;

      // دریافت اعلان‌ها با صفحه‌بندی
      const queryText = `
        SELECT * FROM notifications${whereClause}
        ORDER BY created_at DESC
        LIMIT $${paramIndex++} OFFSET $${paramIndex++}
      `;
      queryParams.push(perPage, offset);

      const result = await query(queryText, queryParams);

      // تبدیل متادیتا به شیء
      const notifications = result.rows.map((notification: any) => {
        if (notification.meta_data) {
          notification.meta_data = JSON.parse(notification.meta_data);
        }
        return notification;
      });

      return {
        notifications,
        pagination: {
          total: totalCount,
          page,
          perPage,
          pageCount: Math.ceil(totalCount / perPage)
        }
      };
    } catch (error) {
      logger.error('خطا در بازیابی تاریخچه اعلان‌ها:', error);
      throw ApiError.internal('خطای داخلی در بازیابی تاریخچه اعلان‌ها');
    }
  }
} 
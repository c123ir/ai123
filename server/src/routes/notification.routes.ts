import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

// ایجاد نمونه از کنترلر
const notificationController = new NotificationController();

// ایجاد روتر
const router = Router();

/**
 * @route GET /api/v1/notifications
 * @desc دریافت اعلان‌های کاربر
 * @access خصوصی
 */
router.get('/', authenticate, notificationController.getUserNotifications);

/**
 * @route GET /api/v1/notifications/:id
 * @desc دریافت جزئیات یک اعلان
 * @access خصوصی
 */
router.get('/:id', authenticate, notificationController.getNotificationById);

/**
 * @route POST /api/v1/notifications
 * @desc ارسال اعلان جدید
 * @access خصوصی (فقط ادمین)
 */
router.post('/', authenticate, authorize(['admin']), notificationController.createNotification);

/**
 * @route PATCH /api/v1/notifications/:id/mark-read
 * @desc علامت‌گذاری یک اعلان به عنوان خوانده شده
 * @access خصوصی
 */
router.patch('/:id/mark-read', authenticate, notificationController.markAsRead);

/**
 * @route PATCH /api/v1/notifications/mark-all-read
 * @desc علامت‌گذاری همه اعلان‌های کاربر به عنوان خوانده شده
 * @access خصوصی
 */
router.patch('/mark-all-read', authenticate, notificationController.markAllAsRead);

/**
 * @route DELETE /api/v1/notifications/:id
 * @desc حذف یک اعلان
 * @access خصوصی
 */
router.delete('/:id', authenticate, notificationController.deleteNotification);

export default router; 
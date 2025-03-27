// src/routes/user.routes.ts - تعریف مسیرهای مدیریت کاربران

import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

// ایجاد نمونه کنترلر
const userController = new UserController();

// ایجاد روتر
const router = Router();

/**
 * @route GET /api/v1/users
 * @desc دریافت لیست کاربران
 * @access خصوصی - فقط مدیر
 */
router.get('/', authenticate, authorize(['admin']), userController.getUsers);

/**
 * @route GET /api/v1/users/:id
 * @desc دریافت اطلاعات یک کاربر با شناسه
 * @access خصوصی - مدیر یا خود کاربر
 */
router.get('/:id', authenticate, userController.getUserById);

/**
 * @route PUT /api/v1/users/:id
 * @desc به‌روزرسانی اطلاعات کاربر
 * @access خصوصی - مدیر یا خود کاربر
 */
router.put('/:id', authenticate, userController.updateUser);

/**
 * @route DELETE /api/v1/users/:id
 * @desc حذف کاربر
 * @access خصوصی - فقط مدیر
 */
router.delete('/:id', authenticate, authorize(['admin']), userController.deleteUser);

export default router; 
import express from 'express';
import { EmailController } from '../controllers/email.controller';
import { authenticateJWT, authorizeAdmin } from '../middleware/auth.middleware';

const router = express.Router();
const emailController = new EmailController();

/**
 * روت‌های مدیریت ایمیل
 * @route /api/v1/emails
 */

// روت‌های قالب ایمیل (فقط ادمین)
router.get('/templates', authenticateJWT, authorizeAdmin, emailController.getAllTemplates);
router.get('/templates/:id', authenticateJWT, authorizeAdmin, emailController.getTemplateById);
router.post('/templates', authenticateJWT, authorizeAdmin, emailController.createTemplate);
router.put('/templates/:id', authenticateJWT, authorizeAdmin, emailController.updateTemplate);
router.delete('/templates/:id', authenticateJWT, authorizeAdmin, emailController.deleteTemplate);

// روت ارسال ایمیل (نیاز به احراز هویت)
router.post('/send', authenticateJWT, emailController.sendEmail);

// روت دریافت تاریخچه ایمیل (فقط ادمین)
router.get('/history', authenticateJWT, authorizeAdmin, emailController.getEmailHistory);

export default router;
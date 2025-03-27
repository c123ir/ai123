// src/config/email.ts - پیکربندی سرویس ایمیل
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
    // برای استفاده از API
    // api_key: process.env.EMAIL_API_KEY || ''
  },
  from: `"${process.env.EMAIL_FROM_NAME || 'سیستم اطلاع‌رسانی'}" <${process.env.EMAIL_FROM || 'noreply@example.com'}>`
};

let transporter: nodemailer.Transporter;

export const initEmailService = () => {
  try {
    transporter = nodemailer.createTransport(emailConfig);
    logger.info('سرویس ایمیل با موفقیت راه‌اندازی شد');
    return true;
  } catch (error) {
    logger.error('خطا در راه‌اندازی سرویس ایمیل:', error);
    throw error;
  }
};

export const sendEmail = async (to: string, subject: string, html: string, text: string) => {
  if (!transporter) {
    await initEmailService();
  }
  
  try {
    const info = await transporter.sendMail({
      from: emailConfig.from,
      to,
      subject,
      text,
      html
    });
    
    logger.info(`ایمیل با موفقیت ارسال شد: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('خطا در ارسال ایمیل:', error);
    throw error;
  }
};

export const verifyConnection = async () => {
  if (!transporter) {
    await initEmailService();
  }

  try {
    await transporter.verify();
    logger.info('اتصال به سرویس ایمیل با موفقیت برقرار شد');
    return true;
  } catch (error) {
    logger.error('خطا در برقراری اتصال با سرویس ایمیل:', error);
    return false;
  }
};

export default {
  initEmailService,
  sendEmail,
  verifyConnection
}; 
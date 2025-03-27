import { query } from '../../config/database';
import { ApiError } from '../../utils/api-error';
import { logger } from '../../utils/logger';
import emailConfig, { sendEmail } from '../../config/email';
import { v4 as uuidv4 } from 'uuid';

/**
 * انواع قالب‌های ایمیل
 */
export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  html_content: string;
  text_content: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * ساختار تاریخچه ایمیل
 */
export interface EmailHistory {
  id: number;
  user_id?: number;
  email: string;
  template_id?: number;
  subject: string;
  status: string;
  sent_at: Date;
  metadata?: any;
}

/**
 * پارامترهای ارسال ایمیل
 */
export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  userId?: string;
  templateId?: number;
  metadata?: any;
}

/**
 * سرویس مدیریت ایمیل
 */
export class EmailService {
  
  /**
   * دریافت قالب ایمیل با نام
   * @param templateName نام قالب
   * @returns اطلاعات قالب
   */
  public async getTemplateByName(templateName: string): Promise<EmailTemplate | null> {
    try {
      logger.info(`دریافت قالب ایمیل با نام ${templateName}`);
      
      const result = await query(
        'SELECT * FROM email_templates WHERE name = $1',
        [templateName]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      logger.error('خطا در دریافت قالب ایمیل:', error);
      throw ApiError.internal('خطای داخلی در دریافت قالب ایمیل');
    }
  }
  
  /**
   * دریافت قالب ایمیل با شناسه
   * @param templateId شناسه قالب
   * @returns اطلاعات قالب
   */
  public async getTemplateById(templateId: number): Promise<EmailTemplate | null> {
    try {
      logger.info(`دریافت قالب ایمیل با شناسه ${templateId}`);
      
      const result = await query(
        'SELECT * FROM email_templates WHERE id = $1',
        [templateId]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      logger.error('خطا در دریافت قالب ایمیل:', error);
      throw ApiError.internal('خطای داخلی در دریافت قالب ایمیل');
    }
  }
  
  /**
   * دریافت همه قالب‌های ایمیل
   * @returns لیست قالب‌های ایمیل
   */
  public async getAllTemplates(): Promise<EmailTemplate[]> {
    try {
      logger.info('دریافت همه قالب‌های ایمیل');
      
      const result = await query('SELECT * FROM email_templates ORDER BY name');
      
      return result.rows;
    } catch (error) {
      logger.error('خطا در دریافت قالب‌های ایمیل:', error);
      throw ApiError.internal('خطای داخلی در دریافت قالب‌های ایمیل');
    }
  }
  
  /**
   * جایگزینی متغیرهای قالب ایمیل با مقادیر واقعی
   * @param template متن قالب
   * @param variables متغیرهای جایگزینی
   * @returns متن نهایی با متغیرهای جایگزین شده
   */
  private replaceTemplateVariables(template: string, variables: Record<string, string>): string {
    let result = template;
    
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    }
    
    return result;
  }
  
  /**
   * ارسال ایمیل با استفاده از قالب
   * @param templateName نام قالب
   * @param to آدرس ایمیل گیرنده
   * @param variables متغیرهای قالب
   * @param userId شناسه کاربر (اختیاری)
   * @returns اطلاعات ارسال ایمیل
   */
  public async sendEmailWithTemplate(
    templateName: string,
    to: string,
    variables: Record<string, string>,
    userId?: string
  ): Promise<any> {
    try {
      // دریافت قالب ایمیل
      const template = await this.getTemplateByName(templateName);
      if (!template) {
        throw ApiError.notFound(`قالب ایمیل ${templateName} یافت نشد`);
      }
      
      // جایگزینی متغیرها در قالب
      const htmlContent = this.replaceTemplateVariables(template.html_content, variables);
      const textContent = this.replaceTemplateVariables(template.text_content, variables);
      const subject = this.replaceTemplateVariables(template.subject, variables);
      
      // ارسال ایمیل
      const emailInfo = await this.sendEmail({
        to,
        subject,
        html: htmlContent,
        text: textContent,
        userId,
        templateId: template.id,
        metadata: { variables }
      });
      
      return emailInfo;
    } catch (error) {
      logger.error('خطا در ارسال ایمیل با قالب:', error);
      throw error;
    }
  }
  
  /**
   * ارسال ایمیل
   * @param params پارامترهای ارسال ایمیل
   * @returns اطلاعات ارسال ایمیل
   */
  public async sendEmail(params: SendEmailParams): Promise<any> {
    try {
      logger.info(`ارسال ایمیل به ${params.to}`);
      
      // ارسال ایمیل با استفاده از تنظیمات
      const info = await sendEmail(
        params.to,
        params.subject,
        params.html,
        params.text
      );
      
      // ثبت در تاریخچه ایمیل
      await this.recordEmailHistory({
        user_id: params.userId ? parseInt(params.userId) : undefined,
        email: params.to,
        template_id: params.templateId,
        subject: params.subject,
        status: 'sent',
        metadata: params.metadata
      });
      
      return info;
    } catch (error) {
      logger.error('خطا در ارسال ایمیل:', error);
      
      // ثبت خطا در تاریخچه
      await this.recordEmailHistory({
        user_id: params.userId ? parseInt(params.userId) : undefined,
        email: params.to,
        template_id: params.templateId,
        subject: params.subject,
        status: 'failed',
        metadata: { ...params.metadata, error: (error as Error).message }
      });
      
      throw ApiError.internal('خطا در ارسال ایمیل');
    }
  }
  
  /**
   * ثبت در تاریخچه ایمیل
   * @param historyData اطلاعات تاریخچه
   */
  private async recordEmailHistory(historyData: Omit<EmailHistory, 'id' | 'sent_at'>): Promise<void> {
    try {
      const metadata = historyData.metadata ? JSON.stringify(historyData.metadata) : null;
      
      await query(
        `INSERT INTO email_history 
         (user_id, email, template_id, subject, status, sent_at, metadata) 
         VALUES ($1, $2, $3, $4, $5, NOW(), $6)`,
        [
          historyData.user_id,
          historyData.email,
          historyData.template_id,
          historyData.subject,
          historyData.status,
          metadata
        ]
      );
    } catch (error) {
      logger.error('خطا در ثبت تاریخچه ایمیل:', error);
      // عدم پرتاب خطا برای جلوگیری از اختلال در فرآیند ارسال ایمیل
    }
  }
  
  /**
   * دریافت تاریخچه ایمیل با فیلترینگ
   * @param filters فیلترهای جستجو
   * @param page شماره صفحه
   * @param limit تعداد آیتم در هر صفحه
   * @returns لیست تاریخچه ایمیل‌ها و اطلاعات صفحه‌بندی
   */
  public async getEmailHistory(
    filters: { userId?: string; email?: string; status?: string },
    page: number = 1,
    limit: number = 10
  ): Promise<any> {
    try {
      logger.info('دریافت تاریخچه ایمیل‌ها');
      
      // ساخت بخش WHERE برای کوئری
      const conditions: string[] = [];
      const queryParams: any[] = [];
      let paramIndex = 1;
      
      if (filters.userId) {
        conditions.push(`user_id = $${paramIndex}`);
        queryParams.push(filters.userId);
        paramIndex++;
      }
      
      if (filters.email) {
        conditions.push(`email ILIKE $${paramIndex}`);
        queryParams.push(`%${filters.email}%`);
        paramIndex++;
      }
      
      if (filters.status) {
        conditions.push(`status = $${paramIndex}`);
        queryParams.push(filters.status);
        paramIndex++;
      }
      
      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      
      // محاسبه مقادیر صفحه‌بندی
      const offset = (page - 1) * limit;
      
      // دریافت تعداد کل آیتم‌ها
      const countQuery = await query(
        `SELECT COUNT(*) FROM email_history ${whereClause}`,
        queryParams
      );
      
      const totalCount = parseInt(countQuery.rows[0].count);
      const totalPages = Math.ceil(totalCount / limit);
      
      // دریافت رکوردها
      const historyQuery = await query(
        `SELECT eh.*, et.name as template_name
         FROM email_history eh
         LEFT JOIN email_templates et ON eh.template_id = et.id
         ${whereClause}
         ORDER BY eh.sent_at DESC
         LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
        [...queryParams, limit, offset]
      );
      
      // تبدیل فیلد metadata به شیء
      const history = historyQuery.rows.map((item: any) => {
        if (item.metadata) {
          item.metadata = JSON.parse(item.metadata);
        }
        return item;
      });
      
      return {
        history,
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages
        }
      };
    } catch (error) {
      logger.error('خطا در دریافت تاریخچه ایمیل:', error);
      throw ApiError.internal('خطای داخلی در دریافت تاریخچه ایمیل');
    }
  }
  
  /**
   * ایجاد قالب ایمیل جدید
   * @param templateData اطلاعات قالب
   * @returns قالب ایمیل ایجاد شده
   */
  public async createTemplate(
    templateData: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>
  ): Promise<EmailTemplate> {
    try {
      logger.info('ایجاد قالب ایمیل جدید');
      
      // بررسی تکراری بودن نام قالب
      const existingTemplate = await this.getTemplateByName(templateData.name);
      if (existingTemplate) {
        throw ApiError.conflict(`قالب ایمیل با نام ${templateData.name} قبلاً وجود دارد`);
      }
      
      // درج قالب جدید
      const result = await query(
        `INSERT INTO email_templates 
         (name, subject, html_content, text_content, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, NOW(), NOW()) 
         RETURNING *`,
        [
          templateData.name,
          templateData.subject,
          templateData.html_content,
          templateData.text_content
        ]
      );
      
      return result.rows[0];
    } catch (error) {
      logger.error('خطا در ایجاد قالب ایمیل:', error);
      throw error;
    }
  }
  
  /**
   * به‌روزرسانی قالب ایمیل
   * @param templateId شناسه قالب
   * @param templateData اطلاعات به‌روزرسانی
   * @returns قالب ایمیل به‌روزرسانی شده
   */
  public async updateTemplate(
    templateId: number,
    templateData: Partial<Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<EmailTemplate> {
    try {
      logger.info(`به‌روزرسانی قالب ایمیل با شناسه ${templateId}`);
      
      // بررسی وجود قالب
      const existingTemplate = await this.getTemplateById(templateId);
      if (!existingTemplate) {
        throw ApiError.notFound('قالب ایمیل یافت نشد');
      }
      
      // بررسی تکراری بودن نام در صورت تغییر
      if (templateData.name && templateData.name !== existingTemplate.name) {
        const templateWithSameName = await this.getTemplateByName(templateData.name);
        if (templateWithSameName) {
          throw ApiError.conflict(`قالب ایمیل با نام ${templateData.name} قبلاً وجود دارد`);
        }
      }
      
      // ساخت بخش SET کوئری
      const updates: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;
      
      // اضافه کردن فیلدهای قابل به‌روزرسانی
      if (templateData.name !== undefined) {
        updates.push(`name = $${paramIndex}`);
        values.push(templateData.name);
        paramIndex++;
      }
      
      if (templateData.subject !== undefined) {
        updates.push(`subject = $${paramIndex}`);
        values.push(templateData.subject);
        paramIndex++;
      }
      
      if (templateData.html_content !== undefined) {
        updates.push(`html_content = $${paramIndex}`);
        values.push(templateData.html_content);
        paramIndex++;
      }
      
      if (templateData.text_content !== undefined) {
        updates.push(`text_content = $${paramIndex}`);
        values.push(templateData.text_content);
        paramIndex++;
      }
      
      // اگر هیچ فیلدی برای به‌روزرسانی وجود نداشته باشد
      if (updates.length === 0) {
        return existingTemplate;
      }
      
      // اضافه کردن فیلد updated_at
      updates.push(`updated_at = NOW()`);
      
      // اضافه کردن شناسه قالب به پارامترها
      values.push(templateId);
      
      // اجرای کوئری به‌روزرسانی
      const result = await query(
        `UPDATE email_templates 
         SET ${updates.join(', ')} 
         WHERE id = $${paramIndex} 
         RETURNING *`,
        values
      );
      
      return result.rows[0];
    } catch (error) {
      logger.error('خطا در به‌روزرسانی قالب ایمیل:', error);
      throw error;
    }
  }
  
  /**
   * حذف قالب ایمیل
   * @param templateId شناسه قالب
   * @returns وضعیت حذف
   */
  public async deleteTemplate(templateId: number): Promise<boolean> {
    try {
      logger.info(`حذف قالب ایمیل با شناسه ${templateId}`);
      
      // بررسی وجود قالب
      const existingTemplate = await this.getTemplateById(templateId);
      if (!existingTemplate) {
        throw ApiError.notFound('قالب ایمیل یافت نشد');
      }
      
      // حذف قالب
      const result = await query(
        'DELETE FROM email_templates WHERE id = $1',
        [templateId]
      );
      
      return result.rowCount ? result.rowCount > 0 : false;
    } catch (error) {
      logger.error('خطا در حذف قالب ایمیل:', error);
      throw error;
    }
  }
} 
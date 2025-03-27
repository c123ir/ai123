import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../../utils/api-error';
import { query } from '../../config/database';
import { logger } from '../../utils/logger';

/**
 * نوع داده کاربر
 */
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  phone_number?: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * نوع داده ثبت‌نام کاربر
 */
export interface UserRegisterDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
}

/**
 * نوع داده ورود کاربر
 */
export interface UserLoginDTO {
  email: string;
  password: string;
}

/**
 * نوع داده به‌روزرسانی کاربر
 */
export interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  status?: string;
}

/**
 * محتوای توکن
 */
export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * پاسخ توکن
 */
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

/**
 * سرویس مدیریت کاربران
 */
export class UserService {
  /**
   * ثبت‌نام کاربر جدید
   * @param userDTO اطلاعات کاربر
   * @returns کاربر ایجاد شده
   */
  public async register(userDTO: UserRegisterDTO): Promise<User> {
    try {
      logger.info('ثبت‌نام کاربر جدید', { email: userDTO.email });

      // بررسی وجود کاربر با همین ایمیل
      const existingUser = await this.getUserByEmail(userDTO.email);
      if (existingUser) {
        throw ApiError.conflict('کاربری با این ایمیل قبلاً ثبت‌نام کرده است');
      }

      // هش کردن رمز عبور
      const hashedPassword = await bcrypt.hash(userDTO.password, 10);

      // ایجاد شناسه منحصر به فرد
      const userId = uuidv4();

      // ذخیره کاربر در پایگاه داده
      const result = await query(
        `INSERT INTO users (id, first_name, last_name, email, password, role, phone_number, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
         RETURNING id, first_name, last_name, email, role, phone_number, status, created_at, updated_at`,
        [
          userId,
          userDTO.first_name,
          userDTO.last_name,
          userDTO.email.toLowerCase(),
          hashedPassword,
          'user', // نقش پیش‌فرض
          userDTO.phone_number || null,
          'active' // وضعیت پیش‌فرض
        ]
      );

      logger.info('کاربر جدید با موفقیت ثبت شد', { id: userId });
      
      return { ...result.rows[0], password: hashedPassword };
    } catch (error) {
      logger.error('خطا در ثبت‌نام کاربر', { error, email: userDTO.email });
      throw error;
    }
  }

  /**
   * ورود کاربر
   * @param loginDTO اطلاعات ورود
   * @returns توکن‌های دسترسی و تازه‌سازی
   */
  public async login(loginDTO: UserLoginDTO): Promise<TokenResponse> {
    try {
      logger.info('تلاش برای ورود کاربر', { email: loginDTO.email });

      // دریافت کاربر با ایمیل
      const user = await this.getUserByEmail(loginDTO.email);
      if (!user) {
        throw ApiError.unauthorized('ایمیل یا رمز عبور نادرست است');
      }

      // بررسی وضعیت کاربر
      if (user.status !== 'active') {
        throw ApiError.forbidden('حساب کاربری شما غیرفعال شده است. لطفاً با پشتیبانی تماس بگیرید');
      }

      // بررسی رمز عبور
      const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
      if (!isPasswordValid) {
        throw ApiError.unauthorized('ایمیل یا رمز عبور نادرست است');
      }

      // تولید توکن‌ها
      const { accessToken, refreshToken, expiresIn } = this.generateTokens(user);

      logger.info('کاربر با موفقیت وارد شد', { id: user.id });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
        token_type: 'Bearer'
      };
    } catch (error) {
      logger.error('خطا در ورود کاربر', { error, email: loginDTO.email });
      throw error;
    }
  }

  /**
   * تازه‌سازی توکن
   * @param refreshToken توکن تازه‌سازی
   * @returns توکن‌های جدید
   */
  public async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      logger.info('تلاش برای تازه‌سازی توکن');

      // بررسی اعتبار توکن تازه‌سازی
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || 'refresh_secret_change_in_production'
      ) as TokenPayload;

      // دریافت کاربر از پایگاه داده
      const user = await this.getUserById(decoded.id);
      if (!user) {
        throw ApiError.unauthorized('توکن تازه‌سازی نامعتبر است');
      }

      // بررسی وضعیت کاربر
      if (user.status !== 'active') {
        throw ApiError.forbidden('حساب کاربری شما غیرفعال شده است. لطفاً با پشتیبانی تماس بگیرید');
      }

      // تولید توکن‌های جدید
      const { accessToken, refreshToken: newRefreshToken, expiresIn } = this.generateTokens(user);

      logger.info('توکن با موفقیت تازه‌سازی شد', { id: user.id });

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
        token_type: 'Bearer'
      };
    } catch (error) {
      logger.error('خطا در تازه‌سازی توکن', { error });
      
      if (error instanceof jwt.TokenExpiredError) {
        throw ApiError.unauthorized('توکن تازه‌سازی منقضی شده است. لطفاً دوباره وارد شوید');
      }
      
      if (error instanceof jwt.JsonWebTokenError) {
        throw ApiError.unauthorized('توکن تازه‌سازی نامعتبر است');
      }
      
      throw error;
    }
  }

  /**
   * دریافت کاربر با شناسه
   * @param userId شناسه کاربر
   * @returns اطلاعات کاربر یا null
   */
  public async getUserById(userId: string): Promise<User | null> {
    try {
      const result = await query(
        'SELECT * FROM users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      logger.error('خطا در دریافت کاربر با شناسه', { error, userId });
      throw error;
    }
  }

  /**
   * دریافت کاربر با ایمیل
   * @param email ایمیل کاربر
   * @returns اطلاعات کاربر یا null
   */
  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await query(
        'SELECT * FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    } catch (error) {
      logger.error('خطا در دریافت کاربر با ایمیل', { error, email });
      throw error;
    }
  }

  /**
   * به‌روزرسانی اطلاعات کاربر
   * @param userId شناسه کاربر
   * @param updateData داده‌های به‌روزرسانی
   * @returns کاربر به‌روزرسانی شده
   */
  public async updateUser(userId: string, updateData: UpdateUserDTO): Promise<User> {
    try {
      logger.info('به‌روزرسانی اطلاعات کاربر', { userId });

      // بررسی وجود کاربر
      const existingUser = await this.getUserById(userId);
      if (!existingUser) {
        throw ApiError.notFound('کاربر یافت نشد');
      }

      // بررسی وجود ایمیل تکراری (اگر ایمیل تغییر کرده باشد)
      if (updateData.email && updateData.email !== existingUser.email) {
        const userWithSameEmail = await this.getUserByEmail(updateData.email);
        if (userWithSameEmail) {
          throw ApiError.conflict('کاربری با این ایمیل قبلاً ثبت‌نام کرده است');
        }
      }

      // ساخت بخش SET کوئری دینامیک
      const updates: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      // اضافه کردن فیلدهای موجود در updateData به کوئری
      for (const [key, value] of Object.entries(updateData)) {
        if (value !== undefined) {
          updates.push(`${key} = $${paramCount}`);
          values.push(key === 'email' ? value.toLowerCase() : value);
          paramCount++;
        }
      }

      // اضافه کردن زمان به‌روزرسانی
      updates.push(`updated_at = NOW()`);

      // اگر هیچ فیلدی برای به‌روزرسانی وجود نداشته باشد
      if (updates.length === 1) {
        // فقط زمان به‌روزرسانی تنظیم شده، پس داده‌ای برگردان
        return existingUser;
      }

      // اضافه کردن شناسه کاربر به آرایه مقادیر
      values.push(userId);

      // اجرای کوئری به‌روزرسانی
      const result = await query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} 
         RETURNING id, first_name, last_name, email, role, phone_number, status, created_at, updated_at`,
        values
      );

      logger.info('کاربر با موفقیت به‌روزرسانی شد', { userId });

      return { ...result.rows[0], password: existingUser.password };
    } catch (error) {
      logger.error('خطا در به‌روزرسانی کاربر', { error, userId });
      throw error;
    }
  }

  /**
   * تغییر رمز عبور کاربر
   * @param userId شناسه کاربر
   * @param currentPassword رمز عبور فعلی
   * @param newPassword رمز عبور جدید
   */
  public async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      logger.info('تلاش برای تغییر رمز عبور', { userId });

      // دریافت کاربر
      const user = await this.getUserById(userId);
      if (!user) {
        throw ApiError.notFound('کاربر یافت نشد');
      }

      // بررسی رمز عبور فعلی
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw ApiError.unauthorized('رمز عبور فعلی نادرست است');
      }

      // هش کردن رمز عبور جدید
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // به‌روزرسانی رمز عبور
      await query(
        'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
        [hashedPassword, userId]
      );

      logger.info('رمز عبور با موفقیت تغییر کرد', { userId });
    } catch (error) {
      logger.error('خطا در تغییر رمز عبور', { error, userId });
      throw error;
    }
  }

  /**
   * حذف کاربر
   * @param userId شناسه کاربر
   */
  public async deleteUser(userId: string): Promise<void> {
    try {
      logger.info('تلاش برای حذف کاربر', { userId });

      // بررسی وجود کاربر
      const existingUser = await this.getUserById(userId);
      if (!existingUser) {
        throw ApiError.notFound('کاربر یافت نشد');
      }

      // حذف کاربر
      await query(
        'DELETE FROM users WHERE id = $1',
        [userId]
      );

      logger.info('کاربر با موفقیت حذف شد', { userId });
    } catch (error) {
      logger.error('خطا در حذف کاربر', { error, userId });
      throw error;
    }
  }

  /**
   * دریافت لیست کاربران
   * @param page شماره صفحه
   * @param limit تعداد در هر صفحه
   * @returns لیست کاربران و اطلاعات صفحه‌بندی
   */
  public async getUsers(page: number = 1, limit: number = 10): Promise<any> {
    try {
      logger.info('دریافت لیست کاربران', { page, limit });

      // اطمینان از معتبر بودن مقادیر صفحه‌بندی
      page = Math.max(1, page);
      limit = Math.min(100, Math.max(1, limit));

      const offset = (page - 1) * limit;

      // دریافت تعداد کل کاربران
      const countResult = await query('SELECT COUNT(*) FROM users');
      const totalCount = parseInt(countResult.rows[0].count);

      // دریافت کاربران با صفحه‌بندی
      const result = await query(
        `SELECT id, first_name, last_name, email, role, phone_number, status, created_at, updated_at
         FROM users
         ORDER BY created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );

      // محاسبه تعداد کل صفحات
      const totalPages = Math.ceil(totalCount / limit);

      logger.info('لیست کاربران با موفقیت دریافت شد', { count: result.rows.length });

      return {
        users: result.rows,
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      };
    } catch (error) {
      logger.error('خطا در دریافت لیست کاربران', { error });
      throw error;
    }
  }

  /**
   * تولید توکن‌های دسترسی و بازیابی
   * @param user اطلاعات کاربر
   * @returns توکن‌های دسترسی و بازیابی و زمان انقضا
   */
  private generateTokens(user: User): { accessToken: string; refreshToken: string; expiresIn: number } {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessTokenExpiry = process.env.JWT_EXPIRES_IN || '24h';
    const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
    
    // محاسبه زمان انقضا بر حسب ثانیه
    const expiresIn = this.getExpiryInSeconds(accessTokenExpiry);

    // تولید توکن دسترسی
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'default_secret_change_in_production',
      { expiresIn: accessTokenExpiry } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'refresh_secret_change_in_production',
      { expiresIn: refreshTokenExpiry } as jwt.SignOptions
    );

    return { accessToken, refreshToken, expiresIn };
  }

  /**
   * تبدیل عبارت زمان انقضا به ثانیه
   * @param expiry عبارت زمان انقضا (مثلاً 1h یا 30m)
   * @returns زمان انقضا بر حسب ثانیه
   */
  private getExpiryInSeconds(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhdwy])$/);
    if (!match) return 24 * 60 * 60; // مقدار پیش‌فرض 24 ساعت

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 60 * 60;
      case 'd': return value * 24 * 60 * 60;
      case 'w': return value * 7 * 24 * 60 * 60;
      case 'y': return value * 365 * 24 * 60 * 60;
      default: return 24 * 60 * 60;
    }
  }
} 
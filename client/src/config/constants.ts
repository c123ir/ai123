// client/src/config/constants.ts - ثابت‌های پروژه

// آدرس پایه API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// تنظیمات و ثابت‌های مربوط به احراز هویت
export const AUTH_CONSTANTS = {
  // مدت زمان اعتبار کد تایید (به ثانیه)
  OTP_EXPIRATION_TIME: 120,
  
  // طول کد تایید
  OTP_LENGTH: 4,
  
  // حداکثر تلاش‌های مجاز برای ورود کد
  MAX_OTP_ATTEMPTS: 3,
};

// تنظیمات ظاهری و UI
export const UI_CONSTANTS = {
  // زمان نمایش پیام‌های اطلاع‌رسانی (به میلی‌ثانیه)
  TOAST_DURATION: 3000,
  
  // زمان انیمیشن‌ها (به میلی‌ثانیه)
  ANIMATION_DURATION: 300,
};

// ثابت‌های مرتبط با ذخیره‌سازی در مرورگر
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_INFO: 'user_info',
  THEME_PREFERENCE: 'theme_preference',
}; 
// src/utils/validation/authValidation.ts - توابع اعتبارسنجی فرم‌های احراز هویت

import * as Yup from 'yup';
import { convertPersianToEnglishNumbers } from '../../utils/numbers';

/**
 * الگوی معتبر ایمیل
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * الگوی معتبر شماره موبایل ایران
 */
const IRAN_MOBILE_REGEX = /^(0|98|\+98)?9[0-9]{9}$/;

/**
 * تابع اعتبارسنجی و تبدیل شماره موبایل
 * @param value شماره موبایل
 * @returns شماره موبایل تبدیل شده
 */
export const validateAndTransformMobile = (value: string): string => {
  if (!value) return '';
  
  // تبدیل اعداد فارسی به انگلیسی
  const convertedValue = convertPersianToEnglishNumbers(value);
  
  // حذف کاراکترهای اضافی
  return convertedValue.replace(/[^\d]/g, '');
};

/**
 * اعتبارسنجی شماره تلفن همراه با پشتیبانی از فرمت‌های مختلف
 * - پشتیبانی از اعداد فارسی و انگلیسی
 * - پشتیبانی از فرمت‌های مختلف شماره تلفن (۰۹... یا 09...)
 */
export const phoneNumberValidation = Yup.string()
  .required('شماره تلفن الزامی است')
  .test('phone-format', 'شماره تلفن معتبر نیست', (value) => {
    if (!value) return false;
    
    // تبدیل اعداد فارسی به انگلیسی
    const persianToEnglish = convertPersianToEnglishNumbers(value);
    
    // حذف فضاهای خالی احتمالی
    const trimmedValue = persianToEnglish.trim();
    
    // بررسی طول شماره تلفن
    if (trimmedValue.length !== 11) return false;
    
    // بررسی شروع با ۰۹ یا 09
    if (!trimmedValue.startsWith('09')) return false;
    
    // بررسی اینکه تمام کاراکترها عدد باشند
    return /^\d+$/.test(trimmedValue);
  });

/**
 * اعتبارسنجی رمز عبور
 */
export const passwordValidation = Yup.string()
  .required('رمز عبور الزامی است')
  .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد');

/**
 * اعتبارسنجی تکرار رمز عبور
 */
export const confirmPasswordValidation = Yup.string()
  .required('تأیید رمز عبور الزامی است')
  .oneOf([Yup.ref('password')], 'رمز عبور با تأیید آن مطابقت ندارد');

/**
 * اسکیمای اعتبارسنجی فرم ورود
 */
export const loginValidationSchema = Yup.object({
  phoneNumber: phoneNumberValidation,
  password: passwordValidation,
});

/**
 * اسکیمای اعتبارسنجی فرم ثبت‌نام (مرحله شماره تلفن)
 */
export const phoneValidationSchema = Yup.object({
  phoneNumber: phoneNumberValidation,
});

/**
 * اسکیمای اعتبارسنجی فرم ثبت‌نام (مرحله اطلاعات کاربری)
 */
export const userInfoValidationSchema = Yup.object({
  firstName: Yup.string().required('نام الزامی است'),
  lastName: Yup.string().required('نام خانوادگی الزامی است'),
  email: Yup.string().email('ایمیل معتبر نیست'),
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

/**
 * اسکیمای اعتبارسنجی فرم بازیابی رمز عبور (مرحله رمز جدید)
 */
export const passwordResetValidationSchema = Yup.object({
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

/**
 * اسکیمای اعتبارسنجی فرم ثبت‌نام
 */
export const registerValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'نام باید حداقل 2 کاراکتر باشد')
    .max(50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد')
    .required('نام الزامی است'),
  lastName: Yup.string()
    .min(2, 'نام خانوادگی باید حداقل 2 کاراکتر باشد')
    .max(50, 'نام خانوادگی نمی‌تواند بیشتر از 50 کاراکتر باشد')
    .required('نام خانوادگی الزامی است'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'ایمیل نامعتبر است')
    .required('ایمیل الزامی است'),
  phoneNumber: Yup.string()
    .transform(validateAndTransformMobile)
    .matches(IRAN_MOBILE_REGEX, 'شماره موبایل نامعتبر است')
    .required('شماره موبایل الزامی است'),
  password: Yup.string()
    .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
    .matches(/[a-z]/, 'رمز عبور باید شامل حداقل یک حرف کوچک باشد')
    .matches(/[A-Z]/, 'رمز عبور باید شامل حداقل یک حرف بزرگ باشد')
    .matches(/[0-9]/, 'رمز عبور باید شامل حداقل یک عدد باشد')
    .required('رمز عبور الزامی است'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'رمز عبور و تکرار آن باید یکسان باشند')
    .required('تکرار رمز عبور الزامی است'),
  terms: Yup.boolean()
    .oneOf([true], 'برای ثبت‌نام باید با قوانین و مقررات موافقت کنید')
    .required('موافقت با قوانین و مقررات الزامی است'),
});

/**
 * اسکیمای اعتبارسنجی فرم تغییر رمز عبور
 */
export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .required('رمز عبور فعلی الزامی است'),
  newPassword: Yup.string()
    .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
    .matches(/[a-z]/, 'رمز عبور باید شامل حداقل یک حرف کوچک باشد')
    .matches(/[A-Z]/, 'رمز عبور باید شامل حداقل یک حرف بزرگ باشد')
    .matches(/[0-9]/, 'رمز عبور باید شامل حداقل یک عدد باشد')
    .notOneOf([Yup.ref('currentPassword')], 'رمز عبور جدید نباید با رمز عبور فعلی یکسان باشد')
    .required('رمز عبور جدید الزامی است'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'رمز عبور جدید و تکرار آن باید یکسان باشند')
    .required('تکرار رمز عبور جدید الزامی است'),
}); 
// src/i18n.ts - تنظیمات چندزبانگی با پشتیبانی از فارسی

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ترجمه‌های فارسی
const faTranslations = {
  // عمومی
  app_title: 'دستیار هوشمند یک دو سه',
  loading: 'در حال بارگذاری...',
  error: 'خطا',
  success: 'عملیات موفقیت‌آمیز',
  cancel: 'انصراف',
  save: 'ذخیره',
  edit: 'ویرایش',
  delete: 'حذف',
  back: 'بازگشت',
  next: 'بعدی',
  search: 'جستجو',
  filter: 'فیلتر',
  
  // احراز هویت
  login: 'ورود',
  register: 'ثبت نام',
  logout: 'خروج',
  email: 'ایمیل',
  password: 'رمز عبور',
  confirm_password: 'تکرار رمز عبور',
  forgot_password: 'فراموشی رمز عبور',
  reset_password: 'بازنشانی رمز عبور',
  first_name: 'نام',
  last_name: 'نام خانوادگی',
  phone_number: 'شماره موبایل',
  remember_me: 'مرا به خاطر بسپار',
  already_have_account: 'قبلاً ثبت نام کرده‌اید؟',
  dont_have_account: 'حساب کاربری ندارید؟',
  agree_terms: 'با قوانین و مقررات موافقم',
  
  // داشبورد کاربر
  user_dashboard: 'داشبورد',
  profile: 'پروفایل',
  my_tokens: 'توکن‌های من',
  my_transactions: 'تراکنش‌های من',
  settings: 'تنظیمات',
  notifications: 'اعلان‌ها',
  welcome: 'خوش آمدید',
  token_balance: 'موجودی توکن',
  recent_transactions: 'تراکنش‌های اخیر',
  no_transactions: 'تراکنشی موجود نیست',
  transaction_date: 'تاریخ',
  transaction_amount: 'مبلغ',
  transaction_type: 'نوع تراکنش',
  transaction_status: 'وضعیت',
  view_all_transactions: 'مشاهده همه تراکنش‌ها',
  
  // داشبورد ادمین
  admin_dashboard: 'داشبورد مدیریت',
  user_management: 'مدیریت کاربران',
  token_management: 'مدیریت توکن‌ها',
  reports: 'گزارش‌ها',
  system_settings: 'تنظیمات سیستم',
  users_total: 'تعداد کل کاربران',
  tokens_issued: 'توکن‌های صادر شده',
  active_users: 'کاربران فعال',
  
  // توکن‌ها
  token_details: 'جزئیات توکن',
  token_value: 'ارزش',
  token_date: 'تاریخ صدور',
  token_expiry: 'تاریخ انقضا',
  token_status: 'وضعیت',
  issue_token: 'صدور توکن',
  transfer_token: 'انتقال توکن',
  receive_token: 'دریافت توکن',
  
  // پروفایل
  update_profile: 'به‌روزرسانی پروفایل',
  change_password: 'تغییر رمز عبور',
  current_password: 'رمز عبور فعلی',
  new_password: 'رمز عبور جدید',
  confirm_new_password: 'تکرار رمز عبور جدید',
  account_info: 'اطلاعات حساب کاربری',
  personal_info: 'اطلاعات شخصی',
  
  // تنظیمات
  theme: 'تم',
  light_mode: 'حالت روشن',
  dark_mode: 'حالت تاریک',
  language: 'زبان',
  notification_settings: 'تنظیمات اعلان‌ها',
  security: 'امنیت',
  privacy: 'حریم خصوصی',
  
  // خطاها
  error_404: 'صفحه مورد نظر یافت نشد',
  error_500: 'خطای داخلی سرور',
  go_home: 'بازگشت به صفحه اصلی',
  session_expired: 'نشست شما منقضی شده است، لطفاً دوباره وارد شوید',
};

// ترجمه‌های انگلیسی
const enTranslations = {
  // General
  app_title: 'Smart Assistant 123',
  loading: 'Loading...',
  error: 'Error',
  success: 'Success',
  cancel: 'Cancel',
  save: 'Save',
  edit: 'Edit',
  delete: 'Delete',
  back: 'Back',
  next: 'Next',
  search: 'Search',
  filter: 'Filter',
  
  // Authentication
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  email: 'Email',
  password: 'Password',
  confirm_password: 'Confirm Password',
  forgot_password: 'Forgot Password',
  reset_password: 'Reset Password',
  first_name: 'First Name',
  last_name: 'Last Name',
  phone_number: 'Phone Number',
  remember_me: 'Remember Me',
  already_have_account: 'Already have an account?',
  dont_have_account: 'Don\'t have an account?',
  agree_terms: 'I agree to the Terms and Conditions',
  
  // User Dashboard
  user_dashboard: 'Dashboard',
  profile: 'Profile',
  my_tokens: 'My Tokens',
  my_transactions: 'My Transactions',
  settings: 'Settings',
  notifications: 'Notifications',
  welcome: 'Welcome',
  token_balance: 'Token Balance',
  recent_transactions: 'Recent Transactions',
  no_transactions: 'No transactions available',
  transaction_date: 'Date',
  transaction_amount: 'Amount',
  transaction_type: 'Type',
  transaction_status: 'Status',
  view_all_transactions: 'View All Transactions',
  
  // Admin Dashboard
  admin_dashboard: 'Admin Dashboard',
  user_management: 'User Management',
  token_management: 'Token Management',
  reports: 'Reports',
  system_settings: 'System Settings',
  users_total: 'Total Users',
  tokens_issued: 'Tokens Issued',
  active_users: 'Active Users',
  
  // Tokens
  token_details: 'Token Details',
  token_value: 'Value',
  token_date: 'Issue Date',
  token_expiry: 'Expiry Date',
  token_status: 'Status',
  issue_token: 'Issue Token',
  transfer_token: 'Transfer Token',
  receive_token: 'Receive Token',
  
  // Profile
  update_profile: 'Update Profile',
  change_password: 'Change Password',
  current_password: 'Current Password',
  new_password: 'New Password',
  confirm_new_password: 'Confirm New Password',
  account_info: 'Account Information',
  personal_info: 'Personal Information',
  
  // Settings
  theme: 'Theme',
  light_mode: 'Light Mode',
  dark_mode: 'Dark Mode',
  language: 'Language',
  notification_settings: 'Notification Settings',
  security: 'Security',
  privacy: 'Privacy',
  
  // Errors
  error_404: 'Page Not Found',
  error_500: 'Internal Server Error',
  go_home: 'Go to Home Page',
  session_expired: 'Your session has expired, please login again',
};

// راه‌اندازی i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: faTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: 'fa',
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

// تابع دریافت تنظیمات جهت بر اساس زبان
export const getDirection = (language: string) => {
  return language === 'fa' ? 'rtl' : 'ltr';
};

export default i18n;

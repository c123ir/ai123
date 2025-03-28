import { AdvisorType, ExpertiseLevel, SessionStatus } from '../types';

/**
 * تبدیل نوع مشاور از انگلیسی به فارسی
 */
export const getAdvisorTypeText = (type: AdvisorType): string => {
  switch (type) {
    case AdvisorType.FINANCIAL:
      return 'مشاور مالی';
    case AdvisorType.INVESTMENT:
      return 'مشاور سرمایه‌گذاری';
    case AdvisorType.BUSINESS:
      return 'مشاور کسب و کار';
    case AdvisorType.PERSONAL:
      return 'مشاور شخصی';
    default:
      return 'نامشخص';
  }
};

/**
 * تبدیل سطح تخصص از انگلیسی به فارسی
 */
export const getExpertiseLevelText = (level: ExpertiseLevel): string => {
  switch (level) {
    case ExpertiseLevel.BEGINNER:
      return 'مبتدی';
    case ExpertiseLevel.INTERMEDIATE:
      return 'متوسط';
    case ExpertiseLevel.EXPERT:
      return 'متخصص';
    default:
      return 'نامشخص';
  }
};

/**
 * تبدیل وضعیت جلسه از انگلیسی به فارسی
 */
export const getSessionStatusText = (status: SessionStatus): string => {
  switch (status) {
    case SessionStatus.PENDING:
      return 'در انتظار تایید';
    case SessionStatus.CONFIRMED:
      return 'تایید شده';
    case SessionStatus.COMPLETED:
      return 'تکمیل شده';
    case SessionStatus.CANCELLED:
      return 'لغو شده';
    default:
      return 'نامشخص';
  }
};

/**
 * رنگ مناسب برای وضعیت جلسه
 */
export const getSessionStatusColor = (status: SessionStatus): string => {
  switch (status) {
    case SessionStatus.PENDING:
      return 'orange';
    case SessionStatus.CONFIRMED:
      return 'green';
    case SessionStatus.COMPLETED:
      return 'blue';
    case SessionStatus.CANCELLED:
      return 'red';
    default:
      return 'default';
  }
};

/**
 * فرمت تاریخ به صورت شمسی
 * (در نسخه واقعی باید از کتابخانه‌های تبدیل تاریخ میلادی به شمسی استفاده شود)
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
};

/**
 * فرمت زمان به صورت ساعت:دقیقه
 */
export const formatTime = (date: string | Date): string => {
  const d = new Date(date);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
};

/**
 * قالب‌بندی قیمت با جداکننده هزارگان
 */
export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * تبدیل مدت زمان به متن فارسی
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${minutes} دقیقه`;
  } else if (remainingMinutes === 0) {
    return `${hours} ساعت`;
  } else {
    return `${hours} ساعت و ${remainingMinutes} دقیقه`;
  }
}; 
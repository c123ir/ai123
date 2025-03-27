/**
 * تبدیل اعداد فارسی به انگلیسی
 * @param str رشته حاوی اعداد فارسی
 * @returns رشته با اعداد انگلیسی
 */
export const convertPersianToEnglish = (str: string): string => {
  return str.replace(/[\u06F0-\u06F9]/g, (c) => {
    return String(c.charCodeAt(0) - 1776);
  });
};

/**
 * تبدیل اعداد انگلیسی به فارسی
 * @param str رشته حاوی اعداد انگلیسی
 * @returns رشته با اعداد فارسی
 */
export const convertToPersianDigits = (str: string | number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  if (typeof str === 'number') {
    str = str.toString();
  }
  return str.replace(/[0-9]/g, (d) => persianDigits[+d]);
};

/**
 * فرمت کردن اعداد با جداکننده هزارتایی
 * @param num عدد یا رشته عددی
 * @returns رشته فرمت‌شده با جداکننده هزارتایی
 */
export const formatNumber = (num: number | string): string => {
  if (typeof num === 'number') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * فرمت کردن واحد پولی
 * @param amount مقدار عددی
 * @param currency واحد پولی (پیش‌فرض: تومان)
 * @param persianDigits آیا از اعداد فارسی استفاده شود
 * @returns رشته فرمت‌شده با واحد پولی
 */
export const formatCurrency = (
  amount: number | string, 
  currency: string = 'تومان',
  persianDigits: boolean = false
): string => {
  const formattedNumber = formatNumber(amount);
  const result = `${formattedNumber} ${currency}`;
  return persianDigits ? convertToPersianDigits(result) : result;
};

/**
 * تبدیل اعداد فارسی به انگلیسی در یک فرم
 * @param formValues مقادیر فرم
 * @returns مقادیر تبدیل‌شده
 */
export const convertFormDigits = (formValues: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  
  for (const key in formValues) {
    if (typeof formValues[key] === 'string') {
      result[key] = convertPersianToEnglish(formValues[key]);
    } else if (typeof formValues[key] === 'object' && formValues[key] !== null) {
      result[key] = convertFormDigits(formValues[key]);
    } else {
      result[key] = formValues[key];
    }
  }
  
  return result;
};

/**
 * ابزار تبدیل اعداد فارسی و انگلیسی
 */
const DigitConverter = {
  convertPersianToEnglish,
  convertToPersianDigits,
  formatNumber,
  formatCurrency,
  convertFormDigits
};

export default DigitConverter; 
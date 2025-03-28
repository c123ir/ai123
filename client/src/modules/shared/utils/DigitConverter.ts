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
 * تبدیل اعداد انگلیسی به فارسی
 * @param input - رشته با اعداد فارسی
 * @returns {string} - رشته با اعداد انگلیسی
 */
export const convertToEnglishDigits = (input: string): string => {
  return input
    .replace(/۰/g, '0')
    .replace(/۱/g, '1')
    .replace(/۲/g, '2')
    .replace(/۳/g, '3')
    .replace(/۴/g, '4')
    .replace(/۵/g, '5')
    .replace(/۶/g, '6')
    .replace(/۷/g, '7')
    .replace(/۸/g, '8')
    .replace(/۹/g, '9');
};

/**
 * تبدیل اعداد به ارقام با حروف فارسی
 * محدود به اعداد زیر ۱۰۰۰ در حال حاضر
 * @param number - عدد ورودی
 * @returns {string} - عدد به حروف
 */
export const numberToText = (number: number): string => {
  const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const hundreds = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  
  if (number === 0) return 'صفر';
  
  if (number < 10) {
    return units[number];
  } else if (number < 20) {
    return teens[number - 10];
  } else if (number < 100) {
    const unit = number % 10;
    const ten = Math.floor(number / 10);
    return unit ? `${tens[ten]} و ${units[unit]}` : tens[ten];
  } else if (number < 1000) {
    const hundred = Math.floor(number / 100);
    const remainder = number % 100;
    return remainder ? `${hundreds[hundred]} و ${numberToText(remainder)}` : hundreds[hundred];
  } 
  
  return 'عدد خارج از محدوده است';
};

/**
 * تبدیل اعداد به حروف انگلیسی (برای کاربران انگلیسی زبان)
 * محدود به اعداد زیر ۱۰۰۰ در حال حاضر
 * @param number - عدد ورودی
 * @returns {string} - عدد به حروف انگلیسی
 */
export const numberToEnglishText = (number: number): string => {
  const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  if (number === 0) return 'zero';
  
  if (number < 10) {
    return units[number];
  } else if (number < 20) {
    return teens[number - 10];
  } else if (number < 100) {
    const unit = number % 10;
    const ten = Math.floor(number / 10);
    return unit ? `${tens[ten]}-${units[unit]}` : tens[ten];
  } else if (number < 1000) {
    const hundred = Math.floor(number / 100);
    const remainder = number % 100;
    return remainder ? `${units[hundred]} hundred and ${numberToEnglishText(remainder)}` : `${units[hundred]} hundred`;
  }
  
  return 'number out of range';
};

// برای راحتی استفاده
export const numbersWithCommas = formatCurrency;

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
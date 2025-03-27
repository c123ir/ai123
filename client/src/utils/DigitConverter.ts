/**
 * تبدیل اعداد عربی/فارسی به انگلیسی
 * @param value مقدار رشته‌ای حاوی اعداد عربی/فارسی
 * @returns رشته حاوی اعداد انگلیسی
 */
export const convertToEnglishDigits = (value: string | number): string => {
  if (value === null || value === undefined) return '';
  
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = value.toString();
  
  for (let i = 0; i < 10; i++) {
    const persianRegExp = new RegExp(persianNumbers[i], 'g');
    const arabicRegExp = new RegExp(arabicNumbers[i], 'g');
    result = result
      .replace(persianRegExp, englishNumbers[i])
      .replace(arabicRegExp, englishNumbers[i]);
  }
  
  return result;
};

/**
 * تبدیل اعداد انگلیسی به فارسی
 * @param value مقدار رشته‌ای حاوی اعداد انگلیسی
 * @returns رشته حاوی اعداد فارسی
 */
export const convertToPersianDigits = (value: string | number): string => {
  if (value === null || value === undefined) return '';
  
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = value.toString();
  
  for (let i = 0; i < 10; i++) {
    const englishRegExp = new RegExp(englishNumbers[i], 'g');
    result = result.replace(englishRegExp, persianNumbers[i]);
  }
  
  return result;
};

/**
 * نام مستعار برای convertToPersianDigits برای سازگاری بیشتر
 */
export const toFarsiNumber = convertToPersianDigits;

/**
 * فرمت‌دهی اعداد با جداکننده هزارگان
 * @param value مقدار عددی
 * @param persianDigits آیا اعداد فارسی باشند
 * @returns رشته فرمت‌دهی شده با جداکننده هزارگان
 */
export const formatNumber = (value: string | number, persianDigits: boolean = true): string => {
  if (value === null || value === undefined) return '';
  
  // تبدیل به انگلیسی برای محاسبات
  const englishNumber = convertToEnglishDigits(value);
  
  // جداسازی بخش اعشاری
  const parts = englishNumber.toString().split('.');
  
  // فرمت‌دهی بخش صحیح با جداکننده هزارگان
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // اتصال مجدد بخش‌ها
  const formattedEnglish = parts.join('.');
  
  // تبدیل به فارسی در صورت نیاز
  return persianDigits ? convertToPersianDigits(formattedEnglish) : formattedEnglish;
};

/**
 * نام مستعار برای formatNumber برای سازگاری با کدهای قبلی
 * @param value مقدار عددی
 * @returns رشته فرمت‌دهی شده با جداکننده هزارگان
 */
export const numbersWithCommas = (value: number | string): string => {
  return formatNumber(value, false);
};

/**
 * تبدیل واحد پول به تومان/ریال با فرمت‌دهی
 * @param value مقدار عددی
 * @param asToman آیا به صورت تومان نمایش داده شود
 * @param persianDigits آیا اعداد فارسی باشند
 * @returns رشته فرمت‌دهی شده با واحد پول
 */
export const formatCurrency = (value: string | number, asToman: boolean = true, persianDigits: boolean = true): string => {
  if (value === null || value === undefined) return '';
  
  // تبدیل به انگلیسی برای محاسبات
  let amount = parseFloat(convertToEnglishDigits(value));
  
  // تبدیل ریال به تومان در صورت نیاز
  if (asToman) {
    amount = amount / 10;
  }
  
  // فرمت‌دهی عدد
  const formatted = formatNumber(amount, persianDigits);
  
  // افزودن واحد پول
  return persianDigits 
    ? `${formatted} ${asToman ? 'تومان' : 'ریال'}`
    : `${formatted} ${asToman ? 'Toman' : 'Rial'}`;
};

/**
 * حذف کاراکترهای جداکننده از رشته عددی
 * @param value رشته حاوی اعداد و جداکننده‌ها
 * @returns رشته عددی بدون جداکننده
 */
export const removeNumberSeparators = (value: string): string => {
  if (value === null || value === undefined) return '';
  
  // تبدیل به انگلیسی و حذف کاما
  return convertToEnglishDigits(value).replace(/,/g, '');
};

export default {
  convertToEnglishDigits,
  convertToPersianDigits,
  toFarsiNumber,
  formatNumber,
  formatCurrency,
  removeNumberSeparators,
  numbersWithCommas,
}; 
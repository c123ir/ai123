// src/utils/validator.ts - کلاس اعتبارسنجی داده‌ها

/**
 * انواع داده برای اعتبارسنجی
 */
type ValidationType = 'string' | 'number' | 'boolean' | 'email' | 'date' | 'array' | 'object';

/**
 * قوانین اعتبارسنجی
 */
interface ValidationRule {
  type: ValidationType;
  required?: boolean;
  optional?: boolean;
  min?: number; // حداقل طول برای رشته‌ها یا حداقل مقدار برای اعداد
  max?: number; // حداکثر طول برای رشته‌ها یا حداکثر مقدار برای اعداد
  enum?: any[]; // مقادیر مجاز
  pattern?: RegExp; // الگوی مطابقت
  custom?: (value: any) => boolean | string; // تابع اعتبارسنجی سفارشی
}

/**
 * قوانین اعتبارسنجی برای هر فیلد
 */
interface ValidationSchema {
  [key: string]: ValidationRule;
}

/**
 * نتیجه اعتبارسنجی
 */
interface ValidationResult<T> {
  error: any[] | null;
  value: T;
}

/**
 * اعتبارسنجی داده‌ها بر اساس طرح اعتبارسنجی
 * @param data داده‌ها برای اعتبارسنجی
 * @param schema طرح اعتبارسنجی
 * @returns نتیجه اعتبارسنجی
 */
export function validate<T>(data: any, schema: ValidationSchema): ValidationResult<T> {
  const errors: any[] = [];
  const validatedData: any = {};

  // بررسی وجود داده
  if (!data && Object.values(schema).some(rule => rule.required)) {
    errors.push({ message: 'داده ورودی الزامی است' });
    return { error: errors, value: {} as T };
  }

  // بررسی هر فیلد بر اساس قوانین آن
  for (const [field, rule] of Object.entries(schema)) {
    const value = data[field];

    // بررسی فیلدهای الزامی
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push({ field, message: `فیلد ${field} الزامی است` });
      continue;
    }

    // اگر فیلد اختیاری است و مقداری ندارد، ادامه می‌دهیم
    if ((rule.optional || !rule.required) && (value === undefined || value === null)) {
      continue;
    }

    // اعتبارسنجی بر اساس نوع
    switch (rule.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push({ field, message: `فیلد ${field} باید از نوع رشته باشد` });
        } else {
          // بررسی حداقل طول
          if (rule.min !== undefined && value.length < rule.min) {
            errors.push({ field, message: `فیلد ${field} باید حداقل ${rule.min} کاراکتر باشد` });
          }
          // بررسی حداکثر طول
          if (rule.max !== undefined && value.length > rule.max) {
            errors.push({ field, message: `فیلد ${field} نباید بیشتر از ${rule.max} کاراکتر باشد` });
          }
          // بررسی الگو
          if (rule.pattern && !rule.pattern.test(value)) {
            errors.push({ field, message: `فیلد ${field} با الگوی مورد نظر مطابقت ندارد` });
          }
          // بررسی مقادیر مجاز
          if (rule.enum && !rule.enum.includes(value)) {
            errors.push({ 
              field, 
              message: `فیلد ${field} باید یکی از مقادیر ${rule.enum.join(', ')} باشد` 
            });
          }
        }
        break;

      case 'number':
        if (typeof value !== 'number' || isNaN(value)) {
          errors.push({ field, message: `فیلد ${field} باید از نوع عدد باشد` });
        } else {
          // بررسی حداقل مقدار
          if (rule.min !== undefined && value < rule.min) {
            errors.push({ field, message: `فیلد ${field} باید حداقل ${rule.min} باشد` });
          }
          // بررسی حداکثر مقدار
          if (rule.max !== undefined && value > rule.max) {
            errors.push({ field, message: `فیلد ${field} نباید بیشتر از ${rule.max} باشد` });
          }
          // بررسی مقادیر مجاز
          if (rule.enum && !rule.enum.includes(value)) {
            errors.push({ 
              field, 
              message: `فیلد ${field} باید یکی از مقادیر ${rule.enum.join(', ')} باشد` 
            });
          }
        }
        break;

      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push({ field, message: `فیلد ${field} باید از نوع بولی باشد` });
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value !== 'string' || !emailRegex.test(value)) {
          errors.push({ field, message: `فیلد ${field} باید یک آدرس ایمیل معتبر باشد` });
        }
        break;

      case 'date':
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          errors.push({ field, message: `فیلد ${field} باید یک تاریخ معتبر باشد` });
        }
        break;

      case 'array':
        if (!Array.isArray(value)) {
          errors.push({ field, message: `فیلد ${field} باید یک آرایه باشد` });
        } else {
          // بررسی حداقل تعداد عناصر
          if (rule.min !== undefined && value.length < rule.min) {
            errors.push({ field, message: `فیلد ${field} باید حداقل ${rule.min} عنصر داشته باشد` });
          }
          // بررسی حداکثر تعداد عناصر
          if (rule.max !== undefined && value.length > rule.max) {
            errors.push({ field, message: `فیلد ${field} نباید بیشتر از ${rule.max} عنصر داشته باشد` });
          }
        }
        break;

      case 'object':
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
          errors.push({ field, message: `فیلد ${field} باید یک شیء باشد` });
        }
        break;
    }

    // اعتبارسنجی سفارشی
    if (rule.custom && value !== undefined && value !== null) {
      const customResult = rule.custom(value);
      if (customResult !== true && typeof customResult === 'string') {
        errors.push({ field, message: customResult });
      } else if (customResult !== true) {
        errors.push({ field, message: `فیلد ${field} اعتبارسنجی سفارشی را رد کرد` });
      }
    }

    // اضافه کردن به داده‌های اعتبارسنجی شده
    if (value !== undefined) {
      validatedData[field] = value;
    }
  }

  return {
    error: errors.length > 0 ? errors : null,
    value: validatedData as T,
  };
} 
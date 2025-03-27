// src/components/common/NumberInput.tsx - کامپوننت ورودی عددی

import React, { useState, useEffect } from 'react';
import { Input, InputProps } from 'antd';
import { convertPersianToEnglish as convertPersianToEnglishNumbers } from './DigitConverter';

interface NumberInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  maxLength?: number;
  value?: string;
}

/**
 * کامپوننت ورود اعداد با قابلیت‌های:
 * - تبدیل اعداد فارسی به انگلیسی
 * - محدود کردن ورودی به اعداد
 * - اعمال حداکثر طول
 */
const NumberInput: React.FC<NumberInputProps> = (props) => {
  const {
    onChange,
    onComplete,
    maxLength,
    value = '',
    ...otherProps
  } = props;
  
  const [inputValue, setInputValue] = useState<string>(value?.toString() || '');

  // به‌روزرسانی مقدار اولیه اگر از بیرون تغییر کند
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value.toString());
    }
  }, [value]);

  // مدیریت تغییر ورودی
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ۱. تبدیل اعداد فارسی به انگلیسی
    const persianValue = e.target.value;
    let englishValue = convertPersianToEnglishNumbers(persianValue);
    
    // ۲. حذف کاراکترهای غیر عددی
    englishValue = englishValue.replace(/[^0-9]/g, '');
    
    // ۳. اعمال محدودیت طول
    if (maxLength && englishValue.length > maxLength) {
      englishValue = englishValue.substring(0, maxLength);
    }
    
    // ۴. به‌روزرسانی مقدار داخلی
    setInputValue(englishValue);
    
    // ۵. فراخوانی onChange خارجی
    if (onChange) {
      onChange(englishValue);
    }
    
    // ۶. فراخوانی onComplete اگر به حداکثر طول رسیده باشد
    if (maxLength && englishValue.length === maxLength && onComplete) {
      onComplete(englishValue);
    }
  };

  // فقط اجازه دادن ورود اعداد با keydown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // اجازه کلیدهای کنترلی (Backspace, Delete, Arrow keys, etc.)
    const isControlKey = (
      e.key === 'Backspace' || 
      e.key === 'Delete' || 
      e.key === 'ArrowLeft' || 
      e.key === 'ArrowRight' || 
      e.key === 'Tab' ||
      e.key === 'Enter' ||
      e.ctrlKey || 
      e.metaKey
    );
    
    // اجازه اعداد (هم انگلیسی هم فارسی)
    const isNumber = /^[0-9۰-۹]$/.test(e.key);
    
    // جلوگیری از ورود کاراکترهای غیرمجاز
    if (!isNumber && !isControlKey) {
      e.preventDefault();
    }
  };

  return (
    <Input
      type="tel"
      inputMode="numeric"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      pattern="[0-9]*"
      maxLength={maxLength}
      {...otherProps}
    />
  );
};

export default NumberInput; 
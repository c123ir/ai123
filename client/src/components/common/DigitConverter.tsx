// src/components/common/DigitConverter.tsx - کامپوننت تبدیل اعداد فارسی به انگلیسی

import React, { forwardRef } from 'react';
import { Input, InputProps } from 'antd';

/**
 * تبدیل اعداد فارسی به انگلیسی
 */
export const convertPersianToEnglish = (str: string): string => {
  if (!str) return '';
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  for (let i = 0; i < persianNumbers.length; i++) {
    const regex = new RegExp(persianNumbers[i], 'g');
    str = str.replace(regex, englishNumbers[i]);
  }
  
  return str;
};

/**
 * پراپس‌های کامپوننت تبدیل اعداد
 */
interface DigitConverterProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * کامپوننت تبدیل اعداد فارسی به انگلیسی
 * برای استفاده با Input از Ant Design
 */
const DigitConverter: React.FC<DigitConverterProps> = (props) => {
  const { onChange, ...otherProps } = props;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = e.target.value;
    const convertedValue = convertPersianToEnglish(originalValue);
    
    // فراخوانی onChange اصلی با مقدار تبدیل شده
    if (onChange) {
      onChange(convertedValue, e);
    }
  };

  return (
    <Input 
      {...otherProps} 
      onChange={handleChange} 
    />
  );
};

export default DigitConverter; 
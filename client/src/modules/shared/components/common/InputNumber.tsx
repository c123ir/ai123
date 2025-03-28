import React from 'react';
import { InputNumber as AntInputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';

/**
 * کامپوننت InputNumber بر اساس Ant Design
 * با قابلیت پشتیبانی از اعداد فارسی
 */
const InputNumber: React.FC<InputNumberProps> = (props) => {
  // تبدیل اعداد لاتین به فارسی
  const convertToPersianDigits = (value: string) => {
    if (!value) return value;
    
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return value.replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
  };

  // ایجاد اعداد با فرمت فارسی
  const formatPersian = (value: number | string | undefined) => {
    if (value === undefined || value === null) return '';
    
    // ابتدا فرمت استاندارد اعداد (اضافه کردن کاما)
    const formattedValue = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // سپس تبدیل به فارسی
    const persianValue = convertToPersianDigits(formattedValue);
    
    // اضافه کردن پسوند در صورت نیاز (مثلا تومان یا ریال)
    if (props.formatter) {
      return props.formatter(value);
    }
    
    return persianValue;
  };

  return (
    <AntInputNumber
      {...props}
      formatter={
        props.formatter ? 
          props.formatter : 
          (value) => formatPersian(value)
      }
    />
  );
};

export default InputNumber; 
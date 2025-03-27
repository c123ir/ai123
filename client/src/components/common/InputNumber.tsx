import React from 'react';
import { InputNumber as AntInputNumber, InputNumberProps as AntInputNumberProps } from 'antd';
import styled from '@emotion/styled';
import { convertToPersianDigits } from '../../utils/DigitConverter';

// تایپ مقدار برگشتی parser در Ant Design
export type ValueType = string | number;

// تابع تبدیل اعداد فارسی به انگلیسی
const convertPersianToEnglish = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[۰-۹]/g, function(d) {
    return persianDigits.indexOf(d).toString();
  });
};

export interface InputNumberProps extends Omit<AntInputNumberProps<ValueType>, 'onChange'> {
  onChange?: (value: number | null) => void;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'borderless';
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  thousandSeparator?: boolean;
  convertToPersianDigits?: boolean;
}

// استفاده از تعریف جدید برای StyledInputNumber که از fullWidth به عنوان یک prop استفاده نمی‌کند
const StyledInputNumber = styled(AntInputNumber)`
  ${props => props.className?.includes('full-width') && 'width: 100%;'}
  
  &.ant-input-number-status-error {
    border-color: #ff4d4f;
  }
`;

/**
 * کامپوننت InputNumber با پشتیبانی از اعداد فارسی و فرمت‌های ایرانی
 * 
 * نمونه استفاده:
 * ```jsx
 * <InputNumber
 *   label="مبلغ"
 *   value={amount}
 *   onChange={setAmount}
 *   min={1000}
 *   max={1000000}
 *   step={1000}
 *   formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان'}
 *   parser={(value) => {
 *     const parsed = value?.replace(/\$\s?|(,*)/g, '').replace(' تومان', '') || '';
 *     return parsed === '' ? null : Number(parsed);
 *   }}
 *   fullWidth
 * />
 * ```
 */
const InputNumber: React.FC<InputNumberProps> = ({
  onChange,
  value,
  fullWidth = false,
  variant,
  label,
  helperText,
  error,
  min,
  max,
  step,
  formatter,
  parser,
  disabled,
  size,
  startAdornment,
  endAdornment,
  status,
  addonBefore,
  addonAfter,
  convertToPersianDigits = false,
  thousandSeparator = false,
  ...rest
}) => {
  // برگرداندن مقدار با همان نوع
  const handleChange = (value: ValueType | null) => {
    if (onChange) {
      if (value === null) {
        onChange(null);
      } else if (typeof value === 'number') {
        onChange(value);
      } else if (typeof value === 'string' && value.trim() !== '') {
        onChange(Number(value));
      } else {
        onChange(null);
      }
    }
  };

  // پارسر بهبودیافته برای تطبیق با تایپ ValueType
  const enhancedParser = (displayValue: string | undefined): number => {
    // تبدیل اعداد فارسی به انگلیسی
    let processedValue = displayValue || '';
    if (convertToPersianDigits) {
      processedValue = convertPersianToEnglish(processedValue);
    }
    
    // پردازش با پارسر کاستوم اگر ارائه شده باشد
    if (parser) {
      const result = parser(processedValue);
      // اطمینان از بازگرداندن نوع صحیح
      if (result === undefined || result === null) {
        return 0;
      }
      if (typeof result === 'number') {
        return result;
      }
      return Number(result);
    }
    
    // پردازش پیش‌فرض
    if (thousandSeparator) {
      processedValue = processedValue.replace(/,/g, '');
    }
    
    return processedValue === '' ? 0 : Number(processedValue);
  };

  // فرمتر بهبودیافته
  const enhancedFormatter = (value: ValueType | undefined, info: { userTyping: boolean; input: string }): string => {
    if (value === undefined || value === null || value === '') {
      return '';
    }
    
    let formattedValue = '';
    if (formatter) {
      // اطمینان از انتقال info به formatter اصلی اگر موجود باشد
      formattedValue = formatter(value, info);
    } else {
      formattedValue = `${value}`;
      
      // اعمال جداکننده هزارتایی
      if (thousandSeparator) {
        formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
    
    return formattedValue;
  };

  // تنظیم addons با adornments
  const finalAddonBefore = addonBefore || startAdornment;
  const finalAddonAfter = addonAfter || endAdornment;

  // ایجاد کلاس‌های استایل بر اساس props
  const classNames = [
    fullWidth ? 'full-width' : '',
    rest.className || ''
  ].filter(Boolean).join(' ');

  // استفاده از استایل به جای prop $fullWidth
  const style = {
    ...(fullWidth ? { width: '100%' } : {}),
    ...(rest.style || {})
  };

  return (
    <StyledInputNumber
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      size={size}
      status={error ? 'error' : status}
      formatter={enhancedFormatter}
      parser={enhancedParser}
      addonBefore={finalAddonBefore}
      addonAfter={finalAddonAfter}
      className={classNames}
      style={style}
      {...rest}
    />
  );
};

export default InputNumber; 
import React, { ReactNode } from 'react';
import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
import styled from '@emotion/styled';
import locale from 'antd/es/date-picker/locale/fa_IR';
import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday';
import type { RangePickerProps as AntRangePickerProps } from 'antd/es/date-picker';

// افزودن پشتیبانی از تقویم جلالی به dayjs
dayjs.extend(jalaliday);

const { RangePicker: AntRangePicker } = AntDatePicker;

// تعریف مجدد خصوصیت variant برای جلوگیری از تداخل با تایپ variant از Ant Design
type MaterialVariant = 'outlined' | 'filled' | 'standard';

// تعریف صحیح اینترفیس DatePickerProps
export interface DatePickerProps extends Omit<AntDatePickerProps, 'onChange' | 'value' | 'variant' | 'minDate' | 'maxDate'> {
  onChange?: (date: Date | null, dateString: string) => void;
  value?: Date | null;
  label?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
  fullWidth?: boolean;
  variant?: MaterialVariant;
  inputVariant?: MaterialVariant;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  jalali?: boolean;
  minDate?: Date;
  maxDate?: Date;
  autoOk?: boolean;
  clearable?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  size?: 'large' | 'middle' | 'small';
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  popupClassName?: string;
  bordered?: boolean;
  status?: 'error' | 'warning';
}

// تعریف صحیح اینترفیس RangePickerProps، مستقل از DatePickerProps
export interface RangePickerProps extends Omit<AntRangePickerProps, 'onChange' | 'value' | 'variant' | 'minDate' | 'maxDate' | 'placeholder' | 'ranges'> {
  onChange?: (dates: [Date | null, Date | null] | null, dateStrings: [string, string] | null) => void;
  value?: [Date | null, Date | null] | null;
  label?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
  fullWidth?: boolean;
  variant?: MaterialVariant;
  inputVariant?: MaterialVariant;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  format?: string;
  jalali?: boolean;
  minDate?: Date;
  maxDate?: Date;
  autoOk?: boolean;
  clearable?: boolean;
  placeholder?: [string, string];
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  size?: 'large' | 'middle' | 'small';
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  popupClassName?: string;
  bordered?: boolean;
  status?: 'error' | 'warning';
  separator?: string;
  ranges?: Record<string, [Date, Date] | (() => [Date, Date])>;
}

interface StyledDatePickerWrapperProps {
  $fullWidth?: boolean;
  $variant?: string;
  $error?: boolean;
}

const StyledDatePickerWrapper = styled.div<StyledDatePickerWrapperProps>`
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  .ant-picker {
    width: 100%;
    
    ${props => props.$variant === 'filled' && `
      background-color: rgba(0, 0, 0, 0.06);
      border-color: transparent;
      border-bottom-color: rgba(0, 0, 0, 0.42);
      border-radius: 4px 4px 0 0;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.09);
      }
      
      &.ant-picker-focused {
        background-color: rgba(0, 0, 0, 0.06);
        border-bottom-color: #1890ff;
      }
    `}
    
    ${props => props.$variant === 'standard' && `
      border-left-color: transparent;
      border-right-color: transparent;
      border-top-color: transparent;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
      
      &.ant-picker-focused {
        border-bottom-color: #1890ff;
      }
    `}
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  
  .helper-text {
    font-size: 12px;
    color: ${props => props.$error ? '#ff4d4f' : 'rgba(0, 0, 0, 0.45)'};
    margin-top: 4px;
  }
`;

// تبدیل تاریخ JavaScript به Dayjs
const dateToDayjs = (date: Date | null | undefined, jalali = false): Dayjs | null => {
  if (!date) return null;
  return jalali ? dayjs(date).calendar('jalali') : dayjs(date);
};

// تبدیل Dayjs به تاریخ JavaScript
const dayjsToDate = (dayjs: Dayjs | null): Date | null => {
  if (!dayjs) return null;
  return dayjs.toDate();
};

/**
 * کامپوننت DatePicker با استفاده از DatePicker از Ant Design
 * این کامپوننت جایگزینی برای DatePicker از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <DatePicker
 *   label="تاریخ تولد"
 *   value={birthDate}
 *   onChange={(date) => setBirthDate(date)}
 *   format="YYYY/MM/DD"
 *   jalali
 *   fullWidth
 * />
 * 
 * <DatePicker.RangePicker
 *   label="بازه زمانی"
 *   value={dateRange}
 *   onChange={(dates) => setDateRange(dates)}
 *   jalali
 * />
 * ```
 */
const DatePicker: React.FC<DatePickerProps> & { RangePicker: React.FC<RangePickerProps> } = ({
  onChange,
  value,
  label,
  error,
  helperText,
  fullWidth = false,
  variant = 'outlined',
  inputVariant,
  disabled = false,
  required = false,
  readOnly = false,
  disablePast = false,
  disableFuture = false,
  format,
  jalali = false,
  minDate,
  maxDate,
  autoOk,
  clearable,
  placeholder,
  allowClear = true,
  className,
  style,
  inputClassName,
  inputStyle,
  size = 'middle',
  placement,
  popupClassName,
  bordered = true,
  status,
  ...rest
}) => {
  // تنظیم فرمت نمایش تاریخ
  const displayFormat = format || (jalali ? 'YYYY/MM/DD' : 'YYYY-MM-DD');
  
  // تبدیل تاریخ به Dayjs
  const dayjsValue = dateToDayjs(value, jalali);
  
  // تنظیم محدودیت‌های تاریخ
  const disabledDate = (current: Dayjs): boolean => {
    let disabled = false;
    
    if (disablePast) {
      const today = jalali ? dayjs().calendar('jalali').startOf('day') : dayjs().startOf('day');
      disabled = disabled || current.isBefore(today);
    }
    
    if (disableFuture) {
      const today = jalali ? dayjs().calendar('jalali').endOf('day') : dayjs().endOf('day');
      disabled = disabled || current.isAfter(today);
    }
    
    if (minDate) {
      const min = jalali ? dayjs(minDate).calendar('jalali').startOf('day') : dayjs(minDate).startOf('day');
      disabled = disabled || current.isBefore(min);
    }
    
    if (maxDate) {
      const max = jalali ? dayjs(maxDate).calendar('jalali').endOf('day') : dayjs(maxDate).endOf('day');
      disabled = disabled || current.isAfter(max);
    }
    
    return disabled;
  };
  
  // هندلر تغییر تاریخ
  const handleChange = (value: Dayjs | null, dateString: string | string[]): void => {
    if (onChange) {
      const dateStringValue = typeof dateString === 'string' ? dateString : dateString[0];
      onChange(value ? dayjsToDate(value) : null, dateStringValue);
    }
  };
  
  return (
    <StyledDatePickerWrapper $fullWidth={fullWidth} $variant={variant || inputVariant} $error={error}>
      {label && <label>{label}{required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}</label>}
      <AntDatePicker
        value={dayjsValue}
        onChange={handleChange}
        format={displayFormat}
        disabled={disabled}
        inputReadOnly={readOnly}
        disabledDate={disabledDate}
        allowClear={clearable !== false && allowClear}
        placeholder={placeholder || ''}
        className={inputClassName}
        style={inputStyle}
        size={size}
        placement={placement}
        popupClassName={popupClassName}
        bordered={bordered}
        status={error ? 'error' : status}
        locale={jalali ? locale : undefined}
        {...rest}
      />
      {helperText && <div className="helper-text">{helperText}</div>}
    </StyledDatePickerWrapper>
  );
};

/**
 * کامپوننت RangePicker برای انتخاب محدوده تاریخ
 */
const RangePicker: React.FC<RangePickerProps> = ({
  onChange,
  value,
  label,
  error,
  helperText,
  fullWidth = false,
  variant = 'outlined',
  inputVariant,
  disabled = false,
  required = false,
  readOnly = false,
  disablePast = false,
  disableFuture = false,
  format,
  jalali = false,
  minDate,
  maxDate,
  autoOk,
  clearable,
  placeholder,
  allowClear = true,
  className,
  style,
  inputClassName,
  inputStyle,
  size = 'middle',
  placement,
  popupClassName,
  bordered = true,
  status,
  separator,
  ranges,
  ...rest
}) => {
  // تنظیم فرمت نمایش تاریخ
  const displayFormat = format || (jalali ? 'YYYY/MM/DD' : 'YYYY-MM-DD');
  
  // تبدیل محدوده تاریخ به Dayjs
  const [startDate, endDate] = value || [null, null];
  const dayjsValue: [Dayjs | null, Dayjs | null] | null = value 
    ? [dateToDayjs(startDate, jalali), dateToDayjs(endDate, jalali)]
    : null;
  
  // تنظیم محدودیت‌های تاریخ
  const disabledDate = (current: Dayjs): boolean => {
    let disabled = false;
    
    if (disablePast) {
      const today = jalali ? dayjs().calendar('jalali').startOf('day') : dayjs().startOf('day');
      disabled = disabled || current.isBefore(today);
    }
    
    if (disableFuture) {
      const today = jalali ? dayjs().calendar('jalali').endOf('day') : dayjs().endOf('day');
      disabled = disabled || current.isAfter(today);
    }
    
    if (minDate) {
      const min = jalali ? dayjs(minDate).calendar('jalali').startOf('day') : dayjs(minDate).startOf('day');
      disabled = disabled || current.isBefore(min);
    }
    
    if (maxDate) {
      const max = jalali ? dayjs(maxDate).calendar('jalali').endOf('day') : dayjs(maxDate).endOf('day');
      disabled = disabled || current.isAfter(max);
    }
    
    return disabled;
  };
  
  // تبدیل بازه‌های تاریخ
  const convertedRanges = ranges ? 
    Object.entries(ranges).reduce((acc, [key, value]) => {
      if (typeof value === 'function') {
        const [start, end] = value();
        acc[key] = [
          jalali ? dayjs(start).calendar('jalali') : dayjs(start),
          jalali ? dayjs(end).calendar('jalali') : dayjs(end)
        ];
      } else {
        const [start, end] = value;
        acc[key] = [
          jalali ? dayjs(start).calendar('jalali') : dayjs(start),
          jalali ? dayjs(end).calendar('jalali') : dayjs(end)
        ];
      }
      return acc;
    }, {} as Record<string, [Dayjs, Dayjs]>) : 
    undefined;
  
  // هندلر تغییر تاریخ
  const handleChange = (
    values: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ): void => {
    if (onChange) {
      if (values === null) {
        onChange(null, null);
      } else {
        const [start, end] = values;
        onChange(
          [start ? dayjsToDate(start) : null, end ? dayjsToDate(end) : null],
          [dateStrings[0], dateStrings[1]]
        );
      }
    }
  };
  
  // تبدیل placeholder به آرایه با نوع مناسب
  const placeholderArray = typeof placeholder === 'string' 
    ? [placeholder, placeholder] as [string, string]
    : Array.isArray(placeholder) 
      ? placeholder as [string, string] 
      : ['تاریخ شروع', 'تاریخ پایان'] as [string, string];
  
  return (
    <StyledDatePickerWrapper $fullWidth={fullWidth} $variant={variant || inputVariant} $error={error}>
      {label && <label>{label}{required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}</label>}
      <AntRangePicker
        value={dayjsValue as [Dayjs, Dayjs] | null}
        onChange={handleChange}
        format={displayFormat}
        disabled={disabled}
        inputReadOnly={readOnly}
        disabledDate={disabledDate}
        allowClear={clearable !== false && allowClear}
        placeholder={placeholderArray}
        className={inputClassName}
        style={inputStyle}
        size={size}
        placement={placement}
        popupClassName={popupClassName}
        bordered={bordered}
        status={error ? 'error' : status}
        locale={jalali ? locale : undefined}
        separator={separator}
        ranges={convertedRanges}
        {...rest}
      />
      {helperText && <div className="helper-text">{helperText}</div>}
    </StyledDatePickerWrapper>
  );
};

DatePicker.RangePicker = RangePicker;

export default DatePicker; 
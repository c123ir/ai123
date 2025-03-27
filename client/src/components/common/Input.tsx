import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import styled from '@emotion/styled';

const { TextArea, Password } = AntInput;

// برای سازگاری با تایپ‌های Material UI
export type InputVariant = 'outlined' | 'filled' | 'standard';
export type InputSize = 'small' | 'medium' | 'large';
export type InputColor = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

export interface InputProps extends Omit<AntInputProps, 'size'> {
  label?: ReactNode;
  variant?: InputVariant;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  color?: InputColor;
  focused?: boolean;
  required?: boolean;
  InputProps?: any;
  InputLabelProps?: any;
  inputProps?: any;
  FormHelperTextProps?: any;
  size?: InputSize;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputComponent?: React.ElementType;
  inputRef?: React.Ref<HTMLInputElement>;
  select?: boolean;
  type?: string;
  margin?: 'none' | 'dense' | 'normal';
  children?: ReactNode;
  shrink?: boolean;
  dir?: 'rtl' | 'ltr';
  autoComplete?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  status?: '' | 'error' | 'warning';
}

const StyledInputWrapper = styled.div<{ 
  $fullWidth?: boolean; 
  $variant?: InputVariant;
  $error?: boolean;
  $color?: InputColor;
  $focused?: boolean;
  $marginSize?: 'none' | 'dense' | 'normal';
  $shrink?: boolean;
}>`
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  margin-bottom: ${props => {
    switch (props.$marginSize) {
      case 'dense': return '4px';
      case 'normal': return '16px';
      default: return '8px';
    }
  }};
  
  label {
    display: block;
    font-size: 14px;
    color: ${props => {
      if (props.$error) return '#ff4d4f';
      
      switch (props.$color) {
        case 'primary': return '#1890ff';
        case 'secondary': return '#722ed1';
        case 'success': return '#52c41a';
        case 'warning': return '#faad14';
        case 'error': return '#ff4d4f';
        case 'info': return '#1890ff';
        default: return 'rgba(0, 0, 0, 0.85)';
      }
    }};
    margin-bottom: 4px;
    
    ${props => props.$focused && `
      color: #1890ff;
    `}
    
    ${props => props.$shrink && `
      transform: translate(0, -1.5px) scale(0.75);
      transform-origin: top left;
    `}
  }
  
  .ant-input,
  .ant-input-password,
  .ant-input-affix-wrapper,
  .ant-input-textarea {
    ${props => props.$variant === 'filled' && `
      background-color: rgba(0, 0, 0, 0.06);
      border-color: transparent;
      border-bottom-color: rgba(0, 0, 0, 0.42);
      border-radius: 4px 4px 0 0;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.09);
      }
      
      &:focus,
      &.ant-input-focused {
        background-color: rgba(0, 0, 0, 0.06);
        border-bottom-color: ${props.$error ? '#ff4d4f' : '#1890ff'};
      }
    `}
    
    ${props => props.$variant === 'standard' && `
      border-left-color: transparent;
      border-right-color: transparent;
      border-top-color: transparent;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
      
      &:focus,
      &.ant-input-focused {
        border-bottom-color: ${props.$error ? '#ff4d4f' : '#1890ff'};
        box-shadow: none;
      }
    `}
    
    ${props => props.$error && `
      border-color: #ff4d4f;
      
      &:hover,
      &:focus {
        border-color: #ff4d4f;
      }
    `}
    
    ${props => props.$color && !props.$error && props.$focused && `
      border-color: ${
        props.$color === 'primary' ? '#1890ff' :
        props.$color === 'secondary' ? '#722ed1' :
        props.$color === 'success' ? '#52c41a' :
        props.$color === 'warning' ? '#faad14' :
        props.$color === 'error' ? '#ff4d4f' :
        props.$color === 'info' ? '#1890ff' : '#1890ff'
      };
    `}
  }
  
  .helper-text {
    font-size: 12px;
    color: ${props => props.$error ? '#ff4d4f' : 'rgba(0, 0, 0, 0.45)'};
    margin-top: 4px;
  }
`;

// کامپوننت Input اصلی
const Input: React.FC<InputProps> & {
  TextArea: typeof TextArea;
  Password: typeof Password;
  Group: typeof AntInput.Group;
} = ({
  label,
  variant = 'outlined',
  fullWidth = false,
  error = false,
  helperText,
  multiline = false,
  rows,
  maxRows,
  minRows,
  color,
  focused = false,
  required = false,
  InputProps,
  InputLabelProps,
  inputProps,
  FormHelperTextProps,
  size = 'medium',
  startAdornment,
  endAdornment,
  inputComponent,
  inputRef,
  select = false,
  type = 'text',
  margin = 'normal',
  children,
  shrink,
  dir,
  ...rest
}) => {
  // تبدیل size از Material UI به Ant Design
  const getSize = (size?: InputSize): 'large' | 'middle' | 'small' => {
    switch (size) {
      case 'small': return 'small';
      case 'large': return 'large';
      default: return 'middle';
    }
  };
  
  const antSize = getSize(size);
  
  // برای کنترل وضعیت focus
  const [isFocused, setIsFocused] = useState<boolean>(focused);
  const inputRefInternal = useRef<HTMLInputElement>(null);
  
  // اعمال focus اولیه
  useEffect(() => {
    if (focused && inputRefInternal.current) {
      inputRefInternal.current.focus();
    }
  }, [focused]);
  
  // تنظیم status برای نمایش error
  const status = error ? 'error' : rest.status;
  
  // ایجاد کامپوننت مناسب بر اساس نوع
  const renderInput = () => {
    // پراپرتی‌های مشترک بین همه انواع ورودی
    const commonProps = {
      ...rest,
      size: antSize,
      status,
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        rest.onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        rest.onBlur?.(e);
      },
      dir,
      ref: inputRef || inputRefInternal,
      ...inputProps,
    };
    
    // اگر چند خطی باشد
    if (multiline) {
      return (
        <TextArea
          {...commonProps}
          rows={rows || 4}
          maxLength={rest.maxLength}
          showCount={false}
          autoSize={minRows || maxRows ? { minRows, maxRows } : undefined}
        />
      );
    }
    
    // اگر رمز عبور باشد
    if (type === 'password') {
      return (
        <Password
          {...commonProps}
          prefix={startAdornment}
          suffix={endAdornment}
          iconRender={(visible) => (visible ? '👁️' : '👁️‍🗨️')}
        />
      );
    }
    
    // حالت پیش‌فرض
    return (
      <AntInput
        {...commonProps}
        prefix={startAdornment}
        suffix={endAdornment}
        type={type}
      />
    );
  };
  
  return (
    <StyledInputWrapper 
      $fullWidth={fullWidth} 
      $variant={variant}
      $error={error}
      $color={color}
      $focused={isFocused || focused}
      $marginSize={margin}
      $shrink={shrink}
      className={InputProps?.className}
      style={InputProps?.style}
    >
      {label && (
        <label {...InputLabelProps}>
          {label}
          {required && <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {helperText && (
        <div className="helper-text" {...FormHelperTextProps}>
          {helperText}
        </div>
      )}
      
      {select && children}
    </StyledInputWrapper>
  );
};

// اضافه کردن زیرکامپوننت‌ها
Input.TextArea = TextArea;
Input.Password = Password;
Input.Group = AntInput.Group;

export default Input; 
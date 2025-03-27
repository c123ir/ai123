import React, { ReactNode } from 'react';
import { Select as AntSelect } from 'antd';
import styled from '@emotion/styled';

const { Option } = AntSelect;

export interface SelectOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options?: SelectOption[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  mode?: 'multiple' | 'tags';
  showSearch?: boolean;
  allowClear?: boolean;
  onChange?: (value: any, option: any) => void;
  onSearch?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
  style?: React.CSSProperties;
  size?: 'large' | 'middle' | 'small';
  status?: 'error' | 'warning';
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  required?: boolean;
  children?: ReactNode;
}

const Container = styled.div<{ $fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label<{ $required?: boolean; $error?: boolean }>`
  margin-bottom: 6px;
  font-size: 14px;
  color: ${props => props.$error ? '#f5222d' : 'rgba(0, 0, 0, 0.85)'};
  
  @media (prefers-color-scheme: dark) {
    color: ${props => props.$error ? '#ff4d4f' : 'rgba(255, 255, 255, 0.85)'};
  }
  
  &::after {
    content: ${props => props.$required ? '"*"' : '""'};
    color: #f5222d;
    margin-right: 4px;
  }
`;

const HelperText = styled.div<{ $error?: boolean }>`
  margin-top: 4px;
  font-size: 12px;
  color: ${props => props.$error ? '#f5222d' : 'rgba(0, 0, 0, 0.45)'};
  
  @media (prefers-color-scheme: dark) {
    color: ${props => props.$error ? '#ff4d4f' : 'rgba(255, 255, 255, 0.45)'};
  }
`;

const StyledSelect = styled(AntSelect)<{ $variant?: string }>`
  width: 100%;
  
  &.ant-select-outlined {
    .ant-select-selector {
      border: 1px solid #d9d9d9;
      transition: all 0.3s;
      
      &:hover {
        border-color: #40a9ff;
      }
    }
    
    &.ant-select-focused .ant-select-selector {
      border-color: #40a9ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  }
  
  &.ant-select-filled {
    .ant-select-selector {
      background-color: rgba(0, 0, 0, 0.06);
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      border-top: none;
      border-left: none;
      border-right: none;
      border-radius: 4px 4px 0 0;
      padding-top: 25px;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.09);
      }
    }
    
    &.ant-select-focused .ant-select-selector {
      border-bottom: 2px solid #1890ff;
    }
  }
  
  &.ant-select-standard {
    .ant-select-selector {
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      border-radius: 0;
      
      &:hover {
        border-bottom: 1px solid rgba(0, 0, 0, 0.87);
      }
    }
    
    &.ant-select-focused .ant-select-selector {
      border-bottom: 2px solid #1890ff;
    }
  }
`;

/**
 * کامپوننت Select با استفاده از Select از Ant Design
 * این کامپوننت جایگزینی برای Select از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Select
 *   options={[
 *     { value: '1', label: 'گزینه ۱' },
 *     { value: '2', label: 'گزینه ۲' },
 *     { value: '3', label: 'گزینه ۳', disabled: true },
 *   ]}
 *   placeholder="انتخاب کنید"
 *   label="نوع عضویت"
 *   variant="outlined"
 *   fullWidth
 *   required
 * />
 * ```
 */
const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder,
  disabled,
  loading,
  mode,
  showSearch = false,
  allowClear = false,
  onChange,
  onSearch,
  onBlur,
  onFocus,
  className,
  style,
  size = 'middle',
  status,
  label,
  error,
  helperText,
  fullWidth = false,
  variant = 'outlined',
  required = false,
  children,
}) => {
  // تنظیم کلاس بر اساس variant
  const selectClassName = `ant-select-${variant} ${className || ''}`;
  
  return (
    <Container $fullWidth={fullWidth} style={style}>
      {label && <Label $required={required} $error={!!error}>{label}</Label>}
      
      <StyledSelect
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        loading={loading}
        mode={mode}
        showSearch={showSearch}
        allowClear={allowClear}
        onChange={onChange}
        onSearch={onSearch}
        onBlur={onBlur}
        onFocus={onFocus}
        className={selectClassName}
        size={size}
        status={error ? 'error' : status}
        $variant={variant}
      >
        {options ? options.map((option) => (
          <Option 
            key={option.value} 
            value={option.value} 
            disabled={option.disabled}
          >
            {option.label}
          </Option>
        )) : children}
      </StyledSelect>
      
      {(helperText || error) && (
        <HelperText $error={!!error}>{error || helperText}</HelperText>
      )}
    </Container>
  );
};

export default Select; 
import React, { ReactNode } from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styled from '@emotion/styled';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (e: CheckboxChangeEvent) => void;
  value?: any;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | string;
  size?: 'small' | 'medium' | 'large';
  label?: ReactNode;
}

const StyledCheckbox = styled(AntCheckbox)<{ $color?: string; $size?: string }>`
  &.ant-checkbox-wrapper {
    font-size: ${props => {
      switch (props.$size) {
        case 'small': return '0.875rem';
        case 'large': return '1.125rem';
        default: return '1rem';
      }
    }};
  }
  
  .ant-checkbox-inner {
    width: ${props => {
      switch (props.$size) {
        case 'small': return '14px';
        case 'large': return '20px';
        default: return '16px';
      }
    }};
    
    height: ${props => {
      switch (props.$size) {
        case 'small': return '14px';
        case 'large': return '20px';
        default: return '16px';
      }
    }};
  }
  
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${props => {
      if (!props.$color) return undefined;
      
      switch (props.$color) {
        case 'primary': return '#1890ff';
        case 'secondary': return '#722ed1';
        case 'success': return '#52c41a';
        case 'warning': return '#faad14';
        case 'error': return '#f5222d';
        default: return props.$color;
      }
    }};
    
    border-color: ${props => {
      if (!props.$color) return undefined;
      
      switch (props.$color) {
        case 'primary': return '#1890ff';
        case 'secondary': return '#722ed1';
        case 'success': return '#52c41a';
        case 'warning': return '#faad14';
        case 'error': return '#f5222d';
        default: return props.$color;
      }
    }};
  }
`;

/**
 * کامپوننت Checkbox با استفاده از Checkbox از Ant Design
 * این کامپوننت جایگزینی برای Checkbox از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Checkbox 
 *   checked={checked} 
 *   onChange={handleChange} 
 *   color="primary"
 *   size="medium"
 * >
 *   گزینه انتخابی
 * </Checkbox>
 * ```
 */
const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  disabled,
  indeterminate,
  onChange,
  value,
  name,
  className,
  style,
  children,
  color = 'primary',
  size = 'medium',
  label,
}) => {
  return (
    <StyledCheckbox
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      indeterminate={indeterminate}
      onChange={onChange}
      value={value}
      name={name}
      className={className}
      style={style}
      $color={color}
      $size={size}
    >
      {children || label}
    </StyledCheckbox>
  );
};

export default Checkbox; 
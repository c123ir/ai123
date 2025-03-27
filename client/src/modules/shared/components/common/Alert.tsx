import React, { ReactNode } from 'react';
import { Alert as AntAlert } from 'antd';
import styled from '@emotion/styled';

export interface AlertProps {
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  closeText?: ReactNode;
  color?: 'success' | 'info' | 'warning' | 'error';
  icon?: ReactNode;
  role?: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  style?: React.CSSProperties;
  onClose?: () => void;
  variant?: 'standard' | 'filled' | 'outlined';
  title?: string;
  banner?: boolean;
  closable?: boolean;
  showIcon?: boolean;
  description?: ReactNode;
  message?: ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error';
}

const StyledAlert = styled(AntAlert)<{
  $variant?: string;
}>`
  ${props => props.$variant === 'outlined' && `
    background-color: transparent;
    border: 1px solid;
    
    &.ant-alert-success {
      border-color: #52c41a;
      color: #52c41a;
    }
    
    &.ant-alert-info {
      border-color: #1890ff;
      color: #1890ff;
    }
    
    &.ant-alert-warning {
      border-color: #faad14;
      color: #faad14;
    }
    
    &.ant-alert-error {
      border-color: #f5222d;
      color: #f5222d;
    }
  `}
  
  ${props => props.$variant === 'filled' && `
    &.ant-alert-success {
      background-color: #52c41a;
      border-color: #52c41a;
      color: #fff;
    }
    
    &.ant-alert-info {
      background-color: #1890ff;
      border-color: #1890ff;
      color: #fff;
    }
    
    &.ant-alert-warning {
      background-color: #faad14;
      border-color: #faad14;
      color: #fff;
    }
    
    &.ant-alert-error {
      background-color: #f5222d;
      border-color: #f5222d;
      color: #fff;
    }
    
    .ant-alert-message {
      color: #fff;
    }
    
    .ant-alert-description {
      color: #fff;
    }
    
    .ant-alert-close-icon {
      color: #fff;
    }
  `}
`;

/**
 * کامپوننت Alert با استفاده از Alert از Ant Design
 * این کامپوننت جایگزینی برای Alert از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Alert 
 *   severity="success" 
 *   title="عملیات موفق" 
 *   description="عملیات با موفقیت انجام شد" 
 *   closable 
 *   onClose={handleClose}
 *   variant="filled"
 * />
 * 
 * <Alert severity="error" title="خطا">
 *   پیام خطا در اینجا نمایش داده می‌شود
 * </Alert>
 * ```
 */
const Alert: React.FC<AlertProps> = ({
  action,
  children,
  className,
  closeText,
  color,
  icon,
  role = 'alert',
  severity = 'info',
  style,
  onClose,
  variant = 'standard',
  title,
  banner = false,
  closable,
  showIcon = true,
  description,
  message,
  type,
}) => {
  // تعیین نوع هشدار (از severity یا type یا color)
  const alertType = type || severity || color || 'info';
  
  // تعیین مقدار message و description
  const alertMessage = message || title || '';
  const alertDescription = description || children || '';
  
  // تعیین نمایش دکمه بستن
  const isClosable = closable || onClose !== undefined;
  
  return (
    <StyledAlert
      type={alertType}
      message={alertMessage}
      description={alertDescription}
      showIcon={showIcon}
      icon={icon}
      closable={isClosable}
      closeText={closeText}
      banner={banner}
      onClose={onClose}
      role={role}
      action={action}
      className={className}
      style={style}
      $variant={variant}
    />
  );
};

export default Alert; 
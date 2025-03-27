import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd/es/button';
import styled from '@emotion/styled';

// تغییر به رنگ‌های مجاز در Ant Design
type CustomButtonColor = 'secondary' | 'success' | 'info' | 'warning' | 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold' | 'danger';

// تعریف نوع جدید برای جلوگیری از تداخل با آنت دیزاین
export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'ghost'> {
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'default' | CustomButtonColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  ghost?: boolean;
}

// اطمینان از اینکه variant به عنوان یک prop در HTML ظاهر نمی‌شود
interface StyledButtonProps {
  $fullWidth?: boolean;
  $variant?: 'contained' | 'outlined' | 'text';
  $color?: 'primary' | 'default' | CustomButtonColor;
}

const StyledButton = styled(AntButton)<StyledButtonProps>`
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  ${({ $variant, $color }) => {
    if ($variant === 'outlined') {
      return `
        background-color: transparent;
        border: 1px solid;
      `;
    }

    if ($variant === 'text') {
      return `
        background-color: transparent;
        border: none;
        box-shadow: none;
        padding-left: 8px;
        padding-right: 8px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
      `;
    }

    return '';
  }}

  .icon-wrapper {
    display: flex;
    align-items: center;
  }

  .start-icon {
    margin-right: 8px;
  }

  .end-icon {
    margin-left: 8px;
  }

  &[disabled] {
    opacity: 0.7;
  }
`;

/**
 * کامپوننت Button
 * راهنمای استفاده:
 * 
 * ```jsx
 * <Button type="primary" onClick={handleClick}>
 *   دکمه ساده
 * </Button>
 * 
 * <Button 
 *   variant="contained"
 *   color="primary"
 *   fullWidth
 *   startIcon={<Icon />}
 * >
 *   دکمه با آیکون
 * </Button>
 * ```
 */
const Button: React.FC<ButtonProps> = ({
  children,
  fullWidth = false,
  variant = 'contained',
  color = 'default',
  startIcon,
  endIcon,
  type,
  ghost = false,
  ...props
}) => {
  // تبدیل variant و color به type مناسب برای Ant Design
  let buttonType = type;
  if (!buttonType) {
    if (color === 'primary' || variant === 'contained') {
      buttonType = 'primary';
    } else if (color === 'default') {
      buttonType = 'default';
    } else if (color === 'danger' || color === 'red') {
      buttonType = 'primary';
      props.danger = true;
    }
  }

  return (
    <StyledButton
      $fullWidth={fullWidth}
      $variant={variant}
      $color={color}
      {...props}
      type={buttonType as 'link' | 'dashed' | 'text' | 'default' | 'primary' | undefined}
      ghost={ghost}
    >
      {startIcon || endIcon ? (
        <span className="icon-wrapper">
          {startIcon && <span className="start-icon">{startIcon}</span>}
          {children}
          {endIcon && <span className="end-icon">{endIcon}</span>}
        </span>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button; 
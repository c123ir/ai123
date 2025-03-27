import React, { ReactNode, MouseEventHandler, CSSProperties } from 'react';
import styled from '@emotion/styled';

interface BackdropProps {
  children?: ReactNode;
  open?: boolean;
  invisible?: boolean;
  zIndex?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
  transitionDuration?: number | { enter: number; exit: number };
}

// تبدیل prop به کامپوننت داخلی با پیشوند $ برای Emotion
interface StyledBackdropProps {
  $open: boolean;
  $invisible: boolean;
  $zIndex: number;
  $transitionDuration?: number | { enter: number; exit: number };
}

// استایل‌های سفارشی برای Backdrop
const StyledBackdrop = styled.div<StyledBackdropProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${props => props.$zIndex};
  background-color: ${props => props.$invisible ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
  visibility: ${props => props.$open ? 'visible' : 'hidden'};
  opacity: ${props => props.$open ? 1 : 0};
  transition: ${props => {
    const duration = typeof props.$transitionDuration === 'number' 
      ? props.$transitionDuration 
      : props.$transitionDuration?.enter || 300;
    return `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), visibility ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  }};
`;

/**
 * کامپوننت Backdrop
 * برای ایجاد پس‌زمینه تیره پشت مودال‌ها و سایر کامپوننت‌های روی صفحه
 * 
 * نمونه استفاده:
 * ```jsx
 * <Backdrop open={open} onClick={handleClose}>
 *   <div>محتوای روی backdrop</div>
 * </Backdrop>
 * ```
 */
const Backdrop: React.FC<BackdropProps> = ({
  children,
  open = false,
  invisible = false,
  zIndex = 1000,
  onClick,
  className,
  style,
  transitionDuration = 300,
}) => {
  return (
    <StyledBackdrop
      $open={open}
      $invisible={invisible}
      $zIndex={zIndex}
      onClick={onClick}
      className={className}
      style={style}
      $transitionDuration={transitionDuration}
    >
      {children}
    </StyledBackdrop>
  );
};

export default Backdrop; 
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

export interface PaperProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  elevation?: number;
  square?: boolean;
  variant?: 'elevation' | 'outlined';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// استایل‌های کامپوننت Paper به عنوان کلاس‌های واقعی
const PaperStyled = styled.div`
  background-color: #fff;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;

  &.outlined {
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
  
  &.square {
    border-radius: 0;
  }
  
  &:not(.square) {
    border-radius: 4px;
  }
  
  &.elevation-0 { box-shadow: none; }
  &.elevation-1 { box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); }
  &.elevation-2 { box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12); }
  &.elevation-3 { box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12); }
  &.elevation-4 { box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12); }
  &.elevation-5 { box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12); }
  &.elevation-6 { box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12); }
  &.elevation-8 { box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12); }
  &.elevation-12 { box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12); }
  &.elevation-16 { box-shadow: 0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12); }
  &.elevation-24 { box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12); }
`;

/**
 * کامپوننت Paper برای نمایش محتوا روی سطوح بلند شده با سایه
 * این کامپوننت جایگزینی برای Paper از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Paper elevation={3}>
 *   محتوای داخل کامپوننت
 * </Paper>
 * 
 * <Paper variant="outlined">
 *   محتوای با حاشیه
 * </Paper>
 * ```
 */
const Paper: React.FC<PaperProps> = ({
  children,
  className,
  style,
  elevation = 1,
  square = false,
  variant = 'elevation',
  onClick,
}) => {
  // ساخت کلاس‌های مورد نیاز
  const paperClasses = [
    className,
    variant === 'outlined' ? 'outlined' : '',
    square ? 'square' : '',
    variant === 'elevation' ? `elevation-${elevation}` : ''
  ].filter(Boolean).join(' ');

  return (
    <PaperStyled 
      className={paperClasses || undefined}
      style={style}
      onClick={onClick}
    >
      {children}
    </PaperStyled>
  );
};

export default Paper;
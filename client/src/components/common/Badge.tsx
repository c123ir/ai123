import React, { ReactNode } from 'react';
import { Badge as AntBadge } from 'antd';
import styled from '@emotion/styled';

export interface BadgeProps {
  children?: ReactNode;
  badgeContent?: ReactNode;
  count?: React.ReactNode;
  showZero?: boolean;
  dot?: boolean;
  overflowCount?: number;
  offset?: [number, number];
  size?: 'default' | 'small';
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: string;
  title?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  max?: number;
  invisible?: boolean;
  variant?: 'dot' | 'standard';
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
}

// استایل‌های کامپوننت Badge
const BadgeStyled = styled.div`
  .ant-badge {
    display: inline-flex;
  }
  
  /* استایل‌های وضعیت مخفی */
  .invisible .ant-badge-count,
  .invisible .ant-badge-dot {
    display: none;
  }
  
  /* استایل‌های موقعیت */
  .anchor-top-right .ant-badge-count,
  .anchor-top-right .ant-badge-dot {
    top: 0;
    right: 0;
  }
  
  .anchor-top-left .ant-badge-count,
  .anchor-top-left .ant-badge-dot {
    top: 0;
    left: 0;
  }
  
  .anchor-bottom-right .ant-badge-count,
  .anchor-bottom-right .ant-badge-dot {
    bottom: 0;
    right: 0;
  }
  
  .anchor-bottom-left .ant-badge-count,
  .anchor-bottom-left .ant-badge-dot {
    bottom: 0;
    left: 0;
  }
`;

/**
 * کامپوننت Badge برای نمایش نشانگر
 * این کامپوننت جایگزینی برای Badge از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Badge badgeContent={4} color="error">
 *   <MailIcon />
 * </Badge>
 * 
 * <Badge variant="dot" color="primary">
 *   <MailIcon />
 * </Badge>
 * ```
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  badgeContent,
  count,
  showZero = false,
  dot = false,
  overflowCount = 99,
  offset,
  size = 'default',
  status,
  text,
  title,
  color,
  className,
  style,
  max = 99,
  invisible = false,
  variant,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
}) => {
  // تبدیل variant به dot
  const isDot = variant === 'dot' || dot;
  
  // استفاده از badgeContent یا count
  const finalCount = badgeContent !== undefined ? badgeContent : count;
  
  // اعمال max به count اگر عدد باشد
  const limitedCount = typeof finalCount === 'number' && finalCount > max ? `${max}+` : finalCount;
  
  // کلاس‌های مرتبط با موقعیت و وضعیت مخفی
  const anchorClass = `anchor-${anchorOrigin.vertical}-${anchorOrigin.horizontal}`;
  const visibilityClass = invisible ? 'invisible' : '';
  
  const badgeClasses = [
    className,
    anchorClass,
    visibilityClass
  ].filter(Boolean).join(' ');

  return (
    <BadgeStyled className={badgeClasses}>
      <AntBadge
        count={limitedCount}
        showZero={showZero}
        dot={isDot}
        overflowCount={overflowCount}
        offset={offset}
        size={size}
        status={status}
        text={text}
        title={title}
        color={color}
        style={style}
      >
        {children}
      </AntBadge>
    </BadgeStyled>
  );
};

export default Badge; 
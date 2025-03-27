import React, { ReactNode } from 'react';
import { Avatar as AntAvatar } from 'antd';
import styled from '@emotion/styled';

export interface AvatarProps {
  alt?: string;
  src?: string;
  srcSet?: string;
  children?: ReactNode;
  shape?: 'circle' | 'square';
  size?: number | 'large' | 'small' | 'default';
  icon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
  variant?: 'circular' | 'rounded' | 'square';
  color?: string;
  bgColor?: string;
}

// استایل‌های کامپوننت Avatar
const AvatarStyled = styled.div`
  /* استایل‌های شکل */
  .avatar-circular {
    border-radius: 50%;
  }
  
  .avatar-rounded {
    border-radius: 4px;
  }
  
  .avatar-square {
    border-radius: 0;
  }
  
  /* استایل‌های رنگ */
  .avatar-color-primary { color: #ffffff; }
  .avatar-color-secondary { color: #ffffff; }
  .avatar-color-success { color: #ffffff; }
  .avatar-color-warning { color: rgba(0, 0, 0, 0.87); }
  .avatar-color-error { color: #ffffff; }
  
  /* استایل‌های پس‌زمینه */
  .avatar-bg-primary { background-color: #1890ff; }
  .avatar-bg-secondary { background-color: #722ed1; }
  .avatar-bg-success { background-color: #52c41a; }
  .avatar-bg-warning { background-color: #faad14; }
  .avatar-bg-error { background-color: #f5222d; }
`;

// تبدیل variant به shape
function getShape(variant?: string): 'circle' | 'square' {
  switch (variant) {
    case 'square':
      return 'square';
    case 'rounded':
    case 'circular':
    default:
      return 'circle';
  }
}

/**
 * کامپوننت Avatar برای نمایش آواتار
 * این کامپوننت جایگزینی برای Avatar از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Avatar>ک</Avatar>
 * 
 * <Avatar src="/images/avatar.jpg" alt="تصویر کاربر" />
 * 
 * <Avatar variant="square" color="primary">کاربر</Avatar>
 * ```
 */
const Avatar: React.FC<AvatarProps> = ({
  alt,
  src,
  srcSet,
  children,
  shape,
  size = 'default',
  icon,
  className,
  style,
  onClick,
  variant = 'circular',
  color,
  bgColor,
}) => {
  // تبدیل variant به shape
  const avatarShape = shape || getShape(variant);
  
  // تعیین رنگ‌ها و استایل‌ها
  const getColorClass = (color?: string) => {
    if (!color || !['primary', 'secondary', 'success', 'warning', 'error'].includes(color)) return '';
    return `avatar-color-${color}`;
  };
  
  const getBgColorClass = (bgColor?: string) => {
    if (!bgColor || !['primary', 'secondary', 'success', 'warning', 'error'].includes(bgColor)) return '';
    return `avatar-bg-${bgColor}`;
  };
  
  // کلاس‌های آواتار
  const avatarClasses = [
    className,
    `avatar-${variant}`,
    getColorClass(color),
    getBgColorClass(bgColor)
  ].filter(Boolean).join(' ');
  
  // استایل‌های سفارشی
  const customStyle = {
    ...style,
    ...(color && !['primary', 'secondary', 'success', 'warning', 'error'].includes(color) ? { color } : {}),
    ...(bgColor && !['primary', 'secondary', 'success', 'warning', 'error'].includes(bgColor) ? { backgroundColor: bgColor } : {})
  };

  return (
    <AvatarStyled>
      <AntAvatar
        alt={alt}
        src={src}
        srcSet={srcSet}
        shape={avatarShape}
        size={size}
        icon={icon}
        className={avatarClasses || undefined}
        style={customStyle}
        onClick={onClick}
      >
        {children}
      </AntAvatar>
    </AvatarStyled>
  );
};

export default Avatar; 
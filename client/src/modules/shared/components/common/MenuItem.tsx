import React, { ReactNode } from 'react';
import { Menu, MenuItemProps as AntMenuItemProps } from 'antd';
import styled from '@emotion/styled';

export interface MenuItemProps extends Omit<AntMenuItemProps, 'onClick'> {
  children?: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  key?: string;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
  danger?: boolean;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
}

const StyledMenuItem = styled(Menu.Item)<{ $selected?: boolean }>`
  ${props => props.$selected && `
    background-color: rgba(0, 0, 0, 0.08);
    font-weight: 500;
    
    @media (prefers-color-scheme: dark) {
      background-color: rgba(255, 255, 255, 0.08);
    }
  `}
`;

/**
 * کامپوننت MenuItem با استفاده از Menu.Item از Ant Design
 * این کامپوننت به عنوان یک آیتم در کامپوننت Menu استفاده می‌شود
 * 
 * نمونه استفاده:
 * ```jsx
 * <Menu>
 *   <MenuItem key="1" icon={<HomeOutlined />}>خانه</MenuItem>
 *   <MenuItem key="2" icon={<SettingOutlined />}>تنظیمات</MenuItem>
 * </Menu>
 * ```
 */
const MenuItem: React.FC<MenuItemProps> = ({ 
  children, 
  disabled, 
  icon, 
  key, 
  title, 
  onClick, 
  danger, 
  className, 
  style,
  selected,
  ...rest 
}) => {
  // تبدیل onClick به فرمت Ant Design
  const handleClick = onClick ? (info: any) => onClick(info.domEvent) : undefined;
  
  return (
    <StyledMenuItem
      disabled={disabled}
      icon={icon}
      key={key}
      title={title}
      onClick={handleClick}
      danger={danger}
      className={className}
      style={style}
      $selected={selected}
      {...rest}
    >
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem; 
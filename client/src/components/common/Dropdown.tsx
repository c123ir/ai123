import React, { ReactNode, useState } from 'react';
import { Dropdown as AntDropdown, Menu, Button } from 'antd';
import styled from '@emotion/styled';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// استایل‌های سفارشی
const StyledDropdown = styled(AntDropdown)`
  &.ant-dropdown-open {
    opacity: 0.8;
  }
`;

export interface DropdownItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'divider' | 'group';
}

export interface DropdownProps {
  items: DropdownItem[];
  children?: ReactNode;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// تبدیل آیتم‌های DropdownItem به فرمت مورد نیاز Ant Design
const convertItems = (items: DropdownItem[]): any[] => {
  return items.map(item => {
    if (item.type === 'divider') {
      return { type: 'divider' };
    }
    
    return {
      key: item.key,
      label: item.label,
      icon: item.icon,
      disabled: item.disabled,
      danger: item.danger,
      onClick: item.onClick,
      type: item.type
    };
  });
};

/**
 * کامپوننت Dropdown با استفاده از Dropdown از Ant Design
 * این کامپوننت برای نمایش منوی کشویی استفاده می‌شود
 * 
 * نمونه استفاده:
 * ```jsx
 * <Dropdown
 *   items={[
 *     { key: 'profile', label: 'پروفایل', icon: <UserOutlined /> },
 *     { key: 'settings', label: 'تنظیمات', icon: <SettingOutlined /> },
 *     { type: 'divider' },
 *     { key: 'logout', label: 'خروج', icon: <LogoutOutlined />, danger: true }
 *   ]}
 * >
 *   <Button>
 *     منو <DownOutlined />
 *   </Button>
 * </Dropdown>
 * ```
 */
const Dropdown: React.FC<DropdownProps> = ({
  items,
  children,
  trigger = ['hover'],
  placement = 'bottomLeft',
  open,
  onOpenChange,
  arrow = false,
  disabled = false,
  className,
  style,
  overlayClassName,
  overlayStyle,
  onClick,
}) => {
  // تبدیل آیتم‌ها به فرمت قابل استفاده در Ant Design
  const menuItems = convertItems(items);
  
  // ساخت منو با آیتم‌های تبدیل شده
  const menu = { items: menuItems };
  
  return (
    <StyledDropdown
      menu={menu}
      open={open}
      onOpenChange={onOpenChange}
      placement={placement}
      arrow={arrow}
      disabled={disabled}
      trigger={trigger}
      overlayClassName={overlayClassName}
      overlayStyle={overlayStyle}
      className={className}
    >
      {children || (
        <Button>
          منو <DownOutlined />
        </Button>
      )}
    </StyledDropdown>
  );
};

export default Dropdown; 
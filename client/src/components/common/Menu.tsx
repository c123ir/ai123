import React, { ReactNode } from 'react';
import { Menu as AntMenu, MenuProps as AntMenuProps } from 'antd';
import styled from '@emotion/styled';

export interface MenuItem {
  key: string;
  icon?: ReactNode;
  label: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: (info: { key: string; keyPath: string[] }) => void;
  type?: 'group' | 'divider';
  children?: MenuItem[];
}

// تبدیل MenuItem به آیتم‌های مورد نیاز Ant Design
const transformMenuItems = (items: MenuItem[]): any[] => {
  return items.map(item => {
    const result: any = {
      key: item.key,
      icon: item.icon,
      label: item.label,
      disabled: item.disabled,
      danger: item.danger,
      type: item.type,
    };
    
    // اگر زیرمنو داشته باشد
    if (item.children && item.children.length > 0) {
      result.children = transformMenuItems(item.children);
    } 
    
    // اگر نوع group باشد
    if (item.type === 'group') {
      result.type = 'group';
    } 
    
    // اگر نوع divider باشد
    if (item.type === 'divider') {
      result.type = 'divider';
    }
    
    if (item.onClick) {
      result.onClick = (info: any) => {
        item.onClick?.({ key: info.key, keyPath: info.keyPath });
      };
    }
    
    return result;
  });
};

export interface MenuProps extends Omit<AntMenuProps, 'items'> {
  items?: MenuItem[];
}

/**
 * کامپوننت منو با استفاده از Menu از Ant Design
 * این کامپوننت جایگزینی برای Menu از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Menu
 *   items={[
 *     { key: 'home', label: 'صفحه اصلی', icon: <HomeOutlined /> },
 *     { key: 'about', label: 'درباره ما', icon: <InfoCircleOutlined /> },
 *     { 
 *       key: 'services', 
 *       label: 'خدمات', 
 *       icon: <AppstoreOutlined />,
 *       children: [
 *         { key: 'service1', label: 'خدمات 1' },
 *         { key: 'service2', label: 'خدمات 2' }
 *       ]
 *     }
 *   ]}
 *   mode="horizontal"
 * />
 * ```
 */
const Menu: React.FC<MenuProps> = ({ items, ...rest }) => {
  // تبدیل آیتم‌ها به فرمت آنت دیزاین
  const antItems = items ? transformMenuItems(items) : undefined;
  
  return <AntMenu {...rest} items={antItems} />;
};

export default Menu; 
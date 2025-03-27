import React, { ReactNode } from 'react';
import { Menu } from 'antd';
import styled from '@emotion/styled';

export interface MenuListProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dense?: boolean;
  disablePadding?: boolean;
  subheader?: ReactNode;
}

const StyledMenuList = styled.div<{ $dense?: boolean; $disablePadding?: boolean }>`
  background-color: transparent;
  padding: ${props => props.$disablePadding ? '0' : '8px 0'};
  border-radius: 4px;
  overflow: hidden;
  
  .ant-menu {
    background-color: transparent;
    border-inline-end: none !important;
  }
  
  ${props => props.$dense && `
    .ant-menu-item {
      padding-top: 4px;
      padding-bottom: 4px;
      line-height: 1.4;
      min-height: 32px;
    }
  `}
`;

const Subheader = styled.div`
  padding: 8px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.6);
  }
`;

/**
 * کامپوننت MenuList با استفاده از Ant Design
 * این کامپوننت لیستی از آیتم‌های منو را نمایش می‌دهد
 * 
 * نمونه استفاده:
 * ```jsx
 * <MenuList subheader={<div>عنوان منو</div>} dense>
 *   <MenuItem key="1">گزینه 1</MenuItem>
 *   <MenuItem key="2">گزینه 2</MenuItem>
 * </MenuList>
 * ```
 */
const MenuList: React.FC<MenuListProps> = ({
  children,
  className,
  style,
  dense = false,
  disablePadding = false,
  subheader,
}) => {
  return (
    <StyledMenuList
      className={className}
      style={style}
      $dense={dense}
      $disablePadding={disablePadding}
    >
      {subheader && <Subheader>{subheader}</Subheader>}
      <Menu mode="vertical" selectable={false} style={{ width: '100%' }}>
        {children}
      </Menu>
    </StyledMenuList>
  );
};

export default MenuList; 
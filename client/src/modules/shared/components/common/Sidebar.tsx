import React, { ReactNode } from 'react';
import { Drawer, DrawerProps } from 'antd';
import styled from '@emotion/styled';

export interface SidebarProps extends Omit<DrawerProps, 'placement'> {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'temporary' | 'persistent' | 'permanent';
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const StyledDrawer = styled(Drawer)<{
  $variant?: string;
  $anchor?: string;
  $width?: number | string;
  $height?: number | string;
}>`
  .ant-drawer-body {
    padding: 0;
    overflow-x: hidden;
  }
  
  .ant-drawer-content-wrapper {
    width: ${props => props.$anchor === 'left' || props.$anchor === 'right' 
      ? (typeof props.$width === 'number' ? `${props.$width}px` : props.$width) 
      : undefined} !important;
    
    height: ${props => props.$anchor === 'top' || props.$anchor === 'bottom' 
      ? (typeof props.$height === 'number' ? `${props.$height}px` : props.$height) 
      : undefined} !important;
  }
  
  ${props => props.$variant === 'permanent' && `
    .ant-drawer-mask {
      display: none;
    }
    
    .ant-drawer-content-wrapper {
      box-shadow: none;
      transform: translateX(0) !important;
      visibility: visible !important;
    }
  `}
  
  ${props => props.$variant === 'persistent' && `
    .ant-drawer-mask {
      display: none;
    }
  `}
`;

/**
 * کامپوننت Sidebar با استفاده از Drawer از Ant Design
 * این کامپوننت جایگزینی برای Drawer از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Sidebar
 *   open={open}
 *   onClose={handleClose}
 *   anchor="right"
 *   variant="temporary"
 *   width={280}
 * >
 *   <div>محتوای منو</div>
 * </Sidebar>
 * ```
 */
const Sidebar: React.FC<SidebarProps> = ({
  children,
  open,
  onClose,
  anchor = 'right',
  variant = 'temporary',
  width = 280,
  height = 256,
  className,
  style,
  ...rest
}) => {
  // تنظیم جهت و محل نمایش Drawer بر اساس anchor
  const placement = anchor;
  
  // در حالت permanent، همیشه drawer باز است
  const isOpen = variant === 'permanent' ? true : open;
  
  return (
    <StyledDrawer
      open={isOpen}
      onClose={onClose}
      placement={placement}
      closable={false}
      className={className}
      style={style}
      mask={variant === 'temporary'}
      maskClosable={variant === 'temporary'}
      $variant={variant}
      $anchor={anchor}
      $width={width}
      $height={height}
      {...rest}
    >
      {children}
    </StyledDrawer>
  );
};

export default Sidebar; 
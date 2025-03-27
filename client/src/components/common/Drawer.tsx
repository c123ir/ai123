import React, { ReactNode } from 'react';
import { Drawer as AntDrawer } from 'antd';
import styled from '@emotion/styled';

export interface DrawerProps {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  anchor?: 'top' | 'right' | 'bottom' | 'left';
  classes?: any;
  elevation?: number;
  variant?: 'permanent' | 'persistent' | 'temporary';
  ModalProps?: any;
  hideBackdrop?: boolean;
  width?: number | string;
  height?: number | string;
  title?: ReactNode;
  footer?: ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  closable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  contentWrapperStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  extra?: ReactNode;
  size?: 'large' | 'default';
  drawerStyle?: React.CSSProperties;
  destroyOnClose?: boolean;
}

const StyledDrawer = styled(AntDrawer)<{
  $elevation?: number;
  $variant?: string;
}>`
  ${props => props.$variant === 'permanent' && `
    position: static;
    height: 100%;
    
    .ant-drawer-content-wrapper {
      position: static;
      height: 100%;
      transform: none !important;
      box-shadow: none;
    }
    
    .ant-drawer-mask {
      display: none;
    }
  `}
  
  ${props => props.$elevation && `
    .ant-drawer-content {
      box-shadow: 0px ${props.$elevation}px ${props.$elevation * 2}px rgba(0, 0, 0, ${Math.min(0.1 + (props.$elevation * 0.02), 0.3)});
    }
  `}
`;

/**
 * کامپوننت Drawer با استفاده از Drawer از Ant Design
 * این کامپوننت جایگزینی برای Drawer از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Drawer
 *   open={open}
 *   onClose={handleClose}
 *   title="عنوان کشو"
 *   anchor="right"
 *   width={320}
 * >
 *   <p>محتوای کشو در اینجا قرار می‌گیرد.</p>
 * </Drawer>
 * ```
 */
const Drawer: React.FC<DrawerProps> = ({
  children,
  open = false,
  onClose,
  anchor = 'right',
  classes,
  elevation = 8,
  variant = 'temporary',
  ModalProps,
  hideBackdrop = false,
  width = 256,
  height,
  title,
  footer,
  placement,
  closable = true,
  mask = true,
  maskClosable = true,
  keyboard = true,
  zIndex,
  className,
  style,
  contentWrapperStyle,
  headerStyle,
  bodyStyle,
  footerStyle,
  maskStyle,
  extra,
  size,
  drawerStyle,
  destroyOnClose = false,
}) => {
  // تبدیل پراپرتی‌های Material UI به پراپرتی‌های مناسب برای Ant Design
  const finalPlacement = placement || anchor;
  
  // تنظیم اندازه نهایی بر اساس جهت
  const finalWidth = finalPlacement === 'left' || finalPlacement === 'right' 
    ? size === 'large' ? 512 : width 
    : undefined;
    
  const finalHeight = finalPlacement === 'top' || finalPlacement === 'bottom' 
    ? size === 'large' ? 512 : height 
    : undefined;
  
  // تنظیم ویژگی‌های مربوط به پوشاننده (mask)
  const useMask = variant === 'temporary' && !hideBackdrop ? mask : false;
  
  return (
    <StyledDrawer
      open={open}
      onClose={onClose}
      placement={finalPlacement}
      title={title}
      footer={footer}
      width={finalWidth}
      height={finalHeight}
      closable={closable}
      mask={useMask}
      maskClosable={maskClosable}
      keyboard={keyboard}
      zIndex={zIndex}
      className={className}
      style={style}
      contentWrapperStyle={contentWrapperStyle}
      headerStyle={headerStyle}
      bodyStyle={bodyStyle}
      footerStyle={footerStyle}
      maskStyle={maskStyle}
      extra={extra}
      drawerStyle={drawerStyle}
      destroyOnClose={destroyOnClose}
      $elevation={elevation}
      $variant={variant}
    >
      {children}
    </StyledDrawer>
  );
};

export default Drawer; 
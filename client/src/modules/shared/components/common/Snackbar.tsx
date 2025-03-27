import React, { ReactNode, useEffect } from 'react';
import { message } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import styled from '@emotion/styled';

// تعریف تایپ MessageType به صورت دستی
export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

// برای سازگاری با تایپ‌های Material UI
export type SnackbarVariant = 'default' | 'error' | 'success' | 'warning' | 'info';
export type SnackbarPosition = 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left';
export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';

export interface SnackbarProps {
  open?: boolean;
  autoHideDuration?: number;
  message?: ReactNode;
  children?: ReactNode;
  onClose?: (event: React.SyntheticEvent<any, Event>, reason: string) => void;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  action?: ReactNode;
  className?: string;
  variant?: SnackbarVariant;
  ContentProps?: React.HTMLAttributes<HTMLDivElement>;
  key?: string;
  style?: React.CSSProperties;
  disableWindowBlurListener?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  resumeHideDuration?: number;
  TransitionComponent?: React.ComponentType<any>;
  TransitionProps?: any;
  content?: ReactNode;
  type?: MessageType;
  duration?: number | null;
}

// تبدیل variant به نوع message در Ant Design
const variantToType = (variant: SnackbarVariant): MessageType => {
  switch (variant) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
};

// استایل‌های سفارشی برای محتوای پیام
const StyledContent = styled.div<{
  $variant?: SnackbarVariant;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.$variant === 'error' ? '#ff4d4f' : props.$variant === 'success' ? '#52c41a' : props.$variant === 'warning' ? '#faad14' : '#1890ff'};
  
  span:last-child {
    margin-right: 12px;
  }
`;

// تنظیم کانفیگ برای پیام
message.config({
  maxCount: 3,
  top: 24,
  duration: 3,
  rtl: document.dir === 'rtl',
});

/**
 * کامپوننت Snackbar با استفاده از message از Ant Design
 * این کامپوننت جایگزینی برای Snackbar از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Snackbar
 *   open={open}
 *   autoHideDuration={6000}
 *   message="این یک پیام اطلاع‌رسانی است"
 *   variant="success"
 *   onClose={handleClose}
 * />
 * ```
 * 
 * یا با استفاده از توابع استاتیک:
 * ```jsx
 * const showSuccess = () => {
 *   Snackbar.success("عملیات با موفقیت انجام شد");
 * };
 * 
 * const showError = () => {
 *   Snackbar.error("خطایی رخ داده است", 5);
 * };
 * ```
 */
const Snackbar = ({
  open = false,
  autoHideDuration = 3000,
  message: messageText,
  children,
  onClose,
  anchorOrigin,
  action,
  className,
  variant = 'default',
  ContentProps,
  key,
  style,
  disableWindowBlurListener,
  onClick,
  resumeHideDuration,
  TransitionComponent,
  TransitionProps,
  content,
  type,
  duration,
}: SnackbarProps) => {
  // استفاده از API های جدید message از Ant Design
  const finalType = type || variantToType(variant);
  const finalDuration = duration ?? (autoHideDuration ? autoHideDuration / 1000 : 3);
  const finalContent = content || children || messageText;
  
  const messageHolderRef = React.useRef<{ close: () => void } | null>(null);
  
  useEffect(() => {
    // نمایش پیام در زمان باز شدن
    if (open) {
      // ساخت محتوای با استایل برای پیام
      const styledContent = (
        <StyledContent $variant={variant} onClick={onClick} className={className} style={style} {...ContentProps}>
          {finalContent}
          {action && <span>{action}</span>}
        </StyledContent>
      );
      
      // آماده‌سازی کانفیگ برای تنظیم موقعیت پیام
      if (anchorOrigin) {
        const { vertical, horizontal } = anchorOrigin;
        // بجای تنظیم مستقیم message.config، یک getContainer با موقعیت‌دهی استفاده می‌کنیم
        
        // ایجاد یک کانتینر سفارشی برای پیام‌ها
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.zIndex = '1000';
        
        if (vertical === 'top') {
          container.style.top = '24px';
        } else {
          container.style.bottom = '24px';
        }
        
        if (horizontal === 'left') {
          container.style.left = '24px';
        } else if (horizontal === 'right') {
          container.style.right = '24px';
        } else {
          container.style.left = '50%';
          container.style.transform = 'translateX(-50%)';
        }
        
        document.body.appendChild(container);
        
        // کانفیگ صحیح برای message
        message.config({
          top: vertical === 'top' ? 24 : undefined,
          getContainer: () => container
        });
      }
      
      // فانکشن callback مشترک برای همه پیام‌ها
      const handleAfterClose = () => {
        onClose?.({} as React.SyntheticEvent, 'timeout');
      };
      
      // نمایش پیام بر اساس نوع
      switch (finalType) {
        case 'success':
          const successMsg = message.success(styledContent, finalDuration, handleAfterClose);
          messageHolderRef.current = { 
            close: typeof successMsg === 'function' 
              ? successMsg 
              : () => message.destroy()
          };
          break;
        case 'error':
          const errorMsg = message.error(styledContent, finalDuration, handleAfterClose);
          messageHolderRef.current = { 
            close: typeof errorMsg === 'function' 
              ? errorMsg 
              : () => message.destroy()
          };
          break;
        case 'warning':
          const warningMsg = message.warning(styledContent, finalDuration, handleAfterClose);
          messageHolderRef.current = { 
            close: typeof warningMsg === 'function' 
              ? warningMsg 
              : () => message.destroy()
          };
          break;
        case 'loading':
          const loadingMsg = message.loading(styledContent, finalDuration, handleAfterClose);
          messageHolderRef.current = { 
            close: typeof loadingMsg === 'function' 
              ? loadingMsg 
              : () => message.destroy()
          };
          break;
        default: // info
          const infoMsg = message.info(styledContent, finalDuration, handleAfterClose);
          messageHolderRef.current = { 
            close: typeof infoMsg === 'function' 
              ? infoMsg 
              : () => message.destroy() 
          };
          break;
      }
    }
    
    // پاکسازی پیام در زمان از بین رفتن کامپوننت یا بسته شدن
    return () => {
      if (messageHolderRef.current) {
        messageHolderRef.current.close();
        messageHolderRef.current = null;
      }
    };
  }, [
    open, 
    finalType, 
    finalDuration, 
    finalContent, 
    onClose, 
    anchorOrigin, 
    variant, 
    className, 
    style, 
    onClick, 
    action, 
    ContentProps
  ]);
  
  // کامپوننت رندر نشده و فقط از طریق effect عمل می‌کند
  return null;
};

// متدهای استاتیک برای نمایش پیام‌ها
Snackbar.success = (content: React.ReactNode, duration?: number) => {
  message.success(content, duration);
};

Snackbar.error = (content: React.ReactNode, duration?: number) => {
  message.error(content, duration);
};

Snackbar.info = (content: React.ReactNode, duration?: number) => {
  message.info(content, duration);
};

Snackbar.warning = (content: React.ReactNode, duration?: number) => {
  message.warning(content, duration);
};

Snackbar.loading = (content: React.ReactNode, duration?: number) => {
  return message.loading(content, duration);
};

export default Snackbar; 
import React, { ReactNode } from 'react';
import { Modal as AntModal } from 'antd';
import styled from '@emotion/styled';

export interface ModalProps {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  width?: number | string;
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  destroyOnClose?: boolean;
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  closeIcon?: ReactNode;
  okText?: string;
  cancelText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  okType?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  confirmLoading?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  scroll?: 'paper' | 'body';
  disableEscapeKeyDown?: boolean;
  disableBackdropClick?: boolean;
}

// تعیین maxWidth برای مطابقت با Material UI
const getMaxWidth = (maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false): number => {
  switch (maxWidth) {
    case 'xs':
      return 360;
    case 'sm':
      return 600;
    case 'md':
      return 960;
    case 'lg':
      return 1280;
    case 'xl':
      return 1920;
    default:
      return 520; // مقدار پیش فرض Ant Design
  }
};

const StyledModal = styled(AntModal)<{ $fullWidth?: boolean; $maxWidth?: string | false }>`
  ${props => props.$fullWidth && `
    .ant-modal-content {
      width: 100%;
    }
  `}
`;

/**
 * کامپوننت Modal با استفاده از Modal از Ant Design
 * این کامپوننت جایگزینی برای Modal از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Modal
 *   open={open}
 *   onClose={handleClose}
 *   title="عنوان مودال"
 *   footer={[
 *     <Button key="back" onClick={handleClose}>انصراف</Button>,
 *     <Button key="submit" type="primary" onClick={handleSubmit}>تایید</Button>,
 *   ]}
 *   maxWidth="md"
 *   centered
 * >
 *   <p>محتوای مودال در اینجا قرار می‌گیرد.</p>
 * </Modal>
 * ```
 */
const Modal: React.FC<ModalProps> = ({
  children,
  open = false,
  onClose,
  title,
  footer,
  width,
  centered = false,
  closable = true,
  maskClosable = true,
  keyboard = true,
  destroyOnClose = false,
  zIndex,
  className,
  style,
  bodyStyle,
  headerStyle,
  footerStyle,
  closeIcon,
  okText = 'تایید',
  cancelText = 'انصراف',
  okButtonProps,
  cancelButtonProps,
  okType = 'primary',
  confirmLoading = false,
  fullWidth = false,
  maxWidth = 'sm',
  scroll,
  disableEscapeKeyDown = false,
  disableBackdropClick = false,
}) => {
  // تعیین پهنای نهایی مودال
  const finalWidth = width || (maxWidth ? getMaxWidth(maxWidth) : undefined);
  
  // تبدیل پراپرتی‌های Material UI به پراپرتی‌های مناسب برای Ant Design
  const handleClose = onClose ? () => onClose() : undefined;
  const handleCancel = handleClose;
  
  // تنظیم پراپرتی‌های بستن مودال بر اساس پراپرتی‌های محدودیت
  const canKeyboard = !disableEscapeKeyDown && keyboard;
  const canMaskClose = !disableBackdropClick && maskClosable;
  
  // تنظیم نوع دکمه تأیید
  let finalOkType = okType;
  // تبدیل ghost به primary برای سازگاری
  if (finalOkType === 'ghost') {
    finalOkType = 'primary';
  }
  
  return (
    <StyledModal
      open={open}
      onCancel={handleCancel}
      title={title}
      footer={footer}
      width={finalWidth}
      centered={centered}
      closable={closable}
      maskClosable={canMaskClose}
      keyboard={canKeyboard}
      destroyOnClose={destroyOnClose}
      zIndex={zIndex}
      className={className}
      style={style}
      bodyStyle={bodyStyle}
      closeIcon={closeIcon}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      okType={finalOkType}
      confirmLoading={confirmLoading}
      $fullWidth={fullWidth}
      $maxWidth={maxWidth}
    >
      {children}
    </StyledModal>
  );
};

export default Modal; 
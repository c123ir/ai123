import React, { ReactNode } from 'react';
import { Modal, Typography, Button, Space, Divider } from 'antd';
import styled from '@emotion/styled';

interface DialogProps {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  width?: number | string;
  footer?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const StyledModal = styled(Modal)`
  .ant-modal-header {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  .ant-modal-title {
    font-size: 18px;
    font-weight: 600;
  }
  
  .ant-modal-body {
    padding: 24px;
  }
  
  .ant-modal-footer {
    border-top: none;
    padding-top: 0;
  }
`;

const DialogTitle = styled(Typography.Title)`
  margin-bottom: 16px !important;
  font-weight: 600 !important;
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
`;

/**
 * کامپوننت دیالوگ عمومی با استفاده از Modal از Ant Design
 * این کامپوننت جایگزینی برای Dialog از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Dialog 
 *   title="عنوان دیالوگ"
 *   open={open}
 *   onClose={handleClose}
 *   onConfirm={handleConfirm}
 * >
 *   <p>محتوای دیالوگ در اینجا قرار می‌گیرد</p>
 * </Dialog>
 * ```
 */
const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  open,
  onClose,
  onConfirm,
  confirmText = 'تایید',
  cancelText = 'انصراف',
  width = 520,
  footer,
  maxWidth,
  fullWidth,
}) => {
  // تبدیل maxWidth به عرض پیکسلی مناسب
  const getWidthFromMaxWidth = (): number | string => {
    if (!maxWidth) return width;
    
    switch (maxWidth) {
      case 'xs': return 360;
      case 'sm': return 520;
      case 'md': return 720;
      case 'lg': return 1024;
      case 'xl': return 1280;
      default: return width;
    }
  };

  const modalWidth = getWidthFromMaxWidth();
  
  // اگر fullWidth فعال باشد، از حداکثر عرض در دسترس استفاده می‌کنیم
  const finalWidth = fullWidth ? '90%' : modalWidth;

  const defaultFooter = (
    <DialogFooter>
      <Space>
        <Button onClick={onClose}>{cancelText}</Button>
        {onConfirm && (
          <Button type="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Space>
    </DialogFooter>
  );

  return (
    <StyledModal
      title={<DialogTitle level={4}>{title}</DialogTitle>}
      open={open}
      onCancel={onClose}
      width={finalWidth}
      centered
      footer={footer !== undefined ? footer : defaultFooter}
      maskClosable={false}
      closeIcon={<span />}
    >
      {children}
    </StyledModal>
  );
};

export default Dialog; 
import React, { ReactNode } from 'react';
import { Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

interface DialogTitleProps {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

const StyledDialogTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 0;
  margin-bottom: 0 !important;
`;

const Title = styled(Typography.Title)`
  margin: 0 !important;
  font-weight: 600;
  flex: 1;
`;

const CloseButton = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * کامپوننت DialogTitle برای استفاده در داخل کامپوننت Dialog
 * این کامپوننت جایگزینی برای DialogTitle از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Dialog open={open} onClose={handleClose}>
 *   <DialogTitle onClose={handleClose}>عنوان دیالوگ</DialogTitle>
 *   <DialogContent>
 *     <p>محتوای دیالوگ</p>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogTitle: React.FC<DialogTitleProps> = ({ 
  children,
  onClose,
  className 
}) => {
  return (
    <StyledDialogTitle className={className}>
      <Title level={4}>{children}</Title>
      {onClose && (
        <CloseButton 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose}
          aria-label="بستن"
        />
      )}
    </StyledDialogTitle>
  );
};

export default DialogTitle; 
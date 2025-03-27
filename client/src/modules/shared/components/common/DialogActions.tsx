import React, { ReactNode } from 'react';
import { Space } from 'antd';
import styled from '@emotion/styled';

interface DialogActionsProps {
  children: ReactNode;
  className?: string;
}

const StyledDialogActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 24px 16px;
`;

/**
 * کامپوننت DialogActions برای استفاده در داخل کامپوننت Dialog
 * این کامپوننت جایگزینی برای DialogActions از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Dialog open={open} onClose={handleClose} title="عنوان">
 *   <DialogContent>
 *     <p>محتوای دیالوگ</p>
 *   </DialogContent>
 *   <DialogActions>
 *     <Button onClick={handleClose}>بستن</Button>
 *     <Button type="primary" onClick={handleConfirm}>تایید</Button>
 *   </DialogActions>
 * </Dialog>
 * ```
 */
const DialogActions: React.FC<DialogActionsProps> = ({ 
  children,
  className 
}) => {
  return (
    <StyledDialogActions className={className}>
      <Space size={8}>
        {children}
      </Space>
    </StyledDialogActions>
  );
};

export default DialogActions; 
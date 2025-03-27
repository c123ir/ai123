import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface DialogContentProps {
  children: ReactNode;
  dividers?: boolean;
  className?: string;
}

const StyledDialogContent = styled.div<{ dividers?: boolean }>`
  padding: 16px 24px;
  overflow-y: auto;
  
  ${props => props.dividers && `
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding-top: 20px;
    padding-bottom: 20px;
    
    @media (prefers-color-scheme: dark) {
      border-top-color: rgba(255, 255, 255, 0.12);
      border-bottom-color: rgba(255, 255, 255, 0.12);
    }
  `}
`;

/**
 * کامپوننت DialogContent برای استفاده در داخل کامپوننت Dialog
 * این کامپوننت جایگزینی برای DialogContent از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Dialog open={open} onClose={handleClose} title="عنوان">
 *   <DialogContent>
 *     <p>محتوای دیالوگ</p>
 *   </DialogContent>
 *   <DialogActions>
 *     <Button onClick={handleClose}>بستن</Button>
 *   </DialogActions>
 * </Dialog>
 * ```
 */
const DialogContent: React.FC<DialogContentProps> = ({ 
  children, 
  dividers = false,
  className 
}) => {
  return (
    <StyledDialogContent dividers={dividers} className={className}>
      {children}
    </StyledDialogContent>
  );
};

export default DialogContent; 
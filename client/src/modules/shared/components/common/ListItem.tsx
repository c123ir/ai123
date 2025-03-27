import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

export interface ListItemProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  button?: boolean;
  dense?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
}

const StyledListItem = styled.div<{ 
  $button?: boolean; 
  $dense?: boolean; 
  $disabled?: boolean;
  $disableGutters?: boolean;
  $divider?: boolean;
  $selected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: right;
  position: relative;
  padding: ${props => props.$disableGutters ? '0' : '8px 16px'};
  min-height: ${props => props.$dense ? '36px' : '48px'};
  box-sizing: border-box;
  text-decoration: none;
  cursor: ${props => props.$button ? 'pointer' : 'default'};
  
  ${props => props.$button && `
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      
      @media (prefers-color-scheme: dark) {
        background-color: rgba(255, 255, 255, 0.08);
      }
    }
  `}
  
  ${props => props.$disabled && `
    opacity: 0.5;
    pointer-events: none;
  `}
  
  ${props => props.$divider && `
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    
    @media (prefers-color-scheme: dark) {
      border-bottom-color: rgba(255, 255, 255, 0.12);
    }
  `}
  
  ${props => props.$selected && `
    background-color: rgba(0, 124, 255, 0.08);
    
    @media (prefers-color-scheme: dark) {
      background-color: rgba(24, 144, 255, 0.16);
    }
  `}
`;

/**
 * کامپوننت ListItem برای استفاده در List
 * این کامپوننت جایگزینی برای ListItem از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <List>
 *   <ListItem button selected={true}>
 *     <ListItemIcon>
 *       <HomeOutlined />
 *     </ListItemIcon>
 *     <ListItemText primary="عنوان" />
 *   </ListItem>
 * </List>
 * ```
 */
const ListItem: React.FC<ListItemProps> = ({ 
  children, 
  className, 
  style,
  button = false,
  dense = false,
  disabled = false,
  disableGutters = false,
  divider = false,
  onClick,
  selected = false,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick && !disabled) {
      onClick(event);
    }
  };

  return (
    <StyledListItem 
      className={className} 
      style={style}
      $button={button}
      $dense={dense}
      $disabled={disabled}
      $disableGutters={disableGutters}
      $divider={divider}
      $selected={selected}
      onClick={button ? handleClick : undefined}
    >
      {children}
    </StyledListItem>
  );
};

export default ListItem; 
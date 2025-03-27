import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

export interface ListProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  component?: React.ElementType;
  dense?: boolean;
  disablePadding?: boolean;
  subheader?: ReactNode;
}

const StyledList = styled.ul<{ $dense?: boolean; $disablePadding?: boolean }>`
  margin: 0;
  padding: ${props => props.$disablePadding ? '0' : '8px 0'};
  list-style: none;
  position: relative;
  background-color: transparent;
`;

const Subheader = styled.div`
  font-size: 0.875rem;
  line-height: 48px;
  color: rgba(0, 0, 0, 0.6);
  padding: 0 16px;
  
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.7);
  }
`;

/**
 * کامپوننت List با استفاده از Ant Design
 * این کامپوننت جایگزینی برای List از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <List subheader={<div>عنوان لیست</div>}>
 *   <ListItem>
 *     <ListItemText primary="آیتم اول" />
 *   </ListItem>
 *   <ListItem>
 *     <ListItemText primary="آیتم دوم" />
 *   </ListItem>
 * </List>
 * ```
 */
const List: React.FC<ListProps> = ({ 
  children, 
  className, 
  style,
  component: Component = 'ul',
  dense = false,
  disablePadding = false,
  subheader,
}) => {
  return (
    <StyledList
      as={Component}
      className={className}
      style={style}
      $dense={dense}
      $disablePadding={disablePadding}
    >
      {subheader && <Subheader>{subheader}</Subheader>}
      {children}
    </StyledList>
  );
};

export default List; 
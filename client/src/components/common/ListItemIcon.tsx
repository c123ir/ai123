import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

export interface ListItemIconProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StyledListItemIcon = styled.div`
  color: rgba(0, 0, 0, 0.6);
  display: inline-flex;
  min-width: 40px;
  flex-shrink: 0;
  margin-left: 8px;
  
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.6);
  }
  
  .ant-menu-item-selected & {
    color: #1890ff;
  }
  
  svg {
    font-size: 20px;
  }
`;

/**
 * کامپوننت ListItemIcon برای استفاده در Menu و List
 * این کامپوننت جایگزینی برای ListItemIcon از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Menu>
 *   <Menu.Item>
 *     <ListItemIcon>
 *       <HomeOutlined />
 *     </ListItemIcon>
 *     خانه
 *   </Menu.Item>
 * </Menu>
 * ```
 */
const ListItemIcon: React.FC<ListItemIconProps> = ({ 
  children, 
  className, 
  style 
}) => {
  return (
    <StyledListItemIcon className={className} style={style}>
      {children}
    </StyledListItemIcon>
  );
};

export default ListItemIcon; 
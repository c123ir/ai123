import React, { ReactNode } from 'react';
import { Typography } from 'antd';
import styled from '@emotion/styled';

export interface ListItemTextProps {
  primary?: ReactNode;
  secondary?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  inset?: boolean;
}

const { Text } = Typography;

const StyledListItemText = styled.div<{ $inset?: boolean }>`
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 4px;
  margin-bottom: 4px;
  ${props => props.$inset && 'padding-right: 48px;'}
`;

const PrimaryText = styled(Text)`
  display: block;
  font-size: 14px;
`;

const SecondaryText = styled(Text)`
  display: block;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  
  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.6);
  }
`;

/**
 * کامپوننت ListItemText برای استفاده در Menu و List
 * این کامپوننت جایگزینی برای ListItemText از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Menu>
 *   <Menu.Item>
 *     <ListItemIcon>
 *       <HomeOutlined />
 *     </ListItemIcon>
 *     <ListItemText 
 *       primary="عنوان اصلی" 
 *       secondary="توضیحات تکمیلی" 
 *     />
 *   </Menu.Item>
 * </Menu>
 * ```
 */
const ListItemText: React.FC<ListItemTextProps> = ({ 
  primary, 
  secondary, 
  className, 
  style,
  inset = false,
}) => {
  return (
    <StyledListItemText 
      className={className} 
      style={style}
      $inset={inset}
    >
      {primary && <PrimaryText>{primary}</PrimaryText>}
      {secondary && <SecondaryText type="secondary">{secondary}</SecondaryText>}
    </StyledListItemText>
  );
};

export default ListItemText; 
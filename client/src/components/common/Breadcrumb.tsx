import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  homeIcon?: boolean;
}

export interface BreadcrumbItem {
  key?: string;
  title: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const StyledBreadcrumb = styled(AntBreadcrumb)`
  margin-bottom: 16px;
  
  .ant-breadcrumb-link {
    display: flex;
    align-items: center;
    
    a {
      color: #1890ff;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .ant-breadcrumb-separator {
    margin: 0 8px;
  }
  
  .home-icon {
    margin-left: 4px;
  }
`;

/**
 * کامپوننت Breadcrumb با استفاده از Breadcrumb از Ant Design
 * این کامپوننت جایگزینی برای Breadcrumb از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Breadcrumb
 *   items={[
 *     { title: 'خانه', href: '/' },
 *     { title: 'کاربران', href: '/users' },
 *     { title: 'پروفایل', href: '/users/profile' },
 *   ]}
 *   homeIcon
 * />
 * ```
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className,
  style,
  homeIcon = false,
}) => {
  return (
    <StyledBreadcrumb
      separator={separator}
      className={className}
      style={style}
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        
        let itemTitle = (
          <>
            {isFirst && homeIcon && <HomeOutlined className="home-icon" />}
            {item.title}
          </>
        );

        if (item.href && !isLast) {
          itemTitle = <Link to={item.href} onClick={item.onClick}>{itemTitle}</Link>;
        }

        return (
          <AntBreadcrumb.Item key={item.key || index}>
            {itemTitle}
          </AntBreadcrumb.Item>
        );
      })}
    </StyledBreadcrumb>
  );
};

export default Breadcrumb; 
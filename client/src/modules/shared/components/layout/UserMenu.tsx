import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Divider, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  GiftOutlined,
  TransactionOutlined,
  SettingOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { List, ListItem, ListItemIcon, ListItemText } from '../../components/common';

// استایل کاستوم
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

// آیتم‌های منوی کاربر
const menuItems = [
  { 
    title: 'داشبورد', 
    icon: <DashboardOutlined style={{ color: '#1890ff' }} />, 
    path: '/user/dashboard' 
  },
  { 
    title: 'پروفایل من', 
    icon: <UserOutlined style={{ color: '#1890ff' }} />, 
    path: '/user/profile' 
  },
  { 
    title: 'توکن‌های من', 
    icon: <GiftOutlined style={{ color: '#1890ff' }} />, 
    path: '/user/tokens' 
  },
  { 
    title: 'تراکنش‌های من', 
    icon: <TransactionOutlined style={{ color: '#1890ff' }} />, 
    path: '/user/transactions' 
  },
  { 
    title: 'تنظیمات', 
    icon: <SettingOutlined style={{ color: '#1890ff' }} />, 
    path: '/user/settings' 
  },
];

// پراپس‌های کامپوننت منوی کاربر
interface UserMenuProps {
  onItemClick?: (path: string) => void;
  userName?: string;
  userType?: string;
  avatarUrl?: string;
}

/**
 * کامپوننت منوی کاربر
 * این کامپوننت آیتم‌های منوی کناری کاربر را نمایش می‌دهد
 */
const UserMenu: React.FC<UserMenuProps> = ({
  onItemClick,
  userName = 'محمد احمدی',
  userType = 'کاربر عادی',
  avatarUrl = '/static/images/avatar/1.jpg',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // مدیریت کلیک روی آیتم منو
  const handleItemClick = (path: string) => {
    if (onItemClick) {
      onItemClick(path);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <UserInfoContainer>
        <Avatar 
          size={64}
          style={{ marginBottom: 8 }}
          src={avatarUrl}
          alt={userName}
        />
        <Typography.Text strong style={{ fontSize: 16 }}>
          {userName}
        </Typography.Text>
        <Typography.Text type="secondary">
          {userType}
        </Typography.Text>
      </UserInfoContainer>
      <Divider style={{ margin: '0 0 8px 0' }} />
      <List disablePadding>
        {menuItems.map((item) => (
          <ListItem 
            key={item.path} 
            button 
            selected={location.pathname === item.path}
            onClick={() => handleItemClick(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {location.pathname === item.path && (
              <RightOutlined style={{ color: '#1890ff', fontSize: 16 }} />
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UserMenu; 
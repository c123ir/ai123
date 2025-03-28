import React from 'react';
import { Layout, Avatar, Dropdown, Badge, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuProps } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/authSlice';
import { RootState } from '../../../../store';

const { Header } = Layout;

/**
 * کامپوننت هدر پنل کاربر
 */
const UserHeader: React.FC = () => {
  const { darkMode, toggleDirection, direction } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // دریافت اطلاعات کاربر از ریداکس
  const user = useSelector((state: RootState) => state.auth.user);
  
  // خروج از سیستم
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  // آیتم‌های منوی کاربر
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'پروفایل کاربری',
      onClick: () => navigate('/user/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'تنظیمات',
      onClick: () => navigate('/user/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'خروج از سیستم',
      onClick: handleLogout,
    },
  ];
  
  return (
    <Header
      style={{
        padding: '0 24px',
        background: darkMode ? '#001529' : '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div>
        {/* این فضا برای اجزای سمت راست هدر است */}
      </div>
      
      <Space>
        <Badge count={3}>
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: '18px', color: darkMode ? '#fff' : '#001529' }} />}
          />
        </Badge>
        
        <Button
          type="text"
          icon={<QuestionCircleOutlined style={{ fontSize: '18px', color: darkMode ? '#fff' : '#001529' }} />}
        />
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
        >
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} src={user?.avatar} />
            <span style={{ marginRight: 8, marginLeft: 8, color: darkMode ? '#fff' : '#001529' }}>
              {user?.fullName || 'کاربر سیستم'}
            </span>
          </div>
        </Dropdown>
        
        <Button
          type="text"
          onClick={toggleDirection}
          style={{ marginRight: 8, marginLeft: 8 }}
        >
          {direction === 'rtl' ? 'EN' : 'FA'}
        </Button>
      </Space>
    </Header>
  );
};

export default UserHeader; 
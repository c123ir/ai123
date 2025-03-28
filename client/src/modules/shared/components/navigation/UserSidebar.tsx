import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  KeyOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';

const { Sider } = Layout;

/**
 * کامپوننت منوی کناری پنل کاربر
 */
const UserSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { darkMode, direction } = useTheme();
  const location = useLocation();
  
  // آیتم‌های منو
  const menuItems = [
    {
      key: '/user/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/user/dashboard">داشبورد</Link>,
    },
    {
      key: '/user/profile',
      icon: <UserOutlined />,
      label: <Link to="/user/profile">پروفایل</Link>,
    },
    {
      key: '/user/settings',
      icon: <SettingOutlined />,
      label: <Link to="/user/settings">تنظیمات</Link>,
      children: [
        {
          key: '/user/settings/profile',
          label: <Link to="/user/settings/profile">اطلاعات شخصی</Link>,
        },
        {
          key: '/user/settings/security',
          label: <Link to="/user/settings/security">امنیت</Link>,
        },
        {
          key: '/user/settings/notifications',
          label: <Link to="/user/settings/notifications">اعلان‌ها</Link>,
        }
      ]
    },
    {
      key: '/user/tokens',
      icon: <KeyOutlined />,
      label: <Link to="/user/tokens">توکن‌ها</Link>,
    },
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">صفحه اصلی</Link>,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme={darkMode ? 'dark' : 'light'}
      width={240}
      style={{
        position: 'fixed',
        [direction === 'rtl' ? 'right' : 'left']: 0,
        zIndex: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <div style={{ 
        height: '64px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '16px'
      }}>
        <h3 style={{ 
          color: darkMode ? '#fff' : '#001529', 
          margin: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {collapsed ? 'ک۱۲۳' : 'پنل کاربری'}
        </h3>
      </div>
      
      <Menu
        theme={darkMode ? 'dark' : 'light'}
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={['/user/settings']}
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default UserSidebar; 
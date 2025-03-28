// src/components/layout/UserLayout.tsx - لایه اصلی پنل کاربران

import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Badge } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  KeyOutlined,
  ProfileOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';

const { Header, Sider, Content } = Layout;

/**
 * کامپوننت لایه کاربر
 * این کامپوننت شامل هدر، منوی کناری و محتوای اصلی برنامه است
 */
const UserLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { direction, toggleDirection, darkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // تغییر وضعیت منوی کناری
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // مدیریت کلیک بر روی آیتم‌های منو
  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'dashboard':
        navigate('/user/dashboard');
        break;
      case 'profile':
        navigate('/user/profile');
        break;
      case 'tokens':
        navigate('/user/tokens');
        break;
      case 'settings':
        navigate('/user/settings');
        break;
      case 'logout':
        // خروج از سیستم
        dispatch(logout());
        navigate('/login');
        break;
      case 'home':
        navigate('/');
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'داشبورد',
    },
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'پروفایل',
    },
    {
      key: 'tokens',
      icon: <KeyOutlined />,
      label: 'توکن‌ها',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'تنظیمات',
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'صفحه اصلی',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'پروفایل کاربری',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'تنظیمات',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'خروج از سیستم',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        theme={darkMode ? 'dark' : 'light'}
        style={{
          position: 'fixed',
          [direction === 'rtl' ? 'right' : 'left']: 0,
          zIndex: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: darkMode ? '#fff' : '#001529', margin: 0 }}>
            {collapsed ? 'ک۱۲۳' : 'کاربر سیستم'}
          </h3>
        </div>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout style={{ marginRight: direction === 'rtl' ? (collapsed ? 80 : 240) : 0, marginLeft: direction === 'ltr' ? (collapsed ? 80 : 240) : 0, transition: 'all 0.2s' }}>
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
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            style: { fontSize: '18px', color: darkMode ? '#fff' : '#001529' },
          })}
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Badge count={3} style={{ marginLeft: 20, marginRight: 20 }}>
              <BellOutlined style={{ fontSize: '20px', color: darkMode ? '#fff' : '#001529' }} />
            </Badge>
            
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: ({ key }) => handleMenuClick(key),
              }}
              placement="bottomRight"
            >
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginRight: 8, marginLeft: 8, color: darkMode ? '#fff' : '#001529' }}>
                  کاربر سیستم
                </span>
              </div>
            </Dropdown>
            
            <span
              onClick={toggleDirection}
              style={{ marginRight: 16, marginLeft: 16, cursor: 'pointer', color: darkMode ? '#fff' : '#001529' }}
            >
              {direction === 'rtl' ? 'EN' : 'FA'}
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px',
            background: darkMode ? '#141414' : '#fff',
            minHeight: 280,
            borderRadius: '4px',
            padding: '24px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout; 
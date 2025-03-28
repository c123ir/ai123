import React, { useState, useEffect, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as AntLayout, Menu, Avatar, Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import { Typography, Badge } from './common';
import rtlDetect from 'rtl-detect';

const { Header, Sider, Content, Footer } = AntLayout;

interface LayoutProps {
  children: ReactNode;
  sidebarContent?: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  className?: string;
}

/**
 * کامپوننت اصلی لایوت
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  sidebarContent,
  headerContent,
  footerContent,
  className = '',
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const { direction, setDirection, mode } = useTheme();
  const navigate = useNavigate();

  // تشخیص اینکه آیا دستگاه موبایل است
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // تعیین زبان و جهت صفحه
  useEffect(() => {
    document.documentElement.lang = rtlDetect.getLangDir() || 'fa';
  }, []);

  // تغییر وضعیت منوی کناری
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'dashboard':
        navigate('/');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        // شبیه‌سازی خروج از سیستم
        navigate('/login');
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
      icon: <UserOutlined />,
      label: 'پروفایل',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'تنظیمات',
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
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        theme={mode === 'dark' ? 'dark' : 'light'}
        style={{
          position: 'fixed',
          [direction === 'rtl' ? 'right' : 'left']: 0,
          zIndex: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography
            variant="h5"
            style={{ color: mode === 'dark' ? '#fff' : '#001529', margin: 0 }}
          >
            {collapsed ? 'LOGO' : 'سیستم مدیریت'}
          </Typography>
        </div>
        <Menu
          theme={mode === 'dark' ? 'dark' : 'light'}
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <AntLayout style={{ marginRight: direction === 'rtl' ? (collapsed ? 80 : 240) : 0, marginLeft: direction === 'ltr' ? (collapsed ? 80 : 240) : 0, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: mode === 'dark' ? '#001529' : '#fff',
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
            style: { fontSize: '18px', color: mode === 'dark' ? '#fff' : '#001529' },
          })}
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Badge count={5} style={{ marginLeft: 20, marginRight: 20 }}>
              <BellOutlined style={{ fontSize: '20px', color: mode === 'dark' ? '#fff' : '#001529' }} />
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
                <span style={{ marginRight: 8, marginLeft: 8, color: mode === 'dark' ? '#fff' : '#001529' }}>
                  کاربر سیستم
                </span>
              </div>
            </Dropdown>
            
            <span
              onClick={() => setDirection(direction === 'rtl' ? 'ltr' : 'rtl')}
              style={{ marginRight: 16, marginLeft: 16, cursor: 'pointer', color: mode === 'dark' ? '#fff' : '#001529' }}
            >
              {direction === 'rtl' ? 'EN' : 'FA'}
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px',
            background: mode === 'dark' ? '#141414' : '#fff',
            minHeight: 280,
            borderRadius: '4px',
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 
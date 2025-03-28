import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Avatar, Dropdown, theme as antTheme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuOutlined,
  HomeOutlined,
  DashboardOutlined,
  ProjectOutlined,
  TeamOutlined,
  TokenOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  BulbOutlined,
  LogoutOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';
import logo from '../../../assets/logo.svg';
import logoText from '../../../assets/logo-text.svg';

const { Header, Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { darkMode, toggleDarkMode, direction } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = antTheme.useToken();

  // شبیه‌سازی وضعیت احراز هویت (در پروژه واقعی از کانتکست یا ریداکس استفاده می‌شود)
  const isAuthenticated = true;
  const isAdmin = true;

  // شبیه‌سازی اطلاعات کاربر
  const userInfo = {
    name: 'علی محمدی',
    avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
  };

  // باز/بسته کردن منوی موبایل
  const toggleMobileDrawer = () => {
    setMobileDrawerVisible(!mobileDrawerVisible);
  };

  // بستن منوی موبایل (بعد از انتخاب گزینه)
  const closeMobileDrawer = () => {
    setMobileDrawerVisible(false);
  };

  // خروج کاربر
  const handleLogout = () => {
    // در پروژه واقعی، اینجا عملیات خروج انجام می‌شود
    navigate('/auth/login');
  };

  // آیتم‌های منوی کاربر
  const userMenuItems = [
    {
      key: 'profile',
      label: <Link to="/profile">پروفایل</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: <Link to="/user/settings">تنظیمات حساب</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'خروج',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  // آیتم‌های اصلی منو
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">صفحه اصلی</Link>,
    },
    isAuthenticated && {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">داشبورد</Link>,
    },
    {
      key: '/explore',
      icon: <BulbOutlined />,
      label: <Link to="/explore">اکتشاف</Link>,
    },
    isAuthenticated && {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: <Link to="/projects">پروژه‌ها</Link>,
    },
    {
      key: '/advisors',
      icon: <TeamOutlined />,
      label: <Link to="/advisors">مشاوران</Link>,
    },
    isAuthenticated && {
      key: '/tokens',
      icon: <TokenOutlined />,
      label: <Link to="/tokens">توکن‌ها</Link>,
    },
    isAuthenticated && {
      key: '/messages',
      icon: <MessageOutlined />,
      label: <Link to="/messages">پیام‌ها</Link>,
    },
    isAdmin && {
      key: '/admin',
      icon: <SettingOutlined />,
      label: <Link to="/admin">مدیریت</Link>,
    },
  ].filter(Boolean);

  return (
    <Layout style={{ minHeight: '100vh', direction: direction }}>
      {/* منوی کناری دسکتاپ */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme={darkMode ? 'dark' : 'light'}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: direction === 'ltr' ? 0 : 'auto',
          right: direction === 'rtl' ? 0 : 'auto',
          zIndex: 1000,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: 40, marginRight: collapsed ? 0 : 10 }}
          />
          {!collapsed && (
            <img src={logoText} alt="Logo Text" style={{ height: 30 }} />
          )}
        </div>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      {/* منوی موبایل (کشویی) */}
      <Drawer
        title="منو"
        placement={direction === 'rtl' ? 'right' : 'left'}
        onClose={toggleMobileDrawer}
        open={mobileDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <img src={logoText} alt="Logo Text" style={{ height: 30 }} />
        </div>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={closeMobileDrawer}
        />
      </Drawer>

      <Layout
        style={{
          marginLeft: direction === 'ltr' ? (collapsed ? 80 : 250) : 0,
          marginRight: direction === 'rtl' ? (collapsed ? 80 : 250) : 0,
          transition: 'all 0.2s',
        }}
      >
        {/* هدر */}
        <Header
          style={{
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            backgroundColor: token.colorBgContainer,
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleMobileDrawer}
              style={{ marginRight: 16, display: { md: 'none' } }}
            />
            <Button
              type="text"
              icon={<SearchOutlined />}
              style={{ marginRight: 16 }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={<QuestionCircleOutlined />}
              style={{ marginLeft: 8 }}
            />
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ marginLeft: 8 }}
            />
            <Button
              type="text"
              icon={<BulbOutlined />}
              onClick={toggleDarkMode}
              style={{ marginLeft: 16 }}
            />

            {isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <div
                  style={{
                    marginLeft: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar src={userInfo.avatar} />
                  <span style={{ marginRight: 8, marginLeft: 8 }}>
                    {userInfo.name}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <div style={{ marginLeft: 16 }}>
                <Button type="primary" href="/auth/login">
                  ورود
                </Button>
              </div>
            )}
          </div>
        </Header>

        {/* محتوا */}
        <Content
          style={{
            margin: 16,
            padding: 24,
            backgroundColor: token.colorBgContainer,
            borderRadius: 8,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout; 
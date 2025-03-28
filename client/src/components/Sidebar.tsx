import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ProjectOutlined,
  ExperimentOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CommentOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
      }}
      theme="light"
      width={220}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      reverseArrow
    >
      <div className="logo" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link to="/">
          {collapsed ? (
            <img src="/logo-small.png" alt="لوگو" style={{ height: 40 }} />
          ) : (
            <img src="/logo.png" alt="لوگو" style={{ height: 40 }} />
          )}
        </Link>
      </div>
      
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ borderLeft: 0 }}
        defaultOpenKeys={['projects', 'advisors']}
      >
        {currentUser && (
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">داشبورد</Link>
          </Menu.Item>
        )}
        
        <Menu.Item key="/explore" icon={<ExperimentOutlined />}>
          <Link to="/explore">کاوش و یادگیری</Link>
        </Menu.Item>
        
        {currentUser && (
          <>
            <Menu.SubMenu key="projects" icon={<ProjectOutlined />} title="پروژه‌ها">
              <Menu.Item key="/projects">
                <Link to="/projects">لیست پروژه‌ها</Link>
              </Menu.Item>
              <Menu.Item key="/projects/create">
                <Link to="/projects/create">ایجاد پروژه جدید</Link>
              </Menu.Item>
            </Menu.SubMenu>
            
            <Menu.Item key="/messages" icon={<MessageOutlined />}>
              <Link to="/messages">پیام‌ها</Link>
            </Menu.Item>
            
            <Menu.SubMenu key="advisors" icon={<TeamOutlined />} title="مشاوره هوشمند">
              <Menu.Item key="/advisors">
                <Link to="/advisors">لیست مشاوران</Link>
              </Menu.Item>
              <Menu.Item key="/advisors/sessions">
                <Link to="/advisors/sessions">جلسات مشاوره</Link>
              </Menu.Item>
            </Menu.SubMenu>
            
            <Menu.Item key="/tokens" icon={<WalletOutlined />}>
              <Link to="/tokens">کیف پول و توکن‌ها</Link>
            </Menu.Item>
            
            <Menu.Item key="/profile" icon={<UserOutlined />}>
              <Link to="/profile">پروفایل کاربری</Link>
            </Menu.Item>
            
            {currentUser.isAdmin && (
              <Menu.Item key="/admin" icon={<SettingOutlined />}>
                <Link to="/admin">پنل مدیریت</Link>
              </Menu.Item>
            )}
          </>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar; 
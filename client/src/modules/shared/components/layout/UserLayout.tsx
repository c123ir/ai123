// src/components/layout/UserLayout.tsx - لایه اصلی پنل کاربران

import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { UserSidebar, UserHeader } from '../navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const { Content } = Layout;

/**
 * کامپوننت لایه کاربر
 * این کامپوننت لایه اصلی بخش کاربران را تعریف می‌کند
 * و شامل هدر، نوار کناری، و محتوای اصلی است
 */
const UserLayout: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  console.log('UserLayout - Current Path:', location.pathname);
  console.log('UserLayout - isAuthenticated:', isAuthenticated);
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <UserSidebar />
      <Layout className="site-layout">
        <UserHeader />
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout; 
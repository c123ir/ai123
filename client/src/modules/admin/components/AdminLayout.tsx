import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} theme="dark">
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', margin: 0 }}>پنل مدیریت</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: <Link to="/admin/dashboard">داشبورد</Link>
            },
            {
              key: 'users',
              icon: <UserOutlined />,
              label: <Link to="/admin/users">کاربران</Link>
            },
            {
              key: 'products',
              icon: <ShoppingOutlined />,
              label: <Link to="/admin/products">محصولات</Link>
            },
            {
              key: 'orders',
              icon: <OrderedListOutlined />,
              label: <Link to="/admin/orders">سفارشات</Link>
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: <Link to="/admin/settings">تنظیمات</Link>
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'خروج',
              danger: true
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button type="link" icon={<UserOutlined />}>
              مدیر سیستم
            </Button>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 
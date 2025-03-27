import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Input, Badge, Drawer, Dropdown, Avatar } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  SearchOutlined,
  HeartOutlined,
  MenuOutlined,
  LogoutOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { userService } from '../services/api';

const { Header, Content, Footer } = Layout;

// تابع کمکی برای تطبیق مسیر فعلی با آیتم‌های منو
const getSelectedKey = (pathname: string): string => {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/products')) return 'products';
  if (pathname.startsWith('/profile')) return 'profile';
  if (pathname.startsWith('/cart')) return 'cart';
  return '';
};

const UserLayout: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);
  
  const location = useLocation();
  
  // بررسی وضعیت لاگین کاربر
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile();
    }
  }, []);
  
  // دریافت اطلاعات پروفایل کاربر
  const fetchUserProfile = async () => {
    try {
      // این متد فعلاً غیرفعال شده تا ارور نمایش داده نشود
      // const response = await userService.getProfile();
      // setUserName(response.data.name);
      
      // نام کاربری پیش‌فرض
      setUserName('کاربر');
    } catch (error) {
      console.error('خطا در دریافت اطلاعات پروفایل:', error);
    }
  };
  
  // خروج از حساب کاربری
  const handleLogout = async () => {
    try {
      // این متد فعلاً غیرفعال شده تا ارور نمایش داده نشود
      // await userService.logout();
      localStorage.removeItem('user_token');
      setIsLoggedIn(false);
      setUserName('');
      
      // ریدایرکت به صفحه اصلی
      window.location.href = '/';
    } catch (error) {
      console.error('خطا در خروج از حساب کاربری:', error);
    }
  };
  
  // آیتم‌های منوی موبایل
  const mobileMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">صفحه اصلی</Link>
    },
    {
      key: 'products',
      icon: <AppstoreOutlined />,
      label: <Link to="/products">محصولات</Link>
    },
    {
      key: 'cart',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/cart">سبد خرید</Link>
    }
  ];
  
  // آیتم‌های منوی کاربر
  const userMenuItems = [
    {
      key: 'profile',
      label: <Link to="/profile">پروفایل</Link>,
      icon: <UserOutlined />
    },
    {
      key: 'orders',
      label: <Link to="/profile/orders">سفارش‌های من</Link>,
      icon: <ShoppingCartOutlined />
    },
    {
      key: 'wishlist',
      label: <Link to="/profile/wishlist">لیست علاقه‌مندی‌ها</Link>,
      icon: <HeartOutlined />
    },
    {
      key: 'logout',
      label: 'خروج',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout
    }
  ];
  
  const navItems = [
    {
      key: 'home',
      label: <Link to="/">صفحه اصلی</Link>,
      icon: <HomeOutlined />
    },
    {
      key: 'products',
      label: <Link to="/products">محصولات</Link>,
      icon: <ShoppingCartOutlined />
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <Link to="/">فروشگاه آنلاین</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Menu mode="horizontal" items={navItems} style={{ display: 'flex', alignItems: 'center', border: 'none' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
            <Link to="/cart" style={{ marginLeft: '16px' }}>
              <Button type="text" icon={<ShoppingCartOutlined />}>
                سبد خرید
              </Button>
            </Link>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />} style={{ display: 'flex', alignItems: 'center' }}>
                حساب کاربری
              </Button>
            </Dropdown>
          </div>
        </div>
      </Header>
      
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: '100%', marginTop: '20px' }}>
          <Outlet />
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        فروشگاه آنلاین ©{new Date().getFullYear()} - تمامی حقوق محفوظ است
      </Footer>
      
      {/* درایور منوی موبایل */}
      <Drawer
        title="منو"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[getSelectedKey(location.pathname)]}
          style={{ border: 'none' }}
          items={mobileMenuItems}
          onClick={() => setDrawerVisible(false)}
        />
        
        <div style={{ marginTop: '16px' }}>
          {isLoggedIn ? (
            <Menu
              mode="vertical"
              style={{ border: 'none' }}
              items={userMenuItems}
              onClick={() => setDrawerVisible(false)}
            />
          ) : (
            <div style={{ padding: '16px 0' }}>
              <Button type="primary" block style={{ marginBottom: '8px' }}>
                <Link to="/login">ورود</Link>
              </Button>
              <Button block>
                <Link to="/register">ثبت‌نام</Link>
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </Layout>
  );
};

export default UserLayout; 
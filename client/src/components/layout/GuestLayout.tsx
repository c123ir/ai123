import React, { useState, useEffect } from 'react';
import {
  Layout, 
  Menu, 
  Button,
  Drawer,
  Switch, 
  Avatar, 
  Dropdown, 
  Badge,
  Tooltip,
  theme as antTheme,
  ConfigProvider
} from 'antd';
import { 
  HomeOutlined, 
  CalculatorOutlined, 
  InfoCircleOutlined, 
  QuestionCircleOutlined,
  LoginOutlined,
  UserAddOutlined,
  MenuOutlined,
  BellOutlined,
  SettingOutlined,
  ArrowRightOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useTheme } from '../common/ThemeContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const { Header, Sider, Content, Footer } = Layout;
const { useToken } = antTheme;

// استایل‌های سفارشی
const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: ${props => props.theme === 'light' ? '#fff' : '#141414'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
  position: fixed;
  z-index: 10;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 24px;
  color: #1890ff;
  display: flex;
  align-items: center;
  
  img {
    height: 36px;
    margin-left: 8px;
  }
`;

const MainContent = styled(Content)`
  margin: 64px 0 0;
  min-height: calc(100vh - 64px - 64px);
  display: flex;
  flex-direction: column;
`;

const StyledContentWrapper = styled(motion.div)<{ siderMode: SiderMode }>`
  padding: 24px;
  flex: 1;
  margin-right: ${props => {
    if (props.siderMode === 'expanded') return '200px';
    if (props.siderMode === 'collapsed') return '80px';
    return '0';
  }};
  transition: margin 0.3s;
  
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: ${props => props.theme === 'light' ? '#f0f2f5' : '#1f1f1f'};
  position: sticky;
  bottom: 0;
`;

const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  padding-top: 64px;
  z-index: 5;
`;

const ThemeToggleButton = styled(motion.button)<{ $isDark: boolean }>`
  width: 72px;
  height: 36px;
  background: ${props => props.$isDark ? 'linear-gradient(to right, #121212, #3a3a3a)' : 'linear-gradient(to right, #a7c5eb, #d6e6ff)'};
  border: none;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: background 0.3s ease;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.$isDark ? 'calc(100% - 30px - 3px)' : '3px'};
    width: 30px;
    height: 30px;
    background: ${props => props.$isDark ? '#8c8c8c' : '#ffd666'};
    border-radius: 50%;
    transition: left 0.3s ease, background 0.3s ease;
    z-index: 1;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .icon {
    z-index: 2;
    color: ${props => props.$isDark ? '#fff' : '#000'};
    opacity: 0.9;
    font-size: 16px;
  }
`;

const HeaderThemeToggle = styled(ThemeToggleButton)`
  margin-left: 16px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
`;

const SidebarIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const SidebarToggleButton = styled(Button)`
  margin: 0 4px;
`;

const UserItem = styled.div`
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid ${props => props.$theme === 'dark' ? '#303030' : '#f0f0f0'};
  margin-bottom: 8px;
`;

// تعریف حالت‌های سایدبار
type SiderMode = 'expanded' | 'collapsed' | 'hidden';

// تعریف اینترفیس برای پراپ‌های کامپوننت
interface GuestLayoutProps {
  children?: React.ReactNode;
}

// دریافت ماژول‌های فعال برای کاربر مهمان - این می‌تواند از API دریافت شود
const getGuestModules = async () => {
  // در اینجا می‌توانید از API درخواست زده و ماژول‌های فعال را دریافت کنید
  // فعلا داده‌ی ساختگی برمی‌گردانیم
  return [
    {
      id: 'dashboard',
      title: 'صفحه اصلی',
      icon: <HomeOutlined />,
      path: '/guest/dashboard',
      enabled: true,
    },
    {
      id: 'calculator',
      title: 'ماشین حساب',
      icon: <CalculatorOutlined />,
      path: '/guest/calculator',
      enabled: true,
    },
    {
      id: 'about',
    title: 'درباره ما', 
      icon: <InfoCircleOutlined />,
      path: '/guest/about',
      enabled: true,
    },
    {
      id: 'help',
      title: 'راهنما',
      icon: <QuestionCircleOutlined />,
      path: '/guest/help',
      enabled: true,
    }
  ];
};

/**
 * لایه اصلی برای صفحات مهمان
 */
const GuestLayout: React.FC<GuestLayoutProps> = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const token = useToken();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // سایدبار می‌تواند سه حالت داشته باشد: expanded (کامل باز)، collapsed (فقط آیکون‌ها)، hidden (مخفی)
  const [siderMode, setSiderMode] = useState<SiderMode>(isMobile ? 'hidden' : 'expanded');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // فتچ کردن ماژول‌های فعال
  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      try {
        const modules = await getGuestModules();
        const enabledModules = modules
          .filter(module => module.enabled)
          .map(module => ({
            key: module.path,
            icon: module.icon,
            label: module.title,
          }));
        setMenuItems(enabledModules);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, []);
  
  // مدیریت واکنش‌گرایی سایدبار بر اساس سایز صفحه
  useEffect(() => {
    if (isMobile) {
      setSiderMode('hidden');
    } else {
      setSiderMode('expanded');
    }
  }, [isMobile]);
  
  // مدیریت کلیک بر روی منو
  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
    if (isMobile) {
      setSiderMode('hidden');
    }
  };
  
  // تغییر حالت سایدبار
  const toggleSiderMode = () => {
    setSiderMode(prev => {
      if (prev === 'expanded') return 'collapsed';
      if (prev === 'collapsed') return 'hidden';
      return 'expanded';
    });
  };
  
  // یافتن کلید منوی فعال بر اساس مسیر جاری
  const findActiveMenuKey = () => {
    const pathSegments = location.pathname.split('/');
    let currentPath = '';
    
    // اگر در یکی از زیرمسیرهای guest هستیم
    if (pathSegments.includes('guest')) {
      if (pathSegments.length > 2) {
        // مثلا برای /guest/dashboard یا /guest/calculator
        currentPath = `/guest/${pathSegments[2]}`;
      } else {
        // برای /guest
        currentPath = '/guest/dashboard';
      }
    }
    
    return currentPath;
  };

  // آیتم‌های منوی کاربر
  const userMenuItems = [
    {
      key: 'login',
      label: 'ورود',
      icon: <LoginOutlined />,
      onClick: () => navigate('/auth/login'),
    },
    {
      key: 'register',
      label: 'ثبت‌نام',
      icon: <UserAddOutlined />,
      onClick: () => navigate('/auth/register'),
    },
  ];

  // انیمیشن ورود محتوا
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  // مشخص‌کردن آیکون مناسب برای دکمه تغییر حالت سایدبار
  const getSiderToggleIcon = () => {
    if (siderMode === 'expanded') return <MenuFoldOutlined />;
    if (siderMode === 'collapsed') return <DoubleLeftOutlined />;
    return <MenuUnfoldOutlined />;
  };

  return (
    <StyledLayout>
      <StyledHeader theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            type="text" 
            icon={getSiderToggleIcon()} 
            onClick={toggleSiderMode}
            style={{ marginLeft: 16 }}
          />
          
          <Logo
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/static/images/logo.svg" alt="لوگو" />
            <Link to="/guest/dashboard">دستیار هوشمند</Link>
          </Logo>
        </div>
        
        <HeaderActions>
          <HeaderThemeToggle 
            $isDark={theme === 'dark'} 
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
          >
            <SunOutlined className="icon" />
            <MoonOutlined className="icon" />
          </HeaderThemeToggle>
          
          <Tooltip title="اعلان‌ها">
            <Badge count={0} dot>
              <Button 
                type="text" 
                icon={<BellOutlined />}
                style={{ marginRight: 8 }}
              />
            </Badge>
          </Tooltip>
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button 
              type="text"
              icon={<UserOutlined />}
              style={{ marginRight: 8 }}
            />
          </Dropdown>
          
          {!isMobile && (
            <Button 
              type="primary" 
              icon={<LoginOutlined />}
              onClick={() => navigate('/auth/login')}
              style={{ marginRight: 8 }}
            >
              ورود
            </Button>
          )}
        </HeaderActions>
      </StyledHeader>
      
      <Layout>
        <StyledSider
          width={200}
          collapsible
          collapsed={siderMode === 'collapsed'}
          trigger={null}
          collapsedWidth={80}
          style={{ display: siderMode === 'hidden' ? 'none' : 'block' }}
          theme={theme === 'dark' ? 'dark' : 'light'}
        >
          <UserItem $theme={theme}>
            <Avatar size={64} icon={<UserOutlined />} />
            {siderMode === 'expanded' && (
              <div style={{ marginTop: 8 }}>
                <h3>کاربر مهمان</h3>
                <p>خوش آمدید</p>
              </div>
            )}
          </UserItem>
          
          <Menu
            theme={theme === 'dark' ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[findActiveMenuKey()]}
            onClick={handleMenuClick}
            items={menuItems}
            style={{ borderLeft: 'none' }}
          />
          
          {siderMode === 'expanded' && (
            <SidebarIcons>
              <SidebarToggleButton 
                type="text" 
                icon={<DoubleRightOutlined />} 
                onClick={() => setSiderMode('expanded')}
                disabled={String(siderMode) === 'expanded'}
              />
              <SidebarToggleButton 
                type="text" 
                icon={<MenuFoldOutlined />} 
                onClick={() => setSiderMode('collapsed')}
                disabled={String(siderMode) === 'collapsed'}
              />
              <SidebarToggleButton 
                type="text" 
                icon={<DoubleLeftOutlined />} 
                onClick={() => setSiderMode('hidden')}
                disabled={String(siderMode) === 'hidden'}
              />
            </SidebarIcons>
          )}
        </StyledSider>
        
        <MainContent>
          <AnimatePresence mode="wait">
            <StyledContentWrapper
              key={location.pathname}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              siderMode={siderMode}
            >
          <Outlet />
            </StyledContentWrapper>
          </AnimatePresence>
          
          <StyledFooter theme={theme}>
            دستیار هوشمند یک‌دوسه &copy; {new Date().getFullYear()} - تمامی حقوق محفوظ است
          </StyledFooter>
        </MainContent>
      </Layout>
    </StyledLayout>
  );
};

export default GuestLayout; 
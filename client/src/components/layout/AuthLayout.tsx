import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '../common/ThemeContext';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

// استایل‌های کامپوننت
const StyledLayout = styled(Layout)<{ theme: 'light' | 'dark' }>`
  min-height: 100vh;
  background: ${props => 
    props.theme === 'light' 
      ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' 
      : 'linear-gradient(135deg, #243b55 0%, #141e30 100%)'
  };
`;

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 16px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: transparent;
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
`;

// تعریف اینترفیس برای پراپ‌های کامپوننت
interface AuthLayoutProps {
  children?: React.ReactNode;
}

/**
 * لایه اصلی برای صفحات احراز هویت
 */
const AuthLayout: React.FC<AuthLayoutProps> = () => {
  const { theme } = useTheme();
  
  return (
    <StyledLayout theme={theme}>
      <StyledContent>
        <AuthContainer>
          <Outlet />
        </AuthContainer>
      </StyledContent>
      
      <StyledFooter>
        <Space direction="vertical" size="small">
          <Space split={<span>|</span>} size="middle">
            <Link to="/guest/dashboard">صفحه اصلی</Link>
            <Link to="/auth/login">ورود</Link>
            <Link to="/auth/register">ثبت‌نام</Link>
            <Link to="/auth/forgot-password">بازیابی رمز عبور</Link>
          </Space>
          
          <Text type="secondary">
            دستیار هوشمند یک‌دوسه &copy; {new Date().getFullYear()} - تمامی حقوق محفوظ است
          </Text>
        </Space>
      </StyledFooter>
    </StyledLayout>
  );
};

export default AuthLayout; 
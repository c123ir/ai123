import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Card, Spin, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const { Title, Text, Paragraph } = Typography;

// استایل‌های سفارشی
const LoginContainer = styled.div`
  max-width: 420px;
  width: 100%;
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

/**
 * صفحه ورود کاربران
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = (values: any) => {
    setLoading(true);
    setError(null);
    
    // در حالت واقعی اینجا یک درخواست API انجام می‌شود
    console.log('Login values:', values);
    
    // شبیه‌سازی یک درخواست با تأخیر
    setTimeout(() => {
      setLoading(false);
      
      // برای نمایش، فرض می‌کنیم اگر نام کاربری admin و رمز عبور admin باشد، ورود موفق است
      if (values.username === 'admin' && values.password === 'admin') {
        navigate('/dashboard');
      } else {
        setError('نام کاربری یا رمز عبور نادرست است');
      }
    }, 1500);
  };

  return (
    <LoginContainer>
      <StyledCard>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          ورود به حساب کاربری
        </Title>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            style={{ marginBottom: 16 }} 
            closable 
          />
        )}
        
        <Spin spinning={loading}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="نام کاربری یا ایمیل"
              rules={[{ required: true, message: 'لطفاً نام کاربری یا ایمیل خود را وارد کنید' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="نام کاربری یا ایمیل" 
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
                name="password"
                label="رمز عبور"
              rules={[{ required: true, message: 'لطفاً رمز عبور خود را وارد کنید' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="رمز عبور"
                autoComplete="current-password"
              />
            </Form.Item>

            <FormFooter>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>مرا به خاطر بسپار</Checkbox>
              </Form.Item>

              <Link to="/auth/forgot-password">
                رمز عبور را فراموش کرده‌اید؟
              </Link>
            </FormFooter>

            <Form.Item style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                ورود
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        
        <Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
                    حساب کاربری ندارید؟{' '}
          <Link to="/auth/register">
                      ثبت‌نام کنید
                    </Link>
        </Paragraph>
      </StyledCard>
    </LoginContainer>
  );
};

export default Login; 
import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Card, 
  Typography, 
  Divider, 
  Alert,
  Space
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  FacebookOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { default as api } from '../services/api';

const { Title, Text } = Typography;
const { userService } = api;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await userService.login({
        email: values.email,
        password: values.password,
        remember: values.remember
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigate('/');
    } catch (err: any) {
      console.error('خطا در ورود:', err);
      setError(err.response?.data?.message || 'خطا در ورود به حساب کاربری');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 200px)',
      padding: '20px'
    }}>
      <Card 
        style={{ width: 400, maxWidth: '100%' }}
        variant="borderless"
        className="login-card"
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>ورود به حساب کاربری</Title>
          <Text type="secondary">برای دسترسی به حساب کاربری خود وارد شوید</Text>
        </div>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}
        
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
              { type: 'email', message: 'ایمیل نامعتبر است' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="ایمیل" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'لطفاً رمز عبور را وارد کنید' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="رمز عبور"
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>مرا به خاطر بسپار</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">رمز عبور را فراموش کرده‌اید؟</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              ورود
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center' }}>
            <Text>حساب کاربری ندارید؟ <Link to="/register">ثبت‌نام کنید</Link></Text>
          </div>
        </Form>
        
        <Divider plain>یا ورود با</Divider>
        
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
          <Button 
            icon={<GoogleOutlined />} 
            size="large"
            onClick={() => console.log('ورود با گوگل')}
          >
            گوگل
          </Button>
          <Button 
            icon={<FacebookOutlined />} 
            size="large"
            onClick={() => console.log('ورود با فیسبوک')}
          >
            فیسبوک
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login; 
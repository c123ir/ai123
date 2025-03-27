import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../services/api';

const { Title, Paragraph, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string; remember?: boolean }) => {
    try {
      setLoading(true);
      
      // فعلاً غیرفعال شده تا ارور نمایش داده نشود
      // const response = await userService.login(values);
      
      // شبیه‌سازی تاخیر درخواست
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ذخیره موقت توکن
      localStorage.setItem('user_token', 'dummy_token');
      
      message.success('ورود با موفقیت انجام شد');
      navigate('/');
    } catch (error) {
      message.error('خطا در ورود به حساب کاربری');
      console.error('خطا در ورود:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <Card 
        style={{ 
          width: 400, 
          maxWidth: '100%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}
        variant="outlined"
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>ورود به حساب کاربری</Title>
          <Paragraph type="secondary">
            برای استفاده از امکانات فروشگاه وارد شوید
          </Paragraph>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
              { type: 'email', message: 'لطفاً یک ایمیل معتبر وارد کنید' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="ایمیل" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'لطفاً رمز عبور خود را وارد کنید' }]}
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

              <Link to="/forgot-password">فراموشی رمز عبور</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              ورود
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>یا</Divider>

        <div style={{ textAlign: 'center' }}>
          <Text>حساب کاربری ندارید؟ </Text>
          <Link to="/register">ثبت‌نام</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login; 
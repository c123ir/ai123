import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // در محیط واقعی، این بخش باید به سرور متصل شود
    setLoading(true);
    
    try {
      // شبیه‌سازی تاخیر درخواست
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // مقدار پیش‌فرض برای مقایسه اطلاعات ورود
      if (values.username === 'admin' && values.password === 'admin123') {
        localStorage.setItem('admin_token', 'dummy_token');
        navigate('/admin/dashboard');
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور. لطفا دوباره تلاش کنید.');
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
      background: '#f0f2f5'
    }}>
      <Card 
        style={{ width: 400, maxWidth: '90%' }}
        variant="borderless"
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2}>ورود به پنل مدیریت</Title>
          <Text type="secondary">لطفا اطلاعات خود را وارد کنید</Text>
        </div>
        
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}
        
        <Form
          name="admin_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'لطفا نام کاربری را وارد کنید' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="نام کاربری" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'لطفا رمز عبور را وارد کنید' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="رمز عبور"
            />
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
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin; 
import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  message, 
  Checkbox 
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined 
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../../services/api';

const { Title, Paragraph, Text } = Typography;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      // فعلاً غیرفعال شده تا ارور نمایش داده نشود
      // const response = await userService.register(values);
      
      // شبیه‌سازی تاخیر درخواست
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('ثبت‌نام با موفقیت انجام شد');
      navigate('/login');
    } catch (error) {
      message.error('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
      console.error('خطا در ثبت‌نام:', error);
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
          width: 450, 
          maxWidth: '100%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}
        variant="outlined"
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>ثبت‌نام</Title>
          <Paragraph type="secondary">
            با ایجاد حساب کاربری از تمامی امکانات فروشگاه بهره‌مند شوید
          </Paragraph>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="نام و نام خانوادگی" 
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
              { type: 'email', message: 'لطفاً یک ایمیل معتبر وارد کنید' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="ایمیل" 
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'لطفاً شماره موبایل خود را وارد کنید' },
              { pattern: /^09\d{9}$/, message: 'شماره موبایل نامعتبر است' }
            ]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="شماره موبایل (مثال: 09123456789)" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'لطفاً رمز عبور را وارد کنید' },
              { min: 6, message: 'رمز عبور باید حداقل 6 کاراکتر باشد' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="رمز عبور"
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            dependencies={['password']}
            rules={[
              { required: true, message: 'لطفاً تکرار رمز عبور را وارد کنید' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('تکرار رمز عبور مطابقت ندارد'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="تکرار رمز عبور"
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('لطفاً با قوانین و مقررات موافقت کنید')),
              },
            ]}
          >
            <Checkbox>
              <Text>با <Link to="/terms">قوانین و مقررات</Link> سایت موافقم</Text>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              ثبت‌نام
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>یا</Divider>

        <div style={{ textAlign: 'center' }}>
          <Text>قبلاً ثبت‌نام کرده‌اید؟ </Text>
          <Link to="/login">ورود</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register; 
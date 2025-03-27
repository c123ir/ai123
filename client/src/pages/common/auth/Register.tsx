import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Alert, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const { Title, Text, Paragraph } = Typography;

// استایل‌های سفارشی
const RegisterContainer = styled.div`
  max-width: 480px;
  width: 100%;
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

/**
 * صفحه ثبت‌نام کاربران
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
      setLoading(true);
      setError(null);
      
    // در حالت واقعی اینجا یک درخواست API انجام می‌شود
    console.log('Register values:', values);
    
    // شبیه‌سازی یک درخواست با تأخیر
    setTimeout(() => {
      setLoading(false);
      
      // برای نمایش، فرض می‌کنیم ثبت‌نام موفق است
      navigate('/auth/login', { 
        state: { 
          registrationSuccess: true,
          message: 'ثبت‌نام شما با موفقیت انجام شد. لطفاً وارد شوید.'
        } 
      });
    }, 1500);
  };

  return (
    <RegisterContainer>
      <StyledCard>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          ایجاد حساب کاربری
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
        
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
            size="large"
          scrollToFirstError
        >
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Space style={{ width: '100%' }} direction="horizontal" size="middle">
              <Form.Item
                name="firstName"
                label="نام"
                rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
                style={{ width: '100%' }}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="نام" 
                />
              </Form.Item>
              
              <Form.Item
                name="lastName"
                label="نام خانوادگی"
                rules={[{ required: true, message: 'لطفاً نام خانوادگی خود را وارد کنید' }]}
                style={{ width: '100%' }}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="نام خانوادگی" 
                />
              </Form.Item>
            </Space>
            
            <Form.Item
              name="email"
              label="ایمیل"
              rules={[
                { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
                { type: 'email', message: 'ایمیل وارد شده معتبر نیست' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="ایمیل" 
                autoComplete="email"
              />
            </Form.Item>
            
            <Form.Item
              name="phoneNumber"
              label="شماره موبایل"
              rules={[
                { required: true, message: 'لطفاً شماره موبایل خود را وارد کنید' },
                { pattern: /^09\d{9}$/, message: 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد' }
              ]}
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="09xxxxxxxxx" 
                autoComplete="tel"
                maxLength={11}
              />
            </Form.Item>
            
            <Form.Item
            name="password"
            label="رمز عبور"
              rules={[
                { required: true, message: 'لطفاً رمز عبور را وارد کنید' },
                { min: 8, message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }
              ]}
              hasFeedback
            >
              <Input.Password 
                prefix={<LockOutlined />}
                placeholder="رمز عبور"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="تکرار رمز عبور"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'لطفاً تکرار رمز عبور را وارد کنید' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('دو رمز عبور با هم مطابقت ندارند'));
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
                    value 
                      ? Promise.resolve() 
                      : Promise.reject(new Error('باید قوانین و مقررات را بپذیرید')),
                },
              ]}
            >
              <Checkbox>
                <Text>
                  با <a href="/terms">قوانین و مقررات</a> موافقم
                </Text>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
              >
                ثبت‌نام
              </Button>
            </Form.Item>
          </Space>
        </Form>
        
        <Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
          حساب کاربری دارید؟{' '}
          <Link to="/auth/login">
                وارد شوید
              </Link>
        </Paragraph>
      </StyledCard>
    </RegisterContainer>
  );
};

export default Register; 
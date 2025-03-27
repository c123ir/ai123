import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, Alert, Space } from 'antd';
import { UserOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const { Title, Paragraph } = Typography;

// استایل‌های سفارشی
const ForgotPasswordContainer = styled.div`
  max-width: 420px;
  width: 100%;
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

/**
 * صفحه فراموشی رمز عبور
 */
const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = (values: { email: string }) => {
      setLoading(true);
      setError(null);
      
    // در حالت واقعی اینجا یک درخواست API انجام می‌شود
    console.log('Forgot password email:', values.email);
    
    // شبیه‌سازی یک درخواست با تأخیر
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  return (
    <ForgotPasswordContainer>
      <StyledCard>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          بازیابی رمز عبور
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
        
        {emailSent ? (
          <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
            <Alert
              message="ایمیل بازیابی ارسال شد"
              description="لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی خود را بررسی کنید."
              type="success"
              showIcon
            />
            
            <Paragraph>
              لینک را دریافت نکردید؟ <Button type="link" onClick={() => setEmailSent(false)}>ارسال مجدد</Button>
            </Paragraph>
            
          <Button
              type="primary" 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/auth/login')}
            >
              بازگشت به صفحه ورود
          </Button>
          </Space>
        ) : (
          <Form
            name="forgot-password"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Paragraph style={{ marginBottom: 24 }}>
              ایمیل حساب کاربری خود را وارد کنید. ما یک لینک بازیابی رمز عبور برای شما ارسال خواهیم کرد.
            </Paragraph>
            
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

            <Form.Item style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                ارسال لینک بازیابی
          </Button>
            </Form.Item>
            
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Link to="/auth/login">
                بازگشت به صفحه ورود
              </Link>
            </div>
          </Form>
        )}
      </StyledCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword; 
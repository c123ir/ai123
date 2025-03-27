import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Steps, Button as AntButton } from 'antd';
import { MailOutlined, KeyOutlined, CheckOutlined } from '@ant-design/icons';
import { Card, Typography, Input, Grid } from '../components/common';
import { showMessage } from '../components/common/NotificationSystem';
import { convertToEnglishDigits } from '../utils/DigitConverter';

/**
 * صفحه فراموشی رمز عبور
 */
const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  // مراحل بازیابی رمز عبور
  const steps = [
    {
      title: 'ایمیل',
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => {
            handleSendEmail(values.email);
          }}
        >
          <Form.Item
            name="email"
            label="ایمیل"
            rules={[
              { required: true, message: 'لطفاً ایمیل خود را وارد کنید!' },
              { type: 'email', message: 'ایمیل وارد شده معتبر نیست!' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
              placeholder="ایمیل خود را وارد کنید"
              size="large"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <AntButton
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              ارسال کد تأیید
            </AntButton>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'تأیید',
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => {
            handleVerifyCode(values.code);
          }}
        >
          <Form.Item
            name="code"
            label="کد تأیید"
            rules={[
              { required: true, message: 'لطفاً کد تأیید را وارد کنید!' },
              { min: 6, max: 6, message: 'کد تأیید باید 6 رقم باشد!' }
            ]}
          >
            <Input
              prefix={<KeyOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
              placeholder="کد تأیید را وارد کنید"
              size="large"
              fullWidth
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(convertToEnglishDigits(e.target.value))}
            />
          </Form.Item>
          <Form.Item>
            <AntButton
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              تأیید کد
            </AntButton>
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <AntButton
              type="link"
              onClick={() => handleSendEmail(email)}
              disabled={loading}
            >
              ارسال مجدد کد
            </AntButton>
          </div>
        </Form>
      ),
    },
    {
      title: 'رمز جدید',
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => {
            handleResetPassword(values.password, values.confirmPassword);
          }}
        >
          <Form.Item
            name="password"
            label="رمز عبور جدید"
            rules={[
              { required: true, message: 'لطفاً رمز عبور جدید را وارد کنید!' },
              { min: 6, message: 'رمز عبور باید حداقل 6 کاراکتر باشد!' }
            ]}
          >
            <Input
              type="password"
              placeholder="رمز عبور جدید را وارد کنید"
              size="large"
              fullWidth
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="تکرار رمز عبور"
            dependencies={['password']}
            rules={[
              { required: true, message: 'لطفاً تکرار رمز عبور را وارد کنید!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('دو رمز عبور وارد شده مطابقت ندارند!'));
                },
              }),
            ]}
          >
            <Input
              type="password"
              placeholder="تکرار رمز عبور جدید"
              size="large"
              fullWidth
            />
          </Form.Item>
          <Form.Item>
            <AntButton
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              block
            >
              بازنشانی رمز عبور
            </AntButton>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'تکمیل',
      content: (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <CheckOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '20px' }} />
          <Typography variant="h5" gutterBottom>
            رمز عبور با موفقیت بازنشانی شد!
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            شما می‌توانید با رمز عبور جدید خود وارد سیستم شوید.
          </Typography>
          <AntButton
            type="primary"
            size="large"
            onClick={() => navigate('/login')}
          >
            رفتن به صفحه ورود
          </AntButton>
        </div>
      ),
    },
  ];

  // ارسال ایمیل برای بازیابی رمز عبور
  const handleSendEmail = (emailAddr: string) => {
    setLoading(true);
    
    // شبیه‌سازی ارسال درخواست به سرور
    setTimeout(() => {
      setLoading(false);
      setEmail(emailAddr);
      showMessage.success('کد تأیید به ایمیل شما ارسال شد.');
      setCurrent(1);
    }, 1500);
  };

  // تأیید کد ارسال شده
  const handleVerifyCode = (code: string) => {
    setLoading(true);
    
    // شبیه‌سازی ارسال درخواست به سرور
    setTimeout(() => {
      setLoading(false);
      
      // برای نمایش، هر کدی قبول می‌شود
      showMessage.success('کد تأیید صحیح است.');
      setCurrent(2);
    }, 1500);
  };

  // بازنشانی رمز عبور
  const handleResetPassword = (password: string, confirmPassword: string) => {
    setLoading(true);
    
    // شبیه‌سازی ارسال درخواست به سرور
    setTimeout(() => {
      setLoading(false);
      showMessage.success('رمز عبور با موفقیت تغییر یافت.');
      setCurrent(3);
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
        padding: '20px',
      }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Typography variant="h4">بازیابی رمز عبور</Typography>
              <Typography variant="body2" style={{ marginTop: '8px', color: 'rgba(0, 0, 0, 0.45)' }}>
                {current === 0
                  ? 'لطفاً ایمیل خود را وارد کنید تا کد تأیید برای شما ارسال شود.'
                  : current === 1
                  ? 'کد تأیید ارسال شده به ایمیل خود را وارد کنید.'
                  : current === 2
                  ? 'لطفاً رمز عبور جدید خود را وارد کنید.'
                  : 'رمز عبور شما با موفقیت بازنشانی شد.'}
              </Typography>
            </div>

            <Steps current={current} style={{ marginBottom: '24px' }}>
              {steps.map(item => (
                <Steps.Step key={item.title} title={item.title} />
              ))}
            </Steps>

            <div style={{ minHeight: '200px' }}>
              {steps[current].content}
            </div>

            {current === 0 && (
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <Link to="/login">
                  بازگشت به صفحه ورود
                </Link>
              </div>
            )}
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 
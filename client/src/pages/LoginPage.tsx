import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button as AntButton, Form, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Card, Typography, Input, Grid } from '../components/common';
import { showMessage } from '../components/common/NotificationSystem';
import { convertToEnglishDigits } from '../utils/DigitConverter';

/**
 * صفحه ورود به سیستم
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: { username: string; password: string; remember: boolean }) => {
    setLoading(true);
    
    // تبدیل اعداد فارسی به انگلیسی
    const username = convertToEnglishDigits(values.username);
    const password = convertToEnglishDigits(values.password);
    
    // شبیه‌سازی ارسال درخواست به سرور
    setTimeout(() => {
      setLoading(false);
      
      // برای نمایش، هر یوزرنیم با پسورد 123456 قبول می‌شود
      if (password === '123456') {
        showMessage.success('ورود موفقیت‌آمیز. در حال انتقال به داشبورد...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        showMessage.error('نام کاربری یا رمز عبور اشتباه است!');
      }
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
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Typography variant="h4">ورود به سیستم</Typography>
              <Typography variant="body2" style={{ marginTop: '8px', color: 'rgba(0, 0, 0, 0.45)' }}>
                اطلاعات کاربری خود را وارد کنید
              </Typography>
            </div>

            <Form
              name="login-form"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'لطفاً نام کاربری خود را وارد کنید!' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  placeholder="نام کاربری یا ایمیل"
                  size="large"
                  fullWidth
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'لطفاً رمز عبور خود را وارد کنید!' }]}
              >
                <Input
                  prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  type="password"
                  placeholder="رمز عبور"
                  size="large"
                  fullWidth
                />
              </Form.Item>

              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>مرا به خاطر بسپار</Checkbox>
                  </Form.Item>
                  <Link to="/forgot-password">
                    فراموشی رمز عبور
                  </Link>
                </div>
              </Form.Item>

              <Form.Item>
                <AntButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  block
                >
                  ورود
                </AntButton>
              </Form.Item>

              <Divider>یا</Divider>

              <div style={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  حساب کاربری ندارید؟{' '}
                  <Link to="/register">ثبت‌نام کنید</Link>
                </Typography>
              </div>
            </Form>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default LoginPage; 
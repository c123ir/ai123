import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Checkbox, Divider, Button as AntButton } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Card, Typography, Input, Grid, DatePicker } from '../components/common';
import { showMessage } from '../components/common/NotificationSystem';
import { convertToEnglishDigits } from '../utils/DigitConverter';

/**
 * صفحه ثبت‌نام کاربر جدید
 */
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    setLoading(true);
    
    // تبدیل اعداد فارسی به انگلیسی
    const normalizedValues = {
      ...values,
      phone: convertToEnglishDigits(values.phone),
      // تبدیل تاریخ تولد به فرمت مناسب
      birthDate: values.birthDate ? values.birthDate.toISOString() : null,
    };
    
    // شبیه‌سازی ارسال درخواست به سرور
    setTimeout(() => {
      setLoading(false);
      
      // بررسی ساده برای نمایش
      if (normalizedValues.password === normalizedValues.confirmPassword) {
        showMessage.success('ثبت‌نام با موفقیت انجام شد. در حال انتقال به صفحه ورود...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        showMessage.error('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
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
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Typography variant="h4">ثبت‌نام در سیستم</Typography>
              <Typography variant="body2" style={{ marginTop: '8px', color: 'rgba(0, 0, 0, 0.45)' }}>
                لطفاً اطلاعات خود را وارد کنید
              </Typography>
            </div>

            <Form
              form={form}
              name="register-form"
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ remember: true }}
            >
              <Grid container spacing={2} style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid item xs={12} md={6}>
                  <Form.Item
                    name="name"
                    label="نام کامل"
                    rules={[{ required: true, message: 'لطفاً نام کامل خود را وارد کنید!' }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                      placeholder="نام و نام خانوادگی"
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
                
                <Grid item xs={12} md={6}>
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
                      placeholder="ایمیل"
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Form.Item
                    name="phone"
                    label="شماره موبایل"
                    rules={[
                      { required: true, message: 'لطفاً شماره موبایل خود را وارد کنید!' },
                      { 
                        validator: (_, value) => {
                          const normalizedPhone = convertToEnglishDigits(value || '');
                          if (normalizedPhone && !/^09\d{9}$/.test(normalizedPhone)) {
                            return Promise.reject('شماره موبایل باید 11 رقم و با 09 شروع شود!');
                          }
                          return Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                      placeholder="شماره موبایل"
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Form.Item
                    name="birthDate"
                    label="تاریخ تولد"
                  >
                    <DatePicker
                      jalali
                      fullWidth
                      disableFuture
                      placeholder="انتخاب تاریخ تولد"
                    />
                  </Form.Item>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Form.Item
                    name="password"
                    label="رمز عبور"
                    rules={[
                      { required: true, message: 'لطفاً رمز عبور را وارد کنید!' },
                      { min: 6, message: 'رمز عبور باید حداقل 6 کاراکتر باشد!' }
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                      type="password"
                      placeholder="رمز عبور"
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
                
                <Grid item xs={12} md={6}>
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
                      prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                      type="password"
                      placeholder="تکرار رمز عبور"
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
              </Grid>

              <Form.Item>
                <Form.Item name="agreement" valuePropName="checked" noStyle>
                  <Checkbox>
                    قوانین و مقررات را مطالعه کرده و می‌پذیرم
                  </Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <AntButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  block
                >
                  ثبت‌نام
                </AntButton>
              </Form.Item>

              <Divider>یا</Divider>

              <div style={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  قبلاً ثبت‌نام کرده‌اید؟{' '}
                  <Link to="/login">ورود به سیستم</Link>
                </Typography>
              </div>
            </Form>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default RegisterPage; 
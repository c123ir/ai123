import React, { useState } from 'react';
import { Form, Divider, Upload, message } from 'antd';
import { UploadOutlined, UserOutlined, MailOutlined, PhoneOutlined, SaveOutlined } from '@ant-design/icons';
import { Card, Typography, Input, Grid, Button, Avatar } from '../components/common';
import { showMessage } from '../components/common/NotificationSystem';
import type { UploadFile } from 'antd/es/upload/interface';
import { convertToEnglishDigits, convertToPersianDigits } from '../utils/DigitConverter';

/**
 * صفحه پروفایل کاربر
 */
const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // داده‌های نمایشی پروفایل کاربر
  const initialValues = {
    name: 'کاربر سیستم',
    email: 'user@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    address: 'تهران، خیابان ولیعصر',
    bio: 'این یک بیوگرافی تستی است. شما می‌توانید این متن را ویرایش کنید.',
  };

  const handleSubmit = (values: typeof initialValues) => {
    setLoading(true);
    
    // تبدیل اعداد فارسی به انگلیسی برای ارسال به سرور
    const normalizedValues = {
      ...values,
      phone: convertToEnglishDigits(values.phone),
    };
    
    // شبیه‌سازی ارسال درخواست به سرور
    setTimeout(() => {
      setLoading(false);
      showMessage.success('پروفایل با موفقیت به‌روزرسانی شد');
    }, 1500);
  };

  // کنترل آپلود تصویر
  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
  };

  // قبل از آپلود، بررسی نوع فایل
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('شما فقط می‌توانید تصویر آپلود کنید!');
    }
    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('تصویر باید کمتر از 2 مگابایت باشد!');
    }
    
    return isImage && isLt2M;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        پروفایل کاربری
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar
                size={120}
                icon={<UserOutlined />}
                style={{ margin: '20px 0' }}
              />
              <Typography variant="h5" gutterBottom>
                {initialValues.name}
              </Typography>
              <Typography variant="body1" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                {initialValues.email}
              </Typography>
              <Typography className="farsi-digits" variant="body2" style={{ marginTop: 8 }}>
                {initialValues.phone}
              </Typography>
              
              <Divider />
              
              <Upload
                beforeUpload={beforeUpload}
                maxCount={1}
                fileList={fileList}
                onChange={handleUploadChange}
              >
                <Button icon={<UploadOutlined />}>
                  تغییر تصویر پروفایل
                </Button>
              </Upload>
            </div>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card title="اطلاعات شخصی">
            <Form
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onFinish={handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Form.Item
                    name="name"
                    label="نام کامل"
                    rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید!' }]}
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
                    label="شماره تماس"
                    rules={[
                      { required: true, message: 'لطفاً شماره تماس خود را وارد کنید!' }
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                      placeholder="شماره تماس"
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Form.Item
                    name="address"
                    label="آدرس"
                  >
                    <Input
                      placeholder="آدرس"
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
                
                <Grid item xs={12}>
                  <Form.Item
                    name="bio"
                    label="بیوگرافی"
                  >
                    <Input
                      multiline
                      rows={4}
                      placeholder="درباره خود بنویسید..."
                      fullWidth
                    />
                  </Form.Item>
                </Grid>
              </Grid>
              
              <Form.Item style={{ marginTop: '20px', textAlign: 'left' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                >
                  ذخیره تغییرات
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage; 
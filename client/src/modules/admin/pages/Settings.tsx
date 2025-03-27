import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Space, 
  Divider, 
  message, 
  Upload, 
  Avatar 
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  SettingOutlined, 
  UploadOutlined, 
  GlobalOutlined, 
  BellOutlined 
} from '@ant-design/icons';
import { authService } from '../services/api';

const { TabPane } = Tabs;
const { Option } = Select;

const Settings: React.FC = () => {
  const [profileForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [appSettingsForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>('');

  // بارگذاری اطلاعات پروفایل
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        const { name, email, avatar } = response.data;
        
        profileForm.setFieldsValue({
          name,
          email,
        });
        
        if (avatar) {
          setAvatar(avatar);
        }
      } catch (error) {
        console.error('خطا در بارگذاری اطلاعات پروفایل:', error);
      }
    };
    
    fetchProfile();
  }, [profileForm]);

  // بروزرسانی پروفایل
  const handleProfileUpdate = async (values: any) => {
    try {
      setLoading(true);
      await authService.updateProfile(values);
      message.success('پروفایل با موفقیت بروزرسانی شد');
      setLoading(false);
    } catch (error) {
      console.error('خطا در بروزرسانی پروفایل:', error);
      setLoading(false);
    }
  };

  // تغییر رمز عبور
  const handlePasswordChange = async (values: any) => {
    try {
      setLoading(true);
      await authService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('رمز عبور با موفقیت تغییر کرد');
      securityForm.resetFields();
      setLoading(false);
    } catch (error) {
      console.error('خطا در تغییر رمز عبور:', error);
      setLoading(false);
    }
  };

  // آپلود آواتار
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      setAvatar(info.file.response.url);
      message.success('آواتار با موفقیت آپلود شد');
    }
  };

  return (
    <div className="settings-container" style={{ padding: '20px' }}>
      <Card variant="borderless">
        <Tabs defaultActiveKey="profile">
          <TabPane 
            tab={<span><UserOutlined /> پروفایل</span>}
            key="profile"
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <Space direction="vertical" align="center">
                <Avatar 
                  size={100} 
                  src={avatar} 
                  icon={!avatar ? <UserOutlined /> : undefined}
                />
                <Upload 
                  name="avatar"
                  action="/api/admin/upload-avatar"
                  showUploadList={false}
                  onChange={handleAvatarUpload}
                >
                  <Button icon={<UploadOutlined />}>آپلود تصویر</Button>
                </Upload>
              </Space>
            </div>
            
            <Form
              form={profileForm}
              layout="vertical"
              onFinish={handleProfileUpdate}
              style={{ maxWidth: 600, margin: '0 auto' }}
            >
              <Form.Item
                name="name"
                label="نام"
                rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="نام" />
              </Form.Item>
              
              <Form.Item
                name="email"
                label="ایمیل"
                rules={[
                  { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
                  { type: 'email', message: 'ایمیل نامعتبر است' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="ایمیل" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  ذخیره تغییرات
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><LockOutlined /> امنیت</span>}
            key="security"
          >
            <Form
              form={securityForm}
              layout="vertical"
              onFinish={handlePasswordChange}
              style={{ maxWidth: 600, margin: '0 auto' }}
            >
              <Form.Item
                name="currentPassword"
                label="رمز عبور فعلی"
                rules={[{ required: true, message: 'لطفاً رمز عبور فعلی را وارد کنید' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="رمز عبور فعلی" />
              </Form.Item>
              
              <Form.Item
                name="newPassword"
                label="رمز عبور جدید"
                rules={[
                  { required: true, message: 'لطفاً رمز عبور جدید را وارد کنید' },
                  { min: 8, message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="رمز عبور جدید" />
              </Form.Item>
              
              <Form.Item
                name="confirmPassword"
                label="تکرار رمز عبور جدید"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'لطفاً تکرار رمز عبور جدید را وارد کنید' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('تکرار رمز عبور با رمز عبور جدید مطابقت ندارد'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="تکرار رمز عبور جدید" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  تغییر رمز عبور
                </Button>
              </Form.Item>
            </Form>
            
            <Divider />
            
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
              <h3>احراز هویت دو مرحله‌ای</h3>
              <p>با فعال کردن احراز هویت دو مرحله‌ای، امنیت حساب خود را افزایش دهید.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>احراز هویت دو مرحله‌ای</span>
                <Switch />
              </div>
            </div>
          </TabPane>
          
          <TabPane 
            tab={<span><BellOutlined /> اعلان‌ها</span>}
            key="notifications"
          >
            <Form
              form={notificationForm}
              layout="vertical"
              style={{ maxWidth: 600, margin: '0 auto' }}
            >
              <h3>تنظیمات اعلان‌ها</h3>
              <Form.Item name="emailNotifications" valuePropName="checked">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div>اعلان‌های ایمیلی</div>
                    <div style={{ color: '#999', fontSize: '12px' }}>دریافت اعلان‌ها از طریق ایمیل</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Form.Item>
              
              <Form.Item name="orderNotifications" valuePropName="checked">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div>اعلان‌های سفارش جدید</div>
                    <div style={{ color: '#999', fontSize: '12px' }}>دریافت اعلان برای سفارش‌های جدید</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Form.Item>
              
              <Form.Item name="commentNotifications" valuePropName="checked">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div>اعلان‌های نظرات جدید</div>
                    <div style={{ color: '#999', fontSize: '12px' }}>دریافت اعلان برای نظرات جدید</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  ذخیره تنظیمات
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><SettingOutlined /> تنظیمات برنامه</span>}
            key="app-settings"
          >
            <Form
              form={appSettingsForm}
              layout="vertical"
              style={{ maxWidth: 600, margin: '0 auto' }}
            >
              <h3>تنظیمات عمومی</h3>
              
              <Form.Item name="siteName" label="نام سایت">
                <Input />
              </Form.Item>
              
              <Form.Item name="siteDescription" label="توضیحات سایت">
                <Input.TextArea rows={3} />
              </Form.Item>
              
              <Form.Item name="language" label="زبان پیش‌فرض">
                <Select defaultValue="fa">
                  <Option value="fa">فارسی</Option>
                  <Option value="en">انگلیسی</Option>
                  <Option value="ar">عربی</Option>
                </Select>
              </Form.Item>
              
              <Divider />
              
              <h3>تنظیمات موجودی</h3>
              
              <Form.Item name="lowStockThreshold" label="آستانه موجودی کم">
                <Input type="number" min={1} />
              </Form.Item>
              
              <Form.Item name="outOfStockDisplay" label="نمایش محصولات ناموجود">
                <Select defaultValue="show">
                  <Option value="show">نمایش با برچسب ناموجود</Option>
                  <Option value="hide">عدم نمایش</Option>
                </Select>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  ذخیره تنظیمات
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings; 
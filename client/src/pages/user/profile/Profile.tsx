import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Form, 
  Input, 
  Button, 
  Card, 
  Avatar, 
  Tabs, 
  Spin, 
  Alert, 
  Divider, 
  Row, 
  Col, 
  Modal, 
  Space 
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  SaveOutlined, 
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
  CameraOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import DigitConverter from '../../../modules/shared/utils/DigitConverter';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

// نمایندۀ داده‌های کاربر
interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  avatarUrl: string | null;
  bio: string;
}

// استایل کامپوننت‌های سفارشی
const ProfileContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
`;

const CameraButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// اسکیما اعتبارسنجی فرم اطلاعات شخصی
const profileValidationSchema = Yup.object({
  firstName: Yup.string().required('نام الزامی است'),
  lastName: Yup.string().required('نام خانوادگی الزامی است'),
  email: Yup.string().email('ایمیل معتبر نیست'),
  bio: Yup.string().max(500, 'توضیحات نباید بیشتر از 500 کاراکتر باشد'),
});

// اسکیما اعتبارسنجی فرم تغییر رمز عبور
const passwordValidationSchema = Yup.object({
  currentPassword: Yup.string().required('رمز عبور فعلی الزامی است'),
  newPassword: Yup.string()
    .required('رمز عبور جدید الزامی است')
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
    .notOneOf([Yup.ref('currentPassword')], 'رمز عبور جدید نباید مشابه رمز عبور فعلی باشد'),
  confirmPassword: Yup.string()
    .required('تأیید رمز عبور الزامی است')
    .oneOf([Yup.ref('newPassword')], 'رمز عبور با تأیید آن مطابقت ندارد'),
});

/**
 * صفحه پروفایل کاربر
 */
const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);

  // شبیه‌سازی بارگذاری داده‌های کاربر
  useEffect(() => {
    // در یک پروژه واقعی، اینجا باید از API داده‌ها را دریافت کرد
    const timer = setTimeout(() => {
      setUserData({
        firstName: 'محمد',
        lastName: 'احمدی',
        phoneNumber: '۰۹۱۲۳۴۵۶۷۸۹',
        email: 'mohammad@example.com',
        avatarUrl: null,
        bio: 'برنامه‌نویس و توسعه‌دهنده وب با بیش از ۵ سال تجربه در زمینه طراحی و توسعه سایت‌های مختلف.',
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // فرم ویرایش اطلاعات شخصی
  const profileFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      try {
        // در اینجا کد ارسال اطلاعات به سرور قرار می‌گیرد
        console.log('Profile update:', values);
        
        // شبیه‌سازی تأخیر در پاسخ API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // به‌روزرسانی داده‌های کاربر در حالت
        setUserData({
          ...userData!,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          bio: values.bio,
        });
        
        setSuccess('اطلاعات شخصی با موفقیت به‌روزرسانی شد');
      } catch (err) {
        setError('خطا در به‌روزرسانی اطلاعات. لطفا مجددا تلاش کنید.');
        console.error('Profile update error:', err);
      } finally {
        setSaving(false);
      }
    },
  });

  // فرم تغییر رمز عبور
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      try {
        // در اینجا کد ارسال رمز عبور جدید به سرور قرار می‌گیرد
        console.log('Password change:', values);
        
        // شبیه‌سازی تأخیر در پاسخ API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSuccess('رمز عبور با موفقیت تغییر یافت');
        handleClosePasswordDialog();
        passwordFormik.resetForm();
      } catch (err) {
        setError('خطا در تغییر رمز عبور. لطفا مجددا تلاش کنید.');
        console.error('Password change error:', err);
      } finally {
        setSaving(false);
      }
    },
  });

  // زمان بارگذاری داده‌های کاربر، مقادیر اولیه فرم را تنظیم می‌کنیم
  useEffect(() => {
    if (userData) {
      profileFormik.setValues({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        bio: userData.bio,
      });
    }
  }, [userData]);

  // تغییر تب فعال
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // باز کردن دیالوگ تغییر رمز عبور
  const handleOpenPasswordDialog = () => {
    setOpenChangePasswordDialog(true);
  };

  // بستن دیالوگ تغییر رمز عبور
  const handleClosePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
    passwordFormik.resetForm();
  };

  // تابع آپلود تصویر پروفایل (پیاده‌سازی نشده)
  const handleAvatarUpload = () => {
    // در اینجا کد آپلود تصویر پروفایل قرار می‌گیرد
    console.log('Avatar upload clicked');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ProfileContainer>
      <Row gutter={[24, 24]}>
        {/* نمایش خطا یا پیام موفقیت */}
        {(error || success) && (
          <Col span={24}>
            {error && <Alert message={error} type="error" showIcon />}
            {success && <Alert message={success} type="success" showIcon />}
          </Col>
        )}

        {/* بخش اطلاعات اصلی و آواتار */}
        <Col xs={24} md={8}>
          <ProfileCard>
            <AvatarWrapper>
              <Avatar 
                size={120} 
                src={userData?.avatarUrl} 
                style={{ fontSize: '3rem' }}
              >
                {userData?.firstName.charAt(0)}
              </Avatar>
              <CameraButton onClick={handleAvatarUpload}>
                <CameraOutlined />
              </CameraButton>
            </AvatarWrapper>
            
            <Typography.Title level={4} style={{ margin: '16px 0 4px', textAlign: 'center' }}>
              {userData?.firstName} {userData?.lastName}
            </Typography.Title>
            
            <Typography.Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '16px' }}>
              {userData?.phoneNumber}
            </Typography.Text>
            
            <Button
              icon={<LockOutlined />}
              onClick={handleOpenPasswordDialog}
              block
              style={{ marginBottom: '16px' }}
            >
              تغییر رمز عبور
            </Button>

            <Divider />
            
            <div style={{ marginBottom: '8px' }}>
              <Typography.Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                شماره تلفن
              </Typography.Text>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PhoneOutlined style={{ marginLeft: '8px', color: '#8c8c8c' }} />
                <Typography.Text>{userData?.phoneNumber}</Typography.Text>
              </div>
            </div>
            
            <div>
              <Typography.Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                ایمیل
              </Typography.Text>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MailOutlined style={{ marginLeft: '8px', color: '#8c8c8c' }} />
                <Typography.Text>{userData?.email || '(تعیین نشده)'}</Typography.Text>
              </div>
            </div>
          </ProfileCard>
        </Col>
        
        {/* بخش تب‌ها و فرم‌ها */}
        <Col xs={24} md={16}>
          <ProfileCard>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <Tabs.TabPane 
                tab={<span><UserOutlined /> اطلاعات شخصی</span>}
                key="1"
              >
                <Typography.Title level={5} style={{ marginBottom: '16px' }}>
                  اطلاعات شخصی
                </Typography.Title>
                
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                        نام
                      </Typography.Text>
                      <Typography.Text strong>{userData?.firstName}</Typography.Text>
                    </div>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                        نام خانوادگی
                      </Typography.Text>
                      <Typography.Text strong>{userData?.lastName}</Typography.Text>
                    </div>
                  </Col>
                  
                  <Col span={24}>
                    <div style={{ marginBottom: '16px' }}>
                      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                        درباره من
                      </Typography.Text>
                      <Typography.Text>{userData?.bio || '(اطلاعاتی ثبت نشده است)'}</Typography.Text>
                    </div>
                  </Col>
                </Row>
                
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setActiveTab('2')}
                >
                  ویرایش پروفایل
                </Button>
              </Tabs.TabPane>
              
              <Tabs.TabPane 
                tab={<span><EditOutlined /> ویرایش پروفایل</span>}
                key="2"
              >
                <Typography.Title level={5} style={{ marginBottom: '16px' }}>
                  ویرایش پروفایل
                </Typography.Title>
                
                <Form
                  layout="vertical"
                  onFinish={profileFormik.handleSubmit}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="نام"
                        validateStatus={profileFormik.touched.firstName && profileFormik.errors.firstName ? 'error' : ''}
                        help={profileFormik.touched.firstName && profileFormik.errors.firstName}
                      >
                        <Input
                          name="firstName"
                          value={profileFormik.values.firstName}
                          onChange={profileFormik.handleChange}
                          onBlur={profileFormik.handleBlur}
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24} sm={12}>
                      <Form.Item
                        label="نام خانوادگی"
                        validateStatus={profileFormik.touched.lastName && profileFormik.errors.lastName ? 'error' : ''}
                        help={profileFormik.touched.lastName && profileFormik.errors.lastName}
                      >
                        <Input
                          name="lastName"
                          value={profileFormik.values.lastName}
                          onChange={profileFormik.handleChange}
                          onBlur={profileFormik.handleBlur}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="ایمیل"
                        validateStatus={profileFormik.touched.email && profileFormik.errors.email ? 'error' : ''}
                        help={profileFormik.touched.email && profileFormik.errors.email}
                      >
                        <Input
                          name="email"
                          value={profileFormik.values.email}
                          onChange={profileFormik.handleChange}
                          onBlur={profileFormik.handleBlur}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="درباره من"
                        validateStatus={profileFormik.touched.bio && profileFormik.errors.bio ? 'error' : ''}
                        help={profileFormik.touched.bio && profileFormik.errors.bio}
                      >
                        <Input.TextArea
                          name="bio"
                          value={profileFormik.values.bio}
                          onChange={profileFormik.handleChange}
                          onBlur={profileFormik.handleBlur}
                          rows={4}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col span={24}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={saving}
                        icon={!saving && <SaveOutlined />}
                      >
                        {saving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Tabs.TabPane>
            </Tabs>
          </ProfileCard>
        </Col>
      </Row>
      
      {/* دیالوگ تغییر رمز عبور */}
      <Modal
        title="تغییر رمز عبور"
        open={openChangePasswordDialog}
        onCancel={handleClosePasswordDialog}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={passwordFormik.handleSubmit}
        >
          <Form.Item
            label="رمز عبور فعلی"
            validateStatus={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? 'error' : ''}
            help={passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword}
          >
            <Input.Password
              name="currentPassword"
              value={passwordFormik.values.currentPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
            />
          </Form.Item>
          
          <Form.Item
            label="رمز عبور جدید"
            validateStatus={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? 'error' : ''}
            help={passwordFormik.touched.newPassword && passwordFormik.errors.newPassword}
          >
            <Input.Password
              name="newPassword"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
            />
          </Form.Item>
          
          <Form.Item
            label="تأیید رمز عبور جدید"
            validateStatus={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? 'error' : ''}
            help={passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword}
          >
            <Input.Password
              name="confirmPassword"
              value={passwordFormik.values.confirmPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
            />
          </Form.Item>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button onClick={handleClosePasswordDialog}>
              انصراف
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              icon={!saving && <SaveOutlined />}
            >
              {saving ? 'در حال ذخیره...' : 'تغییر رمز عبور'}
            </Button>
          </div>
        </Form>
      </Modal>
    </ProfileContainer>
  );
};

export default Profile; 
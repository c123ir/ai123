import React, { useState } from 'react';
import { 
  Card, 
  Avatar, 
  Typography, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Row, 
  Col, 
  Divider, 
  Upload, 
  Space,
  List,
  Badge,
  Alert 
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  EditOutlined,
  UploadOutlined,
  KeyOutlined,
  SafetyOutlined,
  HistoryOutlined,
  BellOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../modules/shared/context/ThemeContext';
import styled from '@emotion/styled';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// استایل‌های کامپوننت
const ProfileAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
  border: 4px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const ProfileCard = styled(Card)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
`;

/**
 * صفحه پروفایل کاربر
 */
const UserProfile: React.FC = () => {
  const { darkMode } = useTheme();
  const [editMode, setEditMode] = useState(false);

  // فرم به روزرسانی پروفایل
  const [form] = Form.useForm();

  // اطلاعات کاربر
  const userProfile = {
    name: 'علی محمدی',
    email: 'ali@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    joinDate: '۱۴۰۲/۰۲/۲۲',
    membershipType: 'ویژه',
    lastLogin: '۱۴۰۳/۰۴/۰۸',
    devices: [
      { id: 1, name: 'لپ‌تاپ شخصی', lastLogin: '۱۴۰۳/۰۴/۰۸', isActive: true },
      { id: 2, name: 'گوشی موبایل', lastLogin: '۱۴۰۳/۰۴/۰۷', isActive: true },
      { id: 3, name: 'تبلت', lastLogin: '۱۴۰۳/۰۳/۲۵', isActive: true }
    ],
    activities: [
      { date: '۱۴۰۳/۰۴/۰۸', action: 'ورود به سیستم', ip: '۱۹۲.۱۶۸.۱.۱', device: 'لپ‌تاپ شخصی' },
      { date: '۱۴۰۳/۰۴/۰۷', action: 'تغییر رمز عبور', ip: '۱۹۲.۱۶۸.۱.۵', device: 'گوشی موبایل' },
      { date: '۱۴۰۳/۰۴/۰۷', action: 'ورود به سیستم', ip: '۱۹۲.۱۶۸.۱.۵', device: 'گوشی موبایل' },
      { date: '۱۴۰۳/۰۴/۰۵', action: 'ورود به سیستم', ip: '۱۹۲.۱۶۸.۱.۱', device: 'لپ‌تاپ شخصی' },
      { date: '۱۴۰۳/۰۳/۲۵', action: 'ورود به سیستم', ip: '۱۹۲.۱۶۸.۱.۲', device: 'تبلت' }
    ],
    notifications: [
      { id: 1, enabled: true, type: 'تغییر رمز عبور', description: 'هشدار هنگام تغییر رمز عبور' },
      { id: 2, enabled: true, type: 'ورود جدید', description: 'هشدار هنگام ورود از دستگاه جدید' },
      { id: 3, enabled: false, type: 'یادآوری گارانتی', description: 'یادآوری قبل از انقضای گارانتی' },
      { id: 4, enabled: true, type: 'به‌روزرسانی', description: 'اطلاع‌رسانی به‌روزرسانی‌های سیستم' }
    ]
  };

  // فعال‌سازی حالت ویرایش
  const handleEdit = () => {
    setEditMode(true);
    form.setFieldsValue({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone
    });
  };

  // ذخیره تغییرات
  const handleSave = (values: any) => {
    console.log('Updated values:', values);
    setEditMode(false);
    // API Call برای به‌روزرسانی پروفایل
  };

  // لغو ویرایش
  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <>
      <Title level={2}>پروفایل کاربری</Title>
      <Paragraph type="secondary">اطلاعات پروفایل و تنظیمات حساب کاربری</Paragraph>

      <Row gutter={[24, 24]}>
        {/* اطلاعات اصلی پروفایل */}
        <Col xs={24} md={8}>
          <ProfileCard style={{ textAlign: 'center', padding: '24px' }}>
            <ProfileAvatar size={100} src="/images/user-avatar.jpg" icon={<UserOutlined />} />
            <Title level={4}>{userProfile.name}</Title>
            <Text type="secondary">{userProfile.membershipType}</Text>
            
            <Divider />
            
            <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
              <div>
                <Space>
                  <MailOutlined />
                  <Text strong>ایمیل:</Text>
                </Space>
                <div>{userProfile.email}</div>
              </div>
              
              <div>
                <Space>
                  <PhoneOutlined />
                  <Text strong>تلفن:</Text>
                </Space>
                <div>{userProfile.phone}</div>
              </div>
              
              <div>
                <Space>
                  <ClockCircleOutlined />
                  <Text strong>تاریخ عضویت:</Text>
                </Space>
                <div>{userProfile.joinDate}</div>
              </div>
              
              <div>
                <Space>
                  <HistoryOutlined />
                  <Text strong>آخرین ورود:</Text>
                </Space>
                <div>{userProfile.lastLogin}</div>
              </div>
            </Space>
            
            {!editMode && (
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                onClick={handleEdit}
                style={{ marginTop: 16 }}
              >
                ویرایش پروفایل
              </Button>
            )}
          </ProfileCard>
        </Col>
        
        {/* تب‌های اطلاعات */}
        <Col xs={24} md={16}>
          <ProfileCard>
            <Tabs defaultActiveKey="1">
              {/* ویرایش پروفایل */}
              <TabPane 
                tab={
                  <span>
                    <UserOutlined />
                    اطلاعات شخصی
                  </span>
                } 
                key="1"
              >
                {editMode ? (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                      name: userProfile.name,
                      email: userProfile.email,
                      phone: userProfile.phone
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="نام و نام خانوادگی"
                      rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
                    >
                      <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                      name="email"
                      label="ایمیل"
                      rules={[
                        { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
                        { type: 'email', message: 'فرمت ایمیل صحیح نیست' }
                      ]}
                    >
                      <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                      name="phone"
                      label="شماره تلفن"
                      rules={[{ required: true, message: 'لطفاً شماره تلفن خود را وارد کنید' }]}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                      name="avatar"
                      label="تصویر پروفایل"
                    >
                      <Upload name="avatar" listType="picture" maxCount={1}>
                        <Button icon={<UploadOutlined />}>انتخاب تصویر</Button>
                      </Upload>
                    </Form.Item>
                    
                    <Form.Item>
                      <Space>
                        <Button type="primary" htmlType="submit">
                          ذخیره تغییرات
                        </Button>
                        <Button onClick={handleCancel}>
                          انصراف
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                ) : (
                  <Alert
                    message="اطلاعات حساب کاربری"
                    description="برای ویرایش اطلاعات حساب کاربری خود، روی دکمه ویرایش پروفایل کلیک کنید."
                    type="info"
                    showIcon
                  />
                )}
              </TabPane>
              
              {/* امنیت */}
              <TabPane 
                tab={
                  <span>
                    <SafetyOutlined />
                    امنیت
                  </span>
                } 
                key="2"
              >
                <Card title="تغییر رمز عبور" style={{ marginBottom: 16 }}>
                  <Form layout="vertical">
                    <Form.Item
                      name="currentPassword"
                      label="رمز عبور فعلی"
                      rules={[{ required: true, message: 'لطفاً رمز عبور فعلی را وارد کنید' }]}
                    >
                      <Input.Password prefix={<KeyOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                      name="newPassword"
                      label="رمز عبور جدید"
                      rules={[
                        { required: true, message: 'لطفاً رمز عبور جدید را وارد کنید' },
                        { min: 8, message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' }
                      ]}
                    >
                      <Input.Password prefix={<KeyOutlined />} />
                    </Form.Item>
                    
                    <Form.Item
                      name="confirmPassword"
                      label="تکرار رمز عبور جدید"
                      rules={[
                        { required: true, message: 'لطفاً تکرار رمز عبور جدید را وارد کنید' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('رمز عبور و تکرار آن مطابقت ندارند'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password prefix={<KeyOutlined />} />
                    </Form.Item>
                    
                    <Button type="primary">تغییر رمز عبور</Button>
                  </Form>
                </Card>
                
                <Card title="دستگاه‌های متصل">
                  <List
                    dataSource={userProfile.devices}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button type="link" danger>
                            قطع دسترسی
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Badge status={item.isActive ? 'success' : 'default'} />
                          }
                          title={item.name}
                          description={`آخرین ورود: ${item.lastLogin}`}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </TabPane>
              
              {/* سابقه فعالیت */}
              <TabPane 
                tab={
                  <span>
                    <HistoryOutlined />
                    سابقه فعالیت
                  </span>
                } 
                key="3"
              >
                <List
                  dataSource={userProfile.activities}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<ClockCircleOutlined />}
                        title={item.action}
                        description={`تاریخ: ${item.date} | آدرس IP: ${item.ip} | دستگاه: ${item.device}`}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              
              {/* تنظیمات اعلان‌ها */}
              <TabPane 
                tab={
                  <span>
                    <BellOutlined />
                    اعلان‌ها
                  </span>
                } 
                key="4"
              >
                <List
                  dataSource={userProfile.notifications}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Form.Item valuePropName="checked" style={{ margin: 0 }}>
                          <Form.Switch defaultChecked={item.enabled} />
                        </Form.Item>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<BellOutlined />}
                        title={item.type}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </ProfileCard>
        </Col>
      </Row>
    </>
  );
};

export default UserProfile; 
import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Form, 
  Switch, 
  Button, 
  Row, 
  Col, 
  Tabs, 
  Radio, 
  Select, 
  Divider,
  Alert,
  Collapse,
  InputNumber,
  List,
  Tag,
  Avatar,
  Space,
  Upload,
  message,
  Tooltip,
  Modal
} from 'antd';
import {
  SettingOutlined,
  BellOutlined,
  EyeOutlined,
  SafetyOutlined,
  GlobalOutlined,
  UserOutlined,
  MobileOutlined,
  DesktopOutlined,
  KeyOutlined,
  CheckOutlined,
  CloseOutlined,
  LogoutOutlined,
  DeleteOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useThemeContext } from '@shared/context/ThemeContext';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { RadioChangeEvent } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { Panel } = Collapse;
const { confirm } = Modal;

/**
 * صفحه تنظیمات کاربر
 */
const UserSettings: React.FC = () => {
  const { darkMode, toggleDarkMode, direction, toggleDirection } = useThemeContext();
  const [form] = Form.useForm();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('/avatars/default.jpg');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // فرم‌های تنظیمات
  const [profileForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [appearanceForm] = Form.useForm();

  // اطلاعات کاربر نمونه
  const userInfo = {
    fullName: 'علی محمدی',
    email: 'ali.mohammadi@example.com',
    phoneNumber: '09123456789',
    nationalId: '0123456789',
    address: 'تهران، خیابان ولیعصر، پلاک 123',
    postalCode: '1234567890',
    birthDate: '1370/05/12',
    gender: 'male',
    language: 'fa',
    twoFactorEnabled: true,
    notificationSettings: {
      email: true,
      sms: true,
      push: false,
      transactions: true,
      marketing: false,
      news: true
    },
    appearance: {
      theme: darkMode ? 'dark' : 'light',
      fontSize: 'normal',
      direction: 'rtl',
      listView: 'compact'
    },
    devices: [
      { id: 1, name: 'گوشی هوشمند', lastLogin: '۱۴۰۳/۰۴/۰۵ - ۱۴:۲۵', active: true },
      { id: 2, name: 'لپ‌تاپ شخصی', lastLogin: '۱۴۰۳/۰۴/۰۴ - ۱۰:۱۵', active: true },
      { id: 3, name: 'تبلت', lastLogin: '۱۴۰۳/۰۳/۲۱ - ۲۰:۳۰', active: false }
    ]
  };

  // ذخیره تنظیمات
  const handleSaveSettings = (values: any) => {
    console.log('Settings saved:', values);
    // API Call برای ذخیره تنظیمات
  };

  // تغییر وضعیت اعلان‌ها
  const handleNotificationsChange = (checked: boolean) => {
    setNotificationsEnabled(checked);
  };

  // بررسی قبل از آپلود فایل برای تصویر پروفایل
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('فقط می‌توانید فایل‌های JPG/PNG آپلود کنید!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('حجم تصویر باید کمتر از ۲ مگابایت باشد!');
    }
    return isJpgOrPng && isLt2M;
  };

  // مدیریت تغییر فایل آپلودی
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      // در پروژه واقعی، URL از پاسخ API دریافت می‌شود
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj as Blob));
      message.success('آپلود تصویر با موفقیت انجام شد');
    }
  };

  // ارسال فرم پروفایل
  const handleProfileSubmit = (values: any) => {
    setLoading(true);
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => {
      console.log('Profile values:', values);
      setLoading(false);
      message.success('اطلاعات پروفایل با موفقیت به‌روزرسانی شد');
    }, 1000);
  };

  // ارسال فرم امنیت
  const handleSecuritySubmit = (values: any) => {
    setLoading(true);
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => {
      console.log('Security values:', values);
      setLoading(false);
      message.success('تنظیمات امنیتی با موفقیت به‌روزرسانی شد');
    }, 1000);
  };

  // ارسال فرم اعلان‌ها
  const handleNotificationSubmit = (values: any) => {
    setLoading(true);
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => {
      console.log('Notification values:', values);
      setLoading(false);
      message.success('تنظیمات اعلان‌ها با موفقیت به‌روزرسانی شد');
    }, 1000);
  };

  // ارسال فرم ظاهر
  const handleAppearanceSubmit = (values: any) => {
    setLoading(true);
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => {
      console.log('Appearance values:', values);
      setLoading(false);
      message.success('تنظیمات ظاهری با موفقیت به‌روزرسانی شد');
    }, 1000);
  };

  // تأیید حذف دستگاه
  const showDeleteConfirm = (deviceId: number) => {
    confirm({
      title: 'آیا از حذف این دستگاه اطمینان دارید؟',
      icon: <ExclamationCircleOutlined />,
      content: 'با حذف این دستگاه، جلسه کاری روی آن پایان می‌یابد و کاربر باید دوباره وارد شود.',
      okText: 'بله، حذف کن',
      okType: 'danger',
      cancelText: 'خیر',
      onOk() {
        // شبیه‌سازی حذف دستگاه
        message.success(`دستگاه با موفقیت حذف شد`);
      }
    });
  };

  return (
    <>
      <Title level={2}>
        <SettingOutlined /> تنظیمات
      </Title>
      <Paragraph type="secondary">تنظیمات حساب کاربری و شخصی‌سازی</Paragraph>

      <Card style={{ marginBottom: 24, borderRadius: 8 }}>
        <Tabs defaultActiveKey="1">
          {/* تنظیمات ظاهری */}
          <TabPane 
            tab={
              <span>
                <EyeOutlined />
                ظاهر برنامه
              </span>
            } 
            key="1"
          >
            <Form
              layout="vertical"
              initialValues={{ 
                theme: darkMode ? 'dark' : 'light',
                direction: direction,
                fontSize: 'medium'
              }}
              onFinish={handleSaveSettings}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="theme"
                    label="تم رنگی"
                  >
                    <Radio.Group onChange={(e) => toggleDarkMode()} buttonStyle="solid">
                      <Radio.Button value="light">روشن</Radio.Button>
                      <Radio.Button value="dark">تیره</Radio.Button>
                      <Radio.Button value="auto">خودکار (براساس ساعت)</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="direction"
                    label="جهت متن"
                  >
                    <Radio.Group onChange={() => toggleDirection()} buttonStyle="solid">
                      <Radio.Button value="rtl">راست به چپ</Radio.Button>
                      <Radio.Button value="ltr">چپ به راست</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fontSize"
                    label="اندازه متن"
                  >
                    <Select>
                      <Option value="small">کوچک</Option>
                      <Option value="medium">متوسط</Option>
                      <Option value="large">بزرگ</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="animationsEnabled"
                    label="انیمیشن‌ها"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
              </Row>
              
              <Button type="primary" htmlType="submit">
                ذخیره تنظیمات
              </Button>
            </Form>
          </TabPane>

          {/* تنظیمات اعلان‌ها */}
          <TabPane 
            tab={
              <span>
                <BellOutlined />
                اعلان‌ها
              </span>
            } 
            key="2"
          >
            <Alert
              message="اعلان‌ها"
              description="تنظیمات اعلان‌ها به شما امکان می‌دهد نحوه دریافت اطلاعات و یادآوری‌ها را مدیریت کنید."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            
            <Form layout="vertical">
              <Form.Item
                label="فعال‌سازی اعلان‌ها"
                name="notificationsEnabled"
              >
                <Switch 
                  defaultChecked={notificationsEnabled} 
                  onChange={handleNotificationsChange}
                />
              </Form.Item>
              
              <Divider />
              
              <Collapse 
                bordered={false} 
                defaultActiveKey={['1']}
              >
                <Panel header="اعلان‌های سیستمی" key="1">
                  <Form.Item
                    label="بروزرسانی‌ها"
                    name="systemUpdateNotifications"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </Form.Item>
                  
                  <Form.Item
                    label="ورود به سیستم"
                    name="loginNotifications"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </Form.Item>
                  
                  <Form.Item
                    label="تغییر رمز عبور"
                    name="passwordChangeNotifications"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </Form.Item>
                </Panel>
                
                <Panel header="اعلان‌های محتوایی" key="2">
                  <Form.Item
                    label="یادآوری‌های گارانتی"
                    name="warrantyNotifications"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </Form.Item>
                  
                  <Form.Item
                    label="یادآوری‌های اقساط"
                    name="installmentNotifications"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </Form.Item>
                  
                  <Form.Item
                    label="پیشنهادهای ویژه"
                    name="offerNotifications"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </Form.Item>
                </Panel>
                
                <Panel header="تنظیمات زمان‌بندی" key="3">
                  <Form.Item
                    label="زمان قبل از یادآوری گارانتی (روز)"
                    name="warrantyReminderDays"
                  >
                    <InputNumber 
                      min={1} 
                      max={30} 
                      defaultValue={7} 
                      disabled={!notificationsEnabled}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Panel>
              </Collapse>
              
              <Button 
                type="primary" 
                disabled={!notificationsEnabled}
                style={{ marginTop: 16 }}
              >
                ذخیره تنظیمات اعلان‌ها
              </Button>
            </Form>
          </TabPane>

          {/* تنظیمات امنیتی */}
          <TabPane 
            tab={
              <span>
                <SafetyOutlined />
                امنیت
              </span>
            } 
            key="3"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card title="ورود دو مرحله‌ای" style={{ marginBottom: 16 }}>
                  <Form layout="vertical">
                    <Form.Item
                      label="فعال‌سازی ورود دو مرحله‌ای"
                      name="twoFactorAuth"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    
                    <Form.Item
                      label="روش تأیید"
                      name="twoFactorMethod"
                    >
                      <Radio.Group>
                        <Radio value="sms"><MobileOutlined /> پیامک</Radio>
                        <Radio value="email"><MailOutlined /> ایمیل</Radio>
                        <Radio value="app"><MobileOutlined /> اپلیکیشن احراز هویت</Radio>
                      </Radio.Group>
                    </Form.Item>
                    
                    <Button type="primary" icon={<KeyOutlined />}>
                      تنظیم ورود دو مرحله‌ای
                    </Button>
                  </Form>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="دستگاه‌های تأیید شده" style={{ marginBottom: 16 }}>
                  <List
                    dataSource={[
                      { name: 'لپ تاپ شخصی', browser: 'Chrome', lastUsed: '۱۴۰۳/۰۴/۰۸' },
                      { name: 'گوشی موبایل', browser: 'Safari Mobile', lastUsed: '۱۴۰۳/۰۴/۰۷' },
                      { name: 'تبلت', browser: 'Firefox', lastUsed: '۱۴۰۳/۰۳/۲۵' }
                    ]}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <Button type="link" danger>حذف</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<DesktopOutlined />}
                          title={item.name}
                          description={`${item.browser} | آخرین استفاده: ${item.lastUsed}`}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              
              <Col xs={24}>
                <Card title="سابقه ورود">
                  <List
                    dataSource={[
                      { date: '۱۴۰۳/۰۴/۰۸', ip: '۱۹۲.۱۶۸.۱.۱', location: 'تهران', device: 'لپ‌تاپ شخصی', status: 'موفق' },
                      { date: '۱۴۰۳/۰۴/۰۷', ip: '۱۹۲.۱۶۸.۱.۵', location: 'تهران', device: 'گوشی موبایل', status: 'موفق' },
                      { date: '۱۴۰۳/۰۴/۰۵', ip: '۱۹۸.۵۱.۱۰۰.۲۵', location: 'اصفهان', device: 'نامشخص', status: 'ناموفق' },
                      { date: '۱۴۰۳/۰۳/۲۵', ip: '۱۹۲.۱۶۸.۱.۲', location: 'تهران', device: 'تبلت', status: 'موفق' }
                    ]}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={item.status === 'موفق' ? <CheckOutlined style={{ color: 'green' }} /> : <CloseOutlined style={{ color: 'red' }} />}
                          title={`${item.date} | آدرس IP: ${item.ip}`}
                          description={`مکان: ${item.location} | دستگاه: ${item.device} | وضعیت: ${item.status}`}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* تنظیمات زبان و منطقه */}
          <TabPane 
            tab={
              <span>
                <GlobalOutlined />
                زبان و منطقه
              </span>
            } 
            key="4"
          >
            <Form layout="vertical">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="زبان"
                    name="language"
                  >
                    <Select defaultValue="fa">
                      <Option value="fa">فارسی</Option>
                      <Option value="en">انگلیسی</Option>
                      <Option value="ar">عربی</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="منطقه زمانی"
                    name="timezone"
                  >
                    <Select defaultValue="asia-tehran">
                      <Option value="asia-tehran">تهران (GMT+3:30)</Option>
                      <Option value="asia-dubai">دبی (GMT+4)</Option>
                      <Option value="europe-london">لندن (GMT+0)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="فرمت تاریخ"
                    name="dateFormat"
                  >
                    <Select defaultValue="jalali">
                      <Option value="jalali">شمسی</Option>
                      <Option value="gregorian">میلادی</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="فرمت ساعت"
                    name="timeFormat"
                  >
                    <Select defaultValue="24h">
                      <Option value="24h">۲۴ ساعته</Option>
                      <Option value="12h">۱۲ ساعته (ق.ظ/ب.ظ)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="واحد پول"
                    name="currency"
                  >
                    <Select defaultValue="irr">
                      <Option value="irr">ریال</Option>
                      <Option value="toman">تومان</Option>
                      <Option value="usd">دلار</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="اعداد به زبان محلی"
                    name="localDigits"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
              </Row>
              
              <Button type="primary" htmlType="submit">
                ذخیره تنظیمات زبان و منطقه
              </Button>
            </Form>
          </TabPane>

          {/* تنظیمات حساب کاربری */}
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                حساب کاربری
              </span>
            } 
            key="5"
          >
            <Alert
              message="اطلاعات حساب کاربری"
              description="برای ویرایش اطلاعات شخصی خود، به صفحه پروفایل مراجعه کنید."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
              action={
                <Button size="small" type="primary" onClick={() => window.location.href = '/user/profile'}>
                  صفحه پروفایل
                </Button>
              }
            />
            
            <Card title="اطلاعات عضویت" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>تاریخ عضویت:</Text>
                  <div>۱۴۰۲/۰۲/۲۲</div>
                </Col>
                <Col span={12}>
                  <Text strong>نوع عضویت:</Text>
                  <div>کاربر ویژه</div>
                </Col>
                <Col span={12}>
                  <Text strong>وضعیت اشتراک:</Text>
                  <div>فعال (۴۲ روز باقیمانده)</div>
                </Col>
                <Col span={12}>
                  <Text strong>توکن‌های باقیمانده:</Text>
                  <div>۳۵۵ توکن</div>
                </Col>
              </Row>
            </Card>
            
            <Card title="خروج از تمام دستگاه‌ها" style={{ marginBottom: 16 }}>
              <Paragraph>
                با انتخاب این گزینه، از تمام دستگاه‌هایی که با حساب کاربری شما وارد شده‌اند، خارج خواهید شد.
              </Paragraph>
              <Button danger icon={<LogoutOutlined />}>
                خروج از تمام دستگاه‌ها
              </Button>
            </Card>
            
            <Card title="بستن حساب کاربری">
              <Paragraph type="danger">
                هشدار: بستن حساب کاربری غیرقابل بازگشت است و تمامی اطلاعات شما حذف خواهد شد.
              </Paragraph>
              <Button danger type="primary" icon={<DeleteOutlined />}>
                درخواست بستن حساب کاربری
              </Button>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default UserSettings; 
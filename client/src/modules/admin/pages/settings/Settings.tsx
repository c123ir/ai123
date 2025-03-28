import React from 'react';
import { Card, Tabs, Form, Input, Button, Switch, Select, Divider } from 'antd';
import { 
  SaveOutlined,
  SettingOutlined,
  NotificationOutlined,
  SafetyOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

/**
 * کامپوننت تنظیمات
 */
const Settings: React.FC = () => {
  return (
    <div>
      <h1>تنظیمات سیستم</h1>
      
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                تنظیمات عمومی
              </span>
            }
            key="1"
          >
            <Form layout="vertical">
              <Form.Item label="عنوان سایت" name="site_title">
                <Input placeholder="عنوان سایت را وارد کنید" />
              </Form.Item>
              
              <Form.Item label="توضیحات سایت" name="site_description">
                <Input.TextArea rows={4} placeholder="توضیحات سایت را وارد کنید" />
              </Form.Item>
              
              <Form.Item label="آدرس ایمیل مدیر" name="admin_email">
                <Input placeholder="آدرس ایمیل مدیر را وارد کنید" />
              </Form.Item>
              
              <Divider />
              
              <Form.Item label="وضعیت ثبت‌نام کاربران جدید" name="allow_registration" valuePropName="checked">
                <Switch />
              </Form.Item>
              
              <Button type="primary" icon={<SaveOutlined />}>
                ذخیره تنظیمات
              </Button>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <NotificationOutlined />
                اعلان‌ها
              </span>
            }
            key="2"
          >
            <Form layout="vertical">
              <Form.Item label="ارسال ایمیل برای ثبت‌نام جدید" name="email_new_registration" valuePropName="checked">
                <Switch />
              </Form.Item>
              
              <Form.Item label="ارسال پیامک برای ثبت‌نام جدید" name="sms_new_registration" valuePropName="checked">
                <Switch />
              </Form.Item>
              
              <Form.Item label="اعلان‌های درون برنامه‌ای" name="in_app_notifications" valuePropName="checked">
                <Switch />
              </Form.Item>
              
              <Button type="primary" icon={<SaveOutlined />}>
                ذخیره تنظیمات
              </Button>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <SafetyOutlined />
                امنیت
              </span>
            }
            key="3"
          >
            <Form layout="vertical">
              <Form.Item label="طول عمر نشست کاربر (ساعت)" name="session_lifetime">
                <Select defaultValue="24">
                  <Option value="1">۱ ساعت</Option>
                  <Option value="12">۱۲ ساعت</Option>
                  <Option value="24">۲۴ ساعت</Option>
                  <Option value="72">۷۲ ساعت</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="تعداد تلاش‌های ناموفق برای ورود" name="login_attempts">
                <Select defaultValue="5">
                  <Option value="3">۳ بار</Option>
                  <Option value="5">۵ بار</Option>
                  <Option value="10">۱۰ بار</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="فعال‌سازی reCAPTCHA" name="enable_recaptcha" valuePropName="checked">
                <Switch />
              </Form.Item>
              
              <Button type="primary" icon={<SaveOutlined />}>
                ذخیره تنظیمات
              </Button>
            </Form>
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                منطقه‌ای
              </span>
            }
            key="4"
          >
            <Form layout="vertical">
              <Form.Item label="منطقه زمانی" name="timezone">
                <Select defaultValue="Asia/Tehran">
                  <Option value="Asia/Tehran">تهران (GMT+3:30)</Option>
                  <Option value="Asia/Dubai">دبی (GMT+4:00)</Option>
                  <Option value="Europe/London">لندن (GMT+0:00)</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="فرمت تاریخ" name="date_format">
                <Select defaultValue="jalali">
                  <Option value="jalali">شمسی</Option>
                  <Option value="gregorian">میلادی</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label="واحد پول" name="currency">
                <Select defaultValue="IRR">
                  <Option value="IRR">ریال</Option>
                  <Option value="TOMAN">تومان</Option>
                  <Option value="USD">دلار</Option>
                </Select>
              </Form.Item>
              
              <Button type="primary" icon={<SaveOutlined />}>
                ذخیره تنظیمات
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings; 
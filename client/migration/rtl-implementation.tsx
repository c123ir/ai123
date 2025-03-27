import React from 'react';
import { ConfigProvider } from 'antd';
import faIR from 'antd/lib/locale/fa_IR';
import { App, Typography, Layout, Button, Form, Input, DatePicker, Select } from 'antd';
import { UserOutlined, CalendarOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;
const { Option } = Select;

// پیکربندی لوکال فارسی
const persianLocale = faIR;

// تنظیمات تم سفارشی
const themeConfig = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 8,
    fontFamily: 'IRANSans, Tahoma, Arial',
  },
  components: {
    Button: {
      controlHeight: 40,
      paddingInline: 16,
    },
    Input: {
      controlHeight: 40,
    },
    Form: {
      labelFontSize: 14,
    },
  },
};

// CSS به صورت جداگانه - باید در فایل استایل اصلی اضافه شود
const rtlStyles = `
  /* تنظیمات کلی RTL */
  .ant-input,
  .ant-select,
  .ant-picker,
  .ant-form-item-label,
  .ant-modal-title,
  .ant-typography {
    text-align: right;
  }

  /* استایل برای اعداد */
  .ltr-nums {
    direction: ltr;
    display: inline-block;
  }
`;

// کامپوننت اصلی RTL
const RTLImplementation: React.FC = () => {
  return (
    <ConfigProvider
      theme={themeConfig}
      direction="rtl"
      locale={persianLocale}
    >
      <App>
        <style>{rtlStyles}</style>
        <Layout>
          <Header style={{ color: 'white', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '1 1 auto' }}>
              <h1 style={{ color: 'white', margin: 0 }}>سیستم مدیریت دستیار هوشمند</h1>
            </div>
            <Button type="primary" ghost>
              ورود
            </Button>
          </Header>
          <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px - 70px)' }}>
            <Title level={2}>پیاده‌سازی RTL در Ant Design</Title>
            <Paragraph>
              این یک نمونه از پیاده‌سازی راست-به-چپ (RTL) با استفاده از Ant Design است.
              در این مثال، از ConfigProvider برای تنظیم جهت و لوکال استفاده شده است.
            </Paragraph>

            <div style={{ maxWidth: '600px', margin: '40px 0' }}>
              <Form layout="vertical">
                <Form.Item
                  label="نام کاربری"
                  name="username"
                  rules={[{ required: true, message: 'لطفاً نام کاربری را وارد کنید!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="نام کاربری را وارد کنید" />
                </Form.Item>

                <Form.Item
                  label="ایمیل"
                  name="email"
                  rules={[
                    { required: true, message: 'لطفاً ایمیل را وارد کنید!' },
                    { type: 'email', message: 'فرمت ایمیل صحیح نیست!' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="ایمیل را وارد کنید" />
                </Form.Item>

                <Form.Item
                  label="تاریخ تولد"
                  name="birthdate"
                >
                  <DatePicker style={{ width: '100%' }} format="YYYY/MM/DD" placeholder="انتخاب تاریخ" />
                </Form.Item>

                <Form.Item
                  label="استان"
                  name="province"
                >
                  <Select placeholder="استان را انتخاب کنید">
                    <Option value="tehran">تهران</Option>
                    <Option value="isfahan">اصفهان</Option>
                    <Option value="shiraz">شیراز</Option>
                    <Option value="mashhad">مشهد</Option>
                    <Option value="tabriz">تبریز</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    ثبت‌نام
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div style={{ marginTop: '40px' }}>
              <Title level={3}>اعداد در RTL</Title>
              <Paragraph>
                اعداد در زبان فارسی از چپ به راست نوشته می‌شوند: <span className="ltr-nums">۱۲۳۴۵۶۷۸۹۰</span>
              </Paragraph>
              <Paragraph>
                مبلغ پرداختی: <span className="ltr-nums">۲,۵۰۰,۰۰۰</span> تومان
              </Paragraph>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            دستیار هوشمند ۱۲۳ - تمامی حقوق محفوظ است © {new Date().getFullYear()}
          </Footer>
        </Layout>
      </App>
    </ConfigProvider>
  );
};

// مستندات استفاده از کامپوننت
const usage = `
// نحوه استفاده:
import { RTLImplementation } from './rtl-implementation';

// استفاده در کامپوننت اصلی برنامه:
const App = () => {
  return <RTLImplementation />;
};
`;

export default RTLImplementation; 
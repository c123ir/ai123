import React from 'react';
import { Accordion, Button, Space, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// نمونه آیتم‌های آکاردئون
const items = [
  {
    key: '1',
    label: 'بخش اول',
    children: <p>محتوای بخش اول. در اینجا می‌توانید هر نوع محتوایی را قرار دهید.</p>,
  },
  {
    key: '2',
    label: 'بخش دوم',
    children: <p>محتوای بخش دوم. این بخش شامل توضیحات بیشتری است.</p>,
  },
  {
    key: '3',
    label: 'بخش سوم',
    children: <p>محتوای بخش سوم. این بخش آخرین قسمت از آکاردئون ما است.</p>,
  },
];

// نمونه پایه
export const Default = {
  args: {
    items,
    defaultActiveKey: ['1'],
  },
};

// آکاردئون با آیکون
export const WithIcons = {
  args: {
    items: items.map(item => ({
      ...item,
      icon: <SettingOutlined />,
    })),
  },
};

// آکاردئون با امکان باز شدن چندین پنل
export const Multiple = {
  args: {
    items,
    defaultActiveKey: ['1', '3'],
  },
};

// آکاردئون بدون حاشیه
export const Borderless = {
  args: {
    items,
    bordered: false,
  },
};

// آکاردئون با محتوای غنی
export const RichContent = {
  render: () => (
    <Accordion
      defaultActiveKey={['1']}
      items={[
        {
          key: '1',
          label: 'پروفایل کاربر',
          children: (
            <div>
              <Paragraph>
                <Text strong>نام:</Text> علی محمدی
              </Paragraph>
              <Paragraph>
                <Text strong>ایمیل:</Text> ali@example.com
              </Paragraph>
              <Paragraph>
                <Text strong>سمت:</Text> توسعه‌دهنده نرم‌افزار
              </Paragraph>
              <Space>
                <Button type="primary" size="small">ویرایش</Button>
                <Button size="small">مشاهده کامل</Button>
              </Space>
            </div>
          ),
        },
        {
          key: '2',
          label: 'تنظیمات حساب کاربری',
          children: (
            <div>
              <Paragraph>تنظیمات امنیتی، اطلاعات شخصی و ترجیحات اطلاع‌رسانی خود را مدیریت کنید.</Paragraph>
              <Space direction="vertical">
                <Button>تغییر رمز عبور</Button>
                <Button>تنظیمات اطلاع‌رسانی</Button>
                <Button>حریم خصوصی</Button>
              </Space>
            </div>
          ),
        },
      ]}
    />
  ),
};

// آکاردئون با استایل سفارشی
export const CustomStyle = {
  args: {
    items,
    className: 'custom-accordion',
    style: {
      background: '#f7f7f7',
      borderRadius: '8px',
    },
  },
};

// آکاردئون مخصوص سوالات متداول
export const FAQ = {
  render: () => (
    <Accordion
      items={[
        {
          key: '1',
          label: 'چگونه می‌توانم حساب کاربری ایجاد کنم؟',
          children: <p>برای ایجاد حساب کاربری، روی دکمه "ثبت‌نام" در گوشه بالا سمت چپ کلیک کنید و فرم را پر کنید.</p>,
        },
        {
          key: '2',
          label: 'آیا می‌توانم رمز عبور خود را بازیابی کنم؟',
          children: <p>بله، در صفحه ورود، روی گزینه "فراموشی رمز عبور" کلیک کنید و دستورالعمل‌های ارسال شده به ایمیل خود را دنبال کنید.</p>,
        },
        {
          key: '3',
          label: 'چگونه می‌توانم اشتراک خود را لغو کنم؟',
          children: <p>برای لغو اشتراک، به بخش "تنظیمات حساب کاربری" بروید و گزینه "لغو اشتراک" را انتخاب کنید.</p>,
        },
        {
          key: '4',
          label: 'آیا اپلیکیشن موبایل هم دارید؟',
          children: <p>بله، اپلیکیشن ما برای اندروید و iOS در دسترس است. می‌توانید آن را از فروشگاه‌های Google Play و App Store دانلود کنید.</p>,
        },
      ]}
    />
  ),
}; 
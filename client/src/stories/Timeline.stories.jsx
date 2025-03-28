import React from 'react';
import { Timeline, Badge, Tag, Typography, Card } from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined,
  UserOutlined,
  EnvironmentOutlined,
  SyncOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

export default {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// نمونه پایه
export const Default = {
  render: () => (
    <Timeline
      items={[
        {
          children: 'ایجاد سفارش: ۱۴۰۲/۰۴/۱۵',
        },
        {
          children: 'تایید پرداخت: ۱۴۰۲/۰۴/۱۵',
        },
        {
          children: 'ارسال محصول: ۱۴۰۲/۰۴/۱۶',
        },
        {
          children: 'تحویل محصول: ۱۴۰۲/۰۴/۱۸',
        },
      ]}
    />
  ),
};

// تاریخچه با آیکون‌ها
export const WithIcons = {
  render: () => (
    <Timeline
      items={[
        {
          dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
          color: 'blue',
          children: 'ایجاد سفارش: ۱۴۰۲/۰۴/۱۵',
        },
        {
          dot: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
          color: 'green',
          children: 'تایید پرداخت: ۱۴۰۲/۰۴/۱۵',
        },
        {
          dot: <SyncOutlined spin style={{ fontSize: '16px' }} />,
          color: 'blue',
          children: 'در حال پردازش: ۱۴۰۲/۰۴/۱۶',
        },
        {
          dot: <ExclamationCircleOutlined style={{ fontSize: '16px' }} />,
          color: 'gray',
          children: 'در انتظار تحویل: ۱۴۰۲/۰۴/۱۸',
        },
      ]}
    />
  ),
};

// تاریخچه با رنگ‌های مختلف
export const ColoredTimeline = {
  render: () => (
    <Timeline
      items={[
        {
          color: 'green',
          children: 'تایید شده',
        },
        {
          color: 'blue',
          children: 'در حال پیگیری',
        },
        {
          color: 'red',
          children: 'مشکل در پردازش',
        },
        {
          color: 'gray',
          children: 'در انتظار بررسی',
        },
      ]}
    />
  ),
};

// تاریخچه با محتوای غنی
export const RichContent = {
  render: () => (
    <Timeline
      items={[
        {
          color: 'green',
          children: (
            <>
              <Title level={5}>ثبت‌نام کاربر</Title>
              <Text>کاربر جدید با نام علی محمدی در سیستم ثبت‌نام کرد.</Text>
              <br />
              <Text type="secondary">۱۴۰۲/۰۳/۱۰ - ۱۰:۲۵</Text>
              <br />
              <Tag color="green">موفق</Tag>
            </>
          ),
        },
        {
          color: 'blue',
          dot: <UserOutlined style={{ fontSize: '16px' }} />,
          children: (
            <>
              <Title level={5}>تکمیل پروفایل</Title>
              <Text>اطلاعات پروفایل کاربر تکمیل شد.</Text>
              <br />
              <Text type="secondary">۱۴۰۲/۰۳/۱۲ - ۱۶:۴۰</Text>
            </>
          ),
        },
        {
          color: 'red',
          children: (
            <>
              <Title level={5}>خطا در پرداخت</Title>
              <Text>تراکنش پرداخت ناموفق بود. لطفا مجددا تلاش کنید.</Text>
              <br />
              <Text type="secondary">۱۴۰۲/۰۳/۱۵ - ۰۹:۱۰</Text>
              <br />
              <Badge status="error" text="ناموفق" />
            </>
          ),
        },
        {
          color: 'green',
          dot: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
          children: (
            <>
              <Title level={5}>پرداخت موفق</Title>
              <Text>پرداخت با موفقیت انجام شد. شماره تراکنش: ۱۲۳۴۵۶۷۸۹۰</Text>
              <br />
              <Text type="secondary">۱۴۰۲/۰۳/۱۵ - ۰۹:۱۸</Text>
              <br />
              <Badge status="success" text="موفق" />
            </>
          ),
        },
      ]}
    />
  ),
};

// تاریخچه معکوس
export const Reverse = {
  render: () => (
    <>
      <Text>تاریخچه معکوس (جدیدترین به قدیمی‌ترین)</Text>
      <Timeline
        mode="right"
        reverse={true}
        items={[
          {
            children: 'ایجاد سفارش: ۱۴۰۲/۰۴/۱۵',
          },
          {
            children: 'تایید پرداخت: ۱۴۰۲/۰۴/۱۵',
          },
          {
            children: 'ارسال محصول: ۱۴۰۲/۰۴/۱۶',
          },
          {
            children: 'تحویل محصول: ۱۴۰۲/۰۴/۱۸',
          },
        ]}
      />
    </>
  ),
};

// تاریخچه با چیدمان متفاوت
export const AlternateLayout = {
  render: () => (
    <Timeline
      mode="alternate"
      items={[
        {
          children: 'ایجاد سفارش: ۱۴۰۲/۰۴/۱۵',
          color: 'green',
        },
        {
          children: 'تایید پرداخت: ۱۴۰۲/۰۴/۱۵',
          color: 'green',
        },
        {
          children: 'در انتظار ارسال: ۱۴۰۲/۰۴/۱۶',
          color: 'blue',
        },
        {
          children: 'ارسال شده: ۱۴۰۲/۰۴/۱۷',
          color: 'blue',
        },
        {
          children: 'تحویل داده شده: ۱۴۰۲/۰۴/۱۸',
          color: 'green',
        },
      ]}
    />
  ),
};

// تاریخچه با راست چین و چپ چین
export const RightLeftLayout = {
  render: () => (
    <Timeline
      mode="right"
      items={[
        {
          children: 'ایجاد حساب کاربری',
          label: '۱۴۰۲/۰۱/۱۰',
        },
        {
          children: 'ثبت اولین سفارش',
          label: '۱۴۰۲/۰۱/۱۵',
        },
        {
          children: 'دریافت تخفیف ویژه',
          label: '۱۴۰۲/۰۲/۰۵',
        },
        {
          children: 'ارتقاء به کاربر ویژه',
          label: '۱۴۰۲/۰۳/۲۰',
        },
      ]}
    />
  ),
};

// تاریخچه در کارت
export const TimelineInCard = {
  render: () => (
    <Card title="تاریخچه فعالیت‌ها" style={{ width: 300 }}>
      <Timeline
        items={[
          {
            color: 'green',
            children: 'ورود به سیستم: ۰۹:۱۵',
            dot: <UserOutlined />,
          },
          {
            color: 'blue',
            children: 'ویرایش پروفایل: ۱۰:۳۰',
          },
          {
            color: 'blue',
            children: 'ثبت سفارش جدید: ۱۱:۴۵',
          },
          {
            color: 'red',
            children: 'گزارش خطا: ۱۲:۳۰',
          },
          {
            color: 'gray',
            children: 'خروج از سیستم: ۱۳:۰۰',
          },
        ]}
      />
    </Card>
  ),
}; 
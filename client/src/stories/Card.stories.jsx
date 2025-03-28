import React from 'react';
import Card from '../modules/shared/components/common/Card';
import Button from '../modules/shared/components/common/Button';
import { Space } from 'antd';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    title: 'عنوان کارت',
    children: 'این یک کارت ساده است با محتوای متنی. این کارت برای نمایش اطلاعات استفاده می‌شود.',
  },
};

export const WithActions = {
  args: {
    title: 'کارت با دکمه‌ها',
    children: 'این کارت دارای دکمه‌هایی در پایین است که کاربر می‌تواند با آن‌ها تعامل کند.',
    actions: [
      <Button key="submit" type="primary">تایید</Button>,
      <Button key="cancel">لغو</Button>,
    ],
  },
};

export const WithCover = {
  args: {
    title: 'کارت با تصویر',
    cover: <img 
      alt="نمونه" 
      src="https://picsum.photos/400/200" 
      style={{ width: '100%', height: 'auto' }}
    />,
    children: 'این کارت دارای یک تصویر در بالای خود است که می‌تواند برای نمایش محصولات یا مقالات استفاده شود.',
  },
};

export const Bordered = {
  args: {
    title: 'کارت با حاشیه',
    children: 'این کارت دارای حاشیه است و برجسته‌تر به نظر می‌رسد.',
    bordered: true,
  },
};

export const NoBorder = {
  args: {
    title: 'کارت بدون حاشیه',
    children: 'این کارت بدون حاشیه است و برای ادغام بهتر با پس‌زمینه استفاده می‌شود.',
    bordered: false,
  },
};

export const WithShadow = {
  args: {
    title: 'کارت با سایه',
    children: 'این کارت دارای سایه است و بیشتر برجسته به نظر می‌رسد.',
    shadow: true,
  },
};

export const Loading = {
  args: {
    title: 'کارت در حال بارگذاری',
    children: 'محتوای این کارت در حال بارگذاری است...',
    loading: true,
  },
};

export const WithHeaderExtra = {
  args: {
    title: 'کارت با عنصر اضافی',
    extra: <Button size="small">بیشتر</Button>,
    children: 'این کارت دارای یک دکمه اضافی در قسمت عنوان است.',
  },
};

export const Complex = {
  args: {
    title: 'کارت پیشرفته',
    extra: <Button size="small">مشاهده جزئیات</Button>,
    cover: <img 
      alt="نمونه" 
      src="https://picsum.photos/400/200?random=1" 
      style={{ width: '100%', height: 'auto' }}
    />,
    children: (
      <div>
        <p>این یک کارت پیشرفته است که ترکیبی از ویژگی‌های مختلف را دارد.</p>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <strong>نام محصول:</strong> محصول نمونه
          </div>
          <div>
            <strong>قیمت:</strong> ۲۵۰,۰۰۰ تومان
          </div>
          <div>
            <strong>موجودی:</strong> ۱۰ عدد
          </div>
        </Space>
      </div>
    ),
    actions: [
      <Button key="buy" type="primary">خرید</Button>,
      <Button key="cart">افزودن به سبد خرید</Button>,
    ],
    shadow: true,
    bordered: true,
  },
}; 
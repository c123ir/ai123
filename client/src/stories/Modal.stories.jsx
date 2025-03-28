import React from 'react';
import Modal from '../modules/shared/components/common/Modal';
import Button from '../modules/shared/components/common/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // توجه: Modal به صورت پیش‌فرض نیاز به حالت باز شدن دارد
  // برای نمایش آن در Storybook باید حتما open={true} باشد
};

export const Default = {
  args: {
    title: 'عنوان مدال',
    children: 'این یک مدال ساده است با محتوای متنی.',
    open: true,
    footer: [
      <Button key="cancel">لغو</Button>,
      <Button key="submit" type="primary">تایید</Button>,
    ],
  },
};

export const WithoutFooter = {
  args: {
    title: 'مدال بدون دکمه',
    children: 'این مدال فاقد دکمه‌های پایین است.',
    open: true,
    footer: null,
  },
};

export const WithoutTitle = {
  args: {
    children: 'این مدال بدون عنوان است.',
    open: true,
    footer: [
      <Button key="cancel">بستن</Button>,
    ],
  },
};

export const Centered = {
  args: {
    title: 'مدال وسط چین',
    children: 'این مدال در مرکز صفحه قرار دارد.',
    open: true,
    centered: true,
    footer: [
      <Button key="cancel">بستن</Button>,
      <Button key="submit" type="primary">تایید</Button>,
    ],
  },
};

export const Closable = {
  args: {
    title: 'مدال با دکمه بستن',
    children: 'این مدال دارای دکمه بستن در گوشه است.',
    open: true,
    closable: true,
    footer: [
      <Button key="cancel">لغو</Button>,
      <Button key="submit" type="primary">تایید</Button>,
    ],
  },
};

export const NonClosable = {
  args: {
    title: 'مدال بدون دکمه بستن',
    children: 'این مدال دکمه بستن در گوشه ندارد و باید از طریق دکمه‌های پایین بسته شود.',
    open: true,
    closable: false,
    footer: [
      <Button key="cancel">بستن</Button>,
      <Button key="submit" type="primary">تایید</Button>,
    ],
  },
};

export const WithCustomWidth = {
  args: {
    title: 'مدال با عرض سفارشی',
    children: 'این مدال دارای عرض 700 پیکسل است.',
    open: true,
    width: 700,
    footer: [
      <Button key="cancel">لغو</Button>,
      <Button key="submit" type="primary">تایید</Button>,
    ],
  },
};

export const WithComplexContent = {
  args: {
    title: 'فرم ثبت‌نام',
    children: (
      <div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>نام و نام خانوادگی</label>
          <input 
            type="text" 
            placeholder="نام و نام خانوادگی خود را وارد کنید" 
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #d9d9d9' 
            }} 
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>ایمیل</label>
          <input 
            type="email" 
            placeholder="ایمیل خود را وارد کنید" 
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #d9d9d9' 
            }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>رمز عبور</label>
          <input 
            type="password" 
            placeholder="رمز عبور خود را وارد کنید" 
            style={{ 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #d9d9d9' 
            }} 
          />
        </div>
      </div>
    ),
    open: true,
    width: 500,
    footer: [
      <Button key="cancel">انصراف</Button>,
      <Button key="submit" type="primary">ثبت‌نام</Button>,
    ],
  },
}; 
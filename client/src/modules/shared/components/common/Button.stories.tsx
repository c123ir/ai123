import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from './Button';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

export default {
  title: 'Shared/Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    children: {
      control: 'text',
      description: 'محتوای دکمه',
    },
    variant: {
      control: { type: 'select', options: ['contained', 'outlined', 'text'] },
      description: 'نوع نمایش دکمه',
    },
    color: {
      control: { 
        type: 'select', 
        options: ['primary', 'default', 'secondary', 'success', 'warning', 'danger'] 
      },
      description: 'رنگ دکمه',
    },
    size: {
      control: { type: 'select', options: ['small', 'middle', 'large'] },
      description: 'اندازه دکمه',
    },
    disabled: {
      control: 'boolean',
      description: 'غیرفعال کردن دکمه',
    },
    fullWidth: {
      control: 'boolean',
      description: 'پر کردن عرض کانتینر',
    },
    loading: {
      control: 'boolean',
      description: 'نمایش حالت بارگذاری',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'کامپوننت دکمه با قابلیت‌های متنوع برای استفاده در فرم‌ها و اقدامات کاربری',
      },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه اصلی',
};
Primary.parameters = {
  docs: {
    description: {
      story: 'دکمه اصلی با رنگ اولیه برای اقدامات مهم',
    },
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'contained',
  color: 'secondary',
  children: 'دکمه ثانویه',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  color: 'primary',
  children: 'دکمه خطی',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  children: 'دکمه متنی',
};

export const WithStartIcon = Template.bind({});
WithStartIcon.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه با آیکون',
  startIcon: <HomeOutlined />,
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
  variant: 'outlined',
  color: 'secondary',
  children: 'دکمه با آیکون',
  endIcon: <UserOutlined />,
};

export const Small = Template.bind({});
Small.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه کوچک',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه بزرگ',
  size: 'large',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه غیرفعال',
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  variant: 'contained',
  color: 'primary',
  children: 'در حال بارگذاری',
  loading: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه تمام عرض',
  fullWidth: true,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'contained',
  color: 'danger',
  children: 'دکمه خطر',
}; 
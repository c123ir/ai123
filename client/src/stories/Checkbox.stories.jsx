import React from 'react';
import Checkbox from '../modules/shared/components/common/Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: 'گزینه پیش‌فرض',
  },
};

export const Checked = {
  args: {
    children: 'گزینه انتخاب شده',
    checked: true,
  },
};

export const Disabled = {
  args: {
    children: 'گزینه غیرفعال',
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    children: 'گزینه غیرفعال انتخاب شده',
    disabled: true,
    checked: true,
  },
};

export const WithLabel = {
  args: {
    children: 'من با قوانین و مقررات موافقم',
  },
};

export const WithHelperText = {
  args: {
    children: 'اطلاعیه‌های ایمیل را برای من ارسال کن',
    helperText: 'شما می‌توانید در هر زمان از این سرویس خارج شوید',
  },
};

export const WithError = {
  args: {
    children: 'من با قوانین و مقررات موافقم',
    error: true,
    helperText: 'شما باید با قوانین و مقررات موافقت کنید',
  },
}; 
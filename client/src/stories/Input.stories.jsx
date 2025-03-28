import React from 'react';
import Input from '../modules/shared/components/common/Input';
import { UserOutlined, LockOutlined, SearchOutlined } from '@ant-design/icons';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    placeholder: 'لطفاً متن را وارد کنید',
  },
};

export const WithLabel = {
  args: {
    label: 'نام کاربری',
    placeholder: 'نام کاربری خود را وارد کنید',
  },
};

export const WithIcon = {
  args: {
    placeholder: 'نام کاربری',
    prefix: <UserOutlined />,
  },
};

export const Password = {
  args: {
    type: 'password',
    placeholder: 'رمز عبور خود را وارد کنید',
    prefix: <LockOutlined />,
  },
};

export const Search = {
  args: {
    placeholder: 'جستجو...',
    prefix: <SearchOutlined />,
    allowClear: true,
  },
};

export const WithHelper = {
  args: {
    label: 'ایمیل',
    placeholder: 'ایمیل خود را وارد کنید',
    helperText: 'ایمیل باید معتبر باشد',
  },
};

export const WithError = {
  args: {
    label: 'ایمیل',
    placeholder: 'ایمیل خود را وارد کنید',
    error: true,
    helperText: 'لطفاً یک ایمیل معتبر وارد کنید',
  },
};

export const Disabled = {
  args: {
    label: 'نام کاربری',
    placeholder: 'نام کاربری خود را وارد کنید',
    disabled: true,
    value: 'user123',
  },
};

export const Required = {
  args: {
    label: 'نام کاربری',
    placeholder: 'نام کاربری خود را وارد کنید',
    required: true,
  },
}; 
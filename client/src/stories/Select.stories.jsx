import React from 'react';
import Select from '../modules/shared/components/common/Select';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// گزینه‌های نمونه
const options = [
  { value: '1', label: 'گزینه ۱' },
  { value: '2', label: 'گزینه ۲' },
  { value: '3', label: 'گزینه ۳' },
  { value: '4', label: 'گزینه ۴' },
  { value: '5', label: 'گزینه ۵' },
];

export const Default = {
  args: {
    placeholder: 'لطفاً انتخاب کنید',
    options: options,
  },
};

export const WithLabel = {
  args: {
    label: 'استان',
    placeholder: 'استان خود را انتخاب کنید',
    options: [
      { value: 'tehran', label: 'تهران' },
      { value: 'isfahan', label: 'اصفهان' },
      { value: 'shiraz', label: 'شیراز' },
      { value: 'mashhad', label: 'مشهد' },
      { value: 'tabriz', label: 'تبریز' },
    ],
  },
};

export const Multiple = {
  args: {
    placeholder: 'علاقه‌مندی‌های خود را انتخاب کنید',
    mode: 'multiple',
    options: [
      { value: 'sports', label: 'ورزش' },
      { value: 'music', label: 'موسیقی' },
      { value: 'movies', label: 'فیلم' },
      { value: 'books', label: 'کتاب' },
      { value: 'travel', label: 'سفر' },
    ],
  },
};

export const WithDefaultValue = {
  args: {
    placeholder: 'لطفاً انتخاب کنید',
    options: options,
    defaultValue: '3',
  },
};

export const Disabled = {
  args: {
    placeholder: 'لطفاً انتخاب کنید',
    options: options,
    disabled: true,
  },
};

export const Loading = {
  args: {
    placeholder: 'در حال بارگذاری...',
    options: [],
    loading: true,
  },
};

export const WithError = {
  args: {
    label: 'استان',
    placeholder: 'استان خود را انتخاب کنید',
    options: [
      { value: 'tehran', label: 'تهران' },
      { value: 'isfahan', label: 'اصفهان' },
      { value: 'shiraz', label: 'شیراز' },
      { value: 'mashhad', label: 'مشهد' },
      { value: 'tabriz', label: 'تبریز' },
    ],
    error: true,
    helperText: 'لطفاً استان خود را انتخاب کنید',
  },
};

export const AllowClear = {
  args: {
    placeholder: 'لطفاً انتخاب کنید',
    options: options,
    allowClear: true,
    defaultValue: '2',
  },
};

export const Required = {
  args: {
    label: 'استان',
    placeholder: 'استان خود را انتخاب کنید',
    options: [
      { value: 'tehran', label: 'تهران' },
      { value: 'isfahan', label: 'اصفهان' },
      { value: 'shiraz', label: 'شیراز' },
      { value: 'mashhad', label: 'مشهد' },
      { value: 'tabriz', label: 'تبریز' },
    ],
    required: true,
  },
}; 
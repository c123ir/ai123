import React from 'react';
import Button from '../modules/shared/components/common/Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    children: 'دکمه اصلی',
    variant: 'contained',
    color: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'دکمه ثانویه',
    variant: 'contained',
    color: 'secondary',
  },
};

export const Outlined = {
  args: {
    children: 'دکمه خطی',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text = {
  args: {
    children: 'دکمه متنی',
    variant: 'text',
  },
};

export const Small = {
  args: {
    children: 'دکمه کوچک',
    variant: 'contained',
    color: 'primary',
    size: 'small',
  },
};

export const Large = {
  args: {
    children: 'دکمه بزرگ',
    variant: 'contained',
    color: 'primary',
    size: 'large',
  },
};

export const FullWidth = {
  args: {
    children: 'دکمه تمام عرض',
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
  },
}; 
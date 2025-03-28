import React from 'react';
import Snackbar from '../modules/shared/components/common/Snackbar';
import Button from '../modules/shared/components/common/Button';

export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// قابل توجه: در Storybook بهتر است از یک کامپوننت wrapper استفاده کنیم
// چون Snackbar معمولا به صورت موقتی نمایش داده می‌شود

// کامپوننت پوشش دهنده برای نمایش Snackbar
const SnackbarWrapper = ({ variant, message, action, ...args }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>نمایش اعلان</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        variant={variant}
        message={message}
        action={action}
        {...args}
      />
    </div>
  );
};

export const Default = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این یک پیام اعلان ساده است.',
  },
};

export const Success = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'عملیات با موفقیت انجام شد.',
    variant: 'success',
  },
};

export const Error = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.',
    variant: 'error',
  },
};

export const Warning = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این یک هشدار است. لطفاً توجه کنید.',
    variant: 'warning',
  },
};

export const Info = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این یک پیام اطلاع‌رسانی است.',
    variant: 'info',
  },
};

export const WithAction = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'تغییرات ذخیره شد.',
    variant: 'success',
    action: <Button size="small">بازگشت</Button>,
  },
};

export const WithLongText = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این یک پیام طولانی است که می‌تواند در چند خط نمایش داده شود. این پیام برای تست نحوه نمایش پیام‌های طولانی در اعلان‌ها استفاده می‌شود.',
    variant: 'info',
    action: <Button size="small">باشه</Button>,
  },
};

export const TopRight = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این اعلان در بالا سمت راست نمایش داده می‌شود.',
    variant: 'info',
    position: 'top-right',
  },
};

export const TopLeft = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این اعلان در بالا سمت چپ نمایش داده می‌شود.',
    variant: 'info',
    position: 'top-left',
  },
};

export const BottomLeft = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این اعلان در پایین سمت چپ نمایش داده می‌شود.',
    variant: 'info',
    position: 'bottom-left',
  },
};

export const BottomRight = {
  render: (args) => <SnackbarWrapper {...args} />,
  args: {
    message: 'این اعلان در پایین سمت راست نمایش داده می‌شود.',
    variant: 'info',
    position: 'bottom-right',
  },
}; 
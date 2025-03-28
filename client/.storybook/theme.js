import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  // برندینگ
  brandTitle: 'دستیار هوشمند ۱۲۳',
  brandUrl: 'https://intelligent-assistant-123.ir',
  brandTarget: '_self',
  
  // رنگ‌های اصلی
  colorPrimary: '#1677ff',
  colorSecondary: '#0e5fd8',

  // رنگ پس‌زمینه UI
  appBg: '#f6f9fc',
  appContentBg: '#ffffff',
  appBorderColor: '#e6e6e6',
  appBorderRadius: 8,

  // رنگ متن
  textColor: '#333333',
  textInverseColor: '#ffffff',

  // رنگ عناصر فرم
  inputBg: '#ffffff',
  inputBorder: '#cccccc',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  // فونت
  fontBase: 'Vazirmatn, sans-serif',
  fontCode: 'monospace',
}); 
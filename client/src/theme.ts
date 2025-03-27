import faIR from 'antd/es/locale/fa_IR';
import { ThemeConfig } from 'antd';

// تنظیمات تم روشن
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorTextBase: 'rgba(0, 0, 0, 0.85)',
    colorBgBase: '#ffffff',
    fontFamily: 'IRANSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    borderRadius: 4,
  },
  components: {
    Button: {
      paddingInline: 16,
      paddingBlock: 8,
    },
    Input: {
      paddingBlock: 8,
      paddingInline: 12,
    },
    Card: {
      boxShadow: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
    },
  },
};

// تنظیمات تم تاریک
export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorInfo: '#1890ff',
    colorSuccess: '#49aa19',
    colorWarning: '#d89614',
    colorError: '#dc4446',
    colorTextBase: 'rgba(255, 255, 255, 0.85)',
    colorBgBase: '#121212',
    fontFamily: 'IRANSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    borderRadius: 4,
  },
  components: {
    Button: {
      paddingInline: 16,
      paddingBlock: 8,
    },
    Input: {
      paddingBlock: 8,
      paddingInline: 12,
    },
    Card: {
      boxShadow: '0 1px 2px -2px rgba(255, 255, 255, 0.16), 0 3px 6px 0 rgba(255, 255, 255, 0.12), 0 5px 12px 4px rgba(255, 255, 255, 0.09)',
    },
  },
};

// تنظیمات کلی برای Ant Design
export const config = {
  direction: 'rtl' as 'rtl',
  locale: faIR,
  theme: lightTheme,
};

// تبدیل واحد rem به پیکسل
export const remToPx = (rem: number): number => {
  return rem * 16;
};

// تبدیل واحد پیکسل به rem
export const pxToRem = (px: number): number => {
  return px / 16;
}; 
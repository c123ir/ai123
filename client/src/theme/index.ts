import { ThemeConfig } from 'antd';

// تنظیمات تم روشن
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorTextBase: '#000000',
    colorBgBase: '#ffffff',
    fontFamily: 'Vazirmatn, -apple-system, BlinkMacSystemFont, sans-serif',
    borderRadius: 6,
  },
  components: {
    Button: {
      primaryColor: '#1677ff',
      defaultBorderColor: '#d9d9d9',
      defaultColor: 'rgba(0, 0, 0, 0.88)',
      defaultBg: '#ffffff',
    },
    Input: {
      colorBgContainer: '#ffffff',
    },
    Select: {
      colorBgContainer: '#ffffff',
    },
    Table: {
      colorBgContainer: '#ffffff',
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
  },
};

// تنظیمات تم تاریک
export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1668dc',
    colorInfo: '#1668dc',
    colorSuccess: '#49aa19',
    colorWarning: '#d89614',
    colorError: '#dc4446',
    colorTextBase: '#ffffff',
    colorBgBase: '#141414',
    fontFamily: 'Vazirmatn, -apple-system, BlinkMacSystemFont, sans-serif',
    borderRadius: 6,
  },
  components: {
    Button: {
      primaryColor: '#1668dc',
      defaultBorderColor: '#424242',
      defaultColor: 'rgba(255, 255, 255, 0.88)',
      defaultBg: '#141414',
    },
    Input: {
      colorBgContainer: '#1f1f1f',
    },
    Select: {
      colorBgContainer: '#1f1f1f',
    },
    Table: {
      colorBgContainer: '#1f1f1f',
    },
    Card: {
      colorBgContainer: '#1f1f1f',
    },
  },
}; 
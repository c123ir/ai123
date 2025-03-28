import { ConfigProvider } from 'antd';
import { themes } from '@storybook/theming';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store';

// ایجاد کش برای پشتیبانی از RTL
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// تنظیمات پیش‌فرض برای همه داستان‌ها
export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <CacheProvider value={rtlCache}>
          <ConfigProvider direction="rtl" theme={{
            token: {
              colorPrimary: '#1677ff',
              fontFamily: 'Vazirmatn, sans-serif',
            },
          }}>
            <div dir="rtl" style={{ padding: '1rem' }}>
              <Story />
            </div>
          </ConfigProvider>
        </CacheProvider>
      </BrowserRouter>
    </Provider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#f5f5f5',
      },
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
  direction: {
    // تنظیم جهت پیش‌فرض به RTL
    defaultDirection: 'rtl',
  },
  docs: {
    theme: themes.light,
  },
}; 
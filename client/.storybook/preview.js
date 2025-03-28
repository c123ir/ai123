import React from 'react';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import './vazir-font.css';

// پیکربندی قالب پارسی با راست به چپ
const withRtlTheme = (StoryFn) => {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          fontFamily: 'Vazir, -apple-system, BlinkMacSystemFont, sans-serif',
          colorPrimary: '#3498db',
          borderRadius: 6,
        },
      }}
    >
      <div dir="rtl" style={{ fontFamily: 'Vazir, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <StoryFn />
      </div>
    </ConfigProvider>
  );
};

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
          value: '#121212',
        },
      ],
    },
  },
  decorators: [withRtlTheme],
};

export default preview; 
// src/index.tsx - نقطه ورود اصلی برنامه

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import './assets/fonts/vazirmatn.css';
import './assets/fonts/fonts.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './components/common/ThemeContext';
import fa_IR from 'antd/locale/fa_IR';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);
// @ts-ignore
dayjs.calendar('jalali');

// تنظیمات مشترک تم برای Emotion
const emotionTheme = {
  colors: {
    primary: '#1890ff',
    secondary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    background: {
      light: '#ffffff',
      dark: '#141414'
    },
    text: {
      light: 'rgba(0, 0, 0, 0.85)',
      dark: 'rgba(255, 255, 255, 0.85)'
    }
  }
};

// تنظیم جهت و زبان برای کل برنامه
document.documentElement.setAttribute('dir', 'rtl');
document.documentElement.setAttribute('lang', 'fa');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        direction="rtl"
        locale={fa_IR}
        theme={{
          token: {
            fontFamily: 'Vazirmatn, -apple-system, BlinkMacSystemFont, sans-serif',
          },
        }}
      >
        <EmotionThemeProvider theme={emotionTheme}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </EmotionThemeProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

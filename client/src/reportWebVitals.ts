import { ReportHandler } from 'web-vitals';

/**
 * تابع گزارش‌گیری از متریک‌های حیاتی وب
 * این تابع برای ردیابی و گزارش‌دهی عملکرد برنامه استفاده می‌شود
 * متریک‌های مهم مانند LCP، FID، CLS و غیره را اندازه‌گیری می‌کند
 * 
 * @param onPerfEntry تابع callback برای دریافت نتایج
 */
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals; 
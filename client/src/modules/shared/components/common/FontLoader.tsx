import React, { useEffect } from 'react';

/**
 * کامپوننت بارگذاری و مدیریت فونت‌ها
 * این کامپوننت وظیفه لود کردن و اعمال فونت‌های مورد نیاز را در کل برنامه به عهده دارد
 */
const FontLoader: React.FC = () => {
  useEffect(() => {
    // اعمال تنظیمات پایه به عناصر HTML
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'fa');
    
    // تنظیم استایل‌های مربوط به فونت در صفحه
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        font-family: 'Vazirmatn', Tahoma, Arial, sans-serif !important;
      }
      
      .ant-typography, .ant-btn, .ant-input, .ant-select, .ant-menu-item, 
      .ant-tabs-tab, .ant-modal-title, .ant-drawer-title, .ant-form-item-label > label,
      .ant-form-item-control-input, .ant-checkbox + span, .ant-radio + span,
      .ant-steps-item-title, .ant-result-title, .ant-result-subtitle {
        font-family: 'Vazirmatn', Tahoma, Arial, sans-serif !important;
      }
    `;
    document.head.appendChild(style);
    
    // پاکسازی تغییرات هنگام آنمانت شدن کامپوننت
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // این کامپوننت هیچ المان UI را رندر نمی‌کند
  return null;
};

export default FontLoader;

import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  text?: string;
  fullPage?: boolean;
  size?: 'small' | 'default' | 'large';
}

/**
 * کامپوننت نمایش وضعیت بارگذاری
 * @param {string} text - متن نمایشی زیر آیکون لودینگ
 * @param {boolean} fullPage - آیا لودینگ تمام صفحه نمایش داده شود
 * @param {string} size - اندازه آیکون لودینگ (کوچک، متوسط، بزرگ)
 */
const Loading: React.FC<LoadingProps> = ({ 
  text = 'در حال بارگذاری...', 
  fullPage = false, 
  size = 'default' 
}) => {
  // تعیین اندازه لودینگ بر اساس پارامتر size
  const getIconSize = () => {
    switch(size) {
      case 'small': return 24;
      case 'large': return 40;
      case 'default':
      default: return 32;
    }
  };

  // استایل‌های پایه برای کانتینر
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  };

  // استایل‌های اضافی برای حالت تمام صفحه
  const fullPageStyle: React.CSSProperties = fullPage ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  } : {};

  // ترکیب استایل‌ها
  const combinedStyle = {
    ...containerStyle,
    ...fullPageStyle
  };

  // ایجاد آیکون سفارشی برای اسپینر
  const antIcon = <LoadingOutlined style={{ fontSize: getIconSize() }} spin />;

  return (
    <div style={combinedStyle}>
      <Spin indicator={antIcon} size={size} />
      {text && (
        <Typography.Text type="secondary" style={{ marginTop: 8 }}>
          {text}
        </Typography.Text>
      )}
    </div>
  );
};

export default Loading; 
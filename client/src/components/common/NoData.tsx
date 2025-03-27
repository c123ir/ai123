import React from 'react';
import { Empty, Typography } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import type { CSSProperties } from 'react';

interface NoDataProps {
  message?: string;
  icon?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * کامپوننت نمایش حالت خالی بودن داده‌ها
 * @param {string} message - پیام نمایشی
 * @param {React.ReactNode} icon - آیکون سفارشی
 * @param {CSSProperties} style - استایل‌های اضافی
 * @param {string} className - کلاس‌های اضافی
 */
const NoData: React.FC<NoDataProps> = ({
  message = 'داده‌ای برای نمایش وجود ندارد',
  icon,
  style = {},
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: 'var(--color-background-primary, #f5f5f5)',
        border: '1px dashed var(--color-border, #d9d9d9)',
        textAlign: 'center',
        margin: '16px 0',
        ...style,
      }}
    >
      <Empty 
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={
          <Typography.Text type="secondary">
            {message}
          </Typography.Text>
        }
      />
      
      {icon && (
        <div style={{ marginTop: 16, fontSize: '2rem', color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.45))' }}>
          {icon}
        </div>
      )}
    </div>
  );
};

export default NoData; 
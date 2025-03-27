import React, { ReactNode } from 'react';
import { Card as AntCard } from 'antd';
import styled from '@emotion/styled';

export interface CardProps {
  children?: ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  hoverable?: boolean;
  loading?: boolean;
  size?: 'default' | 'small';
  elevation?: number;
  variant?: 'elevation' | 'outlined' | 'borderless';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// استایل‌های کامپوننت Card به عنوان کلاس‌های واقعی
const CardStyled = styled.div`
  .ant-card {
    width: 100%;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    overflow: hidden;
  }

  &.outlined .ant-card {
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
  
  &.elevation-0 .ant-card { box-shadow: none; }
  &.elevation-1 .ant-card { box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); }
  &.elevation-2 .ant-card { box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12); }
  &.elevation-3 .ant-card { box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12); }
  &.elevation-4 .ant-card { box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12); }
  &.elevation-6 .ant-card { box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12); }
  &.elevation-8 .ant-card { box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12); }
  &.elevation-12 .ant-card { box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12); }
  &.elevation-16 .ant-card { box-shadow: 0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12); }
  &.elevation-24 .ant-card { box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12); }
`;

/**
 * کامپوننت Card برای نمایش محتوا در کارت
 * این کامپوننت جایگزینی برای Card از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Card title="عنوان کارت" elevation={3}>
 *   محتوای داخل کارت
 * </Card>
 * 
 * <Card 
 *   variant="outlined"
 *   title="کارت با عکس"
 *   cover={<img alt="example" src="https://example.com/image.jpg" />}
 * >
 *   محتوای داخل کارت
 * </Card>
 * ```
 */
const Card: React.FC<CardProps> = ({
  children,
  title,
  extra,
  cover,
  actions,
  className,
  style,
  hoverable = false,
  loading = false,
  size = 'default',
  elevation = 1,
  variant = 'elevation',
  onClick,
}) => {
  // تعیین کلاس‌های کارت
  const cardClasses = [
    className,
    variant === 'outlined' ? 'outlined' : '',
    variant === 'elevation' ? `elevation-${elevation}` : ''
  ].filter(Boolean).join(' ');

  // تنظیم variant در Ant Design
  const antVariant = variant === 'borderless' ? 'borderless' : 
                     variant === 'outlined' ? 'outlined' : 
                     undefined;

  return (
    <CardStyled className={cardClasses || undefined}>
      <AntCard
        title={title}
        extra={extra}
        cover={cover}
        actions={actions}
        style={style}
        variant={antVariant}
        hoverable={hoverable}
        loading={loading}
        size={size}
        onClick={onClick}
      >
        {children}
      </AntCard>
    </CardStyled>
  );
};

export const CardMeta = AntCard.Meta;
export const CardGrid = AntCard.Grid;

export default Card; 
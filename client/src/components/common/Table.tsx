import React from 'react';
import { Table as AntTable, TableProps as AntTableProps, Space, Button, Tooltip } from 'antd';
import { SearchOutlined, ReloadOutlined, FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export interface TableColumn<T> {
  title: string;
  dataIndex: string;
  key?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  sortDirections?: ('ascend' | 'descend')[];
  defaultSortOrder?: 'ascend' | 'descend';
  filters?: {
    text: string;
    value: string;
  }[];
  onFilter?: (value: string, record: T) => boolean;
  filterIcon?: React.ReactNode;
  width?: number | string;
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  align?: 'left' | 'center' | 'right';
  responsive?: string[];
}

export interface TableProps<T = any> {
  dataSource: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: AntTableProps<T>['pagination'] | false;
  rowSelection?: AntTableProps<T>['rowSelection'];
  rowKey?: string | ((record: T) => string);
  size?: 'small' | 'middle' | 'large';
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  bordered?: boolean;
  showHeader?: boolean;
  title?: () => React.ReactNode;
  footer?: () => React.ReactNode;
  onChange?: AntTableProps<T>['onChange'];
  onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLElement>;
  showSorterTooltip?: boolean;
  sortDirections?: ('ascend' | 'descend')[];
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showRefresh?: boolean;
  onRefresh?: () => void;
  showTools?: boolean;
  emptyText?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * کامپوننت جدول با استفاده از Ant Design
 * این کامپوننت برای نمایش داده‌های جدولی با قابلیت‌های مختلف مانند صفحه‌بندی، مرتب‌سازی، فیلتر و... استفاده می‌شود.
 */
const Table = <T extends object>({
  dataSource,
  columns,
  loading = false,
  pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
  },
  rowKey = 'id',
  size = 'middle',
  scroll,
  bordered = false,
  showHeader = true,
  title,
  footer,
  onChange,
  onRow,
  showSorterTooltip = true,
  sortDirections = ['ascend', 'descend'],
  showRefresh = false,
  onRefresh,
  showTools = false,
  emptyText,
  className,
  style,
  ...restProps
}: TableProps<T>) => {
  
  // ایجاد هدر جدول با ابزارهای اضافی
  const renderTitle = () => {
    if (!title && !showTools && !showRefresh) return undefined;
    
    return () => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>{title && title()}</div>
        <div>
          {showTools && (
            <Space>
              <Tooltip title="جستجو">
                <Button icon={<SearchOutlined />} size="small" />
              </Tooltip>
              <Tooltip title="فیلتر">
                <Button icon={<FilterOutlined />} size="small" />
              </Tooltip>
              <Tooltip title="دانلود">
                <Button icon={<DownloadOutlined />} size="small" />
              </Tooltip>
            </Space>
          )}
          {showRefresh && (
            <Tooltip title="به‌روزرسانی">
              <Button 
                icon={<ReloadOutlined />} 
                size="small" 
                onClick={onRefresh} 
                style={{ marginRight: showTools ? 8 : 0 }}
              />
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  // تنظیم متن خالی بودن جدول
  const locale = {
    emptyText: emptyText || 'داده‌ای برای نمایش وجود ندارد',
  };

  return (
    <AntTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      size={size}
      scroll={scroll}
      bordered={bordered}
      showHeader={showHeader}
      title={renderTitle()}
      footer={footer}
      onChange={onChange}
      onRow={onRow}
      showSorterTooltip={showSorterTooltip}
      sortDirections={sortDirections}
      locale={locale}
      className={className}
      style={style}
      {...restProps}
    />
  );
};

export default Table; 
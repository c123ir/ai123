import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableProps, Card, Input, Button, Space, Dropdown, Menu, Form, Select, DatePicker } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { ColumnType, ColumnGroupType } from 'antd/es/table';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  DownloadOutlined,
  SettingOutlined,
  ColumnHeightOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import TableColumn from './TableColumn';

const { RangePicker } = DatePicker;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 360px;
`;

const ToolsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

// استفاده از TableColumn به عنوان تایپ اصلی
export type DataGridColumn<T = any> = TableColumn<T>;

export interface FilterOption {
  column: string;
  operator: 'eq' | 'neq' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'between';
  value: any;
}

export interface DataGridProps<T = any> {
  dataSource: T[];
  columns: DataGridColumn<T>[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  title?: string;
  showToolbar?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showRefresh?: boolean;
  showSettings?: boolean;
  showSelection?: boolean;
  onSearch?: (value: string) => void;
  onRefresh?: () => void;
  onFilterChange?: (filters: FilterOption[]) => void;
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  pagination?: TableProps<T>['pagination'] | false;
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * کامپوننت DataGrid
 * یک کامپوننت جدول پیشرفته با قابلیت‌های متنوع مانند جستجو، فیلتر، انتخاب ردیف و غیره
 */
const DataGrid = <T extends object>({
  dataSource,
  columns,
  loading = false,
  rowKey = 'id',
  title,
  showToolbar = true,
  showSearch = true,
  showFilter = true,
  showRefresh = true,
  showSettings = true,
  showSelection = false,
  onSearch,
  onRefresh,
  onFilterChange,
  onSelectionChange,
  pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    defaultPageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total, range) => `${range[0]}-${range[1]} از ${total} مورد`,
  },
  scroll,
  size = 'middle',
  bordered = false,
  className,
  style,
}: DataGridProps<T>) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [tableSize, setTableSize] = useState<'small' | 'middle' | 'large'>(size);
  
  // مدیریت انتخاب ردیف‌ها
  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      if (onSelectionChange) {
        onSelectionChange(selectedKeys, selectedRows);
      }
    },
  };
  
  // مدیریت تغییر عبارت جستجو
  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch]);
  
  // مدیریت کلیک دکمه به‌روزرسانی
  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);
  
  // مدیریت تغییر فیلترها
  const handleFilterChange = useCallback((filters: FilterOption[]) => {
    setActiveFilters(filters);
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [onFilterChange]);
  
  // حذف ستون‌های مخفی و تبدیل به ColumnType
  const visibleColumns = columns.filter(col => !col.hidden);
  
  // منوی تغییر اندازه جدول
  const sizeMenu = (
    <Menu
      items={[
        {
          key: 'small',
          label: 'کوچک',
          onClick: () => setTableSize('small'),
        },
        {
          key: 'middle',
          label: 'متوسط',
          onClick: () => setTableSize('middle'),
        },
        {
          key: 'large',
          label: 'بزرگ',
          onClick: () => setTableSize('large'),
        },
      ]}
    />
  );
  
  // منوی گزینه‌های بیشتر
  const moreMenu = (
    <Menu
      items={[
        {
          key: 'excel',
          icon: <FileExcelOutlined />,
          label: 'خروجی اکسل',
        },
        {
          key: 'pdf',
          icon: <FilePdfOutlined />,
          label: 'خروجی PDF',
        },
      ]}
    />
  );
  
  return (
    <Card
      className={className}
      style={style}
      title={title}
      bodyStyle={{ padding: 0 }}
    >
      {showToolbar && (
        <ActionBar>
          {showSearch && (
            <SearchContainer>
              <Input
                placeholder="جستجو..."
                value={searchValue}
                onChange={e => handleSearch(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
              />
            </SearchContainer>
          )}
          
          <ToolsContainer>
            {showFilter && (
              <Button
                icon={<FilterOutlined />}
                onClick={() => setFilterVisible(!filterVisible)}
                type={activeFilters.length > 0 ? 'primary' : 'default'}
              >
                {activeFilters.length > 0 ? `فیلتر (${activeFilters.length})` : 'فیلتر'}
              </Button>
            )}
            
            {showRefresh && (
              <Button icon={<ReloadOutlined />} onClick={handleRefresh} />
            )}
            
            {showSettings && (
              <Dropdown overlay={sizeMenu} trigger={['click']}>
                <Button icon={<ColumnHeightOutlined />} />
              </Dropdown>
            )}
            
            <Dropdown overlay={moreMenu} trigger={['click']}>
              <Button icon={<EllipsisOutlined />} />
            </Dropdown>
          </ToolsContainer>
        </ActionBar>
      )}
      
      <Table<T>
        dataSource={dataSource}
        columns={visibleColumns as (ColumnGroupType<T> | ColumnType<T>)[]}
        loading={loading}
        rowKey={rowKey}
        rowSelection={showSelection ? rowSelection : undefined}
        pagination={pagination}
        scroll={scroll}
        size={tableSize}
        bordered={bordered}
        locale={{ 
          emptyText: 'داده‌ای برای نمایش وجود ندارد',
          filterConfirm: 'تایید',
          filterReset: 'پاک کردن',
        }}
      />
    </Card>
  );
};

export default DataGrid; 
import { ColumnType } from 'antd/es/table';
import { Key } from 'react';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';

/**
 * تعریف نوع TableColumn که گسترش یافته ColumnType است
 * با اصلاح نوع onFilter برای سازگاری با Ant Design 
 */
export interface TableColumn<T = any> extends Omit<ColumnType<T>, 'onFilter'> {
  title: string;
  dataIndex: string;
  key?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  sortDirections?: ('ascend' | 'descend')[];
  defaultSortOrder?: 'ascend' | 'descend';
  filters?: {
    text: string;
    value: string | number | boolean;
  }[];
  onFilter?: (value: boolean | Key, record: T) => boolean;
  filterDropdown?: React.ReactNode;
  filterIcon?: boolean | React.ReactNode;
  width?: number | string;
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
  align?: 'left' | 'center' | 'right';
  editable?: boolean;
  responsive?: Breakpoint[];
  hidden?: boolean;
  required?: boolean;
}

export default TableColumn; 
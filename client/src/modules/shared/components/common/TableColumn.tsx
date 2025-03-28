import { ColumnType } from 'antd/es/table';
import { Key } from 'react';
import type { Breakpoint } from 'antd/es/_util/responsiveObserver';

/**
 * تعریف نوع TableColumn که گسترش یافته ColumnType است
 * این تایپ برای تعریف ستون‌های جدول استفاده می‌شود
 * با قابلیت‌های گسترش یافته برای پاسخگویی
 */
export interface TableColumn<T = any> extends Omit<ColumnType<T>, 'onFilter'> {
  /**
   * کلید یکتا برای شناسایی ستون
   */
  key?: Key;
  
  /**
   * عنوان ستون که در هدر جدول نمایش داده می‌شود
   */
  title: React.ReactNode;
  
  /**
   * نام ویژگی داده که مقدار ستون را از آن می‌خواند
   */
  dataIndex?: string;
  
  /**
   * تنظیمات پاسخگویی برای نمایش/پنهان کردن ستون در اندازه‌های مختلف صفحه
   */
  responsive?: Breakpoint[];
  
  /**
   * اینکه آیا این ستون می‌تواند مرتب‌سازی شود
   */
  sortable?: boolean;
  
  /**
   * اینکه آیا این ستون می‌تواند فیلتر شود
   */
  filterable?: boolean;
}

// کامپوننت TableColumn
// این کامپوننت فقط برای تعریف نوع استفاده می‌شود و هیچ محتوایی ندارد
const TableColumn: React.FC<TableColumn<any>> = () => null;

export default TableColumn;
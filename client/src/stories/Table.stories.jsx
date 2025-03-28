import React from 'react';
import Table from '../modules/shared/components/common/Table';
import { Tag, Space, Button, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// داده‌های نمونه
const sampleData = Array(20).fill(null).map((_, i) => ({
  id: `${i + 1}`,
  name: `کاربر ${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'pending',
  age: 20 + i,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

// ستون‌های نمونه
const columns = [
  {
    title: 'آواتار',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar) => <Avatar src={avatar} />,
    width: 80,
  },
  {
    title: 'نام',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'نام کاربری',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'ایمیل',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'سن',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'وضعیت',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = 'default';
      let text = 'نامشخص';
      
      if (status === 'active') {
        color = 'success';
        text = 'فعال';
      } else if (status === 'inactive') {
        color = 'error';
        text = 'غیرفعال';
      } else if (status === 'pending') {
        color = 'warning';
        text = 'در انتظار';
      }
      
      return <Tag color={color}>{text}</Tag>;
    },
    filters: [
      { text: 'فعال', value: 'active' },
      { text: 'غیرفعال', value: 'inactive' },
      { text: 'در انتظار', value: 'pending' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'عملیات',
    key: 'actions',
    render: () => (
      <Space>
        <Button icon={<EyeOutlined />} size="small" type="text" />
        <Button icon={<EditOutlined />} size="small" type="text" />
        <Button icon={<DeleteOutlined />} size="small" type="text" danger />
      </Space>
    ),
  },
];

export const Default = {
  args: {
    dataSource: sampleData,
    columns: columns,
  },
};

export const Loading = {
  args: {
    dataSource: sampleData,
    columns: columns,
    loading: true,
  },
};

export const NoPagination = {
  args: {
    dataSource: sampleData.slice(0, 5),
    columns: columns,
    pagination: false,
  },
};

export const CustomPagination = {
  args: {
    dataSource: sampleData,
    columns: columns,
    pagination: {
      pageSize: 5,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `مجموع ${total} مورد`,
    },
  },
};

export const WithBorder = {
  args: {
    dataSource: sampleData,
    columns: columns,
    bordered: true,
  },
};

export const Small = {
  args: {
    dataSource: sampleData,
    columns: columns,
    size: 'small',
  },
};

export const WithTools = {
  args: {
    dataSource: sampleData,
    columns: columns,
    showTools: true,
    showRefresh: true,
    onRefresh: () => console.log('تازه‌سازی جدول'),
    title: () => 'جدول کاربران',
  },
}; 
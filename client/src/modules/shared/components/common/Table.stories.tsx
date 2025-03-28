import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Table, { TableColumn } from './Table';
import { Avatar, Tag, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

export default {
  title: 'Shared/Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: 'کامپوننت جدول برای نمایش داده‌های جدولی با قابلیت‌های مرتب‌سازی، فیلتر و صفحه‌بندی',
      },
    },
  },
} as Meta<typeof Table>;

// تعریف نوع داده برای استفاده در نمونه
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  age: number;
  avatar: string;
}

// داده‌های نمونه
const sampleUsers: User[] = Array(20).fill(null).map((_, i) => ({
  id: `user-${i + 1}`,
  name: `کاربر ${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'pending',
  age: 20 + i,
  avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${i + 1}.jpg`,
}));

// ستون‌های نمونه
const columns: TableColumn<User>[] = [
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

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  dataSource: sampleUsers,
  columns: columns,
};
Default.parameters = {
  docs: {
    description: {
      story: 'جدول پیش‌فرض با داده‌های نمونه',
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  dataSource: sampleUsers,
  columns: columns,
  loading: true,
};

export const NoPagination = Template.bind({});
NoPagination.args = {
  dataSource: sampleUsers.slice(0, 5),
  columns: columns,
  pagination: false,
};

export const CustomPagination = Template.bind({});
CustomPagination.args = {
  dataSource: sampleUsers,
  columns: columns,
  pagination: {
    pageSize: 5,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `مجموع ${total} مورد`,
  },
};

export const Bordered = Template.bind({});
Bordered.args = {
  dataSource: sampleUsers,
  columns: columns,
  bordered: true,
};

export const Small = Template.bind({});
Small.args = {
  dataSource: sampleUsers,
  columns: columns,
  size: 'small',
};

export const WithTools = Template.bind({});
WithTools.args = {
  dataSource: sampleUsers,
  columns: columns,
  showTools: true,
  showRefresh: true,
  onRefresh: () => console.log('تازه‌سازی جدول'),
  title: () => 'جدول کاربران',
}; 
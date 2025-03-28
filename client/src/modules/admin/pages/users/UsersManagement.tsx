import React from 'react';
import { Button, Card, Input, Space, Table, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

/**
 * کامپوننت مدیریت کاربران
 */
const UsersManagement: React.FC = () => {
  // داده‌های نمونه برای جدول کاربران
  const usersData = [
    {
      key: '1',
      id: 1,
      name: 'علی محمدی',
      email: 'ali@example.com',
      role: 'ادمین',
      status: 'فعال',
      joined: '1400/03/15',
    },
    {
      key: '2',
      id: 2,
      name: 'زهرا احمدی',
      email: 'zahra@example.com',
      role: 'کاربر',
      status: 'فعال',
      joined: '1400/05/20',
    },
    {
      key: '3',
      id: 3,
      name: 'رضا کریمی',
      email: 'reza@example.com',
      role: 'کاربر',
      status: 'غیرفعال',
      joined: '1401/01/10',
    },
  ];

  // ستون‌های جدول کاربران
  const columns = [
    {
      title: 'شناسه',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'ایمیل',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'نقش',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        role === 'ادمین' ? <Tag color="purple">{role}</Tag> : <Tag color="blue">{role}</Tag>
      ),
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        status === 'فعال' ? <Tag color="green">{status}</Tag> : <Tag color="red">{status}</Tag>
      ),
    },
    {
      title: 'تاریخ عضویت',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>مدیریت کاربران</h1>
      
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Input 
            placeholder="جستجو در کاربران..." 
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            افزودن کاربر جدید
          </Button>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={usersData} 
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default UsersManagement; 
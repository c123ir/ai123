import React from 'react';
import { Button, Card, Input, Space, Table, Tag, Tooltip } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

/**
 * کامپوننت مدیریت توکن‌ها
 */
const TokensManagement: React.FC = () => {
  // داده‌های نمونه برای جدول توکن‌ها
  const tokensData = [
    {
      key: '1',
      id: 1,
      userId: 1,
      userName: 'علی محمدی',
      amount: 500,
      type: 'پاداشی',
      status: 'فعال',
      expiry: '1402/12/29',
    },
    {
      key: '2',
      id: 2,
      userId: 2,
      userName: 'زهرا احمدی',
      amount: 1000,
      type: 'خریداری شده',
      status: 'فعال',
      expiry: 'نامحدود',
    },
    {
      key: '3',
      id: 3,
      userId: 3,
      userName: 'رضا کریمی',
      amount: 200,
      type: 'وفاداری',
      status: 'منقضی شده',
      expiry: '1401/06/01',
    },
  ];

  // ستون‌های جدول توکن‌ها
  const columns = [
    {
      title: 'شناسه',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'کاربر',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'مقدار',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => <span>{amount.toLocaleString()} توکن</span>,
    },
    {
      title: 'نوع',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        let color = 'blue';
        if (type === 'پاداشی') color = 'gold';
        if (type === 'خریداری شده') color = 'green';
        if (type === 'وفاداری') color = 'purple';
        
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'فعال') {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {status}
            </Tag>
          );
        }
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'تاریخ انقضا',
      dataIndex: 'expiry',
      key: 'expiry',
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="مشاهده تراکنش‌ها">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="ویرایش">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="حذف">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>مدیریت توکن‌ها</h1>
      
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <Input 
            placeholder="جستجو در توکن‌ها..." 
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            افزودن توکن جدید
          </Button>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={tokensData} 
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default TokensManagement; 
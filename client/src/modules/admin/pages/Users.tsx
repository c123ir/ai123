import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Typography, Space, Input, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { userService } from '../services/api';

const { Title } = Typography;

const Users: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers({});
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('خطا در بارگذاری کاربران:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userService.deleteUser(id);
      message.success('کاربر با موفقیت حذف شد');
      fetchUsers();
    } catch (error) {
      console.error('خطا در حذف کاربر:', error);
    }
  };

  const filteredUsers = users.filter((user: any) => 
    user.name.toLowerCase().includes(searchText.toLowerCase()) || 
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          {record.avatar ? (
            <img 
              src={record.avatar} 
              alt={text} 
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
          ) : (
            <div 
              style={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                backgroundColor: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              {text.charAt(0).toUpperCase()}
            </div>
          )}
          {text}
        </Space>
      ),
    },
    {
      title: 'ایمیل',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'تاریخ ثبت‌نام',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('fa-IR'),
    },
    {
      title: 'نقش',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => role === 'admin' ? 'مدیر' : 'کاربر',
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => console.log('ویرایش کاربر', record.id)}
          >
            ویرایش
          </Button>
          <Popconfirm
            title="آیا از حذف این کاربر اطمینان دارید؟"
            onConfirm={() => handleDelete(record.id)}
            okText="بله"
            cancelText="خیر"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              حذف
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="users-container" style={{ padding: '20px' }}>
      <Card variant="borderless">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Title level={3}>مدیریت کاربران</Title>
          <Space>
            <Input
              placeholder="جستجو..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => console.log('افزودن کاربر جدید')}
            >
              افزودن کاربر
            </Button>
          </Space>
        </div>
        
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Users; 
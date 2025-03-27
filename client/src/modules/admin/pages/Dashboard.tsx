import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, List, Typography } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, LineChartOutlined } from '@ant-design/icons';

const { Title } = Typography;

// داده‌های نمونه برای آمار
const statsData = {
  totalUsers: 1250,
  totalOrders: 856,
  totalRevenue: 125600,
  conversionRate: 3.2
};

// داده‌های نمونه برای تراکنش‌های اخیر
const recentTransactions = [
  { id: 1, user: 'علی محمدی', amount: 1200000, date: '1402/04/15', status: 'تکمیل شده' },
  { id: 2, user: 'مریم احمدی', amount: 850000, date: '1402/04/14', status: 'در انتظار' },
  { id: 3, user: 'رضا کریمی', amount: 3500000, date: '1402/04/13', status: 'تکمیل شده' },
  { id: 4, user: 'زهرا حسینی', amount: 1750000, date: '1402/04/12', status: 'تکمیل شده' },
  { id: 5, user: 'امیر رضایی', amount: 920000, date: '1402/04/11', status: 'لغو شده' },
];

// داده‌های نمونه برای کاربران جدید
const newUsers = [
  { id: 1, name: 'سارا رضایی', email: 'sara@example.com', date: '1402/04/15' },
  { id: 2, name: 'محمد علی‌پور', email: 'mohammad@example.com', date: '1402/04/14' },
  { id: 3, name: 'نیلوفر کریمی', email: 'niloofar@example.com', date: '1402/04/13' },
];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها از سرور
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    {
      title: 'شناسه',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'کاربر',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'مبلغ (تومان)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => amount.toLocaleString('fa-IR'),
    },
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        if (status === 'تکمیل شده') color = 'green';
        else if (status === 'در انتظار') color = 'blue';
        else if (status === 'لغو شده') color = 'red';
        
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <Title level={2}>داشبورد مدیریت</Title>
      
      {/* آمار کلی */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="کاربران"
              value={statsData.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="سفارشات"
              value={statsData.totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="درآمد کل (تومان)"
              value={statsData.totalRevenue}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="نرخ تبدیل"
              value={statsData.conversionRate}
              precision={1}
              suffix="%"
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* تراکنش‌های اخیر */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title="تراکنش‌های اخیر" 
            variant="borderless"
            loading={loading}
          >
            <Table 
              columns={columns} 
              dataSource={recentTransactions} 
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="کاربران جدید" 
            variant="borderless"
            loading={loading}
          >
            <List
              itemLayout="horizontal"
              dataSource={newUsers}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<UserOutlined style={{ fontSize: '24px' }} />}
                    title={item.name}
                    description={
                      <>
                        <div>{item.email}</div>
                        <small>تاریخ ثبت‌نام: {item.date}</small>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 
import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Typography, 
  Statistic, 
  Table, 
  Avatar, 
  List, 
  Tag, 
  Divider, 
  Button, 
  Space,
  Badge,
  Dropdown
} from 'antd';
import { 
  UserOutlined, 
  KeyOutlined, 
  RiseOutlined, 
  BarChartOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  ClockCircleOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { theme } from 'antd';

const { Title, Text } = Typography;
const { useToken } = theme;

/**
 * کامپوننت داشبورد مدیریت
 */
const Dashboard: React.FC = () => {
  const { token } = useToken();
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([
    { 
      id: 1, 
      name: 'علی محمدی', 
      email: 'ali@example.com', 
      avatarUrl: null, 
      date: '1402/12/10', 
      role: 'کاربر',
    },
    { 
      id: 2, 
      name: 'زهرا احمدی', 
      email: 'zahra@example.com', 
      avatarUrl: null, 
      date: '1402/12/08', 
      role: 'کاربر',
    },
    { 
      id: 3, 
      name: 'رضا حسینی', 
      email: 'reza@example.com', 
      avatarUrl: null, 
      date: '1402/12/05', 
      role: 'کاربر',
    },
  ]);

  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      user: 'محمد کریمی',
      amount: '۵۰,۰۰۰',
      status: 'موفق',
      date: '1402/12/10',
    },
    {
      id: 2,
      user: 'فاطمه رضایی',
      amount: '۲۰,۰۰۰',
      status: 'موفق',
      date: '1402/12/09',
    },
    {
      id: 3,
      user: 'حسین علوی',
      amount: '۱۰۰,۰۰۰',
      status: 'ناموفق',
      date: '1402/12/08',
    },
    {
      id: 4,
      user: 'مریم حسینی',
      amount: '۳۰,۰۰۰',
      status: 'موفق',
      date: '1402/12/07',
    },
  ]);
  
  // ستون‌های جدول تراکنش‌ها
  const transactionColumns = [
    {
      title: 'کاربر',
      dataIndex: 'user',
      key: 'user',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'مبلغ (تومان)',
      dataIndex: 'amount',
      key: 'amount',
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
      render: (status: string) => (
        <Tag color={status === 'موفق' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
  ];
  
  useEffect(() => {
    // شبیه‌سازی دریافت داده‌ها
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Title level={4}>داشبورد مدیریت</Title>
      
      <Divider />
      
      {/* آمار کلی */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space direction="horizontal">
              <Avatar
                style={{ 
                  backgroundColor: token.colorPrimaryBg, 
                  color: token.colorPrimary,
                  marginRight: 8
                }}
                icon={<UserOutlined />} 
              />
              <Statistic
                title="کاربران فعال"
                value={1234}
                precision={0}
                valueStyle={{ color: token.colorPrimary }}
                suffix={
                  <div>
                    <ArrowUpOutlined style={{ fontSize: 12, color: token.colorSuccess }} />
                    <Text type="success" style={{ fontSize: 12 }}>+۵.۳٪</Text>
                  </div>
                }
              />
            </Space>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space direction="horizontal">
              <Avatar
                style={{ 
                  backgroundColor: token.colorInfoBg, 
                  color: token.colorInfo,
                  marginRight: 8
                }}
                icon={<KeyOutlined />} 
              />
              <Statistic
                title="توکن‌های مصرف شده"
                value={7890}
                precision={0}
                valueStyle={{ color: token.colorInfo }}
                suffix={
                  <div>
                    <ArrowUpOutlined style={{ fontSize: 12, color: token.colorSuccess }} />
                    <Text type="success" style={{ fontSize: 12 }}>+۱۲.۸٪</Text>
                  </div>
                }
              />
            </Space>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space direction="horizontal">
              <Avatar
                style={{ 
                  backgroundColor: token.colorSuccessBg, 
                  color: token.colorSuccess,
                  marginRight: 8
                }}
                icon={<RiseOutlined />} 
              />
              <Statistic
                title="درآمد (میلیون تومان)"
                value={45.7}
                precision={1}
                valueStyle={{ color: token.colorSuccess }}
                suffix={
                  <div>
                    <ArrowUpOutlined style={{ fontSize: 12, color: token.colorSuccess }} />
                    <Text type="success" style={{ fontSize: 12 }}>+۸.۴٪</Text>
                  </div>
                }
              />
            </Space>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Space direction="horizontal">
              <Avatar
                style={{ 
                  backgroundColor: token.colorErrorBg, 
                  color: token.colorError,
                  marginRight: 8
                }}
                icon={<BarChartOutlined />} 
              />
              <Statistic
                title="نرخ تبدیل"
                value={25.4}
                precision={1}
                valueStyle={{ color: token.colorError }}
                suffix={
                  <div>
                    <ArrowDownOutlined style={{ fontSize: 12, color: token.colorError }} />
                    <Text type="danger" style={{ fontSize: 12 }}>-۲.۴٪</Text>
                  </div>
                }
                suffix="%"
              />
            </Space>
          </Card>
        </Col>
      </Row>
      
      {/* کارت‌های اطلاعات */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card 
            title="کاربران جدید"
            bordered={false}
            extra={
              <Dropdown menu={{ items: [
                { key: '1', label: 'مشاهده همه' },
                { key: '2', label: 'حذف' },
                { key: '3', label: 'ویرایش' },
              ]}} 
              placement="bottomRight"
              arrow
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            }
          >
            <List
              loading={loading}
              dataSource={recentUsers}
              renderItem={(user) => (
                <List.Item
                  key={user.id}
                  actions={[
                    <Tag color="blue">{user.role}</Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
                    title={<a href="#">{user.name}</a>}
                    description={
                      <Space>
                        <ClockCircleOutlined style={{ fontSize: 12 }} />
                        <span>{user.date}</span>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card 
            title="آخرین تراکنش‌ها"
            bordered={false}
            extra={
              <Dropdown menu={{ items: [
                { key: '1', label: 'مشاهده همه' },
                { key: '2', label: 'دریافت گزارش' },
              ]}} 
              placement="bottomRight"
              arrow
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            }
          >
            <Table 
              loading={loading}
              dataSource={recentTransactions} 
              columns={transactionColumns} 
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card 
            title="آمار فعالیت سیستم"
            bordered={false}
            extra={
              <Space>
                <Button type="primary">مشاهده جزئیات</Button>
              </Space>
            }
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
              <Text>نمودار آمار فعالیت سیستم در اینجا نمایش داده می‌شود.</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard; 
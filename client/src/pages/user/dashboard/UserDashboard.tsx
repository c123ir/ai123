import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Table, Button, Tabs, List, Tag, Space } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  TeamOutlined, 
  LineChartOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../modules/shared/context/ThemeContext';
import { ColumnsType } from 'antd/es/table';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

/**
 * صفحه داشبورد کاربر
 */
const UserDashboard: React.FC = () => {
  const { darkMode } = useTheme();
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');

  // داده‌های آماری کاربر
  const userStats = [
    {
      title: 'توکن‌های باقیمانده',
      value: 355,
      suffix: 'توکن',
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      title: 'دستگاه‌های فعال',
      value: 3,
      suffix: 'دستگاه',
      icon: <TeamOutlined />,
      color: '#52c41a',
    },
    {
      title: 'گارانتی‌های فعال',
      value: 12,
      suffix: 'مورد',
      icon: <CheckCircleOutlined />,
      color: '#722ed1',
    },
    {
      title: 'زمان تا انقضای اشتراک',
      value: 42,
      suffix: 'روز',
      icon: <ClockCircleOutlined />,
      color: '#fa8c16',
    },
  ];

  // داده‌های فعالیت‌های اخیر
  const recentActivities = [
    {
      id: 1,
      activity: 'محاسبه وام خودرو',
      date: '۱۴۰۳/۰۴/۰۶',
      status: 'موفق',
      tokens: -5,
    },
    {
      id: 2,
      activity: 'ثبت گارانتی جدید',
      date: '۱۴۰۳/۰۴/۰۲',
      status: 'موفق',
      tokens: -10,
    },
    {
      id: 3,
      activity: 'محاسبه سود سپرده',
      date: '۱۴۰۳/۰۳/۲۵',
      status: 'موفق',
      tokens: -5,
    },
    {
      id: 4,
      activity: 'تمدید اشتراک',
      date: '۱۴۰۳/۰۳/۰۱',
      status: 'موفق',
      tokens: -100,
    },
    {
      id: 5,
      activity: 'خرید بسته توکن',
      date: '۱۴۰۳/۰۲/۱۵',
      status: 'موفق',
      tokens: 500,
    },
  ];

  // تعریف ستون‌های جدول فعالیت‌ها
  const columns: ColumnsType<any> = [
    {
      title: 'فعالیت',
      dataIndex: 'activity',
      key: 'activity',
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
      render: (status) => (
        <Tag color={status === 'موفق' ? 'success' : status === 'در انتظار' ? 'warning' : 'error'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'توکن',
      dataIndex: 'tokens',
      key: 'tokens',
      render: (tokens) => (
        <Text type={tokens > 0 ? 'success' : 'danger'}>
          {tokens > 0 ? (
            <RiseOutlined style={{ marginLeft: 5 }} />
          ) : (
            <FallOutlined style={{ marginLeft: 5 }} />
          )}
          {tokens > 0 ? `+${tokens}` : tokens}
        </Text>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <DashboardOutlined style={{ marginLeft: 8 }} />
          داشبورد کاربری
        </Title>
        <Paragraph>خلاصه‌ای از اطلاعات و فعالیت‌های شما</Paragraph>
      </div>

      {/* آمار کاربر */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {userStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              bordered={false} 
              style={{ 
                borderRadius: '8px',
                backgroundColor: darkMode ? '#1f1f1f' : '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              }}
            >
              <Statistic
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      padding: '8px',
                      borderRadius: '4px',
                      marginLeft: '8px',
                      background: darkMode ? `${stat.color}30` : `${stat.color}10`,
                      color: stat.color
                    }}>
                      {stat.icon}
                    </div>
                    {stat.title}
                  </div>
                }
                value={stat.value}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* فعالیت‌های اخیر */}
        <Col xs={24} lg={16} style={{ marginBottom: 16 }}>
          <Card
            title="فعالیت‌های اخیر"
            bordered={false}
            style={{ 
              borderRadius: '8px',
              height: '100%', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
            extra={
              <Button type="link" size="small">
                مشاهده همه
              </Button>
            }
          >
            <Tabs activeKey={period} onChange={(key) => setPeriod(key as any)}>
              <TabPane tab="امروز" key="day" />
              <TabPane tab="هفته جاری" key="week" />
              <TabPane tab="ماه جاری" key="month" />
            </Tabs>
            <Table
              dataSource={recentActivities}
              columns={columns}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        {/* اطلاعیه‌ها */}
        <Col xs={24} lg={8} style={{ marginBottom: 16 }}>
          <Card
            title="اطلاعیه‌ها"
            bordered={false}
            style={{ 
              borderRadius: '8px',
              height: '100%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'بروزرسانی سیستم',
                  description: 'در تاریخ ۱۴۰۳/۰۴/۱۰ سیستم برای بروزرسانی در دسترس نخواهد بود.',
                  type: 'warning',
                },
                {
                  title: 'یادآوری گارانتی',
                  description: 'گارانتی محصول X تا ۲۰ روز دیگر منقضی می‌شود.',
                  type: 'info',
                },
                {
                  title: 'پیشنهاد ویژه',
                  description: 'با معرفی دوستان خود ۵۰ توکن رایگان دریافت کنید.',
                  type: 'success',
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      item.type === 'warning' ? (
                        <WarningOutlined style={{ color: '#faad14', fontSize: 20 }} />
                      ) : item.type === 'info' ? (
                        <ClockCircleOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                      ) : (
                        <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} />
                      )
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* آمار عملکرد */}
        <Col xs={24} style={{ marginBottom: 16 }}>
          <Card
            title="آمار استفاده از سرویس‌ها"
            bordered={false}
            style={{ 
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="محاسبات مالی"
                    value={28}
                    suffix="مورد"
                    prefix={<LineChartOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="گارانتی‌های ثبت شده"
                    value={12}
                    suffix="مورد"
                    prefix={<CheckCircleOutlined />}
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="توکن‌های مصرف شده"
                    value={145}
                    suffix="توکن"
                    prefix={<FallOutlined />}
                    valueStyle={{ color: '#fa8c16' }}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* دکمه‌های عملیات سریع */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Space size="large">
          <Button type="primary" size="large">
            محاسبه جدید
          </Button>
          <Button size="large">
            خرید توکن
          </Button>
          <Button size="large">
            ثبت گارانتی جدید
          </Button>
        </Space>
      </div>
    </>
  );
};

export default UserDashboard; 
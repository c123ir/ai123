import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Table, Button, Tabs, List, Tag, Space, Progress, Avatar, Divider } from 'antd';
import { 
  DashboardOutlined, 
  UserOutlined, 
  TeamOutlined, 
  LineChartOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
  CloudServerOutlined,
  SyncOutlined,
  CheckOutlined,
  CloseOutlined
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
  const [activeDevicesTab, setActiveDevicesTab] = useState<'all' | 'online' | 'offline'>('all');

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

  // دستگاه‌های کاربر
  const userDevices = [
    {
      id: 1,
      name: 'لپ تاپ شخصی',
      type: 'laptop',
      icon: <DesktopOutlined />,
      status: 'online',
      lastActive: 'هم اکنون',
      os: 'Windows 11',
      location: 'تهران، ایران',
      usagePercent: 85,
    },
    {
      id: 2,
      name: 'گوشی هوشمند',
      type: 'mobile',
      icon: <MobileOutlined />,
      status: 'online',
      lastActive: '۵ دقیقه پیش',
      os: 'Android 14',
      location: 'تهران، ایران',
      usagePercent: 65,
    },
    {
      id: 3,
      name: 'تبلت',
      type: 'tablet',
      icon: <TabletOutlined />,
      status: 'offline',
      lastActive: '۲ روز پیش',
      os: 'iPadOS 16',
      location: 'اصفهان، ایران',
      usagePercent: 20,
    },
    {
      id: 4,
      name: 'سرور ابری',
      type: 'server',
      icon: <CloudServerOutlined />,
      status: 'online',
      lastActive: '۱ ساعت پیش',
      os: 'Linux Ubuntu',
      location: 'فرانکفورت، آلمان',
      usagePercent: 92,
    },
  ];

  // فیلتر کردن دستگاه‌ها بر اساس وضعیت
  const filteredDevices = userDevices.filter(device => 
    activeDevicesTab === 'all' || 
    (activeDevicesTab === 'online' && device.status === 'online') || 
    (activeDevicesTab === 'offline' && device.status === 'offline')
  );

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
              className="dashboard-card"
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

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* دستگاه‌های من */}
        <Col xs={24} lg={24}>
          <Card
            title="دستگاه‌های من"
            bordered={false}
            style={{ 
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
            className="dashboard-card"
            extra={
              <Button type="primary" icon={<TeamOutlined />} size="small">
                افزودن دستگاه جدید
              </Button>
            }
          >
            <Tabs activeKey={activeDevicesTab} onChange={(key) => setActiveDevicesTab(key as any)}>
              <TabPane tab="همه دستگاه‌ها" key="all" />
              <TabPane tab="آنلاین" key="online" />
              <TabPane tab="آفلاین" key="offline" />
            </Tabs>
            
            <List
              dataSource={filteredDevices}
              renderItem={device => (
                <List.Item
                  key={device.id}
                  actions={[
                    device.status === 'online' ? (
                      <Button type="text" icon={<SyncOutlined />} size="small">
                        همگام‌سازی
                      </Button>
                    ) : (
                      <Button type="text" icon={<WarningOutlined />} size="small">
                        بررسی مشکل
                      </Button>
                    ),
                    <Button type="text" danger icon={<CloseOutlined />} size="small">
                      حذف دستگاه
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={device.icon}
                        style={{ 
                          backgroundColor: device.status === 'online' ? '#52c41a' : '#bfbfbf',
                          fontSize: 20
                        }}
                        size={48}
                      />
                    }
                    title={
                      <Space>
                        {device.name}
                        <Tag color={device.status === 'online' ? 'success' : 'default'}>
                          {device.status === 'online' ? 'آنلاین' : 'آفلاین'}
                        </Tag>
                      </Space>
                    }
                    description={
                      <>
                        <Text type="secondary">
                          سیستم عامل: {device.os} | آخرین فعالیت: {device.lastActive} | موقعیت: {device.location}
                        </Text>
                        <div style={{ marginTop: 8, width: '50%' }}>
                          <Progress 
                            percent={device.usagePercent} 
                            size="small" 
                            status={
                              device.status === 'online' ? 
                              (device.usagePercent > 80 ? 'exception' : 'active') : 
                              'normal'
                            }
                          />
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            میزان استفاده: {device.usagePercent}%
                          </Text>
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
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
            className="dashboard-card"
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
            className="dashboard-card"
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'بروزرسانی سیستم',
                  description: 'در تاریخ ۱۴۰۳/۰۴/۱۰ سیستم برای بروزرسانی در دسترس نخواهد بود.',
                  type: 'warning',
                  time: '۲ ساعت پیش'
                },
                {
                  title: 'یادآوری گارانتی',
                  description: 'گارانتی محصول X تا ۲۰ روز دیگر منقضی می‌شود.',
                  type: 'info',
                  time: '۱ روز پیش'
                },
                {
                  title: 'پیشنهاد ویژه',
                  description: 'با معرفی دوستان خود ۵۰ توکن رایگان دریافت کنید.',
                  type: 'success',
                  time: '۳ روز پیش'
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
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.title}</span>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                      </div>
                    }
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserDashboard; 
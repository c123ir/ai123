import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Row, 
  Col, 
  Button, 
  Statistic, 
  Tabs, 
  Table, 
  Tag, 
  Space,
  List,
  Avatar,
  Progress,
  Popover,
  Divider,
  Empty
} from 'antd';
import {
  KeyOutlined,
  WalletOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  DollarOutlined,
  LineChartOutlined,
  SwapOutlined,
  HistoryOutlined,
  UserOutlined,
  CrownOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../modules/shared/context/ThemeContext';
import { ColumnsType } from 'antd/es/table';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

/**
 * صفحه مدیریت توکن‌های کاربر
 */
const TokenPage: React.FC = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('1');

  // اطلاعات توکن کاربر
  const tokenInfo = {
    balance: 355,
    totalEarned: 720,
    totalSpent: 365,
    expiringTokens: 50,
    expirationDate: '۱۴۰۳/۰۷/۱۰',
    transactionHistory: [
      { 
        id: 1, 
        date: '۱۴۰۳/۰۴/۰۵', 
        type: 'دریافت', 
        amount: 100, 
        description: 'خرید بسته توکن', 
        status: 'تکمیل شده',
        balance: 355
      },
      { 
        id: 2, 
        date: '۱۴۰۳/۰۴/۰۱', 
        type: 'مصرف', 
        amount: -5, 
        description: 'محاسبه وام مسکن', 
        status: 'تکمیل شده',
        balance: 255
      },
      { 
        id: 3, 
        date: '۱۴۰۳/۰۳/۲۵', 
        type: 'دریافت', 
        amount: 20, 
        description: 'هدیه معرفی دوستان', 
        status: 'تکمیل شده',
        balance: 260
      },
      { 
        id: 4, 
        date: '۱۴۰۳/۰۳/۲۲', 
        type: 'مصرف', 
        amount: -10, 
        description: 'ثبت گارانتی جدید', 
        status: 'تکمیل شده',
        balance: 240
      },
      { 
        id: 5, 
        date: '۱۴۰۳/۰۳/۱۵', 
        type: 'دریافت', 
        amount: 200, 
        description: 'تمدید عضویت', 
        status: 'تکمیل شده',
        balance: 250
      }
    ],
    packageOptions: [
      { id: 1, name: 'بسته ۱۰۰ توکنی', amount: 100, price: 200000, discount: 0 },
      { id: 2, name: 'بسته ۲۵۰ توکنی', amount: 250, price: 450000, discount: 10 },
      { id: 3, name: 'بسته ۵۰۰ توکنی', amount: 500, price: 800000, discount: 20 },
      { id: 4, name: 'بسته ۱۰۰۰ توکنی', amount: 1000, price: 1500000, discount: 25 }
    ],
    earnMethods: [
      { title: 'معرفی دوستان', description: 'با معرفی هر دوست ۲۰ توکن دریافت کنید', icon: <GiftOutlined /> },
      { title: 'تکمیل پروفایل', description: 'با تکمیل پروفایل خود ۵۰ توکن دریافت کنید', icon: <UserOutlined /> },
      { title: 'فعال‌سازی حساب ویژه', description: 'با ارتقا به کاربر ویژه ۲۰۰ توکن دریافت کنید', icon: <CrownOutlined /> },
      { title: 'ورود روزانه', description: 'با ورود روزانه ۵ توکن دریافت کنید', icon: <LoginOutlined /> }
    ]
  };

  // ستون‌های جدول سابقه تراکنش‌ها
  const columns: ColumnsType<any> = [
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'نوع تراکنش',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'دریافت' ? 'success' : 'warning'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'مقدار',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Text type={amount > 0 ? 'success' : 'danger'}>
          {amount > 0 ? (
            <RiseOutlined style={{ marginLeft: 5 }} />
          ) : (
            <FallOutlined style={{ marginLeft: 5 }} />
          )}
          {amount > 0 ? `+${amount}` : amount}
        </Text>
      ),
    },
    {
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'تکمیل شده' ? 'blue' : 'processing'}>
          {status === 'تکمیل شده' ? <CheckCircleOutlined /> : <ClockCircleOutlined />} {status}
        </Tag>
      ),
    },
    {
      title: 'مانده',
      dataIndex: 'balance',
      key: 'balance',
    },
  ];

  return (
    <>
      <Title level={2}>
        <KeyOutlined style={{ marginLeft: 8 }} />
        مدیریت توکن‌ها
      </Title>
      <Paragraph type="secondary">در این صفحه می‌توانید توکن‌های خود را مدیریت کنید</Paragraph>

      {/* کارت‌های آماری */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: '8px',
              backgroundColor: darkMode ? '#1f1f1f' : '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
          >
            <Statistic
              title="موجودی توکن"
              value={tokenInfo.balance}
              prefix={<KeyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: '8px',
              backgroundColor: darkMode ? '#1f1f1f' : '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
          >
            <Statistic
              title="کل توکن‌های دریافتی"
              value={tokenInfo.totalEarned}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: '8px',
              backgroundColor: darkMode ? '#1f1f1f' : '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
          >
            <Statistic
              title="کل توکن‌های مصرفی"
              value={tokenInfo.totalSpent}
              prefix={<FallOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: '8px',
              backgroundColor: darkMode ? '#1f1f1f' : '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
          >
            <Statistic
              title="توکن‌های در حال انقضا"
              value={tokenInfo.expiringTokens}
              prefix={<ClockCircleOutlined />}
              suffix={<span style={{ fontSize: 14 }}>تا {tokenInfo.expirationDate}</span>}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* تب‌های اصلی */}
      <Card 
        bordered={false} 
        style={{ 
          borderRadius: '8px',
          backgroundColor: darkMode ? '#1f1f1f' : '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
        }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* تاریخچه تراکنش‌ها */}
          <TabPane 
            tab={
              <span>
                <WalletOutlined />
                تاریخچه تراکنش‌ها
              </span>
            } 
            key="1"
          >
            <Table 
              dataSource={tokenInfo.transactionHistory} 
              columns={columns} 
              rowKey="id" 
              pagination={{ pageSize: 5 }}
            />
          </TabPane>

          {/* خرید توکن */}
          <TabPane 
            tab={
              <span>
                <ShoppingCartOutlined />
                خرید توکن
              </span>
            } 
            key="2"
          >
            <Row gutter={[16, 16]}>
              {tokenInfo.packageOptions.map(pkg => (
                <Col xs={24} sm={12} md={6} key={pkg.id}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', height: '100%' }}
                    actions={[
                      <Button type="primary" size="small">
                        <ShoppingCartOutlined /> خرید
                      </Button>
                    ]}
                  >
                    <KeyOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 16 }} />
                    <Title level={4}>{pkg.name}</Title>
                    {pkg.discount > 0 && (
                      <Tag color="red">{pkg.discount}% تخفیف</Tag>
                    )}
                    <Paragraph>
                      <Text delete={pkg.discount > 0}>{pkg.price.toLocaleString()} تومان</Text>
                      {pkg.discount > 0 && (
                        <Text strong style={{ marginRight: 8, color: '#f5222d' }}>
                          {Math.round(pkg.price * (1 - pkg.discount / 100)).toLocaleString()} تومان
                        </Text>
                      )}
                    </Paragraph>
                    <Paragraph type="secondary">
                      قیمت هر توکن: {Math.round((pkg.price * (1 - pkg.discount / 100)) / pkg.amount).toLocaleString()} تومان
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card style={{ marginTop: 24 }}>
              <Title level={4}>
                <InfoCircleOutlined /> راهنمای استفاده از توکن‌ها
              </Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Card title="محاسبات مالی" size="small">
                    <ul>
                      <li>محاسبه اقساط وام: ۵ توکن</li>
                      <li>محاسبه سود سپرده: ۵ توکن</li>
                      <li>محاسبه پیشرفته: ۱۰ توکن</li>
                      <li>دریافت گزارش PDF: ۱۵ توکن</li>
                    </ul>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card title="مدیریت گارانتی" size="small">
                    <ul>
                      <li>ثبت گارانتی جدید: ۱۰ توکن</li>
                      <li>تمدید گارانتی: ۱۵ توکن</li>
                      <li>یادآوری اتوماتیک: ۵ توکن</li>
                      <li>مدیریت اسناد: ۱۰ توکن</li>
                    </ul>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card title="مدیریت سرمایه" size="small">
                    <ul>
                      <li>افزودن سرمایه‌گذاری: ۱۰ توکن</li>
                      <li>گزارش عملکرد: ۱۵ توکن</li>
                      <li>مقایسه گزینه‌ها: ۲۰ توکن</li>
                      <li>مشاوره تخصصی: ۵۰ توکن</li>
                    </ul>
                  </Card>
                </Col>
              </Row>
            </Card>
          </TabPane>

          {/* کسب توکن رایگان */}
          <TabPane 
            tab={
              <span>
                <GiftOutlined />
                کسب توکن رایگان
              </span>
            } 
            key="3"
          >
            <Row gutter={[16, 16]}>
              {tokenInfo.earnMethods.map((method, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card>
                    <Space align="start">
                      <Avatar size={48} style={{ backgroundColor: '#1890ff' }}>
                        {method.icon}
                      </Avatar>
                      <div>
                        <Title level={4} style={{ margin: 0 }}>
                          {method.title}
                        </Title>
                        <Paragraph type="secondary">
                          {method.description}
                        </Paragraph>
                        <Button type="primary" size="small">
                          کسب توکن
                        </Button>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card style={{ marginTop: 24 }}>
              <Title level={4}>
                <LineChartOutlined /> پیشرفت شما
              </Title>
              <List
                itemLayout="horizontal"
                dataSource={[
                  { title: 'تکمیل پروفایل', progress: 60, tokens: 30, maxTokens: 50 },
                  { title: 'معرفی دوستان', progress: 25, tokens: 20, maxTokens: 80 },
                  { title: 'ورود روزانه', progress: 80, tokens: 20, maxTokens: 25 },
                  { title: 'انجام محاسبات', progress: 40, tokens: 20, maxTokens: 50 }
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <>
                          <Progress 
                            percent={item.progress} 
                            strokeColor="#1890ff" 
                            size="small" 
                          />
                          <Text type="secondary">
                            {item.tokens} از {item.maxTokens} توکن
                          </Text>
                        </>
                      }
                    />
                    <Popover 
                      content={<Text>با تکمیل این فعالیت {item.maxTokens} توکن دریافت کنید</Text>} 
                      title="جزئیات"
                    >
                      <InfoCircleOutlined style={{ cursor: 'pointer', color: '#1890ff' }} />
                    </Popover>
                  </List.Item>
                )}
              />
            </Card>
          </TabPane>

          {/* تبدیل توکن */}
          <TabPane 
            tab={
              <span>
                <SwapOutlined />
                تبدیل توکن
              </span>
            } 
            key="4"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="تبدیل توکن به اعتبار مالی" extra={<DollarOutlined />}>
                  <Paragraph>
                    شما می‌توانید توکن‌های خود را به اعتبار مالی تبدیل کنید و از آن برای خرید محصولات یا خدمات استفاده نمایید.
                  </Paragraph>
                  <Paragraph>
                    <strong>نرخ تبدیل:</strong> هر 100 توکن = 50,000 تومان اعتبار
                  </Paragraph>
                  <Divider />
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic 
                        title="توکن قابل تبدیل"
                        value={tokenInfo.balance}
                        suffix="توکن"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic 
                        title="اعتبار قابل دریافت"
                        value={Math.floor(tokenInfo.balance / 100) * 50000}
                        suffix="تومان"
                        precision={0}
                      />
                    </Col>
                  </Row>
                  <Button type="primary" style={{ marginTop: 16 }}>
                    تبدیل توکن به اعتبار
                  </Button>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="تاریخچه تبدیل‌ها" extra={<HistoryOutlined />}>
                  <Empty 
                    description="تاکنون هیچ تبدیلی انجام نشده است"
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default TokenPage; 
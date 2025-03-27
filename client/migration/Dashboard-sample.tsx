// نمونه داشبورد با Ant Design برای نمایش سود سرمایه‌گذاری
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Typography, 
  Table, 
  Space,
  Tag,
  Button,
  Divider,
  Tooltip,
  Avatar,
  List
} from 'antd';
import { 
  LineChart, 
  PieChart,
  Column 
} from '@ant-design/charts';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  InfoCircleOutlined,
  UserOutlined,
  WalletOutlined,
  TokenOutlined,
  BankOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// نمونه داده‌های ثابت برای استفاده در نمودارها
const investmentData = [
  { month: 'فروردین', profit: 2400, investment: 24000 },
  { month: 'اردیبهشت', profit: 2800, investment: 24000 },
  { month: 'خرداد', profit: 3100, investment: 24000 },
  { month: 'تیر', profit: 3600, investment: 24000 },
  { month: 'مرداد', profit: 3900, investment: 24000 },
  { month: 'شهریور', profit: 4100, investment: 24000 },
  { month: 'مهر', profit: 4500, investment: 25000 },
  { month: 'آبان', profit: 4800, investment: 25000 },
  { month: 'آذر', profit: 5200, investment: 25000 },
  { month: 'دی', profit: 5600, investment: 25000 },
  { month: 'بهمن', profit: 6000, investment: 25000 },
  { month: 'اسفند', profit: 6300, investment: 27000 },
];

// نمونه داده‌های ثابت برای نمودار دایره‌ای
const assetDistribution = [
  { type: 'سپرده بانکی', value: 40 },
  { type: 'اوراق بهادار', value: 30 },
  { type: 'طلا', value: 20 },
  { type: 'ارز دیجیتال', value: 10 },
];

// نمونه داده‌های تراکنش‌ها
const recentTransactions = [
  { 
    id: 1, 
    date: '۱۴۰۲/۱۲/۱۵', 
    amount: 1200000, 
    type: 'deposit', 
    description: 'واریز سود ماهیانه'
  },
  { 
    id: 2, 
    date: '۱۴۰۲/۱۲/۱۰', 
    amount: 5000000, 
    type: 'deposit', 
    description: 'افزایش سرمایه'
  },
  { 
    id: 3, 
    date: '۱۴۰۲/۱۲/۰۵', 
    amount: 800000, 
    type: 'withdraw', 
    description: 'برداشت از حساب'
  },
  { 
    id: 4, 
    date: '۱۴۰۲/۱۱/۲۰', 
    amount: 1000000, 
    type: 'deposit', 
    description: 'واریز سود ماهیانه'
  },
];

// کامپوننت داشبورد اصلی
const InvestmentDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // شبیه‌سازی دریافت داده‌ها
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // پیکربندی نمودار خطی سود
  const profitChartConfig = {
    data: investmentData,
    xField: 'month',
    yField: 'profit',
    smooth: true,
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#4caf50',
        lineWidth: 2,
      },
    },
    tooltip: {
      formatter: (datum: any) => {
        return { name: 'سود', value: `${datum.profit.toLocaleString()} تومان` };
      },
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    color: '#4caf50',
  };
  
  // پیکربندی نمودار دایره‌ای
  const pieChartConfig = {
    appendPadding: 10,
    data: assetDistribution,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{percentage}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  
  // پیکربندی نمودار ستونی مقایسه‌ای
  const compareChartConfig = {
    data: investmentData,
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'category',
    
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };
  
  // تبدیل داده‌ها برای نمودار ستونی
  const compareData = investmentData.map(item => [
    {
      month: item.month,
      value: item.investment,
      category: 'سرمایه',
    },
    {
      month: item.month,
      value: item.profit,
      category: 'سود',
    },
  ]).flat();
  
  // ستون‌های جدول تراکنش‌ها
  const transactionColumns = [
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'مبلغ (تومان)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span className="ltr-nums">{amount.toLocaleString()}</span>
      ),
    },
    {
      title: 'نوع',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'deposit' ? 'green' : 'volcano'}>
          {type === 'deposit' ? 'واریز' : 'برداشت'}
        </Tag>
      ),
    },
    {
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'description',
    },
  ];
  
  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>داشبورد مدیریت سرمایه‌گذاری</Title>
      <Divider />
      
      {/* کارت‌های آماری */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="کل سرمایه"
              value={27000000}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<BankOutlined />}
              suffix="تومان"
            />
            <div style={{ marginTop: 10 }}>
              <Text type="secondary">
                <ArrowUpOutlined /> افزایش ۱۲.۵٪ از ماه قبل
              </Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="سود ماهیانه"
              value={6300000}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<WalletOutlined />}
              suffix="تومان"
            />
            <div style={{ marginTop: 10 }}>
              <Text type="secondary">
                <ArrowUpOutlined /> افزایش ۵٪ از ماه قبل
              </Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="توکن‌های فعال"
              value={750}
              precision={0}
              valueStyle={{ color: '#2196f3' }}
              prefix={<TokenOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              <Text type="secondary">
                <ArrowUpOutlined /> افزایش ۸٪ از ماه قبل
              </Text>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="سطح وفاداری"
              value="نقره‌ای"
              valueStyle={{ color: '#9e9e9e' }}
              prefix={<UserOutlined />}
            />
            <div style={{ marginTop: 10 }}>
              <Text type="secondary">
                ۲۵۰ امتیاز تا سطح طلایی
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* نمودارها */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card 
            title="نمودار سود ماهیانه" 
            loading={loading}
            extra={
              <Tooltip title="نمودار سود ماهیانه در سال جاری">
                <InfoCircleOutlined />
              </Tooltip>
            }
          >
            <LineChart {...profitChartConfig} />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title="توزیع دارایی‌ها" 
            loading={loading}
            extra={
              <Tooltip title="توزیع دارایی‌ها بر اساس نوع سرمایه‌گذاری">
                <InfoCircleOutlined />
              </Tooltip>
            }
          >
            <PieChart {...pieChartConfig} />
          </Card>
        </Col>
      </Row>
      
      {/* نمودار مقایسه‌ای و جدول تراکنش‌ها */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card 
            title="مقایسه سرمایه و سود" 
            loading={loading}
            extra={
              <Tooltip title="مقایسه سرمایه و سود در ماه‌های مختلف">
                <InfoCircleOutlined />
              </Tooltip>
            }
          >
            <Column {...compareChartConfig} data={compareData} />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title="تراکنش‌های اخیر" 
            loading={loading}
            extra={
              <Button type="link" size="small">مشاهده همه</Button>
            }
          >
            <Table 
              dataSource={recentTransactions} 
              columns={transactionColumns} 
              pagination={false}
              rowKey="id"
              size="small"
            />
          </Card>
        </Col>
      </Row>
      
      {/* توصیه‌های سرمایه‌گذاری */}
      <Row style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card title="توصیه‌های سرمایه‌گذاری" loading={loading}>
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'افزایش سرمایه در بخش اوراق بهادار',
                  description: 'با توجه به روند بازار، افزایش سهم اوراق بهادار در سبد شما توصیه می‌شود.',
                  percent: 15,
                },
                {
                  title: 'کاهش سهم ارز دیجیتال',
                  description: 'با توجه به نوسانات بازار ارز دیجیتال، کاهش سهم این بخش پیشنهاد می‌شود.',
                  percent: -5,
                },
                {
                  title: 'تمدید سپرده بانکی با نرخ جدید',
                  description: 'سپرده بانکی شما در ماه آینده سررسید می‌شود. تمدید با نرخ جدید ۲۲٪ توصیه می‌شود.',
                  percent: 0,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<InfoCircleOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                    title={item.title}
                    description={item.description}
                  />
                  <div>
                    {item.percent > 0 ? (
                      <Tag color="green">+{item.percent}٪</Tag>
                    ) : item.percent < 0 ? (
                      <Tag color="red">{item.percent}٪</Tag>
                    ) : (
                      <Tag color="blue">بدون تغییر</Tag>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InvestmentDashboard; 
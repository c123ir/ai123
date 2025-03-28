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
  Empty,
  Modal,
  Form,
  InputNumber,
  Radio,
  Alert
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
  LoginOutlined,
  CreditCardOutlined,
  BankOutlined,
  QuestionCircleOutlined
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
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [buyModalVisible, setBuyModalVisible] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  // اطلاعات توکن کاربر
  const tokenInfo = {
    available: 355,
    total: 1250,
    used: 895,
    expiry: '۱۴۰۳/۰۸/۱۲',
    percentUsed: 71.6,
  };

  // بسته‌های توکن قابل خرید
  const tokenPackages = [
    {
      id: 1,
      tokens: 100,
      price: 290000,
      popular: false,
      discount: 0,
    },
    {
      id: 2,
      tokens: 300,
      price: 790000,
      popular: true,
      discount: 10,
    },
    {
      id: 3,
      tokens: 500,
      price: 1250000,
      popular: false,
      discount: 15,
    },
    {
      id: 4,
      tokens: 1000,
      price: 2300000,
      popular: false,
      discount: 25,
    },
  ];

  // تاریخچه تراکنش‌های توکن
  const tokenTransactions = [
    {
      id: 1,
      date: '۱۴۰۳/۰۴/۰۶',
      description: 'محاسبه وام خودرو',
      amount: -5,
      type: 'usage',
      status: 'completed',
    },
    {
      id: 2,
      date: '۱۴۰۳/۰۴/۰۲',
      description: 'ثبت گارانتی جدید',
      amount: -10,
      type: 'usage',
      status: 'completed',
    },
    {
      id: 3,
      date: '۱۴۰۳/۰۳/۲۵',
      description: 'محاسبه سود سپرده',
      amount: -5,
      type: 'usage',
      status: 'completed',
    },
    {
      id: 4,
      date: '۱۴۰۳/۰۳/۰۱',
      description: 'تمدید اشتراک',
      amount: -100,
      type: 'subscription',
      status: 'completed',
    },
    {
      id: 5,
      date: '۱۴۰۳/۰۲/۱۵',
      description: 'خرید بسته ۵۰۰ توکنی',
      amount: 500,
      type: 'purchase',
      status: 'completed',
    },
    {
      id: 6,
      date: '۱۴۰۳/۰۲/۰۱',
      description: 'توکن هدیه دعوت از دوستان',
      amount: 50,
      type: 'bonus',
      status: 'completed',
    },
    {
      id: 7,
      date: '۱۴۰۳/۰۱/۱۵',
      description: 'خرید بسته ۱۰۰۰ توکنی',
      amount: 1000,
      type: 'purchase',
      status: 'completed',
    },
  ];

  // استفاده‌های توکن به تفکیک سرویس
  const tokenUsageByService = [
    { service: 'محاسبات مالی', tokens: 250, percent: 28 },
    { service: 'ثبت گارانتی', tokens: 400, percent: 45 },
    { service: 'گزارش‌گیری', tokens: 150, percent: 17 },
    { service: 'سایر خدمات', tokens: 95, percent: 10 },
  ];

  // تعریف ستون‌های جدول تراکنش‌ها
  const transactionColumns: ColumnsType<any> = [
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'شرح',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'نوع',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        let color = '';
        let text = '';
        let icon = null;
        
        switch (type) {
          case 'purchase':
            color = 'blue';
            text = 'خرید';
            icon = <ShoppingCartOutlined />;
            break;
          case 'usage':
            color = 'volcano';
            text = 'مصرف';
            icon = <HistoryOutlined />;
            break;
          case 'subscription':
            color = 'purple';
            text = 'اشتراک';
            icon = <ClockCircleOutlined />;
            break;
          case 'bonus':
            color = 'green';
            text = 'هدیه';
            icon = <GiftOutlined />;
            break;
          default:
            color = 'default';
            text = type;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
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
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        let text = '';
        let icon = null;
        
        switch (status) {
          case 'completed':
            color = 'success';
            text = 'انجام شده';
            icon = <CheckCircleOutlined />;
            break;
          case 'pending':
            color = 'warning';
            text = 'در انتظار';
            icon = <ClockCircleOutlined />;
            break;
          default:
            color = 'default';
            text = status;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
    },
  ];

  // باز کردن مودال خرید توکن
  const openBuyModal = (packageId: number) => {
    setSelectedPackage(packageId);
    setBuyModalVisible(true);
  };

  // بستن مودال خرید
  const closeBuyModal = () => {
    setBuyModalVisible(false);
    setPurchaseSuccess(false);
    setPurchaseLoading(false);
    setSelectedPackage(null);
  };

  // شبیه‌سازی خرید توکن
  const handlePurchase = () => {
    setPurchaseLoading(true);
    
    // شبیه‌سازی تأخیر در پرداخت
    setTimeout(() => {
      setPurchaseLoading(false);
      setPurchaseSuccess(true);
    }, 2000);
  };

  // محاسبه قیمت نهایی با تخفیف
  const calculateFinalPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  // یافتن بسته انتخاب شده
  const selectedPackageInfo = selectedPackage ? 
    tokenPackages.find(pkg => pkg.id === selectedPackage) : null;

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>
          <WalletOutlined style={{ marginLeft: 8 }} />
          مدیریت توکن‌ها
        </Title>
        <Paragraph>خرید، مدیریت و مشاهده تاریخچه توکن‌های شما</Paragraph>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={
            <span>
              <WalletOutlined />
              وضعیت توکن‌ها
            </span>
          } 
          key="overview"
        >
          <Row gutter={[16, 16]}>
            {/* آمار توکن‌ها */}
            <Col xs={24} md={8}>
              <Card 
                bordered={false}
                className="token-card"
                style={{ 
                  height: '100%',
                  borderRadius: '8px',
                  backgroundColor: darkMode ? '#1f1f1f' : '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
                }}
              >
                <Statistic
                  title="توکن‌های باقیمانده"
                  value={tokenInfo.available}
                  prefix={<WalletOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <Progress 
                  percent={tokenInfo.percentUsed} 
                  status={tokenInfo.percentUsed > 80 ? 'exception' : 'active'} 
                  style={{ marginTop: 16 }}
                />
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                  <Text>کل توکن‌ها: {tokenInfo.total}</Text>
                  <Text>استفاده شده: {tokenInfo.used}</Text>
                </div>
                <Divider style={{ margin: '16px 0' }} />
                <div>
                  <Text type="secondary">تاریخ انقضا: {tokenInfo.expiry}</Text>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Button 
                    type="primary" 
                    icon={<ShoppingCartOutlined />} 
                    onClick={() => setActiveTab('buy')}
                    block
                  >
                    خرید توکن جدید
                  </Button>
                </div>
              </Card>
            </Col>

            {/* نمودار استفاده از توکن */}
            <Col xs={24} md={16}>
              <Card 
                title="استفاده از توکن به تفکیک سرویس" 
                bordered={false}
                className="token-card"
                style={{ 
                  height: '100%',
                  borderRadius: '8px',
                  backgroundColor: darkMode ? '#1f1f1f' : '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
                }}
              >
                <List
                  dataSource={tokenUsageByService}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text>{item.service}</Text>
                          <Text>{item.tokens} توکن ({item.percent}%)</Text>
                        </div>
                        <Progress 
                          percent={item.percent} 
                          showInfo={false} 
                          strokeColor={
                            item.service === 'محاسبات مالی' ? '#1890ff' :
                            item.service === 'ثبت گارانتی' ? '#52c41a' :
                            item.service === 'گزارش‌گیری' ? '#722ed1' : '#fa8c16'
                          }
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* تراکنش‌های اخیر */}
            <Col xs={24}>
              <Card 
                title="تراکنش‌های اخیر" 
                bordered={false}
                className="token-card"
                style={{ 
                  borderRadius: '8px',
                  backgroundColor: darkMode ? '#1f1f1f' : '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
                }}
                extra={
                  <Button 
                    type="link" 
                    onClick={() => setActiveTab('history')}
                  >
                    مشاهده همه
                  </Button>
                }
              >
                <Table 
                  dataSource={tokenTransactions.slice(0, 5)} 
                  columns={transactionColumns} 
                  pagination={false}
                  rowKey="id"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <ShoppingCartOutlined />
              خرید توکن
            </span>
          } 
          key="buy"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card
                bordered={false}
                className="token-card"
                style={{ 
                  borderRadius: '8px',
                  backgroundColor: darkMode ? '#1f1f1f' : '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
                }}
              >
                <Title level={4}>بسته‌های توکن</Title>
                <Paragraph>بسته مورد نظر خود را انتخاب کنید و از خدمات ما بهره‌مند شوید</Paragraph>
                
                <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                  {tokenPackages.map(pkg => (
                    <Col xs={24} sm={12} md={6} key={pkg.id}>
                      <Card
                        hoverable
                        style={{ 
                          position: 'relative',
                          borderColor: pkg.popular ? '#1890ff' : undefined,
                          borderWidth: pkg.popular ? '2px' : '1px'
                        }}
                      >
                        {pkg.popular && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              background: '#1890ff',
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '0 0 0 8px',
                              fontSize: '12px'
                            }}
                          >
                            پرفروش
                          </div>
                        )}
                        
                        <div style={{ textAlign: 'center' }}>
                          <Title level={2}>{pkg.tokens}</Title>
                          <Text>توکن</Text>
                          
                          <Divider style={{ margin: '12px 0' }} />
                          
                          <div style={{ margin: '16px 0' }}>
                            {pkg.discount > 0 && (
                              <Text delete type="secondary" style={{ marginLeft: 8 }}>
                                {pkg.price.toLocaleString()} تومان
                              </Text>
                            )}
                            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                              {calculateFinalPrice(pkg.price, pkg.discount).toLocaleString()} تومان
                            </Title>
                          </div>
                          
                          {pkg.discount > 0 && (
                            <Tag color="error" style={{ margin: '8px 0' }}>
                              {pkg.discount}% تخفیف
                            </Tag>
                          )}
                          
                          <Button
                            type={pkg.popular ? 'primary' : 'default'}
                            onClick={() => openBuyModal(pkg.id)}
                            style={{ marginTop: 16 }}
                            block
                          >
                            خرید
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
                
                <Divider style={{ margin: '32px 0 24px' }}>
                  <Text type="secondary">توضیحات</Text>
                </Divider>
                
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Card size="small">
                      <Title level={5}>
                        <QuestionCircleOutlined style={{ marginLeft: 8 }} />
                        استفاده از توکن‌ها
                      </Title>
                      <Paragraph>
                        توکن‌ها برای استفاده از خدمات مختلف سیستم مورد استفاده قرار می‌گیرند. هر سرویس به تعداد مشخصی توکن نیاز دارد.
                      </Paragraph>
                    </Card>
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <Card size="small">
                      <Title level={5}>
                        <ClockCircleOutlined style={{ marginLeft: 8 }} />
                        مدت اعتبار
                      </Title>
                      <Paragraph>
                        توکن‌های خریداری شده تا ۶ ماه پس از خرید معتبر هستند و می‌توانید در این مدت از آنها استفاده کنید.
                      </Paragraph>
                    </Card>
                  </Col>
                  
                  <Col xs={24} md={8}>
                    <Card size="small">
                      <Title level={5}>
                        <CreditCardOutlined style={{ marginLeft: 8 }} />
                        روش‌های پرداخت
                      </Title>
                      <Paragraph>
                        امکان پرداخت از طریق کارت بانکی، اعتبار کیف پول و حساب بانکی وجود دارد.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <HistoryOutlined />
              تاریخچه تراکنش‌ها
            </span>
          } 
          key="history"
        >
          <Card
            bordered={false}
            className="token-card"
            style={{ 
              borderRadius: '8px',
              backgroundColor: darkMode ? '#1f1f1f' : '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            }}
          >
            <Table 
              dataSource={tokenTransactions} 
              columns={transactionColumns} 
              pagination={{ pageSize: 10 }}
              rowKey="id"
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* مودال خرید توکن */}
      <Modal
        title="خرید توکن"
        open={buyModalVisible}
        onCancel={closeBuyModal}
        footer={null}
      >
        {purchaseSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 24 }} />
            <Title level={4}>خرید با موفقیت انجام شد</Title>
            <Paragraph>
              توکن‌های شما با موفقیت به حساب کاربری‌تان اضافه شدند.
            </Paragraph>
            <Button type="primary" onClick={closeBuyModal} style={{ marginTop: 16 }}>
              بازگشت
            </Button>
          </div>
        ) : (
          <>
            {selectedPackageInfo && (
              <>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <Title level={3}>{selectedPackageInfo.tokens} توکن</Title>
                  <Title level={4} type="secondary" style={{ margin: 0 }}>
                    {calculateFinalPrice(selectedPackageInfo.price, selectedPackageInfo.discount).toLocaleString()} تومان
                  </Title>
                  {selectedPackageInfo.discount > 0 && (
                    <Tag color="error" style={{ marginTop: 8 }}>
                      {selectedPackageInfo.discount}% تخفیف
                    </Tag>
                  )}
                </div>

                <Form layout="vertical">
                  <Form.Item label="روش پرداخت" required>
                    <Radio.Group 
                      value={paymentMethod} 
                      onChange={e => setPaymentMethod(e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Radio value="card" style={{ width: '100%', height: 40 }}>
                          <Space>
                            <CreditCardOutlined />
                            پرداخت آنلاین
                          </Space>
                        </Radio>
                        <Radio value="wallet" style={{ width: '100%', height: 40 }}>
                          <Space>
                            <WalletOutlined />
                            کیف پول
                          </Space>
                        </Radio>
                        <Radio value="bank" style={{ width: '100%', height: 40 }}>
                          <Space>
                            <BankOutlined />
                            انتقال بانکی
                          </Space>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                  <Alert
                    message="توجه"
                    description="پس از خرید، توکن‌ها به صورت خودکار به حساب کاربری شما اضافه می‌شوند."
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={closeBuyModal}>انصراف</Button>
                    <Button 
                      type="primary" 
                      onClick={handlePurchase} 
                      loading={purchaseLoading}
                    >
                      پرداخت و خرید
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default TokenPage; 
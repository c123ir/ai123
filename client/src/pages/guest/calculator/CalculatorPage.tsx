import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Form,
  Select,
  Radio,
  Space,
  Tag,
  Card,
  Divider,
  Alert,
  Row,
  Col,
  Table,
  Statistic,
  Button
} from 'antd';
import {
  CalculatorOutlined,
  InfoCircleOutlined,
  ArrowRightOutlined,
  CalculatorFilled
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { formatCurrency, convertToPersianDigits } from '../../../utils/DigitConverter';
import { useTheme } from '../../../components/common/ThemeContext';
import InputNumber from '../../../components/common/InputNumber';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// توابع کمکی
const toFarsiNumber = convertToPersianDigits;

// استایل‌های سفارشی
const CalculatorCard = styled(Card)`
  border-radius: 12px;
  margin-bottom: 24px;
`;

const ResultCard = styled(Card)`
  border-radius: 12px;
  margin-top: 24px;
`;

// جایگزینی $theme با className
const SummaryCard = styled(Card)`
  border-radius: 12px;
  margin-top: 24px;
  background: ${props => props.className?.includes('theme-dark') ? '#141414' : '#f5f5f5'};
`;

const StyledNumber = styled.span`
  direction: ltr;
  display: inline-block;
  text-align: left;
`;

// تایپ نتایج محاسبه
interface CalculationResult {
  installmentAmount: number;
  totalAmount: number;
  totalFee: number;
  installmentsList: {
    month: number;
    amount: number;
    principal: number;
    fee: number;
    remaining: number;
  }[];
}

/**
 * صفحه محاسبه اقساط برای کاربران مهمان
 */
const CalculatorPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [calculationType, setCalculationType] = useState<'simple' | 'advanced'>('simple');
  
  // محاسبه اقساط
  const calculateLoan = (values: any) => {
    setLoading(true);
    
    const { amount, months, rate, paymentType } = values;
    const monthlyRate = rate / 12 / 100;
    const installments: any[] = [];
    let totalPayment = 0;
    let totalInterest = 0;
    
    // محاسبه پرداخت ماهیانه برای اقساط مساوی
    if (paymentType === 'equal') {
      // محاسبه قسط ماهیانه با فرمول وام با اقساط مساوی
      const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      totalPayment = monthlyPayment * months;
      totalInterest = totalPayment - amount;
      
      // ایجاد جدول اقساط
      let remainingPrincipal = amount;
      for (let i = 1; i <= months; i++) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingPrincipal -= principalPayment;
        
        installments.push({
          key: i,
          month: i,
          payment: Math.round(monthlyPayment),
          principal: Math.round(principalPayment),
          interest: Math.round(interestPayment),
          remaining: Math.max(0, Math.round(remainingPrincipal)),
        });
      }
    } 
    // محاسبه پرداخت ماهیانه برای اقساط نزولی
    else if (paymentType === 'decreasing') {
      // محاسبه قسط ماهیانه با فرمول وام با اقساط نزولی
      const principalPayment = amount / months;
      let remainingPrincipal = amount;
    
    for (let i = 1; i <= months; i++) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const monthlyPayment = principalPayment + interestPayment;
        remainingPrincipal -= principalPayment;
        
        totalPayment += monthlyPayment;
        
        installments.push({
          key: i,
          month: i,
          payment: Math.round(monthlyPayment),
          principal: Math.round(principalPayment),
          interest: Math.round(interestPayment),
          remaining: Math.max(0, Math.round(remainingPrincipal)),
        });
      }
      
      totalInterest = totalPayment - amount;
    }
    
    // شبیه‌سازی تأخیر در محاسبات
    setTimeout(() => {
      setResult({
        loanAmount: amount,
        months,
        rate,
        paymentType,
        installments,
        monthlyPayment: installments[0].payment,
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest)
      });
      setLoading(false);
    }, 500);
  };
  
  // ستون‌های جدول اقساط
  const columns = [
    {
      title: 'شماره قسط',
      dataIndex: 'month',
      key: 'month',
      render: (month: number) => <StyledNumber>{toFarsiNumber(month)}</StyledNumber>
    },
    {
      title: 'مبلغ قسط',
      dataIndex: 'payment',
      key: 'payment',
      render: (amount: number) => <StyledNumber>{formatCurrency(amount)} تومان</StyledNumber>
    },
    {
      title: 'سهم اصل',
      dataIndex: 'principal',
      key: 'principal',
      render: (amount: number) => <StyledNumber>{formatCurrency(amount)} تومان</StyledNumber>
    },
    {
      title: 'سهم سود',
      dataIndex: 'interest',
      key: 'interest',
      render: (amount: number) => <StyledNumber>{formatCurrency(amount)} تومان</StyledNumber>
    },
    {
      title: 'مانده',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (amount: number) => <StyledNumber>{formatCurrency(amount)} تومان</StyledNumber>
    }
  ];
  
  // پنل خلاصه اطلاعات وام
  const LoanSummary = () => {
    if (!result) return null;
    
    // استفاده از کلاس به جای prop $theme
    const themeClass = theme === 'dark' ? 'theme-dark' : 'theme-light';
    
    return (
      <SummaryCard className={themeClass}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Statistic
              title="مبلغ قسط ماهیانه"
              value={result.paymentType === 'equal' ? result.monthlyPayment : 'متغیر'}
              formatter={(value: any) => typeof value === 'number' ? 
                <><StyledNumber>{formatCurrency(value)}</StyledNumber> تومان</> : 
                value
              }
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="کل بازپرداخت"
              value={result.totalPayment}
              formatter={(value: any) => <><StyledNumber>{formatCurrency(value)}</StyledNumber> تومان</>}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="کل سود پرداختی"
              value={result.totalInterest}
              formatter={(value: any) => <><StyledNumber>{formatCurrency(value)}</StyledNumber> تومان</>}
            />
          </Col>
        </Row>
      </SummaryCard>
    );
  };
  
  return (
    <div>
      <Title level={2}>محاسبه اقساط</Title>
      
      <Paragraph type="secondary">
        با استفاده از این ابزار می‌توانید اقساط وام‌ها و خریدهای قسطی خود را محاسبه کنید.
      </Paragraph>
      
      <Row gutter={[24, 24]}>
        {/* فرم محاسبه */}
        <Col xs={24} md={8}>
          <Card variant="outlined">
            <Title level={4}>اطلاعات وام یا خرید</Title>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={calculateLoan}
              disabled={calculationType === 'advanced'}
              initialValues={{
                amount: 10000000,
                months: 12,
                rate: 18,
                paymentType: 'equal'
              }}
            >
              <Row gutter={24}>
                <Col xs={24}>
                  <Form.Item
                    label="مبلغ وام یا خرید"
                    name="amount"
                    rules={[{ required: true, message: 'لطفاً مبلغ را وارد کنید' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان'}
                      parser={(value?: string) => {
                        const parsed = value?.replace(/\$\s?|(,*)/g, '').replace(' تومان', '') || '';
                        return parsed === '' ? undefined : Number(parsed);
                      }}
                      min={1000000}
                      max={10000000000}
                      step={1000000}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24}>
                  <Form.Item
                    label="مدت بازپرداخت (ماه)"
                    name="months"
                    rules={[{ required: true, message: 'لطفاً مدت بازپرداخت را انتخاب کنید' }]}
                  >
                    <Select>
                      {[3, 6, 9, 12, 18, 24, 36, 48, 60].map(month => (
                        <Option key={month} value={month}>{toFarsiNumber(month)} ماه</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col xs={24}>
                  <Form.Item
                    label="نرخ سود سالیانه (درصد)"
                    name="rate"
                    rules={[{ required: true, message: 'لطفاً نرخ سود را وارد کنید' }]}
                    tooltip={{ 
                      title: 'نرخ سود بانکی معمولاً بین ۱۸ تا ۲۴ درصد است', 
                      icon: <InfoCircleOutlined /> 
                    }}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      formatter={(value) => `${value}%`}
                      parser={(value?: string) => {
                        const parsed = value?.replace('%', '') || '';
                        return parsed === '' ? undefined : Number(parsed);
                      }}
                      min={0}
                      max={36}
                      step={0.5}
                    />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                label="نوع بازپرداخت"
                name="paymentType"
                tooltip={{ 
                  title: 'اقساط مساوی: مبلغ هر قسط ثابت است | اقساط نزولی: مبلغ اقساط به تدریج کاهش می‌یابد', 
                  icon: <InfoCircleOutlined /> 
                }}
              >
                <Radio.Group>
                  <Radio value="equal">اقساط مساوی</Radio>
                  <Radio value="decreasing">اقساط نزولی</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item>
            <Button
                  type="primary" 
                  htmlType="submit" 
                  icon={<CalculatorOutlined />}
                  loading={loading}
              size="large"
            >
              محاسبه اقساط
            </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        {/* نتایج محاسبه */}
        <Col xs={24} md={16}>
          {result ? (
            <>
              <LoanSummary />
              
              <ResultCard>
                <Title level={3}>
                  جدول اقساط
                </Title>
                <Paragraph>
                  {result.paymentType === 'equal' ? 
                    'جدول زیر، بازپرداخت وام شما را با روش اقساط مساوی نشان می‌دهد.' : 
                    'جدول زیر، بازپرداخت وام شما را با روش اقساط نزولی نشان می‌دهد.'
                  }
                </Paragraph>
                
                <Table 
                  dataSource={result.installments} 
                  columns={columns} 
                  pagination={{ 
                    pageSize: 12,
                    showSizeChanger: false,
                    showQuickJumper: true,
                    showTotal: (total: number) => `مجموع ${toFarsiNumber(total)} قسط`
                  }}
                  summary={() => (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>مجموع</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                          <StyledNumber>{formatCurrency(result.totalPayment)} تومان</StyledNumber>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <StyledNumber>{formatCurrency(result.loanAmount)} تومان</StyledNumber>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                          <StyledNumber>{formatCurrency(result.totalInterest)} تومان</StyledNumber>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                />
              </ResultCard>
              
              <Card style={{ marginTop: 24, textAlign: 'center' }} variant="outlined">
                <Space direction="vertical">
                  <Title level={4}>
                    می‌خواهید از امکانات پیشرفته‌تر استفاده کنید؟
                  </Title>
                  <Paragraph>
                    با ثبت‌نام در دستیار هوشمند یک دو سه، به امکانات بیشتری دسترسی پیدا کنید.
                  </Paragraph>
                  <Space>
                    <Tag color="green">محاسبه اقساط پیشرفته</Tag>
                    <Tag color="blue">ذخیره محاسبات</Tag>
                    <Tag color="purple">مقایسه چند وام</Tag>
                    <Tag color="orange">دریافت خروجی اکسل</Tag>
                  </Space>
                <Button
                    type="primary" 
                    size="large"
                    icon={<ArrowRightOutlined />}
                  onClick={() => navigate('/register')}
                    style={{ marginTop: 16 }}
                >
                    ثبت‌نام و دریافت ۵۰ توکن هدیه
                </Button>
                </Space>
              </Card>
            </>
          ) : (
            <Card 
              style={{ 
                padding: '24px', 
                borderRadius: '12px', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: 300
              }}
              variant="outlined"
            >
              <CalculatorFilled style={{ fontSize: 60, color: '#bfbfbf', marginBottom: 16, opacity: 0.5 }} />
              <Title level={4}>
                اطلاعات وام یا خرید را وارد کنید
              </Title>
              <Paragraph type="secondary">
                برای محاسبه اقساط، فرم سمت راست را تکمیل کنید.
              </Paragraph>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CalculatorPage; 
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Space,
  Input,
  Button,
  Tag,
  Select,
  Tooltip,
  Statistic,
  Divider,
  Spin,
} from 'antd';
import {
  ReloadOutlined,
  FilterOutlined,
  FileTextOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  InfoCircleOutlined,
  WalletOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import Table, { TableColumn } from '../../../../modules/shared/components/common/Table';

const { Option } = Select;

// نوع تراکنش
type TransactionType = 'شارژ' | 'خرید' | 'استرداد' | 'هدیه';

// وضعیت تراکنش
type TransactionStatus = 'موفق' | 'ناموفق' | 'در انتظار تأیید';

// ساختار داده تراکنش
interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  tokenAmount: number;
  status: TransactionStatus;
  date: string;
  description: string;
  reference: string;
}

// استایل های کامپوننت
const StatsCard = styled(Card)`
  height: 100%;
`;

/**
 * صفحه مدیریت تراکنش‌های کاربر
 */
const TransactionsPage: React.FC = () => {
  // داده‌های نمونه برای تراکنش‌ها
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'trx-001',
      type: 'شارژ',
      amount: 200000,
      tokenAmount: 200,
      status: 'موفق',
      date: '1402/08/12',
      description: 'شارژ اعتبار از درگاه بانکی',
      reference: 'pay-12345678',
    },
    {
      id: 'trx-002',
      type: 'خرید',
      amount: -50000,
      tokenAmount: -50,
      status: 'موفق',
      date: '1402/08/15',
      description: 'خرید بسته سوالات اضافی',
      reference: 'order-87654321',
    },
    {
      id: 'trx-003',
      type: 'استرداد',
      amount: 25000,
      tokenAmount: 25,
      status: 'در انتظار تأیید',
      date: '1402/08/20',
      description: 'استرداد بخشی از مبلغ خرید',
      reference: 'refund-135792468',
    },
    {
      id: 'trx-004',
      type: 'هدیه',
      amount: 15000,
      tokenAmount: 15,
      status: 'موفق',
      date: '1402/08/22',
      description: 'هدیه به مناسبت تولد شما',
      reference: 'gift-112233445',
    },
    {
      id: 'trx-005',
      type: 'شارژ',
      amount: 100000,
      tokenAmount: 100,
      status: 'ناموفق',
      date: '1402/08/25',
      description: 'تلاش ناموفق برای شارژ اعتبار',
      reference: 'pay-22446688',
    },
    {
      id: 'trx-006',
      type: 'خرید',
      amount: -30000,
      tokenAmount: -30,
      status: 'موفق',
      date: '1402/08/28',
      description: 'خرید بسته تحلیل داده',
      reference: 'order-98765432',
    },
  ]);

  // استیت‌های لازم برای UI
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  // محاسبه اطلاعات آماری تراکنش‌ها
  const totalIncome = transactions
    .filter(tx => tx.amount > 0 && tx.status === 'موفق')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpense = transactions
    .filter(tx => tx.amount < 0 && tx.status === 'موفق')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  
  const balance = transactions
    .filter(tx => tx.status === 'موفق')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const tokenBalance = transactions
    .filter(tx => tx.status === 'موفق')
    .reduce((sum, tx) => sum + tx.tokenAmount, 0);

  // فیلتر کردن تراکنش‌ها
  const filteredTransactions = transactions.filter(tx => {
    if (filterType && tx.type !== filterType) return false;
    if (filterStatus && tx.status !== filterStatus) return false;
    // اینجا می‌توان فیلتر تاریخ را هم اضافه کرد
    return true;
  });

  // بازنشانی فیلترها
  const handleResetFilters = () => {
    setFilterType('');
    setFilterStatus('');
    setDateFrom('');
    setDateTo('');
  };

  // مدیریت به‌روزرسانی داده‌ها
  const handleRefresh = () => {
    setLoading(true);
    // شبیه‌سازی API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // تعریف ستون‌های جدول
  const columns: TableColumn<Transaction>[] = [
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'نوع',
      dataIndex: 'type',
      key: 'type',
      render: (type: TransactionType) => {
        let color = 'default';
        let icon = null;
        
        switch (type) {
          case 'شارژ':
            color = 'success';
            icon = <ArrowUpOutlined />;
            break;
          case 'هدیه':
            color = 'success';
            icon = <ArrowUpOutlined />;
            break;
          case 'استرداد':
            color = 'processing';
            icon = <ArrowUpOutlined />;
            break;
          case 'خرید':
            color = 'default';
            icon = <ArrowDownOutlined />;
            break;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {type}
          </Tag>
        );
      },
      filters: [
        { text: 'شارژ', value: 'شارژ' },
        { text: 'خرید', value: 'خرید' },
        { text: 'استرداد', value: 'استرداد' },
        { text: 'هدیه', value: 'هدیه' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'مبلغ (ریال)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <Typography.Text
          style={{ 
            color: amount >= 0 ? '#52c41a' : '#f5222d',
            fontWeight: 'bold'
          }}
        >
          {amount >= 0 ? '+' : ''}{amount.toLocaleString()}
        </Typography.Text>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'تعداد توکن',
      dataIndex: 'tokenAmount',
      key: 'tokenAmount',
      render: (tokenAmount: number) => (
        <Typography.Text
          style={{ 
            color: tokenAmount >= 0 ? '#52c41a' : '#f5222d',
            fontWeight: 'bold'
          }}
        >
          {tokenAmount >= 0 ? '+' : ''}{tokenAmount.toLocaleString()}
        </Typography.Text>
      ),
      sorter: (a, b) => a.tokenAmount - b.tokenAmount,
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: TransactionStatus) => {
        let color = '';
        
        switch (status) {
          case 'موفق':
            color = 'success';
            break;
          case 'ناموفق':
            color = 'error';
            break;
          case 'در انتظار تأیید':
            color = 'warning';
            break;
        }
        
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: 'موفق', value: 'موفق' },
        { text: 'ناموفق', value: 'ناموفق' },
        { text: 'در انتظار تأیید', value: 'در انتظار تأیید' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'کد پیگیری',
      dataIndex: 'reference',
      key: 'reference',
      render: (reference: string) => (
        <Space>
          <Typography.Text style={{ fontSize: '0.8rem' }}>
            {reference}
          </Typography.Text>
          <Tooltip title="مشاهده جزئیات">
            <Button 
              type="text" 
              size="small" 
              icon={<InfoCircleOutlined />} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>
        تراکنش‌های من
      </Typography.Title>
      
      {/* کارت‌های آماری */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="موجودی توکن"
              value={tokenBalance}
              valueStyle={{ color: '#1890ff' }}
              prefix={<WalletOutlined />}
              suffix="توکن"
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="مجموع شارژ"
              value={totalIncome}
              valueStyle={{ color: '#52c41a' }}
              prefix={<ArrowUpOutlined />}
              suffix="ریال"
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="مجموع خرید"
              value={totalExpense}
              valueStyle={{ color: '#f5222d' }}
              prefix={<ShoppingOutlined />}
              suffix="ریال"
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="موجودی ریالی"
              value={balance}
              valueStyle={{ color: balance >= 0 ? '#52c41a' : '#f5222d' }}
              prefix={<DollarOutlined />}
              suffix="ریال"
            />
          </StatsCard>
        </Col>
      </Row>
      
      {/* لیست تراکنش‌ها */}
      <Card title="سوابق تراکنش‌ها">
        {/* فیلترها */}
        <Space style={{ marginBottom: 16 }} wrap>
          <Select
            placeholder="نوع تراکنش"
            style={{ width: 150 }}
            value={filterType || undefined}
            onChange={(value) => setFilterType(value)}
            allowClear
          >
            <Option value="شارژ">شارژ</Option>
            <Option value="خرید">خرید</Option>
            <Option value="استرداد">استرداد</Option>
            <Option value="هدیه">هدیه</Option>
          </Select>
          
          <Select
            placeholder="وضعیت"
            style={{ width: 150 }}
            value={filterStatus || undefined}
            onChange={(value) => setFilterStatus(value)}
            allowClear
          >
            <Option value="موفق">موفق</Option>
            <Option value="ناموفق">ناموفق</Option>
            <Option value="در انتظار تأیید">در انتظار تأیید</Option>
          </Select>
          
          <Button 
            icon={<ReloadOutlined />}
            onClick={handleResetFilters}
            disabled={!filterType && !filterStatus && !dateFrom && !dateTo}
          >
            حذف فیلترها
          </Button>
        </Space>
        
        <Divider />
        
        {/* جدول تراکنش‌ها */}
        <Table
          dataSource={filteredTransactions}
          columns={columns}
          loading={loading}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `مجموع: ${total} تراکنش`,
            pageSizeOptions: ['5', '10', '20', '50'],
            defaultPageSize: 5,
          }}
          scroll={{ x: 'max-content' }}
          showRefresh
          onRefresh={handleRefresh}
        />
      </Card>
    </div>
  );
};

export default TransactionsPage; 
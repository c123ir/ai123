import React, { useEffect, useState } from 'react';
import { Table, Card, Tag, Typography, DatePicker, Space, Select, Button, Spin, Alert } from 'antd';
import { ReloadOutlined, FilterOutlined } from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd/es/table';
import moment from 'moment';
import useToken from '../hooks/useToken';
import { TokenTransactionType } from '../types';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface TokenHistoryProps {
  userId: string;
}

const TokenHistory: React.FC<TokenHistoryProps> = ({ userId }) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    type: undefined as TokenTransactionType | undefined,
    dateRange: [] as [moment.Moment | null, moment.Moment | null] | [],
  });

  const { transactions, transactionsTotal, loading, error, getHistory } = useToken();

  const fetchData = () => {
    const params = {
      userId,
      page: pagination.current,
      limit: pagination.pageSize,
      type: filters.type,
      startDate: filters.dateRange[0]?.toDate(),
      endDate: filters.dateRange[1]?.toDate(),
    };
    getHistory(params);
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, userId]);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const handleFilterChange = () => {
    setPagination({ ...pagination, current: 1 });
    fetchData();
  };

  const resetFilters = () => {
    setFilters({
      type: undefined,
      dateRange: [],
    });
    setPagination({ ...pagination, current: 1 });
    fetchData();
  };

  const getTagColor = (type: TokenTransactionType) => {
    switch (type) {
      case TokenTransactionType.EARN:
        return 'green';
      case TokenTransactionType.USE:
        return 'red';
      case TokenTransactionType.TRANSFER:
        return 'blue';
      case TokenTransactionType.EXPIRE:
        return 'orange';
      default:
        return 'default';
    }
  };

  const getTransactionTypeText = (type: TokenTransactionType) => {
    switch (type) {
      case TokenTransactionType.EARN:
        return 'دریافت';
      case TokenTransactionType.USE:
        return 'استفاده';
      case TokenTransactionType.TRANSFER:
        return 'انتقال';
      case TokenTransactionType.EXPIRE:
        return 'انقضا';
      default:
        return type;
    }
  };

  const columns = [
    {
      title: 'تاریخ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => moment(date).format('YYYY/MM/DD HH:mm'),
    },
    {
      title: 'نوع تراکنش',
      dataIndex: 'type',
      key: 'type',
      render: (type: TokenTransactionType) => (
        <Tag color={getTagColor(type)}>
          {getTransactionTypeText(type)}
        </Tag>
      ),
    },
    {
      title: 'مقدار',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: any) => {
        const isNegative = record.type === TokenTransactionType.USE || record.type === TokenTransactionType.EXPIRE;
        return (
          <span style={{ color: isNegative ? '#ff4d4f' : '#52c41a' }}>
            {isNegative ? '-' : '+'}{amount}
          </span>
        );
      },
    },
    {
      title: 'توضیحات',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  if (loading && !transactions.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="خطا در بارگذاری تاریخچه توکن"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  return (
    <Card 
      title={<Title level={4}>تاریخچه توکن‌ها</Title>}
      className="token-history-card"
      bordered={false}
    >
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Select
            placeholder="نوع تراکنش"
            style={{ width: 150 }}
            allowClear
            value={filters.type}
            onChange={(value) => setFilters({ ...filters, type: value })}
          >
            <Option value={TokenTransactionType.EARN}>دریافت</Option>
            <Option value={TokenTransactionType.USE}>استفاده</Option>
            <Option value={TokenTransactionType.TRANSFER}>انتقال</Option>
            <Option value={TokenTransactionType.EXPIRE}>انقضا</Option>
          </Select>
          
          <RangePicker 
            value={filters.dateRange as [moment.Moment | null, moment.Moment | null]}
            onChange={(dates) => setFilters({ ...filters, dateRange: dates || [] })}
          />
          
          <Button 
            type="primary" 
            icon={<FilterOutlined />} 
            onClick={handleFilterChange}
          >
            اعمال فیلتر
          </Button>
          
          <Button 
            icon={<ReloadOutlined />} 
            onClick={resetFilters}
          >
            پاک کردن فیلترها
          </Button>
        </Space>
      </div>
      
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        pagination={{
          ...pagination,
          total: transactionsTotal,
          showSizeChanger: true,
          showTotal: (total) => `مجموع ${total} تراکنش`,
        }}
        onChange={handleTableChange}
        loading={loading}
      />
    </Card>
  );
};

export default TokenHistory; 
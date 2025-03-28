import React, { useEffect } from 'react';
import { Card, Statistic, Row, Col, Typography, Spin, Alert } from 'antd';
import { WalletOutlined, GiftOutlined, ShoppingOutlined, HeartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import useToken from '../hooks/useToken';

const { Title } = Typography;

interface TokenBalanceProps {
  userId: string;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ userId }) => {
  const { balance, loading, error, getBalance } = useToken();

  useEffect(() => {
    getBalance({ userId });
  }, [getBalance, userId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="خطا در بارگذاری موجودی توکن"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  if (!balance) {
    return (
      <Alert
        message="موجودی توکن در دسترس نیست"
        description="لطفاً بعداً دوباره امتحان کنید."
        type="warning"
        showIcon
      />
    );
  }

  return (
    <Card
      title={<Title level={4}>موجودی توکن</Title>}
      className="token-balance-card"
      bordered={false}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="کل توکن‌ها"
              value={balance.total}
              prefix={<WalletOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="توکن‌های پاداش"
              value={balance.reward}
              prefix={<GiftOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="توکن‌های خریداری شده"
              value={balance.purchased}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="توکن‌های وفاداری"
              value={balance.loyalty}
              prefix={<HeartOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
        
        {balance.expiringSoon > 0 && (
          <Col xs={24}>
            <Alert
              message={
                <Statistic
                  title="توکن‌های در حال انقضا"
                  value={balance.expiringSoon}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              }
              type="warning"
              showIcon={false}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default TokenBalance; 
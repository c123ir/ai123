import React, { useState } from 'react';
import { Row, Col, Tabs, Typography, Space, Button } from 'antd';
import { 
  WalletOutlined, 
  HistoryOutlined, 
  ShoppingCartOutlined, 
  SendOutlined,
  ReloadOutlined
} from '@ant-design/icons';

import TokenBalance from '../components/TokenBalance';
import TokenHistory from '../components/TokenHistory';
import BuyTokens from '../components/BuyTokens';
import UseTokens from '../components/UseTokens';
import useToken from '../hooks/useToken';

const { Title } = Typography;
const { TabPane } = Tabs;

interface TokenDashboardProps {
  userId: string;
}

const TokenDashboard: React.FC<TokenDashboardProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState('balance');
  const { getBalance } = useToken();

  const handleRefresh = () => {
    getBalance({ userId });
  };

  const handleSuccess = () => {
    // بعد از اتمام عملیات خرید یا استفاده از توکن، به تب موجودی بازگردید
    setActiveTab('balance');
  };

  return (
    <div className="token-dashboard">
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title level={2}>
              <WalletOutlined /> مدیریت توکن‌ها
            </Title>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh}
            >
              به‌روزرسانی
            </Button>
          </Space>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            type="card"
            size="large"
            className="token-tabs"
          >
            <TabPane 
              tab={
                <span>
                  <WalletOutlined />
                  موجودی
                </span>
              } 
              key="balance"
            >
              <TokenBalance userId={userId} />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <HistoryOutlined />
                  تاریخچه
                </span>
              } 
              key="history"
            >
              <TokenHistory userId={userId} />
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
              <BuyTokens userId={userId} onSuccess={handleSuccess} />
            </TabPane>
            
            <TabPane 
              tab={
                <span>
                  <SendOutlined />
                  استفاده از توکن
                </span>
              } 
              key="use"
            >
              <UseTokens userId={userId} onSuccess={handleSuccess} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default TokenDashboard; 
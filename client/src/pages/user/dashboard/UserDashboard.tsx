import React from 'react';
import { Layout, Typography, Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  BankOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { useTheme } from '../../../components/common/ThemeContext';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// استایل‌های کامپوننت
const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)<{ theme: 'light' | 'dark' }>`
  background: ${props => props.theme === 'light' ? '#fff' : '#141414'};
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledContent = styled(Content)<{ theme: 'light' | 'dark' }>`
  padding: 24px;
  background: ${props => props.theme === 'light' ? '#f0f2f5' : '#1f1f1f'};
`;

const DashboardCard = styled(Card)`
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
`;

/**
 * داشبورد اصلی کاربر
 */
const UserDashboard: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <StyledLayout>
      <StyledHeader theme={theme}>
        <Title level={4} style={{ margin: 0 }}>داشبورد کاربر</Title>
        <UserOutlined style={{ fontSize: 24 }} />
      </StyledHeader>
      
      <StyledContent theme={theme}>
        <Title level={4}>خلاصه حساب‌ها</Title>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <DashboardCard>
              <Statistic
                title="موجودی کل"
                value={12500000}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<DollarOutlined />}
                suffix="تومان"
              />
            </DashboardCard>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <DashboardCard>
              <Statistic
                title="هزینه‌های ماه جاری"
                value={2350000}
                precision={0}
                valueStyle={{ color: '#cf1322' }}
                prefix={<CreditCardOutlined />}
                suffix="تومان"
              />
            </DashboardCard>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <DashboardCard>
              <Statistic
                title="درآمد ماه جاری"
                value={5200000}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<BankOutlined />}
                suffix="تومان"
              />
            </DashboardCard>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={6}>
            <DashboardCard>
              <Statistic
                title="تعداد تراکنش‌ها"
                value={48}
                valueStyle={{ color: '#1890ff' }}
              />
            </DashboardCard>
          </Col>
        </Row>
        
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={24}>
            <DashboardCard title="خوش آمدید!">
              <Text>
                این داشبورد در حال توسعه است و به زودی امکانات بیشتری به آن اضافه خواهد شد.
              </Text>
            </DashboardCard>
          </Col>
        </Row>
      </StyledContent>
    </StyledLayout>
  );
};

export default UserDashboard; 
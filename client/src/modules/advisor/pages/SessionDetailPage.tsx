import React, { useEffect } from 'react';
import { Typography, Layout, Card, Breadcrumb, Spin, Result, Button } from 'antd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import SessionDetail from '../components/SessionDetail';
import { useAdvisor } from '../hooks/useAdvisor';

const { Title } = Typography;
const { Content } = Layout;

const SessionDetailPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { selectedSession, loading, error, getSessionById } = useAdvisor();
  
  // در دنیای واقعی باید userId از سیستم احراز هویت دریافت شود
  const userId = "current-user-id";

  useEffect(() => {
    if (sessionId) {
      getSessionById(sessionId);
    }
  }, [sessionId, getSessionById]);

  const handleGoBack = () => {
    navigate('/advisors/sessions');
  };

  if (loading) {
    return (
      <Content className="site-layout-content" style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="site-layout-content" style={{ padding: '0 24px' }}>
        <Result
          status="error"
          title="خطا در بارگذاری جلسه"
          subTitle={error}
          extra={[
            <Button type="primary" key="back" onClick={handleGoBack}>
              بازگشت به لیست جلسات
            </Button>,
          ]}
        />
      </Content>
    );
  }

  if (!selectedSession) {
    return (
      <Content className="site-layout-content" style={{ padding: '0 24px' }}>
        <Result
          status="404"
          title="جلسه یافت نشد"
          subTitle="جلسه مورد نظر شما یافت نشد یا دسترسی به آن محدود شده است."
          extra={[
            <Button type="primary" key="back" onClick={handleGoBack}>
              بازگشت به لیست جلسات
            </Button>,
          ]}
        />
      </Content>
    );
  }

  return (
    <Content className="site-layout-content" style={{ padding: '0 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">صفحه اصلی</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/advisors">مشاوره هوشمند</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/advisors/sessions">جلسات من</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>جزئیات جلسه</Breadcrumb.Item>
      </Breadcrumb>
      
      <Card style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 16 }}>
          <FileTextOutlined /> جزئیات جلسه مشاوره
        </Title>
      </Card>
      
      <SessionDetail sessionId={sessionId || ''} userId={userId} />
    </Content>
  );
};

export default SessionDetailPage; 
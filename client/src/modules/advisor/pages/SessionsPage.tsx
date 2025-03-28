import React from 'react';
import { Typography, Layout, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { CalendarOutlined } from '@ant-design/icons';
import SessionList from '../components/SessionList';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const SessionsPage: React.FC = () => {
  // در دنیای واقعی باید userId از سیستم احراز هویت دریافت شود
  const userId = "current-user-id";

  return (
    <Content className="site-layout-content" style={{ padding: '0 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">صفحه اصلی</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/advisors">مشاوره هوشمند</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>جلسات من</Breadcrumb.Item>
      </Breadcrumb>
      
      <Card style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 16 }}>
          <CalendarOutlined /> جلسات مشاوره من
        </Title>
        <Paragraph>
          در این صفحه می‌توانید تمام جلسات مشاوره خود را مشاهده کنید. جلسات بر اساس زمان برگزاری و وضعیت آن‌ها دسته‌بندی شده‌اند. 
          برای مشاهده جزئیات بیشتر هر جلسه، بر روی دکمه "جزئیات" کلیک کنید. همچنین، 15 دقیقه قبل از شروع جلسات تایید شده، دکمه "ورود به جلسه" فعال می‌شود.
        </Paragraph>
      </Card>
      
      <SessionList userId={userId} />
    </Content>
  );
};

export default SessionsPage; 
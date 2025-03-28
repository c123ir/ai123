import React from 'react';
import { Typography, Layout, Row, Col, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';
import AdvisorList from '../components/AdvisorList';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const AdvisorsListPage: React.FC = () => {
  return (
    <Content className="site-layout-content" style={{ padding: '0 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">صفحه اصلی</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>مشاوره هوشمند</Breadcrumb.Item>
      </Breadcrumb>
      
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={24} md={16}>
            <Title level={2} style={{ marginBottom: 8 }}>
              <TeamOutlined /> مشاوره هوشمند
            </Title>
            <Paragraph>
              با استفاده از سیستم مشاوره هوشمند، می‌توانید به راحتی با مشاوران متخصص در زمینه‌های مختلف مالی، سرمایه‌گذاری، کسب و کار و شخصی ارتباط برقرار کنید و از راهنمایی‌های حرفه‌ای آنها بهره‌مند شوید. 
              مشاوران ما با تجربه و دانش کافی، آماده پاسخگویی به سوالات شما و کمک به حل مشکلات شما هستند.
            </Paragraph>
          </Col>
          <Col xs={24} sm={24} md={8} style={{ textAlign: 'center' }}>
            <img 
              src="/images/advisor-hero.svg" 
              alt="مشاوره هوشمند" 
              style={{ maxWidth: '100%', height: 'auto' }}
              onError={(e) => {
                e.currentTarget.src = "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
              }}
            />
          </Col>
        </Row>
      </Card>
      
      <Card title="لیست مشاوران" extra={<Link to="/advisors/sessions">مشاهده جلسات من</Link>}>
        <AdvisorList showFilters={true} />
      </Card>
    </Content>
  );
};

export default AdvisorsListPage; 
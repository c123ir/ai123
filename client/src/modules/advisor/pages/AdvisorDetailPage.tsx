import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Breadcrumb, Layout, Spin, Alert, Row, Col, Tabs, Divider, Card, Avatar, Rate, Tag, Button } from 'antd';
import { HomeOutlined, TeamOutlined, UserOutlined, CalendarOutlined, MessageOutlined } from '@ant-design/icons';
import useAdvisor from '../hooks/useAdvisor';
import useAuth from '../../auth/hooks/useAuth';
import AppHeader from '../../../components/AppHeader';
import SessionBookingForm from '../components/SessionBookingForm';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

interface AdvisorDetailPageParams {
  advisorId: string;
}

const AdvisorDetailPage: React.FC = () => {
  const { advisorId } = useParams<AdvisorDetailPageParams>();
  const { selectedAdvisor, loading, error, getAdvisorById } = useAdvisor();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (advisorId) {
      getAdvisorById(advisorId);
    }
  }, [getAdvisorById, advisorId]);

  // تبدیل نوع مشاوره به متن فارسی
  const getAdvisorTypeText = (type: string) => {
    switch (type) {
      case 'FINANCIAL':
        return 'مشاوره مالی';
      case 'INVESTMENT':
        return 'مشاوره سرمایه‌گذاری';
      case 'BUSINESS':
        return 'مشاوره کسب‌و‌کار';
      case 'PERSONAL':
        return 'مشاوره شخصی';
      default:
        return type;
    }
  };

  // تبدیل سطح تخصص به متن فارسی
  const getExpertiseLevelText = (level: string) => {
    switch (level) {
      case 'BEGINNER':
        return 'مبتدی';
      case 'INTERMEDIATE':
        return 'متوسط';
      case 'EXPERT':
        return 'حرفه‌ای';
      default:
        return level;
    }
  };

  // تعیین رنگ برای تگ نوع مشاوره
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FINANCIAL':
        return 'blue';
      case 'INVESTMENT':
        return 'green';
      case 'BUSINESS':
        return 'purple';
      case 'PERSONAL':
        return 'orange';
      default:
        return 'default';
    }
  };

  // تعیین رنگ برای تگ سطح تخصص
  const getExpertiseColor = (level: string) => {
    switch (level) {
      case 'BEGINNER':
        return 'default';
      case 'INTERMEDIATE':
        return 'blue';
      case 'EXPERT':
        return 'gold';
      default:
        return 'default';
    }
  };

  if (loading && !selectedAdvisor) {
    return (
      <Layout className="min-height-100vh">
        <AppHeader />
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Spin size="large" />
          </div>
        </Content>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout className="min-height-100vh">
        <AppHeader />
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Alert
            message="خطا در بارگذاری اطلاعات مشاور"
            description={error}
            type="error"
            showIcon
            style={{ margin: '50px 0' }}
          />
        </Content>
      </Layout>
    );
  }

  if (!selectedAdvisor) {
    return (
      <Layout className="min-height-100vh">
        <AppHeader />
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Alert
            message="مشاور یافت نشد"
            description="اطلاعات مشاور موردنظر یافت نشد یا دسترسی به آن محدود شده است."
            type="warning"
            showIcon
            style={{ margin: '50px 0' }}
          />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="min-height-100vh">
      <AppHeader />
      
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
            <span>خانه</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/advisors">
            <TeamOutlined />
            <span>مشاوران</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <span>{selectedAdvisor.name}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={16}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 20 }}>
                  <Avatar 
                    src={selectedAdvisor.avatarUrl} 
                    icon={<UserOutlined />}
                    size={120}
                    style={{ marginLeft: 20 }}
                  />
                  
                  <div>
                    <Title level={2}>{selectedAdvisor.name}</Title>
                    
                    <div style={{ marginBottom: 10 }}>
                      <Tag color={getTypeColor(selectedAdvisor.type)}>
                        {getAdvisorTypeText(selectedAdvisor.type)}
                      </Tag>
                      <Tag color={getExpertiseColor(selectedAdvisor.expertise)}>
                        {getExpertiseLevelText(selectedAdvisor.expertise)}
                      </Tag>
                      {selectedAdvisor.isAvailable ? (
                        <Tag color="success">در دسترس</Tag>
                      ) : (
                        <Tag color="error">خارج از دسترس</Tag>
                      )}
                    </div>
                    
                    <div style={{ marginBottom: 10 }}>
                      <Rate disabled defaultValue={selectedAdvisor.rating} />
                      <Text style={{ marginRight: 8 }}>({selectedAdvisor.reviewCount} نظر)</Text>
                    </div>
                    
                    <div>
                      <Text>نرخ مشاوره: </Text>
                      <Text strong>{selectedAdvisor.tokenPerMinute} توکن</Text>
                      <Text> به ازای هر دقیقه</Text>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <Tabs defaultActiveKey="1">
                  <TabPane tab="درباره مشاور" key="1">
                    <Paragraph style={{ whiteSpace: 'pre-line' }}>
                      {selectedAdvisor.bio}
                    </Paragraph>
                  </TabPane>
                  
                  <TabPane tab="تخصص‌ها" key="2">
                    <div style={{ marginTop: 10 }}>
                      {selectedAdvisor.specializations.map((spec, index) => (
                        <Tag key={index} style={{ margin: '0 0 8px 8px', padding: '4px 8px' }}>
                          {spec}
                        </Tag>
                      ))}
                    </div>
                  </TabPane>
                  
                  <TabPane tab="زبان‌ها" key="3">
                    <div style={{ marginTop: 10 }}>
                      {selectedAdvisor.languages.map((lang, index) => (
                        <Tag key={index} style={{ margin: '0 0 8px 8px', padding: '4px 8px' }}>
                          {lang}
                        </Tag>
                      ))}
                    </div>
                  </TabPane>
                </Tabs>
                
                <Divider />
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {currentUser ? (
                    <Button
                      type="primary"
                      size="large"
                      icon={<CalendarOutlined />}
                      onClick={() => window.scrollTo({
                        top: document.getElementById('booking-section')?.offsetTop || 0,
                        behavior: 'smooth'
                      })}
                      disabled={!selectedAdvisor.isAvailable}
                    >
                      رزرو جلسه مشاوره
                    </Button>
                  ) : (
                    <Link to="/auth/login">
                      <Button type="primary" size="large" icon={<MessageOutlined />}>
                        ورود و رزرو جلسه
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              {currentUser && (
                <div id="booking-section">
                  <SessionBookingForm 
                    advisor={selectedAdvisor}
                    userId={currentUser.id}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AdvisorDetailPage; 
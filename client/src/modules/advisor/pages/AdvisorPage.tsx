import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Card, Row, Col, Avatar, Tag, Rate, Space, Divider, Button, Tabs, List, Empty, Spin, Statistic } from 'antd';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined, CreditCardOutlined, MessageOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useAdvisor } from '../hooks/useAdvisor';
import SessionBookingForm from '../components/SessionBookingForm';
import { getAdvisorTypeText, getExpertiseLevelText } from '../utils/textConverters';
import { Advisor } from '../types';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const AdvisorPage: React.FC = () => {
  const { advisorId } = useParams<{ advisorId: string }>();
  const { selectedAdvisor, loading, error, getAdvisorById } = useAdvisor();
  const [activeTab, setActiveTab] = useState<string>('about');
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  
  useEffect(() => {
    if (advisorId) {
      getAdvisorById(advisorId);
    }
  }, [getAdvisorById, advisorId]);

  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
    if (!showBookingForm) {
      setActiveTab('booking');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Text type="danger">{error}</Text>;
  }

  if (!selectedAdvisor) {
    return <Empty description="مشاور یافت نشد" />;
  }

  return (
    <div className="advisor-page">
      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={8} lg={7}>
            <div style={{ textAlign: 'center' }}>
              <Avatar
                src={selectedAdvisor.avatarUrl}
                icon={<UserOutlined />}
                size={120}
                style={{ marginBottom: 16 }}
              />
              
              <Title level={3} style={{ marginTop: 8, marginBottom: 4 }}>
                {selectedAdvisor.name}
              </Title>
              
              <Space direction="vertical" size={12} style={{ width: '100%', marginBottom: 16 }}>
                <div>
                  <Tag color="blue">{getAdvisorTypeText(selectedAdvisor.type)}</Tag>
                  <Tag color="purple">{getExpertiseLevelText(selectedAdvisor.expertise)}</Tag>
                  {selectedAdvisor.isAvailable ? (
                    <Tag color="green">در دسترس</Tag>
                  ) : (
                    <Tag color="red">خارج از دسترس</Tag>
                  )}
                </div>
                
                <div>
                  <Rate disabled defaultValue={selectedAdvisor.rating} allowHalf style={{ fontSize: 14 }} />
                  <Text type="secondary"> ({selectedAdvisor.reviewCount} نظر)</Text>
                </div>
              </Space>
              
              <Card style={{ marginTop: 16 }}>
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Statistic 
                    title="هزینه هر دقیقه" 
                    value={selectedAdvisor.tokenPerMinute} 
                    suffix="توکن" 
                    prefix={<CreditCardOutlined />}
                  />
                  
                  <Divider style={{ margin: '12px 0' }} />
                  
                  <Button 
                    type="primary" 
                    size="large"
                    block
                    icon={<CalendarOutlined />}
                    onClick={toggleBookingForm}
                    disabled={!selectedAdvisor.isAvailable}
                  >
                    {showBookingForm ? 'بستن فرم رزرو' : 'رزرو جلسه مشاوره'}
                  </Button>
                </Space>
              </Card>
            </div>
          </Col>
          
          <Col xs={24} sm={24} md={16} lg={17}>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane 
                tab={
                  <span>
                    <UserOutlined />
                    درباره مشاور
                  </span>
                } 
                key="about"
              >
                <Card title="بیوگرافی">
                  <Paragraph>{selectedAdvisor.bio}</Paragraph>
                </Card>
                
                <Card title="تخصص‌ها" style={{ marginTop: 16 }}>
                  <div>
                    {selectedAdvisor.specializations.map((spec, index) => (
                      <Tag color="blue" key={index} style={{ margin: '0 4px 8px 0' }}>
                        {spec}
                      </Tag>
                    ))}
                  </div>
                </Card>
                
                <Card title="زبان‌ها" style={{ marginTop: 16 }}>
                  <div>
                    {selectedAdvisor.languages.map((lang, index) => (
                      <Tag color="green" key={index} style={{ margin: '0 4px 8px 0' }}>
                        {lang}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </TabPane>
              
              {showBookingForm && (
                <TabPane 
                  tab={
                    <span>
                      <CalendarOutlined />
                      رزرو جلسه
                    </span>
                  } 
                  key="booking"
                >
                  <SessionBookingForm advisor={selectedAdvisor} userId="current-user-id" />
                </TabPane>
              )}
              
              <TabPane 
                tab={
                  <span>
                    <MessageOutlined />
                    نظرات
                  </span>
                } 
                key="reviews"
              >
                {selectedAdvisor.reviewCount > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={[]} // در اینجا باید از API نظرات مشاور دریافت شود
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={<Text>کاربر مهمان</Text>}
                          description={
                            <div>
                              <Rate disabled defaultValue={4} />
                              <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                                {moment().subtract(5, 'days').format('YYYY/MM/DD')}
                              </Text>
                              <Paragraph style={{ margin: '8px 0 0' }}>
                                مشاوره بسیار خوبی بود. توصیه‌های کاربردی ارائه دادند.
                              </Paragraph>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description="هنوز نظری ثبت نشده است" />
                )}
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <ClockCircleOutlined />
                    زمان‌های در دسترس
                  </span>
                } 
                key="availability"
              >
                <Card>
                  <Empty description="برنامه زمانی مشاور به‌زودی در دسترس قرار می‌گیرد" />
                </Card>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AdvisorPage; 
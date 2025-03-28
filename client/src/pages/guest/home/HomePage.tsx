import React from 'react';
import { Card, Row, Col, Button, Typography, Carousel, Divider } from 'antd';
import { 
  ArrowRightOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../modules/shared/context/ThemeContext';

const { Title, Paragraph } = Typography;

/**
 * صفحه اصلی
 */
const HomePage: React.FC = () => {
  const { darkMode } = useTheme();
  
  return (
    <div>
      <Carousel autoplay>
        <div>
          <div style={{ 
            height: 400, 
            background: '#1890ff', 
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 50px',
            textAlign: 'center'
          }}>
            <Title level={1} style={{ color: '#fff' }}>دستیار هوشمند ۱۲۳</Title>
            <Paragraph style={{ color: '#fff', fontSize: 18 }}>
              راه‌حل هوشمند برای مدیریت پروژه‌ها، مشاوره آنلاین و کسب امتیاز
            </Paragraph>
            <Button type="primary" size="large" ghost style={{ marginTop: 20 }}>
              شروع کنید
            </Button>
          </div>
        </div>
        <div>
          <div style={{ 
            height: 400, 
            background: '#722ed1', 
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 50px',
            textAlign: 'center'
          }}>
            <Title level={1} style={{ color: '#fff' }}>سیستم توکن مانیبل</Title>
            <Paragraph style={{ color: '#fff', fontSize: 18 }}>
              با استفاده از فعالیت‌های روزانه توکن کسب کنید و از مزایای ویژه بهره‌مند شوید
            </Paragraph>
            <Button type="primary" size="large" ghost style={{ marginTop: 20 }}>
              کسب توکن
            </Button>
          </div>
        </div>
        <div>
          <div style={{ 
            height: 400, 
            background: '#52c41a', 
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 50px',
            textAlign: 'center'
          }}>
            <Title level={1} style={{ color: '#fff' }}>مشاوره هوشمند</Title>
            <Paragraph style={{ color: '#fff', fontSize: 18 }}>
              با کمک هوش مصنوعی، بهترین مشاوران را برای نیازهای خود پیدا کنید
            </Paragraph>
            <Button type="primary" size="large" ghost style={{ marginTop: 20 }}>
              دریافت مشاوره
            </Button>
          </div>
        </div>
      </Carousel>
      
      <div style={{ padding: '50px 0' }}>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={8}>
            <Card 
              hoverable 
              style={{ textAlign: 'center', height: '100%' }}
              cover={<div style={{ 
                fontSize: 48, 
                padding: '20px 0', 
                color: '#1890ff',
                background: darkMode ? '#141414' : '#f0f5ff' 
              }}>
                <UserOutlined />
              </div>}
            >
              <Title level={3}>مشاوره تخصصی</Title>
              <Paragraph>
                دسترسی به مشاوران متخصص در زمینه‌های مختلف با رتبه‌بندی و بازخورد کاربران
              </Paragraph>
              <Button type="link">
                مشاهده مشاوران <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card 
              hoverable 
              style={{ textAlign: 'center', height: '100%' }}
              cover={<div style={{ 
                fontSize: 48, 
                padding: '20px 0', 
                color: '#722ed1',
                background: darkMode ? '#141414' : '#f9f0ff' 
              }}>
                <DollarOutlined />
              </div>}
            >
              <Title level={3}>سیستم توکن</Title>
              <Paragraph>
                کسب توکن از طریق فعالیت‌ها و استفاده از آن‌ها برای تخفیف و خدمات ویژه
              </Paragraph>
              <Button type="link">
                اطلاعات بیشتر <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card 
              hoverable 
              style={{ textAlign: 'center', height: '100%' }}
              cover={<div style={{ 
                fontSize: 48, 
                padding: '20px 0', 
                color: '#52c41a',
                background: darkMode ? '#141414' : '#f6ffed' 
              }}>
                <BulbOutlined />
              </div>}
            >
              <Title level={3}>راهکارهای هوشمند</Title>
              <Paragraph>
                ارائه راهکارهای هوشمند و شخصی‌سازی شده با استفاده از هوش مصنوعی
              </Paragraph>
              <Button type="link">
                کشف راهکارها <ArrowRightOutlined />
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      
      <Card style={{ marginBottom: 50 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
          مزایای استفاده از دستیار هوشمند
        </Title>
        
        <Row gutter={[48, 24]}>
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', marginTop: 4, marginLeft: 16 }} />
              <div>
                <Title level={4}>مشاوره تخصصی</Title>
                <Paragraph>
                  دسترسی به بهترین مشاوران در زمینه‌های مختلف با امکان رزرو آنلاین جلسات
                </Paragraph>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', marginTop: 4, marginLeft: 16 }} />
              <div>
                <Title level={4}>کسب توکن</Title>
                <Paragraph>
                  با فعالیت‌های روزانه خود توکن کسب کنید و از مزایای ویژه آن استفاده نمایید
                </Paragraph>
              </div>
            </div>
          </Col>
          
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', marginTop: 4, marginLeft: 16 }} />
              <div>
                <Title level={4}>پشتیبانی ۲۴/۷</Title>
                <Paragraph>
                  پشتیبانی آنلاین و در دسترس به صورت شبانه‌روزی برای پاسخگویی به سوالات شما
                </Paragraph>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', marginTop: 4, marginLeft: 16 }} />
              <div>
                <Title level={4}>هوش مصنوعی</Title>
                <Paragraph>
                  بهره‌گیری از فناوری‌های نوین هوش مصنوعی برای ارائه خدمات بهتر و هوشمندتر
                </Paragraph>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomePage; 
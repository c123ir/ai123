import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Divider,
  Avatar,
  List,
  Space,
  Timeline
} from 'antd';
import {
  SafetyOutlined,
  RocketOutlined,
  ToolOutlined,
  TrophyOutlined,
  CustomerServiceOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { useTheme } from '../../../modules/shared/context/ThemeContext';

const { Title, Paragraph, Text } = Typography;

/**
 * صفحه درباره ما برای کاربران مهمان
 */
const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // استایل‌های سفارشی با اصلاح روش استفاده از bgcolor
  const SectionCard = styled(Card)`
    margin-bottom: 24px;
    border-radius: 12px;
    background-color: ${props => props.className?.includes('bg-custom') 
      ? props.className?.includes('bg-dark') 
        ? '#141414' 
        : props.className?.includes('bg-blue') 
          ? '#f0f5ff' 
          : props.className?.includes('bg-cyan') 
            ? '#e6fffb' 
            : 'transparent'
      : 'transparent'
    };
  `;

  const ValueIcon = styled.div<{ $theme: 'dark' | 'light' }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    border-radius: 32px;
    font-size: 24px;
    background: ${props => props.$theme === 'dark' 
      ? 'linear-gradient(135deg, #1890ff30 0%, #1890ff10 100%)' 
      : 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)'
    };
    color: #1890ff;
  `;
  
  // لیست خدمات اصلی
  const mainServices = [
    {
      title: 'محاسبه اقساط هوشمند',
      description: 'محاسبه دقیق اقساط وام‌ها و خریدهای قسطی با امکان شخصی‌سازی کامل شرایط'
    },
    {
      title: 'مدیریت گارانتی محصولات',
      description: 'پیگیری وضعیت گارانتی محصولات و یادآوری تاریخ انقضای آن‌ها'
    },
    {
      title: 'سیستم امتیازدهی و توکن',
      description: 'کسب توکن با فعالیت‌ها و استفاده از آن‌ها برای دریافت تخفیف و خدمات ویژه'
    },
    {
      title: 'مدیریت سرمایه‌گذاری',
      description: 'امکان مشاهده و مدیریت سرمایه‌گذاری‌ها به همراه گزارش‌های تحلیلی'
    }
  ];
  
  // لیست ارزش‌های ما
  const ourValues = [
    {
      title: 'امنیت',
      description: 'حفظ امنیت و محرمانگی اطلاعات کاربران در بالاترین سطح',
      icon: <SafetyOutlined style={{ fontSize: 32 }} />
    },
    {
      title: 'نوآوری',
      description: 'بهره‌گیری از فناوری‌های نوین برای ارائه راهکارهای هوشمند',
      icon: <RocketOutlined style={{ fontSize: 32 }} />
    },
    {
      title: 'مشتری‌مداری',
      description: 'ارائه خدمات با کیفیت و پاسخگویی به نیازهای کاربران',
      icon: <CustomerServiceOutlined style={{ fontSize: 32 }} />
    }
  ];

  // داده‌های اعضای تیم
  const teamMembers = [
    {
      name: 'رضا محمدی',
      role: 'مدیرعامل',
      avatar: '/static/images/team/team1.jpg',
      description: 'بیش از ۱۵ سال تجربه در صنعت فناوری مالی و مدیریت کسب‌وکار'
    },
    {
      name: 'سارا احمدی',
      role: 'مدیر فنی',
      avatar: '/static/images/team/team2.jpg',
      description: 'متخصص در حوزه هوش مصنوعی و توسعه نرم‌افزارهای مالی'
    },
    {
      name: 'امیر حسینی',
      role: 'مدیر بازاریابی',
      avatar: '/static/images/team/team3.jpg',
      description: 'با تجربه در زمینه بازاریابی دیجیتال و توسعه کسب‌وکار'
    }
  ];
  
  // داده‌های مزیت‌های رقابتی
  const advantages = [
    {
      title: 'هوش مصنوعی',
      description: 'استفاده از الگوریتم‌های هوش مصنوعی برای پیشنهادات شخصی‌سازی شده',
      icon: <UserOutlined />
    },
    {
      title: 'خدمات جامع',
      description: 'ارائه خدمات مالی و مدیریتی متنوع در یک پلتفرم واحد',
      icon: <DollarOutlined />
    }
  ];

  // رویدادهای تاریخی شرکت
  const historyItems = [
    {
      color: 'green',
      label: '1400',
      children: 'تأسیس شرکت و شروع به کار با ارائه خدمات پایه محاسبه اقساط و مدیریت مالی'
    },
    {
      color: 'blue',
      label: '1401',
      children: 'توسعه سیستم مدیریت گارانتی و افزودن سیستم مدیریت سرمایه‌گذاری'
    },
    {
      color: 'purple',
      label: '1402',
      children: 'راه‌اندازی باشگاه مشتریان و سیستم توکن و امتیازدهی'
    },
    {
      color: 'red',
      label: '1403',
      children: 'معرفی دستیار هوشمند یک دو سه با قابلیت‌های هوش مصنوعی و یادگیری ماشینی'
    }
  ];

  return (
    <>
      {/* بخش معرفی */}
      <Card>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <Title level={1}>
              دستیار هوشمند یک دو سه
            </Title>
            <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
              دستیار هوشمند یک دو سه، با هدف ارائه خدمات مالی هوشمند و کاربرپسند به مشتریان ایجاد شده است. ما با ترکیب فناوری‌های نوین و تجربه کاربری عالی، تلاش می‌کنیم امور مالی را برای شما ساده‌تر کنیم.
            </Paragraph>
            <Paragraph>
              خدمات ما شامل محاسبه دقیق اقساط، مدیریت گارانتی، سیستم امتیازدهی هوشمند و ابزارهای مدیریت سرمایه‌گذاری می‌شود که همگی با رابط کاربری ساده و کارآمد در اختیار شما قرار می‌گیرند.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/static/images/about-us.svg" 
              alt="دستیار هوشمند یک دو سه" 
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
        </Row>
      </Card>
      
      {/* بخش خدمات اصلی */}
      <Title level={2} style={{ marginTop: 32 }}>
        خدمات اصلی ما
      </Title>
      
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {mainServices.map((service, index) => (
          <Col xs={24} sm={12} key={index}>
            <Card style={{ height: '100%', borderRadius: 8 }}>
              <Title level={4}>
                {service.title}
              </Title>
              <Paragraph type="secondary">
                {service.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* بخش ارزش‌های ما */}
      <Card style={{ padding: 24, marginBottom: 40, borderRadius: 8 }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          ارزش‌های ما
        </Title>
        
        <Divider style={{ marginBottom: 32 }} />
        
        <Row gutter={[32, 32]} justify="center">
          {ourValues.map((value, index) => (
            <Col xs={24} sm={8} key={index}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                padding: 16
              }}>
                <Avatar 
                  size={80} 
                  style={{
                    marginBottom: 16,
                    backgroundColor: '#1890ff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {value.icon}
                </Avatar>
                <Title level={4}>
                  {value.title}
                </Title>
                <Paragraph type="secondary">
                  {value.description}
                </Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
      
      {/* بخش درباره شرکت */}
      <Row gutter={[32, 32]} style={{ marginBottom: 40 }}>
        <Col xs={24} md={12}>
          <Title level={3}>
            درباره شرکت
          </Title>
          <Paragraph>
            شرکت دستیار هوشمند یک دو سه از سال ۱۳۹۸ فعالیت خود را در زمینه ارائه راهکارهای 
            هوشمند مالی و مدیریتی آغاز کرده است. هدف اصلی ما ساده‌سازی امور مالی و 
            مدیریتی کاربران با استفاده از فناوری‌های نوین و هوشمند است.
          </Paragraph>
          <Paragraph>
            تیم ما متشکل از متخصصان باتجربه در حوزه‌های مالی، فناوری اطلاعات و تجربه کاربری 
            است که به صورت مستمر در تلاش برای بهبود خدمات و ارائه راهکارهای نوآورانه هستند.
          </Paragraph>
          
          <div style={{ marginTop: 24 }}>
            <Title level={4}>
              چرا دستیار هوشمند یک دو سه؟
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={[
                'ارائه خدمات متنوع در یک پلتفرم یکپارچه',
                'رابط کاربری ساده و کاربرپسند',
                'پشتیبانی ۲۴/۷ و پاسخگویی سریع',
                'سیستم امتیازدهی و پاداش برای کاربران'
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<SafetyOutlined style={{ color: '#1890ff', fontSize: 20 }} />}
                    title={item}
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>
        
        <Col xs={24} md={12}>
          <Card
            style={{ 
              height: '100%', 
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Title level={3}>
              اطلاعات تماس
            </Title>
            
            <List itemLayout="horizontal">
              <List.Item>
                <List.Item.Meta
                  avatar={<EnvironmentOutlined style={{ color: '#1890ff', fontSize: 24 }} />}
                  title="آدرس"
                  description="تهران، خیابان ولیعصر، برج ایران، طبقه ۱۵"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<PhoneOutlined style={{ color: '#1890ff', fontSize: 24 }} />}
                  title="تلفن پشتیبانی"
                  description="۰۲۱-۸۸۸۸۸۸۸۸"
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  avatar={<TeamOutlined style={{ color: '#1890ff', fontSize: 24 }} />}
                  title="شبکه‌های اجتماعی"
                  description={
                    <Space style={{ marginTop: 8 }}>
                      <Button type="primary" size="small">
                        اینستاگرام
                      </Button>
                      <Button type="primary" size="small">
                        تلگرام
                      </Button>
                      <Button type="primary" size="small">
                        لینکدین
                      </Button>
                    </Space>
                  }
                />
              </List.Item>
            </List>
            
            <div style={{ marginTop: 'auto', paddingTop: 24 }}>
              <Button 
                type="primary"
                block
                size="large"
                onClick={() => navigate('/guest/help')}
              >
                تماس با ما
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* بخش دعوت به عضویت */}
      <Card
        style={{ 
          padding: 32, 
          borderRadius: 8,
          background: theme === 'dark' 
            ? 'linear-gradient(to right, #2d3748, #1a202c)'
            : 'linear-gradient(to right, #fff, #f5f7fa)', 
          textAlign: 'center',
          marginBottom: 40
        }}
      >
        <Title level={3}>
          همین امروز به جمع کاربران دستیار هوشمند یک دو سه بپیوندید
        </Title>
        <Paragraph style={{ maxWidth: 800, margin: '0 auto 24px' }}>
          با ثبت‌نام در دستیار هوشمند یک دو سه، از امکانات کامل سیستم بهره‌مند شوید و مدیریت امور مالی خود را به سطح جدیدی ارتقا دهید.
        </Paragraph>
        <Button 
          type="primary" 
          size="large"
          onClick={() => navigate('/register')}
          style={{ padding: '0 32px' }}
        >
          ثبت‌نام کنید
        </Button>
      </Card>
      
      {/* بخش چشم‌انداز و ماموریت با کلاس به جای prop */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <SectionCard
            className={`bg-custom bg-blue ${theme === 'dark' ? 'bg-dark' : ''}`}
          >
            <Title level={3}>
              <RocketOutlined /> چشم‌انداز ما
            </Title>
            <Paragraph>
              تبدیل شدن به برترین پلتفرم هوشمند مدیریت مالی در ایران و ارائه راهکارهای نوآورانه برای بهبود کیفیت زندگی مالی کاربران
            </Paragraph>
          </SectionCard>
        </Col>
        <Col xs={24} md={12}>
          <SectionCard
            className={`bg-custom bg-cyan ${theme === 'dark' ? 'bg-dark' : ''}`}
          >
            <Title level={3}>
              <ToolOutlined /> ماموریت ما
            </Title>
            <Paragraph>
              ارائه ابزارهای کارآمد و هوشمند برای مدیریت مالی شخصی، گارانتی محصولات و سرمایه‌گذاری به منظور افزایش سواد مالی و بهبود تصمیم‌گیری‌های اقتصادی کاربران
            </Paragraph>
          </SectionCard>
        </Col>
      </Row>
      
      {/* بخش مزیت‌های رقابتی */}
      <SectionCard>
        <Title level={3}>
          <TrophyOutlined /> مزیت‌های رقابتی ما
        </Title>
        
        <Row gutter={[24, 24]}>
          {advantages.map((advantage, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card style={{ height: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <ValueIcon $theme={theme === 'dark' ? 'dark' : 'light'}>
                    {advantage.icon}
                  </ValueIcon>
                </div>
                <Title level={4} style={{ textAlign: 'center' }}>
                  {advantage.title}
                </Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  {advantage.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </SectionCard>
      
      {/* تاریخچه شرکت */}
      <SectionCard>
        <Title level={3}>
          <HomeOutlined /> تاریخچه ما
        </Title>
        <Timeline
          mode="left"
          style={{ marginTop: 32 }}
          items={historyItems}
        />
      </SectionCard>
      
      {/* بخش اعضای تیم */}
      <Title level={2} style={{ marginTop: 32 }}>
        اعضای تیم
      </Title>
      
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        {teamMembers.map((member, index) => (
          <Col xs={24} sm={12} key={index}>
            <Card style={{ height: '100%', borderRadius: 8 }}>
              <div style={{ textAlign: 'center' }}>
                <Avatar size={80} src={member.avatar} />
                <Title level={4} style={{ marginTop: '16px' }}>
                  {member.name}
                </Title>
                <p>{member.role}</p>
                <p>{member.description}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* بخش تماس با ما */}
      <Card style={{ marginTop: '40px' }}>
        <Title level={3}>
          تماس با ما
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <p>
              <PhoneOutlined /> ۰۲۱-۱۲۳۴۵۶۷۸
            </p>
          </Col>
          <Col span={8}>
            <p>
              <MailOutlined /> info@example.com
            </p>
          </Col>
          <Col span={8}>
            <p>
              <GlobalOutlined /> www.example.com
            </p>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AboutPage; 
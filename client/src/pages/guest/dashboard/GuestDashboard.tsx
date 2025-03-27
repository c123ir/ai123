import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Divider,
  Tag, 
  Statistic,
  Avatar,
  List,
  Carousel,
  Skeleton,
  Badge,
  Progress
} from 'antd';
import { 
  CalculatorOutlined,
  BankOutlined,
  SafetyOutlined,
  RightOutlined,
  GiftOutlined,
  ArrowRightOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  TeamOutlined,
  LikeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  LockOutlined,
  RocketOutlined,
  TrophyOutlined,
  BookOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useTheme } from '../../../components/common/ThemeContext';
import { numbersWithCommas } from '../../../utils/DigitConverter';

const { Title, Paragraph, Text } = Typography;

// استایل‌های سفارشی
const HeroSection = styled(motion.div)<{ $theme?: string }>`
  padding: 48px 24px;
  margin-bottom: 48px;
  border-radius: 16px;
  text-align: center;
  overflow: hidden;
  position: relative;
  background: ${props => props.$theme === 'dark'
    ? 'linear-gradient(135deg, #1f1f1f 0%, #2d3748 100%)'
    : 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)'
  };
  
  h1 {
    margin-bottom: 24px;
    font-size: 2.5rem;
    background: linear-gradient(120deg, #1890ff, #69c0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .subtitle {
    font-size: 1.25rem;
    margin-bottom: 32px;
    opacity: 0.8;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(24, 144, 255, 0.1) 0%, transparent 70%);
    z-index: 0;
    animation: pulse 15s infinite linear;
  }
  
  @keyframes pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledCard = styled(motion.div)<{ $theme?: string }>`
  height: 100%;
  transition: all 0.3s;
  border-radius: 16px;
  overflow: hidden;
  background: ${props => props.$theme === 'dark' 
    ? '#141414' 
    : '#fff'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div<{ $theme?: string }>`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 28px;
  background: ${props => props.$theme === 'dark'
    ? 'linear-gradient(135deg, #1890ff30 0%, #1890ff10 100%)'
    : 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)'
  };
  color: #1890ff;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(24, 144, 255, 0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  ${StyledCard}:hover & {
    &::after {
      opacity: 1;
      animation: pulse-light 2s infinite;
    }
  }
  
  @keyframes pulse-light {
    0% {
      transform: scale(0.8);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.3;
    }
  }
`;

const RegisterCard = styled(motion.div)<{ $theme?: string }>`
  padding: 32px;
  text-align: center;
  margin-top: 48px;
  border-radius: 16px;
  background: ${props => props.$theme === 'dark'
    ? 'linear-gradient(to right, #2d3748, #1a202c)'
    : 'linear-gradient(to right, #fff, #f5f7fa)'
  };
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(24, 144, 255, 0.05), transparent 70%);
    z-index: 0;
  }
`;

const TokenBadge = styled(motion.div)<{ $theme?: string }>`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 24px;
  margin-bottom: 16px;
  font-weight: bold;
  background: ${props => props.$theme === 'dark'
    ? 'rgba(24, 144, 255, 0.2)'
    : 'rgba(24, 144, 255, 0.1)'
  };
  color: #1890ff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: rotate(45deg);
    transition: all 0.5s;
    z-index: 0;
  }
  
  &:hover::before {
    animation: shine 1.5s infinite;
  }
  
  @keyframes shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;

const StatisticCard = styled(motion.div)`
  padding: 24px;
  border-radius: 16px;
  height: 100%;
  background: ${props => props.theme === 'dark' 
    ? '#141414' 
    : '#fff'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  .ant-statistic-title {
    margin-bottom: 16px;
    font-size: 16px;
  }
  
  .ant-statistic-content {
    font-size: 24px;
  }
`;

const ModuleTitleWrapper = styled.div`
  margin-bottom: 32px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 0;
    width: 60px;
    height: 3px;
    background: #1890ff;
    border-radius: 3px;
  }
`;

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const featureCardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
      delay: i * 0.1
    }
  })
};

// دریافت ماژول‌های فعال - این می‌تواند از API دریافت شود
const getActiveModules = async () => {
  // این قسمت می‌تواند از API سرور داده‌ها را دریافت کند
  return [
    {
      id: 'calculator',
      title: 'محاسبه اقساط',
      description: 'محاسبه آسان و دقیق اقساط وام‌ها و خریدهای قسطی با امکان تنظیم شرایط مختلف',
      icon: <CalculatorOutlined />,
      path: '/guest/calculator',
      enabled: true,
      featured: true,
    },
    {
      id: 'warranty',
      title: 'مدیریت گارانتی',
      description: 'پیگیری وضعیت گارانتی محصولات و یادآوری تاریخ انقضای آن‌ها',
      icon: <SafetyOutlined />,
      path: '/auth/register',
      enabled: true,
      premium: true,
    },
    {
      id: 'financial',
      title: 'مدیریت مالی',
      description: 'مدیریت هزینه‌ها، درآمدها و بودجه‌بندی هوشمند با نمودارهای تحلیلی',
      icon: <DollarOutlined />,
      path: '/auth/register',
      enabled: true,
      premium: true,
    },
    {
      id: 'rewards',
      title: 'سیستم امتیازدهی',
      description: 'کسب توکن با فعالیت‌ها و استفاده از آن‌ها برای دریافت تخفیف و خدمات ویژه',
      icon: <GiftOutlined />,
      path: '/auth/register',
      enabled: true,
      premium: true,
    },
    {
      id: 'learning',
      title: 'آموزش مالی',
      description: 'دسترسی به محتوای آموزشی مدیریت مالی، سرمایه‌گذاری و برنامه‌ریزی مالی',
      icon: <BookOutlined />,
      path: '/auth/register',
      enabled: true,
      premium: true,
    },
    {
      id: 'investment',
      title: 'مدیریت سرمایه‌گذاری',
      description: 'ابزارهای پیشرفته برای مدیریت و رصد سرمایه‌گذاری‌ها و تحلیل بازدهی',
      icon: <TrophyOutlined />,
      path: '/auth/register',
      enabled: true,
      premium: true,
    }
  ];
};

// اسلایدرهای تبلیغاتی - این می‌تواند از API دریافت شود
const getPromotionSlides = async () => {
  return [
    {
      id: 1,
      title: 'مدیریت مالی هوشمند',
      description: 'به کمک هوش مصنوعی، بهترین تصمیمات مالی را بگیرید',
      image: '/static/images/finance-app.svg',
      color: '#1890ff',
    },
    {
      id: 2,
      title: 'رصد کامل گارانتی‌ها',
      description: 'دیگر نگران فراموش کردن تاریخ گارانتی محصولات خود نباشید',
      image: '/static/images/warranty.svg',
      color: '#52c41a',
    },
    {
      id: 3,
      title: '۵۰ توکن هدیه',
      description: 'با ثبت‌نام، ۵۰ توکن هدیه برای استفاده از خدمات ویژه دریافت کنید',
      image: '/static/images/gift.svg',
      color: '#722ed1',
    },
  ];
};

// آمارهای کاربری - این می‌تواند از API دریافت شود
const getStats = async () => {
  return {
    users: 12000,
    calculations: 45000,
    satisfaction: 98,
  };
};

/**
 * صفحه داشبورد برای کاربران مهمان
 */
const GuestDashboard: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  
  // فتچ کردن داده‌ها
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [moduleData, slideData, statData] = await Promise.all([
          getActiveModules(),
          getPromotionSlides(),
          getStats(),
        ]);
        
        setModules(moduleData);
        setSlides(slideData);
        setStats(statData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // رندر کردن کارت‌های ویژگی‌ها
  const renderFeatureCards = () => {
    if (loading) {
      return Array(6).fill(null).map((_, i) => (
        <Col xs={24} sm={12} md={8} key={i}>
          <Card style={{ height: '100%' }}>
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </Card>
        </Col>
      ));
    }
    
    return modules.map((feature, index) => (
      <Col xs={24} sm={12} md={8} key={feature.id}>
        <motion.div
          variants={featureCardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          custom={index}
        >
          <StyledCard
            as={Card}
            hoverable={!feature.premium}
            style={{ height: '100%', textAlign: 'center', border: 'none', background: 'transparent' }}
            $theme={theme}
            onClick={() => navigate(feature.path)}
          >
            {feature.featured && (
              <Badge.Ribbon text="پیشنهاد ویژه" color="#1890ff" />
            )}
            <FeatureIcon $theme={theme}>
              {feature.icon}
            </FeatureIcon>
            <Title level={4}>
              {feature.title}
            </Title>
            <Paragraph type="secondary">
              {feature.description}
            </Paragraph>
            
            {feature.premium ? (
              <Tag color="warning" style={{ padding: '0 8px', margin: '8px 0' }}>
                نیازمند ثبت‌نام <LockOutlined style={{ marginRight: 4 }} />
              </Tag>
            ) : (
            <Button 
                type="link" 
                icon={<ArrowRightOutlined />}
                style={{ marginTop: 8 }}
              >
                استفاده کنید
            </Button>
            )}
          </StyledCard>
        </motion.div>
      </Col>
    ));
  };
  
  // رندر کردن اسلایدر تبلیغاتی
  const renderPromotionSlider = () => {
    if (loading) {
      return (
        <Card>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
      );
    }
    
    return (
      <Carousel autoplay effect="fade">
        {slides.map((slide) => (
          <div key={slide.id}>
            <Card
              style={{
                background: `linear-gradient(135deg, ${slide.color}20, ${slide.color}10)`,
                borderRadius: 16,
                overflow: 'hidden',
                border: 'none',
              }}
            >
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} md={16}>
                  <Title level={3} style={{ color: slide.color }}>
                    {slide.title}
                  </Title>
                  <Paragraph style={{ fontSize: 16 }}>
                    {slide.description}
                  </Paragraph>
                  <Button
                    type="primary"
                    style={{ background: slide.color, borderColor: slide.color }}
                    onClick={() => navigate('/auth/register')}
                  >
                    شروع کنید
                  </Button>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      </Carousel>
    );
  };
  
  // رندر کردن آمارها
  const renderStats = () => {
    if (loading || !stats) {
      return (
        <Row gutter={[24, 24]}>
          {[1, 2, 3].map((i) => (
            <Col xs={24} sm={8} key={i}>
              <Card>
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            </Col>
          ))}
        </Row>
      );
    }
    
    return (
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <StatisticCard theme={theme}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Statistic
              title={<Space><TeamOutlined /> کاربران فعال</Space>}
              value={stats.users}
              formatter={value => <span>{numbersWithCommas(value as number)}</span>}
            />
            <div style={{ marginTop: 16 }}>
              <Progress percent={80} showInfo={false} strokeColor="#1890ff" />
              <Text type="secondary">رشد ۲۰٪ نسبت به ماه قبل</Text>
            </div>
          </StatisticCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatisticCard theme={theme}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Statistic
              title={<Space><CalculatorOutlined /> محاسبات انجام شده</Space>}
              value={stats.calculations}
              formatter={value => <span>{numbersWithCommas(value as number)}</span>}
            />
            <div style={{ marginTop: 16 }}>
              <Progress percent={65} showInfo={false} strokeColor="#1890ff" />
              <Text type="secondary">افزایش ۱۵٪ در هفته اخیر</Text>
            </div>
          </StatisticCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatisticCard theme={theme}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Statistic
              title={<Space><LikeOutlined /> رضایتمندی کاربران</Space>}
              value={stats.satisfaction}
              suffix="%"
            />
            <div style={{ marginTop: 16 }}>
              <Progress percent={98} showInfo={false} strokeColor="#52c41a" />
              <Text type="secondary">بر اساس نظرسنجی از ۵۰۰۰ کاربر</Text>
            </div>
          </StatisticCard>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {/* بخش اصلی - معرفی */}
      <HeroSection 
        $theme={theme}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <Title level={1}>
            دستیار هوشمند یک دو سه
          </Title>
          <Paragraph className="subtitle">
            مدیریت امور مالی خود را هوشمندانه انجام دهید
          </Paragraph>
          
          <Space size="middle">
            <Button 
              type="primary" 
              size="large"
              icon={<UserOutlined />}
              onClick={() => navigate('/auth/register')}
              shape="round"
            >
              ثبت‌نام رایگان
            </Button>
            <Button 
              size="large"
              icon={<InfoCircleOutlined />}
              onClick={() => navigate('/guest/about')}
              shape="round"
            >
              درباره ما
            </Button>
          </Space>
        </motion.div>
      </HeroSection>
      
      {/* اسلایدر تبلیغاتی */}
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        style={{ marginBottom: 48 }}
      >
        {renderPromotionSlider()}
      </motion.div>
      
      {/* بخش امکانات */}
      <ModuleTitleWrapper>
        <Title level={2}>امکانات دستیار هوشمند</Title>
        <Paragraph style={{ marginBottom: 32 }}>
          ما مجموعه‌ای از ابزارهای کاربردی را برای مدیریت بهتر امور مالی شما فراهم کرده‌ایم
        </Paragraph>
      </ModuleTitleWrapper>
      
      <Row gutter={[24, 24]}>
        {renderFeatureCards()}
      </Row>
      
      {/* بخش آمار */}
      <div style={{ marginTop: 64, marginBottom: 64 }}>
        <ModuleTitleWrapper>
          <Title level={2}>دستیار هوشمند در یک نگاه</Title>
          <Paragraph>
            آمار و ارقامی که نشان‌دهنده اعتماد کاربران به ماست
          </Paragraph>
        </ModuleTitleWrapper>
        
        {renderStats()}
      </div>
      
      {/* بخش توضیحات اصلی */}
      <motion.div
        variants={cardVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        style={{ marginBottom: 64 }}
      >
        <Card style={{ borderRadius: 16, overflow: 'hidden' }}>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <Title level={3}>
                مدیریت هوشمند امور مالی
              </Title>
              <Paragraph>
                دستیار هوشمند یک دو سه، با ارائه ابزارهای کاربردی و هوشمند، به شما کمک می‌کند تا مدیریت امور مالی خود را به سطح جدیدی ارتقا دهید. با استفاده از این پلتفرم، می‌توانید:
              </Paragraph>
              
              <List
                itemLayout="horizontal"
                dataSource={[
                  'محاسبه دقیق اقساط وام‌ها و خریدهای قسطی',
                  'پیگیری وضعیت گارانتی محصولات خریداری شده',
                  'مدیریت هزینه‌ها و درآمدها با نمودارهای تحلیلی',
                  'ذخیره‌سازی اطلاعات مالی با امنیت بالا',
                  'دریافت مشاوره هوشمند برای بهبود وضعیت مالی'
                ]}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CheckCircleOutlined style={{ color: '#1890ff' }} />}
                      title={<span>{item}</span>}
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <img 
                src="/static/images/finance-app.svg" 
                alt="دستیار هوشمند یک دو سه"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Col>
          </Row>
        </Card>
      </motion.div>
      
      {/* کارت دعوت به ثبت‌نام */}
      <RegisterCard 
        $theme={theme}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <TokenBadge 
          $theme={theme}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          ۵۰ توکن هدیه برای ثبت‌نام
        </TokenBadge>
        <Title level={3} style={{ marginBottom: 24 }}>
          همین امروز ثبت‌نام کنید و از تمام امکانات دستیار هوشمند بهره‌مند شوید
        </Title>
        <Paragraph style={{ marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
          با ثبت‌نام در دستیار هوشمند یک دو سه، علاوه بر دسترسی به تمامی امکانات پیشرفته، ۵۰ توکن هدیه دریافت کنید.
        </Paragraph>
        <Button 
          type="primary" 
          size="large"
          icon={<RocketOutlined />}
          onClick={() => navigate('/auth/register')}
          shape="round"
          style={{ padding: '0 32px' }}
        >
          ثبت‌نام رایگان
        </Button>
      </RegisterCard>
    </>
  );
};

export default GuestDashboard; 
import React from 'react';
import { Typography, Button, Space, Card, Row, Col, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Title>به وب‌سایت ما خوش آمدید</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          این یک نمونه ساده از وب‌سایت بدون فروشگاه است که می‌توانید از آن استفاده کنید.
        </Paragraph>
        <Space>
          <Button type="primary" size="large">
            شروع کنید
          </Button>
          <Button size="large">
            اطلاعات بیشتر
          </Button>
        </Space>
      </div>

      <Divider />

      <div style={{ marginBottom: '3rem' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          خدمات ما
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" title="خدمات طراحی" style={{ height: '100%' }}>
              <Paragraph>
                ما خدمات طراحی با کیفیت بالا ارائه می‌دهیم که نیازهای شما را برآورده می‌کند.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" title="خدمات توسعه" style={{ height: '100%' }}>
              <Paragraph>
                تیم متخصص ما آماده ارائه راه‌حل‌های نرم‌افزاری پیشرفته برای کسب و کار شما است.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" title="خدمات مشاوره" style={{ height: '100%' }}>
              <Paragraph>
                با مشاوره‌های تخصصی ما، می‌توانید تصمیمات بهتری برای آینده کسب و کار خود بگیرید.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          درباره ما
        </Title>
        <Card variant="borderless">
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            شرکت ما در سال ۱۳۹۵ تأسیس شد و از آن زمان تاکنون، با تمرکز بر ارائه خدمات با کیفیت و جلب رضایت مشتریان، به یکی از شرکت‌های پیشرو در صنعت تبدیل شده است. هدف ما ارائه راه‌حل‌های نوآورانه و کارآمد برای مشکلات کسب و کارها است.
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            ما با بهره‌گیری از تیمی متشکل از متخصصان باتجربه و خلاق، همواره در تلاش هستیم تا فراتر از انتظارات مشتریان عمل کنیم و خدماتی با استانداردهای جهانی ارائه دهیم.
          </Paragraph>
        </Card>
      </div>

      <div>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          تماس با ما
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card variant="outlined" title="اطلاعات تماس" style={{ height: '100%' }}>
              <Paragraph>آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳</Paragraph>
              <Paragraph>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</Paragraph>
              <Paragraph>ایمیل: info@example.com</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card variant="outlined" title="ساعات کاری" style={{ height: '100%' }}>
              <Paragraph>شنبه تا چهارشنبه: ۸ صبح تا ۵ عصر</Paragraph>
              <Paragraph>پنجشنبه: ۸ صبح تا ۱ بعد از ظهر</Paragraph>
              <Paragraph>جمعه: تعطیل</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home; 
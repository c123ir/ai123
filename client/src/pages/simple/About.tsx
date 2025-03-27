import React from 'react';
import { Typography, Card, Row, Col, Image, Timeline, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Title style={{ textAlign: 'center', marginBottom: '2rem' }}>درباره ما</Title>
      
      <Row gutter={[32, 32]} align="middle" style={{ marginBottom: '3rem' }}>
        <Col xs={24} md={12}>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            شرکت ما با هدف ارائه خدمات برتر در زمینه‌های مختلف تأسیس شده است. ما با تکیه بر دانش و تخصص کارکنان خود، همواره به دنبال ارائه راه‌حل‌های نوآورانه و کارآمد برای مشتریان هستیم.
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
            چشم‌انداز ما تبدیل شدن به یکی از برترین شرکت‌های خدماتی در سطح کشور و ارائه خدمات با استانداردهای جهانی است. ما معتقدیم که موفقیت ما در گرو رضایت مشتریانمان است و به همین دلیل، همواره در تلاش هستیم تا بهترین خدمات را به آن‌ها ارائه دهیم.
          </Paragraph>
        </Col>
        <Col xs={24} md={12} style={{ textAlign: 'center' }}>
          <Image
            src="https://via.placeholder.com/600x400"
            alt="تصویر شرکت"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
            preview={false}
          />
        </Col>
      </Row>

      <Divider />

      <div style={{ marginBottom: '3rem' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          ارزش‌های ما
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" title="کیفیت" style={{ height: '100%' }}>
              <Paragraph>
                ما باور داریم که کیفیت خدمات، کلید اصلی رضایت مشتریان است. به همین دلیل، همواره به دنبال بهبود کیفیت خدمات خود هستیم.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" title="نوآوری" style={{ height: '100%' }}>
              <Paragraph>
                نوآوری در ارائه خدمات، ما را از رقبا متمایز می‌کند. ما همواره به دنبال روش‌های جدید و خلاقانه برای ارائه خدمات هستیم.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" title="صداقت" style={{ height: '100%' }}>
              <Paragraph>
                صداقت در کار و شفافیت در ارتباط با مشتریان، از اصول اساسی شرکت ماست. ما به تعهدات خود پایبند هستیم و صادقانه با مشتریان خود رفتار می‌کنیم.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      <Divider />

      <div style={{ marginBottom: '3rem' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          تاریخچه شرکت
        </Title>
        <Card variant="borderless">
          <Timeline
            mode="alternate"
            items={[
              {
                children: (
                  <div>
                    <strong>۱۳۹۵</strong>
                    <p>تأسیس شرکت و شروع فعالیت در یک دفتر کوچک</p>
                  </div>
                ),
              },
              {
                children: (
                  <div>
                    <strong>۱۳۹۶</strong>
                    <p>گسترش تیم و افزایش تعداد کارکنان به ۱۰ نفر</p>
                  </div>
                ),
              },
              {
                children: (
                  <div>
                    <strong>۱۳۹۷</strong>
                    <p>انتقال به دفتر جدید و بزرگتر</p>
                  </div>
                ),
              },
              {
                children: (
                  <div>
                    <strong>۱۳۹۸</strong>
                    <p>راه‌اندازی اولین شعبه در شهر مشهد</p>
                  </div>
                ),
              },
              {
                children: (
                  <div>
                    <strong>۱۳۹۹</strong>
                    <p>دریافت گواهینامه کیفیت ISO 9001</p>
                  </div>
                ),
              },
              {
                children: (
                  <div>
                    <strong>۱۴۰۰</strong>
                    <p>گسترش فعالیت به سایر شهرها و استخدام ۲۰ نیروی جدید</p>
                  </div>
                ),
              },
              {
                children: (
                  <div>
                    <strong>۱۴۰۲</strong>
                    <p>افتتاح مرکز آموزش و توسعه مهارت‌های حرفه‌ای</p>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>

      <Divider />

      <div>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
          تیم ما
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" style={{ textAlign: 'center' }}>
              <Image
                src="https://via.placeholder.com/150"
                alt="مدیرعامل"
                style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '1rem' }}
                preview={false}
              />
              <Title level={4}>علی محمدی</Title>
              <Paragraph>مدیرعامل</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" style={{ textAlign: 'center' }}>
              <Image
                src="https://via.placeholder.com/150"
                alt="مدیر فنی"
                style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '1rem' }}
                preview={false}
              />
              <Title level={4}>سارا رضایی</Title>
              <Paragraph>مدیر فنی</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card variant="outlined" style={{ textAlign: 'center' }}>
              <Image
                src="https://via.placeholder.com/150"
                alt="مدیر مالی"
                style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '1rem' }}
                preview={false}
              />
              <Title level={4}>محمد احمدی</Title>
              <Paragraph>مدیر مالی</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default About; 
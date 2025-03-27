import React from 'react';
import { Typography, Form, Input, Button, Row, Col, Card, Divider } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // اینجا می‌توانید کد ارسال فرم را اضافه کنید
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Title style={{ textAlign: 'center', marginBottom: '2rem' }}>تماس با ما</Title>
      
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={10}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <Title level={3} style={{ marginBottom: '1.5rem' }}>اطلاعات تماس</Title>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <EnvironmentOutlined style={{ fontSize: '20px', marginLeft: '10px', marginTop: '4px' }} />
                <div>
                  <strong>آدرس:</strong>
                  <Paragraph style={{ margin: '0.5rem 0 0' }}>
                    تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳، طبقه چهارم
                  </Paragraph>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <PhoneOutlined style={{ fontSize: '20px', marginLeft: '10px' }} />
                <div>
                  <strong>تلفن:</strong>
                  <Paragraph style={{ margin: '0.5rem 0 0' }}>
                    ۰۲۱-۸۸۶۶۵۵۴۴
                  </Paragraph>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <MailOutlined style={{ fontSize: '20px', marginLeft: '10px' }} />
                <div>
                  <strong>ایمیل:</strong>
                  <Paragraph style={{ margin: '0.5rem 0 0' }}>
                    info@example.com
                  </Paragraph>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <ClockCircleOutlined style={{ fontSize: '20px', marginLeft: '10px', marginTop: '4px' }} />
                <div>
                  <strong>ساعات کاری:</strong>
                  <Paragraph style={{ margin: '0.5rem 0 0' }}>
                    شنبه تا چهارشنبه: ۸ صبح تا ۵ عصر
                    <br />
                    پنجشنبه: ۸ صبح تا ۱ بعد از ظهر
                    <br />
                    جمعه: تعطیل
                  </Paragraph>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <Title level={4}>موقعیت ما روی نقشه</Title>
              <div style={{ 
                width: '100%', 
                height: '250px', 
                backgroundColor: '#f0f0f0', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                borderRadius: '8px'
              }}>
                <Paragraph>نمایش نقشه</Paragraph>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={14}>
          <Card variant="outlined">
            <Title level={3} style={{ marginBottom: '1.5rem' }}>ارسال پیام</Title>
            <Paragraph style={{ marginBottom: '2rem' }}>
              برای ارتباط با ما، می‌توانید از فرم زیر استفاده کنید. ما در اسرع وقت به پیام شما پاسخ خواهیم داد.
            </Paragraph>
            
            <Form
              name="contact"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ remember: true }}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="نام و نام خانوادگی"
                    name="name"
                    rules={[{ required: true, message: 'لطفاً نام و نام خانوادگی خود را وارد کنید!' }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="شماره تماس"
                    name="phone"
                    rules={[{ required: true, message: 'لطفاً شماره تماس خود را وارد کنید!' }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                label="ایمیل"
                name="email"
                rules={[
                  { required: true, message: 'لطفاً ایمیل خود را وارد کنید!' },
                  { type: 'email', message: 'لطفاً یک ایمیل معتبر وارد کنید!' }
                ]}
              >
                <Input size="large" />
              </Form.Item>
              
              <Form.Item
                label="موضوع"
                name="subject"
                rules={[{ required: true, message: 'لطفاً موضوع پیام خود را وارد کنید!' }]}
              >
                <Input size="large" />
              </Form.Item>
              
              <Form.Item
                label="پیام"
                name="message"
                rules={[{ required: true, message: 'لطفاً پیام خود را وارد کنید!' }]}
              >
                <TextArea rows={5} />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  ارسال پیام
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Title level={2} style={{ marginBottom: '1.5rem' }}>سوالات متداول</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card variant="outlined" title="نحوه همکاری با ما چگونه است؟" style={{ height: '100%' }}>
              <Paragraph>
                برای همکاری با ما می‌توانید از طریق فرم تماس با ما یا شماره تلفن‌های شرکت با ما ارتباط برقرار کنید. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card variant="outlined" title="زمان پاسخگویی به درخواست‌ها چقدر است؟" style={{ height: '100%' }}>
              <Paragraph>
                ما تلاش می‌کنیم به تمامی درخواست‌ها در کمتر از ۲۴ ساعت کاری پاسخ دهیم. البته این زمان بسته به حجم درخواست‌ها ممکن است متغیر باشد.
              </Paragraph>
            </Card>
          </Col>
          
          <Col xs={24} md={8}>
            <Card variant="outlined" title="آیا امکان بازدید حضوری از شرکت وجود دارد؟" style={{ height: '100%' }}>
              <Paragraph>
                بله، با هماهنگی قبلی امکان بازدید حضوری از شرکت وجود دارد. برای هماهنگی می‌توانید با شماره‌های تماس شرکت تماس بگیرید.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Contact; 
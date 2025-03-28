import React from 'react';
import { Card, Row, Col, Form, Input, Button, Typography, Space } from 'antd';
import { 
  SendOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  HomeOutlined,
  GlobalOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../modules/shared/context/ThemeContext';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

/**
 * صفحه تماس با ما
 */
const ContactPage: React.FC = () => {
  const { darkMode } = useTheme();
  const [form] = Form.useForm();
  
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // اینجا کد ارسال اطلاعات به سرور قرار می‌گیرد
    
    // پاک کردن فرم پس از ارسال
    form.resetFields();
  };
  
  return (
    <div>
      <Card>
        <Title level={2}>تماس با ما</Title>
        <Paragraph>
          برای ارتباط با ما از هر یک از راه‌های زیر می‌توانید استفاده کنید. تیم پشتیبانی ما آماده پاسخگویی به سوالات شما هستند.
        </Paragraph>
        
        <Row gutter={[32, 32]} style={{ marginTop: 32 }}>
          <Col xs={24} md={14}>
            <Card title="ارسال پیام">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="نام و نام خانوادگی"
                      rules={[{ required: true, message: 'لطفا نام خود را وارد کنید' }]}
                    >
                      <Input placeholder="نام و نام خانوادگی خود را وارد کنید" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="email"
                      label="آدرس ایمیل"
                      rules={[
                        { required: true, message: 'لطفا ایمیل خود را وارد کنید' },
                        { type: 'email', message: 'ایمیل معتبر نیست' }
                      ]}
                    >
                      <Input placeholder="آدرس ایمیل خود را وارد کنید" />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="subject"
                  label="موضوع"
                  rules={[{ required: true, message: 'لطفا موضوع پیام را وارد کنید' }]}
                >
                  <Input placeholder="موضوع پیام خود را وارد کنید" />
                </Form.Item>
                
                <Form.Item
                  name="message"
                  label="متن پیام"
                  rules={[{ required: true, message: 'لطفا متن پیام را وارد کنید' }]}
                >
                  <TextArea 
                    placeholder="متن پیام خود را وارد کنید" 
                    rows={6} 
                  />
                </Form.Item>
                
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SendOutlined />}
                    size="large"
                  >
                    ارسال پیام
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          
          <Col xs={24} md={10}>
            <Card title="اطلاعات تماس">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Space align="start">
                    <PhoneOutlined style={{ fontSize: 18, color: '#1890ff' }} />
                    <div>
                      <Text strong>شماره تماس</Text>
                      <Paragraph style={{ marginBottom: 0 }}>۰۲۱-۱۲۳۴۵۶۷۸</Paragraph>
                      <Paragraph style={{ marginBottom: 0 }}>۰۲۱-۸۷۶۵۴۳۲۱</Paragraph>
                    </div>
                  </Space>
                </div>
                
                <div>
                  <Space align="start">
                    <MailOutlined style={{ fontSize: 18, color: '#1890ff' }} />
                    <div>
                      <Text strong>ایمیل</Text>
                      <Paragraph style={{ marginBottom: 0 }}>info@example.com</Paragraph>
                      <Paragraph style={{ marginBottom: 0 }}>support@example.com</Paragraph>
                    </div>
                  </Space>
                </div>
                
                <div>
                  <Space align="start">
                    <HomeOutlined style={{ fontSize: 18, color: '#1890ff' }} />
                    <div>
                      <Text strong>آدرس</Text>
                      <Paragraph style={{ marginBottom: 0 }}>
                        تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نگین
                      </Paragraph>
                    </div>
                  </Space>
                </div>
                
                <div>
                  <Space align="start">
                    <GlobalOutlined style={{ fontSize: 18, color: '#1890ff' }} />
                    <div>
                      <Text strong>شبکه‌های اجتماعی</Text>
                      <Paragraph style={{ marginBottom: 0 }}>
                        <Space size="middle">
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <InstagramOutlined style={{ fontSize: 24, color: darkMode ? '#ff7875' : '#c41d7f' }} />
                          </a>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <TwitterOutlined style={{ fontSize: 24, color: darkMode ? '#69c0ff' : '#1890ff' }} />
                          </a>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <LinkedinOutlined style={{ fontSize: 24, color: darkMode ? '#91caff' : '#0a66c2' }} />
                          </a>
                        </Space>
                      </Paragraph>
                    </div>
                  </Space>
                </div>
              </Space>
            </Card>
            
            <Card title="ساعات کاری" style={{ marginTop: 16 }}>
              <Row gutter={[8, 8]}>
                <Col span={12}><Text strong>شنبه تا چهارشنبه:</Text></Col>
                <Col span={12}>۹ صبح تا ۶ عصر</Col>
                
                <Col span={12}><Text strong>پنج‌شنبه:</Text></Col>
                <Col span={12}>۹ صبح تا ۱ بعدازظهر</Col>
                
                <Col span={12}><Text strong>جمعه:</Text></Col>
                <Col span={12}>تعطیل</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContactPage; 
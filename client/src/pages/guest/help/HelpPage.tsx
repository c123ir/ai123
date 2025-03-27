import React, { useState } from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Input,
  Button,
  Divider,
  Space,
  List,
  Select,
  Collapse,
  Tag,
  Form,
  Alert,
  Tooltip,
  message,
  Tabs
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  CopyOutlined,
  DownOutlined,
  RightOutlined,
  BookOutlined,
  GiftOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  SendOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;

// استایل‌های سفارشی
const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .icon {
    font-size: 20px;
    margin-left: 12px;
    color: #1890ff;
  }
  
  .content {
    flex: 1;
  }
`;

const GuideCard = styled(Card)`
  height: 100%;
  border-radius: 8px;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }
`;

/**
 * صفحه راهنما و پشتیبانی برای کاربران مهمان
 */
const HelpPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>("faq");
  
  // سؤالات متداول
  const faqs = [
    {
      question: 'چگونه می‌توانم حساب کاربری ایجاد کنم؟',
      answer: 'برای ایجاد حساب کاربری، کافی است روی دکمه «ثبت‌نام» در بالای صفحه کلیک کنید و فرم ثبت‌نام را تکمیل کنید. پس از تکمیل اطلاعات و تأیید ایمیل، حساب شما فعال خواهد شد و می‌توانید از تمامی امکانات سیستم استفاده کنید.'
    },
    {
      question: 'سیستم توکن و امتیازدهی چگونه کار می‌کند؟',
      answer: 'سیستم توکن و امتیازدهی برای پاداش دادن به کاربران فعال طراحی شده است. با انجام فعالیت‌هایی مانند تکمیل پروفایل، معرفی دوستان، خرید محصولات و سرمایه‌گذاری توکن دریافت می‌کنید. این توکن‌ها قابل استفاده برای دریافت تخفیف، خدمات ویژه و هدایا هستند.'
    },
    {
      question: 'چگونه می‌توانم اقساط وام خود را محاسبه کنم؟',
      answer: 'برای محاسبه اقساط وام، به بخش «محاسبه اقساط» مراجعه کنید. مبلغ وام، تعداد اقساط و نوع کارمزد را وارد کنید و روی دکمه «محاسبه» کلیک کنید. سیستم به صورت خودکار مبلغ هر قسط و جدول اقساط را نمایش می‌دهد.'
    },
    {
      question: 'مدیریت گارانتی محصولات چگونه انجام می‌شود؟',
      answer: 'پس از ثبت‌نام و ورود به حساب کاربری، می‌توانید به بخش «مدیریت گارانتی» مراجعه کنید. در این بخش می‌توانید اطلاعات محصولات دارای گارانتی خود را ثبت کنید. سیستم به صورت خودکار وضعیت گارانتی محصولات را پیگیری می‌کند و قبل از انقضای گارانتی به شما یادآوری می‌کند.'
    },
    {
      question: 'چگونه می‌توانم از سیستم مدیریت سرمایه‌گذاری استفاده کنم؟',
      answer: 'پس از ثبت‌نام و ورود به حساب کاربری، به بخش «سرمایه‌گذاری» مراجعه کنید. در این بخش می‌توانید سرمایه‌گذاری‌های خود را ثبت و مدیریت کنید. سیستم به صورت خودکار سود سرمایه‌گذاری‌ها را محاسبه می‌کند و گزارش‌های تحلیلی ارائه می‌دهد.'
    },
    {
      question: 'آیا استفاده از دستیار هوشمند یک دو سه رایگان است؟',
      answer: 'بله، استفاده از امکانات پایه دستیار هوشمند یک دو سه رایگان است. برخی از امکانات پیشرفته ممکن است نیاز به خرید اشتراک ویژه داشته باشند. برای اطلاع از جزئیات بیشتر، به بخش «قیمت‌گذاری» مراجعه کنید.'
    },
    {
      question: 'چگونه می‌توانم با پشتیبانی تماس بگیرم؟',
      answer: 'شما می‌توانید از طریق فرم تماس موجود در همین صفحه، ایمیل یا شماره تلفن پشتیبانی با ما در تماس باشید. کارشناسان پشتیبانی ما در اسرع وقت به سؤالات و مشکلات شما رسیدگی خواهند کرد.'
    },
  ];
  
  // موضوعات پشتیبانی
  const supportSubjects = [
    { value: 'general', label: 'سؤال عمومی' },
    { value: 'technical', label: 'مشکل فنی' },
    { value: 'account', label: 'حساب کاربری' },
    { value: 'feature', label: 'پیشنهاد ویژگی جدید' },
    { value: 'other', label: 'سایر موارد' },
  ];
  
  // راهنماهای استفاده
  const guides = [
    {
      title: 'راهنمای استفاده از محاسبه‌گر اقساط',
      steps: [
        'به صفحه "محاسبه اقساط" بروید',
        'مبلغ وام یا قیمت کالا را وارد کنید',
        'تعداد اقساط را انتخاب کنید',
        'نرخ سود سالانه را تنظیم کنید',
        'روی دکمه "محاسبه" کلیک کنید تا نتایج نمایش داده شود'
      ]
    },
    {
      title: 'راهنمای مشاهده دمو باشگاه مشتریان',
      steps: [
        'از منوی اصلی، گزینه "باشگاه مشتریان" را انتخاب کنید',
        'در صفحه نمایش داده شده، می‌توانید با سیستم امتیازدهی و سطوح عضویت آشنا شوید',
        'برای استفاده از امکانات کامل باشگاه مشتریان، باید ثبت‌نام کنید'
      ]
    },
    {
      title: 'راهنمای ثبت‌نام در سیستم',
      steps: [
        'روی دکمه "ثبت‌نام" در بالای صفحه کلیک کنید',
        'فرم ثبت‌نام را با اطلاعات خواسته شده پر کنید',
        'کد تأیید ارسال شده به شماره همراه خود را وارد کنید',
        'قوانین و مقررات را مطالعه کرده و در صورت موافقت، تیک تأیید را بزنید',
        'روی دکمه "ثبت‌نام" کلیک کنید',
        'پس از ثبت‌نام موفق، به صفحه داشبورد کاربری هدایت خواهید شد'
      ]
    }
  ];
  
  // ارسال فرم تماس
  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    message.success('پیام شما با موفقیت ارسال شد. بزودی با شما تماس خواهیم گرفت.');
    form.resetFields();
  };

  // کپی کردن متن
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success('اطلاعات با موفقیت کپی شد');
  };
  
  return (
    <>
      <Title level={2}>راهنما و پشتیبانی</Title>
      
      <Paragraph type="secondary" style={{ marginBottom: 32 }}>
        در این بخش می‌توانید پاسخ سؤالات متداول را بیابید یا با کارشناسان پشتیبانی ما در تماس باشید.
      </Paragraph>
      
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        items={[
          {
            key: 'faq',
            label: (
              <span>
                <QuestionCircleOutlined />
                سوالات متداول
              </span>
            ),
            children: (
              <Collapse 
                variant="borderless" 
                defaultActiveKey={['0']}
                style={{ background: 'transparent' }}
              >
                {faqs.map((item, index) => (
                  <Panel 
                    header={<Text strong>{item.question}</Text>} 
                    key={index.toString()}
                  >
                    <Paragraph>{item.answer}</Paragraph>
                  </Panel>
                ))}
              </Collapse>
            )
          },
          {
            key: 'guides',
            label: (
              <span>
                <InfoCircleOutlined />
                راهنماهای استفاده
              </span>
            ),
            children: (
              <div>
                {guides.map((guide, index) => (
                  <div key={index} style={{ marginBottom: 24 }}>
                    <Title level={4}>{guide.title}</Title>
                    <List
                      bordered
                      dataSource={guide.steps}
                      renderItem={(step, stepIndex) => (
                        <List.Item>
                          <Text>{stepIndex + 1}. {step}</Text>
                        </List.Item>
                      )}
                    />
                  </div>
                ))}
              </div>
            )
          },
          {
            key: 'contact',
            label: (
              <span>
                <PhoneOutlined />
                تماس با پشتیبانی
              </span>
            ),
            children: (
              <>
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Title level={4}>اطلاعات تماس</Title>
                    
                    <List itemLayout="horizontal" split={false}>
                      <List.Item>
                        <ContactItem>
                          <PhoneOutlined className="icon" />
                          <div className="content">
                            <div><Text strong>شماره تماس پشتیبانی</Text></div>
                            <div>۰۲۱-۲۲۳۳۴۴۵۵</div>
                          </div>
                          <CopyOutlined 
                            className="copy-button"
                            onClick={() => copyToClipboard('02122334455')}
                          />
                        </ContactItem>
                      </List.Item>
                      
                      <List.Item>
                        <ContactItem>
                          <MailOutlined className="icon" />
                          <div className="content">
                            <div><Text strong>ایمیل پشتیبانی</Text></div>
                            <div>support@ai123.ir</div>
                          </div>
                          <CopyOutlined 
                            className="copy-button"
                            onClick={() => copyToClipboard('support@ai123.ir')}
                          />
                        </ContactItem>
                      </List.Item>
                      
                      <List.Item>
                        <ContactItem>
                          <InfoCircleOutlined className="icon" />
                          <div className="content">
                            <div><Text strong>ساعات پاسخگویی</Text></div>
                            <div>شنبه تا چهارشنبه ۸ صبح تا ۸ شب - پنجشنبه ۸ صبح تا ۱۴</div>
                          </div>
                        </ContactItem>
                      </List.Item>
                    </List>
                    
                    <Divider />
                    
                    <Paragraph>
                      برای دریافت پاسخ سریع‌تر، پیشنهاد می‌کنیم در سیستم ثبت‌نام کنید. کاربران ثبت‌نام شده از امکان چت آنلاین با پشتیبانی نیز برخوردار هستند.
                    </Paragraph>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <Title level={4}>ارسال پیام</Title>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSubmit}
                    >
                      <Form.Item
                        name="name"
                        label="نام و نام خانوادگی"
                        rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
                      >
                        <Input placeholder="نام و نام خانوادگی خود را وارد کنید" />
                      </Form.Item>
                      
                      <Form.Item
                        name="phone"
                        label="شماره تماس"
                        rules={[{ required: true, message: 'لطفاً شماره تماس خود را وارد کنید' }]}
                      >
                        <Input placeholder="شماره تماس خود را وارد کنید" />
                      </Form.Item>
                      
                      <Form.Item
                        name="email"
                      label="ایمیل"
                      >
                        <Input placeholder="ایمیل خود را وارد کنید" />
                      </Form.Item>
                      
                      <Form.Item
                        name="message"
                      label="پیام"
                        rules={[{ required: true, message: 'لطفاً پیام خود را وارد کنید' }]}
                      >
                        <TextArea 
                          placeholder="پیام خود را بنویسید" 
                      rows={4}
                        />
                      </Form.Item>
                      
                      <Form.Item>
                    <Button
                          type="primary" 
                          htmlType="submit"
                          icon={<SendOutlined />}
                    >
                      ارسال پیام
                    </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </>
            )
          }
        ]}
      />
    </>
  );
};

export default HelpPage; 
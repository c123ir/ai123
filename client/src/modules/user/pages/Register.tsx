import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  Card, 
  Typography, 
  Divider, 
  Alert, 
  Space, 
  Steps,
  Result
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined,
  GoogleOutlined, 
  FacebookOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { default as api } from '../services/api';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { userService } = api;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>({});
  
  const navigate = useNavigate();

  const onFinishAccount = (values: any) => {
    setRegistrationData({
      ...registrationData,
      email: values.email,
      password: values.password,
    });
    setCurrentStep(1);
  };

  const onFinishPersonal = async (values: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = {
        ...registrationData,
        name: values.name,
        phone: values.phone,
        acceptTerms: values.acceptTerms,
      };
      
      setRegistrationData(userData);
      
      const response = await userService.register(userData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setRegistrationComplete(true);
      setCurrentStep(2);
      setLoading(false);
    } catch (err: any) {
      console.error('خطا در ثبت‌نام:', err);
      setError(err.response?.data?.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.');
      setLoading(false);
    }
  };

  const renderAccountForm = () => (
    <Form
      name="register-account-form"
      initialValues={{ remember: true }}
      onFinish={onFinishAccount}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
          { type: 'email', message: 'ایمیل نامعتبر است' }
        ]}
      >
        <Input 
          prefix={<MailOutlined />} 
          placeholder="ایمیل" 
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'لطفاً رمز عبور را وارد کنید' },
          { min: 8, message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="رمز عبور"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'لطفاً تأیید رمز عبور را وارد کنید' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('رمز عبور و تأیید آن مطابقت ندارند'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="تأیید رمز عبور"
        />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          block
        >
          ادامه
        </Button>
      </Form.Item>
      
      <div style={{ textAlign: 'center' }}>
        <Text>حساب کاربری دارید؟ <Link to="/login">وارد شوید</Link></Text>
      </div>
    </Form>
  );

  const renderPersonalForm = () => (
    <Form
      name="register-personal-form"
      onFinish={onFinishPersonal}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'لطفاً نام و نام خانوادگی خود را وارد کنید' }]}
      >
        <Input 
          prefix={<UserOutlined />} 
          placeholder="نام و نام خانوادگی" 
        />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[
          { required: true, message: 'لطفاً شماره تماس خود را وارد کنید' },
          { pattern: new RegExp(/^09[0-9]{9}$/), message: 'فرمت شماره تماس نامعتبر است' }
        ]}
      >
        <Input
          prefix={<PhoneOutlined />}
          placeholder="شماره تماس (مثال: 09123456789)"
        />
      </Form.Item>

      <Form.Item
        name="acceptTerms"
        valuePropName="checked"
        rules={[
          { 
            validator: (_, value) =>
              value 
                ? Promise.resolve() 
                : Promise.reject(new Error('برای ثبت‌نام، باید با قوانین و مقررات موافقت کنید'))
          }
        ]}
      >
        <Checkbox>
          من <a href="/terms-and-conditions" target="_blank">قوانین و مقررات</a> را خوانده و با آنها موافقم
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button 
            onClick={() => setCurrentStep(0)}
          >
            بازگشت
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
          >
            ثبت‌نام
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );

  const renderSuccess = () => (
    <Result
      status="success"
      icon={<CheckCircleOutlined />}
      title="ثبت‌نام شما با موفقیت انجام شد!"
      subTitle="اکنون می‌توانید از امکانات وب‌سایت استفاده کنید."
      extra={[
        <Button 
          type="primary" 
          key="home"
          onClick={() => navigate('/')}
        >
          صفحه اصلی
        </Button>,
        <Button 
          key="profile"
          onClick={() => navigate('/profile')}
        >
          تکمیل پروفایل
        </Button>,
      ]}
    />
  );

  const steps = [
    {
      title: 'اطلاعات حساب',
      content: renderAccountForm()
    },
    {
      title: 'اطلاعات شخصی',
      content: renderPersonalForm()
    },
    {
      title: 'تکمیل',
      content: renderSuccess()
    }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 200px)',
      padding: '20px'
    }}>
      <Card 
        style={{ width: 500, maxWidth: '100%' }}
        variant="borderless"
        className="register-card"
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>ثبت‌نام در سایت</Title>
          <Text type="secondary">اطلاعات خود را وارد کنید</Text>
        </div>
        
        <Steps current={currentStep} style={{ marginBottom: 30 }}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}
        
        {steps[currentStep].content}
        
        {currentStep === 0 && (
          <>
            <Divider plain>یا ثبت‌نام با</Divider>
            
            <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
              <Button 
                icon={<GoogleOutlined />} 
                size="large"
                onClick={() => console.log('ثبت‌نام با گوگل')}
              >
                گوگل
              </Button>
              <Button 
                icon={<FacebookOutlined />} 
                size="large"
                onClick={() => console.log('ثبت‌نام با فیسبوک')}
              >
                فیسبوک
              </Button>
            </Space>
          </>
        )}
      </Card>
    </div>
  );
};

export default Register; 
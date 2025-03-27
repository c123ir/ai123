import React from 'react';
import { Typography, Card, Steps, Button, Divider } from 'antd';

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const Checkout: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Card variant="outlined">
        <Title level={2}>تسویه حساب</Title>
        <Paragraph>این صفحه در دست ساخت است.</Paragraph>
        
        <Steps current={0} style={{ marginBottom: 40 }}>
          <Step title="سبد خرید" />
          <Step title="اطلاعات ارسال" />
          <Step title="پرداخت" />
          <Step title="تکمیل سفارش" />
        </Steps>
        
        <Divider />
        
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Paragraph>بزودی این بخش تکمیل خواهد شد.</Paragraph>
          <Button type="primary">بازگشت به سبد خرید</Button>
        </div>
      </Card>
    </div>
  );
};

export default Checkout; 
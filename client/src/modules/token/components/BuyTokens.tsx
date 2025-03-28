import React, { useState } from 'react';
import { Card, Form, InputNumber, Radio, Button, Alert, Result, Spin, Typography, Divider, Space } from 'antd';
import { ShoppingCartOutlined, CreditCardOutlined, BankOutlined, DollarOutlined } from '@ant-design/icons';
import useToken from '../hooks/useToken';

const { Title, Text } = Typography;

interface BuyTokensProps {
  userId: string;
  onSuccess?: () => void;
}

const BuyTokens: React.FC<BuyTokensProps> = ({ userId, onSuccess }) => {
  const [form] = Form.useForm();
  const { buyTokens, loading, error } = useToken();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      await buyTokens({
        userId,
        amount: values.amount,
        paymentMethod: values.paymentMethod,
        paymentDetails: {
          ...values.paymentDetails,
        },
      });
      
      setSuccess(true);
      form.resetFields();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('خطا در خرید توکن:', err);
    }
  };

  const paymentMethodChange = (e: any) => {
    form.setFieldsValue({ paymentDetails: {} });
  };

  const tokenPackages = [
    { value: 100, label: '۱۰۰ توکن', price: 50000 },
    { value: 500, label: '۵۰۰ توکن', price: 225000 },
    { value: 1000, label: '۱۰۰۰ توکن', price: 400000 },
  ];

  if (success) {
    return (
      <Result
        status="success"
        title="خرید توکن با موفقیت انجام شد!"
        subTitle="توکن‌های خریداری شده به حساب شما اضافه شدند."
        extra={[
          <Button type="primary" key="dashboard" onClick={() => setSuccess(false)}>
            خرید مجدد
          </Button>,
        ]}
      />
    );
  }

  return (
    <Card 
      title={<Title level={4}><ShoppingCartOutlined /> خرید توکن</Title>}
      className="buy-tokens-card"
      bordered={false}
    >
      {error && (
        <Alert
          message="خطا در خرید توکن"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          amount: 100,
          paymentMethod: 'credit_card',
        }}
      >
        <Form.Item
          label="بسته توکن"
          name="amount"
          rules={[{ required: true, message: 'لطفا تعداد توکن را انتخاب کنید' }]}
        >
          <Radio.Group buttonStyle="solid">
            <Space direction="vertical" style={{ width: '100%' }}>
              {tokenPackages.map((pkg) => (
                <Radio.Button key={pkg.value} value={pkg.value} style={{ width: '100%', height: 'auto', padding: '8px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text strong>{pkg.label}</Text>
                    <Text type="secondary">{pkg.price.toLocaleString()} تومان</Text>
                  </div>
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        <Divider />

        <Form.Item
          label="روش پرداخت"
          name="paymentMethod"
          rules={[{ required: true, message: 'لطفا روش پرداخت را انتخاب کنید' }]}
        >
          <Radio.Group onChange={paymentMethodChange}>
            <Space direction="vertical">
              <Radio value="credit_card"><CreditCardOutlined /> پرداخت با کارت اعتباری</Radio>
              <Radio value="bank_transfer"><BankOutlined /> انتقال بانکی</Radio>
              <Radio value="wallet"><DollarOutlined /> کیف پول دیجیتال</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.paymentMethod !== currentValues.paymentMethod}
        >
          {({ getFieldValue }) => {
            const paymentMethod = getFieldValue('paymentMethod');
            const amount = getFieldValue('amount');
            const selectedPackage = tokenPackages.find(pkg => pkg.value === amount);
            const price = selectedPackage ? selectedPackage.price : 0;
            
            let paymentDetails = null;
            
            if (paymentMethod === 'credit_card') {
              paymentDetails = (
                <>
                  <Form.Item
                    label="شماره کارت"
                    name={['paymentDetails', 'cardNumber']}
                    rules={[{ required: true, message: 'لطفا شماره کارت را وارد کنید' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      controls={false}
                      placeholder="شماره کارت 16 رقمی"
                      maxLength={16}
                    />
                  </Form.Item>
                </>
              );
            } else if (paymentMethod === 'bank_transfer') {
              paymentDetails = (
                <Alert
                  message="اطلاعات انتقال بانکی"
                  description={
                    <>
                      <p>مبلغ: {price.toLocaleString()} تومان</p>
                      <p>شماره حساب: IR123456789012345678901234</p>
                      <p>به نام: شرکت هوشمند یار 123</p>
                      <p>بانک: ملت</p>
                      <Text type="secondary">پس از انتقال وجه، کد پیگیری را وارد کنید.</Text>
                    </>
                  }
                  type="info"
                  showIcon
                />
              );
            } else if (paymentMethod === 'wallet') {
              paymentDetails = (
                <Alert
                  message="پرداخت با کیف پول دیجیتال"
                  description="برای پرداخت با کیف پول دیجیتال، پس از کلیک بر روی دکمه پرداخت، به صفحه درگاه کیف پول هدایت خواهید شد."
                  type="info"
                  showIcon
                />
              );
            }
            
            return paymentDetails;
          }}
        </Form.Item>

        <Form.Item style={{ marginTop: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<ShoppingCartOutlined />}
            loading={loading}
            style={{ width: '100%', height: 40 }}
          >
            پرداخت و خرید توکن
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BuyTokens; 
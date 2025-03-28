import React, { useEffect, useState } from 'react';
import { Card, Form, InputNumber, Input, Button, Alert, Result, Typography, Divider } from 'antd';
import { SendOutlined, WalletOutlined } from '@ant-design/icons';
import useToken from '../hooks/useToken';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface UseTokensProps {
  userId: string;
  onSuccess?: () => void;
}

const UseTokens: React.FC<UseTokensProps> = ({ userId, onSuccess }) => {
  const [form] = Form.useForm();
  const { useTokens, getBalance, balance, loading, error } = useToken();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getBalance({ userId });
  }, [getBalance, userId]);

  const handleSubmit = async (values: any) => {
    try {
      await useTokens({
        userId,
        amount: values.amount,
        purpose: values.purpose,
        metadata: {
          note: values.note,
        },
      });
      
      setSuccess(true);
      form.resetFields();
      getBalance({ userId });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('خطا در استفاده از توکن:', err);
    }
  };

  if (success) {
    return (
      <Result
        status="success"
        title="توکن‌ها با موفقیت استفاده شدند!"
        subTitle="عملیات استفاده از توکن‌ها با موفقیت انجام شد."
        extra={[
          <Button type="primary" key="useMore" onClick={() => setSuccess(false)}>
            استفاده مجدد
          </Button>,
        ]}
      />
    );
  }

  return (
    <Card 
      title={<Title level={4}><SendOutlined /> استفاده از توکن‌ها</Title>}
      className="use-tokens-card"
      bordered={false}
    >
      {error && (
        <Alert
          message="خطا در استفاده از توکن"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {balance && (
        <Alert
          message={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text strong>موجودی فعلی توکن</Text>
              <Text strong style={{ fontSize: '16px' }}>
                <WalletOutlined /> {balance.total} توکن
              </Text>
            </div>
          }
          type="info"
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          amount: 10,
          purpose: 'مشاوره',
        }}
      >
        <Form.Item
          label="تعداد توکن"
          name="amount"
          rules={[
            { required: true, message: 'لطفا تعداد توکن را وارد کنید' },
            { 
              validator: (_, value) => {
                if (value && balance && value > balance.total) {
                  return Promise.reject(new Error('موجودی توکن شما کافی نیست'));
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <InputNumber
            min={1}
            max={balance?.total || 1000}
            style={{ width: '100%' }}
            placeholder="تعداد توکن‌هایی که می‌خواهید استفاده کنید"
          />
        </Form.Item>

        <Form.Item
          label="هدف استفاده"
          name="purpose"
          rules={[{ required: true, message: 'لطفا هدف استفاده از توکن را انتخاب کنید' }]}
        >
          <Input placeholder="هدف از استفاده توکن را وارد کنید" />
        </Form.Item>

        <Form.Item
          label="یادداشت اضافی"
          name="note"
        >
          <TextArea rows={4} placeholder="توضیحات یا یادداشت اضافی (اختیاری)" />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            loading={loading}
            disabled={!balance || balance.total <= 0}
            style={{ width: '100%', height: 40 }}
          >
            استفاده از توکن‌ها
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UseTokens; 
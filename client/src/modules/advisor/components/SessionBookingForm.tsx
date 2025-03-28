import React, { useState } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button, Card, Alert, Typography, InputNumber, Divider, Space, message } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, QuestionCircleOutlined, DollarOutlined } from '@ant-design/icons';
import type { Advisor } from '../types/advisor';
import { useAdvisor } from '../hooks/useAdvisor';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface SessionBookingFormProps {
  advisor: Advisor;
  userId: string;
}

const SessionBookingForm: React.FC<SessionBookingFormProps> = ({ advisor, userId }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [sessionDuration, setSessionDuration] = useState<number>(30);
  const { bookSession, error } = useAdvisor();

  const calculateTokenCost = (duration: number) => {
    return duration * advisor.tokenPerMinute;
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    
    try {
      const bookingData = {
        advisorId: advisor.id,
        userId: userId,
        date: values.date.format('YYYY-MM-DD'),
        time: values.time.format('HH:mm'),
        duration: values.duration,
        questions: values.questions,
        topics: values.topics,
        tokenCost: calculateTokenCost(values.duration)
      };
      
      await bookSession(bookingData);
      message.success('جلسه مشاوره با موفقیت رزرو شد');
      form.resetFields();
    } catch (error) {
      message.error('خطا در رزرو جلسه');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDurationChange = (value: number | null) => {
    if (value) {
      setSessionDuration(value);
    }
  };

  const durationOptions = [15, 30, 45, 60, 90, 120];

  return (
    <Card title="رزرو جلسه مشاوره" bordered={false}>
      {!advisor.isAvailable && (
        <Alert
          message="مشاور در دسترس نیست"
          description="در حال حاضر امکان رزرو جلسه با این مشاور وجود ندارد. لطفاً در زمان دیگری مراجعه کنید."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      {error && (
        <Alert
          message="خطا در سیستم رزرو"
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
          duration: 30,
          topics: [],
        }}
        disabled={!advisor.isAvailable || submitting}
      >
        <Form.Item
          name="date"
          label="تاریخ جلسه"
          rules={[{ required: true, message: 'لطفاً تاریخ جلسه را انتخاب کنید' }]}
        >
          <DatePicker 
            placeholder="انتخاب تاریخ"
            style={{ width: '100%' }}
            format="YYYY/MM/DD"
            disabledDate={(current) => {
              // تاریخ‌های قبل از امروز و بیشتر از یک ماه آینده غیرفعال شوند
              return current && (current < new Date().setHours(0, 0, 0, 0) || 
                     current > new Date().setMonth(new Date().getMonth() + 1));
            }}
            prefix={<CalendarOutlined />}
          />
        </Form.Item>
        
        <Form.Item
          name="time"
          label="ساعت جلسه"
          rules={[{ required: true, message: 'لطفاً ساعت جلسه را انتخاب کنید' }]}
        >
          <TimePicker 
            placeholder="انتخاب ساعت"
            style={{ width: '100%' }}
            format="HH:mm"
            minuteStep={15}
            prefix={<ClockCircleOutlined />}
          />
        </Form.Item>
        
        <Form.Item
          name="duration"
          label="مدت زمان جلسه (دقیقه)"
          rules={[{ required: true, message: 'لطفاً مدت زمان جلسه را انتخاب کنید' }]}
        >
          <Select onChange={handleDurationChange}>
            {durationOptions.map(duration => (
              <Option key={duration} value={duration}>{duration} دقیقه</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="topics"
          label="موضوعات مورد بحث"
          rules={[{ required: true, message: 'لطفاً حداقل یک موضوع انتخاب کنید' }]}
        >
          <Select mode="tags" placeholder="موضوعات را وارد یا انتخاب کنید">
            {advisor.specializations.map(spec => (
              <Option key={spec} value={spec}>{spec}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="questions"
          label="سوالات و موارد مورد نظر"
        >
          <TextArea
            placeholder="سوالات خود را بنویسید تا مشاور قبل از جلسه آماده شود"
            autoSize={{ minRows: 3, maxRows: 6 }}
            maxLength={1000}
            showCount
          />
        </Form.Item>
        
        <Divider />
        
        <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
          <Title level={5}>اطلاعات پرداخت</Title>
          <Paragraph>
            <Space>
              <DollarOutlined />
              <Text>نرخ هر دقیقه:</Text>
              <Text strong>{advisor.tokenPerMinute} توکن</Text>
            </Space>
          </Paragraph>
          <Paragraph>
            <Space>
              <ClockCircleOutlined />
              <Text>مدت جلسه:</Text>
              <Text strong>{sessionDuration} دقیقه</Text>
            </Space>
          </Paragraph>
          <Paragraph>
            <Space>
              <Text type="secondary">هزینه کل:</Text>
              <Text strong style={{ fontSize: 16 }}>{calculateTokenCost(sessionDuration)} توکن</Text>
            </Space>
          </Paragraph>
        </Space>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            loading={submitting}
            disabled={!advisor.isAvailable}
          >
            رزرو جلسه
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SessionBookingForm; 
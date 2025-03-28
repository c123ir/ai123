import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Typography,
  Tag,
  Button,
  Timeline,
  Divider,
  Form,
  Input,
  Rate,
  Alert,
  Space,
  Modal,
  Descriptions,
  List,
  Avatar,
  Statistic,
  Row,
  Col,
  Collapse,
  Tabs,
  Comment,
  Spin,
  message as antMessage
} from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MessageOutlined,
  FileTextOutlined,
  EditOutlined,
  LikeOutlined,
  DislikeOutlined,
  DollarOutlined,
  LinkOutlined
} from '@ant-design/icons';
import moment from 'moment';
import useAdvisor from '../hooks/useAdvisor';
import { SessionStatus, AdvisorSession, AdvisorQuestion, AddQuestionParams, AddFeedbackParams } from '../types';
import { getSessionStatusText, getSessionStatusColor } from '../utils/textConverters';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Panel, TabPane } = Tabs;
const { confirm } = Modal;

interface SessionDetailProps {
  sessionId: string;
  userId: string;
}

const SessionDetail: React.FC<SessionDetailProps> = ({ sessionId, userId }) => {
  const [questionForm] = Form.useForm();
  const [feedbackForm] = Form.useForm();
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const {
    selectedSession,
    loading,
    error,
    getSessionById,
    addQuestion,
    addFeedback,
    cancelSession
  } = useAdvisor();

  useEffect(() => {
    if (sessionId) {
      getSessionById(sessionId);
    }
  }, [getSessionById, sessionId]);

  const handleAddQuestion = async (values: { question: string }) => {
    setSubmittingQuestion(true);
    try {
      await addQuestion({
        sessionId,
        userId,
        questionText: values.question
      });
      antMessage.success('سوال با موفقیت اضافه شد');
      questionForm.resetFields();
      getSessionById(sessionId);
    } catch (err) {
      antMessage.error('خطا در ثبت سوال');
    } finally {
      setSubmittingQuestion(false);
    }
  };

  const handleAddFeedback = async (values: any) => {
    const params: AddFeedbackParams = {
      sessionId,
      userId,
      rating: values.rating,
      comment: values.comment,
      strengths: values.strengths?.split(',').map((item: string) => item.trim()).filter(Boolean) || [],
      improvements: values.improvements?.split(',').map((item: string) => item.trim()).filter(Boolean) || []
    };

    setSubmittingFeedback(true);
    try {
      await addFeedback(params);
      feedbackForm.resetFields();
      setFeedbackModalVisible(false);
      getSessionById(sessionId);
    } catch (err) {
      antMessage.error('خطا در ثبت بازخورد');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleCancelSession = async () => {
    try {
      await cancelSession(sessionId);
      setCancelModalVisible(false);
    } catch (err) {
      console.error('خطا در لغو جلسه:', err);
    }
  };

  const showCancelConfirm = () => {
    confirm({
      title: 'آیا از لغو این جلسه مشاوره اطمینان دارید؟',
      icon: <ExclamationCircleOutlined />,
      content: 'در صورت لغو، توکن‌های پرداخت شده به حساب شما باز می‌گردند',
      okText: 'بله، لغو شود',
      okType: 'danger',
      cancelText: 'خیر',
      onOk: async () => {
        try {
          await cancelSession(sessionId);
          antMessage.success('جلسه با موفقیت لغو شد');
          getSessionById(sessionId);
        } catch (err) {
          antMessage.error('خطا در لغو جلسه');
        }
      }
    });
  };

  const getMeetingLink = () => {
    if (!selectedSession) return null;
    if (selectedSession.status !== 'CONFIRMED') return null;

    const sessionDate = moment(selectedSession.date);
    const now = moment();
    // ۱۵ دقیقه قبل از شروع جلسه تا پایان آن، لینک نمایش داده می‌شود
    const isMeetingTimeValid = now.isAfter(sessionDate.clone().subtract(15, 'minutes')) && 
                            now.isBefore(sessionDate.clone().add(selectedSession.duration, 'minutes'));

    if (!isMeetingTimeValid) {
      return (
        <Space>
          <LinkOutlined />
          <Text type="secondary">لینک جلسه ۱۵ دقیقه قبل از شروع فعال می‌شود</Text>
        </Space>
      );
    }

    return (
      <Button type="primary" icon={<LinkOutlined />} href={selectedSession.meetingLink} target="_blank">
        ورود به جلسه آنلاین
      </Button>
    );
  };

  if (loading && !selectedSession) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="خطا" description={error} type="error" showIcon />;
  }

  if (!selectedSession) {
    return <Alert message="جلسه مورد نظر یافت نشد" description="اطلاعات جلسه در دسترس نیست" type="warning" showIcon />;
  }

  const session: AdvisorSession = selectedSession;
  const canAddFeedback = session.status === SessionStatus.COMPLETED && !session.feedback;
  const canAddQuestion = [SessionStatus.SCHEDULED, SessionStatus.ACTIVE].includes(session.status);
  const canCancel = session.status === SessionStatus.SCHEDULED;

  return (
    <div className="session-detail">
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>جزئیات جلسه مشاوره</span>
            <Tag 
              color={getSessionStatusColor(session.status)}
              style={{ marginLeft: 8 }}
            >
              {getSessionStatusText(session.status)}
            </Tag>
          </div>
        }
        extra={
          <Space>
            {canAddQuestion && (
              <Button
                type="primary"
                icon={<QuestionCircleOutlined />}
                onClick={() => setQuestionModalVisible(true)}
              >
                افزودن سوال
              </Button>
            )}
            {canAddFeedback && (
              <Button
                icon={<EditOutlined />}
                onClick={() => setFeedbackModalVisible(true)}
              >
                ثبت بازخورد
              </Button>
            )}
            {canCancel && (
              <Button
                danger
                icon={<ExclamationCircleOutlined />}
                onClick={showCancelConfirm}
              >
                لغو جلسه
              </Button>
            )}
          </Space>
        }
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Descriptions
              title="اطلاعات جلسه"
              bordered
              column={1}
              size="small"
              layout="vertical"
            >
              <Descriptions.Item label="شناسه جلسه">
                {session.id}
              </Descriptions.Item>
              <Descriptions.Item label="تاریخ و زمان">
                <CalendarOutlined /> {moment(session.startTime).format('YYYY/MM/DD')}
                <Divider type="vertical" />
                <ClockCircleOutlined /> {moment(session.startTime).format('HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="مدت زمان">
                {session.duration} دقیقه
              </Descriptions.Item>
              <Descriptions.Item label="توکن‌های مصرفی">
                {session.tokensUsed} توکن
              </Descriptions.Item>
              <Descriptions.Item label="تاریخ ایجاد">
                {moment(session.createdAt).format('YYYY/MM/DD HH:mm')}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="مشاور" size="small">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} size={64} />
                <div style={{ marginRight: 16 }}>
                  <div>
                    <Text strong>شناسه مشاور: </Text>
                    <Link to={`/advisors/${session.advisorId}`}>
                      {session.advisorId}
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
            
            {session.notes && (
              <Card title="یادداشت‌ها" size="small" style={{ marginTop: 16 }}>
                <Paragraph>{session.notes}</Paragraph>
              </Card>
            )}
          </Col>
        </Row>
        
        <Divider />
        
        <Title level={4}>سوالات و پاسخ‌ها</Title>
        {session.questions.length > 0 ? (
          <Collapse defaultActiveKey={['1']}>
            {session.questions.map((question: AdvisorQuestion, index) => (
              <Panel 
                header={
                  <div>
                    <Text strong>سوال {index + 1}: </Text>
                    <Text>{question.question.slice(0, 60)}{question.question.length > 60 ? '...' : ''}</Text>
                  </div>
                } 
                key={String(index + 1)}
              >
                <div style={{ padding: '8px 0' }}>
                  <Text strong>سوال:</Text>
                  <Paragraph style={{ whiteSpace: 'pre-line' }}>
                    {question.question}
                  </Paragraph>
                  
                  {question.answer ? (
                    <>
                      <Text strong>پاسخ:</Text>
                      <Paragraph style={{ whiteSpace: 'pre-line' }}>
                        {question.answer}
                      </Paragraph>
                      <Text type="secondary">پاسخ داده شده در: {moment(question.answeredAt).format('YYYY/MM/DD HH:mm')}</Text>
                    </>
                  ) : (
                    <Alert message="هنوز پاسخی ارائه نشده است." type="warning" showIcon />
                  )}
                </div>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Alert message="هنوز سوالی برای این جلسه ثبت نشده است." type="info" showIcon />
        )}
        
        {session.feedback && (
          <>
            <Divider />
            <Title level={4}>بازخورد شما</Title>
            <Card size="small">
              <div style={{ marginBottom: 16 }}>
                <Text>امتیاز: </Text>
                <Rate disabled value={session.feedback.rating} />
              </div>
              
              {session.feedback.comment && (
                <div style={{ marginBottom: 16 }}>
                  <Text strong>نظر کلی:</Text>
                  <Paragraph>{session.feedback.comment}</Paragraph>
                </div>
              )}
              
              <Row gutter={16}>
                {session.feedback.strengths.length > 0 && (
                  <Col xs={24} sm={12}>
                    <div>
                      <Text strong><LikeOutlined /> نقاط قوت:</Text>
                      <ul>
                        {session.feedback.strengths.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                )}
                
                {session.feedback.improvements.length > 0 && (
                  <Col xs={24} sm={12}>
                    <div>
                      <Text strong><DislikeOutlined /> پیشنهادات بهبود:</Text>
                      <ul>
                        {session.feedback.improvements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                )}
              </Row>
              
              <Text type="secondary">ثبت شده در: {moment(session.feedback.createdAt).format('YYYY/MM/DD HH:mm')}</Text>
            </Card>
          </>
        )}
      </Card>

      {/* مودال افزودن سوال */}
      <Modal
        title="افزودن سوال جدید"
        open={questionModalVisible}
        onCancel={() => setQuestionModalVisible(false)}
        footer={null}
      >
        <Form
          form={questionForm}
          layout="vertical"
          onFinish={handleAddQuestion}
        >
          <Form.Item
            name="question"
            label="سوال شما"
            rules={[{ required: true, message: 'لطفا سوال خود را وارد کنید' }]}
          >
            <TextArea
              rows={6}
              placeholder="سوال خود را به صورت واضح و دقیق بنویسید..."
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submittingQuestion}>
              ارسال سوال
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* مودال ثبت بازخورد */}
      <Modal
        title="ثبت بازخورد"
        open={feedbackModalVisible}
        onCancel={() => setFeedbackModalVisible(false)}
        footer={null}
      >
        <Form
          form={feedbackForm}
          layout="vertical"
          onFinish={handleAddFeedback}
        >
          <Form.Item
            name="rating"
            label="امتیاز شما به این جلسه"
            rules={[{ required: true, message: 'لطفا امتیاز خود را وارد کنید' }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="نظر کلی"
          >
            <TextArea
              rows={4}
              placeholder="نظر کلی خود را درباره این جلسه مشاوره بنویسید..."
            />
          </Form.Item>
          <Form.Item
            name="strengths"
            label="نقاط قوت (با کاما جدا کنید)"
          >
            <TextArea
              rows={3}
              placeholder="نقاط قوت این جلسه مشاوره را وارد کنید. مثال: ارائه راهکارهای کاربردی، پاسخگویی سریع"
            />
          </Form.Item>
          <Form.Item
            name="improvements"
            label="پیشنهادات بهبود (با کاما جدا کنید)"
          >
            <TextArea
              rows={3}
              placeholder="پیشنهادات خود برای بهبود جلسات مشاوره را وارد کنید. مثال: زمان بیشتر برای پاسخگویی، نیاز به توضیحات بیشتر"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submittingFeedback}>
              ثبت بازخورد
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* مودال لغو جلسه */}
      <Modal
        title="لغو جلسه مشاوره"
        open={cancelModalVisible}
        onCancel={() => setCancelModalVisible(false)}
        onOk={handleCancelSession}
        okText="تأیید لغو"
        cancelText="انصراف"
        okButtonProps={{ danger: true, loading: loading }}
      >
        <p>آیا از لغو این جلسه مشاوره اطمینان دارید؟</p>
        <p>در صورت لغو، توکن‌های شما به حساب‌تان بازگردانده خواهد شد.</p>
      </Modal>
    </div>
  );
};

export default SessionDetail; 
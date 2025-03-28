import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Card, Tag, Button, Typography, Space, Empty, Spin, Alert, Pagination, Tabs, DatePicker } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  LinkOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';
import useAdvisor from '../hooks/useAdvisor';
import { SessionStatus, GetSessionsParams } from '../types';
import { Table, Avatar } from 'antd';
import { getSessionStatusText, getSessionStatusColor } from '../utils/textConverters';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface SessionListProps {
  userId: string;
}

const SessionList: React.FC<SessionListProps> = ({ userId }) => {
  const [params, setParams] = useState<GetSessionsParams>({
    userId,
    page: 1,
    limit: 10,
  });
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null] | null>(null);
  const [filteredSessions, setFilteredSessions] = useState<AdvisorSession[]>([]);

  const { sessions, sessionsTotal, loading, error, getSessions } = useAdvisor();

  useEffect(() => {
    if (userId) {
      getSessions(userId);
    }
  }, [getSessions, userId]);

  useEffect(() => {
    if (sessions) {
      filterSessionsByTab(activeTab);
    }
  }, [sessions, activeTab]);

  const filterSessionsByTab = (tabKey: string) => {
    const today = new Date();
    
    switch (tabKey) {
      case 'upcoming':
        // جلسات آینده (تایید شده و در انتظار)
        setFilteredSessions(
          sessions.filter(session => 
            (session.status === 'CONFIRMED' || session.status === 'PENDING') && 
            new Date(session.date) > today
          ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        );
        break;
      case 'past':
        // جلسات گذشته (تکمیل شده)
        setFilteredSessions(
          sessions.filter(session => 
            session.status === 'COMPLETED' || 
            (new Date(session.date) < today && session.status !== 'CANCELLED')
          ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
        break;
      case 'cancelled':
        // جلسات لغو شده
        setFilteredSessions(
          sessions.filter(session => session.status === 'CANCELLED')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
        break;
      default:
        // همه جلسات
        setFilteredSessions(
          [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    
    const newParams = { ...params, page: 1 };
    if (key !== 'all') {
      newParams.status = key as SessionStatus;
    } else {
      delete newParams.status;
    }
    
    setParams(newParams);
  };

  const handleDateRangeChange = (dates: [moment.Moment | null, moment.Moment | null] | null) => {
    setDateRange(dates);
    
    const newParams = { ...params, page: 1 };
    if (dates && dates[0] && dates[1]) {
      newParams.startDate = dates[0].toDate();
      newParams.endDate = dates[1].toDate();
    } else {
      delete newParams.startDate;
      delete newParams.endDate;
    }
    
    setParams(newParams);
    getSessions(newParams);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setParams({
      ...params,
      page,
      limit: pageSize || params.limit,
    });
  };

  const isMeetingTimeValid = (session: AdvisorSession) => {
    if (session.status !== 'CONFIRMED') return false;

    const sessionDate = moment(session.date);
    const now = moment();
    
    // ۱۵ دقیقه قبل از شروع جلسه تا پایان آن، لینک نمایش داده می‌شود
    return now.isAfter(sessionDate.clone().subtract(15, 'minutes')) && 
           now.isBefore(sessionDate.clone().add(session.duration, 'minutes'));
  };

  const columns = [
    {
      title: 'مشاور',
      dataIndex: 'advisor',
      key: 'advisor',
      render: (advisor: any) => (
        <Space>
          <Avatar src={advisor.avatarUrl} icon={<UserOutlined />} />
          <Text>{advisor.name}</Text>
        </Space>
      ),
    },
    {
      title: 'تاریخ و ساعت',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <Space direction="vertical" size={0}>
          <Text>
            <CalendarOutlined style={{ marginLeft: 5 }} />
            {moment(date).format('YYYY/MM/DD')}
          </Text>
          <Text>
            <ClockCircleOutlined style={{ marginLeft: 5 }} />
            {moment(date).format('HH:mm')}
          </Text>
        </Space>
      ),
    },
    {
      title: 'مدت',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} دقیقه`,
    },
    {
      title: 'هزینه',
      dataIndex: 'tokenCost',
      key: 'tokenCost',
      render: (tokenCost: number) => `${tokenCost} توکن`,
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: SessionStatus) => (
        <Tag color={getSessionStatusColor(status)}>{getSessionStatusText(status)}</Tag>
      ),
    },
    {
      title: 'عملیات',
      key: 'actions',
      render: (text: any, session: AdvisorSession) => (
        <Space>
          <Link to={`/advisors/sessions/${session.id}`}>
            <Button size="small" icon={<FileTextOutlined />}>
              جزئیات
            </Button>
          </Link>
          
          {isMeetingTimeValid(session) && (
            <Button
              type="primary"
              size="small"
              icon={<LinkOutlined />}
              href={session.meetingLink}
              target="_blank"
            >
              ورود به جلسه
            </Button>
          )}
        </Space>
      ),
    },
  ];

  if (error) {
    return <Text type="danger">{error}</Text>;
  }

  return (
    <div className="session-list">
      <Card
        title={<Title level={4}>جلسات مشاوره</Title>}
        extra={
          <RangePicker 
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder={['تاریخ شروع', 'تاریخ پایان']}
            allowClear
          />
        }
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="همه" key="all" />
          <TabPane tab={<><ScheduleOutlined /> برنامه‌ریزی شده</>} key={SessionStatus.SCHEDULED} />
          <TabPane tab={<><CheckCircleOutlined /> در حال انجام</>} key={SessionStatus.ACTIVE} />
          <TabPane tab={<><FileTextOutlined /> تکمیل شده</>} key={SessionStatus.COMPLETED} />
          <TabPane tab={<><CloseCircleOutlined /> لغو شده</>} key={SessionStatus.CANCELLED} />
        </Tabs>

        {loading && !sessions.length ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin size="large" />
          </div>
        ) : sessions.length > 0 ? (
          <>
            <Table 
              columns={columns} 
              dataSource={filteredSessions.map(session => ({ ...session, key: session.id }))} 
              pagination={filteredSessions.length > 10 ? { pageSize: 10 } : false}
              bordered
              responsive
            />
            
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Pagination
                total={sessionsTotal}
                current={params.page}
                pageSize={params.limit || 10}
                onChange={handlePageChange}
                showSizeChanger
                showTotal={(total) => `مجموع ${total} جلسه مشاوره`}
              />
            </div>
          </>
        ) : (
          <Empty 
            description="هیچ جلسه مشاوره‌ای یافت نشد"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
    </div>
  );
};

export default SessionList;
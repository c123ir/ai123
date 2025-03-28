import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Typography, Tag, Rate, Divider, Button, Space } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { Advisor, AdvisorType, ExpertiseLevel } from '../types';

const { Title, Text, Paragraph } = Typography;

interface AdvisorCardProps {
  advisor: Advisor;
  compact?: boolean;
}

const AdvisorCard: React.FC<AdvisorCardProps> = ({ advisor, compact = false }) => {
  // تبدیل نوع مشاوره به متن فارسی
  const getAdvisorTypeText = (type: AdvisorType) => {
    switch (type) {
      case AdvisorType.FINANCIAL:
        return 'مشاوره مالی';
      case AdvisorType.INVESTMENT:
        return 'مشاوره سرمایه‌گذاری';
      case AdvisorType.BUSINESS:
        return 'مشاوره کسب‌و‌کار';
      case AdvisorType.PERSONAL:
        return 'مشاوره شخصی';
      default:
        return type;
    }
  };

  // تبدیل سطح تخصص به متن فارسی
  const getExpertiseLevelText = (level: ExpertiseLevel) => {
    switch (level) {
      case ExpertiseLevel.BEGINNER:
        return 'مبتدی';
      case ExpertiseLevel.INTERMEDIATE:
        return 'متوسط';
      case ExpertiseLevel.EXPERT:
        return 'حرفه‌ای';
      default:
        return level;
    }
  };

  // تعیین رنگ برای تگ نوع مشاوره
  const getTypeColor = (type: AdvisorType) => {
    switch (type) {
      case AdvisorType.FINANCIAL:
        return 'blue';
      case AdvisorType.INVESTMENT:
        return 'green';
      case AdvisorType.BUSINESS:
        return 'purple';
      case AdvisorType.PERSONAL:
        return 'orange';
      default:
        return 'default';
    }
  };

  // تعیین رنگ برای تگ سطح تخصص
  const getExpertiseColor = (level: ExpertiseLevel) => {
    switch (level) {
      case ExpertiseLevel.BEGINNER:
        return 'default';
      case ExpertiseLevel.INTERMEDIATE:
        return 'blue';
      case ExpertiseLevel.EXPERT:
        return 'gold';
      default:
        return 'default';
    }
  };

  if (compact) {
    return (
      <Card className="advisor-card-compact" bodyStyle={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={advisor.avatarUrl} 
            size={64} 
            icon={<UserOutlined />}
            style={{ marginRight: 16 }}
          />
          <div>
            <Title level={5} style={{ marginBottom: 4 }}>{advisor.name}</Title>
            <div style={{ marginBottom: 8 }}>
              <Tag color={getTypeColor(advisor.type)}>{getAdvisorTypeText(advisor.type)}</Tag>
              <Tag color={getExpertiseColor(advisor.expertise)}>{getExpertiseLevelText(advisor.expertise)}</Tag>
            </div>
            <Rate disabled defaultValue={advisor.rating} style={{ fontSize: 12 }} />
            <Text type="secondary" style={{ marginLeft: 8 }}>({advisor.reviewCount})</Text>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="advisor-card"
      hoverable
      actions={[
        <Link to={`/advisors/${advisor.id}`}>
          <Button type="primary">مشاهده پروفایل</Button>
        </Link>,
        <Link to={`/advisors/${advisor.id}/book`}>
          <Button>رزرو مشاوره</Button>
        </Link>
      ]}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <Avatar 
          src={advisor.avatarUrl} 
          size={80} 
          icon={<UserOutlined />}
          style={{ marginRight: 16 }}
        />
        <div>
          <Title level={4} style={{ marginBottom: 4 }}>{advisor.name}</Title>
          <Space size={[0, 8]} wrap>
            <Tag color={getTypeColor(advisor.type)}>{getAdvisorTypeText(advisor.type)}</Tag>
            <Tag color={getExpertiseColor(advisor.expertise)}>{getExpertiseLevelText(advisor.expertise)}</Tag>
            {advisor.isAvailable ? (
              <Tag icon={<CheckCircleOutlined />} color="success">در دسترس</Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">خارج از دسترس</Tag>
            )}
          </Space>
        </div>
      </div>
      
      <Paragraph ellipsis={{ rows: 3 }}>{advisor.bio}</Paragraph>
      
      <Divider style={{ margin: '12px 0' }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text type="secondary"><DollarOutlined /> هر دقیقه: </Text>
          <Text strong>{advisor.tokenPerMinute} توکن</Text>
        </div>
        
        <div>
          <Text type="secondary"><GlobalOutlined /> زبان‌ها: </Text>
          <Text>{advisor.languages.join(', ')}</Text>
        </div>
        
        <div>
          <Rate disabled defaultValue={advisor.rating} style={{ fontSize: 14 }} />
          <Text type="secondary" style={{ marginLeft: 8 }}>({advisor.reviewCount})</Text>
        </div>
      </div>
      
      <Divider style={{ margin: '12px 0' }} />
      
      <div>
        <Text type="secondary">تخصص‌ها: </Text>
        <div style={{ marginTop: 8 }}>
          {advisor.specializations.map((spec, index) => (
            <Tag key={index} style={{ marginBottom: 4 }}>{spec}</Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AdvisorCard; 
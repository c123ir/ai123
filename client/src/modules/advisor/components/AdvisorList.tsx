import React, { useEffect, useState } from 'react';
import { List, Card, Avatar, Row, Col, Select, Button, Empty, Spin, Typography, Tag, Rate, Space, Divider } from 'antd';
import { UserOutlined, FilterOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAdvisor } from '../hooks/useAdvisor';
import type { Advisor, AdvisorType, AdvisorExpertiseLevel } from '../types';
import { getAdvisorTypeText, getExpertiseLevelText } from '../utils/textConverters';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface AdvisorListProps {
  showFilters?: boolean;
}

const AdvisorList: React.FC<AdvisorListProps> = ({ showFilters = true }) => {
  const { advisors, loading, error, getAdvisors } = useAdvisor();
  const [filteredAdvisors, setFilteredAdvisors] = useState<Advisor[]>([]);
  const [filters, setFilters] = useState({
    type: '',
    expertise: '',
    isAvailable: true
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    getAdvisors();
  }, [getAdvisors]);

  useEffect(() => {
    if (advisors.length > 0) {
      let result = [...advisors];

      // اعمال فیلترها
      if (filters.type) {
        result = result.filter(advisor => advisor.type === filters.type);
      }

      if (filters.expertise) {
        result = result.filter(advisor => advisor.expertise === filters.expertise);
      }

      if (filters.isAvailable) {
        result = result.filter(advisor => advisor.isAvailable);
      }

      // مرتب‌سازی براساس امتیاز
      result.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });

      setFilteredAdvisors(result);
    } else {
      setFilteredAdvisors([]);
    }
  }, [advisors, filters, sortOrder]);

  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const getTypeColor = (type: AdvisorType) => {
    switch (type) {
      case 'FINANCIAL':
        return 'blue';
      case 'INVESTMENT':
        return 'green';
      case 'BUSINESS':
        return 'purple';
      case 'PERSONAL':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getExpertiseColor = (level: AdvisorExpertiseLevel) => {
    switch (level) {
      case 'BEGINNER':
        return 'default';
      case 'INTERMEDIATE':
        return 'blue';
      case 'EXPERT':
        return 'gold';
      default:
        return 'default';
    }
  };

  if (error) {
    return <Text type="danger">{error}</Text>;
  }

  return (
    <div>
      {showFilters && (
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={6} md={5}>
              <Text strong>
                <FilterOutlined /> فیلترها:
              </Text>
            </Col>
            <Col xs={24} sm={6} md={5}>
              <Select
                placeholder="نوع مشاوره"
                style={{ width: '100%' }}
                onChange={(value) => handleFilterChange('type', value)}
                allowClear
              >
                <Option value="FINANCIAL">مشاوره مالی</Option>
                <Option value="INVESTMENT">مشاوره سرمایه‌گذاری</Option>
                <Option value="BUSINESS">مشاوره کسب‌و‌کار</Option>
                <Option value="PERSONAL">مشاوره شخصی</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6} md={5}>
              <Select
                placeholder="سطح تخصص"
                style={{ width: '100%' }}
                onChange={(value) => handleFilterChange('expertise', value)}
                allowClear
              >
                <Option value="BEGINNER">مبتدی</Option>
                <Option value="INTERMEDIATE">متوسط</Option>
                <Option value="EXPERT">حرفه‌ای</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6} md={5}>
              <Select
                placeholder="وضعیت"
                style={{ width: '100%' }}
                defaultValue={true}
                onChange={(value) => handleFilterChange('isAvailable', value)}
              >
                <Option value={true}>فقط مشاوران در دسترس</Option>
                <Option value={false}>همه مشاوران</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={4}>
              <Button 
                icon={sortOrder === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                onClick={toggleSortOrder}
              >
                مرتب‌سازی براساس امتیاز
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : filteredAdvisors.length === 0 ? (
        <Empty description="هیچ مشاوری یافت نشد." />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
          dataSource={filteredAdvisors}
          renderItem={(advisor) => (
            <List.Item>
              <Card 
                hoverable
                className={!advisor.isAvailable ? 'advisor-unavailable' : ''}
                style={{ opacity: advisor.isAvailable ? 1 : 0.7 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                    <Avatar 
                      size={64} 
                      src={advisor.avatarUrl} 
                      icon={<UserOutlined />} 
                      style={{ marginLeft: 16 }}
                    />
                    <div>
                      <Title level={4} style={{ margin: 0 }}>{advisor.name}</Title>
                      <div style={{ marginTop: 8 }}>
                        <Tag color={getTypeColor(advisor.type)}>{getAdvisorTypeText(advisor.type)}</Tag>
                        <Tag color={getExpertiseColor(advisor.expertise)}>{getExpertiseLevelText(advisor.expertise)}</Tag>
                      </div>
                    </div>
                  </div>
                  
                  <Paragraph ellipsis={{ rows: 3 }}>{advisor.bio}</Paragraph>
                  
                  <div style={{ marginBottom: 8 }}>
                    <Space>
                      <Rate disabled defaultValue={advisor.rating} />
                      <Text>({advisor.reviewCount})</Text>
                    </Space>
                  </div>
                  
                  <Divider style={{ margin: '12px 0' }} />
                  
                  <div style={{ marginBottom: 8 }}>
                    <Text strong>{advisor.tokenPerMinute} توکن</Text> <Text type="secondary">به ازای هر دقیقه</Text>
                  </div>
                  
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {advisor.isAvailable ? (
                      <Tag color="success">در دسترس</Tag>
                    ) : (
                      <Tag color="error">خارج از دسترس</Tag>
                    )}
                    
                    <Link to={`/advisors/${advisor.id}`}>
                      <Button type="primary">مشاهده پروفایل</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default AdvisorList; 
import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, FileOutlined } from '@ant-design/icons';

/**
 * کامپوننت داشبورد مدیریت
 */
const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>داشبورد مدیریت</h1>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="کاربران" 
              value={1280} 
              prefix={<UserOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="محصولات" 
              value={56} 
              prefix={<ShoppingCartOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="درآمد" 
              value={9520} 
              prefix={<DollarOutlined />} 
              suffix="تومان"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="گزارش‌ها" 
              value={18} 
              prefix={<FileOutlined />} 
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="آمار هفتگی">
            <p>نمودار و اطلاعات آماری در اینجا قرار می‌گیرد</p>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="آخرین کاربران">
            <p>لیست آخرین کاربران در اینجا قرار می‌گیرد</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="آخرین تراکنش‌ها">
            <p>لیست آخرین تراکنش‌ها در اینجا قرار می‌گیرد</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard; 
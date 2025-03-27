import React from 'react';
import { Card, Typography, Grid } from '../components/common';
import { useTheme } from '../components/common/ThemeContext';
import { showMessage } from '../components/common/NotificationSystem';
import { Button, Row, Col, Statistic } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

/**
 * صفحه داشبورد
 * این صفحه به عنوان صفحه اصلی پروژه استفاده می‌شود
 */
const Dashboard: React.FC = () => {
  const { direction, toggleTheme, mode } = useTheme();

  const handleMessage = () => {
    showMessage.success('پیام تستی نمایش داده شد!');
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        داشبورد مدیریت
      </Typography>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="کاربران"
              value={1458}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="سفارشات"
              value={968}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="گزارش‌ها"
              value={27}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="بازدیدها"
              value={8942}
              prefix={<DashboardOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card title="تنظیمات سیستم">
            <Typography variant="body1" gutterBottom>
              این یک کارت تستی است برای نمایش اطلاعات در سیستم.
              شما می‌توانید جهت نمایش و تم را تغییر دهید.
            </Typography>
            <div style={{ marginTop: '20px' }}>
              <Button onClick={handleThemeToggle} style={{ marginRight: '10px' }}>
                تغییر تم ({mode === 'light' ? 'روشن' : 'تاریک'})
              </Button>
              <Button onClick={handleMessage}>
                نمایش پیام تستی
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card title="راهنمای استفاده">
            <Typography variant="body1">
              برای استفاده از کامپوننت‌های RTL، می‌توانید از ThemeProvider استفاده کنید.
              همچنین برای نمایش اعداد فارسی، از کلاس farsi-digits استفاده کنید.
            </Typography>
            <div className="farsi-digits" style={{ marginTop: '15px', fontSize: '18px' }}>
              نمونه اعداد فارسی: 1234567890
            </div>
            <div style={{ marginTop: '15px' }}>
              <span className="text-right">متن راست‌چین</span>
              <span style={{ margin: '0 10px' }}>|</span>
              <span className="text-left">متن چپ‌چین</span>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard; 
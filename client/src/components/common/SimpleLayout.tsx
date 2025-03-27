import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Typography, Row, Col, Space } from 'antd';
import { MenuOutlined, HomeOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useLocation, Outlet } from 'react-router-dom';
import '../../assets/styles/layout.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const SimpleLayout: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'صفحه اصلی',
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: 'درباره ما',
    },
    {
      key: '/contact',
      icon: <PhoneOutlined />,
      label: 'تماس با ما',
    },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout className="layout">
      <Header className="layout-header">
        <div className="logo-container">
          <Link to="/">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="logo-placeholder">
                ش
              </div>
              <Title level={4} style={{ margin: 0 }}>شرکت نمونه</Title>
            </div>
          </Link>
        </div>

        {/* منوی دسکتاپ */}
        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: <Link to={item.key}>{item.label}</Link>
            }))}
            style={{ border: 'none', justifyContent: 'flex-end' }}
          />
        </div>

        {/* دکمه منوی موبایل */}
        <Button 
          type="text" 
          icon={<MenuOutlined />} 
          onClick={showDrawer}
          className="mobile-menu-button"
        />

        {/* کشوی منوی موبایل */}
        <Drawer
          title="منو"
          placement="right"
          closable={true}
          onClose={onClose}
          open={visible}
          width={250}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: <Link to={item.key} onClick={onClose}>{item.label}</Link>
            }))}
          />
        </Drawer>
      </Header>

      <Content className="site-content">
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>

      <Footer className="layout-footer">
        <Row gutter={[24, 24]} justify="space-between" className="footer-content">
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: 'white' }}>درباره ما</Title>
            <p>شرکت نمونه یکی از پیشگامان صنعت در ارائه خدمات با کیفیت و قیمت مناسب است. ما همواره در تلاش هستیم تا با ارائه خدمات متنوع، رضایت مشتریان خود را جلب کنیم.</p>
          </Col>
          
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: 'white' }}>لینک‌های مفید</Title>
            <Menu
              mode="vertical"
              theme="dark"
              selectedKeys={[location.pathname]}
              items={[
                ...menuItems.map(item => ({
                  key: item.key,
                  label: <Link to={item.key}>{item.label}</Link>
                })),
                {
                  key: '/terms',
                  label: <Link to="/terms">قوانین و مقررات</Link>
                },
                {
                  key: '/privacy',
                  label: <Link to="/privacy">حریم خصوصی</Link>
                }
              ]}
              style={{ border: 'none', background: 'transparent' }}
            />
          </Col>
          
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: 'white' }}>تماس با ما</Title>
            <p>آدرس: تهران، خیابان ولیعصر، پلاک ۱۲۳</p>
            <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
            <p>ایمیل: info@example.com</p>
            <Space size="middle">
              <Button shape="circle" icon={<i className="fab fa-instagram" />} />
              <Button shape="circle" icon={<i className="fab fa-telegram" />} />
              <Button shape="circle" icon={<i className="fab fa-twitter" />} />
            </Space>
          </Col>
        </Row>
        
        <div className="footer-divider">
          <p>تمامی حقوق این وب‌سایت محفوظ است. &copy; {new Date().getFullYear()}</p>
        </div>
      </Footer>
    </Layout>
  );
};

export default SimpleLayout; 
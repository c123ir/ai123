import React from 'react';
import { Typography, Card, Row, Col, Skeleton, Button, Tabs, Rate, Divider } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // این صفحه فعلاً به صورت موقت و استاتیک است
  return (
    <div style={{ padding: '20px' }}>
      <Card variant="outlined">
        <Row gutter={[32, 16]}>
          <Col xs={24} md={12}>
            <Skeleton.Image style={{ width: '100%', height: 400 }} active />
          </Col>
          
          <Col xs={24} md={12}>
            <Title level={2}>عنوان محصول</Title>
            <Rate disabled defaultValue={4} />
            <Text type="secondary" style={{ marginLeft: 8 }}>(۱۲۵ نظر)</Text>
            
            <Divider />
            
            <Title level={3} style={{ color: '#ff4d4f', marginBottom: 24 }}>
              ۱,۵۰۰,۰۰۰ تومان
            </Title>
            
            <Paragraph>
              این محصول در دست ساخت است و توضیحات آن به زودی تکمیل خواهد شد.
            </Paragraph>
            
            <div style={{ marginTop: 20 }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<ShoppingCartOutlined />}
                style={{ marginRight: 8 }}
              >
                افزودن به سبد خرید
              </Button>
              
              <Button 
                size="large" 
                icon={<HeartOutlined />}
              >
                افزودن به علاقه‌مندی‌ها
              </Button>
            </div>
          </Col>
        </Row>
        
        <Divider />
        
        <Tabs defaultActiveKey="1">
          <TabPane tab="توضیحات" key="1">
            <Paragraph>
              این بخش شامل توضیحات محصول می‌باشد که در حال حاضر در دست ساخت است.
              در این قسمت معمولاً اطلاعات کاملی در مورد ویژگی‌های محصول، مشخصات فنی
              و سایر جزئیات مرتبط با آن ارائه می‌شود.
            </Paragraph>
          </TabPane>
          
          <TabPane tab="مشخصات" key="2">
            <Skeleton active />
          </TabPane>
          
          <TabPane tab="نظرات کاربران" key="3">
            <Skeleton active />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProductDetails; 
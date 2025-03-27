import React, { useState, useEffect } from 'react';
import { Typography, Card, Empty, Button, Table, InputNumber, Divider, Row, Col, Space, message } from 'antd';
import { ShoppingOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

// داده‌های نمونه برای سبد خرید
const sampleCartItems = [
  {
    id: '1',
    title: 'موبایل سامسونگ گلکسی A52',
    price: 12500000,
    quantity: 1,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'هدفون بی‌سیم سونی',
    price: 4500000,
    quantity: 2,
    image: 'https://via.placeholder.com/150',
  }
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // شبیه‌سازی بارگذاری
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    message.success('تعداد محصول با موفقیت بروزرسانی شد');
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    message.success('محصول با موفقیت از سبد خرید حذف شد');
  };
  
  const columns = [
    {
      title: 'محصول',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={record.image} 
            alt={text} 
            style={{ width: 60, height: 60, marginLeft: 10 }} 
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'قیمت واحد',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} تومان`,
    },
    {
      title: 'تعداد',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          max={10}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value as number)}
        />
      ),
    },
    {
      title: 'مجموع',
      key: 'total',
      render: (record: any) => `${(record.price * record.quantity).toLocaleString()} تومان`,
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (record: any) => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleRemoveItem(record.id)}
        />
      ),
    },
  ];
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card variant="outlined">
        <Title level={2}>سبد خرید</Title>
        <Paragraph>این صفحه در دست ساخت است.</Paragraph>
        
        {cartItems.length > 0 ? (
          <>
            <Table 
              dataSource={cartItems} 
              columns={columns} 
              pagination={false}
              rowKey="id"
              locale={{ emptyText: 'محصولی در سبد خرید وجود ندارد' }}
            />
            
            <Divider />
            
            <Row justify="end">
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'left', padding: '10px 20px', background: '#f9f9f9', borderRadius: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text>مجموع:</Text>
                    <Text strong>{calculateTotal().toLocaleString()} تومان</Text>
                  </div>
                  
                  <Space direction="vertical" style={{ width: '100%', marginTop: 15 }}>
                    <Button type="primary" block>
                      <Link to="/checkout">ادامه فرآیند خرید</Link>
                    </Button>
                    <Button block>
                      <Link to="/products">ادامه خرید</Link>
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="سبد خرید شما خالی است"
            />
            <Button 
              type="primary" 
              icon={<ShoppingOutlined />}
              style={{ marginTop: '20px' }}
            >
              <Link to="/products">مشاهده محصولات</Link>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Cart; 
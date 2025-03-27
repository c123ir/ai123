import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col, Card, Button, Typography, Divider, List, Tag, Spin } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

// داده‌های نمونه برای محصولات پرفروش
const bestSellingProducts = [
  {
    id: 1,
    title: 'لپ تاپ گیمینگ آسوس',
    price: 45000000,
    discountPrice: 42500000,
    image: 'https://via.placeholder.com/300x200',
    rating: 4.5,
    sold: 156
  },
  {
    id: 2,
    title: 'گوشی سامسونگ گلکسی S23',
    price: 35000000,
    discountPrice: 32800000,
    image: 'https://via.placeholder.com/300x200',
    rating: 4.7,
    sold: 243
  },
  {
    id: 3,
    title: 'هدفون بی‌سیم اپل',
    price: 12000000,
    discountPrice: 11200000,
    image: 'https://via.placeholder.com/300x200',
    rating: 4.3,
    sold: 189
  },
  {
    id: 4,
    title: 'ساعت هوشمند شیائومی',
    price: 4500000,
    discountPrice: 4200000,
    image: 'https://via.placeholder.com/300x200',
    rating: 4.2,
    sold: 312
  },
];

// داده‌های نمونه برای دسته‌بندی‌ها
const categories = [
  { id: 1, title: 'لپ تاپ', icon: '💻' },
  { id: 2, title: 'گوشی هوشمند', icon: '📱' },
  { id: 3, title: 'لوازم جانبی', icon: '🎧' },
  { id: 4, title: 'تبلت', icon: '📟' },
  { id: 5, title: 'ساعت هوشمند', icon: '⌚' },
  { id: 6, title: 'دوربین', icon: '📷' },
];

// داده‌های نمونه برای اسلایدر
const sliderItems = [
  {
    id: 1,
    title: 'فروش ویژه بهاری',
    description: 'تا ۳۰٪ تخفیف برای تمامی محصولات',
    image: 'https://via.placeholder.com/1200x400',
    link: '/products'
  },
  {
    id: 2,
    title: 'محصولات جدید',
    description: 'آخرین فناوری‌های روز دنیا',
    image: 'https://via.placeholder.com/1200x400',
    link: '/products'
  },
  {
    id: 3,
    title: 'ارسال رایگان',
    description: 'برای خریدهای بالای ۵ میلیون تومان',
    image: 'https://via.placeholder.com/1200x400',
    link: '/products'
  }
];

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="home-container" style={{ padding: '0 20px 40px' }}>
      {/* اسلایدر */}
      <Carousel autoplay style={{ marginBottom: '40px' }}>
        {sliderItems.map(item => (
          <div key={item.id}>
            <div 
              style={{ 
                position: 'relative', 
                height: '400px', 
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                padding: '0 100px'
              }}
            >
              <div 
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.6)', 
                  padding: '30px', 
                  borderRadius: '10px',
                  maxWidth: '500px'
                }}
              >
                <Title level={2} style={{ color: 'white', marginTop: 0 }}>{item.title}</Title>
                <Paragraph style={{ color: 'white', fontSize: '16px' }}>{item.description}</Paragraph>
                <Button type="primary" size="large">
                  <Link to={item.link}>مشاهده محصولات</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* دسته‌بندی‌ها */}
      <div className="categories-section" style={{ marginBottom: '40px' }}>
        <Title level={3}>دسته‌بندی‌های محصولات</Title>
        <Row gutter={[16, 16]}>
          {categories.map(category => (
            <Col key={category.id} xs={12} sm={8} md={6} lg={4}>
              <Link to={`/products?category=${category.id}`}>
                <Card 
                  hoverable
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{category.icon}</div>
                  <Meta title={category.title} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      {/* محصولات پرفروش */}
      <div className="best-selling-section">
        <Title level={3}>پرفروش‌ترین محصولات</Title>
        <Divider />
        <Row gutter={[16, 24]}>
          {bestSellingProducts.map(product => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={product.title} src={product.image} />}
                actions={[
                  <Button type="link" icon={<ShoppingCartOutlined />}>افزودن به سبد</Button>,
                  <Button type="link" icon={<HeartOutlined />} />
                ]}
              >
                <Meta 
                  title={<Link to={`/products/${product.id}`}>{product.title}</Link>}
                  description={
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <StarFilled style={{ color: '#fadb14', marginLeft: '5px' }} />
                        <span>{product.rating} ({product.sold} فروش)</span>
                      </div>
                      <div>
                        {product.discountPrice < product.price ? (
                          <>
                            <span style={{ color: 'red', fontWeight: 'bold', marginLeft: '10px' }}>
                              {product.discountPrice.toLocaleString('fa-IR')} تومان
                            </span>
                            <span style={{ textDecoration: 'line-through', color: '#999' }}>
                              {product.price.toLocaleString('fa-IR')}
                            </span>
                          </>
                        ) : (
                          <span style={{ fontWeight: 'bold' }}>
                            {product.price.toLocaleString('fa-IR')} تومان
                          </span>
                        )}
                      </div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button type="primary" size="large">
            <Link to="/products">مشاهده همه محصولات</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home; 
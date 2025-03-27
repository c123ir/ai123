import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Skeleton, Empty, message } from 'antd';
import { productService } from '../../services/api';

const { Title, Paragraph } = Typography;

// نوع داده محصول
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

// داده‌های نمونه برای نمایش
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'گوشی موبایل سامسونگ گلکسی A52',
    price: 12500000,
    image: 'https://via.placeholder.com/300x400',
    category: 'دیجیتال'
  },
  {
    id: '2',
    title: 'لپ‌تاپ لنوو IdeaPad',
    price: 32000000,
    image: 'https://via.placeholder.com/300x400',
    category: 'دیجیتال'
  },
  {
    id: '3',
    title: 'هدفون بی‌سیم سونی',
    price: 4500000,
    image: 'https://via.placeholder.com/300x400',
    category: 'دیجیتال'
  },
  {
    id: '4',
    title: 'پیراهن مردانه',
    price: 850000,
    image: 'https://via.placeholder.com/300x400',
    category: 'پوشاک'
  }
];

const Products: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // دریافت محصولات
    const fetchProducts = () => {
      try {
        setLoading(true);
        
        // استفاده از داده‌های نمونه به جای درخواست به سرور
        setTimeout(() => {
          setProducts(sampleProducts);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('خطا در دریافت محصولات:', error);
        setLoading(false);
      }
    };
    
    // دریافت دسته‌بندی‌ها
    const fetchCategories = () => {
      // دسته‌بندی‌های نمونه
      setCategories(['دیجیتال', 'پوشاک', 'خانه و آشپزخانه', 'آرایشی و بهداشتی']);
    };
    
    fetchProducts();
    fetchCategories();
  }, []);

  // نمایش محصولات با اسکلتون لودینگ
  return (
    <div style={{ padding: '20px' }}>
      <Card variant="outlined">
        <Title level={2}>صفحه محصولات</Title>
        <Paragraph>این صفحه در دست ساخت است.</Paragraph>
        
        <Row gutter={[16, 16]}>
          {loading ? (
            // نمایش اسکلتون در حالت لودینگ
            Array.from({ length: 8 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card style={{ height: 300 }} variant="outlined">
                  <Skeleton active />
                </Card>
              </Col>
            ))
          ) : products.length > 0 ? (
            // نمایش محصولات
            products.map(product => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card 
                  hoverable
                  cover={<img alt={product.title} src={product.image} />}
                  style={{ height: 300 }}
                  variant="outlined"
                >
                  <Card.Meta 
                    title={product.title} 
                    description={`${product.price.toLocaleString()} تومان`} 
                  />
                </Card>
              </Col>
            ))
          ) : (
            // نمایش در صورت نبودن محصول
            <Col span={24} style={{ textAlign: 'center' }}>
              <Empty description="محصولی یافت نشد" />
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default Products; 
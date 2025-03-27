import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Typography, 
  Image, 
  InputNumber, 
  Tabs, 
  Divider, 
  Space, 
  Rate, 
  Tag, 
  List, 
  Avatar,
  Spin 
} from 'antd';
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  ShareAltOutlined, 
  CheckOutlined,
  StarFilled,
  UserOutlined
} from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { productService, cartService, reviewService } from '../services/api';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  specifications: any[];
  features: string[];
}

interface Review {
  id: number;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

// ایجاد کامپوننت Comment به صورت دستی
interface CommentProps {
  author: React.ReactNode;
  avatar: React.ReactNode;
  content: React.ReactNode;
  datetime?: React.ReactNode;
}

const Comment: React.FC<CommentProps> = ({ author, avatar, content, datetime }) => (
  <div className="comment" style={{ display: 'flex', marginBottom: 16 }}>
    <div className="comment-avatar" style={{ marginRight: 12 }}>
      {avatar}
    </div>
    <div className="comment-content">
      <div className="comment-author" style={{ fontWeight: 'bold', marginBottom: 4 }}>{author}</div>
      <div className="comment-body">{content}</div>
      {datetime && <div className="comment-datetime" style={{ color: '#999', fontSize: 12, marginTop: 4 }}>{datetime}</div>}
    </div>
  </div>
);

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
      fetchReviews(id);
      fetchRelatedProducts(id);
    }
  }, [id]);

  const fetchProductDetails = async (productId: string) => {
    try {
      setLoading(true);
      const response = await productService.getProductById(productId);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('خطا در دریافت جزئیات محصول:', error);
      setLoading(false);
    }
  };

  const fetchReviews = async (productId: string) => {
    try {
      const response = await reviewService.getProductReviews(productId);
      setReviews(response.data);
    } catch (error) {
      console.error('خطا در دریافت نظرات محصول:', error);
    }
  };

  const fetchRelatedProducts = async (productId: string) => {
    try {
      const response = await productService.getRelatedProducts(productId);
      setRelatedProducts(response.data);
    } catch (error) {
      console.error('خطا در دریافت محصولات مرتبط:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!id) return;
    
    try {
      setAddingToCart(true);
      await cartService.addToCart({
        productId: id,
        quantity: quantity
      });
      setAddingToCart(false);
      // نمایش پیام موفقیت
    } catch (error) {
      console.error('خطا در افزودن به سبد خرید:', error);
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Title level={3}>محصول یافت نشد</Title>
        <Link to="/products">
          <Button type="primary">بازگشت به صفحه محصولات</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-page" style={{ padding: '20px' }}>
      <Card variant="borderless">
        <Row gutter={[24, 24]}>
          {/* بخش تصاویر محصول */}
          <Col xs={24} md={12}>
            <div style={{ marginBottom: '20px' }}>
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                width="100%"
                height={400}
                style={{ objectFit: 'contain' }}
                fallback="https://via.placeholder.com/400x400?text=تصویر+ندارد"
              />
            </div>
            <Row gutter={[8, 8]}>
              {product.images.map((image, index) => (
                <Col span={6} key={index}>
                  <div 
                    style={{ 
                      cursor: 'pointer', 
                      border: index === selectedImage ? '2px solid #1890ff' : '1px solid #f0f0f0',
                      padding: '2px'
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`تصویر ${index + 1}`}
                      width="100%"
                      height={80}
                      style={{ objectFit: 'cover' }}
                      fallback="https://via.placeholder.com/80x80?text=تصویر+ندارد"
                      preview={false}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
          
          {/* بخش اطلاعات محصول */}
          <Col xs={24} md={12}>
            <Title level={2}>{product.title}</Title>
            
            <Space align="center" style={{ marginBottom: '16px' }}>
              <Rate disabled defaultValue={product.rating} />
              <Text>({product.reviewCount} نظر)</Text>
              <Divider type="vertical" />
              <Tag color="blue">{product.category}</Tag>
              <Divider type="vertical" />
              <Text>برند: {product.brand}</Text>
            </Space>
            
            <Divider />
            
            <div style={{ marginBottom: '16px' }}>
              {product.discountPrice && product.discountPrice < product.price ? (
                <div>
                  <Title level={4} style={{ color: 'red', margin: 0 }}>
                    {product.discountPrice.toLocaleString('fa-IR')} تومان
                  </Title>
                  <Text delete style={{ fontSize: '16px' }}>
                    {product.price.toLocaleString('fa-IR')} تومان
                  </Text>
                  <Tag color="red" style={{ marginRight: '8px' }}>
                    {Math.round((1 - product.discountPrice / product.price) * 100)}% تخفیف
                  </Tag>
                </div>
              ) : (
                <Title level={4} style={{ margin: 0 }}>
                  {product.price.toLocaleString('fa-IR')} تومان
                </Title>
              )}
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <Space align="center">
                <Text>موجودی:</Text>
                {product.stock > 0 ? (
                  <Tag color="green" icon={<CheckOutlined />}>موجود در انبار ({product.stock} عدد)</Tag>
                ) : (
                  <Tag color="red">ناموجود</Tag>
                )}
              </Space>
            </div>
            
            <Divider />
            
            <Paragraph>{product.description}</Paragraph>
            
            <div style={{ marginTop: '24px' }}>
              <Space size="large">
                <div>
                  <Text style={{ marginLeft: '8px' }}>تعداد:</Text>
                  <InputNumber 
                    min={1} 
                    max={product.stock} 
                    value={quantity} 
                    onChange={(value) => setQuantity(value || 1)} 
                    disabled={product.stock <= 0}
                  />
                </div>
                
                <Button 
                  type="primary" 
                  icon={<ShoppingCartOutlined />} 
                  size="large" 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  loading={addingToCart}
                >
                  افزودن به سبد خرید
                </Button>
                
                <Button 
                  icon={<HeartOutlined />} 
                  size="large"
                >
                  افزودن به علاقه‌مندی‌ها
                </Button>
                
                <Button 
                  icon={<ShareAltOutlined />} 
                  size="large"
                >
                  اشتراک‌گذاری
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
        
        {/* بخش تب‌ها */}
        <div style={{ marginTop: '32px' }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="ویژگی‌ها" key="1">
              <div style={{ padding: '16px 0' }}>
                <Title level={4}>ویژگی‌های محصول</Title>
                <Row gutter={[24, 8]}>
                  {product.specifications.map((spec, index) => (
                    <Col xs={24} md={12} key={index}>
                      <div style={{ display: 'flex' }}>
                        <Text strong style={{ minWidth: '150px' }}>{spec.title}:</Text>
                        <Text>{spec.value}</Text>
                      </div>
                    </Col>
                  ))}
                </Row>
                
                <Divider />
                
                <Title level={4}>مزایا</Title>
                <ul style={{ paddingRight: '20px' }}>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </TabPane>
            
            <TabPane tab={`نظرات (${reviews.length})`} key="2">
              <div style={{ padding: '16px 0' }}>
                <Title level={4}>نظرات کاربران</Title>
                
                {reviews.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={item => (
                      <Comment
                        author={<Text strong>{item.userName}</Text>}
                        avatar={<Avatar src={item.avatar} icon={!item.avatar ? <UserOutlined /> : undefined} />}
                        content={
                          <>
                            <Rate disabled defaultValue={item.rating} />
                            <Paragraph>{item.comment}</Paragraph>
                          </>
                        }
                        datetime={item.date}
                      />
                    )}
                  />
                ) : (
                  <Paragraph>هنوز نظری برای این محصول ثبت نشده است.</Paragraph>
                )}
              </div>
            </TabPane>
          </Tabs>
        </div>
        
        {/* محصولات مرتبط */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <Title level={3}>محصولات مرتبط</Title>
            <Row gutter={[16, 16]}>
              {relatedProducts.slice(0, 4).map((relatedProduct: any) => (
                <Col xs={24} sm={12} md={6} key={relatedProduct.id}>
                  <Card
                    hoverable
                    cover={
                      <img 
                        alt={relatedProduct.title} 
                        src={relatedProduct.image} 
                        style={{ height: 200, objectFit: 'cover' }}
                      />
                    }
                  >
                    <Card.Meta 
                      title={<Link to={`/products/${relatedProduct.id}`}>{relatedProduct.title}</Link>}
                      description={
                        <div style={{ marginTop: 8 }}>
                          <div>
                            <Rate disabled defaultValue={relatedProduct.rating} style={{ fontSize: 12 }} />
                            <Text style={{ marginRight: 8 }}>{relatedProduct.rating}</Text>
                          </div>
                          <div style={{ marginTop: 8 }}>
                            <Text strong>{relatedProduct.price.toLocaleString('fa-IR')} تومان</Text>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetails; 
import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Button, 
  Table, 
  InputNumber, 
  Divider, 
  Space, 
  Row, 
  Col, 
  Card,
  Empty,
  Popconfirm,
  message,
  Spin,
  Image,
  Alert
} from 'antd';
import { 
  DeleteOutlined, 
  ShoppingOutlined, 
  ArrowLeftOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { cartService } from '../services/api';

const { Title, Text } = Typography;

interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  stock: number;
}

const Cart: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [updating, setUpdating] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCartItems();
  }, []);
  
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      setCartItems(response.data.items || []);
      calculateTotals(response.data.items || []);
      setShippingCost(response.data.shippingCost || 35000);
      setLoading(false);
    } catch (error) {
      console.error('خطا در دریافت اطلاعات سبد خرید:', error);
      setLoading(false);
    }
  };
  
  const calculateTotals = (items: CartItem[]) => {
    let total = 0;
    let totalDiscount = 0;
    
    items.forEach(item => {
      const itemPrice = item.price * item.quantity;
      total += itemPrice;
      
      if (item.discountPrice) {
        totalDiscount += (item.price - item.discountPrice) * item.quantity;
      }
    });
    
    setTotalAmount(total);
    setDiscount(totalDiscount);
  };
  
  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      setUpdating(true);
      await cartService.updateCartItem(id, { quantity });
      
      const updatedItems = cartItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
      
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
      setUpdating(false);
    } catch (error) {
      console.error('خطا در بروزرسانی تعداد محصول:', error);
      setUpdating(false);
    }
  };
  
  const handleRemoveItem = async (id: string) => {
    try {
      await cartService.removeCartItem(id);
      
      const updatedItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
      
      message.success('محصول با موفقیت از سبد خرید حذف شد');
    } catch (error) {
      console.error('خطا در حذف محصول از سبد خرید:', error);
    }
  };
  
  const handleEmptyCart = async () => {
    try {
      await cartService.emptyCart();
      setCartItems([]);
      setTotalAmount(0);
      setDiscount(0);
      
      message.success('سبد خرید با موفقیت خالی شد');
    } catch (error) {
      console.error('خطا در خالی کردن سبد خرید:', error);
    }
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const columns = [
    {
      title: 'محصول',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, record: CartItem) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src={record.image} 
            alt={record.title}
            width={80}
            height={80}
            style={{ objectFit: 'cover', marginRight: 10 }}
          />
          <div>
            <Link to={`/products/${record.productId}`}>{record.title}</Link>
            <div>
              {record.discountPrice ? (
                <>
                  <Text delete type="secondary" style={{ marginRight: 8 }}>{record.price.toLocaleString('fa-IR')} تومان</Text>
                  <Text strong>{record.discountPrice.toLocaleString('fa-IR')} تومان</Text>
                </>
              ) : (
                <Text strong>{record.price.toLocaleString('fa-IR')} تومان</Text>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'تعداد',
      key: 'quantity',
      width: 120,
      render: (_: any, record: CartItem) => (
        <InputNumber
          min={1}
          max={record.stock}
          value={record.quantity}
          onChange={(value) => handleUpdateQuantity(record.id, value as number)}
          disabled={updating}
          style={{ width: 60 }}
        />
      ),
    },
    {
      title: 'قیمت کل',
      key: 'totalPrice',
      width: 150,
      render: (_: any, record: CartItem) => {
        const price = record.discountPrice || record.price;
        return <Text strong>{(price * record.quantity).toLocaleString('fa-IR')} تومان</Text>;
      },
    },
    {
      title: 'عملیات',
      key: 'action',
      width: 100,
      render: (_: any, record: CartItem) => (
        <Popconfirm
          title="حذف محصول"
          description="آیا از حذف این محصول از سبد خرید اطمینان دارید؟"
          onConfirm={() => handleRemoveItem(record.id)}
          okText="بله"
          cancelText="خیر"
        >
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
          />
        </Popconfirm>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page" style={{ padding: '20px' }}>
        <Title level={2}>سبد خرید</Title>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              سبد خرید شما خالی است
            </span>
          }
        >
          <Button type="primary" icon={<ShoppingOutlined />}>
            <Link to="/products">مشاهده محصولات</Link>
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ padding: '20px' }}>
      <Title level={2}>سبد خرید</Title>
      
      {error && <Alert message={error} type="error" style={{ marginBottom: 16 }} />}
      
      <Row gutter={24}>
        <Col xs={24} sm={24} md={16} lg={16}>
          <Table
            columns={columns}
            dataSource={cartItems}
            rowKey="id"
            pagination={false}
            loading={updating}
            style={{ marginBottom: 16 }}
          />
          
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => navigate('/products')} icon={<ArrowLeftOutlined />}>
              ادامه خرید
            </Button>
            
            <Popconfirm
              title="خالی کردن سبد"
              description="آیا از خالی کردن سبد خرید اطمینان دارید؟"
              onConfirm={handleEmptyCart}
              okText="بله"
              cancelText="خیر"
            >
              <Button danger>خالی کردن سبد</Button>
            </Popconfirm>
          </div>
        </Col>
        
        <Col xs={24} sm={24} md={8} lg={8}>
          <Card title="خلاصه سبد خرید" variant="borderless">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>جمع کل:</Text>
                <Text>{totalAmount.toLocaleString('fa-IR')} تومان</Text>
              </div>
              
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text type="success">تخفیف:</Text>
                  <Text type="success">{discount.toLocaleString('fa-IR')} تومان</Text>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>هزینه ارسال:</Text>
                <Text>{shippingCost.toLocaleString('fa-IR')} تومان</Text>
              </div>
              
              <Divider style={{ margin: '12px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>مبلغ قابل پرداخت:</Text>
                <Text strong>{(totalAmount - discount + shippingCost).toLocaleString('fa-IR')} تومان</Text>
              </div>
            </div>
            
            <Button 
              type="primary" 
              size="large" 
              block 
              onClick={handleCheckout}
            >
              ادامه فرآیند خرید
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
 
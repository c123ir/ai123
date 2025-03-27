import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Typography, 
  Input, 
  Select, 
  Pagination, 
  Spin, 
  Slider, 
  Space, 
  Tag,
  Empty
} from 'antd';
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  FilterOutlined, 
  SearchOutlined, 
  StarFilled
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import { productService } from '../services/api';

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const { Option } = Select;

interface Product {
  id: number;
  title: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  rating: number;
  sold: number;
}

// داده‌های نمونه برای محصولات
const sampleProducts: Product[] = [
  {
    id: 1,
    title: 'گوشی موبایل سامسونگ گلکسی A52',
    price: 12500000,
    discountPrice: 11200000,
    image: 'https://via.placeholder.com/300x300',
    category: 'دیجیتال',
    rating: 4.2,
    sold: 150
  },
  {
    id: 2,
    title: 'لپ‌تاپ لنوو IdeaPad L340',
    price: 32000000,
    image: 'https://via.placeholder.com/300x300',
    category: 'دیجیتال',
    rating: 4.5,
    sold: 75
  },
  {
    id: 3,
    title: 'هدفون بی‌سیم سونی WH-1000XM4',
    price: 4500000,
    discountPrice: 3900000,
    image: 'https://via.placeholder.com/300x300',
    category: 'دیجیتال',
    rating: 4.8,
    sold: 320
  },
  {
    id: 4,
    title: 'پیراهن مردانه آستین بلند',
    price: 850000,
    image: 'https://via.placeholder.com/300x300',
    category: 'پوشاک',
    rating: 3.9,
    sold: 85
  },
  {
    id: 5,
    title: 'تبلت اپل iPad Pro 2021',
    price: 24500000,
    image: 'https://via.placeholder.com/300x300',
    category: 'دیجیتال',
    rating: 4.7,
    sold: 62
  },
  {
    id: 6,
    title: 'ساعت هوشمند اپل Watch Series 7',
    price: 14200000,
    discountPrice: 12800000,
    image: 'https://via.placeholder.com/300x300',
    category: 'دیجیتال',
    rating: 4.6,
    sold: 94
  },
  {
    id: 7,
    title: 'کفش ورزشی نایک ایر مکس',
    price: 3200000,
    image: 'https://via.placeholder.com/300x300',
    category: 'پوشاک',
    rating: 4.4,
    sold: 215
  },
  {
    id: 8,
    title: 'میز تحریر چوبی',
    price: 2700000,
    image: 'https://via.placeholder.com/300x300',
    category: 'خانه و آشپزخانه',
    rating: 4.1,
    sold: 47
  }
];

// دسته‌بندی‌های نمونه
const sampleCategories = [
  { id: 'دیجیتال', name: 'دیجیتال' },
  { id: 'پوشاک', name: 'پوشاک' },
  { id: 'خانه و آشپزخانه', name: 'خانه و آشپزخانه' },
  { id: 'آرایشی و بهداشتی', name: 'آرایشی و بهداشتی' },
  { id: 'لوازم تحریر', name: 'لوازم تحریر' }
];

const Products: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState(sampleCategories);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(sampleProducts.length);
  const pageSize = 12;

  useEffect(() => {
    // استفاده از داده‌های نمونه به جای اتصال به سرور
    fetchData();
  }, [selectedCategory, priceRange, sortBy, currentPage, searchText]);

  const fetchData = () => {
    setLoading(true);
    
    // شبیه‌سازی تاخیر شبکه
    setTimeout(() => {
      // فیلتر کردن محصولات بر اساس معیارها
      let filteredProducts = [...sampleProducts];
      
      // فیلتر بر اساس دسته‌بندی
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
      }
      
      // فیلتر بر اساس محدوده قیمت
      filteredProducts = filteredProducts.filter(p => 
        (p.discountPrice || p.price) >= priceRange[0] && 
        (p.discountPrice || p.price) <= priceRange[1]
      );
      
      // فیلتر بر اساس جستجو
      if (searchText) {
        filteredProducts = filteredProducts.filter(p => 
          p.title.includes(searchText) || 
          p.category.includes(searchText)
        );
      }
      
      // مرتب‌سازی
      switch(sortBy) {
        case 'newest':
          // داده‌های نمونه فعلا به ترتیب هستند
          break;
        case 'popular':
          filteredProducts.sort((a, b) => b.sold - a.sold);
          break;
        case 'priceAsc':
          filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
          break;
        case 'priceDesc':
          filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
          break;
      }
      
      setTotalProducts(filteredProducts.length);
      
      // صفحه‌بندی
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
      
      setProducts(paginatedProducts);
      setLoading(false);
    }, 500);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderProductCard = (product: Product) => (
    <Col xs={24} sm={12} md={8} lg={6} key={product.id} style={{ marginBottom: 16 }}>
      <Card
        hoverable
        cover={
          <div style={{ height: 200, overflow: 'hidden' }}>
            <img 
              alt={product.title} 
              src={product.image} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        }
        actions={[
          <Button type="link" icon={<ShoppingCartOutlined />}>افزودن به سبد</Button>,
          <Button type="link" icon={<HeartOutlined />} />
        ]}
        variant="outlined"
      >
        <Meta 
          title={<Link to={`/products/${product.id}`}>{product.title}</Link>}
          description={
            <>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <StarFilled style={{ color: '#fadb14', marginLeft: '5px' }} />
                <span>{product.rating} ({product.sold} فروش)</span>
              </div>
              <Tag color="blue" style={{ marginBottom: '8px' }}>{product.category}</Tag>
              <div>
                {product.discountPrice && product.discountPrice < product.price ? (
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
  );

  return (
    <div className="products-page" style={{ padding: '20px' }}>
      <Row gutter={[24, 24]}>
        {/* بخش فیلترها */}
        <Col xs={24} lg={6}>
          <Card variant="borderless" title="فیلترها">
            <div style={{ marginBottom: 16 }}>
              <Title level={5}>جستجو</Title>
              <Input 
                placeholder="جستجو در محصولات..." 
                suffix={<SearchOutlined />} 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={handleSearch}
              />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <Title level={5}>دسته‌بندی</Title>
              <Select
                placeholder="انتخاب دسته‌بندی"
                style={{ width: '100%' }}
                value={selectedCategory || undefined}
                onChange={handleCategoryChange}
                allowClear
              >
                {categories.map((category: any) => (
                  <Option key={category.id} value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <Title level={5}>محدوده قیمت (تومان)</Title>
              <Slider
                range
                min={0}
                max={100000000}
                step={1000000}
                value={priceRange}
                onChange={handlePriceChange}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{priceRange[0].toLocaleString('fa-IR')}</span>
                <span>{priceRange[1].toLocaleString('fa-IR')}</span>
              </div>
            </div>
            
            <Button 
              type="primary" 
              icon={<FilterOutlined />} 
              block
              onClick={handleSearch}
            >
              اعمال فیلترها
            </Button>
          </Card>
        </Col>
        
        {/* بخش نمایش محصولات */}
        <Col xs={24} lg={18}>
          <Card variant="borderless">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
              <Title level={3} style={{ margin: 0 }}>محصولات</Title>
              <Space>
                <span>مرتب‌سازی بر اساس:</span>
                <Select
                  defaultValue="newest"
                  style={{ width: 150 }}
                  onChange={handleSortChange}
                >
                  <Option value="newest">جدیدترین</Option>
                  <Option value="popular">محبوب‌ترین</Option>
                  <Option value="priceAsc">قیمت: کم به زیاد</Option>
                  <Option value="priceDesc">قیمت: زیاد به کم</Option>
                </Select>
              </Space>
            </div>
            
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
                <Spin size="large" />
              </div>
            ) : products.length > 0 ? (
              <>
                <Row gutter={[16, 16]}>
                  {products.map(renderProductCard)}
                </Row>
                
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                  <Pagination
                    current={currentPage}
                    total={totalProducts}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              </>
            ) : (
              <Empty description="محصولی یافت نشد" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Products; 
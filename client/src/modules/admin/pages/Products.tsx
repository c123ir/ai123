import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Typography, Space, Input, Popconfirm, Tag, Image, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { productService } from '../services/api';

const { Title } = Typography;

const Products: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts({});
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('خطا در بارگذاری محصولات:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      message.success('محصول با موفقیت حذف شد');
      fetchProducts();
    } catch (error) {
      console.error('خطا در حذف محصول:', error);
    }
  };

  const filteredProducts = products.filter((product: any) => 
    product.title.toLowerCase().includes(searchText.toLowerCase()) || 
    product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'تصویر',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string) => (
        <Image 
          src={image || 'https://via.placeholder.com/100x100'} 
          alt="تصویر محصول" 
          width={60}
          height={60}
          style={{ objectFit: 'cover' }}
          fallback="https://via.placeholder.com/100x100?text=تصویر+ندارد"
        />
      ),
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'دسته‌بندی',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => <Tag color="blue">{category}</Tag>
    },
    {
      title: 'قیمت (تومان)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => price.toLocaleString('fa-IR'),
    },
    {
      title: 'موجودی',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 0 ? 'green' : 'red'}>
          {stock > 0 ? `${stock} عدد` : 'ناموجود'}
        </Tag>
      ),
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        let text = '';
        
        switch (status) {
          case 'active':
            color = 'green';
            text = 'فعال';
            break;
          case 'inactive':
            color = 'red';
            text = 'غیرفعال';
            break;
          default:
            color = 'blue';
            text = status;
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => console.log('مشاهده محصول', record.id)}
          >
            مشاهده
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => console.log('ویرایش محصول', record.id)}
          >
            ویرایش
          </Button>
          <Popconfirm
            title="آیا از حذف این محصول اطمینان دارید؟"
            onConfirm={() => handleDelete(record.id)}
            okText="بله"
            cancelText="خیر"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              حذف
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="products-container" style={{ padding: '20px' }}>
      <Card variant="borderless">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Title level={3}>مدیریت محصولات</Title>
          <Space>
            <Input
              placeholder="جستجو..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => console.log('افزودن محصول جدید')}
            >
              افزودن محصول
            </Button>
          </Space>
        </div>
        
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Products; 
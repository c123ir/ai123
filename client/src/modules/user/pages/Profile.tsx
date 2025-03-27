import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Upload, 
  message, 
  List, 
  Typography, 
  Table, 
  Tag, 
  Space, 
  Divider, 
  Badge,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  UploadOutlined, 
  ShoppingOutlined, 
  HeartOutlined, 
  EnvironmentOutlined, 
  LockOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { profileService, orderService } from '../services/api';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface Order {
  id: string;
  date: string;
  status: string;
  totalAmount: number;
  items: number;
}

interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  isDefault: boolean;
}

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [avatar, setAvatar] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  
  useEffect(() => {
    fetchUserProfile();
    fetchOrders();
    fetchAddresses();
    fetchFavorites();
  }, []);
  
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await profileService.getProfile();
      setUserData(response.data);
      
      if (response.data.avatar) {
        setAvatar(response.data.avatar);
      }
      
      profileForm.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      });
      
      setLoading(false);
    } catch (error) {
      console.error('خطا در دریافت اطلاعات پروفایل:', error);
      setLoading(false);
    }
  };
  
  const fetchOrders = async () => {
    try {
      const response = await orderService.getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('خطا در دریافت سفارشات:', error);
    }
  };
  
  const fetchAddresses = async () => {
    try {
      const response = await profileService.getAddresses();
      setAddresses(response.data);
    } catch (error) {
      console.error('خطا در دریافت آدرس‌ها:', error);
    }
  };
  
  const fetchFavorites = async () => {
    try {
      // فرض می‌کنیم سرویسی برای دریافت علاقه‌مندی‌ها داریم
      // const response = await favoriteService.getFavorites();
      // setFavorites(response.data);
      
      // فعلاً داده نمونه
      setFavorites([
        { id: 1, title: 'گوشی سامسونگ S23', price: 35000000, image: 'https://via.placeholder.com/100x100' },
        { id: 2, title: 'لپ تاپ لنوو ThinkPad', price: 42000000, image: 'https://via.placeholder.com/100x100' },
        { id: 3, title: 'هدفون سونی WH-1000XM4', price: 12000000, image: 'https://via.placeholder.com/100x100' },
      ]);
    } catch (error) {
      console.error('خطا در دریافت علاقه‌مندی‌ها:', error);
    }
  };
  
  const handleUpdateProfile = async (values: any) => {
    try {
      setProfileLoading(true);
      await profileService.updateProfile(values);
      message.success('اطلاعات پروفایل با موفقیت بروزرسانی شد');
      setProfileLoading(false);
    } catch (error) {
      console.error('خطا در بروزرسانی پروفایل:', error);
      setProfileLoading(false);
    }
  };
  
  const handlePasswordChange = async (values: any) => {
    try {
      setPasswordLoading(true);
      await profileService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('رمز عبور با موفقیت تغییر کرد');
      passwordForm.resetFields();
      setPasswordLoading(false);
    } catch (error) {
      console.error('خطا در تغییر رمز عبور:', error);
      setPasswordLoading(false);
    }
  };
  
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      setAvatar(info.file.response.url);
      message.success('آواتار با موفقیت آپلود شد');
    }
  };
  
  const handleDeleteAddress = async (id: string) => {
    try {
      await profileService.deleteAddress(id);
      message.success('آدرس با موفقیت حذف شد');
      fetchAddresses();
    } catch (error) {
      console.error('خطا در حذف آدرس:', error);
    }
  };
  
  const handleSetDefaultAddress = async (id: string) => {
    try {
      await profileService.setDefaultAddress(id);
      message.success('آدرس پیش‌فرض با موفقیت تغییر کرد');
      fetchAddresses();
    } catch (error) {
      console.error('خطا در تغییر آدرس پیش‌فرض:', error);
    }
  };
  
  const getStatusTag = (status: string) => {
    let color = '';
    let text = '';
    
    switch (status) {
      case 'pending':
        color = 'gold';
        text = 'در انتظار پرداخت';
        break;
      case 'processing':
        color = 'blue';
        text = 'در حال پردازش';
        break;
      case 'shipped':
        color = 'cyan';
        text = 'ارسال شده';
        break;
      case 'delivered':
        color = 'green';
        text = 'تحویل داده شده';
        break;
      case 'cancelled':
        color = 'red';
        text = 'لغو شده';
        break;
      default:
        color = 'default';
        text = status;
    }
    
    return <Tag color={color}>{text}</Tag>;
  };
  
  const orderColumns = [
    {
      title: 'شماره سفارش',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'وضعیت',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: 'تعداد اقلام',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: 'مبلغ کل (تومان)',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => amount.toLocaleString('fa-IR'),
    },
    {
      title: 'عملیات',
      key: 'action',
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => console.log('مشاهده سفارش:', record.id)}
          >
            مشاهده جزئیات
          </Button>
        </Space>
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
  
  return (
    <div className="profile-page" style={{ padding: '20px' }}>
      <Card variant="borderless">
        <Tabs defaultActiveKey="profile">
          <TabPane 
            tab={<span><UserOutlined /> اطلاعات حساب کاربری</span>}
            key="profile"
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <Avatar 
                  size={100} 
                  src={avatar} 
                  icon={!avatar ? <UserOutlined /> : undefined}
                />
                <div style={{ marginTop: 16 }}>
                  <Upload 
                    name="avatar"
                    action="/api/user/upload-avatar"
                    showUploadList={false}
                    onChange={handleAvatarUpload}
                  >
                    <Button icon={<UploadOutlined />}>آپلود تصویر پروفایل</Button>
                  </Upload>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <Form
              form={profileForm}
              layout="vertical"
              onFinish={handleUpdateProfile}
              style={{ maxWidth: 600, margin: '0 auto' }}
            >
              <Form.Item
                name="name"
                label="نام و نام خانوادگی"
                rules={[{ required: true, message: 'لطفاً نام خود را وارد کنید' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="نام و نام خانوادگی" />
              </Form.Item>
              
              <Form.Item
                name="email"
                label="ایمیل"
                rules={[
                  { required: true, message: 'لطفاً ایمیل خود را وارد کنید' },
                  { type: 'email', message: 'ایمیل نامعتبر است' }
                ]}
              >
                <Input placeholder="ایمیل" disabled />
              </Form.Item>
              
              <Form.Item
                name="phone"
                label="شماره تماس"
                rules={[{ required: true, message: 'لطفاً شماره تماس خود را وارد کنید' }]}
              >
                <Input placeholder="شماره تماس" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={profileLoading}>
                  ذخیره تغییرات
                </Button>
              </Form.Item>
            </Form>
            
            <Divider />
            
            <Title level={4}>تغییر رمز عبور</Title>
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handlePasswordChange}
              style={{ maxWidth: 600, margin: '0 auto' }}
            >
              <Form.Item
                name="currentPassword"
                label="رمز عبور فعلی"
                rules={[{ required: true, message: 'لطفاً رمز عبور فعلی را وارد کنید' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="رمز عبور فعلی" />
              </Form.Item>
              
              <Form.Item
                name="newPassword"
                label="رمز عبور جدید"
                rules={[
                  { required: true, message: 'لطفاً رمز عبور جدید را وارد کنید' },
                  { min: 8, message: 'رمز عبور باید حداقل ۸ کاراکتر باشد' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="رمز عبور جدید" />
              </Form.Item>
              
              <Form.Item
                name="confirmPassword"
                label="تکرار رمز عبور جدید"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'لطفاً تکرار رمز عبور جدید را وارد کنید' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('تکرار رمز عبور با رمز عبور جدید مطابقت ندارد'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="تکرار رمز عبور جدید" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={passwordLoading}>
                  تغییر رمز عبور
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          
          <TabPane 
            tab={<span><ShoppingOutlined /> سفارش‌های من</span>}
            key="orders"
          >
            {orders.length > 0 ? (
              <Table 
                columns={orderColumns} 
                dataSource={orders} 
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <ShoppingOutlined style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
                <Title level={4}>شما هنوز سفارشی ثبت نکرده‌اید</Title>
                <Paragraph>
                  برای مشاهده سفارش‌های خود، ابتدا خریدی انجام دهید.
                </Paragraph>
                <Button type="primary" href="/products">
                  مشاهده محصولات
                </Button>
              </div>
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><EnvironmentOutlined /> آدرس‌های من</span>}
            key="addresses"
          >
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
              <Title level={4}>آدرس‌های من</Title>
              <Button 
                type="primary" 
                onClick={() => console.log('افزودن آدرس جدید')}
              >
                افزودن آدرس جدید
              </Button>
            </div>
            
            {addresses.length > 0 ? (
              <List
                itemLayout="vertical"
                dataSource={addresses}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Button 
                        key="edit" 
                        icon={<EditOutlined />}
                        onClick={() => console.log('ویرایش آدرس:', item.id)}
                      >
                        ویرایش
                      </Button>,
                      <Button 
                        key="delete" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteAddress(item.id)}
                      >
                        حذف
                      </Button>,
                      !item.isDefault && (
                        <Button 
                          key="default"
                          onClick={() => handleSetDefaultAddress(item.id)}
                        >
                          تنظیم به عنوان پیش‌فرض
                        </Button>
                      ),
                    ].filter(Boolean)}
                  >
                    <List.Item.Meta
                      title={
                        <span>
                          {item.title}
                          {item.isDefault && (
                            <Badge 
                              count="پیش‌فرض" 
                              style={{ 
                                backgroundColor: '#52c41a',
                                marginRight: 8
                              }} 
                            />
                          )}
                        </span>
                      }
                      description={
                        <>
                          <div><strong>گیرنده:</strong> {item.fullName}</div>
                          <div><strong>شماره تماس:</strong> {item.phone}</div>
                          <div><strong>استان:</strong> {item.province} - <strong>شهر:</strong> {item.city}</div>
                          <div><strong>کد پستی:</strong> {item.postalCode}</div>
                        </>
                      }
                    />
                    <div>{item.address}</div>
                  </List.Item>
                )}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <EnvironmentOutlined style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
                <Title level={4}>شما هنوز آدرسی ثبت نکرده‌اید</Title>
                <Paragraph>
                  برای ثبت سفارش، لطفاً یک آدرس اضافه کنید.
                </Paragraph>
                <Button 
                  type="primary"
                  onClick={() => console.log('افزودن آدرس جدید')}
                >
                  افزودن آدرس جدید
                </Button>
              </div>
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><HeartOutlined /> علاقه‌مندی‌ها</span>}
            key="favorites"
          >
            <div style={{ marginBottom: 16 }}>
              <Title level={4}>لیست علاقه‌مندی‌های من</Title>
            </div>
            
            {favorites.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={favorites}
                renderItem={item => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Button 
                        key="view" 
                        type="link"
                        href={`/products/${item.id}`}
                      >
                        مشاهده محصول
                      </Button>,
                      <Button 
                        key="add" 
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                      >
                        افزودن به سبد خرید
                      </Button>,
                      <Button 
                        key="remove" 
                        danger 
                        icon={<DeleteOutlined />}
                      >
                        حذف
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.image} size={64} shape="square" />}
                      title={<a href={`/products/${item.id}`}>{item.title}</a>}
                      description={
                        <Text strong>{item.price.toLocaleString('fa-IR')} تومان</Text>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <HeartOutlined style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
                <Title level={4}>لیست علاقه‌مندی شما خالی است</Title>
                <Paragraph>
                  محصولات مورد علاقه خود را نشان‌گذاری کنید تا در اینجا نمایش داده شوند.
                </Paragraph>
                <Button type="primary" href="/products">
                  مشاهده محصولات
                </Button>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile; 
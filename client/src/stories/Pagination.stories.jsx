import React, { useState } from 'react';
import { Pagination, Radio, Space, Select, Divider, Typography, Card, Table, Tag } from 'antd';

const { Text, Title } = Typography;
const { Option } = Select;

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// نمونه پایه
export const Default = {
  render: () => <Pagination defaultCurrent={1} total={50} />,
};

// صفحه‌بندی با اندازه‌های مختلف صفحه
export const WithPageSizeOptions = {
  render: () => (
    <Pagination
      showSizeChanger
      defaultCurrent={3}
      total={500}
      defaultPageSize={20}
      pageSizeOptions={[20, 50, 100, 200]}
    />
  ),
};

// صفحه‌بندی با پرش سریع
export const WithQuickJump = {
  render: () => (
    <Pagination
      showQuickJumper
      defaultCurrent={2}
      total={500}
      showTotal={(total, range) => `${range[0]}-${range[1]} از ${total} مورد`}
    />
  ),
};

// تعداد زیاد صفحات با میانبرها
export const WithManyPages = {
  render: () => (
    <Pagination
      defaultCurrent={6}
      total={500}
      showSizeChanger
      showQuickJumper
      showTotal={(total) => `مجموع ${total} مورد`}
    />
  ),
};

// صفحه‌بندی کوچک
export const Small = {
  render: () => <Pagination size="small" defaultCurrent={1} total={50} />,
};

// صفحه‌بندی ساده
export const Simple = {
  render: () => <Pagination simple defaultCurrent={2} total={50} />,
};

// تغییر اندازه صفحه
export const ControlledPageSize = {
  render: function ControlledPageSizeExample() {
    const [current, setCurrent] = useState(3);
    const [pageSize, setPageSize] = useState(10);

    const onChange = (page, pageSize) => {
      console.log(`صفحه: ${page}, اندازه صفحه: ${pageSize}`);
      setCurrent(page);
      setPageSize(pageSize);
    };

    return (
      <Space direction="vertical">
        <Text>صفحه فعلی: {current}</Text>
        <Text>تعداد آیتم در هر صفحه: {pageSize}</Text>
        <Pagination
          current={current}
          pageSize={pageSize}
          onChange={onChange}
          showSizeChanger
          total={500}
        />
      </Space>
    );
  },
};

// صفحه‌بندی با کنترل کامل
export const FullyControlled = {
  render: function FullyControlledExample() {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(100);
    const [position, setPosition] = useState('bottom');
    const [showSizeChanger, setShowSizeChanger] = useState(true);
    const [showQuickJumper, setShowQuickJumper] = useState(true);
    const [showTotal, setShowTotal] = useState(true);

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="تنظیمات صفحه‌بندی">
          <Space direction="vertical">
            <div>
              <Text strong>موقعیت:</Text>
              <Radio.Group
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                style={{ marginRight: 10 }}
              >
                <Radio.Button value="top">بالا</Radio.Button>
                <Radio.Button value="bottom">پایین</Radio.Button>
                <Radio.Button value="both">هر دو</Radio.Button>
              </Radio.Group>
            </div>

            <div>
              <Text strong>تعداد کل موارد:</Text>
              <Radio.Group
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                style={{ marginRight: 10 }}
              >
                <Radio.Button value={10}>۱۰</Radio.Button>
                <Radio.Button value={50}>۵۰</Radio.Button>
                <Radio.Button value={100}>۱۰۰</Radio.Button>
                <Radio.Button value={500}>۵۰۰</Radio.Button>
              </Radio.Group>
            </div>

            <div>
              <Text strong>نمایش تغییر دهنده اندازه:</Text>
              <Radio.Group
                value={showSizeChanger}
                onChange={(e) => setShowSizeChanger(e.target.value)}
                style={{ marginRight: 10 }}
              >
                <Radio.Button value={true}>بله</Radio.Button>
                <Radio.Button value={false}>خیر</Radio.Button>
              </Radio.Group>
            </div>

            <div>
              <Text strong>نمایش پرش سریع:</Text>
              <Radio.Group
                value={showQuickJumper}
                onChange={(e) => setShowQuickJumper(e.target.value)}
                style={{ marginRight: 10 }}
              >
                <Radio.Button value={true}>بله</Radio.Button>
                <Radio.Button value={false}>خیر</Radio.Button>
              </Radio.Group>
            </div>

            <div>
              <Text strong>نمایش مجموع:</Text>
              <Radio.Group
                value={showTotal}
                onChange={(e) => setShowTotal(e.target.value)}
                style={{ marginRight: 10 }}
              >
                <Radio.Button value={true}>بله</Radio.Button>
                <Radio.Button value={false}>خیر</Radio.Button>
              </Radio.Group>
            </div>
          </Space>
        </Card>

        <Divider />

        <Pagination
          current={current}
          pageSize={pageSize}
          position={position}
          total={total}
          showSizeChanger={showSizeChanger}
          showQuickJumper={showQuickJumper}
          showTotal={showTotal ? (total, range) => `${range[0]}-${range[1]} از ${total} مورد` : undefined}
          onChange={(page, size) => {
            setCurrent(page);
            setPageSize(size);
          }}
          onShowSizeChange={(current, size) => {
            setCurrent(current);
            setPageSize(size);
          }}
        />
      </Space>
    );
  },
};

// صفحه‌بندی با جدول
export const WithTable = {
  render: () => {
    const columns = [
      {
        title: 'نام',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'سن',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'آدرس',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'برچسب',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 3 ? 'geekblue' : 'green';
              if (tag === 'منتظر') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              );
            })}
          </>
        ),
      },
    ];
    
    const data = Array.from({ length: 50 }, (_, i) => ({
      key: i,
      name: `علی محمدی ${i}`,
      age: 22 + i % 10,
      address: `تهران، خیابان شماره ${i}، پلاک ${100 + i}`,
      tags: [i % 2 === 0 ? 'فعال' : 'منتظر', i % 3 === 0 ? 'ویژه' : 'عادی'],
    }));

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `مجموع ${total} کاربر`,
          defaultPageSize: 10,
          pageSizeOptions: [5, 10, 20, 50],
        }}
      />
    );
  },
}; 
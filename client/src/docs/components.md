# مستندات کامپوننت‌های پروژه دستیار هوشمند ۱۲۳

<div dir="rtl">

## کامپوننت‌های مشترک

### کامپوننت‌های پایه

#### Button

دکمه چند منظوره برای هدایت کاربر، انجام عملیات و ارسال فرم‌ها.

```tsx
import { Button } from 'components/common/Button';

<Button
  variant="primary"
  size="medium"
  onClick={() => console.log('clicked')}
  disabled={false}
>
  متن دکمه
</Button>
```

پارامترها:

- `variant`: نوع نمایش دکمه (`primary`, `secondary`, `text`, `outline`)
- `size`: اندازه دکمه (`small`, `medium`, `large`)
- `onClick`: تابع اجرا شونده با کلیک
- `disabled`: غیرفعال کردن دکمه
- `icon`: آیکون دکمه (اختیاری)
- `fullWidth`: پر کردن عرض کانتینر (اختیاری)
- `loading`: نمایش حالت بارگذاری (اختیاری)

#### Card

کامپوننت کارت برای نمایش اطلاعات در قالب بلوک:

```tsx
import { Card } from "../modules/shared/components/common";

// نمونه استفاده
<Card 
  title="عنوان کارت" 
  extra={<a href="#">بیشتر</a>}
>
  محتوای کارت
</Card>
```

#### Table

کامپوننت جدول برای نمایش داده‌های جدولی:

```tsx
import { Table, TableColumn } from "../modules/shared/components/common";

// تعریف ستون‌های جدول
const columns: TableColumn<DataType>[] = [
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "سن",
    dataIndex: "age",
    key: "age",
  }
];

// نمونه استفاده
<Table 
  columns={columns} 
  dataSource={data}
  pagination={{ pageSize: 10 }}
  bordered
/>
```

#### Layout

کامپوننت‌های لایه‌بندی برای ساختار صفحات:

```tsx
import { Layout } from "../modules/shared/components/common";

// نمونه استفاده
<Layout>
  <Layout.Header>سربرگ</Layout.Header>
  <Layout.Content>محتوا</Layout.Content>
  <Layout.Footer>پاورقی</Layout.Footer>
</Layout>
```

### کامپوننت‌های فرم

#### Input

کامپوننت ورودی متنی:

```tsx
import { Input } from "../modules/shared/components/common";

// نمونه استفاده
<Input 
  placeholder="نام کاربری" 
  prefix={<UserOutlined />} 
  onChange={handleChange}
/>
```

#### Select

کامپوننت انتخاب از لیست:

```tsx
import { Select } from "../modules/shared/components/common";

// نمونه استفاده
<Select 
  placeholder="انتخاب کنید"
  onChange={handleChange}
>
  <Select.Option value="option1">گزینه ۱</Select.Option>
  <Select.Option value="option2">گزینه ۲</Select.Option>
</Select>
```

#### DatePicker

کامپوننت انتخاب تاریخ با پشتیبانی از تقویم شمسی:

```tsx
import { DatePicker } from "../modules/shared/components/common";

// نمونه استفاده
<DatePicker 
  onChange={handleDateChange}
  placeholder="انتخاب تاریخ"
/>
```

## کامپوننت‌های ماژول توکن

### TokenBalance

کامپوننت نمایش موجودی توکن کاربر:

```tsx
import { TokenBalance } from "../modules/token/components";

// نمونه استفاده
<TokenBalance userId={currentUser.id} />
```

### TokenHistory

کامپوننت نمایش تاریخچه تراکنش‌های توکن:

```tsx
import { TokenHistory } from "../modules/token/components";

// نمونه استفاده
<TokenHistory 
  userId={currentUser.id}
  pageSize={10}
/>
```

### TokenExchange

کامپوننت تبدیل و استفاده از توکن:

```tsx
import { TokenExchange } from "../modules/token/components";

// نمونه استفاده
<TokenExchange 
  userId={currentUser.id}
  onExchange={handleExchange}
/>
```

## کامپوننت‌های ماژول مشاوره

### AdvisorList

کامپوننت نمایش لیست مشاوران با قابلیت فیلتر و جستجو:

```tsx
import { AdvisorList } from "../modules/advisor/components";

// نمونه استفاده
<AdvisorList 
  onSelect={handleSelectAdvisor}
  filters={filters}
/>
```

### SessionBookingForm

فرم رزرو جلسه مشاوره:

```tsx
import { SessionBookingForm } from "../modules/advisor/components";

// نمونه استفاده
<SessionBookingForm 
  advisorId={selectedAdvisor.id}
  onSubmit={handleBookSession}
/>
```

### SessionDetail

نمایش جزئیات یک جلسه مشاوره:

```tsx
import { SessionDetail } from "../modules/advisor/components";

// نمونه استفاده
<SessionDetail sessionId={sessionId} />
```

### SessionList

نمایش لیست جلسات مشاوره کاربر:

```tsx
import { SessionList } from "../modules/advisor/components";

// نمونه استفاده
<SessionList 
  userId={currentUser.id}
  filters={sessionFilters}
/>
```

</div>

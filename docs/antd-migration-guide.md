# راهنمای مهاجرت به Ant Design در نسخه ۲

<div dir="rtl">

## مقدمه

این سند، راهنمای مهاجرت پروژه دستیار هوشمند ۱۲۳ از Material UI به Ant Design را شرح می‌دهد. این مهاجرت بخشی از بهبودهای نسخه ۲ پروژه است و با هدف بهبود نمایش داده‌های مالی، امکانات داشبوردی پیشرفته‌تر و پشتیبانی بهتر از RTL و زبان فارسی انجام شده است.

## دلایل مهاجرت

مهاجرت از Material UI به Ant Design به دلایل زیر انجام شده است:

1. **کامپوننت‌های تخصصی مالی**: Ant Design کامپوننت‌های تخصصی بیشتری برای نمایش داده‌های مالی و تجاری ارائه می‌دهد.
2. **کتابخانه نموداری اختصاصی**: Ant Design Charts ابزارهای قدرتمندتری برای نمایش نمودارهای مالی و داشبوردهای ریل‌تایم فراهم می‌کند.
3. **طراحی سازمانی و تجاری**: ظاهر Ant Design برای کاربردهای سازمانی و تجاری بهینه شده است.
4. **پشتیبانی بهتر از RTL**: Ant Design مکانیزم‌های بهتری برای پشتیبانی از RTL از طریق ConfigProvider ارائه می‌دهد.
5. **سازگاری با معماری ماژولار جدید**: کتابخانه Ant Design به خوبی با معماری ماژولار جدید سازگار است.

## تغییرات اصلی

### ۱. تغییر پکیج‌های استفاده شده

پکیج‌های زیر حذف شده‌اند:
```json
"@emotion/react": "^11.11.0",
"@emotion/styled": "^11.11.0",
"@mui/icons-material": "^5.11.16",
"@mui/material": "^5.13.0",
"@mui/x-date-pickers": "^6.5.0",
```

پکیج‌های زیر اضافه شده‌اند:
```json
"@ant-design/charts": "^1.4.2",
"@ant-design/icons": "^5.2.6",
"antd": "^5.11.0",
```

### ۲. تغییر در سیستم تم

سیستم تم به طور کامل بازنویسی شده و به مسیر `modules/shared/context/ThemeContext` منتقل شده است. اکنون از ConfigProvider به جای ThemeProvider استفاده می‌شود:

```tsx
// قبل - Material UI
<ThemeProvider theme={theme}>
  <CssBaseline />
  {children}
</ThemeProvider>

// بعد - Ant Design
<ConfigProvider
  theme={themeConfig}
  direction="rtl"
  locale={faIR}
>
  {children}
</ConfigProvider>
```

### ۳. تغییر در نحوه پشتیبانی RTL

در Material UI از تنظیمات جداگانه برای RTL استفاده می‌شد، اما در Ant Design این کار با استفاده از پارامتر direction انجام می‌شود:

```tsx
<ConfigProvider direction="rtl">
  {children}
</ConfigProvider>
```

### ۴. تغییر در کامپوننت‌ها

جدول زیر معادل‌های کامپوننت‌های Material UI در Ant Design را نشان می‌دهد:

| Material UI | Ant Design |
|-------------|------------|
| Box | div + style |
| Paper | Card |
| Typography | Typography (Title, Text, Paragraph) |
| TextField | Input, Input.TextArea |
| Button | Button |
| AppBar | Layout.Header |
| Drawer | Drawer |
| IconButton | Button with shape="circle" |
| Dialog | Modal |
| CircularProgress | Spin |
| Select | Select |
| MenuItem | Select.Option |
| BottomNavigation | TabBar |
| Tabs | Tabs |
| LinearProgress | Progress |
| Snackbar | message, notification |
| Alert | Alert |
| Table | Table |
| Chip | Tag |
| Badge | Badge |
| Card | Card |
| CardHeader | Card.Meta |
| CardContent | Card children |
| List | List |
| ListItem | List.Item |
| Divider | Divider |
| Grid | Row + Col |

### ۵. تبدیل نمونه کد

#### نمونه Button

```tsx
// قبل - Material UI
import Button from '@mui/material/Button';

<Button
  variant="contained"
  color="primary"
  startIcon={<SaveIcon />}
  sx={{ mt: 2 }}
>
  ذخیره
</Button>

// بعد - Ant Design
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

<Button
  type="primary"
  icon={<SaveOutlined />}
  style={{ marginTop: 16 }}
>
  ذخیره
</Button>
```

#### نمونه Form

```tsx
// قبل - Material UI
import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';

const formik = useFormik({
  initialValues: { name: '', email: '' },
  onSubmit: (values) => {
    // ...
  },
});

<Box component="form" onSubmit={formik.handleSubmit}>
  <TextField
    fullWidth
    label="نام"
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    error={formik.touched.name && Boolean(formik.errors.name)}
    helperText={formik.touched.name && formik.errors.name}
    sx={{ mb: 2 }}
  />
  <TextField
    fullWidth
    label="ایمیل"
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email && formik.errors.email}
    sx={{ mb: 2 }}
  />
  <Button type="submit" variant="contained">ارسال</Button>
</Box>

// بعد - Ant Design
import { Form, Input, Button } from 'antd';

<Form
  initialValues={{ name: '', email: '' }}
  onFinish={(values) => {
    // ...
  }}
>
  <Form.Item
    name="name"
    label="نام"
    rules={[{ required: true, message: 'لطفاً نام را وارد کنید' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    name="email"
    label="ایمیل"
    rules={[
      { required: true, message: 'لطفاً ایمیل را وارد کنید' },
      { type: 'email', message: 'ایمیل وارد شده معتبر نیست' }
    ]}
  >
    <Input />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">ارسال</Button>
  </Form.Item>
</Form>
```

### ۶. تغییر در نمودارها

```tsx
// قبل - Recharts
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="profit" stroke="#4caf50" />
  </LineChart>
</ResponsiveContainer>

// بعد - Ant Design Charts
<LineChart
  data={data}
  xField="month"
  yField="profit"
  smooth={true}
  point={{
    size: 5,
    shape: 'diamond',
  }}
  color="#4caf50"
/>
```

### ۷. تغییر در استایل‌دهی

```tsx
// قبل - Material UI
<Button
  variant="contained"
  sx={{
    backgroundColor: 'primary.main',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }}
>
  دکمه
</Button>

// بعد - Ant Design
<Button
  type="primary"
  style={{
    borderRadius: 8,
  }}
>
  دکمه
</Button>
```

## پشتیبانی از RTL و زبان فارسی

برای پشتیبانی از RTL و زبان فارسی در Ant Design، تنظیمات زیر در `ThemeContext` انجام شده است:

```tsx
import { ConfigProvider } from 'antd';
import faIR from 'antd/lib/locale/fa_IR';

// ...

<ConfigProvider
  direction="rtl"
  locale={faIR}
  theme={themeConfig}
>
  <App />
</ConfigProvider>
```

همچنین استایل‌های اضافی در فایل `src/assets/styles/rtl.css` اضافه شده است:

```css
/* تنظیمات RTL برای اجزای Ant Design */
.ant-input,
.ant-select,
.ant-picker,
.ant-form-item-label,
.ant-modal-title,
.ant-typography {
  text-align: right;
}

/* استایل‌های مربوط به تبدیل اعداد */
.ltr-nums {
  direction: ltr;
  display: inline-block;
}
```

## تبدیل اعداد فارسی به انگلیسی

سیستم تبدیل اعداد فارسی به انگلیسی با کامپوننت‌های Ant Design سازگار شده است:

```tsx
// modules/shared/components/common/DigitConverterInput.tsx
import React from 'react';
import { Input, InputProps } from 'antd';
import { convertPersianToEnglish } from '@shared/utils/digitConverters';

interface DigitConverterInputProps extends InputProps {
  onValueChange?: (value: string) => void;
}

const DigitConverterInput: React.FC<DigitConverterInputProps> = ({ 
  onChange, 
  onValueChange,
  ...props 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const persianValue = e.target.value;
    const englishValue = convertPersianToEnglish(persianValue);
    
    // فراخوانی callback اصلی onChange
    if (onChange) {
      onChange(e);
    }
    
    // ارسال مقدار تبدیل شده
    if (onValueChange) {
      onValueChange(englishValue);
    }
  };

  return <Input onChange={handleChange} {...props} />;
};

export default DigitConverterInput;
```

## بهینه‌سازی داشبوردها

با استفاده از Ant Design Charts، داشبوردهای پروژه بهبود یافته‌اند. این بهبودها شامل موارد زیر است:

1. نمایش نمودارهای سود و زیان با دقت بیشتر
2. نمودارهای تعاملی‌تر با امکان زوم و نمایش توضیحات
3. نمودارهای دایره‌ای برای نمایش توزیع دارایی‌ها
4. امکان نمایش آمار و ارقام با استفاده از کامپوننت Statistic
5. داشبوردهای ریل‌تایم با به‌روزرسانی خودکار

### نمونه استفاده از Statistic

```tsx
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

<Row gutter={16}>
  <Col span={12}>
    <Card>
      <Statistic
        title="درآمد ماهانه"
        value={11280}
        precision={0}
        valueStyle={{ color: '#3f8600' }}
        prefix={<ArrowUpOutlined />}
        suffix="تومان"
      />
    </Card>
  </Col>
  <Col span={12}>
    <Card>
      <Statistic
        title="هزینه‌های ماهانه"
        value={9800}
        precision={0}
        valueStyle={{ color: '#cf1322' }}
        prefix={<ArrowDownOutlined />}
        suffix="تومان"
      />
    </Card>
  </Col>
</Row>
```

## چک‌لیست مهاجرت

برای اطمینان از مهاجرت موفق، موارد زیر را بررسی کنید:

- [ ] تمام import های Material UI به Ant Design تغییر یافته‌اند
- [ ] تمام کامپوننت‌ها با معادل‌های Ant Design جایگزین شده‌اند
- [ ] سیستم تم به ConfigProvider Ant Design تغییر یافته است
- [ ] تنظیمات RTL و فارسی به درستی اعمال شده‌اند
- [ ] سیستم فرم‌ها به Form کامپوننت Ant Design تغییر یافته است
- [ ] نمودارها به Ant Design Charts تغییر یافته‌اند
- [ ] استایل‌های کامپوننت‌ها به روش Ant Design به‌روزرسانی شده‌اند
- [ ] کامپوننت‌های سفارشی با Ant Design سازگار شده‌اند
- [ ] آیکون‌ها از @ant-design/icons استفاده می‌کنند

## رفع مشکلات رایج

### ۱. مشکل RTL در برخی کامپوننت‌ها

برخی کامپوننت‌های Ant Design حتی با وجود تنظیم `direction="rtl"` ممکن است به درستی نمایش داده نشوند. در این موارد، استایل‌های اضافی به فایل `rtl.css` اضافه کنید.

### ۲. مشکل فونت فارسی

اطمینان حاصل کنید که فونت `Vazirmatn` به درستی در پروژه بارگذاری شده است و در تنظیمات تم به عنوان فونت پیش‌فرض تعیین شده است.

### ۳. مشکل تبدیل اعداد فارسی

اگر اعداد فارسی به درستی تبدیل نمی‌شوند، اطمینان حاصل کنید که کامپوننت `DigitConverterInput` به درستی پیاده‌سازی شده و از آن در تمام فرم‌های ورودی عددی استفاده می‌شود.

## منابع مفید

- [مستندات Ant Design](https://ant.design/docs/react/introduce)
- [Ant Design RTL](https://ant.design/docs/react/rtl)
- [Ant Design Charts](https://charts.ant.design/)
- [مستندات Migration از Material UI به Ant Design](https://github.com/ant-design/ant-design/issues/29365)

</div> 
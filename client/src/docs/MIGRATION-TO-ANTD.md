# مستندات مهاجرت به Ant Design

<div dir="rtl">

## مقدمه

این سند، مستندات مربوط به مهاجرت پروژه دستیار هوشمند ۱۲۳ از Material UI به Ant Design را شرح می‌دهد. مهاجرت به Ant Design با هدف بهبود نمایش داده‌های مالی، امکانات داشبوردی پیشرفته‌تر و پشتیبانی بهتر از RTL و زبان فارسی انجام می‌شود.

## دلایل مهاجرت

مهاجرت از Material UI به Ant Design به دلایل زیر انجام شده است:

1. **کامپوننت‌های تخصصی مالی**: Ant Design کامپوننت‌های تخصصی بیشتری برای نمایش داده‌های مالی و تجاری ارائه می‌دهد.
2. **کتابخانه نموداری اختصاصی**: Ant Design Charts ابزارهای قدرتمندتری برای نمایش نمودارهای مالی و داشبوردهای ریل‌تایم فراهم می‌کند.
3. **طراحی سازمانی و تجاری**: ظاهر Ant Design برای کاربردهای سازمانی و تجاری بهینه شده است.
4. **پشتیبانی بهتر از RTL**: Ant Design مکانیزم‌های بهتری برای پشتیبانی از RTL از طریق ConfigProvider ارائه می‌دهد.

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

سیستم تم به طور کامل بازنویسی شده است. اکنون از ConfigProvider به جای ThemeProvider استفاده می‌شود:

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

### ۵. تغییر در نمودارها

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

### ۶. تغییر در استایل‌دهی

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

برای پشتیبانی از RTL و زبان فارسی در Ant Design، تنظیمات زیر در فایل اصلی انجام شده است:

```tsx
import { ConfigProvider } from 'antd';
import faIR from 'antd/lib/locale/fa_IR';

// ...

<ConfigProvider
  direction="rtl"
  locale={faIR}
  // دیگر تنظیمات...
>
  <App />
</ConfigProvider>
```

همچنین استایل‌های اضافی در فایل `index.css` اضافه شده است:

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

سیستم تبدیل اعداد فارسی به انگلیسی نیز با کامپوننت‌های Ant Design سازگار شده است. برای این منظور از کامپوننت سفارشی زیر استفاده می‌شود:

```tsx
// DigitConverterInput.tsx - کامپوننت ورودی با قابلیت تبدیل ارقام فارسی به انگلیسی
import React from 'react';
import { Input, InputProps } from 'antd';
import { convertPersianToEnglish } from '../utils/digitConverters';

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

## نتیجه‌گیری

مهاجرت به Ant Design با موفقیت انجام شده است و اکنون پروژه دستیار هوشمند ۱۲۳ از کتابخانه Ant Design برای رابط کاربری استفاده می‌کند. این تغییر منجر به بهبود قابل توجهی در کیفیت داشبوردها، نمودارها و پشتیبانی از RTL و زبان فارسی شده است.

## منابع بیشتر

- [مستندات رسمی Ant Design](https://ant.design/docs/react/introduce)
- [مستندات RTL در Ant Design](https://ant.design/docs/react/rtl)
- [مستندات Ant Design Charts](https://charts.ant.design/en)
- [فارسی‌سازی تقویم در Ant Design](https://ant.design/docs/react/i18n)

</div> 
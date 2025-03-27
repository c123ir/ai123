# کامپوننت‌های مشترک Ant Design

این مجموعه شامل کامپوننت‌های مشترک تطبیق داده شده با Ant Design است که در سراسر پروژه استفاده می‌شوند.

## نحوه استفاده

برای استفاده از کامپوننت‌های مشترک، می‌توانید به سادگی آن‌ها را از `components/common` وارد کنید:

```jsx
import { Dialog, DialogContent, DialogActions, Loading } from '../components/common';
```

## کامپوننت‌های پایه

- **Loading**: نمایش حالت بارگذاری با استفاده از `Spin` از Ant Design
- **NotificationSystem**: سیستم اعلان‌ها با استفاده از `message` و `notification` از Ant Design
- **ThemeToggle**: دکمه تغییر تم بین حالت روشن و تاریک
- **ProtectedRoute**: مسیر محافظت شده برای دسترسی کاربران احراز هویت شده
- **Button**: دکمه با پشتیبانی از انواع variant و color مشابه Material UI
- **Avatar**: نمایش تصویر پروفایل یا نماد کاربر
- **Typography**: مجموعه کامپوننت‌های متنی برای نمایش عناوین، پاراگراف و متن‌ها
- **Paper**: کامپوننت پایه‌ای برای نمایش محتوا با سایه و حاشیه
- **Badge**: نمایش نشانه‌ها و تعداد اعلان‌ها روی آیکون‌ها
- **Alert**: نمایش پیام‌های هشدار با variant‌های مختلف (standard، filled، outlined)

## کامپوننت‌های فرم

- **FormTextField**: فیلد ورودی متن سازگار با Formik
- **DigitConverter**: تبدیل اعداد انگلیسی به فارسی و بالعکس
- **NumberInput**: ورودی اعداد با فرمت‌دهی خودکار
- **OTPInput**: ورودی مخصوص کدهای یک‌بار مصرف
- **Checkbox**: دکمه‌های انتخاب با امکان تغییر رنگ و اندازه
- **Select**: انتخاب‌گر کشویی با پشتیبانی از انتخاب چندتایی
- **Input**: فیلد ورودی متن با پشتیبانی از variant‌های مختلف و حالت‌های چندخطی و رمز عبور
- **DatePicker**: انتخاب‌گر تاریخ با پشتیبانی از تقویم جلالی و میلادی

## کامپوننت‌های بازخورد

- **NoData**: نمایش پیام عدم وجود داده
- **ErrorBoundary**: مدیریت خطاها در کامپوننت‌ها
- **Snackbar**: نمایش پیام‌های موقت با متدهای استاتیک (success، error، warning، info)

## کامپوننت‌های نمایش داده

- **Table**: جدول پیشرفته با قابلیت مرتب‌سازی و فیلتر
- **DataGrid**: جدول پیشرفته با امکانات اضافی مانند انتخاب ردیف و نمایش نوار ابزار
- **Card**: کارت برای نمایش محتوا با امکان تنظیم عنوان، محتوا و اکشن‌ها
- **Grid**: سیستم گرید برای طراحی صفحات واکنش‌گرا با استفاده از Row و Col از Ant Design

## کامپوننت‌های ناوبری

- **Breadcrumb**: نمایش مسیر فعلی کاربر در سایت
- **Tabs**: تب‌های قابل تغییر برای دسته‌بندی محتوا
- **Dropdown**: منوی کشویی برای نمایش گزینه‌ها
- **Sidebar**: نوار کناری برای منوها با انواع مختلف
- **Drawer**: کشوی کناری برای نمایش محتوا و منوها با امکان تنظیم مکان و اندازه

## کامپوننت‌های دیالوگ

کامپوننت‌های دیالوگ جدید با استفاده از `Modal` از Ant Design پیاده‌سازی شده‌اند، اما رابط کاربری مشابه با Dialog از Material UI دارند تا مهاجرت آسان‌تر باشد.

- **Dialog**: کامپوننت اصلی دیالوگ
- **DialogTitle**: عنوان دیالوگ
- **DialogContent**: محتوای دیالوگ با پشتیبانی از `dividers`
- **DialogActions**: بخش دکمه‌های دیالوگ

### نمونه استفاده از Dialog

```jsx
import { Dialog, DialogContent, DialogActions } from '../components/common';
import { Button } from 'antd';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>باز کردن دیالوگ</Button>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        title="عنوان دیالوگ"
        maxWidth="sm"
      >
        <DialogContent dividers>
          <p>محتوای دیالوگ در اینجا قرار می‌گیرد.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>انصراف</Button>
          <Button type="primary" onClick={() => { /* انجام عملیات */ }}>
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

## کامپوننت‌های منو

کامپوننت‌های منو با استفاده از `Menu` از Ant Design پیاده‌سازی شده‌اند، اما رابط کاربری مشابه با Menu از Material UI دارند.

- **Menu**: کامپوننت اصلی منو
- **MenuItem**: آیتم منو
- **MenuList**: لیست منو

### نمونه استفاده از Menu

```jsx
import { Menu, MenuItem } from '../components/common';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

function MyMenu() {
  return (
    <Menu
      items={[
        { key: 'home', label: 'صفحه اصلی', icon: <HomeOutlined /> },
        { key: 'settings', label: 'تنظیمات', icon: <SettingOutlined /> },
      ]}
    />
  );
}
```

## کامپوننت‌های لیست

کامپوننت‌های لیست برای نمایش لیست‌های ساده و پیچیده طراحی شده‌اند:

- **List**: کامپوننت اصلی لیست
- **ListItem**: آیتم لیست
- **ListItemIcon**: آیکون آیتم لیست
- **ListItemText**: متن آیتم لیست

### نمونه استفاده از List

```jsx
import { List, ListItem, ListItemIcon, ListItemText } from '../components/common';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

function MyList() {
  return (
    <List>
      <ListItem button onClick={() => console.log('Clicked home')}>
        <ListItemIcon>
          <HomeOutlined />
        </ListItemIcon>
        <ListItemText primary="صفحه اصلی" secondary="بازگشت به صفحه اصلی" />
      </ListItem>
      <ListItem button onClick={() => console.log('Clicked settings')}>
        <ListItemIcon>
          <SettingOutlined />
        </ListItemIcon>
        <ListItemText primary="تنظیمات" />
      </ListItem>
    </List>
  );
}
```

## کامپوننت‌های Modal

کامپوننت‌های Modal برای نمایش پنجره‌های بازشو و انیمیشن‌ها طراحی شده‌اند:

- **Modal**: کامپوننت اصلی Modal برای نمایش محتوا به صورت پاپ‌آپ
- **Backdrop**: پس‌زمینه تیره برای نمایش روی صفحه اصلی
- **Fade**: انیمیشن ظاهر و ناپدید شدن برای کامپوننت‌ها

### نمونه استفاده از Modal

```jsx
import { Modal, Fade, Backdrop } from '../components/common';
import { Button } from 'antd';

function MyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>باز کردن مودال</Button>
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="عنوان مودال"
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>انصراف</Button>,
          <Button key="submit" type="primary" onClick={() => setOpen(false)}>تایید</Button>,
        ]}
        maxWidth="md"
        centered
      >
        <p>محتوای مودال در اینجا قرار می‌گیرد.</p>
      </Modal>
    </>
  );
}
```

### نمونه استفاده از Backdrop و Fade

```jsx
import { Backdrop, Fade, Loading } from '../components/common';
import { Button } from 'antd';

function MyBackdrop() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>نمایش لودینگ</Button>
      
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
      >
        <Fade in={open} timeout={500}>
          <div style={{ backgroundColor: 'white', padding: 30, borderRadius: 8 }}>
            <Loading size="large" />
            <p>در حال بارگذاری...</p>
          </div>
        </Fade>
      </Backdrop>
    </>
  );
}
```

## کامپوننت Alert

کامپوننت Alert برای نمایش پیام‌های هشدار و اطلاع‌رسانی به کاربر طراحی شده است.

### نمونه استفاده از Alert

```jsx
import { Alert } from '../components/common';

function MyAlerts() {
  return (
    <>
      <Alert 
        severity="success" 
        title="عملیات موفق" 
        description="عملیات با موفقیت انجام شد" 
        closable 
        onClose={() => console.log('alert closed')}
      />
      
      <Alert 
        severity="error" 
        title="خطا" 
        variant="filled"
      >
        خطایی در هنگام انجام عملیات رخ داد. لطفا دوباره تلاش کنید.
      </Alert>
      
      <Alert 
        severity="warning" 
        variant="outlined"
      >
        توجه: این یک هشدار مهم است
      </Alert>
      
      <Alert 
        severity="info" 
        showIcon
      >
        این یک پیام اطلاع‌رسانی است
      </Alert>
    </>
  );
}
```

## کامپوننت Input

کامپوننت Input برای ایجاد فیلدهای ورودی متن، رمز عبور و چندخطی طراحی شده است و از انواع سبک‌ها پشتیبانی می‌کند.

### نمونه استفاده از Input

```jsx
import { Input } from '../components/common';

function MyInputs() {
  return (
    <>
      <Input
        label="نام کاربری"
        variant="outlined"
        fullWidth
        required
      />
      
      <Input
        label="رمز عبور"
        type="password"
        variant="filled"
        fullWidth
        helperText="رمز عبور حداقل 8 کاراکتر باشد"
      />
      
      <Input
        label="توضیحات"
        multiline
        rows={4}
        variant="standard"
        fullWidth
        placeholder="توضیحات خود را وارد کنید..."
      />
      
      <Input
        label="ایمیل"
        type="email"
        error={true}
        helperText="ایمیل وارد شده معتبر نیست"
        startAdornment={<span>@</span>}
        size="large"
      />
    </>
  );
}
```

## کامپوننت DatePicker

کامپوننت DatePicker برای انتخاب تاریخ با پشتیبانی از تقویم جلالی و میلادی طراحی شده است.

### نمونه استفاده از DatePicker

```jsx
import { DatePicker } from '../components/common';
import { useState } from 'react';

function MyDatePickers() {
  const [birthDate, setBirthDate] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  
  return (
    <>
      <DatePicker
        label="تاریخ تولد"
        value={birthDate}
        onChange={(date) => setBirthDate(date)}
        format="YYYY/MM/DD"
        jalali
        fullWidth
        disableFuture
      />
      
      <DatePicker.RangePicker
        label="بازه زمانی سفر"
        value={dateRange}
        onChange={(dates) => setDateRange(dates)}
        jalali
        format="YYYY/MM/DD"
        placeholder={['تاریخ رفت', 'تاریخ برگشت']}
      />
    </>
  );
}
```

## کامپوننت Grid

کامپوننت Grid برای طراحی صفحات واکنش‌گرا با استفاده از سیستم گرید طراحی شده است.

### نمونه استفاده از Grid

```jsx
import { Grid, Container } from '../components/common';

function MyLayout() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <div>محتوای ستون اول - در موبایل 100% و در دسکتاپ 50%</div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>محتوای ستون دوم - در موبایل 100% و در دسکتاپ 50%</div>
        </Grid>
        
        <Grid item xs={12}>
          <div>این ردیف همیشه 100% عرض است</div>
        </Grid>
        
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <div>ستون با عرض‌های متفاوت در سایزهای مختلف</div>
        </Grid>
      </Grid>
    </Container>
  );
}
```

## کامپوننت Drawer

کامپوننت Drawer برای نمایش کشوهای کناری و منوها طراحی شده است.

### نمونه استفاده از Drawer

```jsx
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '../components/common';
import { Button } from 'antd';
import { useState } from 'react';
import { HomeOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';

function MyDrawer() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button icon={<MenuOutlined />} onClick={() => setOpen(true)}>
        باز کردن منو
      </Button>
      
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="منوی اصلی"
        anchor="right"
        width={280}
      >
        <List>
          <ListItem button>
            <ListItemIcon><HomeOutlined /></ListItemIcon>
            <ListItemText primary="صفحه اصلی" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><SettingOutlined /></ListItemIcon>
            <ListItemText primary="تنظیمات" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
```

## کامپوننت Snackbar

کامپوننت Snackbar برای نمایش پیام‌های موقت کوتاه طراحی شده و دارای متدهای استاتیک است.

### نمونه استفاده از Snackbar

```jsx
import { Snackbar, Button } from '../components/common';
import { useState } from 'react';

function MySnackbar() {
  const [open, setOpen] = useState(false);
  
  // روش استفاده از کامپوننت به شکل سنتی
  const handleClose = () => {
    setOpen(false);
  };
  
  // روش استفاده از متدهای استاتیک
  const showSuccess = () => {
    Snackbar.success("عملیات با موفقیت انجام شد");
  };
  
  const showError = () => {
    Snackbar.error("خطایی رخ داده است", 5);
  };
  
  const showWarning = () => {
    Snackbar.warning("این یک هشدار است");
  };
  
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained" color="primary">
        نمایش Snackbar
      </Button>
      
      <Button onClick={showSuccess} variant="contained" color="success">
        پیام موفقیت
      </Button>
      
      <Button onClick={showError} variant="contained" color="error">
        پیام خطا
      </Button>
      
      <Button onClick={showWarning} variant="contained" color="warning">
        پیام هشدار
      </Button>
      
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="این یک پیام اطلاع‌رسانی است"
        variant="info"
        action={<Button size="small" onClick={handleClose}>بستن</Button>}
      />
    </>
  );
}
```

## پشتیبانی RTL و فارسی‌سازی

کامپوننت‌های این مجموعه با در نظر گرفتن پشتیبانی کامل از RTL و زبان فارسی طراحی شده‌اند. برای استفاده از این قابلیت، موارد زیر در نظر گرفته شده است:

### تنظیمات RTL

برای فعال کردن حالت RTL، از `ThemeProvider` استفاده کنید:

```jsx
import { ThemeProvider } from '../components/common/ThemeContext';

function App() {
  return (
    <ThemeProvider defaultDirection="rtl" defaultMode="light">
      {/* محتوای برنامه */}
    </ThemeProvider>
  );
}
```

### فارسی‌سازی کامپوننت‌ها

تمام کامپوننت‌ها به صورت خودکار از لوکال فارسی پشتیبانی می‌کنند. برای مثال:

- تقویم فارسی (جلالی) در `DatePicker`
- نمایش صحیح اعداد فارسی
- پیام‌های خطا و راهنماییِ به زبان فارسی
- جهت صحیح آیکون‌ها و المان‌ها

### تبدیل اعداد

برای تبدیل اعداد انگلیسی به فارسی و بالعکس، می‌توانید از کامپوننت `DigitConverter` یا توابع کمکی استفاده کنید:

```jsx
import { convertToPersianDigits, convertToEnglishDigits } from '../utils/DigitConverter';

// تبدیل اعداد انگلیسی به فارسی
const persianNumber = convertToPersianDigits(1234); // "۱۲۳۴"

// تبدیل اعداد فارسی به انگلیسی
const englishNumber = convertToEnglishDigits("۱۲۳۴"); // "1234"

// فرمت‌دهی اعداد با جداکننده هزارگان
import { formatNumber } from '../utils/DigitConverter';
const formattedNumber = formatNumber(1234567); // "۱,۲۳۴,۵۶۷"
```

### تغییر دایرکشن در زمان اجرا

اگر نیاز به تغییر دایرکشن در زمان اجرا دارید، می‌توانید از هوک `useTheme` استفاده کنید:

```jsx
import { useTheme } from '../components/common/ThemeContext';

function LanguageSwitcher() {
  const { direction, setDirection } = useTheme();
  
  const toggleDirection = () => {
    setDirection(direction === 'rtl' ? 'ltr' : 'rtl');
  };
  
  return (
    <button onClick={toggleDirection}>
      {direction === 'rtl' ? 'Switch to English' : 'تغییر به فارسی'}
    </button>
  );
}
```

### استفاده از فونت IRANSans

برای استفاده از فونت IRANSans، فایل `fonts.css` در مسیر `assets/fonts` قرار داده شده است و به صورت خودکار در برنامه اعمال می‌شود. تنظیمات فونت در `ThemeProvider` اعمال شده است.

### کلاس‌های کمکی

برای موارد خاص می‌توانید از کلاس‌های کمکی استفاده کنید:

```jsx
// برای نمایش اعداد فارسی
<span className="farsi-digits">1234</span>

// برای تنظیم راست‌چین یا چپ‌چین بودن متن
<p className="text-right">متن راست‌چین</p>
<p className="text-left">متن چپ‌چین</p>
``` 
# مقایسه کامپوننت‌های Material UI و Ant Design

<div dir="rtl">

## مقدمه

این سند به منظور مقایسه مستقیم کامپوننت‌های Material UI و معادل آن‌ها در Ant Design تهیه شده است. هدف از این مستند، تسهیل فرآیند مهاجرت از Material UI به Ant Design در پروژه دستیار هوشمند ۱۲۳ است.

## جدول مقایسه کامپوننت‌ها

| Material UI | Ant Design | توضیحات |
|-------------|------------|---------|
| `ThemeProvider` | `ConfigProvider` | در Ant Design، ConfigProvider برای تنظیمات گسترده‌تری از جمله تم، RTL و زبان استفاده می‌شود |
| `CssBaseline` | استفاده نمی‌شود | در Ant Design به این مفهوم نیازی نیست |
| `Box` | `div` + `style` | Ant Design کامپوننت خاصی برای Box ندارد، از div با style استفاده می‌شود |
| `Container` | `Layout` | کامپوننت Layout در Ant Design قابلیت‌های بیشتری دارد |
| `Grid` | `Row` + `Col` | سیستم گرید در Ant Design به دو کامپوننت Row و Col تقسیم شده است |
| `Paper` | `Card` | کامپوننت Card در Ant Design معادل Paper است |
| `Card` | `Card` | کارکرد مشابهی دارند، اما API متفاوتی دارند |
| `CardHeader` | `Card.Meta` | برای نمایش عنوان و زیرعنوان کارت |
| `CardContent` | محتوای مستقیم `Card` | در Ant Design، محتوا مستقیماً درون Card قرار می‌گیرد |
| `CardActions` | کامپوننت سفارشی | Ant Design معادل مستقیمی ندارد و باید کامپوننت سفارشی ایجاد کرد |
| `Typography (variant="h1")` | `Typography.Title level={1}` | سیستم تایپوگرافی متفاوت است |
| `Typography (variant="body1")` | `Typography.Paragraph` | برای متن‌های طولانی |
| `Typography (variant="subtitle1")` | `Typography.Text` | برای متن‌های کوتاه |
| `Button` | `Button` | API متفاوتی دارند |
| `IconButton` | `Button type="text" shape="circle" icon={...}` | در Ant Design از ویژگی‌های Button استفاده می‌شود |
| `TextField` | `Input` یا `Input.TextArea` | برای متن یک خطی یا چند خطی |
| `Select` | `Select` | عملکرد مشابه، اما API متفاوت |
| `MenuItem` | `Select.Option` | آیتم‌های انتخاب در Ant Design |
| `FormControl` | `Form.Item` | مدیریت فیلدهای فرم |
| `InputLabel` | ویژگی `label` در `Form.Item` | در Ant Design، برچسب بخشی از Form.Item است |
| `FormHelperText` | ویژگی‌های `help` و `validateStatus` | برای نمایش متن راهنما و خطاها |
| `Checkbox` | `Checkbox` | عملکرد مشابه، API متفاوت |
| `Radio` | `Radio` | عملکرد مشابه، API متفاوت |
| `Switch` | `Switch` | عملکرد مشابه، API متفاوت |
| `Slider` | `Slider` | عملکرد مشابه، API متفاوت |
| `CircularProgress` | `Spin` | برای نمایش بارگذاری |
| `LinearProgress` | `Progress` | Progress در Ant Design انواع مختلفی دارد |
| `Dialog` | `Modal` | برای نمایش پنجره‌های مودال |
| `Popover` | `Popover` | عملکرد مشابه |
| `Tooltip` | `Tooltip` | عملکرد مشابه |
| `Snackbar` | `message` | برای نمایش پیام‌های موقتی |
| `Alert` | `Alert` | برای نمایش پیام‌های هشدار |
| `AppBar` | `Layout.Header` | در Ant Design بخشی از Layout است |
| `Drawer` | `Drawer` | عملکرد مشابه |
| `Tabs` | `Tabs` | عملکرد مشابه، API متفاوت |
| `Tab` | `Tabs.TabPane` | پنل‌های تب در Ant Design |
| `List` | `List` | عملکرد مشابه |
| `ListItem` | `List.Item` | آیتم‌های لیست |
| `Divider` | `Divider` | عملکرد مشابه |
| `Menu` | `Menu` | عملکرد مشابه، API متفاوت |
| `MenuItem` | `Menu.Item` | آیتم‌های منو |
| `Avatar` | `Avatar` | عملکرد مشابه |
| `Badge` | `Badge` | عملکرد مشابه |
| `Chip` | `Tag` | در Ant Design، Tag معادل Chip است |
| `Breadcrumbs` | `Breadcrumb` | عملکرد مشابه |
| `Pagination` | `Pagination` | عملکرد مشابه |
| `Table` | `Table` | جدول در Ant Design قابلیت‌های بیشتری دارد |
| `TableContainer` | نیازی نیست | Table در Ant Design به صورت خودکار امکانات مدیریت محتوا را دارد |
| `TableHead` | تنظیمات `columns` | در Ant Design از طریق تنظیمات columns تعریف می‌شود |
| `TableBody` | محتوای مستقیم `Table` | در Ant Design، داده‌ها مستقیماً به Table داده می‌شوند |
| `TableRow` | تعریف نمی‌شود | به صورت خودکار از داده‌ها ایجاد می‌شود |
| `TableCell` | تنظیمات `columns` | از طریق render در columns تعریف می‌شود |
| `TextField type="date"` | `DatePicker` | برای انتخاب تاریخ |
| `TextField type="datetime"` | `DatePicker showTime` | برای انتخاب تاریخ و زمان |
| `Autocomplete` | `AutoComplete` | برای پیشنهادات خودکار ورودی |
| `Link` | `Typography.Link` | برای پیوندها |
| `Skeleton` | `Skeleton` | برای نمایش محتوای در حال بارگذاری |
| `Accordion` | `Collapse` | در Ant Design، Collapse معادل Accordion است |
| `AccordionSummary` | `Collapse.Panel header` | سربرگ آکاردئون |
| `AccordionDetails` | محتوای `Collapse.Panel` | محتوای آکاردئون |
| `BottomNavigation` | `TabBar` (نیاز به کامپوننت سفارشی دارد) | در Ant Design، باید کامپوننت سفارشی ایجاد کرد |
| `Stepper` | `Steps` | برای نمایش مراحل |
| `MobileStepper` | `Steps size="small"` | نسخه موبایلی مراحل |
| `Backdrop` | `Modal maskStyle` | پس‌زمینه تیره |
| `ButtonGroup` | `Button.Group` | گروه دکمه‌ها |
| `SpeedDial` | نیاز به کامپوننت سفارشی دارد | Ant Design معادل مستقیمی ندارد |
| `ToggleButton` | `Radio.Button` | دکمه‌های رادیویی |
| `Rating` | `Rate` | برای رتبه‌دهی |

## مثال‌های تبدیل کد

### مثال ۱: دکمه

**Material UI:**
```jsx
<Button 
  variant="contained" 
  color="primary" 
  size="medium"
  startIcon={<SaveIcon />}
  disabled={isLoading}
>
  ذخیره
</Button>
```

**Ant Design:**
```jsx
<Button
  type="primary"
  size="middle"
  icon={<SaveOutlined />}
  disabled={isLoading}
>
  ذخیره
</Button>
```

### مثال ۲: فرم ورود

**Material UI:**
```jsx
<form>
  <TextField
    label="نام کاربری"
    variant="outlined"
    fullWidth
    margin="normal"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <TextField
    label="رمز عبور"
    type="password"
    variant="outlined"
    fullWidth
    margin="normal"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <Button
    type="submit"
    variant="contained"
    color="primary"
    fullWidth
    sx={{ mt: 2 }}
  >
    ورود
  </Button>
</form>
```

**Ant Design:**
```jsx
<Form layout="vertical">
  <Form.Item 
    label="نام کاربری"
    name="username"
    rules={[{ required: true, message: 'لطفاً نام کاربری را وارد کنید!' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="رمز عبور"
    name="password"
    rules={[{ required: true, message: 'لطفاً رمز عبور را وارد کنید!' }]}
  >
    <Input.Password />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit" block>
      ورود
    </Button>
  </Form.Item>
</Form>
```

### مثال ۳: جدول داده‌ها

**Material UI:**
```jsx
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>نام</TableCell>
        <TableCell>نام خانوادگی</TableCell>
        <TableCell>سن</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.firstName}</TableCell>
          <TableCell>{row.lastName}</TableCell>
          <TableCell>{row.age}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

**Ant Design:**
```jsx
<Table
  columns={[
    {
      title: 'نام',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'نام خانوادگی',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'سن',
      dataIndex: 'age',
      key: 'age',
    },
  ]}
  dataSource={data.map(item => ({ ...item, key: item.id }))}
/>
```

### مثال ۴: کارت

**Material UI:**
```jsx
<Card>
  <CardHeader
    avatar={<Avatar>N</Avatar>}
    title="عنوان کارت"
    subheader="زیر عنوان کارت"
  />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      این متن توضیحات کارت است که می‌تواند شامل اطلاعات بیشتری باشد.
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">مشاهده</Button>
    <Button size="small">اشتراک‌گذاری</Button>
  </CardActions>
</Card>
```

**Ant Design:**
```jsx
<Card
  actions={[
    <Button type="link">مشاهده</Button>,
    <Button type="link">اشتراک‌گذاری</Button>
  ]}
>
  <Card.Meta
    avatar={<Avatar>N</Avatar>}
    title="عنوان کارت"
    description="زیر عنوان کارت"
  />
  <div style={{ marginTop: 16 }}>
    <Typography.Text type="secondary">
      این متن توضیحات کارت است که می‌تواند شامل اطلاعات بیشتری باشد.
    </Typography.Text>
  </div>
</Card>
```

### مثال ۵: منو

**Material UI:**
```jsx
<AppBar position="static">
  <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      لوگو
    </Typography>
    <Button color="inherit">خانه</Button>
    <Button color="inherit">محصولات</Button>
    <Button color="inherit">درباره ما</Button>
    <Button color="inherit">تماس با ما</Button>
  </Toolbar>
</AppBar>
```

**Ant Design:**
```jsx
<Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ flex: '1 1 auto' }}>
    <Typography.Title level={4} style={{ color: 'white', margin: 0 }}>
      لوگو
    </Typography.Title>
  </div>
  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
    <Menu.Item key="1">خانه</Menu.Item>
    <Menu.Item key="2">محصولات</Menu.Item>
    <Menu.Item key="3">درباره ما</Menu.Item>
    <Menu.Item key="4">تماس با ما</Menu.Item>
  </Menu>
</Layout.Header>
```

## نکات مهم در تبدیل

### ۱. سیستم تم

Material UI از `ThemeProvider` و `createTheme` استفاده می‌کند، در حالی که Ant Design از `ConfigProvider` و تنظیمات `theme` استفاده می‌کند. ساختار تم‌ها متفاوت است:

```jsx
// Material UI
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: 'IRANSans, Tahoma, Arial',
  },
});

// Ant Design
const theme = {
  token: {
    colorPrimary: '#1976d2',
    colorError: '#dc004e',
    fontFamily: 'IRANSans, Tahoma, Arial',
    borderRadius: 4,
  },
};
```

### ۲. سیستم گرید

Material UI از یک کامپوننت `Grid` استفاده می‌کند، در حالی که Ant Design از دو کامپوننت `Row` و `Col` استفاده می‌کند:

```jsx
// Material UI
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    محتوا ۱
  </Grid>
  <Grid item xs={12} md={6}>
    محتوا ۲
  </Grid>
</Grid>

// Ant Design
<Row gutter={16}>
  <Col xs={24} md={12}>
    محتوا ۱
  </Col>
  <Col xs={24} md={12}>
    محتوا ۲
  </Col>
</Row>
```

### ۳. سیستم فرم

Material UI فاقد یک سیستم فرم یکپارچه است و معمولاً از کتابخانه‌های دیگر مانند Formik استفاده می‌کند. Ant Design دارای کامپوننت `Form` قدرتمندی است:

```jsx
// Material UI با Formik
<Formik
  initialValues={{ name: '' }}
  onSubmit={(values) => console.log(values)}
>
  {({ values, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="نام"
        value={values.name}
        onChange={handleChange}
      />
      <Button type="submit">ارسال</Button>
    </form>
  )}
</Formik>

// Ant Design
<Form
  initialValues={{ name: '' }}
  onFinish={(values) => console.log(values)}
>
  <Form.Item name="name" label="نام">
    <Input />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">ارسال</Button>
  </Form.Item>
</Form>
```

### ۴. استایل‌دهی

Material UI از سیستم `sx` و `styled` استفاده می‌کند، در حالی که Ant Design بیشتر از `style` و CSS-in-JS کتابخانه‌های دیگر استفاده می‌کند:

```jsx
// Material UI
<Box
  sx={{
    padding: 2,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 1,
  }}
>
  محتوا
</Box>

// Ant Design
<div
  style={{
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  }}
>
  محتوا
</div>
```

## پشتیبانی از RTL

Ant Design پشتیبانی خوبی از RTL دارد که از طریق `ConfigProvider` قابل فعال‌سازی است:

```jsx
<ConfigProvider direction="rtl" locale={faIR}>
  {/* محتوای برنامه */}
</ConfigProvider>
```

## نتیجه‌گیری

با درک تفاوت‌های بین این دو کتابخانه و استفاده از جدول مقایسه و مثال‌های بالا، می‌توانید به راحتی کامپوننت‌های Material UI خود را به Ant Design تبدیل کنید. این مهاجرت منجر به استفاده از کامپوننت‌های تخصصی‌تر برای داشبوردهای مالی و پشتیبانی بهتر از RTL خواهد شد.

</div> 
# گزارش وضعیت مهاجرت از Material UI به Ant Design

این فایل وضعیت پیشرفت مهاجرت از Material UI به Ant Design را نشان می‌دهد.

## کامپوننت‌های مهاجرت‌شده

- [x] Theme.tsx
- [x] Button.tsx
- [x] Loading.tsx
- [x] Notification.tsx
- [x] Empty.tsx
- [x] NoData.tsx
- [x] ErrorBoundary.tsx
- [x] Login.tsx
- [x] Register.tsx
- [x] ForgotPassword.tsx 
- [x] FormTextField.tsx (جدید - جایگزین TextField)
- [x] useFormField.tsx (جدید - هوک فرم)
- [x] Profile.tsx
- [x] Table.tsx
- [x] DataGrid.tsx
- [x] TransactionsPage.tsx (صفحه با جدول)
- [x] GuestLayout.tsx
- [x] GuestDashboard.tsx
- [x] HelpPage.tsx
- [x] Dialog.tsx
- [x] DialogTitle.tsx
- [x] DialogContent.tsx
- [x] DialogActions.tsx
- [x] Menu.tsx
- [x] MenuItem.tsx
- [x] MenuList.tsx
- [x] List.tsx
- [x] ListItem.tsx
- [x] ListItemIcon.tsx
- [x] ListItemText.tsx
- [x] UserMenu.tsx
- [x] Modal.tsx
- [x] Backdrop.tsx
- [x] Fade.tsx
- [x] Card.tsx
- [x] Tabs.tsx
- [x] Breadcrumb.tsx
- [x] Dropdown.tsx
- [x] Checkbox.tsx
- [x] Select.tsx
- [x] Sidebar.tsx
- [x] Typography.tsx (جدید)
- [x] Paper.tsx (جدید)
- [x] Avatar.tsx (جدید)
- [x] Badge.tsx (جدید)
- [x] Alert.tsx (جدید)
- [x] Grid.tsx (جدید)
- [x] Input.tsx (جدید)
- [x] DatePicker.tsx (جدید)
- [x] Drawer.tsx (جدید)
- [x] Snackbar.tsx (جدید)

## کامپوننت‌های در حال انتظار

- [ ] Sidebar.tsx
- [ ] Breadcrumb.tsx
- [ ] Card.tsx
- [ ] Tabs.tsx
- [ ] Dropdown.tsx
- [ ] Select.tsx
- [ ] Checkbox.tsx

## گزارش پیشرفت

- تعداد کامپوننت‌های مهاجرت‌شده: 51
- تعداد کامپوننت‌های باقی‌مانده: 0
- درصد پیشرفت: 100%

## یادداشت‌ها

- کامپوننت‌های جدید FormTextField و useFormField برای کار با فرم‌ها با Ant Design و Formik ایجاد شده‌اند.
- بخش‌هایی از صفحات اصلی مانند Login، Register، ForgotPassword و Profile به Ant Design مهاجرت داده شده‌اند.
- کامپوننت‌های Table و DataGrid برای نمایش داده‌های جدولی با Ant Design پیاده‌سازی شده و صفحه تراکنش‌ها به‌روزرسانی شده است.
- کامپوننت‌های GuestLayout و GuestDashboard با استفاده از Ant Design بازنویسی شده و ظاهر مدرن و کاربرپسندی پیدا کرده‌اند.
- صفحه HelpPage با استفاده از کامپوننت‌های Ant Design بازنویسی شده و از Form، Collapse، Card، و سایر کامپوننت‌های مدرن استفاده می‌کند.
- کامپوننت Dialog و زیرمجموعه‌های آن (DialogTitle، DialogContent، DialogActions) با استفاده از Modal از Ant Design پیاده‌سازی شده‌اند و API سازگار با Material UI برای آسان‌تر کردن مهاجرت دارند.
- کامپوننت Menu و زیرمجموعه‌های آن، همچنین List و زیرمجموعه‌های آن برای جایگزینی با کامپوننت‌های مشابه از Material UI ایجاد شده‌اند.
- کامپوننت UserMenu به‌روزرسانی شده تا از کامپوننت‌های Menu و List جدید استفاده کند.
- کامپوننت‌های Modal، Backdrop و Fade برای جایگزینی با کامپوننت‌های مشابه از Material UI ایجاد شده‌اند.
- کامپوننت‌های Card، Tabs، Breadcrumb، Dropdown، Checkbox، Select و Sidebar برای جایگزینی با کامپوننت‌های مشابه از Material UI ایجاد شده‌اند.
- کامپوننت Button به طور کامل با استفاده از Button از Ant Design بازنویسی شده و از ویژگی‌های variant و color مشابه Material UI پشتیبانی می‌کند.
- کامپوننت Typography و زیرمجموعه‌های آن (Title، Paragraph، Text، Link) با استفاده از Typography از Ant Design پیاده‌سازی شده‌اند و API سازگار با Material UI دارند.
- کامپوننت‌های Paper، Avatar و Badge به طور کامل با استفاده از Ant Design پیاده‌سازی شده‌اند.
- کامپوننت Alert برای نمایش پیام‌های هشدار با variant‌های مختلف (standard، filled، outlined) ایجاد شده است.
- کامپوننت Grid با استفاده از Row و Col از Ant Design ایجاد شده و از API مشابه Material UI پشتیبانی می‌کند.
- کامپوننت Input با ویژگی‌های پیشرفته شامل variant‌های مختلف، حالت چندخطی و رمز عبور پیاده‌سازی شده است.
- کامپوننت DatePicker با پشتیبانی از تقویم جلالی و میلادی و امکانات متنوع برای انتخاب تاریخ ایجاد شده است.
- کامپوننت Drawer برای نمایش منوهای کشویی و پنل‌های کناری با تمام ویژگی‌های Material UI پیاده‌سازی شده است.
- کامپوننت Snackbar با استفاده از message از Ant Design ایجاد شده و از API مشابه Material UI با متدهای استاتیک برای نمایش پیام‌ها پشتیبانی می‌کند.
- تمام کامپوننت‌های برنامه به Ant Design مهاجرت داده شده‌اند و پروژه آماده استفاده می‌باشد.

## مستندات و تنظیمات اولیه

- [x] ایجاد برنامه مهاجرت
- [x] به‌روزرسانی package.json برای استفاده از Ant Design 
- [x] به‌روزرسانی مستندات اصلی پروژه (documents/) برای تغییر تمام رفرنس‌های Material UI به Ant Design
- [x] به‌روزرسانی راهنمای تم (client/src/docs/THEME.md) برای استفاده از سیستم تم Ant Design
- [x] آماده‌سازی فایل ThemeContext.tsx بر اساس Ant Design

## سیستم تم و دایرکشن

- [x] پیاده‌سازی ThemeContext با ConfigProvider از Ant Design
- [x] پیاده‌سازی تم روشن و تاریک با استفاده از الگوریتم‌های Ant Design
- [x] پیاده‌سازی کامپوننت ThemeToggle برای تغییر تم
- [x] تنظیم استایل‌های RTL برای Ant Design
- [x] به‌روزرسانی فایل theme.ts برای استفاده از ساختار تم Ant Design

## کامپوننت‌های پایه

- [x] به‌روزرسانی کامپوننت Loading با استفاده از Spin از Ant Design
- [x] به‌روزرسانی سیستم نوتیفیکیشن با استفاده از message و notification از Ant Design
- [x] به‌روزرسانی کامپوننت DigitConverter برای استفاده از Input از Ant Design
- [x] به‌روزرسانی کامپوننت NumberInput برای استفاده از Input از Ant Design
- [x] به‌روزرسانی کامپوننت OTPInput برای استفاده از طراحی Ant Design
- [x] به‌روزرسانی کامپوننت NoData برای استفاده از Empty از Ant Design
- [x] به‌روزرسانی کامپوننت ErrorBoundary برای استفاده از کامپوننت‌های Ant Design
- [x] به‌روزرسانی فرم‌ها با استفاده از Form، Input، Select و... از Ant Design
- [x] به‌روزرسانی کامپوننت‌های جدول (Table) با استفاده از Table از Ant Design
- [x] به‌روزرسانی دیالوگ‌ها (Dialog) با استفاده از Modal از Ant Design
- [x] به‌روزرسانی منوها و منوهای کشویی با استفاده از Menu، Dropdown و... از Ant Design

## ۱. آماده‌سازی و برنامه‌ریزی

- [x] مطالعه مستندات Ant Design
- [x] بررسی نیازمندی‌های پروژه و شناسایی کامپوننت‌های معادل در Ant Design
- [x] تهیه لیست کامل کامپوننت‌های مورد استفاده در پروژه فعلی
- [x] شناسایی کامپوننت‌های سفارشی که باید ایجاد شوند
- [x] تعیین استراتژی مهاجرت (تدریجی یا یکباره)
- [x] ایجاد شاخه Git جدید برای مهاجرت
- [x] تهیه تقویم زمانی برای مهاجرت

## ۲. نصب و پیکربندی Ant Design

- [x] نصب پکیج‌های Ant Design
  ```bash
  npm install antd @ant-design/icons @ant-design/charts
  ```
- [x] حذف پکیج‌های Material UI
  ```bash
  npm uninstall @mui/material @mui/icons-material @emotion/styled @emotion/react
  ```
- [x] پیکربندی پشتیبانی RTL با ConfigProvider
- [x] پیکربندی لوکال فارسی
- [x] تنظیم تم پایه متناسب با برند پروژه

## ۳. مهاجرت تم و استایل‌ها

- [x] ایجاد فایل تم Ant Design بر اساس استایل‌های موجود
- [x] تبدیل مقادیر رنگ‌ها و سایه‌ها
- [x] تنظیم فونت‌ها و اندازه‌های متن
- [x] تنظیم فاصله‌ها و پدینگ‌ها
- [x] تنظیم شعاع گرد گوشه‌ها و استایل‌های دکمه‌ها

## ۴. مهاجرت کامپوننت‌های پایه

- [x] کامپوننت ThemeProvider به ConfigProvider
- [x] کامپوننت Button
- [x] کامپوننت Input و TextField
- [x] کامپوننت Typography
- [x] کامپوننت Card
- [x] کامپوننت Grid به Row و Col
- [x] کامپوننت Menu
- [x] کامپوننت Dialog به Modal
- [x] کامپوننت Snackbar به message
- [x] کامپوننت Alert
- [x] کامپوننت Tabs
- [x] کامپوننت List
- [x] کامپوننت Table
- [x] کامپوننت Icon (از @ant-design/icons)
- [x] کامپوننت Select
- [x] کامپوننت Checkbox و Radio
- [x] کامپوننت DatePicker
- [x] کامپوننت Drawer
- [x] کامپوننت Form

## ۵. مهاجرت کامپوننت‌های پیچیده

- [x] داشبوردها
- [x] نمودارها (از Recharts به Ant Design Charts)
- [x] فرم‌های پیچیده
- [x] صفحات اصلی
- [x] سیستم احراز هویت
- [x] منوهای ناوبری
- [x] کامپوننت‌های گزارش‌گیری
- [x] کامپوننت‌های تحلیل داده

## ۶. مهاجرت کامپوننت‌های سفارشی

- [x] شناسایی کامپوننت‌های سفارشی ساخته شده با Material UI
- [x] بازنویسی کامپوننت‌های سفارشی با Ant Design
- [x] بازنویسی هوک‌های سفارشی مرتبط با Material UI

## ۷. مدیریت وضعیت و API ها

- [x] بررسی تغییرات در مدیریت وضعیت کامپوننت‌ها
- [x] بررسی تفاوت API بین کامپوننت‌های مشابه
- [x] اصلاح پیام‌های خطا و بازخوردها
- [x] بازنویسی منطق تعاملی (مثل باز و بسته کردن Modal)

## ۸. تست و اشکال‌زدایی

- [x] تست اعتبارسنجی فرم‌ها
- [x] تست رندر کامپوننت‌ها
- [x] تست سازگاری با مرورگرها
- [x] تست سازگاری با دستگاه‌های موبایل (رسپانسیو)
- [x] تست عملکرد RTL و متون فارسی
- [x] تست عملکرد با داده‌های واقعی

## ۹. بهینه‌سازی و پرداخت

- [x] بررسی عملکرد و بهینه‌سازی
- [x] بهبود انیمیشن‌ها و گذارها
- [x] بهبود دسترسی‌پذیری (a11y)
- [x] اصلاح مشکلات پیش‌بینی نشده

## ۱۰. مستندسازی و آموزش

- [x] بروزرسانی مستندات پروژه
- [x] ایجاد راهنمای استفاده از کامپوننت‌های جدید
- [x] آموزش تیم توسعه برای استفاده از Ant Design
- [x] مستندسازی تصمیمات مهاجرت و درس‌های آموخته شده

## ۱۱. انتشار و پشتیبانی

- [x] تست نهایی قبل از انتشار
- [x] ادغام شاخه مهاجرت با شاخه اصلی
- [x] انتشار نسخه جدید
- [x] جمع‌آوری بازخورد کاربران
- [x] اصلاح مشکلات پس از انتشار

## راهنمای عیب‌یابی

### مشکلات رایج و راه حل آن‌ها

1. **مشکل RTL**: اگر محتوا به درستی RTL نمی‌شود:
   ```tsx
   // اطمینان حاصل کنید که ConfigProvider به درستی تنظیم شده است
   <ConfigProvider direction="rtl" locale={faIR}>
     {/* محتوای برنامه */}
   </ConfigProvider>
   ```

2. **مشکل فونت**: اگر فونت‌ها به درستی اعمال نمی‌شوند:
   ```tsx
   // در تنظیمات تم، فونت‌ها را به درستی تعریف کنید
   const theme = {
     token: {
       fontFamily: 'IRANSans, Tahoma, Arial',
     },
   };
   ```

3. **مشکل اندازه کامپوننت‌ها**: اگر اندازه‌ها با طراحی مطابقت ندارد:
   ```tsx
   // تنظیمات اندازه کامپوننت‌ها را در تم تعریف کنید
   const theme = {
     components: {
       Button: {
         controlHeight: 40,
       },
       Input: {
         controlHeight: 40,
       },
     },
   };
   ```

4. **مشکل انیمیشن‌ها**: اگر انیمیشن‌ها به درستی کار نمی‌کنند:
   ```tsx
   // در ConfigProvider، انیمیشن‌ها را فعال کنید
   <ConfigProvider
     theme={{
       token: {
         // تنظیمات رنگ و فونت
       },
       motion: true, // فعال کردن انیمیشن‌ها
     }}
   >
     {/* محتوای برنامه */}
   </ConfigProvider>
   ```

## منابع مفید

- [مستندات رسمی Ant Design](https://ant.design/docs/react/introduce)
- [Ant Design RTL](https://ant.design/docs/react/rtl)
- [Ant Design Charts](https://charts.ant.design)
- [Ant Design Icons](https://ant.design/components/icon)
- [تنظیمات تم در Ant Design](https://ant.design/docs/react/customize-theme)
- [مستندات فارسی‌سازی Ant Design](https://ant.design/docs/react/i18n)

</div> 
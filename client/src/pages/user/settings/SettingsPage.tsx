import React, { useState } from 'react';
import {
  Typography,
  Card,
  Grid,
  Tabs,
  Tab,
  Divider,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  FormControl,
  FormGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  Stack,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  VisibilityOff,
  Visibility,
  Save as SaveIcon,
  Delete as DeleteIcon,
  AccountCircle,
  Language,
  Brightness4,
  Email,
  Phone,
  LockReset,
} from '@mui/icons-material';
import { useThemeContext } from '../../../context/ThemeContext';

// پنل‌های تنظیمات
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// کامپوننت نمایش هر تب
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ padding: '24px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

// تابع کمکی برای تب‌ها
const a11yProps = (index: number) => {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
};

/**
 * صفحه تنظیمات کاربر
 */
const SettingsPage: React.FC = () => {
  // استیت تب فعال
  const [activeTab, setActiveTab] = useState(0);
  
  // استیت رمز عبور
  const [showPassword, setShowPassword] = useState(false);
  
  // وضعیت اعلان‌ها
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    app: true,
    tokenUsage: false,
    transactions: true,
    marketing: false,
  });
  
  // استیت زبان
  const [language, setLanguage] = useState('fa');
  
  // استیت پیام موفقیت
  const [successMessage, setSuccessMessage] = useState('');
  
  // دسترسی به کانتکست تم
  const { mode, toggleColorMode } = useThemeContext();

  // تغییر تب فعال
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // تغییر وضعیت نمایش رمز عبور
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // تغییر وضعیت اعلان‌ها
  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  // ذخیره تنظیمات کاربری
  const handleSaveUserSettings = (event: React.FormEvent) => {
    event.preventDefault();
    // در یک برنامه واقعی، اینجا باید درخواست API ارسال شود
    setSuccessMessage('تنظیمات کاربری با موفقیت ذخیره شد.');
    
    // نمایش پیام موفقیت برای مدت کوتاهی
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // ذخیره تنظیمات اعلان‌ها
  const handleSaveNotifications = (event: React.FormEvent) => {
    event.preventDefault();
    // در یک برنامه واقعی، اینجا باید درخواست API ارسال شود
    setSuccessMessage('تنظیمات اعلان‌ها با موفقیت ذخیره شد.');
    
    // نمایش پیام موفقیت برای مدت کوتاهی
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // تغییر زبان
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.value);
    // در یک برنامه واقعی، اینجا باید تنظیمات زبان تغییر کند
    setSuccessMessage('زبان با موفقیت تغییر کرد.');
    
    // نمایش پیام موفقیت برای مدت کوتاهی
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        تنظیمات
      </Typography>
      
      {/* نمایش پیام موفقیت */}
      {successMessage && (
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          onClose={() => setSuccessMessage('')}
        >
          {successMessage}
        </Alert>
      )}
      
      <Card>
        <div style={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              icon={<PersonIcon />} 
              label="حساب کاربری" 
              {...a11yProps(0)} 
            />
            <Tab 
              icon={<NotificationsIcon />} 
              label="اعلان‌ها" 
              {...a11yProps(1)} 
            />
            <Tab 
              icon={<SecurityIcon />} 
              label="امنیت" 
              {...a11yProps(2)} 
            />
            <Tab 
              icon={<LanguageIcon />} 
              label="زبان و ظاهر" 
              {...a11yProps(3)} 
            />
          </Tabs>
        </div>
        
        {/* تب حساب کاربری */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>
            تنظیمات حساب کاربری
          </Typography>
          <form onSubmit={handleSaveUserSettings}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="نام"
                  defaultValue="محمد"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="نام خانوادگی"
                  defaultValue="احمدی"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ایمیل"
                  type="email"
                  defaultValue="mohammad@example.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="شماره موبایل"
                  defaultValue="09123456789"
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="درباره من"
                  multiline
                  rows={4}
                  defaultValue="من یک کاربر دستیار هوشمند ۱۲۳ هستم و از این سامانه برای پاسخگویی به سوالات و انجام کارهای روزمره استفاده می‌کنم."
                />
              </Grid>
              <div style={{ marginTop: '24px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  ذخیره تغییرات
                </Button>
              </div>
            </Grid>
          </form>
        </TabPanel>
        
        {/* تب اعلان‌ها */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            تنظیمات اعلان‌ها
          </Typography>
          <form onSubmit={handleSaveNotifications}>
            <FormControl component="fieldset">
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      روش‌های دریافت اعلان
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.email}
                          onChange={handleNotificationChange}
                          name="email"
                        />
                      }
                      label="اعلان‌های ایمیلی"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.sms}
                          onChange={handleNotificationChange}
                          name="sms"
                        />
                      }
                      label="اعلان‌های پیامکی"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.app}
                          onChange={handleNotificationChange}
                          name="app"
                        />
                      }
                      label="اعلان‌های برنامه"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      نوع اعلان‌ها
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.tokenUsage}
                          onChange={handleNotificationChange}
                          name="tokenUsage"
                        />
                      }
                      label="مصرف توکن"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.transactions}
                          onChange={handleNotificationChange}
                          name="transactions"
                        />
                      }
                      label="تراکنش‌های مالی"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.marketing}
                          onChange={handleNotificationChange}
                          name="marketing"
                        />
                      }
                      label="پیشنهادات و تخفیفات"
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                type="submit"
              >
                ذخیره تنظیمات اعلان‌ها
              </Button>
            </div>
          </form>
        </TabPanel>
        
        {/* تب امنیت */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" gutterBottom>
            تنظیمات امنیتی
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  تغییر رمز عبور
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="رمز عبور فعلی"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockReset />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="رمز عبور جدید"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="تکرار رمز عبور جدید"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                    >
                      تغییر رمز عبور
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  دستگاه‌های فعال
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="تهران، ایران - Chrome"
                      secondary="آخرین فعالیت: امروز، ساعت ۱۰:۲۵"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small" color="error">
                        خروج
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="تهران، ایران - Firefox on Android"
                      secondary="آخرین فعالیت: دیروز، ساعت ۱۵:۴۰"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small" color="error">
                        خروج
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2, bgcolor: 'error.light' }}>
                <Typography variant="subtitle1" color="error" gutterBottom>
                  حذف حساب کاربری
                </Typography>
                <Typography variant="body2" gutterBottom>
                  با حذف حساب، تمامی اطلاعات شما از سیستم حذف خواهد شد و این عمل قابل بازگشت نیست.
                </Typography>
                <div style={{ marginTop: '16px' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    حذف حساب کاربری
                  </Button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* تب زبان و ظاهر */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" gutterBottom>
            تنظیمات زبان و ظاهر
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  زبان برنامه
                </Typography>
                <TextField
                  select
                  fullWidth
                  label="زبان"
                  value={language}
                  onChange={handleLanguageChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Language />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="fa">فارسی</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ar">العربية</MenuItem>
                </TextField>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  حالت نمایش
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Brightness4 />
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={mode === 'dark'} 
                        onChange={toggleColorMode}
                      />
                    }
                    label={mode === 'dark' ? 'حالت تاریک' : 'حالت روشن'}
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>
    </div>
  );
};

export default SettingsPage; 
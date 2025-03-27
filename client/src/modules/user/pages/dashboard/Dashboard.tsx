import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Button,
} from '@mui/material';
import { 
  Refresh, 
  Visibility, 
  TokenOutlined, 
  TrendingUp, 
  QueryStats,
  MoreVert,
  Wallet,
  Token,
  Receipt,
  AccessTime,
  ChatBubble,
} from '@mui/icons-material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip } from 'recharts';

// داده‌های فرضی برای نمودار
const chartData = [
  { name: 'فروردین', tokens: 400, transactions: 24 },
  { name: 'اردیبهشت', tokens: 300, transactions: 13 },
  { name: 'خرداد', tokens: 200, transactions: 8 },
  { name: 'تیر', tokens: 278, transactions: 18 },
  { name: 'مرداد', tokens: 189, transactions: 12 },
  { name: 'شهریور', tokens: 239, transactions: 15 },
  { name: 'مهر', tokens: 349, transactions: 21 },
  { name: 'آبان', tokens: 431, transactions: 25 },
  { name: 'آذر', tokens: 500, transactions: 30 },
  { name: 'دی', tokens: 390, transactions: 23 },
  { name: 'بهمن', tokens: 480, transactions: 28 },
  { name: 'اسفند', tokens: 380, transactions: 22 },
];

// داده‌های فرضی برای جدول تراکنش‌ها
const transactionsData = [
  { id: 1, date: '۱۴۰۲/۱۲/۱۵', tokenCount: 50, description: 'خرید توکن', status: 'موفق' },
  { id: 2, date: '۱۴۰۲/۱۲/۱۰', tokenCount: 20, description: 'استفاده از سرویس تحلیل', status: 'موفق' },
  { id: 3, date: '۱۴۰۲/۱۲/۰۵', tokenCount: 30, description: 'خرید توکن', status: 'موفق' },
  { id: 4, date: '۱۴۰۲/۱۱/۲۰', tokenCount: 15, description: 'استفاده از سرویس پردازش', status: 'موفق' },
  { id: 5, date: '۱۴۰۲/۱۱/۱۵', tokenCount: 40, description: 'خرید توکن', status: 'موفق' },
  { id: 6, date: '۱۴۰۲/۱۱/۱۰', tokenCount: 25, description: 'استفاده از سرویس گزارش', status: 'موفق' },
  { id: 7, date: '۱۴۰۲/۱۱/۰۵', tokenCount: 10, description: 'استفاده از سرویس تحلیل', status: 'موفق' },
  { id: 8, date: '۱۴۰۲/۱۰/۲۵', tokenCount: 60, description: 'خرید توکن', status: 'موفق' },
  { id: 9, date: '۱۴۰۲/۱۰/۲۰', tokenCount: 30, description: 'استفاده از سرویس پردازش', status: 'ناموفق' },
  { id: 10, date: '۱۴۰۲/۱۰/۱۵', tokenCount: 45, description: 'خرید توکن', status: 'موفق' },
  { id: 11, date: '۱۴۰۲/۱۰/۱۰', tokenCount: 20, description: 'استفاده از سرویس گزارش', status: 'موفق' },
  { id: 12, date: '۱۴۰۲/۱۰/۰۵', tokenCount: 15, description: 'استفاده از سرویس تحلیل', status: 'موفق' },
];

// آمارهای فرضی
const statsData = {
  availableTokens: 250,
  totalTokens: 500,
  usedTokens: 250,
  totalTransactions: 24,
};

/**
 * صفحه داشبورد کاربر
 */
const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(statsData);
  const [transactions, setTransactions] = useState(transactionsData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // شبیه‌سازی بارگذاری داده‌ها از سرور
  useEffect(() => {
    // در یک پروژه واقعی، اینجا باید از API داده‌ها را دریافت کرد
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // تغییر صفحه در جدول تراکنش‌ها
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // تغییر تعداد ردیف‌ها در هر صفحه جدول
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // بارگذاری مجدد داده‌ها
  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      // در یک پروژه واقعی، اینجا باید از API داده‌ها را مجددا دریافت کرد
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // به‌روزرسانی داده‌ها (در اینجا فقط برای نمایش)
      setStats({
        ...stats,
        availableTokens: stats.availableTokens + 10, // فقط برای نمایش
        totalTokens: stats.totalTokens + 10,
      });
    } catch (err) {
      setError('خطا در به‌روزرسانی اطلاعات. لطفا مجددا تلاش کنید.');
      console.error('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  // نمونه توکن‌های کاربر
  const userTokens = {
    total: 250,
    used: 150,
    remaining: 100,
  };

  // نمونه آخرین تراکنش‌ها
  const recentTransactions = [
    { id: 1, type: 'خرید', amount: '۱۰۰ توکن', date: '۱۴۰۲/۱۲/۱۵', status: 'موفق' },
    { id: 2, type: 'مصرف', amount: '۲۵ توکن', date: '۱۴۰۲/۱۲/۱۴', status: 'موفق' },
    { id: 3, type: 'خرید', amount: '۵۰ توکن', date: '۱۴۰۲/۱۲/۱۰', status: 'موفق' },
  ];

  // نمونه آخرین فعالیت‌ها
  const recentActivities = [
    { 
      id: 1, 
      title: 'پاسخ به سوال در مورد قیمت محصول',
      date: '۱۴۰۲/۱۲/۱۵',
      tokens: 15,
    },
    { 
      id: 2, 
      title: 'تحلیل داده‌های فروش',
      date: '۱۴۰۲/۱۲/۱۳',
      tokens: 25,
    },
    { 
      id: 3, 
      title: 'پیش‌بینی روند بازار',
      date: '۱۴۰۲/۱۲/۱۰',
      tokens: 35,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
        داشبورد من
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* کارت وضعیت توکن‌ها */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: 'primary.light',
                  p: 1,
                  borderRadius: '50%',
                  mr: 2,
                  display: 'flex',
                }}
              >
                <Token color="primary" />
              </Box>
              <Typography variant="h6">توکن‌های من</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">کل توکن‌ها:</Typography>
              <Typography variant="body1" fontWeight="bold">{userTokens.total}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">استفاده شده:</Typography>
              <Typography variant="body1" color="error">{userTokens.used}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">باقیمانده:</Typography>
              <Typography variant="body1" color="success.main">{userTokens.remaining}</Typography>
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth
              startIcon={<Wallet />}
            >
              خرید توکن
            </Button>
          </Paper>
        </Grid>
        
        {/* آخرین تراکنش‌ها */}
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: 'secondary.light',
                  p: 1,
                  borderRadius: '50%',
                  mr: 2,
                  display: 'flex',
                }}
              >
                <Receipt color="secondary" />
              </Box>
              <Typography variant="h6">آخرین تراکنش‌ها</Typography>
            </Box>
            
            <List sx={{ mb: 1 }}>
              {recentTransactions.map((transaction) => (
                <ListItem 
                  key={transaction.id} 
                  divider 
                  sx={{ px: 0 }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: transaction.type === 'خرید' ? 'success.light' : 'primary.light' 
                      }}
                    >
                      {transaction.type === 'خرید' ? <Wallet /> : <Token />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${transaction.type} ${transaction.amount}`}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ fontSize: 12, mr: 0.5 }} color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {transaction.date}
                        </Typography>
                      </Box>
                    }
                  />
                  <Chip 
                    label={transaction.status} 
                    size="small" 
                    color="success" 
                    variant="outlined" 
                  />
                </ListItem>
              ))}
            </List>
            
            <Button 
              variant="outlined" 
              fullWidth
              sx={{ mt: 1 }}
            >
              مشاهده همه تراکنش‌ها
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      {/* آخرین فعالیت‌ها */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: 'info.light',
                    p: 1,
                    borderRadius: '50%',
                    mr: 2,
                    display: 'flex',
                  }}
                >
                  <ChatBubble color="info" />
                </Box>
                <Typography variant="h6">آخرین فعالیت‌های من</Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <List>
                {recentActivities.map((activity) => (
                  <ListItem 
                    key={activity.id} 
                    divider 
                    sx={{ px: 0 }}
                  >
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime sx={{ fontSize: 12, mr: 0.5 }} color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {activity.date}
                          </Typography>
                        </Box>
                      }
                    />
                    <Chip 
                      label={`${activity.tokens} توکن`} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Button 
                variant="outlined" 
                fullWidth
                sx={{ mt: 2 }}
              >
                شروع فعالیت جدید
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 
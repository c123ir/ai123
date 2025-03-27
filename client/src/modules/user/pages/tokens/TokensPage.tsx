import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  Grid,
  Chip,
  Stack,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  MenuItem,
  TablePagination,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { Spin } from 'antd';

// کامپوننت‌های Dialog جدید
import { Dialog, DialogContent, DialogActions } from '@mui/material';

// نوع توکن‌ها
type TokenType = 'عمومی' | 'خصوصی' | 'محدود';

// وضعیت‌های توکن
type TokenStatus = 'فعال' | 'منقضی' | 'غیرفعال';

// ساختار داده توکن
interface Token {
  id: string;
  name: string;
  token: string;
  type: TokenType;
  status: TokenStatus;
  createdAt: string;
  expireAt: string | null;
  usageLimit: number | null;
  usageCount: number;
  remainingUsage: number | null;
}

/**
 * صفحه مدیریت توکن‌های کاربر
 */
const TokensPage: React.FC = () => {
  // داده‌های نمونه برای توکن‌ها
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: '1',
      name: 'توکن چت عمومی',
      token: 'ai123-tk-1a2b3c4d5e6f7g8h9i0j',
      type: 'عمومی',
      status: 'فعال',
      createdAt: '1402/06/15',
      expireAt: '1403/06/15',
      usageLimit: 1000,
      usageCount: 350,
      remainingUsage: 650,
    },
    {
      id: '2',
      name: 'توکن API برنامه موبایل',
      token: 'ai123-tk-abcdef123456789012',
      type: 'خصوصی',
      status: 'فعال',
      createdAt: '1402/07/01',
      expireAt: null,
      usageLimit: null,
      usageCount: 1245,
      remainingUsage: null,
    },
    {
      id: '3',
      name: 'توکن تست فرانت‌اند',
      token: 'ai123-tk-test000000000000',
      type: 'محدود',
      status: 'غیرفعال',
      createdAt: '1402/05/10',
      expireAt: '1402/08/10',
      usageLimit: 50,
      usageCount: 50,
      remainingUsage: 0,
    },
    {
      id: '4',
      name: 'توکن آزمایشی وب',
      token: 'ai123-tk-web0test00000000',
      type: 'محدود',
      status: 'منقضی',
      createdAt: '1402/04/01',
      expireAt: '1402/05/01',
      usageLimit: 100,
      usageCount: 75,
      remainingUsage: 25,
    },
  ]);

  // استیت‌های لازم برای UI
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterType, setFilterType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  
  // محاسبه اطلاعات آماری توکن‌ها
  const activeTokens = tokens.filter(token => token.status === 'فعال').length;
  const totalUsage = tokens.reduce((sum, token) => sum + token.usageCount, 0);
  const expiredTokens = tokens.filter(token => token.status === 'منقضی').length;

  // فیلتر کردن توکن‌ها
  const filteredTokens = tokens.filter(token => {
    if (filterType && token.type !== filterType) return false;
    if (filterStatus && token.status !== filterStatus) return false;
    return true;
  });

  // باز کردن دیالوگ افزودن/ویرایش توکن
  const handleOpenDialog = (token?: Token) => {
    if (token) {
      setSelectedToken(token);
    } else {
      setSelectedToken(null);
    }
    setOpenDialog(true);
  };

  // بستن دیالوگ
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedToken(null);
  };

  // کپی کردن توکن
  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    // اینجا می‌توان اعلان موفقیت را نمایش داد
    console.log('Token copied to clipboard');
  };

  // حذف توکن
  const handleDeleteToken = (id: string) => {
    // در یک برنامه واقعی، باید از کاربر تأیید گرفته شود
    setTokens(prevTokens => prevTokens.filter(token => token.id !== id));
  };

  // تغییر صفحه در جدول
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // تغییر تعداد ردیف‌های نمایش داده شده در هر صفحه
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // افزودن یا ویرایش توکن
  const handleSaveToken = (event: React.FormEvent) => {
    event.preventDefault();
    // در یک برنامه واقعی، اینجا باید درخواست API ارسال شود
    console.log('Token saved', selectedToken);
    handleCloseDialog();
  };

  // بازنشانی فیلترها
  const handleResetFilters = () => {
    setFilterType('');
    setFilterStatus('');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        مدیریت توکن‌ها
      </Typography>
      
      {/* کارت‌های آماری */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                توکن‌های فعال
              </Typography>
              <Typography variant="h3" component="div">
                {activeTokens}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                مجموع استفاده‌ها
              </Typography>
              <Typography variant="h3" component="div">
                {totalUsage.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                توکن‌های منقضی شده
              </Typography>
              <Typography variant="h3" component="div">
                {expiredTokens}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* ابزارهای فیلتر و مدیریت */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="توکن‌های من" 
          action={
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              ایجاد توکن جدید
            </Button>
          } 
        />
        <Divider />
        <CardContent>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            alignItems={{ xs: 'stretch', sm: 'center' }}
            sx={{ mb: 2 }}
          >
            <TextField
              select
              label="نوع توکن"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">همه انواع</MenuItem>
              <MenuItem value="عمومی">عمومی</MenuItem>
              <MenuItem value="خصوصی">خصوصی</MenuItem>
              <MenuItem value="محدود">محدود</MenuItem>
            </TextField>
            
            <TextField
              select
              label="وضعیت"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">همه وضعیت‌ها</MenuItem>
              <MenuItem value="فعال">فعال</MenuItem>
              <MenuItem value="غیرفعال">غیرفعال</MenuItem>
              <MenuItem value="منقضی">منقضی</MenuItem>
            </TextField>
            
            <Button 
              startIcon={<RefreshIcon />}
              onClick={handleResetFilters}
              disabled={!filterType && !filterStatus}
            >
              حذف فیلترها
            </Button>
          </Stack>
          
          {/* جدول توکن‌ها */}
          <TableContainer component={Paper}>
            <MuiTable sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>نام توکن</TableCell>
                  <TableCell>کلید توکن</TableCell>
                  <TableCell>نوع</TableCell>
                  <TableCell>وضعیت</TableCell>
                  <TableCell>محدودیت استفاده</TableCell>
                  <TableCell>استفاده شده</TableCell>
                  <TableCell>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTokens
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((token) => (
                    <TableRow key={token.id}>
                      <TableCell>{token.name}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ 
                            maxWidth: 150, 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {token.token}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => handleCopyToken(token.token)}
                            aria-label="کپی توکن"
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={token.type} 
                          color={token.type === 'عمومی' ? 'success' : token.type === 'خصوصی' ? 'primary' : 'warning'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={token.status}
                          color={token.status === 'فعال' ? 'success' : token.status === 'غیرفعال' ? 'default' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {token.usageLimit ? token.usageLimit.toLocaleString() : 'نامحدود'}
                      </TableCell>
                      <TableCell>
                        {token.usageCount.toLocaleString()}
                        {token.remainingUsage !== null && (
                          <Typography variant="caption" display="block" color="text.secondary">
                            {token.remainingUsage} باقیمانده
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(token)}
                            aria-label="ویرایش"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteToken(token.id)}
                            aria-label="حذف"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTokens.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="ردیف در صفحه:"
            labelDisplayedRows={({ from, to, count }) => {
              return `${from}-${to} از ${count !== -1 ? count : `بیشتر از ${to}`}`;
            }}
          />
        </CardContent>
      </Card>
      
      {/* دیالوگ ایجاد/ویرایش توکن */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth 
        title={selectedToken ? 'ویرایش توکن' : 'ایجاد توکن جدید'}
      >
        <form onSubmit={handleSaveToken}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField 
                  label="نام توکن"
                  fullWidth
                  required
                  defaultValue={selectedToken?.name || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="نوع توکن"
                  fullWidth
                  required
                  defaultValue={selectedToken?.type || 'عمومی'}
                >
                  <MenuItem value="عمومی">عمومی</MenuItem>
                  <MenuItem value="خصوصی">خصوصی</MenuItem>
                  <MenuItem value="محدود">محدود</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="محدودیت استفاده" 
                  type="number" 
                  fullWidth
                  helperText="خالی بگذارید برای نامحدود"
                  defaultValue={selectedToken?.usageLimit || ''}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="تاریخ انقضا"
                  fullWidth
                  defaultValue={selectedToken?.expireAt || ''}
                  helperText="خالی بگذارید برای بدون انقضا"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="وضعیت"
                  fullWidth
                  required
                  defaultValue={selectedToken?.status || 'فعال'}
                >
                  <MenuItem value="فعال">فعال</MenuItem>
                  <MenuItem value="غیرفعال">غیرفعال</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>انصراف</Button>
            <Button type="submit" variant="contained">
              {selectedToken ? 'بروزرسانی' : 'ایجاد'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TokensPage; 
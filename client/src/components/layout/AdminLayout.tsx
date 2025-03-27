// src/components/layout/AdminLayout.tsx - لایه اصلی پنل مدیریت

import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Group,
  Token,
  Assessment,
  Settings,
  Logout,
  Notifications,
  ChevronRight,
  Brightness7,
  Brightness4,
} from '@mui/icons-material';
import { ThemeContext } from '../../context/ThemeContext';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';

// عرض منوی کناری
const drawerWidth = 240;

// استایل برای کشو باز
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

// آیتم‌های منوی کناری
const menuItems = [
  { 
    title: 'داشبورد', 
    icon: <Dashboard color="primary" />, 
    path: '/admin/dashboard' 
  },
  { 
    title: 'مدیریت کاربران', 
    icon: <Group color="primary" />, 
    path: '/admin/users' 
  },
  { 
    title: 'مدیریت توکن‌ها', 
    icon: <Token color="primary" />, 
    path: '/admin/tokens' 
  },
  { 
    title: 'گزارش‌ها', 
    icon: <Assessment color="primary" />, 
    path: '/admin/reports' 
  },
  { 
    title: 'تنظیمات', 
    icon: <Settings color="primary" />, 
    path: '/admin/settings' 
  },
];

/**
 * کامپوننت لایه اصلی پنل مدیریت
 */
const AdminLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { mode, toggleColorMode } = React.useContext(ThemeContext);
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);

  // مدیریت وضعیت باز و بسته شدن منوی کناری در حالت موبایل
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // بستن منوی کاربر
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // باز کردن منوی کاربر
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // باز کردن منوی اعلان‌ها
  const handleOpenNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  // بستن منوی اعلان‌ها
  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  // خروج از سیستم
  const handleLogout = () => {
    console.log('Logout');
    dispatch(logout());
    navigate('/login');
  };

  // کلیک روی آیتم‌های منو
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // محتوای منوی کناری
  const drawer = (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
        <Avatar 
          sx={{ width: 64, height: 64, mb: 1 }}
          alt="پروفایل مدیر"
          src="/static/images/avatar/1.jpg"
        />
        <Typography variant="subtitle1" fontWeight="bold">
          علی رضایی
        </Typography>
        <Typography variant="body2" color="text.secondary">
          مدیر سیستم
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.path}
              onClick={() => handleMenuItemClick(item.path)}
              sx={{ 
                borderRadius: 1, 
                mx: 1, 
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
              {location.pathname === item.path && (
                <ChevronRight color="primary" />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mr: { md: `${drawerWidth}px` },
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            پنل مدیریت دستیار هوشمند ۱۲۳
          </Typography>
          
          {/* آیکون اعلان‌ها */}
          <Tooltip title="اعلان‌ها">
            <IconButton
              color="inherit"
              onClick={handleOpenNotificationsMenu}
            >
              <Badge badgeContent={5} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* منوی اعلان‌ها */}
          <Menu
            sx={{ mt: '45px' }}
            id="notifications-menu"
            anchorEl={anchorElNotifications}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotificationsMenu}
          >
            <MenuItem onClick={handleCloseNotificationsMenu}>
              <Typography textAlign="center">ثبت‌نام کاربر جدید</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotificationsMenu}>
              <Typography textAlign="center">خرید توکن جدید</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseNotificationsMenu}>
              <Typography textAlign="center">گزارش جدید سیستم</Typography>
            </MenuItem>
          </Menu>
          
          {/* آیکون پروفایل کاربر */}
          <Tooltip title="تنظیمات">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 1 }}>
              <Avatar alt="علی رضایی" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>
          
          {/* منوی پروفایل کاربر */}
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/admin/profile'); }}>
              <ListItemIcon>
                <Group fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">پروفایل</Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/admin/settings'); }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">تنظیمات</Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleCloseUserMenu(); toggleColorMode(); }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">تغییر حالت نمایش</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography textAlign="center">خروج</Typography>
            </MenuItem>
          </Menu>
          
          <Tooltip title={mode === 'dark' ? 'حالت روشن' : 'حالت تاریک'}>
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              sx={{ ml: 1 }}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* منوی موبایل */}
        <Drawer
          container={undefined}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // برای عملکرد بهتر در موبایل
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          anchor="right"
        >
          {drawer}
        </Drawer>
        
        {/* منوی دسکتاپ */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          anchor="right"
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* محتوای اصلی */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default' 
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout; 
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Checkout from '../pages/Checkout';
import NotFound from '../../shared/components/NotFound';
// اضافه کردن مسیرهای داشبورد کاربر
import Dashboard from '../pages/dashboard/Dashboard';
import TokensPage from '../pages/tokens/TokensPage';
import TransactionsPage from '../pages/transactions/TransactionsPage';
import SettingsPage from '../pages/settings/SettingsPage';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      {/* مسیرهای مستقل */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* مسیرهای داشبورد کاربر */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="tokens" element={<TokensPage />} />
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="settings" element={<SettingsPage />} />
      
      {/* مسیرهای فروشگاه */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes; 
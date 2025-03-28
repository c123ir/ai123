import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// صفحات عمومی
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

// صفحات احراز هویت
import LoginPage from '../modules/auth/pages/LoginPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../modules/auth/pages/ResetPasswordPage';

// صفحات داشبورد
import DashboardPage from '../modules/dashboard/pages/DashboardPage';

// صفحات کاوش
import ExplorePage from '../modules/explore/pages/ExplorePage';
import ExploreDetailPage from '../modules/explore/pages/ExploreDetailPage';

// صفحات توکن
import TokensPage from '../modules/token/pages/TokensPage';
import TokenPurchasePage from '../modules/token/pages/TokenPurchasePage';

// صفحات پروژه‌ها
import ProjectsPage from '../modules/project/pages/ProjectsPage';
import ProjectDetailPage from '../modules/project/pages/ProjectDetailPage';
import CreateProjectPage from '../modules/project/pages/CreateProjectPage';

// صفحات پیام‌ها
import MessagesPage from '../modules/message/pages/MessagesPage';
import ConversationPage from '../modules/message/pages/ConversationPage';

// صفحات مشاوره
import AdvisorsPage from '../modules/advisor/pages/AdvisorsPage';
import AdvisorDetailPage from '../modules/advisor/pages/AdvisorDetailPage';
import SessionsPage from '../modules/advisor/pages/SessionsPage';
import SessionDetailPage from '../modules/advisor/pages/SessionDetailPage';

// صفحات پروفایل
import ProfilePage from '../modules/profile/pages/ProfilePage';
import EditProfilePage from '../modules/profile/pages/EditProfilePage';

// صفحات تنظیمات کاربر
import UserSettingsRoutes from '../pages/user/settings/UserSettingsRoutes';

// صفحات مدیریت
import AdminDashboardPage from '../modules/admin/pages/AdminDashboardPage';

// کامپوننت مسیر خصوصی
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return children;
};

// کامپوننت مسیر مدیریت
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  
  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* مسیرهای عمومی */}
      <Route path="/" element={<HomePage />} />
      
      {/* مسیرهای احراز هویت */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
      
      {/* مسیرهای داشبورد */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      
      {/* مسیرهای کاوش */}
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/explore/:id" element={<ExploreDetailPage />} />
      
      {/* مسیرهای توکن */}
      <Route path="/tokens" element={<PrivateRoute><TokensPage /></PrivateRoute>} />
      <Route path="/tokens/purchase" element={<PrivateRoute><TokenPurchasePage /></PrivateRoute>} />
      
      {/* مسیرهای پروژه‌ها */}
      <Route path="/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
      <Route path="/projects/create" element={<PrivateRoute><CreateProjectPage /></PrivateRoute>} />
      <Route path="/projects/:id" element={<PrivateRoute><ProjectDetailPage /></PrivateRoute>} />
      
      {/* مسیرهای پیام‌ها */}
      <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
      <Route path="/messages/:id" element={<PrivateRoute><ConversationPage /></PrivateRoute>} />
      
      {/* مسیرهای مشاوره */}
      <Route path="/advisors" element={<AdvisorsPage />} />
      <Route path="/advisors/:advisorId" element={<AdvisorDetailPage />} />
      <Route path="/advisors/sessions" element={<PrivateRoute><SessionsPage /></PrivateRoute>} />
      <Route path="/advisors/sessions/:sessionId" element={<PrivateRoute><SessionDetailPage /></PrivateRoute>} />
      
      {/* مسیرهای پروفایل */}
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/profile/edit" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
      
      {/* مسیرهای تنظیمات کاربر */}
      <Route path="/user/settings/*" element={<PrivateRoute><UserSettingsRoutes /></PrivateRoute>} />
      
      {/* مسیرهای مدیریت */}
      <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
      
      {/* مسیر 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes; 
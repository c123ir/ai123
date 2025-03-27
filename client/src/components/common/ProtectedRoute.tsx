import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// تعریف props کامپوننت ProtectedRoute
export interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  userRole?: string;
  requiredRole?: string;
  redirectPath?: string;
}

/**
 * کامپوننت ProtectedRoute
 * این کامپوننت برای محافظت از مسیرهایی استفاده می‌شود که نیاز به لاگین دارند
 * 
 * نمونه استفاده:
 * ```jsx
 * <Route 
 *   path="/admin" 
 *   element={
 *     <ProtectedRoute 
 *       isAuthenticated={isAuthenticated} 
 *       userRole={userRole} 
 *       requiredRole="admin"
 *     >
 *       <AdminPanel />
 *     </ProtectedRoute>
 *   } 
 * />
 * ```
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated = true, // در حالت پیش‌فرض احراز هویت شده فرض می‌شود
  userRole = 'user',
  requiredRole,
  redirectPath = '/login'
}) => {
  const location = useLocation();

  // بررسی کنید که آیا کاربر احراز هویت شده است
  if (!isAuthenticated) {
    // اگر کاربر لاگین نکرده باشد، او را به صفحه لاگین هدایت کنید
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // اگر نقش مورد نیاز تعریف شده باشد، آن را بررسی کنید
  if (requiredRole && userRole !== requiredRole) {
    // اگر کاربر دسترسی لازم را نداشته باشد، او را به صفحه اصلی هدایت کنید
    return <Navigate to="/" replace />;
  }

  // اگر کاربر احراز هویت شده و دسترسی کافی داشته باشد، محتوای کامپوننت را نمایش دهید
  return <>{children}</>;
};

export default ProtectedRoute; 
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

// تعریف props کامپوننت ProtectedRoute
export interface ProtectedRouteProps {
  children: React.ReactNode;
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
 *     <ProtectedRoute requiredRole="admin">
 *       <AdminPanel />
 *     </ProtectedRoute>
 *   } 
 * />
 * ```
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectPath = '/login'
}) => {
  const location = useLocation();
  
  // دریافت وضعیت احراز هویت از ریداکس
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.user?.role || '');

  // console.log برای اشکال‌زدایی
  console.log('ProtectedRoute:', { isAuthenticated, userRole, requiredRole, path: location.pathname });

  // بررسی کنید که آیا کاربر احراز هویت شده است
  if (!isAuthenticated) {
    // اگر کاربر لاگین نکرده باشد، او را به صفحه لاگین هدایت کنید
    console.log('ریدایرکت به صفحه لاگین:', redirectPath);
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // اگر نقش مورد نیاز تعریف شده باشد، آن را بررسی کنید
  if (requiredRole && userRole !== requiredRole) {
    // اگر کاربر دسترسی لازم را نداشته باشد، او را به صفحه اصلی هدایت کنید
    console.log('کاربر دسترسی کافی ندارد، ریدایرکت به صفحه اصلی');
    return <Navigate to="/" replace />;
  }

  // اگر کاربر احراز هویت شده و دسترسی کافی داشته باشد، محتوای کامپوننت را نمایش دهید
  console.log('دسترسی تایید شد، نمایش محتوا');
  return <>{children}</>;
};

export default ProtectedRoute; 
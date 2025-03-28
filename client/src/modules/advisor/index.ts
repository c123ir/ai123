/**
 * ماژول مشاوره هوشمند
 * این ماژول امکان رزرو و مدیریت جلسات مشاوره با متخصصان مختلف را فراهم می‌کند
 */

// کامپوننت‌ها
export { default as AdvisorList } from './components/AdvisorList';
export { default as SessionBookingForm } from './components/SessionBookingForm';
export { default as SessionDetail } from './components/SessionDetail';
export { default as SessionList } from './components/SessionList';

// صفحات
export { default as AdvisorsListPage } from './pages/AdvisorsListPage';
export { default as AdvisorPage } from './pages/AdvisorPage';
export { default as SessionsPage } from './pages/SessionsPage';
export { default as SessionDetailPage } from './pages/SessionDetailPage';

// سرویس‌ها و هوک‌ها
export { default as useAdvisor } from './hooks/useAdvisor';
export { default as advisorService } from './services/advisorService';

// ریداکس
export { default as advisorReducer } from './store/advisorSlice';
export * from './store/advisorSlice';

// تایپ‌ها
export * from './types'; 
import { useState, useEffect } from 'react';

/**
 * هوک سفارشی برای بررسی media query
 * @param {string} query - عبارت media query CSS
 * @returns {boolean} نتیجه تطبیق media query
 * 
 * @example
 * // استفاده برای تشخیص مانیتور موبایل
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * 
 * // استفاده برای تشخیص مانیتور بزرگ
 * const isLargeScreen = useMediaQuery('(min-width: 1200px)');
 */
export const useMediaQuery = (query: string): boolean => {
  // اگر در سمت سرور هستیم، باید false برگردانیم چون window وجود ندارد
  const getMatches = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  // مقداردهی اولیه برای state
  const [matches, setMatches] = useState<boolean>(getMatches());

  // تابع به‌روزرسانی برای تغییرات اندازه صفحه
  const handleChange = () => {
    setMatches(getMatches());
  };

  // افزودن و حذف event listener برای تغییرات اندازه صفحه
  useEffect(() => {
    // ایجاد یک media query listener
    const matchMedia = window.matchMedia(query);

    // بررسی اولیه
    handleChange();

    // تعریف event listener برای Safari
    if (matchMedia.addEventListener) {
      matchMedia.addEventListener('change', handleChange);
    } else {
      // برای مرورگرهای قدیمی
      matchMedia.addListener(handleChange);
    }

    // تمیزکاری با حذف event listener
    return () => {
      if (matchMedia.removeEventListener) {
        matchMedia.removeEventListener('change', handleChange);
      } else {
        // برای مرورگرهای قدیمی
        matchMedia.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

export default useMediaQuery; 
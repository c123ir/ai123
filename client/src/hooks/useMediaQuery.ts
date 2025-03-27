import { useState, useEffect } from 'react';

/**
 * هوک کاربردی برای استفاده از Media Queries در ری‌اکت
 * 
 * @param query عبارت media query استاندارد CSS
 * @returns بولین که نشان می‌دهد آیا media query در حال حاضر منطبق است یا خیر
 * 
 * مثال استفاده:
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);
  
  useEffect(() => {
    // بررسی پشتیبانی مرورگر از matchMedia
    if (typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined') {
      const media = window.matchMedia(query);
      
      // تنظیم وضعیت اولیه
      setMatches(media.matches);
      
      // ایجاد تابع listener برای تغییرات
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };
      
      // اضافه کردن listener
      media.addEventListener('change', listener);
      
      // پاکسازی در هنگام unmount
      return () => {
        media.removeEventListener('change', listener);
      };
    }
    
    // تابع بازگشتی برای مرورگرهای قدیمی‌تر که از addEventListener پشتیبانی نمی‌کنند
    return undefined;
  }, [query]);
  
  return matches;
}

export default useMediaQuery; 
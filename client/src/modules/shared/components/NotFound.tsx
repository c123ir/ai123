import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

/**
 * کامپوننت صفحه یافت نشد
 * این کامپوننت برای نمایش خطای 404 استفاده می‌شود
 */
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      <Result
        status="404"
        title="۴۰۴"
        subTitle="متأسفیم، صفحه مورد نظر یافت نشد!"
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            بازگشت به صفحه اصلی
          </Button>
        }
      />
      <div style={{ maxWidth: 500, textAlign: 'center', marginTop: 20 }}>
        صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.
        لطفاً صحت آدرس وارد شده را بررسی کنید یا به صفحه اصلی برگردید.
      </div>
    </div>
  );
};

export default NotFound; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { Typography } from '../components/common';

/**
 * صفحه 404 - صفحه مورد نظر یافت نشد
 * این صفحه زمانی نمایش داده می‌شود که کاربر به URL نامعتبر یا موجود نیست مراجعه کند
 */
const NotFoundPage: React.FC = () => {
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
        title={<Typography variant="h2">۴۰۴</Typography>}
        subTitle={<Typography variant="h4">متأسفیم، صفحه مورد نظر یافت نشد!</Typography>}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            بازگشت به صفحه اصلی
          </Button>
        }
      />
      <Typography variant="body1" style={{ maxWidth: 500, textAlign: 'center', marginTop: 20 }}>
        صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.
        لطفاً صحت آدرس وارد شده را بررسی کنید یا به صفحه اصلی برگردید.
      </Typography>
    </div>
  );
};

export default NotFoundPage; 
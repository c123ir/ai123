import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const NotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/**
 * صفحه ۴۰۴ - صفحه یافت نشد
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <NotFoundContainer>
      <Result
        status="404"
        title="۴۰۴"
        subTitle="متأسفانه صفحه مورد نظر شما یافت نشد."
        extra={
          <Button 
            type="primary" 
            onClick={() => navigate('/guest/dashboard')}
          >
            بازگشت به صفحه اصلی
          </Button>
        }
      />
    </NotFoundContainer>
  );
};

export default NotFoundPage; 
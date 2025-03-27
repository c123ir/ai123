import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Profile: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Card variant="borderless">
        <Title level={2}>پروفایل کاربری</Title>
        <Paragraph>این صفحه در دست ساخت است.</Paragraph>
      </Card>
    </div>
  );
};

export default Profile; 
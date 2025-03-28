import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Breadcrumb, Layout } from 'antd';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { RootState } from '../../../store';
import useAuth from '../../auth/hooks/useAuth';
import AdvisorList from '../components/AdvisorList';
import AppHeader from '../../../components/AppHeader';

const { Title } = Typography;
const { Content } = Layout;

const AdvisorsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { error } = useSelector((state: RootState) => state.advisor);

  return (
    <Layout className="min-height-100vh">
      <AppHeader />
      
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
            <span>خانه</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <TeamOutlined />
            <span>مشاوران</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Title level={2}>مشاوران هوشمند</Title>
          <p>در این بخش می‌توانید مشاوران متخصص در زمینه‌های مختلف را مشاهده کرده و با آن‌ها جلسه مشاوره رزرو کنید.</p>
          
          {currentUser ? (
            <AdvisorList />
          ) : (
            <div className="login-required-message">
              <p>برای مشاهده مشاوران و رزرو جلسه، لطفا ابتدا وارد حساب کاربری خود شوید.</p>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default AdvisorsPage; 
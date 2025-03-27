import React, { Component, ErrorInfo } from 'react';
import { Button, Typography, Card, Space, Divider, Alert } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * کامپوننت مدیریت خطاهای برنامه
 * این کامپوننت خطاهای رخ داده در زیرمجموعه خود را مدیریت می‌کند
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  /**
   * بروزرسانی استیت هنگام وقوع خطا
   */
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  /**
   * ثبت اطلاعات خطا در فاز componentDidCatch
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      errorInfo
    });
    
    // می‌توان اینجا خطا را به سرویس مانیتورینگ خطا ارسال کرد
    console.error('خطایی در برنامه رخ داده است:', error, errorInfo);
  }

  /**
   * راه‌اندازی مجدد برنامه
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // اگر fallback مشخص شده باشد، آن را نمایش می‌دهیم
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // نمایش فرم خطای پیش‌فرض
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <Card 
            style={{ 
              maxWidth: 600, 
              width: '100%', 
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
            variant="outlined"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="خطایی رخ داده است"
                description="متأسفانه در اجرای برنامه مشکلی پیش آمده است. لطفاً صفحه را دوباره بارگذاری کنید."
                type="error"
                showIcon
              />
              
              {this.state.error && (
                <>
                  <Divider />
                  <div 
                    style={{ 
                      padding: '12px', 
                      backgroundColor: '#f5f5f5', 
                      overflow: 'auto',
                      maxHeight: '200px',
                      direction: 'ltr',
                      textAlign: 'left',
                      borderRadius: 4
                    }}
                  >
                    <Typography.Text code style={{ whiteSpace: 'pre-wrap' }}>
                      {this.state.error.toString()}
                    </Typography.Text>
                  </div>
                </>
              )}
              
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                onClick={this.handleReset}
                style={{ marginTop: 16 }}
              >
                تلاش مجدد
              </Button>
            </Space>
          </Card>
        </div>
      );
    }

    // در حالت عادی، فرزندان را نمایش می‌دهیم
    return this.props.children;
  }
}

export default ErrorBoundary; 
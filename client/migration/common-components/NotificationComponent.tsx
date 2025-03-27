import React, { useEffect } from 'react';
import { message, notification, Button, Space } from 'antd';
import { 
  CheckCircleOutlined, 
  WarningOutlined, 
  InfoCircleOutlined,
  CloseCircleOutlined,
  BellOutlined
} from '@ant-design/icons';

// تعریف انواع اعلان‌ها
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

// تعریف نوع پیام
export interface NotificationMessage {
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number;
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  showAsMessage?: boolean;
}

// تعریف props کامپوننت
interface NotificationComponentProps {
  messages: NotificationMessage[];
  onClose?: (index: number) => void;
}

// آیکون‌های مربوط به هر نوع اعلان
const getIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.SUCCESS:
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case NotificationType.ERROR:
      return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
    case NotificationType.WARNING:
      return <WarningOutlined style={{ color: '#faad14' }} />;
    case NotificationType.INFO:
    default:
      return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
  }
};

/**
 * کامپوننت نمایش اعلان‌ها با استفاده از Ant Design
 * این کامپوننت قابلیت نمایش اعلان‌ها به دو صورت notification و message را دارد
 */
const NotificationComponent: React.FC<NotificationComponentProps> = ({ 
  messages, 
  onClose 
}) => {
  useEffect(() => {
    // نمایش اعلان‌ها به محض دریافت
    messages.forEach((msg, index) => {
      const { type, message: content, description, duration = 4.5, placement = 'topRight', showAsMessage = false } = msg;
      
      // انتخاب نوع نمایش: message یا notification
      if (showAsMessage) {
        // نمایش به صورت پیام کوتاه
        message[type]({
          content,
          duration,
          icon: getIcon(type),
          onClick: () => onClose && onClose(index)
        });
      } else {
        // نمایش به صورت اعلان
        notification[type]({
          message: content,
          description,
          duration,
          placement,
          icon: getIcon(type),
          onClose: () => onClose && onClose(index)
        });
      }
    });
  }, [messages, onClose]);

  // این کامپوننت چیزی نمایش نمی‌دهد و تنها اعلان‌ها را مدیریت می‌کند
  return null;
};

// کامپوننت نمونه برای نمایش اعلان‌ها
export const NotificationDemo: React.FC = () => {
  // نمایش پیام موفقیت کوتاه
  const showSuccessMessage = () => {
    message.success({
      content: 'عملیات با موفقیت انجام شد',
      duration: 3,
      icon: getIcon(NotificationType.SUCCESS)
    });
  };

  // نمایش اعلان خطا
  const showErrorNotification = () => {
    notification.error({
      message: 'خطا در ارسال اطلاعات',
      description: 'متأسفانه در ارسال اطلاعات خطایی رخ داده است. لطفاً دوباره تلاش کنید.',
      placement: 'topRight',
      duration: 4.5,
      icon: getIcon(NotificationType.ERROR)
    });
  };

  // نمایش اعلان هشدار
  const showWarningNotification = () => {
    notification.warning({
      message: 'هشدار',
      description: 'اعتبار حساب کاربری شما رو به اتمام است. لطفاً نسبت به شارژ حساب اقدام کنید.',
      placement: 'bottomRight',
      duration: 6,
      icon: getIcon(NotificationType.WARNING)
    });
  };

  // نمایش پیام اطلاعات
  const showInfoMessage = () => {
    message.info({
      content: 'به‌روزرسانی جدید در دسترس است',
      duration: 3,
      icon: getIcon(NotificationType.INFO)
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>نمونه اعلان‌ها</h2>
      <Space>
        <Button type="primary" onClick={showSuccessMessage} icon={<CheckCircleOutlined />}>
          پیام موفقیت
        </Button>
        <Button danger onClick={showErrorNotification} icon={<CloseCircleOutlined />}>
          اعلان خطا
        </Button>
        <Button type="dashed" onClick={showWarningNotification} icon={<WarningOutlined />}>
          اعلان هشدار
        </Button>
        <Button onClick={showInfoMessage} icon={<InfoCircleOutlined />}>
          پیام اطلاعات
        </Button>
      </Space>
    </div>
  );
};

// یک Context برای مدیریت اعلان‌ها در کل برنامه
export const NotificationContext = React.createContext<{
  showNotification: (notification: NotificationMessage) => void;
  clearNotifications: () => void;
}>({
  showNotification: () => {},
  clearNotifications: () => {}
});

// ارائه‌دهنده (Provider) برای مدیریت اعلان‌ها
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = React.useState<NotificationMessage[]>([]);

  // نمایش اعلان جدید
  const showNotification = (notification: NotificationMessage) => {
    setNotifications(prev => [...prev, notification]);
  };

  // پاک کردن همه اعلان‌ها
  const clearNotifications = () => {
    setNotifications([]);
  };

  // حذف یک اعلان بر اساس شاخص
  const handleClose = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <NotificationContext.Provider value={{ showNotification, clearNotifications }}>
      {children}
      <NotificationComponent messages={notifications} onClose={handleClose} />
    </NotificationContext.Provider>
  );
};

// هوک برای استفاده از سیستم اعلان‌ها
export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// صادر کردن کامپوننت و هوک‌ها
export default NotificationComponent; 
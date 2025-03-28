import React from 'react';
import Tabs from '../modules/shared/components/common/Tabs';
import { HomeOutlined, UserOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// تب‌های نمونه
const sampleItems = [
  {
    key: '1',
    label: 'تب اول',
    children: <div style={{ padding: 16 }}>محتوای تب اول</div>,
  },
  {
    key: '2',
    label: 'تب دوم',
    children: <div style={{ padding: 16 }}>محتوای تب دوم</div>,
  },
  {
    key: '3',
    label: 'تب سوم',
    children: <div style={{ padding: 16 }}>محتوای تب سوم</div>,
  },
];

export const Default = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
  },
};

export const WithIcons = {
  args: {
    items: [
      {
        key: 'home',
        label: 'خانه',
        icon: <HomeOutlined />,
        children: <div style={{ padding: 16 }}>صفحه اصلی</div>,
      },
      {
        key: 'profile',
        label: 'پروفایل',
        icon: <UserOutlined />,
        children: <div style={{ padding: 16 }}>اطلاعات کاربری</div>,
      },
      {
        key: 'settings',
        label: 'تنظیمات',
        icon: <SettingOutlined />,
        children: <div style={{ padding: 16 }}>تنظیمات برنامه</div>,
      },
      {
        key: 'documents',
        label: 'اسناد',
        icon: <FileOutlined />,
        children: <div style={{ padding: 16 }}>مدارک و اسناد</div>,
      },
    ],
    defaultActiveKey: 'home',
  },
};

export const Card = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
    type: 'card',
  },
};

export const WithDisabledTab = {
  args: {
    items: [
      {
        key: '1',
        label: 'تب اول',
        children: <div style={{ padding: 16 }}>محتوای تب اول</div>,
      },
      {
        key: '2',
        label: 'تب دوم',
        children: <div style={{ padding: 16 }}>محتوای تب دوم</div>,
        disabled: true,
      },
      {
        key: '3',
        label: 'تب سوم',
        children: <div style={{ padding: 16 }}>محتوای تب سوم</div>,
      },
    ],
    defaultActiveKey: '1',
  },
};

export const Centered = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
    centered: true,
  },
};

export const Scrollable = {
  args: {
    items: Array(15).fill(null).map((_, i) => ({
      key: String(i + 1),
      label: `تب ${i + 1}`,
      children: <div style={{ padding: 16 }}>محتوای تب {i + 1}</div>,
    })),
    defaultActiveKey: '1',
  },
};

export const WithExtra = {
  args: {
    items: sampleItems,
    defaultActiveKey: '1',
    tabBarExtraContent: {
      right: (
        <button style={{ margin: '0 8px' }}>
          افزودن تب جدید
        </button>
      ),
    },
  },
};

export const WithComplexContent = {
  args: {
    items: [
      {
        key: '1',
        label: 'اطلاعات شخصی',
        children: (
          <div style={{ padding: 16 }}>
            <form style={{ maxWidth: 400 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8 }}>نام</label>
                <input 
                  type="text" 
                  placeholder="نام خود را وارد کنید" 
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #d9d9d9' 
                  }} 
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 8 }}>نام خانوادگی</label>
                <input 
                  type="text" 
                  placeholder="نام خانوادگی خود را وارد کنید" 
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #d9d9d9' 
                  }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8 }}>ایمیل</label>
                <input 
                  type="email" 
                  placeholder="ایمیل خود را وارد کنید" 
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #d9d9d9' 
                  }} 
                />
              </div>
            </form>
          </div>
        ),
      },
      {
        key: '2',
        label: 'تنظیمات حساب',
        children: (
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <h3>تنظیمات امنیتی</h3>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <input type="checkbox" id="twoFactor" />
                <label htmlFor="twoFactor" style={{ marginRight: 8 }}>
                  احراز هویت دو مرحله‌ای
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" id="notifications" />
                <label htmlFor="notifications" style={{ marginRight: 8 }}>
                  دریافت اعلان‌های امنیتی
                </label>
              </div>
            </div>
            <div>
              <h3>تغییر رمز عبور</h3>
              <button style={{ 
                backgroundColor: '#1677ff', 
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                تغییر رمز عبور
              </button>
            </div>
          </div>
        ),
      },
      {
        key: '3',
        label: 'اعلان‌ها',
        children: (
          <div style={{ padding: 16 }}>
            <h3>تنظیمات اعلان‌ها</h3>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <input type="checkbox" id="emailNotif" />
              <label htmlFor="emailNotif" style={{ marginRight: 8 }}>
                اعلان‌های ایمیلی
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <input type="checkbox" id="smsNotif" />
              <label htmlFor="smsNotif" style={{ marginRight: 8 }}>
                اعلان‌های پیامکی
              </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="pushNotif" />
              <label htmlFor="pushNotif" style={{ marginRight: 8 }}>
                اعلان‌های وب
              </label>
            </div>
          </div>
        ),
      },
    ],
    defaultActiveKey: '1',
  },
}; 
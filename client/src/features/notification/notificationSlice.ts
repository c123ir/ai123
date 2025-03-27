// src/features/notification/notificationSlice.ts - اسلایس ریداکس برای مدیریت اعلان‌ها

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store';

// تعریف تایپ اعلان
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  autoHide?: boolean;
  duration?: number;
}

// تعریف تایپ ورودی برای نمایش اعلان
export interface ShowNotificationPayload {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  autoHide?: boolean;
  duration?: number;
}

// تعریف وضعیت اسلایس اعلان‌ها
interface NotificationState {
  notifications: Notification[];
}

// وضعیت اولیه
const initialState: NotificationState = {
  notifications: [],
};

// اسلایس اعلان‌ها
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // نمایش اعلان جدید
    showNotification: (state, action: PayloadAction<ShowNotificationPayload>) => {
      const id = uuidv4();
      const notification: Notification = {
        id,
        message: action.payload.message,
        type: action.payload.type,
        title: action.payload.title,
        autoHide: action.payload.autoHide === undefined ? true : action.payload.autoHide,
        duration: action.payload.duration || 5000,
      };
      state.notifications.push(notification);
    },
    
    // مخفی کردن اعلان با شناسه مشخص
    hideNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    
    // مخفی کردن همه اعلان‌ها
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// صادر کردن اکشن‌ها
export const {
  showNotification,
  hideNotification,
  clearAllNotifications,
} = notificationSlice.actions;

// سلکتورها
export const selectNotifications = (state: RootState) => state.notification.notifications;

export default notificationSlice.reducer; 
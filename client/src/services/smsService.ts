// client/src/services/smsService.ts - سرویس ارسال پیامک

import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

interface SMSResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// متغیر مخزن برای ذخیره کدهای تأیید ارسال شده برای هر شماره تلفن
const verificationCodes: Record<string, string> = {};

/**
 * ارسال کد تایید به شماره تلفن کاربر
 * 
 * @param phoneNumber شماره تلفن کاربر
 * @param verficationCode کد تایید
 * @returns پاسخ سرور برای وضعیت ارسال پیامک
 */
export const sendVerificationCode = async (
  phoneNumber: string,
  verficationCode: string
): Promise<SMSResponse> => {
  try {
    // در محیط توسعه، به جای ارسال به سرور، مستقیماً موفقیت را شبیه‌سازی می‌کنیم
    console.log(`کد ${verficationCode} برای شماره ${phoneNumber} شبیه‌سازی شد`);
    
    // ذخیره کد در حافظه محلی
    verificationCodes[phoneNumber] = verficationCode;
    
    // شبیه‌سازی تأخیر ارسال پیامک
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      statusCode: 200,
      message: 'کد تایید با موفقیت ارسال شد'
    };
    
    /* کد اصلی برای اتصال به سرور واقعی
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/send-verification-code`, {
      phoneNumber,
      code: verficationCode,
    });

    return {
      success: true,
      statusCode: response.status,
      message: response.data.message || 'کد تایید با موفقیت ارسال شد'
    };
    */
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        statusCode: error.response.status,
        message: error.response.data.message || 'خطا در ارسال کد تایید'
      };
    }
    
    return {
      success: false,
      statusCode: 500,
      message: 'خطای سرور در ارسال پیامک'
    };
  }
};

/**
 * تایید کد ارسال شده توسط کاربر
 * 
 * @param phoneNumber شماره تلفن کاربر
 * @param code کد تایید وارد شده
 * @returns پاسخ سرور برای وضعیت تایید کد
 */
export const verifyOTPCode = async (
  phoneNumber: string,
  code: string
): Promise<SMSResponse> => {
  try {
    // در محیط توسعه، کد را با کد ذخیره شده در حافظه محلی مقایسه می‌کنیم
    console.log(`بررسی کد ${code} برای شماره ${phoneNumber}`);
    console.log(`کد واقعی: ${verificationCodes[phoneNumber]}`);
    
    // شبیه‌سازی تأخیر بررسی کد
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // در محیط توسعه، یا کد درست باشد یا کد 1234 هم قبول می‌شود
    const isValid = (code === verificationCodes[phoneNumber]) || code === '1234';
    
    if (isValid) {
      return {
        success: true,
        statusCode: 200,
        message: 'کد تایید با موفقیت تایید شد'
      };
    } else {
      return {
        success: false,
        statusCode: 400,
        message: 'کد وارد شده صحیح نیست'
      };
    }
    
    /* کد اصلی برای اتصال به سرور واقعی
    const response = await axios.post(`${API_BASE_URL}/api/v1/auth/verify-code`, {
      phoneNumber,
      code
    });

    return {
      success: true,
      statusCode: response.status,
      message: response.data.message || 'کد تایید با موفقیت تایید شد'
    };
    */
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        statusCode: error.response.status,
        message: error.response.data.message || 'کد وارد شده صحیح نیست'
      };
    }
    
    return {
      success: false,
      statusCode: 500,
      message: 'خطای سرور در تایید کد'
    };
  }
};

// تابع کمکی برای تولید کد تایید تصادفی
export const generateOTPCode = (length: number = 4): string => {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
}; 
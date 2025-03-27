# یکپارچه‌سازی سامانه پیامک

<div dir="rtl">

## مقدمه

این سند نحوه یکپارچه‌سازی سیستم پیامک کوتاه (SMS) با پروژه دستیار هوشمند یک دو سه را شرح می‌دهد. پیامک‌ها برای اطلاع‌رسانی، احراز هویت دو مرحله‌ای، و ارسال کدهای تأیید استفاده می‌شوند.

## مشخصات سرویس پیامک

سرویس پیامک مورد استفاده در این پروژه، سامانه ۰۰۹۸ است که با مشخصات زیر پیکربندی شده است:

```
username: 'zsms8829'
password: 'j494moo*O^HU'
from: '3000164545'  // شماره پنل اختصاصی
```

## روش‌های ارسال پیامک

سرویس ۰۰۹۸ دو روش برای ارسال پیامک ارائه می‌دهد:

1. استفاده از لینک مستقیم (HTTP GET)
2. استفاده از وب‌سرویس (SOAP)

### ۱. ارسال پیامک از طریق لینک مستقیم

فرمت درخواست ارسال پیامک به صورت زیر است:

```
https://0098sms.com/sendsmslink.aspx?FROM=$FROM&TO=$TO&TEXT=$TEXT&USERNAME=$USERNAME&PASSWORD=$PASSWORD&DOMAIN=$DOMAIN
```

پارامترهای اصلی:
* `$FROM`: شماره اختصاصی در سامانه (3000164545)
* `$TO`: شماره مقصد گیرنده پیامک (مثلاً 09xxxxxxxx)
* `$TEXT`: متن پیامک
* `$USERNAME`: نام کاربری در سامانه (zsms8829)
* `$PASSWORD`: رمز عبور در سامانه
* `$DOMAIN`: معمولاً مقدار "0098" استفاده می‌شود

#### نمونه کد در Node.js

```javascript
// پیاده‌سازی در ماژول سرویس پیامک
import axios from 'axios';
import { logger } from '@shared/services/logger';

class SmsService {
  constructor() {
    this.config = {
      username: process.env.SMS_USERNAME || 'zsms8829',
      password: process.env.SMS_PASSWORD || 'j494moo*O^HU',
      from: process.env.SMS_PANEL_NUMBER || '3000164545',
      domain: process.env.SMS_DOMAIN || '0098',
      baseUrl: 'https://0098sms.com/sendsmslink.aspx'
    };
  }

  async sendSms(to, text) {
    try {
      // اطمینان از صحیح بودن فرمت شماره موبایل
      const normalizedTo = this.normalizePhoneNumber(to);
      
      const url = `${this.config.baseUrl}?FROM=${this.config.from}&TO=${normalizedTo}`
                + `&TEXT=${encodeURIComponent(text)}&USERNAME=${this.config.username}`
                + `&PASSWORD=${this.config.password}&DOMAIN=${this.config.domain}`;

      const response = await axios.get(url);
      
      // بررسی پاسخ و کدهای خطا
      const result = response.data.toString().trim();
      if (result === '0') {
        logger.info(`پیامک با موفقیت به ${normalizedTo} ارسال شد`);
        return { success: true, code: result };
      } else {
        logger.error(`خطا در ارسال پیامک به ${normalizedTo}: کد ${result}`);
        return { success: false, code: result, message: this.getErrorMessage(result) };
      }
    } catch (error) {
      logger.error('خطا در سرویس پیامک:', error);
      throw new Error(`خطا در ارسال پیامک: ${error.message}`);
    }
  }
  
  // تبدیل فرمت‌های مختلف شماره موبایل به فرمت استاندارد
  normalizePhoneNumber(phone) {
    // حذف فاصله‌ها و کاراکترهای اضافی
    let normalized = phone.replace(/\s+|-|\(|\)/g, '');
    
    // تبدیل اعداد فارسی به انگلیسی
    normalized = this.convertPersianToEnglish(normalized);
    
    // اطمینان از شروع شدن با 09
    if (normalized.startsWith('+98')) {
      normalized = '0' + normalized.substring(3);
    } else if (normalized.startsWith('98')) {
      normalized = '0' + normalized.substring(2);
    } else if (!normalized.startsWith('0')) {
      normalized = '0' + normalized;
    }
    
    return normalized;
  }
  
  // تبدیل اعداد فارسی به انگلیسی
  convertPersianToEnglish(str) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return str.split('').map(c => {
      const index = persianDigits.indexOf(c);
      return index !== -1 ? englishDigits[index] : c;
    }).join('');
  }
  
  // ترجمه کدهای خطا به پیام‌های فارسی
  getErrorMessage(code) {
    const errorMessages = {
      '1': 'شماره گیرنده اشتباه است',
      '2': 'گیرنده تعریف نشده است',
      '9': 'اعتبار پیامک شما کافی نیست',
      '12': 'نام کاربری و کلمه عبور اشتباه است',
      '14': 'سقف ارسال روزانه پر شده است',
      '16': 'عدم مجوز شماره برای ارسال از لینک',
      // سایر کدهای خطا
    };
    
    return errorMessages[code] || 'خطای ناشناخته در سرویس پیامک';
  }
}

export const smsService = new SmsService();
```

### ۲. استفاده از وب‌سرویس (SOAP)

آدرس وب‌سرویس: `https://webservice.0098sms.com/service.asmx?wsdl`

متدهای اصلی:
* `SendSMS`: ارسال پیامک تکی
* `SendSMSWithTime`: ارسال پیامک تکی با قابلیت تعیین زمان
* `SendSMSWithID`: ارسال پیامک و بازگشت شناسه پیامک
* `smsdeliveryState`: دریافت وضعیت تحویل پیامک
* `RemainSms`: دریافت مانده اعتبار

#### نمونه کد در Node.js با استفاده از SOAP

```javascript
import soap from 'soap';
import { logger } from '@shared/services/logger';

class SoapSmsService {
  constructor() {
    this.config = {
      username: process.env.SMS_USERNAME || 'zsms8829',
      password: process.env.SMS_PASSWORD || 'j494moo*O^HU',
      from: process.env.SMS_PANEL_NUMBER || '3000164545',
      wsdlUrl: 'https://webservice.0098sms.com/service.asmx?wsdl'
    };
    this.client = null;
  }
  
  // ایجاد کلاینت SOAP
  async initClient() {
    if (!this.client) {
      try {
        this.client = await soap.createClientAsync(this.config.wsdlUrl);
        logger.info('کلاینت SOAP سرویس پیامک با موفقیت ایجاد شد');
      } catch (error) {
        logger.error('خطا در ایجاد کلاینت SOAP:', error);
        throw new Error(`خطا در اتصال به سرویس پیامک: ${error.message}`);
      }
    }
    return this.client;
  }
  
  // ارسال پیامک تکی
  async sendSms(to, text) {
    try {
      const client = await this.initClient();
      const normalizedTo = this.normalizePhoneNumber(to);
      
      const args = {
        username: this.config.username,
        password: this.config.password,
        text,
        mobileno: normalizedTo,
        pnlno: this.config.from
      };
      
      const result = await client.SendSMSAsync(args);
      const response = result[0].SendSMSResult;
      
      if (response === '0') {
        logger.info(`پیامک با موفقیت به ${normalizedTo} ارسال شد`);
        return { success: true, code: response };
      } else {
        logger.error(`خطا در ارسال پیامک به ${normalizedTo}: کد ${response}`);
        return { success: false, code: response, message: this.getErrorMessage(response) };
      }
    } catch (error) {
      logger.error('خطا در سرویس SOAP پیامک:', error);
      throw new Error(`خطا در ارسال پیامک: ${error.message}`);
    }
  }
  
  // سایر متدها مشابه کلاس قبلی...
}

export const soapSmsService = new SoapSmsService();
```

## پیاده‌سازی سیستم احراز هویت با پیامک

### مدل سرویس OTP

```javascript
// modules/auth/services/otpService.ts
import { smsService } from '@shared/services/smsService';
import { cacheService } from '@shared/services/cacheService';
import { randomDigits } from '@shared/utils/random';

class OtpService {
  // مدت زمان اعتبار کد (به ثانیه)
  private readonly OTP_EXPIRY = 120;
  
  // تولید کد تصادفی و ارسال به شماره موبایل
  async generateAndSendOtp(phoneNumber) {
    // تولید کد 6 رقمی
    const otp = randomDigits(6);
    
    // ذخیره در کش با زمان انقضا
    const cacheKey = `otp:${phoneNumber}`;
    await cacheService.set(cacheKey, otp, this.OTP_EXPIRY);
    
    // متن پیامک
    const message = `کد تایید شما در دستیار هوشمند 123: ${otp}\nاین کد تا ${this.OTP_EXPIRY / 60} دقیقه معتبر است.`;
    
    // ارسال پیامک
    const result = await smsService.sendSms(phoneNumber, message);
    
    return {
      success: result.success,
      expiresIn: this.OTP_EXPIRY,
      phoneNumber
    };
  }
  
  // بررسی صحت کد وارد شده
  async verifyOtp(phoneNumber, userEnteredOtp) {
    const cacheKey = `otp:${phoneNumber}`;
    const storedOtp = await cacheService.get(cacheKey);
    
    if (!storedOtp) {
      return { 
        verified: false, 
        reason: 'expired',
        message: 'کد وارد شده منقضی شده است. لطفاً درخواست کد جدید نمایید.'
      };
    }
    
    if (storedOtp === userEnteredOtp) {
      // حذف کد پس از تایید موفق
      await cacheService.delete(cacheKey);
      
      return { 
        verified: true,
        message: 'کد با موفقیت تایید شد.'
      };
    }
    
    return { 
      verified: false,
      reason: 'invalid',
      message: 'کد وارد شده صحیح نیست. لطفاً مجدداً تلاش کنید.'
    };
  }
}

export const otpService = new OtpService();
```

### نمونه کامپوننت فرانت‌اند برای احراز هویت با OTP

```tsx
// modules/auth/components/OtpVerification/OtpVerification.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { useCountdown } from '@shared/hooks/useCountdown';
import { otpApi } from '@modules/auth/services/api/otpApi';
import { DigitConverterInput } from '@shared/components/base/DigitConverterInput';

const { Title, Text } = Typography;

interface OtpVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onCancel: () => void;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  phoneNumber,
  onVerified,
  onCancel
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendingOtp, setSendingOtp] = useState(false);
  
  // شمارنده معکوس برای ارسال مجدد
  const { seconds, isActive, startCountdown, resetCountdown } = useCountdown(120);
  
  // ارسال کد هنگام نمایش کامپوننت
  useEffect(() => {
    sendOtp();
  }, []);
  
  // ارسال کد تایید
  const sendOtp = async () => {
    try {
      setSendingOtp(true);
      setError(null);
      
      const response = await otpApi.sendOtp(phoneNumber);
      
      if (response.success) {
        startCountdown(response.expiresIn);
      } else {
        setError('خطا در ارسال پیامک. لطفاً بعداً تلاش کنید.');
      }
    } catch (error) {
      setError('خطای سیستمی. لطفاً بعداً تلاش کنید.');
    } finally {
      setSendingOtp(false);
    }
  };
  
  // ارسال مجدد کد
  const handleResend = () => {
    resetCountdown();
    sendOtp();
  };
  
  // تایید کد وارد شده
  const handleVerify = async (values: { otp: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await otpApi.verifyOtp(phoneNumber, values.otp);
      
      if (response.verified) {
        // اعلام تایید به کامپوننت والد
        onVerified();
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('خطای سیستمی. لطفاً بعداً تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Title level={4}>تایید شماره موبایل</Title>
      <Text>
        کد تایید به شماره {phoneNumber} ارسال شد.
        لطفاً کد دریافتی را وارد کنید.
      </Text>
      
      {error && <Alert type="error" message={error} style={{ margin: '16px 0' }} />}
      
      <Form form={form} onFinish={handleVerify} layout="vertical">
        <Form.Item 
          name="otp" 
          label="کد تایید" 
          rules={[{ required: true, message: 'لطفاً کد تایید را وارد کنید' }]}
        >
          <DigitConverterInput maxLength={6} size="large" />
        </Form.Item>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onCancel}>انصراف</Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
          >
            تایید
          </Button>
        </div>
        
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          {isActive ? (
            <Text type="secondary">
              ارسال مجدد کد تا {seconds} ثانیه دیگر
            </Text>
          ) : (
            <Button 
              type="link" 
              onClick={handleResend} 
              loading={sendingOtp}
            >
              ارسال مجدد کد
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
```

## نکات امنیتی

1. **محافظت از اطلاعات حساس**:
   - نام کاربری و رمز عبور سرویس پیامک باید به صورت متغیرهای محیطی ذخیره شوند
   - هرگز این اطلاعات را در کد فرانت‌اند قرار ندهید

2. **محدودیت در ارسال پیامک**:
   - محدودیت تعداد درخواست کد تایید (حداکثر 3 بار در 10 دقیقه)
   - محدودیت تلاش‌های نامعتبر برای تایید کد (حداکثر 5 بار)

3. **مدت زمان اعتبار کد**:
   - کدهای تایید باید دارای زمان انقضای کوتاه باشند (معمولاً 2 تا 5 دقیقه)

4. **تست و مانیتورینگ**:
   - مانیتورینگ مداوم نرخ ارسال پیامک و خطاها
   - اطمینان از کارکرد سرویس با تست دوره‌ای

## رفع مشکلات رایج

| مشکل | علت احتمالی | راه حل |
|------|-------------|--------|
| عدم دریافت پیامک | مشکل در سرویس مخابراتی | استفاده از روش‌های جایگزین مانند تماس صوتی |
| خطای اعتبار ناکافی | تمام شدن اعتبار پیامکی | شارژ حساب سرویس پیامک |
| خطای شماره اشتباه | فرمت نادرست شماره موبایل | بررسی و اصلاح فرمت شماره با استفاده از تابع normalizePhoneNumber |
| عملکرد کند سرویس | مشکل در سرویس SOAP | استفاده از روش HTTP GET به عنوان جایگزین |

</div> 
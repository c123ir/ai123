// src/components/common/OTPInput.tsx - کامپوننت ورود کد تأیید چند رقمی

import React, { useState, useRef, useEffect } from 'react';
import { Typography, Input, theme } from 'antd';
import { convertPersianToEnglish as convertPersianToEnglishNumbers } from './DigitConverter';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  title?: string;
}

const { useToken } = theme;

// استایل کادر ورود کد
const OTPInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  direction: ltr; // تنظیم جهت LTR برای کانتینر اصلی
  @media (max-width: 480px) {
    gap: 10px;
  }
`;

// استایل هر فیلد کد به صورت استایل کامپوننت با emotion
const OTPField = styled.input<{ $error?: boolean, $token: any }>`
  width: 65px;
  height: 75px;
  padding: 0;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  border-radius: 16px;
  border: 2px solid ${props => props.$error 
    ? props.$token.colorError 
    : props.$token.colorPrimary + '50'};
  box-shadow: 0 10px 25px ${props => props.$error 
    ? props.$token.colorError + '30' 
    : props.$token.colorPrimary + '30'};
  backdrop-filter: blur(8px);
  background: ${props => props.$token.colorBgContainer + '10'};
  color: ${props => props.$token.colorText};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus {
    outline: none;
    border-color: ${props => props.$error 
      ? props.$token.colorError 
      : props.$token.colorPrimary};
    box-shadow: 0 10px 25px ${props => props.$error 
      ? props.$token.colorError + '40' 
      : props.$token.colorPrimary + '40'};
    transform: translateY(-4px);
    background: ${props => props.$error 
      ? props.$token.colorError + '10' 
      : props.$token.colorPrimary + '10'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    width: 55px;
    height: 65px;
    font-size: 24px;
  }
`;

// کامپوننت ورودی با انیمیشن
const AnimatedInput = React.forwardRef<HTMLInputElement, { 
  error: boolean;
  index: number; 
  token: any;
} & React.InputHTMLAttributes<HTMLInputElement>>(({ 
  error,
  index,
  token,
  ...props 
}, ref) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.1 * index,
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <OTPField
          ref={ref}
          $error={error}
          $token={token}
          {...props}
        />
      </motion.div>
    </motion.div>
  );
});

/**
 * کامپوننت ورود کد تأیید (OTP) با انیمیشن و طراحی مدرن
 * پشتیبانی از ورود استاندارد LTR (چپ به راست)
 */
const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = false,
  autoFocus = true,
  title,
}) => {
  // دریافت توکن‌های تم
  const { token } = useToken();
  
  // استیت‌های کامپوننت
  const [otp, setOTP] = useState<string[]>(value.padEnd(length, '').split('').slice(0, length));
  
  // رفرنس به همه فیلدهای ورودی (به صورت آرایه)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // رفرنس برای رهگیری اینکه آیا کامپوننت هنوز مانت شده است
  const isMounted = useRef(true);
  
  // مدیریت value از بیرون
  useEffect(() => {
    // ریست کردن همه فیلدها وقتی value خالی است
    if (value === "") {
      setOTP(Array(length).fill(""));
    } else {
      setOTP(value.padEnd(length, '').split('').slice(0, length));
    }
    
    // وقتی value تغییر می‌کند (ریست شده)، مجددا فوکوس روی فیلد اول قرار می‌گیرد
    if (value === "" && autoFocus && !disabled && isMounted.current) {
      setTimeout(() => {
        if (isMounted.current && inputRefs.current[0]) {
          inputRefs.current[0]?.focus();
        }
      }, 100);
    }
  }, [value, length, autoFocus, disabled]);
  
  // تمرکز روی اولین فیلد در لود اولیه - با تأخیر بیشتر برای اطمینان از آماده بودن DOM
  useEffect(() => {
    // این useEffect فقط یکبار در مانت اجرا می‌شود
    isMounted.current = true;
    
    if (autoFocus && !disabled) {
      const timer = setTimeout(() => {
        if (isMounted.current && inputRefs.current[0]) {
          inputRefs.current[0]?.focus();
          inputRefs.current[0]?.select();
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // رفتار کامپوننت با تغییرات error
  useEffect(() => {
    // اگر error برطرف شده، فوکوس روی اولین فیلد خالی بگذاریم
    if (!error && autoFocus && !disabled && isMounted.current) {
      const timer = setTimeout(() => {
        // پیدا کردن اولین فیلد خالی
        let focusIndex = otp.findIndex(val => val === '');
        if (focusIndex === -1) focusIndex = 0;
        
        if (isMounted.current && inputRefs.current[focusIndex]) {
          inputRefs.current[focusIndex]?.focus();
          inputRefs.current[focusIndex]?.select();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [error, otp, autoFocus, disabled]);
  
  // مدیریت کلیدهای خاص (backspace، جهت)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // اجازه کلیدهای جهت، delete، backspace و تب
    if (
      e.key === 'ArrowUp' || 
      e.key === 'ArrowDown' || 
      e.key === 'Delete' || 
      e.key === 'Tab'
    ) {
      return;
    }
    
    // جلوگیری از انتشار برخی کلیدها
    if (
      e.key === 'e' || 
      e.key === 'E' || 
      e.key === '-' || 
      e.key === '.' || 
      e.key === '+'
    ) {
      e.preventDefault();
      return;
    }
    
    // مدیریت جهت راست و چپ (بین فیلدها)
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) inputRefs.current[index - 1]?.focus();
      return;
    }
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < length - 1) inputRefs.current[index + 1]?.focus();
      return;
    }
    
    // مدیریت Backspace
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        // اگر فیلد فعلی خالی است، به فیلد قبلی برود و آن را پاک کند
        if (index > 0) {
          const newOTP = [...otp];
          newOTP[index - 1] = '';
          setOTP(newOTP);
          inputRefs.current[index - 1]?.focus();
          
          // فراخوانی onChange با مقدار جدید
          const newValue = newOTP.join('');
          onChange?.(newValue);
        }
      }
    }
  };
  
  // مدیریت تغییر در هر فیلد
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    
    const value = e.target.value;
    
    // تبدیل اعداد فارسی به انگلیسی
    const englishNumbers = convertPersianToEnglishNumbers(value);
    // حذف کاراکترهای غیرعددی
    const numericValue = englishNumbers.replace(/[^0-9]/g, '');
    
    // اگر مقدار را پاک کرده‌اند، فقط فیلد فعلی را پاک می‌کنیم
    if (numericValue === '') {
      const newOTP = [...otp];
      newOTP[index] = '';
      setOTP(newOTP);
      
      // فراخوانی onChange با مقدار جدید
      const newValue = newOTP.join('');
      onChange?.(newValue);
      return;
    }
    
    // گرفتن آخرین کاراکتر عددی وارد شده
    const lastChar = numericValue.charAt(numericValue.length - 1);
    
    // بروزرسانی اوتی‌پی با رقم جدید
    const newOTP = [...otp];
    newOTP[index] = lastChar;
    setOTP(newOTP);
    
    // فراخوانی onChange با مقدار جدید
    const newValue = newOTP.join('');
    onChange?.(newValue);

    // اگر مقدار وارد شده، مقدار تکمیل شده را داریم
    if (newOTP.every(val => val !== '') && newValue.length === length) {
      onComplete?.(newValue);
      return;
    }
    
    // انتقال فوکوس به فیلد بعدی
    if (numericValue !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // مدیریت کلیک روی هر فیلد (انتخاب متن)
  const handleClick = (index: number) => {
    inputRefs.current[index]?.select();
  };
  
  // مدیریت paste کردن
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    
    const pasteData = e.clipboardData.getData('text/plain');
    const englishNumbers = convertPersianToEnglishNumbers(pasteData);
    // حذف کاراکترهای غیرعددی
    const numericValue = englishNumbers.replace(/[^0-9]/g, '');
    
    if (numericValue) {
      // پر کردن OTP با اعداد paste شده
      let newOTP = [...otp];
      
      for (let i = 0; i < length - index; i++) {
        if (i < numericValue.length) {
          newOTP[index + i] = numericValue[i];
        }
      }
      
      setOTP(newOTP);
      
      // فراخوانی onChange با مقدار جدید
      const newValue = newOTP.join('');
      onChange?.(newValue);
      
      // انتقال فوکوس به فیلد بعد از آخرین عدد پر شده
      const nextIndex = Math.min(index + numericValue.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      // اگر OTP تکمیل شد، onComplete را فراخوانی می‌کنیم
      if (newOTP.every(val => val !== '') && newValue.length === length) {
        onComplete?.(newValue);
      }
    }
  };
  
  return (
    <div>
      {title && (
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <Typography.Text>{title}</Typography.Text>
        </div>
      )}
      
      <OTPInputContainer>
        {Array(length).fill(null).map((_, index) => (
          <AnimatedInput
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleClick(index)}
            onPaste={(e) => handlePaste(e, index)}
            disabled={disabled}
            error={error}
            index={index}
            token={token}
          />
        ))}
      </OTPInputContainer>
    </div>
  );
};

export default OTPInput; 
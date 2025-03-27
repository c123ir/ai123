import React from 'react';
import { Form, Input, InputNumber, InputProps as AntInputProps } from 'antd';
import { FieldInputProps, FormikProps } from 'formik';
import { Rule } from 'antd/es/form';

type InputType = 'text' | 'password' | 'number' | 'email' | 'tel';

interface FormTextFieldProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label?: string;
  type?: InputType;
  required?: boolean;
  rules?: Rule[];
  hasFeedback?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  maxLength?: number;
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
  help?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'large' | 'middle' | 'small';
  [key: string]: any;
}

/**
 * کامپوننت فیلد متنی فرم با پشتیبانی از Formik و Ant Design
 * این کامپوننت برای تسهیل استفاده از Formik با فیلدهای ورودی Ant Design طراحی شده است
 */
const FormTextField: React.FC<FormTextFieldProps> = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
  type = 'text',
  required = false,
  hasFeedback = true,
  prefix,
  suffix,
  maxLength,
  validateStatus,
  help,
  onChange,
  ...props
}) => {
  // تشخیص خطا
  const error = touched[field.name] && errors[field.name];
  
  // تنظیم validateStatus بر اساس وضعیت خطا
  const status = validateStatus || (error ? 'error' : touched[field.name] ? 'success' : '');
  
  // تشخیص کامپوننت ورودی بر اساس نوع
  const getInputComponent = () => {
    switch (type) {
      case 'password':
        return (
          <Input.Password
            {...field}
            {...props}
            maxLength={maxLength}
            prefix={prefix}
            onChange={(e) => {
              setFieldValue(field.name, e.target.value);
              if (onChange) onChange(e);
            }}
          />
        );
      case 'number':
        return (
          <InputNumber
            style={{ width: '100%' }}
            {...field}
            {...props}
            onChange={(value) => {
              setFieldValue(field.name, value);
              if (onChange) onChange(value);
            }}
          />
        );
      default:
        return (
          <Input
            {...field}
            {...props}
            type={type}
            maxLength={maxLength}
            prefix={prefix}
            suffix={suffix}
            onChange={(e) => {
              setFieldValue(field.name, e.target.value);
              if (onChange) onChange(e);
            }}
          />
        );
    }
  };

  return (
    <Form.Item
      label={label}
      required={required}
      hasFeedback={hasFeedback}
      validateStatus={status}
      help={help || (error ? String(error) : undefined)}
    >
      {getInputComponent()}
    </Form.Item>
  );
};

export default FormTextField; 
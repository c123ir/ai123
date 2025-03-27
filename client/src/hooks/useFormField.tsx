import React from 'react';
import { useFormikContext, getIn } from 'formik';
import { Form, Input, InputProps, InputNumber } from 'antd';

type InputType = 'text' | 'password' | 'number' | 'email' | 'tel';

interface UseFormFieldParams {
  name: string;
  label?: string;
  type?: InputType;
  required?: boolean;
  showValidateSuccess?: boolean;
}

/**
 * هوک سفارشی برای استفاده آسان‌تر از Formik با Ant Design
 */
const useFormField = ({
  name,
  label,
  type = 'text',
  required = false,
  showValidateSuccess = true,
}: UseFormFieldParams) => {
  const { values, touched, errors, handleChange, handleBlur, setFieldValue } = useFormikContext<any>();
  
  // دریافت مقدار، وضعیت لمس و خطای فیلد از Formik
  const value = getIn(values, name);
  const isTouched = getIn(touched, name);
  const error = getIn(errors, name);
  
  // تعیین وضعیت اعتبارسنجی
  const validateStatus = error && isTouched
    ? 'error'
    : isTouched && showValidateSuccess
      ? 'success'
      : '';
  
  // تابع تغییر مقدار فیلد
  const onChange = (e: React.ChangeEvent<HTMLInputElement> | number | string) => {
    if (typeof e === 'number' || typeof e === 'string') {
      setFieldValue(name, e);
    } else {
      handleChange(e);
    }
  };
  
  // خصوصیات عمومی فیلد
  const fieldProps = {
    id: name,
    name,
    value,
    onChange,
    onBlur: handleBlur,
    status: validateStatus,
  };
  
  // خصوصیات Form.Item
  const formItemProps = {
    label,
    required,
    validateStatus: validateStatus as '' | 'success' | 'error' | 'warning' | 'validating',
    help: error && isTouched ? error : undefined,
    hasFeedback: showValidateSuccess,
  };
  
  // کامپوننت ورودی بر اساس نوع
  const renderField = (additionalProps?: any) => {
    switch (type) {
      case 'password':
        return (
          <Form.Item {...formItemProps}>
            <Input.Password
              {...fieldProps}
              {...additionalProps}
            />
          </Form.Item>
        );
      case 'number':
        return (
          <Form.Item {...formItemProps}>
            <InputNumber
              style={{ width: '100%' }}
              value={value === '' ? undefined : value}
              onChange={(val) => setFieldValue(name, val)}
              onBlur={handleBlur}
              {...additionalProps}
            />
          </Form.Item>
        );
      default:
        return (
          <Form.Item {...formItemProps}>
            <Input
              type={type}
              {...fieldProps}
              {...additionalProps}
            />
          </Form.Item>
        );
    }
  };
  
  return {
    value,
    isTouched,
    error,
    validateStatus,
    onChange,
    onBlur: handleBlur,
    fieldProps,
    formItemProps,
    renderField,
  };
};

export default useFormField; 
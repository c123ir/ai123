import React from 'react';
import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useThemeContext } from '../../context/ThemeContext';

/**
 * کامپوننت تغییر حالت تم (روشن/تاریک)
 */
const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Button
      type="text"
      onClick={toggleTheme}
      aria-label={mode === 'dark' ? 'تغییر به حالت روشن' : 'تغییر به حالت تاریک'}
      icon={mode === 'dark' ? <BulbOutlined /> : <BulbFilled />}
      size="large"
    />
  );
};

export default ThemeToggle; 
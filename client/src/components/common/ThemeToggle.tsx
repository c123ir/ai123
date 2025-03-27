import React from 'react';
import { Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { useThemeContext } from '../../context/ThemeContext';

/**
 * کامپوننت تغییر تم (تاریک/روشن)
 */
const ThemeToggle: React.FC = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Button
      type="text"
      onClick={toggleColorMode}
      aria-label={mode === 'dark' ? 'روشن کردن تم' : 'تاریک کردن تم'}
      icon={mode === 'dark' ? <BulbOutlined /> : <BulbFilled />}
      size="large"
    />
  );
};

export default ThemeToggle; 
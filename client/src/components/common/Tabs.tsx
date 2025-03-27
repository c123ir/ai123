import React, { ReactNode } from 'react';
import { Tabs as AntTabs } from 'antd';
import styled from '@emotion/styled';

const { TabPane } = AntTabs;

export interface TabsProps {
  children?: ReactNode;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  centered?: boolean;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  indicatorColor?: string;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabProps {
  children?: ReactNode;
  value: string | number;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  icon?: ReactNode;
}

export interface TabPanelProps {
  children?: ReactNode;
  value: string | number;
  index?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const StyledTabs = styled(AntTabs)<{ 
  $centered?: boolean; 
  $orientation?: string;
  $variant?: string;
  $indicatorColor?: string;
  $textColor?: string;
}>`
  ${props => props.$centered && `
    .ant-tabs-nav-wrap {
      justify-content: center;
    }
  `}
  
  ${props => props.$orientation === 'vertical' && `
    .ant-tabs-nav {
      width: 200px;
    }
  `}
  
  ${props => props.$variant === 'fullWidth' && `
    .ant-tabs-nav-list {
      width: 100%;
      
      .ant-tabs-tab {
        flex: 1;
        text-align: center;
      }
    }
  `}
  
  ${props => props.$indicatorColor && `
    .ant-tabs-ink-bar {
      background-color: ${props.$indicatorColor};
    }
  `}
  
  ${props => props.$textColor && `
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${props.$textColor};
    }
  `}
`;

/**
 * کامپوننت Tabs با استفاده از Tabs از Ant Design
 * این کامپوننت جایگزینی برای Tabs از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Tabs
 *   value={value}
 *   onChange={handleChange}
 *   centered
 *   variant="fullWidth"
 * >
 *   <Tab value="1" label="تب اول" />
 *   <Tab value="2" label="تب دوم" />
 *   <Tab value="3" label="تب سوم" />
 * </Tabs>
 * 
 * <TabPanel value={value} index="1">
 *   محتوای تب اول
 * </TabPanel>
 * <TabPanel value={value} index="2">
 *   محتوای تب دوم
 * </TabPanel>
 * <TabPanel value={value} index="3">
 *   محتوای تب سوم
 * </TabPanel>
 * ```
 */
const Tabs: React.FC<TabsProps> = ({
  children,
  value,
  defaultValue,
  onChange,
  centered = false,
  orientation = 'horizontal',
  variant = 'standard',
  indicatorColor,
  textColor,
  className,
  style,
}) => {
  // تبدیل مقدار به فرمت Ant Design
  const handleChange = (activeKey: string) => {
    if (onChange) {
      onChange(activeKey);
    }
  };

  return (
    <StyledTabs
      activeKey={value?.toString()}
      defaultActiveKey={defaultValue?.toString()}
      onChange={handleChange}
      tabPosition={orientation === 'vertical' ? 'left' : 'top'}
      type={variant === 'scrollable' ? 'card' : undefined}
      size="large"
      $centered={centered}
      $orientation={orientation}
      $variant={variant}
      $indicatorColor={indicatorColor}
      $textColor={textColor}
      className={className}
      style={style}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        
        const { value, disabled, label, className, style, icon, children } = child.props as TabProps;
        
        return (
          <TabPane 
            tab={
              <span>
                {icon && <span className="anticon" style={{ marginLeft: 8 }}>{icon}</span>}
                {label}
              </span>
            }
            key={value.toString()} 
            disabled={disabled}
            className={className}
            style={style}
          >
            {children}
          </TabPane>
        );
      })}
    </StyledTabs>
  );
};

/**
 * کامپوننت Tab برای استفاده در Tabs
 * این کامپوننت به عنوان فرزند Tabs استفاده می‌شود و معمولاً فقط برای پاس دادن پارامترها به کامپوننت Tabs
 */
export const Tab: React.FC<TabProps> = ({ children, ...props }) => {
  // این کامپوننت فقط برای پاس دادن پراپس به Tabs استفاده می‌شود و رندر نمی‌شود
  return <>{children}</>;
};

/**
 * کامپوننت TabPanel برای نمایش محتوای تب
 * پراپس value باید با مقدار تب مربوطه مطابقت داشته باشد
 */
export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default Tabs; 
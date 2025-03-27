import React, { ReactNode } from 'react';
import { Typography as AntTypography } from 'antd';
import styled from '@emotion/styled';

const { Title: AntTitle, Paragraph: AntParagraph, Text: AntText, Link: AntLink } = AntTypography;

export interface TypographyProps {
  children?: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  className?: string;
  style?: React.CSSProperties;
  component?: React.ElementType;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

// استایل‌های CSS به عنوان کلاس‌های واقعی
const TypographyStyled = styled.div`
  .gutterBottom {
    margin-bottom: 0.35em;
  }
  .noWrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .alignLeft { text-align: left; }
  .alignCenter { text-align: center; }
  .alignRight { text-align: right; }
  .alignJustify { text-align: justify; }
  .colorPrimary { color: #1890ff; }
  .colorSecondary { color: #722ed1; }
  .colorSuccess { color: #52c41a; }
  .colorWarning { color: #faad14; }
  .colorError { color: #f5222d; }
`;

// تابع کمکی برای تعیین رنگ
function getColor(color?: string): string {
  switch (color) {
    case 'primary':
      return '#1890ff';
    case 'secondary':
      return '#722ed1';
    case 'success':
      return '#52c41a';
    case 'warning':
      return '#faad14';
    case 'error':
      return '#f5222d';
    default:
      return color || 'inherit';
  }
}

// تعیین سایز برای Title
function getLevelFromVariant(variant?: string): 1 | 2 | 3 | 4 | 5 {
  switch (variant) {
    case 'h1':
      return 1;
    case 'h2':
      return 2;
    case 'h3':
      return 3;
    case 'h4':
      return 4;
    case 'h5':
    case 'h6':
    case 'subtitle1':
    case 'subtitle2':
      return 5;
    default:
      return 1;
  }
}

/**
 * کامپوننت Typography با استفاده از Typography از Ant Design
 * این کامپوننت جایگزینی برای Typography از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Typography variant="h1" color="primary" gutterBottom>
 *   عنوان اصلی
 * </Typography>
 * 
 * <Typography variant="body1" paragraph>
 *   این یک پاراگراف متن است که می‌تواند طولانی باشد.
 * </Typography>
 * 
 * <Typography variant="caption" color="secondary">
 *   متن کوچک با رنگ ثانویه
 * </Typography>
 * ```
 */
const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color,
  align,
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  className,
  style,
  component,
  onClick,
}) => {
  const customStyle = { 
    ...style, 
    ...(color && !['primary', 'secondary', 'success', 'warning', 'error'].includes(color) ? { color } : {})
  };

  const getAlignmentClass = (align?: string) => {
    if (!align || align === 'inherit') return '';
    return {
      left: 'alignLeft',
      center: 'alignCenter', 
      right: 'alignRight',
      justify: 'alignJustify'
    }[align] || '';
  };

  const getColorClass = (color?: string) => {
    if (!color || !['primary', 'secondary', 'success', 'warning', 'error'].includes(color)) return '';
    return `color${color.charAt(0).toUpperCase() + color.slice(1)}`;
  };

  // بر اساس variant و پراپرتی‌های دیگر، کامپوننت مناسب را انتخاب می‌کنیم
  if (variant === 'h1' || variant === 'h2' || variant === 'h3' || variant === 'h4' || variant === 'h5' || variant === 'h6') {
    const level = getLevelFromVariant(variant);
    
    const titleClasses = [
      className,
      gutterBottom ? 'gutterBottom' : '',
      noWrap ? 'noWrap' : '',
      getAlignmentClass(align),
      getColorClass(color)
    ].filter(Boolean).join(' ');
    
    return (
      <TypographyStyled>
        <AntTitle
          level={level}
          className={titleClasses || undefined}
          style={customStyle}
          onClick={onClick}
        >
          {children}
        </AntTitle>
      </TypographyStyled>
    );
  }
  
  if (paragraph || variant === 'body1') {
    const paragraphClasses = [
      className,
      gutterBottom ? 'gutterBottom' : '',
      noWrap ? 'noWrap' : '',
      getAlignmentClass(align),
      getColorClass(color)
    ].filter(Boolean).join(' ');
    
    return (
      <TypographyStyled>
        <AntParagraph
          className={paragraphClasses || undefined}
          style={customStyle}
          onClick={onClick}
        >
          {children}
        </AntParagraph>
      </TypographyStyled>
    );
  }
  
  // برای موارد باقیمانده از Text استفاده می‌کنیم
  const textClasses = [
    className,
    gutterBottom ? 'gutterBottom' : '',
    noWrap ? 'noWrap' : '',
    getAlignmentClass(align),
    getColorClass(color)
  ].filter(Boolean).join(' ');
  
  const textStyle = {
    ...customStyle,
    display: gutterBottom ? 'block' : undefined
  };
  
  return (
    <TypographyStyled>
      <AntText
        className={textClasses || undefined}
        style={textStyle}
        onClick={onClick}
      >
        {children}
      </AntText>
    </TypographyStyled>
  );
};

// زیر کامپوننت‌ها
export const Title: React.FC<TypographyProps & { level?: 1 | 2 | 3 | 4 | 5 }> = ({
  children,
  level = 1,
  variant,
  ...rest
}) => {
  // اگر variant تعیین شده، سطح را براساس آن تنظیم می‌کنیم
  const calculatedLevel = variant ? getLevelFromVariant(variant) : level;
  
  return (
    <Typography variant={`h${calculatedLevel}`} {...rest}>
      {children}
    </Typography>
  );
};

export const Paragraph: React.FC<TypographyProps> = (props) => {
  return <Typography paragraph {...props} />;
};

export const Text: React.FC<TypographyProps & { 
  strong?: boolean; 
  underline?: boolean; 
  delete?: boolean; 
  code?: boolean; 
  mark?: boolean;
  disabled?: boolean;
}> = ({
  children,
  strong,
  underline,
  delete: deleteProp,
  code,
  mark,
  disabled,
  ...rest
}) => {
  return (
    <Typography {...rest}>
      <AntText
        strong={strong}
        underline={underline}
        delete={deleteProp}
        code={code}
        mark={mark}
        disabled={disabled}
      >
        {children}
      </AntText>
    </Typography>
  );
};

export const Link: React.FC<TypographyProps & { href?: string; target?: string; }> = ({
  children,
  href,
  target,
  ...rest
}) => {
  return (
    <Typography {...rest}>
      <AntLink href={href} target={target}>
        {children}
      </AntLink>
    </Typography>
  );
};

export default Typography; 
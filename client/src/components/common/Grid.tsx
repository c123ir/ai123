import React, { ReactNode, CSSProperties } from 'react';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type GridJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type GridAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type GridColSpan = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// تبدیل فاصله‌گذاری از سیستم Material UI به Ant Design
const spacingToGutter = (spacing?: GridSpacing): number => {
  if (spacing === undefined) return 16; // مقدار پیش‌فرض
  return spacing * 8;
};

// استایل‌های مربوط به Container
const StyledContainer = styled.div<{
  $maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  $disableGutters?: boolean;
  $fixed?: boolean;
}>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${props => (props.$disableGutters ? 0 : 16)}px;
  padding-right: ${props => (props.$disableGutters ? 0 : 16)}px;
  box-sizing: border-box;
  
  ${props => props.$fixed && props.$maxWidth === 'xs' && `
    max-width: 444px;
  `}
  
  ${props => props.$fixed && props.$maxWidth === 'sm' && `
    max-width: 600px;
  `}
  
  ${props => props.$fixed && props.$maxWidth === 'md' && `
    max-width: 900px;
  `}
  
  ${props => props.$fixed && props.$maxWidth === 'lg' && `
    max-width: 1200px;
  `}
  
  ${props => props.$fixed && props.$maxWidth === 'xl' && `
    max-width: 1536px;
  `}
`;

// استایل‌های خاص Grid
const StyledGridContainer = styled.div<{
  $direction?: GridDirection;
  $wrap?: GridWrap;
  $zeroMinWidth?: boolean;
}>`
  ${props => props.$direction && `
    flex-direction: ${props.$direction};
  `}
  
  ${props => props.$wrap && `
    flex-wrap: ${props.$wrap};
  `}
  
  ${props => props.$zeroMinWidth && `
    min-width: 0;
  `}
`;

export interface ContainerProps {
  children?: ReactNode;
  className?: string;
  disableGutters?: boolean;
  fixed?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  style?: CSSProperties;
}

export interface GridProps {
  children?: ReactNode;
  className?: string;
  container?: boolean;
  direction?: GridDirection;
  item?: boolean;
  justify?: GridJustify;
  alignItems?: GridAlign;
  alignContent?: GridAlign;
  wrap?: GridWrap;
  zeroMinWidth?: boolean;
  spacing?: GridSpacing;
  xs?: boolean | GridColSpan;
  sm?: boolean | GridColSpan;
  md?: boolean | GridColSpan;
  lg?: boolean | GridColSpan;
  xl?: boolean | GridColSpan;
  style?: CSSProperties;
}

/**
 * کامپوننت Container برای نگهداری گرید‌ها
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  disableGutters = false,
  fixed = true,
  maxWidth = 'lg',
  style,
}) => {
  return (
    <StyledContainer
      className={className}
      $disableGutters={disableGutters}
      $fixed={fixed}
      $maxWidth={maxWidth}
      style={style}
    >
      {children}
    </StyledContainer>
  );
};

/**
 * کامپوننت Grid با استفاده از Row و Col از Ant Design
 * این کامپوننت جایگزینی برای Grid از Material UI است
 * 
 * نمونه استفاده:
 * ```jsx
 * <Grid container spacing={2}>
 *   <Grid item xs={12} md={6}>
 *     <div>ستون اول</div>
 *   </Grid>
 *   <Grid item xs={12} md={6}>
 *     <div>ستون دوم</div>
 *   </Grid>
 * </Grid>
 * ```
 */
const Grid: React.FC<GridProps> & { Container: React.FC<ContainerProps> } = ({
  children,
  className,
  container = false,
  direction,
  item = false,
  justify,
  alignItems,
  alignContent,
  wrap,
  zeroMinWidth = false,
  spacing,
  xs,
  sm,
  md,
  lg,
  xl,
  style,
  ...rest
}) => {
  // تبدیل justify از Material UI به Ant Design
  const getJustify = (justify?: GridJustify): 'start' | 'end' | 'center' | 'space-around' | 'space-between' => {
    if (!justify) return 'start';
    if (justify === 'flex-start') return 'start';
    if (justify === 'flex-end') return 'end';
    if (justify === 'space-evenly') return 'space-around';
    return justify as any;
  };
  
  // تبدیل align از Material UI به Ant Design
  const getAlign = (align?: GridAlign): 'top' | 'middle' | 'bottom' | 'stretch' => {
    if (!align) return 'top';
    if (align === 'flex-start') return 'top';
    if (align === 'center') return 'middle';
    if (align === 'flex-end') return 'bottom';
    if (align === 'baseline') return 'middle';
    return align as any;
  };
  
  // محاسبه span برای هر breakpoint
  const getColSpan = (value?: boolean | GridColSpan): number => {
    if (value === undefined || value === false) return 0;
    if (value === true) return 12;
    return value * 2; // Ant Design is 24 columns system, Material UI is 12 columns
  };
  
  // اگر این یک container است، از Row استفاده می‌کنیم
  if (container) {
    const gutter = spacingToGutter(spacing);
    
    return (
      <StyledGridContainer
        className={className}
        $direction={direction}
        $wrap={wrap}
        $zeroMinWidth={zeroMinWidth}
        style={style}
      >
        <Row
          gutter={gutter}
          justify={getJustify(justify)}
          align={getAlign(alignItems)}
          wrap={wrap !== 'nowrap'}
          {...rest}
        >
          {children}
        </Row>
      </StyledGridContainer>
    );
  }
  
  // اگر این یک item است، از Col استفاده می‌کنیم
  if (item) {
    const colProps = {
      span: getColSpan(xs),
      xs: getColSpan(xs),
      sm: getColSpan(sm),
      md: getColSpan(md),
      lg: getColSpan(lg),
      xl: getColSpan(xl),
    };
    
    return (
      <Col className={className} {...colProps} style={style} {...rest}>
        {children}
      </Col>
    );
  }
  
  // اگر هیچ‌کدام نباشد، فقط children را برمی‌گردانیم
  return <>{children}</>;
};

Grid.Container = Container;

export default Grid; 
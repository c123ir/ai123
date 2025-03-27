# راهنمای سیستم تم دستیار هوشمند ۱۲۳

<div dir="rtl">

این سند، راهنمای کامل سیستم تم و استایل‌دهی در پروژه **دستیار هوشمند یک دو سه** را ارائه می‌دهد. این راهنما شامل نحوه استفاده از سیستم تم، پالت رنگ، تایپوگرافی و کامپوننت‌های پایه است.

## محتویات

- [معرفی سیستم تم](#معرفی-سیستم-تم)
- [پالت رنگ](#پالت-رنگ)
- [تایپوگرافی](#تایپوگرافی)
- [فاصله‌گذاری و اندازه‌ها](#فاصله‌گذاری-و-اندازه‌ها)
- [سایه‌ها و افکت‌ها](#سایه‌ها-و-افکت‌ها)
- [کامپوننت‌های مشترک](#کامپوننت‌های-مشترک)
- [تم روشن و تاریک](#تم-روشن-و-تاریک)
- [استفاده از تم در کامپوننت‌ها](#استفاده-از-تم-در-کامپوننت‌ها)
- [راهنمایی‌های دسترسی‌پذیری](#راهنمایی‌های-دسترسی‌پذیری)

## معرفی سیستم تم

سیستم تم پروژه بر پایه Ant Design طراحی شده و دو حالت روشن و تاریک را پشتیبانی می‌کند. این سیستم از طریق ConfigProvider و React Context پیاده‌سازی شده و امکان تغییر حالت تم در زمان اجرا را فراهم می‌کند.

### ساختار فایل‌ها

```
src/
├── context/
│   └── ThemeContext.tsx   # کانتکست اصلی تم
├── theme/
│   ├── index.ts           # صادرات اصلی و پیکربندی تم
│   ├── themeConfig.ts     # تنظیمات پیشرفته تم
│   └── overrides.ts       # تنظیمات سفارشی کامپوننت‌ها
```

### نمونه پیاده‌سازی ThemeContext

```tsx
// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import { faIR } from 'antd/lib/locale';

const { defaultAlgorithm, darkAlgorithm } = theme;

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  mode: ThemeMode;
  toggleColorMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // بررسی می‌کند آیا تم قبلاً در localStorage ذخیره شده است
  const getInitialMode = (): ThemeMode => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode as ThemeMode;
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const themeConfig = useMemo((): ThemeConfig => {
    return {
      algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
      token: {
        colorPrimary: '#4caf50',
        colorSuccess: '#4caf50',
        colorInfo: '#2196f3',
        colorWarning: '#ff9800',
        colorError: '#f44336',
        borderRadius: 8,
        fontFamily: '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        Button: {
          colorPrimary: '#4caf50',
          borderRadius: 8,
        },
        Card: {
          borderRadius: 12,
        },
      },
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ConfigProvider theme={themeConfig} direction="rtl" locale={faIR}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// Hook برای استفاده آسان از کانتکست تم
export const useThemeContext = () => React.useContext(ThemeContext);
```

## پالت رنگ

پروژه از پالت رنگ زیر در سیستم تم Ant Design استفاده می‌کند:

### رنگ‌های اصلی

| نام متغیر | کد رنگ (روشن) | کد رنگ (تاریک) | کاربرد |
|-----------|--------------|--------------|---------|
| colorPrimary | `#4caf50` | `#4caf50` | رنگ اصلی برند، دکمه‌های اصلی |
| colorPrimaryBg | `#e6f7e6` | `#1b3a1d` | پس‌زمینه اصلی برند |
| colorPrimaryHover | `#66bb6a` | `#66bb6a` | حالت هاور رنگ اصلی |
| colorInfo | `#2196f3` | `#2196f3` | رنگ اطلاعات و تاکید |
| colorInfoHover | `#42a5f5` | `#42a5f5` | حالت هاور اطلاعات |

### رنگ‌های وضعیت

| نام متغیر | کد رنگ | کاربرد |
|-----------|--------|---------|
| colorSuccess | `#4caf50` | موفقیت و تایید |
| colorWarning | `#ff9800` | هشدار |
| colorError | `#f44336` | خطا و مشکل |
| colorInfo | `#2196f3` | اطلاعات |

### نمونه پیاده‌سازی themeConfig.ts

```typescript
// src/theme/themeConfig.ts
import { ThemeConfig } from 'antd/es/config-provider/context';
import { theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const getThemeConfig = (mode: 'light' | 'dark'): ThemeConfig => {
  return {
    algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
    token: {
      // رنگ‌های اصلی
      colorPrimary: '#4caf50',
      colorSuccess: '#4caf50',
      colorInfo: '#2196f3',
      colorWarning: '#ff9800',
      colorError: '#f44336',
      
      // تنظیمات عمومی
      borderRadius: 8,
      fontFamily: '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif',
      
      // تنظیمات متن
      fontSize: 14,
      
      // تنظیمات رنگ‌های مهم
      colorTextBase: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
      colorBgBase: mode === 'light' ? '#ffffff' : '#121212',
    },
    components: {
      Button: {
        borderRadius: 8,
        paddingInline: 16,
      },
      Card: {
        borderRadius: 12,
      },
      Input: {
        borderRadius: 8,
      },
      Select: {
        borderRadius: 8,
      },
      Modal: {
        borderRadius: 12,
      },
    },
  };
};
```

## تایپوگرافی

پروژه از فونت **وزیرمتن** (Vazirmatn) به عنوان فونت اصلی استفاده می‌کند. این فونت مناسب برای متون فارسی است و پشتیبانی خوبی از اعداد فارسی و عربی دارد.

### تنظیمات فونت

| استایل | اندازه | وزن | کاربرد |
|---------|--------|------|---------|
| h1 | 2.5rem | 700 | عنوان اصلی صفحه |
| h2 | 2rem | 700 | عنوان بخش‌های اصلی |
| h3 | 1.75rem | 600 | عنوان بخش‌های فرعی |
| h4 | 1.5rem | 600 | عنوان زیربخش‌ها |
| h5 | 1.25rem | 500 | عنوان‌های کوچک |
| h6 | 1rem | 500 | عنوان‌های بسیار کوچک |
| body1 | 1rem | 400 | متن اصلی |
| body2 | 0.875rem | 400 | متن فرعی |
| button | 0.875rem | 500 | متن دکمه‌ها |
| caption | 0.75rem | 400 | زیرنویس و توضیحات |

### نمونه پیاده‌سازی typography.ts

```typescript
// src/theme/typography.ts
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const getTypography = (): TypographyOptions => {
  return {
    fontFamily: 'Vazirmatn, "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.7,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
  };
};
```

### استفاده از فونت

برای استفاده از فونت وزیرمتن، ابتدا باید آن را به پروژه اضافه کنید. فایل‌های فونت در مسیر `public/fonts/vazirmatn` قرار دارند. سپس در CSS اصلی پروژه آن را تعریف کنید:

```css
/* src/styles/global.css */
@font-face {
  font-family: 'Vazirmatn';
  src: url('/fonts/vazirmatn/Vazirmatn-Regular.woff2') format('woff2'),
       url('/fonts/vazirmatn/Vazirmatn-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Vazirmatn';
  src: url('/fonts/vazirmatn/Vazirmatn-Medium.woff2') format('woff2'),
       url('/fonts/vazirmatn/Vazirmatn-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Vazirmatn';
  src: url('/fonts/vazirmatn/Vazirmatn-Bold.woff2') format('woff2'),
       url('/fonts/vazirmatn/Vazirmatn-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: 'Vazirmatn', sans-serif;
}
```

## فاصله‌گذاری و اندازه‌ها

برای ایجاد یکپارچگی در طراحی، از سیستم فاصله‌گذاری استاندارد استفاده می‌کنیم:

### فاصله‌های پایه

| نام | اندازه | کاربرد |
|-----|--------|---------|
| spacing(1) | 8px | فاصله بسیار کوچک |
| spacing(2) | 16px | فاصله کوچک (پدینگ دکمه‌ها) |
| spacing(3) | 24px | فاصله متوسط |
| spacing(4) | 32px | فاصله زیاد |
| spacing(5) | 40px | فاصله بسیار زیاد |
| spacing(6) | 48px | فاصله بین بخش‌های اصلی |

### اندازه‌های کامپوننت‌ها

| کامپوننت | اندازه | توضیحات |
|----------|--------|---------|
| Button (small) | height: 32px | دکمه‌های کوچک |
| Button (medium) | height: 40px | دکمه‌های متوسط (پیش‌فرض) |
| Button (large) | height: 48px | دکمه‌های بزرگ |
| TextField | height: 56px | فیلدهای ورودی |
| Card | padding: 16px | کارت‌ها |
| Dialog | padding: 24px | دیالوگ‌ها |
| Tooltip | padding: 8px | تولتیپ‌ها |

## سایه‌ها و افکت‌ها

سایه‌ها و افکت‌ها برای ایجاد عمق در رابط کاربری استفاده می‌شوند:

| نام | ارتفاع | کاربرد |
|-----|--------|---------|
| elevation(1) | سایه کم | کارت‌ها، پنل‌ها |
| elevation(2) | سایه متوسط | منوها، لیست‌های کشویی |
| elevation(3) | سایه متوسط-زیاد | دیالوگ‌ها، منوهای پاپ‌آپ |
| elevation(4) | سایه زیاد | ناوبری ثابت، هدر |
| elevation(8) | سایه بسیار زیاد | مودال‌ها |

### نمونه پیاده‌سازی shadows

```typescript
// src/theme/shadows.ts
import { Shadows } from '@mui/material/styles/shadows';

export const getShadows = (mode: 'light' | 'dark'): Shadows => {
  const opacity = mode === 'light' ? 0.2 : 0.5;
  return [
    'none',
    `0px 2px 1px -1px rgba(0,0,0,${opacity}), 0px 1px 1px 0px rgba(0,0,0,${opacity * 0.7}), 0px 1px 3px 0px rgba(0,0,0,${opacity * 0.5})`,
    `0px 3px 1px -2px rgba(0,0,0,${opacity}), 0px 2px 2px 0px rgba(0,0,0,${opacity * 0.7}), 0px 1px 5px 0px rgba(0,0,0,${opacity * 0.5})`,
    // ... و غیره
  ] as Shadows;
};
```

## کامپوننت‌های مشترک

### دکمه‌ها

دکمه‌ها در سه نوع اصلی طراحی شده‌اند:

1. **دکمه‌های اصلی (contained)**: با رنگ پس‌زمینه کامل
2. **دکمه‌های خطی (outlined)**: با حاشیه و بدون پس‌زمینه
3. **دکمه‌های متنی (text)**: بدون حاشیه و پس‌زمینه

```tsx
// نمونه استفاده از دکمه‌ها
import Button from '@mui/material/Button';

<Button variant="contained" color="primary">دکمه اصلی</Button>
<Button variant="outlined" color="primary">دکمه خطی</Button>
<Button variant="text" color="primary">دکمه متنی</Button>
```

### فیلدهای ورودی

فیلدهای ورودی با استایل‌های مختلف پشتیبانی می‌شوند:

1. **Outlined (پیش‌فرض)**: با حاشیه و ظاهر متمایز
2. **Filled**: با پس‌زمینه پر شده
3. **Standard**: با خط زیرین

```tsx
// نمونه استفاده از فیلدهای ورودی
import TextField from '@mui/material/TextField';

<TextField variant="outlined" label="نام کاربری" />
<TextField variant="filled" label="ایمیل" />
<TextField variant="standard" label="رمز عبور" type="password" />
```

## تم روشن و تاریک

پروژه از دو تم روشن و تاریک پشتیبانی می‌کند که کاربر می‌تواند بین آن‌ها جابجا شود.

### نمونه پیاده‌سازی تم در index.ts

```typescript
// src/theme/index.ts
import { ThemeOptions, PaletteMode } from '@mui/material/styles';
import { getPalette } from './palette';
import { getTypography } from './typography';
import { getShadows } from './shadows';
import { getComponents } from './overrides';

export const getTheme = (mode: PaletteMode): ThemeOptions => {
  const palette = getPalette(mode);
  const typography = getTypography();
  const shadows = getShadows(mode);
  const components = getComponents(mode);

  return {
    direction: 'rtl',
    palette,
    typography,
    shadows,
    components,
    shape: {
      borderRadius: 8,
    },
  };
};
```

### نمونه استفاده از دکمه تغییر تم

```tsx
// src/components/common/ThemeToggle.tsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <IconButton 
      onClick={toggleColorMode} 
      color="inherit"
      aria-label={mode === 'dark' ? 'روشن کردن تم' : 'تاریک کردن تم'}
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;
```

## استفاده از تم در کامپوننت‌ها

برای دسترسی به تم در کامپوننت‌ها، می‌توانید از هوک `useTheme` استفاده کنید:

```tsx
// نمونه استفاده از تم در کامپوننت
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ThemedComponent: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography variant="h5" gutterBottom>
        عنوان با تم پویا
      </Typography>
      <Typography variant="body1">
        محتوا با رنگ‌های تم فعلی نمایش داده می‌شود.
      </Typography>
    </Box>
  );
};

export default ThemedComponent;
```

### استفاده از `sx` prop

برای استایل‌دهی اجزای Material UI، از prop `sx` استفاده کنید:

```tsx
<Box
  sx={{
    // استفاده از متغیرهای تم
    backgroundColor: 'background.paper',
    color: 'text.primary',
    p: 3, // معادل padding: theme.spacing(3)
    borderRadius: 1, // معادل theme.shape.borderRadius
    
    // استفاده از media queries
    [theme.breakpoints.down('md')]: {
      p: 2,
      fontSize: '0.9rem',
    },
    
    // استفاده از شبه‌کلاس‌ها
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  }}
>
  محتوای باکس
</Box>
```

## راهنمایی‌های دسترسی‌پذیری

برای اطمینان از دسترسی‌پذیری مناسب، لطفاً این نکات را رعایت کنید:

1. **کنتراست رنگی مناسب**: اطمینان حاصل کنید که کنتراست بین متن و پس‌زمینه کافی است.
2. **برچسب‌های توصیفی**: برای همه عناصر تعاملی، برچسب‌های توصیفی مناسب تعریف کنید.
3. **پشتیبانی از صفحه‌خوان**: از آتریبیوت‌های `aria-*` برای بهبود دسترسی‌پذیری استفاده کنید.
4. **استفاده از استایل‌های focus**: استایل‌های focus را حذف نکنید و آن‌ها را به شکلی واضح نمایش دهید.

```tsx
// نمونه استفاده از aria-label
<IconButton 
  aria-label="بستن" 
  onClick={handleClose}
>
  <CloseIcon />
</IconButton>
```

## نمونه کامل تنظیمات تم

```typescript
// src/theme/index.ts
import { createTheme, responsiveFontSizes, ThemeOptions, PaletteMode } from '@mui/material/styles';

export const getTheme = (mode: PaletteMode): ThemeOptions => {
  const baseTheme = {
    direction: 'rtl',
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
        light: mode === 'light' ? '#42a5f5' : '#bbdefb',
        dark: mode === 'light' ? '#1565c0' : '#42a5f5',
      },
      secondary: {
        main: mode === 'light' ? '#9c27b0' : '#ce93d8',
        light: mode === 'light' ? '#ba68c8' : '#e1bee7',
        dark: mode === 'light' ? '#7b1fa2' : '#ab47bc',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    typography: {
      fontFamily: 'Vazirmatn, "Roboto", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
      },
      // ... سایر تنظیمات تایپوگرافی
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      // ... سایر بازنویسی‌های کامپوننت‌ها
    },
    shape: {
      borderRadius: 8,
    },
  };

  // اضافه کردن responsive font sizes
  return responsiveFontSizes(createTheme(baseTheme));
};
```

برای اطلاعات بیشتر درباره سیستم تم Material UI، به [مستندات رسمی](https://mui.com/customization/theming/) مراجعه کنید.

</div> 
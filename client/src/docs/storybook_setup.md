# راهنمای استفاده از Storybook در پروژه دستیار هوشمند یک دو سه

<div dir="rtl">

## معرفی

Storybook یک ابزار توسعه برای کامپوننت‌های UI است که به شما امکان می‌دهد کامپوننت‌ها را به صورت ایزوله ساخته و مشاهده کنید. این ابزار می‌تواند برای موارد زیر استفاده شود:

- توسعه کامپوننت‌ها به صورت مجزا از منطق اصلی برنامه
- تست کامپوننت‌ها با پارامترهای مختلف
- ایجاد مستندات برای کامپوننت‌ها
- اشتراک‌گذاری کامپوننت‌ها با تیم توسعه

## نصب و راه‌اندازی

Storybook در پروژه دستیار هوشمند ۱۲۳ نصب شده است. برای شروع کار با آن مراحل زیر را دنبال کنید:

### اجرای Storybook

برای اجرای محیط توسعه Storybook، دستور زیر را در ترمینال وارد کنید:

```bash
npm run storybook
```

این دستور یک سرور محلی در پورت ۶۰۰۶ راه‌اندازی می‌کند و به صورت خودکار یک صفحه مرورگر را باز می‌کند که محیط Storybook را نمایش می‌دهد.

### ساختار فایل‌ها

تمام فایل‌های مربوط به Storybook در پوشه `.storybook` قرار دارند:

```
.storybook/
  ├── main.js  # تنظیمات اصلی
  ├── preview.js  # تنظیمات پیش‌نمایش
  └── theme.js  # تم سفارشی Storybook
```

برای هر کامپوننت، یک فایل داستان با نام `ComponentName.stories.tsx` ایجاد می‌شود که شامل داستان‌ها (stories) برای آن کامپوننت است.

## نوشتن اولین داستان

برای ایجاد یک داستان برای یک کامپوننت، مراحل زیر را دنبال کنید:

1. یک فایل با پسوند `.stories.tsx` در کنار فایل کامپوننت خود ایجاد کنید:

```tsx
// Button.stories.tsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه اصلی',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'contained',
  color: 'secondary',
  children: 'دکمه ثانویه',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  children: 'دکمه متنی',
};
```

2. برای هر وضعیت کامپوننت، یک داستان با استفاده از `Template.bind({})` ایجاد کنید.
3. پارامترهای هر داستان را در ویژگی `args` تنظیم کنید.

## سازماندهی داستان‌ها

برای سازماندهی بهتر داستان‌ها، از ساختار پوشه‌ای در عنوان استفاده کنید:

```tsx
export default {
  title: 'Modules/Token/Components/TokenBalance',
  component: TokenBalance,
} as ComponentMeta<typeof TokenBalance>;
```

این باعث می‌شود که کامپوننت‌ها در منوی Storybook به صورت سلسله مراتبی نمایش داده شوند.

## افزودن توضیحات و مستندات

برای افزودن توضیحات به کامپوننت و داستان‌ها، از JSDoc و پارامتر `parameters` استفاده کنید:

```tsx
/**
 * کامپوننت دکمه با قابلیت‌های متنوع و پشتیبانی از انواع وضعیت‌های ظاهری
 */
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'کامپوننت دکمه با قابلیت‌های متنوع برای استفاده در فرم‌ها و اقدامات کاربری',
      },
    },
  },
} as ComponentMeta<typeof Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'contained',
  color: 'primary',
  children: 'دکمه اصلی',
};
Primary.parameters = {
  docs: {
    description: {
      story: 'دکمه اصلی با رنگ اولیه برای اقدامات مهم',
    },
  },
};
```

## استفاده از Decorators

برای افزودن محیط به داستان‌ها، از Decorators استفاده کنید:

```tsx
export default {
  title: 'Modules/Token/Components/TokenBalance',
  component: TokenBalance,
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TokenBalance>;
```

## تست کامپوننت‌ها با Storybook

Storybook می‌تواند برای تست کامپوننت‌ها با پارامترهای مختلف استفاده شود. با استفاده از ابزارهایی مانند Storybook Interactions و Storybook Test Runner، می‌توانید تست‌های کاربری را مستقیماً در Storybook اجرا کنید.

```tsx
export const WithInput = Template.bind({});
WithInput.args = {
  // ...
};
WithInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('textbox');
  await userEvent.type(input, 'مقدار تست');
  const button = canvas.getByRole('button');
  await userEvent.click(button);
};
```

## نکات مهم

- همیشه برای هر کامپوننت، داستان‌های مختلف با پارامترهای متفاوت ایجاد کنید.
- از توضیحات JSDoc برای مستندسازی کامپوننت‌ها استفاده کنید.
- از Controls برای تغییر پارامترهای کامپوننت در زمان اجرا استفاده کنید.
- از Actions برای رهگیری رویدادها استفاده کنید.
- کامپوننت‌های خود را در محیط‌های مختلف (موبایل، تبلت، دسکتاپ) بررسی کنید.

## منابع بیشتر

- [مستندات رسمی Storybook](https://storybook.js.org/docs/react/get-started/introduction)
- [راهنمای نوشتن داستان‌ها](https://storybook.js.org/docs/react/writing-stories/introduction)
- [راهنمای پیکربندی Storybook](https://storybook.js.org/docs/react/configure/overview)

</div>

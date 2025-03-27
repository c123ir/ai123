-- ایجاد جدول قالب‌های ایمیل
CREATE TABLE email_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    subject VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ایجاد جدول تاریخچه ایمیل‌ها
CREATE TABLE email_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    template_id INTEGER REFERENCES email_templates(id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB
);

-- ایجاد ایندکس‌ها برای بهینه‌سازی جستجو
CREATE INDEX email_templates_name_idx ON email_templates(name);
CREATE INDEX email_history_user_id_idx ON email_history(user_id);
CREATE INDEX email_history_email_idx ON email_history(email);
CREATE INDEX email_history_status_idx ON email_history(status);
CREATE INDEX email_history_sent_at_idx ON email_history(sent_at);

-- ایجاد تابع به‌روزرسانی خودکار فیلد updated_at
CREATE OR REPLACE FUNCTION update_email_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ایجاد تریگر برای به‌روزرسانی خودکار فیلد updated_at
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON email_templates
FOR EACH ROW
EXECUTE FUNCTION update_email_templates_updated_at();

-- اضافه کردن چند قالب ایمیل پیش‌فرض
INSERT INTO email_templates (name, subject, html_content, text_content) VALUES 
(
    'welcome_email',
    'خوش آمدید به سیستم',
    '<div dir="rtl"><h1>خوش آمدید!</h1><p>سلام {{username}}،</p><p>به سیستم خوش آمدید. از ثبت‌نام شما متشکریم.</p><p>با احترام،<br>تیم پشتیبانی</p></div>',
    'سلام {{username}}،\n\nبه سیستم خوش آمدید. از ثبت‌نام شما متشکریم.\n\nبا احترام،\nتیم پشتیبانی'
),
(
    'password_reset',
    'بازیابی رمز عبور',
    '<div dir="rtl"><h1>بازیابی رمز عبور</h1><p>سلام،</p><p>برای بازیابی رمز عبور خود، لطفاً روی لینک زیر کلیک کنید:</p><p><a href="{{reset_link}}">بازیابی رمز عبور</a></p><p>این لینک به مدت 1 ساعت معتبر است.</p><p>با احترام،<br>تیم پشتیبانی</p></div>',
    'سلام،\n\nبرای بازیابی رمز عبور خود، لطفاً از لینک زیر استفاده کنید:\n\n{{reset_link}}\n\nاین لینک به مدت 1 ساعت معتبر است.\n\nبا احترام،\nتیم پشتیبانی'
),
(
    'account_verified',
    'حساب کاربری شما تأیید شد',
    '<div dir="rtl"><h1>حساب کاربری تأیید شد</h1><p>سلام {{username}}،</p><p>حساب کاربری شما با موفقیت تأیید شد. اکنون می‌توانید از همه امکانات سیستم استفاده کنید.</p><p>با احترام،<br>تیم پشتیبانی</p></div>',
    'سلام {{username}}،\n\nحساب کاربری شما با موفقیت تأیید شد. اکنون می‌توانید از همه امکانات سیستم استفاده کنید.\n\nبا احترام،\nتیم پشتیبانی'
),
(
    'purchase_confirmation',
    'تأیید خرید',
    '<div dir="rtl"><h1>تأیید خرید</h1><p>سلام {{username}}،</p><p>خرید شما با موفقیت انجام شد. جزئیات خرید:</p><p>شناسه تراکنش: {{transaction_id}}<br>مبلغ: {{amount}} تومان<br>تاریخ: {{date}}</p><p>با احترام،<br>تیم پشتیبانی</p></div>',
    'سلام {{username}}،\n\nخرید شما با موفقیت انجام شد. جزئیات خرید:\n\nشناسه تراکنش: {{transaction_id}}\nمبلغ: {{amount}} تومان\nتاریخ: {{date}}\n\nبا احترام،\nتیم پشتیبانی'
); 
# 04-DATABASE-DESIGN.md - طراحی پایگاه داده پروژه دستیار هوشمند یک دو سه

## مقدمه

این سند طراحی پایگاه داده پروژه دستیار هوشمند یک دو سه (SmartAi123) را توضیح می‌دهد. پایگاه داده این پروژه بر پایه PostgreSQL طراحی شده و از اصول نرمال‌سازی، بهینه‌سازی و قابلیت گسترش پیروی می‌کند.

## دیاگرام ER

دیاگرام ساده‌شده ارتباط موجودیت‌ها:

```
+----------------+       +----------------+       +----------------+
|     users      |       |     tokens     |       | transactions   |
+----------------+       +----------------+       +----------------+
| id             |<----->| user_id        |<----->| id             |
| first_name     |       | id             |       | user_id        |
| last_name      |       | amount         |       | token_id       |
| email          |       | type           |       | type           |
| password       |       | status         |       | amount         |
| phone_number   |       | created_at     |       | status         |
| role           |       | updated_at     |       | created_at     |
| status         |       | expired_at     |       +----------------+
| created_at     |       +----------------+              |
| updated_at     |                                       |
+----------------+                                       |
        |                                                |
        |                                                |
        v                                                v
+----------------+                             +----------------+
| user_profiles  |                             | payment_methods |
+----------------+                             +----------------+
| user_id        |                             | id             |
| national_id    |                             | user_id        |
| birth_date     |                             | type           |
| address        |                             | details        |
| postal_code    |                             | is_default     |
| avatar_url     |                             | created_at     |
| created_at     |                             +----------------+
| updated_at     |
+----------------+
        |
        |
        v
+----------------+       +----------------+
| notifications  |       |   settings     |
+----------------+       +----------------+
| id             |       | user_id        |
| user_id        |       | key            |
| title          |       | value          |
| message        |       | created_at     |
| type           |       | updated_at     |
| is_read        |       +----------------+
| created_at     |
+----------------+
```

## جداول و ساختار

### 1. جدول کاربران (users)

این جدول، اطلاعات اصلی کاربران را نگهداری می‌کند.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- شاخص‌ها
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone_number ON users(phone_number);
CREATE INDEX idx_users_status ON users(status);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **first_name**: نام کاربر
- **last_name**: نام خانوادگی کاربر
- **email**: آدرس ایمیل (یکتا)
- **password**: رمز عبور (هش شده)
- **phone_number**: شماره تلفن همراه (یکتا)
- **role**: نقش کاربر (admin, user, etc.)
- **status**: وضعیت کاربر (active, inactive, suspended)
- **created_at**: زمان ایجاد
- **updated_at**: زمان آخرین به‌روزرسانی

### 2. جدول پروفایل کاربران (user_profiles)

این جدول، اطلاعات تکمیلی پروفایل کاربران را نگهداری می‌کند.

```sql
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    national_id VARCHAR(20) UNIQUE,
    birth_date DATE,
    address TEXT,
    postal_code VARCHAR(10),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- شاخص‌ها
CREATE INDEX idx_user_profiles_national_id ON user_profiles(national_id);
```

#### توضیحات فیلدها
- **user_id**: شناسه کاربر (کلید خارجی به جدول users)
- **national_id**: کد ملی (یکتا)
- **birth_date**: تاریخ تولد
- **address**: آدرس کامل
- **postal_code**: کد پستی
- **avatar_url**: آدرس تصویر پروفایل
- **bio**: معرفی کوتاه
- **created_at**: زمان ایجاد
- **updated_at**: زمان آخرین به‌روزرسانی

### 3. جدول توکن‌ها (tokens)

این جدول، اطلاعات توکن‌های مانیبل (MoneyBell) را نگهداری می‌کند.

```sql
CREATE TABLE tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    source VARCHAR(50),
    source_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expired_at TIMESTAMP WITH TIME ZONE
);

-- شاخص‌ها
CREATE INDEX idx_tokens_user_id ON tokens(user_id);
CREATE INDEX idx_tokens_status ON tokens(status);
CREATE INDEX idx_tokens_created_at ON tokens(created_at);
CREATE INDEX idx_tokens_expired_at ON tokens(expired_at);
CREATE INDEX idx_tokens_source ON tokens(source, source_id);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **user_id**: شناسه کاربر (کلید خارجی به جدول users)
- **amount**: مقدار توکن
- **type**: نوع توکن (reward, purchase, referral, etc.)
- **status**: وضعیت توکن (active, used, expired)
- **source**: منبع توکن (purchase, reward, referral)
- **source_id**: شناسه منبع (مثلاً شناسه خرید)
- **created_at**: زمان ایجاد
- **updated_at**: زمان آخرین به‌روزرسانی
- **expired_at**: زمان انقضا (اختیاری)

### 4. جدول تراکنش‌ها (transactions)

این جدول، تراکنش‌های مرتبط با توکن‌ها را ثبت می‌کند.

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_id UUID REFERENCES tokens(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- شاخص‌ها
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_token_id ON transactions(token_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_metadata ON transactions USING GIN (metadata);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **user_id**: شناسه کاربر (کلید خارجی به جدول users)
- **token_id**: شناسه توکن (کلید خارجی به جدول tokens)
- **type**: نوع تراکنش (earn, spend, expire)
- **amount**: مقدار تراکنش
- **status**: وضعیت تراکنش (completed, pending, failed)
- **description**: توضیحات تراکنش
- **metadata**: اطلاعات اضافی (JSONB)
- **created_at**: زمان ایجاد

### 5. جدول روش‌های پرداخت (payment_methods)

این جدول، روش‌های پرداخت کاربران را نگهداری می‌کند.

```sql
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    details JSONB NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- شاخص‌ها
CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX idx_payment_methods_type ON payment_methods(type);
CREATE INDEX idx_payment_methods_is_default ON payment_methods(is_default);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **user_id**: شناسه کاربر (کلید خارجی به جدول users)
- **type**: نوع روش پرداخت (credit_card, bank_account)
- **details**: جزئیات روش پرداخت (JSONB)
- **is_default**: آیا روش پرداخت پیش‌فرض است
- **created_at**: زمان ایجاد
- **updated_at**: زمان آخرین به‌روزرسانی

### 6. جدول اعلان‌ها (notifications)

این جدول، اعلان‌های کاربران را نگهداری می‌کند.

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE
);

-- شاخص‌ها
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_type ON notifications(type);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **user_id**: شناسه کاربر (کلید خارجی به جدول users)
- **title**: عنوان اعلان
- **message**: متن اعلان
- **type**: نوع اعلان (token, system, transaction)
- **is_read**: آیا اعلان خوانده شده است
- **metadata**: اطلاعات اضافی (JSONB)
- **created_at**: زمان ایجاد
- **read_at**: زمان خواندن

### 7. جدول تنظیمات (settings)

این جدول، تنظیمات شخصی کاربران را نگهداری می‌کند.

```sql
CREATE TABLE settings (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, key)
);

-- شاخص‌ها
CREATE INDEX idx_settings_key ON settings(key);
```

#### توضیحات فیلدها
- **user_id**: شناسه کاربر (کلید خارجی به جدول users)
- **key**: کلید تنظیمات
- **value**: مقدار تنظیمات
- **created_at**: زمان ایجاد
- **updated_at**: زمان آخرین به‌روزرسانی

### 8. جدول رویدادها (events)

این جدول، رویدادهای سیستم را برای تحلیل و پایش ثبت می‌کند.

```sql
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- شاخص‌ها
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_event_type ON events(event_type);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_events_event_data ON events USING GIN (event_data);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **user_id**: شناسه کاربر (کلید خارجی به جدول users)
- **event_type**: نوع رویداد
- **event_data**: داده‌های رویداد (JSONB)
- **ip_address**: آدرس IP
- **user_agent**: مشخصات مرورگر
- **created_at**: زمان ایجاد

### 9. جدول برنامه‌های زمان‌بندی (schedules)

این جدول، برنامه‌های زمان‌بندی شده برای اجرای خودکار را نگهداری می‌کند.

```sql
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    cron_expression VARCHAR(100) NOT NULL,
    data JSONB,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_run TIMESTAMP WITH TIME ZONE,
    next_run TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- شاخص‌ها
CREATE INDEX idx_schedules_is_active ON schedules(is_active);
CREATE INDEX idx_schedules_next_run ON schedules(next_run);
CREATE INDEX idx_schedules_type ON schedules(type);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **name**: نام برنامه زمان‌بندی
- **type**: نوع برنامه (token_expiry, notification, report)
- **cron_expression**: عبارت cron برای تعیین زمان اجرا
- **data**: داده‌های مورد نیاز برای اجرا (JSONB)
- **is_active**: آیا برنامه فعال است
- **last_run**: آخرین زمان اجرا
- **next_run**: زمان اجرای بعدی
- **created_at**: زمان ایجاد
- **updated_at**: زمان آخرین به‌روزرسانی

### 10. جدول قالب‌های اعلان (notification_templates)

این جدول، قالب‌های اعلان‌ها و پیام‌های سیستم را نگهداری می‌کند.

```sql
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    title_template TEXT NOT NULL,
    message_template TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    channels JSONB NOT NULL DEFAULT '["in_app"]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- شاخص‌ها
CREATE INDEX idx_notification_templates_name ON notification_templates(name);
CREATE INDEX idx_notification_templates_type ON notification_templates(type);
```

#### توضیحات فیلدها
- **id**: شناسه یکتا (UUID)
- **name**: نام قالب
- **title_template**: قالب عنوان اعلان
- **message_template**: قالب متن اعلان
- **type**: نوع اعلان
- **channels**: کانال‌های ارسال اعلان (JSONB)
- **created_at**: زمان ایجاد
- **updated_at**: زمان آخرین به‌روزرسانی

## انواع داده و محدودیت‌ها

### انواع کاربر (user.role)
- `admin`: مدیر سیستم
- `user`: کاربر عادی
- `support`: کارشناس پشتیبانی
- `guest`: کاربر مهمان

### وضعیت کاربر (user.status)
- `active`: فعال
- `inactive`: غیرفعال
- `suspended`: تعلیق شده
- `banned`: مسدود شده

### انواع توکن (token.type)
- `reward`: توکن پاداش
- `purchase`: توکن خریداری شده
- `referral`: توکن دعوت دوستان
- `signup`: توکن ثبت‌نام
- `loyalty`: توکن وفاداری

### وضعیت توکن (token.status)
- `active`: فعال
- `used`: استفاده شده
- `expired`: منقضی شده
- `pending`: در انتظار

### انواع تراکنش (transaction.type)
- `earn`: کسب توکن
- `spend`: خرج کردن توکن
- `expire`: انقضای توکن
- `transfer`: انتقال توکن

### انواع اعلان (notification.type)
- `token`: اعلان مرتبط با توکن
- `system`: اعلان سیستمی
- `transaction`: اعلان تراکنش
- `security`: اعلان امنیتی

## روابط و محدودیت‌های یکپارچگی

### روابط یک به یک
- هر کاربر (`users`) دقیقاً یک پروفایل (`user_profiles`) دارد

### روابط یک به چند
- هر کاربر (`users`) می‌تواند چندین توکن (`tokens`) داشته باشد
- هر کاربر (`users`) می‌تواند چندین تراکنش (`transactions`) داشته باشد
- هر کاربر (`users`) می‌تواند چندین روش پرداخت (`payment_methods`) داشته باشد
- هر کاربر (`users`) می‌تواند چندین اعلان (`notifications`) داشته باشد
- هر کاربر (`users`) می‌تواند چندین تنظیم (`settings`) داشته باشد

### روابط چند به چند
- هیچ رابطه چند به چند مستقیمی در این طراحی وجود ندارد

### محدودیت‌های یکپارچگی
- حذف کاربر باعث حذف تمام داده‌های مرتبط با آن می‌شود (CASCADE)
- حذف توکن فقط باعث خالی شدن ارجاع در تراکنش‌ها می‌شود (SET NULL)
- ایمیل و شماره تلفن کاربران باید یکتا باشند (UNIQUE)
- کد ملی در پروفایل‌ها باید یکتا باشد (UNIQUE)

## توابع و تریگرها

### تابع به‌روزرسانی زمان

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### تریگر به‌روزرسانی زمان برای جداول

```sql
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- و سایر جداول...
```

### تریگر بررسی وضعیت توکن

```sql
CREATE OR REPLACE FUNCTION check_token_status()
RETURNS TRIGGER AS $$
BEGIN
    -- تبدیل وضعیت به منقضی شده در صورت گذشتن از زمان انقضا
    IF NEW.expired_at IS NOT NULL AND NEW.expired_at <= NOW() THEN
        NEW.status = 'expired';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_token_status_trigger
BEFORE INSERT OR UPDATE ON tokens
FOR EACH ROW
EXECUTE FUNCTION check_token_status();
```

### تریگر ثبت تراکنش برای توکن

```sql
CREATE OR REPLACE FUNCTION log_token_transaction()
RETURNS TRIGGER AS $$
BEGIN
    -- ثبت تراکنش برای توکن جدید
    IF TG_OP = 'INSERT' THEN
        INSERT INTO transactions (
            user_id, token_id, type, amount, status, description
        ) VALUES (
            NEW.user_id, NEW.id, 'earn', NEW.amount, 'completed',
            'کسب توکن ' || NEW.type
        );
    END IF;
    
    -- ثبت تراکنش برای تغییر وضعیت توکن به منقضی شده
    IF TG_OP = 'UPDATE' AND OLD.status != 'expired' AND NEW.status = 'expired' THEN
        INSERT INTO transactions (
            user_id, token_id, type, amount, status, description
        ) VALUES (
            NEW.user_id, NEW.id, 'expire', NEW.amount, 'completed',
            'انقضای توکن'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_token_transaction_trigger
AFTER INSERT OR UPDATE ON tokens
FOR EACH ROW
EXECUTE FUNCTION log_token_transaction();
```

## شاخص‌ها و بهینه‌سازی

### شاخص‌های کارایی

علاوه بر شاخص‌های ذکر شده در تعریف جداول، شاخص‌های ترکیبی زیر برای بهبود کارایی کوئری‌های رایج ایجاد می‌شوند:

```sql
-- شاخص برای جستجوی کاربران بر اساس نام و نام خانوادگی
CREATE INDEX idx_users_full_name ON users (first_name, last_name);

-- شاخص برای فیلتر توکن‌های فعال کاربر
CREATE INDEX idx_tokens_user_active ON tokens (user_id, status) WHERE status = 'active';

-- شاخص برای فیلتر اعلان‌های خوانده نشده کاربر
CREATE INDEX idx_notifications_user_unread ON notifications (user_id, is_read) WHERE is_read = FALSE;

-- شاخص برای جستجوی تراکنش‌های یک کاربر در یک بازه زمانی
CREATE INDEX idx_transactions_user_date ON transactions (user_id, created_at);
```

### پارتیشن‌بندی

برای جداول با حجم داده بالا مانند `transactions` و `events`، می‌توان از پارتیشن‌بندی بر اساس زمان استفاده کرد:

```sql
-- پارتیشن‌بندی جدول تراکنش‌ها بر اساس ماه
CREATE TABLE transactions (
    id UUID NOT NULL,
    user_id UUID NOT NULL,
    token_id UUID,
    type VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- ایجاد پارتیشن‌های ماهانه
CREATE TABLE transactions_y2023m01 PARTITION OF transactions
    FOR VALUES FROM ('2023-01-01') TO ('2023-02-01');
    
CREATE TABLE transactions_y2023m02 PARTITION OF transactions
    FOR VALUES FROM ('2023-02-01') TO ('2023-03-01');

-- و به همین ترتیب برای ماه‌های دیگر...
```

## مهاجرت‌ها و نسخه‌بندی

### ساختار فایل‌های مهاجرت

مهاجرت‌ها باید در پوشه `server/src/migrations` قرار گیرند و از الگوی نام‌گذاری زیر پیروی کنند:

```
{timestamp}_{description}.ts
```

مثال:
```
20230101000001_create_users_table.ts
20230101000002_create_user_profiles_table.ts
20230101000003_create_tokens_table.ts
...
```

### ساختار فایل مهاجرت

هر فایل مهاجرت باید دو تابع `up` و `down` داشته باشد:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable20230101000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                -- سایر ستون‌ها
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE users`);
    }
}
```

## استراتژی کش‌گذاری

### 1. کش داده‌های پرکاربرد

برای بهبود عملکرد سیستم، داده‌های زیر در Redis کش می‌شوند:

- **پروفایل کاربر**: `user:{id}:profile`
- **موجودی توکن کاربر**: `user:{id}:token_balance`
- **تعداد اعلان‌های خوانده نشده**: `user:{id}:unread_notifications_count`
- **تنظیمات کاربر**: `user:{id}:settings`
- **قالب‌های اعلان**: `notification_template:{name}`

### 2. استراتژی منسوخ‌سازی کش

کش‌ها با استراتژی‌های زیر منسوخ می‌شوند:

- **TTL (Time To Live)**: برای داده‌هایی که به‌روزرسانی مداوم ندارند
- **به‌روزرسانی فعال**: برای داده‌هایی که تغییرات مهمی دارند
- **حذف فعال**: حذف کش پس از تغییر داده اصلی

## نکات امنیتی

### 1. حفاظت از داده‌های حساس

- رمزهای عبور فقط به صورت هش‌شده ذخیره می‌شوند
- اطلاعات حساس مانند شماره کارت بانکی با کلیدهای مناسب رمزنگاری می‌شوند
- دسترسی به جداول حساس با استفاده از Role-Based Access Control محدود می‌شود

### 2. ممیزی (Audit)

تمام تغییرات مهم در داده‌ها باید در جدول `events` ثبت شوند:

```sql
INSERT INTO events (user_id, event_type, event_data, ip_address, user_agent)
VALUES (
    '123e4567-e89b-12d3-a456-426614174000',
    'user.password_change',
    '{"source": "self", "require_reverification": true}',
    '192.168.1.1',
    'Mozilla/5.0 ...'
);
```

## نگهداری و عملیات

### 1. بک‌آپ‌گیری

- بک‌آپ کامل: روزانه
- بک‌آپ تفاضلی: هر 6 ساعت
- بک‌آپ WAL (Write-Ahead Log): مداوم

### 2. فشرده‌سازی و آنالیز

```sql
-- فشرده‌سازی و آنالیز جداول
VACUUM FULL ANALYZE users;
VACUUM FULL ANALYZE tokens;
VACUUM FULL ANALYZE transactions;

-- آنالیز برای به‌روزرسانی آمار
ANALYZE users;
ANALYZE tokens;
ANALYZE transactions;
```

### 3. حذف داده‌های قدیمی

```sql
-- حذف اعلان‌های قدیمی خوانده شده
DELETE FROM notifications
WHERE is_read = TRUE AND created_at < NOW() - INTERVAL '6 months';

-- حذف رویدادهای قدیمی
DELETE FROM events
WHERE created_at < NOW() - INTERVAL '1 year';
```

## آینده‌نگری و مقیاس‌پذیری

### 1. افزایش حجم داده

با افزایش حجم داده، اقدامات زیر می‌تواند مورد توجه قرار گیرد:

- پارتیشن‌بندی جداول بزرگ بر اساس زمان
- استفاده از اشاردینگ (Sharding) برای توزیع داده‌ها
- آرشیو کردن داده‌های قدیمی در ذخیره‌سازی ارزان‌تر

### 2. افزایش ترافیک

با افزایش ترافیک، اقدامات زیر توصیه می‌شود:

- استفاده از Read Replicas برای خواندن داده‌ها
- استفاده از کش‌گذاری گسترده‌تر
- مقیاس‌دهی افقی سرورهای اپلیکیشن

## نتیجه‌گیری

طراحی پایگاه داده ارائه شده، یک ساختار مقیاس‌پذیر، قابل نگهداری و بهینه برای پروژه دستیار هوشمند یک دو سه فراهم می‌کند. این طراحی از اصول نرمال‌سازی پیروی می‌کند، روابط مناسب بین جداول را برقرار می‌سازد و با استفاده از شاخص‌گذاری مناسب، عملکرد بهینه‌ای را ارائه می‌دهد.

با رعایت اصول و استانداردهای ذکر شده در این سند، می‌توان اطمینان حاصل کرد که پایگاه داده پروژه توانایی پشتیبانی از نیازهای فعلی و آینده پروژه را خواهد داشت.
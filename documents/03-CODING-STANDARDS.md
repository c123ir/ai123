###### 03-CODING-STANDARDS.md - استانداردهای کدنویسی پروژه دستیار هوشمند یک دو سه

## مقدمه

این سند، استانداردهای کدنویسی پروژه دستیار هوشمند یک دو سه (SmartAi123) را تعریف می‌کند. رعایت این استانداردها باعث افزایش خوانایی، یکپارچگی و قابلیت نگهداری کدها می‌شود.

## اصول کلی کدنویسی

### 1. خوانایی و سادگی

- کد باید واضح و قابل فهم باشد
- از راه‌حل‌های پیچیده و مبهم اجتناب کنید
- از اصل KISS (Keep It Simple, Stupid) پیروی کنید

### 2. نام‌گذاری معنادار

- نام‌ها باید گویا و مرتبط با کارکرد باشند
- از نام‌های کوتاه و مبهم اجتناب کنید
- قراردادهای نام‌گذاری را یکسان نگه دارید

### 3. توضیحات کد (کامنت‌ها)

- برای بخش‌های پیچیده و اهداف عملکردها توضیح بنویسید
- از کامنت‌های اضافی و غیرضروری پرهیز کنید
- در سطر اول هر فایل، نام و مسیر کامل فایل را در کامنت درج کنید

### 4. ماژولاریتی

- کدها را به ماژول‌های منطقی و کوچک تقسیم کنید
- هر ماژول باید یک مسئولیت مشخص داشته باشد (SRP)
- وابستگی‌های بین ماژول‌ها را به حداقل برسانید

### 5. مدیریت خطا

- خطاها را مدیریت کنید و از فروریزی ناگهانی برنامه جلوگیری کنید
- پیام‌های خطای معنادار و راهنما ارائه دهید
- از لاگینگ مناسب برای ردیابی خطاها استفاده کنید

## استانداردهای TypeScript

### 1. انواع داده (Types)

- همیشه از تایپ‌های مشخص استفاده کنید
- از `any` تا حد امکان پرهیز کنید
- برای تعریف ساختار داده‌ها از `interface` استفاده کنید
- برای نوع‌های مرتبط از `enum` استفاده کنید

```typescript
// ✅ درست
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// ❌ نادرست
interface User {
  id: any;
  name: any;
  email: any;
  role: any;
}
```

### 2. توابع

- نوع پارامترها و خروجی توابع را مشخص کنید
- از توابع کوچک با مسئولیت مشخص استفاده کنید
- پارامترهای اختیاری را در انتها قرار دهید

```typescript
// ✅ درست
function getUserById(id: string): Promise<User | null> {
  // ...
}

// ❌ نادرست
function getUserById(id): User {
  // ...
}
```

### 3. کلاس‌ها

- از `private`، `protected` و `public` برای مشخص کردن دسترسی استفاده کنید
- از `readonly` برای فیلدهای غیرقابل تغییر استفاده کنید
- از الگوی طراحی مناسب برای کلاس‌ها استفاده کنید

```typescript
// ✅ درست
class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}

// ❌ نادرست
class UserService {
  userRepo;

  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  getUserById(id) {
    return this.userRepo.findById(id);
  }
}
```

## استانداردهای فرانت‌اند (React)

### 1. کامپوننت‌ها

- از Functional Components و Hooks استفاده کنید
- هر کامپوننت باید در فایل جداگانه تعریف شود
- نام فایل کامپوننت باید با حرف بزرگ شروع شود و با نام کامپوننت مطابقت داشته باشد

```tsx
// ✅ درست - فایل UserProfile.tsx
import React from 'react';

interface UserProfileProps {
  user: User;
  onEdit: (userId: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onEdit }) => {
  return (
    <div className="user-profile">
      <h2>{user.firstName} {user.lastName}</h2>
      <button onClick={() => onEdit(user.id)}>ویرایش پروفایل</button>
    </div>
  );
};

export default UserProfile;

// ❌ نادرست
function profile(props) {
  return (
    <div>
      <h2>{props.user.firstName} {props.user.lastName}</h2>
      <button onClick={() => props.onEdit(props.user.id)}>ویرایش پروفایل</button>
    </div>
  );
}
```

### 2. مدیریت حالت (State Management)

- برای حالت‌های ساده از `useState` و `useReducer` استفاده کنید
- برای حالت‌های پیچیده از Redux یا Context API استفاده کنید
- از الگوی flux برای جریان داده پیروی کنید

```tsx
// ✅ درست
const [user, setUser] = useState<User | null>(null);

// با Redux Toolkit
const dispatch = useDispatch();
const user = useSelector((state: RootState
// ✅ درست
const [user, setUser] = useState<User | null>(null);

// با Redux Toolkit
const dispatch = useDispatch();
const user = useSelector((state: RootState) => state.user.currentUser);

// ❌ نادرست
let userData = null;
function updateUserData(data) {
  userData = data;
}
```

### 3. استایل‌دهی

- از CSS Modules یا Styled Components استفاده کنید
- از inline styles اجتناب کنید مگر در موارد ضروری
- از متغیرهای CSS برای رنگ‌ها، فونت‌ها و سایزها استفاده کنید

```tsx
// ✅ درست - با CSS Modules
import styles from './UserProfile.module.css';

const UserProfile: React.FC = () => {
  return <div className={styles.container}>...</div>;
};

// ✅ درست - با Styled Components
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  direction: rtl;
`;

const UserProfile: React.FC = () => {
  return <Container>...</Container>;
};

// ❌ نادرست
const UserProfile: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
      ...
    </div>
  );
};
```

### 4. پشتیبانی از RTL

- همیشه از `direction: rtl` برای کانتینرهای اصلی استفاده کنید
- از `margin-right` به جای `margin-left` برای فاصله‌گذاری استفاده کنید
- برای چینش فلکس از `flex-direction: row-reverse` استفاده کنید
- از متغیرهای `theme` برای مدیریت RTL استفاده کنید

```tsx
// ✅ درست
const Container = styled.div`
  direction: rtl;
  display: flex;
  flex-direction: row-reverse;
`;

// ❌ نادرست
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
```

### 5. تبدیل اعداد فارسی به انگلیسی

- برای همه ورودی‌های عددی از تابع تبدیل اعداد فارسی به انگلیسی استفاده کنید
- تبدیل باید در زمان تغییر (`onChange`) انجام شود

```tsx
// ✅ درست
import { convertPersianToEnglishNumbers } from 'utils/stringUtils';

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  const convertedValue = convertPersianToEnglishNumbers(value);
  setFormData({ ...formData, [name]: convertedValue });
};

// ❌ نادرست
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
```

## استانداردهای بک‌اند (Express)

### 1. ساختار لایه‌بندی

- از الگوی لایه‌بندی (Controller -> Service -> Repository) استفاده کنید
- هر لایه باید مسئولیت مشخصی داشته باشد
- مستقیماً از لایه اول به لایه سوم دسترسی نداشته باشید

```typescript
// ✅ درست
// کنترلر
export class UserController {
  constructor(private userService: UserService) {}
  
  async getUser(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    res.json(user);
  }
}

// سرویس
export class UserService {
  constructor(private userRepository: UserRepository) {}
  
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}

// ریپوزیتوری
export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return db.query('SELECT * FROM users WHERE id = $1', [id]);
  }
}

// ❌ نادرست
export function getUser(req: Request, res: Response) {
  const user = db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.json(user);
}
```

### 2. مدیریت خطا

- از میدلور مدیریت خطا استفاده کنید
- خطاها را با کلاس مشخص پیاده‌سازی کنید
- از try/catch برای گرفتن خطاها استفاده کنید

```typescript
// ✅ درست
export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
  
  static notFound(message: string) {
    return new ApiError(404, message);
  }
}

try {
  const user = await userService.getUserById(id);
  if (!user) {
    throw ApiError.notFound('کاربر یافت نشد');
  }
  return user;
} catch (error) {
  next(error);
}

// ❌ نادرست
if (!user) {
  res.status(404).send('کاربر یافت نشد');
  return;
}
```

### 3. میدلورها

- میدلورهای مشترک را در فایل‌های جداگانه قرار دهید
- از میدلور برای کارهای متداول مانند احراز هویت، لاگینگ و مدیریت خطا استفاده کنید
- میدلورها را به ترتیب منطقی اعمال کنید

```typescript
// ✅ درست
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';

router.get('/users/:id', 
  authenticate, 
  validateRequest(getUserSchema), 
  userController.getUser
);

// ❌ نادرست
router.get('/users/:id', (req, res, next) => {
  // بررسی احراز هویت
  // اعتبارسنجی
  // پردازش درخواست
});
```

### 4. بستن منابع

- همیشه منابع مانند اتصالات دیتابیس را ببندید
- از الگوی `try/finally` برای اطمینان از بستن منابع استفاده کنید
- در صورت امکان از `Pool` برای مدیریت اتصالات استفاده کنید

```typescript
// ✅ درست
const client = await pool.connect();
try {
  const result = await client.query('SELECT * FROM users');
  return result.rows;
} finally {
  client.release();
}

// ❌ نادرست
const client = await pool.connect();
const result = await client.query('SELECT * FROM users');
return result.rows;
```

### 5. تبدیل اعداد فارسی به انگلیسی

- برای همه ورودی‌ها از میدلور تبدیل اعداد فارسی به انگلیسی استفاده کنید
- خصوصاً برای شماره موبایل، کد ملی و سایر اعداد حساس این تبدیل را انجام دهید

```typescript
// ✅ درست
import { convertPersianToEnglishNumbers } from '../utils/stringUtils';

export function convertNumbersMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = convertPersianToEnglishNumbers(req.body[key]);
      }
    }
  }
  next();
}

// ❌ نادرست
// بدون تبدیل اعداد
```

## استانداردهای پایگاه داده

### 1. نام‌گذاری

- جداول: از اسم جمع و snake_case استفاده کنید (مثلاً `users`, `user_profiles`)
- ستون‌ها: از snake_case استفاده کنید (مثلاً `first_name`, `created_at`)
- کلیدهای خارجی: `table_name_id` (مثلاً `user_id`)
- شاخص‌ها: `idx_table_column`

### 2. مهاجرت‌ها

- برای هر تغییر در ساختار دیتابیس، یک فایل مهاجرت ایجاد کنید
- مهاجرت‌ها باید هم up و هم down داشته باشند
- از شماره‌گذاری ترتیبی برای فایل‌های مهاجرت استفاده کنید

```typescript
// ✅ درست
export async function up() {
  await db.query(`
    CREATE TABLE users (
      id UUID PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
}

export async function down() {
  await db.query('DROP TABLE users');
}

// ❌ نادرست
export async function createUserTable() {
  await db.query(`CREATE TABLE users (...)`);
}
```

### 3. کوئری‌ها

- از پارامترهای پرسش برای جلوگیری از حملات تزریق SQL استفاده کنید
- کوئری‌های پیچیده را در فایل‌های جداگانه یا ثابت‌ها قرار دهید
- از پاجینیشن برای نتایج بزرگ استفاده کنید

```typescript
// ✅ درست
const users = await db.query('SELECT * FROM users WHERE role = $1 LIMIT $2 OFFSET $3', 
  [role, limit, offset]
);

// ❌ نادرست
const users = await db.query(`SELECT * FROM users WHERE role = '${role}'`);
```

## استانداردهای تست

### 1. تست‌های واحد

- برای هر ماژول، تست‌های واحد بنویسید
- از اصل AAA (Arrange, Act, Assert) پیروی کنید
- از mock/stub برای وابستگی‌ها استفاده کنید

```typescript
// ✅ درست
describe('UserService', () => {
  it('should return user by id', async () => {
    // Arrange
    const mockUser = { id: '1', name: 'Test User' };
    const mockRepository = { findById: jest.fn().mockResolvedValue(mockUser) };
    const service = new UserService(mockRepository);
  
    // Act
    const result = await service.getUserById('1');
  
    // Assert
    expect(result).toEqual(mockUser);
    expect(mockRepository.findById).toHaveBeenCalledWith('1');
  });
});

// ❌ نادرست
test('get user', () => {
  const service = new UserService();
  const user = service.getUserById('1');
  expect(user.name).toBe('Test User');
});
```

### 2. تست‌های یکپارچگی

- تست‌های یکپارچگی را برای تعامل بین ماژول‌ها بنویسید
- از دیتابیس تست جداگانه استفاده کنید
- داده‌های تست را قبل و بعد از هر تست پاکسازی کنید

```typescript
// ✅ درست
describe('User API', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });
  
  afterEach(async () => {
    await db('users').truncate();
  });
  
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ firstName: 'Test', lastName: 'User', email: 'test@example.com' });
  
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});

// ❌ نادرست
test('create user', async () => {
  const response = await request(app)
    .post('/api/users')
    .send({ firstName: 'Test', lastName: 'User', email: 'test@example.com' });
  
  expect(response.status).toBe(201);
});
```

## گیت و مدیریت نسخه

### 1. شاخه‌بندی

- از الگوی Gitflow یا مشابه استفاده کنید
- شاخه اصلی (`main`): نسخه تولید
- شاخه توسعه (`develop`): نسخه توسعه
- شاخه‌های ویژگی (`feature/*`): برای ویژگی‌های جدید
- شاخه‌های رفع باگ (`bugfix/*`): برای رفع باگ‌ها
- شاخه‌های انتشار (`release/*`): برای آماده‌سازی انتشار

### 2. کامیت‌ها

- هر کامیت باید یک تغییر منطقی را نشان دهد
- از پیام‌های توصیفی و معنادار استفاده کنید
- پیام‌ها به فارسی و با ساختار مشخص باشند
- از الگوی `نوع: توضیحات` استفاده کنید

```
✅ درست
افزودن: افزودن سیستم احراز هویت دو مرحله‌ای
اصلاح: رفع مشکل نمایش تاریخ شمسی در داشبورد
بهبود: بهینه‌سازی کوئری‌های گزارش‌گیری

❌ نادرست
update code
fix bugs
add new features
```

### 3. بازبینی کد

- همه تغییرات باید از طریق Pull Request انجام شوند
- حداقل یک بازبینی کد برای هر PR الزامی است
- از ابزارهای CI/CD برای بررسی اتوماتیک کد استفاده کنید

## بهینه‌سازی و عملکرد

### 1. لودینگ

- برای عملیات زمان‌بر، نشانگر بارگذاری نمایش دهید
- از لودینگ تنبل (Lazy Loading) برای کامپوننت‌های بزرگ استفاده کنید
- از پاجینیشن برای داده‌های بزرگ استفاده کنید

### 2. کش‌گذاری

- داده‌های ثابت یا کم‌تغییر را کش کنید
- از Redis یا مکانیزم‌های کش مرورگر استفاده کنید
- استراتژی کش را با توجه به نیازهای پروژه انتخاب کنید

### 3. بهینه‌سازی تصاویر

- از فرمت‌های مناسب برای تصاویر استفاده کنید
- تصاویر را فشرده کنید
- از لودینگ تنبل برای تصاویر استفاده کنید

## نتیجه‌گیری

پیروی از استانداردهای ذکر شده در این سند، به توسعه پروژه با کیفیت بالا، یکپارچه و قابل نگهداری کمک می‌کند. این استانداردها باید به طور مداوم بررسی و در صورت نیاز به‌روزرسانی شوند تا با نیازهای پروژه و فناوری‌های جدید هماهنگ باشند.

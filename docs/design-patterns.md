# الگوهای طراحی توصیه شده

## معرفی
این مستند الگوهای طراحی توصیه شده برای توسعه و نگهداری پروژه را شرح می‌دهد. استفاده از این الگوها به یکپارچگی کد، خوانایی و قابلیت نگهداری آن کمک می‌کند.

## الگوهای طراحی React

### ۱. الگوی Compound Components
استفاده از کامپوننت‌های مرکب برای ایجاد رابط‌های کاربری پیچیده با API ساده و منعطف.

**مثال:**
```tsx
// تعریف کامپوننت‌ها
const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit}>{children}</form>
);

Form.Input = ({ label, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input {...props} />
  </div>
);

Form.Button = (props) => <button className="submit-button" {...props} />;

// استفاده
<Form onSubmit={handleSubmit}>
  <Form.Input label="نام" name="name" />
  <Form.Input label="ایمیل" name="email" type="email" />
  <Form.Button type="submit">ارسال</Form.Button>
</Form>
```

### ۲. الگوی Render Props
انتقال منطق و داده‌ها به کامپوننت‌های فرزند با استفاده از تابع به عنوان prop.

**مثال:**
```tsx
// تعریف کامپوننت
const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return render(position);
};

// استفاده
<MouseTracker
  render={({ x, y }) => (
    <div>
      موقعیت ماوس: {x}, {y}
    </div>
  )}
/>
```

### ۳. الگوی Custom Hooks
استخراج منطق قابل استفاده مجدد به هوک‌های سفارشی.

**مثال:**
```tsx
// تعریف هوک
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// استفاده
function Component() {
  const [name, setName] = useLocalStorage('name', 'مهمان');
  
  return (
    <div>
      <p>سلام {name}!</p>
      <button onClick={() => setName('کاربر')}>تغییر نام</button>
    </div>
  );
}
```

### ۴. الگوی Context Module
ترکیب Context API و ماژول‌ها برای مدیریت state.

**مثال:**
```tsx
// authContext.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  const login = async (credentials: Credentials) => {
    try {
      const user = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error });
    }
  };
  
  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## الگوهای ساختاری

### ۱. الگوی Module Pattern
سازماندهی کد به ماژول‌های مستقل با مسئولیت‌های مشخص.

**مثال:**
```
src/modules/
  ├── auth/
  │   ├── components/
  │   ├── hooks/
  │   ├── services/
  │   └── index.ts
  ├── user/
  │   ├── components/
  │   ├── hooks/
  │   ├── services/
  │   └── index.ts
```

**فایل index.ts:**
```tsx
// src/modules/auth/index.ts
export { default as LoginForm } from './components/LoginForm';
export { default as RegisterForm } from './components/RegisterForm';
export { useAuth } from './hooks/useAuth';
export { authService } from './services/authService';
```

### ۲. الگوی Atomic Design
ساختاربندی کامپوننت‌ها بر اساس پیچیدگی و عملکرد.

```
src/components/
  ├── atoms/          # کامپوننت‌های ساده و پایه
  │   ├── Button.tsx
  │   ├── Input.tsx
  │   └── ...
  ├── molecules/      # ترکیبی از atoms
  │   ├── FormField.tsx
  │   ├── Notification.tsx
  │   └── ...
  ├── organisms/      # کامپوننت‌های پیچیده‌تر
  │   ├── LoginForm.tsx
  │   ├── Header.tsx
  │   └── ...
  ├── templates/      # قالب‌های صفحات
  │   ├── DashboardTemplate.tsx
  │   ├── AuthTemplate.tsx
  │   └── ...
  └── pages/          # صفحات کامل
      ├── LoginPage.tsx
      ├── DashboardPage.tsx
      └── ...
```

### ۳. الگوی Facade (نمای ظاهری)
ایجاد یک API ساده و یکپارچه برای یک زیرسیستم پیچیده.

**مثال:**
```tsx
// src/services/api.ts
import axios from 'axios';

// تنظیمات اولیه
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// افزودن interceptor برای توکن‌ها
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// نمای ظاهری (Facade) برای API
export const apiService = {
  // کاربران
  users: {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post('/users', data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
  },
  
  // احراز هویت
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    refreshToken: () => api.post('/auth/refresh'),
    logout: () => api.post('/auth/logout'),
  },
  
  // محصولات
  products: {
    getAll: (params) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    // ...
  },
};
```

## الگوهای عملیاتی

### ۱. الگوی Mediator
استفاده از یک واسط مرکزی برای مدیریت ارتباط بین کامپوننت‌ها.

**مثال:**
```tsx
// src/services/eventBus.ts
type EventHandler = (...args: any[]) => void;

class EventBus {
  private events: Record<string, EventHandler[]> = {};

  subscribe(event: string, callback: EventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event: string, callback: EventHandler) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  publish(event: string, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
  }
}

export const eventBus = new EventBus();

// استفاده در کامپوننت A
function ComponentA() {
  const handleClick = () => {
    eventBus.publish('notification', { message: 'عملیات موفق', type: 'success' });
  };
  
  return <button onClick={handleClick}>ارسال اعلان</button>;
}

// استفاده در کامپوننت B
function ComponentB() {
  const [notification, setNotification] = useState(null);
  
  useEffect(() => {
    const unsubscribe = eventBus.subscribe('notification', (data) => {
      setNotification(data);
      setTimeout(() => setNotification(null), 3000);
    });
    
    return unsubscribe;
  }, []);
  
  return notification && (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
}
```

### ۲. الگوی Repository
جداسازی منطق دسترسی به داده از منطق تجاری.

**مثال:**
```tsx
// src/repositories/userRepository.ts
import { apiService } from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  // ...
}

export class UserRepository {
  async getAll(): Promise<User[]> {
    const response = await apiService.users.getAll();
    return response.data;
  }
  
  async getById(id: string): Promise<User> {
    const response = await apiService.users.getById(id);
    return response.data;
  }
  
  async create(user: Omit<User, 'id'>): Promise<User> {
    const response = await apiService.users.create(user);
    return response.data;
  }
  
  async update(id: string, user: Partial<User>): Promise<User> {
    const response = await apiService.users.update(id, user);
    return response.data;
  }
  
  async delete(id: string): Promise<void> {
    await apiService.users.delete(id);
  }
}

export const userRepository = new UserRepository();
```

### ۳. الگوی Command
کپسوله‌سازی درخواست‌ها به عنوان اشیاء.

**مثال:**
```tsx
// src/commands/userCommands.ts
import { userRepository } from '../repositories/userRepository';

interface CommandResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

abstract class Command<T> {
  abstract execute(): Promise<CommandResult<T>>;
}

export class CreateUserCommand extends Command<User> {
  constructor(private userData: Omit<User, 'id'>) {
    super();
  }
  
  async execute(): Promise<CommandResult<User>> {
    try {
      // اعتبارسنجی داده‌ها
      if (!this.userData.email || !this.userData.name) {
        throw new Error('اطلاعات کاربر ناقص است');
      }
      
      // ایجاد کاربر
      const user = await userRepository.create(this.userData);
      
      // لاگ کردن عملیات
      console.log(`کاربر جدید با شناسه ${user.id} ایجاد شد`);
      
      return { success: true, data: user };
    } catch (error) {
      console.error('خطا در ایجاد کاربر:', error);
      return { success: false, error: error as Error };
    }
  }
}

// استفاده
async function createUser(userData) {
  const command = new CreateUserCommand(userData);
  const result = await command.execute();
  
  if (result.success) {
    // نمایش پیام موفقیت
  } else {
    // نمایش خطا
  }
}
```

## راهنمای استفاده از الگوها

### چه زمانی از کدام الگو استفاده کنیم؟

1. **وقتی نیاز به مدیریت state پیچیده دارید**:
   - برای مدیریت state محلی: Custom Hooks
   - برای مدیریت state سراسری: Context Module یا Redux

2. **وقتی می‌خواهید کامپوننت‌های انعطاف‌پذیر ایجاد کنید**:
   - برای رابط کاربری ترکیبی: Compound Components
   - برای انتقال منطق و render: Render Props

3. **وقتی می‌خواهید کد را سازماندهی کنید**:
   - برای ساختاربندی پروژه: Module Pattern
   - برای سازماندهی کامپوننت‌ها: Atomic Design

4. **وقتی با API یا منابع داده کار می‌کنید**:
   - برای ساده‌سازی ارتباط با API: Facade
   - برای جداسازی منطق دسترسی به داده: Repository

5. **وقتی نیاز به ارتباط بین کامپوننت‌های مختلف دارید**:
   - برای ارتباط غیرمستقیم: Mediator (EventBus)
   - برای عملیات پیچیده با منطق تجاری: Command
``` 
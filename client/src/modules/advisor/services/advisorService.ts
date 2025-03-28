import axios from 'axios';
import {
  Advisor,
  AdvisorSession,
  AdvisorQuestion,
  AdvisorFeedback,
  GetAdvisorsParams,
  BookSessionParams,
  AddQuestionParams,
  AddFeedbackParams,
  GetSessionsParams,
  QuestionParams,
  FeedbackParams,
  CancelSessionParams,
  AdvisorType,
  ExpertiseLevel,
  SessionStatus
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5454/api';

// برای فاز توسعه، از داده‌های مصنوعی استفاده می‌کنیم
// این داده‌ها باید با API واقعی جایگزین شوند
const mockAdvisors: Advisor[] = [
  {
    id: '1',
    name: 'دکتر سینا محمدی',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    type: AdvisorType.FINANCIAL,
    expertise: ExpertiseLevel.EXPERT,
    bio: 'مشاور مالی با بیش از 15 سال سابقه در زمینه مدیریت سرمایه و بهینه‌سازی پرتفوی. تخصص در بازارهای سرمایه و ارزهای دیجیتال.',
    rating: 4.8,
    reviewCount: 127,
    specializations: ['مدیریت سرمایه', 'بازار سرمایه', 'ارزهای دیجیتال', 'بهینه‌سازی پرتفوی'],
    languages: ['فارسی', 'انگلیسی'],
    tokenPerMinute: 10,
    isAvailable: true,
    createdAt: '2023-01-15T08:30:00.000Z',
    updatedAt: '2023-06-20T14:45:00.000Z'
  },
  {
    id: '2',
    name: 'مهندس آرش رضایی',
    avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    type: AdvisorType.BUSINESS,
    expertise: ExpertiseLevel.EXPERT,
    bio: 'مشاور کسب‌وکار با تخصص در راه‌اندازی استارتاپ و مدیریت پروژه‌های IT. تمرکز بر توسعه محصول، بازاریابی و مدیریت تیم.',
    rating: 4.6,
    reviewCount: 95,
    specializations: ['استارتاپ', 'مدیریت پروژه', 'توسعه محصول', 'بازاریابی دیجیتال'],
    languages: ['فارسی', 'انگلیسی'],
    tokenPerMinute: 12,
    isAvailable: true,
    createdAt: '2023-02-10T10:15:00.000Z',
    updatedAt: '2023-07-05T16:30:00.000Z'
  },
  {
    id: '3',
    name: 'دکتر سارا کریمی',
    avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg',
    type: AdvisorType.INVESTMENT,
    expertise: ExpertiseLevel.INTERMEDIATE,
    bio: 'مشاور سرمایه‌گذاری با تخصص در تحلیل بازار سهام و املاک. ارائه راهکارهای سرمایه‌گذاری متناسب با نیازها و شرایط مالی مراجعین.',
    rating: 4.5,
    reviewCount: 78,
    specializations: ['بازار سهام', 'سرمایه‌گذاری در املاک', 'تحلیل تکنیکال', 'مدیریت ریسک'],
    languages: ['فارسی', 'انگلیسی', 'فرانسه'],
    tokenPerMinute: 8,
    isAvailable: true,
    createdAt: '2023-03-05T09:45:00.000Z',
    updatedAt: '2023-08-12T11:20:00.000Z'
  },
  {
    id: '4',
    name: 'مهندس علی حسینی',
    avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    type: AdvisorType.PERSONAL,
    expertise: ExpertiseLevel.BEGINNER,
    bio: 'مشاور شخصی با رویکرد توسعه فردی و مدیریت زمان. کمک به افراد برای دستیابی به اهداف شخصی و حرفه‌ای.',
    rating: 4.2,
    reviewCount: 45,
    specializations: ['مدیریت زمان', 'برنامه‌ریزی شخصی', 'کوچینگ زندگی', 'توسعه فردی'],
    languages: ['فارسی'],
    tokenPerMinute: 5,
    isAvailable: false,
    createdAt: '2023-04-20T13:10:00.000Z',
    updatedAt: '2023-09-01T15:45:00.000Z'
  }
];

const mockSessions: AdvisorSession[] = [
  {
    id: '101',
    advisorId: '1',
    userId: 'user123',
    advisor: mockAdvisors[0],
    date: '2023-10-25T10:00:00.000Z',
    duration: 45,
    status: SessionStatus.CONFIRMED,
    tokenCost: 450,
    questions: [
      {
        id: 'q1',
        text: 'چگونه می‌توانم پرتفوی سرمایه‌گذاری خود را متنوع کنم؟',
        createdAt: '2023-10-20T14:30:00.000Z',
        userId: 'user123'
      }
    ],
    topics: ['مدیریت سرمایه', 'بهینه‌سازی پرتفوی'],
    meetingLink: 'https://meet.example.com/session/101',
    createdAt: '2023-10-15T09:30:00.000Z',
    updatedAt: '2023-10-20T14:30:00.000Z'
  },
  {
    id: '102',
    advisorId: '2',
    userId: 'user123',
    advisor: mockAdvisors[1],
    date: '2023-09-15T14:00:00.000Z',
    duration: 60,
    status: SessionStatus.COMPLETED,
    tokenCost: 720,
    questions: [
      {
        id: 'q2',
        text: 'مهمترین مراحل راه‌اندازی یک استارتاپ چیست؟',
        createdAt: '2023-09-10T08:45:00.000Z',
        userId: 'user123'
      },
      {
        id: 'q3',
        text: 'چگونه می‌توانم سرمایه‌گذار جذب کنم؟',
        createdAt: '2023-09-12T10:30:00.000Z',
        userId: 'user123'
      }
    ],
    topics: ['استارتاپ', 'جذب سرمایه'],
    feedback: {
      id: 'f1',
      userId: 'user123',
      rating: 5,
      comment: 'مشاوره بسیار مفید و کاربردی بود. پیشنهادات عملی ارائه شد که به من کمک زیادی کرد.',
      createdAt: '2023-09-15T16:30:00.000Z'
    },
    createdAt: '2023-09-05T11:20:00.000Z',
    updatedAt: '2023-09-15T16:30:00.000Z'
  },
  {
    id: '103',
    advisorId: '3',
    userId: 'user123',
    advisor: mockAdvisors[2],
    date: '2023-11-10T15:30:00.000Z',
    duration: 30,
    status: SessionStatus.PENDING,
    tokenCost: 240,
    questions: [],
    topics: ['بازار سهام', 'تحلیل تکنیکال'],
    createdAt: '2023-10-30T09:15:00.000Z',
    updatedAt: '2023-10-30T09:15:00.000Z'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class AdvisorService {
  // دریافت لیست مشاوران
  async getAdvisors(filters?: any): Promise<Advisor[]> {
    // استفاده از داده‌های مصنوعی برای فاز توسعه
    await delay(500); // شبیه‌سازی تأخیر شبکه
    
    let filteredAdvisors = [...mockAdvisors];
    
    if (filters) {
      if (filters.type) {
        filteredAdvisors = filteredAdvisors.filter(advisor => advisor.type === filters.type);
      }
      
      if (filters.expertise) {
        filteredAdvisors = filteredAdvisors.filter(advisor => advisor.expertise === filters.expertise);
      }
      
      if (filters.isAvailable) {
        filteredAdvisors = filteredAdvisors.filter(advisor => advisor.isAvailable);
      }
    }
    
    return filteredAdvisors;
  }

  // دریافت اطلاعات یک مشاور
  async getAdvisorById(advisorId: string): Promise<Advisor> {
    await delay(300);
    
    const advisor = mockAdvisors.find(a => a.id === advisorId);
    
    if (!advisor) {
      throw new Error('مشاور مورد نظر یافت نشد');
    }
    
    return advisor;
  }

  // رزرو جلسه مشاوره
  async bookSession(params: BookSessionParams): Promise<AdvisorSession> {
    await delay(600);
    
    const advisor = mockAdvisors.find(a => a.id === params.advisorId);
    
    if (!advisor) {
      throw new Error('مشاور مورد نظر یافت نشد');
    }
    
    if (!advisor.isAvailable) {
      throw new Error('این مشاور در حال حاضر در دسترس نیست');
    }
    
    const sessionId = `session_${Date.now()}`;
    
    const newSession: AdvisorSession = {
      id: sessionId,
      advisorId: params.advisorId,
      userId: params.userId,
      advisor,
      date: new Date(`${params.date}T${params.time}`).toISOString(),
      duration: params.duration,
      status: SessionStatus.PENDING,
      tokenCost: params.duration * advisor.tokenPerMinute,
      questions: params.questions ? [
        {
          id: `q_${Date.now()}`,
          text: params.questions,
          createdAt: new Date().toISOString(),
          userId: params.userId
        }
      ] : [],
      topics: params.topics || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockSessions.push(newSession);
    
    return newSession;
  }

  // دریافت جلسات مشاوره یک کاربر
  async getSessions(userId: string): Promise<AdvisorSession[]> {
    await delay(400);
    
    return mockSessions
      .filter(session => session.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // دریافت اطلاعات یک جلسه مشاوره
  async getSessionById(sessionId: string): Promise<AdvisorSession> {
    await delay(300);
    
    const session = mockSessions.find(s => s.id === sessionId);
    
    if (!session) {
      throw new Error('جلسه مشاوره مورد نظر یافت نشد');
    }
    
    return session;
  }

  // اضافه کردن سوال به جلسه مشاوره
  async addQuestion(params: QuestionParams): Promise<AdvisorQuestion> {
    await delay(400);
    
    const session = mockSessions.find(s => s.id === params.sessionId);
    
    if (!session) {
      throw new Error('جلسه مشاوره مورد نظر یافت نشد');
    }
    
    const question: AdvisorQuestion = {
      id: `q_${Date.now()}`,
      text: params.questionText,
      sessionId: params.sessionId,
      createdAt: new Date().toISOString(),
      userId: params.userId
    };
    
    session.questions.push(question);
    session.updatedAt = new Date().toISOString();
    
    return question;
  }

  // اضافه کردن بازخورد به جلسه مشاوره
  async addFeedback(params: FeedbackParams): Promise<AdvisorFeedback> {
    await delay(500);
    
    const session = mockSessions.find(s => s.id === params.sessionId);
    
    if (!session) {
      throw new Error('جلسه مشاوره مورد نظر یافت نشد');
    }
    
    if (session.status !== SessionStatus.COMPLETED) {
      throw new Error('فقط برای جلسات تکمیل شده می‌توانید بازخورد ثبت کنید');
    }
    
    const feedback: AdvisorFeedback = {
      id: `f_${Date.now()}`,
      userId: params.userId,
      rating: params.rating,
      comment: params.comment,
      strengths: [],
      improvements: [],
      createdAt: new Date().toISOString()
    };
    
    session.feedback = feedback;
    session.updatedAt = new Date().toISOString();
    
    return feedback;
  }

  // لغو جلسه مشاوره
  async cancelSession(params: CancelSessionParams): Promise<AdvisorSession> {
    await delay(400);
    
    const session = mockSessions.find(s => s.id === params.sessionId);
    
    if (!session) {
      throw new Error('جلسه مشاوره مورد نظر یافت نشد');
    }
    
    if (session.status === SessionStatus.COMPLETED) {
      throw new Error('جلسات تکمیل شده قابل لغو نیستند');
    }
    
    if (session.status === SessionStatus.CANCELLED) {
      throw new Error('این جلسه قبلاً لغو شده است');
    }
    
    session.status = SessionStatus.CANCELLED;
    session.updatedAt = new Date().toISOString();
    
    return session;
  }
}

export default new AdvisorService(); 
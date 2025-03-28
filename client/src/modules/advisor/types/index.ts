/**
 * تایپ‌های اصلی ماژول مشاوره هوشمند
 */

/**
 * انواع مشاوره
 */
export enum AdvisorType {
  FINANCIAL = 'FINANCIAL',
  INVESTMENT = 'INVESTMENT',
  BUSINESS = 'BUSINESS',
  PERSONAL = 'PERSONAL'
}

/**
 * انواع تخصص مشاور
 */
export enum ExpertiseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  EXPERT = 'EXPERT'
}

/**
 * وضعیت‌های جلسه مشاوره
 */
export enum SessionStatus {
  PENDING = 'PENDING',       // در انتظار تایید
  CONFIRMED = 'CONFIRMED',   // تایید شده
  COMPLETED = 'COMPLETED',   // تکمیل شده
  CANCELLED = 'CANCELLED'    // لغو شده
}

/**
 * ساختار مشاور
 */
export interface Advisor {
  id: string;
  name: string;
  type: AdvisorType;
  expertise: ExpertiseLevel;
  avatarUrl?: string;
  bio: string;
  rating: number;
  reviewCount: number;
  tokenPerMinute: number;
  languages: string[];
  isAvailable: boolean;
  specializations: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * ساختار سوال مشاوره
 */
export interface AdvisorQuestion {
  id: string;
  text: string;
  userId: string;
  sessionId?: string;
  question?: string;
  answer?: string;
  createdAt: string;
  answeredAt?: string;
}

/**
 * ساختار بازخورد مشاوره
 */
export interface AdvisorFeedback {
  id?: string;
  userId: string;
  rating: number;
  comment: string;
  strengths?: string[];
  improvements?: string[];
  createdAt: string;
}

/**
 * ساختار جلسه مشاوره
 */
export interface AdvisorSession {
  id: string;
  userId: string;
  advisorId: string;
  advisor: Advisor;
  status: SessionStatus;
  date: string;
  startTime?: Date;
  endTime?: Date;
  duration: number;
  tokensUsed?: number;
  notes?: string;
  feedback?: AdvisorFeedback;
  questions: AdvisorQuestion[];
  recommendations?: string[];
  tokenCost: number;
  topics: string[];
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * پارامترهای دریافت لیست مشاوران
 */
export interface GetAdvisorsParams {
  type?: AdvisorType;
  expertise?: ExpertiseLevel;
  availability?: boolean;
  specialization?: string;
  page?: number;
  limit?: number;
}

/**
 * پارامترهای رزرو جلسه مشاوره
 */
export interface BookSessionParams {
  advisorId: string;
  userId: string;
  date: string;
  time: string;
  duration: number;
  questions?: string;
  topics: string[];
  tokenCost: number;
  notes?: string;
}

/**
 * پارامترهای اضافه کردن سوال به جلسه
 */
export interface QuestionParams {
  sessionId: string;
  userId: string;
  questionText: string;
}

/**
 * پارامترهای اضافه کردن بازخورد
 */
export interface FeedbackParams {
  sessionId: string;
  userId: string;
  rating: number;
  comment: string;
}

/**
 * پارامترهای لغو جلسه
 */
export interface CancelSessionParams {
  sessionId: string;
  userId: string;
}

/**
 * پارامترهای دریافت جلسات مشاوره
 */
export interface GetSessionsParams {
  userId: string;
  status?: SessionStatus;
  advisorId?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

// تایپ‌های وضعیت در Redux
export interface AdvisorState {
  advisors: Advisor[];
  advisorsTotal: number;
  selectedAdvisor: Advisor | null;
  sessions: AdvisorSession[];
  sessionsTotal: number;
  selectedSession: AdvisorSession | null;
  loading: boolean;
  error: string | null;
} 
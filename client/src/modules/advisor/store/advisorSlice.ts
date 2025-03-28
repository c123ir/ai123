import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
  AdvisorState,
  SessionStatus
} from '../types';
import advisorService from '../services/advisorService';

const initialState: AdvisorState = {
  advisors: [],
  advisorsTotal: 0,
  selectedAdvisor: null,
  sessions: [],
  sessionsTotal: 0,
  selectedSession: null,
  loading: false,
  error: null
};

// درخواست لیست مشاوران
export const fetchAdvisors = createAsyncThunk(
  'advisor/fetchAdvisors',
  async (filters?: any, { rejectWithValue }) => {
    try {
      return await advisorService.getAdvisors(filters);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در دریافت لیست مشاوران');
    }
  }
);

// درخواست اطلاعات یک مشاور
export const fetchAdvisorById = createAsyncThunk(
  'advisor/fetchAdvisorById',
  async (advisorId: string, { rejectWithValue }) => {
    try {
      return await advisorService.getAdvisorById(advisorId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در دریافت اطلاعات مشاور');
    }
  }
);

// رزرو جلسه مشاوره
export const bookAdvisorSession = createAsyncThunk(
  'advisor/bookSession',
  async (params: BookSessionParams, { rejectWithValue }) => {
    try {
      return await advisorService.bookSession(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در رزرو جلسه مشاوره');
    }
  }
);

// درخواست لیست جلسات مشاوره کاربر
export const fetchSessionsByUserId = createAsyncThunk(
  'advisor/fetchSessionsByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await advisorService.getSessions(userId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در دریافت لیست جلسات');
    }
  }
);

// درخواست اطلاعات یک جلسه مشاوره
export const fetchSessionById = createAsyncThunk(
  'advisor/fetchSessionById',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      return await advisorService.getSessionById(sessionId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در دریافت اطلاعات جلسه');
    }
  }
);

// اضافه کردن سوال به جلسه مشاوره
export const addQuestionToSession = createAsyncThunk(
  'advisor/addQuestion',
  async (params: QuestionParams, { rejectWithValue }) => {
    try {
      return await advisorService.addQuestion(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در اضافه کردن سوال');
    }
  }
);

// اضافه کردن بازخورد به جلسه مشاوره
export const addFeedbackToSession = createAsyncThunk(
  'advisor/addFeedback',
  async (params: FeedbackParams, { rejectWithValue }) => {
    try {
      return await advisorService.addFeedback(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در ثبت بازخورد');
    }
  }
);

// لغو جلسه مشاوره
export const cancelSessionById = createAsyncThunk(
  'advisor/cancelSession',
  async (params: CancelSessionParams, { rejectWithValue }) => {
    try {
      return await advisorService.cancelSession(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'خطا در لغو جلسه');
    }
  }
);

const advisorSlice = createSlice({
  name: 'advisor',
  initialState,
  reducers: {
    // تنظیم وضعیت بارگذاری
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // تنظیم پیام خطا
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // پاک کردن پیام خطا
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // دریافت لیست مشاوران
      .addCase(fetchAdvisors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvisors.fulfilled, (state, action) => {
        state.loading = false;
        state.advisors = action.payload;
        state.advisorsTotal = action.payload.length;
      })
      .addCase(fetchAdvisors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // دریافت اطلاعات یک مشاور
      .addCase(fetchAdvisorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvisorById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAdvisor = action.payload;
      })
      .addCase(fetchAdvisorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // رزرو جلسه مشاوره
      .addCase(bookAdvisorSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookAdvisorSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = [...state.sessions, action.payload];
        state.sessionsTotal = state.sessionsTotal + 1;
      })
      .addCase(bookAdvisorSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // دریافت لیست جلسات مشاوره کاربر
      .addCase(fetchSessionsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessionsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload;
        state.sessionsTotal = action.payload.length;
      })
      .addCase(fetchSessionsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // دریافت اطلاعات یک جلسه مشاوره
      .addCase(fetchSessionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSession = action.payload;
      })
      .addCase(fetchSessionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // اضافه کردن سوال به جلسه مشاوره
      .addCase(addQuestionToSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestionToSession.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedSession) {
          state.selectedSession.questions = [...state.selectedSession.questions, action.payload];
        }
      })
      .addCase(addQuestionToSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // اضافه کردن بازخورد به جلسه مشاوره
      .addCase(addFeedbackToSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFeedbackToSession.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedSession) {
          state.selectedSession.feedback = action.payload;
        }
      })
      .addCase(addFeedbackToSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // لغو جلسه مشاوره
      .addCase(cancelSessionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSessionById.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedSession) {
          state.selectedSession.status = SessionStatus.CANCELLED;
        }
        // به‌روزرسانی لیست جلسات
        state.sessions = state.sessions.map(session => 
          session.id === action.payload.id ? { ...session, status: SessionStatus.CANCELLED } : session
        );
      })
      .addCase(cancelSessionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setLoading, setError, clearError } = advisorSlice.actions;

export default advisorSlice.reducer;
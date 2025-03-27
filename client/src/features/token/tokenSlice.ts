// src/features/token/tokenSlice.ts - اسلایس ریداکس برای مدیریت توکن‌ها

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import tokenService, { 
  TokenTransaction, 
  TokenTransferRequest,
  TokenRequestParams
} from '../../services/token.service';
import { RootState } from '../../store';
import { showNotification } from '../notification/notificationSlice';

// نوع داده توکن
export interface Token {
  id: number;
  userId: number;
  value: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'used';
  createdAt: string;
  updatedAt: string;
}

// نوع داده تراکنش
export interface Transaction {
  id: number;
  userId: number;
  tokenId: number;
  type: 'issue' | 'transfer' | 'redeem';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
  relatedUserId?: number;
  description?: string;
}

// رابط وضعیت اسلایس توکن
interface TokenState {
  balance: number;
  pendingBalance: number;
  isActive: boolean;
  lastUpdate: string | null;
  transactions: TokenTransaction[];
  totalTransactions: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  transactionDetails: TokenTransaction | null;
}

// وضعیت اولیه
const initialState: TokenState = {
  balance: 0,
  pendingBalance: 0,
  isActive: false,
  lastUpdate: null,
  transactions: [],
  totalTransactions: 0,
  currentPage: 1,
  loading: false,
  error: null,
  transactionDetails: null,
};

// اکشن‌های ناهمگام (Async Thunks)

// دریافت موجودی توکن
export const fetchBalance = createAsyncThunk(
  'token/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tokenService.getBalance();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در دریافت موجودی توکن');
    }
  }
);

// دریافت تراکنش‌های توکن
export const fetchTransactions = createAsyncThunk(
  'token/fetchTransactions',
  async (params: TokenRequestParams = {}, { rejectWithValue }) => {
    try {
      const response = await tokenService.getTransactions(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در دریافت تراکنش‌ها');
    }
  }
);

// دریافت جزئیات یک تراکنش
export const fetchTransactionDetails = createAsyncThunk(
  'token/fetchTransactionDetails',
  async (transactionId: string, { rejectWithValue }) => {
    try {
      const response = await tokenService.getTransaction(transactionId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'خطا در دریافت جزئیات تراکنش');
    }
  }
);

// انتقال توکن به کاربر دیگر
export const transferToken = createAsyncThunk(
  'token/transferToken',
  async (transferData: TokenTransferRequest, { dispatch, rejectWithValue }) => {
    try {
      const response = await tokenService.transferToken(transferData);
      dispatch(showNotification({
        message: 'انتقال توکن با موفقیت انجام شد',
        type: 'success'
      }));
      return response;
    } catch (error: any) {
      dispatch(showNotification({
        message: error.response?.data?.message || 'خطا در انتقال توکن',
        type: 'error'
      }));
      return rejectWithValue(error.response?.data?.message || 'خطا در انتقال توکن');
    }
  }
);

// درخواست برداشت توکن
export const withdrawToken = createAsyncThunk(
  'token/withdrawToken',
  async ({ amount, description }: { amount: number, description?: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await tokenService.withdrawToken(amount, description);
      dispatch(showNotification({
        message: 'درخواست برداشت توکن با موفقیت ثبت شد',
        type: 'success'
      }));
      return response;
    } catch (error: any) {
      dispatch(showNotification({
        message: error.response?.data?.message || 'خطا در برداشت توکن',
        type: 'error'
      }));
      return rejectWithValue(error.response?.data?.message || 'خطا در برداشت توکن');
    }
  }
);

// ایجاد اسلایس توکن
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    // پاک کردن جزئیات تراکنش
    clearTransactionDetails: (state) => {
      state.transactionDetails = null;
    },
    // تنظیم صفحه جاری
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // پاک کردن خطا
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // دریافت موجودی
    builder.addCase(fetchBalance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload.balance;
      state.pendingBalance = action.payload.pendingBalance;
      state.isActive = action.payload.isActive;
      state.lastUpdate = action.payload.lastUpdate;
      state.error = null;
    });
    builder.addCase(fetchBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // دریافت تراکنش‌ها
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload.transactions;
      state.totalTransactions = action.payload.total;
      state.currentPage = action.payload.page;
      state.error = null;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // دریافت جزئیات تراکنش
    builder.addCase(fetchTransactionDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactionDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.transactionDetails = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTransactionDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // انتقال توکن
    builder.addCase(transferToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(transferToken.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(transferToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // برداشت توکن
    builder.addCase(withdrawToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(withdrawToken.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(withdrawToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// صادر کردن اکشن‌ها
export const { clearTransactionDetails, setCurrentPage, clearError } = tokenSlice.actions;

// سلکتورها
export const selectBalance = (state: RootState) => state.token.balance;
export const selectPendingBalance = (state: RootState) => state.token.pendingBalance;
export const selectIsActive = (state: RootState) => state.token.isActive;
export const selectLastUpdate = (state: RootState) => state.token.lastUpdate;
export const selectTransactions = (state: RootState) => state.token.transactions;
export const selectTotalTransactions = (state: RootState) => state.token.totalTransactions;
export const selectCurrentPage = (state: RootState) => state.token.currentPage;
export const selectLoading = (state: RootState) => state.token.loading;
export const selectError = (state: RootState) => state.token.error;
export const selectTransactionDetails = (state: RootState) => state.token.transactionDetails;

export default tokenSlice.reducer;

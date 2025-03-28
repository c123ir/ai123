import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  Token, 
  TokenBalance, 
  TokenTransaction,
  GetTokenBalanceParams,
  GetTokenHistoryParams,
  UseTokensParams,
  BuyTokensParams
} from '../types';
import tokenService from '../services/tokenService';

interface TokenState {
  balance: TokenBalance | null;
  transactions: TokenTransaction[];
  transactionsTotal: number;
  tokens: Token[];
  expiringSoonTokens: Token[];
  expiredTokens: Token[];
  loading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  balance: null,
  transactions: [],
  transactionsTotal: 0,
  tokens: [],
  expiringSoonTokens: [],
  expiredTokens: [],
  loading: false,
  error: null
};

// آسینک ثانک‌ها
export const fetchTokenBalance = createAsyncThunk(
  'token/fetchBalance',
  async (params: GetTokenBalanceParams, { rejectWithValue }) => {
    try {
      return await tokenService.getTokenBalance(params);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'خطایی رخ داد.');
    }
  }
);

export const fetchTokenHistory = createAsyncThunk(
  'token/fetchHistory',
  async (params: GetTokenHistoryParams, { rejectWithValue }) => {
    try {
      return await tokenService.getTokenHistory(params);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'خطایی رخ داد.');
    }
  }
);

export const useTokens = createAsyncThunk(
  'token/useTokens',
  async (params: UseTokensParams, { rejectWithValue }) => {
    try {
      return await tokenService.useTokens(params);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'خطایی رخ داد.');
    }
  }
);

export const buyTokens = createAsyncThunk(
  'token/buyTokens',
  async (params: BuyTokensParams, { rejectWithValue }) => {
    try {
      return await tokenService.buyTokens(params);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'خطایی رخ داد.');
    }
  }
);

export const checkTokenStatus = createAsyncThunk(
  'token/checkStatus',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await tokenService.checkTokenStatus(userId);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'خطایی رخ داد.');
    }
  }
);

// اسلایس توکن
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    clearTokenError: (state) => {
      state.error = null;
    },
    resetTokenState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // دریافت موجودی توکن
      .addCase(fetchTokenBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTokenBalance.fulfilled, (state, action: PayloadAction<TokenBalance>) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchTokenBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // دریافت تاریخچه توکن
      .addCase(fetchTokenHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTokenHistory.fulfilled, (state, action: PayloadAction<{ transactions: TokenTransaction[], total: number }>) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.transactionsTotal = action.payload.total;
      })
      .addCase(fetchTokenHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // استفاده از توکن
      .addCase(useTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(useTokens.fulfilled, (state) => {
        state.loading = false;
        // موجودی پس از استفاده از توکن باید به‌روزرسانی شود
      })
      .addCase(useTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // خرید توکن
      .addCase(buyTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buyTokens.fulfilled, (state, action: PayloadAction<{ success: boolean; tokens: Token[] }>) => {
        state.loading = false;
        state.tokens = [...state.tokens, ...action.payload.tokens];
      })
      .addCase(buyTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // بررسی وضعیت توکن
      .addCase(checkTokenStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkTokenStatus.fulfilled, (state, action: PayloadAction<{ expiringSoon: Token[]; expired: Token[] }>) => {
        state.loading = false;
        state.expiringSoonTokens = action.payload.expiringSoon;
        state.expiredTokens = action.payload.expired;
      })
      .addCase(checkTokenStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearTokenError, resetTokenState } = tokenSlice.actions;
export default tokenSlice.reducer; 
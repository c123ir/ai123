import api from './api';

// رابط‌های مربوط به توکن
export interface TokenBalance {
  userId: string;
  balance: number;
  lastUpdate: string;
  isActive: boolean;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'reward';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  targetUserId?: string;
  reference?: string;
}

export interface TokenTransferRequest {
  targetUserId: string;
  amount: number;
  description?: string;
}

export interface TokenRequestParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  type?: string;
  status?: string;
}

export interface TokenBalanceResponse {
  balance: number;
  pendingBalance: number;
  isActive: boolean;
  lastUpdate: string;
}

export interface TokenTransactionsResponse {
  transactions: TokenTransaction[];
  total: number;
  page: number;
  limit: number;
}

/**
 * سرویس مدیریت توکن‌های مانی‌بل
 */
const tokenService = {
  /**
   * دریافت موجودی توکن کاربر
   */
  getBalance: async (): Promise<TokenBalanceResponse> => {
    const response = await api.get<TokenBalanceResponse>('/tokens/balance');
    return response.data;
  },

  /**
   * دریافت لیست تراکنش‌های توکن کاربر
   */
  getTransactions: async (params: TokenRequestParams = {}): Promise<TokenTransactionsResponse> => {
    const response = await api.get<TokenTransactionsResponse>('/tokens/transactions', { params });
    return response.data;
  },

  /**
   * دریافت جزئیات یک تراکنش
   */
  getTransaction: async (transactionId: string): Promise<TokenTransaction> => {
    const response = await api.get<TokenTransaction>(`/tokens/transactions/${transactionId}`);
    return response.data;
  },

  /**
   * انتقال توکن به کاربر دیگر
   */
  transferToken: async (transferData: TokenTransferRequest): Promise<TokenTransaction> => {
    const response = await api.post<TokenTransaction>('/tokens/transfer', transferData);
    return response.data;
  },

  /**
   * درخواست برداشت توکن
   */
  withdrawToken: async (amount: number, description?: string): Promise<TokenTransaction> => {
    const response = await api.post<TokenTransaction>('/tokens/withdraw', { amount, description });
    return response.data;
  },

  /**
   * برای مدیر: دریافت موجودی توکن یک کاربر
   */
  getUserBalance: async (userId: string): Promise<TokenBalanceResponse> => {
    const response = await api.get<TokenBalanceResponse>(`/admin/tokens/users/${userId}/balance`);
    return response.data;
  },

  /**
   * برای مدیر: تغییر وضعیت فعال‌سازی توکن یک کاربر
   */
  toggleUserTokenStatus: async (userId: string, isActive: boolean): Promise<{ message: string }> => {
    const response = await api.patch<{ message: string }>(`/admin/tokens/users/${userId}/status`, { isActive });
    return response.data;
  },

  /**
   * برای مدیر: صدور توکن برای یک کاربر
   */
  issueTokens: async (userId: string, amount: number, description: string): Promise<TokenTransaction> => {
    const response = await api.post<TokenTransaction>('/admin/tokens/issue', { userId, amount, description });
    return response.data;
  },

  /**
   * برای مدیر: دریافت گزارش کلی توکن‌ها
   */
  getTokensReport: async (): Promise<{
    totalIssued: number;
    totalActive: number;
    totalUsers: number;
    totalTransactions: number;
  }> => {
    const response = await api.get<{
      totalIssued: number;
      totalActive: number;
      totalUsers: number;
      totalTransactions: number;
    }>('/admin/tokens/report');
    return response.data;
  },
};

export default tokenService;
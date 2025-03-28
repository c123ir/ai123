import axios from 'axios';
import { 
  Token, 
  TokenBalance, 
  TokenTransaction,
  GetTokenBalanceParams,
  GetTokenHistoryParams,
  UseTokensParams,
  BuyTokensParams
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * سرویس مدیریت توکن
 */
export const tokenService = {
  /**
   * دریافت موجودی توکن کاربر
   */
  getTokenBalance: async ({ userId }: GetTokenBalanceParams): Promise<TokenBalance> => {
    try {
      const response = await axios.get(`${API_URL}/tokens/balance/${userId}`);
      return response.data;
    } catch (error) {
      console.error('خطا در دریافت موجودی توکن:', error);
      throw error;
    }
  },

  /**
   * دریافت تاریخچه تراکنش‌های توکن
   */
  getTokenHistory: async (params: GetTokenHistoryParams): Promise<{ transactions: TokenTransaction[], total: number }> => {
    try {
      const { userId, page = 1, limit = 10, type, startDate, endDate } = params;
      
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());
      
      if (type) queryParams.append('type', type);
      if (startDate) queryParams.append('startDate', startDate.toISOString());
      if (endDate) queryParams.append('endDate', endDate.toISOString());
      
      const response = await axios.get(`${API_URL}/tokens/history/${userId}?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('خطا در دریافت تاریخچه توکن:', error);
      throw error;
    }
  },

  /**
   * استفاده از توکن‌ها
   */
  useTokens: async (params: UseTokensParams): Promise<{ success: boolean; transaction: TokenTransaction }> => {
    try {
      const response = await axios.post(`${API_URL}/tokens/use`, params);
      return response.data;
    } catch (error) {
      console.error('خطا در استفاده از توکن:', error);
      throw error;
    }
  },

  /**
   * خرید توکن
   */
  buyTokens: async (params: BuyTokensParams): Promise<{ success: boolean; tokens: Token[] }> => {
    try {
      const response = await axios.post(`${API_URL}/tokens/buy`, params);
      return response.data;
    } catch (error) {
      console.error('خطا در خرید توکن:', error);
      throw error;
    }
  },

  /**
   * بررسی وضعیت توکن‌ها (برای مثال، بررسی توکن‌های در حال انقضا)
   */
  checkTokenStatus: async (userId: string): Promise<{ expiringSoon: Token[]; expired: Token[] }> => {
    try {
      const response = await axios.get(`${API_URL}/tokens/status/${userId}`);
      return response.data;
    } catch (error) {
      console.error('خطا در بررسی وضعیت توکن‌ها:', error);
      throw error;
    }
  }
};

export default tokenService; 
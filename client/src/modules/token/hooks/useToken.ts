import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  fetchTokenBalance,
  fetchTokenHistory,
  useTokens,
  buyTokens,
  checkTokenStatus,
  clearTokenError
} from '../store/tokenSlice';
import {
  GetTokenBalanceParams,
  GetTokenHistoryParams,
  UseTokensParams,
  BuyTokensParams,
  TokenBalance,
  TokenTransaction,
  Token
} from '../types';

/**
 * هوک سفارشی برای مدیریت توکن‌ها
 */
export const useToken = () => {
  const dispatch = useDispatch();
  const {
    balance,
    transactions,
    transactionsTotal,
    tokens,
    expiringSoonTokens,
    expiredTokens,
    loading,
    error
  } = useSelector((state: RootState) => state.token);

  // دریافت موجودی توکن کاربر
  const getBalance = useCallback(
    (params: GetTokenBalanceParams) => {
      return dispatch(fetchTokenBalance(params));
    },
    [dispatch]
  );

  // دریافت تاریخچه تراکنش‌های توکن
  const getHistory = useCallback(
    (params: GetTokenHistoryParams) => {
      return dispatch(fetchTokenHistory(params));
    },
    [dispatch]
  );

  // استفاده از توکن‌ها
  const useUserTokens = useCallback(
    (params: UseTokensParams) => {
      return dispatch(useTokens(params));
    },
    [dispatch]
  );

  // خرید توکن
  const purchaseTokens = useCallback(
    (params: BuyTokensParams) => {
      return dispatch(buyTokens(params));
    },
    [dispatch]
  );

  // بررسی وضعیت توکن‌ها
  const checkStatus = useCallback(
    (userId: string) => {
      return dispatch(checkTokenStatus(userId));
    },
    [dispatch]
  );

  // پاک کردن خطاها
  const clearError = useCallback(() => {
    dispatch(clearTokenError());
  }, [dispatch]);

  return {
    // داده‌ها
    balance: balance as TokenBalance | null,
    transactions: transactions as TokenTransaction[],
    transactionsTotal,
    tokens: tokens as Token[],
    expiringSoonTokens: expiringSoonTokens as Token[],
    expiredTokens: expiredTokens as Token[],
    loading,
    error,

    // عملیات‌ها
    getBalance,
    getHistory,
    useTokens: useUserTokens,
    buyTokens: purchaseTokens,
    checkStatus,
    clearError
  };
};

export default useToken; 
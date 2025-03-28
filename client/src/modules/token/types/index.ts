/**
 * تایپ‌های اصلی ماژول توکن مانیبل
 */

/**
 * انواع توکن
 */
export enum TokenType {
  REWARD = 'reward',      // توکن پاداشی
  PURCHASED = 'purchased', // توکن خریداری شده
  LOYALTY = 'loyalty'     // توکن وفاداری
}

/**
 * وضعیت‌های توکن
 */
export enum TokenStatus {
  ACTIVE = 'active',     // فعال
  USED = 'used',         // استفاده شده
  EXPIRED = 'expired',   // منقضی شده
  PENDING = 'pending'    // در انتظار
}

/**
 * انواع تراکنش توکن
 */
export enum TokenTransactionType {
  EARN = 'earn',         // کسب توکن
  USE = 'use',           // استفاده از توکن
  TRANSFER = 'transfer', // انتقال توکن
  EXPIRE = 'expire'      // انقضای توکن
}

/**
 * ساختار توکن
 */
export interface Token {
  id: string;
  userId: string;
  amount: number;
  type: TokenType;
  status: TokenStatus;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ساختار تراکنش توکن
 */
export interface TokenTransaction {
  id: string;
  userId: string;
  tokenId: string;
  amount: number;
  type: TokenTransactionType;
  description: string;
  createdAt: Date;
}

/**
 * ساختار موجودی توکن
 */
export interface TokenBalance {
  total: number;
  reward: number;
  purchased: number;
  loyalty: number;
  expiringSoon: number;  // توکن‌های در حال انقضا
}

/**
 * پارامترهای دریافت موجودی توکن
 */
export interface GetTokenBalanceParams {
  userId: string;
}

/**
 * پارامترهای دریافت تاریخچه توکن
 */
export interface GetTokenHistoryParams {
  userId: string;
  page?: number;
  limit?: number;
  type?: TokenTransactionType;
  startDate?: Date;
  endDate?: Date;
}

/**
 * پارامترهای استفاده از توکن
 */
export interface UseTokensParams {
  userId: string;
  amount: number;
  purpose: string;
  metadata?: Record<string, any>;
}

/**
 * پارامترهای خرید توکن
 */
export interface BuyTokensParams {
  userId: string;
  amount: number;
  paymentMethod: string;
  paymentDetails: Record<string, any>;
} 
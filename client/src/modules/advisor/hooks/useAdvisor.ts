import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  fetchAdvisors,
  fetchAdvisorById,
  bookAdvisorSession,
  fetchSessionsByUserId,
  fetchSessionById,
  addQuestionToSession,
  addFeedbackToSession,
  cancelSessionById,
  setError,
  clearError,
  setLoading
} from '../store/advisorSlice';
import type { Advisor, AdvisorSession, BookSessionParams, QuestionParams, FeedbackParams, CancelSessionParams } from '../types';

/**
 * هوک سفارشی برای مدیریت مشاوره هوشمند
 */
export const useAdvisor = () => {
  const dispatch = useDispatch();
  const {
    advisors,
    selectedAdvisor,
    sessions,
    selectedSession,
    loading,
    error
  } = useSelector((state: RootState) => state.advisor);

  const getAdvisors = useCallback(async (filters?: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(fetchAdvisors(filters));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در دریافت لیست مشاوران'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const getAdvisorById = useCallback(async (id: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(fetchAdvisorById(id));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات مشاور'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const bookSession = useCallback(async (params: BookSessionParams) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(bookAdvisorSession(params));
      return true;
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در رزرو جلسه مشاوره'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const getSessions = useCallback(async (userId: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(fetchSessionsByUserId(userId));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در دریافت لیست جلسات'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const getSessionById = useCallback(async (sessionId: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(fetchSessionById(sessionId));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در دریافت اطلاعات جلسه'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const addQuestion = useCallback(async (params: QuestionParams) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(addQuestionToSession(params));
      return true;
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در اضافه کردن سوال'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const addFeedback = useCallback(async (params: FeedbackParams) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(addFeedbackToSession(params));
      return true;
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در ثبت بازخورد'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const cancelSession = useCallback(async (params: CancelSessionParams) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await dispatch(cancelSessionById(params));
      return true;
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'خطا در لغو جلسه'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    advisors,
    selectedAdvisor,
    sessions,
    selectedSession,
    loading,
    error,
    getAdvisors,
    getAdvisorById,
    bookSession,
    getSessions,
    getSessionById,
    addQuestion,
    addFeedback,
    cancelSession
  };
};

export default useAdvisor; 
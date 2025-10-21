import { useCallback, useEffect, useState } from 'react';
import { ApiResponse, apiService } from '../services/api';

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Specific hooks for common operations
export function useUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  interests?: string;
  skillLevel?: string;
  city?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}) {
  return useApi(() => apiService.getUsers(params), [JSON.stringify(params)]);
}

export function useUser(userId: string) {
  return useApi(() => apiService.getUserById(userId), [userId]);
}

export function useEvents(params?: {
  page?: number;
  limit?: number;
  sport?: string;
  skillLevel?: string;
  city?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}) {
  return useApi(() => apiService.getEvents(params), [JSON.stringify(params)]);
}

export function useEvent(eventId: string) {
  return useApi(() => apiService.getEventById(eventId), [eventId]);
}

export function useUserEvents(userId: string, type?: 'all' | 'organized' | 'participating') {
  return useApi(() => apiService.getUserEvents(userId, { type }), [userId, type]);
}

export function useUserStats(userId: string) {
  return useApi(() => apiService.getUserStats(userId), [userId]);
}

// Custom hook for API operations with loading states
export function useApiOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <T>(
    operation: () => Promise<ApiResponse<T>>
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await operation();
      return response.data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('API Operation Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error, setError };
}

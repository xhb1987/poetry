import { useState, useEffect } from "react";
import { poetryService, Poetry, handleApiError } from "../services/api";

interface UseDailyPoetryResult {
  dailyPoetry: Poetry | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useDailyPoetry = (): UseDailyPoetryResult => {
  const [dailyPoetry, setDailyPoetry] = useState<Poetry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDailyPoetry = async () => {
    try {
      setLoading(true);
      setError(null);

      const poetry = await poetryService.getDailyPoetry();
      setDailyPoetry(poetry);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await loadDailyPoetry();
  };

  useEffect(() => {
    loadDailyPoetry();
  }, []);

  return {
    dailyPoetry,
    loading,
    error,
    refresh,
  };
};

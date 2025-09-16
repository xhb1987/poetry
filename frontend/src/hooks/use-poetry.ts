import { useState, useEffect } from "react";
import { poetryService, Poetry, handleApiError } from "../services/api";

interface UsePoetryResult {
  poetry: Poetry[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const usePoetry = (initialLimit = 12): UsePoetryResult => {
  const [poetry, setPoetry] = useState<Poetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadPoetry = async (currentOffset = 0, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const newPoetry = await poetryService.getAllPoetry(
        initialLimit,
        currentOffset
      );

      if (append) {
        setPoetry((prev) => [...prev, ...newPoetry]);
      } else {
        setPoetry(newPoetry);
      }

      setHasMore(newPoetry.length === initialLimit);
      setOffset(currentOffset + newPoetry.length);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!loading && hasMore) {
      await loadPoetry(offset, true);
    }
  };

  const refresh = async () => {
    setOffset(0);
    await loadPoetry(0, false);
  };

  useEffect(() => {
    loadPoetry();
  }, []);

  return {
    poetry,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};

import { useState } from "react";
import {
  poetryService,
  Poetry,
  SearchParams,
  handleApiError,
} from "../services/api";

interface UseSearchResult {
  results: Poetry[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  search: (params: SearchParams) => Promise<void>;
  clearSearch: () => void;
}

export const useSearch = (): UseSearchResult => {
  const [results, setResults] = useState<Poetry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);

      const searchResults = await poetryService.searchPoetry(params);
      setResults(searchResults);
      setHasSearched(true);
    } catch (err) {
      setError(handleApiError(err));
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setResults([]);
    setError(null);
    setHasSearched(false);
    setLoading(false);
  };

  return {
    results,
    loading,
    error,
    hasSearched,
    search,
    clearSearch,
  };
};

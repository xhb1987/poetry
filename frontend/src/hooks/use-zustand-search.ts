import { useAppStore } from "../store/app-store";
import { poetryActions } from "../store/poetry-actions";

/**
 * Custom hook for search functionality using Zustand
 */
export const useZustandSearch = () => {
  const isSearchLoading = useAppStore((state) => state.isSearchLoading);
  const searchError = useAppStore((state) => state.searchError);
  const searchResults = useAppStore((state) => state.searchResults);
  const hasSearched = useAppStore((state) => state.hasSearched);

  const search = async (query: string) => {
    await poetryActions.searchPoetry({ query });
  };

  const clearSearch = () => {
    const { clearSearch: clearSearchState } = useAppStore.getState();
    clearSearchState();
  };

  return {
    search,
    clearSearch,
    isSearchLoading,
    searchError,
    searchResults,
    hasSearched,
  };
};

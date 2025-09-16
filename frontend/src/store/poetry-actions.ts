import { poetryService, handleApiError, SearchParams } from "../services/api";
import { useAppStore } from "./app-store";

// Guard to prevent duplicate API calls
const loadingGuards = {
  loadPoetry: false,
  loadDailyPoetry: false,
  searchPoetry: false,
};

// Poetry actions that integrate with the API and update the store
export const poetryActions = {
  // Load initial poetry data
  loadPoetry: async (limit = 12) => {
    if (loadingGuards.loadPoetry) {
      console.log("Poetry loading already in progress, skipping...");
      return;
    }

    const { setLoading, setError, setPoetry, setHasMore, setOffset } =
      useAppStore.getState();

    try {
      loadingGuards.loadPoetry = true;
      setLoading(true);
      setError(null);

      console.log("Loading poetry data...");
      const poetry = await poetryService.getAllPoetry(limit, 0);

      setPoetry(poetry);
      setHasMore(poetry.length === limit);
      setOffset(poetry.length);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
      loadingGuards.loadPoetry = false;
    }
  },

  // Load more poetry (pagination)
  loadMorePoetry: async (limit = 12) => {
    const {
      isLoading,
      hasMore,
      offset,
      addPoetry,
      setHasMore,
      incrementOffset,
    } = useAppStore.getState();

    if (isLoading || !hasMore) return;

    try {
      const newPoetry = await poetryService.getAllPoetry(limit, offset);

      addPoetry(newPoetry);
      setHasMore(newPoetry.length === limit);
      incrementOffset(newPoetry.length);
    } catch (error) {
      console.error("Failed to load more poetry:", handleApiError(error));
    }
  },

  // Search poetry
  searchPoetry: async (params: SearchParams) => {
    if (loadingGuards.searchPoetry) {
      console.log("Search already in progress, skipping...");
      return;
    }

    const {
      setSearchLoading,
      setSearchError,
      setSearchResults,
      setHasSearched,
      setCurrentView,
    } = useAppStore.getState();

    try {
      loadingGuards.searchPoetry = true;
      setSearchLoading(true);
      setSearchError(null);

      console.log("Searching poetry...", params);
      const results = await poetryService.searchPoetry(params);

      console.log("Search results received:", results);
      console.log("Results count:", results.length);
      console.log("Setting search results in store...");

      setSearchResults(results);
      setHasSearched(true);
      setCurrentView("search");

      console.log("Store updated with search results");
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(handleApiError(error));
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
      loadingGuards.searchPoetry = false;
    }
  },

  // Load daily poetry
  loadDailyPoetry: async () => {
    if (loadingGuards.loadDailyPoetry) {
      console.log("Daily poetry loading already in progress, skipping...");
      return;
    }

    const { setDailyLoading, setDailyError, setDailyPoetry } =
      useAppStore.getState();

    try {
      loadingGuards.loadDailyPoetry = true;
      setDailyLoading(true);
      setDailyError(null);

      console.log("Loading daily poetry...");
      const dailyPoetry = await poetryService.getDailyPoetry();
      setDailyPoetry(dailyPoetry);
    } catch (error) {
      setDailyError(handleApiError(error));
    } finally {
      setDailyLoading(false);
      loadingGuards.loadDailyPoetry = false;
    }
  },

  // Refresh all data
  refreshAll: async () => {
    const { resetPagination } = useAppStore.getState();
    resetPagination();

    await Promise.all([
      poetryActions.loadPoetry(),
      poetryActions.loadDailyPoetry(),
    ]);
  },

  // Navigate to view with data loading
  navigateToHome: () => {
    const { setCurrentView, clearSearch, poetry } = useAppStore.getState();

    clearSearch();
    setCurrentView("home");

    // Load poetry if not already loaded asynchronously
    if (poetry.length === 0) {
      // Don't await to avoid blocking the navigation
      poetryActions.loadPoetry().catch(console.error);
    }
  },

  navigateToDaily: () => {
    const { setCurrentView, clearSearch, dailyPoetry } = useAppStore.getState();

    clearSearch();
    setCurrentView("daily");

    // Load daily poetry if not already loaded asynchronously
    if (!dailyPoetry) {
      // Don't await to avoid blocking the navigation
      poetryActions.loadDailyPoetry().catch(console.error);
    }
  },

  navigateToSearch: () => {
    const { setCurrentView } = useAppStore.getState();
    setCurrentView("search");
  },
};

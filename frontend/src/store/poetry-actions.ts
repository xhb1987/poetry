import { poetryService, handleApiError, SearchParams } from "../services/api";
import { useAppStore } from "./app-store";

// Guard to prevent duplicate API calls
const loadingGuards = {
  loadPoetry: false,
  loadDailyPoetry: false,
  search: false,
  categories: false,
};

// Poetry actions that integrate with the API and update the store
export const poetryActions = {
  // Load initial poetry data with optional category filter
  loadPoetry: async (limit = 12, category?: string) => {
    if (loadingGuards.loadPoetry) {
      console.log("Poetry loading already in progress, skipping...");
      return;
    }

    const {
      setLoading,
      setError,
      setPoetry,
      setHasMore,
      setOffset,
      setHasLoadedPoetry,
      selectedCategory,
    } = useAppStore.getState();

    // Use selected category if not provided
    const categoryFilter = category || selectedCategory;

    try {
      loadingGuards.loadPoetry = true;
      setLoading(true);
      setError(null);

      console.log("Loading poetry data with category:", categoryFilter);
      const poetry = await poetryService.getAllPoetry(limit, 0, categoryFilter);

      setPoetry(poetry);
      setHasMore(poetry.length === limit);
      setOffset(poetry.length);
      setHasLoadedPoetry(true); // Mark that we've loaded poetry data
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
      selectedCategory,
      addPoetry,
      setHasMore,
      incrementOffset,
    } = useAppStore.getState();

    if (isLoading || !hasMore) return;

    try {
      const newPoetry = await poetryService.getAllPoetry(
        limit,
        offset,
        selectedCategory
      );

      addPoetry(newPoetry);
      setHasMore(newPoetry.length === limit);
      incrementOffset(newPoetry.length);
    } catch (error) {
      console.error("Failed to load more poetry:", handleApiError(error));
    }
  },

  // Search poetry with optional category filtering
  searchPoetry: async (params: SearchParams) => {
    if (loadingGuards.search) {
      console.log("Search already in progress, skipping...");
      return;
    }

    const {
      setSearchLoading,
      setSearchError,
      setSearchResults,
      setHasSearched,
      setCurrentView,
      selectedCategory,
    } = useAppStore.getState();

    try {
      loadingGuards.search = true;
      setSearchLoading(true);
      setSearchError(null);

      console.log(
        "Searching poetry with params:",
        params,
        "selectedCategory:",
        selectedCategory
      );

      // Add selected category to search params if not already specified
      const searchParams = {
        ...params,
        category: params.category || selectedCategory,
      };

      const searchResponse = await poetryService.searchPoetry(searchParams);

      console.log("Search results received:", searchResponse);
      setSearchResults(searchResponse.results);
      setHasSearched(true);
      setCurrentView("search");
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(handleApiError(error));
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
      loadingGuards.search = false;
    }
  },

  // Load daily poetry (rotating through all categories)
  loadDailyPoetry: async (category?: string) => {
    if (loadingGuards.loadDailyPoetry) {
      console.log("Daily poetry loading already in progress, skipping...");
      return;
    }

    const {
      setDailyLoading,
      setDailyError,
      setDailyPoetry,
      setHasLoadedDaily,
    } = useAppStore.getState();

    try {
      loadingGuards.loadDailyPoetry = true;
      setDailyLoading(true);
      setDailyError(null);

      console.log("Loading daily poetry with category:", category);
      // For daily poetry, we don't filter by category to mix all categories
      const dailyPoetryResponse = await poetryService.getDailyPoetry(category);
      setDailyPoetry(dailyPoetryResponse.poetry);
      setHasLoadedDaily(true); // Mark that we've loaded daily poetry
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

  // Load categories and statistics
  loadCategories: async () => {
    if (loadingGuards.categories) {
      console.log("Categories loading already in progress, skipping...");
      return;
    }

    const { setCategoriesLoading, setError, setCategories } =
      useAppStore.getState();

    try {
      loadingGuards.categories = true;
      setCategoriesLoading(true);
      setError(null);

      console.log("Loading categories...");
      const categoriesData = await poetryService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setCategoriesLoading(false);
      loadingGuards.categories = false;
    }
  },

  // Change selected category and reload data
  selectCategory: async (category: string | null) => {
    const { setSelectedCategory, setHasLoadedPoetry, currentView } =
      useAppStore.getState();

    // Convert null to empty string or handle appropriately
    setSelectedCategory(category || "");

    // Reset loaded flag since we're changing category
    setHasLoadedPoetry(false);

    // Reload data for current view with new category
    if (currentView === "home") {
      await poetryActions.loadPoetry(12, category || undefined);
    } else if (currentView === "daily") {
      await poetryActions.loadDailyPoetry(category || undefined);
    }
  },
};

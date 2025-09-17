import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Poetry, PoetryCategory, CategoryStats } from "../services/api";

// Define the application state interface
interface AppState {
  // UI State
  currentView: "home" | "search" | "daily";
  selectedPoetry: Poetry | null;
  isModalOpen: boolean;

  // Loading States
  isLoading: boolean;
  isSearchLoading: boolean;
  isDailyLoading: boolean;
  hasLoadedPoetry: boolean; // Track if poetry has been loaded at least once
  hasLoadedDaily: boolean; // Track if daily poetry has been loaded at least once

  // Error States
  error: string | null;
  searchError: string | null;
  dailyError: string | null;

  // Data
  poetry: Poetry[];
  searchResults: Poetry[];
  dailyPoetry: Poetry | null;
  hasSearched: boolean;

  // Category Data
  categories: PoetryCategory[];
  selectedCategory: string;
  categoryStats: CategoryStats[];
  isCategoriesLoading: boolean;

  // Pagination
  hasMore: boolean;
  offset: number;

  // Actions
  setCurrentView: (view: "home" | "search" | "daily") => void;
  setSelectedPoetry: (poetry: Poetry | null) => void;
  setModalOpen: (isOpen: boolean) => void;

  setLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setDailyLoading: (loading: boolean) => void;
  setHasLoadedPoetry: (hasLoaded: boolean) => void;
  setHasLoadedDaily: (hasLoaded: boolean) => void;

  setError: (error: string | null) => void;
  setSearchError: (error: string | null) => void;
  setDailyError: (error: string | null) => void;

  setPoetry: (poetry: Poetry[]) => void;
  addPoetry: (poetry: Poetry[]) => void;
  setSearchResults: (results: Poetry[]) => void;
  setDailyPoetry: (poetry: Poetry | null) => void;
  setHasSearched: (hasSearched: boolean) => void;

  setCategories: (categories: PoetryCategory[]) => void;
  setSelectedCategory: (category: string) => void;
  setCategoryStats: (stats: CategoryStats[]) => void;
  setCategoriesLoading: (loading: boolean) => void;

  setHasMore: (hasMore: boolean) => void;
  setOffset: (offset: number) => void;
  incrementOffset: (amount: number) => void;

  // Complex Actions
  openPoetryModal: (poetry: Poetry) => void;
  closePoetryModal: () => void;
  clearSearch: () => void;
  resetPagination: () => void;
  reset: () => void;
}

// Initial state
const initialState = {
  // UI State
  currentView: "home" as const,
  selectedPoetry: null,
  isModalOpen: false,

  // Loading States
  isLoading: false,
  isSearchLoading: false,
  isDailyLoading: false,
  hasLoadedPoetry: false,
  hasLoadedDaily: false,

  // Error States
  error: null,
  searchError: null,
  dailyError: null,

  // Data
  poetry: [],
  searchResults: [],
  dailyPoetry: null,
  hasSearched: false,

  // Category Data
  categories: [],
  selectedCategory: "all",
  categoryStats: [],
  isCategoriesLoading: false,

  // Pagination
  hasMore: true,
  offset: 0,
};

// Create the Zustand store
export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      ...initialState,

      // UI Actions
      setCurrentView: (view) => set({ currentView: view }),
      setSelectedPoetry: (poetry) => set({ selectedPoetry: poetry }),
      setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

      // Loading Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setSearchLoading: (loading) => set({ isSearchLoading: loading }),
      setDailyLoading: (loading) => set({ isDailyLoading: loading }),
      setHasLoadedPoetry: (hasLoaded) => set({ hasLoadedPoetry: hasLoaded }),
      setHasLoadedDaily: (hasLoaded) => set({ hasLoadedDaily: hasLoaded }),

      // Error Actions
      setError: (error) => set({ error }),
      setSearchError: (error) => set({ searchError: error }),
      setDailyError: (error) => set({ dailyError: error }),

      // Data Actions
      setPoetry: (poetry) => set({ poetry }),
      addPoetry: (newPoetry) =>
        set((state) => ({
          poetry: [...state.poetry, ...newPoetry],
        })),
      setSearchResults: (results) => set({ searchResults: results }),
      setDailyPoetry: (poetry) => set({ dailyPoetry: poetry }),
      setHasSearched: (hasSearched) => set({ hasSearched }),

      // Category Actions
      setCategories: (categories) => set({ categories }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setCategoryStats: (stats) => set({ categoryStats: stats }),
      setCategoriesLoading: (loading) => set({ isCategoriesLoading: loading }),

      // Pagination Actions
      setHasMore: (hasMore) => set({ hasMore }),
      setOffset: (offset) => set({ offset }),
      incrementOffset: (amount) =>
        set((state) => ({
          offset: state.offset + amount,
        })),

      // Complex Actions
      openPoetryModal: (poetry) =>
        set({
          selectedPoetry: poetry,
          isModalOpen: true,
        }),
      closePoetryModal: () =>
        set({
          selectedPoetry: null,
          isModalOpen: false,
        }),
      clearSearch: () =>
        set({
          searchResults: [],
          hasSearched: false,
          searchError: null,
        }),
      resetPagination: () =>
        set({
          offset: 0,
          hasMore: true,
        }),
      reset: () => set(initialState),
    }),
    {
      name: "poetry-app-store", // Store name for devtools
    }
  )
);

// Selectors for common state combinations
export const useAppSelectors = {
  // UI selectors
  useCurrentView: () => useAppStore((state) => state.currentView),
  useModal: () =>
    useAppStore((state) => ({
      selectedPoetry: state.selectedPoetry,
      isModalOpen: state.isModalOpen,
      openPoetryModal: state.openPoetryModal,
      closePoetryModal: state.closePoetryModal,
    })),

  // Poetry data selectors
  usePoetryData: () =>
    useAppStore((state) => ({
      poetry: state.poetry,
      isLoading: state.isLoading,
      error: state.error,
      hasMore: state.hasMore,
    })),

  // Search selectors
  useSearchData: () =>
    useAppStore((state) => ({
      searchResults: state.searchResults,
      isSearchLoading: state.isSearchLoading,
      searchError: state.searchError,
      hasSearched: state.hasSearched,
    })),

  // Daily poetry selectors
  useDailyData: () =>
    useAppStore((state) => ({
      dailyPoetry: state.dailyPoetry,
      isDailyLoading: state.isDailyLoading,
      dailyError: state.dailyError,
    })),
};

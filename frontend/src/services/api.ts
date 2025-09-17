import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "/api", // This will be proxied to http://localhost:3000 by Vite
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types for API responses
export interface Poetry {
  id: string;
  title?: string;
  content?: string;
  paragraphs?: string[] | null;
  rhythmic?: string | null;
  author?: string | null;
  chapter?: string | null;
  section?: string | null;
  category?: string | null; // Add the category field from backend
  createdAt: string;
  updatedAt: string;
}

export interface PoetryCategory {
  value: string;
  label: string;
  description: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  chapter?: string;
  section?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResponse {
  results: Poetry[];
  total: number;
  query: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export interface DailyPoetryResponse {
  message: string;
  date: string;
  category: string;
  poetry: Poetry;
}

export interface CategoryStats {
  category: string;
  count: number;
  name: string;
}

export interface RhythmicPattern {
  rhythmic: string;
  count: number;
}

// API service functions
export const poetryService = {
  // Get available categories
  getCategories: async (): Promise<PoetryCategory[]> => {
    const response = await api.get("/poetry/categories");
    return response.data.categories;
  },

  // Get category statistics
  getCategoryStats: async (category: string): Promise<CategoryStats> => {
    const response = await api.get(`/poetry/categories/${category}/stats`);
    return response.data;
  },

  // Get all categories statistics
  getAllCategoriesStats: async (): Promise<CategoryStats[]> => {
    const categories = await poetryService.getCategories();
    const statsPromises = categories.map((cat) =>
      poetryService.getCategoryStats(cat.value)
    );
    return await Promise.all(statsPromises);
  },

  // Get all poetry with pagination and optional category filter
  getAllPoetry: async (
    limit = 20,
    offset = 0,
    category?: string
  ): Promise<Poetry[]> => {
    let url = `/poetry/all-poetry?limit=${limit}&offset=${offset}`;
    if (category && category !== "all") {
      url += `&category=${category}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  // Get daily poetry with optional category filter
  getDailyPoetry: async (category?: string): Promise<DailyPoetryResponse> => {
    let url = "/poetry/daily";
    if (category && category !== "all") {
      url += `?category=${category}`;
    }
    const response = await api.get(url);
    console.log("Daily poetry API response:", response.data);
    return response.data;
  },

  // Get random poetry with optional category filter
  getRandomPoetry: async (category?: string): Promise<DailyPoetryResponse> => {
    let url = "/poetry/random";
    if (category && category !== "all") {
      url += `?category=${category}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  // Search poetry with category support
  searchPoetry: async (params: SearchParams): Promise<SearchResponse> => {
    const {
      query,
      category,
      chapter,
      section,
      limit = 20,
      offset = 0,
    } = params;

    if (query) {
      console.log(
        "API: Making search request with query:",
        query,
        "category:",
        category
      );
      let url = `/poetry/search?q=${encodeURIComponent(
        query
      )}&limit=${limit}&offset=${offset}`;
      if (category && category !== "all") {
        url += `&category=${category}`;
      }
      const response = await api.get(url);
      console.log("API: Search response received:", response.data);
      return response.data;
    }

    if (chapter) {
      const response = await api.get(
        `/poetry/search/chapter/${encodeURIComponent(
          chapter
        )}?limit=${limit}&offset=${offset}`
      );
      return {
        results: response.data,
        total: response.data.length,
        query: `chapter:${chapter}`,
        limit,
        offset,
      };
    }

    if (section) {
      const response = await api.get(
        `/poetry/search/section/${encodeURIComponent(
          section
        )}?limit=${limit}&offset=${offset}`
      );
      return {
        results: response.data,
        total: response.data.length,
        query: `section:${section}`,
        limit,
        offset,
      };
    }

    // Fallback to all poetry
    const results = await poetryService.getAllPoetry(limit, offset, category);
    return {
      results,
      total: results.length,
      query: "",
      category,
      limit,
      offset,
    };
  },

  // Get single poetry by ID
  getPoetryById: async (id: number): Promise<Poetry> => {
    const response = await api.get(`/poetry/${id}`);
    return response.data;
  },

  // Get poetry by chapter
  getPoetryByChapter: async (
    chapter: string,
    limit = 20,
    offset = 0
  ): Promise<Poetry[]> => {
    const response = await api.get(
      `/poetry/search/chapter/${encodeURIComponent(
        chapter
      )}?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  // Get poetry by section
  getPoetryBySection: async (
    section: string,
    limit = 20,
    offset = 0
  ): Promise<Poetry[]> => {
    const response = await api.get(
      `/poetry/search/section/${encodeURIComponent(
        section
      )}?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  // Get rhythmic patterns (for Song Ci)
  getRhythmicPatterns: async (limit = 20): Promise<RhythmicPattern[]> => {
    const response = await api.get(`/poetry/rhythmic-patterns?limit=${limit}`);
    return response.data;
  },

  // Get poetry by rhythmic pattern
  getPoetryByRhythmic: async (
    rhythmic: string,
    page = 1,
    limit = 10
  ): Promise<Poetry[]> => {
    const response = await api.get(
      `/poetry/rhythmic/${encodeURIComponent(
        rhythmic
      )}?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error status
    return (
      error.response.data?.message || `服務器錯誤 (${error.response.status})`
    );
  } else if (error.request) {
    // Request was made but no response received
    return "無法連接到服務器，請檢查網絡連接";
  } else {
    // Something else happened
    return error.message || "發生未知錯誤";
  }
};

export default api;

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
  id: number;
  title: string;
  content: string | undefined;
  chapter: string | undefined;
  section: string | undefined;
}

export interface SearchParams {
  query?: string;
  chapter?: string;
  section?: string;
  limit?: number;
  offset?: number;
}

// API service functions
export const poetryService = {
  // Get all poetry with pagination
  getAllPoetry: async (limit = 20, offset = 0): Promise<Poetry[]> => {
    const response = await api.get(
      `/poetry/all-poetry?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },

  // Get daily poetry
  getDailyPoetry: async (): Promise<Poetry> => {
    const response = await api.get("/poetry/daily");
    return response.data;
  },

  // Search poetry
  searchPoetry: async (params: SearchParams): Promise<Poetry[]> => {
    const { query, chapter, section, limit = 20, offset = 0 } = params;

    if (query) {
      console.log("API: Making search request with query:", query);
      const response = await api.get(
        `/poetry/search?q=${encodeURIComponent(
          query
        )}&limit=${limit}&offset=${offset}`
      );
      console.log("API: Search response received:", response.data);
      // Backend returns { results: Poetry[], total: number, ... }
      // We need to return just the results array
      const results = response.data.results || response.data;
      console.log("API: Returning results:", results);
      return results;
    }

    if (chapter) {
      const response = await api.get(
        `/poetry/search/chapter/${encodeURIComponent(
          chapter
        )}?limit=${limit}&offset=${offset}`
      );
      return response.data;
    }

    if (section) {
      const response = await api.get(
        `/poetry/search/section/${encodeURIComponent(
          section
        )}?limit=${limit}&offset=${offset}`
      );
      return response.data;
    }

    // Fallback to all poetry
    return await poetryService.getAllPoetry(limit, offset);
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

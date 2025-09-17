// Poetry category types based on our database structure
export type PoetryCategory = "shijing" | "song_ci";

// Display categories for UI - these are the traditional subcategories
export type ShijingSubCategory = "风" | "雅" | "颂";

// For Song Ci, we might use rhythmic patterns or other classifications
export type SongCiSubCategory = string; // Flexible for various rhythmic patterns

// Combined type for all display categories
export type DisplayCategory = ShijingSubCategory | SongCiSubCategory;

// Category information for UI display
export interface CategoryInfo {
  id: PoetryCategory;
  name: string;
  description: string;
  count?: number;
}

// Poetry item interface
export interface Poetry {
  id: string;
  title?: string;
  content?: string;
  paragraphs?: string[];
  rhythmic?: string;
  author?: string;
  chapter?: string;
  section?: string;
  category?: PoetryCategory;
  createdAt: string;
  updatedAt: string;
}

// Helper functions for category mapping
export const getCategoryDisplayName = (category: PoetryCategory): string => {
  switch (category) {
    case "shijing":
      return "诗经";
    case "song_ci":
      return "宋词";
    default:
      return "未知";
  }
};

export const getShijingSubCategory = (chapter?: string): ShijingSubCategory => {
  if (!chapter) return "风";
  if (chapter.includes("風") || chapter.includes("风")) return "风";
  if (chapter.includes("雅")) return "雅";
  if (chapter.includes("頌") || chapter.includes("颂")) return "颂";
  return "风";
};

export const getSongCiDisplayCategory = (rhythmic?: string): string => {
  // For Song Ci, we can use the rhythmic pattern as display category
  // or fallback to a generic category
  return rhythmic || "词";
};

export const getDisplayCategory = (poetry: Poetry): DisplayCategory => {
  if (poetry.category === "shijing") {
    return getShijingSubCategory(poetry.chapter);
  } else if (poetry.category === "song_ci") {
    return getSongCiDisplayCategory(poetry.rhythmic);
  } else {
    return "风"; // fallback
  }
};

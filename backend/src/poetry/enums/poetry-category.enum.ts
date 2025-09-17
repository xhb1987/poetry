export enum PoetryCategory {
  SHIJING = 'shijing',
  SONG_CI = 'song_ci',
}

export const CATEGORY_DESCRIPTIONS = {
  [PoetryCategory.SHIJING]: {
    name: '诗经',
    description: 'The Book of Songs - Classical Chinese poetry collection',
    identifier: 'chapter', // Shijing poems have chapter/section
  },
  [PoetryCategory.SONG_CI]: {
    name: '宋词',
    description: 'Song Dynasty Ci poetry with rhythmic patterns',
    identifier: 'rhythmic', // Song Ci poems have rhythmic patterns
  },
} as const;

export function getCategoryFromPoetry(poetry: {
  rhythmic?: string | null;
  chapter?: string | null;
  section?: string | null;
}): PoetryCategory {
  // If it has rhythmic field, it's Song Ci
  if (poetry.rhythmic) {
    return PoetryCategory.SONG_CI;
  }
  // If it has chapter/section, it's Shijing
  if (poetry.chapter || poetry.section) {
    return PoetryCategory.SHIJING;
  }
  // Default fallback - could be enhanced with more logic
  return PoetryCategory.SHIJING;
}

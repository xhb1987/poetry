export class CreatePoetryDto {
  title?: string; // Make optional since ci.song data might not have titles
  content?: string; // Keep for backward compatibility, make optional
  paragraphs?: string[]; // New field: array of poem lines/paragraphs
  rhythmic?: string; // New field: rhythm/meter of the poem (词牌名)
  author?: string; // Optional for classical texts like Shijing
  chapter?: string; // For organizational categorization (e.g., "国风")
  section?: string; // For sub-categorization (e.g., "周南")
}

export class UpdatePoetryDto {
  title?: string;
  content?: string;
  paragraphs?: string[]; // New field: array of poem lines/paragraphs
  rhythmic?: string; // New field: rhythm/meter of the poem (词牌名)
  author?: string;
  chapter?: string;
  section?: string;
}

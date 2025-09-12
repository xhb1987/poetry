export class CreatePoetryDto {
  title: string;
  content: string;
  author?: string; // Optional for classical texts like Shijing
  chapter?: string; // For organizational categorization (e.g., "国风")
  section?: string; // For sub-categorization (e.g., "周南")
}

export class UpdatePoetryDto {
  title?: string;
  content?: string;
  author?: string;
  chapter?: string;
  section?: string;
}

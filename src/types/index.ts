export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  client?: string;
  year?: string;
  role?: string;
  tags: string[];
  imageUrl: string;
  link: string;
  size: "small" | "medium" | "large";
  gallery?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
  techStack?: { category: string; tools: string[] }[];
}

export interface Theme {
  light: "light";
  dark: "dark";
  system: "system";
}

export type ThemeValue = keyof Theme;

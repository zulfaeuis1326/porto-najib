// Types untuk seluruh aplikasi

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  photoUrl: string;
  cvUrl: string;
  location: string;
  email: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  coverUrl: string;
  images: string[];
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

export interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

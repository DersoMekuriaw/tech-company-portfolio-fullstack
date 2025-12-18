// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  process: string[];
  technologies: string[];
  price?: {
    basic: number;
    standard: number;
    premium: number;
  };
}

// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  badge: 'Popular' | 'New' | 'Best Seller' | 'Updated';
  images: string[];
  specifications: Record<string, string>;
  downloads: number;
  version: string;
  lastUpdated: string;
}

// Portfolio Types
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  duration: string;
  budget: string;
  teamSize: number;
  images: string[];
  tags: string[];
  year: string;
  link: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    company: string;
  };
}

// News/Article Types
export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  tags: string[];
  views: number;
  shares: number;
}

// Team Member Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  skills: string[];
  experience: number;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

// Navigation Types
export type RootStackParamList = {
  '(tabs)': undefined;
  'service-detail/[id]': { id: string };
  'portfolio-detail/[id]': { id: string };
  'product-detail/[id]': { id: string };
  'article-detail/[id]': { id: string };
};

export type TabParamList = {
  index: undefined;
  services: undefined;
  products: undefined;
  portfolio: undefined;
  news: undefined;
  about: undefined;
  contact: undefined;
};
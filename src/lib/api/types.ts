import { ArticleContentProps } from "@/components/blog/article-content";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  content: ArticleContentProps;
  featuredImage: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  category: Category;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
}

export interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  readTime: number;
  category: string;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}

export interface Job {
  id: number;
  title: string;
  slug: string;
  logo: string;
  registrationStartDate?: string;
  registrationEndDate?: string;
  notificationDate?: string;
  level?: string;
  examDate?: string;
  posts?: number;
  detailsUrl?: string;
  officialSiteUrl?: string;
  categories?: string[];
}

export interface BlogCardProps {
  id: string;
  title: string;
  image: string;
  source: string;
  timeAgo: string;
  likes: number;
  comments: number;
  shares: number;
  isSponsored?: boolean;
  isLarge?: boolean;
  hasPlayButton?: boolean;
  sourceLogo?: string;
  slug: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  formattedContent?: ArticleSection[];
  category: string;
  publishedAt: string;
  readTime: number;
  imageUrl?: string;
  slug: string;
  attachments?: Attachment[];
  sources?: Source[];
  relatedArticles?: Article[];
  author: User;
  status: 'draft' | 'published' | 'archived';
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleSection {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'divider';
  level?: 1 | 2 | 3 | 4 | 5 | 6; // for headings
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  listItems?: string[];
  listType?: 'bullet' | 'numbered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'moderator';
  avatar?: string;
  bio?: string;
  position?: string;
  permissions: Permission[];
  createdAt: string;
  lastLoginAt?: string;
}

export interface Permission {
  id: string;
  action: 'create_article' | 'edit_article' | 'delete_article' | 'moderate_comments' | 'manage_users' | 'manage_reports' | 'manage_categories';
  resource: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png' | 'other';
}

export interface Source {
  id: string;
  title: string;
  url: string;
  type: 'document' | 'law' | 'recording' | 'other';
}

export interface Document {
  id: string;
  name: string;
  url: string;
  size: string;
  type: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png' | 'other';
  publishedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
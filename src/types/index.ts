export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  readTime: number;
  imageUrl?: string;
  slug: string;
  attachments?: Attachment[];
  sources?: Source[];
  relatedArticles?: Article[];
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
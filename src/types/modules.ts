export interface CitizenReport {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images?: string[];
  isAnonymous: boolean;
  authorName?: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface PublicRequest {
  id: string;
  submissionDate: string;
  topic: string;
  status: 'pending' | 'processing' | 'responded' | 'rejected';
  responseUrl?: string;
  daysWaiting: number;
}

export interface FactCheck {
  id: string;
  title: string;
  claim: string;
  verdict: 'true' | 'false' | 'partly_true' | 'misleading';
  explanation: string;
  sources: Array<{
    title: string;
    url: string;
  }>;
  publishedAt: string;
}

export interface Promise {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'not_started' | 'broken';
  evidence?: string;
  evidenceUrl?: string;
  category: string;
}

export interface Opinion {
  id: string;
  content: string;
  authorName?: string;
  isAnonymous: boolean;
  articleId?: string;
  createdAt: string;
  isApproved: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    votes: number;
  }>;
  isActive: boolean;
  createdAt: string;
  totalVotes: number;
}

export interface FacebookPost {
  id: string;
  originalText: string;
  editedText?: string;
  screenshots: string[];
  date: string;
  editDate?: string;
  context: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  description: string;
  details?: string;
}

export interface Official {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo?: string;
  promises: string[];
  votes: Array<{
    topic: string;
    vote: 'for' | 'against' | 'abstain';
    date: string;
  }>;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'decision' | 'reaction' | 'document' | 'meeting';
  documents?: Array<{
    name: string;
    url: string;
  }>;
}
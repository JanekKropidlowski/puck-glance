// localStorage utility functions
export const storage = {
  get: <T>(key: string): T[] => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  set: <T>(key: string, data: T[]): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  add: <T extends { id: string }>(key: string, item: T): void => {
    const items = storage.get<T>(key);
    items.push(item);
    storage.set(key, items);
  },

  update: <T extends { id: string }>(key: string, id: string, updates: Partial<T>): void => {
    const items = storage.get<T>(key);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      storage.set(key, items);
    }
  },

  remove: <T extends { id: string }>(key: string, id: string): void => {
    const items = storage.get<T>(key);
    const filtered = items.filter(item => item.id !== id);
    storage.set(key, filtered);
  }
};

// Storage keys
export const STORAGE_KEYS = {
  CITIZEN_REPORTS: 'citizenReports',
  PUBLIC_REQUESTS: 'publicRequests',
  FACT_CHECKS: 'factChecks',
  PROMISES: 'promises',
  OPINIONS: 'opinions',
  POLLS: 'polls',
  FACEBOOK_ARCHIVE: 'facebookArchive',
  BUDGET_ITEMS: 'budgetItems',
  OFFICIALS: 'officials',
  TIMELINE_EVENTS: 'timelineEvents'
} as const;
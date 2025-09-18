export const getStoredData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error);
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage for key "${key}":`, error);
  }
};

// Initialize default CMS users if they don't exist
export const initializeDefaultUsers = () => {
  const existingUsers = getStoredData('cms_users', []);
  
  if (existingUsers.length === 0) {
    const defaultUsers = [
      {
        id: '1',
        name: 'Administrator',
        email: 'admin@gmina-puck.pl',
        role: 'admin' as const,
        bio: 'Administrator systemu',
        position: 'Administrator CMS',
        permissions: [
          { id: '1', action: 'create_article', resource: 'articles' },
          { id: '2', action: 'edit_article', resource: 'articles' },
          { id: '3', action: 'delete_article', resource: 'articles' },
          { id: '4', action: 'moderate_comments', resource: 'comments' },
          { id: '5', action: 'manage_users', resource: 'users' },
          { id: '6', action: 'manage_reports', resource: 'reports' },
          { id: '7', action: 'manage_categories', resource: 'categories' },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Redaktor',
        email: 'redaktor@gmina-puck.pl',
        role: 'editor' as const,
        bio: 'Redaktor treści',
        position: 'Redaktor',
        permissions: [
          { id: '1', action: 'create_article', resource: 'articles' },
          { id: '2', action: 'edit_article', resource: 'articles' },
          { id: '4', action: 'moderate_comments', resource: 'comments' },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Moderator',
        email: 'moderator@gmina-puck.pl',
        role: 'moderator' as const,
        bio: 'Moderator zgłoszeń',
        position: 'Moderator',
        permissions: [
          { id: '4', action: 'moderate_comments', resource: 'comments' },
          { id: '6', action: 'manage_reports', resource: 'reports' },
        ],
        createdAt: new Date().toISOString(),
      },
    ];
    
    saveToStorage('cms_users', defaultUsers);
  }
};

// Legacy storage utility (keeping for compatibility with existing modules)
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
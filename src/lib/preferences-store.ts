// Simple in-memory storage for user preferences
// In a real app, this would be replaced with database storage

interface UserPreferences {
  id: string;
  userId: string;
  groceryApps: string[];
  foodApps: string[];
  preferredCuisines: string[];
  usualMealTimes: any;
  ecommerceSites: string[];
  favoriteBrands: string[];
  flightBookingSites: string[];
  flightPreferences: any;
  cabServices: string[];
  homeLocation: string;
  workLocation: string;
  paymentMethods: string[];
  calendarApp: string;
  workingHours: any;
  aiPersonality: string;
  responseLength: string;
  budgetLevel: string;
  createdAt: Date;
  updatedAt: Date;
}

// Persistent storage using localStorage
export const preferencesStorage = {
  // Save preferences for a user
  save: (userId: string, preferences: Partial<UserPreferences>) => {
    const existing = preferencesStorage.get(userId);
    const newPreferences: UserPreferences = {
      id: existing?.id || `pref-${Date.now()}`,
      userId,
      groceryApps: [],
      foodApps: [],
      preferredCuisines: [],
      usualMealTimes: {},
      ecommerceSites: [],
      favoriteBrands: [],
      flightBookingSites: [],
      flightPreferences: {},
      cabServices: [],
      homeLocation: '',
      workLocation: '',
      paymentMethods: [],
      calendarApp: '',
      workingHours: {},
      aiPersonality: 'FRIENDLY',
      responseLength: 'DETAILED',
      budgetLevel: 'MEDIUM',
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date(),
      ...preferences
    };
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const allPreferences = JSON.parse(localStorage.getItem('rajni-preferences') || '{}');
      allPreferences[userId] = newPreferences;
      localStorage.setItem('rajni-preferences', JSON.stringify(allPreferences));
    }
    
    return newPreferences;
  },

  // Get preferences for a user
  get: (userId: string): UserPreferences | null => {
    if (typeof window !== 'undefined') {
      const allPreferences = JSON.parse(localStorage.getItem('rajni-preferences') || '{}');
      return allPreferences[userId] || null;
    }
    return null;
  },

  // Check if user has preferences
  has: (userId: string): boolean => {
    if (typeof window !== 'undefined') {
      const allPreferences = JSON.parse(localStorage.getItem('rajni-preferences') || '{}');
      return !!allPreferences[userId];
    }
    return false;
  }
}; 
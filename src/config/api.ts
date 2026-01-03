// API configuration
// Uses EXPO_PUBLIC_API_URL from .env file
// Fallback to localhost for development if env var not set
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 
  (__DEV__ ? 'http://localhost:3000' : 'https://your-production-api.com');

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  ARTICLES: {
    LIST: '/articles',
    LATEST: '/articles/latest',
    BY_STOCK: (symbol: string) => `/articles/stock/${symbol}`,
    BY_SECTOR: (sector: string) => `/articles/sector/${sector}`,
  },
  INSIGHTS: {
    LIST: '/insights',
    ARTICLE_INSIGHTS: '/insights/article-insights',
    AGGREGATE: '/insights/aggregate',
  },
  PROFILE: '/profile',
  USER_INTERESTS: '/user/interests',
};


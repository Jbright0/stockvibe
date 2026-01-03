import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Article {
  id: string;
  headline: string;
  source: string;
  url: string;
  publishedAt: string;
  content: string;
  createdAt: string;
}

export interface ArticlesResponse {
  articles: Article[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export const articlesService = {
  async getArticles(params?: {
    source?: string;
    limit?: number;
    offset?: number;
  }): Promise<ArticlesResponse> {
    const response = await apiClient.get<ArticlesResponse>(
      API_ENDPOINTS.ARTICLES.LIST,
      { params }
    );
    return response.data;
  },

  async getLatest(): Promise<{ articles: Article[]; count: number; source: string }> {
    const response = await apiClient.get(API_ENDPOINTS.ARTICLES.LATEST);
    return response.data;
  },

  async getByStock(symbol: string): Promise<{ articles: Article[]; count: number; symbol: string; source: string }> {
    const response = await apiClient.get(API_ENDPOINTS.ARTICLES.BY_STOCK(symbol));
    return response.data;
  },

  async getBySector(sector: string): Promise<{ articles: Article[]; count: number; sector: string; source: string }> {
    const response = await apiClient.get(API_ENDPOINTS.ARTICLES.BY_SECTOR(sector));
    return response.data;
  },
};


import apiClient from './api';
import { API_ENDPOINTS } from '../config/api';

export interface Insight {
  id: string;
  articleId: string;
  summary: string;
  signal: 'POSITIVE' | 'MIXED' | 'RISK' | 'WATCHING';
  createdAt: string;
  article?: {
    id: string;
    headline: string;
    source: string;
    url: string;
    publishedAt: string;
  };
}

export interface InsightsResponse {
  insights: Insight[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export const insightsService = {
  async getInsights(params?: {
    signal?: string;
    articleId?: string;
    limit?: number;
    offset?: number;
  }): Promise<InsightsResponse> {
    const response = await apiClient.get<InsightsResponse>(
      API_ENDPOINTS.INSIGHTS.LIST,
      { params }
    );
    return response.data;
  },

  async getArticleInsights(params?: {
    entityType?: string;
    entityId?: string;
    tag?: string;
    limit?: number;
    offset?: number;
  }): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.INSIGHTS.ARTICLE_INSIGHTS, { params });
    return response.data;
  },

  async getAggregateInsights(params?: {
    entityType?: string;
    entityKey?: string;
    timeframe?: string;
  }): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.INSIGHTS.AGGREGATE, { params });
    return response.data;
  },
};


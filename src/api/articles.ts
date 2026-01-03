// Articles API functions using the simple fetch client
import { apiGet } from './client';
import { ArticleDTO, StockHistoryResponse, SectorHistoryResponse } from '../types/api';
import { adaptStockHistory, adaptSectorHistory, adaptArticle } from './adapters';

// Backend response types (before adaptation)
interface BackendStockResponse {
  articles: any[];
  symbol: string;
  count: number;
  source: string;
}

interface BackendSectorResponse {
  articles: any[];
  sector: string;
  count: number;
  source: string;
}

interface BackendLatestResponse {
  articles: any[];
  count: number;
  source: string;
}

export const articlesApi = {
  async getStockHistory(symbol: string, stockName?: string): Promise<StockHistoryResponse> {
    const response = await apiGet<BackendStockResponse>(`/articles/stock/${symbol}`);
    return adaptStockHistory(response, stockName);
  },

  async getSectorHistory(sector: string): Promise<SectorHistoryResponse> {
    const response = await apiGet<BackendSectorResponse>(`/articles/sector/${sector}`);
    return adaptSectorHistory(response);
  },

  async getLatest(): Promise<ArticleDTO[]> {
    const response = await apiGet<BackendLatestResponse>('/articles/latest');
    return response.articles.map(adaptArticle);
  },
};


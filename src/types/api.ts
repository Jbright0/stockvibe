// API DTOs - Single source of truth for API contracts
// Backend guarantees these shapes, frontend builds UI around them

export type ArticleDTO = {
  id: string;
  title: string; // Maps to 'headline' from backend
  summary: string;
  content?: string;
  source: string;
  publishedAt: string;
  readTime: number; // Calculated on frontend or backend
  stockSymbols?: string[];
  sector?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
};

export type StockHistoryResponse = {
  stock: {
    symbol: string;
    name: string;
    sector: string;
    status: 'opportunity' | 'risk' | 'neutral';
  };
  articles: ArticleDTO[];
};

export type SectorHistoryResponse = {
  sector: {
    name: string;
    status: 'opportunity' | 'risk' | 'neutral';
  };
  articles: ArticleDTO[];
};


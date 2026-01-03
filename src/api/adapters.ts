// Adapter functions to transform backend responses to frontend DTOs
import { ArticleDTO, StockHistoryResponse, SectorHistoryResponse } from '../types/api';

// Backend Article shape (from articles service)
interface BackendArticle {
  id: string;
  title: string;
  summary: string;
  url?: string;
  source: string;
  publishedAt: string | Date;
  symbols?: string[];
  sectors?: string[];
  sentiment?: number; // -1 to +1
  imageUrl?: string;
}

// Calculate read time from content (rough estimate: 200 words per minute)
function calculateReadTime(content?: string): number {
  if (!content) return 2; // Default 2 minutes
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Map sentiment number to string
function mapSentiment(sentiment?: number): 'positive' | 'neutral' | 'negative' {
  if (sentiment === undefined || sentiment === null) return 'neutral';
  if (sentiment > 0.1) return 'positive';
  if (sentiment < -0.1) return 'negative';
  return 'neutral';
}

// Transform backend article to ArticleDTO
export function adaptArticle(article: BackendArticle): ArticleDTO {
  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    source: article.source,
    publishedAt: typeof article.publishedAt === 'string' 
      ? article.publishedAt 
      : article.publishedAt.toISOString(),
    readTime: calculateReadTime(article.summary),
    stockSymbols: article.symbols,
    sector: article.sectors?.[0], // Take first sector
    sentiment: mapSentiment(article.sentiment),
  };
}

// Transform backend stock articles response to StockHistoryResponse
export function adaptStockHistory(
  backendResponse: { articles: BackendArticle[]; symbol: string; count: number; source: string },
  stockName?: string
): StockHistoryResponse {
  return {
    stock: {
      symbol: backendResponse.symbol,
      name: stockName || `${backendResponse.symbol} Corporation`,
      sector: backendResponse.articles[0]?.sectors?.[0] || 'Technology',
      status: 'neutral', // Default, could be enhanced with aggregate sentiment
    },
    articles: backendResponse.articles.map(adaptArticle),
  };
}

// Transform backend sector articles response to SectorHistoryResponse
export function adaptSectorHistory(
  backendResponse: { articles: BackendArticle[]; sector: string; count: number; source: string }
): SectorHistoryResponse {
  return {
    sector: {
      name: backendResponse.sector,
      status: 'neutral', // Default, could be enhanced with aggregate sentiment
    },
    articles: backendResponse.articles.map(adaptArticle),
  };
}


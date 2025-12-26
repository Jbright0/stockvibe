// Mock data for the application
// Consolidates various mock data sources

export interface NewsItem {
  title: string;
  summary: string;
  stock: string;
  sector: string;
  tag: string;
  source: string;
  time: string;
}

export const news = [
  {
    id: '1',
    title: 'ASML Q3 Earnings Miss Expectations',
    summary: 'Semiconductor demand slows amid macro uncertainty.',
    stock: 'ASML',
    sector: 'Semiconductors',
    type: 'Impact',
    source: 'Reuters',
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Apple Supply Chain Shifts to India',
    summary: 'AAPL expands diversification strategy.',
    stock: 'AAPL',
    sector: 'Technology',
    type: 'Opportunity',
    source: 'Bloomberg',
    time: '5h ago',
  },
];

export const newsData: NewsItem[] = [
  {
    title: 'Supply chain constraints easing in Southeast Asia region',
    summary: 'Manufacturing output has increased by 15% month-over-month. This signals potential margin improvements for hardware sectors relying on this corridor.',
    stock: 'SAAPL',
    sector: 'Technology',
    tag: 'Risk',
    source: 'Bloomberg',
    time: '2h ago',
  },
  {
    title: 'Federal Reserve signals pause in interest rate hikes',
    summary: 'Minutes from the latest meeting suggest a consensus on maintaining current rates to observe inflation trends, impacting banking sector margins favorably.',
    stock: 'SJPM',
    sector: 'Finance',
    tag: 'Opportunity',
    source: 'WSJ',
    time: '4h ago',
  },
  {
    title: 'EV market consolidation expected in Q4',
    summary: 'Smaller players face liquidity challenges as capital costs rise. Market share likely to shift towards established manufacturers with strong balance sheets.',
    stock: 'STSLA',
    sector: 'Automotive',
    tag: 'Neutral',
    source: 'Reuters',
    time: '6h ago',
  },
  {
    title: 'Geopolitical tensions rise in key production zones',
    summary: 'Unexpected disruptions in the Strait have led to a temporary spike in futures. Long-term supply contracts remain unaffected for now.',
    stock: 'SOIL',
    sector: 'Energy',
    tag: 'Risk',
    source: 'CNBC',
    time: '8h ago',
  },
];

export const STOCKS = ['AAPL', 'MSFT', 'TSLA', 'NVDA'];
export const SECTORS = ['Technology', 'Energy', 'Finance', 'Healthcare'];

// News items with the new shape for interest filtering
export interface NewsItemShape {
  id: string;
  headline: string;
  stock: string;
  sector: string;
}

// ALL_NEWS array for filtering by interests
export const ALL_NEWS: NewsItemShape[] = [
  {
    id: '1',
    headline: 'Supply chain constraints easing in Southeast Asia region',
    stock: 'SAAPL',
    sector: 'Technology',
  },
  {
    id: '2',
    headline: 'Federal Reserve signals pause in interest rate hikes',
    stock: 'SJPM',
    sector: 'Finance',
  },
  {
    id: '3',
    headline: 'EV market consolidation expected in Q4',
    stock: 'STSLA',
    sector: 'Automotive',
  },
  {
    id: '4',
    headline: 'Geopolitical tensions rise in key production zones',
    stock: 'SOIL',
    sector: 'Energy',
  },
  {
    id: '5',
    headline: 'Microsoft Cloud Revenue Surges',
    stock: 'MSFT',
    sector: 'Technology',
  },
  {
    id: '6',
    headline: 'Tesla Production Targets Revised',
    stock: 'TSLA',
    sector: 'Technology',
  },
  {
    id: '7',
    headline: 'NVIDIA AI Chip Demand Soars',
    stock: 'NVDA',
    sector: 'Technology',
  },
];

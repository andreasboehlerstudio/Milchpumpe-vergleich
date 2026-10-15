export * from './product-data';
import index from './guide-summary-data.json';

export type GuideSummary = { slug: string; title: string; description: string; published?: string; updated?: string; category?: string; image?: string };

// Lightweight projections; exact parity with the authoritative articles is tested.
export const GUIDE_ARTICLES: GuideSummary[] = index.summaries;
export const GUIDE_LINKS = index.links;

import { BUYING_GUIDES } from './buying-guides';
import type { BuyingGuide } from './buying-guides';
import { NICHE_GUIDES_A } from './niche-guides-a';
import { NICHE_GUIDES_B } from './niche-guides-b';

export const EDITORIAL_GUIDES: BuyingGuide[] = [...BUYING_GUIDES, ...NICHE_GUIDES_A, ...NICHE_GUIDES_B];

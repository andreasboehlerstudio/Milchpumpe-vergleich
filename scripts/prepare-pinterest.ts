import { writeFileSync, mkdirSync } from 'node:fs';
import { EDITORIAL_GUIDES } from '../src/guides';
import { GUIDE_DECISIONS, GUIDE_SEARCH_TITLES } from '../src/search-intents';
import { SITE_URL } from '../src/data';
import { PRODUCT_CATALOGUE } from '../src/product-catalogue';
import { MILK_GUIDES } from '../src/milk-articles';
import { PROBLEM_PRODUCT_FOCUS } from '../src/problem-product-focus';
const ALL_GUIDES=[...EDITORIAL_GUIDES,...MILK_GUIDES];

mkdirSync('docs', { recursive: true });
const content = ALL_GUIDES.map(guide => {
  const decision = GUIDE_DECISIONS[guide.slug];
  const product = PRODUCT_CATALOGUE.find(p => p.id === (PROBLEM_PRODUCT_FOCUS[guide.slug]?.productId || decision?.primaryProductId || guide.productIds[0]))!;
  return { slug: guide.slug, title: GUIDE_SEARCH_TITLES[guide.slug] || guide.title, description: guide.description, category: guide.category, productIds: guide.productIds, primaryProductId: product.id, question: decision?.question || guide.faqs[0].question, checks: decision?.rows.map(row => row[0]) || guide.sections.flatMap(s=>s.bullets || []).slice(0,3), offerNote: decision?.offerNote || 'Modellsuche; Variante und Lieferumfang kontrollieren.', sources: guide.sources, pinTitle: guide.pinTitle, pinDescription: guide.pinDescription };
});
writeFileSync('docs/content-map.json', JSON.stringify(content, null, 2) + '\n');
const quote = (s: string) => '"' + s.replaceAll('"', '""') + '"';
const columns = ['slug', 'title', 'description', 'destination', 'image', 'product', 'status'];
const rows = ALL_GUIDES.map(guide => [guide.slug, guide.pinTitle, guide.pinDescription + (guide.pinDescription.includes('Affiliate') ? '' : ' Der Artikel enthält Affiliate-Links.'), `${SITE_URL}/ratgeber/${guide.slug}/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=modellfragen&utm_content=${guide.slug}`, `${SITE_URL}/editorial/${guide.slug}-pin.png`, PROBLEM_PRODUCT_FOCUS[guide.slug]?.productId || GUIDE_DECISIONS[guide.slug]?.primaryProductId || guide.productIds[0], 'Entwurf – nicht veröffentlicht']);
writeFileSync('docs/pinterest-plan.csv', '\uFEFF' + [columns, ...rows].map(row => row.map(quote).join(';')).join('\n') + '\n');
console.log(JSON.stringify({ articles: content.length, pinterestDrafts: rows.length, distinctIntents: new Set(content.map(c => c.question)).size, products: new Set(content.flatMap(c => c.productIds)).size }));

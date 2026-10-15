import { mkdirSync, writeFileSync } from 'node:fs';
import { PRODUCT_CATALOGUE, ADDITIONAL_PRODUCTS } from '../src/product-catalogue';

mkdirSync('docs', { recursive: true });
const inventory = {
  generatedAt: new Date().toISOString(),
  totalProducts: PRODUCT_CATALOGUE.length,
  additionalProducts: ADDITIONAL_PRODUCTS.length,
  distinctIds: new Set(PRODUCT_CATALOGUE.map(p => p.id)).size,
  distinctSourceUrls: new Set(PRODUCT_CATALOGUE.map(p => p.sourceUrl)).size,
  categories: Object.fromEntries([...new Set(PRODUCT_CATALOGUE.map(p => p.category))].map(category => [category, PRODUCT_CATALOGUE.filter(p => p.category === category).length])),
  exactAmazonTargets: PRODUCT_CATALOGUE.filter(p => p.amazonAsin).length,
  modelSearchDestinations: PRODUCT_CATALOGUE.filter(p => !p.amazonAsin).length,
  permittedProductPhotos: PRODUCT_CATALOGUE.filter(p => p.imageRights.status === 'explicitly-permitted').length,
  evidenceLimits: 'New batch source records were researched by workers; parent validated registry schema, identities, route HTML and mobile category filtering. Model searches are not verified individual offers; tracking tags do not prove commission eligibility. No new product-photo licence or original file acquired.',
};
writeFileSync('docs/catalogue-inventory.json', JSON.stringify(inventory, null, 2) + '\n');
const quote = (s: string) => '"' + s.replaceAll('"', '""') + '"';
const rows = [['product_id','brand','name','source_url','rights_status','rights_evidence_url','rights_note','asset_acquired'], ...PRODUCT_CATALOGUE.map(p => [p.id,p.brand,p.name,p.sourceUrl,p.imageRights.status,p.imageRights.sourceUrl,p.imageRights.note,p.image ? 'Image record present; individual licence/file must be checked' : 'No product photo acquired'])];
writeFileSync('docs/image-rights-manifest.csv', '\uFEFF' + rows.map(row => row.map(quote).join(';')).join('\n') + '\n');
console.log(JSON.stringify(inventory));

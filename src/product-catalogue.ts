import pumps from './catalogue-pumps.json';
import storage from './catalogue-storage.json';
import cleaning from './catalogue-cleaning.json';
import care from './catalogue-care.json';
import guideExamples from './catalogue-guide-examples.json';
import { PRODUCTS } from './data';
import { fromPumpProducts, type CatalogueProduct } from './catalogue';

function readBatch(batch: unknown): CatalogueProduct[] {
  if (!Array.isArray(batch)) throw new Error('Product batch must be an array');
  for (const item of batch) {
    if (!item || typeof item !== 'object') throw new Error('Invalid catalogue record');
    for (const field of ['id','brand','name','category','summary','useCase','sourceUrl','sourceLabel','checkedAt','evidenceQuote','amazonQuery']) {
      if (typeof item[field] !== 'string' || !item[field]) throw new Error(`Missing ${field} in ${item.id}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) throw new Error(`Invalid ID: ${item.id}`);
    if (!/^https:\/\//.test(item.sourceUrl)) throw new Error(`Invalid primary source: ${item.id}`);
    for (const field of ['facts','limitations','tips']) if (!Array.isArray(item[field]) || !item[field].length || !item[field].every((s: unknown) => typeof s === 'string' && s.length > 0)) throw new Error(`Invalid ${field}: ${item.id}`);
    if (item.modelCode !== null && typeof item.modelCode !== 'string') throw new Error(`Invalid model code: ${item.id}`);
    if (!['not-cleared','explicitly-permitted'].includes(item.imageRights?.status)) throw new Error(`No image-rights state: ${item.id}`);
  }
  return batch as CatalogueProduct[];
}

export const ADDITIONAL_PRODUCTS = [...readBatch(pumps), ...readBatch(storage), ...readBatch(cleaning), ...readBatch(care), ...readBatch(guideExamples)];
export const PRODUCT_CATALOGUE: CatalogueProduct[] = [...fromPumpProducts(PRODUCTS), ...ADDITIONAL_PRODUCTS];
const ids = new Set(PRODUCT_CATALOGUE.map(p => p.id));
const identities = new Set(PRODUCT_CATALOGUE.map(p => `${p.brand.toLocaleLowerCase('de')}|${p.name.toLocaleLowerCase('de')}`));
if (ids.size !== PRODUCT_CATALOGUE.length || identities.size !== PRODUCT_CATALOGUE.length) throw new Error('Duplicate product identity in catalogue');

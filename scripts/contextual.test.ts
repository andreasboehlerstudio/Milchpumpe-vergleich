import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EDITORIAL_GUIDES } from '../src/guides';

test('contextual linking excludes unrelated models and prefers narrower product intent', async () => {
  const modulePath = '../src/contextual-links';
  const links = await import(modulePath).catch(() => null);
  assert.ok(links, 'Missing product-specific contextual linking');
  const productGuides = links.guidesForProduct('momcozy-m9', EDITORIAL_GUIDES);
  assert.ok(productGuides.length > 0);
  assert.ok(productGuides.every((g: {productIds:string[]}) => g.productIds.includes('momcozy-m9')));
  const current = EDITORIAL_GUIDES.find(g => g.slug === 'momcozy-m9-oder-s12-pro')!;
  const related = links.relatedGuides(current, EDITORIAL_GUIDES);
  assert.ok(!related.some((g:{slug:string}) => g.slug === current.slug));
  assert.ok(related.every((g: {productIds:string[]}) => g.productIds.some(id => current.productIds.includes(id))));
  assert.ok(!related.some((g:{slug:string}) => g.slug === 'medela-freestyle-oder-philips-avent'));
});

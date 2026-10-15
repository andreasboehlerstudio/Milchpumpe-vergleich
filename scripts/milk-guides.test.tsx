import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { getStructuredData } from '../src/seo';
import { PRODUCT_CATALOGUE } from '../src/product-catalogue';
import plan from '../docs/longtail-intent-plan.json';

test('milk guides resolve real catalogue products and expose complete sourced article routes', async () => {
  const mod = await import('../src/milk-articles').catch(() => null);
  assert.ok(mod, 'Milk-guide route integration missing');
  assert.equal(mod.MILK_GUIDES.length, 8 + plan.newArticleIntents.length);
  for (const guide of mod.MILK_GUIDES) {
    const newIntent = plan.newArticleIntents.find(item => item.slug === guide.slug);
    if (newIntent) assert.deepEqual(guide.productIds, [newIntent.primaryProductId]);
    else assert.ok(guide.productIds.length >= 2);
    assert.ok(guide.productIds.every(id => PRODUCT_CATALOGUE.some(p => p.id === id)), guide.slug);
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
    assert.ok(html.includes('id="milch-alltag-artikel"'), guide.slug);
    assert.ok(html.includes('andreasboeh09-21'), guide.slug);
    assert.ok(html.includes('Quellen') && html.includes('Affiliate-Link'), guide.slug);
    assert.ok(!html.includes('SCF618/10'), 'Discontinued buy-example must not be silently promoted');
    assert.ok(!html.includes('SCY903/01'), 'US-only variant must not silently replace the selected German model');
    const article = getStructuredData(`/ratgeber/${guide.slug}/`)['@graph'].find(x => x['@type'] === 'Article') as any;
    assert.equal(article?.about.length, guide.productIds.length);
    assert.ok(article.citation.length >= 2);
  }
});

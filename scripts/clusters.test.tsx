import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { EditorialGuideHub } from '../src/editorial';
import { PRODUCTS } from '../src/data';
import { EDITORIAL_GUIDES } from '../src/guides';

test('model clusters expose all twenty articles as relevant crawlable pathways without extra thin landing pages', () => {
  const html = renderToStaticMarkup(<EditorialGuideHub />);
  assert.ok(html.includes('id="modellfragen"'), 'Model-specific navigation is missing');
  for (const product of PRODUCTS) {
    const block = html.match(new RegExp(`<section[^>]*id="cluster-${product.id}"[\\s\\S]*?</section>`))?.[0];
    assert.ok(block, product.id);
    const relevant = EDITORIAL_GUIDES.filter(g => g.productIds.includes(product.id));
    for (const guide of relevant) assert.ok(block.includes(`/ratgeber/${guide.slug}/`), `${product.id}/${guide.slug}`);
    const count = [...block.matchAll(/href="\/ratgeber\/([^/]+)\//g)].length;
    assert.equal(count, relevant.length);
  }
});

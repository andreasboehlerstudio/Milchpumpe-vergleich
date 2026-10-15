import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PROBLEM_PRODUCT_FOCUS } from '../src/problem-product-focus';

// Read the actual generator output; source and distribution must agree.
test('Pinterest content planning uses the same single product focus as the visible problem article', () => {
  const content = JSON.parse(fs.readFileSync('docs/content-map.json', 'utf8'));
  const csv = fs.readFileSync('docs/pinterest-plan.csv', 'utf8');
  for (const [slug, focus] of Object.entries(PROBLEM_PRODUCT_FOCUS)) {
    const article = content.find((item: any) => item.slug === slug);
    assert.ok(article, slug);
    assert.equal(article.primaryProductId, focus.productId, slug);
    const row = csv.split('\n').find(line => line.startsWith(`"${slug}";`));
    assert.ok(row?.includes(`"${focus.productId}";`), slug);
    assert.ok(row?.includes(`https://milchpumpe-vergleich.de/ratgeber/${slug}/?utm_source=pinterest`), slug);
    assert.ok(row?.includes('Affiliate'), slug);
  }
});

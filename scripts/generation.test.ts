import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../src/data';

test('legacy S12 Pro does not silently use Quick specifications or a redirected source', () => {
  const product = PRODUCTS.find(p => p.id === 'momcozy-s12-pro')!;
  assert.ok(product.sourceUrl.includes('s12-pro-quick-setup-pumping-cleaning'));
  assert.ok(product.limitations.some(s => s.includes('S12 Pro Quick')));
  assert.ok(!product.facts.some(s => s.includes('45 dB')));
  assert.equal(product.amazonAsin, undefined);
});

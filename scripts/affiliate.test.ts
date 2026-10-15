import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, amazonUrl } from '../src/data';

test('every product link uses the user-confirmed affiliate ID', () => {
  for (const product of PRODUCTS) {
    assert.equal(new URL(amazonUrl(product)).searchParams.get('tag'), 'andreasboeh09-21', product.id);
  }
});

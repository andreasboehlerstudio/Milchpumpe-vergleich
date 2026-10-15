import { test } from 'node:test';
import assert from 'node:assert/strict';

test('finder maps transparent preferences to factual features without medical ranking', async () => {
  const modulePath = '../src/finder';
  const finder = await import(modulePath).catch(() => null);
  assert.ok(finder, 'Preference filter is not implemented yet');
  const { findProducts } = finder;
  const { PRODUCTS } = await import('../src/data');
  assert.deepEqual(findProducts(PRODUCTS, { app: 'yes', motor: 'integrated', set: 'double' }).map(p => p.id), ['momcozy-m9']);
  assert.deepEqual(findProducts(PRODUCTS, { app: 'no', motor: 'separate', set: 'double' }).map(p => p.id), ['philips-avent-scf547']);
  assert.equal(findProducts(PRODUCTS, { app: 'yes', motor: 'separate', set: 'single' }).length, 0);
  assert.equal(findProducts(PRODUCTS, { app: 'any', motor: 'any', set: 'any' }).length, PRODUCTS.length);
  assert.equal(PRODUCTS.length, 6);
});

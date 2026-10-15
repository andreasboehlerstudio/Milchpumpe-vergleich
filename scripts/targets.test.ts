import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, amazonUrl } from '../src/data';

test('verified exact models link directly and uncertain generations stay searches', () => {
  const expected = new Map([['momcozy-m9', 'B0GX538F1R'], ['medela-freestyle', 'B0BKGFBKHJ'], ['philips-avent-scf547', 'B0DWTCG66J'], ['haakaa-gen3', 'B087DJSB8T']]);
  for (const p of PRODUCTS) {
    const url = new URL(amazonUrl(p));
    assert.equal(url.searchParams.get('tag'), 'andreasboeh09-21');
    const asin = expected.get(p.id);
    if (asin) assert.equal(url.pathname, `/dp/${asin}`);
    else assert.equal(url.pathname, '/s');
  }
  assert.throws(() => amazonUrl({ ...PRODUCTS[0], amazonAsin: ' B0GX538F1R' }), /ASIN/);
});

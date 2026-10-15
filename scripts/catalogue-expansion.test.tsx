import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { getRouteSeo } from '../src/seo';

test('at least fifty distinct real products are available on a crawlable sourced catalogue route', async () => {
  const module = await import('../src/product-catalogue').catch(() => null);
  assert.ok(module, 'Fifty-product registry is missing');
  const products = module.PRODUCT_CATALOGUE;
  assert.ok(products.length >= 50, `${products.length} products`);
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  assert.equal(new Set(products.map(p => `${p.brand.toLowerCase()}|${p.name.toLowerCase()}`)).size, products.length);
  assert.equal(new Set(products.map(p => p.category)).size, 4);
  const html = renderToStaticMarkup(<App initialPath="/produkte/" />);
  assert.equal(getRouteSeo('/produkte/').path, '/produkte/');
  assert.ok(!getRouteSeo('/produkte/').noindex);
  assert.equal([...html.matchAll(/class="practical-product"/g)].length, products.length);
  for (const product of products) {
    assert.ok(html.includes(`id="produkt-${product.id}"`), product.id);
    assert.ok(html.includes(product.sourceUrl.replaceAll('&', '&amp;')), product.id);
    assert.ok(product.facts.length >= 2 && product.limitations.length >= 1 && product.tips.length >= 2, product.id);
    if (!['momcozy-m9','momcozy-s12-pro','medela-freestyle','philips-avent-scf547','elvie-pump-single','haakaa-gen3'].includes(product.id)) assert.ok(product.evidenceQuote.length > 0, product.id);
  }
});

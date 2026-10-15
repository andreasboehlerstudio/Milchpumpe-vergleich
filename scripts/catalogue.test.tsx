import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { PRODUCTS } from '../src/data';

test('practical product cards separate usefulness from affiliate advertising and unlicensed photos', async () => {
  const mod = await import('../src/catalogue').catch(() => null);
  assert.ok(mod, 'Generic researched catalogue is not implemented');
  const examples = mod.fromPumpProducts(PRODUCTS);
  assert.equal(examples.length, PRODUCTS.length);
  const html = renderToStaticMarkup(<mod.CatalogueCard product={examples[0]} />);
  assert.ok(html.includes('Wann es sinnvoll sein kann'));
  assert.ok(html.includes('Vor dem Kauf prüfen'));
  assert.ok(html.includes('Werbung / Affiliate-Link'));
  assert.ok(html.includes('sponsored'));
  assert.ok(html.includes('andreasboeh09-21'));
  assert.ok(!html.includes('getestet von'));
  assert.ok(!html.includes('<img'), 'Uncleared product photos must not be silently embedded');
});

test('new accessory entries do not create dozens of thin product-detail pages', async () => {
  const mod = await import('../src/catalogue');
  const example = { ...mod.fromPumpProducts(PRODUCTS)[0], id: 'fixture-new-accessory' };
  const html = renderToStaticMarkup(<mod.CatalogueCard product={example} />);
  assert.ok(html.includes('href="/produkte/#produkt-fixture-new-accessory"'), 'Use the factual catalogue anchor until a substantial dedicated page exists');
  assert.ok(html.includes(example.sourceUrl));
  assert.ok(html.includes('Herstellerquelle'));
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { AffiliateLink } from '../src/components';
import { PRODUCTS } from '../src/data';

test('Amazon search destinations are labeled as model searches, not exact offers', () => {
  const html = renderToStaticMarkup(<AffiliateLink product={PRODUCTS.find(p => p.id === 'elvie-pump-single')!} />);
  assert.ok(html.includes('Modelle bei Amazon ansehen*'));
  assert.ok(html.includes('rel="noopener sponsored"'));
});

test('product editorial provides a citable short answer, named author and factual table', () => {
  const html = renderToStaticMarkup(<App initialPath="/produkte/momcozy-m9/" />);
  assert.ok(html.includes('Kurz eingeordnet'));
  assert.ok(html.includes('href="/ueber-uns/"'));
  assert.ok(html.includes('Redaktion:'));
  assert.ok(html.includes('Dokumentierte Produktmerkmale'));
  assert.ok(html.includes('href="/ratgeber/'));
});

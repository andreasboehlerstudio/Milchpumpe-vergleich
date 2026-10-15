import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { BUYING_GUIDES } from '../src/buying-guides';
import { GUIDE_ARTICLES, PRODUCTS } from '../src/data';

test('six current researched articles preserve sources, product IDs and useful depth', () => {
  assert.equal(BUYING_GUIDES.length, 6);
  for (const guide of BUYING_GUIDES) {
    const words = guide.sections.flatMap(s => [...s.paragraphs, ...(s.bullets || [])]).join(' ').split(/\s+/).length;
    assert.ok(words >= 550, `${guide.slug}: ${words} words`);
    assert.ok(guide.productIds.length > 0);
    assert.ok(guide.productIds.every(id => PRODUCTS.some(p => p.id === id)));
    assert.ok(guide.sources.length > 0);
    for (const section of guide.sections) {
      assert.ok(section.sourceIndexes?.length, `No sources in ${guide.slug}/${section.id}`);
      assert.ok(section.sourceIndexes.every(i => i >= 0 && i < guide.sources.length));
    }
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
    assert.ok(html.includes('andreasboeh09-21'));
    assert.ok(html.includes('Kurzantwort'));
    assert.ok(html.includes('Inhaltsverzeichnis'));
  }
});

test('expanded library includes at least twenty new product-related articles plus the three existing guides', () => {
  assert.ok(GUIDE_ARTICLES.length >= 23, `Currently ${GUIDE_ARTICLES.length}, need at least 23`);
  assert.equal(new Set(GUIDE_ARTICLES.map(g => g.slug)).size, GUIDE_ARTICLES.length);
});

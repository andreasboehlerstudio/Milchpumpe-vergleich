import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { ROUTES, getStructuredData } from '../src/seo';
import App from '../src/App';
import { PRODUCTS, SITE_URL } from '../src/data';

test('each route has a stable page identity linked to the website, publisher and exact content entity', () => {
  for (const route of ROUTES) {
    const graph = getStructuredData(route.path)['@graph'];
    const page = graph.find(node => node['@id'] === `${SITE_URL}${route.path}#webpage`);
    assert.ok(page, `Missing stable WebPage identity on ${route.path}`);
    assert.equal((page.isPartOf as Record<string,unknown>)['@id'], `${SITE_URL}/#website`);
    assert.equal((page.publisher as Record<string,unknown>)['@id'], `${SITE_URL}/#publisher`);
    if (route.path.startsWith('/produkte/') && route.path !== '/produkte/') {
      assert.equal((page.mainEntity as Record<string,unknown>)['@id'], `${SITE_URL}${route.path}#subject`);
    }
    if (route.path.startsWith('/ratgeber/') && route.path !== '/ratgeber/') {
      assert.equal((page.mainEntity as Record<string,unknown>)['@id'], `${SITE_URL}${route.path}#article`);
      assert.ok(graph.some(node => node['@id'] === `${SITE_URL}${route.path}#article` && node['@type'] === 'Article'));
    }
    const ids = graph.map(node => node['@id']).filter(Boolean);
    assert.equal(ids.length, new Set(ids).size, `Duplicate graph entity ${route.path}`);
  }
});

test('large product visuals explain the architecture instead of filling the hero with initials', () => {
  for (const product of PRODUCTS) {
    const window = new Window();
    window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={`/produkte/${product.id}/`} />);
    const visual = window.document.querySelector('.product-hero .product-visual');
    assert.ok(visual?.querySelector('svg[data-pump-architecture]'), product.id);
    assert.ok(visual?.textContent?.includes('Bauart-Schema'));
    assert.equal(visual?.querySelector('.product-monogram'), null);
  }
});

test('brand link accessible names include all visible label text', () => {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(<App initialPath="/" />);
  for (const id of ['header-brand', 'footer-brand']) {
    const brand = window.document.getElementById(id)!;
    const visible = Array.from(brand.querySelector('span')!.childNodes).map(node => node.textContent).join(' ').replace(/\s+/g, ' ').trim();
    assert.equal(brand.getAttribute('aria-label'), null, 'Use the complete visible brand text as its accessible name');
    const accessible = visible;
    for (const word of visible.split(' ').filter(Boolean)) assert.ok(accessible.includes(word), `${id}: ${word}`);
  }
});

test('product hero visibly states selected set and source date before the purchase action', () => {
  for (const product of PRODUCTS) {
    const window = new Window();
    window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={`/produkte/${product.id}/`} />);
    const hero = window.document.querySelector('.product-hero')!;
    const set = hero.querySelector('[data-selected-set]');
    const shop = hero.querySelector('a[rel*="sponsored"]');
    assert.ok(set, product.id);
    assert.ok(set.textContent?.includes(product.amazonVariant || product.set));
    assert.ok(hero.querySelector('time[datetime]'));
    assert.ok((set.compareDocumentPosition(shop!) & 4) !== 0, 'Set information must precede the buying action');
  }
});

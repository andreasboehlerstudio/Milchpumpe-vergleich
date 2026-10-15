import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GUIDE_ARTICLES, SITE_URL } from '../src/data';
import { getStructuredData, getRouteSeo } from '../src/seo';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import App from '../src/App';

test('actual guide and comparison routes render the approved native upgrade with matching heading metadata', () => {
  for (const [path, heading] of [['/ratgeber/', 'Weniger Sucherei. Mehr Alltag, der passt.'], ['/vergleich/', 'Was unterscheidet deine Auswahl?']]) {
    const window = new Window();
    window.document.body.innerHTML = renderToStaticMarkup(createElement(App, { initialPath: path }));
    assert.ok(window.document.querySelector('main.magazine-upgrade'), `${path}: native upgrade missing`);
    assert.equal(window.document.querySelectorAll('main').length, 1);
    assert.equal(window.document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(), heading);
    assert.equal(getRouteSeo(path).heading, heading);
    window.close();
  }
});
import { readFileSync } from 'node:fs';
import { Window } from 'happy-dom';

test('the new pages use positive reader guidance without internal production disclaimers', () => {
  for (const path of ['/ratgeber/', '/vergleich/']) {
    const html = renderToStaticMarkup(createElement(App, { initialPath: path }));
    assert.doesNotMatch(html, /wurden nicht vergleichend gemessen|keine aktuellen Produkt- oder Testfotos/);
    assert.match(html, /qualifizierte/);
    assert.match(html, /\/testmethodik\//);
  }
});

test('all 35 guide routes expose their actual record update date and never invent an unknown publication date', () => {
  for (const guide of GUIDE_ARTICLES) {
    const route = `/ratgeber/${guide.slug}/`;
    const window = new Window();
    window.document.body.innerHTML = renderToStaticMarkup(createElement(App, { initialPath: route }));
    assert.ok(guide.updated, `${guide.slug}: verified record update date missing`);
    const time = window.document.querySelector('article .article-byline time[datetime]');
    assert.equal(time?.getAttribute('datetime'), guide.updated, `${guide.slug}: visible date differs`);
    assert.ok(time?.textContent?.includes(new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${guide.updated}T00:00:00Z`))));
    const article = getStructuredData(route)['@graph'].find(item => item['@type'] === 'Article')!;
    assert.equal(article.dateModified, guide.updated);
    if (!guide.published) assert.ok(!('datePublished' in article), 'Unknown original publication must not inherit a global date');
    window.close();
  }
});

test('foundation article heroes are high priority while their inline illustrations stay lazy', () => {
  for (const slug of ['richtige-flanschgroesse', 'milchpumpe-reinigen']) {
    const window = new Window();
    window.document.body.innerHTML = renderToStaticMarkup(createElement(App, { initialPath: `/ratgeber/${slug}/` }));
    const hero = window.document.querySelector('.article-visual img');
    assert.equal(hero?.getAttribute('loading'), 'eager');
    assert.equal(hero?.getAttribute('fetchpriority'), 'high');
    const inlineImages = window.document.querySelectorAll('.article-inline-visual img');
    assert.equal(inlineImages.length, 2);
    for (const image of inlineImages) assert.equal(image.getAttribute('loading'), 'lazy');
    window.close();
  }
});

test('the shared document discovers the local primary font before loading styles', () => {
  const window = new Window();
  window.document.write(readFileSync(new URL('../index.html', import.meta.url), 'utf8'));
  const fonts = window.document.querySelectorAll('link[rel="preload"][as="font"]');
  assert.equal(fonts.length, 1, 'Preload only the main Latin subset, not unnecessary font variants');
  assert.equal(fonts[0].getAttribute('href'), '/fonts/manrope-latin.woff2');
  assert.equal(fonts[0].getAttribute('type'), 'font/woff2');
  assert.ok(fonts[0].hasAttribute('crossorigin'), 'Font preload must match anonymous CSS font fetching');
  window.close();
});

test('the full crawlable magazine library has matching CollectionPage and ItemList schema', () => {
  const graph = getStructuredData('/ratgeber/')['@graph'] as Record<string, any>[];
  const page = graph.find(item => item['@id'] === `${SITE_URL}/ratgeber/#webpage`);
  assert.equal(page?.['@type'], 'CollectionPage', 'The guide hub is a real editorial collection, not an untyped article');
  assert.deepEqual(page?.mainEntity, { '@id': `${SITE_URL}/ratgeber/#artikel` });
  const library = graph.find(item => item['@id'] === `${SITE_URL}/ratgeber/#artikel`);
  assert.equal(library?.['@type'], 'ItemList');
  assert.equal(library?.numberOfItems, GUIDE_ARTICLES.length);
  assert.deepEqual(library?.itemListElement.map((item: any) => item.url).sort(), GUIDE_ARTICLES.map(article => `${SITE_URL}/ratgeber/${article.slug}/`).sort());
  assert.equal(new Set(library?.itemListElement.map((item: any) => item.url)).size, GUIDE_ARTICLES.length);
  assert.ok(!JSON.stringify(library).includes('aggregateRating'));
});

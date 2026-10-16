import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import App from '../src/App';
import { ROUTES, getRouteSeo, getStructuredData } from '../src/seo';

for (const route of ROUTES) {
  test(`approved editorial shell on ${route.path}`, () => {
    const window = new Window();
    window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={route.path} />);
    const doc = window.document;
    // The six V15 direct-download pages own their header/main/footer composition.
    // Keep the original shell assertions unchanged for all pre-existing routes.
    if (route.path.startsWith('/gratis-guides/')) {
      assert.ok(doc.querySelector('.free-guides > header.fg-header'));
      assert.ok(doc.querySelector('.free-guides > main.fg-main'));
      assert.ok(doc.querySelector('.free-guides > footer.fg-footer'));
      assert.equal(doc.querySelectorAll('main').length, 1);
      assert.equal(doc.querySelectorAll('h1').length, 1);
      assert.equal(doc.querySelectorAll('iframe,form,input').length, 0);
      assert.ok(doc.querySelector('footer a[href="/testmethodik/"]'));
      assert.ok(doc.querySelector('#cookie-settings'));
      assert.equal(doc.querySelector('.editorial-home'), null);
      return;
    }
    assert.ok(doc.querySelector('.editorial-home.v4 > header.top'), 'approved header');
    assert.ok(doc.querySelector('.editorial-home.v4 > footer.foot'), 'approved footer');
    assert.equal(doc.querySelectorAll('main').length, 1);
    assert.equal(doc.querySelectorAll('h1').length, 1);
    assert.equal(doc.querySelectorAll('iframe').length, 0);
    if (route.path !== '/') assert.ok(doc.querySelector('.editorial-site > main'), 'inner editorial styling scope');
    assert.equal(doc.querySelector('#footer-methodology')?.getAttribute('href'), '/testmethodik/');
    assert.ok(doc.querySelector('header img[src="/brand-symbol.svg"]'));
  });
}

test('guide hub opens with licensed documentary photography and retains its pump finder', () => {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(<App initialPath="/ratgeber/" />);
  const image = window.document.querySelector('.mu-story--lead img');
  assert.equal(image?.getAttribute('src'), '/editorial-photos/pump-parts.jpg');
  assert.equal(image?.getAttribute('loading'), 'eager');
  assert.ok(window.document.querySelector('.mu-story--lead a[href*="commons.wikimedia.org"]'));
  assert.ok(window.document.querySelector('#pumpenfinder'));
});

test('inner editorial stylesheet is loaded last, scoped and uses light display typography', () => {
  const entry = readFileSync('src/main.tsx', 'utf8');
  assert.ok(entry.indexOf("'./site-editorial.css'") > entry.indexOf("'./home-editorial.css'"));
  const css = readFileSync('src/site-editorial.css', 'utf8');
  assert.match(css, /\.editorial-site/);
  assert.match(css, /font-weight:\s*300/);
  assert.doesNotMatch(css, /(?:html|body)\s*\{[^}]*overflow(?:-x)?:\s*hidden/);
});

test('homepage and market page answer different search intents', () => {
  const home = getRouteSeo('/');
  const market = getRouteSeo('/tragbare-milchpumpen/');
  assert.match(home.title, /Milchpumpen-Vergleich/);
  assert.doesNotMatch(home.title, /Modellidentitäten/);
  assert.notEqual(home.title, market.title);
  assert.equal(getRouteSeo('/testmethodik/').dateModified, '2026-10-15');
});

test('market structured data lists researched models without inventing ratings', () => {
  const graph = getStructuredData('/tragbare-milchpumpen/')['@graph'];
  const list = graph.find(node => node['@type'] === 'ItemList');
  assert.ok(list);
  assert.equal((list.itemListElement as unknown[]).length, 40);
  assert.doesNotMatch(JSON.stringify(graph), /aggregateRating|ratingValue|reviewRating/);
});

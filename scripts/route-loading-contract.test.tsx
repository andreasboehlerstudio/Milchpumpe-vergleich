import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { RouteView } from '../src/route-view';
import { loadRoute } from '../src/route-loader';
import { normalizePath } from '../src/route-path';
import { ROUTES, normalizePath as compatibleNormalize } from '../src/seo';
import { GUIDE_ARTICLES, GUIDE_LINKS, PRODUCTS } from '../src/data';
import { EDITORIAL_GUIDES } from '../src/guides';
import rawMilk from '../src/milk-guides.json';
import { guidesForProduct } from '../src/contextual-links';

// Characterization/parity contracts: these projections must never become a second editorial registry.
test('light guide projections preserve exact authoritative metadata, order and product links', () => {
  const basics = GUIDE_ARTICLES.slice(0, 3);
  assert.deepEqual(basics, [
    { slug: 'richtige-flanschgroesse', title: 'Flanschgröße richtig einordnen', updated: '2026-10-15', description: 'Warum die Passform wichtig ist, wie Hersteller messen lassen und wann fachliche Unterstützung sinnvoll ist.' },
    { slug: 'milchpumpe-reinigen', title: 'Milchpumpe hygienisch reinigen', updated: '2026-10-15', description: 'Ein praktischer Ablauf auf Basis der Empfehlungen des Bundeszentrums für Ernährung.' },
    { slug: 'tragbar-oder-elektrisch', title: 'Tragbar, elektrisch oder manuell?', updated: '2026-10-15', description: 'Die Pumpenarten nach Einsatzhäufigkeit, Bewegungsfreiheit und Reinigungsaufwand unterscheiden.' },
  ]);
  const summaries = [...rawMilk, ...EDITORIAL_GUIDES].map(({ slug, title, description, published, updated, category }) => ({ slug, title, description, published, updated, category, image: `/editorial/${slug}-og.png` }));
  // JSON drops absent fields; undefined fields have identical public rendering behavior.
  assert.deepEqual(GUIDE_ARTICLES.slice(3), JSON.parse(JSON.stringify(summaries)));
  const project = ({ slug, title, description, category, productIds }: typeof EDITORIAL_GUIDES[number]) => ({ slug, title, description, category, productIds });
  assert.deepEqual(GUIDE_LINKS, EDITORIAL_GUIDES.map(project));
  for (const product of PRODUCTS) {
    const actual = GUIDE_LINKS.filter(guide => guide.productIds.includes(product.id)).sort((a, b) => a.productIds.length - b.productIds.length || a.title.localeCompare(b.title, 'de')).slice(0, 6);
    assert.deepEqual(actual, guidesForProduct(product.id, EDITORIAL_GUIDES).map(project));
  }
});

test('normalization retains its compatibility export and never mutates URL state', () => {
  assert.equal(normalizePath, compatibleNormalize);
  for (const [input, expected] of [['/', '/'], ['/ratgeber', '/ratgeber/'], ['//produkte///momcozy-m9?keep=1#quellen', '/produkte/momcozy-m9/'], ['/404/#x', '/404/']]) {
    assert.equal(normalizePath(input), expected);
  }
});

test('every demand-loaded page renders exactly the same complete synchronous App tree', async () => {
  assert.equal(ROUTES.length, 56);
  assert.equal(ROUTES.filter(route => !route.path.startsWith('/gratis-guides/')).length, 50);
  for (const initialPath of [...ROUTES.map(route => route.path), '/404/', '/produkte/unknown/', '/ratgeber/unknown/']) {
    const Page = await loadRoute(initialPath);
    const browserTree = renderToString(<RouteView initialPath={initialPath} Page={Page} />);
    const synchronousTree = renderToString(<App initialPath={initialPath} />);
    assert.equal(browserTree, synchronousTree, initialPath);
    assert.equal((browserTree.match(/<main\b/g) || []).length, 1, initialPath);
    assert.equal((browserTree.match(/<h1\b/g) || []).length, 1, initialPath);
    assert.doesNotMatch(browserTree, /template data-msg|<!--\$!-->|Loading\.\.\./, initialPath);
  }
});

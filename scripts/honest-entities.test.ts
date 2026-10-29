import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GUIDE_ARTICLES, PRODUCTS, SITE_URL, productUrl } from '../src/data';
import { PRODUCT_CATALOGUE } from '../src/product-catalogue';
import { catalogueProductUrl } from '../src/catalogue';
import { WEARABLE_MARKET } from '../src/wearable-market';
import { FREE_GUIDES, FREE_GUIDES_HUB, freeGuidePath } from '../src/free-guides-data';
import { EDITORIAL_GUIDES } from '../src/guides';
import { MILK_GUIDES } from '../src/milk-articles';
import { ROUTES, getRouteSeo, getStructuredData } from '../src/seo';

type Node = Record<string, unknown>;

function objects(value: unknown): Node[] {
  if (Array.isArray(value)) return value.flatMap(objects);
  if (!value || typeof value !== 'object') return [];
  const node = value as Node;
  return [node, ...Object.values(node).flatMap(objects)];
}

test('every route recursively avoids unsupported Product candidates and obsolete product identities', () => {
  for (const route of ROUTES) {
    const schema = getStructuredData(route.path);
    for (const node of objects(schema)) {
      const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
      assert.ok(!types.includes('Product'), `${route.path}: unintended Product candidate`);
      for (const field of ['offers', 'review', 'aggregateRating', 'reviewRating']) {
        assert.ok(!(field in node), `${route.path}: unsupported ${field}`);
      }
    }
    assert.doesNotMatch(JSON.stringify(schema), /#product\b/, `${route.path}: obsolete product identity`);
  }
});

test('detail WebPages identify their exact model as an honest Thing subject', () => {
  for (const product of PRODUCTS) {
    const url = `${SITE_URL}${productUrl(product)}`;
    const graph = getStructuredData(productUrl(product))['@graph'];
    const page = graph.find(node => node['@id'] === `${url}#webpage`)!;
    const subject = graph.find(node => node['@id'] === `${url}#subject`);
    assert.equal(page['@type'], 'WebPage');
    assert.deepEqual(page.mainEntity, { '@id': `${url}#subject` });
    assert.ok(subject, `${url}: missing model subject`);
    assert.equal(subject['@type'], 'Thing');
    assert.equal(subject.name, `${product.brand} ${product.name}`);
    assert.equal(subject.description, product.summary);
    assert.equal(subject.url, url);
    for (const productOnlyField of ['brand', 'category', 'additionalProperty']) {
      assert.ok(!(productOnlyField in subject), `Thing must not use Product-only ${productOnlyField}`);
    }
  }
});

const lists = [
  { path: '/vergleich/', fragment: 'liste', entries: PRODUCTS.map(product => ({ name: `${product.brand} ${product.name}`, url: `${SITE_URL}${productUrl(product)}` })) },
  { path: '/produkte/', fragment: 'liste', entries: PRODUCT_CATALOGUE.map(product => ({ name: `${product.brand} ${product.name}`, url: `${SITE_URL}${catalogueProductUrl(product)}` })) },
  { path: '/tragbare-milchpumpen/', fragment: 'modellverzeichnis', entries: WEARABLE_MARKET.models.map((model, index) => ({ name: `${model.brand} ${model.canonicalModel}`, url: `${SITE_URL}/tragbare-milchpumpen/#modell-${index + 1}` })) },
  { path: '/ratgeber/', fragment: 'artikel', entries: GUIDE_ARTICLES.map(article => ({ name: article.title, url: `${SITE_URL}/ratgeber/${article.slug}/` })) },
  { path: FREE_GUIDES_HUB, fragment: 'guides', entries: FREE_GUIDES.map(guide => ({ name: guide.title, url: `${SITE_URL}${freeGuidePath(guide)}` })) },
];

test('editorial lists expose exact inventories, matching declared counts and stable page links', () => {
  for (const { path, fragment, entries } of lists) {
    const graph = getStructuredData(path)['@graph'];
    const id = `${SITE_URL}${path}#${fragment}`;
    const list = graph.find(node => node['@id'] === id)!;
    const page = graph.find(node => node['@id'] === `${SITE_URL}${path}#webpage`)!;
    assert.equal(list?.['@type'], 'ItemList', path);
    assert.equal(list.numberOfItems, entries.length, `${path}: declared inventory count`);
    assert.deepEqual(list.itemListElement, entries.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, ...entry })), path);
    assert.deepEqual(page.mainEntity, { '@id': id }, `${path}: exact list identity`);
  }
});

test('all route graphs retain unique exact identities and every nested reference resolves', () => {
  const schemas = ROUTES.map(route => ({ route, graph: getStructuredData(route.path)['@graph'] }));
  const definitions = new Set(schemas.flatMap(({ graph }) => graph.map(node => node['@id']).filter(id => typeof id === 'string')));
  const paths = new Set(ROUTES.map(route => route.path));
  for (const { route, graph } of schemas) {
    const ids = graph.map(node => node['@id']).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, `${route.path}: duplicate graph identities`);
    const pageId = `${SITE_URL}${route.path}#webpage`;
    const page = graph.find(node => node['@id'] === pageId)!;
    assert.ok(page, `${route.path}: exact page identity`);
    assert.equal(page.url, `${SITE_URL}${route.path}`);
    assert.deepEqual(page.isPartOf, { '@id': `${SITE_URL}/#website` });
    assert.deepEqual(page.publisher, { '@id': `${SITE_URL}/#publisher` });
    assert.equal(graph.find(node => node['@id'] === `${SITE_URL}/#publisher`)?.name, 'Andreas Böhler');
    for (const node of objects(graph)) {
      if (typeof node['@id'] !== 'string') continue;
      assert.ok(definitions.has(node['@id']), `${route.path}: dangling identity ${node['@id']}`);
      const id = new URL(node['@id']);
      assert.equal(id.origin, SITE_URL);
      assert.ok(paths.has(id.pathname), `${route.path}: unknown identity route ${id.pathname}`);
      assert.ok(id.hash, `${route.path}: missing identity fragment`);
    }
    const breadcrumb = graph.find(node => node['@type'] === 'BreadcrumbList');
    if (route.path === '/') assert.equal(breadcrumb, undefined);
    else {
      const crumbs = breadcrumb?.itemListElement as Node[];
      assert.ok(crumbs?.length >= 2, `${route.path}: missing breadcrumbs`);
      assert.equal(crumbs.at(-1)?.item, `${SITE_URL}${route.path}`);
      assert.deepEqual(crumbs.map(crumb => crumb.position), crumbs.map((_, index) => index + 1));
      for (const crumb of crumbs) {
        const target = new URL(String(crumb.item));
        assert.ok(paths.has(target.pathname), `${route.path}: unknown breadcrumb ${target.pathname}`);
        assert.equal(crumb.name, target.pathname === '/' ? 'Startseite' : getRouteSeo(target.pathname).heading);
      }
    }
  }
});

test('every guide retains its Article, visible citations and exact named Thing subjects', () => {
  for (const route of ROUTES.filter(route => route.path.startsWith('/ratgeber/') && route.path !== '/ratgeber/')) {
    const url = `${SITE_URL}${route.path}`;
    const graph = getStructuredData(route.path)['@graph'];
    const article = graph.find(node => node['@id'] === `${url}#article`)!;
    const page = graph.find(node => node['@id'] === `${url}#webpage`)!;
    assert.equal(article?.['@type'], 'Article', route.path);
    assert.deepEqual(page.mainEntity, { '@id': `${url}#article` });
    assert.equal(article.headline, route.heading);
    assert.equal(article.description, route.description);
    assert.equal(article.mainEntityOfPage, url);
    assert.equal(article.isAccessibleForFree, true);
    assert.deepEqual(article.author, { '@id': `${SITE_URL}/#publisher` });
    assert.deepEqual(article.publisher, { '@id': `${SITE_URL}/#publisher` });
    assert.ok(Array.isArray(article.citation) && article.citation.length > 0, route.path);
    const guide = EDITORIAL_GUIDES.find(guide => `/ratgeber/${guide.slug}/` === route.path);
    const milk = MILK_GUIDES.find(guide => `/ratgeber/${guide.slug}/` === route.path);
    if (guide || milk) {
      assert.deepEqual(article.citation, (guide?.sources || milk!.sources).map(source => source.url), `${route.path}: source preservation`);
      const expected = milk
        ? milk.productIds.map(id => {
          const product = PRODUCT_CATALOGUE.find(product => product.id === id)!;
          return { '@type': 'Thing', name: `${product.brand} ${product.name}`, url: `${SITE_URL}${catalogueProductUrl(product)}` };
        })
        : guide!.productIds.map(id => {
          const product = PRODUCTS.find(product => product.id === id)!;
          const productPage = `${SITE_URL}${productUrl(product)}`;
          return { '@type': 'Thing', '@id': `${productPage}#subject`, name: `${product.brand} ${product.name}`, url: productPage };
        });
      assert.deepEqual(article.about, expected, `${route.path}: exact article subjects`);
    }
  }
});

test('only revised comparison, about, method and market pages receive the current editorial date', () => {
  for (const path of ['/vergleich/', '/ueber-uns/', '/testmethodik/', '/tragbare-milchpumpen/']) {
    assert.equal(getRouteSeo(path).dateModified, '2026-10-29', path);
    const page = getStructuredData(path)['@graph'].find(node => node['@id'] === `${SITE_URL}${path}#webpage`)!;
    assert.equal(page.dateModified, '2026-10-29', path);
  }
  assert.equal(getRouteSeo('/').dateModified, '2026-10-15');
  assert.equal(getRouteSeo('/produkte/').dateModified, '2026-10-14');
  assert.match(getRouteSeo('/tragbare-milchpumpen/').description, /Angebotsbeobachtungen vom 15\.10\.2026/);
});

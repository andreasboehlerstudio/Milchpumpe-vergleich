import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { MethodologyV4 } from '../src/methodology-v4';
import { WearableMarketOverview, WEARABLE_MARKET } from '../src/wearable-market';
import { ROUTES, getRouteSeo, getStructuredData } from '../src/seo';
import { SITE_URL, PRODUCTS } from '../src/data';

const render = (path: string) => renderToStaticMarkup(<App initialPath={path} />);
const main = (html: string) => html.match(/<main\b[\s\S]*?<\/main>/)?.[0] || '';

test('actual methodology route renders the finished component directly', () => {
  const html = render('/testmethodik/');
  const normalizeIds = (markup: string) => markup.replace(/_R_[^" ]+_/g, '_react-id_');
  assert.equal(normalizeIds(main(html)), normalizeIds(main(renderToStaticMarkup(<MethodologyV4 />))), 'Finished MethodologyV4 is not routed');
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok(html.includes('id="inhalt"'));
});

test('German market route exposes all researched identities without replacing the six-model comparison', () => {
  const html = render('/tragbare-milchpumpen/');
  assert.equal([...html.matchAll(/data-market-model="/g)].length, 35, 'Market overview is not routed');
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok(html.includes('<h1>Tragbare Milchpumpen: Modelle und Kaufhilfe</h1>'));
  assert.ok(html.includes('aria-label="Brotkrümelnavigation"'));
  const standalone = renderToStaticMarkup(<WearableMarketOverview />);
  for (const model of WEARABLE_MARKET.models) {
    assert.ok(html.includes(`data-market-model="${model.brand}|${model.canonicalModel}"`));
  }
  assert.equal([...standalone.matchAll(/data-market-model="/g)].length, 35);
  const comparison = render('/vergleich/');
  assert.ok(comparison.includes('Sechs Milchpumpen im direkten Vergleich'));
  for (const product of PRODUCTS) assert.ok(comparison.includes(`/produkte/${product.id}/`));
});

test('new scoped styles load after every legacy stylesheet', () => {
  const entry = readFileSync('src/main.tsx', 'utf8');
  const imports = [...entry.matchAll(/import ['"]([^'"]+\.css)['"]/g)].map(match => match[1]);
  assert.deepEqual(imports.slice(-4), ['./methodology-v4.css', './wearable-market.css', './home-editorial.css', './site-editorial.css']);
  for (const old of ['./index.css', './editorial.css', './visual-editorial.css']) {
    assert.ok(imports.indexOf(old) >= 0 && imports.indexOf(old) < imports.indexOf('./methodology-v4.css'));
  }
});

test('market is discoverable from header, footer, home and the scoped comparison', () => {
  const home = render('/');
  const header = home.match(/<header class="top"[\s\S]*?<\/header>/)?.[0] || '';
  const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || '';
  assert.ok(header.includes('href="/#marktcheck"'), 'The approved header must reach the home model selection');
  assert.ok(main(home).includes('id="marktcheck"'));
  for (const [place, html] of [['footer', footer], ['home', main(home)], ['comparison', main(render('/vergleich/'))]]) {
    assert.ok(html.includes('href="/tragbare-milchpumpen/"'), `Market link missing in ${place}`);
  }
  assert.ok(main(render('/vergleich/')).includes('manuelle Silikonpumpe'));
  assert.ok(main(render('/vergleich/')).includes('nicht den gesamten Markt'));
});

test('best wearable answer leads to conditional recommendations, evidence and a no-purchase path', () => {
  const html = main(render('/tragbare-milchpumpen/'));
  assert.ok(html.includes('Welche ist die beste tragbare Milchpumpe?'), 'Missing visible answer to the buying query');
  assert.ok(html.includes('href="#kaufhilfe"'));
  assert.ok(html.includes('id="kaufhilfe"'));
  assert.ok(html.includes('href="/testmethodik/#kaufentscheidung"'));
  assert.ok(html.includes('href="/testmethodik/#quellen"'));
  assert.ok(html.includes('href="/ratgeber/richtige-flanschgroesse/"'));
  assert.equal([...html.matchAll(/data-buying-case="/g)].length, 3);
  assert.ok(html.includes('nicht einer gemessenen Qualitätsrangfolge'));
  assert.ok(html.includes('vorhandene Pumpe'));
  assert.ok(html.includes('31 Modelle') && html.includes('4 ohne verifiziertes Angebot'));
  assert.ok(html.includes('14. Oktober 2026'));
  assert.ok(!/Testsieger|garantiert|KI-gestützt|KI-generiert/.test(html));
  const shopLinks = [...html.matchAll(/<a\b[^>]*href="https:\/\/www\.amazon\.de\/[^>]*>/g)];
  assert.equal(shopLinks.length, 35);
  for (const [tag] of shopLinks) {
    assert.ok(tag.includes('tag=andreasboeh09-21'));
    assert.ok(/rel="[^"]*sponsored/.test(tag));
  }
});

test('route registry supplies accurate market and methodology metadata with canonical breadcrumbs', () => {
  const market = getRouteSeo('/tragbare-milchpumpen');
  assert.equal(market.noindex, undefined, 'Market route is not registered for prerender/sitemap');
  assert.equal(ROUTES.filter(route => route.path === market.path).length, 1);
  assert.equal(market.heading, 'Tragbare Milchpumpen: Modelle und Kaufhilfe');
  assert.ok(market.title.includes('Tragbare Milchpumpen'));
  assert.ok(market.description.includes('35 recherchierte'));
  assert.ok(!/Testsieger|beste Milchpumpe|vollständige|lieferbar/.test(market.description));
  assert.equal(getRouteSeo('/testmethodik/').heading, 'So entsteht unser Milchpumpen-Vergleich');
  for (const path of ['/testmethodik/', '/tragbare-milchpumpen/']) {
    const graph = getStructuredData(path)['@graph'];
    const page = graph.find(item => ['WebPage', 'CollectionPage'].includes(String(item['@type'])));
    assert.equal(page?.url, `${SITE_URL}${path}`);
    assert.equal(page?.name, getRouteSeo(path).heading);
    assert.ok(graph.some(item => item['@type'] === 'BreadcrumbList'));
    assert.ok(!/aggregateRating|ratingValue|reviewRating|"@type":"Review"/.test(JSON.stringify(graph)));
  }
});

test('home search metadata describes the expanded entry without claiming all-market coverage', () => {
  const seo = getRouteSeo('/');
  assert.equal(seo.heading, 'Tragbare Milchpumpen. Für deinen Alltag.');
  assert.ok(seo.title.includes('Kaufhilfe'), 'Home title still reduces the site to six models');
  assert.ok(seo.description.includes('35 recherchierte tragbare Modelle'));
  assert.ok(seo.description.includes('Passform'));
  assert.ok(getRouteSeo('/vergleich/').description.includes('sechs Milchpumpen'));
});

test('the editorial navigation has a real accessible mobile toggle and scoped responsive styles', () => {
  const html = render('/');
  assert.ok(html.includes('id="main-nav" class="nav"'));
  assert.ok(html.includes('aria-controls="main-nav" aria-expanded="false"'));
  const css = readFileSync('src/home-editorial.css', 'utf8');
  assert.ok(css.includes('.editorial-home .nav.open{display:grid;grid-template-columns:minmax(0,1fr)}'));
  assert.ok(css.includes('@media(max-width:760px)'));
  assert.ok(css.includes('.editorial-home .menu{display:block}'));
});

test('production artifacts include both canonical routes and preserve accessible evidence destinations', () => {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  for (const path of ['/tragbare-milchpumpen/', '/testmethodik/']) {
    const html = readFileSync(`dist${path}index.html`, 'utf8');
    const seo = getRouteSeo(path);
    assert.ok(sitemap.includes(`<loc>${SITE_URL}${path}</loc>`));
    assert.ok(html.includes(`<link rel="canonical" href="${SITE_URL}${path}"`));
    assert.ok(html.includes(`<title>${seo.title}</title>`));
    assert.ok(html.includes('name="robots" content="index,follow,max-image-preview:large"'));
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.equal([...html.matchAll(/<main\b/g)].length, 1);
    assert.ok(html.includes('href="#inhalt"'));
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `Missing local target ${path}#${id}`);
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(json);
    assert.deepEqual(JSON.parse(json), getStructuredData(path));
  }
  const html = readFileSync('dist/tragbare-milchpumpen/index.html', 'utf8');
  assert.equal([...html.matchAll(/data-market-model="/g)].length, 35);
  for (const [, tag] of html.matchAll(/(<a\b[^>]*href="https:\/\/www\.amazon\.de\/[^>]*>)/g)) {
    assert.ok(tag.includes('tag=andreasboeh09-21') && /rel="[^"]*sponsored/.test(tag));
  }
});

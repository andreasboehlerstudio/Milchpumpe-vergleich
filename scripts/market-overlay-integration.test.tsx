import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { renderToStaticMarkup } from 'react-dom/server';
import { WearableMarketOverview, WEARABLE_MARKET, filterWearableModels, wearableMarketDestination } from '../src/wearable-market';

import { MARKET_EVIDENCE_OVERLAY, MARKET_SOURCE_UPDATED_ON } from '../src/wearable-market-evidence-overlay';
import { getRouteSeo, getStructuredData } from '../src/seo';

const identity = (model: { brand: string; canonicalModel: string }) => `${model.brand}|${model.canonicalModel}`;
const html = () => renderToStaticMarkup(<WearableMarketOverview />);
const card = (key: string) => html().split('<article class="wearable-market__card"').find(part => part.includes(`data-market-model="${key}"`))?.split('</article>')[0] || '';

test('Kinderkraft exact manual updates the visible card and architecture filter', () => {
  const markup = card('Kinderkraft|MAMAFLOW');
  assert.match(markup, /data-architecture="fully-in-bra-electric-wearable"/);
  assert.match(markup, /https:\/\/kinderkraft.pl\/media\/wysiwyg\/manual\/Kinderkraft-MAMAFLOW-v-1-0.pdf/);
  assert.match(markup, /Motoreinheit.*Sammler/);
  assert.match(markup, /Einzelpumpe, nicht Doppelset/);
  assert.match(markup, /Motoreinheit nicht waschen/);
  assert.doesNotMatch(markup, /Bauform offen|Anleitungsklärung|nicht ausdrücklich/);
  const filtered = filterWearableModels(WEARABLE_MARKET.models, { architecture: 'fully-in-bra-electric-wearable' });
  assert.ok(filtered.some(model => identity(model) === 'Kinderkraft|MAMAFLOW'));
  assert.equal(filtered.length, 30);
  assert.equal(filterWearableModels(WEARABLE_MARKET.models, { architecture: 'in-bra-cups-with-tubing-and-external-portable-motor' }).length, 10);
  assert.equal(filterWearableModels(WEARABLE_MARKET.models, { architecture: 'unverified' }).length, 0);
});

test('partial mappings expose fresh primary sources and useful regional limits without erasing source history', () => {
  const open = JSON.parse(readFileSync(new URL('../docs/market-open-evidence-recheck.json', import.meta.url), 'utf8'));
  assert.equal(Object.keys(MARKET_EVIDENCE_OVERLAY).length, 5);
  assert.equal(MARKET_SOURCE_UPDATED_ON, '2026-10-15');
  const checks = [
    ['KISSBOBO|K5', /DE-Ausführung.*offen/, /Saugkraft.*Abschaltangaben/, /kissbobo.co\/products\/electrical-breast-pump-k5/],
    ['NCVI|AM8161A (beheiztes Wearable)', /AM8161A.*offen/, /AM8161.*NC8161/, /ncvi.com\/NCVI-Heated-Wearable-Breast-Pump-pd528285148.html/],
    ['eufy|S2 Pro (Amazon T60A1; Hersteller T600P + T60A0)', /T60A1\/T600P.*gemeinsam/, /sechs.*fünf|6.*5/, /anker.com\/de\/products\/t60a13b0/],
    ['Willow|Go (PDL60)', /PDL60.*älterer Herstelleranleitung/, /SplashGuard.*nicht bestätigt/, /onewillow.com\/products\/willow-go-pump-kit/],
  ] as const;
  const sourceUrls = new Set(open.sources.map((source: { url: string }) => source.url));
  for (const [key, mapping, limitation, source] of checks) {
    const markup = card(key);
    assert.match(markup, mapping);
    assert.match(markup, limitation);
    assert.match(markup, source);
    assert.match(markup, /Quellenupdate:.*2026-10-15/);
    for (const citation of MARKET_EVIDENCE_OVERLAY[key].sources) assert.ok(sourceUrls.has(citation.url), citation.url);
  }
  assert.match(card('eufy|S2 Pro (Amazon T60A1; Hersteller T600P + T60A0)'), /B14nz4ngPeL.pdf/);
  assert.match(card('NCVI|AM8161A (beheiztes Wearable)'), /C1e20HOGFyL.pdf/);
  assert.match(card('Willow|Go (PDL60)'), /Region.*Support|Support.*Region/);
  assert.doesNotMatch(card('Willow|Go (PDL60)'), /willow-go-wearable-pump"/);
});

test('current buying cases use approved case order and named alternatives with source boundaries', () => {
  const markup = html();
  const cases = [...markup.matchAll(/<article class="wearable-market__case"[\s\S]*?<\/article>/g)].map(match => match[0]);
  assert.equal(cases.length, 3);
  for (const [index, name] of ['Momcozy M5 Smart', 'Medela Freestyle Hands-free', 'Momcozy Air 1'].entries()) assert.ok(cases[index].includes(name), name);
  assert.match(cases[0], /Elvie Pump/);
  assert.match(cases[0], /sensorbedingte Pause.*Schätzung/);
  assert.match(cases[0], /vier zu reinigende Teile|Vier zu reinigende Teile/);
  assert.match(cases[0], /manuell/);
  assert.match(cases[0], /1 Pack|Single/);
  assert.match(cases[1], /Philips Avent SCF547\/11/);
  assert.match(cases[1], /21\/24.*19.*Schläuchen.*externem Motor/);
  assert.match(cases[1], /PersonalFit Flex.*separat/);
  assert.match(cases[2], /eufy S1/);
  assert.match(cases[2], /S1-Grundset enthält kein Ladecase/);
  assert.match(cases[2], /S1-Pro-Set.*Case separat prüfen/);
  assert.match(cases[2], /Vollmeldung.*kein belegter.*Autostopp/);
  assert.match(cases[2], /selbst ausschalten/);
  assert.doesNotMatch(cases.join(''), /180 ml|15.*30 Minuten|Testsieger|Reinigungssieger/);
  const evidence = JSON.parse(readFileSync(new URL('../docs/ranking-next-evidence.json', import.meta.url), 'utf8'));
  const knownUrls = new Set(evidence.sources.map((source: { url: string }) => source.url));
  for (const [, href] of cases.join('').matchAll(/href="([^"]+)"/g)) { const url = href.replaceAll('&amp;', '&'); if (url.startsWith('https://www.amazon.de/')) assert.equal(new URL(url).searchParams.get('tag'), 'andreasboeh09-21'); else assert.ok(knownUrls.has(url), url); }
  assert.match(markup, /Angebotsabgleich vom 15. Oktober 2026/);
  assert.match(markup, /36 Modelle.*4 ohne verifiziertes Angebot/);
});

test('home SEO describes 40 researched identities and practical case help while preserving the six-model detail route', () => {
  const home = getRouteSeo('/');
  assert.equal(home.heading, 'Tragbare Milchpumpen. Für deinen Alltag.');
  assert.match(home.title, /Milchpumpen-Vergleich.*Tragbare Modelle.*Kaufhilfe/);
  assert.match(home.description, /40 recherchierte tragbare Modelle/);
  assert.match(home.description, /Einsatzfall|Alltag/);
  assert.match(getRouteSeo('/vergleich/').description, /sechs Milchpumpen/);
  assert.equal(home.dateModified, '2026-10-15');
  const market = getRouteSeo('/tragbare-milchpumpen/');
  assert.equal(market.dateModified, '2026-10-15');
  assert.match(market.description, /15.10.2026/);
  assert.equal(getRouteSeo('/vergleich/').heading, 'Sechs Milchpumpen im direkten Vergleich');
  const list = getStructuredData('/vergleich/')['@graph'].find(item => item['@type'] === 'ItemList');
  assert.equal((list?.itemListElement as unknown[]).length, 6);
  for (const route of [home, market]) {
    assert.doesNotMatch(`${route.title} ${route.description}`, /Testsieger|Testnote|Testscores|vollständige|alle verfügbaren|lieferbar|beste Milchpumpe/);
    assert.doesNotMatch(JSON.stringify(getStructuredData(route.path)), /ratingValue|aggregateRating|reviewRating/);
  }
});

test('all 35 opaque identity tuples, offer history, source snapshots and destinations survive the overlay', () => {
  const raw = JSON.parse(readFileSync(new URL('../src/wearable-market-data.json', import.meta.url), 'utf8'));
  assert.equal(WEARABLE_MARKET.models.length, 40);
  for (const prior of raw.models) { const current = WEARABLE_MARKET.models.find(row => identity(row) === identity(prior))!; assert.deepEqual(current.manufacturerMapping, prior.manufacturerMapping); assert.deepEqual(current.provenance, prior.provenance); assert.deepEqual(current.amazonObservation.priorBatch, prior.amazonObservation.priorBatch); }
  assert.equal(new Set(WEARABLE_MARKET.models.map(identity)).size, 40);
  assert.equal([...html().matchAll(/data-market-model="/g)].length, 40);
  for (const model of WEARABLE_MARKET.models) {
    const markup = card(identity(model));
    assert.ok(markup.includes(`dateTime="${model.amazonObservation.checkedAt}"`));
    const destination = wearableMarketDestination(model);
    const url = new URL(destination.href);
    assert.equal(url.searchParams.get('tag'), 'andreasboeh09-21');
    const exact = Boolean(model.amazonObservation.observedAsin && model.manufacturerMapping.editorialStatus !== 'mapping-unresolved');
    assert.equal(destination.kind, exact ? 'exact-offer' : 'model-search');
    if (exact) assert.equal(url.pathname, `/dp/${model.amazonObservation.observedAsin}`);
    else assert.equal(url.searchParams.get('k'), `${model.brand} ${model.canonicalModel} Milchpumpe`);
  }
  const hashes: Record<string, string> = {
    '../src/wearable-market-data.json': '159b264703e3b060c1d0732757e029a331e3cfaccd8bc3bd4de2de69d574a6fc',
    '../docs/wearable-comparison-editorial.json': '0146434fdb20bc39751bd1df1b4905175326af490bbb1df1989db14590679f8d',
  };
  for (const [file, hash] of Object.entries(hashes)) assert.equal(createHash('sha256').update(readFileSync(new URL(file, import.meta.url))).digest('hex'), hash);
  assert.equal([...html().matchAll(/data-offer-observation="public-offer-observed"/g)].length, 36);
  assert.equal([...html().matchAll(/data-offer-observation="not-found"/g)].length, 4);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { CURRENT_BUYING_CASES, MARKET_EVIDENCE_OVERLAY } from '../src/wearable-market-evidence-overlay';

const readJson = (relative: string) => JSON.parse(readFileSync(new URL(relative, import.meta.url), 'utf8'));
const editorial = readJson('../docs/wearable-comparison-editorial.json');
const reconciled = readJson('../docs/wearable-market-reconciled.json');
const identity = (row: { brand: string; canonicalModel: string }) => `${row.brand}|${row.canonicalModel}`;
const loadUi = async () => {
  const module = await import('../src/wearable-market').catch(() => null);
  assert.ok(module, 'Standalone WearableMarketOverview is missing');
  return module;
};

test('standalone overview renders all 35 distinct researched identities without route wiring', async () => {
  const ui = await loadUi();
  assert.equal(ui.WEARABLE_MARKET.models.length, 35);
  assert.equal(new Set(ui.WEARABLE_MARKET.models.map(identity)).size, 35);
  assert.deepEqual(ui.WEARABLE_MARKET.models.map(identity).sort(), reconciled.rows.map(identity).sort());
  const html = renderToStaticMarkup(<ui.WearableMarketOverview />);
  assert.equal([...html.matchAll(/data-market-model="/g)].length, 35);
  for (const model of ui.WEARABLE_MARKET.models) assert.ok(html.includes(model.canonicalModel.replaceAll('&', '&amp;')), identity(model));
});

test('cards separate audited architecture and preserve timestamped historical sources', async () => {
  const ui = await loadUi();
  const data = ui.WEARABLE_MARKET;
  assert.deepEqual(data.models, editorial.models);
  assert.deepEqual(data.sources, editorial.sources);
  assert.equal(data.generatedAt, editorial.generatedAt);
  assert.equal(data.researchReconciledAt, reconciled.reconciledAt);
  const html = renderToStaticMarkup(<ui.WearableMarketOverview />);
  assert.equal([...html.matchAll(/data-architecture="fully-in-bra-electric-wearable"/g)].length, 26);
  assert.equal([...html.matchAll(/data-architecture="in-bra-cups-with-tubing-and-external-portable-motor"/g)].length, 9);
  assert.equal([...html.matchAll(/data-architecture="unverified"/g)].length, 0);
  assert.equal([...html.matchAll(/data-offer-observation="public-offer-observed"/g)].length, 31);
  assert.equal([...html.matchAll(/data-offer-observation="not-found"/g)].length, 4);
  assert.match(html, /keine vollständige Marktübersicht/);
  assert.match(html, /nicht.*ausverkauft/);
  assert.match(html, /keine Zusage.*Lieferbarkeit/);
  assert.doesNotMatch(html, /Auf Lager|GRATIS Lieferung/);
  for (const model of data.models) {
    assert.ok(html.includes(`dateTime="${model.amazonObservation.checkedAt}"`), identity(model));
    const overlay = MARKET_EVIDENCE_OVERLAY[identity(model)];
    const urls = overlay ? overlay.sources.map(source => source.url) : [model.manufacturerMapping.url].filter(Boolean);
    for (const url of urls) assert.ok(html.includes(url.replaceAll('&', '&amp;')), identity(model));
    assert.deepEqual(model.provenance, editorial.models.find(row => identity(row) === identity(model)).provenance);
  }
  assert.match(html, /DE-Ausführung weiter abgleichen; Markenseite vorhanden/);
  assert.match(html, /Bauform offen/);
  assert.match(html, /AM8161A-Zuordnung und genaue Ausführung offen/);
  assert.match(html, /BH-Nutzung in der modellgenauen Anleitung bestätigt/);
});

test('commercial destinations use exact safe ASINs or explicitly labelled model searches', async () => {
  const ui = await loadUi();
  const html = renderToStaticMarkup(<ui.WearableMarketOverview />);
  const amazonLinks = [...html.matchAll(/<a\b[^>]*href="(https:\/\/www\.amazon\.de[^\"]*)"[^>]*>(.*?)<\/a>/gs)];
  assert.equal(amazonLinks.length, 35);
  for (const [anchor, href, text] of amazonLinks) {
    const url = new URL(href.replaceAll('&amp;', '&'));
    assert.equal(url.searchParams.get('tag'), 'andreasboeh09-21');
    for (const rel of ['sponsored', 'noopener', 'noreferrer']) assert.ok(anchor.match(/rel="([^"]*)"/)?.[1].split(' ').includes(rel));
    if (url.pathname === '/s') assert.match(text, /suchen/);
    else assert.match(text, /beobachtetes Angebot prüfen/);
  }
  for (const model of ui.WEARABLE_MARKET.models) {
    const link = ui.wearableMarketDestination(model);
    const url = new URL(link.href);
    const safe = model.amazonObservation.observedAsin && model.manufacturerMapping.editorialStatus !== 'mapping-unresolved';
    assert.equal(link.kind, safe ? 'exact-offer' : 'model-search');
    if (safe) assert.equal(url.pathname, `/dp/${model.amazonObservation.observedAsin}`);
    else assert.equal(url.searchParams.get('k'), `${model.brand} ${model.canonicalModel} Milchpumpe`);
  }
  const first = ui.WEARABLE_MARKET.models[0];
  assert.throws(() => ui.wearableMarketDestination({ ...first, amazonObservation: { ...first.amazonObservation, observedAsin: ' B0D9444NPD' } }), /Ungültige ASIN/);
  assert.doesNotMatch(html, /B0D7MZVLND|B0F1CRQVRG|B0G6DCFK8Z/);
  assert.match(html, /Werbung.*Affiliate/);
});

test('buying-case shortlists retain decisive manufacturer evidence without measured rankings', async () => {
  const ui = await loadUi();
  const html = renderToStaticMarkup(<ui.WearableMarketOverview />);
  assert.deepEqual(ui.WEARABLE_MARKET.useCaseShortlist, editorial.useCaseShortlist);
  assert.equal([...html.matchAll(/data-buying-case="/g)].length, 3);
  for (const entry of CURRENT_BUYING_CASES) {
    const escape = (value: string) => value.replaceAll('&', '&amp;');
    for (const text of [entry.useCase, entry.why, entry.tradeOff, entry.purchaseCheck, ...entry.decisiveProperties.map(p => p.claim)]) assert.ok(html.includes(escape(text)), text);
    for (const source of entry.sources) assert.ok(html.includes(escape(source.url)));
    assert.ok(html.includes(entry.alternative.name));
    assert.ok(html.includes(escape(entry.alternative.note)));
  }
  assert.match(html, /Welcher Einstieg passt zu Deinem Alltag/);
  assert.match(html, /Die Auswahl folgt dem jeweiligen Einsatzfall, nicht einer gemessenen Qualitätsrangfolge/);
  assert.match(html, /Brusthauben/);
  assert.match(html, /Stillberatung/);
  assert.doesNotMatch(html, /★|☆|Testsieger|Testnote|Qualitätsscore|[0-9](?:[.,][0-9])?\s*\/\s*(?:5|10|100)\b/);
  assert.doesNotMatch(html, /<img|<table|aggregateRating|ratingValue/);
});

test('search and brand architecture historical-offer filters intersect with accessible controls', async () => {
  const ui = await loadUi();
  assert.equal(typeof ui.filterWearableModels, 'function');
  const models = ui.WEARABLE_MARKET.models;
  assert.equal(ui.filterWearableModels(models, {}).length, 35);
  assert.equal(ui.filterWearableModels(models, { query: '  m5 SMART ' }).length, 1);
  assert.equal(ui.filterWearableModels(models, { brand: 'Elvie' }).length, 3);
  assert.equal(ui.filterWearableModels(models, { architecture: 'fully-in-bra-electric-wearable' }).length, 26);
  assert.equal(ui.filterWearableModels(models, { architecture: 'unverified' }).length, 0);
  assert.equal(ui.filterWearableModels(models, { offers: 'not-found' }).length, 4);
  assert.equal(ui.filterWearableModels(models, { offers: 'public-offer-observed' }).length, 31);
  const filters = { brand: 'Medela', architecture: 'in-bra-cups-with-tubing-and-external-portable-motor', offers: 'public-offer-observed' };
  assert.equal(ui.filterWearableModels(models, filters).length, 4);
  const html = renderToStaticMarkup(<ui.WearableMarketOverview initialFilters={filters} />);
  assert.equal([...html.matchAll(/data-market-model="/g)].length, 4);
  assert.match(html, /4 von 35/);
  for (const text of ['Marke', 'Bauform', 'Angebotsbeobachtung', 'Modell oder Modellcode suchen']) assert.ok(html.includes(text));
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /<label/);
  const empty = renderToStaticMarkup(<ui.WearableMarketOverview initialFilters={{ query: 'zzzz-does-not-exist' }} />);
  assert.match(empty, /Kein Modell passt zu Deinen Filtern/);
  assert.match(empty, /Filter zurücksetzen/);
});

test('native filters use complete compact labels on 320px screens', async () => {
  const ui = await loadUi();
  const html = renderToStaticMarkup(<ui.WearableMarketOverview />);
  assert.match(html, /value="in-bra-cups-with-tubing-and-external-portable-motor">Externer Motor<\/option>/);
  assert.match(html, /value="not-found">Kein Angebot belegt<\/option>/);
  assert.match(html, /placeholder="z. B. M5 Smart"/);
});

test('standalone styles keep mobile cards and long German labels readable without clipping', () => {
  let css = '';
  try { css = readFileSync(new URL('../src/wearable-market.css', import.meta.url), 'utf8'); } catch { /* Missing feature is asserted below. */ }
  assert.ok(css, 'Standalone wearable market stylesheet is missing');
  assert.match(css, /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /@media\s*\(max-width:\s*700px\)/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /min-width:\s*0/);
  assert.match(css, /line-height:\s*1\.6/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.match(css, /:focus-visible/);
  const visibleStyles = css.replace(/\.wearable-market__sr-only\s*\{[^}]*\}/g, '');
  assert.doesNotMatch(visibleStyles, /overflow:\s*hidden|text-overflow:\s*ellipsis|line-clamp|height:\s*\d+px/);
});

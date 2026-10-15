import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { getRouteSeo, getStructuredData } from '../src/seo';
import { MethodologyV4 } from '../src/methodology-v4';
import { WEARABLE_MARKET } from '../src/wearable-market';
import { wearableMarketEvidence } from '../src/wearable-market-evidence-overlay';
import historical from '../src/wearable-market-data.json';
import additions from '../src/wearable-market-additions.json';

const key = (model: {brand: string; canonicalModel: string}) => `${model.brand}|${model.canonicalModel}`;
test('current market combines forty distinct identities without overwriting the thirty-five-model source snapshot', () => {
  assert.equal(WEARABLE_MARKET.models.length, 40);
  assert.equal(new Set(WEARABLE_MARKET.models.map(key)).size, 40);
  assert.equal(new Set(WEARABLE_MARKET.models.map(model => model.brand)).size, 18);
  assert.equal(historical.models.length, 35);
  assert.equal(additions.models.length, 5);
  for (const model of [...historical.models, ...additions.models]) assert.ok(WEARABLE_MARKET.models.some(row => key(row) === key(model)), key(model));
  assert.equal(WEARABLE_MARKET.models.filter(model => model.amazonObservation.status === 'public-offer-observed').length, 36);
  for (const model of WEARABLE_MARKET.models) {
    assert.equal(model.qualityScore, null);
    assert.equal(model.price, null);
    assert.ok(!/haakaa/i.test(key(model)));
    assert.ok(model.manufacturerMapping.url || wearableMarketEvidence(model)?.sources.length);
  }
});

test('homepage directory and two-model choices stay in sync with all forty identities', () => {
  const data = JSON.parse(readFileSync(new URL('../src/home-editorial-data.json', import.meta.url), 'utf8'));
  const template = JSON.parse(readFileSync(new URL('../src/home-editorial-template.json', import.meta.url), 'utf8'));
  assert.equal(data.models.length, 40);
  assert.deepEqual(data.models.map((model: {key: string}) => model.key).sort(), WEARABLE_MARKET.models.map(key).sort());
  assert.equal((template.html.match(/data-model="/g) || []).length, 40);
  assert.match(template.html, /40 recherchierte Modelle aus 18 Marken/);
});

test('metadata, structured list and methodology describe the same expanded inventory', () => {
  assert.match(getRouteSeo('/tragbare-milchpumpen/').title, /40 recherchierte Modelle/);
  assert.match(getRouteSeo('/').description, /40 recherchierte/);
  const list = getStructuredData('/tragbare-milchpumpen/')['@graph'].find((node: any) => node['@type'] === 'ItemList')!;
  assert.equal(list.numberOfItems, 40);
  assert.equal((list.itemListElement as unknown[]).length, 40);
  assert.match(renderToStaticMarkup(<MethodologyV4 />), /40 recherchierte Modellidentitäten/);
});

test('every observed Amazon offer uses its actual October fifteen observation without modifying historical files', () => {
  for (const model of WEARABLE_MARKET.models.filter(model => model.amazonObservation.status === 'public-offer-observed')) {
    assert.ok(model.amazonObservation.checkedAt.startsWith('2026-10-15'), key(model));
  }
  assert.ok(historical.models.some(model => model.amazonObservation.checkedAt.startsWith('2026-10-14')));
});

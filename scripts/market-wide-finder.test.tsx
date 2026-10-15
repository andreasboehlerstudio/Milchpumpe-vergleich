import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { PumpFinder } from '../src/editorial';
import { WEARABLE_MARKET, WearableMarketOverview } from '../src/wearable-market';
import { CURRENT_BUYING_CASES } from '../src/wearable-market-evidence-overlay';

test('the primary buying helper covers the full electrical wearable directory rather than six legacy details', () => {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(<PumpFinder />);
  const rows = [...window.document.querySelectorAll('[data-finder-model]')];
  assert.equal(rows.length, WEARABLE_MARKET.models.length);
  for (const model of WEARABLE_MARKET.models) {
    const key = `${model.brand}|${model.canonicalModel}`;
    const row = rows.find(row => row.getAttribute('data-finder-model') === key);
    assert.ok(row, key);
    const href = row.querySelector('a')!.getAttribute('href')!;
    assert.ok(href.startsWith('/tragbare-milchpumpen/#modell-'), href);
  }
  assert.equal(rows.some(row => /haakaa/i.test(row.textContent!)), false);
  assert.ok(window.document.querySelector('input[type="search"]'));
  assert.ok(window.document.querySelector('[aria-live="polite"]'));
  assert.ok(window.document.body.textContent.includes(`${WEARABLE_MARKET.models.length} von ${WEARABLE_MARKET.models.length}`));
});

test('each editorial recommendation exposes its exact observed set and sponsored Amazon action together', () => {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(<WearableMarketOverview />);
  const cases = [...window.document.querySelectorAll('[data-buying-case]')];
  assert.equal(cases.length, CURRENT_BUYING_CASES.length);
  for (const [index, entry] of CURRENT_BUYING_CASES.entries()) {
    const article = cases[index];
    const model = WEARABLE_MARKET.models.find(model => model.brand === entry.modelRef.brand && model.canonicalModel === entry.modelRef.canonicalModel)!;
    const link = article.querySelector('a[href*="amazon.de"]');
    assert.ok(link, entry.useCase);
    assert.ok(link.getAttribute('rel')!.includes('sponsored'));
    assert.equal(new URL(link.getAttribute('href')!).searchParams.get('tag'), 'andreasboeh09-21');
    assert.ok(article.innerHTML.indexOf(entry.purchaseCheck.split(' ')[0]) < article.innerHTML.indexOf('sponsored'));
    assert.ok(article.textContent!.includes(entry.tradeOff));
    assert.ok(link.getAttribute('href')!.includes(model.amazonObservation.observedAsin!));
  }
});

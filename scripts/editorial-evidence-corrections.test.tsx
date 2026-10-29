import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { WearableMarketOverview, WEARABLE_MARKET } from '../src/wearable-market';
import { PRODUCTS } from '../src/data';

test('historical Fizimed offer note uses an absolute date without changing the observation', () => {
  const model = WEARABLE_MARKET.models.find(m => m.brand === 'Fizimed')!;
  assert.ok(model);
  const window = new Window(); window.document.body.innerHTML = renderToStaticMarkup(<WearableMarketOverview />);
  const card = window.document.querySelector('[data-market-model^="Fizimed|"]')!;
  assert.ok(card);
  assert.doesNotMatch(card.textContent, /Heute um|heute beobachtet/);
  assert.match(card.textContent, /15\.10\.2026.*09:25.*CEST/);
  assert.ok(card.querySelector('time')?.getAttribute('datetime')?.startsWith('2026-10-15'));
  assert.equal(model.amazonObservation.checkedAt.slice(0, 10), '2026-10-15');
});

test('M9 limitations distinguish care planning from an unmeasured cleaning comparison', () => {
  const model = PRODUCTS.find(m => m.id === 'momcozy-m9')!;
  assert.doesNotMatch(model.limitations.join(' '), /Mehr Teile bedeuten mehr Reinigungsaufwand/);
  assert.match(model.limitations.join(' '), /Zerlege- und Pflegeschritte/);
  assert.match(model.limitations.join(' '), /App-Zusatzfunktionen/);
});

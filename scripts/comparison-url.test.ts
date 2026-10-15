import test from 'node:test';
import assert from 'node:assert/strict';

import { PRODUCTS } from '../src/data';
const ids = PRODUCTS.map(product => product.id);

test('comparison URL selection accepts only exact known model IDs and a controlled differences flag', async () => {
  const module = await import('../src/comparison-url').catch(() => null);
  assert.ok(module, 'A small, pure comparison URL module is required');
  const read = module.readComparisonSelection;
  assert.deepEqual(read('?modell-a=haakaa-gen3&modell-b=elvie-pump-single&unterschiede=0', ids), { pair: ['haakaa-gen3', 'elvie-pump-single'], emphasize: false });
  assert.deepEqual(read('', ids), { pair: ['momcozy-m9', 'medela-freestyle'], emphasize: true });
  assert.deepEqual(read('?modell-a=Momcozy-M9&modell-b=%3Cscript%3E&unterschiede=false', ids), { pair: ['momcozy-m9', 'medela-freestyle'], emphasize: true });
  assert.deepEqual(read('?modell-a=haakaa-gen3&modell-a=elvie-pump-single&modell-b=elvie-pump-single&unterschiede=0&unterschiede=1', ids), { pair: ['momcozy-m9', 'elvie-pump-single'], emphasize: true });
});

test('share URLs preserve attribution and anchors, clear default state, and reject unsafe targets or invented models', async () => {
  const module = await import('../src/comparison-url');
  assert.equal(typeof module.buildComparisonUrl, 'function');
  const input = 'https://milchpumpe-vergleich.de/vergleich/?utm_source=pinterest&modell-a=old#mu-pair';
  const selected = { pair: ['haakaa-gen3', 'elvie-pump-single'] as const, emphasize: false };
  const url = new URL(module.buildComparisonUrl(input, selected, ids));
  assert.equal(url.searchParams.get('utm_source'), 'pinterest');
  assert.equal(url.searchParams.get('modell-a'), 'haakaa-gen3');
  assert.equal(url.searchParams.get('modell-b'), 'elvie-pump-single');
  assert.equal(url.searchParams.get('unterschiede'), '0');
  assert.equal(url.hash, '#mu-pair');
  assert.deepEqual(module.readComparisonSelection(url.search, ids), selected);
  assert.equal(module.buildComparisonUrl(url.href, { pair: ['momcozy-m9', 'medela-freestyle'], emphasize: true }, ids), 'https://milchpumpe-vergleich.de/vergleich/?utm_source=pinterest#mu-pair');
  assert.throws(() => module.buildComparisonUrl('javascript:alert(1)', selected, ids));
  assert.throws(() => module.buildComparisonUrl('https://name:secret@example.com/vergleich/', selected, ids));
  assert.throws(() => module.buildComparisonUrl(input, { pair: ['invented', 'elvie-pump-single'], emphasize: true }, ids));
});

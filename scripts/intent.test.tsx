import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { EDITORIAL_GUIDES } from '../src/guides';
import { PRODUCTS } from '../src/data';
import * as intents from '../src/search-intents';

test('each new article owns a distinct decision intent and has a useful visible purchase check', () => {
  const cards = (intents as any).GUIDE_DECISIONS;
  assert.ok(cards, 'Intent-specific decision cards are missing');
  assert.equal(Object.keys(cards).length, EDITORIAL_GUIDES.length);
  const questions = new Set();
  for (const guide of EDITORIAL_GUIDES) {
    const card = cards[guide.slug];
    assert.ok(card, guide.slug);
    assert.ok(!questions.has(card.question), guide.slug);
    questions.add(card.question);
    assert.ok(card.rows.length >= 2);
    assert.ok(guide.productIds.includes(card.primaryProductId));
    assert.ok(PRODUCTS.some(p => p.id === card.primaryProductId));
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
    assert.ok(html.includes('id="kaufcheck"'), guide.slug);
    assert.ok(html.includes(card.question.replaceAll('&','&amp;')), guide.slug);
    assert.ok(html.includes('data-intent-purchase'), guide.slug);
    assert.ok(html.includes('sponsored'), guide.slug);
  }
});

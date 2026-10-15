import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

test('external parent reports are named, attributed and separated from current manufacturer instructions', () => {
  for (const [id, name, url] of [
    ['momcozy-m9', 'Alex', 'https://www.mumsnet.com/reviews/momcozy-m9-breast-pump-review'],
    ['medela-freestyle', 'Charlotte', 'https://www.mumsnet.com/reviews/medela-freestyle-breast-pump-review'],
  ]) {
    const html = renderToStaticMarkup(<App initialPath={`/produkte/${id}/`} />);
    assert.ok(html.includes('id="fremde-erfahrungsberichte"'), id);
    assert.ok(html.includes(name) && html.includes(url), id);
    assert.ok(html.includes('Die Erfahrungen stammen aus dem genannten Mumsnet-Bericht'), id);
    assert.ok(html.includes('Herstelleranleitung'), id);
    assert.ok(!html.includes('reviewRating'), id);
  }
});

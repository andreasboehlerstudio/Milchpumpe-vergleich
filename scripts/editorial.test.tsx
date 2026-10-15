import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

test('guide hub has a working form surface with crawlable product and article links', () => {
  const html = renderToStaticMarkup(<App initialPath="/ratgeber/" />);
  assert.ok(html.includes('id="pumpenfinder"'), 'Missing preference finder');
  assert.ok(html.includes('App-Steuerung'));
  assert.ok(html.includes('aria-live="polite"'));
  assert.ok(html.includes('Ratgeber durchsuchen'));
  assert.ok(html.includes('href="/produkte/momcozy-m9/"'));
  assert.ok(html.includes('href="/ratgeber/richtige-flanschgroesse/"'));
});

test('homepage offers a real decision entry rather than decorative product imagery', () => {
  const html = renderToStaticMarkup(<App initialPath="/" />);
  assert.ok(html.includes('href="/ratgeber/#pumpenfinder"'));
  assert.ok(html.includes('Schlauchfrei, direkt bedienbar'));
  assert.ok(html.includes('id="v4-case-controls"'));
  assert.ok(html.includes('id="v9-compare-a"'));
  assert.ok(!html.includes('hero-pump'));
});

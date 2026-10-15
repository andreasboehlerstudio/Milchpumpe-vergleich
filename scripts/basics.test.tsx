import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

test('existing basics also guide to a relevant product without faking experience', () => {
  for (const slug of ['richtige-flanschgroesse','milchpumpe-reinigen','tragbar-oder-elektrisch']) {
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${slug}/`} />);
    assert.ok(html.includes('andreasboeh09-21'), slug);
    assert.ok(html.includes('Inhaltsverzeichnis'), slug);
    assert.ok(html.includes('href="/ueber-uns/"'), slug);
  }
});

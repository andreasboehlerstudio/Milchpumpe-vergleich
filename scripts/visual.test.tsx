import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFile } from 'node:fs/promises';
import App from '../src/App';

test('brand header uses an original SVG symbol and editorial articles have visual context', async () => {
  const html = renderToStaticMarkup(<App initialPath="/ratgeber/momcozy-m9-oder-s12-pro/" />);
  assert.ok(html.includes('src="/brand-symbol.svg"'));
  assert.ok(html.includes('class="article-visual"'));
  assert.ok(html.includes('Themenillustration zum Artikel'));
  const svg = await readFile('public/brand-symbol.svg', 'utf8');
  assert.ok(svg.includes('<svg'));
});

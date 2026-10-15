import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getStructuredData } from '../src/seo';

test('prerendered guide metadata supports article rich pins with a raster image', async () => {
  const html = await readFile('dist/ratgeber/richtige-flanschgroesse/index.html', 'utf8');
  assert.match(html, /property="og:type" content="article"/);
  assert.match(html, /name="author" content="Andreas Böhler"/);
  assert.match(html, /property="article:modified_time" content="2026-10-15"/);
  assert.doesNotMatch(html, /property="article:published_time"/, 'Unknown original publication date must not be invented');
  assert.match(html, /property="og:image" content="[^\"]+\.png"/);
});

test('product breadcrumbs point to a real comparison rather than a missing products index', () => {
  const crumbs = getStructuredData('/produkte/momcozy-m9/')['@graph'].find(n => n['@type'] === 'BreadcrumbList');
  assert.ok(crumbs);
  const items = crumbs.itemListElement as {item:string}[];
  assert.equal(items[1].item, 'https://milchpumpe-vergleich.de/vergleich/');
});

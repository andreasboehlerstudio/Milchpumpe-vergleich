import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { EDITORIAL_GUIDES } from '../src/guides';
import { MILK_GUIDES } from '../src/milk-articles';
import { PRODUCTS, SITE_URL } from '../src/data';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

test('all twenty article source references and product pathways survive rendering', () => {
  assert.equal(EDITORIAL_GUIDES.length, 20);
  for (const guide of EDITORIAL_GUIDES) {
    assert.ok(guide.productIds.every(id => PRODUCTS.some(p => p.id === id)), guide.slug);
    assert.equal(new Set(guide.sections.map(s => s.id)).size, guide.sections.length, guide.slug);
    for (const section of guide.sections) {
      assert.ok(section.sourceIndexes?.length, `${guide.slug}/${section.id}`);
      for (const i of section.sourceIndexes!) assert.ok(guide.sources[i]?.url.startsWith('https://'), `${guide.slug}/${i}`);
    }
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
    for (const source of guide.sources) assert.ok(html.includes(source.url.replaceAll('&', '&amp;')), source.url);
    assert.ok(!html.includes('reviewRating'), guide.slug);
  }
});

test('all Pinterest drafts match the real article URLs and their checked assets', async () => {
  const map = JSON.parse(await readFile('docs/content-map.json', 'utf8'));
  const manifest = JSON.parse(await readFile('docs/image-manifest.json', 'utf8'));
  const csv = await readFile('docs/pinterest-plan.csv', 'utf8');
  const allGuides=[...EDITORIAL_GUIDES,...MILK_GUIDES];
  assert.equal(map.length, allGuides.length);
  assert.equal(manifest.length, allGuides.length * 2);
  assert.equal(csv.trim().split('\n').length, allGuides.length + 1);
  for (const guide of allGuides) {
    assert.ok(map.some((g: any) => g.slug === guide.slug));
    assert.ok(csv.includes(`${SITE_URL}/ratgeber/${guide.slug}/?utm_source=pinterest`));
    for (const kind of ['og', 'pin']) {
      assert.ok(manifest.some((m: any) => m.slug === guide.slug && m.kind === kind));
      const png = await readFile(`public/editorial/${guide.slug}-${kind}.png`);
      assert.equal(png.readUInt32BE(16), kind === 'pin' ? 1000 : 1200);
      assert.equal(png.readUInt32BE(20), kind === 'pin' ? 1500 : 630);
    }
  }
});

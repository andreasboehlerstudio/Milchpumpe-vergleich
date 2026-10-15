import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { GUIDE_ARTICLES } from '../src/data';
import { existsSync, readFileSync } from 'node:fs';

test('self-hosted typography supports light text and leaves room for glyphs', () => {
  assert.ok(existsSync('src/visual-editorial.css'), 'The lighter visual typography layer is missing');
  const css = readFileSync('src/visual-editorial.css', 'utf8');
  assert.ok(css.includes('/fonts/manrope-latin.woff2'));
  assert.ok(css.includes('font-weight: 300'));
  assert.ok(css.includes('font-weight: 400'));
  assert.ok(css.includes('line-height: 1.2'));
  assert.ok(css.includes('font-display: swap'));
  assert.ok(!css.includes('fonts.googleapis.com'));
});

test('optional animation is gated by motion preferences and never hides content', () => {
  const css = readFileSync('src/visual-editorial.css', 'utf8');
  assert.ok(css.includes('@media (prefers-reduced-motion: no-preference)'), 'Motion must be opt-in by browser preference');
  assert.ok(css.includes('@keyframes editorial-arrive'), 'A gentle one-shot entrance is missing');
  assert.ok(css.includes('@media (hover: hover) and (pointer: fine)'), 'Hover motion must not affect touch-only devices');
  assert.ok(!/opacity\s*:\s*0(?:\s*[;}])/.test(css), 'Content must remain readable without animation');
});

test('homepage hero uses the approved photo-led composition and priority loading', () => {
  const html = renderToStaticMarkup(<App initialPath="/" />);
  assert.ok(html.includes('class="v4-hero-stage"'), 'A large editorial photo composition is missing');
  assert.ok(/fetchpriority="high"/i.test(html));
  assert.ok(html.includes('src="/editorial-photos/nursery.jpg"'));
  const css = readFileSync('src/home-editorial.css', 'utf8');
  assert.ok(css.includes('grid-area:image'));
  assert.ok(css.includes('grid-template-areas:"eyebrow" "title" "actions" "image" "lead" "note"'), 'On mobile the photograph precedes the long lead');
  assert.ok(html.includes('Für deinen Alltag.'));
  assert.ok(html.includes('id="v4-case-controls"'));
});

test('the six illustrated topic articles retain affiliate paths and complete headings', () => {
  const assets = JSON.parse(readFileSync('docs/editorial-art-v2.json', 'utf8'));
  for (const asset of assets) {
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${asset.articleSlug}/`} />);
    assert.ok(html.includes(`src="${asset.url}"`), `The article image is missing: ${asset.articleSlug}`);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.ok(html.includes('andreasboeh09-21'));
    assert.ok(html.includes('rel="noopener sponsored"'));
  }
  const other = renderToStaticMarkup(<App initialPath="/ratgeber/momcozy-m9-oder-s12-pro/" />);
  assert.ok(other.includes('/editorial/momcozy-m9-oder-s12-pro-og.png'), 'Unmapped articles keep their existing original images');
});

test('the complete guide library includes the six topic illustrations as crawlable cards', () => {
  const html = renderToStaticMarkup(<App initialPath="/ratgeber/" />);
  const assets = JSON.parse(readFileSync('docs/editorial-art-v2.json', 'utf8'));
  for (const asset of assets) assert.ok(html.includes(`src="${asset.url}"`), `Library artwork missing for ${asset.articleSlug}`);
  assert.ok(html.includes(`${GUIDE_ARTICLES.length} Artikel`));
  assert.equal(new Set(GUIDE_ARTICLES.map(item => item.slug)).size, GUIDE_ARTICLES.length);
});

test('homepage presents the approved illustrated everyday entries and curated stories', () => {
  const html = renderToStaticMarkup(<App initialPath="/" />);
  const entries = [...html.matchAll(/<a id="v4-start-(?:buy|store|clean)"[\s\S]*?<\/a>/g)];
  const stories = [...html.matchAll(/<article class="v4-story">[\s\S]*?<\/article>/g)];
  assert.equal(entries.length, 3);
  assert.equal(stories.length, 3);
  for (const [card] of [...entries, ...stories]) {
    assert.ok(card.includes('<img '), 'Every selected entry or story needs actual imagery');
    const src = card.match(/src="([^"]+)"/)?.[1];
    assert.ok(src && src.startsWith('/') && existsSync(`public${src}`), `Local image missing: ${src}`);
  }
  assert.ok(html.includes('href="/ratgeber/"'));
  assert.ok(html.includes('Schon wieder feuchte Teile?'));
  assert.ok(html.includes('Die Milch muss mit.'));
});

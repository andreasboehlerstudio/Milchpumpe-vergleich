import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { FREE_GUIDES, FREE_GUIDE_SEO, freeGuidePdf, freeGuidePreview } from '../src/free-guides-data';
type Chunk = { file: string; imports?: string[]; css?: string[]; isDynamicEntry?: boolean };

test('guide code and presentation stay deferred outside the selected free-guides family', () => {
  const manifest: Record<string, Chunk> = JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf8'));
  const report: Record<string, { modules: string[] }> = JSON.parse(readFileSync('dist/.vite/route-loading.json', 'utf8'));
  assert.ok(manifest['src/route-free-guides.tsx']?.isDynamicEntry);
  assert.ok(manifest['src/free-guide-landing.css']);
  const css = manifest['src/free-guide-landing.css'].file;
  assert.match(readFileSync(path.join('dist', css), 'utf8'), /\.free-guides/);
  assert.ok(!readFileSync('dist/index.html', 'utf8').includes(css));
  function closure(keys: string[]) {
    const seen = new Set<string>();
    function visit(key: string) { if (seen.has(key)) return; seen.add(key); manifest[key]?.imports?.forEach(visit); }
    keys.forEach(visit); return [...seen].map(key => manifest[key]);
  }
  for (const family of ['home', 'newsletter', 'magazine', 'catalogue', 'product', 'article', 'market', 'methodology', 'legal']) {
    const chunks = closure(['index.html', `src/route-${family}.tsx`]);
    const modules = chunks.flatMap(chunk => report[chunk.file]?.modules ?? []);
    assert.ok(!modules.some(module => /src\/(free-guides-data|free-guide-landing|route-free-guides)\./.test(module)), family);
    assert.ok(!chunks.some(chunk => chunk.css?.includes(css)), family);
  }
});

test('six prerendered guide pages have unique metadata, canonical and indexable sitemap entries', () => {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  for (const seo of FREE_GUIDE_SEO) {
    const html = readFileSync(`dist${seo.path}index.html`, 'utf8');
    assert.ok(sitemap.includes(`https://milchpumpe-vergleich.de${seo.path}</loc>`), seo.path);
    assert.ok(html.includes(`<link rel="canonical" href="https://milchpumpe-vergleich.de${seo.path}"`), seo.path);
    assert.ok(html.includes(`<title>${seo.title}</title>`), seo.path);
    assert.match(html, /name="robots" content="index,follow,max-image-preview:large"/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test('all linked guide PDFs and real preview images exist in public and the production build', () => {
  const missing: string[] = [];
  for (const guide of FREE_GUIDES) for (const base of ['public', 'dist']) for (const asset of [freeGuidePdf(guide), freeGuidePreview(guide)]) {
    const file = `${base}${asset}`;
    if (!existsSync(file)) missing.push(file);
    else {
      const bytes = readFileSync(file);
      if (asset.endsWith('.pdf')) assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', file);
      else { assert.equal(bytes.subarray(0, 4).toString(), 'RIFF', file); assert.equal(bytes.subarray(8, 12).toString(), 'WEBP', file); }
    }
  }
  assert.deepEqual(missing, [], `Missing real production artifacts:\n${missing.join('\n')}`);
});

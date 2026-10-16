import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

type Chunk = { file: string; imports?: string[]; css?: string[]; isDynamicEntry?: boolean };
const manifest: Record<string, Chunk> = JSON.parse(readFileSync('dist/.vite/manifest.json', 'utf8'));
const report: Record<string, { modules: string[] }> = JSON.parse(readFileSync('dist/.vite/route-loading.json', 'utf8'));
function closure(roots: string[]) {
  const seen = new Set<string>();
  function visit(key: string) {
    if (seen.has(key)) return;
    seen.add(key);
    manifest[key]?.imports?.forEach(visit);
  }
  roots.forEach(visit);
  return [...seen].map(key => manifest[key]);
}

test('production newsletter rendering and styles are deferred and absent from every unrelated family closure', () => {
  assert.ok(manifest['src/route-newsletter.tsx']?.isDynamicEntry);
  assert.ok(manifest['src/newsletter-landing.css']);
  const landingCss = manifest['src/newsletter-landing.css'].file;
  assert.match(readFileSync(path.join('dist', landingCss), 'utf8'), /\.newsletter-landing/);
  const initialHtml = readFileSync('dist/index.html', 'utf8');
  assert.ok(!initialHtml.includes(landingCss), 'no eager landing stylesheet or preload in home HTML');
  for (const family of ['home', 'magazine', 'catalogue', 'product', 'article', 'market', 'methodology', 'legal']) {
    const selected = closure(['index.html', `src/route-${family}.tsx`]);
    const sources = selected.flatMap(chunk => report[chunk.file]?.modules ?? []);
    assert.ok(!sources.some(source => /src\/(newsletter-landing|route-newsletter)\./.test(source)), family);
    assert.ok(!selected.some(chunk => chunk.css?.includes(landingCss)), family);
  }
  const newsletterSources = closure(['src/route-newsletter.tsx']).flatMap(chunk => report[chunk.file]?.modules ?? []);
  assert.ok(newsletterSources.some(source => source.endsWith('src/newsletter-landing.tsx')));
  assert.ok(!newsletterSources.some(source => /src\/(pages|guides|milk-articles|product-catalogue)\./.test(source)));
});

test('unpublished kaufcheck is absent from the real sitemap and static output and public newsletter assets contain only the intended WebP', () => {
  assert.doesNotMatch(readFileSync('dist/sitemap.xml', 'utf8'), /kaufcheck/);
  assert.equal(existsSync('dist/kaufcheck/index.html'), false);
  assert.deepEqual(readdirSync('public/newsletter-assets').sort(), ['kaufcheck-preview.webp']);
  assert.deepEqual(readdirSync('dist/newsletter-assets').sort(), ['kaufcheck-preview.webp']);
});

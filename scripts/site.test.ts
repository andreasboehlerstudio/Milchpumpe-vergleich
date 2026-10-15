import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { ROUTES } from '../src/seo';
import { SITE_URL } from '../src/data';

test('all indexable routes contain complete HTML, unique metadata and valid local targets', async () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  assert.equal(sitemapUrls.length, ROUTES.length);
  for (const route of ROUTES) {
    const html = await readFile(path.join('dist', route.path, 'index.html'), 'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route.path);
    assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${route.path}"`), route.path);
    assert.ok(!html.includes('andyboeh-21'), 'Deleted tag must never ship');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(/name="description" content="([^"]*)"/)?.[1];
    assert.ok(title && !titles.has(title), `Duplicate/missing title ${route.path}`);
    assert.ok(description && !descriptions.has(description), `Duplicate/missing description ${route.path}`);
    titles.add(title); descriptions.add(description);
    const ld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    assert.ok(ld); const schema = JSON.parse(ld);
    assert.ok(schema['@graph'].length > 0);
    for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const target = decodeURIComponent(m[1]);
      if (!target) continue;
      const asset = path.extname(target) ? target : `${target}index.html`;
      await access(path.join('dist', asset)).catch(() => assert.fail(`${route.path}: broken local target ${target}`));
    }
    for (const m of html.matchAll(/<a\b[^>]*href="(#[^"]+)"[^>]*>/g)) {
      const id = m[1].slice(1);
      assert.ok(html.includes(`id="${id}"`), `${route.path}: missing anchor ${id}`);
    }
    const amazon = [...html.matchAll(/<a\b[^>]*href="(https:\/\/www.amazon.de[^\"]+)"[^>]*>/g)];
    for (const a of amazon) {
      const target = new URL(a[1].replaceAll('&amp;', '&'));
      if (target.pathname !== '/s' && !target.pathname.startsWith('/dp/')) continue; // Legal-policy citations are not ads.
      assert.equal(target.searchParams.get('tag'), 'andreasboeh09-21');
      assert.ok(a[0].includes('sponsored'));
    }
  }
});

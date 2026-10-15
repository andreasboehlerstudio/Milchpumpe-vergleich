import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { ROUTES } from '../src/seo';
import { SITE_URL } from '../src/data';

test('optional LLM navigation is real Markdown with canonical existing destinations', () => {
  assert.ok(existsSync('public/llms.txt'), 'A structured optional LLM navigation file is missing');
  const text = readFileSync('public/llms.txt', 'utf8');
  assert.ok(/^# Milchpumpe-Vergleich\.de\s*$/m.test(text));
  assert.ok(!/<(?:html|script|div)\b/i.test(text));
  const links = [...text.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(match => match[1]);
  assert.ok(links.length >= 8);
  for (const link of links) {
    assert.ok(link.startsWith(SITE_URL));
    const pathname = new URL(link).pathname;
    assert.ok(ROUTES.some(route => route.path === pathname), `Unknown LLM navigation path: ${pathname}`);
  }
  assert.ok(text.includes('/testmethodik/'));
});

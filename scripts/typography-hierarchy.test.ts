import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('the page can shrink to the actual viewport excluding a scrollbar', () => {
  const css = readFileSync('src/visual-editorial.css', 'utf8');
  assert.match(css, /body\s*\{[^}]*min-width:\s*0(?:px)?\s*[;}]/);
});

test('compact model marks do not expose a cropped brand label through later small-tag styles', () => {
  const css = readFileSync('src/visual-editorial.css', 'utf8');
  assert.ok(/\.product-visual\.product-visual--compact small\s*\{[^}]*display:\s*none/.test(css), 'The compact visual needs a stronger hiding rule than table/related small-tag selectors');
});

test('methodology cards use shrinkable tracks instead of a min-content grid floor', () => {
  const css = readFileSync('src/visual-editorial.css', 'utf8');
  assert.ok(/\.methodology-grid\s*\{[^}]*minmax\(0,\s*1fr\)/.test(css), 'Methodology tracks must be allowed to shrink');
});

test('the type hierarchy separates large light copy from readable body and control text', () => {
  const css = readFileSync('src/visual-editorial.css', 'utf8');
  const value = (name: string) => css.match(new RegExp(`--weight-${name}:\\s*(\\d+)\\s*;`))?.[1];
  assert.equal(value('display'), '300', 'Large editorial accents should be light');
  assert.equal(value('text'), '400', 'Body and small print should stay readable');
  assert.equal(value('control'), '500', 'Navigation and controls should not all be semibold');
  assert.equal(value('emphasis'), '600', 'Reserve semibold for meaningful emphasis');
  assert.match(css, /\.footer-grid p\s*\{[^}]*font-weight:\s*var\(--weight-text\)/);
});

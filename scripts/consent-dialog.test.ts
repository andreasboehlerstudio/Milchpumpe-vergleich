import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('the consent dialog reserves viewport height and scrolls rather than clipping short screens', () => {
  const css = readFileSync('src/index.css', 'utf8');
  const dialog = css.match(/\.cookie-dialog\s*\{([^}]+)\}/)?.[1] || '';
  assert.match(dialog, /max-height:\s*calc\(100dvh\s*-\s*2\.5rem\)/);
  assert.match(dialog, /overflow-y:\s*auto/);
});

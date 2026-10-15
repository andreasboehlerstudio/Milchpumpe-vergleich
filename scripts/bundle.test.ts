import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, stat } from 'node:fs/promises';

test('production content and vendor code are separately cacheable without an oversized single JS chunk', async () => {
  const files = (await readdir('dist/assets')).filter(f => f.endsWith('.js'));
  for (const file of files) assert.ok((await stat(`dist/assets/${file}`)).size <= 500_000, `Oversized JavaScript chunk: ${file}`);
  assert.ok(files.some(f => f.startsWith('vendor-')), 'Vendor cache boundary missing');
  assert.ok(files.some(f => f.startsWith('catalogue-data-')), 'Catalogue data cache boundary missing');
});

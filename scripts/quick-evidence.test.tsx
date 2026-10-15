import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { EDITORIAL_GUIDES } from '../src/guides';

test('S12 Quick explains contradictory official noise and parts counts instead of selecting marketing values', () => {
  const guide = EDITORIAL_GUIDES.find(g => g.slug === 'momcozy-s12-pro-quick-unterschiede')!;
  assert.ok(guide.sources.some(s => s.url === 'https://support.momcozy.com/article/54304706850713'), 'Conflicting official specification source missing');
  const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
  for (const text of ['≤50', '46 dB', '5 Cleaning Parts', 'abweich']) assert.ok(html.includes(text), text);
  assert.ok(!html.includes('Waschbare Teile: laut Support fünf beim Vorgänger, vier bei Quick.'), 'Unqualified parts count should not be repeated in the checklist');
});

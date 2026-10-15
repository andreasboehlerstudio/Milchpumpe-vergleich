import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

test('an article purchase-check section does not collide with the injected decision entry', () => {
  const html = renderToStaticMarkup(<App initialPath="/ratgeber/hands-free-milchpumpe-kaufen/" />);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'Each fragment must resolve to exactly one element');
  assert.equal(ids.filter(id => id === 'kaufcheck').length, 1, 'Preserve the existing article fragment');
});

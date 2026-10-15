import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getStructuredData } from '../src/seo';

test('article structured data reflects visible source citations and named products', () => {
  const article = getStructuredData('/ratgeber/momcozy-m9-oder-s12-pro/')['@graph'].find(n => n['@type'] === 'Article')!;
  assert.ok(Array.isArray(article.citation) && article.citation.length >= 2);
  assert.ok(Array.isArray(article.about) && article.about.length === 2);
  assert.equal((article.about as {name:string}[])[0].name, 'Momcozy Mobile Flow M9');
  assert.equal(article.isAccessibleForFree, true);
  assert.ok(!('reviewRating' in article));
});

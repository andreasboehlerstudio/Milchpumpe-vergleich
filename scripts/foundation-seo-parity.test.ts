import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getRouteSeo, getStructuredData } from '../src/seo';
import { FOUNDATION_GUIDES } from '../src/foundation-guide-data';
import { GUIDE_ARTICLES } from '../src/data';

test('foundation visible research dates and citations match SEO and lightweight summaries', () => {
  for (const [slug, guide] of Object.entries(FOUNDATION_GUIDES)) {
    assert.ok(guide);
    const route = getRouteSeo(`/ratgeber/${slug}/`);
    assert.equal(route.dateModified, guide.updated);
    assert.equal(GUIDE_ARTICLES.find(item => item.slug === slug)?.updated, guide.updated);
    const article = getStructuredData(route.path)['@graph'].find(node => node['@type'] === 'Article')!;
    assert.equal(article.dateModified, guide.updated);
    assert.deepEqual(article.citation, guide.sources.map(source => source.url));
    assert.ok(!('datePublished' in article), 'Do not invent an original publication date');
  }
});

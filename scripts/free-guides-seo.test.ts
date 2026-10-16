import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getRouteSeo, getSitePages, getStructuredData } from '../src/seo';
import { FREE_GUIDES, FREE_GUIDES_HUB, FREE_GUIDES_HUB_HEADING, freeGuidePath } from '../src/free-guides-data';

test('all six direct-download routes are indexable regardless of every newsletter gate', () => {
  const pages = getSitePages({ formUrl: null, senderVerified: false, doubleOptInVerified: false, pdfDeliveryVerified: false, unsubscribeVerified: false, privacyNoticePublished: false });
  const paths = [FREE_GUIDES_HUB, ...FREE_GUIDES.map(freeGuidePath)];
  assert.equal(pages.filter(page => paths.includes(page.path)).length, 6);
  assert.equal(pages.filter(page => !paths.includes(page.path)).length, 50, 'all original routes remain');
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of paths) {
    const seo = getRouteSeo(path);
    assert.equal(seo.path, path);
    assert.ok(!seo.noindex, path);
    assert.equal(seo.heading, path === FREE_GUIDES_HUB ? FREE_GUIDES_HUB_HEADING : FREE_GUIDES.find(guide => freeGuidePath(guide) === path)!.heading);
    titles.add(seo.title); descriptions.add(seo.description);
    assert.match(seo.description, /ohne Anmeldung/);
  }
  assert.equal(titles.size, 6); assert.equal(descriptions.size, 6);
  assert.equal(getRouteSeo('/gratis-guides/unknown/').noindex, true);
});

test('the hub structured collection and breadcrumbs expose exactly five canonical guide URLs', () => {
  const graph = getStructuredData(FREE_GUIDES_HUB)['@graph'];
  assert.ok(graph.some(item => item['@type'] === 'CollectionPage'));
  const list = graph.find(item => item['@type'] === 'ItemList');
  assert.ok(list);
  assert.equal(list.numberOfItems, 5);
  assert.deepEqual((list.itemListElement as { url: string }[]).map(item => item.url), FREE_GUIDES.map(guide => `https://milchpumpe-vergleich.de${freeGuidePath(guide)}`));
  for (const guide of FREE_GUIDES) {
    const crumbs = getStructuredData(freeGuidePath(guide))['@graph'].find(item => item['@type'] === 'BreadcrumbList');
    assert.ok(crumbs);
    assert.equal((crumbs.itemListElement as { name: string }[])[1].name, FREE_GUIDES_HUB_HEADING);
  }
});

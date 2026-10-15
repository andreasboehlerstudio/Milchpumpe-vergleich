import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import rewrites from '../docs/problem-story-rewrites.json';
import { MILK_GUIDES } from '../src/milk-articles';

test('the three problem articles render their reviewed practical rewrites with preserved source mappings', () => {
  assert.equal(rewrites.length, 3);
  for (const rewrite of rewrites) {
    const guide = MILK_GUIDES.find(item => item.slug === rewrite.slug)!;
    assert.ok(guide, rewrite.slug);
    assert.equal(guide.lead, rewrite.lead, rewrite.slug);
    assert.equal(guide.description, rewrite.description, rewrite.slug);
    assert.deepEqual(guide.sections, rewrite.sections, rewrite.slug);
    assert.equal(guide.pinTitle, rewrite.pinTitle, rewrite.slug);
    assert.equal(guide.pinDescription, rewrite.pinDescription, rewrite.slug);
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
    assert.ok(html.includes(rewrite.sections[0].title), guide.slug);
    assert.ok(!/hier gibt es absichtlich|die eigentliche Frage ist nicht|Herstellerquellen belegen hier/i.test(html), guide.slug);
    for (const section of guide.sections) {
      assert.ok(section.sourceIndexes.every(index => Boolean(guide.sources[index]?.url)), `${guide.slug}/${section.id}`);
    }
  }
});

const stories = [
  ['muttermilch-beschriften-portionen-gefrierfach', 'medela-easy-pour-storage-bags'],
  ['muttermilch-arbeitsplatz-transport-kuehlkette', 'medela-cooler-bag'],
  ['reserve-pumpset-reinigen-trocknen-organisieren', 'philips-avent-scf149-00'],
] as const;

test('each focused problem article recommends one relevant product with a clearly marked affiliate destination', () => {
  for (const [slug, productId] of stories) {
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${slug}/`} />);
    assert.equal((html.match(/class="practical-product"/g) || []).length, 1, slug);
    assert.ok(html.includes(`id="produkt-${productId}"`), slug);
    const affiliateLinks = html.match(/<a\b[^>]*href="https:\/\/www\.amazon\.de\/[^>]+>/g) || [];
    assert.equal(affiliateLinks.length, 1, slug);
    assert.ok(affiliateLinks[0].includes('andreasboeh09-21'), slug);
    assert.ok(affiliateLinks[0].includes('rel="noopener sponsored"'), slug);
    assert.ok(html.includes('Werbung / Affiliate-Link'), slug);
    assert.ok(html.includes('Vorhandene Ausstattung'), slug);
    assert.ok(html.includes('id="quellen"'), slug);
  }
});

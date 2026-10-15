import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { getRouteSeo, getStructuredData } from '../src/seo';
import { GUIDE_ARTICLES } from '../src/data';
import plan from '../docs/longtail-intent-plan.json';
import drafts from '../docs/longtail-guides-draft.json';

test('the four planned long-tail intents remain distinct', () => {
  assert.equal(plan.newArticleIntents.length, 4);
  assert.equal(new Set(plan.newArticleIntents.map(item => item.slug)).size, plan.newArticleIntents.length);
});

for (const intent of plan.newArticleIntents) {
  test(`${intent.slug}: indexable complete route with exactly one relevant affiliate product`, () => {
    const path = `/ratgeber/${intent.slug}/`;
    const seo = getRouteSeo(path);
    assert.notEqual(seo.noindex, true, `${intent.slug}: route missing`);
    assert.equal(seo.path, path);
    const draft = drafts.find(item => item.slug === intent.slug)!;
    assert.equal(seo.description, draft.description);
    assert.equal(seo.heading, draft.title);
    assert.equal(GUIDE_ARTICLES.filter(item => getRouteSeo(`/ratgeber/${item.slug}/`).title === seo.title).length, 1, `${intent.slug}: duplicated search title`);
    const html = renderToStaticMarkup(<App initialPath={path} />);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, intent.slug);
    assert.equal((html.match(/class="practical-product"/g) || []).length, 1, intent.slug);
    assert.ok(html.includes(`id="produkt-${intent.primaryProductId}"`), intent.slug);
    const amazon = html.match(/<a\b[^>]*href="https:\/\/www\.amazon\.de\/[^>]+>/g) || [];
    assert.equal(amazon.length, 1, intent.slug);
    assert.ok(amazon[0].includes('andreasboeh09-21') && amazon[0].includes('rel="noopener sponsored"'), intent.slug);
    assert.ok(html.includes('Vorhandene Ausstattung'), intent.slug);
    assert.ok(html.includes('id="quellen"') && html.includes('Inhaltsverzeichnis'), intent.slug);
    for (const related of intent.existingRelatedSlugs) assert.ok(html.includes(`href="/ratgeber/${related}/"`), `${intent.slug}: related ${related}`);
    for (const section of draft.sections) {
      assert.ok(html.includes(`id="${section.id}"`) && html.includes(`href="#${section.id}"`), `${intent.slug}: section/TOC ${section.id}`);
    }
    for (const source of draft.sources) assert.ok(html.includes(`href="${source.url.replaceAll('&', '&amp;')}"`), `${intent.slug}: visible source ${source.url}`);
    const schema = getStructuredData(path)['@graph'].find(item => item['@type'] === 'Article') as any;
    assert.ok(schema && schema.citation.length >= 2, intent.slug);
    assert.deepEqual(schema.citation, draft.sources.map(source => source.url), `${intent.slug}: schema/visible citation mismatch`);
    assert.equal(schema.about.length, 1, intent.slug);
    assert.ok(schema.about[0].url.includes(intent.primaryProductId), `${intent.slug}: schema focus mismatch`);
    assert.ok(GUIDE_ARTICLES.some(item => item.slug === intent.slug), `${intent.slug}: absent from library`);
  });
}

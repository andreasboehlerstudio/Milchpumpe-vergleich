import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import guides from '../src/milk-guides.json';
import drafts from '../docs/longtail-guides-draft.json';
import plan from '../docs/longtail-intent-plan.json';
import evidence from '../docs/longtail-guide-evidence.json';
import integration from '../docs/longtail-integration.json';
import cleaning from '../src/catalogue-cleaning.json';
import storage from '../src/catalogue-storage.json';
import { PROBLEM_PRODUCT_FOCUS } from '../src/problem-product-focus';
import { GUIDE_SEARCH_TITLES } from '../src/search-intents';

const catalogue = [...cleaning, ...storage];
const textOf = (guide: typeof drafts[number]) => [guide.lead, ...guide.sections.flatMap(s => [s.title, ...s.paragraphs, ...('bullets' in s ? s.bullets : [])]), ...guide.faqs.flatMap(f => [f.question, f.answer])].join(' ');

test('reviewed long-tail drafts are integrated without losing text or local source indexes', () => {
  assert.deepEqual(drafts.map(g => g.slug).sort(), plan.newArticleIntents.map(g => g.slug).sort());
  assert.equal(new Set(guides.map(g => g.slug)).size, guides.length);
  for (const draft of drafts) {
    const guide = guides.find(g => g.slug === draft.slug);
    assert.ok(guide, `${draft.slug}: draft not integrated`);
    const intent = plan.newArticleIntents.find(g => g.slug === draft.slug)!;
    assert.deepEqual(guide, { ...draft, relatedSlugs: [...new Set([...intent.existingRelatedSlugs, ...draft.relatedSlugs])] }, draft.slug);
    assert.deepEqual(draft.productNames.length, 1, draft.slug);
    assert.equal(draft.primaryProductId, intent.primaryProductId, draft.slug);
    assert.ok(catalogue.some(p => p.id === draft.primaryProductId), draft.primaryProductId);
    assert.deepEqual(PROBLEM_PRODUCT_FOCUS[draft.slug], { productId: draft.primaryProductId, existingAlternative: draft.existingAlternative });
    assert.ok(GUIDE_SEARCH_TITLES[draft.slug], `${draft.slug}: no focused search title`);
    assert.ok(textOf(draft).split(/\s+/).length >= 650, `${draft.slug}: practical detail missing`);
    assert.equal(new Set(draft.sections.map(s => s.id)).size, draft.sections.length);
    for (const section of draft.sections) {
      assert.match(section.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(section.paragraphs.length && section.sourceIndexes.length, `${draft.slug}/${section.id}`);
      for (const index of section.sourceIndexes) {
        assert.ok(Number.isInteger(index) && index >= 0 && index < draft.sources.length, `${draft.slug}/${section.id}: source ${index}`);
      }
    }
    assert.equal(new Set(draft.sources.map(s => s.url)).size, draft.sources.length);
    for (const source of draft.sources) {
      assert.equal(new URL(source.url).protocol, 'https:');
      assert.ok(evidence.sources.some(s => s.url === source.url && s.httpStatus === 200), `${draft.slug}: source absent from retrieved evidence`);
    }
    const ledger = evidence.articles.find(a => a.slug === draft.slug)!;
    assert.equal(ledger.primaryProductId, draft.primaryProductId);
    for (const fact of ledger.facts) {
      assert.equal(draft.sources[fact.sourceIndex]?.url, fact.url, `${draft.slug}: fact source mismatch`);
      assert.ok(fact.quote.trim(), `${draft.slug}: missing evidence quote`);
      assert.ok(evidence.sources.some(s => s.ledgerId === fact.ledgerId && s.url === fact.url));
      for (const id of fact.sectionIds) {
        const section = draft.sections.find(s => s.id === id);
        assert.ok(section, `${draft.slug}: missing evidence section ${id}`);
        assert.ok(section.sourceIndexes.includes(fact.sourceIndex), `${draft.slug}/${id}: fact source not visible`);
      }
    }
  }
});

test('existing articles retain every original field and source index', () => {
  for (const saved of integration.preservation.existingArticles) {
    const guide = guides.find(g => g.slug === saved.slug);
    assert.ok(guide, `${saved.slug}: prior article removed`);
    assert.equal(createHash('sha256').update(JSON.stringify(guide)).digest('hex'), saved.sha256, `${saved.slug}: prior article changed`);
  }
  const priorFocus = {
    'muttermilch-beschriften-portionen-gefrierfach': 'medela-easy-pour-storage-bags',
    'muttermilch-arbeitsplatz-transport-kuehlkette': 'medela-cooler-bag',
    'reserve-pumpset-reinigen-trocknen-organisieren': 'philips-avent-scf149-00',
  };
  for (const [slug, productId] of Object.entries(priorFocus)) assert.equal(PROBLEM_PRODUCT_FOCUS[slug]?.productId, productId, slug);
});

test('reviewed advice keeps model, hygiene and medical safety boundaries', () => {
  const brush = textOf(drafts.find(g => g.primaryProductId === 'mam-soft-brush')!);
  assert.match(brush, /bürste keine dünne Membran/);
  assert.match(brush, /untersagt ausdrücklich das Abkochen/);
  assert.match(brush, /Motor, Ladeanschluss und Kabel gehören nicht ins Spülbad/);
  const kita = textOf(drafts.find(g => g.slug === 'muttermilch-kita-mitgeben')!);
  assert.match(kita, /keine verbindliche Vorgabe für deutsche Kitas/);
  assert.match(kita, /kein eindeutiges Volumen pro Becher/);
  assert.match(kita, /Hunger- und Sättigungssignalen/);
  const bottles = textOf(drafts.find(g => g.primaryProductId === 'medela-muttermilchflaschen')!);
  assert.match(bottles, /150 ml im Dreierpack und 250 ml im Zweierpack/);
  assert.match(bottles, /keine belastbare Bestätigung eines direkten Flaschenanschlusses/);
  const bags = textOf(drafts.find(g => g.primaryProductId === 'medela-quick-clean-microwave-bags')!);
  assert.match(bags, /60 ml Wasser/);
  assert.match(bags, /maximal 20 Mal/);
  assert.match(bags, /Schläuche dürfen ausdrücklich nicht hinein/);
  assert.match(bags, /1100W\+ als auch 800–1100W/);
  assert.match(bags, /Zwischen 750 und 800 Watt/);
  assert.match(bags, /keine eindeutige allgemeine Zeittabelle/);
  assert.match(bags, /Wasser und Dampf können Verbrennungen verursachen/);
  assert.doesNotMatch(drafts.map(textOf).join(' '), /(?:wir|ich) (?:haben|habe) (?:getestet|ausprobiert)|Testsieger|garantiert schmerzfrei|heilt|steigert die Milchmenge/i);
});

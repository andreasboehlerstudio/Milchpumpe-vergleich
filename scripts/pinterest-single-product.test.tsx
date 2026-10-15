import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { EDITORIAL_GUIDES } from '../src/guides';
import { MILK_GUIDES } from '../src/milk-articles';
import { PRODUCTS, amazonUrl } from '../src/data';
import { PRODUCT_CATALOGUE } from '../src/product-catalogue';
import { catalogueAmazonUrl } from '../src/catalogue';
import { PROBLEM_PRODUCT_FOCUS } from '../src/problem-product-focus';

const queue = JSON.parse(readFileSync(new URL('../../imagegen-inbox/requests/pinterest-imagegen-queue.json', import.meta.url), 'utf8')) as { pins: { slug: string; primaryProductId: string }[] };

for (const pin of queue.pins) {
  test(`${pin.slug}: shows its specific reason and a useful no-purchase alternative`, () => {
    const focus = PROBLEM_PRODUCT_FOCUS[pin.slug] as { productId: string; whyItHelps?: string; noPurchaseAlternative?: string } | undefined;
    assert.ok(focus, 'A canonical focus must exist for every queued article');
    assert.ok(focus.whyItHelps && focus.whyItHelps.length > 40, 'Missing task-specific why-it-helps copy');
    assert.ok(focus.noPurchaseAlternative && focus.noPurchaseAlternative.length > 40, 'Missing useful no-purchase alternative');
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${pin.slug}/`} />);
    assert.ok(html.includes(escapeHtml(focus.whyItHelps)), 'Reason must be visible, not just integration metadata');
    assert.ok(html.includes(escapeHtml(focus.noPurchaseAlternative)), 'No-purchase path must be visible');
    const product = PRODUCT_CATALOGUE.find(product => product.id === focus.productId)!;
    for (const limit of product.limitations) assert.ok(html.includes(escapeHtml(limit)), `Lost product limit: ${limit}`);
    assert.ok(html.includes(`href="${escapeHtml(product.sourceUrl)}"`), 'Focus product has its manufacturer evidence');
  });
}

test('purchase guidance stays on the chosen product instead of recommending other pumps', () => {
  for (const [slug, outdated] of [
    ['hands-free-milchpumpe-kaufen', 'Für App-Steuerung kannst du die M9 prüfen; für separate Motoreinheit und transparente Cups kommen Freestyle Hands-free und SCF547/11 in Betracht.'],
    ['milchpumpe-app-datenschutz', 'Vergleiche M9, Elvie Pump Single und Freestyle Hands-free in den Produktkarten.'],
    ['milchpumpe-ersatzteile-ventile-membranen', 'Vergleiche dein Pumpenmodell in der Produktkarte über den Affiliate-Link.'],
  ]) {
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${slug}/`} />);
    assert.ok(!html.includes(escapeHtml(outdated)), `${slug}: old multi-product or wrong-product purchase direction`);
  }
  const buyerGuide = renderToStaticMarkup(<App initialPath="/ratgeber/hands-free-milchpumpe-kaufen/" />);
  assert.match(buyerGuide, /beste tragbare Milchpumpe/);
  assert.doesNotMatch(buyerGuide, /(?:M9 ist (?:der|die) Testsieger|garantiert mehr Milch)/i);
});

// An accessory question must not send a reader to a whole new pump.
const accessoryCorrections: Record<string, string> = {
  'milchpumpe-zubehoer-checkliste': 'philips-avent-scf149-00',
  'milchpumpe-ersatzteile-ventile-membranen': 'philips-avent-cp2203-01',
};
const escapeHtml = (value: string) => renderToStaticMarkup(<span>{value}</span>).replace(/^<span>|<\/span>$/g, '');

assert.equal(queue.pins.length, 20, 'The integration contract covers the entire queued batch');
assert.equal(new Set(queue.pins.map(pin => pin.slug)).size, 20, 'No duplicate article destinations');

for (const pin of queue.pins) {
  test(`${pin.slug}: one task-appropriate commercial identity, with honest Amazon destination`, () => {
    const expectedId = accessoryCorrections[pin.slug] ?? pin.primaryProductId;
    const catalogueProduct = PRODUCT_CATALOGUE.find(product => product.id === expectedId);
    assert.ok(catalogueProduct, `Unknown catalogue identity: ${expectedId}`);
    const pump = PRODUCTS.find(product => product.id === expectedId);
    const expectedUrl = pump ? amazonUrl(pump) : catalogueAmazonUrl(catalogueProduct);
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${pin.slug}/`} />);
    const links = [...html.matchAll(/<a\b([^>]*\bhref="(https:\/\/www\.amazon\.de\/[^\"]+)"[^>]*)>/g)];
    assert.ok(links.length > 0, 'A helpful product path is present');
    assert.deepEqual([...new Set(links.map(link => link[2]))], [escapeHtml(expectedUrl)], 'Every commercial CTA must resolve to the same exact product identity');
    for (const link of links) {
      assert.match(link[1], /rel="[^"]*\bsponsored\b/);
      assert.match(link[2], /tag=andreasboeh09-21(?:&amp;|$)/);
    }
    assert.match(html, /Werbehinweis:/);
    assert.match(html, /Affiliate-Link/);
    if (!catalogueProduct.amazonAsin) assert.match(html, /(?:Amazon suchen|Modelle suchen|Modellsuche)/, 'Unverified accessories remain labelled model searches, not invented ASINs');
    assert.equal((html.match(/class="(?:product-card|practical-product)"/g) || []).length, 1, 'One recommendation card, not a shopping list');
  });
}

for (const pin of queue.pins) {
  test(`${pin.slug}: keeps the substantive article and every original evidence citation`, () => {
    const guide = [...EDITORIAL_GUIDES, ...MILK_GUIDES].find(guide => guide.slug === pin.slug);
    assert.ok(guide);
    const html = renderToStaticMarkup(<App initialPath={`/ratgeber/${pin.slug}/`} />);
    const body = html.match(/<div class="article-body">([\s\S]*?)<\/div><section id="(?:modelle|produkte)"/)?.[1];
    assert.ok(body, 'Main article body must remain present');
    const originalLength = guide.sections.flatMap(section => [...section.paragraphs, ...(section.bullets ?? [])]).join(' ').length;
    const renderedLength = body.replace(/<[^>]*>/g, '').length;
    assert.ok(renderedLength >= originalLength * 0.95, `Main article was shortened: ${renderedLength}/${originalLength}`);
    for (const section of guide.sections) {
      assert.ok(body.includes(`id="${section.id}"`), section.id);
      assert.ok(body.includes(escapeHtml(section.title)), section.title);
      for (const [index, paragraph] of section.paragraphs.entries()) {
        const text = PROBLEM_PRODUCT_FOCUS[pin.slug]?.paragraphOverrides?.[section.id]?.[index] ?? paragraph;
        assert.ok(body.includes(escapeHtml(text)), `${section.id}: substantive paragraph ${index} lost`);
      }
      for (const bullet of section.bullets ?? []) assert.ok(body.includes(escapeHtml(bullet)), `${section.id}: bullet lost`);
      for (const index of section.sourceIndexes ?? []) {
        assert.ok(guide.sources[index]);
        assert.ok(body.includes(`href="${escapeHtml(guide.sources[index].url)}"`), `${section.id}: source ${index}`);
      }
    }
    for (const source of guide.sources) assert.ok(html.includes(`href="${escapeHtml(source.url)}"`), source.url);
    assert.match(html, /id="quellen"/);
    assert.match(html, /(?:Hebamme|Fachpersonal|Stillberatung|Laktationsberatung)/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(html, /ich habe (?:getestet|ausprobiert|benutzt)|in meinem Test|KI-generiert|AI-generated/i);
  });
}

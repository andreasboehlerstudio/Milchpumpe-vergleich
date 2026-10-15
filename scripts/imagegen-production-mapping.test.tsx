import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { PROBLEM_PRODUCT_FOCUS } from '../src/problem-product-focus';

const run = JSON.parse(readFileSync(new URL('../../imagegen-inbox/requests/pinterest-production-run.json', import.meta.url), 'utf8')) as {
  pins: { pinNumber: number; slug: string; articleDestination: string; primaryProductId: string }[];
};
const expectedTopics: Record<number, { slug: string; fragment?: string }> = {
  5: { slug: 'milchpumpe-fuer-unterwegs' },
  6: { slug: 'muttermilch-kita-mitgeben' },
  7: { slug: 'muttermilch-arbeitsplatz-transport-kuehlkette' },
  8: { slug: 'muttermilchbeutel-oder-mehrwegbecher' },
  9: { slug: 'milchpumpe-reinigen-ohne-spuelmaschine' },
  10: { slug: 'milchpumpe-zubehoer-checkliste' },
  12: { slug: 'milchpumpe-zubehoer-checkliste', fragment: 'groessen' },
};

test('all twenty produced pin topics land on corresponding advice with one sponsored commercial identity', () => {
  assert.equal(run.pins.length, 20);
  assert.equal(new Set(run.pins.map(pin => pin.pinNumber)).size, 20);
  for (const pin of run.pins) {
    const expected = expectedTopics[pin.pinNumber];
    if (expected) assert.equal(pin.slug, expected.slug, `Pin ${pin.pinNumber}: title topic must not inherit an unrelated planning-row destination`);
    const destination = new URL(pin.articleDestination);
    assert.equal(destination.pathname, `/ratgeber/${pin.slug}/`);
    if (expected?.fragment) assert.equal(destination.hash, `#${expected.fragment}`);
    const focus = PROBLEM_PRODUCT_FOCUS[pin.slug];
    assert.ok(focus, `Missing actual article focus: ${pin.slug}`);
    assert.equal(pin.primaryProductId, focus.productId, `${pin.slug}: derive the commercial identity from the canonical article focus`);
    const html = renderToStaticMarkup(<App initialPath={destination.pathname} />);
    const links = [...html.matchAll(/<a\b([^>]*\bhref="(https:\/\/www\.amazon\.de\/(?:dp|s)[^\"]*)"[^>]*)>/g)];
    assert.ok(links.length > 0, pin.slug);
    assert.equal(new Set(links.map(link => link[2])).size, 1, pin.slug);
    for (const link of links) {
      assert.match(link[1], /rel="[^"]*\bsponsored\b/);
      assert.match(link[2], /tag=andreasboeh09-21(?:&amp;|$)/);
    }
    if (expected?.fragment) assert.ok(html.includes(`id="${expected.fragment}"`), 'The sizing pin lands directly on the existing size/compatibility advice, not an unrelated product claim');
  }
});

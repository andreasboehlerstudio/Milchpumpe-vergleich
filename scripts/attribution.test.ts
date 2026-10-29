import { test } from 'node:test';
import assert from 'node:assert/strict';
import { trackAffiliateClick } from '../src/analytics';

test('affiliate measurement is consent-gated and distinguishes article and placement without sending query strings', () => {
  const events: unknown[][] = [];
  let consent = 'accepted';
  (globalThis as any).window = { gtag: (...args: unknown[]) => events.push(args), location: { origin: 'https://milchpumpe-vergleich.de', pathname: '/ratgeber/momcozy-m9-ohne-app/', search: '?email=private@example.invalid' } };
  (globalThis as any).localStorage = { getItem: (key: string) => key === 'mv-analytics-consent-v1' ? JSON.stringify({ value: consent, timestamp: Date.now() }) : null, removeItem: () => {} };
  try {
    (trackAffiliateClick as any)('Momcozy M9', 'momcozy-m9', 'intent_check');
    assert.equal(events.length, 1);
    const params = events[0][2] as any;
    assert.equal(params.article_slug, 'momcozy-m9-ohne-app');
    assert.equal(params.product_id, 'momcozy-m9');
    assert.equal(params.link_placement, 'intent_check');
    assert.ok(!JSON.stringify(params).includes('private@'));
    consent = 'declined';
    (trackAffiliateClick as any)('Momcozy M9', 'momcozy-m9', 'intent_check');
    assert.equal(events.length, 1, 'No event after consent revocation');
  } finally { delete (globalThis as any).window; delete (globalThis as any).localStorage; }
});

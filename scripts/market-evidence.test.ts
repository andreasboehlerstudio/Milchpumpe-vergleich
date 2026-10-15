import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const evidencePath = 'docs/wearable-market-reconciled.json';
test('the market export reconciles observed variants without marking the M9 unavailable from one offer', () => {
  assert.ok(fs.existsSync(evidencePath), 'Reconciled market export missing');
  const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
  assert.equal(evidence.rows.length, 35);
  assert.equal(evidence.counts['public-offer-observed'], 31);
  assert.equal(evidence.counts['not-found'], 4);
  const m9 = evidence.rows.find((row: any) => row.brand === 'Momcozy' && row.canonicalModel === 'Mobile Flow M9');
  assert.equal(m9.observedAsin, 'B0GX538F1R');
  assert.equal(m9.availabilityStatus, 'public-offer-observed');
  assert.equal(m9.originalBatchAvailabilityStatus, 'detail-found-offer-unverified');
  assert.ok(m9.additionalOfferObservations.some((offer: any) => offer.requestedAsin === 'B0GX538F1R'));
  assert.equal(new Set(evidence.rows.map((row: any) => `${row.brand}|${row.canonicalModel}`)).size, 35);
  for (const row of evidence.rows) {
    if (row.observedAsin) {
      assert.match(row.observedAsin, /^[A-Z0-9]{10}$/);
      assert.equal(new URL(row.affiliateUrl).searchParams.get('tag'), 'andreasboeh09-21');
    }
    assert.equal(row.qualityScore, null);
  }
  assert.equal(evidence.completeMarketCoverage, false);
});

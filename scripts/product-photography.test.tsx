import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const reportPath = new URL('../docs/product-photography-release.json', import.meta.url);

test('each requested exact model has a rights-backed release decision, never an assumed photo licence', () => {
  assert.ok(existsSync(reportPath), 'Missing actionable exact-product photography release report');
  const report = JSON.parse(readFileSync(reportPath, 'utf8'));
  const requiredIdentities = [
    ['momcozy-m9', 'Momcozy', 'Mobile Flow M9'],
    ['medela-freestyle', 'Medela', 'Freestyle Hands-free'],
    ['philips-avent-scf547', 'Philips Avent', 'SCF547/11 Hands-free'],
    ['momcozy-s12-pro', 'Momcozy', 'S12 Pro'],
    ['elvie-pump-single', 'Elvie', 'Pump Single'],
    ['haakaa-gen3', 'Haakaa', 'Generation 3 Silikon-Milchpumpe'],
    [null, 'Momcozy', 'M5 Smart'],
    [null, 'Momcozy', 'Air 1'],
    [null, 'eufy', 'S1 (T8D02)'],
  ];
  assert.equal(report.schemaVersion, 1);
  assert.deepEqual(report.targets.map((item: any) => [item.productId, item.brand, item.exactModel]), requiredIdentities);
  assert.equal(report.counts.targetModels, requiredIdentities.length);
  assert.equal(report.counts.clearedExactModels, report.targets.filter((item: any) => item.rightsEstablished).length);
  assert.equal(report.counts.acquiredPhotographs, report.assets.length);
  const sources = new Map(report.sources.map((item: any) => [item.id, item]));
  for (const target of report.targets) {
    assert.ok(target.generationExclusions.length > 0, `${target.exactModel}: generation guard missing`);
    assert.ok(target.evidenceSourceIds.length > 0, `${target.exactModel}: source missing`);
    for (const id of target.evidenceSourceIds) {
      const source: any = sources.get(id);
      assert.ok(source, `${target.exactModel}: unresolved source ${id}`);
      assert.ok(source.url.startsWith('https://'));
      assert.ok(source.retrievedAt && source.observation && source.licenceAssessment);
    }
    assert.ok(target.nextAction.contactUrl.startsWith('https://'));
    assert.ok(target.nextAction.request.includes(target.exactModel), 'Clearance request must name the exact model');
    if (!target.rightsEstablished) {
      assert.equal(target.assetId, null, `${target.exactModel}: an uncleared target must not resolve to an image`);
      assert.notEqual(target.status, 'CLEARED');
      assert.ok(target.blocker.length > 20);
    }
  }
  for (const asset of report.assets) {
    const target = report.targets.find((item: any) => item.assetId === asset.id);
    assert.ok(target?.rightsEstablished, 'No unrelated or unlicensed fallback photo');
    assert.equal(asset.exactModel, target.exactModel);
    assert.ok(asset.licenceEvidence && asset.creator && asset.sourceUrl);
    assert.equal(asset.authorizedUses.commercialAffiliateWebsite, true);
    assert.ok(asset.width > 0 && asset.height > 0);
    assert.match(asset.sha256, /^[a-f0-9]{64}$/);
    assert.ok(asset.publicPath.startsWith('/product-photos/'));
    assert.ok(existsSync(new URL(`../public${asset.publicPath}`, import.meta.url)));
  }
  if (report.assets.length === 0) {
    assert.equal(report.releaseStatus, 'BLOCKED_NO_CLEARED_EXACT_PHOTOS');
    assert.equal(report.componentImplemented, false, 'An empty registry is not a working photo component');
  }
  assert.equal(report.commonsDocumentaryAssessment.exactProductIdentity, null);
  assert.equal(report.commonsDocumentaryAssessment.approvedForExactProductSlots, false);
  assert.equal(report.commonsDocumentaryAssessment.brandObserved, 'elvie');
  assert.ok(report.commonsDocumentaryAssessment.reason.includes('model'));
  assert.ok(report.clearanceRequestTemplate.includes('milchpumpe-vergleich.de'));
  assert.ok(report.clearanceRequestTemplate.includes('Amazon'));
  assert.ok(report.clearanceRequestTemplate.includes('self-host'));
});

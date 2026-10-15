import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getRouteSeo } from '../src/seo';

test('commercial comparison titles lead with the real query rather than a generic long suffix', () => {
  assert.equal(getRouteSeo('/ratgeber/momcozy-m9-oder-s12-pro/').title, 'Momcozy M9 vs. S12 Pro: Unterschiede & Kaufhilfe');
  assert.equal(getRouteSeo('/ratgeber/medela-freestyle-oder-philips-avent/').title, 'Medela Freestyle vs. Philips Avent SCF547/11');
});

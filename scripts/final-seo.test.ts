import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getStructuredData, getRouteSeo } from '../src/seo';

test('catalogue breadcrumb names the real catalogue rather than the six-pump comparison', () => {
  const crumbs = getStructuredData('/produkte/')['@graph'].find(g => g['@type'] === 'BreadcrumbList') as any;
  assert.equal(crumbs.itemListElement.at(-1).item, 'https://milchpumpe-vergleich.de/produkte/');
  assert.equal(crumbs.itemListElement.at(-1).name, getRouteSeo('/produkte/').heading);
});

test('milk guide search titles lead with their single practical intent', () => {
  assert.equal(getRouteSeo('/ratgeber/muttermilchbeutel-oder-mehrwegbecher/').title, 'Muttermilchbeutel oder Becher? Einweg & Mehrweg');
  assert.equal(getRouteSeo('/ratgeber/muttermilch-arbeitsplatz-transport-kuehlkette/').title, 'Muttermilch transportieren: Kühlkette vom Arbeitsplatz');
});

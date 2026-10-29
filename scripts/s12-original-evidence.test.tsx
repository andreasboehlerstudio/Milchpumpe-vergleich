import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { BUYING_GUIDES } from '../src/buying-guides';
import { BuyingGuidePage } from '../src/article';

const manualUrl = 'https://cdn.shopify.com/s/files/1/0559/2321/2486/files/momcozy_S12_Pro_User_Manual-US.pdf?v=1743470937';
const germanQuickGuideUrl = 'https://cdn.shopify.com/s/files/1/0559/2321/2486/files/Momcozy-S12pro_User_Guide-DE.pdf?v=1741161422';
const archivedHubUrl = 'https://web.archive.org/web/20250802222430/https://momcozy.com/pages/momcozy-breast-pump-user-guide-your-comfort-our-priority';
const guide = BUYING_GUIDES.find(item => item.slug === 'momcozy-m9-oder-s12-pro')!;

function renderedSection(id: string) {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(<BuyingGuidePage guide={guide} />);
  const section = window.document.querySelector(`.article-body section#${id}`);
  assert.ok(section, `Missing rendered section ${id}`);
  return section;
}

test('original S12 Pro evidence identifies its US manual separately from the German quick guide and Quick generation', () => {
  assert.ok(guide.sources.some(source => source.url === manualUrl), 'Missing verified original S12 Pro manufacturer PDF');
  assert.ok(guide.sources.some(source => source.url === germanQuickGuideUrl && /Kurz|Quick.?Start/i.test(source.label)), 'German one-page guide must not be labelled a full manual');
  assert.ok(guide.sources.some(source => source.url === archivedHubUrl && /2025-08-02/.test(source.label)), 'Archive discovery needs its snapshot date');
  assert.equal(guide.updated, '2026-10-29');
  const section = renderedSection('original-anleitung');
  assert.match(section.textContent, /Modellnummer „S12 Pro“/);
  assert.match(section.textContent, /US[\s\S]*englisch/i);
  assert.match(section.textContent, /deutsche Kurz[\s\S]*ersetzt nicht/);
  assert.match(section.textContent, /deutschen Händler[\s\S]*Lieferumfang/);
  for (const url of [manualUrl, germanQuickGuideUrl, archivedHubUrl]) {
    assert.ok(Array.from(section.querySelectorAll('a')).some(link => link.getAttribute('href') === url), `Evidence must be linked beside its scope: ${url}`);
  }
});

test('S12 Pro fit evidence distinguishes the documented 24-mm flange from unverified set extras', () => {
  const section = renderedSection('passform');
  assert.match(section.textContent, /S12.Pro[\s\S]*24.mm[\s\S]*Silikonflansch/);
  assert.match(section.textContent, /zusätzliche Einsätze[\s\S]*konkreten Set/);
  assert.ok(Array.from(section.querySelectorAll('a')).some(link => link.getAttribute('href') === `${manualUrl}#page=19`));
});

test('original S12 Pro cleaning names the per-cup parts and does not substitute Quick quick-clean claims', () => {
  const section = renderedSection('reinigung-und-ersatzteile');
  assert.match(section.textContent, /fünf[\s\S]*Flansch[\s\S]*Linker[\s\S]*Membran[\s\S]*Ventil[\s\S]*Milchauffangbehälter/);
  assert.match(section.textContent, /Handreinigung/);
  assert.match(section.textContent, /Spülmaschine[\s\S]*nicht validiert/);
  assert.match(section.textContent, /Motor[\s\S]*Kabel[\s\S]*Netzteil[\s\S]*nicht ins Wasser/);
  assert.ok(Array.from(section.querySelectorAll('a')).some(link => link.getAttribute('href') === `${manualUrl}#page=13`));
  const data = guide.sections.find(item => item.id === 'reinigung-und-ersatzteile')!;
  assert.ok(!data.sourceIndexes?.some(index => /quick/i.test(guide.sources[index].url)), 'Original cleaning instructions cannot rely on a Quick page');
  assert.doesNotMatch(section.textContent, /weniger Teile|schneller[e]? Reinigung|3-Schritt|3.step quick.clean/i);
});

test('purchase checklist separates original cup volume and manual pump option from the offered set', () => {
  const section = renderedSection('entscheidung');
  const checklist = Array.from(section.querySelectorAll('li')).map(item => item.textContent).join(' ');
  assert.match(checklist, /180 ml[\s\S]*120 ml/);
  assert.match(checklist, /Single pumping[\s\S]*kein Nachweis[\s\S]*Single[\s\S]*Double/);
  assert.ok(Array.from(section.querySelectorAll('a')).some(link => link.getAttribute('href') === manualUrl));
  const boundary = renderedSection('generation-pruefen').textContent;
  assert.match(boundary, /Angaben zu Quick[\s\S]*werden nicht auf den Vorgänger übertragen/);
  const body = guide.sections.flatMap(item => [...item.paragraphs, ...(item.bullets ?? [])]).join(' ');
  assert.doesNotMatch(body, /210\s*ml|46\s*dB|3.step quick.clean/i, 'Quick numeric/cleaning specifications must not become original S12 Pro facts');
});

test('S12 Pro operation is supported by its original manual rather than transferred from Quick', () => {
  const section = renderedSection('bedienung');
  assert.match(section.textContent, /ursprüngliche S12 Pro[\s\S]*drei Modi[\s\S]*Stimulation[\s\S]*Expression[\s\S]*Mischmodus/);
  assert.match(section.textContent, /jeweils neun Saugstufen/);
  assert.match(section.textContent, /nicht während des Ladens/);
  assert.ok(Array.from(section.querySelectorAll('a')).some(link => link.getAttribute('href') === `${manualUrl}#page=25`), 'Operational evidence must link to PDF page 25 (printed page 23)');
  const data = guide.sections.find(item => item.id === 'bedienung')!;
  assert.ok(!data.sourceIndexes?.some(index => /quick/i.test(guide.sources[index].url)), 'Quick FAQ cannot supply original operation evidence');
  assert.match(section.textContent, /kein Nachweis für mehr Milch/);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { NewsletterLandingPage } from '../src/newsletter-landing';

test('the public descriptor points to the byte-exact original PDF, with no private-master dependency', async () => {
  const publicPdf = new URL('../public/downloads/dein-milchpumpen-kaufcheck.pdf', import.meta.url);
  assert.ok(existsSync(publicPdf), 'The actual original PDF must ship in public/downloads');
  const bytes = readFileSync(publicPdf);
  const expectedHash = 'ecadb2d398414cbd152c3cffd843c9be588d26af3f58acedffab8abbb9abbd99';
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedHash);
  assert.equal(bytes.length, 184473);
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
  assert.ok(existsSync(new URL('../src/newsletter-downloads.ts', import.meta.url)), 'Public download descriptor must exist');
  const { purchaseCheckDownload } = await import('../src/newsletter-downloads');
  assert.equal(purchaseCheckDownload.href, '/downloads/dein-milchpumpen-kaufcheck.pdf');
  assert.equal(purchaseCheckDownload.filename, 'dein-milchpumpen-kaufcheck.pdf');
  assert.equal(purchaseCheckDownload.pages, 8);
  assert.equal(purchaseCheckDownload.textFields, 16);
  assert.equal(purchaseCheckDownload.bytes, bytes.length);
  assert.equal(purchaseCheckDownload.sha256, expectedHash);
  assert.doesNotMatch(JSON.stringify(purchaseCheckDownload), /private[\\/]|[A-Z]:[\\/]/i);
  const link = render().querySelector('a[download]');
  assert.equal(link?.getAttribute('href'), purchaseCheckDownload.href);
  assert.equal(link?.getAttribute('download'), purchaseCheckDownload.filename);
});

test('newsletter conditions offer an optional DOI welcome, never exclusive access to the public PDF', () => {
  const doc = render();
  const conditions = doc.querySelector('.nl-terms')?.textContent ?? '';
  assert.match(conditions, /optional/i);
  assert.match(conditions, /PDF.*ohne Anmeldung/);
  assert.match(conditions, /Willkommensgeschenk/);
  assert.match(conditions, /E-Mail-Adresse bestätigst.*Double-Opt-in/);
  assert.match(conditions, /bis zu zwei E-Mails im Monat/);
  assert.match(conditions, /gelegentlichen Produktempfehlungen/);
  assert.match(conditions, /Jederzeit abmeldbar/);
  assert.doesNotMatch(conditions, /exklusiv|nur wenn|nur für Abonnenten/i);
});

test('direct download has a scoped full-size CTA, not a small legal-text link', () => {
  const doc = render();
  const style = doc.createElement('style');
  style.textContent = readFileSync(new URL('../src/newsletter-landing.css', import.meta.url), 'utf8');
  doc.head.append(style);
  const link = doc.querySelector('a[download]');
  assert.ok(link);
  const computed = doc.defaultView!.getComputedStyle(link);
  assert.equal(computed.display, 'flex');
  assert.ok(parseFloat(computed.minHeight) >= 64, 'Direct download needs the same generous target as newsletter');
  assert.equal(computed.textDecoration, 'none');
  assert.match(style.textContent, /\.newsletter-landing \.nl-download-cta\s*\{/);
});

function render(formSlot?: ReturnType<typeof createElement>) {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(createElement(NewsletterLandingPage, { formSlot }));
  return window.document;
}

test('the original 8-page PDF is directly downloadable before newsletter conditions, including when signup is inactive', () => {
  for (const formSlot of [undefined, createElement('div', { 'data-provider-slot': true }, 'Caller form')]) {
    const doc = render(formSlot);
    const link = doc.querySelector('a[download]');
    assert.ok(link, 'A prominent direct PDF download must exist without newsletter readiness');
    assert.equal(link.getAttribute('href'), '/downloads/dein-milchpumpen-kaufcheck.pdf');
    assert.equal(link.getAttribute('download'), 'dein-milchpumpen-kaufcheck.pdf');
    assert.match(link.textContent, /Kaufcheck.*herunterladen/);
    assert.match(link.closest('section')?.textContent ?? '', /8 Seiten.*PDF/);
    assert.match(link.closest('section')?.textContent ?? '', /ohne Anmeldung/i);
    assert.equal(link.closest('form,fieldset'), null, 'Download must not require email or consent');
    assert.equal(link.hasAttribute('aria-disabled'), false);
    const conditions = doc.querySelector('.nl-terms');
    assert.ok(conditions);
    assert.ok(link.compareDocumentPosition(conditions) & 4, 'Download comes before newsletter conditions');
    assert.equal(doc.querySelectorAll('a[download]').length, 1);
  }
});

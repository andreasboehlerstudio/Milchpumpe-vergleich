import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';

async function renderLanding(props = {}) {
  assert.ok(existsSync(new URL('../src/newsletter-landing.tsx', import.meta.url)), 'NewsletterLandingPage must exist');
  const { NewsletterLandingPage } = await import('../src/newsletter-landing');
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(createElement(NewsletterLandingPage, props));
  return window.document;
}

test('landing preserves approved copy and defaults to an explicitly inactive, non-collecting state', async () => {
  const doc = await renderLanding();
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelector('h1')?.textContent, 'Kauf noch keine Milchpumpe, bevor du das geprüft hast.');
  assert.ok(doc.body.textContent.includes('Der ausfüllbare Kaufcheck hilft dir, Bauart, Größe und Lieferumfang vor dem Kauf zu sortieren.'));
  assert.match(doc.querySelector('[role="status"]')?.textContent ?? '', /Anmeldung noch nicht verfügbar/);
  assert.equal(doc.querySelectorAll('form,input,button,iframe,script').length, 0);
  assert.equal(doc.querySelectorAll('a[href$=".pdf"][download]').length, 1, 'Public PDF remains independent of inactive signup');
});

test('caller-supplied form renders exactly once with readable newsletter conditions and privacy link', async () => {
  const doc = await renderLanding({ formSlot: createElement('div', { 'data-verified-provider-slot': true }, 'Verified provider form supplied by caller') });
  assert.equal(doc.querySelectorAll('[data-verified-provider-slot]').length, 1);
  assert.equal(doc.querySelector('[role="status"]'), null);
  assert.match(doc.body.textContent, /Willkommensgeschenk/);
  assert.match(doc.body.textContent, /E-Mail-Adresse bestätigst/);
  assert.match(doc.body.textContent, /bis zu zwei E-Mails im Monat/);
  assert.match(doc.body.textContent, /gelegentlichen Produktempfehlungen/);
  assert.match(doc.body.textContent, /Jederzeit abmeldbar/);
  assert.ok(doc.querySelector('a[href="/datenschutz/#newsletter"]'));
  assert.equal(doc.querySelectorAll('script,iframe,form').length, 0);
});

test('the dominant document preview retains the real local WebP, source identity and cover/inside-page caption', async () => {
  const doc = await renderLanding();
  const image = doc.querySelector('figure img');
  assert.ok(image, 'Actual document artwork must be present');
  assert.equal(image.getAttribute('src'), '/newsletter-assets/kaufcheck-preview.webp');
  assert.match(image.getAttribute('alt') ?? '', /Titelseite.*Kaufzettel/);
  assert.equal(image.getAttribute('width'), '1800');
  assert.equal(image.getAttribute('height'), '2040');
  assert.match(doc.querySelector('figcaption')?.textContent ?? '', /Titelseite.*Seite 7/);
  const bytes = readFileSync(new URL('../public/newsletter-assets/kaufcheck-preview.webp', import.meta.url));
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
});

test('standalone SSR preview has one disabled email, unchecked consent and disabled CTA with no network-capable form or external resources', async () => {
  assert.ok(existsSync(new URL('../tools/newsletter-landing/render-preview.tsx', import.meta.url)), 'Reproducible SSR preview renderer must exist');
  const { renderNewsletterPreview } = await import('../tools/newsletter-landing/render-preview');
  const window = new Window();
  window.document.write(renderNewsletterPreview());
  const doc = window.document;
  assert.match(doc.querySelector('aside')?.textContent ?? '', /Designvorschau.*keine Anmeldung/);
  assert.equal(doc.querySelectorAll('input[type="email"]').length, 1);
  assert.ok(doc.querySelector('fieldset[disabled]'));
  assert.equal(doc.querySelector('input[type="checkbox"]')?.hasAttribute('checked'), false);
  assert.equal(doc.querySelectorAll('button[disabled]').length, 1);
  assert.match(doc.querySelector('button')?.textContent ?? '', /Newsletter abonnieren/);
  assert.equal(doc.querySelectorAll('form,script,iframe,[action]').length, 0);
  assert.doesNotMatch(doc.documentElement.outerHTML, /https?:\/\/|@import/);
  assert.match(doc.querySelector('style')?.textContent ?? '', /font-weight:\s*300 800/);
  assert.match(doc.querySelector('style')?.textContent ?? '', /\/fonts\/manrope-latin.woff2/);
  assert.match(doc.querySelector('style')?.textContent ?? '', /focus-visible/);
});

test('isolated loopback preview serves only the preview, fonts and promotional raster, never private PDF or POST', async () => {
  assert.ok(existsSync(new URL('../tools/newsletter-landing/serve-preview.mjs', import.meta.url)), 'Private preview needs an allowlisted isolated server');
  const { createNewsletterPreviewServer } = await import('../tools/newsletter-landing/serve-preview.mjs');
  const { renderNewsletterPreview } = await import('../tools/newsletter-landing/render-preview');
  const server = createNewsletterPreviewServer({ html: renderNewsletterPreview().replace('<body>', '<body data-isolated-test="true">') });
  await new Promise<void>(done => server.listen(0, '127.0.0.1', done));
  try {
    const address = server.address();
    assert.ok(address && typeof address !== 'string');
    const base = `http://127.0.0.1:${address.port}`;
    const documentResponse = await fetch(base);
    assert.equal(documentResponse.status, 200);
    assert.match(await documentResponse.text(), /data-isolated-test="true"/);
    assert.equal((await fetch(`${base}/fonts/manrope-latin.woff2`)).status, 200);
    const image = await fetch(`${base}/newsletter-assets/kaufcheck-preview.webp`);
    assert.equal(image.headers.get('content-type'), 'image/webp');
    for (const path of ['/private/newsletter-guide/dein-milchpumpen-kaufcheck.pdf', '/package.json', '/src/newsletter-config.ts', '/newsletter-assets/../newsletter-config.ts']) {
      assert.equal((await fetch(base + path)).status, 404, path);
    }
    assert.equal((await fetch(base, { method: 'POST', body: 'email=not-collected' })).status, 405);
  } finally {
    await new Promise<void>((done, reject) => server.close(error => error ? reject(error) : done()));
  }
});

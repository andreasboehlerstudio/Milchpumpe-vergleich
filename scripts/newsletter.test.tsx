import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';

test('newsletter signup stays unavailable until every delivery prerequisite has been verified', async () => {
  const moduleUrl = new URL('../src/newsletter-config.ts', import.meta.url);
  assert.ok(existsSync(moduleUrl), 'A fail-closed newsletter connection contract must exist');
  const { NEWSLETTER_CONNECTION, isNewsletterReady } = await import('../src/newsletter-config');
  assert.equal(isNewsletterReady(NEWSLETTER_CONNECTION), false, 'No Brevo account or real end-to-end delivery has been connected yet');
  const fixture = { formUrl: 'https://unit-test.sibforms.com/serve/controlled-test-only', senderVerified: true, doubleOptInVerified: true, pdfDeliveryVerified: true, unsubscribeVerified: true, privacyNoticePublished: true };
  assert.equal(isNewsletterReady(fixture), true);
  for (const key of ['senderVerified', 'doubleOptInVerified', 'pdfDeliveryVerified', 'unsubscribeVerified', 'privacyNoticePublished'] as const) {
    assert.equal(isNewsletterReady({ ...fixture, [key]: false }), false, key);
  }
  for (const formUrl of [null, '', 'http://unit-test.sibforms.com/serve/test', 'https://sibforms.com.evil.invalid/serve/test', 'javascript:alert(1)', 'https://unit-test.sibforms.com/not-a-form', 'https://user:pass@unit-test.sibforms.com/serve/test']) {
    assert.equal(isNewsletterReady({ ...fixture, formUrl }), false, String(formUrl));
  }
});

test('newsletter presentation never collects addresses before connection and links to the owned landing afterwards', async () => {
  const moduleUrl = new URL('../src/newsletter.tsx', import.meta.url);
  assert.ok(existsSync(moduleUrl), 'The newsletter needs a privacy-preserving, connection-gated presentation');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { createElement } = await import('react');
  const { NewsletterSignup } = await import('../src/newsletter');
  const disconnected = { formUrl: null, senderVerified: false, doubleOptInVerified: false, pdfDeliveryVerified: false, unsubscribeVerified: false, privacyNoticePublished: false };
  assert.equal(renderToStaticMarkup(createElement(NewsletterSignup, { connection: disconnected })), '');
  const verifiedFixture = { formUrl: 'https://unit-test.sibforms.com/serve/controlled-test-only', senderVerified: true, doubleOptInVerified: true, pdfDeliveryVerified: true, unsubscribeVerified: true, privacyNoticePublished: true };
  const html = renderToStaticMarkup(createElement(NewsletterSignup, { connection: verifiedFixture }));
  assert.match(html, /Newsletter abonnieren/);
  assert.match(html, /E-Mail-Adresse bestätigst/);
  assert.match(html, /bis zu zwei E-Mails im Monat/);
  assert.match(html, /href="\/datenschutz\/#newsletter"/);
  assert.match(html, /href="\/kaufcheck\/"/);
  assert.doesNotMatch(html, /sibforms\.com/);
  assert.doesNotMatch(html, /<iframe|<script|<input|<form|role="dialog"|data-hermes-send/);
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToString } from 'react-dom/server';
import { Window } from 'happy-dom';
import App from '../src/App';
import { routeFamily } from '../src/route-family';
import { loadRoute } from '../src/route-loader';
import { RouteView } from '../src/route-view';
import { NewsletterSignup } from '../src/newsletter';
import { NEWSLETTER_CONNECTION } from '../src/newsletter-config';

test('kaufcheck is a separate synchronous rendering family with the approved standalone composition', async () => {
  assert.equal(routeFamily('/kaufcheck?source=test#form'), 'newsletter');
  const Page = await loadRoute('/kaufcheck/');
  const server = renderToString(<App initialPath="/kaufcheck/" />);
  assert.equal(renderToString(<RouteView initialPath="/kaufcheck/" Page={Page} />), server);
  const window = new Window();
  window.document.body.innerHTML = server;
  const doc = window.document;
  assert.equal(doc.querySelectorAll('header').length, 1);
  assert.equal(doc.querySelectorAll('main').length, 1);
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelector('h1')?.textContent, 'Kauf noch keine Milchpumpe, bevor du das geprüft hast.');
  assert.ok(doc.querySelector('.newsletter-landing'));
  assert.equal(doc.querySelector('.editorial-home,.site-header,.foot,.site-footer'), null);
  assert.equal(doc.querySelectorAll('form,input,iframe,script').length, 0);
  assert.match(doc.querySelector('[role="status"]')?.textContent ?? '', /Anmeldung noch nicht verfügbar/);
  assert.equal(doc.querySelector('.nl-back')?.getAttribute('href'), '/ratgeber/');
  await window.happyDOM.close();
});

test('acquisition stays hidden by default and verified compact signup links to the owned landing, not a bare provider', () => {
  assert.equal(renderToString(<NewsletterSignup />), '');
  const connection = { formUrl: 'https://unit-test.sibforms.com/serve/controlled-test-only', senderVerified: true, doubleOptInVerified: true, pdfDeliveryVerified: true, unsubscribeVerified: true, privacyNoticePublished: true };
  const html = renderToString(<NewsletterSignup connection={connection} compact />);
  assert.match(html, /newsletter-signup--compact/);
  assert.match(html, /href="\/kaufcheck\/"/);
  assert.doesNotMatch(html, /sibforms\.com|<form|<input|<iframe/);
  for (const text of ['Willkommensgeschenk', 'E-Mail-Adresse bestätigst', 'bis zu zwei E-Mails im Monat', 'gelegentlichen Produktempfehlungen', 'Jederzeit abmeldbar']) assert.ok(html.includes(text), text);
  assert.match(html, /href="\/datenschutz\/#newsletter"/);
  for (const key of ['senderVerified', 'doubleOptInVerified', 'pdfDeliveryVerified', 'unsubscribeVerified', 'privacyNoticePublished'] as const) {
    assert.equal(renderToString(<NewsletterSignup connection={{ ...connection, [key]: false }} />), '', key);
  }
  assert.deepEqual(NEWSLETTER_CONNECTION, { formUrl: null, senderVerified: false, doubleOptInVerified: false, pdfDeliveryVerified: false, unsubscribeVerified: false, privacyNoticePublished: false });
});

test('newsletter SEO is correct locally but publication remains gated while preserving 50 original pages and six independent direct-guide pages', async () => {
  const seo = await import('../src/seo');
  const local = seo.getRouteSeo('/kaufcheck?local=1');
  assert.equal(local.path, '/kaufcheck/');
  assert.match(local.title, /Kaufcheck/);
  assert.equal(local.heading, 'Kauf noch keine Milchpumpe, bevor du das geprüft hast.');
  assert.equal(local.noindex, true);
  assert.match(local.description, /Newsletter/);
  assert.equal(typeof seo.getSitePages, 'function');
  assert.equal(seo.ROUTES.length, 56);
  assert.equal(seo.ROUTES.filter(route => !route.path.startsWith('/gratis-guides/')).length, 50);
  assert.equal(seo.ROUTES.filter(route => route.path.startsWith('/gratis-guides/')).length, 6);
  assert.deepEqual(seo.getSitePages(), seo.ROUTES);
  assert.ok(!seo.getSitePages().some(route => route.path === '/kaufcheck/'));
  const connection = { formUrl: 'https://unit-test.sibforms.com/serve/controlled-test-only', senderVerified: true, doubleOptInVerified: true, pdfDeliveryVerified: true, unsubscribeVerified: true, privacyNoticePublished: true };
  const readyPages = seo.getSitePages(connection);
  assert.equal(readyPages.length, 57);
  assert.deepEqual(readyPages.filter(route => route.path !== '/kaufcheck/'), seo.ROUTES);
  assert.equal(readyPages.find(route => route.path === '/kaufcheck/')?.noindex, false);
  assert.equal(seo.getRouteSeo('/kaufcheck/', connection).noindex, false);
  for (const key of ['senderVerified', 'doubleOptInVerified', 'pdfDeliveryVerified', 'unsubscribeVerified', 'privacyNoticePublished'] as const) {
    assert.deepEqual(seo.getSitePages({ ...connection, [key]: false }), seo.ROUTES, key);
    assert.equal(seo.getRouteSeo('/kaufcheck/', { ...connection, [key]: false }).noindex, true, key);
  }
  for (const { path } of seo.ROUTES) {
    const html = renderToString(<App initialPath={path} />);
    assert.doesNotMatch(html, /href="\/kaufcheck\/"|newsletter-signup|Newsletter abonnieren/, path);
  }
});

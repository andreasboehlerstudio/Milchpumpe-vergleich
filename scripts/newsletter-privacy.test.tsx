import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { PrivacyPage } from '../src/route-legal-pages';
import { NEWSLETTER_CONNECTION, isNewsletterReady } from '../src/newsletter-config';
import { NewsletterProviderForm } from '../src/newsletter-provider-form';

function privacyDocument() {
  const window = new Window({ settings: { disableCSSFileLoading: true, disableJavaScriptFileLoading: true, enableFileSystemHttpRequests: false } });
  window.document.body.innerHTML = renderToStaticMarkup(<PrivacyPage />);
  return window.document;
}

test('provider disclosure uses current German TOU entity and qualified third-country safeguards, not account-contract claims', () => {
  const section = privacyDocument().querySelector('section#newsletter')!;
  const text = section.textContent ?? '';
  for (const fact of [/Auftragsverarbeiter/, /Brevo GmbH/, /Köpenicker Str\. 126, 10179 Berlin/, /für Nutzer in Deutschland/i, /OVH/, /Google Cloud Platform/, /Cloudflare/, /Zendesk/, /außerhalb des Europäischen Wirtschaftsraums/, /USA/, /Standardvertragsklauseln/, /ergänzende.*Maßnahmen/, /EU-US Data Privacy Framework/, /Voraussetzungen/, /Kopie.*Garantien/s]) assert.match(text, fact);
  const urls = [...section.querySelectorAll('a')].map(link => link.getAttribute('href'));
  assert.ok(urls.includes('https://www.brevo.com/legal/termsofuse/#appendix-3-data-processing-agreement-dpa'));
  assert.ok(urls.includes('https://www.brevo.com/legal/privacypolicy/'));
  assert.doesNotMatch(text, /106 boulevard|Haussmann|Vertrag.*(?:unterzeichnet|abgeschlossen)|DSGVO-zertifiziert|ausschließlich.*(?:EU|Europa)|EU-only/i);
});

test('legal hierarchy is current while collection remains explicitly fail-closed', () => {
  const doc = privacyDocument();
  assert.deepEqual([...doc.querySelectorAll('article > section > h2')].map(h => Number(h.textContent?.match(/^\d+/)?.[0])), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.match(doc.querySelector('.legal-review-note')?.textContent ?? '', /16\. Oktober 2026/);
  assert.match(doc.querySelector('article > section')?.textContent ?? '', /Andreas Böhler, Am Mühlbach 14, 79114 Freiburg/);
  assert.equal(isNewsletterReady(NEWSLETTER_CONNECTION), false);
  assert.equal(NEWSLETTER_CONNECTION.formUrl, null);
  for (const [key, value] of Object.entries(NEWSLETTER_CONNECTION)) if (key !== 'formUrl') assert.equal(value, false, key);
  assert.doesNotMatch(renderToStaticMarkup(<NewsletterProviderForm />), /<form|<input|action=|sibforms\.com/);
});

test('newsletter privacy anchor explains optional consent, own-site submission and the independent full PDF', () => {
  const doc = privacyDocument();
  assert.equal(doc.querySelectorAll('#newsletter').length, 1, 'The existing privacy links need exactly one real destination');
  const section = doc.querySelector('section#newsletter')!;
  assert.match(section.querySelector('h2')?.textContent ?? '', /Newsletter und PDF/);
  const text = section.textContent ?? '';
  for (const fact of [/freiwillig/, /vollständigen PDF-Guides.*ohne.*E-Mail/s, /Formular auf unserer Website/, /ausdrücklichen Einwilligung.*POST.*Brevo/s, /bis zu zwei E-Mails im Monat/, /Pumpenauswahl/, /Abpumpalltag/, /gelegentliche Produktempfehlungen/, /Double-Opt-in/, /Erst nach.*Bestätigung/s, /achtseitigen Kaufcheck als PDF-Anhang/, /Art\. 6 Abs\. 1 lit\. a DSGVO/]) assert.match(text, fact);
  assert.ok(section.querySelector('a[href="/downloads/dein-milchpumpen-kaufcheck.pdf"]'), 'Same full original must remain accessible without registration');
  assert.equal(section.querySelectorAll('form,input,iframe,script,img').length, 0, 'A privacy notice never starts collection or loads provider resources');
  assert.doesNotMatch(text, /von Brevo gehostete[sr]? Formular|fünf.*(?:Mail|E-Mail)|5.*(?:Mail|E-Mail)|exklusiv/i);
});

test('notice covers technical data, purpose-based retention, local PDF notes and independent withdrawal', () => {
  const section = privacyDocument().querySelector('section#newsletter')!;
  const text = section.textContent ?? '';
  for (const fact of [/IP-Adresse/, /Zeitpunkte.*Anmeldung.*Bestätigung/s, /Einwilligungswortlaut/, /Versand- und Zustellstatus/, /Art\. 6 Abs\. 1 lit\. c DSGVO.*Art\. 7 Abs\. 1 DSGVO/s, /Art\. 6 Abs\. 1 lit\. f DSGVO/, /unbestätigte Anmeldungen/i, /Abonnements/, /Nachweis.*Rechtsansprüche/s, /Sperrinformation/, /jederzeit.*Abmeldelink/s, /Rechtmäßigkeit.*Widerruf.*unberührt/s, /PDF.*lokal.*nicht.*Brevo/s, /Website-Analytics.*unabhängig/s, /keine Einwilligung.*Öffnungen.*Klicks/s]) assert.match(text, fact);
  assert.ok(section.querySelector('a[href="mailto:admin@andreasboehler.com"]'), 'The owner must be a withdrawal alternative, not only Brevo');
  assert.doesNotMatch(text, /nach \d+ Tagen|automatisch gelöscht|sofort.*(?:alle|sämtliche).*gelöscht|keine Öffnungspixel|kein Klicktracking|trackingfrei|Tracking.*(?:geprüft|offen|Audit)|MIME|Freigabe|QA/i, 'No invented retention implementation, tracking proof or private release commentary');
});

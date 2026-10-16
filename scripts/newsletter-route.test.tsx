import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import Newsletter from '../src/route-newsletter';
import { NEWSLETTER_PROVIDER_CONTRACT } from '../src/newsletter-provider-contract';
import type { NewsletterConnection } from '../src/newsletter-config';

// Explicitly simulated readiness for component tests, not delivery evidence.
const verifiedFixture: NewsletterConnection = {
  formUrl: NEWSLETTER_PROVIDER_CONTRACT.form.action,
  senderVerified: true,
  doubleOptInVerified: true,
  pdfDeliveryVerified: true,
  unsubscribeVerified: true,
  privacyNoticePublished: true,
};
const expectedConsent = 'Ja, ich möchte den Newsletter von Andreas Böhler (Milchpumpe-Vergleich.de) mit Tipps zur Pumpenauswahl und zum Abpumpalltag sowie gelegentlichen Produktempfehlungen erhalten – bis zu zwei E-Mails im Monat. Nach Bestätigung meiner E-Mail-Adresse bekomme ich den achtseitigen Kaufcheck als PDF-Anhang. Ich kann mich jederzeit über den Abmeldelink oder per E-Mail an admin@andreasboehler.com wieder abmelden. Mehr zum Versand mit Brevo und zum Widerruf: Datenschutz zur Anmeldung.';

test('fully verified route supplies the reviewed exact consent to the hydrated-only provider form alongside direct download', () => {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(<Newsletter connection={verifiedFixture} />);
  const document=window.document;
  assert.equal(document.querySelectorAll('form.nl-provider-form').length,1);
  assert.equal(document.querySelector('.nl-consent span')?.textContent, expectedConsent);
  assert.equal(document.querySelector('.nl-consent a')?.getAttribute('href'),'/datenschutz/#newsletter');
  assert.ok(document.querySelector('fieldset[disabled]'));
  assert.ok(document.querySelector('a[download][href="/downloads/dein-milchpumpen-kaufcheck.pdf"]'));
  assert.equal(document.querySelector('form')?.getAttribute('action'),verifiedFixture.formUrl);
  window.close();
});

test('a different provider form identity cannot inherit this component delivery verification', () => {
  const window=new Window();
  const otherForm=new URL('/serve/different-test-form',verifiedFixture.formUrl!).href;
  window.document.body.innerHTML=renderToStaticMarkup(<Newsletter connection={{...verifiedFixture,formUrl:otherForm}} />);
  assert.equal(window.document.querySelectorAll('form').length,0);
  assert.ok(window.document.querySelector('a[download][href="/downloads/dein-milchpumpen-kaufcheck.pdf"]'));
  window.close();
});

test('every missing launch prerequisite leaves the original full PDF independent and collecting inputs absent', () => {
  const cases: NewsletterConnection[] = [
    {...verifiedFixture,formUrl:null},
    ...(['senderVerified','doubleOptInVerified','pdfDeliveryVerified','unsubscribeVerified','privacyNoticePublished'] as const).map(key=>({...verifiedFixture,[key]:false})),
  ];
  for(const connection of cases){
    const window=new Window();
    window.document.body.innerHTML=renderToStaticMarkup(<Newsletter connection={connection}/>);
    assert.equal(window.document.querySelectorAll('form,input').length,0);
    assert.ok(window.document.querySelector('a[download][href="/downloads/dein-milchpumpen-kaufcheck.pdf"]'));
    window.close();
  }
  const window=new Window();
  window.document.body.innerHTML=renderToStaticMarkup(<Newsletter/>);
  assert.equal(window.document.querySelectorAll('form,input').length,0);
  window.close();
});

import { NewsletterLandingPage } from './newsletter-landing';
import { NewsletterProviderForm } from './newsletter-provider-form';
import { NEWSLETTER_PROVIDER_CONTRACT } from './newsletter-provider-contract';
import { NEWSLETTER_CONNECTION, isNewsletterReady, type NewsletterConnection } from './newsletter-config';

export const NEWSLETTER_CONSENT_VERSION = '2026-10-16-v1';
export const NEWSLETTER_CONSENT_TEXT = 'Ja, ich möchte den Newsletter von Andreas Böhler (Milchpumpe-Vergleich.de) mit Tipps zur Pumpenauswahl und zum Abpumpalltag sowie gelegentlichen Produktempfehlungen erhalten – bis zu zwei E-Mails im Monat. Nach Bestätigung meiner E-Mail-Adresse bekomme ich den achtseitigen Kaufcheck als PDF-Anhang. Ich kann mich jederzeit über den Abmeldelink oder per E-Mail an admin@andreasboehler.com wieder abmelden. Mehr zum Versand mit Brevo und zum Widerruf: Datenschutz zur Anmeldung.';
const linkLabel = 'Datenschutz zur Anmeldung';

/** Live collection remains absent until all independently verified launch gates are met. */
export default function Newsletter({ connection = NEWSLETTER_CONNECTION }: { path?: string; connection?: NewsletterConnection } = {}) {
  const ready = isNewsletterReady(connection) && connection.formUrl === NEWSLETTER_PROVIDER_CONTRACT.form.action;
  const consent = <>{NEWSLETTER_CONSENT_TEXT.slice(0, -(linkLabel.length + 1))}<a href="/datenschutz/#newsletter">{linkLabel}</a>.</>;
  return <NewsletterLandingPage formSlot={ready ? <NewsletterProviderForm enabled consent={consent} /> : undefined} />;
}

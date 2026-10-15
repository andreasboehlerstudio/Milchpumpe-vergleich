import { ArrowUpRight, Check } from 'lucide-react';
import { NEWSLETTER_CONNECTION, isNewsletterReady, type NewsletterConnection } from './newsletter-config';

export function NewsletterSignup({ connection = NEWSLETTER_CONNECTION, compact = false }: { connection?: NewsletterConnection; compact?: boolean }) {
  if (!isNewsletterReady(connection)) return null;
  return <section className={`section newsletter-signup${compact ? ' newsletter-signup--compact' : ''}`} aria-labelledby="newsletter-heading" id="kaufcheck">
    <div className="newsletter-signup__paper" aria-hidden="true"><span>Milchpumpe-Vergleich.de</span><p>Dein<br />Milchpumpen-<br /><em>Kaufcheck.</em></p><div><i /><i /><i /></div><small>Dein Alltag. Dein Set. Deine Entscheidung.</small></div>
    <div className="newsletter-signup__copy"><p className="eyebrow">Dein kostenloser PDF-Kaufcheck</p><h2 id="newsletter-heading">Erst dein Alltag.<br /><em>Dann deine Pumpe.</em></h2><p>Welche Bauart passt zu dir? Was gehört wirklich ins Set? Halte deine Antworten im Kaufcheck fest – ausfüllbar am Bildschirm oder auf Papier.</p>
      <ul><li><Check size={18} aria-hidden="true" />Alltagscheck und Bauarten verständlich einordnen</li><li><Check size={18} aria-hidden="true" />Größen, Lieferumfang und Zubehör prüfen</li><li><Check size={18} aria-hidden="true" />Deinen persönlichen Kaufzettel ausfüllen</li></ul>
      <p className="newsletter-signup__terms">Den Guide erhältst du als Willkommensgeschenk, wenn du den Newsletter abonnierst und deine E-Mail-Adresse bestätigst. Zum Start kommt dein Kaufcheck, danach bis zu zwei E-Mails im Monat mit Tipps und gelegentlichen Produktempfehlungen. Jederzeit abmeldbar.</p>
      <a className="button button--primary" href={connection.formUrl!} rel="noopener noreferrer">Newsletter abonnieren &amp; PDF erhalten <ArrowUpRight size={18} aria-hidden="true" /></a>
      <p className="newsletter-signup__privacy">Die Anmeldung öffnet unser Formular bei Brevo. Auf dieser Seite erfassen wir keine E-Mail-Adresse. <a href="/datenschutz/#newsletter">Datenschutz zur Anmeldung</a></p>
    </div>
  </section>;
}

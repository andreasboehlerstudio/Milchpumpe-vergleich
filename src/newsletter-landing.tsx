import type { ReactNode } from 'react';
import { purchaseCheckDownload } from './newsletter-downloads';

export type NewsletterLandingPageProps = { formSlot?: ReactNode };

/** Presentation only. The caller owns verification and the actual provider form. */
export function NewsletterLandingPage({ formSlot }: NewsletterLandingPageProps) {
  return <div className="newsletter-landing">
    <header className="nl-header"><a className="nl-brand" href="/">Milchpumpe<span>–Vergleich.de</span></a><a className="nl-back" href="/ratgeber/">Zum Magazin <span aria-hidden="true">↗</span></a></header>
    <main className="nl-composition" aria-labelledby="nl-heading">
      <div className="nl-intro"><p className="nl-eyebrow">DEIN KAUFCHECK · ZUM AUSFÜLLEN</p>
        <h1 id="nl-heading">Kauf noch keine Milchpumpe, <span>bevor du das geprüft hast.</span></h1>
        <p className="nl-lead">Der ausfüllbare Kaufcheck hilft dir, Bauart, Größe und Lieferumfang vor dem Kauf zu sortieren.</p>
      </div>
      <figure className="nl-document">
        <div className="nl-document-stage"><span className="nl-paper-note">Erst sortieren.<br />Dann entscheiden.</span><img src="/newsletter-assets/kaufcheck-preview.webp" width="1800" height="2040" fetchPriority="high" alt="Titelseite des Milchpumpen-Kaufchecks und der ausfüllbare persönliche Kaufzettel auf Seite 7" /></div>
        <figcaption><span>Ein Blick in deinen Kaufcheck</span><span>Titelseite &amp; Seite 7 · 8 Seiten PDF</span></figcaption>
      </figure>
      <section className="nl-form-area" aria-label="Kaufcheck herunterladen und optionaler Newsletter">
        <a className="nl-download-cta" href={purchaseCheckDownload.href} download={purchaseCheckDownload.filename}><span>Kaufcheck herunterladen</span><span aria-hidden="true">↓</span></a>
        <p className="nl-download-note">8 Seiten · ausfüllbares PDF · kostenlos und ohne Anmeldung</p>
        <p className="nl-terms">Das PDF kannst du jederzeit ohne Anmeldung herunterladen. Optional kannst du den Newsletter abonnieren: Wenn du deine E-Mail-Adresse bestätigst (Double-Opt-in), erhältst du den Kaufcheck als Willkommensgeschenk auch per E-Mail. Danach kommen bis zu zwei E-Mails im Monat mit Tipps und gelegentlichen Produktempfehlungen. Jederzeit abmeldbar.</p>
        <div className="nl-form-slot">{formSlot ?? <p role="status" className="nl-inactive">Anmeldung noch nicht verfügbar. Hier kannst du dich erst anmelden, wenn das Formular und der Versand geprüft sind.</p>}</div>
        <p className="nl-privacy"><a href="/datenschutz/#newsletter">Datenschutz zur Anmeldung</a></p>
      </section>
    </main>
  </div>;
}

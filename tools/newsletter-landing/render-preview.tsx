import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { NewsletterLandingPage } from '../../src/newsletter-landing';

const root = fileURLToPath(new URL('../../', import.meta.url));

/** Preview fixture only: disabled controls, no form, no submission handler. */
export function renderNewsletterPreview({ inactive = false }: { inactive?: boolean } = {}) {
  const css = readFileSync(resolve(root, 'src/newsletter-landing.css'), 'utf8');
  const formSlot = <fieldset className="nl-controls" disabled aria-label="Inaktive Formularvorschau">
    <label className="nl-email-label" htmlFor="nl-preview-email">Deine E-Mail-Adresse</label>
    <input className="nl-email" type="email" id="nl-preview-email" placeholder="du@beispiel.de" autoComplete="off" />
    <label className="nl-consent" htmlFor="nl-preview-consent"><input type="checkbox" id="nl-preview-consent" /><span>Ich möchte den Newsletter mit Tipps und gelegentlichen Produktempfehlungen erhalten. Ich kann meine Einwilligung jederzeit widerrufen.</span></label>
    <button className="nl-cta" type="button" disabled><span>Newsletter abonnieren &amp; PDF erhalten</span><span aria-hidden="true">↗</span></button>
  </fieldset>;
  const body = renderToStaticMarkup(<><aside className="preview-notice">Designvorschau · keine Anmeldung möglich · kein Versand</aside><NewsletterLandingPage formSlot={inactive ? undefined : formSlot} /></>);
  return `<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Kaufcheck – lokale Designvorschau</title><style>html{color-scheme:light}body{margin:0}.preview-notice{padding:10px 22px;background:#233c37;color:#fff9ee;text-align:center;font:400 12px/1.65 Manrope,system-ui,sans-serif;letter-spacing:.025em}${css}</style></head><body>${body}</body></html>`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const directory = resolve(root, 'private/newsletter-landing');
  mkdirSync(directory, { recursive: true });
  for (const [name, inactive] of [['index.html', false], ['inactive.html', true]] as const) {
    const target = resolve(directory, name);
    writeFileSync(target, renderNewsletterPreview({ inactive }));
    console.log(`Rendered ${target}`);
  }
}

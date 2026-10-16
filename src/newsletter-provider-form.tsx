import { Children, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { NEWSLETTER_PROVIDER_CONTRACT } from './newsletter-provider-contract';

const UNCERTAIN_MESSAGE = 'Wir konnten die Antwort nicht sicher bestätigen. Deine Anfrage wurde möglicherweise bereits verarbeitet. Bitte prüfe dein Postfach und den Spam-Ordner, bevor du es erneut versuchst.';

export type NewsletterProviderFormProps = {
  enabled?: boolean;
  /** Supplied/reviewed by the caller; this component does not choose legal copy. */
  consent?: ReactNode;
};

/** Caller owns every launch/delivery prerequisite; no requests until explicit submission. */
export function NewsletterProviderForm({ enabled = false, consent }: NewsletterProviderFormProps = {}) {
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<{ kind: 'idle' | 'sending' | 'accepted' | 'validation' | 'uncertain'; message: string }>({ kind: 'idle', message: '' });
  const blocked = useRef(false);
  const emailInput = useRef<HTMLInputElement>(null);
  useEffect(() => { setReady(true); }, []);
  useEffect(() => { if (result.kind === 'validation') emailInput.current?.focus(); }, [result]);
  const hasConsent = Children.toArray(consent).some(node => typeof node === 'string' ? node.trim().length > 0 : true);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || enabled !== true || !hasConsent || blocked.current) return;
    const element = event.currentTarget;
    if (!element.reportValidity()) return;
    const data = new FormData(element);
    const body = new URLSearchParams();
    for (const input of NEWSLETTER_PROVIDER_CONTRACT.inputs) body.append(input.name, String(data.get(input.name) ?? ''));
    blocked.current = true;
    setResult({ kind: 'sending', message: 'Deine Anfrage wird gesendet …' });
    let accepted = false;
    try {
      const response = await fetch(NEWSLETTER_PROVIDER_CONTRACT.form.action, { method: 'POST', body, credentials: 'omit', mode: 'cors' });
      if (!['basic', 'cors', 'default'].includes(response.type)) throw new Error('Unreadable provider response');
      const payload = await response.json();
      if (response.ok && payload?.success === true && typeof payload.message === 'string' && payload.message.trim()) {
        accepted = true;
        setResult({ kind: 'accepted', message: payload.message });
      } else if (response.status === 400 && payload?.success === false && typeof payload.errors?.EMAIL === 'string' && payload.errors.EMAIL.trim()) {
        setResult({ kind: 'validation', message: `Bitte überprüfe deine E-Mail-Adresse. ${payload.errors.EMAIL}` });
      } else {
        setResult({ kind: 'uncertain', message: UNCERTAIN_MESSAGE });
      }
    } catch {
      setResult({ kind: 'uncertain', message: UNCERTAIN_MESSAGE });
    } finally {
      blocked.current = accepted;
    }
  }

  if (enabled !== true || !hasConsent) return <p role="status" className="nl-inactive">Anmeldung noch nicht verfügbar. Hier kannst du dich erst anmelden, wenn das Formular und der Versand geprüft sind.</p>;

  const { form, inputs: [email, optIn, honeypot, locale, htmlType] } = NEWSLETTER_PROVIDER_CONTRACT;
  const locked = !ready || result.kind === 'sending' || result.kind === 'accepted';
  return <form className="nl-provider-form" id={form.id} method={form.method} action={form.action} onSubmit={submit} aria-busy={result.kind === 'sending'}>
    <fieldset className="nl-controls" disabled={locked}>
      <label className="nl-email-label" htmlFor={email.id}>Deine E-Mail-Adresse</label>
      <input ref={emailInput} className="nl-email" type="email" id={email.id} name={email.name} autoComplete={email.autoComplete} defaultValue={email.value} required={email.required} placeholder="E-Mail-Adresse" aria-describedby={`${form.id}-status`} aria-invalid={result.kind === 'validation' || undefined} />
      <label className="nl-consent" htmlFor={optIn.id}>
        <input type={optIn.type} id={optIn.id} name={optIn.name} value={optIn.value} defaultChecked={optIn.checked} required={optIn.required} />
        <span>{consent}</span>
      </label>
      <button className="nl-cta" type="submit" disabled={locked}><span>{result.kind === 'sending' ? 'Anfrage wird gesendet …' : result.kind === 'accepted' ? 'Bitte Postfach prüfen' : 'Newsletter abonnieren'}</span><span aria-hidden="true">→</span></button>
    </fieldset>
    <p className="nl-provider-status" id={`${form.id}-status`} role="status" aria-live="polite" aria-atomic="true">{result.message}</p>
    <noscript>Für die Newsletter-Anmeldung bitte JavaScript aktivieren. Den direkten PDF-Download kannst du ohne Newsletter-Anmeldung nutzen.</noscript>
    <p className="nl-provider-notice"><a href="/datenschutz/#newsletter">Datenschutz zur Anmeldung</a> · <a href="/impressum/">Impressum</a><br />Anmeldung und Versand über Brevo. <a href="https://www.brevo.com/de/legal/privacypolicy/" target="_blank" rel="nofollow noopener noreferrer">Datenschutzerklärung von Brevo</a>.</p>
    <div className="nl-provider-honeypot" hidden aria-hidden="true"><input type={honeypot.type} name={honeypot.name} defaultValue={honeypot.value} tabIndex={-1} /></div>
    <input type={locale.type} name={locale.name} value={locale.value} />
    <input type={htmlType.type} name={htmlType.name} value={htmlType.value} />
  </form>;
}

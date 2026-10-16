import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window, type HTMLInputElement } from 'happy-dom';

async function renderForm(props: { enabled?: boolean; consent?: ReactNode } = {}) {
  assert.ok(existsSync(new URL('../src/newsletter-provider-form.tsx', import.meta.url)), 'Fail-closed provider component must exist');
  const { NewsletterProviderForm } = await import('../src/newsletter-provider-form');
  const window = new Window({ settings: { disableCSSFileLoading: true, disableJavaScriptEvaluation: true, disableJavaScriptFileLoading: true, enableFileSystemHttpRequests: false } });
  window.document.body.innerHTML = renderToStaticMarkup(createElement(NewsletterProviderForm, props));
  return { window, doc: window.document };
}

test('default and explicit disabled states contain no collecting controls or submission endpoint', async () => {
  for (const props of [{}, { consent: 'Caller-reviewed consent' }, { enabled: false, consent: 'Caller-reviewed consent' }]) {
    const { doc } = await renderForm(props);
    assert.match(doc.querySelector('[role="status"]')?.textContent ?? '', /Anmeldung noch nicht verfügbar/);
    assert.equal(doc.querySelectorAll('form,input,button,textarea,select,[action],script,iframe').length, 0);
    assert.doesNotMatch(doc.body.innerHTML, /sibforms\.com/);
  }
});

test('explicit enablement with caller consent preserves exact POST controls and native validity behind the hydration lock', async () => {
  const { NEWSLETTER_PROVIDER_CONTRACT: contract } = await import('../src/newsletter-provider-contract');
  const consent = createElement('span', { 'data-caller-consent': true }, 'Caller-reviewed consent fixture, not publication wording.');
  const { window, doc } = await renderForm({ enabled: true, consent });
  const form = doc.querySelector('form');
  assert.ok(form, 'Explicit enablement must render the native provider form');
  assert.equal(doc.querySelectorAll('form').length, 1);
  assert.equal(form.id, contract.form.id);
  assert.equal(form.getAttribute('method'), 'POST');
  assert.equal(form.getAttribute('action'), contract.form.action);
  assert.equal(form.getAttribute('target'), contract.form.target);
  assert.equal(form.hasAttribute('novalidate'), false);
  assert.equal(form.hasAttribute('onsubmit'), false);
  assert.equal(form.getAttribute('enctype'), null, 'Preserve export omission; native browsers default to application/x-www-form-urlencoded');
  assert.deepEqual(Array.from(form.querySelectorAll('input')).map(input => [input.name, input.type, input.value]), contract.inputs.map(input => [input.name, input.name === 'EMAIL' ? 'email' : input.type, input.value]));
  const email = form.querySelector<HTMLInputElement>('input[name="EMAIL"]')!;
  assert.equal(email.id, 'EMAIL');
  assert.equal(email.required, true);
  assert.equal(email.autocomplete, 'off');
  assert.equal(doc.querySelector(`label[for="${email.id}"]`)?.textContent, 'Deine E-Mail-Adresse');
  assert.equal(doc.querySelectorAll('.nl-email').length, 1);
  const checkbox = form.querySelector<HTMLInputElement>('input[name="OPT_IN"]')!;
  assert.equal(checkbox.id, 'OPT_IN');
  assert.equal(checkbox.required, true);
  assert.equal(checkbox.checked, false);
  assert.ok(doc.querySelector('label[for="OPT_IN"] [data-caller-consent]'));
  assert.equal(doc.querySelectorAll('button').length, 1);
  assert.equal(doc.querySelector('button')?.type, 'submit');
  assert.equal(doc.querySelector('button')?.disabled, true);
  assert.match(doc.querySelector('button')?.textContent ?? '', /Newsletter abonnieren/);
  const fieldset = form.querySelector('fieldset')!;
  assert.equal(fieldset.disabled, true);
  fieldset.disabled = false; // Test successful-control/validity semantics, not readiness.
  assert.equal(form.checkValidity(), false);
  email.value = 'not-an-email';
  checkbox.checked = true;
  assert.equal(form.checkValidity(), false, 'Native email validation rejects malformed addresses');
  email.value = 'portable-test@example.invalid';
  checkbox.checked = false;
  assert.equal(form.checkValidity(), false, 'Consent is required, never prechecked');
  checkbox.checked = true;
  assert.equal(form.checkValidity(), true);
  assert.deepEqual(Array.from(new window.FormData(form).entries()), [
    ['EMAIL', 'portable-test@example.invalid'], ['OPT_IN', '1'], ['email_address_check', ''], ['locale', 'de'], ['html_type', 'simple'],
  ]);
  checkbox.checked = false;
  assert.equal(new window.FormData(form).has('OPT_IN'), false, 'Unchecked native checkbox remains omitted, not a synthesized false value');
});

test('enablement without usable caller consent remains fail-closed', async () => {
  for (const consent of [undefined, null, false, '', '   ', []]) {
    const { doc } = await renderForm({ enabled: true, consent });
    assert.ok(doc.querySelector('[role="status"]'), 'Missing consent must not open collection');
    assert.equal(doc.querySelectorAll('form,input,button,[action]').length, 0);
  }
});

test('honeypot stays invisible and nonfocusable without changing its successful-control semantics', async () => {
  const { window, doc } = await renderForm({ enabled: true, consent: 'Caller-reviewed consent fixture' });
  const input = doc.querySelector<HTMLInputElement>('input[name="email_address_check"]')!;
  assert.equal(input.type, 'text');
  assert.equal(input.value, '');
  assert.equal(input.tabIndex, -1);
  assert.ok(input.closest('[hidden][aria-hidden="true"]'));
  assert.equal(input.disabled, false);
  assert.equal(input.readOnly, false);
  assert.equal(input.required, false);
  input.value = 'bot-fixture';
  assert.equal(new window.FormData(doc.querySelector('form')!).get('email_address_check'), 'bot-fixture', 'Never blank or intercept provider honeypot data');
});

test('legal and provider notices use real links with safe external opener handling and no embedded resources', async () => {
  const { doc } = await renderForm({ enabled: true, consent: createElement('em', null, 'Caller-reviewed consent fixture') });
  assert.ok(doc.querySelector('a[href="/datenschutz/#newsletter"]'));
  assert.ok(doc.querySelector('a[href="/impressum/"]'));
  const provider = doc.querySelector('a[href="https://www.brevo.com/de/legal/privacypolicy/"]');
  assert.ok(provider);
  assert.match(doc.querySelector('.nl-provider-notice')?.textContent ?? '', /Brevo/);
  assert.equal(provider.getAttribute('target'), '_blank');
  assert.match(provider.getAttribute('rel') ?? '', /\bnoopener\b/);
  assert.equal(doc.querySelectorAll('script,iframe,link,img,video,audio,object,embed').length, 0);
});

test('scoped styling reuses V15 controls without remote dependencies or extra card surfaces', async () => {
  const cssUrl = new URL('../src/newsletter-provider-form.css', import.meta.url);
  assert.ok(existsSync(cssUrl), 'Scoped provider CSS must exist');
  const css = readFileSync(cssUrl, 'utf8');
  assert.match(css, /\.newsletter-landing \.nl-provider-form/);
  assert.match(css, /\.nl-provider-honeypot[^}]+display:\s*none/);
  assert.match(css, /\.nl-provider-notice[^}]+font-size:\s*13px/);
  assert.doesNotMatch(css, /@import|@font-face|url\(|https?:|box-shadow/);
  const source = readFileSync(new URL('../src/newsletter-provider-form.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /XMLHttpRequest|sendBeacon|localStorage|sessionStorage|document\.cookie/);
  assert.doesNotMatch(source, /import\s+['"].*\.css/);
});

test('SSR cannot natively submit to JSON before hydration and explains the independent PDF option without JavaScript', async () => {
  const { doc } = await renderForm({ enabled: true, consent: 'Caller-reviewed consent fixture' });
  assert.equal(doc.querySelector('button')?.disabled, true, 'No enabled native submit button before React hydration');
  assert.equal(doc.querySelector('fieldset')?.disabled, true, 'Disable implicit Enter submission as well as the button');
  assert.match(doc.querySelector('noscript')?.textContent ?? '', /JavaScript/);
  assert.match(doc.querySelector('noscript')?.textContent ?? '', /PDF.*ohne.*Newsletter/s);
});

test('submission feedback remains lightweight, scoped and wrapping without fixed height or clipping', () => {
  const css = readFileSync(new URL('../src/newsletter-provider-form.css', import.meta.url), 'utf8');
  const status = css.match(/\.newsletter-landing \.nl-provider-status\s*\{([^}]+)\}/)?.[1] ?? '';
  assert.match(status, /overflow-wrap:\s*anywhere/);
  assert.match(status, /min-width:\s*0/);
  assert.match(status, /font-weight:\s*400/);
  assert.match(status, /line-height:\s*1\.8/);
  assert.match(css, /\.newsletter-landing \.nl-provider-form \.nl-cta:disabled\s*\{[^}]*cursor:\s*not-allowed/);
  assert.doesNotMatch(css, /(?:^|[;{]\s*)(?:max-)?height\s*:|overflow\s*:\s*(?:hidden|clip)|white-space\s*:\s*nowrap/);
  const source = readFileSync(new URL('../src/newsletter-provider-form.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /dangerouslySetInnerHTML|setTimeout|setInterval|sendBeacon|localStorage|sessionStorage|document\.cookie|recaptcha|sibforms.*\.js/i);
});

// Public form identity, pinned from the actual simple HTML export; not an API key.
const observedAction = 'https://f71c3538.sibforms.com/serve/MUIFAIkkawjcPUoHZkFrnhKoYppPRifBLof4DgXSi-cLZicLvCXz4xUtYnkrY3oDH7W_NIExPWrDHUJ-di18QWbBeTc8Le1YNFm4sW17n3i1M6liMtZgxoALYDXF1SBytIPVZSM7DkWB0uCE2zUqgdsAYxNzkyBMRIBMnna-35Jsh9flbZ590I15oIaprJ4ZkFtVUOBDzAtD3Syj1A==';

test('versioned public contract preserves the observed native form identity and five input defaults', async () => {
  assert.ok(existsSync(new URL('../src/newsletter-provider-contract.ts', import.meta.url)), 'Public provider contract must exist independently of private exports');
  const { NEWSLETTER_PROVIDER_CONTRACT: contract } = await import('../src/newsletter-provider-contract');
  assert.equal(contract.version, 1);
  assert.equal(contract.formId, '6ad0df3f0accffc5587c5a5d');
  assert.deepEqual(contract.form, { id: 'sib-form', method: 'POST', action: observedAction, target: null });
  assert.deepEqual(contract.inputs, [
    { type: 'text', id: 'EMAIL', name: 'EMAIL', autoComplete: 'off', value: '', required: true },
    { type: 'checkbox', id: 'OPT_IN', name: 'OPT_IN', value: '1', required: true, checked: false },
    { type: 'text', name: 'email_address_check', value: '' },
    { type: 'hidden', name: 'locale', value: 'de' },
    { type: 'hidden', name: 'html_type', value: 'simple' },
  ]);
});

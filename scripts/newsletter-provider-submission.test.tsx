import assert from 'node:assert/strict';
import { test } from 'node:test';
import { act, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { Window, type HTMLFormElement, type HTMLInputElement } from 'happy-dom';
import { NewsletterProviderForm, type NewsletterProviderFormProps } from '../src/newsletter-provider-form';
import { NEWSLETTER_PROVIDER_CONTRACT } from '../src/newsletter-provider-contract';

// Network-boundary fixtures ONLY: no request leaves these tests, no delivery is claimed.
const fixtureConsent = 'Caller-reviewed test consent — not publication wording.';
async function withForm(fetchFixture: typeof fetch, run: (window: Window) => Promise<void>, props: NewsletterProviderFormProps = { enabled: true, consent: fixtureConsent }) {
  const window = new Window({ url: 'https://local-test.invalid/kaufcheck/?keep=1#newsletter', settings: { disableCSSFileLoading: true, disableJavaScriptFileLoading: true, enableFileSystemHttpRequests: false } });
  const previous = new Map<string, PropertyDescriptor | undefined>();
  const tree = <StrictMode><main><a href="/downloads/independent-test.pdf" download>PDF ohne Anmeldung</a><NewsletterProviderForm {...props} /></main></StrictMode>;
  window.document.body.innerHTML = `<div id="root">${renderToString(tree)}</div>`;
  for (const [key, value] of Object.entries({ window, document: window.document, HTMLElement: window.HTMLElement, Node: window.Node, Event: window.Event, FormData: window.FormData, fetch: fetchFixture, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  const errors: unknown[] = [];
  let root: ReturnType<typeof hydrateRoot> | undefined;
  try {
    await act(async () => { root = hydrateRoot(window.document.getElementById('root')! as unknown as HTMLElement, tree, { onRecoverableError: error => errors.push(error) }); });
    await run(window);
    assert.deepEqual(errors, [], 'Hydration must preserve the SSR tree without recoverable errors');
  } finally {
    await act(async () => root?.unmount());
    await window.happyDOM.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
}

function validInputs(window: Window) {
  const form = window.document.querySelector<HTMLFormElement>('form')!;
  form.querySelector<HTMLInputElement>('[name="EMAIL"]')!.value = 'synthetic-fixture@example.invalid';
  form.querySelector<HTMLInputElement>('[name="OPT_IN"]')!.checked = true;
  return form;
}
function submit(window: Window) {
  const event = new window.Event('submit', { bubbles: true, cancelable: true });
  window.document.querySelector('form')!.dispatchEvent(event);
  assert.equal(event.defaultPrevented, true, 'React must prevent provider JSON navigation on every submit');
}

test('mandatory email and explicit consent block requests even when submit is dispatched directly', async () => {
  let calls = 0;
  await withForm(async () => { calls++; throw new Error('Unexpected test request'); }, async window => {
    const form = window.document.querySelector<HTMLFormElement>('form')!;
    const email = form.querySelector<HTMLInputElement>('[name="EMAIL"]')!;
    const consent = form.querySelector<HTMLInputElement>('[name="OPT_IN"]')!;
    assert.equal(consent.checked, false);
    for (const [value, checked] of [['', false], ['', true], ['bad-address', true], ['fixture@example.invalid', false]] as const) {
      email.value = value;
      consent.checked = checked;
      await act(async () => submit(window));
      assert.equal(calls, 0, `Invalid form (${value}, ${checked}) must never reach the provider`);
    }
    assert.equal(window.document.querySelector('[role="status"]')?.textContent, '');
    assert.ok(window.document.querySelector('a[download]'));
  });
});

test('observed HTTP400 EMAIL rejection is escaped, associated with the email input and correctable only by another deliberate submit', async () => {
  let calls = 0;
  const message = 'Die eingegebenen Informationen sind nicht gültig. <b>Bitte überprüfe das Feldformat.</b>';
  await withForm(async () => { calls++; return Response.json({ success: false, errors: { EMAIL: message } }, { status: 400 }); }, async window => {
    const form = validInputs(window);
    await act(async () => submit(window));
    const email = form.querySelector<HTMLInputElement>('[name="EMAIL"]')!;
    const status = window.document.querySelector('[role="status"]')!;
    assert.match(status.textContent ?? '', /Bitte überprüfe deine E-Mail-Adresse/);
    assert.ok(status.textContent?.includes(message));
    assert.equal(status.querySelector('b'), null);
    assert.equal(email.getAttribute('aria-invalid'), 'true');
    assert.equal(email.getAttribute('aria-describedby'), status.id);
    assert.equal(window.document.activeElement, email);
    assert.equal(window.document.querySelector('button')?.disabled, false);
    assert.equal(email.value, 'synthetic-fixture@example.invalid', 'Do not reset values on provider rejection');
    assert.equal(form.querySelector<HTMLInputElement>('[name="OPT_IN"]')?.checked, true);
    assert.equal(calls, 1, 'No automatic retry after a known validation rejection');
    assert.ok(window.document.querySelector('a[download]'));
    email.value = 'corrected-fixture@example.invalid';
    await act(async () => submit(window));
    assert.equal(calls, 2, 'A second request requires a new explicit submit');
  });
});

// These are explicitly synthetic responses, including impossible opaque+ok combinations
// to prove that the UI checks readability rather than trusting a success-looking body.
const uncertainFixtures: [string, () => Response | Promise<Response>][] = [
  ...(['opaque', 'opaqueredirect', 'error'] as const).map(type => [type, () => {
    const response = Response.json({ success: true, message: 'Synthetic success must not be accepted' });
    Object.defineProperty(response, 'type', { value: type });
    return response;
  }] as [string, () => Response]),
  ['HTTP500 success-looking body', () => Response.json({ success: true, message: 'Synthetic success' }, { status: 500 })],
  ['HTTP400 success-looking body', () => Response.json({ success: true, message: 'Synthetic success' }, { status: 400 })],
  ['HTTP400 unknown error', () => Response.json({ success: false, errors: { OTHER: 'Unknown' } }, { status: 400 })],
  ['HTTP400 empty EMAIL error', () => Response.json({ success: false, errors: { EMAIL: '  ' } }, { status: 400 })],
  ['HTTP200 EMAIL error is not the observed rejection', () => Response.json({ success: false, errors: { EMAIL: 'Unknown context' } })],
  ['HTTP403 HTML/WAF', () => new Response('<html>Forbidden</html>', { status: 403 })],
  ['HTTP204 empty', () => new Response(null, { status: 204 })],
  ['HTTP200 HTML', () => new Response('<html>Not JSON</html>')],
  ['HTTP200 broken JSON', () => new Response('{"success":true')],
  ['HTTP200 null', () => Response.json(null)],
  ['HTTP200 array', () => Response.json([])],
  ['HTTP200 string', () => Response.json('success')],
  ['success string is not boolean true', () => Response.json({ success: 'true', message: 'Synthetic success' })],
  ['success false with message', () => Response.json({ success: false, message: 'Synthetic rejection' })],
  ['missing success', () => Response.json({ message: 'Synthetic unknown' })],
  ['missing message', () => Response.json({ success: true })],
  ['empty message', () => Response.json({ success: true, message: ' \n ' })],
  ['object message', () => Response.json({ success: true, message: { text: 'Unknown' } })],
  ['network rejection', () => Promise.reject(new TypeError('Synthetic blocked network'))],
];
for (const [name, fixture] of uncertainFixtures) {
  test(`${name}: show uncertainty and inbox-before-retry guidance, never acceptance or automatic retry`, async () => {
    let calls = 0;
    await withForm(async () => { calls++; return fixture(); }, async window => {
      const form = validInputs(window);
      await act(async () => submit(window));
      const status = window.document.querySelector('[role="status"]')!;
      assert.match(status.textContent ?? '', /nicht sicher bestätigen/);
      assert.match(status.textContent ?? '', /möglicherweise bereits verarbeitet/);
      assert.match(status.textContent ?? '', /Postfach.*bevor.*erneut/s);
      assert.doesNotMatch(status.textContent ?? '', /abgeschlossen|PDF.*(?:geliefert|versandt)|erfolgreich angemeldet/);
      assert.equal(window.document.querySelector('button')?.disabled, false, 'Only a deliberate new submit may retry');
      assert.equal(form.getAttribute('aria-busy'), 'false');
      assert.equal(form.querySelector<HTMLInputElement>('[name="EMAIL"]')!.value, 'synthetic-fixture@example.invalid');
      assert.equal(form.querySelector<HTMLInputElement>('[name="OPT_IN"]')!.checked, true);
      assert.equal(calls, 1);
      await act(async () => {});
      assert.equal(calls, 1);
      assert.ok(window.document.querySelector('a[download]'));
      assert.equal(window.location.pathname, '/kaufcheck/');
    });
  });
}

for (const type of ['basic', 'cors', 'default'] as const) {
  test(`readable HTTP201 ${type} with strict provider acceptance is displayed, not treated as completed delivery`, async () => {
    await withForm(async () => {
      const response = Response.json({ success: true, message: 'Bitte bestätige deine Anmeldung per E-Mail.' }, { status: 201 });
      Object.defineProperty(response, 'type', { value: type });
      return response;
    }, async window => {
      validInputs(window);
      await act(async () => submit(window));
      assert.equal(window.document.querySelector('[role="status"]')?.textContent, 'Bitte bestätige deine Anmeldung per E-Mail.');
      assert.equal(window.document.querySelector('button')?.disabled, true);
    });
  });
}

test('disabled or missing-consent hydrated components never collect or make requests and do not block the independent PDF', async () => {
  for (const props of [{}, { enabled: false, consent: fixtureConsent }, { enabled: true }, { enabled: true, consent: ' ' }]) {
    let calls = 0;
    await withForm(async () => { calls++; throw new Error('No request allowed'); }, async window => {
      assert.equal(window.document.querySelectorAll('form,input,button,[action]').length, 0);
      assert.equal(calls, 0);
      assert.ok(window.document.querySelector('a[download]'));
    }, props);
  }
});

// Synthetic acceptance message deliberately includes markup to prove escaped text rendering.
const acceptedMessage = 'Bitte bestätige deine Anmeldung <img src=x onerror=alert(1)> über den Link in unserer E-Mail.';

test('hydrated submit stays on-site, posts exactly five successful controls once, and renders readable acceptance as escaped status text', async () => {
  const calls: { url: unknown; init?: RequestInit }[] = [];
  let resolve!: (response: Response) => void;
  const pending = new Promise<Response>(done => { resolve = done; });
  await withForm(async (url, init) => { calls.push({ url, init }); return pending; }, async window => {
    assert.equal(calls.length, 0, 'Hydration/StrictMode must not send background requests');
    assert.equal(window.document.querySelector('fieldset')?.disabled, false);
    assert.equal(window.document.querySelector('button')?.disabled, false);
    const form = validInputs(window);
    form.querySelector<HTMLInputElement>('[name="email_address_check"]')!.value = 'synthetic-honeypot-fixture';
    await act(async () => { submit(window); submit(window); });
    assert.equal(calls.length, 1, 'Synchronous concurrent submissions must be locked before re-render');
    assert.equal(calls[0].url, NEWSLETTER_PROVIDER_CONTRACT.form.action);
    const init = calls[0].init!;
    assert.equal(init.method, 'POST');
    assert.equal(init.credentials, 'omit');
    assert.equal(init.mode, 'cors');
    assert.ok(init.body instanceof URLSearchParams);
    assert.deepEqual([...init.body.entries()], [
      ['EMAIL', 'synthetic-fixture@example.invalid'], ['OPT_IN', '1'], ['email_address_check', 'synthetic-honeypot-fixture'], ['locale', 'de'], ['html_type', 'simple'],
    ]);
    assert.equal(window.document.querySelector('button')?.disabled, true);
    assert.equal(form.getAttribute('aria-busy'), 'true');
    assert.match(window.document.querySelector('[role="status"]')?.textContent ?? '', /gesendet/);
    assert.ok(window.document.querySelector('a[download]'), 'PDF remains independently available while sending');
    await act(async () => resolve(Response.json({ success: true, message: acceptedMessage })));
    const status = window.document.querySelector('[role="status"]')!;
    assert.equal(status.textContent, acceptedMessage);
    assert.equal(status.getAttribute('aria-live'), 'polite');
    assert.equal(status.getAttribute('aria-atomic'), 'true');
    assert.equal(status.querySelector('img'), null, 'Provider message must never be interpreted as HTML');
    assert.equal(form.getAttribute('aria-busy'), 'false');
    assert.equal(window.location.href, 'https://local-test.invalid/kaufcheck/?keep=1#newsletter');
    await act(async () => submit(window));
    assert.equal(calls.length, 1, 'Accepted DOI request is not automatically repeated');
    assert.equal(window.document.querySelector('button')?.disabled, true);
    assert.ok(window.document.querySelector('a[download]'));
  });
});

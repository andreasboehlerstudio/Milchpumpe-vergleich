import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { act, StrictMode } from 'react';
import { Window } from 'happy-dom';
import { EditorialHomePage } from '../src/home-editorial';
import comparisonData from '../src/home-editorial-data.json';

async function mountHome() {
  const window = new Window({ url: 'http://localhost:3028/' });
  const overrides: Record<string, unknown> = {
    window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element,
    HTMLInputElement: window.HTMLInputElement, HTMLSelectElement: window.HTMLSelectElement,
    HTMLAnchorElement: window.HTMLAnchorElement, Node: window.Node, Event: window.Event,
    AbortController: window.AbortController, localStorage: window.localStorage, location: window.location,
    IS_REACT_ACT_ENVIRONMENT: true,
  };
  const previous = new Map(Object.keys(overrides).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [key, value] of Object.entries(overrides)) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  const { createRoot } = await import('react-dom/client');
  const host = window.document.createElement('div');
  window.document.body.append(host);
  const root = createRoot(host as unknown as HTMLElement);
  await act(async () => { root.render(<StrictMode><EditorialHomePage /></StrictMode>); });
  return { window, document: window.document, async cleanup() {
    await act(async () => root.unmount());
    await window.happyDOM.cancelAsync();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }};
}


test('the real homepage renders the approved Superdesign model-selection surface', () => {
  const html = renderToStaticMarkup(<App initialPath="/" />);
  assert.ok(html.includes('id="v4-title"'), 'The approved Superdesign hero must replace the legacy homepage');
  assert.ok(html.includes('id="v9-compare-a"'), 'The 40-model comparison must be present in actual server-rendered HTML');
  assert.ok(html.includes('id="v9-compare-b"'));
  const window = new Window();
  window.document.body.innerHTML = html;
  assert.equal(window.document.querySelectorAll('.v11-alternative').length, 3);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(!html.includes('<iframe'), 'Do not embed a remote Canvas as the website');
});

test('the integrated directory filters the actual 40-model DOM after React hydration', async () => {
  const app = await mountHome();
  try {
    const input = app.document.querySelector('#v4-model-search')! as unknown as HTMLInputElement;
    input.value = 'Kinderkraft';
    await act(async () => input.dispatchEvent(new app.window.Event('input', { bubbles: true }) as unknown as Event));
    assert.match(app.document.querySelector('#v4-model-count')!.textContent!, /^1 von 40/);
    const visible = [...app.document.querySelectorAll('[data-model]')].filter(row => !row.hasAttribute('hidden'));
    assert.equal(visible.length, 1);
    assert.equal(visible[0].getAttribute('data-architecture'), 'fully-in-bra-electric-wearable');
  } finally { await app.cleanup(); }
});

test('every selectable model renders its actual evidence and tagged purchase target', async () => {
  const app = await mountHome();
  try {
    const a = app.document.querySelector('#v9-compare-a')!;
    const b = app.document.querySelector('#v9-compare-b')!;
    for (let i = 0; i < comparisonData.models.length; i++) {
      const left = comparisonData.models[i], right = comparisonData.models[(i + 7) % comparisonData.models.length];
      a.setAttribute('data-test-key', left.key);
      (a as unknown as HTMLSelectElement).value = left.key;
      (b as unknown as HTMLSelectElement).value = right.key;
      await act(async () => a.dispatchEvent(new app.window.Event('change', { bubbles: true })));
      assert.equal(app.document.querySelector('#v9-name-a')!.textContent, left.name);
      assert.equal(app.document.querySelector('#v9-name-b')!.textContent, right.name);
      const shop = app.document.querySelector('#v9-amazon-a')!;
      assert.equal(shop.getAttribute('href'), left.amazon);
      assert.ok(shop.getAttribute('rel')!.split(' ').includes('sponsored'));
      assert.equal(new URL(left.amazon).searchParams.get('tag'), 'andreasboeh09-21');
    }
  } finally { await app.cleanup(); }
});

test('each visible alternative opens its exact two-model comparison', async () => {
  const app = await mountHome();
  try {
    for (const button of app.document.querySelectorAll('.v11-pair')) {
      const box = app.document.querySelector('#v9-compare-box')!;
      box.removeAttribute('open');
      await act(async () => (button as unknown as HTMLButtonElement).click());
      assert.ok(box.hasAttribute('open'));
      assert.equal((app.document.querySelector('#v9-compare-a') as unknown as HTMLSelectElement).value, button.getAttribute('data-compare-pair-a'));
      assert.equal((app.document.querySelector('#v9-compare-b') as unknown as HTMLSelectElement).value, button.getAttribute('data-compare-pair-b'));
      assert.equal(app.document.activeElement?.id, 'v9-compare-a');
    }
  } finally { await app.cleanup(); }
});

test('comparison swap and reset preserve exact selections and keyboard focus', async () => {
  const app = await mountHome();
  try {
    const a = app.document.querySelector('#v9-compare-a')! as unknown as HTMLSelectElement;
    const b = app.document.querySelector('#v9-compare-b')! as unknown as HTMLSelectElement;
    const defaults = [a.value, b.value];
    a.value = 'Elvie|Pump'; b.value = 'eufy|S1 (T8D02)';
    await act(async () => (app.document.querySelector('#v9-compare-swap') as unknown as HTMLButtonElement).click());
    assert.deepEqual([a.value, b.value], ['eufy|S1 (T8D02)', 'Elvie|Pump']);
    await act(async () => (app.document.querySelector('#v9-compare-reset') as unknown as HTMLButtonElement).click());
    assert.deepEqual([a.value, b.value], defaults);
    assert.equal(app.document.activeElement?.id, 'v9-compare-a');
    a.value = b.value;
    await act(async () => a.dispatchEvent(new app.window.Event('change', { bubbles: true }) as unknown as Event));
    assert.match(app.document.querySelector('#v9-compare-status')!.textContent!, /zweimal dasselbe/);
  } finally { await app.cleanup(); }
});

test('the shortlist case controls expose only their matching case', async () => {
  const app = await mountHome();
  try {
    for (const useCase of ['parts', 'external', 'charging']) {
      const button = app.document.querySelector(`#v4-case-${useCase}`)!;
      await act(async () => (button as unknown as HTMLButtonElement).click());
      const visible = [...app.document.querySelectorAll('[data-pick-case]')].filter(card => !card.hasAttribute('hidden'));
      assert.deepEqual(visible.map(card => card.getAttribute('data-pick-case')), [useCase]);
      assert.equal(button.getAttribute('aria-pressed'), 'true');
    }
    await act(async () => (app.document.querySelector('#v4-case-all') as unknown as HTMLButtonElement).click());
    assert.equal([...app.document.querySelectorAll('[data-pick-case]')].filter(card => !card.hasAttribute('hidden')).length, 3);
  } finally { await app.cleanup(); }
});

test('single-model and complete-directory entry links open their actual disclosure', async () => {
  const app = await mountHome();
  try {
    const link = app.document.querySelector('[data-compare-key]')!;
    await act(async () => (link as unknown as HTMLAnchorElement).click());
    assert.ok(app.document.querySelector('#v9-compare-box')!.hasAttribute('open'));
    assert.equal((app.document.querySelector('#v9-compare-a') as unknown as HTMLSelectElement).value, link.getAttribute('data-compare-key'));
    await act(async () => (app.document.querySelector('#v4-directory-open') as unknown as HTMLAnchorElement).click());
    assert.ok(app.document.querySelector('#modellsuche')!.hasAttribute('open'));
    assert.equal(app.document.activeElement?.id, 'v4-model-search');
  } finally { await app.cleanup(); }
});

test('the comparison already exposes the current default evidence without JavaScript', () => {
  const html = renderToStaticMarkup(<EditorialHomePage />);
  const model = comparisonData.models.find(model => model.key === 'Momcozy|M5 Smart')!;
  assert.ok(html.includes(model.note), 'Prerender the current comparison note; do not wait for JavaScript to correct stale Canvas cells');
});

test('homepage affiliate events use the existing consent gate without real analytics traffic', async () => {
  const app = await mountHome();
  try {
    const events: unknown[][] = [];
    Object.assign(app.window, { gtag: (...args: unknown[]) => { events.push(args); } });
    const link = app.document.querySelector('a[rel~="sponsored"]')!;
    app.window.localStorage.setItem('mv-analytics-consent-v1', JSON.stringify({ value: 'declined', timestamp: Date.now() }));
    link.dispatchEvent(new app.window.MouseEvent('click', { bubbles: true, cancelable: true }));
    assert.equal(events.length, 0);
    app.window.localStorage.setItem('mv-analytics-consent-v1', JSON.stringify({ value: 'accepted', timestamp: Date.now() }));
    link.dispatchEvent(new app.window.MouseEvent('click', { bubbles: true, cancelable: true }));
    assert.equal(events.length, 0, 'Accepted consent on localhost must never produce production events');
    assert.equal(app.document.querySelectorAll('script[src*="googletagmanager"]').length, 0);
  } finally { await app.cleanup(); }
});

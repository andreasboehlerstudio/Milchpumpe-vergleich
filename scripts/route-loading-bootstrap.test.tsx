import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { Window } from 'happy-dom';
import { act } from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { loadRoute } from '../src/route-loader';

const require = createRequire(new URL('../src/main.tsx', import.meta.url));
const source = readFileSync(new URL('../src/main.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;

async function withBootstrap(loader: () => Promise<unknown>, run: (window: Window, errors: unknown[]) => Promise<void>) {
  const window = new Window({ url: 'http://localhost/?source=preserve#marktcheck' });
  const previous = new Map<string, PropertyDescriptor | undefined>();
  for (const [key, value] of Object.entries({ window, document: window.document, localStorage: window.localStorage, location: window.location, HTMLElement: window.HTMLElement, Node: window.Node, Event: window.Event, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  window.document.body.innerHTML = `<div id="root">${renderToString(<App />)}</div>`;
  const errors: unknown[] = [];
  const roots: { unmount(): void }[] = [];
  const client = require('react-dom/client');
  const trackedClient = Object.fromEntries(['createRoot', 'hydrateRoot'].map(name => [name, (...args: unknown[]) => { const root = client[name](...args); roots.push(root); return root; }]));
  try {
    await act(async () => {
      runInNewContext(compiled, {
        exports: {}, document: window.document, window, Event: window.Event,
        console: { ...console, error: (...args: unknown[]) => errors.push(args) },
        require: (id: string) => id.endsWith('.css') ? {} : id === 'react-dom/client' ? trackedClient : id === './route-loader' ? { loadRoute: loader } : require(id),
      });
    });
    await run(window, errors);
  } finally {
    await act(async () => roots.forEach(root => root.unmount()));
    await window.happyDOM.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
}

test('route chunk failure retains the complete SSR and leaves working consent rejection and reopening', async () => {
  await withBootstrap(() => Promise.reject(new Error('deliberately unavailable route chunk')), async (window, errors) => {
    const root = window.document.getElementById('root')!;
    const expected = window.document.createElement('div');
    expected.innerHTML = renderToString(<App />);
    const readable = root.cloneNode(true) as typeof root;
    readable.querySelectorAll('[inert]').forEach(element => element.removeAttribute('inert'));
    assert.equal(readable.innerHTML, expected.innerHTML, 'SSR content remains exact (consent only temporarily makes the background inert)');
    assert.equal(root.querySelectorAll('main').length, 1);
    assert.equal(root.querySelectorAll('h1').length, 1);
    const decline = window.document.querySelector('.cookie-dialog .button--secondary') as import('happy-dom').HTMLButtonElement | null;
    assert.ok(decline, 'consent remains usable when the page chunk cannot load');
    await act(async () => decline.click());
    assert.equal(JSON.parse(window.localStorage.getItem('mv-analytics-consent-v1')!).value, 'declined');
    assert.equal(window.document.querySelector('.cookie-dialog'), null);
    const settings = [...root.querySelectorAll('button')].find(button => button.textContent === 'Cookie-Einstellungen');
    assert.ok(settings);
    await act(async () => settings.click());
    assert.ok(window.document.querySelector('.cookie-dialog'), 'SSR footer can reopen consent even without page hydration');
    assert.equal(window.document.querySelectorAll('script[src*="googletagmanager"]').length, 0);
    assert.equal(window.location.search, '?source=preserve');
    assert.equal(window.location.hash, '#marktcheck');
    assert.equal(errors.length, 1, 'chunk failure is reported, not silently treated as hydrated');
  });
});

// Characterize the successful handoff through real React DOM, not a replacement-root mock.
test('a delayed page hydrates the original SSR nodes after consent is declined without losing query or hash', async () => {
  let resolvePage!: (page: Awaited<ReturnType<typeof loadRoute>>) => void;
  const pending = new Promise<Awaited<ReturnType<typeof loadRoute>>>(resolve => { resolvePage = resolve; });
  await withBootstrap(() => pending, async (window, errors) => {
    const root = window.document.getElementById('root')!;
    const originalMain = root.querySelector('main');
    const originalHeading = root.querySelector('h1');
    assert.ok(window.document.querySelector('.cookie-dialog'));
    const decline = window.document.querySelector('.cookie-dialog .button--secondary') as import('happy-dom').HTMLButtonElement;
    await act(async () => decline.click());
    await act(async () => resolvePage(await loadRoute('/')));
    assert.equal(root.querySelector('main'), originalMain, 'hydrate, do not client-render a replacement');
    assert.equal(root.querySelector('h1'), originalHeading);
    assert.equal(window.document.querySelector('.cookie-dialog'), null);
    assert.equal(window.document.body.children.length, 1, 'temporary consent root is removed after handoff');
    const menu = root.querySelector('#menu-button') as import('happy-dom').HTMLButtonElement;
    await act(async () => menu.click());
    assert.equal(menu.getAttribute('aria-expanded'), 'true', 'shared shell events are hydrated');
    assert.equal(window.location.search, '?source=preserve');
    assert.equal(window.location.hash, '#marktcheck');
    assert.equal(JSON.parse(window.localStorage.getItem('mv-analytics-consent-v1')!).value, 'declined');
    assert.equal(errors.length, 0);
  });
});

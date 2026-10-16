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
const compiled = ts.transpileModule(readFileSync(new URL('../src/main.tsx', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;

async function withBootstrap(loader: () => Promise<unknown>, run: (window: Window, errors: unknown[]) => Promise<void>) {
  const window = new Window({ url: 'http://localhost/kaufcheck/?source=preserve#newsletter' });
  const previous = new Map<string, PropertyDescriptor | undefined>();
  for (const [key, value] of Object.entries({ window, document: window.document, localStorage: window.localStorage, location: window.location, HTMLElement: window.HTMLElement, Node: window.Node, Event: window.Event, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  window.document.body.innerHTML = `<div id="root">${renderToString(<App initialPath="/kaufcheck/" />)}</div>`;
  const errors: unknown[] = [];
  const roots: { unmount(): void }[] = [];
  const client = require('react-dom/client');
  const trackedClient = Object.fromEntries(['createRoot', 'hydrateRoot'].map(name => [name, (...args: unknown[]) => { const root = client[name](...args); roots.push(root); return root; }]));
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => { errors.push(args); };
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
    console.error = originalConsoleError;
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
}

function readableMarkup(root: import('happy-dom').Element) {
  const clone = root.cloneNode(true) as typeof root;
  clone.querySelectorAll('[inert]').forEach(element => element.removeAttribute('inert'));
  return clone.innerHTML;
}

for (const state of ['failed', 'delayed'] as const) {
  test(`newsletter ${state} chunk retains exact standalone SSR with functional consent rejection and reopening`, async () => {
    await withBootstrap(() => state === 'failed' ? Promise.reject(new Error('unavailable newsletter chunk')) : new Promise(() => {}), async (window, errors) => {
      const root = window.document.getElementById('root')!;
      const expected = window.document.createElement('div');
      expected.innerHTML = renderToString(<App initialPath="/kaufcheck/" />);
      assert.equal(readableMarkup(root), expected.innerHTML);
      assert.equal(root.querySelectorAll('main').length, 1);
      assert.ok(window.document.querySelector('.cookie-dialog'));
      await act(async () => (window.document.querySelector('.cookie-dialog .button--secondary') as import('happy-dom').HTMLButtonElement).click());
      assert.equal(JSON.parse(window.localStorage.getItem('mv-analytics-consent-v1')!).value, 'declined');
      assert.equal(window.document.querySelector('.cookie-dialog'), null);
      const settings = root.querySelector('#cookie-settings') as import('happy-dom').HTMLButtonElement;
      assert.ok(settings, 'standalone shell keeps an SSR cookie settings control');
      assert.ok(settings.closest('footer'), 'standalone cookie control joins the modal-inert background');
      await act(async () => settings.click());
      assert.ok(window.document.querySelector('.cookie-dialog'));
      assert.equal(window.document.querySelectorAll('script[src*="googletagmanager"]').length, 0);
      assert.match(window.document.title, /Kaufcheck/);
      assert.equal(window.document.querySelector('meta[name="robots"]')?.getAttribute('content'), 'noindex,follow');
      assert.equal(window.document.querySelector('link[rel="canonical"]')?.getAttribute('href'), 'https://milchpumpe-vergleich.de/kaufcheck/');
      assert.match(window.document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '', /Newsletter/);
      assert.equal(window.location.search, '?source=preserve');
      assert.equal(window.location.hash, '#newsletter');
      assert.equal(errors.length, state === 'failed' ? 1 : 0);
    });
  });
}

test('newsletter hydration retains original approved nodes and hands consent back to the standalone shell', async () => {
  let resolve!: (page: Awaited<ReturnType<typeof loadRoute>>) => void;
  const pending = new Promise<Awaited<ReturnType<typeof loadRoute>>>(done => { resolve = done; });
  await withBootstrap(() => pending, async (window, errors) => {
    const root = window.document.getElementById('root')!;
    const main = root.querySelector('main');
    const heading = root.querySelector('h1');
    const image = root.querySelector('img');
    await act(async () => (window.document.querySelector('.cookie-dialog .button--secondary') as import('happy-dom').HTMLButtonElement).click());
    await act(async () => resolve(await loadRoute('/kaufcheck/')));
    assert.equal(root.querySelector('main'), main);
    assert.equal(root.querySelector('h1'), heading);
    assert.equal(root.querySelector('img'), image);
    assert.equal(window.document.body.children.length, 1);
    assert.equal(window.document.querySelector('.cookie-dialog'), null);
    const settings = root.querySelector('#cookie-settings') as import('happy-dom').HTMLButtonElement;
    assert.ok(settings);
    await act(async () => settings.click());
    assert.equal(window.document.querySelectorAll('.cookie-dialog').length, 1);
    await act(async () => (window.document.querySelector('.cookie-dialog .button--primary') as import('happy-dom').HTMLButtonElement).click());
    assert.equal(JSON.parse(window.localStorage.getItem('mv-analytics-consent-v1')!).value, 'accepted');
    assert.equal(window.document.querySelectorAll('script[src*="googletagmanager"]').length, 1);
    assert.equal(window.location.search, '?source=preserve');
    assert.equal(window.location.hash, '#newsletter');
    assert.equal(errors.length, 0, 'no hydration mismatch or runtime errors');
  });
});

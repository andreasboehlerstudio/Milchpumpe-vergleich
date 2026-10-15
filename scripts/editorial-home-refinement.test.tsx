import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import { readFileSync, existsSync } from 'node:fs';
import { bindEditorialHome } from '../src/home-editorial-runtime';
import template from '../src/home-editorial-template.json';
import data from '../src/home-editorial-data.json';

test('approved v15 is real local prerendered content with its full style layers and original inventory', async () => {
  assert.equal(template.sourceVersion, 15);
  assert.equal(data.sourceVersion, 15);
  const window = new Window();
  try {
    window.document.body.innerHTML = template.html;
    const doc = window.document;
    assert.equal(doc.querySelectorAll('main').length, 1);
    assert.equal(doc.querySelectorAll('h1').length, 1);
    assert.equal(doc.querySelectorAll('.v14-model-facts').length, 3);
    assert.equal(doc.querySelectorAll('.v12-alternative').length, 3);
    assert.equal(doc.querySelectorAll('[data-model]').length, 40);
    assert.equal(doc.querySelectorAll('#v9-compare-a option').length, 40);
    assert.equal(doc.querySelectorAll('script,iframe').length, 0);
    assert.equal(doc.getElementById('v14-selected-models')!.textContent, 'Momcozy M5 Smart ↔ Medela Freestyle Hands-free');
    assert.equal(doc.getElementById('v14-set-guide')!.getAttribute('href'), '/ratgeber/milchpumpe-einzel-oder-doppelpumpe/');
    const children = [...doc.querySelector('main')!.children];
    assert.ok(children.indexOf(doc.getElementById('marktcheck')!) < children.indexOf(doc.getElementById('alltagsfragen')!));
    assert.ok(children.indexOf(doc.getElementById('v9-comparison')!) < children.indexOf(doc.getElementById('alltagsfragen')!));
    for (const image of doc.querySelectorAll('img')) {
      assert.match(image.getAttribute('src')!, /^\/(editorial-photos|editorial-v2)\//);
      assert.ok(existsSync('public'+image.getAttribute('src')));
    }
    for (const card of doc.querySelectorAll('.v4-pick')) {
      const nodes = [...card.children];
      assert.ok(nodes.indexOf(card.querySelector('.v8-set-label')!) < nodes.indexOf(card.querySelector('.v4-buy')!));
      assert.match(card.querySelector('.v4-buy')!.getAttribute('href')!, /tag=andreasboeh09-21/);
      assert.ok(card.querySelector('.v4-buy')!.getAttribute('rel')!.includes('sponsored'));
    }
    const css = readFileSync('src/home-editorial.css','utf8');
    assert.match(css, /\.editorial-home\.v4 \.v14-model-facts/);
    assert.match(css, /\.editorial-home\.v4 #v14-selected-models/);
    assert.match(css, /\.editorial-home\.v4 \.v4-hero\{/);
    assert.doesNotMatch(css, /@import|https:\/\/fonts\.|cdn\.tailwind/);
  } finally { await window.happyDOM.close(); }
});

function fixture(hash = '') {
  const window = new Window({ url: `http://localhost:3028/${hash}` });
  const document = window.document;
  document.body.innerHTML = `<a id="header-finder" href="/#v9-comparison">Direkt vergleichen</a><div id="fixture-root">${template.html}</div>`;
  const root = document.getElementById('fixture-root')!;
  // A controlled boundary fixture for the v15 summary while the pinned HTML
  // export is prepared independently. The final SSR contract is tested separately.
  if (!document.getElementById('v14-selected-models')) {
    const summary = document.createElement('small'); summary.id = 'v14-selected-models';
    document.querySelector('#v9-compare-box>summary')!.append(summary);
  }
  document.getElementById('v4-hero-stories')!.setAttribute('href', '#modellsuche');
  for (const select of document.querySelectorAll('#v9-compare-a,#v9-compare-b')) {
    (select as unknown as HTMLSelectElement).value = select.querySelector('option[selected]')!.getAttribute('value')!;
  }
  const cleanup = bindEditorialHome(root as unknown as HTMLElement);
  const a = document.getElementById('v9-compare-a')! as unknown as HTMLSelectElement;
  const b = document.getElementById('v9-compare-b')! as unknown as HTMLSelectElement;
  return { window, document, a, b, cleanup, summary: document.getElementById('v14-selected-models')! };
}

test('a comparison deep link from an inner page opens its disclosure on hydration', async () => {
  const app = fixture('#v9-comparison');
  try {
    assert.ok(app.document.getElementById('v9-compare-box')!.hasAttribute('open'));
    assert.equal(app.document.activeElement?.id, 'v9-compare-a');
  } finally { app.cleanup(); await app.window.happyDOM.close(); }
});

test('the full-model hero entry opens the complete directory with search focus', async () => {
  const app = fixture();
  try {
    const directory = app.document.getElementById('modellsuche')!;
    directory.removeAttribute('open');
    app.document.getElementById('v4-hero-stories')!.dispatchEvent(new app.window.MouseEvent('click', { bubbles: true, cancelable: true }));
    assert.ok(directory.hasAttribute('open'));
    assert.equal(app.document.activeElement?.id, 'v4-model-search');
    assert.equal(app.document.querySelectorAll('[data-model]:not([hidden])').length, 40);
  } finally { app.cleanup(); await app.window.happyDOM.close(); }
});

test('the shared header opens the real comparison without requiring a second click', async () => {
  const app = fixture();
  try {
    const box = app.document.getElementById('v9-compare-box')!;
    box.removeAttribute('open');
    const allowedDefault = app.document.getElementById('header-finder')!.dispatchEvent(new app.window.MouseEvent('click', { bubbles: true, cancelable: true }));
    assert.equal(allowedDefault, false, 'Handle the in-page destination rather than navigating away');
    assert.ok(box.hasAttribute('open'));
    assert.equal(app.document.activeElement?.id, 'v9-compare-a');
    app.cleanup(); box.removeAttribute('open');
    app.document.getElementById('header-finder')!.dispatchEvent(new app.window.MouseEvent('click', { bubbles: true, cancelable: true }));
    assert.equal(box.hasAttribute('open'), false, 'Unmount removes the document-level header handler');
  } finally { app.cleanup(); await app.window.happyDOM.close(); }
});

test('native comparison keeps the collapsed selected-model names synchronized for the entire registry', async () => {
  const app = fixture();
  try {
    assert.equal(app.summary.textContent, 'Momcozy M5 Smart ↔ Medela Freestyle Hands-free');
    for (let index = 0; index < data.models.length; index++) {
      const left = data.models[index], right = data.models[(index + 9) % data.models.length];
      app.a.value = left.key; app.b.value = right.key;
      app.a.dispatchEvent(new app.window.Event('change', { bubbles: true }) as unknown as Event);
      assert.equal(app.summary.textContent, `${left.name} ↔ ${right.name}`);
    }
    app.document.getElementById('v9-compare-swap')!.dispatchEvent(new app.window.MouseEvent('click', { bubbles: true }));
    const registry = new Map(data.models.map(model => [model.key, model]));
    assert.equal(app.summary.textContent, `${registry.get(app.a.value)!.name} ↔ ${registry.get(app.b.value)!.name}`);
    app.document.getElementById('v9-compare-reset')!.dispatchEvent(new app.window.MouseEvent('click', { bubbles: true }));
    assert.equal(app.summary.textContent, 'Momcozy M5 Smart ↔ Medela Freestyle Hands-free');
    const unchanged = app.summary.textContent;
    app.cleanup();
    app.a.value = 'Elvie|Pump';
    app.a.dispatchEvent(new app.window.Event('change', { bubbles: true }) as unknown as Event);
    assert.equal(app.summary.textContent, unchanged, 'Unmount removes the synchronization handler');
  } finally { app.cleanup(); await app.window.happyDOM.close(); }
});

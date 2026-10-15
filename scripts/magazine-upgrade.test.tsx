import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readFileSync } from 'node:fs';
import { Window, type HTMLInputElement as HappyInput, type HTMLSelectElement as HappySelect } from 'happy-dom';
import { act, StrictMode, type ReactNode } from 'react';

async function mount(content: ReactNode) {
  const window = new Window({ url: 'http://localhost/' });
  const overrides = { window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element, Node: window.Node, Event: window.Event, IS_REACT_ACT_ENVIRONMENT: true };
  const previous = new Map(Object.keys(overrides).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [key, value] of Object.entries(overrides)) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  const { createRoot } = await import('react-dom/client');
  const host = window.document.createElement('div');
  window.document.body.append(host);
  const root = createRoot(host as unknown as HTMLElement);
  await act(async () => root.render(<StrictMode>{content}</StrictMode>));
  return { window, document: window.document, async cleanup() {
    await act(async () => root.unmount());
    await window.happyDOM.cancelAsync();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }};
}
import { GUIDE_ARTICLES, PRODUCTS, productUrl } from '../src/data';

async function loadUpgrade() {
  const ui = await import('../src/magazine-upgrade').catch(() => null);
  assert.ok(ui, 'Magazine upgrade module must exist');
  return ui;
}

function parse(html: string) {
  const window = new Window();
  window.document.body.innerHTML = html;
  return window.document;
}

test('magazine SSR exposes all 35 articles exactly once in its crawlable library and preserves entry anchors', async () => {
  const { MagazineGuideHub } = await loadUpgrade();
  const document = parse(renderToStaticMarkup(<MagazineGuideHub />));
  assert.equal(document.querySelectorAll('main').length, 1);
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.equal(GUIDE_ARTICLES.length, 35);
  const library = document.querySelector('#artikel')!;
  assert.ok(library);
  assert.equal(library.querySelectorAll('[data-guide-slug]').length, GUIDE_ARTICLES.length);
  for (const article of GUIDE_ARTICLES) {
    assert.equal(library.querySelectorAll(`a[href="/ratgeber/${article.slug}/"]`).length, 1, article.slug);
  }
  assert.equal(document.querySelectorAll('[data-magazine-intent]').length, 3);
  for (const product of PRODUCTS) {
    assert.ok(document.querySelector(`#cluster-${product.id}`));
    assert.ok(document.querySelector(`a[href="${productUrl(product)}"]`));
  }
  assert.ok(document.querySelector('#pumpenfinder'));
});

test('magazine search intersects the three labelled topics, announces results and resets an empty search', async () => {
  const { MagazineGuideHub } = await loadUpgrade();
  const app = await mount(<MagazineGuideHub />);
  try {
    const input = app.document.querySelector<HappyInput>('#mu-guide-search');
    assert.ok(input, 'Labelled article search is missing');
    const topic = app.document.querySelector<HappySelect>('#mu-guide-topic')!;
    assert.equal(topic.options.length, 4);
    assert.match(app.document.querySelector('label[for="mu-guide-search"]')!.textContent, /Ratgeber durchsuchen/);
    assert.match(app.document.querySelector('label[for="mu-guide-topic"]')!.textContent, /Thema/);
    const visible = () => [...app.document.querySelectorAll('[data-guide-slug]')].filter(row => !row.hasAttribute('hidden'));
    input.value = '  M9  ';
    await act(async () => input.dispatchEvent(new app.window.Event('input', { bubbles: true })));
    assert.equal(visible().length, GUIDE_ARTICLES.filter(article => `${article.title} ${article.description}`.toLowerCase().includes('m9')).length);
    topic.value = 'Passform & Anwendung';
    await act(async () => topic.dispatchEvent(new app.window.Event('change', { bubbles: true })));
    assert.ok(visible().every(row => row.getAttribute('data-guide-intent') === 'Passform & Anwendung'));
    input.value = 'zzzz-unbekannt';
    await act(async () => input.dispatchEvent(new app.window.Event('input', { bubbles: true })));
    assert.equal(visible().length, 0);
    const status = app.document.querySelector('#mu-guide-status')!;
    assert.equal(status.getAttribute('role'), 'status');
    assert.equal(status.getAttribute('aria-live'), 'polite');
    assert.match(status.textContent, /0 von 35/);
    assert.match(app.document.querySelector('#mu-guide-empty')!.textContent, /Kein passender Artikel/);
    assert.ok(!app.document.querySelector('#mu-guide-empty')!.hasAttribute('hidden'));
    await act(async () => (app.document.querySelector('#mu-guide-reset') as unknown as HTMLButtonElement).click());
    assert.equal(input.value, '');
    assert.equal(topic.value, '');
    assert.equal(visible().length, 35);
    assert.equal(app.document.activeElement?.id, 'mu-guide-search');
    assert.equal(app.document.querySelectorAll('#artikel [data-guide-slug]').length, 35, 'Filtering must retain the complete crawlable library');
    for (const option of [...topic.options].slice(1)) {
      topic.value = option.value;
      await act(async () => topic.dispatchEvent(new app.window.Event('change', { bubbles: true })));
      assert.ok(visible().length > 0);
      assert.ok(visible().every(row => row.getAttribute('data-guide-intent') === option.value));
    }
  } finally { await app.cleanup(); }
});

test('magazine leads with three local rights-documented topic photos and real guide destinations', async () => {
  const { MagazineGuideHub } = await loadUpgrade();
  const document = parse(renderToStaticMarkup(<MagazineGuideHub />));
  const stories = document.querySelectorAll('[data-magazine-story]');
  assert.equal(stories.length, 3);
  for (const story of stories) {
    const image = story.querySelector('img')!;
    assert.ok(image?.getAttribute('alt'));
    const src = image.getAttribute('src')!;
    assert.ok(existsSync(new URL(`../public${src}`, import.meta.url)), src);
    assert.ok(story.querySelector('figcaption a[href^="https://commons.wikimedia.org/"]'));
    assert.ok(story.querySelector('a[href^="/ratgeber/"]'));
    assert.ok(image.getAttribute('width'));
    assert.ok(image.getAttribute('height'));
  }
  assert.equal(stories[0].querySelector('img')?.getAttribute('fetchPriority'), 'high');
  assert.match(document.querySelector('.mu-photo-note')?.textContent || '', /Für Pflege und Kompatibilität gilt die Anleitung deines konkreten Modells/);
});

test('comparison SSR separates five electric models and manual Haakaa from the 40-model market and retains every registry fact', async () => {
  const { VisualComparisonPage } = await loadUpgrade();
  assert.equal(typeof VisualComparisonPage, 'function', 'VisualComparisonPage export is missing');
  const document = parse(renderToStaticMarkup(<VisualComparisonPage />));
  assert.equal(document.querySelectorAll('h1').length, 1);
  assert.equal(document.querySelectorAll('main').length, 1);
  assert.equal(document.querySelectorAll('#mu-electric-models [data-detail-model]').length, 5);
  assert.deepEqual([...document.querySelectorAll('#mu-manual-models [data-detail-model]')].map(node => node.getAttribute('data-detail-model')), ['haakaa-gen3']);
  assert.match(document.body.textContent, /40 recherchierte/);
  assert.match(document.body.textContent, /sechs.*Detailmodelle/i);
  assert.ok(document.querySelector('a[href="/tragbare-milchpumpen/"]'));
  for (const product of PRODUCTS) {
    const card = document.querySelector(`[data-detail-model="${product.id}"]`)!;
    assert.ok(card.querySelector('dl'), product.id);
    for (const value of [product.focus, product.category, product.set, product.energy, product.wearStyle, product.cleaning, product.summary, ...product.facts, ...product.strengths, ...product.limitations]) assert.ok(card.textContent.includes(value), `${product.id}: ${value}`);
    assert.ok(card.querySelector(`a[href="${productUrl(product)}"]`));
    assert.ok([...card.querySelectorAll('a')].some(anchor => anchor.getAttribute('href') === product.sourceUrl));
  }
  for (const slug of ['richtige-flanschgroesse', 'milchpumpe-reinigen', 'momcozy-m9-oder-s12-pro', 'medela-freestyle-oder-philips-avent']) assert.ok(document.querySelector(`a[href="/ratgeber/${slug}/"]`));
});

test('native pair selectors expose exact facts for every model, preserve same selections and support swap/reset focus', async () => {
  const { VisualComparisonPage } = await loadUpgrade();
  const app = await mount(<VisualComparisonPage />);
  try {
    const a = app.document.querySelector<HappySelect>('#mu-compare-a');
    const b = app.document.querySelector<HappySelect>('#mu-compare-b');
    assert.ok(a && b, 'Native two-model selectors are missing');
    assert.deepEqual([a.value, b.value], ['momcozy-m9', 'medela-freestyle']);
    assert.ok(app.document.querySelector('label[for="mu-compare-a"]'));
    assert.ok(app.document.querySelector('label[for="mu-compare-b"]'));
    assert.equal(a.querySelector('optgroup[label="Elektrisch · 5 Modelle"]')!.querySelectorAll('option').length, 5);
    assert.equal(a.querySelector('optgroup[label="Manuell · separat einordnen"]')!.querySelectorAll('option').length, 1);
    for (const product of PRODUCTS) {
      a.value = product.id;
      await act(async () => a.dispatchEvent(new app.window.Event('change', { bubbles: true })));
      const card = app.document.querySelector('[data-compare-side="a"]')!;
      assert.equal(card.getAttribute('data-selected-model'), product.id);
      for (const key of ['focus', 'category', 'set', 'energy', 'wearStyle', 'cleaning'] as const) assert.equal(card.querySelector(`[data-fact="${key}"] dd`)!.textContent, product[key]);
      assert.equal(card.querySelector('[data-fact="app"] dd')!.textContent, product.app ? 'Ja' : 'Nein');
      for (const fact of product.facts) assert.ok(card.textContent.includes(fact));
      assert.ok([...card.querySelectorAll('a')].some(link => link.getAttribute('href') === product.sourceUrl));
      assert.ok(card.querySelector(`a[href="${productUrl(product)}"]`));
    }
    assert.ok(!app.document.querySelector('#mu-manual-warning')!.hasAttribute('hidden'));
    await act(async () => (app.document.querySelector('#mu-compare-swap') as unknown as HTMLButtonElement).click());
    assert.deepEqual([a.value, b.value], ['medela-freestyle', 'haakaa-gen3']);
    a.value = b.value;
    await act(async () => a.dispatchEvent(new app.window.Event('change', { bubbles: true })));
    assert.match(app.document.querySelector('#mu-compare-status')!.textContent, /zweimal dasselbe Modell/);
    assert.equal(app.document.querySelectorAll('[data-selected-model="haakaa-gen3"]').length, 2);
    await act(async () => (app.document.querySelector('#mu-compare-reset') as unknown as HTMLButtonElement).click());
    assert.deepEqual([a.value, b.value], ['momcozy-m9', 'medela-freestyle']);
    assert.equal(app.document.activeElement?.id, 'mu-compare-a');
    assert.ok(app.document.querySelector('#mu-manual-warning')!.hasAttribute('hidden'));
    assert.equal(app.document.querySelector('#mu-compare-status')!.getAttribute('aria-live'), 'polite');
    assert.match(app.document.querySelector('#mu-compare-scope')!.textContent, /sechs.*Detailmodelle/i);
  } finally { await app.cleanup(); }
});

test('differences emphasis marks exact unequal core facts but never hides shared facts or model details', async () => {
  const { VisualComparisonPage } = await loadUpgrade();
  const app = await mount(<VisualComparisonPage />);
  try {
    const toggle = app.document.querySelector<HappyInput>('#mu-differences');
    assert.ok(toggle, 'Differences control is missing');
    assert.equal(toggle.type, 'checkbox');
    assert.ok(toggle.checked);
    assert.match(app.document.querySelector('label[for="mu-differences"]')!.textContent, /Unterschiede hervorheben/);
    const a = app.document.querySelector<HappySelect>('#mu-compare-a')!;
    const b = app.document.querySelector<HappySelect>('#mu-compare-b')!;
    for (const product of PRODUCTS) {
      a.value = product.id;
      await act(async () => a.dispatchEvent(new app.window.Event('change', { bubbles: true })));
      const right = PRODUCTS.find(product => product.id === b.value)!;
      for (const key of ['focus', 'category', 'set', 'app', 'energy', 'wearStyle', 'cleaning'] as const) {
        const row = app.document.querySelector(`[data-compare-side="a"] [data-fact="${key}"]`)!;
        assert.equal(row.getAttribute('data-different'), String(product[key] !== right[key]));
        assert.equal(row.classList.contains('mu-fact--different'), product[key] !== right[key]);
        assert.ok(!row.hasAttribute('hidden'));
      }
    }
    await act(async () => (toggle as unknown as HTMLInputElement).click());
    assert.equal(app.document.querySelectorAll('.mu-fact--different').length, 0);
    assert.equal(app.document.querySelectorAll('#mu-pair-results dl [data-fact]').length, 14);
    a.value = b.value;
    await act(async () => a.dispatchEvent(new app.window.Event('change', { bubbles: true })));
    assert.equal(app.document.querySelectorAll('#mu-pair-results [data-different="true"]').length, 0);
  } finally { await app.cleanup(); }
});

test('both page exports accept an optional footer slot inside the main without adding a wrapper main', async () => {
  const { MagazineGuideHub, VisualComparisonPage } = await loadUpgrade();
  for (const Page of [MagazineGuideHub, VisualComparisonPage]) {
    const document = parse(renderToStaticMarkup(<Page footerSlot={<aside id="newsletter-test-slot">Newsletter-Einstieg</aside>} />));
    assert.equal(document.querySelectorAll('main').length, 1);
    assert.equal(document.querySelector('main')!.lastElementChild?.id, 'newsletter-test-slot');
    assert.ok(!renderToStaticMarkup(<Page />).includes('newsletter-test-slot'));
  }
});

test('scoped stylesheet provides a varied editorial cover, focus rings and full-width mobile definition-list cards', () => {
  const url = new URL('../src/magazine-upgrade.css', import.meta.url);
  assert.ok(existsSync(url), 'Magazine upgrade stylesheet is missing');
  const css = readFileSync(url, 'utf8');
  assert.match(css, /\.magazine-upgrade\s*\{/);
  assert.match(css, /Manrope/);
  assert.match(css, /\.mu-story--lead/);
  assert.match(css, /\.mu-fact--different/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:\s*700px\)/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /min-width:\s*0/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
  assert.doesNotMatch(css, /line-clamp|text-overflow:\s*ellipsis|overflow-x:\s*hidden/);
  assert.doesNotMatch(css, /\.mu-story[^{}]*figure\s*\{\s*display:\s*none/, 'Topic photos should remain available at tablet sizes');
  assert.match(css, /\.mu-cover\s*>\s*\.mu-kicker\s*\{\s*max-width:\s*none/, 'The small cover kicker must not inherit the 25ch h2 constraint');
});

test('intent jump links recover filtered-out sections and native search forms do not submit or reorder tab focus', async () => {
  const { MagazineGuideHub } = await loadUpgrade();
  const app = await mount(<MagazineGuideHub />);
  try {
    const input = app.document.querySelector<HappyInput>('#mu-guide-search')!;
    input.value = 'zzzz-unbekannt';
    await act(async () => input.dispatchEvent(new app.window.Event('input', { bubbles: true })));
    assert.ok(app.document.querySelector('#magazin-thema-1')!.hasAttribute('hidden'));
    await act(async () => (app.document.querySelector('[data-magazine-intent="Auswählen & vergleichen"]') as unknown as HTMLAnchorElement).click());
    assert.equal(input.value, '');
    assert.equal(app.document.querySelector<HappySelect>('#mu-guide-topic')!.value, 'Auswählen & vergleichen');
    assert.ok(!app.document.querySelector('#magazin-thema-1')!.hasAttribute('hidden'));
    const form = app.document.querySelector('form[role="search"]')!;
    let submitted = true;
    await act(async () => { submitted = form.dispatchEvent(new app.window.Event('submit', { bubbles: true, cancelable: true })); });
    assert.equal(submitted, false, 'Enter in search must not navigate away');
    for (const control of app.document.querySelectorAll('input,select')) {
      assert.ok(control.closest('label') || app.document.querySelector(`label[for="${control.id}"]`), control.outerHTML);
    }
    assert.equal(app.document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])').length, 0);
  } finally { await app.cleanup(); }
});

test('page H1s preserve natural word boundaries for accessibility and route metadata', async () => {
  const { MagazineGuideHub, VisualComparisonPage } = await loadUpgrade();
  assert.equal(parse(renderToStaticMarkup(<MagazineGuideHub />)).querySelector('h1')!.textContent, 'Weniger Sucherei. Mehr Alltag, der passt.');
  assert.equal(parse(renderToStaticMarkup(<VisualComparisonPage />)).querySelector('h1')!.textContent, 'Was unterscheidet deine Auswahl?');
});

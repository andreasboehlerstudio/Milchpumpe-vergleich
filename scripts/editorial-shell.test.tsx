import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';
import { Layout } from '../src/components';

const fixture = <main id="inhalt">Shell fixture</main>;
const editorial = () => renderToStaticMarkup(<Layout variant="editorial">{fixture}</Layout>);
const componentSource = readFileSync(new URL('../src/components.tsx', import.meta.url), 'utf8');

type ShellElement = ReactElement<Record<string, any>>;
function elements(node: ReactNode): ShellElement[] {
  return Children.toArray(node).flatMap(child => {
    if (!isValidElement(child)) return [];
    const element = child as ShellElement;
    return [element, ...elements(element.props.children)];
  });
}

// Handler-level harness: executes the actual component functions/React elements,
// with deterministic hook slots and EventTargets; no DOM or browser is simulated.
function shellHarness() {
  const require = createRequire(import.meta.url);
  const slots: any[] = [];
  let cursor = 0;
  let cleanups: (() => void)[] = [];
  let pendingEffects: (() => void | (() => void))[] = [];
  const document = new EventTarget();
  const window = new EventTarget();
  const exports: Record<string, any> = {};
  const hooks = {
    ...require('react'),
    useState(initial: any) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = initial;
      return [slots[index], (next: any) => { slots[index] = typeof next === 'function' ? next(slots[index]) : next; }];
    },
    useRef(initial: any) {
      const index = cursor++;
      return slots[index] ??= { current: initial };
    },
    useEffect(effect: () => void | (() => void)) { pendingEffects.push(effect); },
  };
  const compiled = ts.transpileModule(`${componentSource}\nexport { EditorialHeader, EditorialFooter, CookieConsent };`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  runInNewContext(compiled, {
    exports, document, window, Event,
    require: (id: string) => id === 'react' ? hooks : id.startsWith('./') ? {} : require(id),
  });
  return {
    document, window, components: exports,
    render(name = 'EditorialHeader', props = {}) {
      cleanups.forEach(cleanup => cleanup());
      cleanups = [];
      cursor = 0;
      pendingEffects = [];
      const tree = exports[name](props) as ShellElement;
      for (const effect of pendingEffects) {
        const cleanup = effect();
        if (cleanup) cleanups.push(cleanup);
      }
      return elements(tree);
    },
    cleanup() { cleanups.forEach(cleanup => cleanup()); cleanups = []; },
  };
}

function byId(tree: ShellElement[], id: string) {
  const element = tree.find(element => element.props.id === id);
  assert.ok(element, `Missing element #${id}`);
  return element;
}

test('editorial menu handlers keep state, aria-expanded and nav.open in sync', () => {
  const harness = shellHarness();
  try {
    let tree = harness.render();
    const button = byId(tree, 'menu-button');
    assert.equal(typeof button.props.onClick, 'function', 'menu button needs a React state handler');
    assert.equal(button.props['aria-expanded'], false);
    button.props.onClick();
    tree = harness.render();
    assert.equal(byId(tree, 'menu-button').props['aria-expanded'], true);
    assert.equal(byId(tree, 'menu-button').props['aria-label'], 'Menü schließen');
    assert.equal(byId(tree, 'main-nav').props.className, 'nav open');
    byId(tree, 'menu-button').props.onClick();
    tree = harness.render();
    assert.equal(byId(tree, 'menu-button').props['aria-expanded'], false);
    assert.equal(byId(tree, 'main-nav').props.className, 'nav');
  } finally { harness.cleanup(); }
});

test('Escape closes the editorial menu, restores trigger focus and removes the listener on cleanup', () => {
  const harness = shellHarness();
  const keydown = (key: string) => harness.document.dispatchEvent(Object.assign(new Event('keydown'), { key }));
  try {
    let tree = harness.render();
    byId(tree, 'menu-button').props.onClick();
    tree = harness.render();
    keydown('Enter');
    assert.equal(byId(harness.render(), 'menu-button').props['aria-expanded'], true);
    let focusCalls = 0;
    const ref = byId(tree, 'menu-button').props.ref;
    if (ref) ref.current = { focus: () => focusCalls++ };
    keydown('Escape');
    tree = harness.render();
    assert.equal(byId(tree, 'menu-button').props['aria-expanded'], false, 'Escape must close an open menu');
    assert.equal(byId(tree, 'main-nav').props.className, 'nav');
    assert.equal(focusCalls, 1, 'Escape returns focus to the menu trigger');
    byId(tree, 'menu-button').props.onClick();
    harness.render();
    harness.cleanup();
    keydown('Escape');
    assert.equal(byId(harness.render(), 'menu-button').props['aria-expanded'], true, 'unmounted listener must not change state');
  } finally { harness.cleanup(); }
});

test('editorial menu closes on every header navigation link including the brand and same-page anchors', () => {
  const harness = shellHarness();
  try {
    for (const id of ['header-brand', 'header-comparison', 'header-guides', 'header-products', 'header-finder']) {
      let tree = harness.render();
      byId(tree, 'menu-button').props.onClick();
      tree = harness.render();
      assert.equal(byId(tree, 'menu-button').props['aria-expanded'], true);
      const link = byId(tree, id);
      assert.equal(typeof link.props.onClick, 'function', `${id} needs close-on-navigation`);
      link.props.onClick();
      tree = harness.render();
      assert.equal(byId(tree, 'menu-button').props['aria-expanded'], false, id);
      assert.equal(byId(tree, 'main-nav').props.className, 'nav', id);
    }
  } finally { harness.cleanup(); }
});

test('editorial Layout wraps the shared shell in the scoped Canvas v4 root with a skip link', () => {
  const html = editorial();
  assert.ok(html.includes('<div class="editorial-home v4">'), 'editorial variant must render the scoped Canvas wrapper');
  assert.match(html, /<a class="skip" href="#inhalt">Zum Inhalt<\/a>/);
  assert.ok(html.includes('<main id="inhalt">Shell fixture</main>'));
});

test('editorial header uses the Canvas classes, stable IDs, local logo and canonical destinations', () => {
  const html = editorial();
  assert.match(html, /<header class="top"><div class="wrap top-inner">/);
  assert.match(html, /<a id="header-brand" class="brand" href="\/"><img src="\/brand-symbol.svg" width="39" height="39" alt=""\/>/);
  assert.match(html, /<small>Orientierung für deinen Stillalltag<\/small>/);
  assert.match(html, /<button id="menu-button" class="menu" type="button" aria-label="Menü öffnen" aria-controls="main-nav" aria-expanded="false">/);
  assert.match(html, /<nav id="main-nav" class="nav" aria-label="Hauptnavigation">/);
  for (const [id, href, label] of [
    ['header-comparison', '/#marktcheck', 'Milchpumpen'],
    ['header-guides', '/ratgeber/', 'Ratgeber'],
    ['header-products', '/produkte/', 'Zubehör'],
  ]) assert.ok(html.includes(`<a id="${id}" href="${href}">${label}</a>`));
  assert.match(html, /<a id="header-finder" class="nav-pill" href="\/ratgeber\/#pumpenfinder">Deine Kaufhilfe/);
});

test('editorial footer preserves Canvas structure, responsible publisher, sources and both comparison scopes', () => {
  const html = editorial();
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] || '';
  assert.match(footer, /^<footer class="foot" aria-labelledby="footer-title"><div class="wrap"><div class="foot-head">/);
  assert.match(footer, /<h2 id="footer-title">Was brauchst du<br\/>für den nächsten Schritt\?<\/h2>/);
  assert.match(footer, /<div class="foot-grid"><div class="foot-brand">/);
  assert.match(footer, /Redaktionell verantwortlich: Andreas Böhler\./);
  for (const [id, href] of [
    ['footer-brand', '/'],
    ['footer-guide-button', '/ratgeber/'],
    ['footer-storage', '/ratgeber/muttermilchbeutel-oder-mehrwegbecher/'],
    ['footer-cleaning', '/ratgeber/milchpumpe-reinigen/'],
    ['footer-transport', '/ratgeber/muttermilch-arbeitsplatz-transport-kuehlkette/'],
    ['footer-fit', '/ratgeber/richtige-flanschgroesse/'],
    ['footer-comparison', '/tragbare-milchpumpen/'],
    ['footer-six-models', '/vergleich/'],
    ['footer-finder', '/ratgeber/#pumpenfinder'],
    ['footer-products', '/produkte/'],
    ['footer-methodology', '/testmethodik/'],
    ['footer-about', '/ueber-uns/'],
    ['footer-impressum', '/impressum/'],
    ['footer-privacy', '/datenschutz/'],
  ]) assert.match(footer, new RegExp(`<a id="${id}"[^>]*href="${href}"`));
  assert.match(footer, />Quellen &amp; Methodik<\/a>/);
  assert.match(footer, /<button id="cookie-settings" type="button">Cookie-Einstellungen<\/button>/);
  assert.match(footer, /<p class="affiliate"><strong>Affiliate-Hinweis:<\/strong>/);
  assert.match(footer, /Als Amazon-Partner verdienen wir an qualifizierten Verkäufen/);
  assert.match(footer, /<div class="bottom"><span>© 2026 Milchpumpe-Vergleich.de<\/span>/);
  assert.match(footer, /Redaktionelle Orientierung · keine individuelle Stillberatung/);
  assert.doesNotMatch(html, /https:\/\/.*supabase|cookie-modal|cookie-panel/);
});

test('editorial footer cookie settings dispatches the existing consent event', () => {
  const harness = shellHarness();
  let reopenEvents = 0;
  harness.window.addEventListener('open-cookie-settings', () => reopenEvents++);
  try {
    const button = byId(harness.render('EditorialFooter'), 'cookie-settings');
    assert.equal(typeof button.props.onClick, 'function');
    button.props.onClick();
    assert.equal(reopenEvents, 1);
  } finally { harness.cleanup(); }
});

test('the unchanged consent component is a sibling outside the editorial v4 styling scope', () => {
  const harness = shellHarness();
  const layout = harness.components.Layout({ variant: 'editorial', children: fixture }) as ShellElement;
  const siblings = Children.toArray(layout.props.children) as ShellElement[];
  assert.equal(siblings.length, 2);
  assert.equal(siblings[0].type, 'div');
  assert.equal(siblings[0].props.className, 'editorial-home v4');
  assert.equal(siblings[1].type, harness.components.CookieConsent);
  assert.ok(!elements(siblings[0]).some(element => element.type === harness.components.CookieConsent));
  const consentSource = componentSource.slice(componentSource.indexOf('function CookieConsent()'), componentSource.indexOf('function Header()'));
  // Normalize checkout line endings only; the implementation bytes are otherwise protected.
  assert.equal(createHash('sha256').update(consentSource.replace(/\r\n/g, '\n')).digest('hex'), '3976ab77f3562932811b6aacbd3dfad2b7607e9d44837b4e891720a44f5da2f6');
});

test('default and explicit standard Layout retain the exact pre-integration SSR markup', () => {
  const expected = 'e9106925632415e3e49498031691fba352df5a54c63f64330e838980b7554542';
  for (const html of [
    renderToStaticMarkup(<Layout>{fixture}</Layout>),
    renderToStaticMarkup(<Layout variant="standard">{fixture}</Layout>),
  ]) assert.equal(createHash('sha256').update(html).digest('hex'), expected);
});

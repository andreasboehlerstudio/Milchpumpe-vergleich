import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Window } from 'happy-dom';
import * as analytics from '../src/analytics';
import { act, createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FreeGuidesHub } from '../src/free-guide-landing';
import { FREE_GUIDES } from '../src/free-guides-data';
import { purchaseCheckDownload } from '../src/newsletter-downloads';
import { EditorialHomePage } from '../src/home-editorial';
import { bindEditorialHome } from '../src/home-editorial-runtime';
import comparisonData from '../src/home-editorial-data.json';
import { VisualComparisonPage } from '../src/magazine-upgrade';
import { PumpFinder } from '../src/editorial';
import { readFileSync } from 'node:fs';
import { WearableMarketOverview, WEARABLE_MARKET } from '../src/wearable-market';

async function browser(url: string, run: (window: Window) => void | Promise<void>) {
  // Never execute or fetch Google's script in these controlled module tests.
  const window = new Window({ url, settings: { disableJavaScriptFileLoading: true, disableJavaScriptEvaluation: true, navigation: { disableMainFrameNavigation: true, disableChildPageNavigation: true } } });
  const previous = new Map<string, PropertyDescriptor | undefined>();
  for (const [key, value] of Object.entries({ window, document: window.document, location: window.location, localStorage: window.localStorage, HTMLElement: window.HTMLElement, Node: window.Node, Event: window.Event, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  try { await run(window); } finally {
    await window.happyDOM.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
}
const scripts = (window: Window) => window.document.querySelectorAll('script[src*="googletagmanager"]');
const calls = () => ((globalThis.window as any).dataLayer || []).map((args: IArguments) => Array.from(args));

test('owner opt-out is local, fail-closed and rechecked on queued and custom event dispatch', async () => {
  await browser('https://milchpumpe-vergleich.de/?analytics=off', window => {
    analytics.setConsent('accepted');
    analytics.loadAnalytics();
    assert.equal(scripts(window).length, 1, 'query parameters are not opt-out controls');
    window.localStorage.setItem('mv-analytics-owner-opt-out', '1');
    (window as any).gtag('event', 'page_view');
    analytics.trackAffiliateClick('Momcozy Mobile Flow M9', 'momcozy-m9');
    assert.equal(calls().length, 0);
    assert.equal((window as any)['ga-disable-G-4MTYQGF7VK'], true);
  });
  for (const setting of ['1', '', 'garbled']) await browser('https://milchpumpe-vergleich.de/', window => {
    analytics.setConsent('accepted');
    window.localStorage.setItem('mv-analytics-owner-opt-out', setting);
    analytics.loadAnalytics();
    assert.equal(scripts(window).length, 0, 'any present opt-out setting blocks measurement');
  });
});

test('unavailable storage fails closed without breaking consent controls', async () => {
  await browser('https://milchpumpe-vergleich.de/', window => {
    analytics.setConsent('accepted');
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('SecurityError'); } });
    assert.doesNotThrow(() => analytics.getConsent());
    assert.doesNotThrow(() => analytics.setConsent('accepted'));
    assert.doesNotThrow(() => analytics.setConsent('declined'));
    assert.doesNotThrow(() => analytics.resetConsent());
    assert.doesNotThrow(() => analytics.loadAnalytics());
    assert.equal(scripts(window).length, 0);
    assert.equal((window as any)['ga-disable-G-4MTYQGF7VK'], true);
  });
});

test('custom affiliate parameters discard free text and URL queries; referrers never suppress real visits', async () => {
  await browser('https://milchpumpe-vergleich.de/vergleich/?email=private@example.test#private', window => {
    Object.defineProperty(window.document, 'referrer', { configurable: true, value: 'https://p.superdesign.dev/project?private=secret' });
    analytics.setConsent('accepted');
    analytics.loadAnalytics();
    const config = calls().find(args => args[0] === 'config')![2] as Record<string, unknown>;
    assert.equal(config.page_location, 'https://milchpumpe-vergleich.de/vergleich/');
    assert.equal(config.page_referrer, 'https://p.superdesign.dev/');
    analytics.trackAffiliateClick('private@example.test', 'momcozy-m9', 'intent_check');
    const event = calls().find(args => args[1] === 'affiliate_click')!;
    assert.deepEqual(event[2], { product_id: 'momcozy-m9', page_path: '/vergleich/', article_slug: '', link_placement: 'intent_check', outbound_provider: 'amazon' });
    analytics.trackAffiliateClick('secret', 'private@example.test', 'private@example.test');
    assert.equal(calls().filter(args => args[1] === 'affiliate_click').length, 1);
    assert.ok(!JSON.stringify(calls()).includes('private'));
  });
});

test('real PDF renderer clicks emit one bounded guide_download; rebinding and cleanup do not duplicate listeners', async () => {
  assert.equal(typeof analytics.bindAnalyticsInteractions, 'function', 'a delegated document binding is required');
  await browser('https://milchpumpe-vergleich.de/gratis-guides/', window => {
    window.document.body.innerHTML = renderToStaticMarkup(createElement(FreeGuidesHub)) + `<a href="${purchaseCheckDownload.href}"><span id="purchase-pdf">PDF</span></a><a id="unknown" href="/downloads/private@example.test.pdf">Unknown</a><a id="external" href="https://evil.test/downloads/set-teilepass.pdf">External</a>`;
    assert.equal(window.location.pathname, '/gratis-guides/');
    assert.equal(globalThis.window.location.pathname, '/gratis-guides/');
    analytics.setConsent('accepted');
    analytics.loadAnalytics();
    analytics.bindAnalyticsInteractions(window.document as unknown as Document);
    const cleanup = analytics.bindAnalyticsInteractions(window.document as unknown as Document);
    // Observe the real delegated click, then prevent Happy DOM navigation/downloads.
    window.document.addEventListener('click', event => event.preventDefault(), true);
    window.document.querySelectorAll('.fg-download span:first-child, #purchase-pdf').forEach(target => target.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true })));
    const events = calls().filter(args => args[1] === 'guide_download');
    assert.equal(events.length, FREE_GUIDES.length + 1);
    assert.deepEqual(events.map(args => (args[2] as any).guide_id), [...FREE_GUIDES.map(guide => guide.slug), 'dein-milchpumpen-kaufcheck']);
    assert.deepEqual(events.map(args => [(args[2] as any).file_type, (args[2] as any).download_surface]), events.map(() => ['pdf', 'guide_hub']), `Current path: ${window.location.pathname}`);
    for (const id of ['unknown', 'external']) window.document.getElementById(id)!.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert.equal(calls().filter(args => args[1] === 'guide_download').length, events.length);
    cleanup();
    window.document.querySelector('.fg-download span')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    assert.equal(calls().filter(args => args[1] === 'guide_download').length, events.length);
  });
});

test('real home runtime measures comparison changes and finder results, never initial rendering or search text', async () => {
  await browser('https://milchpumpe-vergleich.de/', window => {
    window.document.body.innerHTML = renderToStaticMarkup(createElement(EditorialHomePage));
    window.document.querySelectorAll('select').forEach(select => { select.value = select.querySelector('option[selected]')?.getAttribute('value') || ''; });
    analytics.setConsent('accepted');
    analytics.loadAnalytics();
    const cleanup = bindEditorialHome(window.document.querySelector('.editorial-home-content')! as unknown as HTMLElement);
    const cleanupDelegation = analytics.bindAnalyticsInteractions(window.document as unknown as Document);
    assert.equal(calls().filter(args => args[0] === 'event').length, 0);
    const a = window.document.querySelector('#v9-compare-a')! as any;
    a.value = comparisonData.models[3].key;
    a.dispatchEvent(new window.Event('change', { bubbles: true }));
    window.document.querySelector('#v9-compare-swap')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    const events = calls().filter(args => args[1] === 'comparison_use');
    assert.equal(events.length, 2, 'one measurement per real action');
    assert.equal((events[0][2] as any).comparison_action, 'select_a');
    assert.equal((events[0][2] as any).comparison_surface, 'home');
    assert.equal((events[0][2] as any).model_a, comparisonData.models[3].key);
    assert.equal((events[1][2] as any).comparison_action, 'swap');
    const query = window.document.querySelector('#v4-model-search')! as any;
    query.value = 'private@example.test';
    query.dispatchEvent(new window.Event('input', { bubbles: true }));
    const finder = calls().filter(args => args[1] === 'finder_results');
    assert.deepEqual(finder.map(args => args[2]), [{ finder_surface: 'home_directory', filter_kind: 'query', result_count: 0 }]);
    assert.ok(!JSON.stringify(calls()).includes('private@example.test'));
    cleanup();
    cleanupDelegation();
    a.dispatchEvent(new window.Event('change', { bubbles: true }));
    assert.equal(calls().filter(args => args[1] === 'comparison_use').length, 2);
  });
});

test('delegation measures committed React comparison and finder results, with cleanup', async () => {
  await browser('https://milchpumpe-vergleich.de/vergleich/?private=secret', async window => {
    const { createRoot } = await import('react-dom/client');
    const host = window.document.createElement('div');
    window.document.body.append(host);
    const root = createRoot(host as unknown as HTMLElement);
    analytics.setConsent('accepted');
    analytics.loadAnalytics();
    const cleanup = analytics.bindAnalyticsInteractions(window.document as unknown as Document);
    const settle = () => new Promise(resolve => setTimeout(resolve, 20));
    try {
      await act(async () => { root.render(createElement('div', null, createElement(VisualComparisonPage), createElement(PumpFinder))); });
      assert.equal(calls().filter(args => args[0] === 'event').length, 0);
      const a = window.document.querySelector('#mu-compare-a')! as any;
      a.value = 'haakaa-gen3';
      await act(async () => { a.dispatchEvent(new window.Event('change', { bubbles: true })); });
      await settle();
      const comparison = calls().filter(args => args[1] === 'comparison_use');
      assert.deepEqual(comparison.map(args => args[2]), [{ comparison_surface: 'detail_comparison', comparison_action: 'select_a', model_a: 'haakaa-gen3', model_b: 'medela-freestyle' }]);
      const architecture = window.document.querySelector('#pumpenfinder select')! as any;
      architecture.value = 'fully-in-bra-electric-wearable';
      await act(async () => { architecture.dispatchEvent(new window.Event('change', { bubbles: true })); });
      await settle();
      const count = window.document.querySelectorAll('[data-finder-model]').length;
      assert.ok(count > 0);
      assert.deepEqual(calls().filter(args => args[1] === 'finder_results').map(args => args[2]), [{ finder_surface: 'magazine_finder', filter_kind: 'architecture', result_count: count }]);
      await act(async () => { architecture.dispatchEvent(new window.Event('change', { bubbles: true })); cleanup(); });
      await settle();
      assert.equal(calls().filter(args => args[1] === 'finder_results').length, 1, 'cleanup cancels scheduled measurements');
      assert.ok(!JSON.stringify(calls()).includes('private'));
    } finally { cleanup(); await act(async () => root.unmount()); }
  });
});

test('browser bootstrap installs lightweight delegation before awaiting a route chunk', () => {
  const source = readFileSync(new URL('../src/main.tsx', import.meta.url), 'utf8');
  const binding = source.indexOf('bindAnalyticsInteractions(document)');
  assert.ok(binding > 0 && binding < source.indexOf('Promise.all([loadRoute(initialPath)'), 'SSR PDF links must be measured even during a slow or failed page import');
});

test('market route purchase links including case shortlists are measured once', async () => {
  await browser('https://milchpumpe-vergleich.de/tragbare-milchpumpen/', window => {
    window.document.body.innerHTML = renderToStaticMarkup(createElement(WearableMarketOverview));
    analytics.setConsent('accepted');
    analytics.loadAnalytics();
    const cleanup = analytics.bindAnalyticsInteractions(window.document as unknown as Document);
    window.document.addEventListener('click', event => event.preventDefault(), true);
    const links = [...window.document.querySelectorAll('.wearable-market__shop')];
    for (const link of links) link.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
    const events = calls().filter(args => args[1] === 'affiliate_click');
    assert.equal(events.length, links.length);
    assert.equal(events.filter(args => (args[2] as any).link_placement === 'market_model_card').length, WEARABLE_MARKET.models.length);
    assert.ok(events.some(args => (args[2] as any).link_placement === 'market_case_shortlist'));
    const ids = new Set(WEARABLE_MARKET.models.map(model => `${model.brand}|${model.canonicalModel}`));
    assert.ok(events.every(args => ids.has((args[2] as any).product_id)));
    cleanup();
  });
});

test('every custom event path independently respects origin, consent and owner exclusion', async () => {
  for (const scenario of ['nonproduction', 'declined', 'owner', 'expired']) {
    await browser(scenario === 'nonproduction' ? 'http://localhost/' : 'https://milchpumpe-vergleich.de/', window => {
      analytics.setConsent(scenario === 'declined' ? 'declined' : 'accepted');
      if (scenario === 'owner') window.localStorage.setItem('mv-analytics-owner-opt-out', '1');
      if (scenario === 'expired') window.localStorage.setItem('mv-analytics-consent-v1', JSON.stringify({ value: 'accepted', timestamp: 0 }));
      const dispatched: unknown[] = [];
      (window as any).gtag = (...args: unknown[]) => dispatched.push(args);
      analytics.trackAffiliateClick('', 'momcozy-m9');
      analytics.trackComparisonUse('home', 'select_a', comparisonData.models[0].key, comparisonData.models[1].key);
      analytics.trackFinderResults('magazine_finder', 'query', 0);
      window.document.body.innerHTML = `<a href="/downloads/set-teilepass.pdf"><span>PDF</span></a>`;
      const cleanup = analytics.bindAnalyticsInteractions(window.document as unknown as Document);
      window.document.querySelector('span')!.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
      assert.equal(dispatched.length, 0, scenario);
      cleanup();
    });
  }
});

test('known Pinterest campaign attribution survives URL minimization without arbitrary query values', async () => {
  await browser('https://milchpumpe-vergleich.de/ratgeber/momcozy-m9-ohne-app/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=modellfragen&utm_content=private@example.test&email=private@example.test', window => {
    analytics.setConsent('accepted'); analytics.loadAnalytics();
    const config = calls().find(args => args[0] === 'config')![2] as Record<string, unknown>;
    assert.equal(config.campaign_source, 'pinterest');
    assert.equal(config.campaign_medium, 'organic_social');
    assert.equal(config.campaign_name, 'modellfragen');
    assert.equal(config.campaign_content, undefined);
    assert.ok(!JSON.stringify(calls()).includes('private@'));
  });
  for (const suffix of ['utm_source=pinterest&utm_medium=organic_social&utm_campaign=private@example.test', 'utm_source=private@example.test&utm_medium=organic_social&utm_campaign=modellfragen', 'utm_source=pinterest&utm_source=evil&utm_medium=organic_social&utm_campaign=modellfragen']) {
    await browser(`https://milchpumpe-vergleich.de/?${suffix}`, window => {
      analytics.setConsent('accepted'); analytics.loadAnalytics();
      const config = calls().find(args => args[0] === 'config')![2] as Record<string, unknown>;
      assert.equal(config.campaign_source, undefined);
      assert.equal(config.campaign_name, undefined);
      assert.ok(!JSON.stringify(calls()).includes('private@'));
    });
  }
});

test('only the exact HTTPS apex production origin can load or dispatch Analytics', async () => {
  for (const origin of ['http://localhost:3000', 'https://p.superdesign.dev', 'https://preview.milchpumpe-vergleich.de', 'https://www.milchpumpe-vergleich.de', 'https://milchpumpe-vergleich.de.evil.test', 'https://evil-milchpumpe-vergleich.de', 'http://milchpumpe-vergleich.de', 'https://milchpumpe-vergleich.de:444']) {
    await browser(`${origin}/`, window => {
      analytics.setConsent('accepted');
      const dispatched: unknown[] = [];
      (window as any).gtag = (...args: unknown[]) => dispatched.push(args);
      analytics.loadAnalytics();
      analytics.trackAffiliateClick('Momcozy Mobile Flow M9', 'momcozy-m9');
      assert.equal(scripts(window).length, 0, origin);
      assert.equal(dispatched.length, 0, `dispatch must independently reject ${origin}`);
      assert.equal((window as any)['ga-disable-G-4MTYQGF7VK'], true);
    });
  }
  await browser('https://milchpumpe-vergleich.de/', window => {
    analytics.setConsent('accepted');
    analytics.loadAnalytics();
    analytics.loadAnalytics();
    assert.equal(scripts(window).length, 1);
    assert.equal(calls().filter(args => args[0] === 'config').length, 1);
  });
});

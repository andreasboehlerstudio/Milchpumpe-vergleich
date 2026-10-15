import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getConsent, loadAnalytics, resetConsent, setConsent, trackAffiliateClick } from '../src/analytics';

function browser() {
  const store = new Map<string, string>();
  const scripts: any[] = [];
  const deletedCookies: string[] = [];
  let cookies = '_ga=example; _ga_TEST=example';
  let reloads = 0;
  const document = {
    createElement: () => ({ async: false, src: '' }),
    head: { appendChild: (script: any) => scripts.push(script) },
    get cookie() { return cookies; },
    set cookie(value: string) { deletedCookies.push(value); cookies = ''; },
  };
  (globalThis as any).window = { location: { pathname: '/ratgeber/test/', hostname: 'localhost', reload: () => reloads++ } };
  (globalThis as any).location = (globalThis as any).window.location;
  (globalThis as any).document = document;
  (globalThis as any).localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  };
  return { store, scripts, deletedCookies, get reloads() { return reloads; }, cleanup() {
    for (const key of ['window', 'location', 'document', 'localStorage']) delete (globalThis as any)[key];
  } };
}

test('withdrawal disables loaded Analytics and blocks previously queued and subsequent page events', () => {
  const b = browser();
  try {
    setConsent('accepted');
    loadAnalytics();
    assert.equal(b.scripts.length, 1);
    resetConsent();
    setConsent('declined');
    assert.equal((window as any)['ga-disable-G-4MTYQGF7VK'], true, 'Loaded Analytics must be explicitly disabled');
    assert.equal(window.dataLayer?.length, 0, 'Queued events must not survive withdrawal');
    window.gtag?.('event', 'page_view');
    trackAffiliateClick('Example', 'example', 'test');
    assert.equal(window.dataLayer?.length, 0, 'No events can be queued after withdrawal');
    assert.ok(b.deletedCookies.some(cookie => cookie.startsWith('_ga=')));
  } finally { b.cleanup(); }
});

test('expired consent disables an already-loaded Analytics runtime', () => {
  const b = browser();
  try {
    setConsent('accepted');
    loadAnalytics();
    b.store.set('mv-analytics-consent-v1', JSON.stringify({ value: 'accepted', timestamp: 0 }));
    assert.equal(getConsent(), null);
    assert.equal((window as any)['ga-disable-G-4MTYQGF7VK'], true);
    assert.equal(window.dataLayer?.length, 0);
  } finally { b.cleanup(); }
});

test('Analytics loading is gated at the loader and reacceptance does not inject duplicate scripts', () => {
  const b = browser();
  try {
    loadAnalytics();
    assert.equal(b.scripts.length, 0);
    setConsent('accepted');
    loadAnalytics();
    loadAnalytics();
    assert.equal(b.scripts.length, 1);
    resetConsent();
    setConsent('declined');
    assert.equal(b.reloads, 1, 'A loaded runtime is torn down with a page reload on withdrawal');
    setConsent('accepted');
    loadAnalytics();
    assert.equal((window as any)['ga-disable-G-4MTYQGF7VK'], false);
    assert.equal(b.scripts.length, 1);
    trackAffiliateClick('Example', 'example', 'test');
    assert.equal(window.dataLayer?.length, 1);
  } finally { b.cleanup(); }
});

test('malformed and future-dated consent cannot authorize Analytics', () => {
  const b = browser();
  try {
    for (const value of [
      { value: 'accepted' },
      { value: 'other', timestamp: Date.now() },
      { value: 'accepted', timestamp: 'not-a-date' },
      { value: 'accepted', timestamp: Date.now() + 60_000 },
    ]) {
      b.store.set('mv-analytics-consent-v1', JSON.stringify(value));
      assert.equal(getConsent(), null);
      loadAnalytics();
      assert.equal(b.scripts.length, 0);
    }
  } finally { b.cleanup(); }
});

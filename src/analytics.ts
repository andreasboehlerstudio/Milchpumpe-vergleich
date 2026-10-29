const GA_ID = 'G-4MTYQGF7VK';
const CONSENT_KEY = 'mv-analytics-consent-v1';
const OWNER_OPT_OUT_KEY = 'mv-analytics-owner-opt-out';
const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 180;

// ID-only projection: never pull the catalogue, article bodies or market evidence into bootstrap.
const PRODUCT_IDS = new Set(`momcozy-m9 medela-freestyle philips-avent-scf547 momcozy-s12-pro elvie-pump-single haakaa-gen3 medela-harmony medela-solo medela-swing-maxi lansinoh-elektrische-doppelmilchpumpe lansinoh-handmilchpumpe ardo-calypso ardo-alyssa-double ardo-amaryll-start ardo-melia beurer-by-40 momcozy-m6 momcozy-s9-pro lansinoh-muttermilchbeutel lansinoh-silikon-muttermilchbeutel lansinoh-muttermilchflaschen medela-easy-pour-storage-bags medela-muttermilchflaschen medela-cooler-bag ardo-easy-store ardo-bottle-set ardo-kuehltasche mam-aufbewahrungsbecher mam-muttermilchbeutel ceres-chill-og-plus momcozy-portable-cooler-22oz philips-avent-scf145-06 philips-avent-scf291-01 philips-avent-scf293-01 philips-avent-scf149-00 mam-soft-brush mam-mikrowellen-dampfsterilisator medela-quick-clean-microwave-bags philips-avent-cp2203-01 philips-avent-cp2218-01 nuk-vario-express nuk-flaschenbuerste-twist nuk-multi-dry chicco-modularer-sterilisator-trocknung chicco-sterilisator-mikrowelle lansinoh-waschbare-stilleinlagen lansinoh-blue-lock-stilleinlagen lansinoh-hpa-lanolin lansinoh-naturalwave-babyflasche lansinoh-bio-brustwarzensalbe medela-purelan-lanolincreme medela-safe-dry-waschbare-stilleinlagen medela-ultra-atmungsaktive-einweg-stilleinlagen medela-3-in-1-still-abpump-bh philips-avent-natural-response-airfree-scy673-01 theraline-original-stillkissen theraline-yinnie-stillkissen mam-easy-start-anti-colic-baby-bottle philips-avent-scf358-00 medela-classic-personalfit-flex-double-kit medela-calma-feeding-system`.split(' '));
const MARKET_IDS = new Set([
  'Ardo|Alyssa Hands-Free', 'Ardo|Melia', 'Bebeconfort|Discreet (3101202300)', 'Elvie|Pump', 'Elvie|Stride', 'Elvie|Stride 2', 'eufy|E10 (T8D03)', 'eufy|E20', 'eufy|S1 (T8D02)', 'eufy|S2 Pro (Amazon T60A1; Hersteller T600P + T60A0)', 'Fizimed|Emy Pump', 'Kinderkraft|MAMAFLOW', 'KISSBOBO|K5', 'Lansinoh|Tragbare Milchpumpe (Wearable)', 'Lionelo|Fidi Free Slim (LOC-FIDI FREE SLIM)', 'Medela|Freestyle Hands-free', 'Medela|Freestyle Mini Hands-free', 'Medela|Melody InBra', 'Medela|Motion InBra', 'Medela|Solo Hands-free', 'Medela|Swing Maxi Hands-free', 'Momcozy|Air 1', 'Momcozy|M5', 'Momcozy|M5 Smart', 'Momcozy|Mobile Flow M9', 'Momcozy|Mobile Style M6', 'Momcozy|S12 Pro', 'Momcozy|S12 Pro Quick', 'Momcozy|S9 Pro', 'Momcozy|V1 Pro', 'Momcozy|V2 Pro', 'NCVI|8131', 'NCVI|AM8161A (beheiztes Wearable)', 'Neno|Sole (beobachtete Variante Sole Twin)', 'Nuliie|S32', 'Perifit|Pump', 'Philips Avent|Hands-free elektrische Doppelmilchpumpe SCF547/11', 'Philips Avent|Natural Care SCF495/11', 'Tommee Tippee|Made for Me In-Bra Wearable', 'Willow|Go (PDL60)',
]);
const PLACEMENTS = new Set(['product_card', 'intent_check', 'practical_tip', 'home_model_comparison', 'home_case_shortlist', 'market_model_card', 'market_case_shortlist']);

function knownCampaign(): Record<string, string> {
  // Only the already-published editorial campaign is recognized. Never copy
  // arbitrary UTM values, search terms, ad IDs or URL content into config.
  const params = new URLSearchParams(window.location.search);
  const expected = { utm_source: 'pinterest', utm_medium: 'organic_social', utm_campaign: 'modellfragen' };
  if (!Object.entries(expected).every(([key, value]) => params.getAll(key).length === 1 && params.get(key) === value)) return {};
  return { campaign_source: 'pinterest', campaign_medium: 'organic_social', campaign_name: 'modellfragen' };
}

function referrerOrigin(): string {
  try { const url = new URL(document.referrer); return ['http:', 'https:'].includes(url.protocol) ? `${url.origin}/` : ''; }
  catch { return ''; }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    gaLoaded?: boolean;
  }
}

type StoredConsent = { value: 'accepted' | 'declined'; timestamp: number };

function canMeasure(): boolean {
  if (typeof window === 'undefined') return false;
  // www is a redirect-only alias, never an additional measurement origin.
  let allowed = false;
  try {
    allowed = window.location.origin === 'https://milchpumpe-vergleich.de'
      && localStorage.getItem(OWNER_OPT_OUT_KEY) === null
      && getConsent()?.value === 'accepted';
  } catch { /* Unavailable storage never authorizes measurement. */ }
  if (!allowed) disableAnalytics();
  return allowed;
}

function disableAnalytics() {
  if (typeof window === 'undefined') return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  window.dataLayer?.splice(0);
}

export function getConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as StoredConsent | null;
    if (!parsed || !['accepted', 'declined'].includes(parsed.value) || typeof parsed.timestamp !== 'number' || !Number.isFinite(parsed.timestamp) || parsed.timestamp > Date.now() || Date.now() - parsed.timestamp > CONSENT_MAX_AGE) {
      localStorage.removeItem(CONSENT_KEY);
      disableAnalytics();
      return null;
    }
    return parsed;
  } catch {
    try { localStorage.removeItem(CONSENT_KEY); } catch { /* Storage can be denied. */ }
    disableAnalytics();
    return null;
  }
}

export function setConsent(value: StoredConsent['value']) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, timestamp: Date.now() })); }
  catch { disableAnalytics(); }
  if (value === 'declined') {
    disableAnalytics();
    removeAnalyticsCookies();
    if (window.gaLoaded) window.location.reload();
  }
}

export function loadAnalytics() {
  if (typeof window === 'undefined') return;
  if (!canMeasure()) {
    disableAnalytics();
    return;
  }
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  if (window.gaLoaded) return;
  window.gaLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(..._args: unknown[]) {
    if (!canMeasure() || (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] === true) return;
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 15_552_000,
    send_page_view: true,
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: referrerOrigin(),
    ...knownCampaign(),
  });
}

export function trackAffiliateClick(_productName: string, productId = '', placement = 'product_card') {
  if (!canMeasure()) return;
  if ((!PRODUCT_IDS.has(productId) && !MARKET_IDS.has(productId)) || !PLACEMENTS.has(placement)) return;
  const pagePath = window.location.pathname;
  const articleSlug = pagePath.match(/^\/ratgeber\/([^/]+)\/$/)?.[1] || '';
  window.gtag?.('event', 'affiliate_click', {

    product_id: productId,
    page_path: pagePath,
    article_slug: articleSlug,
    link_placement: placement,
    outbound_provider: 'amazon',
  });
}

const GUIDE_IDS = new Set(['unterwegs-packplan', 'arbeitsplatz-uebergabeplan', 'reinigung-teileroutine', 'passform-beratungsvorbereitung', 'set-teilepass', 'dein-milchpumpen-kaufcheck']);
const bindings = new WeakMap<Document, () => void>();

type ComparisonAction = 'select_a' | 'select_b' | 'swap' | 'reset' | 'preset' | 'directory_pick' | 'open' | 'share' | 'differences';
export function trackComparisonUse(surface: 'home' | 'detail_comparison', action: ComparisonAction, modelA: string, modelB: string) {
  const ids = surface === 'home' ? MARKET_IDS : PRODUCT_IDS;
  if (!['home', 'detail_comparison'].includes(surface) || !['select_a', 'select_b', 'swap', 'reset', 'preset', 'directory_pick', 'open', 'share', 'differences'].includes(action) || !ids.has(modelA) || !ids.has(modelB)) return;
  dispatchEvent('comparison_use', { comparison_surface: surface, comparison_action: action, model_a: modelA, model_b: modelB });
}

export function trackFinderResults(surface: 'home_directory' | 'magazine_finder', kind: 'query' | 'architecture' | 'offers' | 'reset', count: number) {
  if (!['home_directory', 'magazine_finder'].includes(surface) || !['query', 'architecture', 'offers', 'reset'].includes(kind) || !Number.isInteger(count) || count < 0 || count > 100) return;
  dispatchEvent('finder_results', { finder_surface: surface, filter_kind: kind, result_count: count });
}

function dispatchEvent(name: string, params: Record<string, string | number>) {
  if (canMeasure()) window.gtag?.('event', name, params);
}

/** Delegation also covers direct PDFs in SSR while the route chunk is pending. */
export function bindAnalyticsInteractions(root: Document): () => void {
  bindings.get(root)?.();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let finderTimer: ReturnType<typeof setTimeout> | undefined;
  const afterRender = (callback: () => void, delay = 0) => {
    if (!canMeasure()) return;
    const consentTimestamp = getConsent()?.timestamp;
    const timer = setTimeout(() => {
      timers.delete(timer);
      if (canMeasure() && getConsent()?.timestamp === consentTimestamp) callback();
    }, delay);
    timers.add(timer);
    return timer;
  };
  const measureComparison = (action: ComparisonAction) => afterRender(() => {
    const a = root.querySelector<HTMLSelectElement>('#mu-compare-a');
    const b = root.querySelector<HTMLSelectElement>('#mu-compare-b');
    if (a && b) trackComparisonUse('detail_comparison', action, a.value, b.value);
  });
  const measureFinder = (kind: 'query' | 'architecture' | 'offers' | 'reset') => {
    if (finderTimer !== undefined) { clearTimeout(finderTimer); timers.delete(finderTimer); }
    finderTimer = afterRender(() => trackFinderResults('magazine_finder', kind, root.querySelectorAll('#pumpenfinder [data-finder-model]').length), kind === 'query' ? 500 : 0);
  };
  const onChange = (event: Event) => {
    const target = event.target as Element | null;
    if (target?.id === 'mu-compare-a') measureComparison('select_a');
    else if (target?.id === 'mu-compare-b') measureComparison('select_b');
    else if (target?.id === 'mu-differences') measureComparison('differences');
    else if (target?.matches('#pumpenfinder select')) {
      const selects = root.querySelectorAll('#pumpenfinder select');
      measureFinder(target === selects[0] ? 'architecture' : 'offers');
    }
  };
  const onInput = (event: Event) => {
    if ((event.target as Element | null)?.matches?.('#pumpenfinder input[type="search"]')) measureFinder('query');
  };
  const onClick = (event: Event) => {
    if (event.defaultPrevented) return;
    const control = (event.target as Element | null)?.closest?.('button');
    if (control?.id === 'mu-compare-swap') measureComparison('swap');
    else if (control?.id === 'mu-compare-reset') measureComparison('reset');
    else if (control?.id === 'mu-compare-share') measureComparison('share');
    else if (control?.matches('#pumpenfinder .finder-reset')) measureFinder('reset');
    const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href]');
    if (!link || !canMeasure()) return;
    const url = new URL(link.href, window.location.href);
    // Only these previously untracked market anchors are delegated. Existing
    // React/home affiliate handlers remain their single event owner.
    if (window.location.pathname === '/tragbare-milchpumpen/' && link.matches('.wearable-market__shop[rel~="sponsored"]') && ['www.amazon.de', 'amazon.de'].includes(url.hostname)) {
      const card = link.closest<HTMLElement>('[data-market-model]');
      const caseName = link.closest('.wearable-market__case')?.querySelector('.wearable-market__candidate')?.textContent;
      const id = card?.dataset.marketModel || [...MARKET_IDS].find(key => key.replace('|', ' ') === caseName);
      if (id) trackAffiliateClick('', id, card ? 'market_model_card' : 'market_case_shortlist');
      return;
    }
    const guideId = url.pathname.match(/^\/downloads\/([^/]+)\.pdf$/)?.[1];
    if (url.origin !== window.location.origin || !guideId || !GUIDE_IDS.has(guideId)) return;
    const path = window.location.pathname;
    const surface = path === '/gratis-guides/' ? 'guide_hub' : path.startsWith('/gratis-guides/') ? 'guide_landing' : path === '/kaufcheck/' ? 'purchase_check' : 'other';
    dispatchEvent('guide_download', { guide_id: guideId, file_type: 'pdf', download_surface: surface });
  };
  root.addEventListener('click', onClick, true);
  root.addEventListener('change', onChange);
  root.addEventListener('input', onInput);
  const cleanup = () => {
    root.removeEventListener('click', onClick, true);
    root.removeEventListener('change', onChange);
    root.removeEventListener('input', onInput);
    timers.forEach(clearTimeout);
    timers.clear();
    if (bindings.get(root) === cleanup) bindings.delete(root);
  };
  bindings.set(root, cleanup);
  return cleanup;
}

export function removeAnalyticsCookies() {
  if (typeof document === 'undefined') return;
  const names = document.cookie.split(';').map((cookie) => cookie.split('=')[0].trim());
  const domains = [location.hostname, `.${location.hostname}`];
  for (const name of names) {
    if (name === '_ga' || name.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
      }
    }
  }
}

export function resetConsent() {
  disableAnalytics();
  try { localStorage.removeItem(CONSENT_KEY); } catch { /* Keep withdrawal usable. */ }
  removeAnalyticsCookies();
}

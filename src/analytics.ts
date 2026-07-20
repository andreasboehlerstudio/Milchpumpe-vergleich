const GA_ID = 'G-4MTYQGF7VK';
const CONSENT_KEY = 'mv-analytics-consent-v1';
const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 180;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    gaLoaded?: boolean;
  }
}

type StoredConsent = { value: 'accepted' | 'declined'; timestamp: number };

export function getConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as StoredConsent | null;
    if (!parsed || Date.now() - parsed.timestamp > CONSENT_MAX_AGE) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(CONSENT_KEY);
    return null;
  }
}

export function setConsent(value: StoredConsent['value']) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, timestamp: Date.now() }));
}

export function loadAnalytics() {
  if (typeof window === 'undefined' || window.gaLoaded) return;
  window.gaLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(..._args: unknown[]) {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 15_552_000,
    send_page_view: true,
  });
}

export function trackAffiliateClick(productName: string) {
  window.gtag?.('event', 'affiliate_click', {
    product_name: productName,
    outbound_provider: 'amazon',
  });
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
  localStorage.removeItem(CONSENT_KEY);
  removeAnalyticsCookies();
}

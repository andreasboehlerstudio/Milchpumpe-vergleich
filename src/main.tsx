import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouteView } from './route-view';
import { loadRoute } from './route-loader';
import { routeFamily } from './route-family';
import { SITE_URL } from './product-data';
import { RouteLoadingConsent } from './components';
import './index.css';
import './editorial.css';
import './visual-editorial.css';
import './methodology-v4.css';
import './wearable-market.css';
import './home-editorial.css';
import './site-editorial.css';
import './magazine-upgrade.css';
import './newsletter.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

// This independent, empty sibling never touches the complete SSR subtree. It keeps
// consent available during a slow/failed import, including the SSR footer control.
const consentContainer = document.createElement('div');
document.body.appendChild(consentContainer);
const consentRoot = createRoot(consentContainer);
consentRoot.render(<StrictMode><RouteLoadingConsent /></StrictMode>);
const cookieButton = document.getElementById('cookie-settings');
const reopenCookies = () => window.dispatchEvent(new Event('open-cookie-settings'));
cookieButton?.addEventListener('click', reopenCookies);

// Keep complete prerendered markup untouched until the selected family is ready.
const initialPath = window.location.pathname;
// Do not download landing presentation on any other route. Local/dev routes do
// not have prerendered head tags, so use the same lightweight metadata as SSR.
const presentationReady = routeFamily(initialPath) === 'free-guides' ? Promise.all([
  import('./free-guide-landing.css'),
  import('./free-guides-data').then(({ FREE_GUIDE_SEO }) => {
    const normalized = `${initialPath.replace(/\/$/, '')}/`;
    const seo = FREE_GUIDE_SEO.find(page => page.path === normalized);
    if (!seo) return;
    document.title = seo.title;
    const canonical = `${SITE_URL}${seo.path}`;
    const attributes = [
      ['meta', 'name', 'description', 'content', seo.description],
      ['meta', 'name', 'robots', 'content', 'index,follow,max-image-preview:large'],
      ['meta', 'property', 'og:title', 'content', seo.title],
      ['meta', 'property', 'og:description', 'content', seo.description],
      ['meta', 'property', 'og:url', 'content', canonical],
      ['meta', 'name', 'twitter:title', 'content', seo.title],
      ['meta', 'name', 'twitter:description', 'content', seo.description],
      ['link', 'rel', 'canonical', 'href', canonical],
    ];
    for (const [tag, key, value, attribute, content] of attributes) {
      const element = document.head.querySelector(`${tag}[${key}="${value}"]`) || document.head.appendChild(document.createElement(tag));
      element.setAttribute(key, value);
      element.setAttribute(attribute, content);
    }
  }),
]) : routeFamily(initialPath) === 'newsletter' ? Promise.all([
  import('./newsletter-landing.css'),
  import('./newsletter-provider-form.css'),
  import('./newsletter').then(({ getNewsletterRouteSeo }) => {
    const seo = getNewsletterRouteSeo();
    const canonical = `${SITE_URL}${seo.path}`;
    document.title = seo.title;
    const attributes = [
      ['meta', 'name', 'description', 'content', seo.description],
      ['meta', 'name', 'robots', 'content', seo.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'],
      ['meta', 'property', 'og:title', 'content', seo.title],
      ['meta', 'property', 'og:description', 'content', seo.description],
      ['meta', 'property', 'og:url', 'content', canonical],
      ['meta', 'name', 'twitter:title', 'content', seo.title],
      ['meta', 'name', 'twitter:description', 'content', seo.description],
      ['link', 'rel', 'canonical', 'href', canonical],
    ];
    for (const [tag, key, value, attribute, content] of attributes) {
      const element = document.head.querySelector(`${tag}[${key}="${value}"]`) || document.head.appendChild(document.createElement(tag));
      element.setAttribute(key, value);
      element.setAttribute(attribute, content);
    }
  }),
]) : Promise.resolve();
Promise.all([loadRoute(initialPath), presentationReady]).then(([Page]) => {
  cookieButton?.removeEventListener('click', reopenCookies);
  consentRoot.unmount();
  consentContainer.remove();
  const app = <StrictMode><RouteView initialPath={initialPath} Page={Page} /></StrictMode>;
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
}).catch(error => console.error('Route hydration unavailable; retaining server content.', error));

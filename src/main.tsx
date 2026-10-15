import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouteView } from './route-view';
import { loadRoute } from './route-loader';
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
loadRoute(initialPath).then(Page => {
  cookieButton?.removeEventListener('click', reopenCookies);
  consentRoot.unmount();
  consentContainer.remove();
  const app = <StrictMode><RouteView initialPath={initialPath} Page={Page} /></StrictMode>;
  if (container.hasChildNodes()) hydrateRoot(container, app);
  else createRoot(container).render(app);
}).catch(error => console.error('Route hydration unavailable; retaining server content.', error));

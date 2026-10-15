import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
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

const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

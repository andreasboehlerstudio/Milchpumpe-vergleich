import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Check, Cookie, ExternalLink, Menu, ShieldCheck, X } from 'lucide-react';
import { getConsent, loadAnalytics, resetConsent, setConsent, trackAffiliateClick } from './analytics';
import { CONTACT_EMAIL, PRODUCTS, type Product, amazonUrl, productUrl } from './data';

export function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <div className={`product-visual${compact ? ' product-visual--compact' : ''}`} style={{ '--product-color': product.color } as CSSProperties} role="img" aria-label={`Grafische Kennzeichnung für ${product.brand} ${product.name}; kein Produktfoto`}>
      <span>{product.initials}</span>
      <small>{product.brand}</small>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
      <ol>
        <li><a href="/">Startseite</a></li>
        {items.map((item, index) => (
          <li key={item.href} aria-current={index === items.length - 1 ? 'page' : undefined}>
            {index === items.length - 1 ? item.label : <a href={item.href}>{item.label}</a>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="source-link" href={href} target="_blank" rel="noopener noreferrer">{children}<ExternalLink size={15} aria-hidden="true" /></a>;
}

export function AffiliateLink({ product, className = 'button button--primary', children = 'Preis bei Amazon prüfen*' }: { product: Product; className?: string; children?: ReactNode }) {
  return (
    <a className={className} href={amazonUrl(product)} target="_blank" rel="noopener sponsored" onClick={() => trackAffiliateClick(`${product.brand} ${product.name}`)}>
      {children}<ExternalLink size={17} aria-hidden="true" />
    </a>
  );
}

function CookieConsent() {
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const essentialButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) setOpen(true);
    if (consent?.value === 'accepted') loadAnalytics();
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  useEffect(() => {
    if (open) essentialButtonRef.current?.focus();
  }, [open]);

  const choose = (value: 'accepted' | 'declined') => {
    setConsent(value);
    if (value === 'accepted') loadAnalytics();
    if (value === 'declined') resetConsent(), setConsent('declined');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-backdrop">
      <section className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <div className="cookie-icon"><Cookie aria-hidden="true" /></div>
        <div>
          <p className="eyebrow">Deine Entscheidung</p>
          <h2 id={titleId}>Anonyme Nutzungsanalyse erlauben?</h2>
          <p id={descriptionId}>Wir laden Google Analytics mit der Mess-ID G-4MTYQGF7VK ausschließlich nach deiner Einwilligung. Ohne Zustimmung werden keine Analytics-Skripte geladen. Notwendige Einstellungen speichern wir lokal im Browser.</p>
          <a className="text-link" href="/datenschutz/">Details in der Datenschutzerklärung</a>
        </div>
        <div className="cookie-actions">
          <button className="button button--primary" onClick={() => choose('accepted')}>Analyse erlauben</button>
          <button ref={essentialButtonRef} className="button button--secondary" onClick={() => choose('declined')}>Nur notwendige Funktionen</button>
        </div>
      </section>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Milchpumpe-Vergleich.de – Startseite">
        <span className="brand-mark" aria-hidden="true">M</span>
        <span>Milchpumpe<span>-Vergleich.de</span></span>
      </a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} onClick={() => setMenuOpen((value) => !value)}>
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Hauptnavigation">
        <a href="/vergleich/">Vergleich</a>
        <a href="/ratgeber/">Ratgeber</a>
        <a href="/testmethodik/">Methodik</a>
        <a href="/ueber-uns/">Über uns</a>
      </nav>
    </header>
  );
}

function Footer() {
  const openCookies = () => window.dispatchEvent(new Event('open-cookie-settings'));
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <a className="brand brand--footer" href="/"><span className="brand-mark">M</span><span>Milchpumpe<span>-Vergleich.de</span></span></a>
          <p>Redaktionelle Orientierung zu Milchpumpen – mit offengelegten Quellen, ohne erfundene Testnoten und ohne individuelle medizinische Beratung.</p>
        </div>
        <div>
          <h2>Inhalte</h2>
          <ul>
            <li><a href="/vergleich/">Direkter Vergleich</a></li>
            <li><a href="/ratgeber/">Ratgeber</a></li>
            <li><a href="/testmethodik/">Vergleichsmethodik</a></li>
            <li><a href="/ueber-uns/">Über die Redaktion</a></li>
          </ul>
        </div>
        <div>
          <h2>Rechtliches</h2>
          <ul>
            <li><a href="/impressum/">Impressum</a></li>
            <li><a href="/datenschutz/">Datenschutz</a></li>
            <li><button className="link-button" type="button" onClick={openCookies}>Cookie-Einstellungen</button></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>Kontakt</a></li>
          </ul>
        </div>
      </div>
      <div className="affiliate-note">
        <strong>Affiliate-Hinweis:</strong> Mit * gekennzeichnete Links führen zu Amazon. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Für dich ändert sich der Preis nicht. Reihenfolge und redaktionelle Einordnung werden nicht durch Provisionen bestimmt.
      </div>
      <p className="copyright">© 2026 Milchpumpe-Vergleich.de</p>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}

export function TrustStrip() {
  return (
    <div className="trust-strip" aria-label="Redaktionelle Grundsätze">
      <span><ShieldCheck aria-hidden="true" /> Quellen offengelegt</span>
      <span><Check aria-hidden="true" /> Keine erfundenen Bewertungen</span>
      <span><Check aria-hidden="true" /> Werbung klar gekennzeichnet</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <ProductVisual product={product} />
      <div className="product-card__body">
        <p className="eyebrow">{product.focus}</p>
        <h2><a href={productUrl(product)}>{product.brand} {product.name}</a></h2>
        <p>{product.summary}</p>
        <dl className="mini-specs">
          <div><dt>Bauart</dt><dd>{product.category}</dd></div>
          <div><dt>Ausführung</dt><dd>{product.set}</dd></div>
          <div><dt>App</dt><dd>{product.app ? 'Ja' : 'Nein'}</dd></div>
        </dl>
        <div className="card-actions">
          <a className="button button--secondary" href={productUrl(product)}>Details und Quellen</a>
          <AffiliateLink product={product} />
        </div>
      </div>
    </article>
  );
}

export function AllProductsAside({ currentId }: { currentId?: string }) {
  return (
    <aside className="related-products" aria-labelledby="related-title">
      <h2 id="related-title">Weitere Modelle</h2>
      <div className="related-grid">
        {PRODUCTS.filter((product) => product.id !== currentId).slice(0, 3).map((product) => (
          <a key={product.id} href={productUrl(product)}>
            <ProductVisual product={product} compact />
            <span><small>{product.brand}</small>{product.name}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Check, Cookie, ExternalLink, Menu, ShieldCheck, X } from 'lucide-react';
import { getConsent, loadAnalytics, resetConsent, setConsent, trackAffiliateClick } from './analytics';
import { CONTACT_EMAIL, PRODUCTS, type Product, amazonUrl, productUrl } from './product-data';

export function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  const manual = product.id === 'haakaa-gen3';
  const external = ['medela-freestyle', 'philips-avent-scf547'].includes(product.id);
  const architecture = manual ? 'manual' : external ? 'external' : 'integrated';
  const label = manual ? 'Manuelle Silikonpumpe' : external ? 'Cups im BH · Motor separat' : 'Motor und Cup gemeinsam im BH';
  return (
    <div className={`product-visual${compact ? ' product-visual--compact' : ' product-visual--diagram'}`} style={{ '--product-color': product.color } as CSSProperties} role="img" aria-label={`${product.brand} ${product.name}: ${compact ? 'grafische Modellkennzeichnung' : `schematische Bauart, ${label}`}; kein Produktfoto`}>
      {compact ? <><span className="product-monogram">{product.initials}</span><small>{product.brand}</small></> : <>
        <div className="architecture-eyebrow">Bauart-Schema</div>
        <svg data-pump-architecture={architecture} viewBox="0 0 360 270" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="180" cy="241" rx="118" ry="15" fill="#173c370d" />
          {manual ? <g stroke="#086d61" strokeWidth="3"><path d="M132 51q48-38 96 0l-22 72 13 86q0 21-39 21t-39-21l13-86Z" fill="#fffefbbf"/><ellipse cx="180" cy="51" rx="48" ry="17" fill="#e6f3e9"/><path d="M153 155h54m-50 25h46m-42 25h38" stroke="#b8d0c2"/></g> : external ? <g stroke="#086d61" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M43 115c0-49 111-49 111 0v66c0 62-111 62-111 0Z" fill="#fffefb"/><path d="M65 163q33 25 67 0M98 82V45h71q21 0 21 21v86q0 19 22 19h20"/><rect x="232" y="110" width="86" height="118" rx="26" fill="#086d61"/><circle cx="275" cy="149" r="11" stroke="#e6f3e9"/><path d="M259 183h32m-26 15h20" stroke="#e6f3e9"/></g> : <g stroke="#086d61" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M105 106c0-72 150-72 150 0v73c0 78-150 78-150 0Z" fill="#fffefb"/><rect x="138" y="47" width="84" height="79" rx="28" fill="#086d61"/><circle cx="180" cy="79" r="8" stroke="#e6f3e9"/><path d="M163 102h34" stroke="#e6f3e9"/><path d="M125 168q55 38 110 0"/><path d="M143 195h74" stroke="#b8d0c2"/></g>}
        </svg>
        <div className="architecture-caption"><span>{label}</span><p>{manual ? 'Ohne elektrischen Motor.' : external ? 'Für den Motor planst du einen Platz außerhalb des BHs ein.' : 'Eine kompakte Einheit, ohne Verbindung zu einem separaten Motor.'}</p></div>
      </>}
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

export function AffiliateLink({ product, className = 'button button--primary', children = product.amazonAsin ? 'Preis bei Amazon prüfen*' : 'Modelle bei Amazon ansehen*', placement = 'product_card' }: { product: Product; className?: string; children?: ReactNode; placement?: string }) {
  return (
    <a className={className} href={amazonUrl(product)} target="_blank" rel="noopener sponsored" onClick={() => trackAffiliateClick(`${product.brand} ${product.name}`, product.id, placement)}>
      {children}<ExternalLink size={17} aria-hidden="true" />
    </a>
  );
}

function CookieConsent() {
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const essentialButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) setOpen(true);
    if (consent?.value === 'accepted') loadAnalytics();
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = Array.from(document.querySelectorAll<HTMLElement>('header, main, footer')).map(element => ({ element, wasInert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    essentialButtonRef.current?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') || []);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => {
      document.removeEventListener('keydown', trapFocus);
      background.forEach(({ element, wasInert }) => { element.inert = wasInert; });
      trigger?.focus();
    };
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
      <section ref={dialogRef} className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <div className="cookie-icon"><Cookie aria-hidden="true" /></div>
        <div>
          <p className="eyebrow">Deine Entscheidung</p>
          <h2 id={titleId}>Nutzungsanalyse mit Google Analytics erlauben?</h2>
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
        <span className="brand-mark" aria-hidden="true"><img src="/brand-symbol.svg" width="40" height="40" alt="" /></span>
        <span>Milchpumpe<span>-Vergleich.de</span></span>
      </a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} onClick={() => setMenuOpen((value) => !value)}>
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} style={{ flexWrap: 'wrap', minWidth: 0 }} aria-label="Hauptnavigation">
        <a href="/vergleich/">6-Modelle-Vergleich</a>
        <a href="/tragbare-milchpumpen/">Tragbare Pumpen</a>
        <a href="/produkte/">Produktwegweiser</a>
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
          <a className="brand brand--footer" href="/"><span className="brand-mark"><img src="/brand-symbol.svg" width="40" height="40" alt="" /></span><span>Milchpumpe<span>-Vergleich.de</span></span></a>
          <p>Milchpumpen vergleichen und den Alltag mit abgepumpter Milch organisieren. Tipps zu Auswahl, Aufbewahrung und Reinigung.</p>
        </div>
        <div>
          <h2>Inhalte</h2>
          <ul>
            <li><a href="/vergleich/">Sechs Modelle im Detail</a></li>
            <li><a href="/tragbare-milchpumpen/">Tragbare Milchpumpen im Überblick</a></li>
            <li><a href="/ratgeber/">Ratgeber</a></li>
            <li><a href="/produkte/">Produktwegweiser</a></li>
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

function EditorialHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="top">
      <div className="wrap top-inner">
        <a id="header-brand" className="brand" href="/" onClick={closeMenu}>
          <img src="/brand-symbol.svg" width="39" height="39" alt="" />
          <span>Milchpumpe-Vergleich.de<small>Orientierung für deinen Stillalltag</small></span>
        </a>
        <button ref={menuButtonRef} id="menu-button" className="menu" type="button" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? '×' : '☰'}</button>
        <nav id="main-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Hauptnavigation">
          <a id="header-comparison" href="/#marktcheck" onClick={closeMenu}>Milchpumpen</a>
          <a id="header-guides" href="/ratgeber/" onClick={closeMenu}>Ratgeber</a>
          <a id="header-free-guides" href="/gratis-guides/" onClick={closeMenu}>Gratis-Guides</a>
          <a id="header-products" href="/produkte/" onClick={closeMenu}>Zubehör</a>
          <a id="header-finder" className="nav-pill" href="/#v9-comparison" onClick={closeMenu}>Direkt vergleichen <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}

function EditorialFooter() {
  const openCookies = () => window.dispatchEvent(new Event('open-cookie-settings'));
  return (
    <footer className="foot" aria-labelledby="footer-title">
      <div className="wrap">
        <div className="foot-head">
          <h2 id="footer-title">Was brauchst du<br />für den nächsten Schritt?</h2>
          <a id="footer-guide-button" className="button" href="/ratgeber/">Deinen Ratgeber finden <span aria-hidden="true">→</span></a>
        </div>
        <div className="foot-grid">
          <div className="foot-brand">
            <a id="footer-brand" className="brand" href="/">
              <img src="/brand-symbol.svg" width="36" height="36" alt="" />
              <span>Milchpumpe-Vergleich.de<small>Milchpumpen &amp; Stillalltag</small></span>
            </a>
            <p className="about">Orientierung bei der Pumpenauswahl und praktische Antworten zu Aufbewahrung, Reinigung und unterwegs. Redaktionell verantwortlich: Andreas Böhler.</p>
          </div>
          <nav aria-labelledby="footer-life-title">
            <h3 id="footer-life-title">Stillalltag</h3>
            <ul>
              <li><a id="footer-storage" href="/ratgeber/muttermilchbeutel-oder-mehrwegbecher/">Muttermilch aufbewahren</a></li>
              <li><a id="footer-cleaning" href="/ratgeber/milchpumpe-reinigen/">Pumpenteile reinigen</a></li>
              <li><a id="footer-transport" href="/ratgeber/muttermilch-arbeitsplatz-transport-kuehlkette/">Milch unterwegs</a></li>
              <li><a id="footer-fit" href="/ratgeber/richtige-flanschgroesse/">Passform einordnen</a></li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-choice-title">
            <h3 id="footer-choice-title">Deine Auswahl</h3>
            <ul>
              <li><a id="footer-comparison" href="/tragbare-milchpumpen/">Tragbare Pumpen auswählen</a></li>
              <li><a id="footer-six-models" href="/vergleich/">Sechs Modelle im Detail</a></li>
              <li><a id="footer-finder" href="/ratgeber/#pumpenfinder">Interaktive Kaufhilfe</a></li>
              <li><a id="footer-free-guides" href="/gratis-guides/">Gratis-Guides herunterladen</a></li>
              <li><a id="footer-products" href="/produkte/">Produktwegweiser</a></li>
              <li><a id="footer-methodology" href="/testmethodik/">Quellen &amp; Methodik</a></li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-site-title">
            <h3 id="footer-site-title">Diese Website</h3>
            <ul>
              <li><a id="footer-about" href="/ueber-uns/">Redaktion &amp; Kontakt</a></li>
              <li><a id="footer-impressum" href="/impressum/">Impressum</a></li>
              <li><a id="footer-privacy" href="/datenschutz/">Datenschutz</a></li>
              <li><button id="cookie-settings" type="button" onClick={openCookies}>Cookie-Einstellungen</button></li>
            </ul>
          </nav>
        </div>
        <p className="affiliate"><strong>Affiliate-Hinweis:</strong> Mit * gekennzeichnete Links führen zu Amazon. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Für dich ändert sich der Preis nicht. Unsere redaktionelle Einordnung richtet sich nach den dokumentierten Merkmalen und deinem Einsatzbereich, nicht nach der Provision.</p>
        <div className="bottom"><span>© 2026 Milchpumpe-Vergleich.de</span><span>Redaktionelle Orientierung · keine individuelle Stillberatung</span></div>
      </div>
    </footer>
  );
}

// Shared by the fail-safe bootstrap without importing any page family.
export { CookieConsent as RouteLoadingConsent };

export function Layout({ children, variant = 'standard' }: { children: ReactNode; variant?: 'standard' | 'editorial' | 'editorial-inner' | 'standalone' }) {
  if (variant === 'standalone') return (
    <>
      <div id="inhalt">{children}</div>
      <footer className="newsletter-route-controls"><button id="cookie-settings" type="button" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>Cookie-Einstellungen</button></footer>
      <CookieConsent />
    </>
  );
  if (variant === 'editorial' || variant === 'editorial-inner') {
    return (
      <>
        <div className={`editorial-home v4${variant === 'editorial-inner' ? ' editorial-site' : ''}`}>
          <a className="skip" href="#inhalt">Zum Inhalt</a>
          <EditorialHeader />
          {children}
          <EditorialFooter />
        </div>
        <CookieConsent />
      </>
    );
  }
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

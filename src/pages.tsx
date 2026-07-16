import { useMemo, useState } from 'react';
import { ArrowRight, BatteryCharging, Check, CircleHelp, Droplets, ExternalLink, HeartHandshake, Search, Settings2, ShieldCheck, Smartphone, Sparkles, X } from 'lucide-react';
import { AffiliateLink, AllProductsAside, Breadcrumbs, ProductCard, ProductVisual, SourceLink, TrustStrip } from './components';
import { CONTACT_EMAIL, GUIDE_ARTICLES, PRODUCTS, REVIEW_DATE, type Product, productUrl } from './data';

export function HomePage() {
  return (
    <main id="inhalt">
      <section className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Redaktionell recherchiert · aktualisiert am {REVIEW_DATE}</p>
          <h1>Milchpumpen transparent vergleichen</h1>
          <p className="hero-lead">Sechs tragbare und manuelle Modelle, nachvollziehbar nach Bauart, Bedienung und Alltagseinsatz eingeordnet – mit Herstellerquellen und ohne erfundene Testnoten.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="/vergleich/">Zum direkten Vergleich<ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button button--secondary" href="/testmethodik/">So vergleichen wir</a>
          </div>
          <p className="medical-note"><ShieldCheck size={18} aria-hidden="true" /> Kein Ersatz für Hebammen-, Still- oder ärztliche Beratung.</p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="hero-pump"><Droplets /><span>Orientierung<br />statt Werbeversprechen</span></div>
        </div>
      </section>

      <TrustStrip />

      <section className="section intro-section" aria-labelledby="start-title">
        <div className="section-heading">
          <p className="eyebrow">Schneller Einstieg</p>
          <h2 id="start-title">Welche Bauart passt zu deinem Alltag?</h2>
          <p>Die richtige Wahl hängt stärker von Häufigkeit, Passform und Reinigung ab als von einer pauschalen Bestenliste.</p>
        </div>
        <div className="choice-grid">
          <article><Smartphone aria-hidden="true" /><h3>App und All-in-one</h3><p>Für diskrete Steuerung und viele Einstellungen: Momcozy M9 oder Elvie Pump.</p><a href="/vergleich/">Modelle mit App vergleichen</a></article>
          <article><BatteryCharging aria-hidden="true" /><h3>Hands-free mit externem Motor</h3><p>Für weniger Gewicht in den Cups: Medela Freestyle oder Philips Avent SCF547.</p><a href="/vergleich/">Bauarten gegenüberstellen</a></article>
          <article><Droplets aria-hidden="true" /><h3>Gelegentlich und manuell</h3><p>Für kleine Mengen kann eine manuelle Pumpe genügen; das BZfE ordnet elektrische Pumpen eher bei häufiger Nutzung ein.</p><a href="/ratgeber/tragbar-oder-elektrisch/">Pumpenarten verstehen</a></article>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="models-title">
        <div className="section-heading section-heading--row">
          <div><p className="eyebrow">Modelle im Überblick</p><h2 id="models-title">Drei unterschiedliche Ansätze</h2></div>
          <a className="text-link" href="/vergleich/">Alle sechs Modelle vergleichen<ArrowRight size={16} /></a>
        </div>
        <div className="product-grid">{PRODUCTS.slice(0, 3).map((product) => <ProductCard product={product} key={product.id} />)}</div>
      </section>

      <section className="section" aria-labelledby="guide-title">
        <div className="section-heading"><p className="eyebrow">Vor dem Kauf</p><h2 id="guide-title">Drei Entscheidungen mit größerem Einfluss als eine Testnote</h2></div>
        <div className="article-grid">
          {GUIDE_ARTICLES.map((article, index) => {
            const icons = [<Sparkles key="fit" />, <Droplets key="clean" />, <Settings2 key="type" />];
            return <a href={`/ratgeber/${article.slug}/`} className="article-card" key={article.slug}>{icons[index]}<span className="eyebrow">Ratgeber</span><h3>{article.title}</h3><p>{article.description}</p><span className="text-link">Artikel lesen<ArrowRight size={16} /></span></a>;
          })}
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="section-heading"><p className="eyebrow">Kurz beantwortet</p><h2 id="faq-title">Häufige Fragen</h2></div>
        <div className="faq-list">
          <details><summary>Wie lange kann frisch abgepumpte Muttermilch aufbewahrt werden?</summary><div><p>Für gesunde, reif geborene Babys nennt die CDC bis zu vier Stunden bei höchstens 25 °C, bis zu vier Tage im Kühlschrank bei etwa 4 °C und bevorzugt sechs, akzeptabel bis zu zwölf Monate im Gefrierfach bei −18 °C oder kälter. Individuelle Situationen können abweichen.</p><SourceLink href="https://www.cdc.gov/breastfeeding/breast-milk-preparation-and-storage/handling-breastmilk.html">CDC: Breast Milk Storage and Preparation</SourceLink></div></details>
          <details><summary>Ist eine elektrische Pumpe immer besser?</summary><div><p>Nein. Das Bundeszentrum für Ernährung nennt Ausstreichen oder Handpumpe für gelegentliche kleine Mengen und elektrische Pumpen eher für häufiges Abpumpen oder den Aufbau der Milchbildung. Entscheidend sind dein Ziel und fachliche Beratung.</p><SourceLink href="https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen">BZfE: Muttermilch abpumpen</SourceLink></div></details>
          <details><summary>Übernimmt die Krankenkasse eine Milchpumpe?</summary><div><p>Milchpumpen können bei entsprechender Indikation Hilfsmittel sein. Welche Versorgung, Verordnung und welches Modell übernommen werden, hängt vom Einzelfall und den Verträgen der Krankenkasse ab. Frage vor dem Kauf bei Krankenkasse, Arztpraxis oder Hebamme nach.</p><SourceLink href="https://www.gkv-spitzenverband.de/service/hmv/verzeichnis_hilfsmittel.jsp">GKV-Spitzenverband: Hilfsmittelverzeichnis</SourceLink></div></details>
          <details><summary>Welches Modell ist für mich das beste?</summary><div><p>Eine seriöse pauschale Antwort gibt es nicht. Häufigkeit, beidseitiges Pumpen, Flanschpassform, Reinigungsaufwand, Budget und die gewünschte Bewegungsfreiheit verändern die Entscheidung. Bei Schmerzen, geringer Milchmenge oder medizinischen Fragen hilft eine Hebamme oder qualifizierte Stillberatung.</p></div></details>
        </div>
      </section>
    </main>
  );
}

type SortKey = 'brand' | 'category' | 'app';

export function ComparisonPage() {
  const [sortKey, setSortKey] = useState<SortKey>('brand');
  const [appOnly, setAppOnly] = useState(false);
  const [electricOnly, setElectricOnly] = useState(false);

  const products = useMemo(() => PRODUCTS
    .filter((product) => !appOnly || product.app)
    .filter((product) => !electricOnly || product.category.startsWith('Elektrisch'))
    .sort((a, b) => {
      if (sortKey === 'app') return Number(b.app) - Number(a.app);
      return a[sortKey].localeCompare(b[sortKey], 'de');
    }), [appOnly, electricOnly, sortKey]);

  return (
    <main id="inhalt">
      <section className="page-hero section">
        <Breadcrumbs items={[{ href: '/vergleich/', label: 'Vergleich' }]} />
        <p className="eyebrow">Funktionsvergleich · keine Rangliste</p>
        <h1>Sechs Milchpumpen im direkten Vergleich</h1>
        <p>Die Tabelle stellt öffentlich dokumentierte Merkmale gegenüber. Sie bewertet weder individuelle Milchmenge noch Komfort und ersetzt keinen eigenen Passformtest.</p>
      </section>
      <section className="section comparison-section" aria-labelledby="table-title">
        <div className="comparison-toolbar">
          <div><h2 id="table-title">Merkmale filtern</h2><p>{products.length} von {PRODUCTS.length} Modellen sichtbar</p></div>
          <div className="filter-buttons" aria-label="Vergleich filtern">
            <button type="button" aria-pressed={appOnly} onClick={() => setAppOnly((value) => !value)}>Mit App</button>
            <button type="button" aria-pressed={electricOnly} onClick={() => setElectricOnly((value) => !value)}>Nur elektrisch</button>
          </div>
        </div>
        <p className="table-hint">Auf kleinen Bildschirmen lässt sich die Tabelle horizontal verschieben.</p>
        <div className="table-scroll" tabIndex={0} aria-label="Horizontal scrollbare Vergleichstabelle">
          <table>
            <caption>Vergleich von Bauart, Ausführung, App, Energieversorgung, Trageweise und Reinigung</caption>
            <thead><tr>
              <th scope="col"><button type="button" onClick={() => setSortKey('brand')} aria-label="Nach Marke sortieren">Produkt {sortKey === 'brand' && '↓'}</button></th>
              <th scope="col"><button type="button" onClick={() => setSortKey('category')} aria-label="Nach Bauart sortieren">Bauart {sortKey === 'category' && '↓'}</button></th>
              <th scope="col">Ausführung</th>
              <th scope="col"><button type="button" onClick={() => setSortKey('app')} aria-label="Nach App-Verfügbarkeit sortieren">App {sortKey === 'app' && '↓'}</button></th>
              <th scope="col">Energie</th><th scope="col">Trageweise</th><th scope="col">Reinigung</th><th scope="col">Details</th>
            </tr></thead>
            <tbody>{products.map((product) => <tr key={product.id}>
              <th scope="row"><a className="table-product" href={productUrl(product)}><ProductVisual product={product} compact /><span><small>{product.brand}</small>{product.name}</span></a></th>
              <td>{product.category}</td><td>{product.set}</td><td><span className={product.app ? 'status status--yes' : 'status status--no'}>{product.app ? <Check /> : <X />}{product.app ? 'Ja' : 'Nein'}</span></td>
              <td>{product.energy}</td><td>{product.wearStyle}</td><td>{product.cleaning}</td><td><a className="icon-link" href={productUrl(product)} aria-label={`Details und Quellen zu ${product.brand} ${product.name}`}><ArrowRight /></a></td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="method-callout"><Search aria-hidden="true" /><div><h2>Warum es keine Gesamtnote gibt</h2><p>App, Gewicht, Passform und Reinigungsaufwand haben je nach Alltag unterschiedliche Bedeutung. Eine einzige Zahl würde Genauigkeit vortäuschen, die ohne standardisierten Praxistest nicht vorhanden ist.</p><a href="/testmethodik/">Methodik vollständig lesen</a></div></div>
      </section>
      <section className="section section--tinted"><div className="product-grid">{PRODUCTS.map((product) => <ProductCard product={product} key={product.id} />)}</div></section>
    </main>
  );
}

export function ProductPage({ product }: { product: Product }) {
  return (
    <main id="inhalt">
      <section className="product-hero section">
        <div>
          <Breadcrumbs items={[{ href: '/vergleich/', label: 'Vergleich' }, { href: productUrl(product), label: `${product.brand} ${product.name}` }]} />
          <p className="eyebrow">{product.focus}</p>
          <h1>{product.brand} {product.name}</h1>
          <p className="hero-lead">{product.summary}</p>
          <div className="hero-actions"><AffiliateLink product={product} /><a className="button button--secondary" href="#quellen">Quellen ansehen</a></div>
          <p className="affiliate-inline">* Affiliate-Link. Preis und Verfügbarkeit werden beim Händler angezeigt.</p>
        </div>
        <ProductVisual product={product} />
      </section>
      <section className="section detail-grid">
        <article>
          <p className="eyebrow">Dokumentierte Merkmale</p><h2>Was der Hersteller beschreibt</h2>
          <ul className="check-list">{product.facts.map((fact) => <li key={fact}><Check aria-hidden="true" />{fact}</li>)}</ul>
          <div className="source-box" id="quellen"><ShieldCheck aria-hidden="true" /><div><h3>Primärquelle</h3><p>Die technischen Angaben auf dieser Seite wurden am {REVIEW_DATE} mit der verlinkten Herstellerseite abgeglichen.</p><SourceLink href={product.sourceUrl}>{product.sourceLabel}</SourceLink></div></div>
        </article>
        <aside className="spec-card"><h2>Einordnung</h2><dl><div><dt>Bauart</dt><dd>{product.category}</dd></div><div><dt>Ausführung</dt><dd>{product.set}</dd></div><div><dt>App</dt><dd>{product.app ? 'Vorhanden' : 'Nicht vorgesehen'}</dd></div><div><dt>Energie</dt><dd>{product.energy}</dd></div><div><dt>Trageweise</dt><dd>{product.wearStyle}</dd></div><div><dt>Reinigung</dt><dd>{product.cleaning}</dd></div></dl></aside>
      </section>
      <section className="section section--tinted pros-cons">
        <article><h2>Kann gut passen, wenn …</h2><ul>{product.strengths.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>
        <article><h2>Vor dem Kauf prüfen</h2><ul>{product.limitations.map((item) => <li key={item}><CircleHelp aria-hidden="true" />{item}</li>)}</ul></article>
      </section>
      <section className="section editorial-boundary"><HeartHandshake aria-hidden="true" /><div><h2>Redaktionelle Grenze</h2><p>Wir haben dieses Modell nicht in einem standardisierten Labor- oder Alltagstest geprüft. Die Einordnung beruht auf Herstellerunterlagen und einem strukturierten Merkmalsvergleich. Komfort, Passform, Lautstärke und Milchausbeute können individuell abweichen.</p></div></section>
      <section className="section"><AllProductsAside currentId={product.id} /></section>
    </main>
  );
}

export function GuideIndexPage() {
  return (
    <main id="inhalt"><section className="page-hero section"><Breadcrumbs items={[{ href: '/ratgeber/', label: 'Ratgeber' }]} /><p className="eyebrow">Auswahl und Anwendung</p><h1>Ratgeber rund ums Abpumpen</h1><p>Praktische Orientierung mit klaren Quellen und dem Hinweis, wann individuelle Beratung wichtiger ist als allgemeine Information.</p></section>
      <section className="section"><div className="article-grid article-grid--wide">{GUIDE_ARTICLES.map((article, index) => <a className="article-card" href={`/ratgeber/${article.slug}/`} key={article.slug}><span className="article-number">0{index + 1}</span><span className="eyebrow">Ratgeber</span><h2>{article.title}</h2><p>{article.description}</p><span className="text-link">Artikel lesen<ArrowRight size={16} /></span></a>)}</div></section>
      <section className="section section--tinted advice-banner"><ShieldCheck aria-hidden="true" /><div><h2>Bei Schmerzen oder Unsicherheit</h2><p>Eine Website kann Passform, Milchbildung oder gesundheitliche Beschwerden nicht beurteilen. Wende dich an deine Hebamme, eine qualifizierte Still- und Laktationsberatung oder ärztliches Fachpersonal.</p></div></section>
    </main>
  );
}

const ARTICLE_CONTENT: Record<string, { title: string; lead: string; sections: { title: string; body: React.ReactNode }[] }> = {
  'richtige-flanschgroesse': {
    title: 'Flanschgröße richtig einordnen',
    lead: 'Ein passender Brusttrichter soll die Brustwarze frei bewegen lassen und darf keine Schmerzen verursachen. Größenangaben sind ein Ausgangspunkt, keine Ferndiagnose.',
    sections: [
      { title: '1. Herstelleranleitung verwenden', body: <p>Nutze die Messschablone und Anleitung des konkreten Pumpenherstellers. Systeme unterscheiden sich, und Einsätze sind nicht automatisch zwischen Marken kompatibel.</p> },
      { title: '2. Komfort während der Nutzung beobachten', body: <p>Starke Reibung, Schmerzen, Verletzungen oder deutlich eingezogenes Gewebe sind Gründe, die Nutzung zu stoppen und die Passform fachlich prüfen zu lassen. Höhere Saugstufen sind nicht automatisch effektiver.</p> },
      { title: '3. Fachliche Hilfe einbeziehen', body: <p>Das Bundeszentrum für Ernährung empfiehlt Unterstützung durch Hebammen oder Stillberaterinnen unter anderem bei der Wahl des passenden Trichteraufsatzes und der Anwendung der Pumpe.</p> },
    ],
  },
  'milchpumpe-reinigen': {
    title: 'Milchpumpe hygienisch reinigen',
    lead: 'Saubere, vollständig getrocknete Pumpenteile schützen die abgepumpte Milch vor Verunreinigungen. Maßgeblich bleibt immer die Anleitung des konkreten Herstellers.',
    sections: [
      { title: '1. Vor dem Pumpen', body: <p>Hände und Fingernägel mit Wasser und Seife waschen. Sauberes Pumpzubehör und den vorgesehenen Behälter bereitlegen.</p> },
      { title: '2. Direkt nach der Nutzung', body: <p>Milchberührende Teile auseinandernehmen und nach Herstellerangabe reinigen. Das BZfE empfiehlt nach jedem Gebrauch Spülmittel und heißes Wasser, anschließend Abspülen unter fließendem Wasser.</p> },
      { title: '3. Vollständig trocknen lassen', body: <p>Teile auf einer sauberen Fläche an der Luft trocknen lassen. Nicht mit einem bereits benutzten Küchentuch trockenreiben. Elektronik, Motor und Schläuche nur so behandeln, wie es die Anleitung erlaubt.</p> },
    ],
  },
  'tragbar-oder-elektrisch': {
    title: 'Tragbar, elektrisch oder manuell?',
    lead: '„Tragbar“ beschreibt die Nutzung am Körper; „elektrisch“ den Antrieb. Viele Wearables sind deshalb zugleich tragbar und elektrisch.',
    sections: [
      { title: 'Manuell für gelegentliche Mengen', body: <p>Handpumpen benötigen keinen Akku und haben wenige Teile. Das BZfE ordnet Ausstreichen oder Handpumpen besonders bei gelegentlichem Abpumpen kleiner Mengen ein.</p> },
      { title: 'Elektrisch bei häufiger Nutzung', body: <p>Elektrische Pumpen erzeugen wiederholbare Zyklen und können als Einzel- oder Doppelpumpe ausgeführt sein. Bei häufigem Pumpen kann die Zeitersparnis einer Doppelpumpe wichtig sein.</p> },
      { title: 'Wearables für Bewegungsfreiheit', body: <p>Wearables sitzen ganz oder teilweise im BH. Prüfe Gewicht, Auslaufschutz, Bücken, Cup-Volumen und Reinigung. „Hands-free“ bedeutet nicht automatisch schlauchlos oder für Sport geeignet.</p> },
    ],
  },
};

export function GuideArticlePage({ slug }: { slug: string }) {
  const article = ARTICLE_CONTENT[slug];
  if (!article) return <NotFoundPage />;
  return (
    <main id="inhalt"><article className="article-page section"><Breadcrumbs items={[{ href: '/ratgeber/', label: 'Ratgeber' }, { href: `/ratgeber/${slug}/`, label: article.title }]} /><p className="eyebrow">Geprüft am {REVIEW_DATE}</p><h1>{article.title}</h1><p className="hero-lead">{article.lead}</p><div className="article-body">{article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.body}</section>)}</div>
      <div className="source-box"><ShieldCheck aria-hidden="true" /><div><h2>Quellen und Einordnung</h2><p>Grundlage sind die Hinweise des Bundeszentrums für Ernährung. Bei gesundheitlichen Problemen oder für eine individuelle Pumpstrategie ist fachliche Beratung erforderlich.</p><SourceLink href="https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen">BZfE: Muttermilch abpumpen</SourceLink></div></div></article></main>
  );
}

export function MethodologyPage() {
  return (
    <main id="inhalt"><section className="page-hero section"><Breadcrumbs items={[{ href: '/testmethodik/', label: 'Methodik' }]} /><p className="eyebrow">Transparenz statt Punktesystem</p><h1>So entsteht unser Vergleich</h1><p>Wir trennen dokumentierte Fakten, Herstellerbehauptungen und redaktionelle Einordnung. Der aktuelle Vergleich ist kein eigener Labor- oder Praxistest.</p></section>
      <section className="section methodology-grid">
        <article><span>01</span><h2>Auswahl</h2><p>Wir bilden unterschiedliche Bauarten und Bedienkonzepte ab: komplett tragbare Pumpen, Hands-free-Cups mit externer Motoreinheit und eine manuelle Ergänzung. Eine Aufnahme ist keine Auszeichnung.</p></article>
        <article><span>02</span><h2>Quellen</h2><p>Technische Merkmale werden mit offiziellen Produktseiten oder Handbüchern abgeglichen. Jede Produktseite verlinkt die verwendete Primärquelle und nennt das Prüfdatum.</p></article>
        <article><span>03</span><h2>Kriterien</h2><p>Verglichen werden Bauart, Einzel- oder Doppelset, App, Energieversorgung, Trageweise und Reinigungsaufwand. Preise und Händlerbewertungen werden nicht festgeschrieben, weil sie sich laufend ändern.</p></article>
        <article><span>04</span><h2>Grenzen</h2><p>Ohne standardisierten Eigenversuch vergeben wir keine Noten für Saugkraft, Lautstärke, Komfort oder Milchmenge. Herstellerangaben werden als solche bezeichnet.</p></article>
        <article><span>05</span><h2>Finanzierung</h2><p>Einige Händlerlinks sind Affiliate-Links. Bei einem qualifizierten Kauf kann eine Provision entstehen. Sie verändert weder den Preis noch die redaktionelle Reihenfolge.</p></article>
        <article><span>06</span><h2>Korrekturen</h2><p>Produktdaten ändern sich. Hinweise mit nachvollziehbarer Quelle nehmen wir unter <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> entgegen.</p></article>
      </section>
      <section className="section section--tinted source-register"><h2>Aktuelles Quellenregister</h2><p>Zuletzt redaktionell geprüft am {REVIEW_DATE}.</p><ul>{PRODUCTS.map((product) => <li key={product.id}><span>{product.brand} {product.name}</span><SourceLink href={product.sourceUrl}>{product.sourceLabel}</SourceLink></li>)}</ul></section>
    </main>
  );
}

export function AboutPage() {
  return (
    <main id="inhalt"><section className="page-hero section"><Breadcrumbs items={[{ href: '/ueber-uns/', label: 'Über uns' }]} /><p className="eyebrow">Betreiber und redaktionelle Verantwortung</p><h1>Über dieses Vergleichsportal</h1><p>Milchpumpe-Vergleich.de wird von Andreas Böhler betrieben. Ziel ist eine verständliche, quellenbasierte Orientierung zu Produkten und Auswahlkriterien.</p></section>
      <section className="section about-grid"><article><h2>Was wir leisten</h2><p>Wir strukturieren öffentlich verfügbare Herstellerinformationen, erklären Unterschiede zwischen Bauarten und verlinken die Primärquellen. Leserinnen sollen Aussagen selbst nachvollziehen können.</p></article><article><h2>Was wir nicht leisten</h2><p>Die Redaktion ist keine medizinische Beratungsstelle. Wir stellen keine Diagnosen, erstellen keine individuelle Pumpstrategie und ersetzen weder Hebamme noch Still- oder ärztliche Beratung.</p></article><article><h2>Wie wir uns finanzieren</h2><p>Über gekennzeichnete Affiliate-Links kann eine Provision entstehen. Produktaufnahme, Reihenfolge und Wortlaut werden redaktionell festgelegt. Bezahlte Platzierungen gibt es derzeit nicht.</p></article><article><h2>Verantwortung und Kontakt</h2><p>Inhaltlich verantwortlich ist Andreas Böhler. Sachliche Korrekturen oder Quellenhinweise bitte an <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p></article></section>
    </main>
  );
}

export function ImpressumPage() {
  return (
    <main id="inhalt"><article className="legal-page section"><Breadcrumbs items={[{ href: '/impressum/', label: 'Impressum' }]} /><h1>Impressum</h1><section><h2>Angaben gemäß § 5 DDG</h2><p>Andreas Böhler<br />Am Mühlbach 14<br />79114 Freiburg<br />Deutschland</p></section><section><h2>Kontakt</h2><p>E-Mail: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></section><section><h2>Redaktionell verantwortlich</h2><p>Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV:<br />Andreas Böhler<br />Am Mühlbach 14<br />79114 Freiburg</p></section><section><h2>Verbraucherstreitbeilegung</h2><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></section><p className="legal-review-note">Hinweis: Diese Anbieterkennzeichnung wurde redaktionell aktualisiert und sollte bei Änderungen der Tätigkeit oder Kontaktdaten rechtlich erneut geprüft werden.</p></article></main>
  );
}

export function PrivacyPage() {
  return (
    <main id="inhalt"><article className="legal-page section"><Breadcrumbs items={[{ href: '/datenschutz/', label: 'Datenschutz' }]} /><h1>Datenschutzerklärung</h1><p className="legal-review-note">Stand: 16. Juli 2026. Diese Erklärung beschreibt die aktuelle technische Umsetzung der Website.</p>
      <section><h2>1. Verantwortlicher</h2><p>Andreas Böhler, Am Mühlbach 14, 79114 Freiburg<br />E-Mail: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></section>
      <section><h2>2. Hosting über GitHub Pages</h2><p>Die Website wird über GitHub Pages bereitgestellt, einen Dienst der GitHub, Inc., 88 Colin P Kelly Jr Street, San Francisco, CA 94107, USA. Beim Abruf einer Website werden technisch erforderliche Verbindungsdaten wie IP-Adresse, Zeitpunkt, angeforderte Datei, Referrer und Browserinformationen an den Hostinganbieter übertragen. Die Verarbeitung dient der sicheren und stabilen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p><SourceLink href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">Datenschutzhinweise von GitHub</SourceLink></section>
      <section><h2>3. Lokale Einwilligungseinstellung</h2><p>Die Entscheidung zum Analytics-Einsatz wird im Local Storage des Browsers unter dem Schlüssel <code>mv-analytics-consent-v1</code> gespeichert. Sie wird spätestens nach 180 Tagen erneut abgefragt. Diese Speicherung ist erforderlich, um deine Auswahl umzusetzen. Über „Cookie-Einstellungen“ im Footer kannst du die Entscheidung jederzeit ändern.</p></section>
      <section><h2>4. Google Analytics 4</h2><p>Nur nach deiner ausdrücklichen Einwilligung laden wir Google Analytics 4 direkt über <code>gtag.js</code>. Verwendet wird ausschließlich die Mess-ID <strong>G-4MTYQGF7VK</strong>. Ein Google-Tag-Manager-Container wird nicht eingesetzt.</p><p>Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Analytics verarbeitet Nutzungsdaten wie aufgerufene Seiten, ungefähre Region, Gerätetyp, Browserdaten, Sitzungsdauer und Interaktionen. Die IP-Adresse wird von Google für die Standortbestimmung verarbeitet; wir aktivieren keine Google-Signale und keine personalisierten Werbefunktionen.</p><p>Rechtsgrundlage ist deine Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Analytics-Cookies <code>_ga</code> und <code>_ga_*</code> werden technisch auf höchstens 180 Tage begrenzt. Daten können auch in Staaten außerhalb des Europäischen Wirtschaftsraums verarbeitet werden. Google beschreibt hierfür eigene Übertragungsmechanismen und Schutzmaßnahmen.</p><p>Die Einwilligung kann jederzeit über den Footer widerrufen werden. Dabei versucht die Website vorhandene Analytics-Cookies zu löschen. Bereits übermittelte Daten bleiben von einem späteren Widerruf unberührt.</p><SourceLink href="https://policies.google.com/privacy?hl=de">Google-Datenschutzerklärung</SourceLink></section>
      <section><h2>5. Affiliate-Links zu Amazon</h2><p>Diese Website nimmt am Amazon-EU-Partnerprogramm teil. Erst wenn du einen entsprechend gekennzeichneten externen Link anklickst, verlässt du unsere Website und Amazon kann den Aufruf sowie weitere Daten nach den dort geltenden Bedingungen verarbeiten. Anbieter ist je nach aufgerufenem Angebot eine Gesellschaft der Amazon-Unternehmensgruppe. Auf unserer Website selbst werden durch die bloße Anzeige eines Amazon-Links keine Amazon-Skripte geladen.</p><SourceLink href="https://www.amazon.de/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ">Amazon-Datenschutzerklärung</SourceLink></section>
      <section><h2>6. Kontaktaufnahme</h2><p>Bei einer Kontaktaufnahme per E-Mail verarbeiten wir die von dir übermittelten Daten zur Bearbeitung der Anfrage. Rechtsgrundlage ist je nach Inhalt Art. 6 Abs. 1 lit. b oder lit. f DSGVO. Die Daten werden gelöscht, wenn die Anfrage abgeschlossen ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p></section>
      <section><h2>7. Deine Rechte</h2><p>Du hast im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung kannst du mit Wirkung für die Zukunft widerrufen. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.</p></section>
      <section><h2>8. Aktualisierung</h2><p>Wir passen diese Erklärung an, wenn sich Dienste oder rechtliche Anforderungen ändern. Maßgeblich ist die jeweils auf dieser Seite veröffentlichte Fassung.</p></section>
      <p className="legal-review-note">Datenschutzhinweis: Die technische Umsetzung wurde auf Datensparsamkeit ausgerichtet. Eine individuelle rechtliche Prüfung durch eine qualifizierte Stelle kann dadurch nicht ersetzt werden.</p>
    </article></main>
  );
}

export function NotFoundPage() {
  return <main id="inhalt"><section className="not-found section"><p className="eyebrow">Fehler 404</p><h1>Diese Seite wurde nicht gefunden</h1><p>Der Link ist möglicherweise veraltet. Über die Startseite oder den Vergleich findest du alle aktuellen Inhalte.</p><div className="hero-actions"><a className="button button--primary" href="/">Zur Startseite</a><a className="button button--secondary" href="/vergleich/">Zum Vergleich</a></div></section></main>;
}

import { useMemo, useState } from 'react';
import { ArrowRight, BatteryCharging, Check, Droplets, Search, ShieldCheck, Smartphone, X } from 'lucide-react';
import { Breadcrumbs, ProductCard, ProductVisual, SourceLink, TrustStrip } from './components';
import { GUIDE_ARTICLES, PRODUCTS, productUrl } from './data';
import { DecisionBoard, EditorialGuideHub } from './editorial';
import { EditorialImage } from './editorial-images';

export function HomePage() {
  return (
    <main id="inhalt">
      <section className="hero section image-led-hero">
        <div className="hero-copy">
          <p className="eyebrow">Milchpumpen & Stillalltag</p>
          <h1>Milchpumpen vergleichen.<br /><em>Für deinen Alltag.</em></h1>
        </div>
        <a className="hero-art" href="/ratgeber/muttermilchbeutel-oder-mehrwegbecher/">
          <EditorialImage slug="muttermilchbeutel-oder-mehrwegbecher" title="Muttermilch aufbewahren" eager />
          <span className="hero-art__caption">Muttermilch aufbewahren <ArrowRight size={18} aria-hidden="true" /></span>
        </a>
        <div className="hero-details">
          <p className="hero-lead">Finde eine Milchpumpe, die zu deinem Alltag passt – und praktische Antworten zu Aufbewahrung, Reinigung und unterwegs.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="/tragbare-milchpumpen/">Tragbare Milchpumpen entdecken<ArrowRight size={18} aria-hidden="true" /></a>
            <a className="text-link" href="/vergleich/">Sechs ausgewählte Modelle im Detail vergleichen</a>
            <a className="button button--secondary" href="/ratgeber/#pumpenfinder">Zur interaktiven Kaufhilfe</a>
            <a className="text-link" href="/produkte/">Produkte für Aufbewahrung, Reinigung und Stillalltag <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <p className="medical-note"><ShieldCheck size={18} aria-hidden="true" /> Kein Ersatz für Hebammen-, Still- oder ärztliche Beratung.</p>
        </div>
      </section>

      <TrustStrip />
      <div className="section home-decisions"><details><summary>Drei Fragen vor dem Kauf <ArrowRight size={18} aria-hidden="true" /></summary><DecisionBoard /></details></div>

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
        <div className="section-heading section-heading--row"><div><p className="eyebrow">Für deinen Stillalltag</p><h2 id="guide-title">Was beschäftigt dich gerade?</h2></div><a className="text-link" href="/ratgeber/">Alle Ratgeber entdecken <ArrowRight size={16} aria-hidden="true" /></a></div>
        <div className="article-grid home-stories">
          {[
            ['hands-free-milchpumpe-kaufen', 'Welche Hands-free-Pumpe passt zu dir?', 'Passform, Bauart und Reinigung vor dem Kauf einordnen.'],
            ['richtige-flanschgroesse', 'Und die Passform?', 'Den passenden Brusttrichter mit Anleitung und fachlicher Hilfe einordnen.'],
            ['muttermilchbeutel-oder-mehrwegbecher', 'Beutel oder Mehrwegbecher?', 'Weniger Platzbedarf oder lieber wiederverwenden?'],
            ['muttermilch-beschriften-portionen-gefrierfach', 'Kleine Portionen, mehr Überblick', 'Muttermilch im Gefrierfach übersichtlich organisieren.'],
            ['milchpumpe-reinigen', 'Saubere Teile, klarer Ablauf', 'Reinigung und Trocknen nach der Herstelleranleitung organisieren.'],
            ['muttermilch-arbeitsplatz-transport-kuehlkette', 'Muttermilch mit zur Arbeit nehmen', 'Kühltasche, Übergabe und Aufbewahrung vorbereiten.'],
          ].map(([slug, title, description]) => <a href={`/ratgeber/${slug}/`} className="article-card visual-story" data-story={slug} key={slug}><div className="visual-story__image"><EditorialImage slug={slug} title={title} /></div><div className="visual-story__body"><span className="eyebrow">{GUIDE_ARTICLES.find(article => article.slug === slug)?.category || 'Ratgeber'}</span><h3>{title}</h3><p>{description}</p><span className="text-link">Artikel lesen <ArrowRight size={16} aria-hidden="true" /></span></div></a>)}
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
        <p className="eyebrow">Funktionen im Vergleich</p>
        <h1>Sechs Milchpumpen im direkten Vergleich</h1>
        <p>Die Tabelle stellt öffentlich dokumentierte Merkmale gegenüber. Sie bewertet weder individuelle Milchmenge noch Komfort und ersetzt keinen eigenen Passformtest.</p>
        <p>Diese Auswahl umfasst fünf elektrische Modelle und Haakaa als manuelle Silikonpumpe, nicht den gesamten Markt. <a href="/tragbare-milchpumpen/">Weitere tragbare Milchpumpen und fallbezogene Kaufhilfe ansehen</a>.</p>
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

export function GuideIndexPage() {
  return <EditorialGuideHub />;
}

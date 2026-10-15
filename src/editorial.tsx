import { useState } from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from './components';
import { SourceLink } from './components';
import { GUIDE_ARTICLES, PRODUCTS, productUrl } from './data';
import { findProducts, type Preferences } from './finder';
import { EDITORIAL_GUIDES } from './guides';
import { EDITORIAL_ART, EditorialImage } from './editorial-images';

export function DecisionBoard() {
  return <aside className="decision-board" aria-label="Drei Entscheidungen vor dem Kauf">
    <div className="board-label"><span>DEIN ALLTAG. DEINE WAHL.</span><span>3 AUSWAHLFRAGEN</span></div>
    <h2>Nicht die meisten Stufen.<br /><em>Die passenden Funktionen.</em></h2>
    <a href="/ratgeber/momcozy-m9-oder-s12-pro/" className="decision-row"><span>01</span><div><strong>App oder Tasten?</strong><small>Momcozy M9 & S12 Pro einordnen</small></div><ArrowRight aria-hidden="true" /></a>
    <a href="/ratgeber/hands-free-milchpumpe-kaufen/" className="decision-row"><span>02</span><div><strong>Motor im BH oder separat?</strong><small>Bauart statt Werbeversprechen</small></div><ArrowRight aria-hidden="true" /></a>
    <a href="/ratgeber/richtige-flanschgroesse/" className="decision-row"><span>03</span><div><strong>Und die Passform?</strong><small>Warum das Modell allein nicht entscheidet</small></div><ArrowRight aria-hidden="true" /></a>
  </aside>;
}

export function PumpFinder() {
  const [preferences, setPreferences] = useState<Preferences>({ app: 'any', motor: 'any', set: 'any' });
  const matches = findProducts(PRODUCTS, preferences);
  return <section className="section finder-section" id="pumpenfinder" aria-labelledby="finder-title">
    <div className="finder-intro"><p className="eyebrow">Interaktive Kaufhilfe</p><h2 id="finder-title">Weniger suchen.<br /><em>Gezielter vergleichen.</em></h2><p>Wähle Funktionen, die dir wichtig sind. Der Filter zeigt passende Merkmale aus unserem Vergleich – keine medizinische Empfehlung und keine Rangliste.</p><a href="/vergleich/">Alle technischen Merkmale vergleichen <ArrowRight size={16} aria-hidden="true" /></a></div>
    <div className="finder-panel"><div className="finder-inputs">
      <label>App-Steuerung<select value={preferences.app} onChange={e => setPreferences(p => ({ ...p, app: e.target.value as Preferences['app'] }))}><option value="any">Ist mir egal</option><option value="yes">Mit App</option><option value="no">Ohne App</option></select></label>
      <label>Bauart<select value={preferences.motor} onChange={e => setPreferences(p => ({ ...p, motor: e.target.value as Preferences['motor'] }))}><option value="any">Alle Bauarten</option><option value="integrated">Motor im BH</option><option value="separate">Motor separat</option><option value="manual">Manuell / ohne Motor</option></select></label>
      <label>Ausführung<select value={preferences.set} onChange={e => setPreferences(p => ({ ...p, set: e.target.value as Preferences['set'] }))}><option value="any">Einzel- oder Doppelset</option><option value="single">Einzelset erhältlich</option><option value="double">Doppelset erhältlich</option></select></label>
    </div><div className="finder-results" aria-live="polite" aria-atomic="true"><p className="finder-count">{matches.length} von {PRODUCTS.length} Modellen mit diesen Merkmalen</p>
    {matches.length ? <ul>{matches.map(product => <li key={product.id}><div><a href={productUrl(product)}>{product.brand} {product.name}<ArrowRight size={16} aria-hidden="true" /></a><small>{product.set} · {product.app ? 'Mit App' : 'Ohne App'} · {product.wearStyle}</small></div></li>)}</ul> : <p>Keine der sechs Pumpen erfüllt diese Kombination. Lockere einen Filter oder nutze den vollständigen Vergleich.</p>}
    </div><button className="link-button finder-reset" onClick={() => setPreferences({ app: 'any', motor: 'any', set: 'any' })}>Filter zurücksetzen</button><p className="finder-note">Prüfe beim Händler die konkrete Generation und den Lieferumfang. Eine passende Funktion sagt nichts über deine individuelle Passform oder Milchmenge aus.</p></div>
  </section>;
}

function categoryFor(slug: string) {
  if (['richtige-flanschgroesse', 'milchpumpe-reinigen', 'tragbar-oder-elektrisch'].includes(slug)) return 'Grundlagen';
  if (GUIDE_ARTICLES.find(g=>g.slug===slug)?.category === 'Muttermilch-Alltag') return 'Muttermilch-Alltag';
  const guide = EDITORIAL_GUIDES.find(g => g.slug === slug);
  if (guide?.category.includes('Pflege') || guide?.category.includes('Alltag') || guide?.category.includes('Zubehör')) return 'Alltag & Zubehör';
  if (guide?.category === 'Modellwissen') return 'Modellwissen';
  return 'Kaufentscheidung';
}

export function EditorialGuideHub() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Alle Themen');
  const visible = GUIDE_ARTICLES.filter(article => (category === 'Alle Themen' || categoryFor(article.slug) === category) && `${article.title} ${article.description}`.toLocaleLowerCase('de').includes(query.trim().toLocaleLowerCase('de')));
  return <main id="inhalt">
    <section className="section magazine-hero"><div><Breadcrumbs items={[{ href: '/ratgeber/', label: 'Ratgeber' }]} /><p className="eyebrow">Das Abpumpen-Magazin</p><h1>Milchpumpen-Ratgeber.<br /><em>Mehr Überblick.</em></h1><p className="hero-lead">Milchpumpen auswählen, Unterschiede verstehen und den Alltag vorbereiten. Verständlich erklärt, mit konkreten Modellen und nachvollziehbaren Quellen.</p><div className="hero-actions"><a className="button button--primary" href="#artikel">Ratgeber entdecken <ArrowRight size={18} aria-hidden="true" /></a><a className="button button--secondary" href="#pumpenfinder">Zur interaktiven Kaufhilfe</a></div><p className="medical-note"><ShieldCheck size={18} aria-hidden="true" /> Redaktionelle Orientierung, keine individuelle Stillberatung.</p></div><figure className="guide-hero-stage"><img src="/editorial-photos/pump-parts.jpg" alt="Zerlegte Auffangschalen und einzelne Teile einer Hands-free-Milchpumpe" width="1350" height="1800" loading="eager" fetchPriority="high" decoding="async" /><figcaption><span>Was nach dem Pumpen dazugehört</span><p>Aufbau, Reinigung und passende Teile sind Teil deiner Auswahl.</p><small>Foto: LeslieKnope345 / <SourceLink href="https://commons.wikimedia.org/wiki/File:Hands_Free_Breast_Pump.jpg">Wikimedia Commons · CC0</SourceLink></small></figcaption></figure></section>
    <section className="section guide-decisions"><div><p className="eyebrow">Vor der Modellsuche</p><h2>Was soll deine Pumpe im Alltag können?</h2><p>Beginne mit dem Einsatz, den du planst. Hier findest du die Artikel zur Bauart, Bedienung und Passform; im Marktüberblick kannst du anschließend 35 recherchierte tragbare Modelle eingrenzen.</p><a className="text-link" href="/tragbare-milchpumpen/">Zum größeren Modellüberblick <ArrowRight size={18} aria-hidden="true" /></a></div><DecisionBoard /></section>
    <div className="editorial-strip"><span><Check size={17} aria-hidden="true" /> Herstellerquellen statt Testnoten</span><span>Funktionen verständlich erklärt</span><span>Affiliate-Links transparent gekennzeichnet</span></div>
    <section className="section feature-stories" aria-labelledby="featured-title"><div className="section-heading section-heading--row"><div><p className="eyebrow">Vor dem Kauf lesen</p><h2 id="featured-title">Modellvergleiche</h2></div></div>
      <a className="feature-story feature-story--rose" href="/ratgeber/momcozy-m9-oder-s12-pro/"><span className="eyebrow">Modellvergleich / Momcozy</span><div className="type-pair" aria-hidden="true"><span>M9</span><small>oder</small><span>S12</span></div><h3>App-Steuerung oder direkte Bedienung?</h3><p>M9 und S12 Pro: Was im Alltag zählt – und warum du die Generation „Quick“ unterscheiden solltest.</p><span className="text-link">Unterschiede lesen <ArrowRight size={18} aria-hidden="true" /></span></a>
      <a className="feature-story feature-story--sage" href="/ratgeber/medela-freestyle-oder-philips-avent/"><span className="eyebrow">Modellvergleich / Hands-free</span><div className="type-pair type-pair--names" aria-hidden="true"><span>Medela</span><small>oder</small><span>Avent</span></div><h3>Ähnliche Bauart. Andere Prioritäten.</h3><p>Freestyle Hands-free und Philips Avent SCF547/11: Bedienung, Cups und Lieferumfang einordnen.</p><span className="text-link">Zum direkten Vergleich <ArrowRight size={18} aria-hidden="true" /></span></a>
    </section>
    <section className="section model-clusters" id="modellfragen" aria-labelledby="model-cluster-title"><p className="eyebrow">Gezielt statt allgemein suchen</p><h2 id="model-cluster-title">Dein Modell. Deine konkrete Frage.</h2><p>Bedienung, Generation, Setumfang oder Teilecode: Hier findest du die Ratgeber zum jeweiligen Modell. Die Produktseiten bündeln die technischen Daten.</p><nav className="cluster-navigation" aria-label="Milchpumpen-Modelle">{PRODUCTS.map(product => <a key={product.id} href={`#cluster-${product.id}`}>{product.brand} {product.shortName}</a>)}</nav><div className="cluster-grid">{PRODUCTS.map(product => <section key={product.id} id={`cluster-${product.id}`} className="model-cluster"><h3><a href={productUrl(product)}>{product.brand} {product.name}</a></h3><ul>{EDITORIAL_GUIDES.filter(g => g.productIds.includes(product.id)).map(g => <li key={g.slug}><a href={`/ratgeber/${g.slug}/`}>{g.title}</a></li>)}</ul></section>)}</div></section>
    <div className="section"><p className="eyebrow">Nach dem Abpumpen</p><h2>Aufbewahrung, Transport und saubere Teile.</h2><p>Die Pumpe ist nur ein Teil des Ablaufs. Unser Produktwegweiser ordnet auch Beutel, Behälter, Reinigung und Stillzubehör nach ihrer konkreten Aufgabe ein.</p><a className="text-link" href="/produkte/">Zum gesamten Produktwegweiser <ArrowRight size={18} aria-hidden="true" /></a></div>
    <PumpFinder />
    <section className="section guide-library" id="artikel" aria-labelledby="library-title"><div className="section-heading section-heading--row"><div><p className="eyebrow">Wissen für deine Entscheidung</p><h2 id="library-title">Die Ratgeber-Bibliothek</h2></div><span className="library-total">{GUIDE_ARTICLES.length} Artikel</span></div>
      <div className="library-toolbar"><div className="filter-buttons" aria-label="Ratgeber-Themen">{['Alle Themen', 'Kaufentscheidung', 'Modellwissen', 'Muttermilch-Alltag', 'Alltag & Zubehör', 'Grundlagen'].map(topic => <button key={topic} aria-pressed={category === topic} onClick={() => setCategory(topic)}>{topic}</button>)}</div><label className="article-search"><span>Ratgeber durchsuchen</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="z. B. Reinigung oder App" /></label></div>
      <p className="result-count" aria-live="polite">{visible.length} Artikel sichtbar</p><div className="article-grid article-grid--wide">{visible.map((article, index) => <a className={`article-card article-card--${categoryFor(article.slug) === 'Grundlagen' ? 'basics' : 'buying'}`} href={`/ratgeber/${article.slug}/`} key={article.slug}>{EDITORIAL_ART.some(item => item.articleSlug === article.slug) && <div className="library-art"><EditorialImage slug={article.slug} title={article.title} /></div>}<div className="article-card-top"><span className="article-number">{String(index + 1).padStart(2, '0')}</span><span className="eyebrow">{categoryFor(article.slug)}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className="text-link">Weiterlesen <ArrowRight size={16} aria-hidden="true" /></span></a>)}</div>{visible.length === 0 && <p>Kein passender Artikel gefunden. Versuche einen allgemeineren Suchbegriff oder wähle alle Themen.</p>}
    </section>
    <section className="section section--tinted advice-banner"><ShieldCheck aria-hidden="true" /><div><h2>Eine gute Wahl beginnt nicht beim Kaufbutton.</h2><p>Passform, Einsatzhäufigkeit und Reinigung gehören zusammen. Bei Schmerzen, Fragen zur Milchbildung oder Unsicherheit helfen deine Hebamme, eine qualifizierte Still- und Laktationsberatung oder ärztliches Fachpersonal.</p><a href="/testmethodik/">Unsere Quellen und redaktionellen Grenzen</a></div></section>
  </main>;
}

import { useRef, useState, type ReactNode } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Breadcrumbs, ProductVisual, SourceLink } from './components';
import { GUIDE_ARTICLES, PRODUCTS, productUrl, type GuideSummary, type Product } from './data';
import { PumpFinder } from './editorial';
import { EDITORIAL_GUIDES } from './guides';
import { WEARABLE_MARKET } from './wearable-market';
import { responsiveEditorialPhoto } from './responsive-editorial-photos';
import { EDITORIAL_ART, EditorialImage } from './editorial-images';

const INTENTS = ['Auswählen & vergleichen', 'Passform & Anwendung', 'Muttermilch im Alltag'] as const;
type Intent = typeof INTENTS[number];

function intentFor(article: GuideSummary): Intent {
  if (article.category === 'Muttermilch-Alltag' || article.slug === 'milchpumpe-fuer-unterwegs') return INTENTS[2];
  if (['richtige-flanschgroesse', 'milchpumpe-reinigen'].includes(article.slug) || /Pflege|Zubehör/.test(article.category || '')) return INTENTS[1];
  return INTENTS[0];
}

const ELECTRIC_MODELS = PRODUCTS.filter(product => product.category.startsWith('Elektrisch'));
const MANUAL_MODELS = PRODUCTS.filter(product => !product.category.startsWith('Elektrisch'));
const FACT_ROWS = [
  ['focus', 'Schwerpunkt'], ['category', 'Bauart'], ['set', 'Ausführung'], ['app', 'App vorhanden'],
  ['energy', 'Energie'], ['wearStyle', 'Trageweise'], ['cleaning', 'Reinigung'],
] as const;

function ModelFacts({ product, other, emphasize = false }: { product: Product; other?: Product; emphasize?: boolean }) {
  return <dl className="mu-facts">{FACT_ROWS.map(([key, label]) => {
    const different = other ? product[key] !== other[key] : undefined;
    return <div key={key} data-fact={key} data-different={different} className={emphasize && different ? 'mu-fact--different' : undefined}><dt>{label}{emphasize && different && <span className="mu-difference-label">Unterschied</span>}</dt><dd>{key === 'app' ? (product.app ? 'Ja' : 'Nein') : product[key]}</dd></div>;
  })}</dl>;
}

function ModelDetail({ product, compareSide, other, emphasize }: { product: Product; compareSide?: 'a' | 'b'; other?: Product; emphasize?: boolean }) {
  return <article className={`mu-detail${compareSide ? ' mu-pair-card' : ''}`} data-detail-model={compareSide ? undefined : product.id} data-compare-side={compareSide} data-selected-model={compareSide ? product.id : undefined}>
    <header><ProductVisual product={product} compact={!compareSide} /><div>{compareSide && <p className="mu-side-label">Modell {compareSide.toUpperCase()}</p>}<p className="mu-kicker">{product.category}</p><h3><a href={productUrl(product)}>{product.brand} {product.name}</a></h3></div></header>
    <p>{product.summary}</p><ModelFacts product={product} other={other} emphasize={emphasize} />
    <h4>Dokumentierte Merkmale</h4><ul>{product.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
    <div className="mu-tradeoffs"><div><h4>Was dafür spricht</h4><ul>{product.strengths.map(strength => <li key={strength}>{strength}</li>)}</ul></div><div><h4>Was du abwägen solltest</h4><ul>{product.limitations.map(limitation => <li key={limitation}>{limitation}</li>)}</ul></div></div>
    <footer><a href={productUrl(product)}>Alle Details zu {product.brand} {product.shortName} →</a><SourceLink href={product.sourceUrl}>{product.sourceLabel}</SourceLink>{product.sourceCheckedDate && <p>Quellenstand dieses Modells: {product.sourceCheckedDate}</p>}</footer>
  </article>;
}

export function VisualComparisonPage({ footerSlot }: { footerSlot?: ReactNode } = {}) {
  const [pair, setPair] = useState<readonly [string, string]>(['momcozy-m9', 'medela-freestyle']);
  const [emphasize, setEmphasize] = useState(true);
  const firstSelect = useRef<HTMLSelectElement>(null);
  const left = PRODUCTS.find(product => product.id === pair[0])!;
  const right = PRODUCTS.find(product => product.id === pair[1])!;
  const resetPair = () => { setPair(['momcozy-m9', 'medela-freestyle']); firstSelect.current?.focus(); };
  return <main id="inhalt" className="magazine-upgrade mu-comparison">
    <section className="mu-section mu-intro"><Breadcrumbs items={[{ href: '/vergleich/', label: 'Vergleich' }]} /><p className="mu-kicker">Funktionen statt Gesamtnoten</p><h1>Was unterscheidet<br /> <em>deine Auswahl?</em></h1><p className="mu-lead">Sechs ausgewählte Detailmodelle: fünf elektrische Milchpumpen und Haakaa als manuelle Ergänzung. Vergleiche dokumentierte Merkmale – nicht versprochene Milchmengen.</p><div className="mu-actions"><a href="#mu-electric-models" className="mu-button">Die fünf elektrischen Modelle →</a><a href="#mu-manual-models">Haakaa manuell einordnen →</a></div></section>
    <aside className="mu-section mu-market-note"><h2>Sechs Detailmodelle ≠ der ganze Markt.</h2><p>Der größere Überblick enthält {WEARABLE_MARKET.models.length} recherchierte elektrische Wearables und Hands-free-Systeme. Diese Detailauswahl ist keine Rangliste und keine vollständige Marktübersicht.</p><a href="/tragbare-milchpumpen/">Alle {WEARABLE_MARKET.models.length} recherchierten Modelle und ihre Quellen →</a></aside>
    <section className="mu-section mu-pair" id="mu-pair" aria-labelledby="mu-pair-title"><header className="mu-section-heading"><div><p className="mu-kicker">Zwei Modelle, deine Prioritäten</p><h2 id="mu-pair-title">Direkt nebeneinander.</h2></div><a href="#mu-electric-models">Alle Merkmale der sechs Detailmodelle ↓</a></header><p id="mu-compare-scope">Wählbar sind die sechs Detailmodelle dieser Seite, nicht alle {WEARABLE_MARKET.models.length} Modelle des Marktüberblicks.</p>
      <form className="mu-pair-controls" onSubmit={event => event.preventDefault()} aria-label="Zwei Detailmodelle auswählen"><fieldset><legend>Deine Gegenüberstellung</legend><div className="mu-select-pair">{(['a', 'b'] as const).map((side, index) => <div key={side}><label htmlFor={`mu-compare-${side}`}>Modell {side.toUpperCase()}</label><select ref={side === 'a' ? firstSelect : undefined} id={`mu-compare-${side}`} value={pair[index]} aria-describedby="mu-compare-scope" aria-controls="mu-pair-results" onChange={event => setPair(current => index === 0 ? [event.target.value, current[1]] : [current[0], event.target.value])}><optgroup label="Elektrisch · 5 Modelle">{ELECTRIC_MODELS.map(product => <option key={product.id} value={product.id}>{product.brand} {product.name}</option>)}</optgroup><optgroup label="Manuell · separat einordnen">{MANUAL_MODELS.map(product => <option key={product.id} value={product.id}>{product.brand} {product.name}</option>)}</optgroup></select></div>)}</div></fieldset><div className="mu-pair-actions"><button type="button" id="mu-compare-swap" onClick={() => setPair(current => [current[1], current[0]])}>Modelle tauschen ↔</button><button type="button" id="mu-compare-reset" onClick={resetPair}>Auswahl zurücksetzen</button></div></form>
      <p id="mu-compare-status" role="status" aria-live="polite" aria-atomic="true">{left.id === right.id ? `Du hast zweimal dasselbe Modell ausgewählt: ${left.brand} ${left.name}. Wähle ein anderes Modell für die Gegenüberstellung.` : `${left.brand} ${left.name} und ${right.brand} ${right.name} im Vergleich.`}</p>
      <p id="mu-manual-warning" className="mu-manual-warning" hidden={!MANUAL_MODELS.some(product => pair.includes(product.id))}>Manuelle Einordnung: Haakaa hat keinen Motor und keine geregelten Pumpzyklen. Ein Merkmalsvergleich bedeutet nicht, dass sie eine elektrische Doppelpumpe ersetzt.</p>
      <div className="mu-differences-control"><input id="mu-differences" type="checkbox" checked={emphasize} onChange={event => setEmphasize(event.target.checked)} aria-describedby="mu-differences-note" /><label htmlFor="mu-differences">Unterschiede hervorheben</label><p id="mu-differences-note">Markiert abweichende Angaben in den sieben Kernmerkmalen. Gleiche Angaben und alle weiteren Fakten bleiben sichtbar; keine Bewertung der Pumpenleistung.</p></div>
      <div className="mu-pair-grid" id="mu-pair-results"><ModelDetail product={left} compareSide="a" other={right} emphasize={emphasize} /><ModelDetail product={right} compareSide="b" other={left} emphasize={emphasize} /></div>
    </section>
    <section className="mu-section" id="mu-electric-models" aria-labelledby="mu-electric-title"><p className="mu-kicker">Elektrisch · fünf Modelle</p><h2 id="mu-electric-title">Die vollständigen Merkmale.</h2><p>Ausführung, App, Energie, Bauart und Reinigung bleiben für alle fünf elektrischen Modelle zugänglich – auch ohne JavaScript.</p><div className="mu-detail-grid">{ELECTRIC_MODELS.map(product => <ModelDetail product={product} key={product.id} />)}</div></section>
    <section className="mu-section mu-manual" id="mu-manual-models" aria-labelledby="mu-manual-title"><p className="mu-kicker">Manuell · separat eingeordnet</p><h2 id="mu-manual-title">Haakaa ist keine elektrische Alternative mit denselben Funktionen.</h2><p>Ohne Motor und geregelte Pumpzyklen: Die Silikonpumpe ist eine manuelle Ergänzung, nicht direkt mit einer elektrischen Doppelpumpe gleichzusetzen.</p>{MANUAL_MODELS.map(product => <ModelDetail product={product} key={product.id} />)}</section>
    <section className="mu-section mu-next-reads"><h2>Die nächste Frage entscheidet mit.</h2><div><a href="/ratgeber/momcozy-m9-oder-s12-pro/">Momcozy M9 oder S12 Pro? →</a><a href="/ratgeber/medela-freestyle-oder-philips-avent/">Medela Freestyle oder Philips Avent? →</a><a href="/ratgeber/richtige-flanschgroesse/">Welche Flanschgröße passt? →</a><a href="/ratgeber/milchpumpe-reinigen/">Wie plane ich die Reinigung? →</a><a href="/ratgeber/hands-free-milchpumpe-kaufen/">Die Kauf-Checkliste →</a><a href="/ratgeber/">Alle Ratgeber →</a></div></section>
    <aside className="mu-section mu-advice"><ShieldCheck aria-hidden="true" /><div><h2>Entscheide nach deinem Alltag.</h2><p>Gleiche die dokumentierten Merkmale mit deinem Einsatzort, der passenden Größe und dem vollständigen Setumfang ab. Die verlinkten Herstellerunterlagen helfen dir dabei. Bei Schmerzen oder Fragen zur Milchversorgung hilft eine qualifizierte Stillberatung.</p><a href="/testmethodik/">So entstehen Vergleich und Kaufhilfe →</a></div></aside>
    {footerSlot}
  </main>;
}

export function MagazineGuideHub({ footerSlot }: { footerSlot?: ReactNode } = {}) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const matches = (article: GuideSummary) => (!topic || intentFor(article) === topic) && `${article.title} ${article.description}`.toLocaleLowerCase('de').includes(query.trim().toLocaleLowerCase('de'));
  const visibleCount = GUIDE_ARTICLES.filter(matches).length;
  const reset = () => { setQuery(''); setTopic(''); searchRef.current?.focus(); };
  return <main id="inhalt" className="magazine-upgrade">
    <section className="mu-section mu-intro">
      <Breadcrumbs items={[{ href: '/ratgeber/', label: 'Ratgeber' }]} />
      <p className="mu-kicker">Das Abpumpen-Magazin</p>
      <h1>Weniger Sucherei.<br /> <em>Mehr Alltag, der passt.</em></h1>
      <p className="mu-lead">Welche Pumpe, welche Teile, wohin mit der Milch? Hier findest du verständliche Antworten – vom ersten Modellvergleich bis zum vorbereiteten Pumpset.</p>
      <div className="mu-actions"><a className="mu-button" href="#artikel">Alle Ratgeber entdecken <ArrowRight size={17} aria-hidden="true" /></a><a href="#pumpenfinder">Zur interaktiven Kaufhilfe →</a></div>
    </section>
    <section className="mu-section mu-cover" aria-labelledby="mu-cover-title">
      <h2 id="mu-cover-title" className="mu-kicker">Für deinen nächsten Schritt</h2>
      <div className="mu-stories">
        <article className="mu-story mu-story--lead" data-magazine-story="cleaning"><figure><a href="/ratgeber/milchpumpe-reinigen/" aria-label="Milchpumpe hygienisch reinigen"><img src="/editorial-photos/pump-parts.jpg" {...responsiveEditorialPhoto('/editorial-photos/pump-parts.jpg')} alt="Zerlegte Auffangschalen und einzelne Teile einer Hands-free-Milchpumpe" width="1350" height="1800" loading="eager" fetchPriority="high" decoding="async" /></a><figcaption>Foto: LeslieKnope345 / <a href="https://commons.wikimedia.org/wiki/File:Hands_Free_Breast_Pump.jpg">Wikimedia Commons · CC0</a></figcaption></figure><div className="mu-story-copy"><p className="mu-kicker">Passform & Anwendung</p><h3><a href="/ratgeber/milchpumpe-reinigen/">Nach dem Pumpen ist vor dem nächsten Mal.</a></h3><p>Reinigen, trocknen, wieder zusammensetzen: So planst du den Ablauf ein, der zu jeder Pumpe dazugehört.</p><a href="/ratgeber/milchpumpe-reinigen/">Den Reinigungsablauf verstehen →</a></div></article>
        <article className="mu-story mu-story--mint" data-magazine-story="storage"><figure><a href="/ratgeber/muttermilchbeutel-oder-mehrwegbecher/" aria-label="Muttermilchbeutel oder Mehrwegbecher"><img src="/article-photos/milk-containers-960.webp" alt="Verschiedene Aufbewahrungsbehälter und Flaschen für abgepumpte Muttermilch auf einem Tuch" width="960" height="716" loading="lazy" decoding="async" /></a><figcaption>Foto: Beukbeuk / <a href="https://commons.wikimedia.org/wiki/File:Breast_milk_storage_containers_bottles.JPG">Wikimedia Commons · Public domain</a></figcaption></figure><div className="mu-story-copy"><p className="mu-kicker">Muttermilch im Alltag</p><h3><a href="/ratgeber/muttermilchbeutel-oder-mehrwegbecher/">Beutel oder Becher? Denk vom Alltag aus.</a></h3><p>Portionieren, Platz und Wiederverwenden: Was deine Entscheidung leichter macht.</p><a href="/ratgeber/muttermilchbeutel-oder-mehrwegbecher/">Aufbewahrung einordnen →</a></div></article>
        <article className="mu-story mu-story--coral" data-magazine-story="portions"><figure><a href="/ratgeber/muttermilch-beschriften-portionen-gefrierfach/" aria-label="Muttermilch beschriften und portionieren"><img src="/article-photos/frozen-milk-480.webp" alt="Beschriftete Beutel mit gefrorener Muttermilch" width="480" height="659" loading="lazy" decoding="async" /></a><figcaption>Foto: Shmarrighan / <a href="https://commons.wikimedia.org/wiki/File:Frozen_Bags_of_Pumped_Breast_Milk.jpg">Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> · verkleinert, WebP</figcaption></figure><div className="mu-story-copy"><p className="mu-kicker">Gut vorbereitet</p><h3><a href="/ratgeber/muttermilch-beschriften-portionen-gefrierfach/">Ein Etikett weniger im Kopf.</a></h3><p>Wie du Portionen und Beschriftung für deinen Vorrat organisierst.</p><a href="/ratgeber/muttermilch-beschriften-portionen-gefrierfach/">Zur Vorratsorganisation →</a></div></article>
      </div><p className="mu-photo-note">Einblicke in den Abpumpalltag. Für Pflege und Kompatibilität gilt die Anleitung deines konkreten Modells.</p>
    </section>
    <nav className="mu-section mu-intents" aria-label="Dein Einstieg ins Magazin">{INTENTS.map((intent, index) => <a key={intent} data-magazine-intent={intent} href={`#magazin-thema-${index + 1}`} onClick={() => { setQuery(''); setTopic(intent); }}><span>0{index + 1}</span><strong>{intent}</strong><small>{['Bauart, Bedienung und genaue Generation verstehen.', 'Passende Einsätze und saubere Teile einplanen.', 'Aufbewahrung, Transport und Routinen vorbereiten.'][index]}</small><ArrowRight aria-hidden="true" /></a>)}</nav>
    <section className="mu-section mu-library" id="artikel" aria-labelledby="mu-library-title">
      <header className="mu-section-heading"><div><p className="mu-kicker">Antworten statt offener Tabs</p><h2 id="mu-library-title">Die Ratgeber-Bibliothek</h2></div><span>{GUIDE_ARTICLES.length} Artikel</span></header>
      <form className="mu-filters" onSubmit={event => event.preventDefault()} role="search" aria-label="Ratgeber filtern">
        <div><label htmlFor="mu-guide-search">Ratgeber durchsuchen</label><input ref={searchRef} id="mu-guide-search" type="search" value={query} onInput={event => setQuery(event.currentTarget.value)} placeholder="z. B. Reinigung oder M9" aria-controls="mu-guide-results" /></div>
        <div><label htmlFor="mu-guide-topic">Thema</label><select id="mu-guide-topic" value={topic} onChange={event => setTopic(event.target.value)} aria-controls="mu-guide-results"><option value="">Alle Themen</option>{INTENTS.map(intent => <option key={intent}>{intent}</option>)}</select></div>
        <button id="mu-guide-reset" type="button" onClick={reset}>Filter zurücksetzen</button>
      </form>
      <p id="mu-guide-status" role="status" aria-live="polite" aria-atomic="true">{visibleCount} von {GUIDE_ARTICLES.length} Artikeln{topic ? ` · ${topic}` : ''}{query.trim() ? ` · Suche: „${query.trim()}“` : ''}</p>
      <p id="mu-guide-empty" hidden={visibleCount !== 0}>Kein passender Artikel gefunden. Versuche einen allgemeineren Suchbegriff oder setze die Filter zurück.</p>
      <div id="mu-guide-results">{INTENTS.map((intent, index) => <section className="mu-library-group" id={`magazin-thema-${index + 1}`} key={intent} hidden={!GUIDE_ARTICLES.some(article => intentFor(article) === intent && matches(article))}><h3>{intent}</h3><div className="mu-library-list">{GUIDE_ARTICLES.filter(article => intentFor(article) === intent).map(article => <article key={article.slug} data-guide-slug={article.slug} data-guide-intent={intent} hidden={!matches(article)}><a href={`/ratgeber/${article.slug}/`}>{EDITORIAL_ART.some(asset => asset.articleSlug === article.slug) && <EditorialImage slug={article.slug} title={article.title} />}<h4>{article.title}</h4><p>{article.description}</p><span>Artikel lesen <ArrowRight size={15} aria-hidden="true" /></span></a></article>)}</div></section>)}</div>
    </section>
    <section className="mu-section" id="modellfragen" aria-labelledby="mu-cluster-title"><p className="mu-kicker">Schon ein Modell im Kopf?</p><h2 id="mu-cluster-title">Dein Modell. Deine nächste Frage.</h2><nav className="mu-cluster-nav" aria-label="Milchpumpen-Modelle">{PRODUCTS.map(product => <a href={`#cluster-${product.id}`} key={product.id}>{product.brand} {product.shortName}</a>)}</nav><div className="mu-clusters">{PRODUCTS.map(product => <section id={`cluster-${product.id}`} key={product.id}><h3><a href={productUrl(product)}>{product.brand} {product.name}</a></h3><ul>{EDITORIAL_GUIDES.filter(guide => guide.productIds.includes(product.id)).map(guide => <li key={guide.slug}><a href={`/ratgeber/${guide.slug}/`}>{guide.title}</a></li>)}</ul></section>)}</div></section>
    <aside className="mu-section mu-market-note"><h2>Ein Modell ist noch keine Auswahl.</h2><p>Im Marktüberblick findest du {WEARABLE_MARKET.models.length} recherchierte elektrische Wearables und Hands-free-Systeme. Handpumpen gehören nicht in diese Auswahl.</p><a href="/tragbare-milchpumpen/">Zum größeren Marktüberblick →</a><p><a href="/produkte/">Auch Aufbewahrung, Reinigung und Stillzubehör einordnen →</a></p></aside>
    <PumpFinder />
    <aside className="mu-section mu-advice"><ShieldCheck aria-hidden="true" /><div><h2>Orientierung, keine individuelle Stillberatung.</h2><p>Bei Schmerzen, Fragen zur Milchbildung oder Unsicherheit helfen deine Hebamme, eine qualifizierte Still- und Laktationsberatung oder ärztliches Fachpersonal.</p><a href="/testmethodik/">Quellen, Methodik und redaktionelle Grenzen</a></div></aside>
    {footerSlot}
  </main>;
}

import { ArrowRight, Check, CircleHelp, HeartHandshake, ShieldCheck } from 'lucide-react';
import { AffiliateLink, AllProductsAside, Breadcrumbs, ProductVisual, SourceLink } from './components';
import { REVIEW_DATE, REVIEW_DATE_ISO, type Product, productUrl } from './product-data';
import { GUIDE_LINKS } from './data';
import { ExternalReports } from './external-reports';

export function ProductPage({ product }: { product: Product }) {
  const modelGuides = GUIDE_LINKS.filter(guide => guide.productIds.includes(product.id))
    .sort((a, b) => a.productIds.length - b.productIds.length || a.title.localeCompare(b.title, 'de'))
    .slice(0, 6);
  return (
    <main id="inhalt">
      <section className="product-hero section">
        <div>
          <Breadcrumbs items={[{ href: '/vergleich/', label: 'Vergleich' }, { href: productUrl(product), label: `${product.brand} ${product.name}` }]} />
          <p className="eyebrow">{product.focus}</p>
          <h1>{product.brand} {product.name}</h1>
          <p className="article-byline">Redaktion: <a href="/ueber-uns/">Andreas Böhler</a> · Herstellerinfos und Quellen</p>
          <p className="hero-lead">{product.summary}</p>
          <dl className="product-offer-spec"><div data-selected-set><dt>{product.amazonAsin ? 'Verlinkte Ausführung' : 'Modell-Ausführungen'}</dt><dd>{product.amazonVariant || product.set}</dd></div><div><dt>Quellenabgleich</dt><dd><time dateTime={product.sourceCheckedDate || REVIEW_DATE_ISO}>{product.sourceCheckedDate || REVIEW_DATE}</time> · <a href="#quellen">Herstellerunterlagen</a></dd></div></dl>
          <div className="hero-actions"><AffiliateLink product={product} /><a className="button button--secondary" href="#quellen">Quellen ansehen</a></div>
          <p className="affiliate-inline">* Affiliate-Link. {product.amazonAsin ? `Verlinkte Ausführung: ${product.amazonVariant}.` : 'Öffnet eine Amazon-Suche; genaue Modellgeneration und Ausführung prüfen.'} Preis und Verfügbarkeit werden beim Händler angezeigt.</p>
        </div>
        <ProductVisual product={product} />
      </section>
      <section className="section product-answer"><p className="eyebrow">Kurz eingeordnet</p><h2>Für wen ist dieses Modell interessant?</h2><p>{product.summary} Entscheidend bleiben die genaue Ausführung, deine Passform und der Reinigungsaufwand. Die Angaben stammen aus den verlinkten Herstellerunterlagen.</p><a href="/ratgeber/hands-free-milchpumpe-kaufen/">Zur vollständigen Kauf-Checkliste</a></section>
      <ExternalReports productId={product.id} />
      <section className="section detail-grid">
        <article>
          <p className="eyebrow">Dokumentierte Merkmale</p><h2>Was der Hersteller beschreibt</h2>
          <ul className="check-list">{product.facts.map((fact) => <li key={fact}><Check aria-hidden="true" />{fact}</li>)}</ul>
          <div className="source-box" id="quellen"><ShieldCheck aria-hidden="true" /><div><h3>Primärquelle</h3><p>Die technischen Angaben auf dieser Seite wurden am {product.sourceCheckedDate || REVIEW_DATE} mit der verlinkten Herstellerquelle abgeglichen.</p><SourceLink href={product.sourceUrl}>{product.sourceLabel}</SourceLink></div></div>
        </article>
        <aside className="spec-card"><h2>Dokumentierte Produktmerkmale</h2><dl><div><dt>Bauart</dt><dd>{product.category}</dd></div><div><dt>Ausführung</dt><dd>{product.set}</dd></div><div><dt>App</dt><dd>{product.app ? 'Vorhanden' : 'Nicht vorgesehen'}</dd></div><div><dt>Energie</dt><dd>{product.energy}</dd></div><div><dt>Trageweise</dt><dd>{product.wearStyle}</dd></div><div><dt>Reinigung</dt><dd>{product.cleaning}</dd></div></dl></aside>
      </section>
      <section className="section section--tinted pros-cons">
        <article><h2>Kann gut passen, wenn …</h2><ul>{product.strengths.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></article>
        <article><h2>Vor dem Kauf prüfen</h2><ul>{product.limitations.map((item) => <li key={item}><CircleHelp aria-hidden="true" />{item}</li>)}</ul></article>
      </section>
      <section className="section editorial-boundary"><HeartHandshake aria-hidden="true" /><div><h2>Vor deiner Entscheidung</h2><p>Gleiche die Größen und den vollständigen Setumfang mit deinem Bedarf ab. Die Angaben hier stammen aus den verlinkten Herstellerunterlagen. Wie angenehm sich die Pumpe trägt und wie viel Milch du gewinnst, hängt von deiner persönlichen Situation ab. <a href="/testmethodik/#kaufentscheidung">So leiten wir die Kaufhilfe aus den Merkmalen ab</a>.</p></div></section>
      <section className="section model-guide-links"><p className="eyebrow">Die nächste Frage beantworten</p><h2>Ratgeber zu {product.brand} {product.name}</h2><p>Genauere Fragen zu diesem Modell statt allgemeiner Kaufversprechen.</p><div className="article-grid">{modelGuides.map(guide => <a className="article-card" key={guide.slug} href={`/ratgeber/${guide.slug}/`}><span className="eyebrow">{guide.category}</span><h3>{guide.title}</h3><p>{guide.description}</p><span className="text-link">Details lesen <ArrowRight size={16} aria-hidden="true" /></span></a>)}</div></section>
      <section className="section"><AllProductsAside currentId={product.id} /></section>
    </main>
  );
}

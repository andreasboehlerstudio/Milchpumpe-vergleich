import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Breadcrumbs, ProductCard, SourceLink } from './components';
import { PRODUCTS, productUrl } from './data';
import { AffiliateLink } from './components';
import { GUIDE_DECISIONS } from './search-intents';
import { EDITORIAL_GUIDES } from './guides';
import { relatedGuides } from './contextual-links';
import type { BuyingGuide } from './buying-guides';
import { EditorialImage } from './editorial-images';
import { PROBLEM_PRODUCT_FOCUS } from './problem-product-focus';
import { PRODUCT_CATALOGUE } from './product-catalogue';
import { CatalogueCard } from './catalogue';
import { ArticleInlineVisual } from './article-media';
import { ArticleReadingTools } from './article-reading-tools';

export function BuyingGuidePage({ guide }: { guide: BuyingGuide }) {
  const focus = PROBLEM_PRODUCT_FOCUS[guide.slug];
  const focusProduct = focus && PRODUCT_CATALOGUE.find(product => product.id === focus.productId);
  if (focus && !focusProduct) throw new Error(`Unknown article focus product: ${focus.productId}`);
  const products = PRODUCTS.filter(product => focus ? product.id === focus.productId : guide.productIds.includes(product.id));
  const related = relatedGuides(guide, EDITORIAL_GUIDES);
  const firstFAQ = guide.faqs[0];
  const decision = GUIDE_DECISIONS[guide.slug];
  const primaryProduct = products.find(product => product.id === (focus?.productId ?? decision?.primaryProductId));
  const date = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${guide.updated}T00:00:00Z`));
  return <main id="inhalt"><article className="article-page section buying-article">
    <Breadcrumbs items={[{ href: '/ratgeber/', label: 'Ratgeber' }, { href: `/ratgeber/${guide.slug}/`, label: guide.title }]} />
    <p className="eyebrow">{guide.category} · Redaktioneller Vergleich</p><h1>{guide.title}</h1>
    <div className="article-byline"><span>Redaktion: <a href="/ueber-uns/">Andreas Böhler</a></span><span>Recherche-Stand: <time dateTime={guide.updated}>{date}</time></span><a href="/testmethodik/">Quellen und Methode</a></div>
    <p className="hero-lead">{guide.lead}</p><ArticleReadingTools content={[guide.lead, ...guide.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.bullets ?? [])]), ...guide.faqs.flatMap(faq => [faq.question, faq.answer])]} /><p className="affiliate-inline">Werbehinweis: Dieser Artikel enthält gekennzeichnete Affiliate-Links zu Amazon. Bei qualifizierten Verkäufen kann eine Provision entstehen. Deine individuelle Passform oder Milchmenge wird hier nicht bewertet.</p>
    <figure className="article-visual"><EditorialImage slug={guide.slug} title={guide.title} /><figcaption>Themenillustration zum Artikel.</figcaption></figure>
    {firstFAQ && <aside className="answer-box" aria-labelledby="short-answer-title"><p className="eyebrow">Kurzantwort</p><h2 id="short-answer-title">{firstFAQ.question}</h2><p>{firstFAQ.answer}</p><a href="#quellen">Die Quellen prüfen <ArrowRight size={16} aria-hidden="true" /></a></aside>}
    {decision && (focusProduct || primaryProduct) && <section id={guide.sections.some(section => section.id === 'kaufcheck') ? 'entscheidungscheck' : 'kaufcheck'} className="intent-check"><p className="eyebrow">Dein Kaufcheck · Redaktionelle Entscheidungshilfe</p><h2>{decision.question}</h2><div className="table-scroll" tabIndex={0} role="region" aria-label="Ausgangslage und Prüfschritte, horizontal scrollbar"><table><caption>Ausgangslage und nächster Prüfschritt</caption><thead><tr><th scope="col">Deine Ausgangslage</th><th scope="col">Darauf kommt es an</th></tr></thead><tbody>{decision.rows.map(([situation, check]) => <tr key={situation}><th scope="row">{situation}</th><td>{check}</td></tr>)}</tbody></table></div><p>{focus && !primaryProduct ? focus.existingAlternative : decision.offerNote}</p><div data-intent-purchase={guide.slug}>{focus ? <a className="text-link" href="#modelle">Erst prüfen, ob das Produkt zu deinem Ablauf passt <ArrowRight size={16} aria-hidden="true" /></a> : primaryProduct && <><AffiliateLink product={primaryProduct} placement="intent_check" className="button button--primary">{primaryProduct.brand} {primaryProduct.shortName}: {primaryProduct.amazonAsin ? 'Angebot prüfen*' : 'Modelle suchen*'}</AffiliateLink><a className="text-link" href={productUrl(primaryProduct)}>Erst die Produktdaten lesen <ArrowRight size={16} aria-hidden="true" /></a></>}</div><p className="finder-note">* Affiliate-Link. Bei qualifizierten Käufen kann eine Provision entstehen.</p></section>}
    <nav id="artikel-inhalt" className="article-toc" aria-label="Inhaltsverzeichnis"><h2>Inhaltsverzeichnis</h2><ol>{guide.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}<li><a href="#modelle">Die besprochenen Modelle</a></li><li><a href="#fragen">Häufige Fragen</a></li><li><a href="#quellen">Quellen und Grenzen</a></li></ol></nav>
    <div className="article-body">{guide.sections.map((section, sectionIndex) => <section key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map((p, i) => <p key={i}>{focus?.paragraphOverrides?.[section.id]?.[i] ?? p}</p>)}{section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}{section.sourceIndexes && <div className="section-sources">{section.sourceIndexes.map(index => { const source = guide.sources[index]; return source ? <SourceLink key={source.url} href={source.url}>{source.label}</SourceLink> : null; })}</div>}{sectionIndex === 0 && <ArticleInlineVisual slug={guide.slug} index={0} />}{sectionIndex === 3 && <ArticleInlineVisual slug={guide.slug} index={1} />}</section>)}</div>
    <section id="modelle" className="article-model-section"><p className="eyebrow">Konkreter Produktbezug</p><h2>{focus ? 'Ein Produkt für diesen Ablauf' : 'Die besprochenen Modelle'}</h2><p>Die Modellinfos stammen aus Herstellerunterlagen. Prüfe beim Händler die genaue Generation und den Setumfang.</p>
      {focus && focusProduct ? <>{focus.whyItHelps && <p>{focus.whyItHelps}</p>}<p className="existing-alternative"><span>Vorhandene Ausstattung: </span>{focus.noPurchaseAlternative ?? focus.existingAlternative}</p><CatalogueCard product={focusProduct} /></> : <>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Modellvergleich, horizontal scrollbar"><table className="article-comparison"><caption>Dokumentierte Unterschiede der im Artikel genannten Milchpumpen</caption><thead><tr><th scope="col">Modell</th><th scope="col">Bauart</th><th scope="col">Ausführung</th><th scope="col">App</th><th scope="col">Trageweise</th></tr></thead><tbody>{products.map(p => <tr key={p.id}><th scope="row"><a href={productUrl(p)}>{p.brand} {p.name}</a></th><td>{p.category}</td><td>{p.set}</td><td>{p.app ? 'Vorhanden' : 'Nicht vorgesehen'}</td><td>{p.wearStyle}</td></tr>)}</tbody></table></div>
      <div className="article-product-list">{products.map(product => <ProductCard product={product} key={product.id} />)}</div>
      <a className="text-link" href="/vergleich/">Alle sechs Modelle gegenüberstellen <ArrowRight size={18} aria-hidden="true" /></a></>}
    </section>
    <section id="fragen" className="article-faq"><h2>Häufige Fragen zu diesem Thema</h2><div className="faq-list">{guide.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><div><p>{faq.answer}</p></div></details>)}</div></section>
    <section className="source-box" id="quellen"><ShieldCheck aria-hidden="true" /><div><h2>Quellen</h2><p>Die Angaben zu Funktionen und Ausstattung stammen aus den verlinkten Produktseiten und Anleitungen. Angebote und Lieferumfänge können sich ändern.</p><ul>{guide.sources.map(source => <li key={source.url}><SourceLink href={source.url}>{source.label}</SourceLink></li>)}</ul><p>Bei Schmerzen, Fragen zur Milchbildung oder einer individuellen Pumpstrategie wende dich an eine Hebamme, qualifizierte Still- und Laktationsberatung oder ärztliches Fachpersonal.</p></div></section>
    <aside className="article-related"><h2>Weiterlesen</h2>{related.map(article => <a key={article.slug} href={`/ratgeber/${article.slug}/`}>{article.title} <ArrowRight size={16} aria-hidden="true" /></a>)}<a href="/ratgeber/">Zur gesamten Ratgeber-Bibliothek</a></aside>
  </article></main>;
}

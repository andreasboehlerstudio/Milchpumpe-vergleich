import { ShieldCheck } from 'lucide-react';
import { Breadcrumbs, ProductCard, SourceLink } from './components';
import { GUIDE_ARTICLES, PRODUCTS } from './data';
import { EDITORIAL_GUIDES } from './guides';
import { BuyingGuidePage } from './article';
import { MILK_GUIDES, MilkGuidePage } from './milk-articles';
import { EDITORIAL_ART, EditorialImage } from './editorial-images';
import { ArticleInlineVisual } from './article-media';
import { ArticleReadingTools } from './article-reading-tools';
import { NotFoundPage } from './route-legal-pages';
import { FOUNDATION_GUIDES, FOUNDATION_SOURCES } from './foundation-guide-data';


const ARTICLE_CONTENT: Record<string, { title: string; lead: string; sections: { title: string; body: React.ReactNode }[] }> = {

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
  const buyingGuide = EDITORIAL_GUIDES.find(guide => guide.slug === slug);
  if (buyingGuide) return <BuyingGuidePage guide={buyingGuide} />;
  if (MILK_GUIDES.some(g=>g.slug===slug)) return <MilkGuidePage slug={slug} />;
  const foundation = FOUNDATION_GUIDES[slug];
  const article = foundation ? {
    ...foundation,
    sections: foundation.sections.map(section => ({
      title: section.title,
      body: <>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {section.bullets && <ul>{section.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
        {section.table && <div className="table-scroll" tabIndex={0} role="region" aria-label={`${section.table.caption}, horizontal scrollbar`}>
          <table className="article-comparison"><caption>{section.table.caption}</caption>
            <thead><tr>{section.table.headings.map(heading => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
            <tbody>{section.table.rows.map(row => <tr key={row.cells[0]}>{row.cells.map((cell, i) => i === 0 ? <th key={i} scope="row">{cell}</th> : <td key={i}>{cell}{i === row.cells.length - 1 && <div className="section-sources">{row.sourceKeys.map(key => <SourceLink key={key} href={FOUNDATION_SOURCES[key].url}>{FOUNDATION_SOURCES[key].label}</SourceLink>)}</div>}</td>)}</tr>)}</tbody>
          </table>
        </div>}
        <div className="section-sources">{section.sourceKeys.map(key => <SourceLink key={key} href={FOUNDATION_SOURCES[key].url}>{FOUNDATION_SOURCES[key].label}</SourceLink>)}</div>
      </>,
    })),
  } : ARTICLE_CONTENT[slug];
  if (!article) return <NotFoundPage />;
  const updated = foundation?.updated ?? GUIDE_ARTICLES.find(guide => guide.slug === slug)?.updated;
  const updateLabel = updated ? new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${updated}T00:00:00Z`)) : '';
  const relevantIds = slug === 'milchpumpe-reinigen' ? ['medela-freestyle', 'philips-avent-scf547'] : slug === 'richtige-flanschgroesse' ? ['momcozy-m9', 'philips-avent-scf547'] : ['haakaa-gen3', 'medela-freestyle'];
  const freeGuide = foundation ? { slug: foundation.pdfSlug, title: slug === 'milchpumpe-reinigen' ? 'Deine Reinigungs- und Teileroutine' : 'Deine Passform-Beratungsvorbereitung' } : undefined;
  return (
    <main id="inhalt"><article className="article-page section">
      <Breadcrumbs items={[{ href: '/ratgeber/', label: 'Ratgeber' }, { href: `/ratgeber/${slug}/`, label: article.title }]} />
      <p className="eyebrow">Grundlagen · Quellenbasierte Orientierung</p><h1>{article.title}</h1>
      <p className="article-byline">Redaktion: <a href="/ueber-uns/">Andreas Böhler</a> · <time dateTime={updated}>Recherche-Stand: {updateLabel}</time> · <a href="/testmethodik/">Quellen und Methode</a></p>
      {foundation && <p className="eyebrow">Kurzantwort</p>}
      <p className="hero-lead">{article.lead}</p>
      <ArticleReadingTools content={[article.lead, ...article.sections.map(section => <div key={section.title}>{section.title}{section.body}</div>), ...(foundation ? [foundation.noPurchase, ...foundation.faqs.flatMap(faq => [faq.question, faq.answer])] : [])]} />
      {EDITORIAL_ART.some(item => item.articleSlug === slug) && <figure className="article-visual"><EditorialImage slug={slug} title={article.title} eager /><figcaption>Themenillustration zum Artikel.</figcaption></figure>}
      <nav id="artikel-inhalt" className="article-toc" aria-label="Inhaltsverzeichnis"><h2>Inhaltsverzeichnis</h2><ol>
        {article.sections.map((section, i) => <li key={section.title}><a href={`#abschnitt-${i + 1}`}>{section.title}</a></li>)}
        {foundation && <><li><a href="#ohne-kauf">Mit vorhandener Ausstattung weiterkommen</a></li><li><a href="#fragen">Häufige Fragen</a></li></>}
        <li><a href="#quellen">Quellen und Einordnung</a></li><li><a href="#modelle">Konkrete Modelle zum Thema</a></li>
        {foundation && <li><a href="#weiterlesen">Passende Ratgeber</a></li>}
      </ol></nav>
      <div className="article-body">{article.sections.map((section, i) => <section id={`abschnitt-${i + 1}`} key={section.title}><h2>{section.title}</h2>{section.body}{i === 0 && <ArticleInlineVisual slug={slug} index={0} />}{i === 1 && <ArticleInlineVisual slug={slug} index={1} />}</section>)}</div>
      {foundation && <>
        <section id="ohne-kauf" className="intent-check"><h2>Mit vorhandener Ausstattung weiterkommen</h2><p>{foundation.noPurchase}</p>
          {freeGuide && <><p>{freeGuide.title}: vollständig kostenlos und ohne Anmeldung. Deine persönlichen Notizen bleiben bei dir.</p><p><a className="text-link" href={`/downloads/${freeGuide.slug}.pdf`}>Arbeitsblatt als PDF herunterladen</a></p><p><a className="text-link" href={`/gratis-guides/${freeGuide.slug}/`}>Inhalt und Ausfüllhilfe ansehen</a></p></>}
        </section>
        <section id="fragen" className="article-faq"><h2>Häufige Fragen</h2><div className="faq-list">{foundation.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><div><p>{faq.answer}</p><div className="section-sources">{faq.sourceKeys.map(key => <SourceLink key={key} href={FOUNDATION_SOURCES[key].url}>{FOUNDATION_SOURCES[key].label}</SourceLink>)}</div></div></details>)}</div></section>
      </>}
      <section id="quellen" className="source-box"><ShieldCheck aria-hidden="true" /><div><h2>Quellen und Einordnung</h2>
        {foundation ? <><p>Herstelleranleitungen und Supporthinweise für die genannten Systeme, ergänzt um die allgemeinen Hinweise des BZfE. Die Modell- und Dokumentfassung steht bei der jeweiligen Angabe; widersprüchliche Freigaben bleiben ausdrücklich offen.</p><ul>{foundation.sources.map(source => <li key={source.url}><SourceLink href={source.url}>{source.label}</SourceLink><p>{source.context}</p></li>)}</ul><p>Bei Beschwerden oder für eine individuelle Pumpstrategie wende dich an eine Hebamme, qualifizierte Stillberatung oder ärztliches Fachpersonal.</p></> : <><p>Grundlage sind die Hinweise des Bundeszentrums für Ernährung. Bei gesundheitlichen Problemen oder für eine individuelle Pumpstrategie ist fachliche Beratung erforderlich.</p><SourceLink href="https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen">BZfE: Muttermilch abpumpen</SourceLink></>}
      </div></section>
      <section id="modelle" className="article-model-section"><h2>Konkrete Modelle zum Thema</h2><p>Diese Modelle zeigen unterschiedliche Bauarten. Prüfe die jeweilige Anleitung und den Lieferumfang; die Verlinkung ist keine individuelle Empfehlung. Die Händlerbuttons sind Affiliate-Links.</p><div className="article-product-list">{PRODUCTS.filter(product => relevantIds.includes(product.id)).map(product => <ProductCard key={product.id} product={product} />)}</div><a className="text-link" href="/ratgeber/">Weitere Ratgeber und Modellvergleiche</a></section>
      {foundation && <aside id="weiterlesen" className="article-related"><h2>Passende Ratgeber</h2>{foundation.related.map(related => <a key={related.slug} href={`/ratgeber/${related.slug}/`}>{related.title}</a>)}<a href="/ratgeber/">Zur gesamten Ratgeber-Bibliothek</a></aside>}
    </article></main>
  );
}

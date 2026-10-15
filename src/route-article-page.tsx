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
  const buyingGuide = EDITORIAL_GUIDES.find(guide => guide.slug === slug);
  if (buyingGuide) return <BuyingGuidePage guide={buyingGuide} />;
  if (MILK_GUIDES.some(g=>g.slug===slug)) return <MilkGuidePage slug={slug} />;
  const article = ARTICLE_CONTENT[slug];
  if (!article) return <NotFoundPage />;
  const updated = GUIDE_ARTICLES.find(guide => guide.slug === slug)?.updated;
  const updateLabel = updated ? new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${updated}T00:00:00Z`)) : '';
  const relevantIds = slug === 'milchpumpe-reinigen' ? ['medela-freestyle', 'philips-avent-scf547'] : slug === 'richtige-flanschgroesse' ? ['momcozy-m9', 'philips-avent-scf547'] : ['haakaa-gen3', 'medela-freestyle'];
  return (
    <main id="inhalt"><article className="article-page section"><Breadcrumbs items={[{ href: '/ratgeber/', label: 'Ratgeber' }, { href: `/ratgeber/${slug}/`, label: article.title }]} /><p className="eyebrow">Grundlagen · Quellenbasierte Orientierung</p><h1>{article.title}</h1><p className="article-byline">Redaktion: <a href="/ueber-uns/">Andreas Böhler</a> · <time dateTime={updated}>Recherche-Stand: {updateLabel}</time> · <a href="/testmethodik/">Quellen und Methode</a></p><p className="hero-lead">{article.lead}</p><ArticleReadingTools content={[article.lead, ...article.sections.map(section => <div key={section.title}>{section.title}{section.body}</div>)]} />{EDITORIAL_ART.some(item => item.articleSlug === slug) && <figure className="article-visual"><EditorialImage slug={slug} title={article.title} eager /><figcaption>Themenillustration zum Artikel.</figcaption></figure>}<nav id="artikel-inhalt" className="article-toc" aria-label="Inhaltsverzeichnis"><h2>Inhaltsverzeichnis</h2><ol>{article.sections.map((section, i) => <li key={section.title}><a href={`#abschnitt-${i + 1}`}>{section.title}</a></li>)}<li><a href="#modelle">Konkrete Modelle zum Thema</a></li><li><a href="#quellen">Quellen und Einordnung</a></li></ol></nav><div className="article-body">{article.sections.map((section, i) => <section id={`abschnitt-${i + 1}`} key={section.title}><h2>{section.title}</h2>{section.body}{i === 0 && <ArticleInlineVisual slug={slug} index={0} />}{i === 1 && <ArticleInlineVisual slug={slug} index={1} />}</section>)}</div>
      <div id="quellen" className="source-box"><ShieldCheck aria-hidden="true" /><div><h2>Quellen und Einordnung</h2><p>Grundlage sind die Hinweise des Bundeszentrums für Ernährung. Bei gesundheitlichen Problemen oder für eine individuelle Pumpstrategie ist fachliche Beratung erforderlich.</p><SourceLink href="https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen">BZfE: Muttermilch abpumpen</SourceLink></div></div><section id="modelle" className="article-model-section"><h2>Konkrete Modelle zum Thema</h2><p>Diese Modelle zeigen unterschiedliche Bauarten. Prüfe die jeweilige Anleitung und den Lieferumfang; die Verlinkung ist keine individuelle Empfehlung. Die Händlerbuttons sind Affiliate-Links.</p><div className="article-product-list">{PRODUCTS.filter(p => relevantIds.includes(p.id)).map(p => <ProductCard key={p.id} product={p} />)}</div><a className="text-link" href="/ratgeber/">Weitere Ratgeber und Modellvergleiche</a></section></article></main>
  );
}

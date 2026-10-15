import rawGuides from './milk-guides.json';
import { EditorialImage } from './editorial-images';
import { Breadcrumbs, SourceLink } from './components';
import { CatalogueCard } from './catalogue';
import { PRODUCT_CATALOGUE } from './product-catalogue';
import { PROBLEM_PRODUCT_FOCUS } from './problem-product-focus';
import { GUIDE_ARTICLES } from './data';
import { ArticleInlineVisual } from './article-media';
import { ArticleReadingTools } from './article-reading-tools';

const PRODUCT_NAME_IDS: Record<string,string> = {
  'Medela Easy Pour Muttermilchbeutel':'medela-easy-pour-storage-bags',
  'MAM Aufbewahrungsbecher':'mam-aufbewahrungsbecher',
  'MAM Soft Brush':'mam-soft-brush',
  'Medela Quick Clean™ Microwave bags':'medela-quick-clean-microwave-bags',
  'Medela Kühltasche':'medela-cooler-bag',
  'Medela Muttermilchflaschen':'medela-muttermilchflaschen',
  'Philips Avent Premium Flaschenwärmer SCF358/00':'philips-avent-scf358-00',
  'Medela classic PersonalFit Flex™ double pumping kit':'medela-classic-personalfit-flex-double-kit',
  'Philips Avent Trockengestell SCF149/00':'philips-avent-scf149-00',
  'Medela Calma™ Feeding System':'medela-calma-feeding-system',
  'Philips Avent Natural Response Babyflasche mit AirFree SCY673/01':'philips-avent-natural-response-airfree-scy673-01',
  'Lansinoh Blue Lock™ Stilleinlagen':'lansinoh-blue-lock-stilleinlagen',
  'Lansinoh® Waschbare Stilleinlagen':'lansinoh-waschbare-stilleinlagen',
};

export const MILK_GUIDES = rawGuides.map(guide => ({...guide, productIds:guide.productNames.map(name => {
  const id=PRODUCT_NAME_IDS[name];
  if (!id || !PRODUCT_CATALOGUE.some(p=>p.id===id)) throw new Error(`Unresolved article product: ${name}`);
  return id;
})}));

export function MilkGuidePage({ slug }: { slug: string }) {
  const guide=MILK_GUIDES.find(g=>g.slug===slug);
  if (!guide) return null;
  const focus = PROBLEM_PRODUCT_FOCUS[guide.slug];
  if (focus && !guide.productIds.includes(focus.productId)) throw new Error(`Focus product does not belong to article: ${guide.slug}`);
  const productIds = focus ? [focus.productId] : guide.productIds;
  const products=productIds.map(id=>PRODUCT_CATALOGUE.find(p=>p.id===id)!);
  const explicitRelated = 'relatedSlugs' in guide && Array.isArray(guide.relatedSlugs) ? guide.relatedSlugs : [];
  const related = explicitRelated.length
    ? explicitRelated.map(slug => {
        const article = GUIDE_ARTICLES.find(item => item.slug === slug);
        if (!article) throw new Error(`Unresolved related article: ${slug}`);
        return article;
      })
    : MILK_GUIDES.filter(g=>g.slug!==slug && g.productIds.some(id=>guide.productIds.includes(id))).slice(0,3);
  return <main id="inhalt"><article className="article-page section buying-article" id="milch-alltag-artikel"><Breadcrumbs items={[{href:'/ratgeber/',label:'Ratgeber'},{href:`/ratgeber/${guide.slug}/`,label:guide.title}]} /><p className="eyebrow">Muttermilch-Alltag · Praktische Orientierung</p><h1>{guide.title}</h1><div className="article-byline"><span>Redaktion: <a href="/ueber-uns/">Andreas Böhler</a></span><time dateTime={guide.updated}>Recherche-Stand: 14. Oktober 2026</time><a href="/testmethodik/">Quellen und Methode</a></div><p className="hero-lead">{guide.lead}</p><ArticleReadingTools productTarget="produkte" content={[guide.lead, ...guide.sections.flatMap(section => [section.title, ...section.paragraphs, ...('bullets' in section ? section.bullets ?? [] : [])]), ...guide.faqs.flatMap(faq => [faq.question, faq.answer])]} /><p className="affiliate-inline">Werbehinweis: Gekennzeichnete Amazon-Links sind Affiliate-Links. Bei qualifizierten Verkäufen kann eine Provision entstehen. Produktinfos nach Herstellerangaben.</p><figure className="article-visual"><EditorialImage slug={guide.slug} title={guide.title} /><figcaption>Themenillustration zum Artikel.</figcaption></figure><aside className="answer-box"><p className="eyebrow">Kurzantwort</p><h2>{guide.faqs[0].question}</h2><p>{guide.faqs[0].answer}</p></aside><nav id="artikel-inhalt" className="article-toc" aria-label="Inhaltsverzeichnis"><h2>Inhaltsverzeichnis</h2><ol>{guide.sections.map(s=><li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}<li><a href="#produkte">Konkrete Produktbeispiele</a></li><li><a href="#fragen">Häufige Fragen</a></li><li><a href="#quellen">Quellen</a></li></ol></nav><div className="article-body">{guide.sections.map((s, sectionIndex)=><section id={s.id} key={s.id}><h2>{s.title}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}{'bullets' in s && s.bullets && <ul>{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>}<div className="section-sources">{s.sourceIndexes.map(i=><SourceLink key={i} href={guide.sources[i].url}>{guide.sources[i].label}</SourceLink>)}</div>{sectionIndex === 0 && <ArticleInlineVisual slug={guide.slug} index={0} />}{sectionIndex === 3 && <ArticleInlineVisual slug={guide.slug} index={1} />}</section>)}</div><section id="produkte" className="article-model-section"><h2>{focus ? 'Ein Produkt für diesen Ablauf' : 'Konkrete Produktbeispiele – keine Pflicht-Einkaufsliste'}</h2>{focus ? <p className="existing-alternative"><span>Vorhandene Ausstattung: </span>{focus.existingAlternative}</p> : <p>Prüfe zunächst vorhandene Ausstattung. Internationale Packungsangaben und deutsche Händlerangebote können abweichen. Suchlinks sind keine bestätigten Einzelangebote.</p>}<div className="article-product-list">{products.map(p=><CatalogueCard key={p.id} product={p} />)}</div><a className="text-link" href="/produkte/">Zum vollständigen Produktwegweiser</a></section><section id="fragen" className="article-faq"><h2>Häufige Fragen</h2><div className="faq-list">{guide.faqs.map(f=><details key={f.question}><summary>{f.question}</summary><div><p>{f.answer}</p></div></details>)}</div></section><section id="quellen" className="source-box"><div><h2>Quellen und Grenzen</h2><ul>{guide.sources.map(s=><li key={s.url}><SourceLink href={s.url}>{s.label}</SourceLink></li>)}</ul><p>Allgemeine Orientierung ersetzt keine individuelle Stillberatung. Bei Beschwerden, Frühgeburt oder einem kranken Baby gelten die Hinweise des betreuenden Fachpersonals. Herstellerfunktionen sind keine medizinischen Garantien.</p></div></section><aside className="article-related"><h2>Passend weiterlesen</h2>{related.map(g=><a key={g.slug} href={`/ratgeber/${g.slug}/`}>{g.title}</a>)}<a href="/ratgeber/">Alle Ratgeber</a></aside></article></main>;
}

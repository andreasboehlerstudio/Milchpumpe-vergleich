import { normalizePath } from './route-path';
import { GUIDE_ARTICLES, PRODUCTS, REVIEW_DATE_ISO, SITE_URL, productUrl } from './data';
import { EDITORIAL_GUIDES } from './guides';
import { GUIDE_SEARCH_TITLES } from './search-intents';
import { PRODUCT_CATALOGUE } from './product-catalogue';
import { MILK_GUIDES } from './milk-articles';
import { catalogueProductUrl } from './catalogue';
import { WEARABLE_MARKET as marketData } from './wearable-market';
import { NEWSLETTER_CONNECTION, isNewsletterReady, type NewsletterConnection } from './newsletter-config';
import { getNewsletterRouteSeo } from './newsletter';
import { FREE_GUIDE_SEO, FREE_GUIDES, FREE_GUIDES_HUB, freeGuidePath } from './free-guides-data';
import { FOUNDATION_GUIDES } from './foundation-guide-data';

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  heading: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
  noindex?: boolean;
  datePublished?: string;
  dateModified?: string;
  image?: string;
};

const STATIC_ROUTES: RouteSeo[] = [
  {
    path: '/',
    title: 'Milchpumpen-Vergleich: Tragbare Modelle & Kaufhilfe',
    description: 'Finde eine Milchpumpe für deinen Alltag: 40 recherchierte tragbare Modelle, Bauarten und Setumfang im Vergleich. Dazu Ratgeber zu Passform, Reinigung und Muttermilch.',
    heading: 'Tragbare Milchpumpen. Für deinen Alltag.',
    dateModified: '2026-10-15',
    changefreq: 'weekly',
    priority: 1,
  },
  {
    path: '/vergleich/',
    title: '6 Milchpumpen im Vergleich: Bauarten und Funktionen',
    description: 'Vergleiche sechs Milchpumpen: fünf elektrische Modelle und Haakaa separat. Zwei Modelle direkt gegenüberstellen – mit Setumfang, Reinigung und Quellen.',
    heading: 'Was unterscheidet deine Auswahl?',
    dateModified: '2026-10-29',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/tragbare-milchpumpen/',
    title: 'Tragbare Milchpumpen: 40 recherchierte Modelle und Kaufhilfe',
    description: '40 recherchierte Wearable-Modelle und Hands-free-Systeme: Bauformen, Herstellerquellen und fallbezogene Kaufhilfe. Angebotsbeobachtungen vom 15.10.2026.',
    heading: 'Tragbare Milchpumpen: Modelle und Kaufhilfe',
    dateModified: '2026-10-29',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/ratgeber/',
    title: 'Milchpumpen-Ratgeber: Auswahl, Passform und Reinigung',
    description: '35 Ratgeber zu Milchpumpen, Passform und Abpumpalltag: Modelle vergleichen, passende Teile verstehen sowie Reinigung, Aufbewahrung und Transport organisieren.',
    heading: 'Weniger Sucherei. Mehr Alltag, der passt.',
    dateModified: '2026-10-15',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/produkte/',
    title: 'Abpumpen & Muttermilch: Produktwegweiser mit Herstellerquellen',
    description: 'Milchpumpen, Aufbewahrung, Transport und Zubehör nach ihrem Zweck auswählen. Recherchierte Merkmale, klare Grenzen und konkrete Kaufprüfpunkte.',
    heading: 'Was brauchst du wirklich? Der Produktwegweiser.',
    dateModified: '2026-10-14',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/testmethodik/',
    title: 'Unsere Vergleichsmethodik: Quellen, Kriterien und Grenzen',
    description: 'So recherchiert Milchpumpe-Vergleich.de Produktdaten, trennt Herstellerangaben von redaktioneller Einordnung und finanziert die Seite.',
    heading: 'So entsteht unser Milchpumpen-Vergleich',
    dateModified: '2026-10-29',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/ueber-uns/',
    title: 'Über Milchpumpe-Vergleich.de und die Redaktion',
    description: 'Erfahre, wer hinter Milchpumpe-Vergleich.de steht, welches Ziel die Seite verfolgt und wo die Grenzen der Inhalte liegen.',
    heading: 'Über dieses Vergleichsportal',
    dateModified: '2026-10-29',
    changefreq: 'yearly',
    priority: 0.5,
  },
  {
    path: '/impressum/',
    title: 'Impressum | Milchpumpe-Vergleich.de',
    description: 'Anbieterkennzeichnung und Kontaktinformationen von Milchpumpe-Vergleich.de.',
    heading: 'Impressum',
    changefreq: 'yearly',
    priority: 0.2,
  },
  {
    path: '/datenschutz/',
    title: 'Datenschutzerklärung | Milchpumpe-Vergleich.de',
    description: 'Informationen zur Datenverarbeitung, Google Analytics, Affiliate-Links und deinen Datenschutzrechten.',
    heading: 'Datenschutzerklärung',
    dateModified: '2026-10-29',
    changefreq: 'yearly',
    priority: 0.2,
  },
];

const PRODUCT_ROUTES: RouteSeo[] = PRODUCTS.map((product) => ({
  path: productUrl(product),
  title: `${product.brand} ${product.name}: Daten, Vorteile und Grenzen`,
  description: `${product.brand} ${product.name} transparent eingeordnet: Bauart, Funktionen, Herstellerangaben, Stärken, Grenzen und Quellen.`,
  heading: `${product.brand} ${product.name}`,
  changefreq: 'monthly',
  priority: 0.8,
}));

const GUIDE_ROUTES: RouteSeo[] = GUIDE_ARTICLES.map((article) => ({
  path: `/ratgeber/${article.slug}/`,
  title: GUIDE_SEARCH_TITLES[article.slug] || article.title,
  description: article.description,
  heading: article.title,
  datePublished: article.published,
  dateModified: article.updated || REVIEW_DATE_ISO,
  image: article.image,
  changefreq: 'monthly',
  priority: 0.7,
}));

/** Direct PDF guides are public independently; only newsletter acquisition is readiness-gated. */
export function getSitePages(connection: NewsletterConnection = NEWSLETTER_CONNECTION): RouteSeo[] {
  return [...STATIC_ROUTES, ...PRODUCT_ROUTES, ...GUIDE_ROUTES, ...FREE_GUIDE_SEO, ...(isNewsletterReady(connection) ? [getNewsletterRouteSeo(connection)] : [])];
}

export const ROUTES = getSitePages();

export { normalizePath } from './route-path';

export function getRouteSeo(path: string, connection: NewsletterConnection = NEWSLETTER_CONNECTION): RouteSeo {
  const normalized = normalizePath(path);
  if (normalized === '/kaufcheck/') return getNewsletterRouteSeo(connection);
  return ROUTES.find((route) => route.path === normalized) || {
    path: normalized,
    title: 'Seite nicht gefunden | Milchpumpe-Vergleich.de',
    description: 'Die angeforderte Seite wurde nicht gefunden.',
    heading: 'Seite nicht gefunden',
    changefreq: 'yearly',
    priority: 0,
    noindex: true,
  };
}

function breadcrumbs(path: string) {
  const normalized = normalizePath(path);
  if (normalized === '/') return [];
  const parts = normalized.split('/').filter(Boolean);
  const items = [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/` }];
  let current = '';
  for (const [index, part] of parts.entries()) {
    current += `/${part}`;
    const crumbPath = current === '/produkte' && parts.length > 1 ? '/vergleich/' : `${current}/`;
    const route = getRouteSeo(crumbPath);
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: route.heading,
      item: `${SITE_URL}${crumbPath}`,
    });
  }
  return items;
}

export function getStructuredData(path: string) {
  const route = getRouteSeo(path);
  const normalized = route.path;
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Milchpumpe-Vergleich.de',
      inLanguage: 'de-DE',
      publisher: { '@id': `${SITE_URL}/#publisher` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#publisher`,
      name: 'Andreas Böhler',
      url: `${SITE_URL}/ueber-uns/`,
    },
  ];

  const crumbs = breadcrumbs(normalized);
  if (crumbs.length) {
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs });
  }

  const product = PRODUCTS.find((item) => productUrl(item) === normalized);
  const isArticle = normalized.startsWith('/ratgeber/') && normalized !== '/ratgeber/';
  const entityId = product ? `${SITE_URL}${normalized}#subject`
    : isArticle ? `${SITE_URL}${normalized}#article`
    : normalized === '/tragbare-milchpumpen/' ? `${SITE_URL}${normalized}#modellverzeichnis`
    : normalized === '/ratgeber/' ? `${SITE_URL}${normalized}#artikel`
    : normalized === FREE_GUIDES_HUB ? `${SITE_URL}${normalized}#guides`
    : ['/vergleich/', '/produkte/'].includes(normalized) ? `${SITE_URL}${normalized}#liste` : undefined;
  graph.push({
    '@type': ['/tragbare-milchpumpen/', '/ratgeber/', FREE_GUIDES_HUB].includes(normalized) ? 'CollectionPage' : 'WebPage',
    '@id': `${SITE_URL}${normalized}#webpage`,
    name: route.heading,
    description: route.description,
    url: `${SITE_URL}${normalized}`,
    inLanguage: 'de-DE',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#publisher` },
    dateModified: route.dateModified || REVIEW_DATE_ISO,
    ...(entityId ? { mainEntity: { '@id': entityId } } : {}),
  });
  if (normalized === FREE_GUIDES_HUB) {
    graph.push({ '@type': 'ItemList', '@id': `${SITE_URL}${normalized}#guides`, name: 'Kostenlose PDF-Arbeitsblätter', numberOfItems: FREE_GUIDES.length,
      itemListElement: FREE_GUIDES.map((guide, index) => ({ '@type': 'ListItem', position: index + 1, name: guide.title, url: `${SITE_URL}${freeGuidePath(guide)}` })),
    });
  }
  if (product) {
    // These are editorial model subjects, not maintained offers or reviews.
    graph.push({
      '@type': 'Thing',
      '@id': `${SITE_URL}${normalized}#subject`,
      name: `${product.brand} ${product.name}`,
      description: product.summary,
      url: `${SITE_URL}${normalized}`,
    });
  } else if (normalized === '/tragbare-milchpumpen/') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}${normalized}#modellverzeichnis`,
      name: 'Recherchierte tragbare Milchpumpen und Hands-free-Systeme',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: marketData.models.length,
      itemListElement: marketData.models.map((model, index) => ({
        '@type': 'ListItem', position: index + 1,
        name: `${model.brand} ${model.canonicalModel}`,
        url: `${SITE_URL}${normalized}#modell-${index + 1}`,
      })),
    });
  } else if (normalized === '/ratgeber/') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}${normalized}#artikel`,
      name: 'Ratgeber zu Pumpenauswahl, Modellwissen und Abpumpalltag',
      numberOfItems: GUIDE_ARTICLES.length,
      itemListElement: GUIDE_ARTICLES.map((article, index) => ({
        '@type': 'ListItem', position: index + 1,
        name: article.title,
        url: `${SITE_URL}/ratgeber/${article.slug}/`,
      })),
    });
  } else if (normalized === '/produkte/') {
    graph.push({
      '@type': 'ItemList', '@id': `${SITE_URL}${normalized}#liste`, name: 'Produktwegweiser für Abpumpen und Muttermilch-Alltag',
      numberOfItems: PRODUCT_CATALOGUE.length,
      itemListElement: PRODUCT_CATALOGUE.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: `${item.brand} ${item.name}`, url: `${SITE_URL}${catalogueProductUrl(item)}` })),
    });
  } else if (normalized === '/vergleich/') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${SITE_URL}${normalized}#liste`,
      name: 'Verglichene Milchpumpen',
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${item.brand} ${item.name}`,
        url: `${SITE_URL}${productUrl(item)}`,
      })),
    });
  } else if (normalized.startsWith('/ratgeber/') && normalized !== '/ratgeber/') {
    const guide = EDITORIAL_GUIDES.find(g => `/ratgeber/${g.slug}/` === normalized);
    const milk = MILK_GUIDES.find(g=>`/ratgeber/${g.slug}/`===normalized);
    const foundation = FOUNDATION_GUIDES[normalized.split('/')[2]];
    const citedSources = foundation?.sources || guide?.sources || milk?.sources;
    const milkProducts = milk?.productIds.map(id=>PRODUCT_CATALOGUE.find(p=>p.id===id)!);
    graph.push({
      '@type': 'Article',
      '@id': `${SITE_URL}${normalized}#article`,
      headline: route.heading,
      isAccessibleForFree: true,
      citation: citedSources?.map(source => source.url) || ['https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen'],
      about: milkProducts?.map(p=>({ '@type':'Thing',name:`${p.brand} ${p.name}`,url:`${SITE_URL}${catalogueProductUrl(p)}` })) || guide?.productIds.map(id => { const p = PRODUCTS.find(product => product.id === id)!; return { '@type': 'Thing', '@id': `${SITE_URL}${productUrl(p)}#subject`, name: `${p.brand} ${p.name}`, url: `${SITE_URL}${productUrl(p)}` }; }),
      description: route.description,
      ...(route.datePublished ? { datePublished: route.datePublished } : {}),
      dateModified: route.dateModified || REVIEW_DATE_ISO,
      image: `${SITE_URL}${route.image || '/og-cover.png'}`,
      inLanguage: 'de-DE',
      author: { '@id': `${SITE_URL}/#publisher` },
      publisher: { '@id': `${SITE_URL}/#publisher` },
      mainEntityOfPage: `${SITE_URL}${normalized}`,
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

import { GUIDE_ARTICLES, PRODUCTS, REVIEW_DATE_ISO, SITE_URL, productUrl } from './data';

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  heading: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
  noindex?: boolean;
};

const STATIC_ROUTES: RouteSeo[] = [
  {
    path: '/',
    title: 'Milchpumpen im Vergleich: 6 Modelle transparent eingeordnet',
    description: 'Vergleiche sechs tragbare und manuelle Milchpumpen anhand nachvollziehbarer Herstellerangaben, Einsatzbereiche und Auswahlkriterien.',
    heading: 'Milchpumpen transparent vergleichen',
    changefreq: 'weekly',
    priority: 1,
  },
  {
    path: '/vergleich/',
    title: 'Milchpumpen-Vergleich: Funktionen und Bauarten im Überblick',
    description: 'Vergleiche App-Steuerung, Pumpenart, Energieversorgung und Reinigung von sechs Milchpumpen ohne erfundene Testnoten.',
    heading: 'Sechs Milchpumpen im direkten Vergleich',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/ratgeber/',
    title: 'Milchpumpen-Ratgeber: Auswahl, Passform und Reinigung',
    description: 'Verständliche Orientierung zu Pumpenarten, Flanschgröße, Reinigung und sicherem Umgang mit abgepumpter Muttermilch.',
    heading: 'Ratgeber rund ums Abpumpen',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/testmethodik/',
    title: 'Unsere Vergleichsmethodik: Quellen, Kriterien und Grenzen',
    description: 'So recherchiert Milchpumpe-Vergleich.de Produktdaten, trennt Herstellerangaben von redaktioneller Einordnung und finanziert die Seite.',
    heading: 'So entsteht unser Vergleich',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/ueber-uns/',
    title: 'Über Milchpumpe-Vergleich.de und die Redaktion',
    description: 'Erfahre, wer hinter Milchpumpe-Vergleich.de steht, welches Ziel die Seite verfolgt und wo die Grenzen der Inhalte liegen.',
    heading: 'Über dieses Vergleichsportal',
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
  title: `${article.title} | Milchpumpen-Ratgeber`,
  description: article.description,
  heading: article.title,
  changefreq: 'monthly',
  priority: 0.7,
}));

export const ROUTES = [...STATIC_ROUTES, ...PRODUCT_ROUTES, ...GUIDE_ROUTES];

export function normalizePath(path: string) {
  const clean = path.split('?')[0].split('#')[0].replace(/\/+/g, '/');
  return clean === '/' ? '/' : `${clean.replace(/\/$/, '')}/`;
}

export function getRouteSeo(path: string): RouteSeo {
  const normalized = normalizePath(path);
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
    const route = getRouteSeo(`${current}/`);
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: route.heading,
      item: `${SITE_URL}${current}/`,
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
  if (product) {
    graph.push({
      '@type': 'Product',
      '@id': `${SITE_URL}${normalized}#product`,
      name: `${product.brand} ${product.name}`,
      brand: { '@type': 'Brand', name: product.brand },
      description: product.summary,
      url: `${SITE_URL}${normalized}`,
      category: product.category,
      additionalProperty: product.facts.map((fact) => ({ '@type': 'PropertyValue', name: 'Merkmal', value: fact })),
    });
  } else if (normalized === '/vergleich/') {
    graph.push({
      '@type': 'ItemList',
      name: 'Verglichene Milchpumpen',
      itemListElement: PRODUCTS.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${item.brand} ${item.name}`,
        url: `${SITE_URL}${productUrl(item)}`,
      })),
    });
  } else if (normalized.startsWith('/ratgeber/') && normalized !== '/ratgeber/') {
    graph.push({
      '@type': 'Article',
      headline: route.heading,
      description: route.description,
      datePublished: REVIEW_DATE_ISO,
      dateModified: REVIEW_DATE_ISO,
      inLanguage: 'de-DE',
      author: { '@id': `${SITE_URL}/#publisher` },
      publisher: { '@id': `${SITE_URL}/#publisher` },
      mainEntityOfPage: `${SITE_URL}${normalized}`,
    });
  } else {
    graph.push({
      '@type': 'WebPage',
      name: route.heading,
      description: route.description,
      url: `${SITE_URL}${normalized === '/' ? '/' : normalized}`,
      inLanguage: 'de-DE',
      dateModified: REVIEW_DATE_ISO,
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

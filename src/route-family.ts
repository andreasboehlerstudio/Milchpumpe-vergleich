import { normalizePath } from './route-path';

export type RouteFamily = 'home' | 'magazine' | 'catalogue' | 'product' | 'article' | 'market' | 'methodology' | 'legal' | 'newsletter' | 'free-guides';
export type RouteProps = { path: string };

/** Routing policy only: no registries, article bodies or SEO metadata in bootstrap. */
export function routeFamily(input: string): RouteFamily {
  const path = normalizePath(input);
  if (path === '/') return 'home';
  if (/^\/gratis-guides\/(?:unterwegs-packplan\/|arbeitsplatz-uebergabeplan\/|reinigung-teileroutine\/|passform-beratungsvorbereitung\/|set-teilepass\/)?$/.test(path)) return 'free-guides';
  if (path === '/kaufcheck/') return 'newsletter';
  if (path === '/vergleich/' || path === '/ratgeber/') return 'magazine';
  if (path === '/produkte/') return 'catalogue';
  if (path === '/tragbare-milchpumpen/') return 'market';
  if (path === '/testmethodik/') return 'methodology';
  if (path.startsWith('/ratgeber/')) return 'article';
  if (path.startsWith('/produkte/')) return 'product';
  return 'legal';
}

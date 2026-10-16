import type { ComponentType } from 'react';
import { routeFamily, type RouteFamily, type RouteProps } from './route-family';

const loaders = {
  home: () => import('./route-home'),
  'free-guides': () => import('./route-free-guides'),
  newsletter: () => import('./route-newsletter'),
  magazine: () => import('./route-magazine'),
  catalogue: () => import('./route-catalogue'),
  product: () => import('./route-product'),
  article: () => import('./route-article'),
  market: () => import('./route-market'),
  methodology: () => import('./route-methodology'),
  legal: () => import('./route-legal'),
} satisfies Record<RouteFamily, () => Promise<{ default: ComponentType<RouteProps> }>>;

export async function loadRoute(path: string): Promise<ComponentType<RouteProps>> {
  return (await loaders[routeFamily(path)]()).default;
}

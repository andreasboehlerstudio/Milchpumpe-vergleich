import type { ComponentType } from 'react';
import { Layout } from './components';
import { normalizePath } from './route-path';
import type { RouteProps } from './route-family';

/** Same synchronous component tree in prerender and after browser module resolution. */
export function RouteView({ initialPath, Page }: { initialPath: string; Page: ComponentType<RouteProps> }) {
  const path = normalizePath(initialPath);
  return <Layout variant={path === '/' ? 'editorial' : 'editorial-inner'}><Page path={path} /></Layout>;
}

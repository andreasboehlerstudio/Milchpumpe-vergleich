import { AboutPage, ImpressumPage, PrivacyPage, NotFoundPage } from './route-legal-pages';
import type { RouteProps } from './route-family';
export default function LegalRoute({ path }: RouteProps) {
  if (path === '/ueber-uns/') return <AboutPage />;
  if (path === '/impressum/') return <ImpressumPage />;
  if (path === '/datenschutz/') return <PrivacyPage />;
  return <NotFoundPage />;
}

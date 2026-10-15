import { MagazineGuideHub, VisualComparisonPage } from './magazine-upgrade';
import { NewsletterSignup } from './newsletter';
import type { RouteProps } from './route-family';
export default function MagazineRoute({ path }: RouteProps) {
  return path === '/vergleich/' ? <VisualComparisonPage footerSlot={<NewsletterSignup />} /> : <MagazineGuideHub footerSlot={<NewsletterSignup />} />;
}

import { Layout } from './components';
import { PRODUCTS } from './data';
import { AboutPage, GuideArticlePage, ImpressumPage, MethodologyPage, NotFoundPage, PrivacyPage, ProductPage, WearableMarketPage } from './pages';
import { MagazineGuideHub, VisualComparisonPage } from './magazine-upgrade';
import { NewsletterSignup } from './newsletter';
import { EditorialHomePage } from './home-editorial';
import { normalizePath } from './seo';
import { CatalogueIndexPage } from './catalogue-page';

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const path = normalizePath(initialPath);
  let page;

  if (path === '/') page = <EditorialHomePage />;
  else if (path === '/vergleich/') page = <VisualComparisonPage footerSlot={<NewsletterSignup />} />;
  else if (path === '/tragbare-milchpumpen/') page = <WearableMarketPage />;
  else if (path === '/produkte/') page = <CatalogueIndexPage />;
  else if (path === '/ratgeber/') page = <MagazineGuideHub footerSlot={<NewsletterSignup />} />;
  else if (path === '/testmethodik/') page = <MethodologyPage />;
  else if (path === '/ueber-uns/') page = <AboutPage />;
  else if (path === '/impressum/') page = <ImpressumPage />;
  else if (path === '/datenschutz/') page = <PrivacyPage />;
  else if (path.startsWith('/ratgeber/')) page = <GuideArticlePage slug={path.split('/').filter(Boolean)[1] || ''} />;
  else if (path.startsWith('/produkte/')) {
    const product = PRODUCTS.find((item) => item.id === path.split('/').filter(Boolean)[1]);
    page = product ? <ProductPage product={product} /> : <NotFoundPage />;
  } else page = <NotFoundPage />;

  return <Layout variant={path === '/' ? 'editorial' : 'editorial-inner'}>{page}</Layout>;
}

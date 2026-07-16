import { Layout } from './components';
import { PRODUCTS } from './data';
import { AboutPage, ComparisonPage, GuideArticlePage, GuideIndexPage, HomePage, ImpressumPage, MethodologyPage, NotFoundPage, PrivacyPage, ProductPage } from './pages';
import { normalizePath } from './seo';

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const path = normalizePath(initialPath);
  let page;

  if (path === '/') page = <HomePage />;
  else if (path === '/vergleich/') page = <ComparisonPage />;
  else if (path === '/ratgeber/') page = <GuideIndexPage />;
  else if (path === '/testmethodik/') page = <MethodologyPage />;
  else if (path === '/ueber-uns/') page = <AboutPage />;
  else if (path === '/impressum/') page = <ImpressumPage />;
  else if (path === '/datenschutz/') page = <PrivacyPage />;
  else if (path.startsWith('/ratgeber/')) page = <GuideArticlePage slug={path.split('/').filter(Boolean)[1] || ''} />;
  else if (path.startsWith('/produkte/')) {
    const product = PRODUCTS.find((item) => item.id === path.split('/').filter(Boolean)[1]);
    page = product ? <ProductPage product={product} /> : <NotFoundPage />;
  } else page = <NotFoundPage />;

  return <Layout>{page}</Layout>;
}

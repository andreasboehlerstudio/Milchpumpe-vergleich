import { RouteView } from './route-view';
import { routeFamily } from './route-family';
import Home from './route-home';
import Magazine from './route-magazine';
import Catalogue from './route-catalogue';
import Product from './route-product';
import Article from './route-article';
import Market from './route-market';
import Methodology from './route-methodology';
import Legal from './route-legal';
import Newsletter from './route-newsletter';
import FreeGuides from './route-free-guides';

// Node/prerender entry only. Never imported by the browser bootstrap.
const pages = { 'free-guides': FreeGuides, home: Home, magazine: Magazine, catalogue: Catalogue, product: Product, article: Article, market: Market, methodology: Methodology, legal: Legal, newsletter: Newsletter };
export default function App({ initialPath = '/' }: { initialPath?: string }) {
  return <RouteView initialPath={initialPath} Page={pages[routeFamily(initialPath)]} />;
}

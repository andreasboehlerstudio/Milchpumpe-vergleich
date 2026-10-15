import { PRODUCTS } from './product-data';
import { ProductPage } from './route-product-page';
import { NotFoundPage } from './route-legal-pages';
import type { RouteProps } from './route-family';
export default function ProductRoute({ path }: RouteProps) {
  const product = PRODUCTS.find(item => item.id === path.split('/').filter(Boolean)[1]);
  return product ? <ProductPage product={product} /> : <NotFoundPage />;
}

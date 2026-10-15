import type { BuyingGuide } from './buying-guides';

export function guidesForProduct(productId: string, guides: BuyingGuide[], limit = 6) {
  return guides.filter(guide => guide.productIds.includes(productId))
    .sort((a, b) => a.productIds.length - b.productIds.length || a.title.localeCompare(b.title, 'de'))
    .slice(0, limit);
}

export function relatedGuides(current: BuyingGuide, guides: BuyingGuide[], limit = 4) {
  const shared = (guide: BuyingGuide) => guide.productIds.filter(id => current.productIds.includes(id)).length;
  return guides.filter(guide => guide.slug !== current.slug && shared(guide) > 0)
    .sort((a, b) => shared(b) - shared(a) || a.productIds.length - b.productIds.length || a.title.localeCompare(b.title, 'de'))
    .slice(0, limit);
}

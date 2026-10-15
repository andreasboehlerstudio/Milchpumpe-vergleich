import assets from '../docs/editorial-art-v2.json';

export const EDITORIAL_ART = assets;

export function EditorialImage({ slug, title, eager = false }: { slug: string; title: string; eager?: boolean }) {
  const asset = EDITORIAL_ART.find(item => item.articleSlug === slug);
  return <img src={asset?.url || `/editorial/${slug}-og.png`} alt={asset?.alt || `Themenillustration: ${title}`} width={asset?.width || 1200} height={asset?.height || 630} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />;
}

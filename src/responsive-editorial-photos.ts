import manifest from '../docs/responsive-editorial-photos.json';

/** Same licensed photographs, with unchanged source fallbacks and image geometry. */
export function responsiveEditorialPhoto(source: string, sizes?: string): { srcSet?: string; sizes?: string } {
  const asset = manifest.assets.find(item => item.source === source);
  if (!asset) return {};
  return {
    srcSet: asset.derivatives.map(image => `${image.src} ${image.width}w`).join(', '),
    sizes: sizes || (source.includes('nursery')
      ? '(max-width: 760px) calc(100vw - 88px), (max-width: 1100px) 45vw, 560px'
      : '(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 46vw, 560px'),
  };
}

/** Performance-only enhancement of the trusted, still-version-pinned V15 HTML. */
export function withResponsiveEditorialPhotos(html: string): string {
  return html.replace(/<img\b[^>]*>/g, tag => {
    const source = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!source || /\bsrcset=/i.test(tag)) return tag;
    const attrs = responsiveEditorialPhoto(source);
    return attrs.srcSet ? tag.replace(/\s*\/?>(\s*)$/, ` srcset="${attrs.srcSet}" sizes="${attrs.sizes}">$1`) : tag;
  });
}

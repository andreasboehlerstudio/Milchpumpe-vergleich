import { useEffect, useRef } from 'react';
import approved from './home-editorial-template.json';
import { bindEditorialHome } from './home-editorial-runtime';
import { withResponsiveEditorialPhotos } from './responsive-editorial-photos';

const responsiveHtml = withResponsiveEditorialPhotos(approved.html);

/** Trusted, version-pinned editorial HTML is prerendered, not embedded from Superdesign. */
export function EditorialHomePage() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => root.current ? bindEditorialHome(root.current) : undefined, []);
  return <div ref={root} className="editorial-home-content" dangerouslySetInnerHTML={{ __html: responsiveHtml }} />;
}

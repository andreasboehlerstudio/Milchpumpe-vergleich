import { Children, isValidElement, type ReactNode } from 'react';

function plainText(content: ReactNode): string {
  return Children.toArray(content).map(node => isValidElement<{ children?: ReactNode }>(node) ? plainText(node.props.children) : typeof node === 'string' || typeof node === 'number' ? String(node) : '').join(' ');
}

export function ArticleReadingTools({ content, productTarget = 'modelle' }: { content: ReactNode; productTarget?: 'modelle' | 'produkte' }) {
  const words = plainText(content).trim().split(/\s+/u).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return <nav className="article-reading-tools" aria-label="Artikel-Schnellzugriff">
    <span title="Geschätzte Lesezeit des Artikeltexts bei 200 Wörtern pro Minute">ca. {minutes} Min. Lesezeit</span>
    <div><a href="#artikel-inhalt">Zum Inhalt</a><a href={`#${productTarget}`}>Produktbeispiele</a><a href="#quellen">Quellen prüfen</a></div>
  </nav>;
}

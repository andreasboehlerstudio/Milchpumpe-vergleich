import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { AFFILIATE_TAG, PRODUCTS, type Product } from './data';
import { trackAffiliateClick } from './analytics';

export type CatalogueProduct = {
  id: string; brand: string; name: string; category: string; modelCode: string | null;
  summary: string; useCase: string; facts: string[]; limitations: string[];
  sourceUrl: string; sourceLabel: string; checkedAt: string; evidenceQuote: string;
  amazonQuery: string; amazonAsin?: string; tips: string[];
  imageRights: { status: 'not-cleared' | 'explicitly-permitted'; sourceUrl: string; note: string };
  image?: { src: string; alt: string; kind: 'licensed-product-photo' | 'editorial-illustration'; licenceUrl: string };
};

export function fromPumpProducts(products: Product[]): CatalogueProduct[] {
  return products.map(p => ({ id: p.id, brand: p.brand, name: p.name, category: 'Milchpumpen', modelCode: null, summary: p.summary, useCase: p.focus, facts: p.facts, limitations: p.limitations, sourceUrl: p.sourceUrl, sourceLabel: p.sourceLabel, checkedAt: p.sourceCheckedDate || '2026-07-16', evidenceQuote: '', amazonQuery: p.amazonQuery, amazonAsin: p.amazonAsin, tips: ['Passenden Aufsatz und genaue Modellgeneration prüfen.', `Lieferumfang kontrollieren: ${p.amazonVariant || p.set}.`], imageRights: { status: 'not-cleared', sourceUrl: p.sourceUrl, note: 'Keine pauschale Freigabe der Herstellerfotos nachgewiesen.' } }));
}

export function catalogueAmazonUrl(product: CatalogueProduct) {
  if (product.amazonAsin) {
    if (!/^[A-Z0-9]{10}$/.test(product.amazonAsin)) throw new Error('Ungültige ASIN');
    return `https://www.amazon.de/dp/${product.amazonAsin}?tag=${AFFILIATE_TAG}`;
  }
  return `https://www.amazon.de/s?k=${encodeURIComponent(product.amazonQuery)}&tag=${AFFILIATE_TAG}`;
}

export function catalogueProductUrl(product: CatalogueProduct) {
  return PRODUCTS.some(p => p.id === product.id) ? `/produkte/${product.id}/` : `/produkte/#produkt-${product.id}`;
}

export function CatalogueCard({ product }: { product: CatalogueProduct }) {
  const safeImage = product.image && (product.image.kind === 'editorial-illustration' || product.imageRights.status === 'explicitly-permitted');
  return <article className="practical-product" id={`produkt-${product.id}`}>
    {safeImage && <figure><img src={product.image!.src} alt={product.image!.alt} loading="lazy" decoding="async" /><figcaption>{product.image!.kind === 'editorial-illustration' ? 'Themenillustration – keine originalgetreue Produktaufnahme.' : 'Produktfoto mit dokumentierter Nutzungsgrundlage.'}</figcaption></figure>}
    <p className="eyebrow">{product.category} · Produktwissen</p><h3><a href={catalogueProductUrl(product)}>{product.brand} {product.name}</a></h3><p>{product.summary}</p>
    <div className="practical-fit"><strong>Wann es sinnvoll sein kann</strong><p>{product.useCase}</p></div>
    <details><summary>Vor dem Kauf prüfen</summary><p>Dokumentierte Merkmale:</p><ul>{product.facts.map(f => <li key={f}>{f}</li>)}</ul><ul>{product.tips.map(t => <li key={t}>{t}</li>)}</ul><ul>{product.limitations.map(t => <li key={t}>{t}</li>)}</ul></details>
    <p className="source-note"><a href={product.sourceUrl} target="_blank" rel="noopener noreferrer">Herstellerquelle: {product.sourceLabel}</a></p>
    <div className="practical-actions"><a className="text-link" href={catalogueProductUrl(product)}>Details und Grenzen <ArrowRight size={16} aria-hidden="true" /></a><span className="commercial-label">Werbung / Affiliate-Link</span><a href={catalogueAmazonUrl(product)} target="_blank" rel="noopener sponsored" onClick={() => trackAffiliateClick(`${product.brand} ${product.name}`, product.id, 'practical_tip')} className="practical-shop">{product.amazonAsin ? 'Passendes Angebot prüfen*' : 'Dieses Modell bei Amazon suchen*'} <ExternalLink size={15} aria-hidden="true" /></a></div>
  </article>;
}

export function CatalogueLibrary({ products }: { products: CatalogueProduct[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Alle');
  const categories = ['Alle', ...new Set(products.map(p => p.category))];
  const visible = products.filter(p => (category === 'Alle' || p.category === category) && `${p.brand} ${p.name} ${p.summary} ${p.useCase} ${p.modelCode || ''}`.toLocaleLowerCase('de').includes(query.toLocaleLowerCase('de').trim()));
  return <section id="produktbibliothek" className="section practical-library"><p className="eyebrow">Nützlich statt möglichst viel</p><h2>Was hilft bei welchem Schritt?</h2><p>Vom Abpumpen bis zum sauberen Wechselset: Diese Produkte werden nach Zweck eingeordnet, nicht als Einkaufsliste für alles. Oft reicht vorhandene Ausstattung.</p><div className="library-toolbar"><div className="filter-buttons">{categories.map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div><label className="article-search"><span>Produkte und Modellnummern suchen</span><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="z. B. Muttermilchbeutel" /></label></div><p aria-live="polite" className="result-count">{visible.length} von {products.length} recherchierten Produkten</p><div className="practical-grid">{visible.map(p => <CatalogueCard product={p} key={p.id} />)}</div><p className="affiliate-inline">* Gekennzeichnete Amazon-Links sind Affiliate-Links. Bei qualifizierten Käufen kann eine Provision entstehen. Suchziele sind keine verifizierten Einzelangebote.</p></section>;
}

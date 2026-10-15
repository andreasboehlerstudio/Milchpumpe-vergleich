import photoRights from '../docs/article-photo-rights.json';
import originalScenes from '../docs/article-scenes-originals.json';

export type ArticleMedia = { src: string; width: number; height: number; alt: string; caption: string; photoId?: string };
const scene = (id: string, alt: string, caption: string): ArticleMedia => {
  const asset = originalScenes.find(asset => asset.id === id);
  if (!asset) throw new Error(`Missing scene provenance: ${id}`);
  return { src: asset.src, width: asset.width, height: asset.height, alt, caption };
};
const photo = (id: string, alt: string, caption: string): ArticleMedia => {
  const asset = photoRights.assets.find(asset => asset.id === id);
  if (!asset) throw new Error(`Missing photo rights: ${id}`);
  const image = asset.derivatives.find(derivative => derivative.src.endsWith('-960.webp'))!;
  return { src: image.src, width: image.width, height: image.height, alt, caption, photoId: id };
};
const art = (id: string, alt: string, caption: string): ArticleMedia => ({ src: `/editorial-v2/${id}.svg`, width: 1200, height: 900, alt, caption });
const build = scene('pump-architecture', 'Zwei schematische Pumpenbauarten: Motor am Cup und Cup mit Schlauch zu einem separaten Motor.', 'Die Bauweise entscheidet mit: Sitzt der Motor am Cup oder wird er separat getragen?');
const fit = scene('fit-check', 'Schematischer Brusttrichter mit separatem Einsatz, neutralem Maßstab und einer Karte für die Modellzuordnung.', 'Größe und Modellzuordnung gemeinsam prüfen. Die Anleitung zur konkreten Pumpe ist der Ausgangspunkt.');
const dry = scene('clean-dry', 'Markenlose Pumpenteile auf einem Trockengestell, mit Abstand zu einer separat abgelegten Motoreinheit.', 'Reinigen, vollständig trocknen lassen und erst danach wieder zusammensetzen – nach der jeweiligen Teileanleitung.');
const journey = scene('cool-journey', 'Geöffnete isolierte Tasche mit geschlossenen Milchbehältern und separaten Kühlakkus als Transportschema.', 'Der Weg nach Hause gehört zur Planung: Behälter, Kühlung und verfügbare Aufbewahrung vorher klären.');
const single = scene('single-double', 'Links eine schematische vollständige Pumpeneinheit, rechts zwei vollständige Einheiten für ein Doppelset.', 'Schematischer Stückzahlvergleich: eine oder zwei vollständige Einheiten. Bei Systemen mit externem Motor können zwei Cups eine gemeinsame Motoreinheit nutzen. Entscheidend bleibt die Setliste.');
const parts = scene('parts-identity', 'Verschiedene schematische Ventil- und Membranteile neben einer Anleitung und einer neutralen Modellkarte.', 'Nicht nur die Marke notieren: Modell, Generation, Auffangsystem und Teilenummer müssen zusammenpassen.');
const controls = scene('controls-privacy', 'Schematische Pumpenbedienung neben einem Smartphone mit einem Schutzschild, ohne echte App-Oberfläche.', 'Direkte Bedienung und App-Funktionen getrennt prüfen. Ein Smartphone gehört nicht bei jedem System zum notwendigen Ablauf.');
const portions = scene('milk-portions', 'Verschlossene Milchbeutel und Aufbewahrungsbehälter mit freien Etiketten auf einer geordneten Ablage.', 'Behälter, Beschriftung und Stellplatz zusammen planen – passend zu eurer tatsächlichen Routine.');
const containers = photo('milk-containers', 'Verschiedene historische Aufbewahrungsflaschen und ein kleiner geschlossener Becher auf einem Tuch.', 'Unterschiedliche Behälterformen im Archivfoto. Für deine Auswahl zählen Verschluss, Kennzeichnung und die Freigaben des aktuellen Produkts.');
const frozen = photo('frozen-milk', 'Drei durchsichtige Beutel mit gefrorenen Muttermilchportionen auf einer Arbeitsfläche.', 'Gefrorene Milchportionen im Archivfoto. Für Lagerung, Auftauen und Verwendung gelten die Hinweise und Quellen im Text.');
const looseParts = photo('washable-parts', 'Lose Brusttrichter, Flaschen- und Becherteile verschiedener Systeme, darunter ein beschrifteter Trinkbecher.', 'Das Archivfoto zeigt unterschiedliche Pumpen- und Becherteile. Optische Ähnlichkeit ersetzt keine bestätigte Modellzuordnung.');
const organise = art('alltag', 'Geschlossene Becher neben einer Kühltasche, einem gefalteten Tuch und einer Zimmerpflanze.', 'Ein fester Platz für saubere Ausstattung und geschlossene Behälter macht die Vorbereitung übersichtlicher.');
const cleanPlace = art('reinigung', 'Illustration eines hellen Spülplatzes mit separatem Trockengestell für Pumpenteile.', 'Waschplatz und Trockenplatz als zwei Schritte denken. Elektronik und nicht freigegebene Teile bleiben getrennt.');
const label = art('portionieren', 'Muttermilchbeutel mit freien Beschriftungsfeldern, Vorratsbecher und Stift auf einem Tablett.', 'Beschrifte so, dass auch eine andere Betreuungsperson die Portion eindeutig zuordnen kann.');

export const ARTICLE_MEDIA: Record<string, readonly [ArticleMedia, ArticleMedia]> = {
  'richtige-flanschgroesse': [fit, parts],
  'milchpumpe-reinigen': [dry, looseParts],
  'tragbar-oder-elektrisch': [build, single],
  'muttermilchbeutel-oder-mehrwegbecher': [containers, portions],
  'muttermilch-beschriften-portionen-gefrierfach': [frozen, portions],
  'muttermilch-arbeitsplatz-transport-kuehlkette': [journey, containers],
  'muttermilch-kuehlschrankbox-getrennt-aufbewahren': [containers, portions],
  'muttermilch-erwaermen-ohne-flaschenwaermer': [containers, organise],
  'reserve-pumpset-reinigen-trocknen-organisieren': [dry, parts],
  'abgepumpte-muttermilch-flasche-sauger-auswaehlen': [containers, portions],
  'stilleinlagen-einweg-mehrweg-unterwegs-organisieren': [organise, cleanPlace],
  'milchpumpe-reinigen-ohne-spuelmaschine': [dry, cleanPlace],
  'muttermilch-kita-mitgeben': [label, journey],
  'medela-muttermilchflaschen-150-250-ml': [containers, portions],
  'milchpumpe-mikrowellenbeutel-desinfizieren': [dry, parts],
  'momcozy-m9-oder-s12-pro': [build, controls],
  'medela-freestyle-oder-philips-avent': [build, parts],
  'hands-free-milchpumpe-kaufen': [build, fit],
  'milchpumpe-fuer-unterwegs': [journey, dry],
  'milchpumpe-einzel-oder-doppelpumpe': [single, dry],
  'milchpumpe-zubehoer-checkliste': [parts, dry],
  'momcozy-m9-ohne-app': [controls, build],
  'momcozy-m9-einzel-oder-doppelset': [single, parts],
  'momcozy-s12-pro-quick-unterschiede': [parts, dry],
  'medela-freestyle-hands-free-drei-teile-reinigung': [dry, cleanPlace],
  'medela-freestyle-hands-free-schlaeuche-motor': [build, journey],
  'philips-avent-scf547-11-oder-scd553-11': [single, fit],
  'philips-avent-scf547-einsaetze-15-17-mm': [fit, parts],
  'elvie-pump-single-oder-double': [single, dry],
  'elvie-pump-oder-elvie-stride': [build, controls],
  'haakaa-generation-3-oder-generation-2': [parts, cleanPlace],
  'haakaa-generation-3-groessen': [portions, parts],
  'milchpumpe-app-datenschutz': [controls, build],
  'milchpumpe-ersatzteile-ventile-membranen': [parts, looseParts],
  'milchpumpe-lautstaerke-herstellerangaben': [build, controls],
};

export function ArticleInlineVisual({ slug, index }: { slug: string; index: 0 | 1 }) {
  const media = ARTICLE_MEDIA[slug]?.[index];
  if (!media) return null;
  const rights = media.photoId ? photoRights.assets.find(asset => asset.id === media.photoId) : undefined;
  return <figure className={`article-inline-visual${rights ? ' article-inline-visual--photo' : ''}`} data-media-kind={rights ? 'documentary-photo' : 'editorial-illustration'}>
    <div className="article-inline-image"><img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" {...(rights ? {srcSet: rights.derivatives.map(image => `${image.src} ${image.width}w`).join(', '), sizes: '(max-width: 760px) calc(100vw - 40px), 720px'} : {})} /></div>
    <figcaption><span className="article-image-label">{rights ? 'Einblick in den Alltag' : 'Auf einen Blick'}</span><p>{media.caption}</p><small>{rights ? <>Archivfoto: <a href={rights.sourceUrl} target="_blank" rel="noopener noreferrer">{rights.creator} / Wikimedia Commons</a> · <a href={rights.licenceUrl} target="_blank" rel="noopener noreferrer">{rights.licence}</a>. {rights.modification}</> : 'Redaktionelle Themenillustration.'}</small></figcaption>
  </figure>;
}

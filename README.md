# Milchpumpe-Vergleich.de

Statisch vorgerenderte React-/Vite-Website für einen transparenten Milchpumpen-Vergleich.

Live: [milchpumpe-vergleich.de](https://milchpumpe-vergleich.de/)

## Entwicklung

```bash
npm install
npm run dev
```

## Qualitätsprüfung

```bash
npm run lint
npm run build
npm run preview
```

Der Build erzeugt für alle redaktionellen Seiten eigene HTML-Dateien, Metadaten, strukturierte Daten und die Sitemap im Ordner `dist`.

## Analytics

Google Analytics wird ausschließlich nach Einwilligung über die feste Mess-ID `G-4MTYQGF7VK` geladen. Es wird kein Google Tag Manager eingesetzt.

## Deployment

Der Workflow `.github/workflows/pages.yml` baut `dist` und veröffentlicht das Ergebnis über GitHub Pages. In den Repository-Einstellungen muss unter **Pages → Build and deployment → Source** die Option **GitHub Actions** gewählt sein.

### Changelog-Pflicht bei Veröffentlichungen

Jede Veröffentlichung auf `main` muss den Changelog in dieser README im selben Push aktualisieren. Der Pages-Workflow prüft das automatisch und bricht ab, wenn `README.md` bei einem Push nicht geändert wurde.

Regeln:

1. Neue Einträge werden oben unter **Changelog** ergänzt.
2. Jeder Eintrag nennt Datum, Art der Änderung und die wichtigsten Auswirkungen.
3. Changelog und zugehörige Dateien werden gemeinsam committed und gepusht.
4. Reine manuelle Wiederholungen eines bestehenden Workflows benötigen keinen neuen Changelog-Eintrag.

## Changelog

Alle wesentlichen Änderungen an der veröffentlichten Website werden hier in umgekehrt chronologischer Reihenfolge dokumentiert.

### 20. Juli 2026 – Google-Analytics-Datenübertragung

#### Behoben

- Die `gtag()`-Initialisierung auf Googles offizielle `dataLayer.push(arguments)`-Implementierung umgestellt.
- Automatischen GA4-Seitenaufruf nach erteilter Analytics-Einwilligung explizit aktiviert.
- Weiterhin ausschließlich die Mess-ID `G-4MTYQGF7VK` verwendet; keine doppelte Analytics-Einbindung ergänzt.

### 16. Juli 2026 – Nachvollziehbare Veröffentlichungen

#### Hinzugefügt

- Changelog direkt in der GitHub-README angelegt.
- Verbindliche Changelog-Regeln für künftige Veröffentlichungen dokumentiert.
- Automatische Prüfung im GitHub-Pages-Workflow ergänzt: Pushes auf `main` müssen `README.md` aktualisieren.

### 16. Juli 2026 – Vollständiger Struktur- und SEO-Neuaufbau

#### Hinzugefügt

- 16 statisch vorgerenderte und eigenständig crawlbare Seiten.
- Produktdetailseiten für sechs Milchpumpen.
- Ratgeberseiten zu Flanschgröße, Reinigung und Pumpenarten.
- Seiten für Vergleichsmethodik, Redaktion, Impressum und Datenschutz.
- Sitemap, `robots.txt`, Canonical-URLs, Favicon, Webmanifest und Social-Media-Metadaten.
- Strukturierte Daten für Website, Breadcrumbs, Produkte, Vergleichsliste und Ratgeberartikel.
- Crawlbare Haupt- und Brotkrümelnavigation.

#### Geändert

- Nicht belegbare Testnoten, Bewertungszahlen und Testimonials entfernt.
- Produktdaten auf offizielle Herstellerquellen umgestellt.
- Medizinische und hygienische Hinweise mit Behördenquellen ergänzt.
- Website in wartbare Daten-, Komponenten-, Seiten-, SEO- und Analytics-Module zerlegt.
- Mobile Navigation, Vergleichstabelle, Filter und Tastaturbedienung verbessert.
- Farbkontraste, Fokusdarstellung und reduzierte Bewegungen optimiert.
- Abhängigkeiten bereinigt und JavaScript-Bundle verkleinert.
- Rechtstexte auf DDG, MStV und den aktuellen Stand der EU-Streitbeilegungsplattform angepasst.

#### Analytics

- Google Tag Manager vollständig entfernt.
- Ausschließlich Google Analytics 4 mit `G-4MTYQGF7VK` integriert.
- Analytics wird erst nach ausdrücklicher Einwilligung geladen.
- Google-Signale und personalisierte Werbefunktionen deaktiviert.

#### Deployment

- GitHub-Pages-Workflow für den Build aus `dist` eingerichtet.
- Custom Domain über `CNAME` eingebunden.
- Live-Auslieferung der gebauten Assets, Unterseiten, Sitemap und SEO-Dateien verifiziert.

### 15. Juli 2026 – GitHub Pages

#### Hinzugefügt

- Automatisches Deployment über GitHub Actions und GitHub Pages.
- Lockdatei für reproduzierbare Installationen.
- Unterstützung der Custom Domain `milchpumpe-vergleich.de`.

### 28. April 2026 – Analytics-Grundlage

#### Hinzugefügt

- Erste Google-Analytics-Einbindung.
- Ereigniserfassung für ausgehende Affiliate-Links.

### 4. April 2026 – Erste Website-Version

#### Hinzugefügt

- React-/Vite-Grundprojekt.
- Erste Vergleichsseite mit Produktübersicht, Tabelle, Ratgeber und FAQ.
- Cookie-Einwilligungsbanner und rechtliche Inhaltsseiten.

# Milchpumpe-Vergleich.de

Statisch vorgerenderte React-/Vite-Website für einen transparenten Milchpumpen-Vergleich.

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

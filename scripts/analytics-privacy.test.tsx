import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { PrivacyPage } from '../src/route-legal-pages';

test('privacy describes consent-limited interaction measurement without purchase or anonymity claims', () => {
 const html = renderToStaticMarkup(<PrivacyPage />);
 const text = html.replace(/<[^>]+>/g, ' ');
 for(const phrase of ['Produktionsdomain', 'PDF-Guides', 'Finder-Ergebnisse', 'Ereignisparameter', 'Abfrageparameter', 'vollständiger Download']) assert.ok(text.includes(phrase), phrase);
 assert.match(text, /29\. Oktober 2026/);
 assert.match(text, /Suchtexte, E-Mail-Adressen und persönliche Einträge/);
 assert.doesNotMatch(text, /vollständig anonym|anonymes Tracking|Käufe werden bestätigt/);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { AboutPage } from '../src/route-legal-pages';
import { MethodologyV4 } from '../src/methodology-v4';

test('editor profile describes actual craft and a traceable editorial process without medical credentials', () => {
  const html = renderToStaticMarkup(<AboutPage />);
  const window = new Window(); window.document.body.innerHTML = html;
  assert.match(window.document.body.textContent, /Film, Fotografie und Art Direction/);
  assert.match(window.document.body.textContent, /Herstelleranleitungen/);
  assert.match(window.document.body.textContent, /Modell.*Generation.*Set/);
  assert.ok(window.document.querySelector('a[href="/testmethodik/#aktualisierung"]'));
  assert.ok(window.document.querySelector('a[href="/gratis-guides/passform-beratungsvorbereitung/"]'));
  assert.doesNotMatch(window.document.body.textContent, /zertifizierter Stillberater|medizinisch geprüft|Hebamme im Team/);
});

test('methodology publishes a dated correction record with affected model and routes', () => {
  const window = new Window(); window.document.body.innerHTML = renderToStaticMarkup(<MethodologyV4 />);
  const section = window.document.getElementById('aktualisierung')!;
  assert.ok(section.querySelector('time[datetime="2026-10-29"]'));
  assert.match(section.textContent, /Fizimed/);
  assert.match(section.textContent, /M9/);
  assert.ok(section.querySelector('a[href="/tragbare-milchpumpen/"]'));
  assert.ok(section.querySelector('a[href="/vergleich/"]'));
});

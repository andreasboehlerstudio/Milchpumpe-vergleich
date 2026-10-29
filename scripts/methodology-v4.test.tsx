import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';

async function renderMethodology() {
  assert.ok(existsSync('src/methodology-v4.tsx'), 'Standalone MethodologyV4 component is missing');
  const { MethodologyV4 } = await import('../src/methodology-v4');
  assert.equal(typeof MethodologyV4, 'function', 'Provide the named MethodologyV4 export');
  return renderToStaticMarkup(<MethodologyV4 />);
}

test('standalone methodology renders one main landmark and its own descriptive heading', async () => {
  const html = await renderMethodology();
  assert.equal([...html.matchAll(/<main\b/g)].length, 1);
  assert.ok(html.includes('id="inhalt"'));
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
  assert.ok(html.includes('So entsteht unser Milchpumpen-Vergleich'));
});

test('explanatory diagrams have accessible equivalents and editorial scenes use verified local originals', async () => {
  const html = await renderMethodology();
  const diagrams = [...html.matchAll(/<svg\b([^>]*data-diagram="([^"]+)"[^>]*)>([\s\S]*?)<\/svg>/g)];
  assert.deepEqual(diagrams.map(match => match[2]).sort(), ['evidence-flow', 'external-motor', 'integrated-motor', 'variant-check']);
  const ids: string[] = [];
  for (const [, attributes, , body] of diagrams) {
    assert.ok(attributes.includes('role="img"'));
    const titleId = attributes.match(/aria-labelledby="([^"]+)"/)?.[1];
    const descId = attributes.match(/aria-describedby="([^"]+)"/)?.[1];
    assert.ok(titleId && descId, 'Each explanation needs title and description references');
    assert.ok(body.includes(`<title id="${titleId}">`));
    assert.ok(body.includes(`<desc id="${descId}">`));
    assert.ok(!/<text\b/.test(body), 'Explanatory labels must remain responsive HTML, not tiny SVG text');
    ids.push(titleId, descId);
  }
  assert.equal(new Set(ids).size, ids.length, 'Diagram references must be unique');
  const rights = JSON.parse(readFileSync('docs/editorial-pump-parts-photo-rights.json', 'utf8'));
  const images = [...html.matchAll(/<img\b[^>]*src="([^"]+)"[^>]*>/g)];
  assert.deepEqual(images.map(match => match[1]).sort(), ['/editorial-photos/pump-parts.jpg', '/editorial-v2/reinigung.svg']);
  for (const [tag, url] of images) {
    assert.ok(existsSync(`public${url}`), `Image does not resolve: ${url}`);
    assert.ok(/alt="[^"]+"/.test(tag));
    assert.ok(/width="\d+"/.test(tag) && /height="\d+"/.test(tag));
  }
  const photo = images.find(([, url]) => url === '/editorial-photos/pump-parts.jpg')!;
  assert.ok(photo[0].includes('width="1350"') && photo[0].includes('height="1800"'));
  assert.ok(photo[0].includes('loading="eager"'));
  assert.ok(/fetchPriority="high"/i.test(photo[0]));
  assert.ok(html.includes(`href="${rights.source}"`) && html.includes(`href="${rights.licenceUrl}"`));
  assert.ok(html.includes(rights.creator) && html.includes('CC0'));
  assert.ok(html.includes('keine Zuordnung zu einem empfohlenen Modell'));
  assert.ok(html.includes('keine allgemeine Mikrowellenfreigabe'));
  const { createHash } = await import('node:crypto');
  assert.equal(createHash('sha256').update(readFileSync(`public${photo[1]}`)).digest('hex'), rights.publicDerivativeSha256);
  for (const kind of ['integrated-motor', 'external-motor']) {
    assert.ok(html.includes(`data-diagram-annotation="${kind}"`), `Provide readable HTML annotation for ${kind}`);
  }
});

test('worked dossiers connect exact evidence to conditional recommendations and distinguish inventory scopes', async () => {
  const html = await renderMethodology();
  const { Window } = await import('happy-dom');
  const window = new Window();
  window.document.body.innerHTML = html;
  const document = window.document;
  for (const [scope, count] of [['market', '40'], ['detail', '6'], ['catalogue', '61']]) {
    const block = document.querySelector(`[data-research-scope="${scope}"]`);
    assert.ok(block?.textContent.includes(count), `Explain the distinct ${scope} scope (${count})`);
  }
  const evidence = JSON.parse(readFileSync('docs/ranking-next-evidence.json', 'utf8'));
  for (const [modelId, factIds, alternative, set] of [
    ['m5-smart', ['m5-app', 'm5-log', 'm5-clean'], 'Elvie Pump', 'Single'],
    ['freestyle-hands-free', ['freestyle-motor', 'freestyle-clean', 'freestyle-full'], 'SCF547/11', 'Doppelsystem'],
    ['air-1', ['air-case', 'air-manual-stop', 'air-clean'], 'eufy S1', 'Doppelset'],
  ] as const) {
    const dossier = document.querySelector(`[data-evidence-model="${modelId}"]`);
    assert.ok(dossier, `Missing worked dossier ${modelId}`);
    for (const factId of factIds) {
      const fact = evidence.facts.find((entry: { id: string }) => entry.id === factId);
      assert.ok(fact?.quoteVerifiedAgainstRetrievedText);
      const source = evidence.sources.find((entry: { id: number }) => entry.id === fact.sourceId);
      assert.ok(dossier.querySelector(`a[href="${source.url}"]`), `Missing exact source for ${factId}`);
      assert.ok(dossier.querySelector(`[data-fact-id="${factId}"]`), `Expose ${factId} in its model context`);
    }
    assert.ok(dossier.textContent.includes(alternative));
    assert.ok(dossier.textContent.includes(set));
    assert.ok(dossier.querySelector('[data-case-recommendation]'), 'Explain when the fact changes a decision');
  }
  const scenario = document.querySelector('[data-decision-example]');
  assert.ok(scenario?.textContent.includes('Beispiel'), 'Label the hypothetical case, never imply a testimonial');
  assert.ok(scenario?.textContent.includes('Doppelset'));
  assert.ok(scenario?.textContent.includes('Ersatzteile'));
  assert.ok(!/keine dokumentierten|KI-|nicht selbst getestet/i.test(document.querySelector('header')?.textContent || ''), 'Keep limits contextual, not in the hero');
  assert.ok(document.querySelector('#grenzen')?.textContent.includes('keine dokumentierten standardisierten'));
  window.happyDOM.abort();
});

test('evidence table exposes count scopes, sources and keyboard-accessible overflow', async () => {
  const { Window } = await import('happy-dom');
  const window = new Window();
  window.document.body.innerHTML = await renderMethodology();
  const region = window.document.querySelector('[aria-label="Teileangaben im Quellenvergleich"]');
  assert.ok(region, 'Provide a sourced model evidence table, not only a generic source-types table');
  assert.equal(region.getAttribute('tabindex'), '0');
  const table = region.querySelector('table')!;
  assert.ok(table.querySelector('caption')?.textContent.includes('Zählumfang'));
  assert.equal(table.querySelectorAll('thead th[scope="col"]').length, 3);
  assert.equal(table.querySelectorAll('tbody th[scope="row"]').length, 3);
  for (const row of table.querySelectorAll('tbody tr')) assert.ok(row.querySelector('a[href^="https://"]'));
  const ids = [...window.document.querySelectorAll('[id]')].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const link of window.document.querySelectorAll('a[href^="#"]')) {
    assert.ok(window.document.getElementById(link.getAttribute('href')!.slice(1)), `Broken fragment ${link.getAttribute('href')}`);
  }
  window.happyDOM.abort();
});

test('affiliate explanation separates editorial relevance from potential commission', async () => {
  const html = await renderMethodology();
  assert.ok(html.includes('nicht die Höhe einer möglichen Provision'), 'Explain the basis of recommendations independently of commission');
  const funding = html.match(/<section id="finanzierung"[\s\S]*?<\/section>/)?.[0] || '';
  assert.ok(funding.includes('qualifizierten Kauf'));
  assert.ok(funding.includes('kann eine Provision entstehen'));
  assert.ok(!/href="https:\/\/(?:www\.)?amazon\./.test(html), 'Methodology should explain affiliate links without adding a purchase funnel');
});

test('responsive presentation keeps typography local and long text inside minimum-width-safe layouts', () => {
  assert.ok(existsSync('src/methodology-v4.css'), 'Standalone methodology styling is missing');
  const css = readFileSync('src/methodology-v4.css', 'utf8');
  for (const font of ['/fonts/manrope-latin.woff2', '/fonts/manrope-latin-ext.woff2']) {
    assert.ok(css.includes(font));
    assert.ok(existsSync(`public${font}`));
  }
  for (const requirement of ['font-display: swap', 'font-weight: 300', 'font-weight: 400', 'font-weight: 500', 'font-weight: 600', 'minmax(0, 1fr)', 'min-width: 0', 'overflow-wrap: anywhere', 'object-fit: contain', 'overflow-x: auto', ':focus-visible', '@media (max-width: 760px)']) {
    assert.ok(css.includes(requirement), `Missing presentation safeguard: ${requirement}`);
  }
  assert.ok(!/fonts\.googleapis|text-overflow:\s*ellipsis|line-clamp|overflow:\s*hidden/.test(css), 'Never hide or truncate methodology text');
  assert.ok(!/(?:^|\n)(?:body|html|:root)\s*\{/.test(css), 'Style only this component; leave shared layout unchanged');
  assert.ok(css.includes('.editorial-site .method-v4'), 'Raise heading specificity inside the real editorial shell');
  for (const className of ['mv4-hero-stage', 'mv4-documentary', 'mv4-hero-note', 'mv4-dossier', 'mv4-decision', 'mv4-diagram-key']) {
    assert.ok(css.includes(`.${className}`), `Provide the editorial layout for ${className}`);
  }
  for (const [, value] of css.matchAll(/font-size:\s*(0?\.\d+)rem/g)) {
    assert.ok(Number(value) >= .875, `Reader-facing type is too small: ${value}rem`);
  }
});

test('reader can follow a complete evidence-led buying method without unsupported test or purchase claims', async () => {
  const html = await renderMethodology();
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(/\s+/).length;
  assert.ok(words >= 1400 && words <= 3200, `Expected 1400–3200 useful words, received ${words}`);
  for (const id of ['informationen', 'auswahl', 'kriterien', 'kaufentscheidung', 'beispiele', 'erfahrungsberichte', 'aktualisierung', 'grenzen', 'finanzierung', 'quellen']) {
    assert.ok(html.includes(`id="${id}"`), `Missing readable section ${id}`);
    assert.ok(html.includes(`href="#${id}"`), `Missing navigation to ${id}`);
  }
  assert.ok(!/<details\b/.test(html), 'Core method must be openly readable');
  for (const fact of ['Herstellerunterlagen', 'Händlerangebot', 'Redaktionelle Einordnung', 'vollständig integriert', 'separater Motor', 'S12 Pro Quick', 'SCF547/11', 'SCD553/11', 'Generation', 'Einzelpumpe', 'Doppelset', 'Alex', 'drei Monate', 'Charlotte', 'vier Wochen', 'Quellenabgleich', 'keine dokumentierten standardisierten', 'Gesamtnote', 'Affiliate-Links', 'qualifizierten Kauf', 'Provision', 'Amazon-Suche', 'vorhandenes Zubehör', 'Stillberatung']) {
    assert.ok(text.includes(fact), `Missing evidence or decision detail: ${fact}`);
  }
  for (const url of [
    'https://momcozy.com/blogs/momcare/s12-pro-quick-setup-pumping-cleaning',
    'https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump',
    'https://www.mumsnet.com/reviews/momcozy-m9-breast-pump-review',
    'https://www.mumsnet.com/reviews/medela-freestyle-breast-pump-review',
    'https://www.philips.de/c-p/SCF547_11/hands-free-elektrische-doppelmilchpumpe',
    'https://www.philips.de/c-p/SCD553_11/hands-free-starter-set-elektrische-doppelmilchpumpe',
    'https://www.bzfe.de/presse/pressemeldungen-archiv/muttermilch-abpumpen',
  ]) assert.ok(html.includes(`href="${url}"`), `Missing preserved source ${url}`);
  assert.ok(html.includes('mailto:admin@andreasboehler.com'));
  assert.ok(!/<script\b|aggregateRating|ratingValue|itemtype="[^"]*Review/i.test(html), 'Do not emit fabricated review schema');
  assert.ok(!/wir haben nie|niemals getestet|KI-gestützt|KI-generiert|Testsieger|garantiert|Laborergebnis\s*:/i.test(text));
  assert.ok(html.includes('<time dateTime="2026-10-29">29. Oktober 2026</time>'), 'Keep the actual wording-correction date visible');
  assert.match(text, /kein neuer Verfügbarkeitsabgleich/);
  assert.ok(!/Pumpentest am 29\. Oktober|Angebotsabgleich vom 29\. Oktober/.test(text), 'Editorial corrections must not redate historic research');
});

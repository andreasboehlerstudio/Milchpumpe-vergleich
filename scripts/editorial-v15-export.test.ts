import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { Window } from 'happy-dom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const importer = path.join(root, 'scripts/import-approved-editorial-home.mjs');
const draftId = 'cf2cdb51-022c-4be3-9118-28391b49d716';
const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));

// Fixtures are assembled from tracked production inputs, never ignored readbacks or private media.
function fixture() {
  const dir = fs.mkdtempSync(path.join(process.env.TMPDIR || (process.platform === 'win32' ? path.join(os.homedir(), 'AppData/Local/hermes/cache/scratch') : os.tmpdir()), 'editorial-v15-export-'));
  const registry = readJson(path.join(root, 'src/home-editorial-data.json'));
  const template = readJson(path.join(root, 'src/home-editorial-template.json'));
  for (const file of ['src/home-editorial-data.json', 'src/home-editorial-template.json',
    'docs/editorial-v4-photo-rights.json', 'docs/editorial-pump-parts-photo-rights.json',
    'public/editorial-photos/nursery.jpg', 'public/editorial-photos/pump-parts.jpg',
    'public/brand-symbol.svg', 'public/editorial-v2/alltag.svg',
    'public/editorial-v2/portionieren.svg', 'public/editorial-v2/reinigung.svg']) {
    fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    fs.copyFileSync(path.join(root, file), path.join(dir, file));
  }
  const html = path.join(dir, 'approved.html');
  const metadata = path.join(dir, 'approved.json');
  fs.writeFileSync(html, `<!doctype html><html><head><style>:root{--fixture-order:1}html,body{margin:0}.v4 .first{color:red}@keyframes fixture-pulse{from{opacity:0}50%{opacity:.5}to{opacity:1}}</style></head><body><header id="outside-header">Not imported</header>${template.html}<footer id="outside-footer">Not imported</footer><style media="all">@media(max-width:700px){.v4 .second{--fixture-order:2}}</style><script type="application/json" id="v9-comparison-data">${JSON.stringify(registry.models)}</script><script src="https://cdn.invalid/runtime.js"></script><style>.third{--fixture-order:3}</style></body></html>`);
  fs.writeFileSync(metadata, JSON.stringify({ draftId, currentVersion: 15 }));
  const output = path.join(dir, 'isolated-output');
  return {
    dir, registry, template, html, metadata, output,
    changeHtml(transform: (html: string) => string) { fs.writeFileSync(html, transform(fs.readFileSync(html, 'utf8'))); },
    run(extra: string[] = []) {
      return spawnSync(process.execPath, [importer, '--source-html', html, '--source-metadata', metadata,
        '--approved-version', '15', '--output-dir', output, ...extra], { cwd: dir, encoding: 'utf8' });
    },
    cleanup() { fs.rmSync(dir, { recursive: true, force: true }); },
  };
}

function successful(result: ReturnType<ReturnType<typeof fixture>['run']>) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

function documentFor(html: string) {
  const window = new Window({ settings: { disableJavaScriptEvaluation: true, disableCSSFileLoading: true } });
  window.document.body.innerHTML = html;
  return window.document;
}

test('fails closed before writing for any unapproved draft or version, including a CLI pin override', () => {
  const f = fixture();
  try {
    for (const [metadata, extra] of [
      [{ draftId: 'unapproved', currentVersion: 15 }, []],
      [{ draftId, currentVersion: 14 }, []],
      [{ draftId, currentVersion: '15' }, []],
      [{ draftId, currentVersion: 11 }, ['--approved-version', '11']],
      [{ draftId, currentVersion: 15 }, ['--approved-version', '015']],
    ] as const) {
      fs.writeFileSync(f.metadata, JSON.stringify(metadata));
      const result = f.run([...extra]);
      assert.notEqual(result.status, 0, `Accepted ${JSON.stringify(metadata)} ${extra}`);
      assert.match(result.stderr, /approved.*(?:draft|version)/i);
      assert.equal(fs.existsSync(f.output), false);
    }
  } finally { f.cleanup(); }
});

test('collects every inline stylesheet in DOM order, scopes nested rules, and leaves keyframe steps intact', () => {
  const f = fixture();
  try {
    successful(f.run());
    const css = fs.readFileSync(path.join(f.output, 'home-editorial.css'), 'utf8');
    assert.ok(css.indexOf('--fixture-order:1') < css.indexOf('--fixture-order:2'));
    assert.ok(css.indexOf('--fixture-order:2') < css.indexOf('--fixture-order:3'));
    assert.match(css, /\.editorial-home\{--fixture-order:1\}/);
    assert.match(css, /\.editorial-home,\.editorial-home\{margin:0\}/);
    assert.match(css, /\.editorial-home\.v4 \.first\{color:red\}/);
    assert.match(css, /@media\(max-width:700px\)\{\.editorial-home\.v4 \.second\{/);
    assert.match(css, /\.editorial-home \.third\{/);
    assert.match(css, /@keyframes fixture-pulse\{from\{opacity:0\}50%\{opacity:\.5\}to\{opacity:1\}\}/);
    assert.match(css, /\.editorial-home h1,\.editorial-home h2,\.editorial-home h3,\.editorial-home h4\{font-family:inherit\}/);
    assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\.editorial-home \*\{animation:none!important;transition:none!important;scroll-behavior:auto!important\}\}\s*$/);
  } finally { f.cleanup(); }
});

test('rejects any full-object research drift, reordered identities, duplicate keys, or changed model count before output', () => {
  const f = fixture();
  try {
    const original = fs.readFileSync(f.html, 'utf8');
    const variants = [
      f.registry.models.map((model: object, index: number) => index ? model : { ...model, note: 'Unapproved research edit' }),
      f.registry.models.map((model: object, index: number) => index ? model : { ...model, extraResearch: true }),
      [...f.registry.models].reverse(),
      f.registry.models.slice(1),
      [...f.registry.models.slice(0, -1), f.registry.models[0]],
    ];
    for (const models of variants) {
      fs.writeFileSync(f.html, original.replace(JSON.stringify(f.registry.models), JSON.stringify(models)));
      const result = f.run();
      assert.notEqual(result.status, 0, 'Accepted altered research');
      assert.match(result.stderr, /(?:model|research|registry).*(?:identity|changed|mismatch|40)/i);
      assert.equal(fs.existsSync(f.output), false);
    }
  } finally { f.cleanup(); }
});

test('resolves stale default comparison HTML and selection summary from the unchanged registry', () => {
  const f = fixture();
  try {
    f.changeHtml(source => source.replace(/<main\b[\s\S]*?<\/main>/, html => {
      const doc = documentFor(html);
      for (const side of ['a', 'b']) {
        const card = doc.getElementById(`v9-card-${side}`)!;
        card.querySelector('h3')!.textContent = 'Stale prototype name';
        card.querySelectorAll('[data-value]').forEach(cell => { cell.textContent = 'Stale prototype value'; });
        for (const id of [`v9-source-${side}`, `v9-amazon-${side}`]) {
          const link = doc.getElementById(id)!;
          link.setAttribute('href', 'https://stale.invalid/');
          link.removeAttribute('target');
          link.removeAttribute('rel');
          link.setAttribute('hidden', '');
        }
        card.querySelector('.v9-source-missing')!.removeAttribute('hidden');
        doc.querySelectorAll(`#v9-compare-${side} option`).forEach(option => { option.removeAttribute('selected'); });
        doc.querySelector(`#v9-compare-${side} option`)!.setAttribute('selected', '');
      }
      let summary = doc.getElementById('v14-selected-models');
      if (!summary) {
        summary = doc.createElement('small'); summary.id = 'v14-selected-models'; doc.querySelector('main')!.append(summary);
      }
      summary.textContent = 'Stale summary';
      doc.querySelector('main')!.insertAdjacentHTML('beforeend', '<dl id="export-preserved-fact-fixture" class="v14-model-facts"><div><dt>Aufbau</dt><dd>Beschrifteter Aufbau bleibt erhalten</dd></div></dl>');
      return doc.body.innerHTML;
    }));
    successful(f.run());
    const doc = documentFor(readJson(path.join(f.output, 'home-editorial-template.json')).html);
    const keys = ['Momcozy|M5 Smart', 'Medela|Freestyle Hands-free'];
    for (const [index, side] of ['a', 'b'].entries()) {
      const model = f.registry.models.find((model: { key: string }) => model.key === keys[index]);
      const card = doc.getElementById(`v9-card-${side}`)!;
      assert.equal(card.querySelector('h3')!.textContent, model.name);
      card.querySelectorAll('[data-value]').forEach(cell => {
        assert.equal(cell.textContent, model[cell.getAttribute('data-value')!]);
      });
      assert.equal(doc.querySelector(`#v9-compare-${side} option[selected]`)!.getAttribute('value'), model.key);
      const source = doc.getElementById(`v9-source-${side}`)!;
      assert.equal(source.getAttribute('href'), model.source);
      assert.equal(source.hasAttribute('hidden'), false);
      assert.equal(card.querySelector('.v9-source-missing')!.hasAttribute('hidden'), true);
      const shop = doc.getElementById(`v9-amazon-${side}`)!;
      assert.equal(shop.getAttribute('href'), model.amazon);
      assert.equal(shop.hasAttribute('hidden'), false);
      assert.equal(shop.textContent, 'Ausführung bei Amazon prüfen* ↗');
      assert.equal(shop.getAttribute('rel'), 'sponsored noopener noreferrer');
      assert.equal(source.getAttribute('rel'), 'noopener noreferrer');
      for (const link of [source, shop]) assert.equal(link.getAttribute('target'), '_blank');
    }
    assert.equal(doc.getElementById('v14-selected-models')!.textContent, 'Momcozy M5 Smart ↔ Medela Freestyle Hands-free');
    assert.equal(doc.getElementById('v9-compare-status')!.textContent, 'Momcozy M5 Smart und Medela Freestyle Hands-free im Vergleich.');
    assert.match(doc.getElementById('export-preserved-fact-fixture')!.textContent, /Aufbau.*Beschrifteter Aufbau bleibt erhalten/);
  } finally { f.cleanup(); }
});

test('maps only known licensed image URLs and production-origin navigation to local paths', () => {
  const f = fixture();
  try {
    const nursery = readJson(path.join(f.dir, 'docs/editorial-v4-photo-rights.json')).selected;
    const parts = readJson(path.join(f.dir, 'docs/editorial-pump-parts-photo-rights.json'));
    const logo = 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/ec166314-d8f4-47fa-977e-5848c252f006/brand-assets/public-brand-symbol.svg/brand-symbol.svg';
    f.changeHtml(source => source.replace(/src="(\/(?:editorial-photos|editorial-v2)\/[^" ]+)"/g, 'src="https://milchpumpe-vergleich.de$1"')
      .replace('</main>', `<img src="${nursery.remoteResource}"><img src="${parts.publicUrl}"><img src="${logo}"><a id="local-navigation" href="https://milchpumpe-vergleich.de/ratgeber/?probe=1#abschnitt">Intern</a><p id="literal-origin">https://milchpumpe-vergleich.de</p></main>`));
    successful(f.run());
    const doc = documentFor(readJson(path.join(f.output, 'home-editorial-template.json')).html);
    const images = [...doc.querySelectorAll('img')].map(image => image.getAttribute('src'));
    assert.ok(images.length > 3);
    for (const image of images) assert.match(image!, /^\/(?:editorial-photos\/(?:nursery|pump-parts)\.jpg|editorial-v2\/(?:alltag|portionieren|reinigung)\.svg|brand-symbol\.svg)$/);
    assert.ok(images.includes('/brand-symbol.svg'));
    assert.equal(doc.getElementById('local-navigation')!.getAttribute('href'), '/ratgeber/?probe=1#abschnitt');
    assert.equal(doc.getElementById('literal-origin')!.textContent, 'https://milchpumpe-vergleich.de');
  } finally { f.cleanup(); }
});

test('verifies both licensed public photo hashes and fails without downloading, replacing, or writing outputs', () => {
  const f = fixture();
  try {
    for (const filename of ['nursery.jpg', 'pump-parts.jpg']) {
      const file = path.join(f.dir, 'public/editorial-photos', filename);
      const original = fs.readFileSync(file);
      fs.writeFileSync(file, 'tampered photo');
      const result = f.run();
      assert.notEqual(result.status, 0, `Accepted tampered ${filename}`);
      assert.match(result.stderr, /photo.*hash mismatch/i);
      assert.equal(fs.readFileSync(file, 'utf8'), 'tampered photo');
      assert.equal(fs.existsSync(f.output), false);
      fs.unlinkSync(file);
      const missing = f.run();
      assert.notEqual(missing.status, 0, `Accepted missing ${filename}`);
      assert.equal(fs.existsSync(file), false);
      assert.equal(fs.existsSync(f.output), false);
      fs.writeFileSync(file, original);
    }
  } finally { f.cleanup(); }
});

test('explicit CLI exports approved v15 into an isolated directory without changing research or public assets', () => {
  const f = fixture();
  try {
    const inputData = fs.readFileSync(path.join(f.dir, 'src/home-editorial-data.json'));
    const nursery = fs.readFileSync(path.join(f.dir, 'public/editorial-photos/nursery.jpg'));
    const parts = fs.readFileSync(path.join(f.dir, 'public/editorial-photos/pump-parts.jpg'));
    successful(f.run());
    const data = readJson(path.join(f.output, 'home-editorial-data.json'));
    const template = readJson(path.join(f.output, 'home-editorial-template.json'));
    assert.equal(data.sourceVersion, 15);
    assert.equal(template.sourceVersion, 15);
    assert.equal(template.sourceDraft, draftId);
    assert.equal(data.models.length, 40);
    assert.deepEqual(data.models, f.registry.models);
    assert.equal(data.productionDataUpdatedOn, f.registry.productionDataUpdatedOn);
    assert.equal(template.productionDataUpdatedOn, f.template.productionDataUpdatedOn);
    assert.deepEqual(fs.readFileSync(path.join(f.dir, 'src/home-editorial-data.json')), inputData);
    assert.deepEqual(fs.readFileSync(path.join(f.dir, 'public/editorial-photos/nursery.jpg')), nursery);
    assert.deepEqual(fs.readFileSync(path.join(f.dir, 'public/editorial-photos/pump-parts.jpg')), parts);
    const doc = documentFor(template.html);
    assert.equal(doc.querySelectorAll('main').length, 1);
    assert.equal(doc.body.children.length, 1);
    assert.equal(doc.querySelector('#outside-header,#outside-footer,script,iframe,link'), null);
  } finally { f.cleanup(); }
});

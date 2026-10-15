import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parseArgs, isDeepStrictEqual } from 'node:util';
import { Window } from 'happy-dom';
import postcss from 'postcss';

// Run from the repository root. Explicit source paths also work in a clean checkout.
// --output-dir contains the three generated files (default: src).
const root = process.cwd();
const { values } = parseArgs({ options: {
  'source-html': { type: 'string', default: '.superdesign/tmp/integration-readback.html' },
  'source-metadata': { type: 'string', default: '.superdesign/tmp/integration-readback.json' },
  'approved-version': { type: 'string', default: '15' },
  'output-dir': { type: 'string', default: 'src' },
} });
const readJson = file => JSON.parse(fs.readFileSync(path.resolve(root, file), 'utf8'));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const metadata = readJson(values['source-metadata']);
if (values['approved-version'] !== '15' ||
    metadata.draftId !== 'cf2cdb51-022c-4be3-9118-28391b49d716' || metadata.currentVersion !== 15) {
  throw new Error('Unexpected approved draft or version: this importer is pinned to version 15');
}
const source = fs.readFileSync(path.resolve(root, values['source-html']), 'utf8');
const registry = readJson('src/home-editorial-data.json');
const currentTemplate = readJson('src/home-editorial-template.json');
const window = new Window({ settings: {
  disableJavaScriptEvaluation: true, disableCSSFileLoading: true,
  disableJavaScriptFileLoading: true, disableIframePageLoading: true,
} });
const document = window.document;
document.write(source);
const main = document.querySelector('main');
if (!main) throw new Error('Approved main landmark missing');
const nursery = readJson('docs/editorial-v4-photo-rights.json').selected;
const parts = readJson('docs/editorial-pump-parts-photo-rights.json');
// Public derivatives are already approved and checked in. Never fetch or consult private siblings.
for (const [local, expected] of [['nursery.jpg', nursery.sha256], ['pump-parts.jpg', parts.publicDerivativeSha256]]) {
  const file = path.join(root, 'public/editorial-photos', local);
  if (!/^[a-f0-9]{64}$/.test(expected) || sha(fs.readFileSync(file)) !== expected) {
    throw new Error(`Licensed public photo hash mismatch: ${local}`);
  }
}
const productionOrigin = 'https://milchpumpe-vergleich.de';
const localAssets = ['/editorial-photos/nursery.jpg', '/editorial-photos/pump-parts.jpg',
  '/editorial-v2/alltag.svg', '/editorial-v2/portionieren.svg', '/editorial-v2/reinigung.svg', '/brand-symbol.svg'];
const assetMap = new Map(localAssets.flatMap(local => [[local, local], [`${productionOrigin}${local}`, local]]));
assetMap.set(nursery.remoteResource, '/editorial-photos/nursery.jpg');
assetMap.set(parts.publicUrl, '/editorial-photos/pump-parts.jpg');
assetMap.set('https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/projects/ec166314-d8f4-47fa-977e-5848c252f006/brand-assets/public-brand-symbol.svg/brand-symbol.svg', '/brand-symbol.svg');
for (const image of main.querySelectorAll('img')) {
  const remote = image.getAttribute('src');
  const local = assetMap.get(remote);
  if (!local) throw new Error(`Unapproved content asset: ${remote}`);
  if (!fs.existsSync(path.join(root, 'public', local))) throw new Error(`Selected local asset missing: ${local}`);
  image.setAttribute('src', local);
}
for (const link of main.querySelectorAll('a[href]')) {
  const href = link.getAttribute('href');
  if (href.startsWith(`${productionOrigin}/`) || href === productionOrigin) {
    const url = new URL(href);
    link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
  }
}
const modelScript = document.getElementById('v9-comparison-data');
if (!modelScript) throw new Error('Approved comparison data missing');
const sourceModels = JSON.parse(modelScript.textContent);
if (!Array.isArray(sourceModels) || sourceModels.length !== 40 ||
    new Set(sourceModels.map(model => model.key)).size !== 40 ||
    !isDeepStrictEqual(sourceModels, registry.models)) {
  throw new Error('Model registry identity mismatch: all 40 full research objects must remain unchanged');
}
// Write the existing registry, never a new research payload taken from the prototype.
const models = registry.models;
// Canvas runtimes are deliberately excluded; resolve their default state for SSR here.
const defaults = [['a', 'Momcozy|M5 Smart'], ['b', 'Medela|Freestyle Hands-free']];
const selectedModels = defaults.map(([side, key]) => {
  const model = models.find(item => item.key === key);
  const card = main.querySelector(`#v9-card-${side}`);
  const select = main.querySelector(`#v9-compare-${side}`);
  if (!model || !card || !select) throw new Error(`Default comparison identity or controls missing: ${key}`);
  card.querySelector('h3').textContent = model.name;
  card.querySelectorAll('[data-value]').forEach(cell => {
    cell.textContent = model[cell.getAttribute('data-value')] ?? 'Noch offen.';
  });
  for (const option of select.querySelectorAll('option')) {
    option.toggleAttribute('selected', option.getAttribute('value') === key);
  }
  const primary = card.querySelector(`#v9-source-${side}`);
  primary.toggleAttribute('hidden', !model.source);
  if (model.source) primary.setAttribute('href', model.source);
  else primary.removeAttribute('href');
  primary.setAttribute('target', '_blank');
  primary.setAttribute('rel', 'noopener noreferrer');
  card.querySelector('.v9-source-missing').toggleAttribute('hidden', Boolean(model.source));
  const shop = card.querySelector(`#v9-amazon-${side}`);
  shop.setAttribute('href', model.amazon);
  shop.removeAttribute('hidden');
  shop.setAttribute('target', '_blank');
  shop.setAttribute('rel', 'sponsored noopener noreferrer');
  shop.textContent = `${model.exact ? 'Ausführung bei Amazon prüfen*' : 'Modell bei Amazon suchen*'} ↗`;
  return model;
});
const [first, second] = selectedModels;
const summary = main.querySelector('#v14-selected-models');
if (summary) summary.textContent = `${first.name} ↔ ${second.name}`;
const status = main.querySelector('#v9-compare-status');
if (status) status.textContent = `${first.name} und ${second.name} im Vergleich.`;
// querySelectorAll preserves document order, including styles added after the original head.
const style = postcss.parse([...document.querySelectorAll('style')].map(node => node.textContent).join('\n'));
style.walkRules(rule => {
  if (rule.parent.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
  rule.selector = postcss.list.comma(rule.selector).map(selector => {
    const selected = selector.trim();
    if (selected === ':root' || selected === 'html' || selected === 'body') return '.editorial-home';
    if (/^\.v4(?=[\s.#:[>+~]|$)/.test(selected)) return selected.replace(/^\.v4/, '.editorial-home.v4');
    return `.editorial-home ${selected}`;
  }).join(',');
});
const css = `/* Approved Superdesign v15. Scoped to the editorial shell; no remote CSS or scripts. */\n${style.toString()}\n.editorial-home{min-height:100vh}\n.editorial-home h1,.editorial-home h2,.editorial-home h3,.editorial-home h4{font-family:inherit}\n@media(prefers-reduced-motion:reduce){.editorial-home *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}\n`;
const output = path.resolve(root, values['output-dir']);
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'home-editorial-template.json'), JSON.stringify({
  ...currentTemplate, sourceDraft: metadata.draftId, sourceVersion: 15, html: main.outerHTML,
}, null, 2) + '\n');
fs.writeFileSync(path.join(output, 'home-editorial-data.json'), JSON.stringify({
  ...registry, sourceVersion: 15, models,
}, null, 2) + '\n');
fs.writeFileSync(path.join(output, 'home-editorial.css'), css);
console.log(JSON.stringify({ sourceVersion: 15, sourceSha256: sha(source.replaceAll('\r\n', '\n')),
  modelCount: models.length, scopedCss: true, scriptsCopied: false, outputDir: output }));

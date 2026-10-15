import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import postcss from 'postcss';

const root = process.cwd();
const sourcePath = path.join(root, '.superdesign/tmp/ranking-readback.html');
const source = fs.readFileSync(sourcePath, 'utf8');
const metadata = JSON.parse(fs.readFileSync('.superdesign/tmp/ranking-readback.json', 'utf8'));
if (metadata.draftId !== 'cf2cdb51-022c-4be3-9118-28391b49d716' || metadata.currentVersion !== 11) throw new Error('Unexpected approved draft');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const nursery = JSON.parse(fs.readFileSync('docs/editorial-v4-photo-rights.json', 'utf8')).selected;
const parts = JSON.parse(fs.readFileSync('docs/editorial-pump-parts-photo-rights.json', 'utf8'));
fs.mkdirSync('public/editorial-photos', { recursive: true });
const nurseryTarget = 'public/editorial-photos/nursery.jpg';
if (!fs.existsSync(nurseryTarget)) {
  const response = await fetch(nursery.remoteResource);
  if (!response.ok) throw new Error(`Licensed nursery resource: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 3_000_000 || sha(bytes) !== nursery.sha256) throw new Error('Nursery photo identity mismatch');
  fs.writeFileSync(nurseryTarget, bytes);
}
if (sha(fs.readFileSync(nurseryTarget)) !== nursery.sha256) throw new Error('Nursery photo hash mismatch');
const partsOriginal = path.resolve(root, '../design-media/wikimedia-pump-parts/pump-parts-editorial.jpg');
if (sha(fs.readFileSync(partsOriginal)) !== parts.publicDerivativeSha256) throw new Error('Pump-parts derivative identity mismatch');
fs.copyFileSync(partsOriginal, 'public/editorial-photos/pump-parts.jpg');
const assetMap = new Map([[nursery.remoteResource, '/editorial-photos/nursery.jpg'], [parts.publicUrl, '/editorial-photos/pump-parts.jpg']]);
for (const match of source.matchAll(/<img\b[^>]*src="([^"]+)"/g)) {
  const remote = match[1];
  if (remote.endsWith('/brand-symbol.svg')) assetMap.set(remote, '/brand-symbol.svg');
  else if (remote.endsWith('.svg')) {
    const local = `/editorial-v2/${path.posix.basename(new URL(remote).pathname)}`;
    if (!fs.existsSync(`public${local}`)) throw new Error(`Selected illustration missing: ${local}`);
    assetMap.set(remote, local);
  } else if (!assetMap.has(remote)) throw new Error(`Unapproved content asset: ${remote}`);
}
let main = source.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0];
if (!main) throw new Error('Approved main landmark missing');
main = main.replaceAll('https://milchpumpe-vergleich.de', '');
for (const [remote, local] of assetMap) main = main.replaceAll(remote, local);
if (/<script\b|<iframe\b|\son[a-z]+\s*=/i.test(main)) throw new Error('Executable or embedded content in static template');
const models = JSON.parse(source.match(/<script id="v9-comparison-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
if (models.length !== 35 || new Set(models.map(m => m.key)).size !== 35) throw new Error('Model identity count changed');
const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
// Canvas updated its default cells only at runtime. Export the same current values into SSR HTML.
for (const [side, key] of [['a', 'Momcozy|M5 Smart'], ['b', 'Medela|Freestyle Hands-free']]) {
  const model = models.find(model => model.key === key);
  if (!model) throw new Error(`Default comparison identity missing: ${key}`);
  const cardPattern = new RegExp(`<article\\b(?=[^>]*id="v9-card-${side}")[\\s\\S]*?</article>`);
  if (!cardPattern.test(main)) throw new Error(`Default comparison card missing: ${side}`);
  main = main.replace(cardPattern, card => card.replace(/(<h3[^>]*>)[\s\S]*?(<\/h3>)/, `$1${escapeHtml(model.name)}$2`).replace(/(<dd[^>]*data-value="([^"]+)"[^>]*>)[\s\S]*?(<\/dd>)/g, (_, open, field, close) => `${open}${escapeHtml(model[field] ?? 'Noch offen.')}${close}`));
}
const styleText = source.match(/<style>([\s\S]*?)<\/style>/)?.[1];
if (!styleText) throw new Error('Approved stylesheet missing');
const style = postcss.parse(styleText);
style.walkRules(rule => {
  if (rule.parent.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
  rule.selector = postcss.list.comma(rule.selector).map(selector => {
    const selected = selector.trim();
    if (selected === ':root' || selected === 'html' || selected === 'body') return '.editorial-home';
    if (/^\.v4(?=[\s.#:[>+~]|$)/.test(selected)) return selected.replace(/^\.v4/, '.editorial-home.v4');
    return `.editorial-home ${selected}`;
  }).join(',');
});
const css = `/* Approved Superdesign v11. Scoped to the editorial shell; no remote CSS or scripts. */\n${style.toString()}\n.editorial-home{min-height:100vh}\n.editorial-home h1,.editorial-home h2,.editorial-home h3,.editorial-home h4{font-family:inherit}\n@media(prefers-reduced-motion:reduce){.editorial-home *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}\n`;
fs.writeFileSync('src/home-editorial-template.json', JSON.stringify({ sourceDraft:metadata.draftId, sourceVersion:11, html:main }, null, 2)+'\n');
fs.writeFileSync('src/home-editorial-data.json', JSON.stringify({ sourceVersion:11, models }, null, 2)+'\n');
fs.writeFileSync('src/home-editorial.css', css);
console.log(JSON.stringify({ sourceVersion:11, sourceSha256:sha(source.replaceAll('\r\n','\n')), localAssets:[...new Set(assetMap.values())], modelCount:models.length, scopedCss:true, scriptsCopied:false }));

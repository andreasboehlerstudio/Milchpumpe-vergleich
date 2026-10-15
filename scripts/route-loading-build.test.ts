import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Follow actual emitted ESM, not chunk-name/size warnings. Portable after npm run build.
const dist = path.resolve('dist');
const html = readFileSync(path.join(dist, 'index.html'), 'utf8');
const entry = html.match(/<script\b[^>]*type="module"[^>]*src="([^"]+)"/)?.[1];
assert.ok(entry, 'production HTML has a module entry');
const initialRoots = [entry, ...[...html.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+\.js)"/g)].map(match => match[1])].map(file => file!.replace(/^\//, ''));
function imports(file: string) {
  const source = ts.createSourceFile(file, readFileSync(path.join(dist, file), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const eager: string[] = [];
  const deferred: string[] = [];
  function visit(node: ts.Node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) eager.push(node.moduleSpecifier.text);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) deferred.push(node.arguments[0].text);
    ts.forEachChild(node, visit);
  }
  visit(source);
  const resolve = (value: string) => path.posix.normalize(path.posix.join(path.posix.dirname(file), value));
  return { eager: eager.map(resolve), deferred: deferred.map(resolve) };
}
function closure(roots: string[]) {
  const seen = new Set<string>();
  function visit(file: string) {
    if (seen.has(file)) return;
    seen.add(file);
    imports(file).eager.forEach(visit);
  }
  roots.forEach(visit);
  return [...seen];
}

test('home defers its rendering family and does not download unrelated content families', () => {
  const initial = closure(initialRoots);
  const deferred = initial.flatMap(file => imports(file).deferred);
  assert.ok(deferred.length >= 7, 'browser entry must actually defer the route families (baseline eagerly imports all pages)');
  const home = deferred.find(file => /route-home-/.test(file));
  assert.ok(home, 'home is a demand-loaded rendering family');
  const selected = closure([...initial, home]);
  const modules: Record<string, { modules: string[] }> = JSON.parse(readFileSync(path.join(dist, '.vite/route-loading.json'), 'utf8'));
  const selectedModules = selected.flatMap(file => modules[file]?.modules || []);
  for (const forbidden of ['src/App.tsx', 'src/seo.ts', 'src/pages.tsx', 'src/guides.ts', 'src/milk-guides.json', 'src/product-catalogue.ts', 'src/catalogue-pumps.json', 'src/wearable-market-data.json', 'src/magazine-upgrade.tsx']) {
    assert.ok(!selectedModules.some(module => module.endsWith(forbidden)), `${forbidden} must not be in home's fetched dependency closure`);
  }
  assert.ok(selectedModules.some(module => module.endsWith('src/home-editorial.tsx')));
  const allJs = readdirSync(path.join(dist, 'assets')).filter(file => file.endsWith('.js'));
  assert.ok(selected.length < allJs.length, 'splitting must reduce fetched code, not only rename files');
  // Actual pre-change f375880 home responses, captured before modifying/building.
  // Keep the raw evidence private; this non-sensitive numeric baseline is portable.
  const baselineDecodedJsBytes = 1_092_058;
  const selectedBytes = selected.reduce((sum, file) => sum + readFileSync(path.join(dist, file)).byteLength, 0);
  assert.ok(selectedBytes < baselineDecodedJsBytes * 0.5, `home dependency closure regressed: ${selectedBytes} bytes vs actual ${baselineDecodedJsBytes}-byte baseline`);
});

test('catalogue, market, methodology and product families do not fetch unrelated article bodies', () => {
  const initial = closure(initialRoots);
  const deferred = initial.flatMap(file => imports(file).deferred);
  const modules: Record<string, { modules: string[] }> = JSON.parse(readFileSync(path.join(dist, '.vite/route-loading.json'), 'utf8'));
  for (const family of ['catalogue', 'market', 'methodology', 'product', 'legal']) {
    const selected = deferred.find(file => file.includes(`/route-${family}-`));
    assert.ok(selected, `${family} family is deferred`);
    const sources = closure([...initial, selected]).flatMap(file => modules[file]?.modules || []);
    for (const forbidden of ['src/guides.ts', 'src/buying-guides.ts', 'src/niche-guides-a.ts', 'src/niche-guides-b.ts', 'src/milk-guides.json', 'src/route-article-page.tsx']) {
      assert.ok(!sources.some(source => source.endsWith(forbidden)), `${family} must not fetch ${forbidden} merely for product facts or guide-link summaries`);
    }
  }
});

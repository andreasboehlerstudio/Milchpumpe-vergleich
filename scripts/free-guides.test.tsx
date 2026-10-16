import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { routeFamily } from '../src/route-family';
import { loadRoute } from '../src/route-loader';
import { RouteView } from '../src/route-view';

import { Window } from 'happy-dom';
import { GUIDE_ARTICLES } from '../src/data';

const slugs = ['unterwegs-packplan', 'arbeitsplatz-uebergabeplan', 'reinigung-teileroutine', 'passform-beratungsvorbereitung', 'set-teilepass'];
test('guide hub and exactly five guide routes have their own identical synchronous and lazy rendering family', async () => {
  for (const path of ['/gratis-guides/', ...slugs.map(slug => `/gratis-guides/${slug}/`)]) {
    assert.equal(routeFamily(path + '?source=test#inhalt'), 'free-guides', path);
    const html = renderToString(<App initialPath={path} />);
    assert.equal(renderToString(<RouteView initialPath={path} Page={await loadRoute(path)} />), html);
    assert.match(html, /class="free-guides/);
    assert.equal((html.match(/<main\b/g) || []).length, 1);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
  assert.equal(routeFamily('/gratis-guides/unknown/'), 'legal');
  assert.match(renderToString(<App initialPath="/gratis-guides/unknown/" />), /editorial-home v4 editorial-site/);
});

test('each guide provides its own real document target, useful task, four inside sections, sources and relevant existing articles without collecting data', async () => {
  const headlines = new Set<string>();
  const tasks = new Set<string>();
  for (const slug of slugs) {
    const window = new Window();
    window.document.body.innerHTML = renderToString(<App initialPath={`/gratis-guides/${slug}/`} />);
    const doc = window.document;
    const main = doc.querySelector('main')!;
    headlines.add(main.querySelector('h1')!.textContent);
    tasks.add(main.querySelector('.fg-task')?.textContent || '');
    const download = main.querySelector(`a[href="/downloads/${slug}.pdf"][download="${slug}.pdf"]`);
    assert.ok(download, slug);
    const preview = main.querySelector(`img[src="/free-guide-assets/${slug}-preview.webp"][fetchPriority="high"]`);
    assert.ok(preview, slug);
    assert.equal(preview.getAttribute('width'), '1200', 'reserve the actual produced preview dimensions');
    assert.equal(preview.getAttribute('height'), '1080');
    assert.match(main.textContent, /kostenlos und ohne Anmeldung/);
    assert.equal(main.querySelectorAll('.fg-inside > li').length, 4, slug);
    assert.ok(main.querySelectorAll('.fg-steps > li').length >= 3, slug);
    assert.ok(main.querySelectorAll('#quellen a[href^="https://"]').length >= 2, slug);
    const related = main.querySelectorAll('.fg-related a');
    assert.ok(related.length >= 3, slug);
    for (const link of related) assert.ok(GUIDE_ARTICLES.some(article => link.getAttribute('href') === `/ratgeber/${article.slug}/`), link.outerHTML);
    assert.equal(main.querySelectorAll('form,input,iframe').length, 0);
    assert.doesNotMatch(main.textContent, /per (E-Mail|Newsletter)|Testsieger|garantiert|exklusiv/i);
    assert.ok(doc.querySelector('button#cookie-settings'));
    await window.happyDOM.close();
  }
  assert.equal(headlines.size, 5);
  assert.equal(tasks.size, 5);
});

test('hub shows five distinct guides with previews and a path to every free full document', async () => {
  const window = new Window();
  window.document.body.innerHTML = renderToString(<App initialPath="/gratis-guides/" />);
  const doc = window.document;
  assert.equal(doc.querySelectorAll('.fg-hub-entry').length, 5);
  for (const slug of slugs) {
    assert.ok(doc.querySelector(`main a[href="/gratis-guides/${slug}/"]`));
    assert.ok(doc.querySelector(`main a[href="/downloads/${slug}.pdf"][download]`));
    assert.ok(doc.querySelector(`main img[src="/free-guide-assets/${slug}-preview.webp"]`));
  }
  for (const path of ['/', '/ratgeber/']) {
    doc.body.innerHTML = renderToString(<App initialPath={path} />);
    assert.ok(doc.querySelector('header nav a[href="/gratis-guides/"]'));
    assert.ok(doc.querySelector('footer a[href="/gratis-guides/"]'));
  }
  await window.happyDOM.close();
});

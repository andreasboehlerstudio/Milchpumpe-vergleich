import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import App from '../src/App';
import { GUIDE_ARTICLES } from '../src/data';
import { ARTICLE_MEDIA } from '../src/article-media';
import photoRights from '../docs/article-photo-rights.json';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

test('media coverage matches the exact article registry with no orphan or missing article', () => {
  assert.deepEqual(Object.keys(ARTICLE_MEDIA).sort(), GUIDE_ARTICLES.map(article => article.slug).sort());
});

test('photo variants match their official rights ledger and retain responsive visible credits', async () => {
  const window = new Window();
  try {
    const seen = new Set<string>();
    for (const [slug, media] of Object.entries(ARTICLE_MEDIA)) {
      window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={`/ratgeber/${slug}/`} />);
      for (const image of media.filter(image => image.photoId)) {
        seen.add(image.photoId!);
        const rights = photoRights.assets.find(asset => asset.id === image.photoId)!;
        assert.ok(rights.sourceUrl.startsWith('https://commons.wikimedia.org/wiki/File:'));
        const figure = [...window.document.querySelectorAll('figure.article-inline-visual')].find(figure => figure.querySelector('img')?.getAttribute('src') === image.src)!;
        assert.ok(figure.textContent.includes(rights.creator));
        assert.ok(figure.textContent.includes(rights.licence));
        assert.ok([...figure.querySelectorAll('a')].some(link => link.getAttribute('href') === rights.licenceUrl));
        assert.equal(figure.querySelector('img')!.getAttribute('srcset')?.split(', ').length, 2);
        for (const derivative of rights.derivatives) {
          assert.ok(existsSync(`public${derivative.src}`));
          const bytes = readFileSync(`public${derivative.src}`);
          assert.equal(createHash('sha256').update(bytes).digest('hex'), derivative.sha256);
          assert.ok(bytes.length < 100_000, 'Photo variant stays below 100kB');
        }
      }
    }
    assert.deepEqual([...seen].sort(), photoRights.assets.map(asset => asset.id).sort());
  } finally { await window.happyDOM.close(); }
});

test('article contents link to every FAQ and source section that is rendered', async () => {
  const window = new Window();
  try {
    for (const article of GUIDE_ARTICLES) {
      window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={`/ratgeber/${article.slug}/`} />);
      for (const id of ['quellen', 'fragen']) {
        if (window.document.getElementById(id)) assert.ok(window.document.querySelector(`.article-toc a[href="#${id}"]`), `${article.slug}: ${id} missing from contents`);
      }
    }
  } finally { await window.happyDOM.close(); }
});

test('milk FAQs use the same readable disclosure structure as buying guides', async () => {
  const window = new Window();
  try {
    window.document.body.innerHTML = renderToStaticMarkup(<App initialPath="/ratgeber/muttermilch-kita-mitgeben/" />);
    const details = [...window.document.querySelectorAll('.article-faq details')];
    assert.ok(details.length > 0);
    for (const item of details) {
      assert.ok(item.closest('.faq-list'), 'Use the shared padded FAQ list');
      assert.ok(item.querySelector('summary'));
      assert.ok(item.querySelector('div > p'), 'Answer content gets the established padded wrapper');
    }
  } finally { await window.happyDOM.close(); }
});

test('every article table can be reached as a labelled keyboard scroll region', async () => {
  const window = new Window();
  try {
    for (const guide of GUIDE_ARTICLES) {
      window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
      for (const region of window.document.querySelectorAll('.article-page .table-scroll')) {
        assert.equal(region.getAttribute('tabindex'), '0', guide.slug);
        assert.equal(region.getAttribute('role'), 'region', guide.slug);
        assert.ok(region.getAttribute('aria-label') || region.getAttribute('aria-labelledby'), guide.slug);
        assert.ok(region.querySelector('table caption'), 'Keep the table caption and all columns');
      }
    }
  } finally { await window.happyDOM.close(); }
});

test('public editorial copy avoids self-referential production slogans', () => {
  const html = renderToStaticMarkup(<App initialPath="/ueber-uns/" />);
  assert.ok(!/KI-gestützt|KI-generiert/.test(html), 'Keep the substantive source/method and medical boundaries, not production slogans');
});

test('article shortcuts resolve to contents, product examples and sources on every route', async () => {
  const window = new Window();
  try {
    for (const guide of GUIDE_ARTICLES) {
      window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
      const nav = window.document.querySelector('nav[aria-label="Artikel-Schnellzugriff"]');
      assert.ok(nav, `${guide.slug}: a compact reading shortcut is missing`);
      assert.match(nav.textContent, /Min\. Lesezeit/);
      const links = [...nav.querySelectorAll('a')];
      assert.equal(links.length, 3);
      for (const link of links) {
        const target = link.getAttribute('href')!;
        assert.ok(target.startsWith('#') && window.document.getElementById(target.slice(1)), `${guide.slug}: broken ${target}`);
      }
    }
  } finally { await window.happyDOM.close(); }
});

test('every article has two topic-specific inline figures in its reading flow', async () => {
  const window = new Window();
  try {
    for (const guide of GUIDE_ARTICLES) {
      window.document.body.innerHTML = renderToStaticMarkup(<App initialPath={`/ratgeber/${guide.slug}/`} />);
      const figures = [...window.document.querySelectorAll('.article-body figure.article-inline-visual')];
      assert.equal(figures.length, 2, `${guide.slug}: add two images inside the reading flow, not a gallery after the text`);
      const images = figures.map(figure => figure.querySelector('img')!);
      assert.equal(new Set(images.map(image => image.getAttribute('src'))).size, 2, `${guide.slug}: do not repeat the same inline image`);
      for (const figure of figures) {
        const image = figure.querySelector('img')!;
        assert.ok((image.getAttribute('alt')?.length ?? 0) > 25, guide.slug);
        assert.ok(Number(image.getAttribute('width')) > 0 && Number(image.getAttribute('height')) > 0, guide.slug);
        assert.equal(image.getAttribute('loading'), 'lazy', guide.slug);
        assert.equal(image.getAttribute('decoding'), 'async', guide.slug);
        assert.ok(figure.querySelector('figcaption')?.textContent.trim(), guide.slug);
      }
    }
  } finally { await window.happyDOM.close(); }
});

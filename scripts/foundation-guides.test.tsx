import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';
import { GuideArticlePage } from '../src/route-article-page';
import { FOUNDATION_GUIDES } from '../src/foundation-guide-data';
import { GUIDE_ARTICLES } from '../src/data';

function article(slug: string) {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(<GuideArticlePage slug={slug} />);
  return window.document;
}

test('flange guide SSR gives a practical model-specific measurement comparison instead of a universal formula', () => {
  const document = article('richtige-flanschgroesse');
  const body = document.querySelector('.article-body')!;
  assert.match(body.textContent, /Beide Seiten getrennt/);
  const table = body.querySelector('table')!;
  assert.ok(table, 'A reader can compare actual manufacturer sizing paths');
  for (const model of ['Medela Hands-free', 'Philips Avent SCF547/11', 'Momcozy M9']) {
    assert.ok(table.textContent.includes(model), model);
  }
  for (const destination of ['medela.com', 'philips.de/c-p/SCF547_11', 'momcozy.com/pages/size-guide-all', 'support.momcozy.com/article/52733617426201']) {
    assert.ok([...body.querySelectorAll('a')].some(link => link.href.includes(destination)), destination);
  }
  assert.match(body.textContent, /keine universelle Millimeterformel/);
  assert.match(body.textContent, /Nicht allein aus der Milchmenge/);
  assert.match(body.textContent, /Bei Schmerzen.*beenden/);
});

test('cleaning guide separates milk-contact parts, electronics and tubing with linked model-specific care limits', () => {
  const document = article('milchpumpe-reinigen');
  const body = document.querySelector('.article-body')!;
  assert.match(body.textContent, /Reinigung entfernt Milchreste/);
  assert.match(body.textContent, /Sanitizing/);
  const tables = [...body.querySelectorAll('table')];
  assert.equal(tables.length, 2, 'Component sorting and model differences are distinct decisions');
  for (const component of ['Milchkontakt', 'Motor', 'Schläuche']) {
    assert.ok(tables[0].textContent.includes(component), component);
  }
  for (const model of ['Medela Hands-free', 'Philips Avent SCF547/11', 'Momcozy M9']) {
    assert.ok(tables[1].textContent.includes(model), model);
  }
  assert.match(body.textContent, /vor dem ersten und nach jedem Gebrauch/);
  assert.match(body.textContent, /widersprüchlich/);
  assert.match(body.textContent, /keine pauschale Spülmaschinenfreigabe/);
  for (const destination of ['medela.com', 'documents.philips.com', 'support.momcozy.com/article/53211695912473', 'support.momcozy.com/article/62313088992281']) {
    assert.ok([...body.querySelectorAll('a')].some(link => link.href.includes(destination)), destination);
  }
  assert.match(body.textContent, /vollständig trocken/);
});

for (const [slug, pdf] of [
  ['richtige-flanschgroesse', 'passform-beratungsvorbereitung'],
  ['milchpumpe-reinigen', 'reinigung-teileroutine'],
]) {
  test(`${slug} retains accessible SSR reading aids with dated citations, FAQ and a no-purchase PDF path`, () => {
    const document = article(slug);
    assert.match(document.querySelector('.eyebrow + h1')!.textContent, /Flanschgröße|Milchpumpe/);
    assert.ok(document.querySelector('p.eyebrow')!.textContent.includes('Grundlagen'));
    assert.match(document.querySelector('.hero-lead')!.previousElementSibling!.textContent, /Kurzantwort/);
    assert.equal(document.querySelectorAll('h1').length, 1);
    const guide = FOUNDATION_GUIDES[slug]!;
    assert.equal(guide.updated, '2026-10-29');
    assert.equal(document.querySelector('.article-byline time')!.getAttribute('datetime'), guide.updated);
    assert.match(document.querySelector('.article-byline time')!.textContent, /29\. Oktober 2026/);
    for (const source of guide.sources) {
      const link = [...document.querySelectorAll('#quellen a')].find(item => item.getAttribute('href') === source.url);
      assert.ok(link, `${source.label} in the visible source list`);
      assert.ok(link.parentElement!.textContent.includes(source.context), 'Source scope stays visible');
    }
    const noPurchase = document.querySelector('#ohne-kauf')!;
    assert.ok(noPurchase, 'Reader can proceed without replacing a pump');
    assert.ok(noPurchase.querySelector(`a[href="/downloads/${pdf}.pdf"]`));
    assert.ok(noPurchase.querySelector(`a[href="/gratis-guides/${pdf}/"]`));
    assert.match(noPurchase.textContent, /ohne Anmeldung/);
    assert.match(noPurchase.textContent, /vorhandenen/);
    const faq = document.querySelector('#fragen .faq-list')!;
    assert.ok(faq?.querySelectorAll('details').length >= 4);
    for (const details of faq.querySelectorAll('details')) {
      assert.ok(details.querySelector('summary + div > p'), 'Retain native padded FAQ structure');
    }
    const toc = document.querySelector('#artikel-inhalt')!;
    const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
    assert.equal(ids.length, new Set(ids).size, 'Unique fragment destinations');
    for (const target of document.querySelectorAll('a[href^="#"]')) {
      assert.equal(document.querySelectorAll(`[id="${target.getAttribute('href')!.slice(1)}"]`).length, 1);
    }
    for (const id of ['fragen', 'quellen', 'ohne-kauf', 'weiterlesen', 'modelle']) {
      assert.ok(toc.querySelector(`a[href="#${id}"]`), `${id} appears in contents`);
    }
    for (const table of document.querySelectorAll('.article-body table')) {
      const wrapper = table.parentElement!;
      assert.ok(wrapper.classList.contains('table-scroll'));
      assert.equal(wrapper.getAttribute('role'), 'region');
      assert.equal(wrapper.getAttribute('tabindex'), '0');
      assert.ok(wrapper.getAttribute('aria-label'));
      assert.ok(table.querySelector('caption'));
      assert.ok(table.querySelectorAll('thead th[scope="col"]').length >= 3);
      assert.ok(table.querySelectorAll('tbody th[scope="row"]').length >= 3);
    }
    assert.ok(document.querySelector('.article-visual img'));
    assert.equal(document.querySelectorAll('.article-body .article-inline-visual').length, 2);
    for (const link of document.querySelectorAll('#weiterlesen a[href^="/ratgeber/"]')) {
      const relatedSlug = link.getAttribute('href')!.split('/')[2];
      assert.ok(!relatedSlug || GUIDE_ARTICLES.some(guide => guide.slug === relatedSlug), relatedSlug);
    }
  });
}

test('the foundation expansion preserves every existing guide route', () => {
  const rendered = GUIDE_ARTICLES.map(guide => ({ slug: guide.slug, document: article(guide.slug) }));
  assert.equal(new Set(rendered.map(guide => guide.slug)).size, GUIDE_ARTICLES.length);
  for (const { slug, document } of rendered) {
    assert.ok(document.querySelector('article'), slug);
    assert.equal(document.querySelectorAll('h1').length, 1, slug);
    assert.ok(!document.body.textContent.includes('Seite nicht gefunden'), slug);
  }
});

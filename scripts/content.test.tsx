import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { GUIDE_ARTICLES } from '../src/data';
import { getStructuredData, getRouteSeo } from '../src/seo';

test('three buying guides are discoverable and render useful product pathways', () => {
  for (const slug of ['momcozy-m9-oder-s12-pro', 'medela-freestyle-oder-philips-avent', 'hands-free-milchpumpe-kaufen']) {
    assert.ok(GUIDE_ARTICLES.some(a => a.slug === slug), `Missing guide ${slug}`);
    const route = `/ratgeber/${slug}/`;
    assert.equal(getRouteSeo(route).noindex, undefined);
    const html = renderToStaticMarkup(<App initialPath={route} />);
    assert.ok(!html.includes('Diese Seite wurde nicht gefunden'));
    assert.ok(html.includes('href="/produkte/'));
    assert.ok(html.includes('andreasboeh09-21'));
    assert.ok(html.includes('Inhaltsverzeichnis'));
    assert.ok(html.includes('Andreas Böhler'));
    assert.ok(html.includes('/testmethodik/') && html.includes('Die Modellinfos stammen aus Herstellerunterlagen'));
    assert.ok(getStructuredData(route)['@graph'].some(n => n['@type'] === 'Article' && n.datePublished === '2026-10-14'));
  }
});

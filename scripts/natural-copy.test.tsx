import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import App from '../src/App';
import {ROUTES} from '../src/seo';

test('public copy avoids self-commentary slogans while retaining sources and affiliate disclosure',()=> {
  const banned=/Keine pauschalen Gewinner|Eine Entscheidung mit Kontext|(?:keine|ohne) erfundene(?:n)? (?:Tests|Testnoten|Bewertungen|Praxistests)|kein eigener Praxistest|kein erfundener Flaschentest/i;
  for(const route of ROUTES) {
    const html=renderToStaticMarkup(<App initialPath={route.path}/>);
    const text=html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
    assert.ok(!banned.test(text),`Remove self-commentary on ${route.path}: ${text.match(banned)?.[0]}`);
    assert.ok(html.includes('/testmethodik/'),route.path);
    assert.ok(html.includes('Affiliate'),`Keep advertising disclosure on ${route.path}`);
  }
});

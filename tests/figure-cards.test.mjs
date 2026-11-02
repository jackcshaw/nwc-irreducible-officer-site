import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {loadFigures,resolveFigure,escape,figurePageLink} from '../scripts/figure-pages.mjs';
import {figureCardData,renderFigureCard,placePMEEssayCards} from '../scripts/figure-cards.mjs';
const root=process.cwd(),m=loadFigures(root),v=m.variants.find(x=>x.id==='pme');
const html=readFileSync(join(root,'dist/index.html'),'utf8');
const essay=html.split('id="panel-essay"')[1].match(/<article class="essay article-body">([\s\S]*?)<\/article>/)[1];
assert.equal((essay.match(/class="motion-figure-card"/g)||[]).length,8);
const original=essay.replace(/\n<aside class="motion-figure-card"[\s\S]*?<\/aside>/g,'');
assert.equal(placePMEEssayCards(original,root),essay,'Insertion changes only the eight entries');
assert.throws(()=>placePMEEssayCards('',root),/Missing or ambiguous/);
assert.throws(()=>placePMEEssayCards(original+original,root),/Missing or ambiguous/);
let previous=-1;
for(const f of m.figures) {
  const card=renderFigureCard(root,f,v),d=figureCardData(root,f,v),ed=resolveFigure(root,f,v);
  assert(essay.includes(escape(f.essayAnchorEnd)+'</p>\n'+card));
  assert(essay.indexOf(card)>previous);previous=essay.indexOf(card);
  assert.equal((card.match(/<a /g)||[]).length,1,'Each poster entry has one accessible link');
  assert(card.includes('alt=""'));assert(card.includes(escape(ed.check.question)));assert(card.includes(escape(ed.check.follow)));
  assert.equal(d.href,f.kind==='competency'?'/appropriate-reliance/pme/':`/failure-modes/${f.slug}/pme/`);
  const receipt=JSON.parse(readFileSync(join(root,'media/figures',f.slug,'pme/manifest.json'),'utf8'));
  assert(d.poster.url.endsWith(receipt.outputs['poster.png'].sha256));
  if(f.kind==='competency')assert(receipt.questionFirst && receipt.outputs['poster.png'].sha256!==receipt.outputs['final.png'].sha256);
  for(const variant of m.variants) {
    assert.equal(figurePageLink(m,variant,f,`https://judgmentlab.net/#${f.essaySection}`),`/#figure-${f.slug}`);
  }
}
assert(original.includes('Core Failure Modes') && original.includes('Foundation pilot sequence') && original.includes('Closing standard'),'Legacy essay inserts remain');
assert(!/<script[^>]+src="[^\"]*assets\/figures\//.test(html),'Essay does not request animation scripts');
console.log('Essay figure cards: eight unique exact placements, original content preserved, one link per entry, PME routes and question-first AR poster');

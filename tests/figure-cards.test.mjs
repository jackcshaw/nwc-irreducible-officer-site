import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {loadFigures,resolveFigure,escape,figurePageLink} from '../scripts/figure-pages.mjs';
import {figureCardData,renderFigureCard,placePMEEssayCards,placeAudienceEssayCards} from '../scripts/figure-cards.mjs';
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
    const audience={pme:'pme',classroom:'he','high-school':'k12'}[variant.id];
    const anchor=f.audienceParagraphs?.[audience]?`${audience}-essay-figure-${f.slug}`:`figure-${f.slug}`;
    assert.equal(figurePageLink(m,variant,f,`https://judgmentlab.net/#${f.essaySection}`),(audience?`/?audience=${audience}`:'/')+'#'+anchor);
  }
}
assert(original.includes('Core Failure Modes') && original.includes('Foundation pilot sequence') && original.includes('Closing standard'),'Legacy essay inserts remain');
assert(!/<script[^>]+src="[^\"]*assets\/figures\//.test(html),'Essay does not request animation scripts');
console.log('Essay figure cards: eight unique exact placements, original content preserved, one link per entry, PME routes and question-first AR poster');

for(const [audience,count] of [['he',5],['k12',4]]) {
  const source=readFileSync(join(process.env.COMPANION_REPO_PATH,'essays',audience+'.md'),'utf8');
  const edition=html.split(`id="panel-${audience}-essay"`)[1].match(/<article class="essay article-body">([\s\S]*?)<\/article>/)[1];
  assert.equal((edition.match(/class="motion-figure-card"/g)||[]).length,count);
  for(const figure of m.figures.filter(f=>f.audienceParagraphs?.[audience])) {
    assert(source.includes(figure.audienceParagraphs[audience]),'Anchor must remain exact source prose');
    assert(edition.includes(`id="${audience}-essay-figure-${figure.slug}"`));
  }
  assert.throws(()=>placeAudienceEssayCards('',root,audience,p=>p),/Missing or ambiguous/);
}
console.log('Adapted essays: five HE and four high-school entries, exact source paragraphs and fail-closed anchors');

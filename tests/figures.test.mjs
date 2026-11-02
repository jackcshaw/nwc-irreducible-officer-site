import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {loadFigures,resolveFigure,quoteFor,figureInputs,figurePath,renderEssayQuote,checkedEssayExcerpt,linkedMarkdown,renderLinked} from '../scripts/figure-pages.mjs';
import {assertPosterReceipt} from '../scripts/figure-posters.mjs';
const root=process.cwd(),manifest=loadFigures(root),essay=readFileSync(join(root,'content/the-irreducible-officer.md'),'utf8');
const sitemap=readFileSync(join(root,'dist/sitemap.xml'),'utf8');
assert.deepEqual(manifest.figures.map(f=>f.slug),['frame-capture','fluency-substitution','premature-synthesis','uncalibrated-reliance']);
for(const figure of manifest.figures) {
  const quote=quoteFor(figure,essay);
  assert.throws(()=>quoteFor(figure,essay+'\n\n'+quote),/ambiguous/);
  assert.throws(()=>quoteFor(figure,''),/Missing/);
  for(const id of ['business','pme']) assert.equal(readFileSync(join(root,'figures',figure.slug,'editions',id+'.json'),'utf8'),readFileSync(join(root,'design/motion-figures/figures',figure.slug,'editions',id+'.json'),'utf8'),'Port retains exact edition source');
  const titles=new Set();
  for(const variant of manifest.variants) {
    const ed=resolveFigure(root,figure,variant),path=figurePath(figure,variant),html=readFileSync(join(root,'dist',path,'index.html'),'utf8');
    assert.equal(ed.castId,variant.cast);assert.equal(ed.id,variant.edition);
    assert(!/\{[A-Za-z_]+\}/.test(ed.page.setup));
    assert(html.includes(`rel="canonical" href="https://judgmentlab.net${path}"`));
    titles.add(html.match(/<title>(.*?)<\/title>/s)[1]);
    assert.equal((html.match(/data-mf-beat-index=/g)||[]).length,ed.beats.length+1);
    assert.equal((html.match(/class="figure-poster"/g)||[]).length,1);
    assert(sitemap.includes(`https://judgmentlab.net${path}`));
    assert(!/<a[^>]+href="[^\"]*book-v0/.test(html));
    const data=JSON.parse(html.match(/id="figure-data" type="application\/json">(.*?)<\/script>/s)[1]);
    assert.equal(data.edition.castId,variant.cast);
    assert.equal(data.routes.length,4);
    const ld=JSON.parse(html.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(ld[0]['@type'],'LearningResource');assert.equal(ld[1].itemListElement.length,3);
    assert(!html.includes('design/motion-figures'));assert(!html.includes('parity-origin.js'));
    const dir=join(root,'media/figures',figure.slug,variant.id),receipt=JSON.parse(readFileSync(join(dir,'manifest.json'),'utf8'));
    assertPosterReceipt(receipt,{root,inputs:figureInputs(root,figure.slug),outputDir:dir,variant:variant.id});
    assert(readFileSync(join(dir,'poster.png')).includes(Buffer.from('impeccable:prompt')));
    assert(receipt.inputs['package-lock.json']);
    assert.equal(receipt.raster,'full-tile');assert.equal(receipt.finalTime,({'frame-capture':{pme:90.4,business:104.8},'fluency-substitution':{pme:92.8,business:101},'premature-synthesis':{pme:94.2,business:94.2},'uncalibrated-reliance':{pme:94.8,business:94.8}})[figure.slug][variant.edition]);
    assert.equal(receipt.outputs['poster.png'].sha256,receipt.outputs['final.png'].sha256);
    assert(existsSync(join(root,'dist',`media/figures/${figure.slug}/${variant.id}/og.png`)));
  }
  assert.equal(titles.size,4);
}
for(const license of ['ibmplexmono','sourcesans3','sourceserif4']) assert(existsSync(join(root,'dist/assets/figures/fonts',license+'-OFL.txt')));
const quoted=renderEssayQuote(root,'A *measured* claim ([source](https://example.org/?a=1&b=2)).');
assert.equal(quoted,'A <em>measured</em> claim (<a href="https://example.org/?a=1&amp;b=2">source</a>).');
assert(!renderEssayQuote(root,'[unsafe](javascript:alert(1))').includes('<a'));
const fsPage=readFileSync(join(root,'dist/failure-modes/fluency-substitution/pme/index.html'),'utf8');
assert(fsPage.includes('<a href="https://ojs.aut.ac.nz/pjtel/article/view/246">Chow et al., 2026</a>'));
const hub=readFileSync(join(root,'dist/failure-modes/index.html'),'utf8');
assert.equal((hub.match(/<li>/g)||[]).length,4);
assert(!hub.includes('runtime/motion.js'));
assert(!readFileSync(join(root,'dist/index.html'),'utf8').includes('/assets/figures/runtime/motion.js'));
console.log('Figure static routes, source boundaries, posters and metadata passed');

const supplemental=JSON.parse(readFileSync(join(root,'figures/premature-synthesis/editions/pme.json'))).page.quote2;
assert.equal(checkedEssayExcerpt(supplemental,essay),supplemental);
assert.throws(()=>checkedEssayExcerpt(supplemental,essay+supplemental),/ambiguous/);
assert.throws(()=>checkedEssayExcerpt('An invented quotation.',essay),/Missing/);
const psPage=readFileSync(join(root,'dist/failure-modes/premature-synthesis/pme/index.html'),'utf8');
assert(psPage.includes(renderEssayQuote(root,supplemental)));
assert(psPage.includes('href="/#vi-friction-as-developmental-design"'));

for(const variant of manifest.variants) {
 const figure=manifest.figures.find(f=>f.slug==='uncalibrated-reliance');const ed=resolveFigure(root,figure,variant);
 const html=readFileSync(join(root,'dist',figurePath(figure,variant),'index.html'),'utf8');
 for(const q of ed.page.quotes) {
  assert.equal(checkedEssayExcerpt(linkedMarkdown(q.text),essay),linkedMarkdown(q.text));
  assert(html.includes(renderLinked(root,q.text)));
 }
 if(ed.page.evidenceText)assert(html.includes(renderLinked(root,ed.page.evidenceText)));
 assert(!html.includes('href="../appropriate-reliance/'));
}
assert.throws(()=>linkedMarkdown([{text:'bad',href:'javascript:alert(1)'}]),/Invalid/);

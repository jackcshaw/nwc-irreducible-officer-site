import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {loadFigures,resolveFigure,quoteFor,figureInputs,figurePath,renderEssayQuote,checkedEssayExcerpt,linkedMarkdown,renderLinked,figureLink,renderFigureText,quotationParagraphs,checkQuotation} from '../scripts/figure-pages.mjs';
import {assertPosterReceipt} from '../scripts/figure-posters.mjs';
const root=process.cwd(),manifest=loadFigures(root),essay=readFileSync(join(root,'content/the-irreducible-officer.md'),'utf8');
const sitemap=readFileSync(join(root,'dist/sitemap.xml'),'utf8');
assert.deepEqual(manifest.figures.map(f=>f.slug),['frame-capture','fluency-substitution','premature-synthesis','uncalibrated-reliance','invisible-delegation','institutional-monoculture','responsibility-laundering','appropriate-reliance']);
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
    assert.equal((html.match(/class="figure-poster"/g)||[]).length,figure.kind==='competency'?3:1);
    assert(sitemap.includes(`https://judgmentlab.net${path}`));
    assert(!/<a[^>]+href="[^\"]*book-v0/.test(html));
    const data=JSON.parse(html.match(/id="figure-data" type="application\/json">(.*?)<\/script>/s)[1]);
    assert.equal(data.edition.castId,variant.cast);
    assert.equal(data.routes.length,4);
    const ld=JSON.parse(html.match(/type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(ld[0]['@type'],'LearningResource');assert.equal(ld[1].itemListElement.length,figure.kind==='competency'?2:3);
    assert(!html.includes('design/motion-figures'));assert(!html.includes('parity-origin.js'));
    const dir=join(root,'media/figures',figure.slug,variant.id),receipt=JSON.parse(readFileSync(join(dir,'manifest.json'),'utf8'));
    assertPosterReceipt(receipt,{root,inputs:figureInputs(root,figure.slug),outputDir:dir,variant:variant.id});
    assert(readFileSync(join(dir,'poster.png')).includes(Buffer.from('impeccable:prompt')));
    assert(receipt.inputs['package-lock.json']);
    assert.equal(receipt.raster,'full-tile');assert.equal(receipt.finalTime,({'frame-capture':{pme:90.4,business:104.8},'fluency-substitution':{pme:92.8,business:101},'premature-synthesis':{pme:94.2,business:94.2},'uncalibrated-reliance':{pme:94.8,business:94.8},'invisible-delegation':{pme:99.1,business:99.1},'institutional-monoculture':{pme:100.5,business:95.2},'responsibility-laundering':{pme:97.4,business:100.8},'appropriate-reliance':{pme:122.1,business:122.1}})[figure.slug][variant.edition]);
    if(figure.kind==='competency') { assert.equal(receipt.questionFirst,true);assert.equal(receipt.posterTime,25.5+4.2);assert.notEqual(receipt.outputs['poster.png'].sha256,receipt.outputs['final.png'].sha256);const reading=readFileSync(join(root,'dist',path,'reading/index.html'),'utf8');assert(reading.includes('<details>'));assert(!reading.includes('src="/assets/figures/runtime/motion.js'));assert(sitemap.includes(`https://judgmentlab.net${path}reading/`)); } else assert.equal(receipt.outputs['poster.png'].sha256,receipt.outputs['final.png'].sha256);
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
assert.equal((hub.match(/<li>/g)||[]).length,7);
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
 assert(html.includes(`href="/appropriate-reliance/${variant.suffix}"`));
}
assert.throws(()=>linkedMarkdown([{text:'bad',href:'javascript:alert(1)'}]),/Invalid/);

const urPme=readFileSync(join(root,'dist/failure-modes/uncalibrated-reliance/pme/index.html'),'utf8');
assert(urPme.includes('<p class="figure-setting-note">PME (professional military education): the original example from <em>The Irreducible Officer</em>, the National War College essay.</p>'));
assert(!urPme.includes('<p class="figure-setting-note">true</p>'));

for(const variant of manifest.variants) {
 assert.equal(figureLink(manifest,variant,'../frame-capture/'),figurePath(manifest.figures[0],variant));
 assert.equal(figureLink(manifest,variant,'../frame-capture/?edition=business'),figurePath(manifest.figures[0],variant));
}
assert.throws(()=>figureLink(manifest,manifest.variants[0],'../unpublished/'),/Unpublished/);
assert.throws(()=>figureLink(manifest,manifest.variants[0],'javascript:alert(1)'),/Unsupported/);
assert.equal(linkedMarkdown('Plain source quotation.'),'Plain source quotation.');
const idPme=readFileSync(join(root,'dist/failure-modes/invisible-delegation/pme/index.html'),'utf8');
const idEdition=resolveFigure(root,manifest.figures.find(f=>f.slug==='invisible-delegation'),manifest.variants[3]);
for(const q of idEdition.page.quotes)assert(idPme.includes(renderEssayQuote(root,q.text)));
assert(idPme.includes('href="/failure-modes/frame-capture/pme/"'));

for(const variant of manifest.variants) {
 const figure=manifest.figures.find(f=>f.slug==='institutional-monoculture'),ed=resolveFigure(root,figure,variant);
 const html=readFileSync(join(root,'dist',figurePath(figure,variant),'index.html'),'utf8');
 const reading=html.split('<article class="figure-reading"')[1].split('</article>')[0];
 assert(reading.includes(renderEssayQuote(root,ed.page.about.text)));
 for(const paragraph of ed.page.study||[])assert(reading.includes(renderEssayQuote(root,paragraph)));
 for(const item of ed.page.evidenceList||[])assert(reading.includes(renderEssayQuote(root,item)));
 if(variant.id==='pme')assert(reading.includes('href="/failure-modes/premature-synthesis/pme/"'));
}

for(const variant of manifest.variants) {
 const figure=manifest.figures.find(f=>f.slug==='responsibility-laundering'),ed=resolveFigure(root,figure,variant);
 const html=readFileSync(join(root,'dist',figurePath(figure,variant),'index.html'),'utf8');
 const reading=html.split('<article class="figure-reading"')[1].split('</article>')[0];
 assert(reading.includes(renderFigureText(root,manifest,variant,ed.page.checkFollow)));
 assert(reading.includes(`href="${figurePath(manifest.figures.find(f=>f.slug==='uncalibrated-reliance'),variant)}"`));
 for(const q of ed.page.quotes||[])for(const paragraph of checkQuotation(q,essay))assert(reading.includes(renderEssayQuote(root,paragraph)));
 if(variant.id==='pme')assert(reading.includes('href="/#vii-accountability-is-structural"'));
}
assert.throws(()=>checkQuotation({paras:['… A fabricated excerpt.']},essay),/Missing/);
assert.throws(()=>checkQuotation({paras:['… The human remains responsible for the final judgment.']},essay+' The human remains responsible for the final judgment.'),/ambiguous/);
assert.throws(()=>renderFigureText(root,manifest,manifest.variants[0],'[unsafe](javascript:bad)'),/Unsupported/);
assert.equal(renderFigureText(root,manifest,manifest.variants[0],'[A & B](https://example.org/?a=1&b=2)'),'<a href="https://example.org/?a=1&amp;b=2">A &amp; B</a>');

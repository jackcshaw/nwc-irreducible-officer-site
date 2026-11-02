// Actual production factory and hydrated player in the frozen source page geometry.
import {readFileSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {loadFigures,resolveFigure,playerMarkup,renderEssayQuote,renderLinked} from '../../scripts/figure-pages.mjs';
import {sha256} from '../../scripts/figure-assets.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
const [source,output,slug,edition,cast]=process.argv.slice(2);
if(!source||!output||!slug||!edition||!cast)throw new Error('Expected source, output, slug, edition, cast');
execFileSync('node',[join(root,'tests/helpers/figure-parity-fixture.mjs'),source,output]);
const manifest=loadFigures(root),figure=manifest.figures.find(f=>f.slug===slug),variant=manifest.variants.find(v=>v.edition===edition&&v.cast===cast);
if(!figure||!variant)throw new Error('Unsupported production fixture');
const ed=resolveFigure(root,figure,variant),dir=join(resolve(output),'figures',slug);
let html=readFileSync(join(dir,'index.html'),'utf8');
html=html.replace(/<script>[\s\S]*?<\/script>/g,'').replace('<html lang="en">','<html lang="en" data-ed-gate>');
html=html.replace(/<style>[\s\S]*?<\/style>/,`<style>${readFileSync(join(root,'figures',slug,slug+'.css'),'utf8')}</style>`);
html=html.replace(/<figure\b[\s\S]*?<\/figure>/,playerMarkup(root,figure,ed));
html=html.replace(/(<p[^>]*data-ur-linked="([^"]+)"[^>]*>)<\/p>/g,(_,open,path)=>open+renderLinked(root,path.split('.').reduce((value,key)=>value?.[key],ed))+'</p>');
// Source-only page hooks are filled here because the production factory owns only
// its player. Keep their exact source markup so whole-page fixture parity remains
// a useful check; the built route has its own static renderer.
const sourceValue=path=>path.split('.').reduce((value,key)=>value?.[key],ed);
html=html.replace(/(<([a-z]+)[^>]*data-im-linked="([^"]+)"[^>]*>)<\/\2>/g,(_,open,tag,path)=>open+renderEssayQuote(root,sourceValue(path)||'')+`</${tag}>`);
html=html.replace(/(<ul[^>]*data-im-linked-items="([^"]+)"[^>]*>)<\/ul>/g,(_,open,path)=>open+(sourceValue(path)||[]).map(item=>`<li>${renderEssayQuote(root,item)}</li>`).join('')+'</ul>');
html=html.replace(/(<p[^>]*data-im-lead="([^"]+)"[^>]*>)<\/p>/g,(_,open,path)=>{const value=sourceValue(path);return open+(value?`<strong>${renderEssayQuote(root,value.lead)}</strong> ${renderEssayQuote(root,value.text)}`:'')+'</p>';});
const data=JSON.stringify(ed).replace(/</g,'\\u003c');
html=html.replace('</body>',`<script>const edition=${data};MotionFigures.fillPage(document,edition);document.querySelectorAll('[data-fs-quote]').forEach(node=>{node.innerHTML=${JSON.stringify(renderEssayQuote(root,ed.page.quote||''))};});MotionFigures.mountFigure(document.getElementById('${slug}'),{edition,standalone:true}).then(()=>{document.getElementById('${slug}').dataset.mfReady='';});</script></body>`);
writeFileSync(join(dir,'index.html'),html);
const js=readFileSync(join(root,'figures',slug,slug+'.js'));writeFileSync(join(dir,slug+'.js'),js);
const receiptPath=join(resolve(output),'fixture.json'),receipt=JSON.parse(readFileSync(receiptPath,'utf8'));
Object.assign(receipt,{kind:'motion-production-factory-fixture',factory:sha256(js),markup:sha256(readFileSync(join(root,'figures',slug,'player.html'))),figureCSS:sha256(readFileSync(join(root,'figures',slug,slug+'.css'))),edition:sha256(Buffer.from(data)),note:'Actual production factory, player markup and resolved static text, with the frozen source surrounding page. Whole-page chrome is checked separately on the built routes.'});
writeFileSync(receiptPath,JSON.stringify(receipt,null,2)+'\n');

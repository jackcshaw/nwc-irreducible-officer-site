// Explicit export command. Normal builds only validate committed poster receipts.
import {mkdtempSync,mkdirSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {loadFigures,resolveFigure,publishFigureAssets,playerMarkup,figureInputs} from './figure-pages.mjs';
import {generateFigurePosters} from './figure-posters.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=loadFigures(root),slug=process.argv[2];
const figure=manifest.figures.find(f=>f.slug===slug);
if(!figure) throw new Error('Usage: node scripts/generate-figure-posters.mjs <published figure slug>');
const out=mkdtempSync(join(tmpdir(),'motion-poster-export-'));
const assets=publishFigureAssets(root,out,manifest);
for(const variant of manifest.variants) {
  const edition=resolveFigure(root,figure,variant);
  const html=`<!doctype html><html lang="en" data-ed-gate><head><meta charset="utf-8"><link rel="stylesheet" href="${assets['fonts/fonts.css'].url}"><link rel="stylesheet" href="${assets['figure-page.css'].url}"><link rel="stylesheet" href="${assets['runtime/figure.css'].url}"><link rel="stylesheet" href="${assets[`${slug}/${slug}.css`].url}"></head><body><main class="fig-page">${playerMarkup(root,figure,edition)}<p data-figure-status hidden>Load failed</p></main><script type="application/json" id="figure-data">${JSON.stringify({edition,routes:[]}).replace(/</g,'\\u003c')}</script><script src="${assets['runtime/motion.js'].url}"></script><script src="${assets[`${slug}/${slug}.js`].url}"></script><script src="${assets['page.js'].url}"></script></body></html>`;
  mkdirSync(join(out,variant.id));writeFileSync(join(out,variant.id,'index.html'),html);
}
const server=spawn('python3',['-u','-m','http.server','0','--bind','127.0.0.1','--directory',out],{stdio:['ignore','pipe','ignore']});
try {
  const port=await new Promise((ok,fail)=>{
    let output='';const timer=setTimeout(()=>fail(new Error('Export server did not start')),5000);
    server.once('error',e=>{clearTimeout(timer);fail(e)});
    server.once('exit',code=>{clearTimeout(timer);fail(new Error(`Export server exited ${code}`))});
    server.stdout.on('data',data=>{output+=data;const m=output.match(/Serving HTTP on .* port (\d+)/);if(m){clearTimeout(timer);ok(m[1])}});
  });
  for(const variant of manifest.variants) {
    console.log(`Exporting ${slug}/${variant.id}`);
    await generateFigurePosters({url:`http://127.0.0.1:${port}/${variant.id}/?t=0`,figureId:slug,variant:variant.id,sourceCommit:figure.sourceCommit,root,inputs:figureInputs(root,slug),outputDir:join(root,'media/figures',slug,variant.id),fontLock:join(root,'figures/fonts/manifest.json')});
  }
  console.log(`Generated four poster receipts; export fixture retained at ${out}`);
} finally {server.kill('SIGTERM')}

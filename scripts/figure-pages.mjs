import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import vm from 'node:vm';
import {writeFigureAssets,sha256} from './figure-assets.mjs';
import {assertPosterReceipt} from './figure-posters.mjs';
import {loadFontLock} from './figure-fonts.mjs';

export const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const jsonScript = data => JSON.stringify(data).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const readJSON = path => JSON.parse(readFileSync(path,'utf8'));
export function runtimeData(root) {
  const context={URLSearchParams,console,location:{search:''},matchMedia:()=>({matches:false,addEventListener(){}}),document:{documentElement:{hasAttribute:()=>true},querySelector:()=>null}};
  context.window=context;
  vm.runInNewContext(readFileSync(join(root,'figures/runtime/motion.js'),'utf8'),context);
  return context.MotionFigures;
}
export function loadFigures(root) {
  const manifest=readJSON(join(root,'figures/manifest.json'));
  if(manifest.schema!==1 || !Array.isArray(manifest.variants) || manifest.variants.length!==4) throw new Error('Invalid figure manifest');
  if(manifest.variants.map(v=>v.id).join('|')!=='workplace|classroom|high-school|pme' || manifest.variants.some(v=>typeof v.label!=='string'||!v.label)) throw new Error('Invalid figure variant identity');
  const expected=['business/workplace/','business/classroom/classroom/','business/high-school/high-school/','pme/seminar/pme/'];
  if(manifest.variants.map(v=>`${v.edition}/${v.cast}/${v.suffix}`).join('|')!==expected.join('|')) throw new Error('Unexpected figure routes');
  const seen=new Set();
  for(const figure of manifest.figures) {
    if(!/^[a-z]+(?:-[a-z]+)*$/.test(figure.slug) || seen.has(figure.slug) || !['failure-mode','competency'].includes(figure.kind)) throw new Error('Invalid or duplicate figure');
    if(figure.sourceCommit && !/^[a-f0-9]{40}$/.test(figure.sourceCommit)) throw new Error('Invalid figure source commit');
    seen.add(figure.slug);
  }
  return {...manifest,figures:[...manifest.figures].sort((a,b)=>a.order-b.order)};
}
export const figurePath=(figure,variant)=>`${figure.kind==='competency'?'':'/failure-modes'}/${figure.slug}/${variant.suffix}`;
export function resolveFigure(root,figure,variant) {
  const raw=readJSON(join(root,'figures',figure.slug,'editions',`${variant.edition}.json`));
  if(!(raw.casts || [raw.cast]).includes(variant.cast)) throw new Error('Unsupported figure cast');
  const warnings=[];
  const {ed}=runtimeData(root).resolveEdition(raw,readJSON(join(root,'figures/casts.json')),variant.cast,m=>warnings.push(m));
  if(warnings.length) throw new Error(warnings.join('; '));
  return {...ed,id:variant.edition,nameplate:readJSON(join(root,'figures',figure.slug,'nameplate.json'))};
}
export function quoteFor(figure,essay) {
  const matches=essay.split(/\n\s*\n/).map(p=>p.replace(/\*\*/g,'').trim()).filter(p=>p.startsWith(figure.quoteStart)&&p.endsWith(figure.quoteEnd));
  if(matches.length!==1) throw new Error(`Missing or ambiguous essay passage: ${figure.slug}`);
  return matches[0];
}
// Essay quotations retain their checked source text and HTTPS citations.
export function renderEssayQuote(root,quote) {
  return runtimeData(root).rich(quote).replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g,'<a href="$2">$1</a>');
}
export function checkedEssayExcerpt(quote,essay) {
  const clean=essay.replace(/\*\*/g,'');
  const start=clean.indexOf(quote);
  if(!quote || start<0 || clean.indexOf(quote,start+1)!==-1) throw new Error('Missing or ambiguous supplemental essay quotation');
  return clean.slice(start,start+quote.length);
}
export function linkedMarkdown(segments) {
  if(typeof segments==='string') return segments;
  return (segments||[]).map(segment=>{
    if(typeof segment==='string') return segment;
    if(typeof segment.text!=='string' || !/^https:\/\//.test(segment.href)) throw new Error('Invalid linked figure text');
    return `[${segment.text}](${segment.href})`;
  }).join('');
}
export function renderLinked(root,segments) {
  return renderEssayQuote(root,linkedMarkdown(segments));
}
export function quotationParagraphs(entry) {
  return entry.paras || [linkedMarkdown(entry.text)];
}
export function checkQuotation(entry,essay) {
  for(const text of quotationParagraphs(entry)) checkedEssayExcerpt(text.startsWith('… ')?text.slice(2):text,essay);
  return quotationParagraphs(entry);
}
function essayQuoteMarkup(root,figure,page,quote) {
  const entries=page.quotes?.map((q,i)=>({paras:quotationParagraphs(q),cite:q.cite,section:i?figure.additionalEssaySection:figure.essaySection})) || [
    {text:quote,cite:figure.kind==='competency'?'The Irreducible Officer, Section V, Appropriate Reliance as a Teachable Competency':'The Irreducible Officer, Section II, What the Problem Looks Like',section:figure.essaySection},
    ...(page.quote2?[{text:page.quote2,cite:page.cite2,section:'vi-friction-as-developmental-design'}]:[])
  ];
  return entries.map(q=>{
    if(!q.section) throw new Error('Missing quotation section');
    return `<blockquote><p>${(q.paras||[q.text]).map(text=>renderEssayQuote(root,text)).join('</p><p>')}</p><cite><a href="/#${escape(q.section)}">${runtimeData(root).rich(q.cite)}</a></cite></blockquote>`;
  }).join('');
}
export function figureInputs(root,slug) {
  const fonts=readJSON(join(root,'figures/fonts/manifest.json'));
  return ['package-lock.json','figures/manifest.json','figures/casts.json','figures/runtime/motion.js','figures/runtime/figure.css','figures/page.js',
    ...['js','css'].map(ext=>`figures/${slug}/${slug}.${ext}`),...['player.html','nameplate.json','editions/pme.json','editions/business.json'].map(p=>`figures/${slug}/${p}`),
    'styles/figure-page.css','styles/masthead.css','scripts/figure-pages.mjs','scripts/figure-posters.mjs','scripts/generate-figure-posters.mjs','scripts/figure-assets.mjs','scripts/figure-fonts.mjs',
    ...['manifest.json','fonts.css','google-fonts.css',...Object.values(fonts.resources).map(x=>x.file)].map(p=>`figures/fonts/${p}`)];
}
export function publishFigureAssets(root,out,manifest) {
  const fonts=readJSON(join(root,'figures/fonts/manifest.json')); loadFontLock(join(root,'figures/fonts/manifest.json'));
  const files=['runtime/motion.js','runtime/figure.css','page.js','fonts/fonts.css',...Object.values(fonts.resources).map(x=>'fonts/'+x.file),...Object.values(fonts.licenses).map(x=>'fonts/'+x.file),...manifest.figures.flatMap(f=>[`${f.slug}/${f.slug}.js`,`${f.slug}/${f.slug}.css`])];
  const assets=writeFigureAssets({sourceDir:join(root,'figures'),outputDir:join(out,'assets/figures'),files});
  for(const license of Object.values(fonts.licenses)) if(assets['fonts/'+license.file].sha256!==license.sha256) throw new Error('Font license differs from pinned source');
  for(const file of ['figure-page.css','masthead.css']) {
    const bytes=readFileSync(join(root,'styles',file)); mkdirSync(join(out,'assets'),{recursive:true}); writeFileSync(join(out,'assets',file),bytes);
    assets[file]={url:`/assets/${file}?v=${sha256(bytes)}`,sha256:sha256(bytes)};
  }
  return assets;
}
export function playerMarkup(root,figure,edition,poster) {
  const rich=runtimeData(root).rich;
  let html=readFileSync(join(root,'figures',figure.slug,'player.html'),'utf8').replace('class="mf"',`class="mf" data-edition-id="${edition.id}" data-cast="${edition.castId}"`);
  const pathGet=path=>path.split('.').reduce((o,k)=>o?.[k],edition) || '';
  html=html.replace(/(<([a-z]+)[^>]*\sdata-ed(?:-rich)?="([^"]+)"[^>]*>)(<\/\2>)/g,(_,open,tag,path,close)=>open+(open.includes('data-ed-rich')?rich(pathGet(path)):escape(pathGet(path)))+close);
  const plate=edition.nameplate;
  const nameDetail=`the name, "${plate.name}", appears large over the stage with "${plate.kicker}" above it, then moves into the top-left corner, where it stays.`;
  const beats=[{index:-1,text:`${plate.name} · ${plate.kicker}`,detail:nameDetail},...edition.beats.map((b,i)=>({...b,index:i,text:b.list||b.text}))];
  const list=beats.map(b=>`<li data-mf-beat-index="${b.index}"${b.index===-1?' class="mf-namebeat"':''}><span class="mf-n" aria-hidden="true">${b.index+1}</span><span class="mf-text">${escape(b.text)}</span><p class="mf-detail"><span class="mf-detail-label">On screen:</span> ${escape(b.detail)}</p></li>`).join('\n');
  html=html.replace('aria-label="Beats"></ol>',`id="figure-beats" aria-label="Beats">${list}</ol>`);
  if(!edition.page.teacherNote) html=html.replace(/<aside class="fc-teacher"[\s\S]*?<\/aside>/,'');
  if(poster) html=html.replace('<div class="mf-shot"',`<div class="figure-fallback"><img class="figure-poster" src="${escape(poster.url)}" width="${poster.width}" height="${poster.height}" alt="${escape(edition.nameplate.definition)}"><p><a href="#figure-beats" data-read-figure>Read the figure</a></p></div>\n<div class="mf-shot"`);
  return figure.kind==='competency'?gateRelianceMarkup(html,edition):html;
}
function shell({title,description,path,siteUrl,release,assets,body,head='',scripts='',analytics='',bodyClass=''}) {
  const canonical=new URL(path,siteUrl).href;
  return `<!doctype html><html lang="en" data-ed-gate><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)} | Judgment Lab</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${escape(canonical)}"><meta property="og:type" content="article"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(canonical)}"><link rel="stylesheet" href="${assets['fonts/fonts.css'].url}"><link rel="stylesheet" href="${assets['figure-page.css'].url}"><link rel="stylesheet" href="${assets['masthead.css'].url}">${head}${analytics}</head><body class="${escape(bodyClass)}"><a class="skip-link" href="#main">Skip to content</a><header class="lab-masthead" aria-label="Judgment Lab"><div class="masthead-inner"><a class="package-brand" href="/#overview">Judgment Lab<span class="brand-period" aria-hidden="true">.</span></a><p class="brand-purpose">Strengthening human judgment in AI-enabled work.</p></div></header><nav class="figure-nav" aria-label="Learning paths"><a href="/#overview">Learn</a><a href="/#discuss">Discuss</a><a href="/#companion">Practice</a><a href="/#workbench">Design</a><a href="/#sources">References</a></nav><main class="fig-page" id="main" tabindex="-1">${body}</main><footer class="lab-footer"><a href="/#overview">Judgment Lab</a><p>Strengthening human judgment in AI-enabled work.</p><a href="/#sources">Explore the evidence and its limits</a><p class="lab-version">Version ${escape(release.version)} · ${escape(release.commits.site)}</p></footer>${scripts}</body></html>`;
}
// Source figure-to-figure links retain the current static setting.
export function figureLink(manifest,variant,href) {
  const relative=href.match(/^\.\.\/([a-z-]+)\/(?:\?edition=(?:business|pme)(?:&cast=(?:workplace|classroom|high-school|seminar))?)?$/);
  if(relative) {
    const target=manifest.figures.find(f=>f.slug===relative[1]);
    if(!target) throw new Error(`Unpublished figure link: ${href}`);
    return figurePath(target,variant);
  }
  if(href.startsWith('https://judgmentlab.net/')) return href.slice('https://judgmentlab.net'.length);
  if(!href.startsWith('https://')) throw new Error(`Unsupported figure link: ${href}`);
  return href;
}
export function renderFigureText(root,manifest,variant,text) {
  const rich=runtimeData(root).rich;
  return String(text??'').split(/(\[[^\]]+\]\([^)\s]+\))/).map(part=>{
    const link=part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    return link?`<a href="${escape(figureLink(manifest,variant,link[2]))}">${rich(link[1])}</a>`:rich(part);
  }).join('');
}
// Answers are available for deliberate reading, but never pre-rendered as live
// interactive text. Template content is absent from find and accessibility trees.
const inertFragment = html => `<template data-ar-fragment>${html}</template>`;
export function gateRelianceMarkup(html, edition) {
  html=html.replace(/(<li data-mf-beat-index="(\d+)"[^>]*>)([\s\S]*?)(<\/li>)/g,(_,open,index,body,close)=>{
    if(+index<3)return open+body+close;
    body=body.replace(/(<span class="mf-text")>([\s\S]*?)<\/span>/,(_,tag,text)=>`${tag} data-ar-inert>${inertFragment(text)}</span>`);
    body=body.replace(/(<p class="mf-detail")>([\s\S]*?)<\/p>/,(_,tag,text)=>`${tag} data-ar-inert>${inertFragment(text)}</p>`);
    return open.replace(/>$/,' class="is-locked">')+body+`<span class="ar-locked">${escape(edition.gates.locked)}</span>`+close;
  });
  return html.replace(/(<p[^>]*data-ar-sum[23][^>]*>)([\s\S]*?)(<\/p>)/g,(_,open,text,close)=>open.replace(/>$/,' data-ar-inert>')+inertFragment(text)+close);
}
export function relianceReadingMarkup(root,ed,poster) {
  const rich=runtimeData(root).rich,p=ed.page;
  const beats=(start,end)=>`<ol start="${start+1}">${ed.beats.slice(start,end).map(b=>`<li><p>${rich(b.list||b.text)}</p><p>${rich(b.detail)}</p></li>`).join('')}</ol>`;
  return `<section class="ar-reading-version"><h2>Read the question and results</h2><p>This reading version presents the figure’s questions, results and reasoning. It does not record your choices.</p>${poster?`<img class="figure-poster" src="${escape(poster.url)}" width="${poster.width}" height="${poster.height}" alt="${escape(p.printCaption)}">`:''}<p>${rich(p.srSummary[0])}</p>${beats(0,3)}<details><summary>After the first question: results and the next question</summary><p>${rich(p.srSummary[1])}</p>${beats(3,8)}</details><details><summary>After the second question: results and reasoning</summary><p>${rich(p.srSummary[2])}</p>${beats(8,10)}${p.after.map(item=>`<h3>${escape(item.heading)}</h3><p>${renderEssayQuote(root,item.text)}</p>`).join('')}${poster?`<img class="figure-poster" src="${escape(poster.final)}" alt="${escape(ed.nameplate.definition)}">`:''}</details></section>`;
}
export function relianceAssociatedMarkup(root,ed) {
  const p=ed.page,rich=runtimeData(root).rich;
  return `<div class="ar-printq" data-ar-printq data-ar-owned aria-hidden="true"><p class="ar-printq-plate">${escape(ed.nameplate.name)} · ${escape(ed.nameplate.kicker)}</p><p class="fig-kicker">${escape(p.printKicker)}</p><div data-ar-printq-svg></div><p class="ar-printq-cap">${escape(p.printCaption)}</p></div><article class="figure-reading" id="figure-reading"><section><h2>${escape(p.checkHeading)}</h2>${p.checkLines.map(x=>`<p class="figure-check">${rich(x)}</p>`).join('')}${(p.checkLinesAfter||[]).map((line,i)=>`<p class="figure-check" data-ed="page.checkLines.${p.checkLines.length+i}" data-ar-inert data-ar-owned data-ar-check-after>${inertFragment(escape(line))}</p>`).join('')}</section><section><h2>${escape(p.howHeading)}</h2><p>${rich(p.how)}</p><p class="figure-setting-note">PME means professional military education. Its example comes from <em>The Irreducible Officer</em>, the National War College essay.</p></section><p class="ar-after-locked" data-ar-after-locked data-ar-owned>${escape(p.afterLocked)}</p><details class="ar-after" data-ar-after data-ar-owned data-ar-inert hidden>${inertFragment(`<summary>${escape(p.afterSummary)}</summary>${p.after.map(item=>`<h3>${escape(item.heading)}</h3><p class="fig-follow">${renderEssayQuote(root,item.text)}</p>`).join('')}`)}</details></article>`;
}
function renderReliancePage({root,figure,variant,manifest,assets,siteUrl,release,quote,poster,receipt,analytics='',reading=false}) {
  const ed=resolveFigure(root,figure,variant),p=ed.page,rich=runtimeData(root).rich;
  const route=figurePath(figure,variant),path=reading?route+'reading/':route;
  const routes=manifest.variants.map(v=>({...v,path:figurePath(figure,v)}));
  const switches=routes.map(r=>`<a href="${r.path}${reading?'reading/':''}"${r.id===variant.id?' aria-current="page"':''}>${r.id==='classroom'?'Higher education':r.label}</a>`).join('');
  const links=p.links.filter(l=>!figure.unpublishedLinks.includes(l.href)).map(l=>`<li>${escape(l.lead)} <a href="${escape(figureLink(manifest,variant,l.href))}">${escape(l.text)}</a></li>`).join('');
  const intro=`<header class="ar-page-intro"><h1>${escape(p.title)}</h1><nav class="figure-switch" aria-label="Figure setting">${switches}</nav><p>${rich(p.setup)}</p></header>`;
  const after=`<section class="figure-reading"><h2>${variant.id==='pme'?'From the essay':'From the original PME essay'}</h2>${essayQuoteMarkup(root,figure,p,quote)}<section><h2>${escape(p.linksHeading)}</h2><ul>${links}</ul>${p.linksNote?`<p>${rich(p.linksNote)}</p>`:''}<p><a href="/failure-modes/">Explore the seven failure modes</a></p></section></section>`;
  const readingText=relianceReadingMarkup(root,ed,poster);
  const body=intro+(reading?`<p><a href="${route}">Open the interactive figure</a></p>${readingText}${after}`:`<div data-figure-instance>${playerMarkup(root,figure,ed,poster)}<p class="figure-load-error" data-figure-status hidden>The interactive figure could not load. <a href="${route}reading/">Read the question and results</a>.</p><p class="figure-duration">About 2 minutes of playback, plus time for your calls. <a href="${route}reading/">Read the question and results</a>.</p>${relianceAssociatedMarkup(root,ed)}${after}<noscript>${readingText}</noscript></div>`);
  const title=`${ed.nameplate.pageTitle} — ${variant.label}${reading?' — Reading version':''}`;
  const structured=[{'@context':'https://schema.org','@type':'LearningResource',name:title,description:p.description,url:new URL(path,siteUrl).href,image:new URL(poster.og,siteUrl).href,inLanguage:'en',learningResourceType:reading?'Reading exercise':'Interactive figure'},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Judgment Lab',item:new URL('/',siteUrl).href},{name:ed.nameplate.name,item:new URL(route,siteUrl).href}].map((x,i)=>({'@type':'ListItem',position:i+1,...x}))}];
  const head=`<link rel="stylesheet" href="${assets['runtime/figure.css'].url}"><link rel="stylesheet" href="${assets[`${figure.slug}/${figure.slug}.css`].url}"><meta property="og:image" content="${escape(new URL(poster.og,siteUrl).href)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${jsonScript(structured)}</script>`;
  const scripts=reading?'':`<script id="figure-data" type="application/json">${jsonScript({edition:ed,routes})}</script><script defer src="${assets['runtime/motion.js'].url}"></script><script defer src="${assets[`${figure.slug}/${figure.slug}.js`].url}"></script><script defer src="${assets['page.js'].url}"></script>`;
  return shell({title,description:p.description,path,siteUrl,release,assets,body,head,scripts,analytics,bodyClass:'ar-page-shell'});
}

export function renderFigurePage({root,figure,variant,manifest,assets,siteUrl,release,quote,poster,receipt,analytics=''}) {
  if(figure.kind==='competency')return renderReliancePage({root,figure,variant,manifest,assets,siteUrl,release,quote,poster,receipt,analytics});
  const ed=resolveFigure(root,figure,variant),p=ed.page,rich=runtimeData(root).rich,path=figurePath(figure,variant);
  const routes=manifest.variants.map(v=>({...v,path:figurePath(figure,v)}));
  const classroom=variant.id==='high-school'?'high-school':'classroom';
  const switches=['workplace',classroom,'pme'].map(id=>{const r=routes.find(v=>v.id===id);return `<a href="${r.path}"${r.id===variant.id?' aria-current="page"':''}>${id==='high-school'?'Classroom':r.label}</a>`;}).join('<span aria-hidden="true">·</span>');
  if(variant.id==='pme' && p.quote && p.quote!==quote) throw new Error('Figure quote differs from canonical essay');
  const image=new URL(poster.og,siteUrl).href;
  const title=`${ed.nameplate.pageTitle} — ${variant.label}`;
  const structured=[{'@context':'https://schema.org','@type':'LearningResource',name:title,description:p.description,url:new URL(path,siteUrl).href,image,inLanguage:'en',learningResourceType:'Animated figure',timeRequired:`PT${receipt.finalTime}S`,audience:{'@type':'Audience',audienceType:variant.id==='pme'?'Professional military education':variant.id==='classroom'?'Higher education':variant.id==='high-school'?'High-school educators':'Workplace'}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Judgment Lab',item:new URL('/',siteUrl).href},{name:'AI failure modes',item:new URL('/failure-modes/',siteUrl).href},{name:ed.nameplate.name,item:new URL(path,siteUrl).href}].map((x,i)=>({'@type':'ListItem',position:i+1,...x}))}];
  const links=p.links.filter(l=>!figure.unpublishedLinks.includes(l.href)).map(l=>`<li>${escape(l.lead)} <a href="${escape(figureLink(manifest,variant,l.href))}">${escape(l.text)}</a></li>`).join('');
  const duration=`${Math.floor(receipt.finalTime/60)}:${String(Math.floor(receipt.finalTime%60)).padStart(2,'0')}`;
  const body=`<nav class="figure-crumb" aria-label="Breadcrumb"><a href="/failure-modes/">AI failure modes</a> / ${escape(p.title)}</nav><header class="figure-intro"><p class="fig-kicker">${escape(p.kicker)}</p><h1>${escape(p.title)}</h1><nav class="figure-switch" aria-label="Figure setting">${switches}</nav><p class="figure-setting-note">PME means professional military education. The Classroom version is also available for high school.</p>${['classroom','high-school'].includes(variant.id)?`<nav class="figure-variant-links" aria-label="Classroom version"><a href="${routes[1].path}"${variant.id==='classroom'?' aria-current="page"':''}>Higher education</a><a href="${routes[2].path}"${variant.id==='high-school'?' aria-current="page"':''}>High school</a></nav>`:''}<p>${rich(p.setup)}</p>${p.editionNote?`<p class="figure-setting-note">${rich(p.editionNote===true?"PME (professional military education): the original example from *The Irreducible Officer*, the National War College essay.":p.editionNote)}</p>`:''}<p class="figure-duration">${duration} · <a href="#figure-beats" data-read-figure>Read the figure</a></p></header><p class="figure-load-error" data-figure-status hidden>The animation could not load. You can read every beat below.</p>${playerMarkup(root,figure,ed,poster)}<article class="figure-reading" id="figure-reading"><section><h2>${escape(p.checkHeading)}</h2>${p.checkLines.map(x=>`<p class="figure-check">${rich(x)}</p>`).join('')}<p>${renderFigureText(root,manifest,variant,p.checkFollow)}</p>${p.about?`<p><strong>${rich(p.about.lead)}</strong> ${rich(p.about.text)}</p>`:''}</section>${p.study?`<section><h2>${escape(p.studyHeading)}</h2>${p.study.map(x=>`<p>${rich(x)}</p>`).join('')}</section>`:''}${p.evidence?`<section><h2>${escape(p.evidenceHeading)}</h2>${p.evidence.map(x=>`<p>${rich(x)}</p>`).join('')}${p.evidenceList?`<ul>${p.evidenceList.map(x=>`<li>${renderEssayQuote(root,x)}</li>`).join('')}</ul>`:''}</section>`:''}<section><h2>${variant.id==='pme'?'From the essay':'From the original PME essay'}</h2>${essayQuoteMarkup(root,figure,p,quote)}</section>${p.evidenceText?`<section><h2>${escape(p.evidenceHeading)}</h2><p>${renderLinked(root,p.evidenceText)}</p></section>`:''}<section><h2>${escape(p.linksHeading)}</h2><ul>${links}</ul>${p.linksNote?`<p>${rich(p.linksNote)}</p>`:''}<p><a href="/failure-modes/">All failure modes</a></p></section></article>`;
  const head=`<link rel="stylesheet" href="${assets['runtime/figure.css'].url}"><link rel="stylesheet" href="${assets[`${figure.slug}/${figure.slug}.css`].url}"><meta property="og:image" content="${escape(image)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${jsonScript(structured)}</script>`;
  const scripts=`<script id="figure-data" type="application/json">${jsonScript({edition:ed,routes})}</script><script defer src="${assets['runtime/motion.js'].url}"></script><script defer src="${assets[`${figure.slug}/${figure.slug}.js`].url}"></script><script defer src="${assets['page.js'].url}"></script>`;
  return shell({title,description:p.description,path,siteUrl,release,assets,body,head,scripts,analytics});
}
export function buildFigurePages({root,distDir,siteUrl,release,essayMarkdown,sourceSpineMarkdown,analytics}) {
  const manifest=loadFigures(root),assets=publishFigureAssets(root,distDir,manifest),pages=[],cards=[];
  for(const figure of manifest.figures) {
    const quote=quoteFor(figure,essayMarkdown),inputs=figureInputs(root,figure.slug);
    if(figure.slug==='frame-capture') {
      const study=sourceSpineMarkdown.split('\n').find(l=>l.startsWith('- Obermeyer,')) || '';
      for(const expected of ['17.7 to 46.5%','predicts health care costs rather than illness','no generative AI involved']) if(!study.includes(expected)) throw new Error(`Frame-capture evidence boundary changed: ${expected}`);
    }
    if(figure.slug==='fluency-substitution') {
      const study=sourceSpineMarkdown.split('\n').find(l=>l.startsWith('- Autor et al.,')) || '';
      for(const expected of ['133 patent lawyers','91 lawyers who completed','0.32 standard deviations overall','concentrated entirely among the senior lawyers','showed no average gain','does not answer why','Google conducted the study']) if(!study.includes(expected)) throw new Error(`Fluency-substitution evidence boundary changed: ${expected}`);
    }
    if(figure.slug==='premature-synthesis') {
      const study=sourceSpineMarkdown.split('\n').find(l=>l.startsWith('- Shen & Tamkin,')) || '';
      for(const expected of ['52 developers','17% score difference','no significant speed gain','did not pre-register','Generation-Then-Comprehension (two people, 86%','Conceptual Inquiry (seven people, 65%','AI Delegation (four people, 39%','quiz straight after','groups of two to seven']) if(!study.includes(expected)) throw new Error(`Premature-synthesis evidence boundary changed: ${expected}`);
    }
    if(['uncalibrated-reliance','appropriate-reliance'].includes(figure.slug)) {
      const study=sourceSpineMarkdown.split('\n').find(l=>l.startsWith('- Otis,')) || '';
      for(const expected of ['no detectable average change','nearly 10% worse','may have benefited by over 15%','0.20-standard-deviations','advice that entrepreneurs chose to implement','exploratory','effect sizes differ']) if(!study.includes(expected)) throw new Error(`Uncalibrated-reliance evidence boundary changed: ${expected}`);
      const frontier=sourceSpineMarkdown.split('\n').find(l=>l.startsWith("- Dell'Acqua, Mollick,")) || '';
      for(const expected of ['84.5%','70.6%','60%','19 percentage points','regardless of the correctness','10% level']) if(!frontier.includes(expected)) throw new Error(`Frontier evidence boundary changed: ${expected}`);
    }
    if(figure.slug==='invisible-delegation') {
      const study=sourceSpineMarkdown.split('\n').find(l=>l.startsWith('- Lee, Sarkar,')) || '';
      for(const expected of ['319 knowledge workers','936 first-hand examples','self-reported','correlations',"each quote is one participant's",'Microsoft Research and Carnegie Mellon University']) if(!study.includes(expected)) throw new Error(`Invisible-delegation evidence boundary changed: ${expected}`);
    }
    if(figure.slug==='institutional-monoculture') {
      const boundaries=[['- Romasanta,',['The summary names no strategies','press coverage','Practitioner article']],['- Bottesch,',['99 knowledge workers','one company','abstract only','no effect sizes','None of the three tasks was strategy work']],['- Counter-evidence: Terwiesch',['personas','diversity']]];
      for(const [prefix,terms] of boundaries) {
        const study=sourceSpineMarkdown.split('\n').find(l=>l.startsWith(prefix))||'';
        for(const term of terms)if(!study.includes(term))throw new Error(`Monoculture evidence boundary changed: ${term}`);
      }
    }
    if(figure.slug==='responsibility-laundering') {
      const study=sourceSpineMarkdown.split('\n').find(l=>l.startsWith('- Moffatt v. Air Canada,'))||'';
      for(const term of ['$812.02','$650.88','one small-claims decision',"don't read it as precedent",'nothing to say about staff who sign a recommendation','did not provide any information about the nature of its chatbot']) if(!study.includes(term))throw new Error(`Responsibility-laundering evidence boundary changed: ${term}`);
    }
    for(const variant of manifest.variants) {
      const ed=resolveFigure(root,figure,variant);
      if(ed.page.quote2) checkedEssayExcerpt(ed.page.quote2,essayMarkdown);
      for(const q of ed.page.quotes||[]) checkQuotation(q,essayMarkdown);
      const dir=join(root,'media/figures',figure.slug,variant.id),receipt=readJSON(join(dir,'manifest.json'));
      assertPosterReceipt(receipt,{root,inputs,outputDir:dir,variant:variant.id});
      const base=`/media/figures/${figure.slug}/${variant.id}`;
      for(const file of ['poster.png','final.png','og.png']) { const dest=join(distDir,base,file);mkdirSync(dirname(dest),{recursive:true});copyFileSync(join(dir,file),dest); }
      const poster={final:`${base}/final.png?v=${receipt.outputs['final.png'].sha256}`,url:`${base}/poster.png?v=${receipt.outputs['poster.png'].sha256}`,og:`${base}/og.png?v=${receipt.outputs['og.png'].sha256}`,...receipt.outputs['poster.png']};
      const path=figurePath(figure,variant),dest=join(distDir,path,'index.html');mkdirSync(dirname(dest),{recursive:true});
      writeFileSync(dest,renderFigurePage({root,figure,variant,manifest,assets,siteUrl,release,quote,poster,receipt,analytics}));pages.push(path);
      if(figure.kind==='competency') { const readingPath=path+'reading/';mkdirSync(join(distDir,readingPath),{recursive:true});writeFileSync(join(distDir,readingPath,'index.html'),renderReliancePage({root,figure,variant,manifest,assets,siteUrl,release,quote,poster,receipt,analytics,reading:true}));pages.push(readingPath); }
      if(variant.id==='workplace' && figure.kind==='failure-mode') {const ed=resolveFigure(root,figure,variant);cards.push(`<li><a href="${path}" tabindex="-1" aria-hidden="true"><img src="${poster.url}" width="${poster.width}" height="${poster.height}" alt=""></a><div><h2><a href="${path}">${escape(ed.page.title)}</a></h2><p>${escape(ed.nameplate.definition)}</p><p class="figure-check">${escape(ed.check.question)}</p><a href="${path}">Open the figure</a></div></li>`);}
    }
  }
  const warmup=manifest.figures.find(f=>f.kind==='competency');
  const warmupMarkup=warmup?`<section class="figure-reading"><h2>Appropriate reliance</h2><p>Make a call about where to rely on AI, then inspect the reasons.</p><a href="${figurePath(warmup,manifest.variants[0])}">Try the warm-up</a></section>`:'';
  const body=`<h1>AI failure modes</h1><p class="figure-intro figure-description">Watch how AI can shape a problem and the work that follows. Each figure includes questions to use when reviewing that work.</p><ol class="figure-index">${cards.join('')}</ol>${warmupMarkup}`;
  mkdirSync(join(distDir,'failure-modes'),{recursive:true});writeFileSync(join(distDir,'failure-modes/index.html'),shell({title:'AI failure modes',description:'Animated examples and questions for reviewing AI-enabled work.',path:'/failure-modes/',siteUrl,release,assets,body,analytics}));
  const urls=['/','/failure-modes/',...pages];
  writeFileSync(join(distDir,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(p=>`<url><loc>${escape(new URL(p,siteUrl).href)}</loc></url>`).join('')}</urlset>`);
  writeFileSync(join(distDir,'assets/figures/manifest.json'),JSON.stringify({pages,assets},null,2)+'\n');
  return pages;
}

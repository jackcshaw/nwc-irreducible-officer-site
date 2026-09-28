import vm from "node:vm";
import assert from "node:assert/strict";
import {readFileSync, existsSync} from "node:fs";
import {join} from "node:path";
import {createHash} from "node:crypto";
const root=process.cwd(), dist=join(root,"dist");
const companion=process.env.COMPANION_REPO_PATH || join(root,"../companion");
const read=p=>readFileSync(join(dist,p),"utf8");
const html=read("index.html"), bundle=read("assets/companion-context.md"), lab=read("assets/judgment-lab-interactive-context.md"), workbench=read("assets/workbench-context.md");
const catalog=JSON.parse(readFileSync(join(companion,"audiences/catalog.json"),"utf8"));
assert.deepEqual(catalog.map(a=>a.id),["pme","he","k12"]);
for(const a of catalog){
  assert(html.includes('id="panel-'+a.id+'"'),a.id+" view missing");
  assert(html.includes('<option value="'+a.id+'">'),a.id+" selector option missing");
  const source=readFileSync(join(companion,"audiences",a.file),"utf8");
  assert.equal(read("assets/audiences/"+a.file),source,a.id+" guide stale");
  assert(bundle.includes(source.trim()),a.id+" missing from companion");
  assert(lab.includes(source.trim()),a.id+" missing from lab");
}
const tools=JSON.parse(read("assets/workbench-data.json")).tools;
assert.equal(tools.length,10);
for(const t of tools){
 assert.equal(read("assets/workbench/"+t.filename).trim(),t.markdown.trim(),t.id+" copy/download mismatch");
 assert(t.markdown.includes("## Audience and readiness"),t.id+" missing audience adaptation");
 assert(t.markdown.includes("**This template in your setting:**"),t.id+" missing specific guidance");
 assert(workbench.includes('## Audience and readiness'),"workbench bundle missing adaptation");
}
const ids=[...html.matchAll(/\bid="([^"\s]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,"Duplicate static IDs");
for(const m of html.matchAll(/(?:href|src)="(assets\/[^"#?]+)(?:[?#][^"]*)?"/g)) assert(existsSync(join(dist,m[1])),"Missing linked asset "+m[1]);
assert.equal(read("assets/essay.md").trim(),readFileSync(join(root,"content/the-irreducible-officer.md"),"utf8").trim());
for(const [file,sha] of [...lab.matchAll(/\| `([^`]+)` \| `([a-f0-9]{64})` \|/g)].map(m=>[m[1],m[2]])) {
 assert.equal(createHash("sha256").update(readFileSync(join(companion,file))).digest("hex"),sha,"Stale lab source "+file);
}
const release=JSON.parse(read("assets/release.json"));
assert.equal(release.companionSections,(bundle.match(/^# ===== SECTION:/gm)||[]).length);
assert.equal(release.workbenchSections,(workbench.match(/^# ===== SECTION:/gm)||[]).length);
assert(!html.includes("Every template also works on paper"));
console.log("audience contract passed: 3 views, 10 templates, source parity, assets, IDs, and manifest");

// Execute the shipped routing function against direct-entry URLs, not a duplicate implementation.
const routing = html.match(/function setMode\([\s\S]+?\n}\n/)[0];
for (const id of ["pme","he","k12"]) {
  let current = new URL("https://judgmentlab.net/#"+id), selected;
  const context={URL, audienceLabels:{pme:"PME",he:"HE",k12:"high school"},
    get location(){return current;}, history:{pushState(_a,_b,url){current=new URL(url,current);},replaceState(_a,_b,url){current=new URL(url,current);}},
    applyAudience(value){selected=value;}, activeMode:"overview", document:{body:{dataset:{}}}, buttons:[],views:[],
    window:{scrollTo(){}},smoothBehavior(){return "auto";},trackPackageEvent(){},eventLabelFromMode(x){return x;},invalidateTocGeometry(){},selectEssayRail(){},ensureWorkbenchData(){return Promise.resolve();}};
  vm.runInNewContext(routing+';setMode("'+id+'",false);setMode("companion",true,true);',context);
  assert.equal(current.searchParams.get("audience"),id,"Direct audience link loses setting");
  assert.equal(selected,id,"Prompt audience does not follow route");
  assert.equal(current.hash,"#companion");
}
console.log("direct audience handoff regression passed");

// Full audience contract: the screen, template copy, downloads and context agree.
const wbData=JSON.parse(read('assets/workbench-data.json'));
const wbRoot=process.env.WORKBENCH_REPO_PATH || join(root,'../workbench');
const profiles=JSON.parse(readFileSync(join(wbRoot,'audiences/profiles.json'),'utf8'));
for (const p of profiles) {
 const v=wbData.audiences[p.id], ctx=read('assets/workbench-context-'+p.id+'.md');
 assert.equal(v.tools.length,10);
 assert.equal(v.bundle.sectionCount,(ctx.match(/^# ===== SECTION:/gm)||[]).length);
 assert.equal(release.workbenchAudienceSections[p.id],v.bundle.sectionCount);
 assert.equal(ctx.trim(),v.bundle.text.trim());
 assert(ctx.includes('SECTION: AUDIENCE '+p.id.toUpperCase()));
 assert(ctx.includes(v.framework.trim()));
 assert(ctx.includes(v.guide.trim()));
 for(const key of ['status','readiness','responsibility','facts','baseline','change','record','trial']) assert(v.guide.includes(p[key]),p.id+' guide/profile disagreement: '+key);
 assert.equal(p.rows.length,6);
 for(const row of p.rows) for(const cell of row) {assert(v.framework.includes(cell));assert(v.guide.includes(cell));}
 for(const t of v.tools) {
  assert.equal(read(t.downloadPath).trim(),t.markdown,p.id+' copy/download mismatch: '+t.id);
  assert(ctx.includes(t.markdown),p.id+' bundle missing '+t.id);
  assert(t.markdown.includes(p.tools[t.filename.replace(/\.md$/,'')].guidance));
  assert(t.markdown.includes(p.responsibility));
  assert(t.html.includes(p.case));
  assert(!t.markdown.includes('awaiting NWC validation'));
  if(p.id!=='pme') assert(!/commander|adversary|NWC policy/.test(t.markdown));
  // Every generated template link resolves, including standalone use outside the site.
  for (const m of t.markdown.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
    const url=new URL(m[1]); if(url.pathname.startsWith('/assets/')) assert(existsSync(join(dist,url.pathname.slice(1))), 'Broken adapted template link: '+m[1]);
  }
 }
 assert(read('assets/workbench/'+p.id+'/reference-matrix.svg').includes(p.label+' reference matrix'));
}
assert(!read('assets/asking-to-supervising.svg').includes('Every learner becomes a capable supervisor'));
assert(!JSON.stringify(wbData).includes('awaiting NWC validation'));
assert(wbData.audiences.he.tools.find(t=>t.id==='assessment').markdown.includes('what productivity should mean'));
{ const k12Assessment=wbData.audiences.k12.tools.find(t=>t.id==='assessment').markdown;
  assert(k12Assessment.includes('success by what standard, and for whom'));
  assert(!/an oral defense|faculty member/.test(k12Assessment),'k12 rubric kept PME/HE wording');
  assert(k12Assessment.includes('a short explanation') && k12Assessment.includes('teacher'),'k12 wording swap did not land'); }
assert(wbData.audiences.pme.tools.find(t=>t.id==='assessment').markdown.includes('Causal interpretation'));

{ const pairs={pme:['PME outage attribution','PME exercise-window rollback'],he:['Campus shuttle survey','Return-to-office research memo'],k12:['Asphalt vs. shaded grass','"Was the New Deal a success?"']};
  for(const [id,own] of Object.entries(pairs)){
    const md=wbData.audiences[id].tools.find(t=>t.id==='frame-check').markdown;
    for(const name of own) assert(md.includes(name),id+' Frame Check missing its primer: '+name);
    for(const [other,names] of Object.entries(pairs)) if(other!==id) for(const name of names) assert(!md.includes(name),id+' Frame Check leaks '+other+' primer: '+name);
    assert(!md.includes('frame-check:primer'),id+' Frame Check still has primer markers');
  } }
{ const base=wbData.tools.find(t=>t.id==='frame-check');
  assert(!base.html.includes('frame-check:primer'),'no-audience Frame Check html shows primer markers');
  assert(!base.markdown.includes('frame-check:primer'),'no-audience Frame Check markdown keeps primer markers');
  assert(!read('assets/workbench/frame-check.md').includes('frame-check:primer'),'flat Frame Check download keeps primer markers');
  for (const name of ['PME outage attribution','Campus shuttle survey','Asphalt vs. shaded grass']) assert(base.markdown.includes(name),'no-audience Frame Check lost a primer: '+name); }

// Execute the shipped audience handler with the actual data and prompts.
const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
new vm.Script(script); // Parse all client code, including unexecuted branches.
const profileDecl=script.match(/const workbenchProfiles = ([^\n]+);/)[1];
const promptDecl=script.match(/const workbenchPrompts = ([^\n]+);/)[1];
const applyCode=script.match(/function applyAudience\([\s\S]+?\n}\n/)[0];
const elements=Object.fromEntries(['lab-audience','workbench-title','workbench-summary','workbench-setting-status','workbench-context-download'].map(id=>[id,{}]));
const prompt={id:'workbench-setup-prompt',textContent:''};
const panels=profiles.map(p=>({dataset:{workbenchAudience:p.id},hidden:true}));
const context={URL,location:new URL('https://test.example/?audience=he#workbench'),workbenchProfiles:JSON.parse(profileDecl),workbenchPrompts:JSON.parse(promptDecl),audienceLabels:{pme:'PME',he:'higher education',k12:'high school'},currentWorkbenchAudience:'',markSetting(){},promptBases:new Map([[prompt,'generic prompt']]),refreshWorkbench(){},document:{getElementById(id){return elements[id];},querySelectorAll(sel){return sel==='[data-workbench-audience]'?panels:[];}}};
vm.runInNewContext(applyCode,context);
for(const p of [...profiles,profiles[0]]) {
 context.applyAudience(p.id);
 assert.equal(elements['workbench-title'].textContent,p.title);
 assert.equal(elements['workbench-context-download'].href,'assets/workbench-context-'+p.id+'.md');
 assert(prompt.textContent.includes('/assets/workbench-context-'+p.id+'.md'));
 assert(prompt.textContent.includes('it should be '+wbData.audiences[p.id].bundle.sectionCount));
 assert.deepEqual(panels.filter(x=>!x.hidden).map(x=>x.dataset.workbenchAudience),[p.id]);
}
context.applyAudience('unknown');
assert.equal(elements['workbench-context-download'].href,'assets/workbench-context.md');
assert.equal(prompt.textContent,'generic prompt');
console.log('workbench audience contract passed: 30 adapted templates, 3 matrices, bundles, links, and live audience handler');

assert(html.includes("assets/workbench-data.json?v="+createHash("sha256").update(read("assets/workbench-data.json")).digest("hex").slice(0,16)),"Workbench data cache key must match content");

// The five user-facing paths are distinct; the original essay remains reachable under Learn.
const navLabels=[...html.matchAll(/id="tab-[^"]+"[^>]+>([^<]+)<\/button>/g)].map(m=>m[1]);
assert.deepEqual(navLabels,["Learn","Discuss","Practice","Design","References"]);
assert(html.includes('aria-label="The Irreducible Officer"'));
assert(html.includes('Strengthening human judgment in AI-enabled work.'));
const claims=JSON.parse(readFileSync(join(root,'content/discussion-claims.json'),'utf8')).claims;
assert.equal(claims.length,5);
for(const c of claims) {
 assert(html.includes('id="discuss-'+c.id+'"'));
 assert(html.includes(c.objection));
 assert(c.sources.length>0);
 for(const source of c.sources) { assert(html.includes(source.href));assert(!source.label.includes(' · '),'Merged discussion evidence links'); }
}
context.location = new URL('https://test.example/?audience=he&claim=better#companion');
context.applyAudience('he');
assert(prompt.textContent.includes('Invisible delegation'));
assert(prompt.textContent.includes('Use the HE audience guide'));
context.location.searchParams.delete('claim');
context.applyAudience('he');
assert(!prompt.textContent.includes('Coming from the group discussion'));
assert(prompt.textContent.includes('workbench-context-he.md'));
console.log('masthead and discussion contract passed: five paths, five sourced claims, and clearable audience-preserving handoff');

assert(!html.includes('<nav class="audience-nav"'));
assert(html.includes('for="lab-audience"'));
const changeCode=script.match(/function changeAudience\([\s\S]+?\n}\n/)[0];
const routeContext={URL,location:new URL('https://test.example/?audience=he&claim=better#wb-doc-assessment-and-oral-defense-rubric'),activeMode:'workbench',audienceLabels:{he:'HE',pme:'PME',k12:'High school'},applyAudience(id){routeContext.applied=id},setMode(mode){routeContext.activeMode=mode},hideNextStep(){routeContext.hidNextStep=true}};
routeContext.history={pushState(a,b,url){routeContext.location=new URL(url)}};
vm.runInNewContext(changeCode,routeContext);
routeContext.changeAudience({target:{value:'k12'}});
assert.equal(routeContext.hidNextStep,true,'changing audience should dismiss the previous next-step panel');
assert.equal(routeContext.location.searchParams.get('audience'),'k12');
assert.equal(routeContext.location.searchParams.get('claim'),'better');
assert.equal(routeContext.location.hash,'#wb-doc-assessment-and-oral-defense-rubric');
routeContext.activeMode='he';routeContext.changeAudience({target:{value:'pme'}});assert.equal(routeContext.activeMode,'pme');
routeContext.changeAudience({target:{value:''}});assert.equal(routeContext.activeMode,'overview');assert.equal(routeContext.location.searchParams.has('audience'),false);
console.log('global audience selector passed: context, document route, and learning views');

// Full editions must reach the reader, practice context and selected Design bundle.
for (const a of catalog.filter(a=>a.id!=='pme')) {
 const source=readFileSync(join(companion,a.essayFile),'utf8');
 // Editions set their own section count; numbering must run I, II, III... without gaps.
 const numerals=(source.match(/^## ([IVX]+)\./gm)||[]).map(h=>h.slice(3,-1));
 const roman=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
 assert(numerals.length>=8,a.id+' incomplete essay progression');
 assert.deepEqual(numerals,roman.slice(0,numerals.length),a.id+' essay sections out of order');
 assert(/^## References$/m.test(source.slice(source.lastIndexOf('\n## '+numerals.at(-1)+'.'))),a.id+' essay truncated: no References after the last section');
 assert.equal(read('assets/'+a.essayFile),source,a.id+' essay download differs');
 assert(bundle.includes(source.trim()),a.id+' missing from Practice');
 assert(lab.includes(source.trim()),a.id+' missing from lab');
 const ctx=read('assets/workbench-context-'+a.id+'.md');
 assert(ctx.includes(source.trim()),a.id+' missing from Design');
 assert(Buffer.byteLength(ctx)<150000,a.id+' Design bundle exceeds paste budget');
 assert(html.includes('id="panel-'+a.essayMode+'"'),a.id+' reading surface absent');
 assert(html.includes('data-mode-link="'+a.essayMode+'"'),a.id+' reading surface unreachable');
 // Source-relative links in standalone essay downloads resolve.
 for(const m of source.matchAll(/\]\(([^)]+)\)/g)) if(!/^https?:/.test(m[1])) {
  assert(existsSync(join(dist,'assets',a.essayFile,'..',m[1])),'Broken essay source link: '+m[1]);
 }
}
// Every relative link in the downloadable adaptation record resolves on the site.
{ const record=readFileSync(join(companion,'essays/adaptation-map.md'),'utf8');
  for(const m of record.matchAll(/\]\(([^)#]+)[^)]*\)/g)) if(!/^https?:/.test(m[1]))
    assert(existsSync(join(dist,'assets/essays',m[1])),'Broken adaptation-map link: '+m[1]); }
// References keeps the source spine visible: its disclosure closes before the spine begins.
{ const start=html.indexOf('id="panel-sources"'), spine=html.indexOf('class="source-spine',start);
  assert(start>=0 && spine>start,'References panel or source spine missing');
  const panel=html.slice(start,spine);
  assert.equal((panel.match(/<details/g)||[]).length,(panel.match(/<\/details>/g)||[]).length,'source spine is inside an unclosed <details>'); }
for(const mode of ['he-essay','k12-essay']) {
 let current=new URL('https://test.example/#'+mode),selected;
 const ctx={URL,audienceLabels:{pme:'PME',he:'HE',k12:'high school'},get location(){return current},history:{replaceState(a,b,u){current=new URL(u,current)}},applyAudience(id){selected=id},activeMode:'overview',document:{body:{dataset:{}}},buttons:[],views:[],window:{scrollTo(){}},smoothBehavior(){return 'auto'},trackPackageEvent(){},eventLabelFromMode(x){return x},invalidateTocGeometry(){},selectEssayRail(){}};
 vm.runInNewContext(routing+';setMode("'+mode+'",false);',ctx);
 assert.equal(selected,mode.replace('-essay',''));
 assert.equal(current.searchParams.get('audience'),selected);
}
routeContext.activeMode='he-essay';routeContext.changeAudience({target:{value:'k12'}});assert.equal(routeContext.activeMode,'k12-essay');
assert(html.includes('Teaching guide and review notes (reveals the case analysis)</summary>'));
assert.equal((html.match(/data-try-stage="0"/g)||[]).length,4);
assert(html.includes('caseText+fields.map'),'Downloaded practice record must include the actual case');
assert(html.includes('p.textContent=field.value'),'User responses must be rendered as text');
console.log('companion essays passed: sequential sections, source parity, complete contexts, relative links and audience routing');

// Execute the shipped practice handler: no reveal without a response, no invented record.
const practiceCode=script.slice(script.indexOf('document.querySelectorAll("[data-try]")'),script.indexOf('const copyStatus ='));
let downloadedBlob;
const fields=Array.from({length:3},()=>({value:'',disabled:true,readOnly:false,validity:'',setCustomValidity(x){this.validity=x},reportValidity(){},focus(){},addEventListener(){}}));
fields[0].disabled=false;
const stages=Array.from({length:4},(_,i)=>({hidden:i!==0,focus(){},querySelector(sel){return {textContent:sel==='blockquote'?'Constructed contribution':'Case condition '+i}}}));
const savedNodes=[];const recordNode={append(...nodes){savedNodes.push(...nodes)}};
let submit,download;
const form={querySelectorAll(){return fields},addEventListener(type,fn){submit=fn}};
const container={dataset:{tryAudience:'he'},querySelectorAll(){return stages},querySelector(sel){return sel==='[data-try-form]'?form:sel==='[data-try-record]'?recordNode:{addEventListener(type,fn){download=fn}}}};
const ctx={Blob,URL:{createObjectURL(b){downloadedBlob=b;return 'blob:test'},revokeObjectURL(){}},setTimeout(){},document:{querySelectorAll(){return [container]},createElement(){return {textContent:'',click(){}}}}};
vm.runInNewContext(practiceCode,ctx);
download();assert.equal(downloadedBlob,undefined,'No record before answers');
fields[0].value='   ';submit({preventDefault(){}});assert.equal(stages[0].hidden,false);assert(fields[0].validity);
const replies=['My starting claim','<b>Keep my disagreement literally</b>','I retain my judgment for this reason'];
for(let i=0;i<3;i++) {fields[i].value=replies[i];submit({preventDefault(){}});assert.equal(stages[i+1].hidden,false);assert.equal(fields[i].readOnly,true)}
assert.deepEqual(savedNodes.filter((_,i)=>i%2===1).map(n=>n.textContent),replies);
download();const record=await downloadedBlob.text();
for(const text of [...replies,'Case condition 0','Constructed contribution','Case condition 2','Educator review: pending']) assert(record.includes(text));
assert(record.includes('\n\nSetting: he'),'Record should have real line breaks');
assert(!record.includes('proficient'));
console.log('opening practice passed: response gates, literal decisions, full case record and honest status');

// Each edition uses its own section rail; switching replaces rail and progress targets.
assert(!html.includes('<summary>In this essay</summary>'));
const rails=catalog.map(a=>({dataset:{essayRail:a.essayMode},hidden:true}));
const entries=rails.flatMap(rail=>Array.from({length:12},()=>({link:{closest(){return rail}},heading:{}})));
const railContext={essayRails:rails,allTocEntries:entries,toc:null,tocEntries:[]};
const railCode=script.match(/function selectEssayRail\([\s\S]+?\n}\n/)[0];
vm.runInNewContext(railCode,railContext);
for(const a of catalog) {
 assert(html.includes('data-essay-rail="'+a.essayMode+'"'));
 railContext.selectEssayRail(a.essayMode);
 assert.equal(railContext.toc.dataset.essayRail,a.essayMode);
 assert.equal(railContext.tocEntries.length,12);
 assert.deepEqual(rails.filter(r=>!r.hidden).map(r=>r.dataset.essayRail),[a.essayMode]);
}
railContext.selectEssayRail('companion');assert.equal(railContext.toc,null);assert.equal(railContext.tocEntries.length,0);
assert(rails.every(r=>r.hidden));
console.log('essay rails passed: edition-specific headings, selected rail, progress targets and non-reading reset');

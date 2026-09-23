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
  assert(html.includes('data-audience-link="'+a.id+'"'),a.id+" navigation missing");
  const source=readFileSync(join(companion,"audiences",a.file),"utf8");
  assert.equal(read("assets/audiences/"+a.file),source,a.id+" guide stale");
  assert(bundle.includes(source.trim()),a.id+" missing from companion");
  assert(lab.includes(source.trim()),a.id+" missing from lab");
}
const tools=JSON.parse(read("assets/workbench-data.json")).tools;
assert.equal(tools.length,9);
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
console.log("audience contract passed: 3 views, 9 templates, source parity, assets, IDs, and manifest");

// Execute the shipped routing function against direct-entry URLs, not a duplicate implementation.
const routing = html.match(/function setMode\([\s\S]+?\n}\n/)[0];
for (const id of ["pme","he","k12"]) {
  let current = new URL("https://judgmentlab.net/#"+id), selected;
  const context={URL, audienceLabels:{pme:"PME",he:"HE",k12:"high school"},
    get location(){return current;}, history:{pushState(_a,_b,url){current=new URL(url,current);},replaceState(_a,_b,url){current=new URL(url,current);}},
    applyAudience(value){selected=value;}, activeMode:"overview", document:{body:{dataset:{}}}, buttons:[],views:[],
    window:{scrollTo(){}},smoothBehavior(){return "auto";},trackPackageEvent(){},eventLabelFromMode(x){return x;},invalidateTocGeometry(){},ensureWorkbenchData(){return Promise.resolve();}};
  vm.runInNewContext(routing+';setMode("'+id+'",false);setMode("companion",true,true);',context);
  assert.equal(current.searchParams.get("audience"),id,"Direct audience link loses setting");
  assert.equal(selected,id,"Prompt audience does not follow route");
  assert.equal(current.hash,"#companion");
}
console.log("direct audience handoff regression passed");

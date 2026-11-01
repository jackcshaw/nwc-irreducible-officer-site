import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {join,relative,resolve} from 'node:path';
const root=resolve('dist');
const walk=dir=>readdirSync(dir).flatMap(name=>statSync(join(dir,name)).isDirectory()?walk(join(dir,name)):[join(dir,name)]);
const files=walk(root).filter(f=>f.endsWith('.html')),broken=[];
const home=readFileSync(join(root,'index.html'),'utf8');
const spa=new Set([...home.matchAll(/data-mode="([^"]+)"/g)].map(m=>m[1]));
const workbench=new Set(walk(join(root,'assets/workbench')).filter(f=>f.endsWith('.md')).map(f=>'wb-doc-'+f.split('/').at(-1).replace(/\.md$/,'')));
for(const route of workbench)spa.add(route);
let count=0;
for(const file of files) {
 const html=readFileSync(file,'utf8').replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/g,'$1</script>'),base=new URL('/'+relative(root,file).replace(/index.html$/,''),'https://judgmentlab.net');
 for(const m of html.matchAll(/<(?:a|link|script|img)\b[^>]*?\s(?:href|src)="([^\"]+)"/g)) {
  const url=new URL(m[1].replace(/&amp;/g,'&'),base);if(url.origin!==base.origin)continue;
  count++;let target=join(root,decodeURIComponent(url.pathname));if(existsSync(target)&&statSync(target).isDirectory())target=join(target,'index.html');
  if(!existsSync(target)) {broken.push(`${relative(root,file)} -> ${m[1]}`);continue;}
  const fragment=decodeURIComponent(url.hash.slice(1));
  if(fragment&&target.endsWith('.html')&&!(url.pathname==='/'&&spa.has(fragment))) {
   const dest=readFileSync(target,'utf8');if(!dest.includes(`id="${fragment}"`))broken.push(`${relative(root,file)} -> missing #${fragment}`);
  }
 }
}
assert.deepEqual(broken,[]);console.log(`Published HTML links passed: ${count} in ${files.length} pages`);

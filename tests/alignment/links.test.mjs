import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
const assets = join(process.cwd(), "dist/assets");
// Same default as scripts/build-site.mjs; absolute links to the site's own assets must resolve in dist.
const siteAssets = (process.env.SITE_URL || "https://judgmentlab.net") + "/assets/";
const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
// Context bundles state that their relative links refer to the source repositories.
const isBundle = f => /context(-[a-z0-9]+)?\.md$/.test(f);
// A link must reach a file; a directory is not a download.
const isFile = p => existsSync(p) && statSync(p).isFile();
const broken = [];
const files = walk(assets).filter(f => f.endsWith(".md") && !isBundle(f));
let checked = 0;
for (const f of files) {
  for (const m of readFileSync(f, "utf8").matchAll(/\]\(([^)]+)\)/g)) {
    // [x](path "title"): the destination is the first whitespace-separated token.
    const href = m[1].trim().split(/\s+/)[0];
    const target = href.split("#")[0];
    let path;
    if (href.startsWith(siteAssets)) path = join(assets, target.slice(siteAssets.length));
    else if (/^(https?:|mailto:)/.test(href)) continue;
    else if (target) path = join(dirname(f), target);
    else continue;
    checked++;
    if (!isFile(path)) broken.push(`${relative(assets, f)} -> ${href}`);
  }
}
assert.deepEqual(broken, [], "Broken links in published Markdown:\n" + broken.join("\n"));
console.log(`links passed: ${checked} links in ${files.length} published Markdown files`);

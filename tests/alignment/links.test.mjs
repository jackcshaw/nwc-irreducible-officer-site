import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
const assets = join(process.cwd(), "dist/assets");
const walk = d => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
// Context bundles state that their relative links refer to the source repositories.
const isBundle = f => /context(-[a-z0-9]+)?\.md$/.test(f);
const broken = [];
const files = walk(assets).filter(f => f.endsWith(".md") && !isBundle(f));
for (const f of files) {
  for (const m of readFileSync(f, "utf8").matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:)/.test(m[1])) continue;
    const target = m[1].split("#")[0];
    if (target && !existsSync(join(dirname(f), target))) broken.push(`${relative(assets, f)} -> ${m[1]}`);
  }
}
assert.deepEqual(broken, [], "Broken links in published Markdown:\n" + broken.join("\n"));
console.log(`links passed: ${files.length} published Markdown files`);

import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { execFileSync } from "node:child_process";
const root = process.cwd();
const dist = join(root, "dist");
const companion = process.env.COMPANION_REPO_PATH || join(root, "../companion");
const workbench = process.env.WORKBENCH_REPO_PATH || join(root, "../workbench");
const rulesPath = join(companion, "alignment/retired-phrases.json");
assert(existsSync(rulesPath), `Missing ${rulesPath}; the companion owns the retired-phrase rules`);
const rules = JSON.parse(readFileSync(rulesPath, "utf8"));

// Markup, emphasis, quotes, escapes, and line breaks must not hide a phrase.
// Inline script text is scanned as-is (it renders on the page); style is dropped;
// every other tag is replaced by its aria-label, title, and alt values.
const attrText = tag => [...tag.matchAll(/\s(?:aria-label|title|alt)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)]
  .map(a => a[1] ?? a[2]).join(" ");
const normalize = s => s
  .replace(/<style\b[\s\S]*?<\/style>|<script\b[^>]*>([\s\S]*?)<\/script>|<[^>]+>/gi,
    (tag, script) => ` ${script ?? (/^<style/i.test(tag) ? "" : attrText(tag))} `)
  .replace(/&[a-z#0-9]+;/gi, " ").replace(/\\[nrt]/g, " ").replace(/\\/g, " ")
  .replace(/[*_`#>|\[\]()"“”‘’']/g, " ").replace(/\s+/g, " ").toLowerCase();
assert(normalize("Teach the\n*foundations*").includes(normalize("teach the foundations")));
assert(normalize("the student’s choices").includes(normalize("the student's choices")));
assert(normalize('<script>x = "Teach the foundations"</script>').includes("teach the foundations"));
assert(normalize('<a aria-label="Teach the foundations" href="#">x</a>').includes("teach the foundations"));
assert(normalize('<img alt="teach the foundations">').includes("teach the foundations"));
assert(!normalize("<style>.teach-the-foundations{}</style>").includes("teach"));
assert(normalize('"Teach the\\nfoundations"').includes("teach the foundations"));
assert(normalize("teach the \\*foundations\\*").includes("teach the foundations"));

const walk = d => readdirSync(d, { withFileTypes: true })
  .filter(e => ![".git", "node_modules"].includes(e.name))
  .flatMap(e => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
const readSource = p => {
  for (const r of [companion, workbench]) if (existsSync(join(r, p))) return readFileSync(join(r, p), "utf8");
  throw new Error(`retired-phrases.json allowed_in path not found in companion or workbench: ${p}`);
};
for (const r of rules) {
  assert(r.pattern && r.reason && /^\d{4}-\d{2}-\d{2}$/.test(r.retired) && Array.isArray(r.allowed_in),
    `Malformed rule: ${JSON.stringify(r)}`);
}
// A marked source line allows its own text wherever it is published (the comment itself is stripped).
// Only git-tracked files count, so untracked local notes never change the result, and the
// marked line must carry at least 20 characters beyond the match so a bare heading such as
// "## Shuttle <!-- alignment-allow -->" cannot allow the phrase everywhere.
const tracked = repo => execFileSync("git", ["-C", repo, "ls-files", "-z"], { encoding: "utf8" })
  .split("\0").filter(Boolean).map(f => join(repo, f));
const markerLines = [companion, workbench].flatMap(tracked).filter(f => /\.(md|json)$/.test(f) && existsSync(f))
  .flatMap(f => readFileSync(f, "utf8").split("\n").filter(l => l.includes("alignment-allow")))
  .map(l => normalize(l).trim()).filter(Boolean);
const allowedByMarker = (text, m) => markerLines.some(line => line.length >= m[0].length + 20 &&
  line.includes(m[0].toLowerCase()) &&
  text.slice(Math.max(0, m.index - line.length), m.index + line.length).includes(line));
const textOf = f => f.endsWith(".json")
  ? JSON.stringify(JSON.parse(readFileSync(f, "utf8"))).replace(/\\n/g, "\n")
  : readFileSync(f, "utf8");
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Regex rules run against normalized text: lowercase, with markup, quotes, apostrophes,
// emphasis, and backslashes already replaced by spaces. Write patterns for that form.
const compiled = rules.map(r => ({
  ...r,
  re: new RegExp(r.regex ? r.pattern : escape(normalize(r.pattern).trim()), "gi"),
  allowed: normalize(r.allowed_in.map(readSource).join("\n")),
}));

const failures = [];
for (const file of walk(dist).filter(f => /\.(html|md|json)$/.test(f))) {
  const text = normalize(textOf(file));
  for (const r of compiled) for (const m of text.matchAll(r.re)) {
    const win = text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30);
    if (!r.allowed.includes(win) && !allowedByMarker(text, m)) failures.push(`Retired phrase "${m[0]}" in ${relative(dist, file)} — rewrite, or add <!-- alignment-allow: reason --> if intentional (rule: ${r.reason}, retired ${r.retired}). Context: …${win}…`);
  }
}
assert.deepEqual(failures, [], "\n" + failures.join("\n"));
console.log(`retired phrases passed: ${rules.length} rules over ${walk(dist).length} built files`);

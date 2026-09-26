# Content Alignment CI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every PR in the companion, workbench, and site repositories fail when it would put Judgment Lab's essays, cases, templates, and site copy out of alignment.

**Architecture:** Case text moves into the workbench `audiences/profiles.json` and the site reads it. The companion owns a retired-phrase rules file. The site repository holds all checks (build-time `replaceOrThrow`, Node alignment tests over `dist`, Playwright browser checks) and one reusable GitHub Actions workflow that checks out all three repositories; the companion and workbench call it. Branch protection on `main` requires the check.

**Tech Stack:** Node 24 ESM scripts and `node:assert` tests (no framework), `@playwright/test` with Chromium, Python 3.12 via `uv` for PDF assets, GitHub Actions, `gh api` for branch protection.

**Spec:** `docs/superpowers/specs/2026-09-26-content-alignment-ci-design.md` (site repository, branch `content-alignment-ci`).

## Global Constraints

- Repositories (siblings under `/Users/jackcshaw-2/dev/comprendo-clients`): `nwc-irreducible-officer-companion`, `nwc-faculty-workbench`, `nwc-irreducible-officer-site`. All public, owner `jackcshaw`, default branch `main`.
- Work on branch `content-alignment-ci` in each repository. Never commit or push to `main` directly. No `Co-Authored-By` trailers or "Generated with" lines in commits or PR bodies.
- Site build and tests always run with `COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench` from the site directory.
- The site build runs the PDF generator through `uv run --with reportlab --with pillow python3`; `uv` must be on PATH.
- Tests are plain Node scripts using `node:assert/strict` that print one `... passed` line; follow that pattern.
- Retired phrases block unless the matched text also appears in a file listed in the rule's `allowed_in` or on a source line containing `alignment-allow`.
- Context bundles (`*context.md`, `*context-<id>.md`) are exempt from the link check; their headers state that relative links refer to the source repositories.
- CI builds are for verification only; deploys stay local on macOS.
- Merge order for any multi-repository change: companion, then workbench, then site.

## Review Focus

- A shared branch name exists in only one sibling repository: CI must say which ref it used for each repository, not silently use `main` (Task 6, job summary check).
- A rule's `allowed_in` path is misspelled or deleted: the retired-phrase test must fail naming the path, not treat the rule as allowing nothing (Task 3, schema assertions).
- A retired phrase is split by a line break, emphasis markers, or curly apostrophes (`teach the\n*foundations*`, `student’s`): normalization must apply to both text and pattern (Task 3, normalization self-test).
- A stale local server on the Playwright port serves an old `dist` (the site's documented hash-navigation verification trap): the browser config must always start its own server (Task 5, `reuseExistingServer: false`).
- A profile loses one practice or assessment field: the build must stop and name the profile and field rather than render `undefined` (Task 2, validation test).

---

### Task 0: Branches and spec corrections

**Files:**
- Modify: `nwc-irreducible-officer-site/docs/superpowers/specs/2026-09-26-content-alignment-ci-design.md`

- [ ] **Step 1: Create branches in companion and workbench**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients
for r in nwc-irreducible-officer-companion nwc-faculty-workbench; do git -C $r switch main && git -C $r pull --ff-only && git -C $r switch -c content-alignment-ci; done
git -C nwc-irreducible-officer-site switch content-alignment-ci && git -C nwc-irreducible-officer-site rebase main
```

Expected: three repositories on `content-alignment-ci`.

- [ ] **Step 2: Apply the three spec corrections found during planning**

In the spec's Checks table, replace the Download links row's "Fails when" cell with:

```
A relative link in a published standalone Markdown file points to a file the site does not publish. Context bundles are exempt; their headers state that relative links refer to the source repositories.
```

In "Loud rewrites (site)", replace the first sentence with:

```
A helper `replaceOrThrow(text, pattern, replacement, label, {all})` replaces the silent `.replace()` and `.replaceAll()` calls in `adaptTool` (`scripts/workbench-audiences.mjs`). The context-bundle builders concatenate files without rewriting them and need no change. The two PME-only sentence removals stay optional, since only one of nine templates contains them.
```

In "Retired phrases (companion)", replace the `allowed_in` bullet with:

```
- `allowed_in` lists companion or workbench source paths (resolved in the companion first, then the workbench). A match passes when the normalized text around it also appears in one of those files, so the history notes pass wherever they are bundled.
```

Replace the Rollout section's steps 2 through 5 with:

```
2. Implement on branch `content-alignment-ci`: companion rules file; workbench profile fields; site checks, reads, and reusable workflow.
3. Verify each check fails on a deliberately broken input and passes on the fix.
4. Open the three PRs. The site PR's own workflow run checks out the same-named companion and workbench branches; merge companion, workbench, then site once it is green.
5. Add the caller workflows to companion and workbench in small follow-up PRs (they reference the site workflow on `main`, which now exists); merge when green.
6. Apply branch protection using the check names reported by the first runs.
```

Renumber the old step 6 as 7.

- [ ] **Step 3: Commit**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site
git add docs/superpowers && git commit -m "Correct link scope, rewrite scope, and rollout order in alignment spec; add plan"
```

---

### Task 1: Rewrites fail loudly

**Files:**
- Create: `nwc-irreducible-officer-site/scripts/replace-or-throw.mjs`
- Create: `nwc-irreducible-officer-site/tests/alignment/replace-or-throw.test.mjs`
- Modify: `nwc-irreducible-officer-site/scripts/workbench-audiences.mjs:1-47`
- Modify: `nwc-irreducible-officer-site/package.json` (`test` script)

**Interfaces:**
- Produces: `replaceOrThrow(text: string, pattern: string|RegExp, replacement: string|Function, label: string, options?: {all?: boolean}) => string`. Throws `Error("Template rewrite matched nothing: <label>")` when nothing matched. Replacement strings are inserted literally (no `$` expansion). With `{all:true}`, a RegExp pattern must carry the `g` flag.

- [ ] **Step 1: Write the failing test**

`tests/alignment/replace-or-throw.test.mjs`:

```js
import assert from "node:assert/strict";
import { replaceOrThrow } from "../../scripts/replace-or-throw.mjs";

assert.equal(replaceOrThrow("a b a", "a", "x", "first"), "x b a");
assert.equal(replaceOrThrow("a b a", "a", "x", "all", { all: true }), "x b x");
assert.equal(replaceOrThrow("## A\nold\n## B", /## A[\s\S]*?(?=## B)/, "## A\nnew\n", "section"), "## A\nnew\n## B");
// Profile text may contain "$"; it must be inserted literally.
assert.equal(replaceOrThrow("cost 5", "5", "$&6", "dollar"), "cost $&6");
assert.throws(() => replaceOrThrow("abc", "zzz", "y", "k12/assessment: faculty member"),
  /Template rewrite matched nothing: k12\/assessment: faculty member/);
assert.throws(() => replaceOrThrow("abc", /zzz/g, "y", "regex", { all: true }), /matched nothing: regex/);
console.log("replaceOrThrow passed: literal replacement, all-matches, and loud misses");
```

- [ ] **Step 2: Run it to verify it fails**

Run: `cd /Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site && node tests/alignment/replace-or-throw.test.mjs`
Expected: FAIL with `Cannot find module` for `scripts/replace-or-throw.mjs`.

- [ ] **Step 3: Implement**

`scripts/replace-or-throw.mjs`:

```js
// A template rewrite that stops matching must stop the build, not ship unchanged text.
export function replaceOrThrow(text, pattern, replacement, label, { all = false } = {}) {
  let count = 0;
  const replacer = (...args) => {
    count++;
    return typeof replacement === "function" ? replacement(...args) : replacement;
  };
  const out = all ? text.replaceAll(pattern, replacer) : text.replace(pattern, replacer);
  if (count === 0) throw new Error(`Template rewrite matched nothing: ${label}`);
  return out;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node tests/alignment/replace-or-throw.test.mjs`
Expected: `replaceOrThrow passed: literal replacement, all-matches, and loud misses`

- [ ] **Step 5: Use it in `adaptTool`**

In `scripts/workbench-audiences.mjs` add at the top:

```js
import { replaceOrThrow } from "./replace-or-throw.mjs";
```

Inside `adaptTool`, define `const at = (what) => \`${profile.id}/${tool.filename}: ${what}\`;` after `let md = ...`, then replace each required rewrite:

```js
md = replaceOrThrow(md, /^# .+$/m, '# ' + title, at('title'));
md = replaceOrThrow(md, /## Audience and readiness[\s\S]*?(?=## AI Facilitation Block)/, intro, at('audience section'));
```

Keep the two PME-only removals (`In PME, this may be...`, `In PME, consider adversary...`) as plain `.replace` with the comment `// Optional: only some templates carry PME-only sentences.`

In the `tool.id === 'assessment'` branch replace the four section rewrites and the k12 chain:

```js
md = replaceOrThrow(md, /## Dimensions[\s\S]*?(?=## Oral-Defense Question Bank)/, table, at('dimensions'));
md = replaceOrThrow(md, /## Oral-Defense Question Bank[\s\S]*?(?=## Minimal Faculty Note)/, '## Explanation and changed-case prompts\n\nAsk one question at a time. These prompts fit the optional worked example; agree equivalent questions for another course objective. Accept accessible ways of explaining.\n\n'+questions.map(q=>'- '+q).join('\n')+'\n\n', at('question bank'));
md = replaceOrThrow(md, /## Provisional discussion scale[\s\S]*?(?=## Dimensions)/, '## Provisional discussion scale\n\nOptional descriptions for educator discussion, not validated scores or automatic grades. Record support separately; these categories do not establish independence or durable learning. Mark untaught or unassigned criteria not applicable.\n\n| Description | Evidence in this task |\n| --- | --- |\n'+descriptors.map((d,i)=>'| '+(i+1)+' | '+d+' |').join('\n')+'\n\n', at('discussion scale'));
md = replaceOrThrow(md, /## Minimal Faculty Note[\s\S]*/, '## Minimal educator note\n\n1. Learning objective and assigned choice.\n2. Actual explanation or decision.\n3. Support supplied and what remains unclear.\n4. Evidence used to accept, check, revise, or refuse.\n5. Response to the changed case.\n6. Next instructional step; unobserved outcomes stay open.\n', at('faculty note'));
if (profile.id === 'k12') {
  md = replaceOrThrow(md, 'an oral defense', 'a short explanation', at('k12 oral defense'), { all: true });
  md = replaceOrThrow(md, 'oral-defense', 'explanation', at('k12 oral-defense'), { all: true });
  md = replaceOrThrow(md, 'faculty member', 'teacher', at('k12 faculty member'), { all: true });
  md = replaceOrThrow(md, 'Use this rubric when the assignment goal is to make ownership visible in AI-enabled work.', 'Use these observation prompts to inspect a defended argument, with support recorded.', at('k12 rubric intro'));
}
```

(Planning verified every one of these anchors exists after the earlier rewrites, so all are required.)

- [ ] **Step 6: Add the test to `npm test` and run everything**

In `package.json` set:

```json
"test": "node tests/site-contract.test.mjs && node tests/audience-contract.test.mjs && node tests/alignment/replace-or-throw.test.mjs"
```

Run: `export COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench && npm run build && npm test`
Expected: build succeeds; every suite prints `passed` (10 lines).

- [ ] **Step 7: Prove the build fails loudly**

```bash
cp scripts/workbench-audiences.mjs /tmp/wa.bak
sed -i '' "s/'faculty member', 'teacher'/'faculty memberX', 'teacher'/" scripts/workbench-audiences.mjs
npm run build 2>&1 | grep "Template rewrite matched nothing: k12/assessment-and-oral-defense-rubric.md: k12 faculty member"
cp /tmp/wa.bak scripts/workbench-audiences.mjs && npm run build >/dev/null && echo restored
```

Expected: the grep prints the error line, then `restored`.

- [ ] **Step 8: Commit**

```bash
git add scripts/replace-or-throw.mjs scripts/workbench-audiences.mjs tests/alignment/replace-or-throw.test.mjs package.json
git commit -m "Fail the build when a workbench template rewrite matches nothing"
```

---

### Task 2: Case text has one source

**Files:**
- Modify: `nwc-faculty-workbench/audiences/profiles.json` (add `practice`, `assessment` to each profile)
- Create: `nwc-irreducible-officer-site/tests/alignment/single-source.test.mjs`
- Modify: `nwc-irreducible-officer-site/scripts/build-site.mjs:40-44` (profile validation), `:422-427` (`buildOpeningPractice`)
- Modify: `nwc-irreducible-officer-site/scripts/workbench-audiences.mjs` (assessment `rows`, `questions`, `descriptors`)
- Modify: `nwc-irreducible-officer-site/package.json` (`test` script)
- Data: `nwc-irreducible-officer-site/docs/superpowers/plans/2026-09-26-content-alignment-ci/profile-case-fields.json` (extracted verbatim from the current scripts during planning)

**Interfaces:**
- Consumes: `replaceOrThrow` (Task 1).
- Produces: each profile in `profiles.json` has `practice: {label, initial, contribution, change, review}` (strings) and `assessment: {rows: [[dimension, evidence], ...], questions: string[], descriptors: string[4]}`. The site build throws `profiles.json <id>: <field> missing` when absent.

- [ ] **Step 1: Write the failing test**

`tests/alignment/single-source.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const workbench = process.env.WORKBENCH_REPO_PATH || join(root, "../workbench");
const profiles = JSON.parse(readFileSync(join(workbench, "audiences/profiles.json"), "utf8"));
const scripts = ["scripts/build-site.mjs", "scripts/workbench-audiences.mjs"].map(f => readFileSync(join(root, f), "utf8")).join("\n");
const html = readFileSync(join(root, "dist/index.html"), "utf8");
const wbData = JSON.parse(readFileSync(join(root, "dist/assets/workbench-data.json"), "utf8"));
// Short labels ("Frame", "PME") legitimately appear in code; only sentences prove duplication.
const sentence = s => s.length > 25;

for (const p of profiles) {
  assert(p.practice && p.assessment, `profiles.json ${p.id}: practice and assessment are required`);
  for (const [k, v] of Object.entries(p.practice)) {
    assert(html.includes(v), `${p.id} practice.${k} is not on the page`);
    if (sentence(v)) assert(!scripts.includes(v), `${p.id} practice.${k} is duplicated in a site script; read it from profiles.json`);
  }
  const rubric = wbData.audiences[p.id].tools.find(t => t.id === "assessment").markdown;
  for (const v of [...p.assessment.rows.flat(), ...p.assessment.questions, ...p.assessment.descriptors]) {
    assert(rubric.includes(v), `${p.id} assessment text missing from the rubric: ${v.slice(0, 60)}`);
    if (sentence(v)) assert(!scripts.includes(v), `${p.id} assessment text is duplicated in a site script: ${v.slice(0, 60)}`);
  }
}
console.log("single source passed: practice and rubric text come only from profiles.json");
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node tests/alignment/single-source.test.mjs`
Expected: FAIL with `profiles.json pme: practice and assessment are required`.

- [ ] **Step 3: Add the fields to the workbench profiles**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients
python3 - <<'EOF'
import json
p = 'nwc-faculty-workbench/audiences/profiles.json'
fields = json.load(open('nwc-irreducible-officer-site/docs/superpowers/plans/2026-09-26-content-alignment-ci/profile-case-fields.json'))
data = json.load(open(p))
for prof in data:
    prof['practice'] = fields[prof['id']]['practice']
    prof['assessment'] = fields[prof['id']]['assessment']
open(p, 'w').write(json.dumps(data, indent=2, ensure_ascii=False) + '\n')
EOF
git -C nwc-faculty-workbench diff --stat
```

Expected: `audiences/profiles.json` changed; the other profile fields are untouched (`git diff` shows only additions inside each profile).

- [ ] **Step 4: Read the fields in the site and delete the copies**

In `scripts/build-site.mjs`, immediately after `const profiles = JSON.parse(...)`:

```js
for (const p of profiles) {
  for (const k of ["label", "initial", "contribution", "change", "review"]) {
    if (typeof p.practice?.[k] !== "string") throw new Error(`profiles.json ${p.id}: practice.${k} missing`);
  }
  const a = p.assessment;
  if (!a?.rows?.length || !a?.questions?.length || a?.descriptors?.length !== 4) {
    throw new Error(`profiles.json ${p.id}: assessment needs rows, questions, and 4 descriptors`);
  }
}
```

Replace the start of `buildOpeningPractice`, deleting the whole `const examples = {...};` literal:

```js
function buildOpeningPractice(key, audience) {
  const c = profiles.find(p => p.id === audience).practice;
```

In `scripts/workbench-audiences.mjs`, delete the hardcoded `rows` ternary, the `questions` object, and the `descriptors` object, replacing them with:

```js
const { rows, questions, descriptors } = profile.assessment;
```

- [ ] **Step 5: Run build and all tests**

Run: `npm run build && npm test && node tests/alignment/single-source.test.mjs`
Expected: all suites pass, then `single source passed: practice and rubric text come only from profiles.json`. `git diff --stat scripts` shows net deletions.

- [ ] **Step 6: Prove a missing field stops the build**

```bash
cp ../nwc-faculty-workbench/audiences/profiles.json /tmp/profiles.bak
python3 -c "import json;p='../nwc-faculty-workbench/audiences/profiles.json';d=json.load(open(p));del d[2]['practice']['review'];open(p,'w').write(json.dumps(d,indent=2,ensure_ascii=False)+'\n')"
npm run build 2>&1 | grep "profiles.json k12: practice.review missing"
cp /tmp/profiles.bak ../nwc-faculty-workbench/audiences/profiles.json && npm run build >/dev/null && echo restored
```

Expected: the grep prints the error, then `restored`.

- [ ] **Step 7: Add to `npm test` and commit both repositories**

Append ` && node tests/alignment/single-source.test.mjs` to the `test` script.

```bash
git add scripts tests/alignment/single-source.test.mjs package.json
git commit -m "Read audience practice and rubric text from workbench profiles"
git -C ../nwc-faculty-workbench add audiences/profiles.json
git -C ../nwc-faculty-workbench commit -m "Hold audience practice and rubric text in profiles"
```

---

### Task 3: Retired phrases

**Files:**
- Create: `nwc-irreducible-officer-companion/alignment/retired-phrases.json` (copy of `docs/superpowers/plans/2026-09-26-content-alignment-ci/retired-phrases.json`)
- Create: `nwc-irreducible-officer-site/tests/alignment/retired-phrases.test.mjs`
- Modify: `nwc-irreducible-officer-site/package.json` (`test` script)

**Interfaces:**
- Produces: rules schema `[{pattern: string, regex?: boolean, reason: string, retired: "YYYY-MM-DD", allowed_in: string[]}]`. Failure message format: `Retired phrase "<match>" in <dist path> — rewrite, or add <!-- alignment-allow: reason --> if intentional (rule: <reason>, retired <date>). Context: …<window>…`

- [ ] **Step 1: Write the failing test**

`tests/alignment/retired-phrases.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
const root = process.cwd();
const dist = join(root, "dist");
const companion = process.env.COMPANION_REPO_PATH || join(root, "../companion");
const workbench = process.env.WORKBENCH_REPO_PATH || join(root, "../workbench");
const rulesPath = join(companion, "alignment/retired-phrases.json");
assert(existsSync(rulesPath), `Missing ${rulesPath}; the companion owns the retired-phrase rules`);
const rules = JSON.parse(readFileSync(rulesPath, "utf8"));

// Markup, emphasis, quotes, and line breaks must not hide a phrase.
const normalize = s => s
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ")
  .replace(/[*_`#>|\[\]()"“”‘’']/g, " ").replace(/\s+/g, " ").toLowerCase();
assert(normalize("Teach the\n*foundations*").includes(normalize("teach the foundations")));
assert(normalize("the student’s choices").includes(normalize("the student's choices")));

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
const markerLines = [companion, workbench].flatMap(walk).filter(f => /\.(md|json)$/.test(f))
  .flatMap(f => readFileSync(f, "utf8").split("\n").filter(l => l.includes("alignment-allow")))
  .map(l => normalize(l).trim()).filter(Boolean);
const allowedByMarker = (text, m) => markerLines.some(line => line.includes(m[0].toLowerCase()) &&
  text.slice(Math.max(0, m.index - line.length), m.index + line.length).includes(line));
const textOf = f => f.endsWith(".json")
  ? JSON.stringify(JSON.parse(readFileSync(f, "utf8"))).replace(/\\n/g, "\n")
  : readFileSync(f, "utf8");
const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node tests/alignment/retired-phrases.test.mjs`
Expected: FAIL with `Missing .../alignment/retired-phrases.json; the companion owns the retired-phrase rules`.

- [ ] **Step 3: Add the rules file to the companion**

```bash
mkdir -p ../nwc-irreducible-officer-companion/alignment
cp docs/superpowers/plans/2026-09-26-content-alignment-ci/retired-phrases.json ../nwc-irreducible-officer-companion/alignment/retired-phrases.json
```

Append to the end of the companion `README.md`:

```markdown
## Alignment rules

- `alignment/retired-phrases.json` — framings and cases the argument has retired. The site's CI fails when they reappear; retire a framing and add its rule in the same PR.
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npm run build && node tests/alignment/retired-phrases.test.mjs`
Expected: `retired phrases passed: 14 rules over <n> built files`.

- [ ] **Step 5: Prove it catches a planted phrase and an allow marker works**

```bash
cp ../nwc-irreducible-officer-companion/essays/k12.md /tmp/k12.bak
sed -i '' 's/^## Directing AI in the High School Classroom$/## Teach the foundations first/' ../nwc-irreducible-officer-companion/essays/k12.md
(cd ../nwc-irreducible-officer-companion && python3 scripts/build_failure_mode_lab.py >/dev/null)
npm run build >/dev/null && node tests/alignment/retired-phrases.test.mjs 2>&1 | grep -m1 'Retired phrase "teach the foundations" in assets/essays/k12.md'
sed -i '' 's/^## Teach the foundations first$/## Teach the foundations first <!-- alignment-allow: planted for test -->/' ../nwc-irreducible-officer-companion/essays/k12.md
(cd ../nwc-irreducible-officer-companion && python3 scripts/build_failure_mode_lab.py >/dev/null)
npm run build >/dev/null && node tests/alignment/retired-phrases.test.mjs
cp /tmp/k12.bak ../nwc-irreducible-officer-companion/essays/k12.md
(cd ../nwc-irreducible-officer-companion && python3 scripts/build_failure_mode_lab.py >/dev/null && git status --short)
npm run build >/dev/null && echo restored
```

Expected: the first grep prints the failure line; the second run prints `retired phrases passed`; the companion shows only the new `alignment/` and `README.md` changes; `restored`.

- [ ] **Step 6: Add to `npm test` and commit both repositories**

Append ` && node tests/alignment/retired-phrases.test.mjs` to the `test` script.

```bash
git add tests/alignment/retired-phrases.test.mjs package.json
git commit -m "Fail when retired framings or cases reappear in built output"
git -C ../nwc-irreducible-officer-companion add alignment/retired-phrases.json README.md
git -C ../nwc-irreducible-officer-companion commit -m "Add retired-phrase rules for alignment checks"
```

---

### Task 4: Download links

**Files:**
- Create: `nwc-irreducible-officer-site/tests/alignment/links.test.mjs`
- Modify: `nwc-irreducible-officer-site/package.json` (`test` script)

**Interfaces:**
- Produces: failure message `Broken links in published Markdown:\n<asset path> -> <href>` (one per line).

- [ ] **Step 1: Write the test**

`tests/alignment/links.test.mjs`:

```js
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
```

- [ ] **Step 2: Run it against today's build (planning found zero broken links)**

Run: `node tests/alignment/links.test.mjs`
Expected: `links passed: <n> published Markdown files`.

- [ ] **Step 3: Prove it fails on a dead link**

```bash
echo "[missing](../nowhere/gone.md)" >> dist/assets/essays/he.md
node tests/alignment/links.test.mjs 2>&1 | grep "essays/he.md -> ../nowhere/gone.md"
npm run build >/dev/null && node tests/alignment/links.test.mjs
```

Expected: the grep prints the broken link; after rebuild, `links passed`.

- [ ] **Step 4: Add to `npm test` and commit**

Append ` && node tests/alignment/links.test.mjs` to the `test` script.

```bash
git add tests/alignment/links.test.mjs package.json
git commit -m "Check relative links in every published Markdown download"
```

---

### Task 5: Browser checks

**Files:**
- Create: `nwc-irreducible-officer-site/playwright.config.mjs`
- Create: `nwc-irreducible-officer-site/tests/alignment/browser.spec.mjs`
- Modify: `nwc-irreducible-officer-site/package.json` (dev dependency, `test:browser` script)
- Modify: `nwc-irreducible-officer-site/.gitignore`

**Interfaces:**
- Consumes: `profiles.json` `practice` fields (Task 2); DOM hooks already shipped: `#panel-sources .source-spine`, `[data-essay-rail="<mode>"] a`, `#panel-<mode> h2`, `.judgment-try[data-try="<id>"]`, `textarea[name=initial|reliance|changed]`, `[data-try-stage="0..3"]`, `[data-try-record]`, `[data-try-download]`, `document.body.dataset.activeMode`.
- Produces: `npm run test:browser`.

- [ ] **Step 1: Install Playwright**

```bash
npm install --save-dev @playwright/test && npx playwright install chromium
printf 'playwright-report/\ntest-results/\n' >> .gitignore
```

Add to `package.json` scripts: `"test:browser": "playwright test"`.

- [ ] **Step 2: Write the config**

`playwright.config.mjs`:

```js
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/alignment",
  testMatch: /.*\.spec\.mjs/,
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: "http://127.0.0.1:5199" },
  // Always start a fresh server so an old one never serves a stale dist.
  webServer: {
    command: "python3 -m http.server 5199 --bind 127.0.0.1 --directory dist",
    url: "http://127.0.0.1:5199/",
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
```

- [ ] **Step 3: Write the checks**

`tests/alignment/browser.spec.mjs`:

```js
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
const workbench = process.env.WORKBENCH_REPO_PATH || join(process.cwd(), "../workbench");
const profiles = JSON.parse(readFileSync(join(workbench, "audiences/profiles.json"), "utf8"));

test("References shows the source spine", async ({ page }) => {
  await page.goto("/#sources");
  const spine = page.locator("#panel-sources .source-spine");
  await expect(spine).toBeVisible();
  expect(await spine.evaluate(el => !!el.closest("details:not([open])"))).toBe(false);
});

for (const mode of ["he-essay", "k12-essay"]) {
  test(`${mode} rail lists every numbered section and References`, async ({ page }) => {
    await page.goto(`/#${mode}`);
    const headings = await page.locator(`#panel-${mode} h2`).allTextContents();
    const numbered = headings.filter(h => /^[IVX]+\. /.test(h.trim())).length;
    expect(numbered).toBeGreaterThanOrEqual(8);
    const rail = page.locator(`[data-essay-rail="${mode}"] a`);
    await expect(rail).toHaveCount(numbered + 1);
    await expect(rail.last()).toContainText("References");
  });
}

for (const p of profiles) {
  test(`${p.id} practice runs from profile text and records responses`, async ({ page }) => {
    await page.goto(`/?audience=${p.id}#${p.id}`);
    const box = page.locator(`.judgment-try[data-try="${p.id}"]`);
    await expect(box.locator('[data-try-stage="0"] p').first()).toHaveText(p.practice.initial);
    const answers = { initial: `First judgment ${p.id}`, reliance: `Reliance decision ${p.id}`, changed: `Changed-case decision ${p.id}` };
    for (const [i, name] of ["initial", "reliance", "changed"].entries()) {
      await box.locator(`textarea[name="${name}"]`).fill(answers[name]);
      await box.locator(`[data-try-stage="${i}"] button[type="submit"]`).click();
    }
    await expect(box.locator('[data-try-stage="3"]')).toBeVisible();
    for (const a of Object.values(answers)) await expect(box.locator("[data-try-record]")).toContainText(a);
    const [download] = await Promise.all([page.waitForEvent("download"), box.locator("[data-try-download]").click()]);
    const record = readFileSync(await download.path(), "utf8");
    expect(record).toContain(p.practice.initial);
    for (const a of Object.values(answers)) expect(record).toContain(a);
  });
}

for (const hash of ["sources", "he-essay", "workbench"]) {
  test(`#${hash} stays put after load`, async ({ page }) => {
    await page.goto(`/#${hash}`);
    const state = () => page.evaluate(() => [location.hash, document.body.dataset.activeMode]);
    const before = await state();
    expect(before[0]).toBe(`#${hash}`);
    await page.waitForTimeout(3000);
    expect(await state()).toEqual(before);
  });
}

test.describe("phone width", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  for (const hash of ["overview", "he", "k12", "k12-essay", "sources", "workbench"]) {
    test(`#${hash} has no horizontal scroll`, async ({ page }) => {
      await page.goto(`/#${hash}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    });
  }
});
```

- [ ] **Step 4: Run the checks**

Run: `npm run build && WORKBENCH_REPO_PATH=../nwc-faculty-workbench npm run test:browser`
Expected: all tests pass (1 + 2 + 3 + 3 + 6 = 15). If a check fails, fix the site or the selector per the actual DOM (confirm with `npx playwright test --headed <name>`), never by loosening the assertion.

- [ ] **Step 5: Prove the References check catches the hidden-spine bug**

```bash
cp scripts/build-site.mjs /tmp/bs.bak
python3 -c "p='scripts/build-site.mjs';s=open(p).read();s=s.replace('audience-foundations.md\"))}</article></details>\n','audience-foundations.md\"))}</article>\n',1);open(p,'w').write(s)"
npm run build >/dev/null && WORKBENCH_REPO_PATH=../nwc-faculty-workbench npx playwright test -g "References shows the source spine" 2>&1 | grep -E "1 failed"
cp /tmp/bs.bak scripts/build-site.mjs && npm run build >/dev/null && echo restored
```

Expected: `1 failed`, then `restored`.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.mjs tests/alignment/browser.spec.mjs package.json package-lock.json .gitignore
git commit -m "Add browser checks for visible content, practice flows, stability, and phone width"
```

---

### Task 6: Reusable CI workflow and the three PRs

**Files:**
- Create: `nwc-irreducible-officer-site/.github/workflows/alignment.yml`

**Interfaces:**
- Produces: workflow `alignment`, job `check`, callable with inputs `caller_repo` (repository name) and `caller_ref` (branch name). The job summary contains a `| repository | ref |` table.

- [ ] **Step 1: Write the workflow**

`.github/workflows/alignment.yml`:

```yaml
name: alignment
on:
  pull_request:
  push:
    branches: [main]
  workflow_call:
    inputs:
      caller_repo: { type: string, required: true }
      caller_ref: { type: string, required: true }

jobs:
  check:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    env:
      CALLER_REPO: ${{ inputs.caller_repo || 'nwc-irreducible-officer-site' }}
      CALLER_REF: ${{ inputs.caller_ref || github.head_ref || github.ref_name }}
      COMPANION_REPO_PATH: ../nwc-irreducible-officer-companion
      WORKBENCH_REPO_PATH: ../nwc-faculty-workbench
    steps:
      - name: Choose a ref for each repository
        id: refs
        run: |
          echo "| repository | ref |" >> "$GITHUB_STEP_SUMMARY"
          echo "| --- | --- |" >> "$GITHUB_STEP_SUMMARY"
          for repo in nwc-irreducible-officer-companion nwc-faculty-workbench nwc-irreducible-officer-site; do
            if [ "$repo" = "$CALLER_REPO" ] || git ls-remote --exit-code --heads "https://github.com/jackcshaw/$repo" "$CALLER_REF" >/dev/null; then
              ref="$CALLER_REF"
            else
              ref=main
            fi
            key="${repo##*-}"
            echo "$key=$ref" >> "$GITHUB_OUTPUT"
            echo "| $repo | $ref |" >> "$GITHUB_STEP_SUMMARY"
          done
      - uses: actions/checkout@v4
        with: { repository: jackcshaw/nwc-irreducible-officer-companion, ref: "${{ steps.refs.outputs.companion }}", path: nwc-irreducible-officer-companion }
      - uses: actions/checkout@v4
        with: { repository: jackcshaw/nwc-faculty-workbench, ref: "${{ steps.refs.outputs.workbench }}", path: nwc-faculty-workbench }
      - uses: actions/checkout@v4
        with: { repository: jackcshaw/nwc-irreducible-officer-site, ref: "${{ steps.refs.outputs.site }}", path: nwc-irreducible-officer-site }
      - uses: actions/setup-node@v4
        with: { node-version: 24, cache: npm, cache-dependency-path: nwc-irreducible-officer-site/package-lock.json }
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - uses: astral-sh/setup-uv@v6
      - name: Install
        working-directory: nwc-irreducible-officer-site
        run: npm ci && npx playwright install --with-deps chromium
      - name: Build
        working-directory: nwc-irreducible-officer-site
        run: npm run build
      - name: Contract and alignment tests
        working-directory: nwc-irreducible-officer-site
        run: npm test
      - name: Browser checks
        working-directory: nwc-irreducible-officer-site
        run: npm run test:browser
      - if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: alignment-failure
          path: |
            nwc-irreducible-officer-site/dist
            nwc-irreducible-officer-site/playwright-report
          retention-days: 7
```

(`${repo##*-}` yields `companion`, `workbench`, `site`.)

- [ ] **Step 2: Validate the YAML locally**

Run: `uv run --with pyyaml python3 -c "import yaml;d=yaml.safe_load(open('.github/workflows/alignment.yml'));print(len(d['jobs']['check']['steps']))"`
Expected: `12`.

- [ ] **Step 3: Full local verification before pushing**

```bash
export COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench
(cd ../nwc-irreducible-officer-companion && python3 scripts/build_failure_mode_lab.py --check)
npm run build && npm test && npm run test:browser
```

Expected: companion check `PASS`; every Node suite prints `passed` (13 lines); 15 browser tests pass.

- [ ] **Step 4: Commit, push, open the three PRs**

```bash
git add .github/workflows/alignment.yml && git commit -m "Add reusable alignment workflow across all three repositories"
cd /Users/jackcshaw-2/dev/comprendo-clients
for r in nwc-irreducible-officer-companion nwc-faculty-workbench nwc-irreducible-officer-site; do git -C $r push -u origin content-alignment-ci; done
```

Open PRs with `gh pr create --repo jackcshaw/<repo> --base main --head content-alignment-ci`, each body stating summary, test plan, and "Merge order: companion, workbench, site."

- [ ] **Step 5: Confirm the site PR's run is green and used the shared branches**

```bash
gh run list --repo jackcshaw/nwc-irreducible-officer-site --branch content-alignment-ci --workflow alignment --limit 1
gh run view <run-id> --repo jackcshaw/nwc-irreducible-officer-site --log | grep -E "passed|failed" | head -20
```

Expected: conclusion `success`. Open the run summary and confirm all three repositories show `content-alignment-ci`. If the browser job flakes, rerun once; a second failure is a real defect to fix before merging.

- [ ] **Step 6: Run the review pipeline, then merge**

Run the PR pipeline from the user's CLAUDE.md on the site PR (it has logic changes): `code-review:code-review` or `/ce-code-review`, then `code-simplifier:code-simplifier`, fixes as a separate commit, push, green run. The companion and workbench PRs are data-only. Then:

```bash
gh pr merge <n> --repo jackcshaw/nwc-irreducible-officer-companion --merge
gh pr merge <n> --repo jackcshaw/nwc-faculty-workbench --merge
gh pr merge <n> --repo jackcshaw/nwc-irreducible-officer-site --merge
```

Expected: the site's `push` run on `main` succeeds (all three `main` branches now carry the changes).

---

### Task 7: Callers in companion and workbench

**Files:**
- Create: `nwc-irreducible-officer-companion/.github/workflows/alignment.yml`
- Create: `nwc-faculty-workbench/.github/workflows/alignment.yml`

- [ ] **Step 1: Create branches and the caller file in both repositories**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients
for r in nwc-irreducible-officer-companion nwc-faculty-workbench; do
  git -C $r switch main && git -C $r pull --ff-only && git -C $r branch -d content-alignment-ci && git -C $r switch -c alignment-caller
  mkdir -p $r/.github/workflows
  cat > $r/.github/workflows/alignment.yml <<'EOF'
name: alignment
on:
  pull_request:
  push:
    branches: [main]
jobs:
  alignment:
    uses: jackcshaw/nwc-irreducible-officer-site/.github/workflows/alignment.yml@main
    with:
      caller_repo: ${{ github.event.repository.name }}
      caller_ref: ${{ github.head_ref || github.ref_name }}
EOF
  git -C $r add .github/workflows/alignment.yml && git -C $r commit -m "Run the shared alignment check on every PR"
  git -C $r push -u origin alignment-caller
done
```

- [ ] **Step 2: Open PRs and confirm green runs**

Open one PR per repository. Expected: each shows check `alignment / check` passing; the run summary shows the caller repository on `alignment-caller` and the other two on `main`.

- [ ] **Step 3: Prove a companion-only change is caught**

On the companion `alignment-caller` branch, add the line `Teach the foundations before AI use.` to `essays/he.md`, rebuild the lab context (`python3 scripts/build_failure_mode_lab.py`), commit, push. Expected: `alignment / check` fails with `Retired phrase "teach the foundations" in assets/essays/he.md`. Then `git revert HEAD`, push, and confirm green.

- [ ] **Step 4: Merge both PRs**

`gh pr merge <n> --repo jackcshaw/<repo> --merge` for each. Delete local branches `alignment-caller` and `content-alignment-ci` in all three repositories (`git branch -d`), keeping remote branches.

---

### Task 8: Branch protection

- [ ] **Step 1: Read the exact check names from the latest runs**

```bash
for r in nwc-irreducible-officer-companion nwc-faculty-workbench nwc-irreducible-officer-site; do
  sha=$(gh api repos/jackcshaw/$r/commits/main -q .sha)
  echo "$r: $(gh api repos/jackcshaw/$r/commits/$sha/check-runs -q '[.check_runs[].name] | join(", ")')"
done
```

Expected: site `check`; companion and workbench `alignment / check`.

- [ ] **Step 2: Apply protection**

```bash
apply() { # repo context
  gh api -X PUT repos/jackcshaw/$1/branches/main/protection --input - <<EOF
{"required_status_checks":{"strict":true,"contexts":["$2"]},
 "enforce_admins":true,
 "required_pull_request_reviews":{"required_approving_review_count":0},
 "restrictions":null,"allow_force_pushes":false,"allow_deletions":false}
EOF
}
apply nwc-irreducible-officer-site "check"
apply nwc-irreducible-officer-companion "alignment / check"
apply nwc-faculty-workbench "alignment / check"
```

Use the names printed in Step 1 if they differ.

- [ ] **Step 3: Verify**

```bash
for r in nwc-irreducible-officer-companion nwc-faculty-workbench nwc-irreducible-officer-site; do
  gh api repos/jackcshaw/$r/branches/main/protection -q '"'$r': checks="+(.required_status_checks.contexts|join(","))+" admins="+(.enforce_admins.enabled|tostring)+" force="+(.allow_force_pushes.enabled|tostring)'
done
```

Expected: each repository shows its check, `admins=true`, `force=false`. Do not probe with a commit to `main`; the settings read is the verification.

- [ ] **Step 4: Record the rollout**

Add a short "Alignment CI" section to the site `README.md` (on a small PR): what runs, how to retire a phrase, merge order, and that failures upload `dist` and the Playwright report. Note any flaky browser check observed during rollout and its fix.

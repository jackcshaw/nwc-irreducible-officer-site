# Frame Check Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Frame Check, a tenth workbench tool that builds, rates, and repairs frame-first assignment cases, adapted for PME, higher education, and high school, and kept in sync with the companion design doc by CI.

**Architecture:** The workbench gains `templates/frame-check.md`, run in the educator's own AI assistant, carrying the five tests, levels, rubric, workflow, and three calibration primer blocks. The site registers the tool and keeps only the selected audience's primer block. The companion design doc gains the workflow section and two PME calibration rows and stays the source of truth; a site test fails when the template and doc drift.

**Tech Stack:** Markdown templates, Node 24 ESM build and `node:assert` tests, Playwright, GitHub Actions alignment workflow (already live).

**Spec:** `docs/superpowers/specs/2026-09-26-frame-check-design.md` (site repository, branch `frame-check`).

## Global Constraints

- Repositories under `/Users/jackcshaw-2/dev/comprendo-clients`: `nwc-irreducible-officer-companion`, `nwc-faculty-workbench`, `nwc-irreducible-officer-site`. `main` is protected in all three: PR plus passing alignment check, up to date, admins included.
- Shared branch name `frame-check` in all three repositories; merge order companion, then workbench, then site.
- No `Co-Authored-By` trailers or "Generated with" lines in commits or PR bodies.
- Build and test from the site directory with `COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench`.
- Frame Check runs in the educator's own AI assistant. No backend, no API calls.
- Tool id and profile key: `frame-check`; file `templates/frame-check.md`; card title "Frame Check"; card description "Build or check a case that makes students own the frame."; card action "Open Frame Check".
- Primer markers: `<!-- frame-check:primer <id> -->` and `<!-- /frame-check:primer <id> -->`, `<id>` in `pme`, `he`, `k12`.
- The companion design doc is the source of truth for the five tests (name, Ask, Fails when), the rubric bullets, the six workflow steps, and calibration ratings.
- The PME strong example is fictional and needs PME faculty review; say so wherever it appears.

## Review Focus

- The template drifts from the companion doc through a small wording edit on either side: the sync test must name the differing item and which file to change (Task 4, drift self-test).
- A primer block marker is mistyped or deleted: the build must stop, not publish all three pairs or none (Task 3, build-failure proof).
- An adapted Frame Check leaks another audience's pair: the per-audience assertion must fail (Task 3, contract assertion).
- The retired old-case phrases in the primer trip the retired-phrase scan after adaptation removes neighboring blocks: each block opens with its own setting line so the surrounding text matches the template (Task 2 template content; Task 3 full-suite run proves it).
- An assistant following the template collapses candidates into one answer or reveals primer ratings before asking: the live test's pass criteria check both (Task 6).

---

### Task 0: Branches

- [ ] **Step 1: Create `frame-check` in companion and workbench; confirm the site branch**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients
for r in nwc-irreducible-officer-companion nwc-faculty-workbench; do git -C $r switch main && git -C $r pull --ff-only && git -C $r switch -c frame-check; done
git -C nwc-irreducible-officer-site switch frame-check && git -C nwc-irreducible-officer-site pull --ff-only
```

Expected: three repositories on `frame-check`; the site branch holds the spec and this plan.

---

### Task 1: Companion source of truth

**Files:**
- Modify: `nwc-irreducible-officer-companion/artifacts/frame-first-assignment-design.md` (calibration table; new section before `## Notes for an assignment generator`)
- Modify: `nwc-irreducible-officer-companion/alignment/retired-phrases.json`

**Interfaces:**
- Produces: section `## Frame Check workflow` with exactly six numbered steps; calibration rows whose first cells start with `PME outage attribution` and `PME exercise-window rollback`; old-case rules that allow `templates/frame-check.md`.

- [ ] **Step 1: Add two calibration rows** at the end of the `## Calibration set` table (after the `PME misframed strategic assessment` row):

```markdown
| PME outage attribution: AI blames all 12 outages on equipment updates because 8 followed them | Fails: "correlation isn't causation" catches it | Fails: the question is supplied | Fails: inspect-only | Strong: the count of outages after updates | Fails: diagnostic evidence only removes the error | Weak example for the PME primer |
| PME exercise-window rollback: accurate defect analysis recommends an immediate fleet-wide rollback when the decision is sustaining operations through an exercise window | Strong: the success criterion is fixing the defect fastest, not sustaining operations | Strong: speed of repair versus operational continuity | Strong: have AI model the operational risk of rolling back now versus after the window | Strong: the defect diagnosis, checked against the diagnostic evidence | Strong: a quiet period with no exercise makes the immediate rollback right | Strong example for the PME primer; fictional; needs PME faculty review |
```

- [ ] **Step 2: Add the workflow section** immediately before `## Notes for an assignment generator`:

```markdown
## Frame Check workflow

Frame Check, the workbench tool built on these criteria, builds a case in six steps. It explains every rating through the test it applies, so educators learn the pattern as well as the verdict.

1. Collect the subject, level, learning objective, and the educator's real materials. Nothing is generated from memory.
2. Name the target skill: the frame the student must own.
3. Propose two or three candidate cases. Rate each against the five tests (strong, weak, fails), answering each Ask question and naming any failure pattern.
4. Recommend one and say what it gives up. The educator chooses.
5. Pressure-test the choice: stock-phrase test; the contribution worth accepting and its check; a changed case that makes different evidence decisive; the factual claims to verify.
6. Build the full assignment: question, at least two defensible frames, a misframed AI answer that is factually sound, one contribution worth accepting with its check, a level-appropriate directing-AI task, the changed case, and a defended-frame rubric.

To repair an existing case, rate it, name its failure pattern, and propose the smallest change that keeps the educator's material; rebuild only when repair cannot reach a passing case.
```

- [ ] **Step 3: Allow the primer to use the old cases**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-companion
python3 - <<'EOF'
import json
p = 'alignment/retired-phrases.json'
rules = json.load(open(p))
old = {'shuttle', 'campus survey', 'asphalt', 'shaded grass', 'matched[- ]tiles?', 'surface-temperature readings'}
for r in rules:
    if r['pattern'] in old and 'templates/frame-check.md' not in r['allowed_in']:
        r['allowed_in'].append('templates/frame-check.md')
open(p, 'w').write(json.dumps(rules, indent=2, ensure_ascii=False) + '\n')
print(sum('templates/frame-check.md' in r['allowed_in'] for r in rules))
EOF
```

Expected: prints `6`. `git diff alignment/` shows only the six added list entries.

- [ ] **Step 4: Confirm the lab context is unaffected and commit**

```bash
python3 scripts/build_failure_mode_lab.py --check
git add artifacts/frame-first-assignment-design.md alignment/retired-phrases.json
git commit -m "Add Frame Check workflow and PME primer calibration rows"
```

Expected: `PASS: 16 sources match ...` (the design doc is not a lab source). The site cannot build yet because `templates/frame-check.md` is not published until Task 2; the retired-phrase test resolves `allowed_in` paths across companion and workbench, so run site tests only after Task 2.

---

### Task 2: Workbench template and profiles

**Files:**
- Create: `nwc-faculty-workbench/templates/frame-check.md`
- Modify: `nwc-faculty-workbench/audiences/profiles.json` (each profile's `tools`)
- Modify: `nwc-faculty-workbench/templates/phase-placement-diagnostic.md` (routing table)
- Modify: `nwc-faculty-workbench/audiences/guide.md` ("nine templates" → "ten templates")

**Interfaces:**
- Consumes: companion sections `## The five tests`, `## Directing AI well, by level`, `## Grading a defended frame`, `## Frame Check workflow` (Task 1).
- Produces: `templates/frame-check.md` with those four sections copied verbatim, `## Calibration primer` with three marked blocks, each containing `**Weak example — <name>.**`, `Ratings: 1 X · 2 X · 3 X · 4 X · 5 X`, `**Strong example — <name>.**`, and a second `Ratings:` line; profile key `tools["frame-check"]` with `title` and `guidance`.

- [ ] **Step 1: Write the scaffold** to `/tmp/frame-check.scaffold.md`:

````markdown
# Frame Check

Use Frame Check to build an assignment case that makes students own a frame while directing AI, or to check and repair a case you already have. It teaches the method as it works: every rating names the test it applies, so you learn to make good examples, not just receive one.

Concept: [why this template works the way it does](../concepts/facilitation-blocks.md)

## Audience and readiness

Use this as an interactive educator session: ask one question at a time and wait. Use any setting already supplied; otherwise ask PME, higher education, or high school. Read the [audience guide](../audiences/guide.md) with this template. Collect the learning objective and the materials students will actually use before proposing anything.

**This template in your setting:** PME: the frame is the strategic problem and its success criterion. HE: the frame is the disciplinary question and the standard of evidence. High school: the frame is the standard the student chooses and defends within the teacher's task.

## AI Facilitation Block

To run an interactive session, give it this entire file and say: "Run Frame Check with me."

Instructions for the AI assistant:

- Role: You help an educator build or repair an assignment case using the five tests below. The educator owns every decision. You ask, propose, rate, and explain. Every rating names the test it applies and answers that test's Ask question.
- Start: Offer the calibration primer for the educator's setting. Show only the weak example first and ask the educator to rate it against the five tests. Reveal the recorded ratings and the strong example only after they answer. They may skip the primer.
- Then ask which mode: build a case, or check and repair a case they already have.
- Build mode: follow the Frame Check workflow below, one step at a time. In step 3 always propose two or three candidates and rate every one; never skip to a single answer. In step 4 recommend one and say what it gives up, then wait for the educator's choice.
- Check-and-repair mode: ask the educator to paste the case. Rate it against the five tests, quoting the case for each rating. Name the failure pattern. Propose the smallest repair that keeps their material. Offer a fresh build only if repair cannot reach a passing case.
- Never: invent facts, sources, statistics, or student responses; generate from memory when the educator has materials; give a misframed AI answer a factual error (that fails test 1); present generated text as real model output or classroom evidence.
- Always: list every factual claim in a generated case as needing a check against the educator's materials; label generated content as constructed.
- Finish: return the Frame Check record below as clean Markdown, including candidates considered and why they were rejected, claims awaiting verification, and decisions the educator deferred.

{{FIVE_TESTS}}

{{LEVELS}}

{{RUBRIC}}

{{WORKFLOW}}

## Calibration primer

Show the weak example first and ask for the educator's ratings before revealing these.

<!-- frame-check:primer pme -->
Setting: professional military education.

**Weak example — PME outage attribution.** A fictional brief records 12 outages; 8 followed equipment updates and 4 have unexplained causes. The AI attributes all 12 to updates and recommends a fleet-wide rollback. The flaw is one "correlation isn't causation" catches.
Ratings: 1 Fails · 2 Fails · 3 Fails · 4 Strong · 5 Fails

**Strong example — PME exercise-window rollback.** Diagnostic evidence now confirms a software defect in 10 outages, and the AI's analysis of the defect is accurate. It recommends an immediate fleet-wide rollback because that fixes the defect fastest, while the decision the unit faces is keeping operations running through a scheduled exercise window, where a rollback carries its own operational risk. The facts are right; the success criterion is wrong. Fictional; needs PME faculty review.
Ratings: 1 Strong · 2 Strong · 3 Strong · 4 Strong · 5 Strong
<!-- /frame-check:primer pme -->

<!-- frame-check:primer he -->
Setting: higher education.

**Weak example — Campus shuttle survey.** A university invites 1,000 students; 100 respond and 80 favor a later shuttle. The AI reports that 80 percent of students favor it. The flaw is nonresponse, a textbook error "check for bias" catches.
Ratings: 1 Fails · 2 Fails · 3 Fails · 4 Strong · 5 Fails

**Strong example — Return-to-office research memo.** A student advises a firm that hires mostly new graduates. The AI synthesis of three real studies is accurate and concludes that the evidence is mixed and hybrid is the balance, while silently treating productivity as short-run output averaged across workers. For this firm, the feedback and promotion findings decide the question.
Ratings: 1 Strong · 2 Strong · 3 Strong · 4 Strong · 5 Strong
<!-- /frame-check:primer he -->

<!-- frame-check:primer k12 -->
Setting: high school.

**Weak example — Asphalt vs. shaded grass.** Two readings: sunlit asphalt at 36°C and shaded grass at 28°C. The AI says trees lower temperatures everywhere by 8°C. The flaw is a confound "not a fair test" catches, and the claim is close to a strawman.
Ratings: 1 Fails · 2 Fails · 3 Fails · 4 Strong · 5 Fails

**Strong example — "Was the New Deal a success?"** A balanced AI essay reports accurate unemployment figures and lasting programs and concludes the New Deal was mixed but largely successful. It judges success by recovery and durability and never asks for whom; Social Security's old-age program first excluded agricultural and domestic workers.
Ratings: 1 Strong · 2 Strong · 3 Strong · 4 Strong · 5 Strong
<!-- /frame-check:primer k12 -->

## Frame Check record

- Setting, subject, level, and learning objective:
- Materials supplied by the educator:
- Mode (build, or check and repair):
- Target skill (the frame the student must own):
- Candidates considered, with five-test ratings and why each was kept or rejected:
- Final case or assignment: question; defensible frames; misframed AI answer; contribution worth accepting and its check; directing-AI task; changed case; defended-frame rubric:
- Five-test rating table for the final case:
- Factual claims awaiting verification against the educator's materials:
- Decisions the educator deferred:
````

- [ ] **Step 2: Fill the scaffold with verbatim companion sections**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients
python3 - <<'EOF'
import re
doc = open('nwc-irreducible-officer-companion/artifacts/frame-first-assignment-design.md').read()
def section(title):
    m = re.search(r'^## ' + re.escape(title) + r'\n.*?(?=^## |\Z)', doc, re.S | re.M)
    assert m, title
    return m.group(0).rstrip()
s = open('/tmp/frame-check.scaffold.md').read()
for key, title in [('FIVE_TESTS', 'The five tests'), ('LEVELS', 'Directing AI well, by level'),
                   ('RUBRIC', 'Grading a defended frame'), ('WORKFLOW', 'Frame Check workflow')]:
    s = s.replace('{{' + key + '}}', section(title))
assert '{{' not in s
open('nwc-faculty-workbench/templates/frame-check.md', 'w').write(s)
EOF
grep -c "^### [1-5]\. " nwc-faculty-workbench/templates/frame-check.md
```

Expected: `5`.

- [ ] **Step 3: Add the profile entries**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients/nwc-faculty-workbench
python3 - <<'EOF'
import json
p = 'audiences/profiles.json'
d = json.load(open(p))
entries = {
  'pme': {'title': 'Build or check a professional case',
          'guidance': 'Start with the outage primer, then build from the officer\'s actual problem and sources. The frame to own is the strategic problem and its success criterion. The PME strong example is fictional and needs PME faculty review before it is used as an exemplar.'},
  'he': {'title': 'Build or check a disciplinary case',
         'guidance': 'Start with the survey-versus-memo primer, then build from the course\'s objective and reading list. The frame to own is the disciplinary question and the standard of evidence. For history or engineering, see the Salem and mounting-bracket cases in the companion essay.'},
  'k12': {'title': 'Build or check a classroom case',
          'guidance': 'Start with the temperature-versus-New Deal primer, then build from the teacher\'s unit and document packet. The frame to own is the standard the student chooses and defends. Students can direct AI through teacher-run tools when they lack accounts.'},
}
for prof in d:
    prof['tools']['frame-check'] = entries[prof['id']]
open(p, 'w').write(json.dumps(d, indent=2, ensure_ascii=False) + '\n')
EOF
git diff --stat
```

Expected: `audiences/profiles.json` gains three entries; nothing else in it changes.

- [ ] **Step 4: Route to Frame Check from the placement diagnostic and update the guide count**

In `templates/phase-placement-diagnostic.md`, add a row to the `## Routing` table directly above the `| After any run |` row:

```markdown
| Designing or repairing a case | [Frame Check](frame-check.md) to build a case students must frame, or to rate and repair one you have. |
```

In `audiences/guide.md`, replace `nine templates` with `ten templates`.

- [ ] **Step 5: Commit**

```bash
git add templates/frame-check.md templates/phase-placement-diagnostic.md audiences/profiles.json audiences/guide.md
git commit -m "Add Frame Check template and audience entries"
```

---

### Task 3: Site registration, per-audience primer, counts

**Files:**
- Modify: `nwc-irreducible-officer-site/scripts/build-site.mjs` (`getWorkbenchTools`, after the supervised-delegation entry)
- Modify: `nwc-irreducible-officer-site/scripts/workbench-audiences.mjs` (`adaptTool`)
- Modify: `nwc-irreducible-officer-site/tests/audience-contract.test.mjs` (counts, primer assertions)
- Modify: `nwc-irreducible-officer-site/README.md` ("nine tool adaptations" → "ten tool adaptations"; "27 adapted template downloads" → "30"; bundle section counts `14-section` → `15-section`, shared `16 sections` → `17 sections`)

**Interfaces:**
- Consumes: `replaceOrThrow(text, pattern, replacement, label, {all})` (existing); template markers (Task 2).
- Produces: tool id `frame-check` in `wbData.audiences[<id>].tools`; adapted markdown with only the selected audience's primer and no markers.

- [ ] **Step 1: Write the failing contract assertions** in `tests/audience-contract.test.mjs`: change `assert.equal(tools.length,9);` to `10`, `assert.equal(v.tools.length,9);` to `10`, the pass messages `9 templates` → `10 templates` and `27 adapted templates` → `30 adapted templates`, and add after the `k12Assessment` block:

```js
{ const pairs={pme:['PME outage attribution','PME exercise-window rollback'],he:['Campus shuttle survey','Return-to-office research memo'],k12:['Asphalt vs. shaded grass','"Was the New Deal a success?"']};
  for(const [id,own] of Object.entries(pairs)){
    const md=wbData.audiences[id].tools.find(t=>t.id==='frame-check').markdown;
    for(const name of own) assert(md.includes(name),id+' Frame Check missing its primer: '+name);
    for(const [other,names] of Object.entries(pairs)) if(other!==id) for(const name of names) assert(!md.includes(name),id+' Frame Check leaks '+other+' primer: '+name);
    assert(!md.includes('frame-check:primer'),id+' Frame Check still has primer markers');
  } }
```

- [ ] **Step 2: Run to verify it fails**

Run: `export COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench && npm run build`
Expected: FAIL with `templates/frame-check.md has no getWorkbenchTools() card — add one`.

- [ ] **Step 3: Register the tool** in `getWorkbenchTools()` after the `supervised-delegation` entry:

```js
    {
      id: "frame-check",
      title: "Frame Check",
      cardTitle: "Frame Check",
      cardDesc: "Build or check a case that makes students own the frame.",
      cardAction: "Open Frame Check",
      filename: "frame-check.md",
      useNote: "Give this to your AI assistant and say: run Frame Check with me. Bring your objective and the materials students will use.",
    },
```

- [ ] **Step 4: Keep one primer per audience** in `adaptTool`, after the `if (tool.id === 'assessment') { ... }` block:

```js
  if (tool.id === 'frame-check') {
    for (const id of ['pme', 'he', 'k12']) {
      const block = new RegExp(`<!-- frame-check:primer ${id} -->\\n([\\s\\S]*?)<!-- /frame-check:primer ${id} -->\\n?`);
      md = replaceOrThrow(md, block, id === profile.id ? (_, body) => body : '', at(`primer ${id}`));
    }
  }
```

- [ ] **Step 5: Build and run all suites**

Run: `npm run build && npm test && npm run test:browser`
Expected: build succeeds; 13 `passed` lines including `10 templates` and `30 adapted templates`; 15 browser tests pass; the retired-phrase test passes (the primer's old cases are allowed only via `templates/frame-check.md`).

- [ ] **Step 6: Prove a broken marker stops the build**

```bash
cp ../nwc-faculty-workbench/templates/frame-check.md /tmp/fc.bak
sed -i '' 's/<!-- \/frame-check:primer he -->/<!-- \/frame-check:primer hee -->/' ../nwc-faculty-workbench/templates/frame-check.md
npm run build 2>&1 | grep "Template rewrite matched nothing: .*frame-check.md: primer he"
cp /tmp/fc.bak ../nwc-faculty-workbench/templates/frame-check.md && npm run build >/dev/null && echo restored
```

Expected: the grep prints the error line, then `restored`.

- [ ] **Step 7: Update README counts and commit**

```bash
git add scripts/build-site.mjs scripts/workbench-audiences.mjs tests/audience-contract.test.mjs README.md
git commit -m "Register Frame Check and keep one calibration primer per audience"
```

---

### Task 4: Frame Check sync test

**Files:**
- Create: `nwc-irreducible-officer-site/tests/alignment/frame-check-sync.test.mjs`
- Modify: `nwc-irreducible-officer-site/package.json` (`test` script)

**Interfaces:**
- Consumes: companion `artifacts/frame-first-assignment-design.md`; workbench `templates/frame-check.md`.
- Produces: failure messages of the form `Frame Check out of sync: <item> — change templates/frame-check.md to match artifacts/frame-first-assignment-design.md (companion is the source of truth)`.

- [ ] **Step 1: Write the test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const companion = process.env.COMPANION_REPO_PATH || join(root, "../companion");
const workbench = process.env.WORKBENCH_REPO_PATH || join(root, "../workbench");
const doc = readFileSync(join(companion, "artifacts/frame-first-assignment-design.md"), "utf8");
const tpl = readFileSync(join(workbench, "templates/frame-check.md"), "utf8");

const section = (md, title) => {
  const m = md.match(new RegExp(`^## ${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m"));
  assert(m, `Missing section "## ${title}"`);
  return m[1];
};
const tests = md => section(md, "The five tests").split(/^### /m).slice(1).map(t => ({
  name: t.split("\n")[0].trim(),
  ask: (t.match(/^- \*\*Ask:\*\* (.+)$/m) || [])[1],
  fails: (t.match(/^- \*\*Fails when:\*\* (.+)$/m) || [])[1],
}));
const bullets = md => section(md, "Grading a defended frame").split("\n").filter(l => l.startsWith("- "));
const steps = md => section(md, "Frame Check workflow").split("\n").filter(l => /^\d\. /.test(l));
const out = (item) => `Frame Check out of sync: ${item} — change templates/frame-check.md to match artifacts/frame-first-assignment-design.md (companion is the source of truth)`;

assert.equal(tests(doc).length, 5, "Companion should define five tests");
assert.deepEqual(tests(tpl), tests(doc), out("the five tests (name, Ask, or Fails when)"));
assert.deepEqual(bullets(tpl), bullets(doc), out("defended-frame rubric bullets"));
assert.deepEqual(steps(tpl), steps(doc), out("workflow steps"));
assert.equal(steps(doc).length, 6, "Companion workflow should have six steps");

// Primer ratings must match the calibration table row whose first cell starts with the example name.
const rows = section(doc, "Calibration set").split("\n").filter(l => l.startsWith("| ") && !l.startsWith("| Example") && !l.startsWith("| ---"))
  .map(l => l.slice(2, -2).split(" | "));
const examples = [...section(tpl, "Calibration primer").matchAll(/^\*\*(?:Weak|Strong) example — (.+?)\.?\*\*[\s\S]*?^Ratings: (.+)$/gm)];
assert.equal(examples.length, 6, "Template primer should hold six examples (a weak and a strong pair per audience)");
for (const [, name, ratings] of examples) {
  const row = rows.find(r => r[0].startsWith(name));
  assert(row, out(`primer example "${name}" has no calibration row`));
  const expected = row.slice(1, 6).map((c, i) => `${i + 1} ${c.split(":")[0].trim()}`).join(" · ");
  assert.equal(ratings.trim(), expected, out(`ratings for "${name}"`));
}
console.log("frame check sync passed: tests, rubric, workflow, and 6 primer ratings match the companion");
```

- [ ] **Step 2: Run it**

Run: `node tests/alignment/frame-check-sync.test.mjs`
Expected: `frame check sync passed: tests, rubric, workflow, and 6 primer ratings match the companion`. If a primer example name ends in `?` or a quote, confirm the regex captured the full name by the passing assertion count; fix the regex, not the content, if it did not.

- [ ] **Step 3: Prove drift is caught on each side**

```bash
cp ../nwc-faculty-workbench/templates/frame-check.md /tmp/fc.bak
sed -i '' 's/could two strong students reasonably frame this differently/could two students frame this differently/' ../nwc-faculty-workbench/templates/frame-check.md
node tests/alignment/frame-check-sync.test.mjs 2>&1 | grep "out of sync: the five tests"
cp /tmp/fc.bak ../nwc-faculty-workbench/templates/frame-check.md
sed -i '' 's/^Ratings: 1 Fails · 2 Fails · 3 Fails · 4 Strong · 5 Fails$/Ratings: 1 Weak · 2 Fails · 3 Fails · 4 Strong · 5 Fails/' ../nwc-faculty-workbench/templates/frame-check.md
node tests/alignment/frame-check-sync.test.mjs 2>&1 | grep "out of sync: ratings for"
cp /tmp/fc.bak ../nwc-faculty-workbench/templates/frame-check.md && node tests/alignment/frame-check-sync.test.mjs
```

Expected: two grep lines, then the pass line.

- [ ] **Step 4: Add to `npm test` and commit**

Append ` && node tests/alignment/frame-check-sync.test.mjs` to the `test` script.

```bash
git add tests/alignment/frame-check-sync.test.mjs package.json
git commit -m "Keep Frame Check in sync with the companion design doc"
```

---

### Task 5: Browser check for the Frame Check card

**Files:**
- Modify: `nwc-irreducible-officer-site/tests/alignment/browser.spec.mjs`

**Interfaces:**
- Consumes: the workbench card markup (`.tool-title` text "Frame Check") and the document route `#wb-doc-frame-check`.

- [ ] **Step 1: Add the test** at the end of `browser.spec.mjs`:

```js
for (const p of profiles) {
  test(`${p.id} workbench offers Frame Check with its own primer`, async ({ page }) => {
    await page.goto(`/?audience=${p.id}#workbench`);
    await expect(page.locator(".tool-title", { hasText: "Frame Check" }).first()).toBeVisible();
    await page.goto(`/?audience=${p.id}#wb-doc-frame-check`);
    await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
    const res = await page.request.get(`/assets/workbench/${p.id}/frame-check.md`);
    expect(res.ok()).toBe(true);
    expect(await res.text()).toContain("## Calibration primer");
  });
}
```

- [ ] **Step 2: Run the browser suite**

Run: `npm run build && WORKBENCH_REPO_PATH=../nwc-faculty-workbench npm run test:browser`
Expected: 18 passed. If the card selector differs in the real DOM, confirm with `npx playwright test --headed -g "Frame Check"` and adjust the selector, not the assertion.

- [ ] **Step 3: Commit**

```bash
git add tests/alignment/browser.spec.mjs
git commit -m "Check that every workbench offers Frame Check"
```

---

### Task 6: Live assistant test

**Files:**
- Create: `nwc-irreducible-officer-site/docs/superpowers/plans/2026-09-26-frame-check/live-test-<mode>.md` (three records)

Scripted sessions run by a separate assistant given only the adapted template as its instructions and a scripted educator. Records are labeled "scripted test, not educator evidence".

- [ ] **Step 1: Build mode, higher education.** Instructions: `dist/assets/workbench/he/frame-check.md`. Educator script: skip the primer; build mode; "Introductory public health policy, first-year undergraduates; objective: judge whether a local sugary-drink tax succeeded; readings: the city's two-year evaluation report and one news analysis (supplied as short summaries)"; choose the candidate the assistant recommends; accept. Pass when: two or three candidates are proposed and each is rated on all five tests; one is recommended with what it gives up; the assistant waits for the choice; every factual claim is listed for verification; no source outside the supplied summaries is cited.

- [ ] **Step 2: Check and repair, high school.** Instructions: `dist/assets/workbench/k12/frame-check.md`. Educator script: skip the primer; check mode; paste the old temperature case (readings, AI claim, matched-tile changed case). Pass when: the assistant rates test 1 as fails and names the "not a fair test" template flaw; it proposes a repair that keeps the temperature material before offering any rebuild.

- [ ] **Step 3: Primer, PME.** Instructions: `dist/assets/workbench/pme/frame-check.md`. Educator script: take the primer. Pass when: the assistant shows only the weak outage example first and asks for ratings before revealing them or the strong example.

- [ ] **Step 4: Fix and re-run.** For any failed criterion, tighten the named instruction in the template's AI Facilitation Block (Task 2 file), rebuild, re-run that session, and record both runs. Commit the records and any template fix in their repositories.

---

### Task 7: PRs, review, merge, release

- [ ] **Step 1: Full local verification**

```bash
cd /Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site
export COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench
(cd ../nwc-irreducible-officer-companion && python3 scripts/build_failure_mode_lab.py --check)
npm run build && npm test && npm run test:browser
```

Expected: 14 `passed` lines; 18 browser tests pass.

- [ ] **Step 2: Push the three `frame-check` branches and open PRs** (companion, workbench, site), bodies with summary, test plan, and "Merge order: companion, workbench, site." Confirm each PR's alignment check is green; the job summary should show all three repositories on `frame-check`.

- [ ] **Step 3: Review pipeline** on the site PR (code review, then simplifier), fixes as a separate commit, green check.

- [ ] **Step 4: Merge in order** after the user confirms: companion, workbench, then site (`gh pr merge <n> --merge`, never `--delete-branch`). Confirm the site's push-to-main run is green. Delete local `frame-check` branches.

  Expected in between: the companion's push-to-main run fails until the workbench merges (its retired-phrase rule names `templates/frame-check.md`), and the workbench's fails until the site registers the tool. Merge the three back to back, then re-run those two push runs (`gh run rerun <id>`) and confirm all three `main` branches are green. This is the cross-repo gap the alignment CI spec accepts.

- [ ] **Step 5: Release.** On a `release-2026-9-27` branch, set `package.json` version to `2026.9.27`, PR, green, merge. Build from all three `main` branches with no `SITE_URL`, run all suites, `firebase deploy --only hosting --project nwc-learning-companion`, and hash-compare every file in `dist` against judgmentlab.net (root page at `/`). Confirm the footer reads `Version 2026.9.27`.

- [ ] **Step 6: Update the Andy Rotherham draft** (Gmail draft `r-3112604637987556031`, jshaw@comprendo.dev): third bullet becomes "Includes an assignment builder (Frame Check) that helps folks design exercises that surface where AI hides judgment". Do not send.

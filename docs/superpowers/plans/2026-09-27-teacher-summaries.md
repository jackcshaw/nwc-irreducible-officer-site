# Teacher Summaries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every workbench tool opens with a styled "What you'll do" card (You bring / You do / You get) above the document, and the assistant's script is collapsed under "What your assistant will do".

**Architecture:** Each template in `nwc-faculty-workbench` gains a `## At a glance` section of three labelled bullets. The site build extracts it with a small fail-loud module (`scripts/at-a-glance.mjs`), stores it on each tool as `glance`, renders the document without it, and wraps the rendered AI Facilitation Block in a closed `<details>`. The document view renders the card from `glance`. Downloads and copied links keep the full template.

**Tech Stack:** Node ESM build (`scripts/build-site.mjs`), plain `node:assert` tests, Playwright browser tests, Firebase Hosting.

**Spec:** `docs/superpowers/specs/2026-09-27-teacher-summaries-design.md`

## Global Constraints

- Branch name `teacher-summaries` in both `nwc-faculty-workbench` and `nwc-irreducible-officer-site`; never commit to `main`; no `Co-Authored-By` or any attribution line in commits or PR bodies.
- Summary text is copied verbatim from the spec's "Summaries" section; any wording change goes back to Jack.
- Section shape, exactly, placed directly before `## Audience and readiness`:
  ```markdown
  ## At a glance

  - **You bring:** …
  - **You do:** …
  - **You get:** …
  ```
- Card heading text: `What you'll do`. Collapsed section summary text: `What your assistant will do`.
- Downloaded templates, context bundles, and the "Start in your assistant" target keep `## At a glance` and the full AI Facilitation Block.
- "Design an assignment" order: Frame Check, Assignment design worksheet, Source kit, Supervised delegation exercise. "Make it repeatable": Method card only.
- Desktop first. At phone width the card and collapsed section must stay readable with no horizontal scroll; no phone-only polish.
- Visual identity: cream/navy/red tokens (`--paper-bright`, `--ink`, `--red`, `--muted`, `--faint`, `--font-display`, `--font-mono`), Source Serif 4 / Source Sans 3.
- Build/test from the site dir: `export COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench && npm run build && npm test && npm run test:browser`. Baseline on `main` (860ccd8): 14 node "passed" lines, 40 browser tests.
- Merge order: workbench, then site.

## Review Focus

1. A concept note (no `glance`) opened after a tool: the card must hide, not show the previous tool's bullets. Test in Task 3.
2. The placement diagnostic, reached by link rather than a card, must still show its card. Test in Task 3.
3. Bullet text containing markdown (`**`, backticks, links) would show raw symbols in the card; extraction must reject it loudly. Test in Task 2.
4. First paint before workbench data loads (deep link, slow network): the server-rendered doc view must already contain the card for the default tool. Test in Task 3.
5. Switching audience while a tool is open must keep the card populated (every audience carries `glance`). Test in Task 3.

---

### Task 0: Branches

- [ ] **Step 1:** In `nwc-faculty-workbench`: `git checkout main && git pull --ff-only && git checkout -b teacher-summaries`. The site repo is already on `teacher-summaries` (spec commits); run `git rebase main` there if `main` moved.

### Task 1: Summaries in the templates, with the site check that requires them

**Files:**
- Create: `nwc-irreducible-officer-site/scripts/at-a-glance.mjs`
- Create: `nwc-irreducible-officer-site/tests/alignment/at-a-glance.test.mjs`
- Modify: `nwc-irreducible-officer-site/package.json` (`test` script)
- Modify: all ten files in `nwc-faculty-workbench/templates/`

**Interfaces:**
- Produces: `extractAtAGlance(md: string, where: string) -> { glance: {label: "You bring"|"You do"|"You get", text: string}[3], body: string }` (throws `Error` naming `where`); `collapseFacilitation(html: string, where: string) -> string` (throws when the heading is missing).

- [ ] **Step 1: Write the module's unit tests and the template check** in `tests/alignment/at-a-glance.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { extractAtAGlance, collapseFacilitation } from "../../scripts/at-a-glance.mjs";

const good = "# T\n\nIntro.\n\n## At a glance\n\n- **You bring:** A.\n- **You do:** B.\n- **You get:** C.\n\n## Audience and readiness\n\nX\n";
const { glance, body } = extractAtAGlance(good, "t.md");
assert.deepEqual(glance, [{ label: "You bring", text: "A." }, { label: "You do", text: "B." }, { label: "You get", text: "C." }]);
assert(!body.includes("At a glance") && body.includes("## Audience and readiness"), "body drops only the section");
assert.throws(() => extractAtAGlance("# T\n\n## Audience and readiness\n", "t.md"), /t\.md: missing "## At a glance"/);
assert.throws(() => extractAtAGlance(good.replace("You do", "You make"), "t.md"), /line 2 must start "- \*\*You do:\*\*"/);
assert.throws(() => extractAtAGlance(good.replace("- **You get:** C.\n", ""), "t.md"), /exactly three bullets/);
assert.throws(() => extractAtAGlance(good.replace("A.", "A **bold** claim."), "t.md"), /plain text/);
assert.throws(() => extractAtAGlance(good.replace("## Audience and readiness", "## Other\n\n## Audience and readiness"), "t.md"), /directly before "## Audience and readiness"/);

const html = '<p>Intro</p>\n<h2 id="ai-facilitation-block">AI Facilitation Block</h2>\n<p>Say hi.</p>\n<h2 id="next">Next</h2>\n<p>After</p>';
const wrapped = collapseFacilitation(html, "t.md");
assert(wrapped.includes('<details class="assistant-script"><summary>What your assistant will do</summary>\n<p>Say hi.</p>\n</details>'), wrapped);
assert(wrapped.includes('<h2 id="next">Next</h2>') && !wrapped.includes("<details class=\"assistant-script\" open"));
assert.throws(() => collapseFacilitation("<p>none</p>", "t.md"), /t\.md: no AI Facilitation Block/);

const workbench = process.env.WORKBENCH_REPO_PATH || join(process.cwd(), "../workbench");
const files = readdirSync(join(workbench, "templates")).filter(f => f.endsWith(".md"));
assert.equal(files.length, 10, "expected ten templates");
for (const f of files) extractAtAGlance(readFileSync(join(workbench, "templates", f), "utf8"), `templates/${f}`);
console.log(`at a glance passed: module and ${files.length} templates`);
```

- [ ] **Step 2: Add it to the suite.** In `package.json`, append ` && node tests/alignment/at-a-glance.test.mjs` to the end of the `test` script.

- [ ] **Step 3: Run to verify it fails.** Run `node tests/alignment/at-a-glance.test.mjs`. Expected: FAIL with `Cannot find module .../scripts/at-a-glance.mjs`.

- [ ] **Step 4: Write the module** `scripts/at-a-glance.mjs`:

```js
// Teacher-facing summary: one "## At a glance" section per template, shown as a card on the site.
const LABELS = ["You bring", "You do", "You get"];

export function extractAtAGlance(md, where) {
  const m = md.match(/^## At a glance\n\n([\s\S]*?)\n(?=## )/m);
  if (!m) throw new Error(`${where}: missing "## At a glance" section`);
  const after = md.slice(m.index + m[0].length);
  if (!after.startsWith("## Audience and readiness")) throw new Error(`${where}: "## At a glance" must sit directly before "## Audience and readiness"`);
  const lines = m[1].trim().split("\n");
  if (lines.length !== 3) throw new Error(`${where}: "## At a glance" needs exactly three bullets`);
  const glance = lines.map((line, i) => {
    const b = line.match(/^- \*\*([^*]+):\*\* (.+)$/);
    if (!b || b[1] !== LABELS[i]) throw new Error(`${where}: At a glance line ${i + 1} must start "- **${LABELS[i]}:**"`);
    if (/[*`[\]]/.test(b[2])) throw new Error(`${where}: At a glance "${LABELS[i]}" must be plain text (no markdown)`);
    return { label: LABELS[i], text: b[2].trim() };
  });
  return { glance, body: md.slice(0, m.index) + after };
}

export function collapseFacilitation(html, where) {
  const open = '<h2 id="ai-facilitation-block">';
  const start = html.indexOf(open);
  if (start < 0) throw new Error(`${where}: no AI Facilitation Block heading to collapse`);
  const headEnd = html.indexOf("</h2>", start) + "</h2>".length;
  const next = html.indexOf("<h2", headEnd);
  const end = next < 0 ? html.length : next;
  return html.slice(0, start)
    + '<details class="assistant-script"><summary>What your assistant will do</summary>'
    + html.slice(headEnd, end)
    + "</details>\n"
    + html.slice(end);
}
```

- [ ] **Step 5: Run to verify the unit part passes and the template part fails.** Run `WORKBENCH_REPO_PATH=../nwc-faculty-workbench node tests/alignment/at-a-glance.test.mjs`. Expected: FAIL with `templates/after-action-note-template.md: missing "## At a glance" section`.

- [ ] **Step 6: Add the summaries** to each template in `nwc-faculty-workbench/templates/`, inserting the block below immediately before the line `## Audience and readiness` (keep one blank line before the block and one after it). Text is verbatim from the spec:

`frame-check.md`
```markdown
## At a glance

- **You bring:** Your learning objective and the materials students will actually use (readings, documents, data).
- **You do:** Rate a weak and a strong example to calibrate, then choose among two or three rated candidate cases, or paste a case you already have for a check and repair.
- **You get:** A finished case or assignment, the five-test ratings behind it, and a list of factual claims to verify before class.
```

`assignment-design-worksheet.md`
```markdown
## At a glance

- **You bring:** An assignment you plan to run or revise, and what students should be able to do when it's done.
- **You do:** Work through where AI helps, where it gets in the way of learning, and which reliance decisions students must make themselves.
- **You get:** A revised assignment plan that shows the AI-free and AI-assisted steps and the evidence you will look at.
```

`source-kit-template.md`
```markdown
## At a glance

- **You bring:** The readings and data students will use, and the standards you grade against.
- **You do:** Decide what counts as a source, what is off limits, what role AI plays, and what you will review.
- **You get:** A curated packet students and their assistant can work from, with its boundaries written down.
```

`supervised-delegation-exercise.md`
```markdown
## At a glance

- **You bring:** A multi-step task your students already handle well with structured AI requests.
- **You do:** Set the task brief, the checkpoints where students inspect AI work, and the rules for stopping or escalating.
- **You get:** An exercise and assessment that show whether students' judgment survives handing work to AI.
```

`assessment-and-oral-defense-rubric.md`
```markdown
## At a glance

- **You bring:** The assignment, what it was meant to teach, and anonymized student work.
- **You do:** Choose the criteria that match what the assignment teaches, then use the questions to have students explain and defend their choices.
- **You get:** Notes on how each student reasoned and what help they used. You decide the grade.
```

`flawed-output-library-template.md`
```markdown
## At a glance

- **You bring:** A topic you teach and its key sources.
- **You do:** Shape plausible AI-style answers that each hide one flaw that changes the conclusion, plus the questions that expose it.
- **You get:** Reusable library entries: the student-facing text, an instructor key, and notes on when to retire each one.
```

`faculty-calibration-protocol.md`
```markdown
## At a glance

- **You bring:** Two or more colleagues and the same piece of anonymized AI-assisted student work.
- **You do:** Each judge it separately, then compare what you saw and where you disagree.
- **You get:** A calibration note that records shared standards and open disagreements, without forcing agreement.
```

`after-action-note-template.md`
```markdown
## At a glance

- **You bring:** An AI-enabled exercise you just ran and what you noticed while running it.
- **You do:** Record what worked, what confused students, and what to change, while it's fresh.
- **You get:** A note you or a colleague can use next time, including what to keep, revise, or retire.
```

`method-card-template.md`
```markdown
## At a glance

- **You bring:** A task you have done well with AI at least twice.
- **You do:** Write down the brief, the steps, how to review the output, and when to stop.
- **You get:** A reusable method card: the steps and checks your assistant follows each time, much like a skill in Claude or ChatGPT. You stop re-explaining the task.
```

`phase-placement-diagnostic.md`
```markdown
## At a glance

- **You bring:** An assignment, exercise, or course you want to match to the right workbench tool.
- **You do:** Answer a few questions about what students do with AI and what they must do themselves.
- **You get:** Which of six stages of AI use it asks of students, from asking AI questions to supervising multi-step AI work, and which tool to open next.
```

- [ ] **Step 7: Run to verify it passes.** Run `WORKBENCH_REPO_PATH=../nwc-faculty-workbench node tests/alignment/at-a-glance.test.mjs`. Expected: `at a glance passed: module and 10 templates`. Then the full suite (Global Constraints command): 15 node "passed" lines (the new one included), 40 browser tests. The retired-phrase and links checks must still pass over the edited templates.

- [ ] **Step 8: Commit both repos.**
  - Workbench: `git add templates && git commit -m "Add an At a glance summary to every template"`
  - Site: `git add scripts/at-a-glance.mjs tests/alignment/at-a-glance.test.mjs package.json && git commit -m "Check every template's At a glance summary"`

### Task 2: Build carries the summary and collapses the script

**Files:**
- Modify: `nwc-irreducible-officer-site/scripts/workbench-audiences.mjs` (`adaptTool`)
- Modify: `nwc-irreducible-officer-site/scripts/build-site.mjs` (`getWorkbenchTools` return map ~l.1090; `workbench-data.json` base `tools` map ~l.128)
- Test: `nwc-irreducible-officer-site/tests/alignment/at-a-glance.test.mjs`

**Interfaces:**
- Consumes: `extractAtAGlance`, `collapseFacilitation` from Task 1.
- Produces: every tool object (base from `getWorkbenchTools()`, adapted from `adaptTool`) gains `glance: {label, text}[3]`; `tool.html` excludes the At a glance section and has the facilitation block inside `details.assistant-script`; `tool.markdown` unchanged (still contains both). `workbench-data.json` base `tools[]` entries include `glance`.

- [ ] **Step 1: Write the failing build-output test.** Append to `tests/alignment/at-a-glance.test.mjs` (before the final `console.log`):

```js
const data = JSON.parse(readFileSync(join(process.cwd(), "dist/assets/workbench-data.json"), "utf8"));
const sets = [["shared", data.tools], ...Object.entries(data.audiences).map(([id, v]) => [id, v.tools])];
for (const [who, tools] of sets) {
  for (const t of tools) {
    const where = `${who}/${t.filename}`;
    assert.deepEqual(t.glance?.map(g => g.label), ["You bring", "You do", "You get"], `${where}: glance missing`);
    const source = extractAtAGlance(readFileSync(join(workbench, "templates", t.filename), "utf8"), t.filename).glance;
    assert.deepEqual(t.glance, source, `${where}: card text differs from the template`);
    assert(!t.html.includes("You bring:"), `${where}: At a glance rendered twice`);
    assert.equal((t.html.match(/<details class="assistant-script">/g) || []).length, 1, `${where}: script not collapsed once`);
    assert(t.markdown.includes("## At a glance") && t.markdown.includes("## AI Facilitation Block"), `${where}: markdown lost a section`);
  }
}
for (const f of files) {
  const shipped = readFileSync(join(process.cwd(), "dist/assets/workbench", f), "utf8");
  assert(shipped.includes("## At a glance") && shipped.includes("## AI Facilitation Block"), `download ${f} lost a section`);
}
const bundle = readFileSync(join(process.cwd(), "dist/assets/workbench-context.md"), "utf8");
assert(bundle.includes("## At a glance"), "context bundle lost At a glance");
```

- [ ] **Step 2: Run to verify it fails.** Run `npm run build && node tests/alignment/at-a-glance.test.mjs` (with the env vars). Expected: FAIL with `shared/phase-placement-diagnostic.md: glance missing` (or the first tool in `data.tools`).

- [ ] **Step 3: Wire the base tools.** In `scripts/build-site.mjs` add `import { extractAtAGlance, collapseFacilitation } from "./at-a-glance.mjs";` beside the existing `./workbench-audiences.mjs` import, and change the `getWorkbenchTools` return map to:

```js
  return tools.map((tool) => {
    // With no audience selected every primer shows; drop the markers that audience adaptation keys on.
    const markdown = readRequiredWorkbenchFile(join("templates", tool.filename))
      .replace(/^<!-- \/?frame-check:primer [a-z0-9]+ -->\n?/gmu, "");
    const where = `templates/${tool.filename}`;
    const { glance, body } = extractAtAGlance(markdown, where);
    return {
      ...tool,
      markdown,
      glance,
      html: collapseFacilitation(renderMarkdown(rewriteWorkbenchLinks(body), { skipFirstH1: true }), where),
    };
  });
```

and add `glance: tool.glance,` after `html: tool.html,` in the `workbench-data.json` base `tools` map.

- [ ] **Step 4: Wire the audience tools.** In `scripts/workbench-audiences.mjs` add `import { extractAtAGlance, collapseFacilitation } from "./at-a-glance.mjs";` and replace the render line and return with:

```js
  // Render routes before making the raw Markdown portable outside its folder.
  const { glance, body } = extractAtAGlance(md, at('at a glance'));
  const html = collapseFacilitation(render(rewrite(body), {skipFirstH1:true}), at('facilitation block'));
```

and add `glance,` to the returned object (`return {...tool, title, cardDesc:spec.title, useNote:spec.guidance, glance, html, markdown:md.trim(), downloadPath:...}`).

- [ ] **Step 5: Run to verify it passes.** Full suite (Global Constraints command). Expected: 15 node "passed" lines; 40 browser tests pass (the page still renders `item.html`, now with the collapsed block). If a browser test reads text inside the facilitation block of an open document, it now needs the `<details>` opened first; update only that step, never loosen what it asserts.

- [ ] **Step 6: Commit.** `git commit -am "Build carries each tool's At a glance and collapses the assistant's script"`

### Task 3: The card, the collapsed script's look, and the job move

**Files:**
- Modify: `nwc-irreducible-officer-site/scripts/build-site.mjs` (doc-view markup ~l.790; `renderWorkbenchDocument` ~l.1867; `supervised-delegation` entry ~l.1080)
- Modify: `nwc-irreducible-officer-site/styles/lab-refresh.css`
- Modify: `nwc-irreducible-officer-site/tests/site-contract.test.mjs` (jobs map ~l.436), `tests/alignment/browser.spec.mjs`

**Interfaces:**
- Consumes: `tool.glance` (Task 2).
- Produces: `section#wb-glance.wb-glance` with `h3#wb-glance-title` "What you'll do" and a `dl` of three `div > dt + dd` rows; hidden when the item has no `glance`.

- [ ] **Step 1: Write the failing tests.** In `tests/site-contract.test.mjs` change the jobs map to:

```js
const jobs = { design: ["frame-check", "assignment-design", "source-kit", "supervised-delegation"], assess: ["assessment", "flawed-output"], colleagues: ["calibration", "after-action"], repeat: ["method-card"] };
```

and add after it:

```js
assert(html.includes('id="wb-glance"') && html.includes("What you'll do"), "doc view should ship the What you'll do card in the first paint");
```

Append to `tests/alignment/browser.spec.mjs`:

```js
const toolIds = ["frame-check", "assignment-design", "source-kit", "supervised-delegation", "assessment", "flawed-output", "calibration", "after-action", "method-card"];

test("every tool opens with its What you'll do card above the document", async ({ page }) => {
  for (const id of toolIds) {
    await page.goto("/?audience=he#workbench");
    await page.locator(`[data-tool-id="${id}"]`).click();
    const card = page.locator("#wb-glance");
    await expect(card).toBeVisible();
    await expect(card.locator("h3")).toHaveText("What you'll do");
    await expect(card.locator("dt")).toHaveText(["You bring", "You do", "You get"]);
    const [cardTop, docTop] = await page.evaluate(() => [
      document.getElementById("wb-glance").getBoundingClientRect().top,
      document.getElementById("workbench-doc-view").getBoundingClientRect().top,
    ]);
    expect(cardTop, id).toBeLessThan(docTop);
    await expect(page.locator("#workbench-doc-view")).not.toContainText("You bring:");
  }
});

test("the placement diagnostic, reached by link, shows its card", async ({ page }) => {
  await page.goto("/?audience=pme#workbench");
  await page.locator(".start-link").click();
  await expect(page.locator("#wb-glance dt")).toHaveText(["You bring", "You do", "You get"]);
});

test("a concept note hides the card instead of showing the last tool's", async ({ page }) => {
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("#wb-glance")).toBeVisible();
  await page.evaluate(() => { location.hash = "#wb-doc-facilitation-blocks"; });
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "doc");
  await expect(page.locator("#wb-glance")).toBeHidden();
});

test("switching audience keeps the card filled", async ({ page }) => {
  await page.goto("/?audience=k12#wb-doc-frame-check");
  await page.locator("#lab-audience").selectOption("pme");
  await expect(page.locator("#wb-glance dd").first()).toContainText("learning objective");
});

test("the assistant's script is collapsed and opens on demand", async ({ page }) => {
  await page.goto("/?audience=k12#wb-doc-frame-check");
  const script = page.locator("#workbench-doc-view details.assistant-script");
  await expect(script).toHaveCount(1);
  await expect(script.locator("summary")).toHaveText("What your assistant will do");
  const line = script.getByText("Run Frame Check with me", { exact: false });
  await expect(line).toBeHidden();
  await script.locator("summary").click();
  await expect(line).toBeVisible();
});
```

(Check the concept-note route: `#wb-doc-` + the concept's filename without `.md`; `facilitation-blocks` is `concepts/facilitation-blocks.md`. If that route differs, use the concept the Frame Check document links to.)

- [ ] **Step 2: Run to verify they fail.** Full suite. Expected: site contract fails on the jobs map (supervised-delegation still under repeat); the five new browser tests fail (`#wb-glance` not found).

- [ ] **Step 3: Move Supervised delegation.** In `getWorkbenchTools`, set the `supervised-delegation` entry's `job: "design"` and move the whole entry to sit directly after the `source-kit` entry (group order follows array order).

- [ ] **Step 4: Card markup.** In the doc-view markup, directly after the closing `</div>` of `.selected-heading` and before `<section class="wb-next-step" …>`, add:

```js
      <section class="wb-glance" id="wb-glance" aria-labelledby="wb-glance-title"${selected.glance ? "" : " hidden"}>
        <h3 id="wb-glance-title">What you'll do</h3>
        <dl>${(selected.glance || []).map(g => `<div><dt>${escapeHtml(g.label)}</dt><dd>${escapeHtml(g.text)}</dd></div>`).join("")}</dl>
      </section>
```

- [ ] **Step 5: Card updates on open.** In the client `renderWorkbenchDocument`, after the `document.getElementById("workbench-doc-view").innerHTML = item.html;` line, add:

```js
  const glance = document.getElementById("wb-glance");
  const rows = (item.glance || []).map((g) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = g.label;
    dd.textContent = g.text;
    row.append(dt, dd);
    return row;
  });
  glance.querySelector("dl").replaceChildren(...rows);
  glance.hidden = rows.length === 0;
```

- [ ] **Step 6: Styles.** Append to `styles/lab-refresh.css`:

```css
/* What you'll do: the teacher's summary, read before the document. */
#panel-workbench .wb-glance {max-width:68ch;margin:8px 0 32px;padding:22px 26px 24px;background:var(--paper-bright);border:1px solid var(--ink);border-top:6px solid var(--red);}
#panel-workbench .wb-glance h3 {margin:0 0 14px;font-family:var(--font-display);font-size:26px;font-weight:560;line-height:1.2;color:var(--ink);}
#panel-workbench .wb-glance dl {margin:0;display:grid;gap:12px;}
#panel-workbench .wb-glance dl>div {display:grid;grid-template-columns:7.5em minmax(0,1fr);gap:16px;align-items:baseline;}
#panel-workbench .wb-glance dt {font-family:var(--font-mono);font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--red);}
#panel-workbench .wb-glance dd {margin:0;font-size:19px;line-height:1.5;color:var(--ink);}
@media(max-width:640px){#panel-workbench .wb-glance dl>div {grid-template-columns:minmax(0,1fr);gap:2px;}}
```

and add `.assistant-script>summary` to the existing collapsible-summary selectors so it matches the setup and concepts toggles: extend each of the four `.assistant-setup>summary,.workbench-concepts>summary` rule selector lists (base, `::-webkit-details-marker`, `::after`, `[open]>summary::after`, the `@media(hover:hover)` hover rule, and `[open]>summary`) with the matching `.assistant-script` selector, then add:

```css
.assistant-script {margin:28px 0;border-top:1px solid var(--faint);border-bottom:1px solid var(--faint);}
.assistant-script>summary {font-size:20px;padding:16px 0;}
```

- [ ] **Step 7: Run to verify it passes.** Full suite. Expected: 15 node "passed" lines; 45 browser tests (40 + 5).

- [ ] **Step 8: Look at it.** Build, serve `dist` (`python3 -m http.server 4190 --directory dist` in the background), and screenshot with Playwright at 1440×900: `/?audience=he#wb-doc-frame-check` (top), the same with the script opened, and `/?audience=he#workbench` (the Design group showing four tools). One 390px screenshot of the doc top to confirm no horizontal scroll. Fix anything that looks broken (one round), stop the server.

- [ ] **Step 9: Commit.** `git commit -am "Show each tool's What you'll do card, collapse the assistant's script, and move supervised delegation to Design"`

### Task 4: Design check

- [ ] **Step 1:** Run an Impeccable critique of the tool view at desktop width (`/?audience=he#wb-doc-frame-check` and one other tool), as two isolated assessments (design review; detector). Pass when the card reads as the first element of the document view and the collapsed script reads as intentional. Fix any P0/P1 in one batch, rebuild, rerun all suites, and commit (`git commit -am "Polish the What you'll do card"`). Phone findings are out of scope unless they break readability or cause horizontal scroll.

### Task 5: PRs, review, merge, release

- [ ] **Step 1: Full local verification** (Global Constraints command plus `(cd ../nwc-irreducible-officer-companion && python3 scripts/build_failure_mode_lab.py --check)`). Expected: 15 node lines; 45+ browser tests.
- [ ] **Step 2: Push both `teacher-summaries` branches and open PRs** (workbench, site) with summary, test plan, and "Merge order: workbench, site." Confirm both alignment checks are green.
- [ ] **Step 3: Review pipeline** on the site PR (code review, then simplifier); fixes as a separate commit; green check.
- [ ] **Step 4: Merge after Jack confirms**: workbench, then site (`gh pr merge <n> --merge`, never `--delete-branch`); confirm both `main` push runs are green; delete local branches.
- [ ] **Step 5: Release.** On `release-2026-9-28`, set `package.json` version to `2026.9.28`, PR, green, merge. Build from both `main` branches (and companion `main`) with no `SITE_URL`, run all suites, `firebase deploy --only hosting --project nwc-learning-companion`, hash-compare every file in `dist` against judgmentlab.net (root page at `/`), and confirm the footer reads `Version 2026.9.28`. When checking pages by hand, force a full reload before trusting a `#wb-doc-*` view (docs/solutions/workflow-issues/stale-page-verification-hash-navigation.md).

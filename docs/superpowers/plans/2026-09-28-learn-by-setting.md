# Learn by Setting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** With a setting chosen, Learn opens that setting's page led by its essay; every page makes the current setting obvious through a setting colour (chip, rule above the nav, breadcrumb, essay rail).

**Architecture:** One client-side notion of "current setting" (the `audience` URL parameter, already used everywhere) now also drives `html[data-setting]`, a colour token, the chip's text, and a single breadcrumb element above the page content. `setMode("overview")` resolves to the setting's page when a setting is chosen. Server-rendered pages change only in the Learn surfaces: the setting page hero and the generic page's exercise slot.

**Tech Stack:** Node ESM build (`scripts/build-site.mjs`), `styles/lab-refresh.css`, plain `node:assert` tests plus `vm`-executed client functions, Playwright.

**Spec:** Design approved in conversation on 2026-09-27/28 (no separate spec file). Binding decisions, verbatim where they are copy:

- Learn follows the setting: setting chosen → `#pme` / `#he` / `#k12`; "All settings" → the generic page.
- Setting page top to bottom: essay title (headline), the setting's question (dek), its summary, primary **Read the essay**, quiet route links (Practice, Design, Discuss); then "Try a judgment before you read on." in the setting's own case with the purpose line *"Three moves the essay argues for: set your own frame before AI answers, decide what to take from an AI answer, and test whether your frame holds when the situation changes."*; then the collapsed teaching guide.
- Generic page: the higher-ed exercise is removed; its slot becomes the setting chooser ("Choose your setting").
- Setting colours (Option A): PME oxblood `#6e1f28`, Higher education teal `#1d6668`, High school amber `#8a4e12`. The site's red `#b81b2b` stays the only action colour.
- Colour appears only in: a filled setting chip (the Audience menu, labelled "Your setting"; outlined "Choose your setting" when none), a 3px rule above the nav (below the header, replacing the hairline over the tabs), the setting name in the breadcrumb, and the essay rail's progress line and current section.
- Breadcrumb above page content, in the workbench's breadcrumb style; on essays it sits above the "Companion testing edition" / "Published" line.
- Desktop first; phones only need to stay readable with no horizontal scroll.
- Before production: a Firebase preview link for Jack.

## Global Constraints

- Branch `learn-by-setting` (site repo only); never commit to `main`; no `Co-Authored-By` or any attribution lines.
- Setting names come from the catalog `label` (`PME`, `Higher education`, `K–12 · High school`); chip and breadcrumb use the same text.
- Colour never carries meaning alone: every coloured element also shows the setting name.
- `audience-contract.test.mjs` runs `setMode`, `applyAudience`, and `changeAudience` in `vm` contexts with stubs; any new function those call must be added to the stubs (same pattern as `hideNextStep`).
- Build/test from the site dir: `export COMPANION_REPO_PATH=../nwc-irreducible-officer-companion WORKBENCH_REPO_PATH=../nwc-faculty-workbench && npm run build && npm test && npm run test:browser`. Baseline on `main` (0d4c9f2): 15 node "passed" lines, 48 browser tests. Port 5199 may be held by another project's test run; wait for it, never kill it.

## Review Focus

1. Clearing the setting ("All settings") while on a setting page or an essay must land on the general Learn page (existing `changeAudience` behaviour) and remove all colour and the breadcrumb's setting name.
2. Deep links that carry both a setting and a Learn hash (`?audience=k12#overview`, `#learn`) must open the setting page, not the generic one.
3. The PME essay (`#essay`) read with no setting shows no setting colour and a breadcrumb without a setting name.
4. Browser Back after Learn→essay→Learn returns through the same pages without flipping the setting.
5. The workbench document view keeps its own breadcrumb; the site breadcrumb must not appear twice there.

---

### Task 1: Setting identity (tokens, chip, rule, essay rail)

**Files:** Modify `scripts/build-site.mjs` (masthead label ~l.365, `applyAudience` ~l.1377, new `markSetting`), `styles/lab-refresh.css`, `tests/audience-contract.test.mjs`, `tests/alignment/browser.spec.mjs`.

**Interfaces:** Produces `markSetting(id)` (sets `document.documentElement.dataset.setting` to `pme|he|k12` or removes it; sets the chip placeholder text and the "Your setting" label's visibility). `applyAudience` calls it last.

- [ ] **Step 1: Failing browser tests** (append to `browser.spec.mjs`):

```js
const settingColour = { pme: "rgb(110, 31, 40)", he: "rgb(29, 102, 104)", k12: "rgb(138, 78, 18)" };
test("the chip and the rule above the nav carry the setting colour", async ({ page }) => {
  for (const id of ["pme", "he", "k12"]) {
    await page.goto(`/?audience=${id}#companion`);
    await expect(page.locator("html")).toHaveAttribute("data-setting", id);
    const chip = await page.locator("#lab-audience").evaluate(el => getComputedStyle(el).backgroundColor);
    expect(chip, id).toBe(settingColour[id]);
    const rule = await page.locator(".package-nav-inner").evaluate(el => [getComputedStyle(el).borderTopWidth, getComputedStyle(el).borderTopColor]);
    expect(rule, id).toEqual(["3px", settingColour[id]]);
    await expect(page.locator("[data-setting-label]")).toBeVisible();
  }
});
test("with no setting the chip asks you to choose and nothing is coloured", async ({ page }) => {
  await page.goto("/#companion");
  await expect(page.locator("html")).not.toHaveAttribute("data-setting", /.+/);
  await expect(page.locator("#lab-audience option:checked")).toHaveText("Choose your setting");
  await expect(page.locator("[data-setting-label]")).toBeHidden();
  expect(await page.locator(".package-nav-inner").evaluate(el => getComputedStyle(el).borderTopWidth)).toBe("1px");
});
test("the essay rail shows reading progress in the setting colour", async ({ page }) => {
  await page.goto("/?audience=k12#k12-essay");
  const rail = await page.locator('.toc[data-essay-rail="k12-essay"]').evaluate(el => getComputedStyle(el, "::after").backgroundColor);
  expect(rail).toBe(settingColour.k12);
});
```

- [ ] **Step 2: Run to verify they fail** (`npx playwright test -g "carry the setting colour|asks you to choose|reading progress in the setting colour"`). Expected: 3 failed (`data-setting` missing).
- [ ] **Step 3: Implement.**
  - Masthead label (`build-site.mjs` ~l.365): `<label class="audience-setting" for="lab-audience"><span data-setting-label hidden>Your setting</span>` replacing the bare text `Audience`; keep the `<select>` and add `aria-label="Your setting"` to it.
  - New client function after `applyAudience`:

```js
function markSetting(id) {
  const root = document.documentElement;
  if (audienceLabels[id]) root.dataset.setting = id; else delete root.dataset.setting;
  const select = document.getElementById("lab-audience");
  if (select) select.options[0].text = audienceLabels[id] ? "All settings" : "Choose your setting";
  const label = document.querySelector("[data-setting-label]");
  if (label) label.hidden = !audienceLabels[id];
}
```
  and call `markSetting(currentWorkbenchAudience);` as the last line of `applyAudience`.
  - `tests/audience-contract.test.mjs`: add `markSetting(){}` to the `applyAudience` vm context (the object that already holds `audienceLabels`, `workbenchProfiles`, …).
  - `styles/lab-refresh.css` (append):

```css
/* Setting identity: one colour per setting, used only on the chip, the rule above the nav, the breadcrumb, and the essay rail. The red stays the action colour. */
:root {--set-pme:#6e1f28;--set-he:#1d6668;--set-k12:#8a4e12;}
html[data-setting=pme] {--setting:var(--set-pme);}
html[data-setting=he] {--setting:var(--set-he);}
html[data-setting=k12] {--setting:var(--set-k12);}
.audience-setting {gap:10px;}
.audience-setting [data-setting-label] {font-size:13px;letter-spacing:.02em;color:var(--muted);}
.audience-setting select {appearance:none;-webkit-appearance:none;max-width:none;min-height:40px;padding:7px 34px 7px 14px;border:1px solid var(--ink);border-radius:2px;font-size:15px;background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%230a2242' stroke-width='1.8'/%3E%3C/svg%3E") no-repeat right 12px center;cursor:pointer;}
html[data-setting] .audience-setting select {color:#fff;border-color:var(--setting);background-color:var(--setting);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%23ffffff' stroke-width='1.8'/%3E%3C/svg%3E");}
.audience-setting select option {color:var(--ink);background:var(--paper-bright);}
html[data-setting] .package-nav-inner {border-top:3px solid var(--setting);}
html[data-setting] .toc::after {background:var(--setting);width:2px;left:8.5px;}
html[data-setting] .toc a.is-active {color:var(--setting);}
html[data-setting] .toc a.is-active span {background:var(--setting);border-color:var(--setting);}
```
- [ ] **Step 4: Run to verify they pass**, then the full suites. Expected: 15 node lines; 51 browser tests.
- [ ] **Step 5: Commit.** `git commit -am "Give each setting its colour: chip, rule above the nav, essay rail"`

### Task 2: Learn follows the setting

**Files:** Modify `scripts/build-site.mjs` (`setMode` ~l.1572), `tests/alignment/browser.spec.mjs`.

- [ ] **Step 1: Failing browser tests:**

```js
test("Learn opens your setting's page", async ({ page }) => {
  for (const id of ["pme", "he", "k12"]) {
    await page.goto(`/?audience=${id}#companion`);
    await page.locator('[data-mode-tab="overview"]').click();
    await expect(page.locator(`#panel-${id}`)).toBeVisible();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator('[data-mode-tab="overview"]')).toHaveAttribute("aria-selected", "true");
  }
});
test("a Learn link that carries a setting opens that setting's page", async ({ page }) => {
  await page.goto("/?audience=k12#overview");
  await expect(page.locator("#panel-k12")).toBeVisible();
  await page.goto("/?audience=he#learn");
  await expect(page.locator("#panel-he")).toBeVisible();
});
test("clearing the setting on a setting page returns to the general Learn page", async ({ page }) => {
  await page.goto("/?audience=he#he");
  await page.locator("#lab-audience").selectOption("");
  await expect(page.locator("#panel-overview")).toBeVisible();
  await expect(page.locator("html")).not.toHaveAttribute("data-setting", /.+/);
});
test("Back after Learn, essay, Learn keeps the setting", async ({ page }) => {
  await page.goto("/?audience=he#companion");
  await page.locator('[data-mode-tab="overview"]').click();
  await page.locator('#panel-he a[data-mode-link="he-essay"]').first().click();
  await expect(page.locator("#panel-he-essay")).toBeVisible();
  await page.goBack();
  await expect(page.locator("#panel-he")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-setting", "he");
});
```
- [ ] **Step 2: Run to verify they fail.** Expected: the first three fail (generic page shows).
- [ ] **Step 3: Implement.** At the top of `setMode`, before `const url = new URL(location.href);`:

```js
  // Learn is the chosen setting's page; with no setting it is the general page.
  if (mode === "overview") {
    const chosen = new URL(location.href).searchParams.get("audience");
    if (audienceLabels[chosen]) mode = chosen;
  }
```
  (`changeAudience` to "" already sends a setting page to `"overview"` and removes `audience` from the URL before calling `setMode`, so clearing lands on the general page.)
- [ ] **Step 4: Run to verify they pass**, then the full suites. Existing tests that load `#overview` with an audience and expect the general page must be updated to the new rule, never deleted without a replacement assertion. Expected: 15 node lines; 55 browser tests.
- [ ] **Step 5: Commit.** `git commit -am "Learn opens the chosen setting's page"`

### Task 3: Learn pages lead with the essay; the exercise says what it teaches

**Files:** Modify `scripts/build-site.mjs` (`buildAudienceMode` ~l.487, `buildOpeningPractice` ~l.462, `buildOverviewMode` ~l.427), `tests/site-contract.test.mjs`, `tests/alignment/browser.spec.mjs`.

- [ ] **Step 1: Failing tests.** In `site-contract.test.mjs` add:

```js
const purpose = "Three moves the essay argues for: set your own frame before AI answers, decide what to take from an AI answer, and test whether your frame holds when the situation changes.";
for (const id of ["pme", "he", "k12"]) {
  const panel = html.slice(html.indexOf(`id="panel-${id}"`), html.indexOf("</section>\n", html.indexOf(`data-try-audience="${id}"`)));
  assert(panel.includes(`data-try-audience="${id}"`) && panel.includes(purpose), `${id} setting page should carry its own exercise with the purpose line`);
}
assert(!html.includes('data-try="home"'), "the general Learn page should not default to one setting's exercise");
assert(html.includes('class="setting-chooser"'), "the general Learn page should ask readers to choose a setting");
```
  and in `browser.spec.mjs`:

```js
test("each setting page leads with its essay", async ({ page }) => {
  const essays = { pme: ["The Irreducible Officer", "essay"], he: ["Judgment in Higher Education", "he-essay"], k12: ["Learning to Exercise Judgment", "k12-essay"] };
  for (const [id, [title, mode]] of Object.entries(essays)) {
    await page.goto(`/?audience=${id}#${id}`);
    await expect(page.locator(`#panel-${id} h1`)).toHaveText(title);
    await expect(page.locator(`#panel-${id} .surface-hero .copy-button.primary`)).toHaveText("Read the essay");
    await expect(page.locator(`#panel-${id} .surface-hero .copy-button.primary`)).toHaveAttribute("href", `#${mode}`);
  }
});
test("the general Learn page offers the three settings instead of one exercise", async ({ page }) => {
  await page.goto("/#overview");
  await expect(page.locator("#panel-overview [data-try]")).toHaveCount(0);
  await page.locator('#panel-overview .setting-chooser a[data-mode-link="k12"]').click();
  await expect(page.locator("#panel-k12")).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-setting", "k12");
});
```
  Remove `"Try a judgment before you read on."` from the general-page expectations only if that list is scoped to the overview; the setting pages still carry the heading, so keep it in any whole-page list.
- [ ] **Step 2: Run to verify they fail.**
- [ ] **Step 3: Implement.**
  - `buildOpeningPractice`: after the `<h2>…</h2>`, insert `<p class="try-purpose">Three moves the essay argues for: set your own frame before AI answers, decide what to take from an AI answer, and test whether your frame holds when the situation changes.</p>`.
  - `buildAudienceMode` hero becomes:

```js
    <section class="surface-hero"><h1>${escapeHtml(a.essayTitle)}</h1><p class="dek">${escapeHtml(a.question)}</p><p>${escapeHtml(a.summary)}</p>
    <div class="action-row"><a class="copy-button primary" href="#${a.essayMode}" data-mode-link="${a.essayMode}">Read the essay</a><a class="quiet-action" href="#companion" data-mode-link="companion">Practice</a><a class="quiet-action" href="#workbench" data-mode-link="workbench">Design</a><a class="quiet-action" href="#discuss" data-mode-link="discuss">Discuss</a></div>
    <p class="reading-context">${a.id === "pme" ? "The original PME argument." : "Companion testing edition; the adaptation record makes its changes explicit."}</p></section>
```
  and delete the `<section class="detail-band"><h2 class="band-label">The argument in your setting</h2>…</section>` that followed it. Move the guide download into the teaching guide: first child of `<article class="article-body audience-guide">` becomes `<p><a class="quiet-action" href="assets/audiences/${a.file}" download>Download this guide</a></p>`.
  - `buildOverviewMode`: replace `${buildOpeningPractice("home", "he")}` with the existing `<section class="audience-paths" …>` block (moved up, not duplicated), given `class="audience-paths setting-chooser"` and preceded by `<h2 class="band-label">Choose your setting</h2><p>Each setting has its own essay and a judgment to try in its own case.</p>` inside the same section.
  - CSS (`lab-refresh.css`): `.try-purpose {max-width:62ch;margin:6px 0 18px;font-size:18px;line-height:1.5;color:var(--ink);}`.
- [ ] **Step 4: Run to verify they pass**, then the full suites. The opening-practice `vm` test in `audience-contract.test.mjs` reads the `he` exercise; point it at the `he` setting page's container if it relied on the home one. Expected: 15 node lines; 57 browser tests.
- [ ] **Step 5: Commit.** `git commit -am "Setting pages lead with the essay; the exercise says what it rehearses"`

### Task 4: Breadcrumb above the content

**Files:** Modify `scripts/build-site.mjs` (`.content-frame` markup ~l.378, `setMode`, new `renderSiteCrumb`), `styles/lab-refresh.css`, `tests/audience-contract.test.mjs`, `tests/alignment/browser.spec.mjs`.

**Interfaces:** Produces `renderSiteCrumb(mode)`; `setMode` calls it after views switch; `openWorkbenchRoute`/`selectDocument` hide it in the workbench document view (`[data-site-crumb]` hidden while `#panel-workbench[data-wb-view="doc"]`).

- [ ] **Step 1: Failing browser tests:**

```js
test("the breadcrumb names the page and the setting", async ({ page }) => {
  const cases = [["/?audience=he#he", "Learn›Higher education"], ["/?audience=he#he-essay", "Learn›Higher education›Essay"], ["/?audience=pme#companion", "Practice›PME"], ["/?audience=k12#workbench", "Design›K–12 · High school"], ["/#essay", "Learn›Essay"]];
  for (const [url, text] of cases) {
    await page.goto(url);
    await expect(page.locator("[data-site-crumb]"), url).toBeVisible();
    expect((await page.locator("[data-site-crumb]").innerText()).replace(/\s+/g, "")).toBe(text.replace(/\s+/g, ""));
  }
});
test("the breadcrumb sits above the essay's edition line and hides where it adds nothing", async ({ page }) => {
  await page.goto("/?audience=he#he-essay");
  const [crumb, published] = await Promise.all(["[data-site-crumb]", "#panel-he-essay .published"].map(s => page.locator(s).evaluate(el => el.getBoundingClientRect().top)));
  expect(crumb).toBeLessThan(published);
  await page.goto("/#overview");
  await expect(page.locator("[data-site-crumb]")).toBeHidden();
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("[data-site-crumb]")).toBeHidden();
  await expect(page.locator(".wb-breadcrumb")).toBeVisible();
});
test("the breadcrumb's setting name carries the setting colour", async ({ page }) => {
  await page.goto("/?audience=pme#pme");
  expect(await page.locator("[data-site-crumb] .crumb-setting").evaluate(el => getComputedStyle(el).color)).toBe("rgb(110, 31, 40)");
});
```
- [ ] **Step 2: Run to verify they fail.**
- [ ] **Step 3: Implement.**
  - Markup: first child of `<div class="content-frame">`: `<nav class="site-crumb" aria-label="Breadcrumb" data-site-crumb hidden></nav>`.
  - Client:

```js
const crumbTabs = { overview: "Learn", essay: "Learn", "he-essay": "Learn", "k12-essay": "Learn", pme: "Learn", he: "Learn", k12: "Learn", discuss: "Discuss", companion: "Practice", workbench: "Design" };
function renderSiteCrumb(mode) {
  const crumb = document.querySelector("[data-site-crumb]");
  if (!crumb) return;
  const setting = new URL(location.href).searchParams.get("audience");
  const settingName = audienceLabels[setting] ? document.querySelector(`#lab-audience option[value="${setting}"]`).text : "";
  const tab = crumbTabs[mode];
  const isEssay = mode === "essay" || mode.endsWith("-essay");
  const inDoc = mode === "workbench" && document.getElementById("panel-workbench")?.dataset.wbView === "doc";
  crumb.hidden = !tab || inDoc || (!settingName && !isEssay);
  if (crumb.hidden) return;
  const parts = [];
  const tabHref = tab === "Learn" ? "#overview" : "#" + mode;
  parts.push(isEssay ? `<a href="${tabHref}" data-mode-link="overview">${tab}</a>` : `<span>${tab}</span>`);
  if (settingName) parts.push(`<span class="crumb-setting">${settingName}</span>`);
  if (isEssay) parts.push(`<span aria-current="page">Essay</span>`);
  crumb.innerHTML = parts.join('<span class="crumb-sep" aria-hidden="true">›</span>');
}
```
  Call `renderSiteCrumb(mode);` at the end of `setMode` (after views switch), and at the end of `selectDocument` and in the `setMode` workbench overview branch so the doc view hides it and the overview shows it again. Add `renderSiteCrumb(){}` to the `setMode` vm context in `audience-contract.test.mjs`.
  - CSS (`lab-refresh.css`), matching `.wb-breadcrumb`: `.site-crumb {font-family:"Source Sans 3",sans-serif;font-size:15px;color:var(--muted);margin:0 0 18px;} .site-crumb a {color:var(--muted);text-decoration:underline;text-underline-offset:3px;} .site-crumb .crumb-sep {margin:0 6px;} .site-crumb .crumb-setting {color:var(--setting,var(--ink));font-weight:600;}`
- [ ] **Step 4: Run to verify they pass**, then the full suites. Expected: 15 node lines; 60 browser tests.
- [ ] **Step 5: Commit.** `git commit -am "Breadcrumb above every page names the page and the setting"`

### Task 5: Design check and preview for Jack

- [ ] **Step 1:** Build, serve `dist`, and screenshot at 1440×900 (fresh page per view): generic Learn, each setting page, each essay top and scrolled, Practice with a setting, workbench overview with a setting. Plus one 390px check for horizontal scroll. Fix what looks broken in one batch.
- [ ] **Step 2:** Run an Impeccable critique (two isolated assessments, desktop only) on Learn pages. Fix P0/P1 in one batch; rerun suites; commit.
- [ ] **Step 3:** Deploy a preview channel: `firebase hosting:channel:deploy learn-by-setting --expires 7d --project nwc-learning-companion`, and give Jack the URL.

### Task 6: PR, review, merge, release

- [ ] **Step 1:** Push `learn-by-setting`; open the PR with summary and test plan; alignment check green.
- [ ] **Step 2:** Review pipeline (fresh whole-branch review; code review; simplifier); fixes as separate commits.
- [ ] **Step 3:** After Jack's go-ahead: merge (`gh pr merge --merge`, no `--delete-branch`), release PR `2026.9.29`, build from mains, full suites, `firebase deploy --only hosting --project nwc-learning-companion`, hash-compare every file against judgmentlab.net, confirm footer `Version 2026.9.29`; force a full reload before trusting any hand check of a `#…` view.

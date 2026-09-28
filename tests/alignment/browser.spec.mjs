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
    // Each later stage must show its own profile text: 1 contribution, 2 change, 3 review.
    const stageText = [null, p.practice.contribution, p.practice.change, p.practice.review];
    for (const [i, name] of ["initial", "reliance", "changed"].entries()) {
      if (stageText[i]) await expect(box.locator(`[data-try-stage="${i}"]`)).toContainText(stageText[i]);
      await box.locator(`textarea[name="${name}"]`).fill(answers[name]);
      await box.locator(`[data-try-stage="${i}"] button[type="submit"]`).click();
    }
    await expect(box.locator('[data-try-stage="3"]')).toBeVisible();
    await expect(box.locator('[data-try-stage="3"]')).toContainText(stageText[3]);
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

for (const p of profiles) {
  test(`${p.id} workbench offers Frame Check with its own primer`, async ({ page }) => {
    await page.goto(`/?audience=${p.id}#workbench`);
    await expect(page.locator('[data-tool-id="frame-check"]')).toBeVisible();
    await page.goto(`/?audience=${p.id}#wb-doc-frame-check`);
    await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
    const res = await page.request.get(`/assets/workbench/${p.id}/frame-check.md`);
    expect(res.ok()).toBe(true);
    expect(await res.text()).toContain("## Calibration primer");
  });
}

test("opening a tool shows the document view at the top", async ({ page }) => {
  await page.goto("/?audience=he#workbench");
  await page.locator('[data-tool-id="frame-check"]').click();
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "doc");
  await expect(page.locator(".wb-breadcrumb")).toContainText("Design an assignment");
  await expect(page.locator(".wb-breadcrumb")).toContainText("Frame Check");
  expect(await page.evaluate(() => document.querySelector(".wb-breadcrumb").getBoundingClientRect().top)).toBeLessThan(400);
  const perLine = await page.evaluate(() => { const el = document.querySelector("#workbench-doc-view p"); const cs = getComputedStyle(el); const ch = document.createElement("span"); ch.textContent = "0"; ch.style.font = cs.font; document.body.append(ch); const w = ch.getBoundingClientRect().width; ch.remove(); return el.getBoundingClientRect().width / w; });
  expect(perLine).toBeLessThanOrEqual(72);
  await expect(page.locator("#selected-tool-title")).toBeFocused();
});

test("Workbench crumb and browser back return to the overview with the card marked", async ({ page }) => {
  await page.goto("/?audience=he#workbench");
  await page.locator('[data-tool-id="assessment"]').click();
  await page.goBack();
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "overview");
  await expect(page.locator('[data-tool-id="assessment"]')).toHaveAttribute("aria-current", "true");
  await expect(page.locator('[data-tool-id="assessment"]')).toBeFocused();
});

test("Workbench crumb returns to the overview with the card marked and focused", async ({ page }) => {
  await page.goto("/?audience=he#workbench");
  await page.locator('[data-tool-id="assessment"]').click();
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "doc");
  await page.locator("[data-wb-home]").click();
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "overview");
  await expect(page.locator('[data-tool-id="assessment"]')).toHaveAttribute("aria-current", "true");
  await expect(page.locator('[data-tool-id="assessment"]')).toBeFocused();
});

test("Find your starting point opens the placement diagnostic in the doc view", async ({ page }) => {
  await page.goto("/?audience=he#workbench");
  await page.locator(".start-link").click();
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "doc");
  await expect(page.locator(".wb-breadcrumb")).toContainText("Placement diagnostic");
  await expect(page.locator("[data-wb-crumb-job]")).toBeHidden();
});

test("Start in your assistant copies the tool's audience URL", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?audience=k12#wb-doc-frame-check");
  await page.locator("[data-start-assistant]").click();
  await expect(page.locator("#wb-next-step")).toBeVisible();
  const text = await page.evaluate(() => navigator.clipboard.readText());
  const expected = await page.evaluate(() => new URL("assets/workbench/k12/frame-check.md", location.href).href);
  expect(text).toBe("Read " + expected + " in full and run it with me. My setting is high school.");
  await expect(page.locator("#wb-next-download")).toHaveAttribute("href", expected);
});

test("no-audience Frame Check shows no primer marker comments", async ({ page }) => {
  await page.goto("/#wb-doc-frame-check");
  await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
  await expect(page.locator("#workbench-doc-view")).not.toContainText("frame-check:primer");
});

test("Dismiss hides the next-step panel and returns focus to Start", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?audience=he#wb-doc-frame-check");
  await page.locator("[data-start-assistant]").click();
  await expect(page.locator("#wb-next-step")).toBeVisible();
  await page.locator("[data-next-dismiss]").click();
  await expect(page.locator("#wb-next-step")).toBeHidden();
  await expect(page.locator("[data-start-assistant]")).toBeFocused();
});

test("a late clipboard success after dismissal does not reopen the next step", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText: () => new Promise((resolve) => setTimeout(resolve, 2500)) } });
  });
  await page.goto("/?audience=he#wb-doc-frame-check");
  const start = page.locator("[data-start-assistant]");
  await start.click();
  await expect(page.locator("#wb-next-step")).toBeVisible();
  await expect(start).toHaveText("Copy failed");
  await page.locator("[data-next-dismiss]").click();
  await expect(page.locator("#wb-next-step")).toBeHidden();
  await page.waitForTimeout(3000);
  await expect(page.locator("#wb-next-step")).toBeHidden();
  await expect(start).toHaveText("Start in your assistant");
});

test("browser back from one tool to another restores the first tool's document", async ({ page }) => {
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator(".wb-breadcrumb [data-wb-crumb-tool]")).toHaveText("Frame Check");
  await page.evaluate(() => { location.hash = "#wb-doc-assessment-and-oral-defense-rubric"; });
  await expect(page.locator(".wb-breadcrumb [data-wb-crumb-tool]")).not.toHaveText("Frame Check");
  // Record every focus stop: the overview's return-focus must not fire when a document re-claims the panel.
  await page.evaluate(() => { window.__focused = []; const focus = HTMLElement.prototype.focus; HTMLElement.prototype.focus = function (...args) { window.__focused.push(this.id || this.dataset.toolId || this.tagName); return focus.apply(this, args); }; });
  await page.goBack();
  await expect(page.locator(".wb-breadcrumb [data-wb-crumb-tool]")).toHaveText("Frame Check");
  await page.waitForTimeout(800);
  const focused = await page.evaluate(() => window.__focused);
  expect(focused).not.toContain("workbench-title");
  expect(focused.at(-1)).toBe("selected-tool-title");
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "doc");
  await expect(page.locator("#selected-tool-title")).toBeFocused();
});

test("switching audience dismisses the previous audience's next-step panel", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?audience=k12#wb-doc-frame-check");
  await page.locator("[data-start-assistant]").click();
  await expect(page.locator("#wb-next-step")).toBeVisible();
  await page.locator("#lab-audience").selectOption("he");
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "doc");
  await expect(page.locator("#wb-next-step")).toBeHidden();
});

test("job groups show their tools", async ({ page }) => {
  await page.goto("/?audience=pme#workbench");
  for (const job of ["design", "assess", "colleagues", "repeat"]) await expect(page.locator(`[data-job="${job}"] .tool-card`).first()).toBeVisible();
});

const studentDataNote = "Remove names and identifying details from student work before pasting it into an AI assistant, and follow your school's or institution's policy.";

// The document scrolls with the page (no nested scroller) while the title,
// Start, and Download stay in a sticky bar just below the site nav.
async function expectDocScrollsWithActionsInReach(page, inBar) {
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
  expect(await page.evaluate(() => getComputedStyle(document.querySelector(".template-rendered")).overflowY)).not.toMatch(/auto|scroll/);
  expect(await page.evaluate(() => document.documentElement.scrollHeight > innerHeight * 3)).toBe(true);
  const target = await page.evaluate(() => { const y = Math.round(document.documentElement.scrollHeight * 0.8); window.scrollTo(0, y); return Math.min(y, document.documentElement.scrollHeight - innerHeight); });
  await page.waitForFunction((y) => Math.abs(window.scrollY - y) <= 1, target);
  for (const sel of inBar) {
    const hit = await page.evaluate((s) => {
      const el = document.querySelector(s); const r = el.getBoundingClientRect();
      const nav = document.querySelector(".package-nav").getBoundingClientRect().bottom;
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return { below: r.top >= nav - 1, inView: r.bottom <= innerHeight, reachable: !!top && (top === el || el.contains(top)) };
    }, sel);
    expect(hit, sel).toEqual({ below: true, inView: true, reachable: true });
  }
}

test("document view scrolls with the page and keeps its actions in reach", async ({ page }) => {
  await expectDocScrollsWithActionsInReach(page, ["#selected-tool-title", "[data-start-assistant]", "#selected-tool-download"]);
});

test("phone: document view scrolls with the page and keeps a compact action bar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectDocScrollsWithActionsInReach(page, ["[data-start-assistant]", "#selected-tool-download"]);
  // Only Start + Download stick on phones: one 44px row under the 110px site nav (measured bottom 166.5px).
  const barBottom = await page.evaluate(() => document.querySelector(".selected-heading .tool-actions").getBoundingClientRect().bottom);
  expect(barBottom).toBeLessThanOrEqual(170);
  expect(await page.evaluate(() => document.querySelector("#selected-tool-title").getBoundingClientRect().bottom)).toBeLessThan(0);
});

test("the opened tool's heading takes focus without a lingering ring after a click", async ({ page }) => {
  await page.goto("/?audience=he#workbench");
  await page.locator('[data-tool-id="frame-check"]').click();
  const title = page.locator("#selected-tool-title");
  await expect(title).toBeFocused();
  expect(await title.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe("none");
});

test("Start in your assistant shows the next step until the view changes", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?audience=k12#wb-doc-frame-check");
  const panel = page.locator("#wb-next-step");
  await expect(panel).toBeHidden();
  await page.locator("[data-start-assistant]").click();
  await expect(panel).toBeVisible();
  await expect(panel).toContainText("Copied. Paste it into a new chat in ChatGPT, Claude, or Gemini.");
  await expect(panel).toContainText("Assistant can't read web links? Download the file and attach it instead.");
  await expect(panel).toContainText(studentDataNote);
  await expect(page.locator("#wb-next-line")).toContainText("/assets/workbench/k12/frame-check.md");
  await expect(page.locator("#copy-status")).toContainText("Copied");
  await page.waitForTimeout(1600);
  await expect(panel).toBeVisible();
  await page.locator("[data-wb-home]").click();
  await page.locator('[data-tool-id="assessment"]').click();
  await expect(panel).toBeHidden();
});

test("Start in your assistant selects the line for manual copy when copying fails", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("denied")) } });
  });
  await page.goto("/?audience=he#wb-doc-frame-check");
  await page.locator("[data-start-assistant]").click();
  await expect(page.locator("#wb-next-step")).toBeVisible();
  const line = await page.locator("#wb-next-line").textContent();
  expect(line).toContain("/assets/workbench/he/frame-check.md");
  expect(await page.evaluate(() => String(window.getSelection()))).toBe(line);
});

test("no tool card is marked current before a selection", async ({ page }) => {
  await page.goto("/?audience=he#workbench");
  await expect(page.locator('[data-tool-id="frame-check"]')).toBeVisible();
  await expect(page.locator("[data-tool-id][aria-current], [data-concept-id][aria-current]")).toHaveCount(0);
});

// Start clicked deep in the document scrolls the next-step panel into view
// below whichever element is actually stuck (whole heading row on desktop,
// just the actions on phones).
for (const [width, height] of [[1440, 900], [390, 844]]) {
  test(`${width}: Start deep in the document shows the panel below the stuck bar`, async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.setViewportSize({ width, height });
    await page.goto("/?audience=he#wb-doc-frame-check");
    await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
    const target = await page.evaluate(() => { const y = Math.round(document.documentElement.scrollHeight * 0.6); window.scrollTo(0, y); return Math.min(y, document.documentElement.scrollHeight - innerHeight); });
    await page.waitForFunction((y) => Math.abs(window.scrollY - y) <= 1, target);
    await page.locator("[data-start-assistant]").click();
    await expect(page.locator("#wb-next-step")).toBeVisible();
    const geo = () => page.evaluate(() => {
      const bar = document.querySelector(".selected-heading .tool-actions").getBoundingClientRect();
      const panel = document.getElementById("wb-next-step").getBoundingClientRect();
      return { belowBar: panel.top >= bar.bottom, inView: panel.bottom <= innerHeight };
    });
    await expect.poll(geo).toEqual({ belowBar: true, inView: true });
  });
}

test("375: document view has no horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
});

const workbenchDataLoaded = (page) => page.waitForFunction(() => typeof loadedWorkbenchData !== "undefined" && !!loadedWorkbenchData);

test("re-rendering the workbench does not announce an opened tool", async ({ page }) => {
  await page.goto("/?audience=he#workbench");
  await workbenchDataLoaded(page);
  await expect(page.locator('[data-tool-id="frame-check"]')).toBeVisible();
  await expect(page.locator("#copy-status")).not.toContainText("Opened");
  await page.locator('[data-mode-tab="overview"]').click();
  await expect(page.locator("#copy-status")).not.toContainText("Opened");
  await page.locator('[data-mode-tab="workbench"]').click();
  await expect(page.locator("#copy-status")).not.toContainText("Opened");
  await page.locator('[data-tool-id="frame-check"]').click();
  await expect(page.locator("#copy-status")).toHaveText("Opened Frame Check");
});

test("returning from a concept note focuses its card inside the collapsed notes", async ({ page }) => {
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
  await page.locator('#workbench-doc-view a[href="#wb-doc-facilitation-blocks"]').first().click();
  await expect(page.locator(".wb-breadcrumb [data-wb-crumb-tool]")).toContainText("Facilitation Blocks");
  await expect(page.locator("[data-start-assistant]")).toBeHidden();
  await expect(page.locator("#selected-tool-download")).toBeVisible();
  await page.locator("[data-wb-home]").click();
  await expect(page.locator("#panel-workbench")).toHaveAttribute("data-wb-view", "overview");
  const card = page.locator('[data-concept-id="facilitation-blocks"]');
  await expect(card).toBeFocused();
  await expect(card).toBeInViewport();
});

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
  await expect(page.locator("[data-wb-crumb-tool]")).not.toHaveText("Frame Check");
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
  await expect(script.locator("summary .script-label")).toContainText("What your assistant will do");
  await expect(script.locator("summary .script-tag")).toHaveText("AI Facilitation Block");
  const line = script.getByText("Run Frame Check with me", { exact: false });
  await expect(line).toBeHidden();
  await script.locator("summary").click();
  await expect(line).toBeVisible();
});

test("desktop: the card, the how-to note, and the document line up", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("#wb-glance")).toBeVisible();
  const box = sel => page.locator(sel).evaluate(el => el.getBoundingClientRect().toJSON());
  const [card, note, doc] = [await box("#wb-glance"), await box(".use-note"), await box("#workbench-doc-view")];
  expect(Math.abs(note.top - card.top)).toBeLessThan(8);
  expect(Math.abs(card.width - doc.width)).toBeLessThan(2);
  expect(doc.top).toBeGreaterThan(card.bottom);
  const firstInDoc = await page.locator("#workbench-doc-view > *").first().evaluate(el => el.className);
  expect(firstInDoc).toBe("assistant-script");
  const scriptTop = await page.locator("#workbench-doc-view > .assistant-script").evaluate(el => el.getBoundingClientRect().top);
  expect(scriptTop - doc.top, "no empty band above the collapsed script").toBeLessThan(34);
});

test("a deep-linked tool title has no focus outline competing with the card", async ({ page }) => {
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("#selected-tool-title")).toBeFocused();
  expect(await page.locator("#selected-tool-title").evaluate(el => getComputedStyle(el).outlineStyle)).toBe("none");
});

test("desktop: a concept note's document starts level with its note", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/?audience=he#wb-doc-facilitation-blocks");
  await expect(page.locator("#wb-glance")).toBeHidden();
  const top = sel => page.locator(sel).evaluate(el => el.getBoundingClientRect().top);
  expect(Math.abs((await top("#workbench-doc-view")) - (await top(".use-note")))).toBeLessThan(8);
});

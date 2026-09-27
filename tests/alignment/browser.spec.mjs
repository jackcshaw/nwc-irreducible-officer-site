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
  const text = await page.evaluate(() => navigator.clipboard.readText());
  expect(text).toContain("/assets/workbench/k12/frame-check.md");
  expect(text).toContain("My setting is High school.");
});

test("job groups show their tools", async ({ page }) => {
  await page.goto("/?audience=pme#workbench");
  for (const job of ["design", "assess", "colleagues", "repeat"]) await expect(page.locator(`[data-job="${job}"] .tool-card`).first()).toBeVisible();
});

const studentDataNote = "Remove names and identifying details from student work before pasting it into an AI assistant, and follow your school's or institution's policy.";

// The document scrolls with the page (no nested scroller) while the title,
// Start, and Download stay in a sticky bar just below the site nav.
async function expectDocScrollsWithActionsInReach(page) {
  await page.goto("/?audience=he#wb-doc-frame-check");
  await expect(page.locator("#workbench-template")).toContainText("Frame Check record");
  expect(await page.evaluate(() => getComputedStyle(document.querySelector(".template-rendered")).overflowY)).not.toMatch(/auto|scroll/);
  expect(await page.evaluate(() => document.documentElement.scrollHeight > innerHeight * 3)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.8));
  await page.waitForTimeout(100);
  for (const sel of ["#selected-tool-title", "[data-start-assistant]", "#selected-tool-download"]) {
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
  await expectDocScrollsWithActionsInReach(page);
});

test("phone: document view scrolls with the page and keeps its actions in reach", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectDocScrollsWithActionsInReach(page);
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

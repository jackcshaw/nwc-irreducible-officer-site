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

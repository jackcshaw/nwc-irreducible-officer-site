import { test, expect } from "@playwright/test";

// The first-visit intro reel and its masthead replay. Every other spec runs
// with the reel already marked as seen (playwright.config.mjs); these start
// from a first visit unless a test sets the flag itself.
test.use({ storageState: { cookies: [], origins: [] } });

const reel = (page) => page.locator("#reel-dialog");
const isOpen = (page) => page.evaluate(() => document.getElementById("reel-dialog")?.open === true);
const playback = (page) =>
  page.evaluate(() => {
    const video = document.querySelector("#reel-dialog video");
    return { time: video.currentTime, paused: video.paused, muted: video.muted };
  });
const markSeen = (context) => context.addInitScript(() => localStorage.setItem("jl-reel-seen", "1"));

test("a first visit to the home page opens with the reel playing, muted", async ({ page }) => {
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  expect(await page.evaluate(() => document.getElementById("reel-dialog").matches(":modal"))).toBe(true);
  await expect.poll(async () => (await playback(page)).time, { timeout: 8000 }).toBeGreaterThan(0.5);
  expect((await playback(page)).muted).toBe(true);
});

test("Skip closes the reel and stops it", async ({ page }) => {
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await page.getByRole("button", { name: "Skip the reel" }).click();
  await expect(reel(page)).toBeHidden();
  expect((await playback(page)).paused).toBe(true);
  await expect(page.locator(".lab-masthead")).toBeVisible();
});

test("Escape closes the reel and stops it", async ({ page }) => {
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(reel(page)).toBeHidden();
  expect((await playback(page)).paused).toBe(true);
});

test("the reel autoplays only on the first visit", async ({ page }) => {
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await page.reload();
  await expect(page.locator(".lab-masthead")).toBeVisible();
  await page.waitForTimeout(1500);
  expect(await isOpen(page)).toBe(false);
});

for (const mode of ["workbench", "sources", "he-essay"]) {
  test(`a first visit to #${mode} goes straight to that page`, async ({ page }) => {
    await page.goto(`/#${mode}`);
    await expect(page.locator("body")).toHaveAttribute("data-active-mode", mode);
    await expect(page.locator(".lab-masthead")).toBeVisible();
    await expect(page.getByRole("button", { name: /Watch the reel/ })).toBeVisible();
    await page.waitForTimeout(1500);
    expect(await isOpen(page)).toBe(false);
  });
}

test("reduced motion skips the autoplay", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".lab-masthead")).toBeVisible();
  await expect(page.getByRole("button", { name: /Watch the reel/ })).toBeVisible();
  await page.waitForTimeout(1500);
  expect(await isOpen(page)).toBe(false);
});

test("the site does not wait when the reel cannot load", async ({ page }) => {
  const attempts = [];
  await page.route("**/assets/reel/**", (route) => {
    attempts.push(route.request().url());
    return route.abort();
  });
  await page.goto("/");
  // The intro did try to load the reel, then gave up and got out of the way.
  await expect.poll(() => attempts.length, { timeout: 5000 }).toBeGreaterThan(0);
  await expect(reel(page)).toBeHidden({ timeout: 6000 });
  await expect(page.locator(".lab-masthead")).toBeVisible();
  await page.locator("#tab-sources").click();
  await expect(page.locator("body")).toHaveAttribute("data-active-mode", "sources");
});

test("Sound turns the reel's audio on and off", async ({ page }) => {
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await page.getByRole("button", { name: "Turn sound on" }).click();
  expect((await playback(page)).muted).toBe(false);
  await page.getByRole("button", { name: "Turn sound off" }).click();
  expect((await playback(page)).muted).toBe(true);
});

test("when the reel finishes it closes by itself and the site is usable", async ({ page }) => {
  test.setTimeout(45_000);
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await expect(reel(page)).toBeHidden({ timeout: 25_000 });
  await expect(page.getByRole("button", { name: /Watch the reel/ })).toBeVisible();
  await page.locator("#tab-sources").click();
  await expect(page.locator("body")).toHaveAttribute("data-active-mode", "sources");
});

test("the masthead button replays the reel with sound and Close returns focus to it", async ({ page, context }) => {
  await markSeen(context);
  await page.goto("/");
  await expect(page.locator(".lab-masthead")).toBeVisible();
  await page.waitForTimeout(800);
  expect(await isOpen(page)).toBe(false);
  const replay = page.getByRole("button", { name: /Watch the reel/ });
  await replay.click();
  await expect(reel(page)).toBeVisible();
  await expect.poll(async () => (await playback(page)).time, { timeout: 8000 }).toBeGreaterThan(0.3);
  expect((await playback(page)).muted).toBe(false);
  await page.getByRole("button", { name: "Close the reel" }).click();
  await expect(reel(page)).toBeHidden();
  await expect(replay).toBeFocused();
});

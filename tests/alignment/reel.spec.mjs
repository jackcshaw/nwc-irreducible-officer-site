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
  // Plays the real reel to its end: real decode time, so leave room for a slow runner.
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await expect(reel(page)).toBeHidden({ timeout: 40_000 });
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

// Review round 1 (PR #27): regressions for the confirmed findings and the
// "steps aside" paths the first round left untested.

test("without <dialog> support the reel stays out of the page", async ({ page }) => {
  await page.addInitScript(() => {
    delete HTMLDialogElement.prototype.showModal;
    // A browser that does not know <dialog> has no rule hiding a closed one.
    document.addEventListener("DOMContentLoaded", () => {
      const style = document.createElement("style");
      style.textContent = "dialog:not([open]){display:block}";
      document.head.append(style);
    });
  });
  await page.goto("/");
  await expect(page.locator(".lab-masthead")).toBeVisible();
  await expect(reel(page)).toBeHidden();
  await expect(page.locator("[data-reel-replay]")).toBeHidden();
  await page.locator("#tab-sources").click();
  await expect(page.locator("body")).toHaveAttribute("data-active-mode", "sources");
});

test("the reel steps aside when playback stalls", async ({ page }) => {
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await expect.poll(async () => (await playback(page)).time, { timeout: 8000 }).toBeGreaterThan(0.3);
  // Freeze playback mid-reel, as a dropped connection would.
  await page.evaluate(() => document.querySelector("#reel-dialog video").pause());
  await expect(reel(page)).toBeHidden({ timeout: 8000 });
});

test("a tab switch mid-reel resumes the reel rather than ending it", async ({ page }) => {
  await page.addInitScript(() => {
    // While a tab is hidden the browser runs no animation frames and pauses
    // muted video; when the visitor returns, frames resume before the video does.
    const raf = window.requestAnimationFrame.bind(window);
    let held = null;
    window.requestAnimationFrame = (cb) => (held ? (held.push(cb), 0) : raf(cb));
    const video = () => document.querySelector("#reel-dialog video");
    window.__hideTab = () => {
      held = [];
      video().pause();
    };
    window.__showTab = () => {
      const callbacks = held;
      held = null;
      raf((now) => {
        callbacks.forEach((cb) => cb(now));
        video().play();
      });
    };
  });
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await expect.poll(async () => (await playback(page)).time, { timeout: 8000 }).toBeGreaterThan(0.3);
  await page.evaluate(() => window.__hideTab());
  await page.waitForTimeout(6000);
  const pausedAt = (await playback(page)).time;
  await page.evaluate(() => window.__showTab());
  await expect.poll(async () => (await playback(page)).time, { timeout: 5000 }).toBeGreaterThan(pausedAt + 0.3);
  expect(await isOpen(page)).toBe(true);
});

test("the reel steps aside on a media error after playback starts", async ({ page }) => {
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await expect.poll(async () => (await playback(page)).time, { timeout: 8000 }).toBeGreaterThan(0.3);
  await page.evaluate(() => {
    const video = document.querySelector("#reel-dialog video");
    Object.defineProperty(video, "error", { get: () => ({ code: 2, message: "network" }), configurable: true });
    video.dispatchEvent(new Event("error"));
  });
  await expect(reel(page)).toBeHidden({ timeout: 3000 });
});

test("the reel steps aside when the video never starts", async ({ page }) => {
  await page.route("**/assets/reel/**", () => {}); // hold every request open
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(reel(page)).toBeHidden({ timeout: 12_000 });
  await expect(page.locator(".lab-masthead")).toBeVisible();
});

test("autoplay blocked by the browser goes straight to the site", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException("blocked", "NotAllowedError"));
  });
  await page.goto("/");
  await expect(reel(page)).toBeHidden({ timeout: 3000 });
  await expect(page.locator(".lab-masthead")).toBeVisible();
});

test("data saver skips the autoplay", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true }));
  await page.goto("/");
  await expect(page.locator(".lab-masthead")).toBeVisible();
  await expect(page.getByRole("button", { name: /Watch the reel/ })).toBeVisible();
  await page.waitForTimeout(1500);
  expect(await isOpen(page)).toBe(false);
});

test("a first visit in a background tab waits until the tab is shown", async ({ page }) => {
  await page.addInitScript(() => {
    let state = "hidden";
    Object.defineProperty(document, "visibilityState", { get: () => state, configurable: true });
    Object.defineProperty(document, "hidden", { get: () => state === "hidden", configurable: true });
    window.__showTab = () => {
      state = "visible";
      document.dispatchEvent(new Event("visibilitychange"));
    };
  });
  await page.goto("/");
  await expect(page.locator(".lab-masthead")).toBeVisible();
  await page.waitForTimeout(1500);
  expect(await isOpen(page)).toBe(false);
  await page.evaluate(() => window.__showTab());
  await expect(reel(page)).toBeVisible();
  await expect.poll(async () => (await playback(page)).time, { timeout: 8000 }).toBeGreaterThan(0.3);
});

test("a replay recovers after an earlier failed load", async ({ page, context }) => {
  await markSeen(context);
  await page.route("**/assets/reel/**", (route) => route.abort());
  await page.goto("/");
  const replay = page.getByRole("button", { name: /Watch the reel/ });
  await replay.click();
  await expect(reel(page)).toBeHidden({ timeout: 15_000 });
  await page.unroute("**/assets/reel/**");
  await replay.click();
  await expect(reel(page)).toBeVisible();
  await expect.poll(async () => (await playback(page)).time, { timeout: 10_000 }).toBeGreaterThan(0.3);
  expect(await page.locator("#reel-dialog video source").count()).toBe(2);
});

test("Escape during the handoff leaves nothing behind", async ({ page }) => {
  test.setTimeout(60_000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(reel(page)).toBeVisible();
  await expect(page.locator(".reel-dot")).toBeVisible({ timeout: 40_000 });
  await page.keyboard.press("Escape");
  await expect(reel(page)).toBeHidden();
  await expect(page.locator(".reel-dot")).toBeHidden();
  await expect(page.locator("[data-reel-replay]")).not.toHaveClass(/is-cued/);
  expect(errors).toEqual([]);
});

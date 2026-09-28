import { test, expect } from "@playwright/test";

// Playwright hides scrollbars by default, so a classic scrollbar never takes
// layout width. This file keeps them, so the page shift it guards against can
// occur. The config's storageState makes this a returning visitor (no autoplay).
test.use({ launchOptions: { ignoreDefaultArgs: ["--hide-scrollbars"] } });

test("opening the reel does not shift the page on desktops with classic scrollbars", async ({ page }) => {
  await page.addInitScript(() =>
    document.addEventListener("DOMContentLoaded", () => {
      const style = document.createElement("style");
      style.textContent = "::-webkit-scrollbar{width:17px}";
      document.head.append(style);
    }),
  );
  await page.goto("/");
  const periodLeft = () => page.evaluate(() => document.querySelector(".package-brand .brand-period").getBoundingClientRect().left);
  const before = await periodLeft();
  await page.getByRole("button", { name: /Watch the reel/ }).click();
  await expect(page.locator("#reel-dialog")).toBeVisible();
  expect(Math.abs((await periodLeft()) - before)).toBeLessThan(0.5);
});

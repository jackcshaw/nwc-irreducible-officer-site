import { test, expect } from "@playwright/test";

// The open call for collaborators. These specs run as returning visitors (no
// reel). The web app is mocked: a test endpoint is set on the form and routed.
const ENDPOINT = "https://script.google.com/macros/s/TEST/exec";
const form = (page) => page.locator("[data-collaborate-form]");

async function useEndpoint(page, respond) {
  const posts = [];
  await page.route(ENDPOINT, async (route) => {
    posts.push(route.request().postData());
    await respond(route);
  });
  await page.evaluate((url) => {
    document.querySelector("[data-collaborate-form]").dataset.endpoint = url;
  }, ENDPOINT);
  return posts;
}
const ok = (route) =>
  route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: '{"ok":true}' });

async function fillSignUp(page) {
  await page.getByLabel("Name", { exact: true }).fill("Ada Lovelace");
  await page.getByLabel("Email", { exact: true }).fill("ada@example.org");
  await page.getByLabel("Setting", { exact: true }).selectOption("pme");
  await page.getByLabel("Pilot with learners").check();
  await page.getByLabel("Review the evidence").check();
  await page.getByLabel(/What are you trying/).fill("Frame-first critiques in a staff college seminar.");
}

test("the masthead's open call opens the call from any page", async ({ page }) => {
  await page.goto("/#sources");
  await page.locator(".lab-masthead").getByRole("link", { name: /Open call/ }).click();
  await expect(page.locator("body")).toHaveAttribute("data-active-mode", "collaborate");
  await expect(page.getByRole("region", { name: "Open call for collaborators" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "Help keep human judgment at the forefront of AI" })).toBeVisible();
});

test("the footer links to the call", async ({ page }) => {
  await page.goto("/#discuss");
  await page.locator(".lab-footer").getByRole("link", { name: /collaborators/i }).click();
  await expect(page.locator("body")).toHaveAttribute("data-active-mode", "collaborate");
});

test("the Discuss invitation opens the same form", async ({ page }) => {
  await page.goto("/#discuss");
  await page.locator("#panel-discuss").getByRole("link", { name: "Join the open call" }).click();
  await expect(page.locator("body")).toHaveAttribute("data-active-mode", "collaborate");
  await expect(form(page)).toBeVisible();
});

test("Join the conversation at the top takes the reader straight to the form", async ({ page }) => {
  await page.goto("/#collaborate");
  await page.locator(".collaborate-hero").getByRole("button", { name: "Join the conversation" }).click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
});

for (const [where, locate] of [
  ["the strip near the top", (page) => page.locator(".open-call-strip").getByRole("link", { name: /Join the open call/ })],
  ["the Collaborate path", (page) => page.locator(".learning-paths").getByRole("link", { name: /Collaborate/ })],
]) {
  test(`the home page opens the call from ${where}`, async ({ page }) => {
    await page.goto("/");
    await locate(page).click();
    await expect(page.locator("body")).toHaveAttribute("data-active-mode", "collaborate");
  });
}

test("a chosen setting colors the Setting field as the site's chooser does", async ({ page }) => {
  await page.goto("/#collaborate");
  const setting = page.getByLabel("Setting", { exact: true });
  await setting.selectOption("he");
  const colors = await page.evaluate(() => {
    const select = document.getElementById("collaborate-setting");
    const plum = getComputedStyle(document.documentElement).getPropertyValue("--set-he").trim();
    const probe = document.createElement("i");
    probe.style.color = plum;
    document.body.append(probe);
    const expected = getComputedStyle(probe).color;
    probe.remove();
    return { background: getComputedStyle(select).backgroundColor, expected };
  });
  expect(colors.background).toBe(colors.expected);
});

test("the call preselects the reader's chosen setting", async ({ page }) => {
  await page.goto("/?audience=he#collaborate");
  await expect(page.getByLabel("Setting", { exact: true })).toHaveValue("he");
});

test("a setting chosen elsewhere on the site carries into the call", async ({ page }) => {
  await page.goto("/#sources");
  await page.locator("#lab-audience").selectOption("he");
  await page.locator(".lab-masthead").getByRole("link", { name: /Open call/ }).click();
  await expect(page.locator("body")).toHaveAttribute("data-active-mode", "collaborate");
  await expect(page.getByLabel("Setting", { exact: true })).toHaveValue("he");
});

test("changing the site setting on the call updates an untouched form, never a reader's own choice", async ({ page }) => {
  await page.goto("/?audience=pme#collaborate");
  const setting = page.getByLabel("Setting", { exact: true });
  await expect(setting).toHaveValue("pme");
  await page.locator("#lab-audience").selectOption("he");
  await expect(setting).toHaveValue("he");
  await setting.selectOption("other");
  await page.locator("#lab-audience").selectOption("k12");
  await expect(setting).toHaveValue("other");
});

test("keyboard users can still reach the five paths from the call", async ({ page }) => {
  await page.goto("/#collaborate");
  await expect(page.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);
  await expect(page.locator('[role="tab"][aria-selected="true"]')).toHaveCount(0);
  await page.locator(".reel-replay").focus();
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement.getAttribute("role"))).toBe("tab");
});

test("a sign-up that cannot be confirmed in time says it may have gone through", async ({ page }) => {
  await page.clock.install();
  await page.goto("/#collaborate");
  await useEndpoint(page, () => new Promise(() => {})); // the web app never answers
  await fillSignUp(page);
  await page.getByRole("button", { name: "Send" }).click();
  await page.clock.fastForward(16000);
  const fallback = page.locator("[data-collaborate-fallback]");
  await expect(fallback).toBeVisible();
  await expect(fallback.locator("[data-fallback-unknown]")).toBeVisible();
  await expect(fallback.locator("[data-fallback-failed]")).toBeHidden();
});

test("a complete sign-up posts once and confirms", async ({ page }) => {
  await page.goto("/#collaborate");
  const posts = await useEndpoint(page, ok);
  await fillSignUp(page);
  await page.getByRole("button", { name: "Send" }).click();
  const success = page.locator("[data-collaborate-success]");
  await expect(success).toBeVisible();
  await expect(success).toContainText("Thanks");
  expect(await success.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await expect(form(page)).toBeHidden();
  expect(posts).toHaveLength(1);
  const sent = new URLSearchParams(posts[0]);
  expect(sent.get("name")).toBe("Ada Lovelace");
  expect(sent.get("email")).toBe("ada@example.org");
  expect(sent.get("setting")).toBe("pme");
  expect(sent.getAll("ways")).toEqual(["pilot", "evidence"]);
  expect(sent.get("format")).toBe("json");
  expect(sent.get("page")).toContain("#collaborate");
  expect(sent.get("website")).toBe("");
});

test("required fields stop an empty sign-up before anything is sent", async ({ page }) => {
  await page.goto("/#collaborate");
  const posts = await useEndpoint(page, ok);
  await page.getByRole("button", { name: "Send" }).click();
  expect(await page.getByLabel("Name", { exact: true }).evaluate((el) => el.matches(":invalid"))).toBe(true);
  // Native validation stops the submit event, so nothing was ever sent or disabled.
  await expect(page.getByRole("button", { name: "Send" })).toBeEnabled();
  expect(posts).toHaveLength(0);
  await expect(page.locator("[data-collaborate-success]")).toBeHidden();
});

test("a failed sign-up keeps the entries and offers email", async ({ page }) => {
  await page.goto("/#collaborate");
  await useEndpoint(page, (route) => route.fulfill({ status: 500, headers: { "access-control-allow-origin": "*" }, body: "error" }));
  await fillSignUp(page);
  await page.getByRole("button", { name: "Send" }).click();
  const fallback = page.locator("[data-collaborate-fallback]");
  await expect(fallback).toBeVisible();
  await expect(fallback.locator("[data-fallback-failed]")).toBeVisible();
  await expect(fallback.locator("[data-fallback-unknown]")).toBeHidden();
  const href = await fallback.locator("[data-collaborate-mailto]").getAttribute("href");
  expect(href.startsWith("mailto:jshaw@comprendo.com?")).toBe(true);
  const body = new URLSearchParams(href.split("?")[1]).get("body");
  expect(body).toContain("Ada Lovelace");
  expect(body).toContain("Frame-first critiques in a staff college seminar.");
  await expect(page.getByLabel("Name", { exact: true })).toHaveValue("Ada Lovelace");
  await expect(page.getByRole("button", { name: "Send" })).toBeEnabled();
});

test("before the web app is configured, a sign-up offers email instead", async ({ page }) => {
  await page.goto("/#collaborate");
  await page.evaluate(() => {
    document.querySelector("[data-collaborate-form]").dataset.endpoint = "";
  });
  await fillSignUp(page);
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.locator("[data-collaborate-fallback]")).toBeVisible();
});

test("the honeypot is invisible to people", async ({ page }) => {
  await page.goto("/#collaborate");
  await expect(page.locator('input[name="website"]')).toHaveCount(1);
  await expect(page.locator('input[name="website"]')).toBeHidden();
});

for (const width of [1440, 390]) {
  test(`the call fits a ${width}px screen without sideways scrolling`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#collaborate");
    await expect(form(page)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

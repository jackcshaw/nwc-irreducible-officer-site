import { defineConfig } from "@playwright/test";
const baseURL = "http://127.0.0.1:5199";
export default defineConfig({
  testDir: "tests/alignment",
  testMatch: /.*\.spec\.mjs/,
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    // The intro reel autoplays on a first visit. Specs start as returning
    // visitors; tests/alignment/reel.spec.mjs opts back into a first visit.
    storageState: {
      cookies: [],
      origins: [{ origin: baseURL, localStorage: [{ name: "jl-reel-seen", value: "1" }] }],
    },
  },
  // Always start a fresh server so an old one never serves a stale dist.
  webServer: {
    command: "python3 -m http.server 5199 --bind 127.0.0.1 --directory dist",
    url: "http://127.0.0.1:5199/",
    reuseExistingServer: false,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});

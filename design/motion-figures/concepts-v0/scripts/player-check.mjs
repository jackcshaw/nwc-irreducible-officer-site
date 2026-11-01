// Behavioural checks for the shared player: autoplay on view, pause, beat jump, reduced-motion stepping.
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site/node_modules/playwright/index.mjs";
const b = await chromium.launch();
const results = [];
const ok = (name, cond, detail = "") => results.push(`${cond ? "PASS" : "FAIL"} ${name}${detail ? " (" + detail + ")" : ""}`);
const st = (p) => p.evaluate(() => { const f = document.querySelector("#frame-capture"); return { state: f.dataset.state, label: f.querySelector("[data-mf-label]").textContent, current: [...f.querySelectorAll("[data-beat]")].findIndex((x) => x.hasAttribute("aria-current")) }; });
{
  const p = await (await b.newContext({ viewport: { width: 1280, height: 700 } })).newPage();
  await p.goto("http://127.0.0.1:5263/frame-capture.html"); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  ok("does not play before it is in view", (await st(p)).state !== "playing", JSON.stringify(await st(p)));
  await p.locator("#frame-capture").scrollIntoViewIfNeeded(); await p.waitForTimeout(1800);
  let s = await st(p); ok("autoplays once mostly in view", s.state === "playing" && s.label === "Pause" && s.current >= 1, JSON.stringify(s));
  await p.click("[data-mf-toggle]"); s = await st(p); ok("pause button pauses", s.state === "paused" && s.label === "Play", JSON.stringify(s));
  await p.click('[data-beat="2"]'); await p.waitForTimeout(150); s = await st(p); ok("beat 3 jumps there and plays on", s.current === 2 && s.state === "playing", JSON.stringify(s));
  await p.waitForTimeout(4600); s = await st(p); ok("ends and offers replay", s.state === "ended" && s.label === "Replay" && s.current === 3, JSON.stringify(s));
}
{
  const p = await (await b.newContext({ viewport: { width: 1280, height: 700 }, reducedMotion: "reduce" })).newPage();
  await p.goto("http://127.0.0.1:5263/frame-capture.html"); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.locator("#frame-capture").scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
  let s = await st(p); ok("reduced motion: no autoplay, final frame", s.state !== "playing" && s.current === 3, JSON.stringify(s));
  await p.click('[data-beat="0"]'); await p.waitForTimeout(400); s = await st(p); ok("reduced motion: beat 1 shows a still, no playback", s.current === 0 && s.state === "paused", JSON.stringify(s));
}
console.log(results.join("\n"));
await b.close();

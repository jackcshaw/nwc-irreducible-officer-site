// Render a motion figure frame by frame through its seek hook, then encode MP4 and GIF.
// usage: node export-figure.mjs <page.html> <figure-id> <name> [fps]
import { chromium } from "/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site/node_modules/playwright/index.mjs";
import { mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
const [page, id, name, fpsArg] = process.argv.slice(2);
const fps = Number(fpsArg || 30);
const shots = new URL("../shots/", import.meta.url).pathname;
const tmp = `${shots}.frames-${name}/`;
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await p.goto(`http://127.0.0.1:5263/${page}?t=0`);
await p.evaluate(() => document.fonts.ready);
await p.waitForFunction((fid) => window.__motionFigures?.[fid], id);
const duration = await p.evaluate((fid) => window.__motionFigures[fid].duration, id);
const fig = p.locator(`#${id}`);
await fig.scrollIntoViewIfNeeded();
const n = Math.round(duration * fps);
for (let i = 0; i <= n; i++) {
  await p.evaluate(([fid, t]) => window.__motionFigures[fid].seek(t), [id, i / fps]);
  await fig.screenshot({ path: `${tmp}${String(i).padStart(4, "0")}.png` });
}
// hold the final frame for a second
for (let k = 1; k <= fps; k++) await fig.screenshot({ path: `${tmp}${String(n + k).padStart(4, "0")}.png` });
await b.close();
const D = "/Users/jackcshaw-2/dev/comprendo-clients/judgment-lab-showreel/node_modules/@remotion/compositor-darwin-arm64";
const ff = (args) => execFileSync(`${D}/ffmpeg`, ["-hide_banner", "-loglevel", "error", "-y", ...args], { env: { ...process.env, DYLD_LIBRARY_PATH: D } });
const even = "scale=trunc(iw/2)*2:trunc(ih/2)*2";
ff(["-framerate", String(fps), "-i", `${tmp}%04d.png`, "-vf", even, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", `${shots}${name}.mp4`]);
ff(["-framerate", String(fps), "-i", `${tmp}%04d.png`, "-vf", even, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", `${shots}${name}.webm`]);
ff(["-framerate", String(fps), "-i", `${tmp}%04d.png`, "-vf", "scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=bayer:bayer_scale=4", "-r", "15", `${shots}${name}.gif`]);
rmSync(tmp, { recursive: true, force: true });
console.log(`frames ${n + 1 + fps} at ${fps}fps -> ${name}.mp4, ${name}.webm, ${name}.gif`);

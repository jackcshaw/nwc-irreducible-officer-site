---
title: Site Playwright runs share port 5199 and the CPU with other sessions — wait or move, never kill, and rerun reel failures quietly
date: 2026-09-28
category: workflow-issues
module: development-workflow
problem_type: workflow_issue
component: development_workflow
related_components:
  - testing_framework
severity: medium
applies_when:
  - "Running npx playwright test in a site checkout or worktree while another session or terminal may be running the site suite"
  - "A run stops at once because port 5199 is already used"
  - "A tests/alignment/reel.spec.mjs test fails a toBeVisible or playback assertion while other suites, builds or renders load the CPU"
  - "Adding --repeat-each or a high --workers count to a run that includes the reel specs"
  - "Running the browser suite from a worktree that does not sit next to the workbench checkout"
symptoms:
  - "Error: http://127.0.0.1:5199/ is already used, make sure that nothing is running on the port/url or set reuseExistingServer:true in config.webServer."
  - "First-visit reel specs fail at expect(reel).toBeVisible() with 'unexpected value hidden' under parallel load"
  - "page.goto, which waits for load, takes about 20 s under load; the long wait points at the reel's <video>"
  - "The trace screencast shows the poster, no painted frames for 8 s, then the site: the reel never started and its start timer stepped aside"
root_cause: test_isolation
resolution_type: workflow_improvement
tags: [playwright, parallel-sessions, port-collision, flaky-tests, headless-chromium, video-decode, storage-state, intro-reel]
---

# Site Playwright runs share port 5199 and the CPU with other sessions — wait or move, never kill, and rerun reel failures quietly

## Context

During the review round for PR #27 (the first-visit intro reel), green code failed twice for reasons outside the change. Both came from another Claude session on the same machine, which was testing and then releasing PR #28 from the main site checkout at the same time.

**The port.** Every checkout and worktree of this repo binds the same port. `baseURL` is `http://127.0.0.1:5199` (`playwright.config.mjs:2`). The web server is `python3 -m http.server 5199 --bind 127.0.0.1 --directory dist` with `reuseExistingServer: false` (`playwright.config.mjs:19-23`), so a second run fails before any test starts:

```
Error: http://127.0.0.1:5199/ is already used, make sure that nothing is running on the port/url or set reuseExistingServer:true in config.webServer.
```

`lsof` showed a Python `http.server` on 5199. Its parent was `node …/nwc-irreducible-officer-site/node_modules/.bin/playwright test`, the other session's run. The reason for `reuseExistingServer: false` is recorded twice: the config's comment about never serving a stale `dist` (`playwright.config.mjs:18`), and the Alignment CI plan, which ties it to the hash-navigation verification trap (`docs/superpowers/plans/2026-09-26-content-alignment-ci.md:30`). Nothing records why the port is fixed and shared by every checkout (session history).

**The CPU.** `tests/alignment/reel.spec.mjs` plays the real reel. It opts back into a first visit (`tests/alignment/reel.spec.mjs:6`), so the reel autoplays, and its tests assert the reel is visible right after `page.goto` (`:18-19`, `:98-99`). The client gives a first-visit reel 8 s to start playing and a replay 12 s (`scripts/reel-client.js:106`). If `playing` has not fired by then, it dismisses itself so the site never waits on the network (`scripts/reel-client.js:99-104`, and `:236` clears the timer on `playing`). A cold video start in headless Chromium is slow. Under parallel CPU load it can run past that allowance. The reel then steps aside before the test looks, and the test fails as though the reel never opened.

Per this session's investigation (2026-09-28):

- **Stress run.** A stress run of three reel tests used `--repeat-each=3 --workers=6`, and the other session's suite was possibly still running. "when the reel finishes it closes by itself and the site is usable" failed 3 of 3 times at its first `toBeVisible` (`reel.spec.mjs:99`). The two other tests passed 3 of 3.
- **Its trace.** `page.goto` (which waits for `load`) took about 22 s, from about 0.3 s to 22.4 s. Only three screencast frames were painted: two around 1.3–1.5 s (the one inspected shows the reel's poster with Sound on / Skip), then nothing until about 9.3 s, which shows the plain site. The video never painted a frame, and the reel stepped aside when the start timer fired, as designed. A 9.3 s dismissal is consistent with the reel opening at about 1.3 s plus the 8 s allowance. Fonts and the poster had loaded within the first second, so the long `load` wait reads as the `<video>` holding the event while it waited for data.
- **Fresh-browser probe.** In a fresh browser, the first `playing` event arrived about 8.1 s after navigation, with no stress flags. The second and third runs in the same browser started in under a second, so the cold first start is the expensive part.
- **Quiet reruns.** On a quiet machine the same code passed 22/22 reel specs and then the full suite 71/71. It passed 94/94 after #28 merged, and 94/94 again on the release build for #30.

One failure was never explained. In the first full reel run, which took 2.6 min against 1.6 min for later quiet runs, "Escape during the handoff leaves nothing behind" (`reel.spec.mjs:254`) found the intro dialog still open 5 s after Escape. Three instrumented probes (logging `cancel`, `close` and the fade), three stress repeats at six workers, and every later full run all passed. The root cause is unknown.

## Guidance

**When 5199 is taken, find out who holds it, and never kill it.**

```sh
lsof -nP -iTCP:5199 -sTCP:LISTEN
ps -o pid,ppid,etime,command -p <pid>     # then check the parent: usually another checkout's `playwright test`
```

If the parent is another checkout's Playwright run, killing its server breaks that run midway. Either wait for it:

```sh
while lsof -nP -iTCP:5199 -sTCP:LISTEN >/dev/null; do sleep 5; done
```

or run on another port with a temporary config. PR #28's plan already states the rule for its own runs: "Port 5199 may be held by another project's test run; wait for it, never kill it" (`docs/superpowers/plans/2026-09-28-learn-by-setting.md:28`). On 2026-09-28 both sessions followed it: wait or move, never kill.

**Do not take the error message's advice.** With `reuseExistingServer: true`, your tests hit whatever `dist` the other checkout's server serves: its build, not yours. That is the stale-dist case the config's comment rules out (`playwright.config.mjs:18`).

**Use a temporary alt-port config, and don't commit it.** Put it in the repo root next to the real config, because Playwright resolves `testDir` relative to the config file. Run it, then delete it:

```js
// playwright.alt.config.mjs — temporary, uncommitted: the same config on another port
import base from "./playwright.config.mjs";
const baseURL = "http://127.0.0.1:5198";
export default {
  ...base,
  use: {
    ...base.use,
    baseURL,
    storageState: { cookies: [], origins: [{ origin: baseURL, localStorage: [{ name: "jl-reel-seen", value: "1" }] }] },
  },
  webServer: { ...base.webServer, command: "python3 -m http.server 5198 --bind 127.0.0.1 --directory dist", url: `${baseURL}/` },
};
```

```sh
npx playwright test -c playwright.alt.config.mjs
rm playwright.alt.config.mjs
```

Rewrite the `storageState` origin along with the port. The base config seeds the returning-visitor flag `jl-reel-seen` only for `origin: baseURL`, which is 5199 (`playwright.config.mjs:13-16`). localStorage is kept per origin, so without the rewrite every spec on 5198 starts as a first visit. The reel would then autoplay over pages that the non-reel specs expect to use.

**From a worktree, export the source paths in the same shell as the test run.** `tests/alignment/browser.spec.mjs:4-5` reads the workbench profiles at run time: from `WORKBENCH_REPO_PATH`, else a sibling `../workbench` directory outside this repo, resolved from the working directory. That fallback does not exist beside a worktree kept elsewhere. In this session, a run from a throwaway worktree set the variables only for the build. It stopped at collection with `ENOENT` for `…/workbench/audiences/profiles.json`. Export `COMPANION_REPO_PATH` and `WORKBENCH_REPO_PATH` once, then build and test in that shell.

**Run the final verification on the committed config.** Before you claim green, and for the release step, check `lsof -nP -iTCP:5199 -sTCP:LISTEN`. Once the port is free, run plain `npx playwright test` (or `npm run test:browser`, `package.json:9`) so the result matches CI.

**Treat a reel-spec failure under load as suspect until a quiet rerun passes.** "Quiet" means no other `playwright test` process on the machine (`ps -ef | grep "playwright test"`) and no stress flags.

- The config does not set `fullyParallel` (`playwright.config.mjs:3-25`), so a normal run plays one spec file's tests in order in a single worker.
- `--repeat-each` with several `--workers` spreads copies of the media tests across workers and multiplies the concurrent video starts.
- If a failure lands on a reel spec's first `toBeVisible` or its playback poll, and a quiet rerun passes, the cause was load.

**Diagnose from the trace before touching code.** Rerun the failing spec with `--trace=retain-on-failure`, then read the timeline and screencast without opening the trace viewer:

```sh
mkdir t && cd t && unzip -q ../test-results/<failing-test-dir>/trace.zip
python3 - <<'EOF'
import glob, json
for f in sorted(glob.glob('*-trace.trace')):          # one file can hold only a context record
    evs = [json.loads(l) for l in open(f)]
    starts = [e['startTime'] for e in evs if e.get('type') == 'before']
    if not starts:
        continue
    t0 = starts[0]
    for e in evs:
        ts = e.get('startTime') or e.get('endTime') or e.get('timestamp')
        if e.get('type') in ('before', 'after', 'screencast-frame') and ts:
            print(f"{ts - t0:8.0f}ms", e['type'], e.get('method') or e.get('file') or (e.get('error') or {}).get('message', ''))
EOF
```

Each `screencast-frame` event names a JPEG in the unzipped trace's `screencast/` folder, so open the few that matter.

- **A reel that played** paints a steady run of frames.
- **Two or three frames ending on the plain site** mean the video never started and the start allowance ran out.
- **A `goto` whose before-to-after gap is many seconds** means the page's `load` event was held up, which for this page points at the video.

**Don't "fix" load flakes in product code.** Lengthening the 8 s / 12 s start allowance (`scripts/reel-client.js:106`) or the 5 s stall watchdog (`scripts/reel-client.js:28`, used at `:125`) to pass on a busy machine would make real visitors wait longer on a stalled network. The reel is designed never to do that.

## Why This Matters

Both failures look like regressions in the change under test.

- **The port error** fires before any test runs. The two obvious responses are both wrong: killing whatever holds the port breaks another session's run, and following the error's `reuseExistingServer: true` hint silently tests another checkout's build.
- **The load failures** read as "the reel didn't open". They invite a debugging session in code that is working as designed. Here it took instrumented probes, stress repeats and a trace unpacked by hand before it was clear that the video had simply never started in time.

Nothing in the final code warns about either. `playwright.config.mjs` does not say the port is shared by every checkout and worktree. `reel.spec.mjs` says the "finishes" test needs "room for a slow runner" (`reel.spec.mjs:96`), but nothing about what parallel load does to the other first-visit tests.

## When to Apply

- Running `npm run test:browser` or `npx playwright test` in any site checkout or worktree while another session or terminal may be running the site suite.
- Seeing `http://127.0.0.1:5199/ is already used`.
- A `reel.spec.mjs` test fails at its first `toBeVisible`, its playback poll, or a long reel timeout while other suites, builds or renders are running.
- Before adding `--repeat-each` or a high `--workers` count to a run that includes the reel specs.
- Running the browser suite from a worktree that is not next to the workbench checkout.

## Examples

**Port taken.** Leave the holder alone, then wait or move:

```sh
$ lsof -nP -iTCP:5199 -sTCP:LISTEN
Python  53823 …  TCP 127.0.0.1:5199 (LISTEN)
$ ps -o pid,ppid,etime,command -p 53823
53823 53818 01:58 …/Python -m http.server 5199 --bind 127.0.0.1 --directory dist
$ ps -o command -p 53818
node …/nwc-irreducible-officer-site/node_modules/.bin/playwright test   # another checkout's run: leave it
```

**Load-shaped failure.** Confirm it before debugging:

```sh
npx playwright test -c playwright.alt.config.mjs tests/alignment/reel.spec.mjs --trace=retain-on-failure
# a first toBeVisible failed; the trace has three frames ending on the plain site and a ~22 s goto: the video never started
# once 5199 is free and nothing else is running:
npx playwright test          # quiet rerun on the committed config: 94 passed
```

**What not to do:**

```js
// playwright.config.mjs — don't: this tests whichever checkout's dist the running server serves
webServer: { ..., reuseExistingServer: true },

// scripts/reel-client.js — don't: a busy test machine is not a reason to make visitors wait longer
startTimer = setTimeout(giveUp, intro ? 20000 : 30000);
```

## Related

- Sibling learning: `docs/solutions/workflow-issues/stale-page-verification-hash-navigation.md`. That is another case where the local verification environment on port 5199 makes a result lie, so rule out the environment before debugging the code.

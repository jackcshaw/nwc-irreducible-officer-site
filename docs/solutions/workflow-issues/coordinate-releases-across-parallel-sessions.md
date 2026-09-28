---
title: Hold a feature merge while another session's site release is in flight — the last deploy wins
date: 2026-09-28
category: workflow-issues
module: development-workflow
problem_type: workflow_issue
component: development_workflow
severity: high
applies_when:
  - "Merging a site feature PR while another session or worktree may be releasing the site"
  - "An open Release YYYY.M.D PR exists on the site repo, or another session is running the release step"
  - "About to run firebase deploy --only hosting for judgmentlab.net"
  - "Two sessions have each merged work to main on the same day and each needs a release"
  - "Taking the deploy slot from, or handing it back to, another Claude session"
symptoms:
  - "Another session's release PR is open, or its release step is running, when a feature PR is ready to merge"
  - "A merged feature appears on judgmentlab.net under another release's version and notes"
  - "The live footer (Version X · sha) does not match the release that was just deployed"
root_cause: missing_workflow_step
resolution_type: workflow_improvement
tags: [release, firebase-hosting, deploy, parallel-sessions, last-writer-wins, hash-compare, cross-session, judgmentlab]
---

# Hold a feature merge while another session's site release is in flight — the last deploy wins

## Context

On 2026-09-28 two Claude sessions shipped the site within minutes of each other. One merged #28 (Learn by setting) at 21:40:04Z and its release PR #29 (2026.9.29) at 21:42:37Z, then built and deployed it. This session had #27 (the first-visit intro reel) reviewed and green, and the user wanted it live the same afternoon.

**How a release works here.** The step is documented in each feature plan (`docs/superpowers/plans/2026-09-26-frame-check.md:693`, `2026-09-27-teacher-summaries.md:446`, `2026-09-28-learn-by-setting.md:289`):

1. A release PR sets the `package.json` version (`package.json:3`).
2. After it merges, build from all three `main` branches with no `SITE_URL`.
3. Run all suites.
4. Run `firebase deploy --only hosting --project nwc-learning-companion`.
5. Hash-compare every file in `dist` against judgmentlab.net, with the root page at `/`.
6. Confirm the footer reads the new version.

**Four facts make parallel releases dangerous:**

- **A deploy replaces the whole site.** Hosting publishes the local `dist` (`firebase.json:3`), and `nwc-learning-companion` is the default project (`.firebaserc:3`). Whatever the deploying session built becomes the live site. Nothing merges two sessions' deploys; the last one wins.
- **CI never deploys.** The alignment workflow runs on pull requests, on pushes to `main`, and when another workflow calls it (`.github/workflows/alignment.yml:2-6`). It only installs, builds, runs `npm test` and runs the browser checks (`alignment.yml:68-79`). Production changes only when a session runs the deploy by hand. Keeping two sessions from colliding is therefore a coordination problem, not a pipeline one.
- **A release build takes everything on `main`.** "Build from all three mains" pulls in whatever has merged by build time. A feature merged after another session's release PR, but before that session builds, ships inside that release. It goes out under the other release's version, missing from its PR body, and unverified by the session that deployed it.
- **An old build rolls production back.** A session that deploys a `dist` built before another session's merge or deploy puts production back to that older state.

**The footer says what is live.** The build stamps the package version and the site commit it was built from (`scripts/build-site.mjs:23-31`) into the footer as `Version <version> · <site commit>` (`scripts/build-site.mjs:419`). So `curl -s https://judgmentlab.net/ | grep -oE 'Version [^<]*'` names the release and the exact site commit behind the current deploy.

## Guidance

**1. Before merging a feature to `main`, look for a release in flight.**

```sh
gh pr list -R jackcshaw/nwc-irreducible-officer-site --state open        # an open "Release YYYY.M.D" PR: someone is releasing
gh pr list -R jackcshaw/nwc-irreducible-officer-site --state merged --limit 5
curl -fsS -H "Cache-Control: no-cache" https://judgmentlab.net/ | grep -oE 'Version [^<]*'
```

Suppose a release PR has merged but the live footer still shows the previous version. Then that release's deploy is still pending, and a merge you make now can land inside it. Also check whether another agent session on the machine is working on the site. In Claude Code, the session list and cross-session messaging do this.

**2. Agree the order with the releasing session before you merge.** Say:
- what you want to ship;
- that you will hold your merge until its release is live and hash-verified;
- that it should reply when that is done.

Offer the one alternative, folding your change into its release. That only works if the session hears before it merges its release PR, because it then has to rebuild, rerun its suites and correct its release notes.

**3. Hold the merge; get ready meanwhile.** Bring your branch up to date with `main`, resolve conflicts, and run every suite, so you can merge the moment the slot frees. Treat the in-flight release as live only when:
- its session reports a passing hash-compare, and
- you have checked its footer yourself with the `curl` above.

A report from another session is a claim; the footer is evidence.

**4. Claim the deploy slot, then ship your own release.**

- Tell the other session you are taking the slot and ask it not to deploy until you report back.
- Merge your feature PR with `gh pr merge --merge`, without `--delete-branch`.
- Open a release PR that only bumps `package.json`, using the convention in Examples. Wait for CI, then merge.
- The version is date-shaped, but each release takes the next number, even on the same day. On 2026-09-28 (UTC), #29 shipped 2026.9.29 and #30 shipped 2026.9.30.

**5. Run the release step from a clean worktree at the release merge commit.**

```sh
git -C <site checkout> fetch origin
git -C <site checkout> worktree add --detach <tmp>/release <release-merge-commit>
cd <tmp>/release && npm ci
unset SITE_URL          # defaults to https://judgmentlab.net (scripts/build-site.mjs:16)
export COMPANION_REPO_PATH=<companion checkout on clean main> WORKBENCH_REPO_PATH=<workbench checkout on clean main>
npm run build && npm test && npx playwright test
firebase deploy --only hosting --project nwc-learning-companion
python3 hash_compare.py dist https://judgmentlab.net     # expect 0 mismatched or failed
curl -fsS -H "Cache-Control: no-cache" https://judgmentlab.net/ | grep -oE 'Version [^<]*'
curl -fsS https://judgmentlab.net/assets/release.json    # version + the commit each source repo was built from
```

- **Check provenance, not just bytes.** The hash-compare proves production matches your `dist`. It cannot prove your `dist` was built from the three `main`s. The build stamps each source checkout's current HEAD, not `origin/main`, and writes `unknown` when git fails (`scripts/build-site.mjs:23-31`). The stamp is published as `/assets/release.json` (`scripts/build-site.mjs:175`). Compare its `commits.site`, `commits.companion` and `commits.workbench` against each repo's `origin/main`, and treat `unknown` as a failure (session history; checked against the tree and the live file).
- **Why a fresh worktree.** It guarantees the deploy is exactly the release commit plus locked dependencies. The build already wipes `dist` first (`scripts/build-site.mjs:96`), so leftover build output is not the risk. Another session's uncommitted edits, or an unpulled `main` in a shared checkout, are.
- **Check the source checkouts.** Confirm each is on `main` with no tracked changes before building.
- **Keep `SITE_URL` unset.** A preview value left in the shell bakes the preview URL into the canonical and share tags and the copied prompts (`scripts/build-site.mjs:16`).
- **If the browser suite hits port 5199**, see the sibling learning `docs/solutions/workflow-issues/playwright-runs-share-port-and-cpu-with-other-sessions.md`.

**6. Hand the slot back with the evidence.** Report:
- the footer string;
- the files compared and matched;
- the three source commits;
- the suite results.

The other session can then deploy next without guessing what is live.

## Why This Matters

A `firebase deploy` from the wrong build fails silently in one of two ways:
- It rolls back work another session has already shipped and verified.
- It ships changes that no release reviewed.

Nothing in the repo or CI warns about either, because CI never deploys. Afterwards the footer claims a version whose release notes describe something other than what is live.

The protocol is cheap. Holding one merge for one deploy let both releases ship the same afternoon. Each was hash-verified against the live site, and nothing was rolled back. The releasing session also confirmed independently that its own Learn-by-setting markup was still live after the second deploy.

## When to Apply

- Merging to the site's `main` while another session or person may be releasing.
- Running `firebase deploy` for the site on a day more than one session has touched `main`.
- An open `Release …` PR exists, or a merged release PR's version is not yet on the live footer.
- Being asked to "get X live" while another release is in progress.

## Examples

**The 2026-09-28 sequence** (merge times from `gh pr view`):

| Time (UTC) | Event |
| --- | --- |
| 21:40:04 | #28 (Learn by setting) merged by the other session |
| 21:42:37 | #29 (Release 2026.9.29) merged. This session had #27 ready, messaged the releasing session, and held the merge while it brought its branch up to date with `main`. |
| — | The releasing session deployed 2026.9.29 and reported 102 files matching byte for byte, footer `Version 2026.9.29 · dea2f4b`. This session confirmed the footer with `curl`, then claimed the deploy slot. |
| 21:49:51 | #27 (intro reel) merged |
| 21:52:57 | #30 (Release 2026.9.30, the `package.json` bump) merged |
| — | Built in a clean detached worktree at the #30 merge, with `npm ci`, clean source checkouts on `main` and no `SITE_URL`. The build passed, `npm test` was clean and 94/94 browser tests passed. After the deploy, 105/105 files matched, the footer read `Version 2026.9.30 · 9ada8bc`, and a headless first visit showed the reel playing. The slot was handed back with that evidence. |

**Coordination messages that worked** (generic):

> Heads-up: I want PR #N live. I'll ship it right after your release X, not inside it. I won't merge #N until judgmentlab.net shows "Version X". Please reply when X is deployed and hash-verified. If you'd rather fold #N into X, tell me before you merge your release PR.

> I'm taking the deploy slot for release Y. Please don't deploy judgmentlab.net until I report Y as deployed and hash-verified.

> Y is deployed and hash-verified: N files byte-for-byte, footer "Version Y · <sha>". Built from site main <sha>, companion main <sha> and workbench main <sha>; npm test clean, browser N/N. The deploy slot is free again.

**Release PR body** (the convention of #26, #29 and #30):

```markdown
## Summary
- Bumps the site version to 2026.9.30 (footer) for the first-visit intro reel (#27).

## Test plan
- [ ] Alignment check green
- [ ] After merge: build from all three mains, run all suites, deploy, hash-compare every file against judgmentlab.net, confirm the footer reads Version 2026.9.30
```

**Hash-compare script.** It fetches the root `index.html` at `/`. Other files are fetched at their built paths, and redirects are followed, because `cleanUrls` (`firebase.json:9`) serves `foo.html` at `/foo`. It sends `Accept-Encoding: identity` so it compares raw bytes.

```python
# hash_compare.py <dist-dir> <origin>  — e.g. python3 hash_compare.py dist https://judgmentlab.net
import hashlib, sys, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

dist, origin = Path(sys.argv[1]).resolve(), sys.argv[2].rstrip("/")
files = sorted(p for p in dist.rglob("*") if p.is_file())

def check(path):
    rel = path.relative_to(dist).as_posix()
    url = origin + "/" if rel == "index.html" else origin + "/" + urllib.parse.quote(rel)
    local = hashlib.sha256(path.read_bytes()).hexdigest()
    req = urllib.request.Request(url, headers={"Accept-Encoding": "identity", "Cache-Control": "no-cache"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:   # follows cleanUrls redirects
            return rel, url, "OK" if hashlib.sha256(resp.read()).hexdigest() == local else "MISMATCH"
    except Exception as exc:
        return rel, url, f"ERROR {exc}"

with ThreadPoolExecutor(max_workers=12) as pool:
    bad = [r for r in pool.map(check, files) if r[2] != "OK"]
for rel, url, verdict in bad:
    print(f"{verdict}: {rel} <- {url}")
print(f"{len(files)} files compared, {len(files) - len(bad)} match, {len(bad)} mismatched or failed")
sys.exit(1 if bad else 0)
```

Output from the 2026.9.30 deploy: `105 files compared, 105 match, 0 mismatched or failed`.

## Related

- `docs/solutions/workflow-issues/playwright-runs-share-port-and-cpu-with-other-sessions.md` covers the release suites' port and load behavior.
- `docs/solutions/workflow-issues/stale-page-verification-hash-navigation.md` covers forcing a reload before any hand check of a `#…` view, as the release plans note.
- The single-session release step is written out in each feature plan; the fullest statement is `docs/superpowers/plans/2026-09-27-teacher-summaries.md:446`.

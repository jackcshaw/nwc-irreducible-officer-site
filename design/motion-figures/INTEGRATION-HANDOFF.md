# Handoff to Codex: put the motion figures on judgmentlab.net

From November 1, 2026, Codex (tmux session `codex-1-2`) owns this block of work. Claude has stepped back from it. This is item 4 of [HANDOFF.md](HANDOFF.md). Items 1–3 are done: final verification passed, previews are exported, and MORNING.md is current.

## Read first

- [HANDOFF.md](HANDOFF.md): where the figures stand, and the working rules.
- [INTEGRATION-PLAN.md](INTEGRATION-PLAN.md): the design for this work.
  - §1: standalone pages (real static paths, recommended, or hash routes);
  - §2: the runtime in the site build;
  - §3: placement (§3.5 covers setting pages and editions, including the default edition and pre-rendering);
  - §4: tests;
  - §5: the PR sequence;
  - §6: decisions Jack must make first.
- [MORNING.md](MORNING.md): Jack's decisions so far. [CONVENTIONS.md](CONVENTIONS.md): editions, casts, the runtime and the frame-diff gates.

## Repos and branches

- **Site:** `jackcshaw/nwc-irreducible-officer-site`. `origin/main` is 05ab9b0, the 2026.10.27 release, which is live. Other sessions use the main checkout at `~/dev/comprendo-clients/nwc-irreducible-officer-site`, so work in your own worktrees, branched from `origin/main`.
- **The figures' source:** branch `motion-figures`, in the worktree `~/dev/comprendo-clients/nwc-irreducible-officer-site-motion`, folder `design/motion-figures/` (8 figures, runtime, editions, `casts.json`, scripts, baselines). Treat it as the source to bring into the site. Don't build site features on this branch. If a figure itself needs changing, change it there with a pathspec commit and a frame-diff gate.
- **Companion (your current folder):** content. Source-spine PRs #12–#14 are merged and go out with the next site release.
- **Leave alone:** site PR #34 (draft, sign-up page, branch `codex/practitioner-conversation`, worktree `-site-collaborate`). It waits on Jack to publish Apps Script v2.

## Already decided

- **Business, with the workplace cast, is the default** on standalone figure pages and in articles. PME stays reachable through the switch and from the essay and the PME setting.
- **The switch** reads "Workplace · Classroom · PME", with a note spelling out professional military education. High school is a variant of Classroom.
- **Casts:**
  - `seminar`: PME, "Faculty";
  - `workplace`: analysts and a manager;
  - `classroom`: higher ed, "the instructor";
  - `high-school`: "the teacher".
- **Pre-render** every edition and cast, so readers without JavaScript and crawlers get the text and meta (INTEGRATION-PLAN §3.5).

## Still Jack's call (put each in the plan with a recommendation)

- **Real static paths** `/failure-modes/<slug>/` or hash routes (INTEGRATION-PLAN §1; real paths recommended). Jack hasn't decided.
- **Mapping the site's settings to casts:** HE to `classroom`, K–12 to `high-school`. It's in the plan; confirm it.
- **The book's mapping** of failure modes to moves (provisional), and the rest of §6.

## Step 1, now: the plan, then stop

1. Make a worktree and branch from `origin/main` in the site repo.
2. Write an executable plan at `docs/plans/<YYYY-MM-DD>-feat-motion-figures-integration-plan.md`, built from INTEGRATION-PLAN.md:
   - the PR sequence;
   - files per PR;
   - tests and gates;
   - how the figures stay frame-identical once moved;
   - pre-rendering;
   - the release.
3. Open it as a docs PR, or share the path, and ask Jack to review. **Write no production code until he approves.**

## Step 2, after approval: build in small PRs

- Follow the §5 order, one branch and worktree per PR, from `origin/main`. Never commit or push to `main`.
- Follow the PR pipeline in `~/.codex/AGENTS.md`: a PR with a summary and test plan, then review, simplify, verify, and merge as it says.
- **No attribution lines** in commits or PR bodies.
- **Tests:** run `npm test` and Playwright. Playwright's port 5199 is fixed and other sessions share it, so use a temporary config with another port, never kill another session's server, and rerun load failures quietly before treating them as real.
- **Figures must stay frame-identical** when moved into the site: compare against the design baselines with `design/motion-figures/scripts/frame-diff.mjs` (transitions frozen, a quiet port). Run `scripts/edition-check.mjs`.
- **The machine runs low on memory** when exports or browsers overlap, so run one browser at a time.
- **Visitor copy:** run it through the writing-as-jack voice check (`~/.claude/skills/writing-as-jack/scripts/jack_eval.py`). Direct, and no "X, not Y" openings.
- **Release and deploy only with Jack's explicit go:** a version-bump PR, then a build from the three mains (site, companion, workbench), then `firebase deploy --only hosting --project nwc-learning-companion`, then a hash-compare. Fetch "/" for index.html, since /index.html returns a 301.

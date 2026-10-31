# Handoff: motion figures, October 30, 2026

Read this first in a new session, then MORNING.md (status and Jack's decisions) and CONVENTIONS.md (how the figures are built). Branch `motion-figures` in the site worktree `nwc-irreducible-officer-site-motion`, pushed and clean.

## Where it stands

- **Eight figures, four versions each:**
  - **PME:** the essay's own examples, "Faculty", the `seminar` cast. The default.
  - **Business:** `?edition=business`; analysts and a manager, grounded in a real study.
  - **Classroom:** `&cast=classroom`; students and "the instructor".
  - **High school:** `&cast=high-school`; students and "the teacher".
  - The switch on every page reads "Workplace · Classroom · PME". High school is a variant of Classroom, reached by URL or, later, the site's K–12 setting.
- **Business editions:** done. Each passed two cold reads and a verifier, and its sources were checked against the paper or decision.
- **Classroom versions:** built for all eight. Each had a light read by an educator, and its fixes are in. Uncalibrated reliance (the case packet) had two reads.
- **PME polish pass:** done, approved by Jack on October 30. These deliberately changed approved PME frames:
  - frame capture, beat 3;
  - premature synthesis, the dot label and laptop layout;
  - responsibility laundering, the split dot and the "responsibility" definition;
  - invisible delegation, the underline and the check ("Which notes did you keep, and why?");
  - monoculture, beat 8;
  - fluency substitution, phone pacing;
  - the laptop sizes everywhere.
- **Runtime:**
  - loading and failure hardening;
  - autoplay once the picture is in view;
  - the cast mechanism (`casts`, `castOverrides`, `byCast`), with the `seminar`, `classroom`, `high-school` and `workplace` casts;
  - `scripts/edition-check.mjs`.
- **Companion:** source-spine PRs #13 and #14 merged. They reach judgmentlab.net at the next site release.

## Not finished

1. **Done, October 30:** the final verification passed after fixes and a re-check (each figure's `tests/final-verify.md`, `RUNTIME-VERIFY.md`). The opening name card is now 4.2 s. ~~The final verification was stopped mid-run.~~ Rerun it: three verifiers, split FC/FS/PS, UR/ID/IM and RL/AR plus the runtime, briefed to check:
   - the PME polish changes;
   - the changed workplace wording (PS, ID, FS, RL, IM);
   - both classroom versions at 1440×900, 1280×720, 1366×657 and 390×844;
   - pacing, the switch and `aria-current`;
   - edition-check;
   - appropriate reliance's leak and gate checks, including PME's 390 verdict;
   - autoplay and the failure paths.

   Each writes `figures/<slug>/tests/final-verify.md`; the runtime check writes `RUNTIME-VERIFY.md`.
2. **Done, October 31:** the preview export pass. All eight figures in four versions (previews, beat stills, finals at 1440 and 390, plus appropriate reliance's path stills), 100 of 100 jobs, one at a time. Media files are gitignored and stay on disk. Many previews (mp4, webm, gif) are stale after the polish and classroom changes. Re-export them one figure at a time: memory ran out twice when exports overlapped.
3. **Done, October 30:** MORNING.md marks the classroom versions, the polish pass and the verification done.
4. **Site integration** (INTEGRATION-PLAN.md), not started:
   - real paths `/failure-modes/<slug>/`;
   - business as the default edition on standalone pages;
   - pre-rendering each edition and cast so no-JS readers and crawlers get text;
   - the site's HE and K–12 settings mapped to the classroom and high-school casts;
   - a sequence of small PRs, then a site release and a deploy with Jack's go.

## Other open threads (outside the figures)

- **Site PR #34**, the sign-up page and newsletter: Jack publishes Apps Script v2 (Deploy, Manage deployments, the pencil, New version). Then a controlled test, a check of the Sheet row and the jshaw@comprendo.dev inbox, deleting the test row, marking the PR ready, CI, merge, release and deploy with Jack's go.
- ***Judgment at Work*** (`essays/business.md` on the companion's `business-lens` branch): three voice judgment checks await Jack, and the branch has no PR yet.
- **KB ingest:** waits until Jack releases the held October 6 ingest. **THIA A17 registry entries:** another session had uncommitted edits.

## How to work here

- **Commits:** always commit with a pathspec, never `-a`, then check `git show --stat HEAD`. Several agents share this tree. If the permission check refuses a subagent's commit, check the diff, then commit it yourself (Jack approved this).
- **Ports:** never use or kill anything on port 5199. Serve the folder on another port, and stop servers when done.
- **Memory:** run one browser at a time; exports run one at a time.
- **Gates:** frame-diff before and after any change (`scripts/frame-diff.mjs`, transitions frozen, a quiet port). Captures can differ under load, so rerun alone before calling it a regression.
- **Shared files:** one writer at a time for `casts.json`. After editing it, regenerate `BUILTIN_CASTS` in `runtime/motion.js`; they must match.
- **Copy and sources:** visitor copy goes through the writing-as-jack voice check. Sources must be verified against the paper; a blocked download is never worked around.

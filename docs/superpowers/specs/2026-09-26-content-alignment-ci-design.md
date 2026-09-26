# Content alignment CI across companion, workbench, and site

Date: 2026-09-26. Status: design approved in conversation; awaiting spec review.

## Purpose

Judgment Lab is built from three public repositories. `nwc-irreducible-officer-companion` holds the essays, audience guides, and evidence notes. `nwc-faculty-workbench` holds the audience profiles and teaching templates. `nwc-irreducible-officer-site` builds the public site and its downloads from both.

On 2026-09-25 the HE and high-school editions changed direction: the goal is learners who direct AI toward a purpose they own, and the survey and surface-temperature cases were replaced by a return-to-office research memo and a New Deal unit. Manual scans the next day still found the old framing and old cases in site cards, workbench templates, and downloadable bundles, and review found case text duplicated across the site with nothing tying it to its source. None of the three repositories has CI.

This design makes those checks automatic, so a pull request in any of the three repositories fails when it would put the site out of alignment.

## Success criteria

- A PR in any of the three repositories builds the full site from all three and runs every check below.
- Each failure names the file, the rule, and the fix.
- Case text for the audience examples exists in exactly one place.
- A text rewrite that stops matching fails the build rather than shipping unchanged text.
- `main` in each repository accepts changes only through a PR whose alignment check passed.

Out of scope: judging whether an argument or paraphrase is sound, voice review, PDF appearance, and automated deploys. Those stay with people.

## Decisions

| Question | Decision |
| --- | --- |
| Where the gate runs | Every PR in all three repositories |
| Retired phrases | Block, unless the file is on the rule's allow list or the line carries an allow marker |
| Duplicated case text | Remove the copies; the site reads `profiles.json` (approach A) |
| Branch protection | Required alignment check on `main` in all three repositories |

Rejected: keeping duplicated copies with a comparison test (every change still edits three places), and merging into one repository (breaks the companion as a standalone kit and the workbench as a separate public repository).

## Checks

| Check | Runs in | Fails when |
| --- | --- | --- |
| Single source for case text | Site build | Audience practice or assessment text is not read from `profiles.json` |
| Text rewrites land | Site build | A template or bundle rewrite matches nothing |
| Retired phrases | `npm test`, over built output | A retired pattern appears outside its allowed files without an allow marker on the line |
| Download links | `npm test`, over built output | A relative link in a published standalone Markdown file points to a file the site does not publish. Context bundles are exempt; their headers state that relative links refer to the source repositories. |
| Visible content | `npm run test:browser`, headless Chromium | Key content is hidden, a practice flow does not complete, or the view changes without user action after load |
| Existing contracts | `npm test` | As today, including the companion `build_failure_mode_lab.py --check` |

### Browser checks (initial set)

- References: the source spine is visible and not inside a closed `details`.
- Each essay edition: the section rail lists every numbered section plus References.
- Each audience practice (PME, HE, high school): three responses advance through all stages, the review text appears, and the record contains the case and the three responses.
- Stability: after loading `#sources`, `#he-essay`, and `#workbench`, the hash and active mode are unchanged three seconds later.
- Width: at 390px, no page scrolls horizontally.

## Components

### Case text in `profiles.json` (workbench)

Each audience entry gains:

- `practice`: `{ "initial", "contribution", "change", "review" }` — the homepage and audience-page exercise, now hardcoded in `buildOpeningPractice` in `scripts/build-site.mjs`.
- `assessment`: `{ "rows": [[dimension, evidence]], "questions": [...], "descriptors": [4 strings] }` — now hardcoded in `scripts/workbench-audiences.mjs`.

All three audiences move, including PME. The site reads these fields and keeps no copies. The build fails if a profile lacks either field.

### Retired phrases (companion)

`alignment/retired-phrases.json`:

```json
[
  {
    "pattern": "teach the foundations",
    "regex": false,
    "reason": "Foundations are built inside the loop, not as a gate before AI use",
    "retired": "2026-09-25",
    "allowed_in": ["essays/adaptation-map.md", "artifacts/frame-first-assignment-design.md"]
  }
]
```

- Patterns match case-insensitively as plain text unless `regex` is true.
- `allowed_in` lists companion or workbench source paths (resolved in the companion first, then the workbench). A match passes when the normalized text around it also appears in one of those files, so the history notes pass wherever they are bundled.
- Any other intentional mention carries `<!-- alignment-allow: reason -->` on the same line.
- The initial list covers the framings retired on 2026-09-25 (for example "teach the foundations", "foundations made explicit", "bound learner responsibility", "model missing foundations", "before they can judge") and the old cases ("shuttle", "asphalt", "shaded grass", "matched tile", "surface-temperature readings", "survey warrant"), with the two history files allowed.
- A PR that retires a framing adds its rule in the same PR.

### Check scripts (site)

- `tests/alignment/retired-phrases.test.mjs` — scans visible text of `dist/index.html` and every file under `dist/assets`.
- `tests/alignment/links.test.mjs` — resolves every relative link in every published Markdown file against `dist/assets`; generalizes the adaptation-map check added on 2026-09-25.
- `tests/alignment/browser.spec.mjs` — Playwright against `dist` served locally.
- `package.json`: `npm test` runs the existing contracts plus the first two; `npm run test:browser` runs the third. Playwright is added as a dev dependency.

### Loud rewrites (site)

A helper `replaceOrThrow(text, pattern, replacement, label, {all})` replaces the silent `.replace()` and `.replaceAll()` calls in `adaptTool` (`scripts/workbench-audiences.mjs`). The context-bundle builders concatenate files without rewriting them and need no change. The two PME-only sentence removals stay optional, since only one of nine templates contains them. When a pattern matches nothing, the build throws with the template name and label. Replacement strings from profiles are passed through a function replacer so `$` sequences are never interpreted.

## CI workflow

### Reusable workflow (site)

`.github/workflows/alignment.yml`, triggered by `workflow_call`, `pull_request`, and `push` to `main`. Inputs: `caller_repo` and `caller_ref`.

1. Check out all three repositories as siblings. The caller uses its PR head. Each other repository uses a branch with the same name when one exists, otherwise `main`. The job summary lists the ref used for each.
2. Set up Node 24, Python 3.12 with Pillow and ReportLab, and Playwright Chromium, with dependency caching.
3. Run the build with `COMPANION_REPO_PATH` and `WORKBENCH_REPO_PATH`, then `npm test`, then `npm run test:browser`.
4. On failure, upload `dist/` and the Playwright report as an artifact.

The Linux build falls back from Georgia to Times in the generated PDF. CI output is for verification only; deploys continue from a macOS build.

### Callers (companion, workbench)

Each has `.github/workflows/alignment.yml` that calls `jackcshaw/nwc-irreducible-officer-site/.github/workflows/alignment.yml@main` on `pull_request`, passing its repository and head ref. A change to the shared suite applies to all three once it merges to the site's `main`.

### Merge order

Multi-repository changes use one branch name in every repository and merge companion, then workbench, then site. The site's `push` run on `main` reports a failure immediately if the site merged ahead of its dependencies. The opposite case, a companion or workbench merge breaking the site's `main`, surfaces on the site's next run; cross-repository dispatch would close that gap but needs a token with write access, so it is deferred until the gap causes a problem.

## Branch protection

After the workflows are green on their first PR, apply to `main` in all three repositories with `gh api`:

- Require a pull request before merging.
- Require the `alignment` status check to pass, with the branch up to date.
- Block force pushes and deletion of `main`.
- Apply to administrators, so the owner follows the same path. An owner can still disable the rule in settings for an emergency.

Required approving reviews are not enabled, since there is one maintainer and GitHub does not count self-approval.

## Rollout

1. Merge the open audience-refresh PRs (companion #6, workbench #6, site #19) in order.
2. Implement on branch `content-alignment-ci`: companion rules file; workbench profile fields; site checks, reads, and reusable workflow.
3. Verify each check fails on a deliberately broken input and passes on the fix.
4. Open the three PRs. The site PR's own workflow run checks out the same-named companion and workbench branches; merge companion, workbench, then site once it is green.
5. Add the caller workflows to companion and workbench in small follow-up PRs (they reference the site workflow on `main`, which now exists); merge when green.
6. Apply branch protection using the check names reported by the first runs.
7. Record any flaky browser check and fix it before calling the rollout done.

## Risks

- A site build failure blocks unrelated companion or workbench PRs. Accepted; the failure message names the site file.
- The retired-phrase list catches known wording only. A green check does not mean the argument is aligned.
- Browser checks add one to two minutes per PR and may flake; step 6 addresses that.
- `profiles.json` carries site-facing teaching text, coupling the public workbench data more closely to the site.

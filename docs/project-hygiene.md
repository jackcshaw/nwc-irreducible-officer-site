# Project Hygiene Note

This note exists to prevent the NWC package from drifting back into mixed checkouts, stale drafts, and unclear source-of-truth rules.

## Canonical Workspace

Use this local workspace:

`/Users/jackcshaw-2/dev/comprendo-clients/nwc`

It contains three separate repos:

- `site/` - public website, generated assets, package routing, and provenance archive.
- `companion/` - AI companion source materials used to generate the public context bundle.
- `workbench/` - faculty-facing markdown toolkit.

Do not use `/Users/jackcshaw-2/Documents/NWC` as a working directory. That path was retired.

The old mixed checkout is preserved only as an archive:

`/Users/jackcshaw-2/Documents/NWC-archive-mixed-checkout-20260630-001`

## Current Source Of Truth

The essay source of truth is:

`site/content/the-irreducible-officer.md`

Current verified SOT hash:

`92e65d59bd51af95662340661458aea486cbb6fde86813d79e6d69fc760b29fa`

The companion mirror must match the essay:

`companion/the-irreducible-officer.md`

The generated public asset must also match:

`site/dist/assets/essay.md`

Proof is synced to SOT for review convenience, but Proof is not the canonical editing surface unless explicitly re-established as such.

Active Proof review surface:

`https://www.proofeditor.ai/d/xgvk1ncv`

When syncing Proof, write from the site SOT and reread Proof afterward. Proof may serialize harmless markdown escapes, such as escaping square brackets in a reference note. Treat those as formatting serialization differences only after checking a diff and confirming the essay text has not changed.

Downloads files, review packages, and old pasted drafts are provenance only unless the user explicitly says they supersede SOT.

## Provenance Archive

Late review materials were moved into:

`site/docs/provenance/final-review-archive-2026-06/`

Those files are preserved for worst-case audit and recovery. Do not apply them wholesale. Some proposed edits were rejected, and some files contain mixed old/new tracked-change text.

## Clean Work Rule

Start future work from remote `main`, inside the relevant canonical repo.

For each repo:

```sh
cd /Users/jackcshaw-2/dev/comprendo-clients/nwc/<repo>
git fetch --all --prune
git checkout main
git pull --ff-only
```

Then create a short-lived branch only when needed:

```sh
git checkout -b codex/<short-task-name>
```

Do not begin new work in `/private/tmp` clones, Downloads, archived folders, old Proof exports, or stale PR branches.

Temporary files in `/private/tmp` are acceptable only as throwaway scratch space. They should not become a source of truth and should be removed after the task.

## Change Rules

For essay changes:

1. Start from `site/content/the-irreducible-officer.md`.
2. Present meaningful prose changes for review before editing when the user asks to approve wording.
3. After approval, update the site SOT.
4. Mirror the essay into `companion/the-irreducible-officer.md`.
5. Rebuild the site so generated assets and the companion bundle refresh.
6. Verify hashes across site SOT, companion mirror, generated asset, live site if deployed, and Proof if synced.

For companion changes:

1. Work in `companion/`.
2. Keep public-facing language accessible: ChatGPT, Claude, Gemini, or AI assistant.
3. Avoid repo-first or coding-agent language in public copy.
4. Rebuild the site if the public companion context bundle changes.

For workbench changes:

1. Work in `workbench/`.
2. Keep it faculty-facing and ready-to-use.
3. Avoid making users open repos or understand implementation details.

For site changes:

1. Work in `site/`.
2. Run `npm run build`.
3. Run `npm test`.
4. Deploy only after build/test pass and the user wants the public site updated.

## Completion Rules

Before calling work complete:

- all active repos should be on `main` or an intentional active branch;
- local branches should track the intended remote branch;
- `git status -sb` should be clean in each repo;
- no obsolete remote branches should remain after PR merge;
- Downloads should not contain active review files for this project;
- `/private/tmp` should not contain stale `nwc-*` or `proof-*` scratch artifacts;
- Proof should not be left with older essay content if it is still in circulation.

If any archive remains, it must be clearly labeled as archive/provenance, not SOT.

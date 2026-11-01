# Production integration

This directory preserves the reviewed motion-figure design record from source commit `8def5a10d90260db2b0ef4393f1421b14762731c` on `motion-figures`. Its executable pages are prototypes; the production site build does not read this directory. Large previews and frame captures remain ignored.

Codex owns site integration under the [approved integration plan](../../docs/plans/2026-11-01-feat-motion-figures-integration-plan.md). Production modules, templates and edition data will live in root `figures/`, publishable posters in `media/figures/`, and build integration in `scripts/`. There is no production player in this record-only PR.

Correct a figure itself on the `motion-figures` source branch, with an explicit pathspec commit and the frozen frame-diff gate, then import the approved change. Do not edit prototype and production copies independently. The source SHA and parity receipts identify the version imported into production.

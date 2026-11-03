# First public motion release — 2026-11-02

Jack authorized the first public release after reviewing the cross-site placement strategy. Codex completed the release. Book/dialog/page turns, collaborator-intake PR34 and the separate business essay draft remain outside this release.

## What is public

All eight figures are available in Workplace, higher-education, high-school and PME versions. `/failure-modes/` contains seven failure modes and a separate appropriate-reliance warm-up. Native collection routes also exist at `/failure-modes/classroom/`, `/failure-modes/high-school/` and `/failure-modes/pme/`.

Readers can enter from Learn, the footer, each setting landing, the three essays, Practice, five Discuss claims and three relevant Design tools. The setting survives the return journey. Ordinary reading pages use static posters; the interactive players load on standalone figure pages. Appropriate reliance opens at its first live question, and its Start over action replays the full figure with answers relocked.

## Accepted implementation

Site-access PR49 merged at `91d58028f849c78ad75d5d6b08b31a30e4e685a1`. Accepted candidate `5762d750a2b6da819a0e0fa15809f45490b84a1f` passed alignment run 41551368997, including all 217 browser tests. Page-parity run 41551368968 and runtime/interactive run 41551368949 passed; their downloaded receipts were independently checked against the exact candidate, pinned sources, harnesses, input hashes and outputs.

The receipt summaries are retained as `motion-access-page-ci-summary.json` and `motion-access-runtime-ci-summary.json`. They record 32 page receipts and 36 runtime/interactive receipts, with no differing or missing images, browser errors or quiet repeats. All 96 committed poster images and the approved runtime/edition/drawing sources remain unchanged by the access work.

Independent finish review returned SHIP after examining all 42 original desktop/mobile captures. Documentation review found no blocking gap. The detector returned no findings. An initial no-JavaScript adapted-essay defect and a Design-link placement defect were corrected and verified before acceptance. Optional future work is documenting the incumbent visual system; dense poster previews retain separate readable questions and links to full figures.

## Release and hosted verification

Release PR50 changed only the package version. PR-head alignment run 41555207625 and exact merge-head run 41555758729 both passed all 217 browser tests. Version `2026.11.2` was built from clean release commit `79d5282d06b056b76560839c1ad244c95578c0ad`, companion main `7c60b9f2b0cee56f8f19708597fc8e27d6ce37b0` and workbench main `e48f97d5d9a35921172dee6b28d8ebb6899b6f80`, with explicit source paths and no SITE_URL override. The release build passed Node contracts and all 217 local browser tests before deployment.

The final preview at https://nwc-learning-companion--motion-release-review-4iq680mf.web.app passed 302/302 file comparisons and 132 hosted behavior checks. The same checked build was deployed to Firebase project `nwc-learning-companion`.

Production at https://judgmentlab.net passed 302/302 byte comparisons, with zero mismatches or failed requests, and 132 hosted checks with no browser errors. The live release receipt identifies site `79d5282`, companion `7c60b9f` and workbench `e48f97d`. The alternate Firebase address is https://nwc-learning-companion.web.app/failure-modes/; all 302 files on that host also match the release artifact.

Hosted checks cover all 36 figure/reading pages, metadata and player readiness; 80 route aliases; selected-setting round trips; all four appropriate-reliance question flows at 375px; and no-JavaScript collections, reading disclosures and an adapted-essay return. Firebase serves slashless directory URLs directly with status 200 and redirects index.html aliases with status 301; both return the canonical page bytes. Earlier temporary harness assumptions about universal redirects and immediate replay gates were corrected to test the approved behavior; no product changes were made for those assumptions.

## Evidence and workspace closeout

Release evidence is retained under `../.archives/nwc/2026-11-02-motion-release/`, including source/worktree archives with file-hash receipts, CI artifacts and summaries, independent reviews, original screenshots, build/test logs, preview and production comparisons, and live release provenance. The archive is preservation evidence, not a build source. Remote branches are retained. Practice and site-access checkouts have been archived and retired. At the time of this documentation commit, the release checkout remains active for closeout; its archive and removal follow this documentation PR’s merge and are tracked separately in the archive receipt and active-work index.

Deployment establishes the published artifact, not educational validity. The classroom examples remain proposed adaptations for educator testing.

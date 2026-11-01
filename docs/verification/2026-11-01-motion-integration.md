# Motion integration verification — November 1

Owner: Codex. Scope: the approved integration plan and first-page defaults (D1–D6/D11/D12). Later editorial and release gates remain open. D12 was in the approved first-page table; the initial note that excluded it has been corrected.

## Completed prerequisites

- [Site PR #36](https://github.com/jackcshaw/nwc-irreducible-officer-site/pull/36), merged at `af0067b`: 224 archived design files match source `8def5a10d90260db2b0ef4393f1421b14762731c` exactly. Build/Node checks, 94 browser checks and exact-head CI passed. Production does not read the design directory.
- [Companion PR #15](https://github.com/jackcshaw/nwc-irreducible-officer-companion/pull/15), merged at `7c60b9f`: the seven original failure-mode table rows are shared data.
- [Site PR #37](https://github.com/jackcshaw/nwc-irreducible-officer-site/pull/37), merged at `08cf3c9`: strict row reader and regression checks. The complete generated homepage was byte-identical before/after extraction (`51cd60bf5e29bf5ddc959cb2ea443fedfbabf2360145065d9bc4b42c12a6977f`, before commit stamps changed). Build/Node checks and 94 browser checks passed. Updated head `6b48565` included PR #36 and passed CI before merge.
- No release or deployment. The live receipt inspected at the start identified site `05ab9b0`, version `2026.10.27`.

## Source reproducibility: font inputs

The source archive was frozen from `8def5a1` before capture and remains unchanged. Screenshots use an owned server on port 5393 and one browser at a time.

Identical source loads received different Google Fonts responses. A six-browser probe recorded two stylesheet SHA-256 values, `26fd9fd8382b14eedc20dac14e057c5cd1ec55516c4205e3baa28e6818e64c73` and `6af12cf2821f2258a956feb78009c4730b90f686dd4733f08296de6dcff615c3`. The Source Sans 3 and Source Serif 4 resources differed too: one response used `/l/font?kit=…`, another `/s/…woff2`. Their small metric differences appeared in generated SVG widths and rasterized text.

`figures/fonts/manifest.json` pins the latter stylesheet and its 34 font resources, with upstream URLs, hashes and license sources. `google-fonts.css` preserves the response; production `fonts.css` changes only its URLs to local content-hashed files. The font files are unmodified and retain the three OFL licenses. Source captures replay the same bytes with `--font-lock`; unknown requests or altered files fail verification.

With the lock, six fresh-browser probes produced identical font responses, generated DOM and screenshots. The original frame sampling was retained. Full-method local self-checks then passed for all 32 source variants (7,162 frames), including one quiet repeat each for workplace and high-school uncalibrated reliance. These captures remain historical evidence, not the final acceptance baseline.

## Source reproducibility: rounded-corner rasterization

At candidate `7af71d4`, the first fifteen variants matched 3,357 frames exactly. High-school uncalibrated reliance differed in four desktop frames (`t086.00`, `t088.08`, `t090.00`, `t094.00`), each at the same ten pixels in a 5-by-3-pixel rounded speech-bubble corner. Its one quiet repeat had the same result. All 212 candidate images were byte-identical to an earlier unchanged-source self-check that had also failed. A fresh source control matched the original baseline.

A controlled twelve-browser probe used the same font lock, timeline samples and source/candidate geometry. With the original raster setting, six runs produced two image hashes for each affected frame, despite one SVG hash and identical geometry. With `--disable-partial-raster`, six runs (three source, three candidate) produced one identical image hash for every affected frame. This isolates a capture instability; it does not approve a tolerance or a baseline substitution.

The frame harness now pins full-tile raster, as the AR branch/flow harness already did, and records `raster: full-tile` in each capture receipt. Sampling, capture areas, timing, transitions and zero-pixel comparison remain unchanged. Old captures are retained and superseded as acceptance evidence. No figure source or drawing math changed.

## Required acceptance receipts

The `motion figure parity` workflow runs on the exact PR head. Its eight frame jobs each check all four versions serially; four separate AR jobs check branch presets and real reader flows. Every job uses one browser at a time on its own runner, captures immutable source `8def5a1`, self-diffs it, then compares the candidate in source geometry. A failed comparison gets at most one quiet repeat, retained separately. Two failures keep the gate closed.

`node scripts/check-motion-parity.mjs <frames|interactive> <slug> <edition> <cast> <new-directory>` writes a receipt with source/candidate SHAs, fixture/runtime/CSS/font/harness hashes, every attempt and image hashes. CI retains receipts/text snapshots and complete failed captures. Consult the current PR checks and their receipts for acceptance status; this document records the investigation and required gates, not a claim that the replacement matrix passed.

## Candidate checks recorded before the full-tile recapture

- Local build and full Node suite passed. The public build has no new figure routes or player imports.
- Resolver output matches the source for all 32 versions. Asset, font and poster-receipt tests pass.
- Ten local runtime browser contracts passed at `7af71d4`: existing text adoption, instance/ID isolation, teardown/remount, cancellation/failure fallback, scoped query hooks, explicit embed playback, print restoration, gates and offscreen pause. The teardown regression includes an old handle trying to destroy its replacement.
- Standard CI passed all 104 browser checks at `0195480` and again at `7af71d4`. The later harness change needs its own exact-head CI and full matrix.
- Production edition-check reports zero imported figures, expected for the runtime-only step. The design check passes for eight figures/sixteen edition files.
- Impeccable's static scan of runtime JS/CSS returned no findings. Final review remains separate from automated gates.

## Retained diagnostic evidence

All paths below are local verification artifacts, not production assets:

- `/private/tmp/motion-parity-font-only-20261101/`: superseded source baseline/self-check matrix with locked fonts; retains the two raster outputs.
- `/private/tmp/motion-candidate-parity-7af71d4/`: fifteen passing variants and both failed high-school uncalibrated-reliance attempts.
- `/private/tmp/motion-source-control-ur-high-school-20261101/`: unchanged-source control matching the original baseline.
- `/private/tmp/motion-raster-isolation-20261101/`: twelve-browser probe, images, SVG/geometry hashes and results.
- `/private/tmp/raster-locked-fonts-*.json` and PNGs: six identical locked-font probes.
- `/private/tmp/raster-baseline-cpu-*.json` and PNGs: probe that exposed differing font responses; experimental Chromium flags did not fix the input mismatch.
- `/private/tmp/motion-parity-20261101/`: initial source checks; workplace 170/251, quiet repeat 148/251.
- `/private/tmp/motion-parity-stable-20261101/`: full-tile raster experiment, workplace 229/251.
- `/private/tmp/motion-parity-positioned-20261101/`: positioned experiment, workplace 250/251; only print differed.
- `/private/tmp/motion-parity-prepared-20261101/`: screen-before-print experiment; workplace 251/251, PME 144/212 on both its first and quiet checks.
- `/private/tmp/motion-parity-locked-20261101/`: locked-font PME 212/212 with experimental positioning; stopped after that pass to restore the simpler original method. Any incomplete workplace capture here is discarded.
- `/private/tmp/motion-runtime-build.log` and `/private/tmp/motion-runtime-node.log`: local candidate checks before commit.

Historical failed/experimental captures remain preserved. None substitutes for the final candidate comparison or a hosted release check.

## Runtime acceptance and merge

[Site PR #38](https://github.com/jackcshaw/nwc-irreducible-officer-site/pull/38) merged at `997e940`. Exact head `5737d5d` passed alignment (build, Node checks, 104 browser checks) and the full parity workflow: 7,162 frame images, 5,008 AR interaction images and 128 text states matched. No quiet repeats were needed. The receipts were downloaded and checked against source `8def5a1`, the candidate SHA and full-tile raster. Independent visual review returned ship for runtime scope; documentation review found no gaps. This does not accept later production factories or pages.

The live receipt rechecked before merge remained site `05ab9b0`, version `2026.10.27`. No deployment occurred. Local copies of CI receipts are retained under the runtime worktree's ignored `tmp/verification-5737d5d/`.

## First-page verification method

The frame-capture page PR ports the actual factory, markup and edition data, adds four static versions and the hub, and exercises poster generation. Normal builds validate committed receipts; they never launch a browser or read design files. Poster receipts include runtime, factory, markup, editions/casts, CSS, renderer/generator, package lock and font inputs. Each PNG embeds its origin.

The first actual-factory fixture matched all 251 workplace source images. The first built-page comparison exposed inherited type metrics and an expanded print width; these were corrected. Further measurement found equal internal sizes and relative positions, with different fractional outer vertical positions under the two page headers. The capture-only `figure-capture-origin.js` wrapper aligns each component's outer top to document y=0 on source, factory fixture and built-page snapshot, including print. It changes no internal player style, coordinates, sampling or pixel tolerance. Its hash is recorded in the verification receipt. The original source archive and failed captures remain retained.

The page workflow compares the source against its unchanged self-check, then the real factory in source page geometry, then the actual built player. Only the two whole-page PNGs are excluded from the last comparison because the new site chrome is intentional; stage, caption, controls, text list, source lines and print remain under the zero-diff gate. Whole-page visuals, static HTML and actual interactions are separate checks. The production build contains no capture normalizer. Consult the current page PR and its receipts for acceptance; this method note is not a claim that those gates have passed.

The first-page local candidate passed build, Node contracts and all 114 browser checks before the final font-failure cases. The updated 12-test figure suite also passed after verifying blocked stylesheets and blocked font files leave the selected static version readable. Chromium may retain an inaccessible stylesheet object after a failed request; hydration checks its rules and treats read failures as a load failure. Exact-commit CI and the independent page visual review remain required. New visitor strings passed the writing-as-jack mechanical check and manual judgment review; the model judge could not run without its provider authentication. No automated voice pass is claimed.

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

With the lock, six fresh-browser probes produced identical font responses, generated DOM and screenshots. The original `frame-diff.mjs` sampling/capture method was restored: no new raster flags, scroll normalization, repeated-shot acceptance or print preparation remains. Only portable Playwright, explicit target URLs, the font lock, receipt metadata and stricter error/flag checks were added. The tolerance remains zero.

Current full-method source results:

- Frame capture PME/seminar: 212/212 identical.
- Frame capture business/workplace: 251/251 identical.
- Frame capture business/classroom: 251/251 identical.
- Frame capture business/high-school: 251/251 identical.
- Remaining seven figures/four versions: serial matrix in progress. This is not a complete source or production-port receipt.

The runtime candidate is being prepared in its own worktree while the immutable source/font captures continue. It remains unmerged; the complete required source and candidate matrices must pass before acceptance.

## Candidate checks

- Local build and the full Node test chain pass. The public build has no new figure routes or player imports yet.
- Runtime resolver output matches the source for all 32 versions. No edition data or drawing math has been changed.
- Asset helper tests cover exact bytes, independent dependency hashes and invalid/missing/escaping paths.
- Font-lock tests cover every pinned resource, local production CSS references, rejected unknown requests and altered-byte detection.
- Runtime browser contracts are written but not run while the source browser is active: existing text adoption, instance/ID isolation, teardown/remount, cancellation/failure fallback, scoped query hooks, explicit embed playback, print restoration, gates and offscreen pause.
- Production edition-check currently reports zero imported figures, as expected for the runtime-only step. The separate design check passes for all eight source figures and sixteen edition files.

## Retained diagnostic evidence

All paths below are local verification artifacts, not production assets:

- `/private/tmp/motion-parity-font-only-20261101/`: current source baseline/self-check matrix and receipt, using the original sampler plus locked fonts.
- `/private/tmp/raster-locked-fonts-*.json` and PNGs: six identical locked-font probes.
- `/private/tmp/raster-baseline-cpu-*.json` and PNGs: probe that exposed differing font responses; experimental Chromium flags did not fix the input mismatch.
- `/private/tmp/motion-parity-20261101/`: initial source checks; workplace 170/251, quiet repeat 148/251.
- `/private/tmp/motion-parity-stable-20261101/`: full-tile raster experiment, workplace 229/251.
- `/private/tmp/motion-parity-positioned-20261101/`: positioned experiment, workplace 250/251; only print differed.
- `/private/tmp/motion-parity-prepared-20261101/`: screen-before-print experiment; workplace 251/251, PME 144/212 on both its first and quiet checks.
- `/private/tmp/motion-parity-locked-20261101/`: locked-font PME 212/212 with experimental positioning; stopped after that pass to restore the simpler original method. Any incomplete workplace capture here is discarded.
- `/private/tmp/motion-runtime-build.log` and `/private/tmp/motion-runtime-node.log`: local candidate checks before commit.

Historical failed/experimental captures remain preserved. None substitutes for the final candidate comparison or a hosted release check.

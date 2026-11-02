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

The first actual-factory fixture matched all 251 workplace source images. The first built-page comparison exposed inherited type metrics and an expanded print width; these were corrected. Further measurement found equal internal sizes and relative positions, with different fractional outer vertical positions under the two page headers. The capture-only `figure-capture-origin.js` wrapper offsets the whole page to align each component's outer top to document y=0 on source, factory fixture and built-page snapshot, including print. It changes no internal player style, coordinates, sampling or pixel tolerance. Its hash is recorded in the verification receipt. The original source archive and failed captures remain retained.

The page workflow compares the source against its unchanged self-check, then the real factory in source page geometry, then the actual built player. Only the two whole-page PNGs are excluded from the last comparison because the new site chrome is intentional; stage, caption, controls, text list, source lines and print remain under the zero-diff gate. Whole-page visuals, static HTML and actual interactions are separate checks. The production build contains no capture normalizer. Consult the current page PR and its receipts for acceptance; this method note is not a claim that those gates have passed.

The first-page local candidate passed build, Node contracts and all 114 browser checks before the final font-failure cases. The updated 12-test figure suite also passed after verifying blocked stylesheets and blocked font files leave the selected static version readable. Chromium may retain an inaccessible stylesheet object after a failed request; hydration checks its rules and treats read failures as a load failure. Exact-commit CI and the independent page visual review remain required. New visitor strings passed the writing-as-jack mechanical check and manual judgment review; the model judge could not run without its provider authentication. No automated voice pass is claimed.

At exact head `df8655c`, alignment passed all 116 browser checks. The first page parity matrix matched all animation shots for the three business variants, but reduced/print captures still differed. Moving only the figure over the preceding page copy put that copy beneath its translucent border and background; the test wrapper now offsets the whole page, preserving relative page layout. It also resets the offset before measuring, avoiding repeated CSSOM-rounded offset subtraction during print. The failed PME source self-check and all failed business captures remain retained under `/private/tmp/motion-pages-ci-df8655c-*`. No production drawing, sampling, comparison tolerance or published page changed in this correction. A fresh exact-head matrix is required.

A focused local probe with the corrected wrapper matched source and built-player reduced desktop, reduced phone and print images for workplace, classroom and PME (nine comparisons), with identical component dimensions and y=0. These diagnostic results do not replace the full four-version exact-head matrix. Page visual review returned ship for all 34 unmodified-page captures at `df8655c`; independent documentation review found no gaps. The wrapper correction changes only verification files and documentation, so the reviewed production visuals remain unchanged.

At `c309666`, all three business variants passed source self-check, actual factory and built-player parity with zero differences and no repeats. Alignment again passed all 116 browser checks. PME's source self-check retained a phone-only failure: exactly two clipped top rows in the reduced image and a two-pixel page shift. Its setup introduces an italic face after the source fills the edition; the remaining shift is consistent with the wrapper measuring before that later font/layout phase finishes. It now awaits the post-mount `document.fonts.ready` after layout frames before taking the outer measurement. The existing harness already waits for the fonts before its screenshots; the correction makes the earlier normalization wait too. The full matrix must pass on the resulting head.

## Frame-capture acceptance and next port

Site PR #39 merged at `0224a5a` after exact head `6b178b0` passed build, Node checks, all 116 browser checks and all four page-parity jobs. Independently validated receipts record 965 exact source self-check images, 965 actual-factory images and 957 built-player images (2,887 comparisons), no differing/missing images, browser errors or quiet repeats. Final records are retained in the first-page worktree's ignored `tmp/verification-6b178b0/`; visual captures are in `tmp/verification-c309666/visual/`. Visual review returned ship for all 34 page captures, and documentation review found no gaps after the verification-only corrections. No deployment occurred; the live receipt before merge was still version 2026.10.27, site `05ab9b0`.

The fluency-substitution port starts from that merged main. It retains the exact edition JSON and drawing/timeline, adds four static variants, preserves the canonical quotation's HTTPS citation, and checks the Autor source-spine finding and qualifications. The shared renderer/manifest changes require refreshed poster receipts and both published figures in the four-version parity workflow. Its acceptance remains pending.

## Fluency-substitution acceptance and next port

Site PR #40 merged at `4d779e7`. Exact head `5a7351b` passed build, Node checks, 123 browser checks and all four page-parity jobs. The eight downloaded receipts validated 1,873 source self-check images, 1,873 actual-factory images and 1,857 built-player images (5,603 comparisons), with no differences, missing images, browser errors or quiet repeats. Independent visual review returned ship for all 34 unmodified-page captures; documentation was adequate. Evidence is retained in the fluency-substitution worktree's ignored `tmp/verification-5a7351b/`. The live site remains version 2026.10.27; no deployment occurred.

The premature-synthesis port starts from that merge. Exact editions and drawing/timeline are preserved. Its PME page also retains the source's second, Section VI quotation, checked as a unique excerpt of the canonical essay. The Shen/Tamkin boundary check retains the small exploratory groups, immediate quiz and no significant speed gain; authorship of the code alone is not the claimed dividing line. Four versions, refreshed receipts and all three published figures require the same exact-head gates. Acceptance remains pending.

## Premature-synthesis acceptance and next port

Site PR #41 merged at `7d25e94`. Exact head `2e0843f` passed build, Node checks, 130 browser tests and all four parity jobs. Twelve downloaded receipts independently validated 2,721 source self-check images, 2,721 actual-factory images and 2,697 built-player images: 8,139 identical comparisons, zero missing images, errors or quiet repeats. Independent visual review inspected 34 captures, requested the original gap between the PME quotations, then scored that fix resolved on desktop and mobile. Documentation was adequate. Evidence is retained in the premature-synthesis worktree's ignored `tmp/verification-2e0843f/`. No deployment occurred.

The uncalibrated-reliance port preserves exact source editions and drawing/timing. Its linked quotation segments and PME evidence paragraph are pre-rendered, and both essay excerpts are checked against the canonical essay. The Otis and Dell'Acqua source boundaries remain distinct; constructed plan numbers are not reported as study findings. Links to the unpublished appropriate-reliance page are temporarily omitted and must be enabled when its page ships. Four versions and all four published figures require exact-head verification; acceptance remains pending.

## Uncalibrated-reliance acceptance and next port

Site PR #42 merged at `b35f987`. Exact head `4478d75` passed build, Node checks, 137 browser tests and four page-parity jobs. Sixteen independently checked receipts record 3,569 source self-check images, 3,569 actual-factory images and 3,537 built-player images: 10,675 identical comparisons, no differences, missing images, errors or quiet repeats. Self-review corrected a source visibility flag printed as text; the exact source PME note now renders, with a regression check. Poster image bytes were unchanged. Independent visual review approved all 34 final captures; documentation was adequate. Evidence is retained in the uncalibrated-reliance worktree's ignored `tmp/verification-4478d75/`. The live receipt remained version 2026.10.27, site05ab9b0. No deployment occurred.

Invisible delegation starts from that merge. It preserves the exact editions, drawing and timing; renders both PME quotations; retains the Lee survey's self-report/correlation limits; and maps its frame-capture link to the reader's static setting. All five published figures and all four versions require exact-head gates. Acceptance remains pending.

## Invisible-delegation acceptance and next port

Site PR #43 merged at `dd43e77`. Exact head `92eca74` passed build, Node checks, 144 browser tests and four page-parity jobs. Twenty independently checked receipts record 4,417 source self-check images, 4,417 actual-factory images and 4,377 built-player images: 13,211 identical comparisons, no differences, missing images, errors or quiet repeats. Independent visual review approved all 34 final captures; documentation was adequate. Evidence is retained in the invisible-delegation worktree's ignored `tmp/verification-92eca74/`. Live remained version 2026.10.27, site05ab9b0. No deployment occurred.

Institutional monoculture starts from that merge and preserves the flat lineup Jack explicitly approved (M8), exact editions, drawing and timing. The static renderer retains the example note, six business study paragraphs, PME evidence list with links and source qualifications. Its premature-synthesis link keeps the reader's static setting. All six figures and all four versions require exact-head gates. Acceptance remains pending.

### Monoculture capture investigation

The initial production factory fixture omitted source-only page hooks for the example note and linked evidence. Its player frames matched, but both whole-page captures failed in each cast, including the one permitted quiet repeat. The fixture now fills those hooks, preserving its full-page comparison. The focused rerun then exposed cached non-scaling SVG stroke edges in the built-page comparison: identical DOM/SVG geometry, with differences confined to two horizontal paper-edge rows at 1440px. Refreshing the whole document layout after the test-only origin alignment removes that discrepancy without changing or hiding player content. The normalizer performs this synchronous outer-document refresh on both source and candidate. The sampling matrix and zero tolerance remain unchanged. Fresh exact-head gates are still required.

The whole-document refresh is scoped to institutional monoculture on both sides. A generalized refresh disturbed the frozen frame-capture source's measurement caches in the high-school source self-check (the quiet repeat reproduced it). Other figures therefore keep their established capture lifecycle. The focused monoculture run passed all 652 source-self/factory/built-player comparisons before this scope restriction; the restriction does not change its execution. Full exact-head CI still gates every published figure and setting.

## Institutional-monoculture acceptance and next port

Site PR #44 merged at `346f2cf`. Exact head `d08e2a3` passed build, Node checks, 151 browser tests and four page-parity jobs. Twenty-four independently checked receipts record 5,292 source self-checks, 5,292 factory comparisons and 5,244 built-player comparisons: 15,828 identical comparisons, no differences, missing images, errors or quiet repeats. All 34 captures at the unchanged production implementation `a76ebab` passed independent finish review; documentation was adequate at the final head. The test-only corrections above are retained with their failed receipts and successful focused run. Evidence is in the monoculture worktree's ignored `tmp/verification-d08e2a3/` and sibling investigation folders. Live remains2026.10.27/site05ab9b0; no deployment. Patch later: a stale factory-header loading comment.

Responsibility laundering starts from that merge. It preserves exact editions, drawing and timing, including the source nameplate definition. Its multi-paragraph PME quotations retain the source ellipsis while validating the underlying excerpt uniquely against the essay. Its explanatory links retain the selected setting; the Moffatt case retains its organizational scope and limits. All seven figures and four versions require exact-head gates; acceptance is pending.

### Responsibility-laundering phone correction

The independent review of b9d74c0 found the final check clipped at 375px. Original source captures reproduced it in all four casts. The source-only branch `codex/motion-source-rl-caption` revises the fixed caption reserve from 194px to 224px below 390px; all text, drawing and timing remain unchanged. Source commit `7374bc77b3d68197d202027c3499c01977a4ab91` received an independent resolved/ship verdict before import. The original 8def5a1 checkout remains immutable; all other figures retain that reference. Source captures and measurements at 320/360/375/390 in all four casts show zero overflow after correction, against up to 19px before. Evidence is retained in ignored `tmp/verification-b9d74c0/`. Production recaptures and exact-head CI must pass before merge.


Linux CI then found 8.8125px of clipping at 390px in all four casts, despite loaded fonts and the expected 356px content width. The first fix's below-390 condition was too narrow; passing local captures did not establish cross-platform acceptance. Diagnostic-only head `5c50a56` preserved that failure with exact geometry in its test output. No assertion, source text or comparison tolerance was relaxed.

The same source branch now reserves 224px throughout the existing phone breakpoint (through 719px), replacing the narrow exception. Source commit `e30b12c4521e9aa7156d2348bcff000d8ab62d4a` received the same independent reviewer's resolved/ship verdict before import: all sixteen original/corrected captures at 375/390px, with measurements at 320/360/375/390 in every cast. Production uses that explicit source pin. The changed band remains fixed from first frame to final check; no drawing, wording or timing changed. Linux CI and production fix review remain acceptance gates.


## Responsibility-laundering acceptance and next port

Site PR #45 merged at `9724ea6`. Exact head `c16aa5b` passed build, Node checks and 162 Linux browser tests. Twenty-eight independently validated receipts record 6,146 source self-checks, 6,146 factory and 6,090 built-player comparisons: 18,382 identical images, zero differences, missing images, browser errors or quiet repeats. The same independent finish reviewer closed the phone-caption finding after all 38 final captures and Linux evidence; documentation was adequate. Failed first-fix diagnostics, reviewed source corrections and final evidence remain in the responsibility-laundering worktree's ignored `tmp/verification-c16aa5b/` and original `tmp/verification-b9d74c0/`. Live still2026.10.27/site05ab9b0; no deployment.

Appropriate reliance begins from that merge. M7 preserves its live first question. D12 requires inert later answers, explicit question-first reading fallback and restored locks on restart and after print. All source branches, real reader interactions and eight published figures require verification; acceptance remains pending.


### Appropriate-reliance handoff and comparison geometry

The first preflight passed all254 source self-check and254 actual-factory captures, then Node's Undici parser aborted before the built-page stage. The readiness response body is now consumed before synchronous browser work; the interrupted receipt is retained as incomplete, not acceptance.

The fresh run repeated those exact source/factory results and exposed85 built-player differences, reproduced by its quiet repeat. At1440px, source shot height was653px while the built page's was440.125px. A diagnostic found the built factory measured its first-view budget while the fallback poster still occupied layout, capping its SVG at120px. The synchronous factory now completes the poster handoff before its existing final first-view measurement; failure still restores the original fallback.

Appropriate reliance also intentionally sizes its first view from the page's document position. After the test wrapper shifts the entire document to the shared origin, its public resize handler must refresh that budget on both source and candidate. The wrapper now does so for AR only. Diagnostics at1440/1280/390 show matching source/built dimensions after this same event. This changes only comparison setup: no authored drawing, timing, sampling or tolerance changes. Unnormalized first-page geometry remains a separate browser and visual gate. Full fresh source/self/factory/built comparisons remain required.

The unnormalized route checks cover all four casts at1440×900,1366×657,768×1024,390×844 and375×812. The compact page header and spacing keep the first question, task budget and Continue usable at those sizes. Closed native reading disclosures expose their text in print. All26 focused browser checks pass locally; full source parity, independent visual review and Linux checks are still pending.

The batched visual review found that the hidden fallback state also cached a zero playback-control height, allowing sticky controls to cover Continue on phones. The post-handoff measurement now refreshes that existing sticky offset as well; route checks require an unobstructed button center. The main print question now precedes the revealed result, and the setting switch keeps Workplace / Classroom / PME with classroom variants below the player. The first captures remain retained; a single confirmation capture batch follows these corrections.

Independent review of4fd884f inspected all60captures and requested one print fix: three business variants retained the screen viewport cap after the question-first block entered print layout, shrinking their final diagrams. A page-scoped print rule removes that cap. New checks compare printed SVG aspect/scale and screen restoration. Linux separately found9.17px of classroom budget overlap at375px (187other checks passed); the narrow page introduction now uses tighter leading/top spacing. Source player drawing, timing and CSS remain unchanged. Same-reviewer fix verdict and exact-head CI remain required.

### Appropriate reliance accepted; PME essay placements

PR46 merged as e650b4f after exact candidate e96e9f1 passed 192 Linux browser tests, 32 page receipts (21,422 identical comparisons), 32 runtime receipts (14,324 identical comparisons), and four production-factory interaction receipts (10,016 identical comparisons and 128 matching text states). No missing captures, differing pixels, browser errors or quiet retries. The independent reviewer scored the print-scale correction resolved across all four casts and found no visible regression in narrow spacing; documentation review was adequate. Evidence remains in the AR worktree's `tmp/verification-e96e9f1/`. The live release remains 2026.10.27.

The PME essay placement branch starts from that merge. It adds the eight D7-approved entries after unique paragraph endings, using the PME poster, current edition title/check/separating follow-up and approved “Open the figure” action. Each entry has one accessible link and a decorative image. Appropriate reliance keeps its question-first poster. Primary standalone reading links return to the relevant essay entry; actual quotation citations keep their section links.

The shared renderer reads existing edition and poster data. The build rejects missing or duplicated anchors. Apart from the eight entries, the rendered PME essay is byte-identical to the preceding verified build, including all legacy inserts; all96 PNG files remain byte-identical. Poster receipts were regenerated because the manifest and shared page renderer changed. The existing SPA hid the essay without JavaScript; a scoped noscript rule now exposes the PME essay so the native entry and return links work. A reproduced click-stability timeout was isolated to the inherited smooth hash scroll: geometry moved for about a second, while reduced motion stayed stable and clicked immediately. The noscript fallback now uses instant native navigation. Figure code is not loaded by the essay.

New copy is only the already-approved action label; the mechanical voice check passed, and manual source/action checks passed. The optional judge could not run because its Anthropic SDK is unavailable. Local browser, visual, independent review and exact-head CI results are recorded with this candidate's verification artifacts before merge. No release or deployment is authorized here.

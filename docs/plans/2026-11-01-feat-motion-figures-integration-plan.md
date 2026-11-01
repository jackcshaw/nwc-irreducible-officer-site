---
title: Integrate the motion figures into Judgment Lab
date: 2026-11-01
status: Approved for implementation — first-page defaults accepted
owner: Codex
scope: Implementation approved; later editorial and release gates remain
---

# Motion figures integration plan

Put the eight completed figures on their own pages, then connect them to the essay, Practice, the four-moves book and the setting pages. Every figure will have pre-rendered workplace, higher-education, high-school and PME versions. Preserve the reviewed pictures, timing and interactions as they enter the site.

**Approval recorded November 1:** Jack approved this plan and its recommended first-page defaults. Implementation may begin. Later editorial gates and release/deployment approval remain pending as identified below. D12 is included in the approved first-page defaults. This approval does not publish the figures.

## 1. Ownership and the starting point

The November 1 `INTEGRATION-HANDOFF.md` transfers this block from Claude to Codex. Claude has stepped back. Codex owns the integration plan and, after approval, the integration PRs. The figures' design branch remains the source for corrections to the figures themselves.

| Item | Inspected state on November 1 | Treatment |
| --- | --- | --- |
| Site `origin/main` | Fetched; `05ab9b0b9c35a1207132b053f3d3e50cc0ed3fd5`, package version `2026.10.27` | Base of this planning branch and the future PR branches |
| Planning worktree | `nwc-irreducible-officer-site-integration-plan`, branch `codex/motion-figures-integration-plan` | Review document only |
| Figure source | `nwc-irreducible-officer-site-motion`, `motion-figures`, clean at `8def5a10d90260db2b0ef4393f1421b14762731c` | Pin this source and record any later approved replacement |
| Companion | Clean `main` at `395b422`; source-spine PRs #12–#14 are included | Build against explicit source paths; re-fetch before implementation/release |
| Shared site checkout | Clean local `main` at `b9d21bd`, older than fetched `origin/main` | Left untouched; do not build the integration there |
| Open site PRs | Only draft [#34](https://github.com/jackcshaw/nwc-irreducible-officer-site/pull/34), `codex/practitioner-conversation` | Outside this work; held for Jack's Apps Script v2 publication |

The handoff reports that the October 30 final verification and October 31 exports passed. Those are design-stage reports, not evidence that the figures work in production. This planning pass reran `node design/motion-figures/scripts/edition-check.mjs --counts`: eight figures, sixteen edition files, all listed casts passing. It did not rerun browser/frame captures or verify the live deployment.

### Source documents and precedence

Read in `nwc-irreducible-officer-site-motion/design/motion-figures/`: `INTEGRATION-HANDOFF.md`, `HANDOFF.md`, `INTEGRATION-PLAN.md`, `MORNING.md`, `CONVENTIONS.md`, `NAMEPLATE-DEFINITIONS.md`, `book-v0/proposal.md`, `book-v1/NOTES.md`, `book-v1/figures.js`, the runtime, edition data and regression scripts. Source documents remain on `motion-figures` until PR 0 preserves the record on main.

Also inspected the site build, package scripts, Hosting configuration, Playwright configuration, alignment CI, `docs/project-hygiene.md`, and `docs/solutions/workflow-issues/coordinate-releases-across-parallel-sessions.md`; and the companion catalog, HE/high-school failure-mode passages and source spine.

The November 1 handoff and October 30 decisions supersede stale portions of the October 28 integration proposal:

- All eight figures and all four versions now exist. Gates, Start over, nameplates, load hardening and play/pause already exist; preserve them rather than rebuilding the early runtime.
- PME uses `seminar` and “Faculty”; HE uses `classroom` and “the instructor”; high school uses `high-school` and “the teacher”. The old §3.5 mapping is outdated.
- `book-v1` exists and uses a full-size dialog over the book. Its notes explain why even a whole fixed-height spread is too small for the player. Some notes still say appropriate reliance is unfinished; the current figure and manifest supersede that.
- The old running-time estimates are stale. Obtain durations from each version's player clock, including its 4.2-second name card; do not hard-code “86–96 seconds”.
- The old direction to omit 25.1% is stale: current figure data and the companion spine include it. Preserve the current verified findings and their qualifications; integration is not a new source audit.
- Book copy is also stale in places: its invisible-delegation follow-up predates “Which notes did you keep, and why?” Read current edition data when building the book.
- The essay table's responsibility-laundering wording and the approved role-neutral nameplate are intentionally different. Do not normalize one into the other.

## 2. Decisions already made

- Workplace (`business` edition, `workplace` cast) is the default for standalone pages and articles. This does not authorize work on the draft business essay.
- The switch reads **Workplace · Classroom · PME**, with a note expanding professional military education. High school is a Classroom variant; its Classroom link stays on the high-school version and is marked current.
- Pre-render every edition/cast's text and metadata. JavaScript must not be required to read the page.
- Preserve the October 30 classroom versions, PME polish, approved nameplate definitions and race finding/teacher note. Classroom examples remain proposals to test, with their evidence limits visible.

## 3. Decisions for Jack

Jack accepted D1–D6, D11 and D12 on November 1. The later decisions remain open until their corresponding gates. The recommendations below retain their rationale for review.

### Blocking the first public figure pages

| ID | Decision | Recommendation |
| --- | --- | --- |
| D1 | Real paths or hash routes? | Real directory paths: `/failure-modes/<slug>/` and `/appropriate-reliance/`. Each version gets its own static title, text, share card and canonical URL. |
| D2 | Keep the colour grammar? | Preserve grey for AI-supplied material, red for human decisions/work and navy for page ink. No palette changes during the port. |
| D3 | Keep the current lengths? | Preserve reviewed timing; show measured duration per version and a range for the interactive path. Revisit length after teaching use. No new play/completion analytics in this scope. |
| D4 | Checks and separating follow-ups? | Keep the essay table verbatim; carry the current figures' version-specific checks and follow-ups together, at their reviewed hierarchy. Do not rewrite them to force every version to match a PME sentence. |
| D5 | Titles, metadata and discovery? | Topic plus what the page teaches; direct-answer description suited to that version; no freshness tags. Include `LearningResource`, breadcrumbs and a sitemap as descriptive metadata, with no claim that these improve AI/search ranking. Review actual wording in the page PR. |
| D6 | Poster/share image? | Seven explanatory figures: final-frame stills. Appropriate reliance: question-first poster and share card, so entry cards do not disclose its answer. Keep its final still for the revealed/print text equivalent. |
| D11 | What lives at `/failure-modes/`? | A short hub from the first-page PR, listing only published figures in essay order. Expand it with each figure PR; no directory listing or dead cards. |
| D12 | Pre-rendering versus appropriate-reliance answer locks? | Pre-render the question and safe introduction normally; keep later answers inert until their gates. Provide the full no-JS text behind explicit native disclosures, question first. Approve this deliberate no-JS reading fallback; it does not reproduce the interactive assessment. See §5. |

### Blocking the relevant later PRs

| ID | Decision | Recommendation and gate |
| --- | --- | --- |
| D7 | Essay cards or in-place players? | Poster cards linking to the full page, with PME links from the PME essay. No figure autoplay on the SPA. Gate: PR 4. |
| D8 | Practice scope and prompt? | Show all seven with a setting marker for modes absent from that setting's essay; add appropriate reliance as a warm-up. Keep the existing lab prompt and append the chosen mode; retain educator practice before teaching transfer and one question at a time. Gate: PR 5 copy review. |
| D9 | Settings → casts? | PME → `pme/seminar`; HE → `business/classroom`; K–12 → `business/high-school`. Gate: PR 9. These static versions ship with each figure even while setting-page placement waits. |
| B1 | Book mapping? | Adopt the provisional mapping below only after Jack reviews it, especially monoculture and fluency substitution. Gate: PR 6. |
| B2 | Four moves, five-part method and placement? | Replace the Learn method band with a flat four-moves panel in its existing slot; explain how the shared five-part method maps to it. Keep the shared foundation intact. Gate: PR 6 content review. |
| B3 | Garden-path definition and setting lines? | Review the prototype definition against the essay and Jack's voice before use; retain the friction distinction. Draw HE/high-school lines from their guides, mark them as proposals, and review them before publication. Gate: PR 6. |
| D10 | Where does the book's player fit? | Use a wide dialog outside the book's transformed faces, following `book-v1`, with the same production player component. Keep “Open the figure” as a plain link. Gate: PR 7. This replaces the old in-spread recommendation. |
| B4 | Page turns; cover or contents? | Defer page turns. If Jack later wants them, use a separate PR, open at contents, retain an optional cover, flat reading and instant reduced-motion navigation. Gate: optional PR 8. |
| M7/M8 | Interactive opening and flat monoculture? | Keep appropriate reliance's live first question and institutional monoculture's flat lineup. Preserve the tested teaching sequence. Gate: their port PRs. |

Provisional book mapping (a teaching organization, not a claim that each failure belongs exclusively to one move):

| Move | Figures |
| --- | --- |
| Frame the problem | Frame capture; invisible delegation |
| Calibrate the tool | Uncalibrated reliance; appropriate reliance (the competency) |
| Refuse the garden path | Premature synthesis; institutional monoculture |
| Own the decision | Responsibility laundering; fluency substitution |

Voiceover, downloadable video packs, custom error pages and added analytics are **patch later**, outside the required integration. A page turn is optional; it must not hold the standalone pages or setting links.

## 4. Production structure and single sources

Production builds read `figures/`, never `design/motion-figures/`. Preserve design documents, prototypes and reports as a record in PR 0. Import approved files by path; do not merge unrelated branch history into a feature PR.

| Source | Production destination / owner |
| --- | --- |
| Hard-coded seven essay-table rows | Companion `audiences/failure-modes.json` (proposed new file); strict site reader `scripts/failure-modes.mjs` |
| Approved four-moves text/mapping | Companion `audiences/four-moves.md` (proposed, PR 6); site `scripts/four-moves.mjs` |
| Figure page copy, labels, beats, checks, evidence, cast patches | Preserve each figure's `editions/pme.json` and `editions/business.json` under site `figures/<slug>/editions/`; do not duplicate their beats into a new `figure.json` |
| Shared cast words | `figures/casts.json`; checked against runtime fallback words if that fallback remains |
| Runtime | `figures/runtime/motion.js`; shared pure edition resolution in `figures/runtime/edition-data.js` if extracted for Node/browser use |
| Drawing and figure-specific markup/styles | `figures/<slug>/<slug>.js`, `<slug>.css`, and a build-only `player.html` template extracted from the current page |
| Component CSS / page chrome | `figures/runtime/figure.css`, `styles/figure-page.css`, shared `styles/masthead.css` (including applicable footer rules) |
| Route/order/variant list and essay anchors | `figures/manifest.json`; no duplicate visitor copy in the manifest |
| Build and asset generation | `scripts/figure-pages.mjs`, `scripts/figure-assets.mjs`, `scripts/figure-posters.mjs`, called from `scripts/build-site.mjs` |
| Published posters and source receipts | `media/figures/<slug>/<variant>/{poster.png,final.png,og.png,manifest.json}`; explanatory poster may reuse final bytes |

The shared rows preserve the existing PME table byte for byte in PR 1. They own that table's names, ordering, one-liners and checks. Edition JSON owns the figure's scene-specific follow-up and cast-specific wording. Cards/book entries select the relevant source explicitly; tests enforce the intended correspondence, not blanket text equality across different roles. `claims.md` remains the canonical claim map.

PME quotations are extracted from site `content/the-irreducible-officer.md` and checked against its companion mirror. HE/high-school quotations come from their own essays when used; a quotation from the original remains labelled as such. Extract exact passages by checked unique anchors; a missing or duplicated match fails the build. Keep study evidence, illustrative scenarios and figure reasoning distinct.

Each published file under `/assets/figures/` gets its actual content hash in the request URL. Include transitive imports/data in the asset manifest and rewrite their URLs too; versioning only the top-level module is insufficient. All nested-page links and assets use root-relative paths. Pre-rendered edition data can be embedded safely for hydration, avoiding a network edition fetch or a flash/fallback to PME on a workplace path.

Make modules root-scoped and instance-safe: registration/factory plus explicit mount, one handle per instance, root-scoped page filling, and teardown for observers/listeners on dialog close. Preserve existing time conversion, gate APIs and export hooks. Do not leave `fillPage(document, ...)`, fixed SVG IDs, global selectors or per-page print listeners able to change another instance. Add only the missing registration/hydration/lifecycle behavior; do not rewrite rendering math.

## 5. Static pages, hydration and the interactive exception

For every figure emit four pages:

| Version | Failure-mode path suffix | Edition / cast |
| --- | --- | --- |
| Workplace, default | `/failure-modes/<slug>/` | `business / workplace` |
| Classroom, HE | `/failure-modes/<slug>/classroom/` | `business / classroom` |
| High school | `/failure-modes/<slug>/high-school/` | `business / high-school` |
| PME | `/failure-modes/<slug>/pme/` | `pme / seminar` |

Appropriate reliance uses the same suffixes below `/appropriate-reliance/`. Full scope is 32 figure pages plus the hub. Each version is self-canonical with its own title, description and share image; the workplace root is the default topic entry. Edition-switch links are real paths and work without JavaScript. Preserve high-school selection on its Classroom link. URL path determines the production version; old `?edition=`/`?cast=` parameters must not silently produce text that disagrees with the static metadata. Translate recognized legacy queries to the corresponding path in a small compatibility handler, while all published links use paths.

Resolve data with the same pure `resolveEdition` implementation used by the runtime, including overrides and patches. Validate all listed variants before rendering; a missing or unsupported variant is a build error. Statically render masthead, kicker, title, setup, correct poster, beat list with “On screen” lines, check and follow-up, evidence/limits, essay passage, useful links and release footer. Hydration adopts this text instead of creating a second list. Do not ship future book/card anchors before their target PR lands.

Include per-version canonical/OG tags, a 1200×630 OG image, Twitter card, and—if D5 is accepted—valid `LearningResource` and breadcrumb data plus sitemap entries. Describe the workplace audience as well as educational audiences accurately. Reuse the site's existing analytics inclusion, with no new events. The reel remains a homepage behavior.

**Appropriate reliance needs a separate rendering contract.** The ordinary “show final frame and all beats” fallback would reveal its suggested calls before the reader answers. Implementation contract approved under D12:

- Initial HTML presents the live question, question-first poster, safe setup and available beat text. Later reveal fragments live in inert templates until the matching answer or skip; no answer text is placed in the rendered/accessibility tree merely at opacity zero.
- A `<noscript>` reading version contains the full pre-rendered text, question first, then explicitly labelled native disclosures for the results and reasoning. A JS-enabled load failure offers that same deliberate reading fallback without changing the version. This is a readable alternative, not simulated evidence that the reader made a call.
- Crawlers/no-JS readers can obtain all the text. The answers are not secret or protected from source inspection; the gate protects the teaching sequence in the interactive view.
- No visible pre-hydration answer flash, including with slow/blocked scripts. Reduced motion still asks the questions in order. Start over clears choices and re-locks later content. Preserve print's question-before-results order and restore the screen state after printing.
- Tests inspect rendered text, accessibility exposure, find-in-page behavior, summaries, live regions, beat buttons and metadata for premature answers. Adapt the existing text snapshots explicitly for inert/pre-rendered storage; never silence visible-answer failures.

Poster generation runs explicitly, one browser at a time, outside the normal build. Its receipt hashes the module, runtime, shared/per-figure CSS, markup, edition/cast data, generator and font inputs. A stale receipt fails the build/test with regeneration instructions. Commit publishable PNGs; keep large videos and regression captures outside Git, with retained verification receipts.

## 6. PR sequence and files

Every row below is future work after plan approval. Start each PR on its own branch/worktree from freshly fetched site `origin/main`; dependent work starts after prerequisites merge. For cross-repo changes use the same branch name, merge companion → workbench if changed → site, and verify CI's selected refs. No workbench changes are currently needed.

| PR | Files and concrete result | Dependency / exit gate |
| --- | --- | --- |
| 0 — Preserve design record | Selected `design/motion-figures/**` from pinned source, including source JS/prototypes and reports; media remains ignored; add production-location note | Plan approval. Confirm no production build reads this directory; CI green. Do not characterize executable prototypes as docs-only logic. |
| 1 — Shared failure-mode rows | Companion `audiences/failure-modes.json`; site `scripts/failure-modes.mjs`, `scripts/build-site.mjs`, `tests/failure-modes.test.mjs`, `tests/alignment/single-source.test.mjs`, `package.json` test chain | Strict seven-row validation, exact slug/order/fields; existing table byte-identical. Companion first. Follow-ups remain in edition data. |
| 2a — Runtime and port harness | `figures/runtime/**`, `figures/casts.json`; `scripts/figure-assets.mjs`, `scripts/figure-posters.mjs`, `scripts/edition-check.mjs`; test helpers/fixtures, `tests/figure-runtime.test.mjs`, `tests/alignment/figure-runtime.spec.mjs`; explicit URL/installed Playwright support for design capture scripts | PR 0; preserve existing APIs and gates. Pin/capture source; prove old and new resolver output equal; instance isolation, teardown and hydration tests. No new public routes yet. |
| 2b — Frame capture, all four pages and hub | `figures/manifest.json`, `figures/frame-capture/**`, `scripts/figure-pages.mjs`, `scripts/build-site.mjs`, shared/page styles, `media/figures/frame-capture/**`, `tests/figures.test.mjs`, `tests/alignment/figures.spec.mjs`, `tests/alignment/html-links.test.mjs`, `package.json`, optional sitemap output | PRs 1 and 2a; D1–D6, D11. All four variants pass static/visual gates. Hub lists frame capture only. Actual page copy review. |
| 3a–3f — Six small figure PRs | In order: fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering. Each adds `figures/<slug>/**`, `media/figures/<slug>/**`, manifest entry; updates evidence mapping where needed | PR 2b; all four versions in each PR; same parameterized tests and zero-diff gate. Hub grows automatically. No waiting on already-completed design cold reads. |
| 3g — Appropriate reliance | `figures/appropriate-reliance/**` including branch presets, posters/manifest; gated static renderer support; `tests/alignment/appropriate-reliance.spec.mjs`; adapted `ar-regress.mjs` harness | PR 2b, D12/M7. Port existing gates; verify real interactions separately from forced export seeks. No premature answers. |
| 4 — PME essay cards | `scripts/build-site.mjs`, shared card renderer `scripts/figure-cards.mjs`, `styles/figure-cards.css`, manifest anchors, figure-page backlinks; contract/browser tests | All eight figure pages available; D7. Eight cards at §7 anchors, PME destinations, no figure JS requested by essay. |
| 5 — Practice cards | Shared card renderer, `scripts/build-site.mjs`, card CSS, existing client prompt handler; Practice tests | All eight pages; D8. Seven mode cards plus competency warm-up; prompts preserve setting and the lab sequence. Add `fm-` routing only if actual card deep links need it. |
| 6 — Flat four-moves book | Companion `audiences/four-moves.md`; site `scripts/four-moves.mjs`, `scripts/build-site.mjs`, `styles/four-moves.css`, `tests/four-moves.test.mjs`, `tests/site-contract.test.mjs`, alignment tests | PR 1 and all displayed figure pages; B1–B3. Approved mapping/copy, exact quotes, flat/no-JS document, poster links, closing-tile and setting links. Replace method-band assertion deliberately. |
| 7 — Play figures from the book | `scripts/four-moves-client.js`, `scripts/figure-loader.js`, book/dialog CSS, build wiring, `tests/alignment/four-moves.spec.mjs` | PR 6, D10. Lazy-load selected figure into full-size dialog; pause/unmount on close; focus restoration, Escape, phone layout and reduced-motion gates. Use the same player template/data; do not scrape or hide parts of a second page with ad hoc selectors. |
| 8 — Optional page turns | Book client/CSS and book browser tests only | Separate Jack approval after flat book/dialog review. Contents, scoped keys, `inert`, flat view, print and no-JS remain usable. No hidden-face playback. |
| 9 — Setting pages and edition essays | Manifest audience anchors, shared cards, `scripts/build-site.mjs`, `tests/audience-contract.test.mjs`, browser tests | Figure pages, D9 and audience copy review. One frame-capture entry per setting; HE five essay cards, high school four, linked to the correct static cast pages. Independent of optional PR 8. |
| R — Release | `package.json` version bump; lockfile only if it records the changed package version | Separate release approval and verified merge/deploy slot; §9. Repeat for approved batches. |

PR 2 is deliberately split into runtime/harness and first pages so rendering changes can be reviewed independently from site chrome and static output. PRs 4 and 5 have no dependency on the book; PR 9 need not wait for optional animation. The ordering above is the default execution order, not an instruction to spawn parallel agents.

## 7. Placement and navigation contracts

The PME essay's cards follow these unique sentence endings, taken from the integration proposal and to be asserted against the build source before insertion:

| Figure | Anchor ending |
| --- | --- |
| Frame capture | “The frame capture is invisible inside the final product.” |
| Fluency substitution | “may never identify which risk actually matters most.” |
| Premature synthesis | “forming a mental map and inherited one instead.” |
| Uncalibrated reliance | “before discovering the error downstream.” |
| Invisible delegation | “the model has already done the framing.” |
| Institutional monoculture | “the range of strategic imagination the seminar is meant to develop.” |
| Responsibility laundering | “who chose the frame does not have a satisfying answer.” |
| Appropriate reliance, Section V | “what independent checks are required before the output governs the work.” |

Cards retain `id="figure-<slug>"`; `/#figure-<slug>` opens the PME essay and scrolls to the card. Before PR 4, standalone backlinks use existing section anchors. HE and high-school cards get audience-prefixed IDs and their own checked paragraph anchors; do not invent paragraphs for modes those essays omit. HE includes frame capture, fluency substitution, premature synthesis, invisible delegation and institutional monoculture. High school includes those except premature synthesis.

The flat book supports `/?move=frame|calibrate|garden|own#learn` and `/?book=<slug>#learn`, preserving the audience parameter. Book navigation does not overwrite the selected SPA hash. With JS disabled, the flat document still reads in order. Card-only surfaces do not download player modules. Figures load only on standalone pages or an explicit book Play action.

## 8. Tests and frame-preservation gates

### Preserve the reviewed frames

**Implementation note, November 1:** source checks exposed varying upstream font bytes. Pin the stylesheet/fonts with hashes and licenses, replay that lock for source captures, and serve those same bytes locally in the candidate. The source archive and lock remain immutable while candidate drafting and serial reference captures proceed. All required source and candidate comparisons still gate the runtime PR; no tolerance is relaxed. A later probe isolated two rounded-corner raster outputs with identical SVG and geometry. Pin `--disable-partial-raster` (already used by AR) on source and candidate, record it in each receipt, and recapture under that setting. Preserve the earlier captures; sampling and the zero-pixel comparison stay unchanged. The full matrix runs on isolated CI machines, with one browser per machine. Poster generation will use the same locked inputs.

1. Record source SHA, files/hashes, installed Chromium/Playwright versions, font resources, edition/cast and viewport in an integration receipt. Existing PNGs may predate the final polish/name-card change or have different `--freeze` flags; do not assume their currency.
2. Before changing a figure/runtime, serve a frozen export of the approved source on an owned quiet port. Capture each of the four variants with `design/motion-figures/scripts/frame-diff.mjs`, always with `--freeze`. Self-diff a second unchanged capture: zero differing/missing images before using it as the new integration baseline. Preserve historical baselines; do not overwrite them.
3. The current script hard-codes `/figures/<slug>/index.html` and an absolute Playwright import. In PR 2a, add a narrow explicit target-URL option and use installed project Playwright; keep its sampling/comparison algorithm. Verify the adapted harness reproduces the source self-diff before trusting it on production paths. Apply the same target support to AR's branch/flow harness.
4. Compare the ported component in a parity fixture matching source geometry, fonts and scroll position. Capture waiting state, beat starts, settled beats, every two seconds, end, reduced and print views at 1440×900, 1280×720 and 390×844. Gate: zero differing pixels, zero missing captures and zero browser errors across all four variants. A shared runtime/resolver change requires all eight figures, not just frame capture.
5. Compare the actual built page's player too. Site masthead/switch/page text intentionally differ, so whole-page screenshots are separate acceptance checks. Normalize only the documented surrounding layout/shot position for the pixel gate; never mask stage, captions, controls or source lines. Preserve the approved player geometry instead of accepting systematic scaling differences.
6. Keep semantic/text snapshots and unfrozen interaction tests alongside frozen captures. Freeze is for deterministic comparison, not proof of playback, pacing or gate behavior. Include 1366×657, 768×1024 and 375-wide fit/legibility checks; retain the 11px minimum visible picture text rule and the reviewed mobile exceptions for AR's sticky/growing stage.
7. Rerun unexplained differences alone before diagnosing them. If a self-diff cannot stabilize, report the gate blocked; do not loosen tolerance or silently replace the baseline. An intended figure change goes back to `motion-figures` as a pathspec commit, reviewed with a new source baseline before re-import.

Illustrative existing source commands (future verification, with an actually available owned port):

```sh
node scripts/frame-diff.mjs frame-capture capture <baseline-dir> --edition=business --cast=workplace --freeze --port=<source-port>
node scripts/frame-diff.mjs frame-capture diff <baseline-dir> <self-check-dir> --edition=business --cast=workplace --freeze --port=<source-port>
node scripts/edition-check.mjs --counts
```

Run the same matrix for business/classroom, business/high-school and pme/seminar. Production capture uses the target-URL capability added in PR 2a; the current script cannot test a production path unchanged.

### Contract and browser checks

- **Static output:** all declared routes exist; correct edition/cast before JS; populated title/setup/evidence/check/beat text; no unresolved placeholders or role leakage; stable switch/current state; unique IDs; exact essay passages and intended check relationships. Test real no-JS contexts and raw HTML, not just hydrated DOM.
- **Assets and metadata:** root-relative links resolve across all HTML, including fragments/SPA routes; correct canonical and OG URL; image dimensions; per-file hash URLs including dependencies; fresh poster receipts; valid optional JSON-LD/sitemap; no design paths or workstation paths in published output.
- **Content boundaries:** run edition-check and existing retired-phrase/alignment tests. Map study statistics to the specific spine finding and qualifier; a number appearing somewhere in the spine is insufficient. Distinguish illustrative amounts/percentages from empirical findings. Preserve source links, evidence limits and explicit figure reasoning.
- **Runtime:** two instances of the same figure behave independently; no duplicated IDs/listeners; static text is adopted once; repeat mount/close is safe; slow/failed assets preserve the selected version and readable fallback; keyboard/focus/print restoration; deterministic seek; no console errors.
- **Autoplay:** preserve current standalone visibility/dwell rules (including focus/seek suppressing autoplay); pause offscreen; no restart after a reader pauses; none on interactive AR or reduced motion. SPA players require an explicit Play action.
- **AR:** all branch presets plus actual click/keyboard paths, skips, Play without a choice, scrub/End clamping, Start over re-lock, reduced motion, print and no-JS reading. Use `ar-regress.mjs` in addition to frame-diff: forced export `seek` bypasses locks and cannot prove them.
- **Surfaces:** essay anchor/card order and no JS loading; Practice prompt contents and setting markers; book dialog focus return/Escape, visible text and no background player; setting counts/targets; 375/390 overflow and laptop legibility. If page turns are accepted, test 1101/1280/1440 face overflow, contents focus, `inert`, scoped keys, flat/no-JS/print and instant reduced-motion navigation.

For each implementation PR run `npm run build`, `npm test` (wire new Node suites into the script), and Playwright using a temporary config with a free port, `workers: 1`, fresh server and matching `baseURL` **and storageState origin**. Never use or kill another session's server on 5199; also avoid the design's reserved ports. Run one browser/export at a time and stop only servers this work started. Rerun load-related failures quietly before treating them as regressions.

Keep the full frame matrix as a required recorded gate for the exact candidate SHA. Existing CI has a 20-minute job; measure the added work and split a serialized figure job if necessary instead of claiming the full capture matrix ran in CI when it only ran locally. Any new runtime/render change invalidates the affected prior receipts. Record local verification, PR review, CI and hosted preview evidence separately.

### Review and merge workflow

Use a PR summary and test plan, review the actual diff, simplify unnecessary logic, rerun affected verification and merge only after the required checks and decisions. Commit with explicit pathspecs and inspect `git show --stat HEAD`; no attribution lines, no commits/pushes to main. Re-read applicable instructions at implementation time: the current `~/.codex/AGENTS.md` contains only “Questions are requests for an answer, not changes,” so the handoff's reference to a fuller global PR pipeline cannot establish an unseen reviewer/model requirement.

Visitor-facing copy gets the writing-as-jack skill and the handoff's `~/.claude/skills/writing-as-jack/scripts/jack_eval.py` check in its PR, including actual new titles and prompts. Study/source wording is preserved unless a separate source check supports changing it. No automated score substitutes for Jack's pending editorial decisions.

## 9. Release plan

Suggested reviewable batches: first frame-capture pages/hub; remaining standalone pages including AR; essay/Practice connections; flat book/dialog and settings. These are candidate release boundaries, not authorization to release each one. Optional page turns can ship later.

For each approved batch:

1. Re-fetch all three repositories. Check open/recent release PRs, active worktrees and the live footer/release receipt. Establish a single deployment owner and ensure no other release is in flight before merging features. Do not assume today's absence of a release PR still holds.
2. Finish review and exact-head CI on feature PRs, then merge in dependency order. If PR #34 or other work has merged meanwhile, disclose it in the release contents; this plan does not authorize its publication as an incidental change.
3. Obtain Jack's explicit release/deploy go for the concrete release contents. Create a version-bump PR using the next release number, verify it, and merge. A merged feature or green CI is not a deployment.
4. Build in a clean release worktree at that merge, with fresh clean main-equivalent companion/workbench checkouts. Set `COMPANION_REPO_PATH` and `WORKBENCH_REPO_PATH` explicitly and unset `SITE_URL`. Run build, contract/alignment and isolated-port Playwright checks; confirm current figure receipts still apply to the release tree.
5. On an approved hosted preview, verify directory/slash behavior and no-JS/metadata for all variant paths before first production publication. Local Python redirects do not prove Firebase behavior. The current `firebase.json` has `cleanUrls: true` and no rewrites/trailingSlash setting; plan on directory `index.html` without a config change, but make hosted behavior a gate.
6. Deploy only with the granted go: `firebase deploy --only hosting --project nwc-learning-companion`.
7. Hash-compare every generated file against judgmentlab.net, following redirects and requesting identity bytes. Fetch root `index.html` at `/`; verify nested `.../index.html`/slash paths too. Require zero mismatches/failures and the expected version/footer.
8. Compare `/assets/release.json` site, companion and workbench commits with the intended main commits; `unknown` is a failure. Verify representative live variant switches, AR locks and a hard-reloaded SPA return link. Record the full file count, hashes, source SHAs, test results and remaining issues before handing back the deployment slot.

Preserve the prior release receipt/artifact for recovery. If post-deploy verification fails, stop further releases and report the exact failure; a rollback or corrective deployment uses the same explicit ownership/approval process. Do not redeploy an old shared-checkout `dist`.

## 10. Step 1 completion and approval

This plan is complete when saved at `docs/plans/2026-11-01-feat-motion-figures-integration-plan.md` on the isolated planning branch and shared with Jack (a docs PR is optional). Only this review document is changed in Step 1.

**Blocking later work:** B1–B3 for the book, D9 for setting links, and the other later decisions at their PRs. The implementation plan and D1–D6/D11/D12 are approved. Every production port must independently pass its frame and behavior gates.

**Patch later:** voiceover, video packs, custom error page, extra analytics and optional page turns. These do not prevent the approved core integration from proceeding.

**Next decision gates:** Confirm D9 before setting links and the book decisions before book implementation. Approval to implement does not authorize release or deployment.

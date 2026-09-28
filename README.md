# Judgment Lab Website

This repo builds Judgment Lab for PME, higher education, and K–12 (high school first). The Irreducible Officer remains the original PME essay.

The canonical production address is:

https://judgmentlab.net

This repo builds the public site and hosts derived public assets, including the
essay PDF, ready-to-use workbench templates, and the Companion context file used
by ChatGPT, Claude, Gemini, or another AI assistant.

The source material behind the Companion lives in:

- AI Companion source: https://github.com/jackcshaw/nwc-irreducible-officer-companion
- Faculty Workbench source: https://github.com/jackcshaw/nwc-faculty-workbench

It should not contain private course materials, Proof scratch files,
transcripts, or audit notes.

## Source

- Essay source: `content/the-irreducible-officer.md`
- Companion source checkout: set `COMPANION_REPO_PATH` or use the default sibling checkout at `../companion`
- Workbench source checkout: set `WORKBENCH_REPO_PATH` or use the default sibling checkout at `../workbench`
- Build script: `scripts/build-site.mjs`
- Asset generator: `scripts/generate-assets.py`
- Site contract: `tests/site-contract.test.mjs`

## Commands

```bash
export COMPANION_REPO_PATH=/path/to/nwc-irreducible-officer-companion   # default: ../companion
export WORKBENCH_REPO_PATH=/path/to/nwc-faculty-workbench               # default: ../workbench

npm run build
npm test
npm run dev
```

Both `npm run build` and `npm test` read the companion and workbench checkouts,
so set the two env vars (or place the checkouts at the default sibling paths)
before running either. Asset generation (PDF + share card) runs via
`uv run --with reportlab --with pillow`; set `PDF_PYTHON` to a python3 that
already has both packages to skip uv.

The build writes public output to `dist/`.

## Audience testing edition

The homepage, audience views, companion prompts, workbench, source page, and downloadable contexts share the companion audience guides. Select a setting; its choice travels in the URL and is included in copied prompts. Existing essay anchors and context URLs remain supported. Individual workbench documents have stable `#wb-doc-<filename-without-extension>` links.

Active source checkouts for this refresh are the three `nwc-irreducible-officer-*` / `nwc-faculty-workbench` siblings. Set explicit source paths; the older `nwc/` copies are not this release candidate. The essay source remains `content/the-irreducible-officer.md`, matched against the companion mirror at build time.

For a preview, set `SITE_URL` to its base URL when building. Browser copy actions also use the current origin so preview sessions read preview assets. Run the build, contract tests, and audience checks before deploying. Educator and classroom validation remain pending.

### Audience-specific workbench release

Selecting PME, HE, or high school changes the visible example, reference matrix, ten tool adaptations, setup prompt, and context download. Source profiles and guides live in the workbench `audiences/` directory; `scripts/workbench-audiences.mjs` builds 30 adapted template downloads, three standalone matrix SVGs, and three 17-section context bundles. The shared workbench bundle has 18 sections. Markdown and JSON assets revalidate to prevent old context files lingering after a testing update.

Run `npm test` after the build to verify source/profile agreement, all adapted links, copy/download/bundle parity, the shipped audience handler, and the original essay contracts.


### Judgment Lab masthead and five paths

Purpose: **Strengthening human judgment in AI-enabled work.** The primary paths are Learn, Discuss, Practice, Design, and References. The original essay sits under Learn; legacy routes remain supported alongside `#learn`, `#practice`, `#design`, and `#references` aliases.

The current testing edition is published at https://nwc-learning-companion--audience-refresh-zkiwg8wa.web.app. Production publication is a separate release step.

The identity refinement is in `styles/lab-refresh.css`, appended by the generator. It retains the established cream/navy/red palette and serif typography. The masthead is global; only the path navigation sticks while scrolling.

Discuss uses the five claims in `content/discussion-claims.json`, transcribed from the Judgment in Practice EduFish edition on September 23, 2026. Provenance is recorded in the file. Source links, objections, and discussion prompts remain visible; the original facilitator guide and reading room are linked. This does not migrate or change the separate application. `?claim=<id>` carries a claim into Practice/Design and can be cleared without changing audience. New browser contracts verify claim completeness and prompt handoff.


### Settled masthead design

The approved B masthead places the all-navy italic purpose directly below the name. The wordmark and display headings use Source Serif 4; masthead controls use Source Sans 3. Keep the red wordmark period and active-path indicator; do not color individual words in the purpose. Desktop wordmark/purpose sizes are 54px/26px; mobile sizes are 40px/22px.

The audience is a labeled selector in the primary navigation row, not a second set of navigation links. On Learn it opens the selected audience view. On other paths it changes the teaching context while preserving the path, discussion claim, and selected document. Both audience selectors synchronize through the same handler.

### Intro reel

A first-time visitor to the home page sees the 15-second reel before the site. It plays muted, with Sound and Skip controls and a red progress rule. When it ends, its red period flies onto the masthead's period and the page takes over. The masthead's Watch the reel control replays it with sound at any time.

The reel does not autoplay for returning visitors (`jl-reel-seen` in localStorage), deep links such as `#workbench`, reduced-motion or data-saver settings, or browsers without `<dialog>`. It steps aside if playback fails or has not started within 8 seconds, and Skip and Escape always close it. Eligibility is decided by a small script in `<head>` (`html.reel-pending`), so the page never flashes before the reel covers it; if scripts fail, the page reveals itself after three seconds.

- Behaviour: `scripts/reel-client.js`. Styles: `styles/reel.css`. Markup: `reelDialog()` and the masthead button in `scripts/build-site.mjs`.
- Media: `media/reel/` holds the site cut (H.264 MP4 first, VP9 WebM fallback) and a first-frame poster. The build copies them to `assets/reel/` with a content version (`?v=`) so a new cut is never served stale. See `media/reel/README.md` to update the reel.
- Tests: `tests/alignment/reel.spec.mjs` covers first-visit autoplay, Skip, Escape, sound, suppression, failure and replay. Every other browser spec starts as a returning visitor (`storageState` in `playwright.config.mjs`).

## Alignment CI

Every PR in this repo, the companion, and the workbench runs the same shared alignment check: build; contract tests; single-source, retired-phrase, and link checks; browser checks.

To retire a framing, add a rule to the companion's `alignment/retired-phrases.json` in the same PR. Mark an intentional mention with an inline `<!-- alignment-allow: reason -->` comment instead of retiring the phrase.

Changes that span multiple repos share one branch name and merge in order: companion, then workbench, then site.

`main` is protected and requires this check to pass before merging. On failure, the run uploads `dist` and the Playwright report as artifacts.

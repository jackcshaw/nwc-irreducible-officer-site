# Integration plan: motion figures and the four-moves book on judgmentlab.net

October 28, 2026. This is a plan only. No site code, figure, runtime or test changed, and nothing was committed.

**Read for this plan:**
- This folder on `motion-figures` at 566afba, plus the overnight loop's uncommitted work: PLAN.md, CONVENTIONS.md, MORNING.md, `index.html`, every `figures/<slug>/` page and module, `runtime/motion.js`, `runtime/figures.css`, `book-v0/proposal.md`, `concepts-v0/proposal.md` §§3–7 and §10, `figures/appropriate-reliance/storyboard.md`.
- `book-v1/` does not exist yet.
- The site at `origin/main` 05ab9b0: `scripts/build-site.mjs`, `firebase.json`, `package.json`, `playwright.config.mjs`, `.github/workflows/alignment.yml`, the tests, `README.md`, `media/reel/README.md`, `docs/project-hygiene.md`, `docs/solutions/workflow-issues/coordinate-releases-across-parallel-sessions.md`.
- `docs/newsletter-setup.md` on `origin/codex/practitioner-conversation`.
- The companion at `main` 1240157: the essays, `audiences/catalog.json`, `sources/source-spine.md`, `labs/failure-mode-lab/README.md`.
- The Firebase Hosting configuration docs on `trailingSlash`.

Claims marked *(inferred)* are my reading, not something a file states.

## In brief

- **Paths.** Use real static paths (Option A): `/failure-modes/<slug>/` for the seven failure modes and `/appropriate-reliance/`. `build-site.mjs` writes each as a directory `index.html` with its own title, description, canonical URL, Open Graph card and JSON-LD. Firebase needs no config change.
  - Hash routes (Option B) can't give a figure its own title, card or canonical URL. Link unfurlers, crawlers and AI agents never see the fragment. That defeats "one authoritative page per topic".
- **Runtime.** It goes into the build as versioned assets under `/assets/figures/`, using the reel's `?v=` content-hash pattern. It is not inlined: seven figure modules come to about 241 KB raw.
  - First the runtime must become **instance-safe**. Today each module finds its figure by `#slug` and mounts itself on load, so a figure can appear only once per document.
- **Placement**, in this order:
  1. standalone pages;
  2. figure cards at their sentences in the PME essay;
  3. Practice failure-mode cards;
  4. the flat book on Learn, replacing the method band;
  5. live figures on the book's spreads;
  6. the page-turn (optional);
  7. setting pages and the HE and high-school editions, after educator review.
- **Single source.** The failure-mode rows (name, what goes wrong, faculty check) move out of the hard-coded `failureModesTable()` into one companion file before anything else reuses them.

---

## 0. Facts that shape the plan

| Fact | Where | Consequence |
| --- | --- | --- |
| The build writes one HTML page, `dist/index.html`. CSS (`css()` plus `styles/lab-refresh.css` and `styles/reel.css`) and JS (`clientJs()`, `scripts/reel-client.js`) are inlined. | `build-site.mjs` lines 218–231, 3494–3495, `buildHtml()` | Real pages are a new build output. The page uses relative `assets/...` links, which break two directories down, so figure pages need root-relative URLs. |
| Routing is hash-based. Unknown hashes go to `openEssaySection(id)`, which opens the essay at **any element id inside an essay panel**. Anything else falls back to Learn. | `clientJs()`, hashchange and initial-hash handlers | An essay figure card with `id="figure-<slug>"` is linkable as `/#figure-<slug>` with no router change. A Practice card id would land on Learn unless the router gets a prefix (as `discuss-` and `wb-doc-` have). |
| Firebase: `public: dist` and `cleanUrls: true`, with no `trailingSlash` key. `**` gets `no-cache`, `/assets/**` gets `max-age=3600`, png/svg/pdf get `max-age=86400`. | `firebase.json` | With `trailingSlash` unspecified, Hosting "only uses trailing slashes for directory index files (for example, about/index.html)" (Firebase docs). So `dist/failure-modes/frame-capture/index.html` serves at `/failure-modes/frame-capture/`. The no-slash form should redirect to it *(inferred from the docs; check with `curl -I` on a preview channel)*. |
| Playwright serves `dist` with `python3 -m http.server 5199`. | `playwright.config.mjs` | The python server also serves directory `index.html` and redirects to the trailing slash. A `.html` file plus `cleanUrls` would 404 locally, so use directories so local tests match production. |
| The reel pattern: media committed under `media/reel/`, copied to `assets/reel/` with one content version `?v=<10 hex>`, and a contract test that checks each file's size and the `?v=` format. | `build-site.mjs` 184–197, `reelDialog()`, `tests/site-contract.test.mjs` (reel block) | Figure assets and posters follow it. |
| Lazy-load precedent: `workbench-data.json` is fetched with `?v=<16 hex>` only when Design opens, "so essay readers never download it". | `build-site.mjs` 120–153, 1542 | index.html lazy-loads figure modules the same way. |
| The site has no JSON-LD, sitemap, robots.txt or 404.html. | grep of `build-site.mjs` | Each is a new addition. |
| Release: a `package.json` version-bump PR, then a deploy run by hand from a clean worktree (CI never deploys), then a hash-compare of every `dist` file against judgmentlab.net. The hash-compare follows `cleanUrls` redirects. | `coordinate-releases-across-parallel-sessions.md` | New directory pages get compared like any other file. Check the hash-compare output for them on the first release *(inferred: `/x/index.html` should redirect to `/x/`)*. |
| Module sizes, measured: `motion.js` 15.0 KB raw / 5.7 KB gz; `figures.css` 12.2 / 3.6. The seven built modules are 27–41 KB raw (9.4–13.2 KB gz), 241 KB / 79 KB together, and each page adds 3–6 KB of inline figure CSS. index.html is 361 KB (`book-v0/proposal.md` §4). | `wc`/`gzip` on this folder | Inlining every figure would grow index.html by about two thirds. They stay external and lazy. |
| Each module calls `document.querySelector('#<slug>')` and mounts on `document.fonts.ready` (e.g. `frame-capture.js` lines 67 and 457). Per-figure CSS is scoped by `#<slug>`. | the figure modules and pages | One instance per document. The essay, the book and Practice can't all host the same figure until this changes. |
| `mount()` builds the beat list in JS and assumes it exists (`list.classList…` with no null check). `__motionFigures[id]` exposes only `seek`, `settle`, `beats` and `duration`. | `runtime/motion.js` | Without JS the beat list (the text equivalent) is empty, so crawlers and agents never see the captions. The book can't play or pause a figure. |
| `figures.css` sets `:root` tokens, `* {box-sizing}`, `html`, `body`, `.sr-only` and the v0 mock classes (`.page`, `.mock-bar`). Its tokens match the site's (`--paper #f6f1e8`, `--ink #0a2242`, `--red #b81b2b`), and the site already loads all three font families, IBM Plex Mono 400–600 included. | `figures.css`, `css()` | Only the `.mf*` component rules can go into index.html. The page-level and mock rules stay off it. |
| The essay column is `max-width: 800px`. The legibility rule hides picture text under 11 px. | `css()` `.article-body`, CONVENTIONS "Legibility rule" | At 800 px a 960-unit stage scales to 0.83, and 12-unit labels render at 10 px, so they are hidden. UR's note says its stage survives only above about 812 px. Full players inside the essay column lose labels or go stacked. |
| The HE essay has five of the seven failure modes (no uncalibrated reliance or responsibility laundering). The high-school essay has four (frame capture, fluency, invisible delegation, monoculture). The figures use PME examples and PME words ("faculty", "seminar"). | `essays/he.md`, `essays/k12.md`, the figure modules | Edition placement is a content question as well as a build one. |
| `tests/site-contract.test.mjs` requires the string "One method, different teaching decisions". | its required-strings list | The book PR that retires the method band must change this test. |
| The retired-phrase test scans dist `.html/.md/.json` only. | `tests/alignment/retired-phrases.test.mjs` | Captions that live only in `.js` modules would escape it. Rendering the beat list as static HTML fixes this as a side effect. |
| Figure 8 is interactive: the reader's calls gate the timeline. It runs 133.5 s on the no-call path, and its storyboard already cuts the v0 "+17.9%" and "+25.1%" numbers. | `figures/appropriate-reliance/storyboard.md` | It needs its own tests and a runtime that supports gates. |
| Every change spanning repos shares one branch name and merges companion → workbench → site. CI checks out a sibling's same-named branch when it is ahead of main. | `README.md` "Alignment CI", `alignment.yml` | This governs PR 1 and PR 6. |

---

## 1. Standalone pages

### Option A: real static paths (recommended)

**URLs**
- `/failure-modes/frame-capture/`, `/failure-modes/fluency-substitution/`, … `/failure-modes/responsibility-laundering/`
- `/appropriate-reliance/` (the competency, so not under failure modes; PLAN.md)
- `/failure-modes/` itself: a short hub page (the seven, in essay order, each with poster, one-liner and check) or a redirect to the essay's Core Failure Modes table. Without one, Firebase returns its default 404 and the local python server shows a directory listing. This is decision D11.

**Build**
- Add `scripts/figure-pages.mjs` and call it from `build-site.mjs` after `index.html` is written. The build script is already 3,496 lines.
- Pass in the helpers it needs (`escapeHtml`, `renderMarkdown`, `siteUrl`, `release`, the shared failure-mode rows), the way `adaptTool()` receives them from `build-site.mjs`.
- It reads `figures/manifest.json` (slug, order, kind, path) and writes `dist/<path>/index.html` for each entry.
- **Page contract**, in the order CONVENTIONS "Standalone page" sets:
  1. a static masthead (wordmark, purpose, and the five paths as plain links: `/#learn`, `/#discuss`, `/#practice`, `/#design`, `/#references`);
  2. the kicker ("Failure mode 1 of 7");
  3. the `<h1>`;
  4. a descriptive subtitle;
  5. the setup paragraph;
  6. the figure (shot, controls, and a server-rendered beat list with "On screen" lines);
  7. the faculty check and follow-up, read from the shared rows;
  8. "From the essay": the paragraph, rendered from `content/the-irreducible-officer.md` at build time and never copied;
  9. "Go further": the book spread (once the book ships), Practice, and the essay sentence (`/#figure-<slug>` after PR 4, `/#ii-what-the-problem-looks-like` before it);
  10. the footer with `Version <version> · <site commit>`.
- The masthead needs CSS on both pages. Move the masthead and footer rules out of `css()` into `styles/masthead.css`, appended to index.html the way `lab-refresh.css` and `reel.css` are, and inlined into figure pages. One copy, no drift.
- Plausible analytics on every figure page. Optional `Figure Played` and `Figure Completed` events would give MORNING decision 5 (length) some evidence *(inferred, not requested)*.
- The reel's `<head>` check runs only on index.html, so figure pages never trigger the reel.

**Head**, per page:
- `<title>` and `og:title`: the topic plus what the page teaches.
- `meta description` and `og:description`: the subtitle, written as a direct answer, naming the audience (educators in PME, higher education and high school).
- `link rel=canonical` and `og:url`: `${SITE_URL}/failure-modes/<slug>/`.
- `og:type=article`.
- `og:image`: 1200 × 630 plus width and height. `twitter:card=summary_large_image`.
- JSON-LD:
  - `LearningResource` with `name`, `description`, `url`, `inLanguage`, `audience` (`EducationalAudience`, `educationalRole: "teacher"`), `timeRequired`, `isBasedOn` (*The Irreducible Officer*, `${SITE_URL}/#essay`) and `isPartOf` (the Judgment Lab `WebSite`);
  - a `BreadcrumbList`.
- Keep `SITE_URL` unset for releases. A preview value bakes the preview origin into canonical and OG, as it already does for index.html.

**The Every rules** (`docs/newsletter-setup.md`), applied to these pages:
1. **Say what the page teaches in the title.** Today's `<title>Frame Capture</title>` says nothing about what the page teaches. Pattern: "<Failure mode>: <what goes wrong, in plain words>, and the question that shows it". This is a draft pattern. Every title, subtitle and setup paragraph goes through `writing-as-jack` in its PR, with no "X, not Y" openings.
2. **Write subtitles as direct answers.** The meta description is the subtitle.
3. **Lead with what the reader gets.**
4. **No freshness tags.** Contract-test against "(Updated" and years in titles.
5. **One authority per topic.** The standalone page is canonical. The essay, Practice, the book and future articles or newsletter issues link to it. The SPA placements are one URL (`/`), so they don't compete as pages.
6. **Describe the audience.**

The article's own limits note says it "doesn't cover llms.txt, schema markup, RSS or crawler settings". JSON-LD and a `sitemap.xml` are cheap, but nothing in the evidence shows they help. They are listed as decision D5.

**Posters and the OG card**
- **Script.** `scripts/figure-posters.mjs` grows from `scripts/figure-shots.mjs`, re-pointed from its absolute worktree Playwright import to the site's `@playwright/test`. For each figure it renders the final frame (the poster, per CONVENTIONS) to:
  - `media/figures/<slug>/final.png`, the shot at 2×, used as the in-page placeholder and the no-JS image;
  - `media/figures/<slug>/og.png`, 1200 × 630, with the stage's final frame on paper.
- **Freshness.** A `media/figures/<slug>/manifest.json` records the sha256 of the module, runtime and CSS the posters were rendered from. A contract test fails when they are stale ("run `npm run figures:posters`").
- **Build.** It copies the posters with `?v=`, as it does the reel. This keeps the build free of a headless browser; it needs only node and uv today, and CI installs Chromium only for the browser suite.
- **Final frame or early beat.** The runtime's `poster:` option (an early settled beat, used by PS, UR, ID and IM) is a different thing: what a waiting player shows. The OG card should be the final frame, because it carries the check. This is decision D6.

**Firebase**
- No `firebase.json` change is required. `cleanUrls: true` stays.
- HTML is already `no-cache` through `**`. Assets under `/assets/` get one hour, and `?v=` makes staleness impossible.
- Optional: a `404.html`. There is none today, so a mistyped figure URL gets Firebase's default page.
- On the first release, check the following *(inferred, unverified)*:
  - `curl -I https://judgmentlab.net/failure-modes/frame-capture` returns 301 to the slash form;
  - the hash-compare reports every new file as `OK`.

### Option B: hash routes in the single page

`#failure-modes/frame-capture` (or a `fm-` prefix) would be a new route like `discuss-` and `wb-doc-`. The figure would render inside a new `mode-view`.

- **Cost.** About a day. No new pages, no masthead extraction, no Firebase questions.
- **What it loses:**
  - The fragment never reaches a server. Every figure shares the site's `<title>`, `share-card.png` and canonical `/`.
  - Slack, LinkedIn and agents unfurl the generic card. Crawlers index one page.
  - An agent fetching the link gets the whole 361 KB app, with the figure's text mixed in among five surfaces.
  - JS could retitle the tab, but OG scrapers don't run JS.
- **Fit.** It fails Jack's article-per-failure-mode goal and Every rule 5 directly.

**Recommendation: A**, with the SPA placements (sections 3.2–3.5) linking to the A pages as canonical.

---

## 2. The runtime in the build

### Where things go

| From (this folder) | To (site repo) | Built to |
| --- | --- | --- |
| `runtime/motion.js` | `figures/runtime/motion.js` | `dist/assets/figures/motion.js?v=<10 hex>` |
| `runtime/figures.css`, `.mf*` component rules | `figures/runtime/figure.css` | `dist/assets/figures/figure.css?v=…`, and inlined into index.html once cards or book spreads need it |
| `runtime/figures.css`, `.fig-*` standalone-page rules | `styles/figure-page.css` | inlined into figure pages |
| `runtime/figures.css`, v0 mock chrome (`.mock-bar`, `.page`, `.mock-note`) and the global `:root`, `*`, `html`, `body`, `.sr-only` rules | dropped; the site's own rules apply | — |
| `figures/<slug>/<slug>.js` | `figures/<slug>/<slug>.js` | `dist/assets/figures/<slug>.js?v=…` |
| the inline `<style>` in each `figures/<slug>/index.html` | `figures/<slug>/<slug>.css`, rescoped from `#<slug>` to `[data-mf-figure="<slug>"]` | `dist/assets/figures/<slug>.css?v=…` |
| the `BEATS` array in each module, plus the page's title, setup, sr-only summary, duration and essay anchor | `figures/<slug>/figure.json` | read by the build (static beat list, page text), and handed to the module so captions have one source |
| storyboards, cold reads, CONVENTIONS, PLAN, prototypes | stay in `design/motion-figures/` as the record (PR 0); the build never reads them | — |

**Versioning.** Each file gets its own `?v=` (sha256, first 10 hex, the reel's length), so changing one figure doesn't bust the others. The reel uses one version for its three files because they change together; figures don't.

### Instance-safe runtime: the changes

1. **Registration.** Replace self-mounting with `MotionFigures.define('<slug>', (root) => ({duration, render, beats, poster}))`. The runtime mounts every `[data-mf-figure="<slug>"]` after `document.fonts.ready`.
   - Element lookups inside a module (`root.querySelector('[data-fs-narrow]')`) already work from `root`. Only the `#<slug>` lookup changes.
   - `__motionFigures` is keyed per instance (`<slug>`, `<slug>-2`, …), so stills and export scripts keep working on the standalone page.
2. **Hydration.** `mount()` adopts a server-rendered `<ol data-mf-beats>` (one `<li>` per beat, with its "On screen" line) and adds the buttons, instead of creating the list. A missing list is tolerated.
   - The result: the text equivalent exists without JS, crawlers and agents read the captions, and the retired-phrase test scans them.
3. **Control API.** Add `play()`, `pause()` and `state` to the instance handle so the book can start a figure when its spread opens and pause it when the reader turns away. `data-mf-autoplay="off"` already exists.
4. **Test hooks.** Scope `?t=` and `?reduced` to standalone pages (or rename them `?mf-t=`), so a query on index.html can't freeze every figure.
5. **Interactive figures.** Figure 8 needs gates (the timeline waits for a reader's call) and "Start over". This lands in the runtime when figure 8 passes its loop, not in PR 2.

### How figure modules load

- **Standalone pages.** `<link rel=stylesheet>` for `figure.css` and `<slug>.css`, then `<script defer>` for `motion.js` and `<slug>.js`. Autoplay stays as it is today: the whole player in view, played once.
- **index.html.**
  - No figure JS loads until a figure is wanted (the essay, Practice and the flat book show poster cards only).
  - From PR 7, a small inline loader (about 1 KB *(inferred)*) injects `motion.js?v=` once, then `<slug>.js?v=`, when a book spread with a figure opens or the reader presses Play.
  - It then calls `MotionFigures.mount` on that element. This is the `workbench-data.json` pattern.
  - Autoplay is always off on index.html (decision D7).

---

## 3. Placement

### 3.1 What is single-source and what is site-only

| Content | Owner | How the site gets it |
| --- | --- | --- |
| PME essay text, including the figure pages' "From the essay" passages and essay anchors | site `content/the-irreducible-officer.md` (SOT), mirrored to the companion; the build already fails if they differ | rendered at build time; anchors fail loud through `placeEssayFigures` |
| HE and high-school essays | companion `essays/he.md`, `essays/k12.md` | `readRequiredCompanionFile` (already) |
| Failure-mode rows: slug, name, what goes wrong, faculty check, and the follow-up if MORNING 1 adopts it | **today hard-coded in site `failureModesTable()`**; move to one companion file, e.g. `audiences/four-moves.md`, so the AI context bundle and the site share them (`book-v0` §4 proposes the file and the move) | strict, fail-loud parser on the `scripts/at-a-glance.mjs` pattern; the essay table, figure pages, Practice cards and the book all read it |
| Four moves: titles, "asks", quotes, the move-to-failure mapping, pilot steps | same companion file (`book-v0` §4, Option A) | same parser |
| Study numbers (UR evidence panel, figure 8) | companion `sources/source-spine.md` | tests check every figure number against it (section 4); the numbers aren't generated |
| Setting labels | companion `audiences/catalog.json` | already read |
| Runtime, figure modules (render code, beats, captions), per-figure CSS, posters | **site-only** (`figures/`, `media/figures/`) | build copies them |
| Page titles, subtitles, setup paragraphs, card copy | **site-only** visitor copy (`figures/<slug>/figure.json`), through `writing-as-jack` | build reads it |
| Book layout, page-turn JS, Practice card layout, the lazy loader | **site-only** | build |
| Storyboards, cold reads, design history | **site repo record** (`design/motion-figures/`), not built | — |

*(Inferred, optional later)*: the companion bundle could carry each figure's text equivalent, so an assistant can talk through a figure. The static beat lists already make the pages readable to an assistant that fetches them.

### 3.2 Figures at their sentences in the PME essay

- **Anchors.** Through `placeEssayFigures` `insertAfter`, which fails the build when the essay prose changes. Every anchor below was checked against the essay and occurs exactly once.
  - Frame capture: after "…The frame capture is invisible inside the final product."
  - Fluency substitution: after "…may never identify which risk actually matters most."
  - Premature synthesis: after "…forming a mental map and inherited one instead."
  - Uncalibrated reliance: after "…before discovering the error downstream." The v0 plan had no anchor here; figure 4 is now a full figure.
  - Invisible delegation: after "…the model has already done the framing."
  - Institutional monoculture: after "…the range of strategic imagination the seminar is meant to develop."
  - Responsibility laundering: after "…who chose the frame does not have a satisfying answer."
  - Appropriate reliance (Section V): after "…what independent checks are required before the output governs the work."
- **Form: a figure card in the `.argument-insert` skin.** Each card carries:
  - the poster (`final.png`, `loading="lazy"`);
  - the name and its one-liner from the shared rows;
  - the running time;
  - "Watch the figure", linking to the standalone page;
  - `id="figure-<slug>"`, so the page's essay link returns to the sentence through the existing router.
- **Why a card and not a full player:**
  - the 800 px column hides 12-unit labels (section 0);
  - Section II would carry seven 85–133-second players in a row;
  - concepts-v0's one-autoplay-per-screen rule was written for 8-second figures.
- "Play here" in place (a wide `<dialog>`, like the reel's) is a follow-up if Jack wants it (D7).

### 3.3 Practice failure-mode cards

- **What changes.** "Test a failure mode" replaces its dot-separated list (`buildCompanionMode()`) with seven cards in essay order. Each card has:
  - the poster thumbnail, the name, the one-liner and the check, all from the shared rows;
  - "Watch the figure", linking to the page;
  - "Test this one", which copies the existing lab prompt with "Start with <name>."
- **Appropriate reliance** goes above them as a warm-up card (concepts-v0 §4).
- **Deep links.** If cards need them, add a `fm-` hash prefix to the router. Today an unknown non-essay hash lands on Learn.
- **Setting.** The HE essay covers five of the seven and the high-school essay four (D8). Default: show all seven and mark the ones absent from the selected edition's essay.

### 3.4 The book on Learn

Per `book-v0` Option A, the book replaces `.method-band` ("One method, different teaching decisions") in `buildOverviewMode()`.

- **Structure** (PLAN.md "The book"). Each move's spread is followed by its failure modes' spreads; appropriate reliance sits in Calibrate the tool. About 15 spreads: cover, how to read, contents, 4 moves, 8 figures, close *(count inferred from the mapping)*.
- **Flat first** (book PR 1 = Option C):
  - the source file and parser;
  - the flat panel;
  - the essay's closing tiles linking to the book;
  - the setting pages' "Three moves the essay argues for" linking to the book;
  - a deep link (`?move=` per `book-v0`; extend it to `?book=<slug>` for failure-mode spreads).
  - Figure spreads show the poster card, linking to the page.
- **Live figures second.** Spreads load and mount their figure when opened (`data-mf-autoplay="off"`; the book controller calls `play()`, and `pause()` on turn-away).
  - The book needs a spread-open signal for this, because IntersectionObserver ignores `backface-visibility`. A turned face could still count as "in view" *(inferred)*.
- **Page-turn last, optional** (`book-v0` §4; concepts-v0 §5 argues the budget is better spent on figures).
- **Open design question for book-v1 (D10).** A figure on one page (about 500–560 px) loses its labels to the legibility rule; concepts-v0 §5 measured about 9 px at 500 px. Spanning both pages keeps the labels.
- **Test change.** The method-band string assertion in `site-contract.test.mjs` changes in the flat-book PR.

### 3.5 Setting pages and the editions

- **PME setting page.** One frame-capture card (every catalog entry's `focus` is "Frame capture"; the build doesn't use the field yet), near "Or try the judgment first".
- **HE and high-school setting pages and essays.**
  - The figures show PME examples and say "faculty" and "seminar".
  - Default *(recommended)*: wait for edition variants or educator review (concepts-v0 §10 Q6, `book-v0` §9 Q4).
  - Alternative: cards at the editions' own failure-mode paragraphs (HE 5, high school 4), quoting that edition's paragraph and labelled "The figure's example is the PME one."
- **Default edition** (Jack's decision, EDITIONS-PLAN.md, "Jack's decisions").
  - Business with the workplace cast is the default for standalone pages and articles.
  - The design pages still fall back to PME, so the PME regression baselines stay simple.
  - So the site build must set the default to business on `/failure-modes/<slug>/` pages (`data-edition="business"` on the figure, or the static business page below).
  - The military-education edition stays reachable from the edition switch, and the essay's figure cards and the PME setting page link to it.
  - Each edition's text and meta must still be pre-rendered (the next requirement).
- **Requirement: pre-render every edition** (added after the frame-capture business recheck).
  - The build must pre-render each edition's text into static HTML: the title, setup, check, beat list, evidence, links and meta.
  - Readers without JavaScript, and crawlers, then get the full text.
  - The design pages fill their copy with JavaScript. Without it they show only an edition-neutral `<noscript>` summary: the name, the role-neutral definition, and "This figure needs JavaScript to play."
- **A static page per edition** (added after the frame-capture business verification).
  - In the motion-figures prototype, `?edition=` picks an edition at runtime. The page's copy and meta description are filled in by JavaScript (`MotionFigures.fillPage`).
  - A link preview, or a crawler that runs no JavaScript, sees only the static fallback: role-neutral meta, and empty page copy.
  - The build should emit one static page per edition, e.g. `/failure-modes/frame-capture/` for the default (business) edition and `/failure-modes/frame-capture/pme/`. Each page bakes in that edition's title, meta description, Open Graph tags and page copy from `editions/<id>.json` and `casts.json`. The figure is set with `data-edition`.
  - The edition switch then links between these static paths rather than `?edition=`.
  - At minimum, emit static meta per edition, so social previews and search results carry the right wording.
- **Pre-render per cast too** (added with the classroom cast mechanism, CLASSROOM-PLAN.md).
  - A business edition that lists `casts` is a separate page in each cast: the words differ ("analyst" or "student", "Reviewer's check" or "Faculty check"), so each needs its own static text and meta.
  - Resolve the words the way the runtime does. `MotionFigures.resolveEdition(raw, casts, castId)` is pure, so the build can run it, as `scripts/edition-check.mjs` does, rather than copying its logic.
  - Paths, e.g. `/failure-modes/frame-capture/` (business, workplace), `/failure-modes/frame-capture/classroom/`, `/failure-modes/frame-capture/high-school/` and `/failure-modes/frame-capture/pme/`. The switch's Classroom link (`data-cast-link="classroom"`) then points at the classroom path.
  - Run `scripts/edition-check.mjs` in the build or its tests. It fails on an unfilled `{key}`, another cast's role words or a reviewer verb that breaks with plural "Faculty".
  - Until a figure's business edition lists a cast, `?cast=` outside its list falls back to the workplace cast, so don't emit a cast page for that figure.
- **The site's settings map to casts.**
  - PME: the `pme` edition (its own cast is `classroom`).
  - HE: the business edition with the `classroom` cast ("faculty", "seminar", "Faculty check").
  - K–12: the business edition with the `high-school` cast ("the teacher", "class", "Teacher’s check").
  - Workplace, and standalone pages and articles: the business edition in its own `workplace` cast.
  - A setting page or card links to the cast's static path (or `?edition=business&cast=classroom` / `&cast=high-school` in the prototype). Where a figure doesn't list the cast, the link falls back as above. CLASSROOM-PLAN.md decision 7 sends fluency substitution's high-school link to the workplace edition if its high-school read fails.

---

## 4. Tests

The existing suites keep running: `npm test` (contract and alignment) and `npm run test:browser`. All new suites are parametrized by `figures/manifest.json`, so a figure PR adds a manifest entry and no test code. Run browser specs on a temporary alternate-port config when 5199 is busy (port-collision memory).

### Node contract (`tests/figures.test.mjs`, new)

- **Pages exist.** Every manifest entry builds `dist/<path>/index.html`, and nothing in `design/` is read by the build.
- **Head:**
  - `<title>` contains the name and more than the name, with no "(Updated" and no year;
  - meta description present (length bounds);
  - `canonical` and `og:url` equal `${SITE_URL}/<path>/`;
  - `og:image` points at a built file whose PNG header says 1200 × 630;
  - `twitter:card` present;
  - JSON-LD parses, and its `url` equals the canonical.
- **Body:**
  - the static beat list has as many items as `figure.json` has beats;
  - the last beat's check equals the shared row's faculty check verbatim, and the follow-up is present (MORNING 1);
  - the kicker number matches the row order;
  - the "From the essay" passage is an exact substring of the rendered essay;
  - "Go further" links resolve.
- **Assets.** Every `src` and `href` under `/assets/figures/` exists and carries `?v=` equal to the file's hash; the reel test, generalized.
- **Poster freshness.** The `media/figures/<slug>/manifest.json` hashes match the current module, runtime and CSS.
- **Numbers.** Every `\d+(\.\d+)?%` (and "N percentage points") in `figure.json` beats and details appears in `sources/source-spine.md`. The browser harvest below covers numbers drawn only in the SVG.
- **Single source.** Extend `single-source.test.mjs`: no failure-mode one-liner, check or move sentence appears in `scripts/*.mjs` or `figures/**/*.js`. They come only from the shared file.
- **Links.** New `tests/alignment/html-links.test.mjs`: every root-relative `href` in `dist/**/*.html` resolves to a dist file, a directory `index.html`, or a known hash route. Today `links.test.mjs` checks published Markdown only.
- **index.html stays lean.** Until PR 7, no `<script src=…/assets/figures/` in index.html. Five tabpanels still (existing assertion).
- **Retired phrases.** Automatic for the new HTML, because beats are static.

### Browser (`tests/alignment/figures.spec.mjs`, new; parametrized)

- **Autoplay gating.**
  - At 1440 × 900 and 1280 × 720, a standalone page plays only once half the shot and all of the caption band and controls are in view (`data-state="playing"`, and the clock advances).
  - Scrolled out of view at load, it doesn't play.
  - Figures with `data-mf-autoplay="off"` (all of index.html) never play on their own.
- **Reduced motion** (`emulateMedia({reducedMotion: "reduce"})`):
  - no playing state; the scrubber at the duration; the final frame shown;
  - "On screen" lines visible;
  - a beat click jumps to that beat's settled still;
  - `?reduced` behaves the same.
- **Keyboard:**
  - Tab order runs Play, Restart, scrubber, beats;
  - Enter and Space toggle play;
  - on the scrubber, ArrowRight moves 1 s and Shift+ArrowRight 5 s;
  - focus is visible;
  - ArrowRight with focus on the body does nothing (no global capture).
- **390 × 844 and 375:**
  - no horizontal scroll;
  - the stacked stage where the figure has one;
  - the controls' top doesn't move while seeking through the whole run (CONVENTIONS "fixed layout");
  - the check and the controls fit 844 px.
- **Numbers.** Seek each beat's settled moment and the final frame, collect visible SVG and HTML text, and assert each percentage appears in the source spine.
- **Determinism.** `seek(t)` twice gives identical SVG `outerHTML`.
- **No JS** (`javaScriptEnabled: false`): the title, setup, poster image, beat list, check and passage are visible.
- **Print** (`emulateMedia({media: "print"})`): the final frame and full text; controls hidden.
- **Routing:**
  - `/failure-modes/<slug>` (no slash) reaches the page;
  - the masthead links open the right SPA surfaces;
  - no console errors.
- **Essay (PR 4):**
  - eight cards, each after its sentence;
  - each card's link reaches a built page;
  - `/#figure-<slug>` opens the essay scrolled to the card;
  - the essay view requests no `/assets/figures/*.js`.
- **Practice (PR 5):**
  - seven cards in row order, plus the warm-up;
  - "Test this one" copies a prompt naming that failure mode;
  - 390 layout;
  - setting marks follow the audience selector.
- **Book (PRs 6–8):** `book-v0` §7 in full: spread state and live text, `inert`, scoped arrow keys, contents focus, `location.hash` unchanged, no face overflow at 1101, 1280 and 1440, 390 stacked, reduced-motion instant swap, no-JS document, "Read as one page". Then, for the figures:
  - opening a figure spread loads only that figure's module and plays it;
  - turning away pauses it;
  - hidden faces never play;
  - reduced motion shows the final frame with no tween.
- **Figure 8 (interactive):**
  - every combination of the calls;
  - the timeline holds at each gate;
  - "Start over" clears the calls;
  - reduced motion with no calls made still reaches a readable final frame.
- **Load.** Treat failures under load as suspect until a quiet rerun (port-collision memory).

---

## 5. PR sequence

Each PR follows the user-wide pipeline: description, review and simplifier (except no-logic PRs), verification, merge, compound. Before merging to site `main`, check that no release is in flight in another session (`coordinate-releases-across-parallel-sessions.md`). Releases are separate version-bump PRs, marked ▲.

| # | PR | Scope | Size (rough) | Tests | Waits on |
| --- | --- | --- | --- | --- | --- |
| 0 | **Design record** (the `motion-figures` branch's own PR) | Land `design/motion-figures/` (plans, storyboards, cold reads, conventions, prototypes; media stays gitignored) so the branch isn't lost to the 30-day no-PR rule. Add a note that production code lives in `figures/` from PR 2. | Many files, no logic (no-logic exception) | CI green; the build doesn't read `design/` | The overnight loop finishing, or a checkpoint |
| 1 | **Failure-mode rows, single-source** (companion, then site; same branch name) | Companion: rows file (slug, name, what goes wrong, check, follow-up slot). Site: strict parser; `failureModesTable()` reads it. | S: about 80 lines companion, about 60 site, about 60 tests | Table renders byte-identical; parser fails loud on a missing field or an eighth row; single-source extension | Nothing, if it ships today's verbatim checks; D4 changes the rows later |
| 2 | **Runtime and the first standalone page: frame capture** | `figures/runtime/` (instance-safe `define`, hydration, play/pause, scoped hooks, CSS split); `figures/frame-capture/` (module, CSS, `figure.json`); `scripts/figure-pages.mjs`; `styles/masthead.css` extracted; `scripts/figure-posters.mjs`, `media/figures/frame-capture/`; `/failure-modes/frame-capture/` with full head and JSON-LD; `html-links` test | M–L: about 500 new lines of logic plus about 45 KB moved | `figures.test.mjs` and `figures.spec.mjs` created; reel-style `?v=` checks | D1 (paths), D2 (colour), D3 (length), D4 (check wording on the page), D5 (title pattern, JSON-LD and sitemap), D6 (OG frame); a voice pass on the page copy |
| ▲ | Release | First real path live. Check `curl -I` and the hash-compare output for the new files. | — | Release step | — |
| 3a–3f | **One PR per passed figure**: fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering | Port the module to `define`, rescope its CSS, `figure.json`, posters, manifest entry. The `/failure-modes/` hub (or its redirect) lands with 3a. | S each: mostly moved code, about 30–50 new lines | None new; the parametrized suites pick up the slug | Each figure passing its loop; D11 (hub) for 3a |
| 3g | **Appropriate reliance** (interactive) | Same, plus runtime gates and "Start over", and the interactive spec | M | Figure 8 spec | MORNING 6 (numbers); the figure passing its loop |
| ▲ | Release | Pages live as they land, released in batches | — | — | — |
| 4 | **Essay figure cards** | Eight cards at their anchors (section 3.2), with `id="figure-<slug>"`; figure pages' essay links switch to `/#figure-<slug>` | S–M: about 120 lines plus about 100 test lines | Anchor order, link targets, no figure JS on the essay, `/#figure-…` route, 390 | concepts-v0 Q1 (essay as a home), D7 (card or in-place, autoplay off) |
| 5 | **Practice failure-mode cards** | Seven cards plus the appropriate-reliance warm-up, from the shared rows; per-card prompt; optional `fm-` route | S–M: about 120 plus 80 | Order, single source, copy prompt, setting marks, 390 | D8 (setting marks, per-card prompt copy) |
| ▲ | Release | — | — | — | — |
| 6 | **The book, flat** (companion, then site) | Moves and mapping added to the companion file; parser; flat panel replacing the method band; essay tiles and setting pages linking to it; `?move=` and `?book=` deep links; figure spreads as poster cards | M: about 3 KB CSS, no JS (`book-v0` Option C) plus the parser and tests | `book-v0` §7 node contract; method-band assertion replaced | MORNING 4 (mapping); `book-v0` §9 Q1 (four moves vs the five-part method), Q3 (garden-path definition), Q4 (setting lines), Q5 (placement); voice pass |
| 7 | **Live figures in the book** | Inline lazy loader; spread-open → `mount` → `play`, turn-away → `pause`; component CSS inlined into index.html | M: loader about 80 lines, hooks about 60, tests about 150 | Book figure specs (section 4) | D10 (figure size on a spread, settled in `book-v1`); concepts-v0 Q7 |
| 8 | **Page-turn layer** (optional) | `book-v0` PR 2: CSS 3D turns, riffle, swipe | M: about 10 KB CSS, 5 KB JS (`book-v0` §4) | `book-v0` §7 browser set | `book-v0` Q6 (cover or open), Q7 (two PRs); whether it earns its place |
| ▲ | Release | — | — | — | — |
| 9 | **Setting pages and editions** | PME setting-page card; HE and high-school cards or variants | S–M | Edition anchors fail loud; per-edition counts (HE 5, high school 4) | concepts-v0 Q6, `book-v0` Q4, educator review |

PRs 4 and 5 depend only on PR 2 and on the figures they show; they can run in parallel worktrees. PR 6 depends on PR 1, not on PRs 3–5.

---

## 6. Decisions Jack must make first

Cross-referenced to MORNING.md ("M") and PLAN.md's decision list ("P"). New ones from this plan are marked "new".

**Before PR 2, the first public page**
- **D1. Real paths** (M3, P1). Recommended: Option A, with the URL scheme `/failure-modes/<slug>/` and `/appropriate-reliance/`. These URLs are permanent once articles link to them.
- **D2. Colour rule** (M2). Changing it after publishing means rebuilding every figure.
- **D3. Length** (M5). Any cuts belong before the canonical pages ship. Optional play/complete events could inform it.
- **D4. Checks and follow-ups** (M1). Keep the site's checks verbatim with the follow-ups beneath (the default: PR 1 ships the verbatim rows), or revise the checks. This affects the shared rows, the essay table and every page.
- **D5 (new). Title and subtitle pattern** under `writing-as-jack` and the Every rules. Also: JSON-LD and `sitemap.xml`, which the article's evidence doesn't cover.
- **D6 (new, small). OG card**: the final frame (recommended) or the runtime's early poster beat.

**Before later PRs**
- **D11 (new), before 3a.** `/failure-modes/` as a hub page or a redirect to the essay table.
- **M6, before 3g.** Figure 8's numbers. The storyboard already cuts +17.9% and +25.1% because they aren't in the source spine; confirm.
- **D7 (new, with concepts-v0 Q1 and Q2), before PR 4.** Essay cards that link out (recommended), or play in place. Autoplay off everywhere on index.html.
- **D8 (new), before PR 5.** Practice cards per setting (HE 5, high school 4); the per-card prompt copy.
- **Before PR 6:**
  - M4 and P2: the mapping;
  - `book-v0` §9 Q1: the four moves over the five-part method, and retiring the method band;
  - `book-v0` Q3: the garden-path definition, in Jack's words;
  - `book-v0` Q4: setting lines;
  - `book-v0` Q5: placement.
- **D10 (new), before PR 7.** A figure across both pages of a spread (labels kept) or on one page (labels hidden). `book-v1` should settle this.
- **Before PR 8:** `book-v0` Q6 and Q7; concepts-v0 Q7.
- **Before PR 9:** concepts-v0 Q6 and `book-v0` Q4: editions after educator review.
- **Not blocking:** P3 (voiceover later), concepts-v0 Q8 (MP4 slide pack; `scripts/figure-export.mjs` already renders them).

---

## Diagnostic notes

- **Hardest decision:** cards in the essay rather than live players. Concepts-v0 put players in the essay. The column width, the legibility rule and seven figures of 85–133 seconds in a single section changed the answer, and the standalone page is where Jack wants the authority anyway.
- **Alternatives rejected:**
  - hash routes (no per-figure card or canonical);
  - inlining modules into index.html (about 241 KB raw for seven);
  - rendering posters inside the build (it would put a headless browser in every build);
  - one shared `?v=` for all figure files (one edit busts all eight);
  - self-mounting modules (one instance per document).
- **Least confident:**
  - the trailing-slash redirect and the hash-compare behaviour on directory pages, which are inferred from Firebase's docs and not yet tested on a preview channel;
  - whether IntersectionObserver misreports turned book faces;
  - whether JSON-LD helps agent recommendation at all.

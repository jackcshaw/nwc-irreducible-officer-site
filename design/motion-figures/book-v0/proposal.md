# The four moves as a book: proposal for judgmentlab.net

Prepared 2026-10-27 from site `origin/main` (b9d21bd, release 2026.9.30) and companion `main` (1240157). Nothing in either repo was changed.

## Recommendation in brief

"Primary judgment rules" most likely means the essay's closing four moves: **Frame the problem. Calibrate the tool. Refuse the garden path. Own the decision.** They are the rules the reel is built on, and the site explains them less than anything else it states.

Put a short **"The four moves" book on the Learn page**, in the slot the "One method, different teaching decisions" band now fills. It has six spreads: cover, how to read it, one spread per move, and a close. Each move's left page says what the move asks and quotes the essay. Its right page lists the failure modes the move guards against, the faculty check question, the evidence to keep and the pilot step. That right page is where the clarity comes from: the site's other lists (seven failure modes, four evidence types, five pilot steps) line up for the first time under the move each one serves.

Build it in vanilla CSS 3D as a progressive enhancement of a plain document. Without JS, with "Read as one page", in print and on a phone, readers get that plain document, or one spread at a time. Ship it as two PRs. The content and flat layout go first and stand on their own. The page-turn layer follows only if it earns its place.

Prototype: `four-moves-book.html` in this folder, with screenshots in `shots/`.

---

## 1. What "primary judgment rules" refers to

The site states one idea in at least five vocabularies, and none of them is explained where it appears.

| Candidate | Where it appears today | How it is presented |
| --- | --- | --- |
| **Closing four moves**: Frame the problem. Calibrate the tool. Refuse the garden path. Own the decision. | The 15-second reel (first visit only, plus "Watch the reel"); the last line of the PME essay; the reel's screen-reader description | The reel spends about 2 seconds on each move. In the essay they are four flat tiles (`closingStandard()`) at 21,661px of a 24,449px page, 89% of the way down, with no definitions. They do **not** appear in the HE or high-school editions, whose closings are calls to action. |
| **Five-part method**: Own the purpose. Examine the frame. Calibrate reliance. Defend the decision. Change the conditions. | Learn page, `.method-band` "One method, different teaching decisions", about 1,540px down a 2,784px page | Run together as one paragraph. Nothing defines the parts. The only link downloads `shared-foundations.md` as a Markdown file. It isn't written verbatim in any companion file; it condenses "The common practice" in `audiences/shared-foundations.md`. |
| **Three moves** | Setting pages (#pme, #he, #k12), "Or try the judgment first" | "set your own frame before AI answers, decide what to take from an AI answer, and test whether your frame holds when the situation changes." This is good, but it is yet another phrasing. |
| **Seven failure modes** | Essay Section II "Core Failure Modes" table (Failure / What Goes Wrong / Faculty Check); Practice "Test a failure mode" | The essay table works well. On Practice they are a dot-separated run-on list with no definitions. |
| **Five-step pilot** | Essay Section IX numbered strip (`pilotSequence()`); Learn "See the five-step pilot" link | The strip is clear and the prose beneath it explains each step. |
| **Eight claims** | `claims.md` (canonical), downloadable; not drawn on the page | Discuss uses five different claims from the EduFish edition. |
| **Four evidence types** (frame, reliance, accountability, transfer) | Essay Section VIII prose; "What Counts As Reliance Evidence" table; Practice capability card ("purpose, frame, reliance, accountability, and transfer") | Prose only. The design brief planned a visual for this standard that was never built. |

There is also a sixth phrasing in Section II: "to set purpose, test frames, calibrate reliance, expose failure modes, and defend the judgment as their own."

**Which one Jack means:** the closing four moves. They are short imperatives, the essay calls the conclusion "the standard", and Jack chose them as the spine of the reel, which is the site's front door. The reel README maps them to a visual grammar: crop brackets, a gauge (Rely/Verify/Redirect/Refuse), a ledger of the seven failure modes struck through in red, and the dot that becomes the period. The five-part Learn method is the same rule set restated for every setting. The book should settle the two, not add a seventh vocabulary.

**Which list the book suits:**

- **The four moves: best fit.** There are four of them, they come in order (the frame comes first because reliance and ownership are judged against it), and each needs a few sentences plus a practical consequence. That fills a spread, not a chapter.
- **The five-step pilot: second.** It is a sequence in time, but educators planning it need all five steps at once, with more text per step than a page holds. The essay's strip and prose already work. The book should point to the pilot from each move.
- **The seven failure modes: poor fit.** It is a diagnostic reference people scan and compare, so a book hides six of the seven at any moment. Keep the table and index the failure modes from the moves.
- **The eight claims: poor fit.** They form a dependency argument, which suits a map better.
- **The four evidence types:** these fold into the moves: frame evidence under 1, reliance under 2, transfer under 3, accountability and the oral defense under 4.

---

## 2. The reference: what makes *Every Joule* work

URL: https://iamtechartist.github.io/every-joule-lesson1/ ("Every Joule · Lesson 1: Energy stores", by Techartist). Screenshots are in `ref-shots/` and the downloaded build is in `ref/`.

**Interaction**
- A calligraphic loader ("Techartist" writes itself, and a drop of colour lands as the dot of the i) hands off to a closed hardback on a desk at three-quarter view. A click opens it, and the camera settles to a top-down view of the open spread.
- Pages turn with ArrowLeft/ArrowRight and PageUp/PageDown, bound globally because the page is a full-screen app. A wheel turns a page after 90px of accumulated delta, and a swipe after 70px.
- A glass capsule bar sits at the bottom: contents, back, a play/watch mode (Space), the current lesson title, next, mute, a still-mode toggle and a teachers' page.
- A turn takes roughly a second and bends the page, with real lighting and shadow. The depth reads as a physical object on a desk.

**Sequencing**
- One idea per spread. The left page carries the lesson title, two framing sentences, the key equation, a glossary, a **Predict** multiple-choice question, and a paper flap: "Lift the flap to see the answer… after you have made your prediction."
- The right page holds a 3D ink drawing that rises off the page (a shelf of eight jars and eight objects), with the instruction "Tap each thing in the scene to light its jar".
- The structure is commit, then reveal, then explore. Progress (stamps, bookmark) persists in `localStorage`.
- Its best idea for us: **predict before reveal.** It is the essay's own method (frame first, then let the tool contribute).

**Build**
- Vite bundle, about 1.39 MB of JS uncompressed: three.js r170 (688 KB), a post-processing chunk with `EffectComposer` and `SkinnedMesh` (302 KB), app code (194 KB) and lesson data chunks (about 210 KB).
- Page text is drawn with 2D canvas `fillText` into textures (75 call sites), and shaders are patched with `onBeforeCompile`. WebGL only; no CSS 3D.
- A `#nogl` fallback says "This book needs WebGL" and points to `teachers.html`.

**Accessibility**
- The canvas carries `aria-label` "…Use the text version below, or the arrow keys to turn pages."
- A parallel DOM text version (`#a11y`) is re-rendered for the current spread, with the same controls (fieldset quiz, `<details>` answers, switches). It stays visually hidden and becomes a floating panel on `:focus-within`.
- An `aria-live` region announces "Lesson 1: Energy stores". The dialog has a focus trap and Escape.

**Reduced motion**
- `prefers-reduced-motion` turns on "still" mode (`body.still` kills every animation and transition) unless the reader saved a choice. The toggle persists in `localStorage`.
- In my reduced-motion run the spread appeared already open with the jars lit (`ref-shots/reduced-1-300ms.png`).

**Phone (390px)**
- The book sits small in a desk scene. When open, the camera crops the spread and the page text is too small to read.
- The reading moves into a bottom drawer ("1. Energy stores ▲") above the capsule bar (`ref-shots/phone-2.png`). On a phone the 3D book is scenery.

**Lessons for Judgment Lab**
- Keep: one idea per spread, a persistent bar showing where you are, an announcement on each turn, a still mode tied to reduced motion, and the commit-before-reveal rhythm.
- Leave: WebGL, canvas text (it forces a duplicate DOM), the desk scene, global key capture, sound, and any reading that happens off the page.

---

## 3. The site today: where the rules are hard to grasp

- **Learn.** The rules sit two-thirds of the way down, as one run-on paragraph with no definitions, and they are not the four moves the reel just showed. A first-time educator sees the four moves in the reel, then a different five-part list, then three moves on a setting page.
- **Essay.** The four moves are the last thing on a 24,000px page, shown as labels with no meaning attached. "Refuse the garden path" depends on Section VI's "The design principle is no garden paths", about 10,000px earlier. Most readers will never reach the tiles.
- **HE and high-school essays.** They don't contain the four moves at all.
- **Setting pages.** "Three moves the essay argues for" is a good plain paraphrase, but nothing links it to the named moves.
- **Practice.** The failure modes appear as a list of names, with no definitions, no check question, and no indication of which move each failure breaks.

**Where a book sequence helps a first-time educator**
- Right after the reel, on Learn: the reel gives the four moves for two seconds each, and the book gives each one a page pair at the reader's pace.
- From the essay's closing tiles, as a way to see the four moves again with meaning attached.

**Where it gets in the way**
- Inside the essay body: it would interrupt a long argument.
- On Practice and Design: these are task surfaces, and a book is a detour there.
- As a replacement for the failure-mode table: scanning beats paging.
- On a phone, as a 3D object (the reference proves this). The phone should get one spread at a time, stacked.

---

## 4. Options

### Option A (recommended): "The four moves" book on Learn

- **Placement.** It replaces `.method-band` on the Learn page, in the same slot and doing the same job.
- **Entry points.**
  - The Learn slot itself.
  - The essay's closing tiles get an "Open the four moves" link.
  - The setting pages' "Three moves the essay argues for" sentence links to it.
  - A deep link `?move=frame|calibrate|garden|own` (the site already carries `?audience=` and `?claim=`).
- **Content.** The spread sequence is drafted in section 5 and built in the prototype.
- **Technical approach.**
  - **Markup.** `build-site.mjs` renders the book from one companion source file. One option is a new `audiences/four-moves.md` with fixed fields per move: Move, Section, Asks, Quote, Guards against, Ask, Keep as evidence, Pilot step. Another is a "## The four moves" section in `shared-foundations.md`. A strict, fail-loud parser (the `scripts/at-a-glance.mjs` pattern) reads it.
  - **Failure-mode rows.** The one-liners and checks come from the same rows that build the essay's Core Failure Modes table. Today those rows are hard-coded in `failureModesTable()`. Moving them to a shared source stops the table and the book from drifting apart.
  - **Book structure.** 7 leaves × 2 faces. A turned leaf gets `transform: perspective(3200px) rotateY(-180deg)`, with `transform-origin` at the spine and `backface-visibility: hidden` (plus `-webkit-`).
  - **JS.** It manages the two z-index stacks and a 90ms stagger when jumping across several leaves. Face shading uses `::after` opacity transitions. The closed state is centred with `translateX(-25%)`. JS measures nothing; all sizes are CSS.
  - **Controls.**
    - Back/Next buttons (44px targets) and move dots 1–4. The contents page entries are buttons.
    - On desktop, clicking a page turns it.
    - ArrowLeft/ArrowRight work only while focus is inside the section, so no global capture.
    - Swipe works on touch.
    - An `aria-live` line announces each turn: "Move 2 of 4: Calibrate the tool."
    - Faces outside the current spread are `inert`. A contents jump moves focus to the move heading.
  - **Size.** The prototype is 16.7 KB CSS (including mock masthead and base styles), 6.6 KB JS and 19.9 KB markup raw; gzipped, 4.4 KB, 2.4 KB and 5.3 KB. In production, expect about 10 KB CSS and 5 KB JS raw, inlined into `index.html` (361 KB today), about 4% raw growth with the markup. No dependencies.
- **Fallbacks.**
  - *No JS:* the base markup is a plain ordered document of twelve pages.
  - *Reduced motion:* the same spreads with no rotation; the spread swaps at once with a 160ms opacity fade.
  - *Viewport ≤ 1100px (tablet and phone):* one spread at a time, its two pages stacked (max 760px wide), with a sticky bottom bar and swipe. The breakpoint is 1100px because fixed-height pages overflowed at 1024px (section 6).
  - *"Read as one page":* a toggle flattens the book into the base document, for linear reading, find-in-page, print and screen-reader users who prefer it.
  - *Print:* flat.
- **Tests.** See section 7.
- **Risks.** See section 8.

### Option B: the essay's closing tiles open the book in a dialog

- **Placement.** The four closing tiles become the cover. Clicking opens a near-full-screen book in a `<dialog>`, closer to the reference's immersion. The reel already uses the dialog pattern.
- **Content.** The same spreads as A.
- **Technical approach.** As A, plus dialog focus management, Escape, and restoring scroll position in the essay. About 1 KB more JS.
- **Fallbacks.** As A. On a phone the dialog becomes a full-screen sheet of stacked spreads.
- **Tests.** As A, plus dialog open/close, focus return to the tile, and Escape.
- **Risks.**
  - Low reach: readers who get 89% of the way through the PME essay.
  - HE and high-school readers never see it, because their editions lack the closing line.
  - A modal over a long essay feels heavy.

  It works well as an extra entry point to A, and poorly as the only home.

### Option C: no 3D book; a "four moves" panel

- **Placement.** The same Learn slot.
- **Content.** The same content as a four-column grid on desktop (one column per move: meaning, quote, guards against, ask, evidence, pilot step). On a phone, four `<details>` rows. A compact alternative is one table: move × guards against × ask × evidence × pilot step.
- **Technical approach.** About 2–3 KB CSS, no JS.
- **Fallbacks.** None needed.
- **Tests.** Contract tests only, plus the existing overflow checks.
- **Risks.** It loses pacing, the one-move-at-a-time emphasis and continuity with the reel. It is better for scanning and printing.

  Here is the honest version: most of the clarity gain comes from the content, not the page turn. C is A's base layer. Building A as "C first, then enhance" means C ships either way.

### Rejected

- **A WebGL / three.js port of the reference.** It costs 1.4 MB, needs canvas text plus a duplicate DOM, cuts against the vanilla/no-framework setup, and reads poorly on phones.
- **A book for the failure modes or the pilot.** See section 1.

**Recommendation: A, staged as two PRs.**
- **PR 1:** source file, parser, flat panel (= C), essay tile link, and the method band retired or mapped. Content PR; mostly no-logic, but the parser and single-source tests are logic.
- **PR 2:** the book enhancement and its browser tests. If PR 2 doesn't earn its keep in review, PR 1 has already delivered most of the clarity.

---

## 5. Draft spread sequence (recommended option)

Quotes are from `the-irreducible-officer.md`. Failure-mode lines and checks are verbatim from the site's Core Failure Modes table. Pilot steps follow Section IX.

| Spread | Left page | Right page |
| --- | --- | --- |
| 0 · Cover (closed book, navy board) | — | "The four moves" · the four lines with red periods · "From the closing line of *The Irreducible Officer*." · "Open the book" |
| 1 · Pages 1–2 | **Four judgments that stay with a person.** "AI can draft, search, compare and recommend. Four judgments still belong to the person who will answer for the work." How to read the pages. "The order matters. A learner who never framed the problem has nothing to calibrate against and nothing to own." Note that Judgment Lab adapts the moves for HE and high school as designs to test. | **Contents.** Four moves plus "All four, and where to try them", as buttons with page numbers. |
| 2 · Move 1 (Section IV) | **Frame the problem.** [crop-bracket mark] "Decide what problem you are solving, why it matters, and what would count as a good answer. Do it before AI hands you a structure." Quote: "The framing is where the judgment lives." "A tightly bounded prompt makes the hard choices for the learner, and that kind of structure is where AI works best. Ask learners to set the frame first." | *Guards against:* frame capture; invisible delegation. *Ask:* "What problem did the student choose to solve?" "What did the AI decide for the student?" *Keep as evidence:* a one-page frame (problem, key assumptions, criteria for success, evidence standard, role AI played). *Pilot step 1:* unaided frame, scored on completion. |
| 3 · Move 2 (Section V) | **Calibrate the tool.** [gauge: accept · check · revise · refuse] "Learn where AI tends to be strong and where it tends to fail on this kind of task. Then decide what to accept, check, revise, or refuse." Quote: "Students need to predict, with reasonable accuracy, when AI performs well for a given type of task and when it does not, and calibrate their use accordingly." | *Guards against:* uncalibrated reliance. *Ask:* "What evidence justified relying on the system here?" *What counts:* Trust → Use → Reliance decision → Appropriate reliance (from the essay's reliance table). *Keep as evidence:* what was accepted, modified, rejected, verified or kept away from AI, with reasons. *Pilot step 2:* AI challenge. |
| 4 · Move 3 (Section VI) | **Refuse the garden path.** [a winding path struck in red, a direct route] "A garden path is work a fluent template answer can finish. Set problems where the template answer is wrong, or where several frames hold up and the learner must defend one." Quote: "If instructors do not decide which friction matters, AI will decide by default." *Let AI remove / Protect* (from the essay's friction card). | *Guards against:* premature synthesis; institutional monoculture. *Ask:* "Can the student explain why these connections matter?" "What frames are missing across the seminar?" *Keep as evidence:* a diagnosis of a polished, misframed AI assessment (transfer evidence). *Pilot steps 3–4:* misframed assessment, then diagnosis and revision. |
| 5 · Move 4 (Section VII) | **Own the decision.** [the red dot] "AI can shape the work that leads to a decision. A person answers for the decision itself." Quote: "AI can compress the work before a decision. It cannot own what follows." "Learners should be able to say why they accepted an output, why they rejected one, and why the recommendation is still theirs." | *Guards against:* responsibility laundering; fluency substitution. *Ask:* "Who owns the recommendation if it proves wrong?" "Can the student independently explain the judgment in plain speech?" *Keep as evidence:* a short oral defense (the five questions from step 5). *Pilot step 5:* oral defense. |
| 6 · Pages 11–12 | **All four, in order.** The closing line set large, then "Seven failure modes, four moves" (the move-to-failure index). | **Try one now.** Try the judgment in your setting · Test a failure mode with your assistant · See the five-step pilot · Read Section XI. Testing note: "These teaching designs are proposals to test. A successful session shows what happened in it. It does not establish learning gains." |

**The mapping is my editorial proposal; the essay does not state it.** Move to failure modes: 1 → frame capture, invisible delegation; 2 → uncalibrated reliance; 3 → premature synthesis, institutional monoculture; 4 → responsibility laundering, fluency substitution. Move to evidence and pilot step: 1 → frame evidence, step 1; 2 → reliance evidence, step 2; 3 → transfer evidence, steps 3–4; 4 → accountability evidence, step 5. Every one of the seven failure modes and five pilot steps lands exactly once.

**Setting variants (later).** The four rules stay fixed. Each right page could add one "In your setting" line drawn from `profiles.json` or the audience guides: the HE return-to-office memo, the high-school New Deal case. It would follow the selected `?audience=`, under the single-source rule. The prototype uses the PME and shared text only.

---

## 6. Prototype

- **File:** `four-moves-book.html` (standalone; Google Fonts for Source Serif 4 and Source Sans 3; site palette tokens). A mock masthead strip shows it in place. `?spread=N` opens spread N for review.
- **What it demonstrates:**
  - CSS 3D page turns with gutter and turn shading.
  - A closed cover centred on the spine, opening to spreads; multi-leaf "riffle" jumps from the contents page and the move dots.
  - Click-to-turn, keys scoped to the section, swipe, live announcements, and `inert` on hidden faces.
  - "Read as one page"; a no-JS document; reduced-motion instant swaps; stacked spreads at ≤ 1100px.
- **Verified by script:**
  - At 1440, no face overflows. At 1280 and 1101, none overflow either.
  - With the first cut's 820px breakpoint, faces overflowed at 1024 and 900, so the breakpoint moved to 1100. That is the reason for the 1100px rule.
  - At 390: no horizontal scroll, and only the current spread's two pages render.
  - Under reduced motion, leaf `transition-duration` is `0s` and the state applies at once.
  - Turning never changes `location.hash`.
  - All four quotes appear in the essay source. "The framing is where the judgment lives." matches as a prefix, because the essay continues with a colon. The site's existing pull quote truncates it the same way.
- **Screenshots (`shots/`):**
  - 1440px: `desktop-1440-cover.png`, `desktop-1440-contents.png`, `desktop-1440-midturn.png` (page mid-turn), `desktop-1440-move1.png` … `desktop-1440-move4.png`, `desktop-1440-close.png`, `desktop-1440-flat.png` ("Read as one page").
  - 390px: `phone-390-cover.png`, `phone-390-move1.png`, `phone-390-move1-full.png` (full-page capture; the sticky bar renders mid-page in a full-page capture).
  - Reduced motion: `reduced-1440-move2-instant.png` (taken about 40ms after the click; the spread is already in place).
  - No JS: `nojs-1440.png`.
- **What it does not do:**
  - It isn't wired into the site router or the tab panels.
  - No drag-to-turn.
  - No per-setting lines.
  - No print stylesheet.
  - Not tested in Safari or Firefox.

---

## 7. Tests the real build needs

**Node contract** (new `tests/four-moves.test.mjs`, plus extensions to existing suites)
- The parser fails on a missing field, a fifth move, or markdown inside plain-text fields (the at-a-glance pattern).
- Learn renders exactly four moves in essay order. Joined, the titles equal the essay's closing line, read from `content/the-irreducible-officer.md`.
- Each quote prefix-matches an essay sentence.
- Every failure mode named on a right page matches a Core Failure Modes row, and all seven appear exactly once across the moves (if the mapping is adopted).
- Pilot labels match `pilotSequence()`.
- Single source: no move sentence is duplicated in `scripts/*.mjs` (extend `single-source.test.mjs`). The retired-phrase check covers the new copy.
- The method band is either removed or explicitly linked, so no third vocabulary ships alongside the book.

**Browser** (Playwright, on a temporary alternate-port config per the port-collision memory)
- **1440:**
  - Next and Back update `data-spread` and the live text.
  - Faces outside the spread are `inert`.
  - ArrowRight works with focus in the section and does nothing with focus elsewhere.
  - A contents jump focuses the move heading.
  - `location.hash` is unchanged.
  - No face's `scrollHeight` exceeds its `clientHeight` at 1101, 1280 and 1440. This guards against copy edits overflowing fixed pages.
- **390 and 375:** only the current spread's faces display; no horizontal scroll (reuse the existing 375 pattern); the sticky bar is reachable.
- **Reduced motion** (`emulateMedia({ reducedMotion: 'reduce' })`): transition duration is 0s and the state applies synchronously.
- **No JS** (`javaScriptEnabled: false`): all twelve pages are visible as a document.
- **"Read as one page":** every face is visible and no face is `inert`.
- **Essay closing tiles:** they link to the book.
- **Flake control:** run turn specs under reduced motion, plus one animated smoke test that waits for `transitionend`.

---

## 8. Risks

1. **Editorial.** The move-to-failure, evidence and pilot mapping is mine. `claims.md` stays canonical, and the book must not read as a new framework. I'm least sure of institutional monoculture under move 3 (it could sit under move 1) and fluency substitution under move 4 (it could sit under move 2).
2. **"Refuse the garden path" needs a definition the essay does not give.** "A garden path is work a fluent template answer can finish" is new prose and needs Jack's voice pass.
3. **Vocabulary sprawl.** If the five-part Learn method stays as it is, the book adds a sixth phrasing. One must become canonical and the others must map to it visibly.
4. **Audience.** The four moves exist only in the PME essay, and the right pages use PME words (seminar, faculty, student). HE and high-school readers need per-setting lines, or wording reviewed for neutrality.
5. **Tone.** A 3D object on a serious essay site can read as a toy. Keep to paper and ink: no desk, leather or sound, and no autoplay. The turn takes 900ms.
6. **Space.** The book is about 650px tall, against about 320px for the method band, so the Discuss/Practice/Design cards drop roughly 330px.
7. **Browser quirks.** Any ancestor with `overflow: hidden`, `filter` or `opacity < 1` flattens 3D. Check `.site-shell` and the tab panels. Safari needs `-webkit-backface-visibility`.
8. **Find-in-page** can match text on hidden faces. "Read as one page" mitigates this.
9. **Fixed-height pages and copy edits.** A longer sentence can overflow a page. The overflow test above catches it; the alternative is container-query type scaling.

---

## 9. Open questions for Jack

1. Is "primary judgment rules" the closing four moves, or the five-part Learn method? If it is the four moves, should the book replace the method band, or should the band survive as an explicit mapping (for example, "Change the conditions" as the test inside "Own the decision")?
2. Do you accept the move-to-failure-mode/evidence/pilot mapping in section 5, in particular monoculture under move 3 and fluency substitution under move 4?
3. Is the garden-path definition yours? Should "Let AI remove / Protect" sit on move 3's page?
4. Should HE and high-school readers see setting lines on the right pages now, or after educator review?
5. Placement: should the book replace the method band (the default here), or sit above "Choose your setting", directly after the reel's handoff?
6. Should the book open on the cover (one extra click, the signature moment) or already open at the contents page?
7. Is two PRs (content and flat panel first, then the book) acceptable, or do you want the book judged in one go?

## Diagnostic notes

- **Hardest decision:** choosing the four moves over the five-part Learn method. The Learn method is the setting-neutral one, but the four moves are the ones the brand already teaches through the reel, and their structure covers the other lists cleanly.
- **Alternatives rejected:** WebGL (weight, canvas text, phone reading); a book for the failure modes or the pilot (scanning and planning need everything visible); dialog-only placement (reach).
- **Least confident:** the editorial mapping, and whether the page turn adds enough over Option C to justify PR 2. The prototype makes that second question easy to judge by eye.

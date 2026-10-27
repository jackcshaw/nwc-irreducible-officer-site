# Motion that teaches: the failure modes and appropriate reliance

Prepared 2026-10-27 from companion `main` (1240157), site `origin/main` (05ab9b0) and the showreel's `showreel` branch (f8068f9). No repository was changed. The prototypes are plain HTML in this folder. I didn't need Remotion, so I created no `concepts` branch in the showreel repo; its bundled ffmpeg binary was used read-only to encode the preview videos.

## Recommendation in brief

Build one system of **motion figures**: inline SVG, driven by a small vanilla runtime (about 3 KB gzipped), placed in the essay at the sentence each figure explains and reused as the cards in Practice's failure-mode lab.

- **One grammar.** Grey and navy are machine work. Red is what a person decided and can account for. This is the reel's own rule ("anything the human marks is red"), carried from a 15-second promise into eight slow explanations.
- **One shape.** Each figure runs 6 to 10 seconds in three or four beats, and the last beat is the essay's faculty check. It plays once when it's mostly in view, then rests on a final frame designed to carry the idea by itself. That frame is also the reduced-motion view, the print view and the poster.
- **One clock.** Every figure is a pure function of time, `render(t)`, like the reel's frames. One function can play, pause, jump to a beat, be tested at a fixed moment, and be rendered to MP4 for faculty slides without Remotion. I rendered the previews here that way.
- **Two exceptions, each earned by its concept.** Appropriate reliance is **interactive**, because the concept is a decision: the reader makes the reliance call before the frontier appears. Institutional monoculture uses **3D**, because turning the work over is the idea: the essays look different from the front and sit in one plane from the side.
- **Remotion stays the reel's tool.** It's the right tool for a branded, scored, 1080p film. It's the wrong one for figures that need real text, a pause button, a reduced-motion state, interaction and cheap copy edits.

Prototypes, all in this folder (start at `index.html`):

1. `reliance.html`: **Make the call** (appropriate reliance, interactive). Built.
2. `frame-capture.html`: **The crop** (frame capture). Built.
3. `monoculture.html`: **Turn the seminar** (institutional monoculture, CSS 3D). A sketch, added because you asked whether this should be 3D.

**Against the 3D book:** the page-turn animates the container, and these figures animate the ideas. If only one gets built, build the figures. They fit the book's flat "four moves" panel (its PR 1) as the visuals for each move's failure modes. The page-turn (its PR 2) becomes optional.

---

## 1. The visual grammar

| Element | Meaning | Where it comes from |
| --- | --- | --- |
| Paper `#f6f1e8` field | The work surface | Site and reel |
| Grey bars | Machine-written prose | Reel's opening "pages of fluent analysis" |
| Navy strokes and blocks | Structure: the model's frame, headings, links | Reel's brackets before they lock red |
| **Red** dot, stroke or change bar | A decision the person made and can account for | Reel's dot; site's red period |
| Solid vs dashed | Owned or examined vs. unexamined or empty | New: keeps the meaning when colour isn't seen |
| Mono label in red, serif italic question | The faculty check, always the closing beat | Essay's Core Failure Modes table |

Rules:

- **Design the last frame first.** It's the frame most readers will see (reduced motion, print, a figure that scrolled past, a phone). If the final frame can't stand alone, the figure isn't finished.
- **Show the process the product hides.** Every failure mode in Section II ends with "invisible inside the final product" in some form. Text can only assert that. Motion can show the process and then show that the product looks the same either way.
- **The red dot is the person, when there is one person.** In frame capture it's the student, working hard inside a boundary they didn't draw. That keeps the figures fair to students: the failure is structural, and nobody is shown as lazy. In monoculture there's no single person, so red appears only in the check. In the reliance interactive, the red dot becomes the reader's own call (the radio indicator).
- **Words are plain and few.** Beat captions are one sentence each. Labels inside a figure come from the essay text or the edition's case, never from invented findings.

## 2. The eight concepts

Each concept has one mechanism (the thing text can't show), a storyboard, what the viewer should understand at the end, and the closing check.

### 2.1 Frame capture: "The crop" (built)

**Mechanism.** The camera *is* the frame. The figure opens close up on the model's frame, so the viewer accepts it exactly as the student does. Only the pull-back reveals it was a crop. This improves on "a frame snaps on and every edit polishes inside it": the viewer gets captured too, and the student's real effort is visible.

| Beat | Time | What happens |
| --- | --- | --- |
| 1 | 0.0–1.4 s | Close up. Grey crop brackets snap around two topics ("Adversary behavior", "Historical precedent") before the red dot can move. *The model offers a reasonable frame.* |
| 2 | 1.4–4.8 s | The dot writes draft 1 (ragged), then draft 2 (heading, aligned) and draft 3 (justified, chart, a navy conclusion). Red change bars build in the margin. *The student revises. Each draft is better than the last.* |
| 3 | 4.8–6.4 s | The camera pulls back. The polished draft is a small part of a wider field, and four considerations sit outside it in dashed outline: alliance dynamics, domestic politics, a constraint treated as fixed, whose interests count. A "FIRST FRAME" tag appears. *Every revision stayed inside the first frame.* |
| 4 | 6.6–8.8 s | **What problem did the student choose to solve?** |

**The viewer understands:** the work got better and never left a boundary nobody chose. Every red mark is inside it. Every label is from the essay's Section I and II text ("assume a theory of adversary behavior", "privilege one set of interests", "treat a structural constraint as fixed", and the agent roles in the opening).

### 2.2 Fluency substitution: "Strip the fluency"

**Mechanism.** Take the fluency away and see what decision is left.

| Beat | Time | What happens |
| --- | --- | --- |
| 1 | 0–2.5 s | A justified paragraph composes at machine speed. The words are the lab's constructed contribution: "An AI-enabled learner balances speed with rigor, calibrates trust with skepticism, and preserves agency while embracing collaboration…" (`labs/failure-mode-lab/cases.md`). *It sounds like a considered judgment.* |
| 2 | 2.5–3.5 s | Words are underlined by role: balancing pairs, hedges, transitions. |
| 3 | 3.5–6 s | The plain-speech test. Each role lifts out and falls away in turn. Split screen: the fluent paragraph leaves an empty page. A plainer draft beside it leaves one red sentence that names an assumption and why it matters (the case's changed condition). *Take away the fluency. What decision is left?* |
| 4 | 6–8 s | **Can the student independently explain the judgment in plain speech?** |

**The viewer understands:** polish and a decision are separable, and a less fluent answer can carry more judgment. High-school variant: "Mixed but largely successful" (from `essays/k12.md`) strips to nothing.

### 2.3 Premature synthesis: "Pull the lines"

**Mechanism.** The map looks owned until you remove the lines and ask for them back.

| Beat | Time | What happens |
| --- | --- | --- |
| 1 | 0–1 s | Twelve source cards, scattered. |
| 2 | 1–2.5 s | Grey links draw between them in one sweep, forming a clean, coherent web with tidy cluster labels. *The model connects everything at once.* |
| 3 | 2.5–4.5 s | The links retract. *Remove the lines. Which can the student redraw?* |
| 4 | 4.5–7 s | Red links redraw slowly, only two or three, each with a short "because" tick. The rest of the cards stay unconnected and open. |
| 5 | 7–8.5 s | **Can the student explain why these connections matter?** |

**The viewer understands:** the coherence belonged to the model, and what the student owns is what the student can rebuild. HE variant: the three remote-work studies (Ctrip, Trip.com, the proximity study), which `essays/he.md` says "measured different things in different workforces."

### 2.4 Uncalibrated reliance: "Same confidence"

**Mechanism.** Every answer arrives looking equally sure, and the acceptance rhythm never changes.

| Beat | Time | What happens |
| --- | --- | --- |
| 1 | 0–3 s | Six answer cards slide in with identical styling and identical "Ready" marks. A red stamp accepts each one on a steady beat, with no pause. |
| 2 | 3–5 s | A hidden jagged line sweeps across. Two accepted cards were on the far side. Their stamps go hollow, and a thin line runs from one of them into the decision at the bottom and cracks it. *The error surfaces downstream.* |
| 3 | 5–7 s | **What evidence justified relying on the system here?** |

**The viewer understands:** confidence looked the same everywhere, so it couldn't be the evidence. This is the short loop for the Practice card. The essay gets the interactive (2.8), which teaches the same thing better.

### 2.5 Invisible delegation: "What crossed over"

**Mechanism.** A ledger with two columns, and requests that move cards across it while nobody watches.

| Beat | Time | What happens |
| --- | --- | --- |
| 1 | 0–1.5 s | Left column, "Decided by the student": four red cards (the criteria, the argument's structure, the range of objections, what "strategic" means). Right column, "Decided by the AI": empty. |
| 2 | 1.5–6 s | Four plain requests appear one at a time, from the essay: "Can you give me feedback?" "Suggest a better structure." "What are the counterarguments?" "Make it more strategic." Under each, the matching card slides across faintly, while a cursor keeps blinking on the student's side. *The language of help hides the transfer.* |
| 3 | 6–8.5 s | Left column: four empty outlines. Right column: full. **What did the AI decide for the student?** The right column's labels light up. |

**The viewer understands:** each request was reasonable, and together they handed over the judgment. Variants: HE's "Summarize the research" handed over the criterion; high school's "Write an essay" handed over what success means. This is the second-best candidate for interaction: the reader types or picks a request and sees which card it moves.

### 2.6 Institutional monoculture: "Turn the seminar" (sketched, 3D)

**Mechanism.** Surface variety is real. The sameness sits in a dimension you only see by turning the work. This improves on "thirty essays collapse onto one frame": they never collapse. They were in one plane all along.

| Beat | Time | What happens |
| --- | --- | --- |
| 1 | 0–2.5 s | Thirty essay cards with different layouts (headings, bullets, charts, dense text) spread across a slightly tilted field. *Thirty essays. Different arguments, structures and evidence.* |
| 2 | 2.5–5 s | The view turns about 80° in 3D, so depth now shows how each essay defines the problem. *Turn them to see how each one defines the problem.* |
| 3 | 4.9–6.8 s | All thirty sit in one plane, outlined in navy: "One shared frame". Four dashed planes appear in front and behind it, empty: "Frames no one chose". *They share one frame. The other frames stand empty.* |
| 4 | 6.9–9.4 s | **What frames are missing across the seminar?** |

**The viewer understands:** a class can look diverse and still share one problem definition, and the missing frames are visible as empty slots. The figure illustrates the concept that the essay cites from Deng, Brucks & Toubia; it doesn't plot their data. HE and high-school variants can label the shared plane with the verdict each edition quotes: "the evidence is mixed; hybrid is the balance" and "mixed but largely successful."

### 2.7 Responsibility laundering: "Who signs"

**Mechanism.** Agency spreads in the grammar, then concentrates the moment the recommendation fails.

| Beat | Time | What happens |
| --- | --- | --- |
| 1 | 0–2 s | A one-page recommendation with a signature line and a red dot by the name. |
| 2 | 2–4.5 s | The sentence subjects change: "I recommend" becomes "The analysis suggests", then "The model indicates", then "It is recommended". With each change the dot splits and its pieces drift into the new phrases. *The model's language spreads the agency around.* |
| 3 | 4.5–6.5 s | "The recommendation proves wrong." A navy weight drops, falls straight through the hollow phrases, and the red fragments snap back into one dot on the signature line just as the weight lands there. |
| 4 | 6.5–8.5 s | **Who owns the recommendation if it proves wrong?** |

**The viewer understands:** the distribution was a feeling, and accountability lands on one person. It mirrors the reel's "Own the decision" beat (the dot contracts into the period), run as a failure.

### 2.8 Appropriate reliance: "Make the call" (built, interactive)

**Mechanism.** The frontier is invisible until you've committed. Then quality and correctness move in opposite directions, so the felt signal points the wrong way. This improves on "tasks fall on either side of a jagged line": the reader makes the call first.

| Step | What happens |
| --- | --- |
| 1. Your calls | Two cards with paraphrases of the paper's appendix. **Task A:** segment a footwear market by user, list each segment's needs, decide which matters most. **Task B:** a clothing company's CEO must back one of three brands; use the spreadsheet and insider interviews to recommend one. Both carry the same "AI answer · Ready" block. The reader picks **Rely on it** or **Check it first** for each, and a red dot marks each call. |
| 2. The reveal | A jagged navy line draws itself between the cards (1.1 s), and task B's side takes a hatch. A: "40%+ higher quality", with 12.2% more tasks and 25.1% faster across the 18 product tasks. B: right brand chosen 84.5% without AI, 70% with GPT-4, 60% with GPT-4 and the prompting overview; "The spreadsheet looked complete. The right answer depended on details in the insider interviews." Each card gives a verdict on the reader's call. |
| 3. One more call | "Graders scored every task B recommendation for quality. Whose did they score higher?" The answer: consultants with AI, whether their answer was right or wrong. Two bar sets sit side by side: right brand going down, quality score going up (+17.9%, +25.1%). **Rated higher. Right less often.** |
| 4. Your account | The reader's three calls, read back. Your trust / reliance / appropriate-reliance definition. "Both answers looked ready, so the answers couldn't tell you where the line was. The tasks could." **What evidence justified relying on the system here?** Source line and Start over. |

**The viewer understands:** the line wasn't visible in the outputs, polish was no evidence of a right answer, and appropriate reliance means having an account of the difference. There's no score, only an account.

### Summary

| Concept | Mechanism | Format | Primary home | Length | Build cost |
| --- | --- | --- | --- | --- | --- |
| Frame capture | Camera is the frame; pull-back | SVG figure | Essay II; Practice card | 8.8 s | Built (0.5 day to productionize) |
| Fluency substitution | Strip by role; what's left | SVG figure | Essay II; Practice | 8 s | 1 day |
| Premature synthesis | Pull the lines; redraw | SVG figure | Essay II; Practice | 8.5 s | 0.75 day |
| Uncalibrated reliance | Same confidence, same rhythm | SVG loop | Practice card | 7 s | 0.5 day |
| Invisible delegation | Ledger; cards cross under requests | SVG (later interactive) | Essay II; Practice | 8.5 s | 0.75 day |
| Institutional monoculture | Turn to reveal one plane | CSS 3D | Essay II; Practice | 9.4 s | Sketched (1 day) |
| Responsibility laundering | Agency diffuses, then lands | SVG figure | Essay II; Practice | 8.5 s | 0.75 day |
| Appropriate reliance | Commit, then reveal | Interactive | Essay V; Practice warm-up | 1–2 min | Built (1 day to productionize) |

## 3. Formats compared

| | Remotion loops (MP4/WebM) | Inline SVG + JS (recommended) | Scroll-driven | Interactive | 3D |
| --- | --- | --- | --- | --- | --- |
| Teaching fit | Strong for a film; passive | Strong; reader-paced via beats | Ties playback to scrolling, which competes with reading a 24,000px essay | Strongest where the concept is a decision | Only where rotation carries meaning |
| Text | Baked into pixels: not selectable, searchable or translatable; edits need a re-render | Real text in site fonts; copy edits are string edits | Real text | Real text | CSS 3D keeps real text; WebGL needs canvas text plus a duplicate DOM |
| Reduced motion | Poster frame only | Final frame plus still key frames per beat | Must switch off entirely | Transitions opt in under `no-preference` | Final frame |
| Pause | Video controls | Visible Play/Pause/Replay button | Scroll position, so pause has no clear meaning | Reader-paced | Same as SVG |
| Size, measured | Frame capture at 768 px, 9.8 s: **229 KB MP4, 398 KB WebM, 459 KB GIF**. Monoculture: 411 KB MP4. Site reel: 4.0 MB MP4 / 4.6 MB WebM. | Runtime **2.9 KB gz**; frame capture **3.4 KB gz**; monoculture **2.5 KB gz**; reliance **6.8 KB gz** (CSS, JS, markup) | Similar to SVG | Similar to SVG | CSS 3D small; WebGL about 1.4 MB (book proposal's reference) |
| Production cost per piece | 1–2 days at reel quality, plus WebVTT, hosting and a player | 0.5–1 day | Similar to SVG, plus support checks | 1–1.5 days | 1 day CSS 3D |
| Browser support | Universal | Universal (SVG, rAF, IntersectionObserver) | Needs `@supports ((animation-timeline: scroll()) and (animation-range: 0% 100%))`; no Firefox default | Universal; `:has()` for styling is Baseline | CSS 3D universal; flattens under `overflow`, `filter` or `opacity` ancestors |
| Reuse | Slides, social | Site; also renders to MP4 through `render(t)` | Site only | Site only | Site |

**Decision.** Inline SVG for the system. Interaction for reliance only, with delegation as a later candidate. CSS 3D for monoculture only. Scroll is used as a trigger (play once at 60% visibility) and never as a scrubber. Remotion keeps the reel. For a faculty slide pack, `scripts/export-figure.mjs` renders any figure to MP4, WebM and GIF in about 40 seconds.

## 4. Where each concept lives

| Concept | Essay anchor (PME; fails the build if prose changes, via `placeEssayFigures`) | Practice | Learn | Setting pages and editions | Four-moves book |
| --- | --- | --- | --- | --- | --- |
| Frame capture | after "…The frame capture is invisible inside the final product." | Card + player | — | HE and HS essays: same figure, edition labels (table below) | Move 1 |
| Fluency substitution | after "…may never identify which risk actually matters most." | Card | — | HE, HS | Move 4 |
| Premature synthesis | after "…forming a mental map and inherited one instead." | Card | — | HE | Move 3 |
| Uncalibrated reliance | none (Section V's interactive covers it) | Card (loop) | — | — | Move 2 |
| Invisible delegation | after "…the model has already done the framing." | Card | — | HE, HS | Move 1 |
| Institutional monoculture | after "…the range of strategic imagination the seminar is meant to develop." | Card | — | HE, HS (quoted shared verdict) | Move 3 |
| Responsibility laundering | after "…who chose the frame does not have a satisfying answer." | Card | — | — | Move 4 |
| Appropriate reliance | after Section V's frontier paragraph ("…what independent checks are required before the output governs the work.") | Warm-up above "Test a failure mode" | One link card: "Make the call (2 minutes)" | All settings (study evidence is setting-neutral) | Move 2 |

**Attention rule:** at most one figure autoplays per screen. In Section II only frame capture autoplays. The other five show their final frame (about 300 px tall) with a Play button, so the section doesn't grow by 3,000px of moving pictures.

**Practice.** Replace the dot-separated list in "Test a failure mode" with seven cards: final-frame thumbnail, name, one-liner and check (from the same rows as `failureModesTable()`). Opening a card plays the figure and focuses the lab prompt on that failure mode.

**Edition label sets** (labels from each edition's Section II; the runtime takes them as data):

| Figure | PME (`the-irreducible-officer.md`) | HE (`essays/he.md`) | High school (`essays/k12.md`) |
| --- | --- | --- | --- |
| Frame capture, inside | Adversary behavior · Historical precedent | Short-run output · Averaged across workers | Economic recovery · How long programs lasted |
| Frame capture, outside | Alliance dynamics · Domestic politics · A constraint treated as fixed · Whose interests count | Junior staff development · Mentoring and feedback · Volunteers vs. assigned · Promotion | Success for whom · Who Social Security left out · Why they were left out |
| Monoculture, shared plane | One shared frame | "The evidence is mixed; hybrid is the balance" | "Mixed but largely successful" |
| Delegation, requests | Essay's four requests | "Summarize the research" | "Write an essay" |

## 5. With the book, or instead of it

- **Instead of the page-turn.** The book proposal already says most of the clarity comes from content, and that the page-turn (PR 2) must earn its place. Figures are a better use of that budget: they teach the failure modes the book can only list.
- **With the flat panel.** Each move's right page names its failure modes. Put each one's final-frame thumbnail there with Play, using the book's mapping: 1 → frame capture, invisible delegation; 2 → reliance; 3 → premature synthesis, monoculture; 4 → laundering, fluency.
- **If the page-turn ships anyway,** figures play when their spread opens (reduced motion respected), on the same runtime. At about 500 px wide, labels drop to roughly 9 px, so book pages need a compact label set or poster-plus-Play.
- **3D in one place only.** If the site gets one 3D moment, I'd make it monoculture, where turning the work is the argument, and leave the book flat.

## 6. Accessibility

- **Reduced motion.** No autoplay. The final frame shows, and all beat captions are readable at once. Beat buttons jump between still key frames with no tweening. Play stays available as an explicit opt-in. In the reliance interactive, transitions are declared only under `prefers-reduced-motion: no-preference`, so the line and bars appear at once. All verified (section 9).
- **Pause.** A visible 44px Play/Pause/Replay control on every figure. Figures play once and stop, with no loops, which meets WCAG 2.2.2 for auto-playing content over 5 seconds.
- **Text equivalents.** The beat list is always-on caption text, synced with `aria-current="step"`, and it doubles as the description. A visually hidden figcaption describes the whole sequence. The SVG is `aria-hidden`. There is no audio. The reliance interactive announces each reveal through a polite live region.
- **Colour independence.** Owned is solid and red; unexamined or empty is dashed. Labels name everything that matters.
- **Vestibular care.** The two large moves (frame capture's 2× pull-back, monoculture's 80° turn) are eased and under 2.5 seconds, and reduced motion removes them.
- **Keyboard.** Controls are real buttons and radios, with visible focus and no global key capture.
- **Phone.** Desktop-first. At 390px there's no horizontal scroll, and labels inside the SVG get small (about 6 px), but the beat list carries every word at full size. The reliance interactive stacks, with a horizontal frontier.
- **No JS and print.** The production build should emit each figure's final frame as static SVG (`render(duration)`), so the figure exists without JS and prints. The prototypes build the SVG in JS.

## 7. Cost and rollout

Rough estimate for one developer, with your review:

- Runtime, tests, essay placement: about 2 days.
- Frame capture and reliance, productionized: about 1.5 days.
- Five more figures: about 4 days.
- Practice cards: about 1 day.
- Edition label sets: about 0.5 day.

That's about **9 days** for all eight. The same set at reel quality in Remotion would run roughly 10–16 days, with no interaction and heavier pages.

- **PR 1:** runtime, frame capture (Section II), Make the call (Section V), tests.
- **PR 2:** the other five figures and the Practice cards.
- **PR 3:** HE and high-school label sets, after educator review; book thumbnails if the book ships.

**Tests the real build needs**

- *Node contract:*
  - Each figure's last beat equals its `failureModesTable()` faculty check.
  - Every number in Make the call matches `sources/source-spine.md` (84.5, 60, 70, 12.2, 25.1, more than 40).
  - Essay anchors exist; `placeEssayFigures` already fails loud.
  - `render(t)` is deterministic: two calls give identical SVG.
- *Browser (alternate-port Playwright config):*
  - Autoplay starts only in view, and only one figure per screen autoplays.
  - Pause and beat-jump work.
  - Reduced motion shows the final frame with transition 0s.
  - No horizontal overflow at 375.
  - No console errors.
  - The reliance flow covers all four call combinations, and Start over resets.

## 8. Risks

1. **The reliance group labels.** The paper's text gives "60% and 70%" for the two AI groups. I assigned 60% to GPT-4 plus the prompting overview from Table 4 (−24 points vs −13 points). That's an inference from the regression; dropping the group names is the safer wording.
2. **Quality bars are relative.** They show +17.9% and +25.1% over the no-AI average (Table 6). The no-AI bar's length is arbitrary.
3. **Abstraction in monoculture.** "Depth = how the essay defines the problem" is a mapping the reader has to accept. The caption does that work. Educator testing should check whether it lands.
4. **Quiz feel.** Make the call could read as a gotcha. It has no score, tells the reader that checking task A was reasonable, and ends on an account rather than a result.
5. **Too much motion.** Eight figures on one site is a lot. The one-autoplay rule and final-frame posters keep the essay readable.
6. **Constructed content.** Figure labels are from the essays and the lab's constructed cases. No figure presents data the sources don't contain. The one exception, the quality-bar baseline, is labelled relative.

## 9. Prototypes

Serve the folder (`python3 -m http.server` in `motion-concepts/`) and open `index.html`. Add `?reduced` to force the reduced-motion path, or `?t=3.2` to hold a moment.

| File | What it is |
| --- | --- |
| `motion.js` | Shared runtime: easing (the reel's curves), springs, play-once-in-view, Play/Pause/Replay, beat buttons, reduced-motion stills, `?t=` and a seek hook for tests and export |
| `figures.css` | Site tokens, figure skin (the essay's `.argument-insert` rule), beat track, mock page chrome |
| `frame-capture.html` + `.js` | The crop |
| `reliance.html` | Make the call (self-contained CSS and JS) |
| `monoculture.html` + `.js` | Turn the seminar (CSS 3D sketch) |
| `scripts/stills.mjs` | Stills at fixed times, reduced-motion and 390px captures, console-error check |
| `scripts/export-figure.mjs` | Frame-by-frame render to MP4, WebM and GIF through the seek hook |
| `scripts/reliance-shots.mjs`, `record-reliance.mjs` | Walk the interactive at desktop, reduced motion and phone; record a real-time walkthrough |
| `scripts/player-check.mjs` | Behaviour checks for the player |

**Previews (`shots/`)**

- *Frame capture:*
  - `frame-capture.mp4` (229 KB), `.webm`, `.gif`.
  - `fc-sheet.png` (six beats).
  - `fc-t8.8.png` (final frame), `fc-reduced.png`, `fc-phone-390.png`.
- *Make the call:*
  - `reliance-walkthrough.mp4` (real time, about 18 s), `.gif`.
  - Desktop: `rel-desktop-2-calls.png`, `rel-desktop-3-line-drawing.png` (line mid-draw), `rel-desktop-4-revealed.png`, `rel-desktop-4b-quality-mid.png` (bars growing), `rel-desktop-5-account.png`.
  - Reduced motion and phone: `rel-reduced-*.png`, `rel-phone-*.png`.
- *Monoculture:*
  - `monoculture.mp4`, `.webm`, `.gif`.
  - `mono-sheet.png`, `mono-t9.4.png`, `mono-reduced.png`, `mono-phone-390.png`.

**Verified by script**

- `player-check.mjs` passed 7/7:
  - No play before the figure is in view; autoplay once mostly in view.
  - Pause works; beat 3 jumps and plays on; the figure ends on Replay.
  - Reduced motion: no autoplay, final frame, beat buttons show stills.
- Make the call:
  - Under reduced motion the frontier's transition is 0s and it is drawn immediately after the click.
  - The live region announces each reveal.
- No horizontal overflow at 390px on any prototype.
- No console errors.
- Every number on screen matches the source spine and HBS Working Paper 24-013 (in this scratchpad as `hbs24013.txt`): 758 consultants, 18 tasks, 12.2%, 25.1%, more than 40%, 84.5%, 60%, 70%, +17.9%, +25.1%. The task wording is paraphrased from the paper's Appendix A.

**Not done**

- No Safari or Firefox testing; CSS 3D in Safari needs a check.
- No print stylesheet.
- SVG is built in JS (no static final frame yet).
- PME labels only.
- Fluency, synthesis, delegation and laundering are storyboards only.

## 10. Open questions for Jack

1. **Where should "drive home" happen first?** I'd lead with the essay (frame capture in Section II, Make the call in Section V) and Practice's cards, with Learn linking to Make the call. Is the essay the right first home, or do you want these on Learn, next to the reel?
2. **Autoplay.** Is one autoplaying figure per screen, with the rest showing their final frame and a Play button, the right balance?
3. **Make the call's evidence.** Are you comfortable putting the BCG numbers in an interactive? Should the two AI groups be named, or merged as "with AI: 60% and 70%"?
4. **The student in the figures.** Frame capture shows the student working hard inside a frame they didn't choose, rather than coasting. Is that the tone you want for all seven?
5. **3D.** Does the monoculture turn earn its 3D, or would a flat version (thirty cards sliding into one column) teach it as well?
6. **Editions.** Ship HE and high-school label sets with PR 1, or after educator review?
7. **The book.** Should the figures take the page-turn's slot (book PR 2), sitting on the flat panel's right pages?
8. **Slides.** Do you want an MP4 pack of the figures for faculty sessions? It's nearly free with `export-figure.mjs`.

## Diagnostic notes

- **Hardest decision:** choosing inline SVG over Remotion, given the reel's craft. What decided it was that the concepts need real text, a pause button, a reduced-motion state and, for reliance, the reader's own call. Video can't do the last at all. Rendering figures as a pure function of time keeps video one script away.
- **Alternatives rejected:**
  - Remotion for site figures (pixel text, 35 to 70 times the bytes, no interaction).
  - Scroll-scrubbing (fights reading; uneven support).
  - WebGL (weight).
  - A 3D book of failure modes (the book proposal already showed that hides six of seven).
  - Interactive versions of all seven (quiz fatigue).
- **Least confident about:**
  - Whether "depth = problem definition" lands without the caption.
  - Whether Make the call feels like a gotcha to experienced faculty.
  - The 60%/70% group mapping (risk 1).

# Final verification: frame capture, all four versions

**Verifier:** final verifier after the PME polish, wording and classroom changes. Not a cold reader: I read HANDOFF.md, `storyboard.md`, `storyboard-business.md` (§7 Classroom cast, §8 PME polish) and `tests/classroom-light-read.md` / `business-verify.md` first.
**Build:** commit `7e607cb` on `motion-figures`, served from `design/motion-figures/` on port 5417 (stopped afterwards). One headless Chromium at a time, closed between viewports.
**Versions:** PME (no query, `seminar` cast, "Faculty"); workplace (`?edition=business`); classroom (`&cast=classroom`, "the instructor"); high school (`&cast=high-school`, "the teacher").

**Method.**
- **Seek pass.** The figure is a pure function of time, so I drove the player with the runtime's own hook (`window.__motionFigures['frame-capture'].seek`) and logged every visible text at each step: the drawn SVG picture, the stacked phone stage, the caption band and the name card. For each text I logged its opacity, clip and occlusion (`elementsFromPoint`: a text under an opaque sheet counts as hidden), rendered font size (font size × screen CTM), and position. I also logged `scrollWidth`.
  - 1440×900 and 390×844 in 0.1 s steps, with a JPEG of the shot every 0.5 s.
  - 1280×720 and 1366×657 in 0.25 s steps.
- **Pace rule.** Words ÷ 3 + 1.5 s, applied to every caption and to every new text, measured from when it is at least 50% opaque until it leaves. A text that leaves and returns within 1 s, or that is folded into a longer text, counts as staying.
- **Text overlap.** Pairs of visible picture texts whose boxes overlap by 20% or more, checked at every step.
- **Page checks.** Page copy and every caption in every version; the switch's hrefs, `aria-current`, and where each link lands; the edition note; reduced motion with a real `prefers-reduced-motion: reduce` at 1440×900 and 390×844; console errors on every load.
- **Wording.** Each edition × cast resolved with the runtime's `resolveEdition` and scanned, plus `node scripts/edition-check.mjs`.
- **Clock.** All times below are on the player clock (figure clock + 3.0 s). The runtime caps a frame step at 0.1 s, so wall-clock holds are never shorter than these.
- Scripts, logs and frames are in the session scratchpad, `fv-fc-fs-ps/`.

## Verdict

| # | Item | Result |
|---|---|---|
| 1 | PME polish: beat 3 | **Pass** |
| 2 | Drawn picture at 1280×720 and 1366×657, labels ≥ 11 px (all four) | **Pass** |
| 3 | Pacing at 1440×900 and 390×844 (all four) | **Fail** (minor): 4 defects, below |
| 4 | Workplace wording changes | Not in scope for FC (PS and FS only); the workplace version reads coherently |
| 5 | Classroom and high school | **Pass** |
| 6 | The switch | **Pass** |
| 7 | No horizontal scroll at 390, no console errors, reduced motion | **Pass** |

**Defects (all minor; the same in every version unless named):**
1. **1440×900 (also 1366, 1280), all four versions.** The red label by the second dot, "Second student" ("Second analyst" in workplace), is fully shown for about 1.9 s: PME 59.5–61.35 s, business casts 55.3–57.15 s. It needs 2.17 s. With its fades it is visible 2.1 s.
2. **390×844, PME.** "The weighing doesn't show in either paper." is shown 71.5–74.5 s, 3.0 s (3.4 s from its fade-in at 71.1). It needs 3.83 s and leaves at beat 10.
3. **390×844, workplace, classroom and high school.** "The weighing doesn't show in either ranking." is shown 71.4–72.6 s, 1.2 s (1.6 s from the fade-in at 71.0). It needs 3.83 s and leaves at beat 11. Frames: `t072.0` (on) and `t073.0` (gone).
4. **390×844, workplace, classroom and high school.** "The four dashed ones were never weighed." is shown 38.8–42.1 s, 3.3 s (fade-in from 37.8). It needs 3.83 s and leaves at beat 7. PME holds it 5.1 s and passes.

---

## 1. PME polish, beat 3: pass

PME's change is "a response" becoming "Deter the adversary". The business casts make the same core move as need into cost. I checked both.

**PME at 1440×900:**

| Player s | What happens |
|---|---|
| 19.3–19.4 | "AI'S FRAME" fades in |
| 19.9–20.0 | A grey copy of the task appears at the top of the frame, in place. The card stays as it is, and nothing flies over it. |
| 20.9–21.1 | The unkept words fade |
| 21.2–21.6 | "adversary" slides |
| 21.5–21.7 | "Deter the" fades in |
| 24.7–24.8 | The headings start to move |

- **New title:** it holds still for **3.2 s** from 21.5, or 3.0 s from fully shown. The storyboard asks for about 3.2 s.

**Workplace, classroom and high school:**

| Player s | What happens |
|---|---|
| 15.5–15.6 | The copy appears |
| 16.5–16.7 | "need" and "help from the program?" fade |
| 16.9–17.1 | The kept words close up |
| 17.15–17.3 | "cost" and "?" fade in |
| 20.4 | The headings move |

- **New title:** "Which patients cost the most?" holds **3.2 s**.

**No text over text:**
- The overlap scan finds no text drawn over other text anywhere in beat 3, at 1440, 1366 or 1280, in any version.
- On the way in, each heading chip passes *under* the title's band for about 0.1 s (PME 25.1 s, business casts 20.7 s). It is hidden by the band and doesn't overprint the title.
- The doubled copy over the task card that the light read saw at about 16.5 s is gone.
- Frames: PME `t020.0`, `t021.0`, `t022.0`, `t025.0`; classroom `t016.0`, `t016.5`, `t017.5`, `t021.0`.

## 2. Laptop windows: pass

| | 1280×720 | 1366×657 |
|---|---|---|
| Stacked at any step | never | never |
| Labels hidden (`is-narrow`) | none | none |
| Smallest label | 11.10 px | 11.03 px |

- The smallest label in both windows is the "EXAMPLE TASK" mono label.
- The same holds in all four versions.
- In the final frames, the high-school source line and "For teachers" box sit under a drawn picture.

## 3. Pacing: fail (minor)

### Captions

Every caption passes in every version, at both sizes (the clock is the same):
- **PME:** the tightest is caption 9, 6.8 s against 4.83 s.
- **Business casts:**
  - caption 8: 4.85 s against 4.83 s;
  - caption 2: 5.6 s against 5.5 s;
  - caption 11: 5.65 s against 5.5 s.
- **Classroom caption 3:** "It turns need into cost: a reasonable, narrower frame." has 13 words, 9.0 s against 5.83 s.

### Picture texts at 1440×900

Every new text passes except defect 1. Not counted as failures:
- **"STUDENT'S DRAFT 2"** ("ANALYST'S DRAFT 2"), 2.1 s (PME 35.0–37.1, business casts 30.6–32.7). Only the digit changes (1 → 2 → 3), so the new text is one token, needing 1.83 s.
- **The grey copy's words** (PME 20.0–21.1, business casts 15.6–16.7) are a copy of the task card, which stays on screen. They aren't new text.

### Stacked stage at 390×844

Defects 2–4. Not counted as failures:
- **"Which patients the most"** (16.3–17.1) is the rewrite halfway through.
- **The "Set aside" list** first shows 74.8–78.3, 3.5 s for 11 words. It returns at 88.2 and stays to the end.
- **"Checked: some patients are sicker."** is folded into the second student's note at 88.2 and stays.

### Runtime, not counted against the figure

- **The name card's kicker** "Failure mode 1 of 7" is fully shown 0–2.4 s, against 3.17 s needed. This is the same in all eight figures.
- **Mitigation:**
  - the waiting view shows the card before autoplay;
  - the page kicker above the title reads the same;
  - the plate keeps "1 OF 7".
- I flagged it for the runtime check.

### Notes, not counted

- **Beat 7 lift:** the clean copy fades in over the frame's paper at a slightly different scale, so the title and headings look doubled for about 0.2 s (PME 49.4–49.6, frame `t049.5`; business casts 43.2–43.4). After that the copy is opaque.
- **Reading budget:** at 390, beat 11 brings six texts (27 words) in 4.4 s. This passes the per-text rule but not a per-beat budget.

## 4. Workplace wording

The brief lists PS and FS for this item, so FC is out of scope. The workplace version resolves cleanly:
- caption 3: "It proposes a reasonable, narrower frame";
- the check: "Reviewer's check", the `casts.json` default; the reviewer is the manager.

## 5. Classroom and high school: pass

- **edition-check:** `node scripts/edition-check.mjs` reports "8 figures, 16 editions … Listed casts: no failures." (exit 0). The run for the three figures passes too.
- **Role words:** I scanned the rendered page in both casts: title, meta, body text with the beat list, every SVG text, the stacked stage and the screen-reader text. I also scanned every resolved edition string. No workplace role words, and no "Faculty" or "seminar".
- **Singular reviewer:**
  - Classroom: caption 7 "The instructor receives the final ranking.", "THE INSTRUCTOR ASKS EACH STUDENT", "WHAT THE INSTRUCTOR RECEIVES", "Instructor's check".
  - High school: the same with "The teacher" and "Teacher's check".
  - A scan for a reviewer followed by a plural verb finds nothing.
- **AI-use disclosure:** in both setups: "The class allows AI, and both students say they used it, so the question is whose frame the ranking rests on."
- **The study:**
  - The setup says "…a study of a health-care algorithm and its patients, not of students. The students, their AI and the task are constructed."
  - The source paragraph says "The study looked at an algorithm and its patients, not at students."
- **High school, the race line gives the cause:**
  - Desktop source line: "…In the study, the risk score was the algorithm's prediction of cost. At the same risk score, Black patients were considerably sicker than White patients, because less was spent on their care."
  - Phone, inside the player: "Obermeyer et al., Science (2019): at the same risk score (a cost prediction), Black patients were sicker than White patients, because less was spent on their care."
- **High school, the boxed "For teachers" note:**
  - Shown just under the player at 1440 and 390.
  - It's hidden in the other three versions.
  - It reads: "The figure's last line gives the study's finding about Black and White patients in the paper's terms, with its cause. The study traces it to unequal access to care: less money was spent on Black patients with the same level of need."
- **Note:** the setup still gives one business example, "or sales for customer value". It isn't a role word.

## 6. The switch: pass

Every page reads "See this with: Workplace · Classroom · PME". I followed every link and checked where it landed.

| Page | `aria-current` | Workplace → | Classroom → | PME → |
|---|---|---|---|---|
| PME | PME | `?edition=business` (workplace, Workplace current) | `&cast=classroom` (classroom, Classroom current) | `?edition=pme` (PME current) |
| Workplace | Workplace | same | same | same |
| Classroom | Classroom | same | same | same |
| High school | **Classroom** | same | `&cast=high-school` (stays high school, Classroom current) | same |

- **PME page note:** "PME (professional military education): the original example from *The Irreducible Officer*, the National War College essay." It's hidden on the other three.

## 7. Scroll, console, reduced motion: pass

- **Scroll at 390:** `scrollWidth` is 390 at every 0.1 s step in all four versions (893 or 1037 steps each), and on the reduced-motion page.
- **Console:** 0 errors and 0 warnings on every load: the seek passes at four sizes, the page loads, the 12 switch landings and the 8 reduced-motion loads.
- **Reduced motion** (media query), at 1440 and 390:
  - `is-reduced` is set, and the time reads 1:29 / 1:29 (PME) or 1:43 / 1:43.
  - The caption carries the name, definition, check and follow-up, with the follow-up at opacity 1.
  - The picture text and stacked text match the final frame drawn by seek, exactly.

---

## Fixes after this verification (October 30)

| # | Defect | Fix | Recheck (player clock) |
|---|---|---|---|
| 1 | Second-dot label, 1.9 s | Core: the label stays in place until 58.7–59.0 (figure clock) while the dot sets off on its visits, as premature synthesis's does. | 2.35 s in all four versions at 1440×900, 1366×657 and 1280×720 (PME 59.5–61.85, business casts 55.3–57.65); needs 2.17 s. |
| 2 | PME phone, "…either paper.", 3.0 s | Core, stacked stage: the weighing note arrives with the second paper (66.0–67.2) as one change, instead of at 68.0. | 69.6–74.5, 4.9 s; needs 3.83 s. Words unchanged. |
| 3 | Business phone, "…either ranking.", 1.2 s | The core change above, and the words cut to fit the business clock without adding time: "Neither shows the weighing." | 69.5–72.6, 3.1 s in workplace, classroom and high school; needs 2.83 s. |
| 4 | Business phone, "The four dashed ones were never weighed.", 3.3 s | Words cut: "The dashed four: never weighed." Timing unchanged. | 38.8–42.1, 3.3 s in all three business casts; needs 3.17 s. PME keeps its line (5.1 s). |

Run lengths are unchanged (PME 89.2 s, business casts 103.6 s). The new phone lines passed the writing-as-jack mechanical check.

**Gates.**
- Frame-diff, HEAD against the fix (`--freeze`, quiet ports, `--disable-partial-raster` and 120 ms waits as in CONVENTIONS.md). Only these frames changed:
  - PME: 1 of 203, `390x844/t070.00` (the note, now arriving with paper B). A first run under machine load showed glyph noise across the phone frames; a rerun alone gave only this frame.
  - Workplace, classroom and high school: 7 of 248 each, all at 390×844: `t038.00`, `t040.00`, `t042.00`, `t042.08` (the dashed-four line) and `t070.00`, `t072.00`, `t072.58` (the weighing line). Each difference is confined to that one line.
  - No capture falls inside the label's new window (desktop, PME 61.2–62.0, business casts 57.0–57.8); the seek probe above covers it.
- Re-baselined with `--freeze`: `regression/baseline`, `baseline-business`, and, with the switch hidden, `baseline-pme`, `baseline-business-nosw`, `baseline-business-classroom` and `baseline-business-high-school`.
- `node scripts/edition-check.mjs`: passes (exit 0).

---

## Recheck (October 30, after the 4.2 s name card)

**Build:** `d54d0cb`, which adds the 4.2 s name card to the fixes above. Served from `design/motion-figures/` on port 5463 (stopped afterwards); one headless Chromium at a time, closed between viewports.

**Method.** A seek pass through `window.__motionFigures['frame-capture'].seek` in 0.05 s steps, with 0.02 s steps around the label's fades. At each step I logged each text's opacity, clip and occlusion. On phones I also checked that it sat inside the window and clear of the sticky caption band and controls. "Shown" follows this report's rule: from 50% opacity until the text leaves. The fully opaque span is given too. The player clock is now figure time + 4.2 s, so every time here is 1.2 s later than in the sections above. Scripts are in the session scratchpad, `recheck-final/` (`hold.mjs`, `probe-fc.mjs`, `probe-fc390.mjs`, `card.mjs`).

| Check | Needs | PME | Workplace, classroom, high school | Result |
|---|---|---|---|---|
| Second-dot label, 1440×900, 1366×657 and 1280×720 | 2.17 s | "Second student" 60.7–63.05, **2.35 s** | "Second analyst" / "Second student" 56.5–58.85, **2.35 s** (all three) | **Pass** |
| 390×844, "The weighing doesn’t show in either paper." | 3.83 s | 70.8–75.7, **4.9 s** (fully opaque 71.4–75.7, 4.3 s) | — | **Pass** |
| 390×844, "Neither shows the weighing." | 2.83 s | — | 70.7–73.8, **3.1 s** (all three) | **Pass** |
| 390×844, "The dashed four: never weighed." | 3.17 s | — | 40.0–43.3, **3.3 s** (all three) | **Pass** |
| Name card kicker, "Failure mode 1 of 7" | 3.17 s, fully shown | Fully opaque and still 0–3.2 s on the seek pass. On the real clock it was 3.20 s after Play, and before Play in the waiting view | the same | **Pass** |

**Notes:**
- **Second-dot label.** It is identical at all three laptop sizes (14.06, 11.03 and 11.1 px). In PME it fades in from 60.4 and is fully opaque 60.9–62.9, about 2.0 s, then fades out to 63.2. The business casts run the same profile 4.2 s earlier (fully opaque 56.7–58.75). A fully-opaque reading would leave it about 0.15 s short; the 50% rule this report uses passes it.
- **"Neither shows the weighing."** It fades in 70.1–71.3 and is fully opaque 71.3–73.8 (2.5 s).
- **"The dashed four: never weighed."** It fades in slowly, 39.0–41.2, and is fully opaque 41.2–43.3 (2.1 s). It leaves at 43.3 with no fade. It meets the rule by about 0.1 s.
- **Checks.** None of the three phone lines is under the caption band or controls at any step. The console showed 0 errors and 0 warnings on every load.
- **Runtime.** The name card, beat timing, End and `?t=` are covered in `RUNTIME-VERIFY.md` (Recheck).

# Final verification: premature synthesis, all four versions

**Verifier:** final verifier after the PME polish, wording and classroom changes. Not a cold reader: I read HANDOFF.md, `storyboard.md`, `storyboard-business.md` (with its Classroom cast section) and `tests/classroom-light-read.md` / `business-verify.md` first.
**Build:** commit `7e607cb` on `motion-figures`, served from `design/motion-figures/` on port 5417 (stopped afterwards). One headless Chromium at a time, closed between viewports.
**Versions:** PME (no query, "Faculty"); workplace (`?edition=business`); classroom (`&cast=classroom`, "the instructor"); high school (`&cast=high-school`, "the teacher").

**Method.** As in `../frame-capture/tests/final-verify.md`:
- **Seek pass** through the runtime's `seek` hook. At each step I logged every visible text (picture, stacked stage, caption, name card) with its opacity, clip and occlusion by opaque shapes, rendered px and position, plus `scrollWidth`.
  - 1440×900 and 390×844 in 0.1 s steps, with a JPEG every 0.5 s.
  - 1280×720 and 1366×657 in 0.25 s steps.
- **Pace rule:** words ÷ 3 + 1.5 s for every caption and every new text, from 50% opacity until it leaves. A text that leaves and returns within 1 s counts as moved, not gone.
- **Text overlap** checked at every step.
- **Page, switch, reduced-motion and console checks.**
- **Resolved-edition scan** and `edition-check`.
- **Clock:** all times are on the player clock (figure clock + 3.0 s). Every version runs 93.0 s in 10 captions.

## Verdict

| # | Item | Result |
|---|---|---|
| 1 | PME polish: second dot's label held ≥ 2.2 s | **Pass** (2.3 s fully shown) |
| 2 | Drawn picture at 1280×720 and 1366×657, labels ≥ 11 px (all four) | **Pass**, one transient noted |
| 3 | Pacing at 1440×900 and 390×844 (all four) | **Pass** |
| 4 | Workplace wording: captions 5 and 9, answers, setup, description | **Pass**, one copy nit |
| 5 | Classroom and high school | **Pass**, same copy nit |
| 6 | The switch | **Pass** |
| 7 | No horizontal scroll at 390, no console errors, reduced motion | **Pass** |

**No blocking defects.** Minor items:
- **Copy nit, workplace, classroom and high school.** The check section's follow-up capitalises after the colon. It reads "The second question separates them: **The** engineer (student) who asked how it works…". Frame capture uses lowercase in the same spot ("separates them: one can say…").
- **Transient, 1366×657 (and 1280×720), all four versions.** From 57.25 to 57.6 s the two write-ups shrink and fade into the strip. For about 0.3 s their labels pass through 9.93 px at 1366 (11.29 px at 1280) while still at 50% opacity or more. Settled labels are 11.07 px or more.

---

## 1. PME polish: pass

The second dot's label, "Second student" ("Second engineer" in workplace), fades in at 29.3–29.5 s and is **fully shown 29.5–31.8 s, 2.3 s**. It is gone by 31.9 s (2.5 s visible).
- It needs 2.17 s; the brief asks for at least 2.2 s.
- This matches the storyboard's 26.3–28.9 s on the figure clock.
- The timing is the same in all four versions, and at 1280×720 and 1366×657.

## 2. Laptop windows: pass

| | 1280×720 | 1366×657 |
|---|---|---|
| Stacked at any step | never | never |
| Labels hidden (`is-narrow`) | none | none |
| Smallest settled label | 12.59 px | 11.07 px |

- The same holds in all four versions.
- The strip's thumbnail titles are left out at these sizes by the figure's own rule (`titleVisible`). They show at 1440 at 11.5 px.
- The transient dip at 57.25–57.6 s is described above.
- The final frames at 1366 and 1280 show both sketches, both answers, "What they learned" and the check.

## 3. Pacing: pass

**Captions:** every caption passes in every version.
- The tightest is classroom and high-school caption 1, "A student in a programming course (class) must build a feature with a new library.", 6.8 s against 6.17 s.
- In workplace, caption 4 (20 words) runs 11.7 s against 8.5 s.

**Picture texts at 1440×900:** every new text passes in all four versions.
- **The "receives" line.** "WHAT THE INSTRUCTOR RECEIVES · THE SAME CODE" (PME: "WHAT FACULTY RECEIVE · SAME ARGUMENT, OWN WORDS"; workplace: "WHAT THE TECH LEAD REVIEWS") appears at 54.2 s. It fades out at 57.1–57.4 s while the write-ups shrink, and returns in the strip at 57.9–58.2 s, where it stays.
  - The gap is 0.6 s, so I counted it as moved.
  - If the move were counted as an exit, the line (7–8 words) would be short: 3.1 s against 3.83–4.17 s.
- **Occlusion.** The second student's question and the AI's answer are covered by the second write-up's sheet from 49.9 s. The occlusion-aware holds still pass: 16.6 s and 15.8 s from 33.3 and 34.1 s.

**Stacked stage at 390×844:** every text passes in all four versions.
- PME's "The paper's main claim rests on 2–5." holds 5.1 s, as the polish note says.

**Not counted:**
- **Runtime.** The name card's "Failure mode 3 of 7" is fully shown 0–2.4 s, against 3.17 s needed. It's the same in every figure, and the waiting view, the page kicker and the "3 OF 7" plate carry it.
- **Reading budget at 390,** which the brief's per-text rule doesn't ask for:
  - Beat 3 brings five texts (about 34 words) between 22.6 and 27.7 s.
  - "The fix, on their own:" (43.8 s) and "Each fetch catches its own errors, timeouts included." (44.1 s) leave together at 48.7 s. Each passes alone, 4.9 and 4.6 s. Read as one note (12 words) they would need 5.5 s.
- **Overlaps.** The only overlaps found are the two lines of each thumbnail title in the strip, which sit close together but don't collide (final frame checked), and texts already hidden under an opaque sheet.

## 4. Workplace wording: pass

- **Caption 5:** "One part breaks. That engineer works out why and fixes it." (39.4–48.7 s, 9.3 s; needs 5.17).
- **Caption 9:** "The second engineer, who asked how it works and hit the bug, applies the rule." (75.7–86.3 s, 10.6 s; needs 6.5).
- **The answers,** in the picture at 17.3 px and on the phone:
  - "“It fetches all three in one group. If the group fails, they all fail.”"
  - "“A missing record. Its fetch fails, so the group cancels the other two.”"
- **Setup:** "…What separates them is engaging with how the code works: asking, trying, breaking it and seeing why. Writing it yourself is one way to do that. In the study, the top group had the AI write the code, then asked it follow-up questions to understand it. Illustration based on Shen & Tamkin (2026); the engineers and the task are constructed."
- **Description** (meta, after load): "A workplace example: two engineers ship the same code and sketch the same design, but only the one who asked how it works, then broke it and fixed it, can say what would make it fail."
- **Edition note:** "Workplace edition. PME is the example from the original essay, linked below."
- **The rest reads coherently,** with one copy nit (the capital after the colon, above). The check label is "Reviewer's check", the `casts.json` workplace default.

## 5. Classroom and high school: pass

- **edition-check:** passes ("Listed casts: no failures.", exit 0).
- **Role words:**
  - The rendered page and every resolved string carry no workplace role words and no "Faculty" or "seminar".
  - The only hit is the authors' quoted limit, "…as if it were required for their actual job."
  - Phone, picture and beat list say "In class, code closed", "hands in", "READ → AI WRITES → HANDS IN".
- **Singular reviewer:**
  - Classroom: caption 8 "The instructor asks what would make the main connection fail.", "THEN THE INSTRUCTOR ASKS", "WHAT THE INSTRUCTOR RECEIVES", phone "The instructor points to 2–5", "Instructor's check".
  - High school: the same with "The teacher" and "Teacher's check".
  - No plural verbs.
- **AI-use disclosure:** in the setup, "The course (class) allows AI, and both say they used it."
- **The study:**
  - Setup: "…a study of developers learning a new library; the students, the course and the task are constructed."
  - Evidence, paragraph 1: "52 developers recruited online, most of them professional or freelance programmers … **Most** of the study's participants were working developers; the students in the figure are constructed."
  - The page never calls the participants students.
- **Framing:** the setup says "What separates them is engaging with how the code works…".
- **The top group is named:**
  - setup: "the top group had the AI write the code, then asked it follow-up questions to understand it";
  - evidence, paragraph 2: "the top-scoring group also had the AI write code, then asked how it worked";
  - paragraph 5: "The top group, Generation-Then-Comprehension, two people…".
- **High school** adds "This example suits computer-science classes."
- **The same copy nit** as workplace: "…separates them: The student who asked how it works…".

## 6. The switch: pass

Every page reads "See this with: Workplace · Classroom · PME".

| Page | `aria-current` | Workplace → | Classroom → | PME → |
|---|---|---|---|---|
| PME | PME | `?edition=business` (Workplace current) | `&cast=classroom` (Classroom current) | `?edition=pme` (PME current) |
| Workplace | Workplace | same | same | same |
| Classroom | Classroom | same | same | same |
| High school | **Classroom** | same | `&cast=high-school` (stays high school) | same |

- **PME page note:** "PME (professional military education): the original example from *The Irreducible Officer*, the National War College essay."
- **The business casts' notes:** "Workplace edition. …" and "Classroom edition. PME is the example from the original essay, linked below." High school shows the classroom note.

## 7. Scroll, console, reduced motion: pass

- **Scroll at 390:** `scrollWidth` is 390 at every 0.1 s step in all four versions (931 each), and on the reduced-motion page.
- **Console:** 0 errors and 0 warnings on every load (seek passes, page loads, 12 switch landings, 8 reduced loads).
- **Reduced motion** (media query), at 1440 and 390:
  - `is-reduced` is set, and the time reads 1:33 / 1:33.
  - The caption carries the name, definition, check and follow-up (follow-up at opacity 1).
  - The picture and stacked text match the seek-drawn final frame exactly.

## Fix after this verification (October 30)

**Copy nit.** The check follow-up in `editions/business.json` now reads "The second question separates them: the engineer (student) who asked how it works…", lower case after the colon, in workplace, classroom and high school (one string serves all three). PME has no colon there. Frame diff against HEAD: only the full-page stills changed (`page-1440`, `page-390`); every figure frame, reduced and print still is identical. `regression/baseline-business`, `-classroom` and `-high-school` were recaptured.

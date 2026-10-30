# Final verification: fluency substitution, all four versions

**Verifier:** final verifier after the PME polish, wording and classroom changes. Not a cold reader: I read HANDOFF.md, `storyboard.md`, `storyboard-business.md` (with its Classroom cast section) and `tests/classroom-light-read.md` / `business-verify.md` first.
**Build:** commit `7e607cb` on `motion-figures`, served from `design/motion-figures/` on port 5417 (stopped afterwards). One headless Chromium at a time, closed between viewports.
**Versions:** PME (no query, "Faculty"); workplace (`?edition=business`); classroom (`&cast=classroom`, "the instructor"); high school (`&cast=high-school`, "the teacher").

**Method.** As in `../frame-capture/tests/final-verify.md`:
- **Seek pass** through the runtime's `seek` hook. At each step I logged every visible text (picture, stacked stage, caption, name card) with its opacity, clip and occlusion, rendered px and position, plus `scrollWidth`.
  - 1440×900 and 390×844 in 0.1 s steps, with a JPEG every 0.5 s.
  - 1280×720 and 1366×657 in 0.25 s steps.
- **Pace rule:** words ÷ 3 + 1.5 s for every caption and every new text, measured from 50% opacity until it leaves.
- **Text overlap** checked at every step.
- **Page, switch, reduced-motion and console checks.**
- **Resolved-edition scan** and `edition-check`.
- **Clock:** all times are on the player clock (figure clock + 3.0 s).
- **Runs:** PME 91.6 s (10 captions); business casts 99.8 s (12 captions).

## Verdict

| # | Item | Result |
|---|---|---|
| 1 | PME polish: at 390, "Suppose it matches…" held ≥ 4.8 s | **Pass** (6.2 s) |
| 2 | Drawn picture at 1280×720 and 1366×657, labels ≥ 11 px (all four) | **Pass** |
| 3 | Pacing at 1440×900 and 390×844 (all four) | **Fail** (minor): one phone defect |
| 4 | Workplace wording: the hinge | **Pass** |
| 5 | Classroom and high school | **Fail** (minor): one high-school wording leftover |
| 6 | The switch | **Pass** |
| 7 | No horizontal scroll at 390, no console errors, reduced motion | **Pass** |

**Defects:**
1. **390×844, all four versions.** The draft's relabel is shown 24.8–26.5 s, 1.7 s. In PME it reads "Their paper · drafted with AI"; in the business casts, "Their claims · drafted with AI". It needs 3.17 s.
   - It leaves with the whole draft section at beat 4 (26.5 s). Frames `t025.0` (on) and `t026.5` (gone).
   - The drawn picture keeps the tag to the end, so only phones are short.
2. **High school, the beat list.** Beat 5's "On screen" detail still says "…the same grey paragraph, **the narrower claim** on the sensor included…". The high-school draft calls it "Second claim".
   - It shows in the beat list on phones and under reduced motion, and screen readers get it everywhere.
   - Everything else in high school uses the plain labels.

---

## 1. PME polish: pass

At 390×844, PME's line "Suppose it matches the first student's paper word for word." is shown **40.2–46.4 s, 6.2 s**. It has 10 words, so it needs 4.83 s; the brief asks for at least 4.8 s. It arrives once the draft is composed and stays until beat 6.

The business casts use the same timing, so their 11-word lines (5.17 s needed) also get 6.2 s:
- workplace: "Suppose it matches the first associate's draft word for word.";
- classroom and high school: "…first student's draft…".

## 2. Laptop windows: pass

| | 1280×720 | 1366×657 |
|---|---|---|
| Stacked at any step | never | never |
| Labels hidden | none | none |
| Smallest label | 12.59 px | 11.07 px |

- The same holds in all four versions.
- The final frames at 1366 show the full table, the hinge strip and the check.

## 3. Pacing: fail (minor)

**Captions:** every caption passes in every version.
- PME: the tightest are caption 1 (6.0 s, needs 4.5) and caption 6 (6.0 s, needs 4.5).
- Business casts: the tightest is caption 10 (5.6 s, needs 4.17).
- Caption 9, "Both drafts list the sensor. Only the second associate (student) knows it's new.", runs 8.0 s and needs 5.5 s.

**Picture texts at 1440×900 (and 1366, 1280):** every new text passes in all four versions.

**Stacked stage at 390×844:** every text passes except defect 1.

**Runtime, not counted:** the name card's "Failure mode 2 of 7" is fully shown 0–2.4 s, against 3.17 s needed. It's the same in every figure. The waiting view, the page kicker and the "2 OF 7" plate carry it.

**Note, not counted:**
- In PME beat 3, the struck sentence "Either choice carries real consequences." lifts across line 4 of the draft and the "AI'S DRAFT" label for about 0.2 s: 24.0–24.2 s at 1440 (frame `t024.0`) and 24.25–24.5 s at 1280.
- It is motion, not a held overprint.
- The business casts have no cut sentence and no such moment.

## 4. Workplace wording, the hinge: pass

Workplace, and the same in classroom and high school with their reviewer.

- **The reviewer's line at answer size.**
  - It reads "The partner adds: “It covers the battery too.”" (classroom: "The instructor adds", high school: "The teacher adds").
  - It sits in a strip under the answers at **16.22 px, the same as the answers (16.22 px)** at 1440.
  - It fades in at 81.8–82.3 s and stays to the end (17.9 s).
  - On the phone it runs on after the changed fact, in semibold.
- **The battery answer is struck.** In "“Then lead with the battery design.”", the words "the battery design" are struck through in ink, on desktop and phone. Final frames checked in all three business casts.
- **Caption 9:** "Both drafts list the sensor. Only the second associate knows it's new." (73.4–81.4 s). Caption 10: "But the older patent covers the battery too."
- **The workplace check** reads "Partner's check: Can the associate explain the call plainly, without the draft? / Then change one fact. What would you recommend now?" Workplace keeps "the call" and "recommend" by design.

## 5. Classroom and high school: fail (minor), defect 2

- **edition-check:** passes ("Listed casts: no failures.", exit 0).
- **Role words:**
  - The rendered page and every resolved string in both casts carry no workplace role words and no "Faculty" or "seminar".
  - The only hits are about the study's lawyers: "law firms", "David Autor and colleagues", and in high school "one job" and "years on the job".
- **Singular reviewer:** "The instructor receives two identical drafts, made with AI.", "THE INSTRUCTOR ASKS", "The instructor adds…", "Instructor's check". High school uses the same with "The teacher" and "Teacher's check". No plural verbs.
- **AI-use disclosure:** in the setup, "The course (class) allows AI, and both say they used it." In the summary, "The course allows AI, and its use is disclosed."
- **The study:**
  - Setup: "Illustration based on Autor et al. (2026). The study followed practising patent lawyers; no students took part."
  - Evidence, paragraph 1: "The participants were practising lawyers; no students took part." High school says "No students took part."
- **High school, plain claim labels:**
  - The draft reads "Main claim: reading through clothing, since no earlier device does it. Second claim: the sensor's fabric adjustment. Backup claim: the battery design." This holds in the picture, on the phone (390, 24.0 s) and in the summary.
  - Only beat 5's detail still says "narrower claim" (defect 2).
- **High school, "new" defined:** the setup says "A claim has to be new: no earlier device does it."
- **The check, for the assignment:** "Can the student explain their claims plainly, without the draft? / Then change one fact. What would they claim now?"

## 6. The switch: pass

Every page reads "See this with: Workplace · Classroom · PME".

| Page | `aria-current` | Workplace → | Classroom → | PME → |
|---|---|---|---|---|
| PME | PME | `?edition=business` (Workplace current) | `&cast=classroom` (Classroom current) | `?edition=pme` (PME current) |
| Workplace | Workplace | same | same | same |
| Classroom | Classroom | same | same | same |
| High school | **Classroom** | same | `&cast=high-school` (stays high school) | same |

- **PME page note:** "PME (professional military education): the original example from *The Irreducible Officer*, the National War College essay." Hidden in the business casts.

## 7. Scroll, console, reduced motion: pass

- **Scroll at 390:** `scrollWidth` is 390 at every 0.1 s step in all four versions, and on the reduced-motion page.
- **Console:** 0 errors and 0 warnings on every load (seek passes, page loads, 12 switch landings, 8 reduced loads).
- **Reduced motion** (media query), at 1440 and 390:
  - `is-reduced` is set, and the time reads 1:31 / 1:31 (PME) or 1:39 / 1:39.
  - The caption carries the name, definition, check and follow-up (follow-up at opacity 1).
  - The picture and stacked text match the seek-drawn final frame exactly.

---

## Fixes after this verification (October 30)

| # | Defect | Fix | Recheck (player clock) |
|---|---|---|---|
| 1 | Phone relabel, 1.7 s | The stacked stage's draft label changes as the cut is struck (figure 20.1 s; business has no cut, so the same moment), instead of with the drawn stage's tag swap at 21.8 s. The drawn stage is unchanged. | 390×844: "Their paper · drafted with AI" (PME) and "Their claims · drafted with AI" (workplace, classroom, high school) shown 23.1–26.5, 3.4 s; needs 3.17 s. |
| 2 | High-school beat 5 detail, "narrower claim" | `byCast["high-school"]` patches `beats.4.detail` to "…the second claim on the sensor included…", the high-school draft's label. | No "narrower" or "fallback" left in any resolved high-school string (the classroom patch data aside). |

Run lengths are unchanged (PME 91.6 s, business casts 99.8 s).

**Gates.**
- Frame-diff, HEAD against the fix (`--freeze`, quiet ports, `--disable-partial-raster` and 120 ms waits). Only these frames changed:
  - PME, workplace and classroom: 1 frame each, `390x844/t024.00` (the label line).
  - High school: that frame, plus the beat 5 detail line in `page-390`, `page-1440`, `reduced-390`, `reduced-1440` and `print`.
  - The first HEAD capture ran under machine load and differed from itself: a second HEAD capture differed from it in 3 to 73 frames per version, but matched the fix everywhere except the frames above. Two captures of the fix were byte-identical, except one frame each in PME and workplace.
- Re-baselined with `--freeze`: `regression/baseline`, `baseline-business`, `baseline-business-classroom` and `baseline-business-high-school`.
- `node scripts/edition-check.mjs`: passes (exit 0).
